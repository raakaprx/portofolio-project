import { NextRequest, NextResponse } from "next/server";
import { createPublicClient } from "@/lib/supabase/server";

/**
 * Dispatches optional real-time push notifications to your mobile phone
 * via Telegram Bot or Discord Webhook whenever a new contact message is received.
 */
async function sendMobileNotification(payload: {
  name: string;
  email: string;
  message: string;
}) {
  const { name, email, message } = payload;
  const timeStr = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });

  // 1. Telegram Mobile Push (Free, instantaneous push notification on phone)
  const tgToken = process.env.TELEGRAM_BOT_TOKEN;
  const tgChatId = process.env.TELEGRAM_CHAT_ID;

  if (tgToken && tgChatId) {
    try {
      const text =
        `📬 *New Portfolio Message!*\n\n` +
        `👤 *From:* ${name}\n` +
        `📧 *Email:* \`${email}\`\n` +
        `⏰ *Time:* ${timeStr}\n\n` +
        `💬 *Message:*\n${message}`;

      await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: tgChatId,
          text,
          parse_mode: "Markdown",
        }),
      });
    } catch (err) {
      console.warn("[MobileNotification] Telegram send failed:", err);
    }
  }

  // 2. Discord Mobile Push (Webhook notification with rich embed)
  const discordWebhook = process.env.DISCORD_WEBHOOK_URL;
  if (discordWebhook) {
    try {
      await fetch(discordWebhook, {
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
    } catch (err) {
      console.warn("[MobileNotification] Discord webhook send failed:", err);
    }
  }
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

    // Trigger phone notification asynchronously (does not block response)
    sendMobileNotification({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    }).catch(() => {});

    return NextResponse.json({ success: true }, { status: 200 });
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
