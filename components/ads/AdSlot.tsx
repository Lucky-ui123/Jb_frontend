"use client";

import React, { useEffect, useRef } from "react";
import { AdSlotConfig } from "@/types/ads";
import { useAds } from "./AdProvider";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export interface AdSlotProps extends AdSlotConfig {
  className?: string;
}

export function AdSlot({
  slotId,
  format,
  adClient,
  adLayoutKey,
  adFormat,
  fullWidthResponsive = true,
  className,
  style,
  ariaLabel = "Advertisement",
}: AdSlotProps) {
  const { config, provider, isMounted } = useAds();
  const adRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);

  // Handle Production AdSense script push
  useEffect(() => {
    if (!isMounted || config.testMode || !config.enabled) {
      return;
    }

    if (pushedRef.current) {
      return;
    }

    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
      }
    } catch {
      // Gracefully ignore AdSense push errors (e.g., ad blockers, missing script)
    }
  }, [isMounted, config.testMode, config.enabled]);

  // If ads are disabled globally or no provider configured (and not test mode), render nothing
  if (!config.enabled && !config.testMode) {
    return null;
  }

  // Development / Test Mode Diagnostic Placeholder
  if (config.testMode) {
    return (
      <aside
        role="region"
        aria-label={`${ariaLabel} Placeholder`}
        className={cn(
          "w-full my-4 rounded-xl border border-dashed border-border/80 bg-muted/30 p-4 text-center text-xs text-muted-foreground transition-all select-none",
          format === "horizontal_banner" && "min-h-[90px] flex flex-col items-center justify-center",
          format === "rectangle" && "min-h-[250px] max-w-[300px] mx-auto flex flex-col items-center justify-center",
          format === "in_feed" && "min-h-[120px] flex flex-col items-center justify-center",
          format === "anchor" && "min-h-[50px] flex flex-col items-center justify-center",
          className
        )}
        style={style}
      >
        <div className="flex items-center gap-1.5 font-semibold text-[11px] uppercase tracking-wider text-muted-foreground/90">
          <span>Ad Placeholder</span>
          <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 font-mono text-[10px]">
            Dev Mode
          </span>
        </div>
        <div className="mt-1 text-[11px] font-mono text-muted-foreground/70">
          Slot: {slotId} • Format: {format}
        </div>
      </aside>
    );
  }

  // Production Ad Unit
  const markupConfig = provider.getSlotMarkupConfig({
    slotId,
    format,
    adClient,
    adLayoutKey,
    adFormat,
    fullWidthResponsive,
  });

  return (
    <aside
      role="region"
      aria-label={ariaLabel}
      className={cn("w-full overflow-hidden text-center my-4", className)}
      style={style}
    >
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground/50 mb-1 select-none">
        Advertisement
      </div>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        {...markupConfig}
      />
    </aside>
  );
}

