"use client";

import { useEffect } from "react";
import { trackEvent, type AnalyticsEventType } from "@/lib/analytics";

export function AnalyticsTracker() {
  useEffect(() => {
    // 1. Record Page View on mount
    trackEvent("page_view", "Home Portfolio");

    // 2. Global delegate listener for tracked clicks
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("[data-track-event]");
      if (!target) return;

      const eventType = target.getAttribute(
        "data-track-event"
      ) as AnalyticsEventType;
      const targetName = target.getAttribute("data-track-target") || "";

      if (eventType) {
        trackEvent(eventType, targetName);
      }
    };

    window.addEventListener("click", handleDocumentClick, { passive: true });

    return () => {
      window.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return null;
}
