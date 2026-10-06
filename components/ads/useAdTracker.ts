"use client";

import { useEffect, useRef, useCallback } from "react";
import { AdEventPayload, AdEventType, AdPlacementLocation, AdSlotFormat } from "@/types/ads";

export interface UseAdTrackerProps {
  location: AdPlacementLocation;
  slotId: string;
  format?: AdSlotFormat;
  pagePath?: string;
  disabled?: boolean;
}

export function useAdTracker({
  location,
  slotId,
  format,
  pagePath = typeof window !== "undefined" ? window.location.pathname : "/",
  disabled = false,
}: UseAdTrackerProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const impressionRecorded = useRef(false);
  const viewableRecorded = useRef(false);

  const sendEvent = useCallback(
    (eventType: AdEventType) => {
      if (disabled || typeof window === "undefined") return;

      const payload: AdEventPayload = {
        eventType,
        location,
        slotId,
        format,
        pagePath: window.location.pathname || pagePath,
        deviceType: window.innerWidth < 768 ? "mobile" : "desktop",
      };

      try {
        const json = JSON.stringify(payload);
        if (navigator.sendBeacon) {
          navigator.sendBeacon("/api/ads/telemetry", json);
        } else {
          fetch("/api/ads/telemetry", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: json,
            keepalive: true,
          }).catch(() => {});
        }
      } catch {
        // Gracefully ignore telemetry transmission failures
      }
    },
    [disabled, location, slotId, format, pagePath]
  );

  useEffect(() => {
    if (disabled || impressionRecorded.current || !containerRef.current) {
      return;
    }

    // 1. Immediate Render/Impression Event
    sendEvent("impression");
    impressionRecorded.current = true;

    // 2. Viewable Impression (>= 50% in viewport for at least 1s)
    if (typeof IntersectionObserver !== "undefined") {
      let timer: NodeJS.Timeout | null = null;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
              if (!timer && !viewableRecorded.current) {
                timer = setTimeout(() => {
                  sendEvent("viewable_impression");
                  viewableRecorded.current = true;
                }, 1000);
              }
            } else {
              if (timer) {
                clearTimeout(timer);
                timer = null;
              }
            }
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(containerRef.current);

      return () => {
        if (timer) clearTimeout(timer);
        observer.disconnect();
      };
    }
  }, [disabled, sendEvent]);

  return { containerRef, trackClick: () => sendEvent("click") };
}

