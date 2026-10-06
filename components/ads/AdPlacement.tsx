"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import {
  AdPlacementLocation,
  AdContext,
  AdSlotFormat,
  AdDeviceType,
} from "@/types/ads";
import { AdEligibilityEngine } from "@/lib/ads";
import { AdSlot } from "./AdSlot";
import { useAds } from "./AdProvider";
import { cn } from "@/lib/utils";

export interface AdPlacementProps {
  location: AdPlacementLocation;
  format?: AdSlotFormat;
  isApplyFlow?: boolean;
  contextOverride?: Partial<AdContext>;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
  deviceType?: AdDeviceType;
}

/**
 * Universal, context-aware ad placement component for V5.2 Ad Placement System.
 * Enforces central eligibility engine rules, viewport constraints, and apply-flow safety.
 */
export function AdPlacement({
  location,
  format,
  isApplyFlow = false,
  contextOverride,
  className,
  style,
  ariaLabel,
  deviceType,
}: AdPlacementProps) {
  const { config } = useAds();
  const pathname = usePathname();

  // Evaluate eligibility using domain engine
  const eligibility = useMemo(() => {
    const context: AdContext = {
      page: pathname || "/",
      location,
      isApplyFlow,
      deviceType,
      ...contextOverride,
    };

    return AdEligibilityEngine.evaluate(context, config);
  }, [pathname, location, isApplyFlow, deviceType, contextOverride, config]);

  // If ineligible, do not render anything
  if (!eligibility.eligible || !eligibility.slotConfig) {
    return null;
  }

  const slotConfig = eligibility.slotConfig;
  const effectiveFormat = format || slotConfig.format;
  const effectiveLabel = ariaLabel || slotConfig.ariaLabel;

  return (
    <div
      data-testid={`ad-placement-${location.toLowerCase().replace(/_/g, "-")}`}
      data-ad-location={location}
      className={cn(
        "w-full my-4 flex justify-center",
        effectiveFormat === "horizontal_banner" && "max-w-5xl mx-auto",
        effectiveFormat === "rectangle" && "max-w-sm mx-auto",
        effectiveFormat === "sidebar" && "max-w-xs mx-auto",
        effectiveFormat === "in_feed" && "max-w-4xl mx-auto",
        className
      )}
      style={style}
    >
      <AdSlot
        slotId={slotConfig.slotId}
        format={effectiveFormat}
        location={location}
        adClient={slotConfig.adClient}
        adLayoutKey={slotConfig.adLayoutKey}
        adFormat={slotConfig.adFormat}
        fullWidthResponsive={slotConfig.fullWidthResponsive}
        ariaLabel={effectiveLabel}
        className="w-full"
      />
    </div>
  );
}

