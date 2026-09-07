import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

function detectDevice(userAgent: string): "Mobile" | "Tablet" | "Desktop" {
  const ua = userAgent.toLowerCase();
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "Tablet";
  }
  if (
    /mobile|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop|android/i.test(
      ua
    )
  ) {
    return "Mobile";
  }
  return "Desktop";
}

function detectBrowser(ua: string): string {
  if (/edg/i.test(ua)) return "Edge";
  if (/opr|opera/i.test(ua)) return "Opera";
  if (/chrome|crios/i.test(ua)) return "Chrome";
  if (/firefox|fxios/i.test(ua)) return "Firefox";
  if (/safari/i.test(ua)) return "Safari";
  return "Browser";
}

function detectOS(ua: string): string {
  if (/windows/i.test(ua)) return "Windows";
  if (/macintosh|mac os x/i.test(ua)) return "macOS";
  if (/android/i.test(ua)) return "Android";
  if (/iphone|ipad|ipod/i.test(ua)) return "iOS";
  if (/linux/i.test(ua)) return "Linux";
  return "OS";
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const cfIp = request.headers.get("cf-connecting-ip");
  const realIp = request.headers.get("x-real-ip");

  let ip = "";
  if (forwarded) {
    ip = forwarded.split(",")[0].trim();
  } else if (cfIp) {
    ip = cfIp.trim();
  } else if (realIp) {
    ip = realIp.trim();
  } else {
    ip = "127.0.0.1";
  }

  if (ip === "::1" || ip === "::ffff:127.0.0.1") {
    return "127.0.0.1 (Local)";
  }
  return ip;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventType, pagePath = "/", targetName = "" } = body;

    if (!eventType) {
      return NextResponse.json(
        { error: "Event type is required" },
        { status: 400 }
      );
    }

    const clientIp = getClientIp(request);
    const userAgent = request.headers.get("user-agent") || "";
    const rawReferrer = request.headers.get("referer") || "";
    const deviceType = detectDevice(userAgent);
    const browser = detectBrowser(userAgent);
    const os = detectOS(userAgent);

    let cleanReferrer = "Direct";
    if (rawReferrer) {
      try {
        const refUrl = new URL(rawReferrer);
        cleanReferrer = refUrl.hostname || rawReferrer;
      } catch {
        cleanReferrer = rawReferrer;
      }
    }

    const formattedDevice = `${deviceType} • ${browser} on ${os}`;
    const formattedUserAgent = `[IP: ${clientIp}] ${userAgent}`.slice(0, 500);

    const basePayload = {
      event_type: eventType,
      page_path: pagePath,
      target_name: targetName || "Page Interaction",
      device_type: formattedDevice,
      referrer: cleanReferrer,
      user_agent: formattedUserAgent,
    };

    const supabase = await createClient();

    // 1. First attempt: try inserting with dedicated ip_address column
    const { error: ipErr } = await supabase.from("analytics_events").insert({
      ...basePayload,
      ip_address: clientIp,
    });

    // 2. If ip_address column does not exist yet in Supabase schema cache, fallback cleanly
    if (ipErr) {
      const { error: fallbackErr } = await supabase
        .from("analytics_events")
        .insert(basePayload);

      if (fallbackErr) {
        return NextResponse.json({ success: false, message: fallbackErr.message });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Internal error" },
      { status: 200 }
    );
  }
}
