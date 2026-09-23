import { NextRequest, NextResponse } from "next/server";
import { createPublicClient } from "@/lib/supabase/server";

// ─── Constants ────────────────────────────────────────────────────────────────
const MAX_NAME_LEN = 100;
const MAX_EMAIL_LEN = 254; // RFC 5321 max
const MAX_MESSAGE_LEN = 2000;

// ─── In-memory rate limiter (per IP, resets on cold start) ───────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = 60_000; // 60 seconds

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count += 1;
  return false;
}

// ─── Sanitizers ───────────────────────────────────────────────────────────────

/** Escapes HTML special characters to prevent markup injection in Telegram HTML mode. */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Defangs URLs so they are NEVER rendered as clickable hyperlinks.
 * https://evil.com → hxxps[://]evil[.]com
 * Standard infosec practice for sharing untrusted URLs safely.
 */
function defangLinks(str: string): string {
  return str
    .replace(/https?:\/\//gi, (m) => m.replace("http", "hxxp").replace("://", "[://]"))
    .replace(
      /(\w)\.(com|net|org|io|co|xyz|ru|tk|top|me|info|biz|link|site|online|click|download)\b/gi,
      "$1[.]$2"
    );
}

/** For Telegram: defang links first, then HTML-escape the result. */
function sanitizeForTelegram(str: string): string {
  return escapeHtml(defangLinks(str));
}

/** For Discord: defang links only (Discord handles its own Markdown). */
function sanitizeForDiscord(str: string): string {
  return defangLinks(str);
}

// ─── Notification dispatcher ──────────────────────────────────────────────────

async function sendMobileNotification(payload: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const { name, email, message } = payload;
  const timeStr = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });

  // 1. Telegram ──────────────────────────────────────────────────────────────
  const tgToken = process.env.TELEGRAM_BOT_TOKEN;
  const tgChatId = process.env.TELEGRAM_CHAT_ID;

  if (tgToken && tgChatId) {
    try {
      const text =
        `📬 <b>New Portfolio Message!</b>\n\n` +
        `👤 <b>From:</b> ${sanitizeForTelegram(name)}\n` +
        `📧 <b>Email:</b> <code>${sanitizeForTelegram(email)}</code>\n` +
        `⏰ <b>Time:</b> ${escapeHtml(timeStr)}\n\n` +
        `💬 <b>Message:</b>\n${sanitizeForTelegram(message)}\n\n` +
        `<i>⚠️ Do not click links from unknown senders.</i>`;

      const tgRes = await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: tgChatId,
          text,
          parse_mode: "HTML",
          link_preview_options: { is_disabled: true }, // disable link previews
        }),
      });

      if (!tgRes.ok) {
        const tgJson = await tgRes.json().catch(() => null);
        console.error("[MobileNotification] Telegram API error:", tgJson);
      }
    } catch (err) {
      console.warn("[MobileNotification] Telegram fetch error:", err);
    }
  }

  // 2. Discord ───────────────────────────────────────────────────────────────
  const discordWebhook = process.env.DISCORD_WEBHOOK_URL;
  if (discordWebhook) {
    try {
      const safeMessage = sanitizeForDiscord(message);
      const dcRes = await fetch(discordWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "Portfolio Notification",
          embeds: [
            {
              title: "📬 New Portfolio Message Received",
              color: 0x10b981,
              fields: [
                { name: "👤 Sender Name",   value: sanitizeForDiscord(name) || "—",  inline: true },
                { name: "📧 Email Address", value: sanitizeForDiscord(email) || "—", inline: true },
                {
                  name: "💬 Message Content",
                  value: safeMessage.length > 1000 ? safeMessage.slice(0, 1000) + "…" : safeMessage || "—",
                },
              ],
              footer: { text: "⚠️ Do not click links from unknown senders." },
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });

      if (!dcRes.ok) {
        console.warn("[MobileNotification] Discord webhook failed:", dcRes.statusText);
      }
    } catch (err) {
      console.warn("[MobileNotification] Discord webhook send failed:", err);
    }
  }
}

// ─── POST /api/contact ────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, message } = body ?? {};

    if (!name || typeof name !== "string" || name.trim().length < 2)
      return NextResponse.json({ error: "Invalid name." }, { status: 400 });
    if (name.trim().length > MAX_NAME_LEN)
      return NextResponse.json({ error: "Name is too long." }, { status: 400 });

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return NextResponse.json({ error: "Invalid email address format." }, { status: 400 });
    if (email.trim().length > MAX_EMAIL_LEN)
      return NextResponse.json({ error: "Email address is too long." }, { status: 400 });

    if (!message || typeof message !== "string" || message.trim().length < 8)
      return NextResponse.json({ error: "Message is too short (minimum 8 characters)." }, { status: 400 });
    if (message.trim().length > MAX_MESSAGE_LEN)
      return NextResponse.json(
        { error: `Message is too long (maximum ${MAX_MESSAGE_LEN} characters).` },
        { status: 400 }
      );

    const supabase = createPublicClient();

    const { error } = await supabase.from("contact_messages").insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    });

    if (error) {
      console.error("[api/contact POST] Supabase insert error:", error.message);
      return NextResponse.json(
        { error: "Failed to save message. Please try again." },
        { status: 500 }
      );
    }

    // Await notification so Vercel serverless does not freeze before Telegram fetch finishes,
    // but catch errors silently so response to client remains clean.
    await sendMobileNotification({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    }).catch((err) => console.error("[api/contact POST] Notification error:", err));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[api/contact POST] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

// ─── GET /api/contact — admin only ───────────────────────────────────────────

import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ messages: data ?? [] });
  } catch (err) {
    console.error("[GET /api/contact]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
