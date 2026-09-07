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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventType, pagePath = "/", targetName = "", metadata = {} } = body;

    if (!eventType) {
      return NextResponse.json(
        { error: "Event type is required" },
        { status: 400 }
      );
    }

    const userAgent = request.headers.get("user-agent") || "";
    const referrer = request.headers.get("referer") || "";
    const deviceType = detectDevice(userAgent);

    const supabase = await createClient();

    const { error } = await supabase.from("analytics_events").insert({
      event_type: eventType,
      page_path: pagePath,
      target_name: targetName,
      device_type: deviceType,
      referrer: referrer,
      user_agent: userAgent.slice(0, 255),
      metadata: metadata,
    });

    if (error) {
      // If table does not exist or credentials not yet active, return 200 gracefully
      return NextResponse.json({ success: false, message: error.message });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Internal error" },
      { status: 200 }
    );
  }
}
