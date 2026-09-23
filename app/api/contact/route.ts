import { NextRequest, NextResponse } from "next/server";
import { createPublicClient } from "@/lib/supabase/server";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Dispatches optional real-time push notifications to your mobile phone
 * via Telegram Bot or Discord Webhook whenever a new contact message is received.
 */
async function sendMobileNotification(payload: {
  name: string;
  email: string;
  message: string;
}): Promise<{ telegram: string; discord: string }> {
  const { name, email, message } = payload;
  const timeStr = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
  let tgStatus = "not_configured";
  let discordStatus = "not_configured";

  // 1. Telegram Mobile Push (Free, instantaneous push notification on phone)
  const tgToken = process.env.TELEGRAM_BOT_TOKEN;
  const tgChatId = process.env.TELEGRAM_CHAT_ID;

  if (tgToken && tgChatId) {
    try {
      const text =
        `📬 <b>New Portfolio Message!</b>\n\n` +
        `👤 <b>From:</b> ${escapeHtml(name)}\n` +
        `📧 <b>Email:</b> <code>${escapeHtml(email)}</code>\n` +
        `⏰ <b>Time:</b> ${escapeHtml(timeStr)}\n\n` +
        `💬 <b>Message:</b>\n${escapeHtml(message)}`;

      const tgRes = await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: tgChatId,
          text,
          parse_mode: "HTML",
        }),
      });

      const tgJson = await tgRes.json().catch(() => null);
      if (tgRes.ok && tgJson?.ok) {
        tgStatus = "sent";
      } else {
        tgStatus = `failed: ${tgJson?.description || tgRes.statusText}`;
        console.error("[MobileNotification] Telegram API error:", tgJson);
      }
    } catch (err: unknown) {
      tgStatus = `error: ${err instanceof Error ? err.message : String(err)}`;
      console.warn("[MobileNotification] Telegram fetch error:", err);
    }
  }

  // 2. Discord Mobile Push (Webhook notification with rich embed)
  const discordWebhook = process.env.DISCORD_WEBHOOK_URL;
  if (discordWebhook) {
    try {
      const dcRes = await fetch(discordWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "Portfolio Notification",
          embeds: [
            {
              title: "📬 New Portfolio Message Received",
              color: 0x10b981, // Emerald green
              fields: [
                {
                  name: "👤 Sender Name",
                  value: name,
                  inline: true,
                },
                {
                  name: "📧 Email Address",
                  value: `[${email}](mailto:${email})`,
                  inline: true,
                },
                {
                  name: "💬 Message Content",
                  value: message.length > 1000 ? message.slice(0, 1000) + "..." : message,
                },
              ],
              footer: {
                text: "Portfolio Inquiry System • Instant Push",
              },
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });

      discordStatus = dcRes.ok ? "sent" : `failed: ${dcRes.statusText}`;
    } catch (err: unknown) {
      discordStatus = `error: ${err instanceof Error ? err.message : String(err)}`;
      console.warn("[MobileNotification] Discord webhook send failed:", err);
    }
  }

  return { telegram: tgStatus, discord: discordStatus };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body ?? {};

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Invalid name." }, { status: 400 });
    }
    if (
      !email ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return NextResponse.json(
        { error: "Invalid email address format." },
        { status: 400 }
      );
    }
    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length < 8
    ) {
      return NextResponse.json(
        { error: "Message is too short (minimum 8 characters)." },
        { status: 400 }
      );
    }

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

    // Must await in serverless runtime so execution is not frozen prematurely
    const notificationResult = await sendMobileNotification({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    return NextResponse.json(
      { success: true, notification: notificationResult },
      { status: 200 }
    );
  } catch (err) {
    console.error("[api/contact POST] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

import { createClient } from "@/lib/supabase/server";

/** GET /api/contact — admin fetch all messages */
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
