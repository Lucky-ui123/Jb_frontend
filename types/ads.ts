export type AdProviderId = "google-adsense" | "custom" | "null";

export type AdSlotFormat =
  | "horizontal_banner"
  | "rectangle"
  | "in_feed"
  | "anchor"
  | "sidebar"
  | "responsive";

export type AdPlacementLocation =
  | "HOME_PAGE_HERO_BELOW"
  | "JOB_SEARCH_IN_FEED"
  | "JOB_DETAIL_SIDEBAR"
  | "JOB_DETAIL_FOOTER"
  | "COMPANY_PAGE_SIDEBAR"
  | "COMPANY_COMPARE_BOTTOM"
  | "BOTTOM_ANCHOR_MOBILE";

export type AdDeviceType = "mobile" | "tablet" | "desktop" | "unknown";
export type AdPrivacyConsent = "personalized" | "non_personalized" | "undetermined";

export type AdEventType =
  | "impression"
  | "viewable_impression"
  | "click"
  | "suppressed"
  | "error";

export interface AdSlotConfig {
  slotId: string;
  format: AdSlotFormat;
  location?: AdPlacementLocation;
  adClient?: string;
  adLayoutKey?: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  className?: string;
  style?: Record<string, string | number>;
  ariaLabel?: string;
  nonPersonalized?: boolean;
  dataNpa?: "1" | "0";
}

export interface AdContext {
  page: string;
  location: AdPlacementLocation;
  deviceType?: AdDeviceType;
  userAuthenticated?: boolean;
  isApplyFlow?: boolean;
  isSensitivePage?: boolean;
  privacyConsent?: AdPrivacyConsent;
  customParams?: Record<string, string | number | boolean>;
}

export interface AdEligibilityResult {
  eligible: boolean;
  reason?: string;
  slotConfig?: AdSlotConfig;
  policyViolations?: string[];
}

export interface AdsConfig {
  enabled: boolean;
  provider: AdProviderId;
  clientId: string | null;
  testMode: boolean;
  bottomAnchorEnabled?: boolean;
  inFeedEnabled?: boolean;
  frequencyInterval?: number;
  requireNpaByDefault?: boolean;
}

export interface AdProviderContract {
  readonly id: AdProviderId;
  readonly isEnabled: boolean;
  readonly clientId: string | null;
  getScriptSrc(): string | null;
  getSlotMarkupConfig(slot: AdSlotConfig): Record<string, string | boolean | undefined>;
}

export interface AdPlacementOptions {
  totalItems: number;
  interval?: number;
  initialOffset?: number;
  maxAds?: number;
}

export interface AdEventPayload {
  eventType: AdEventType;
  location: AdPlacementLocation;
  slotId: string;
  format?: AdSlotFormat;
  provider?: AdProviderId;
  pagePath: string;
  deviceType?: AdDeviceType;
  nonPersonalized?: boolean;
  metadata?: Record<string, unknown>;
  timestamp?: Date;
}
