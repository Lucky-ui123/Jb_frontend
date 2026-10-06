/**
 * DESIGN PREVIEW DATA — ADS REGISTRY & CONFIG
 * Safe placeholder configuration for customer-facing ad slots.
 */
import { AdsConfig, AdPlacementLocation, AdSlotConfig } from "@/types/ads";

export const defaultAdsConfig: AdsConfig = {
  enabled: true,
  provider: "null",
  clientId: null,
  testMode: true,
  bottomAnchorEnabled: true,
  inFeedEnabled: true,
  frequencyInterval: 6,
  requireNpaByDefault: true,
};

export const AD_INVENTORY_REGISTRY: Record<AdPlacementLocation, AdSlotConfig> = {
  HOME_PAGE_HERO_BELOW: {
    slotId: "home-hero-banner",
    format: "horizontal_banner",
    location: "HOME_PAGE_HERO_BELOW",
    fullWidthResponsive: true,
  },
  JOB_SEARCH_IN_FEED: {
    slotId: "job-search-feed",
    format: "in_feed",
    location: "JOB_SEARCH_IN_FEED",
  },
  JOB_DETAIL_SIDEBAR: {
    slotId: "job-detail-side",
    format: "rectangle",
    location: "JOB_DETAIL_SIDEBAR",
  },
  JOB_DETAIL_FOOTER: {
    slotId: "job-detail-foot",
    format: "horizontal_banner",
    location: "JOB_DETAIL_FOOTER",
  },
  COMPANY_PAGE_SIDEBAR: {
    slotId: "company-side",
    format: "rectangle",
    location: "COMPANY_PAGE_SIDEBAR",
  },
  COMPANY_COMPARE_BOTTOM: {
    slotId: "compare-bottom",
    format: "horizontal_banner",
    location: "COMPANY_COMPARE_BOTTOM",
  },
  BOTTOM_ANCHOR_MOBILE: {
    slotId: "mobile-anchor",
    format: "anchor",
    location: "BOTTOM_ANCHOR_MOBILE",
  },
};
