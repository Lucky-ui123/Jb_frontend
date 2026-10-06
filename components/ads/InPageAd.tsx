"use client";

import React from "react";
import { AdSlot } from "./AdSlot";
import { AdPlacement } from "./AdPlacement";
import { AdPlacementLocation, AdSlotFormat } from "@/types/ads";
import { cn } from "@/lib/utils";

export interface InPageAdProps {
  slotId?: string;
  location?: AdPlacementLocation;
  format?: AdSlotFormat;
  className?: string;
  ariaLabel?: string;
}

export function InPageAd({
  slotId = "inpage-ad-slot",
  location,
  format = "horizontal_banner",
  className,
  ariaLabel = "Sponsored Advertisement",
}: InPageAdProps) {
  if (location) {
    return (
      <AdPlacement
        location={location}
        format={format}
        className={className}
        ariaLabel={ariaLabel}
      />
    );
  }

  return (
    <div
      className={cn(
        "w-full flex justify-center py-2",
        format === "horizontal_banner" && "max-w-4xl mx-auto",
        format === "rectangle" && "max-w-sm mx-auto",
        format === "in_feed" && "max-w-3xl mx-auto",
        className
      )}
    >
      <AdSlot
        slotId={slotId}
        format={format}
        ariaLabel={ariaLabel}
        className="w-full"
      />
    </div>
  );
}

