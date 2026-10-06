"use client";

import React, { useState } from "react";
import { AdSlot } from "./AdSlot";
import { useAds } from "./AdProvider";
import { AdEligibilityEngine } from "@/lib/ads";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AnchorAdProps {
  slotId?: string;
  className?: string;
  disabled?: boolean;
}

export function AnchorAd({
  slotId = "bottom-anchor-mobile-slot",
  className,
  disabled = false,
}: AnchorAdProps) {
  const { config } = useAds();
  const [isDismissed, setIsDismissed] = useState(false);

  // Check eligibility via domain engine
  const eligibility = AdEligibilityEngine.evaluate(
    {
      page: "/",
      location: "BOTTOM_ANCHOR_MOBILE",
      deviceType: "mobile",
    },
    config
  );

  // If disabled, dismissed, or ineligible, render nothing
  if (disabled || isDismissed || !eligibility.eligible) {
    return null;
  }

  return (
    <div
      role="complementary"
      aria-label="Mobile Bottom Anchor Advertisement"
      data-testid="ad-placement-bottom-anchor-mobile"
      className={cn(
        "fixed bottom-0 inset-x-0 z-30 flex md:hidden flex-col items-center justify-center bg-background/95 backdrop-blur border-t border-border/80 px-4 py-2 shadow-lg transition-transform",
        className
      )}
    >
      <div className="relative w-full max-w-3xl flex items-center justify-center">
        {/* Dismiss Button */}
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          aria-label="Close Advertisement"
          className="absolute -top-3 right-0 rounded-full bg-secondary border border-border p-1 text-muted-foreground hover:text-foreground shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-primary text-xs cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Anchor Ad Slot */}
        <div className="w-full">
          <AdSlot
            slotId={slotId}
            format="anchor"
            location="BOTTOM_ANCHOR_MOBILE"
            ariaLabel="Mobile Anchor Advertisement"
            className="my-0"
          />
        </div>
      </div>
    </div>
  );
}

