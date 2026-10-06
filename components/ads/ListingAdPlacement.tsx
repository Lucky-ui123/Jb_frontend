"use client";

import React from "react";
import { AdPlacement } from "./AdPlacement";

export interface ListingAdPlacementProps {
  index: number;
  className?: string;
}

export function ListingAdPlacement({
  index,
  className,
}: ListingAdPlacementProps) {
  return (
    <div
      className="py-2"
      data-testid={`listing-ad-slot-${index}`}
      data-ad-feed-index={index}
    >
      <AdPlacement
        location="JOB_SEARCH_IN_FEED"
        format="in_feed"
        className={className}
        contextOverride={{
          customParams: { feedIndex: index },
        }}
        ariaLabel={`Sponsored Job Listing Slot ${index}`}
      />
    </div>
  );
}
