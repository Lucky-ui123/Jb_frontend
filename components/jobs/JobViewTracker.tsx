"use client";

import { useEffect, useRef } from "react";

export interface JobViewTrackerProps {
  jobId: string;
}

export function JobViewTracker({ jobId }: JobViewTrackerProps) {
  const trackedRef = useRef(false);

  useEffect(() => {
    if (trackedRef.current || !jobId) return;
    trackedRef.current = true;

    // Non-blocking fire-and-forget view recording
    const endpoint = `/api/jobs/${jobId}/view`;

    if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
      try {
        navigator.sendBeacon(endpoint);
        return;
      } catch {
        // Fallback to fetch
      }
    }

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).catch(() => {
      // Intentionally swallowed: view telemetry must never disrupt user experience
    });
  }, [jobId]);

  return null;
}
