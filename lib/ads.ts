/**
 * FRONTEND ADS LOGIC & PLACEMENT CALCULATOR
 * Safe placeholder logic for calculating ad indices and resolving slot configurations.
 */
import {
  AdContext,
  AdsConfig,
  AdEligibilityResult,
  AdPlacementOptions,
  AdProviderContract,
  AdSlotConfig,
} from "@/types/ads";
import { defaultAdsConfig, AD_INVENTORY_REGISTRY } from "@/mock-data/ads";

export function calculateAdIndices(options: AdPlacementOptions): number[] {
  const { totalItems, interval = 6, initialOffset = 3, maxAds = 3 } = options;
  const indices: number[] = [];
  let current = initialOffset;

  while (current < totalItems && indices.length < maxAds) {
    indices.push(current);
    current += interval;
  }

  return indices;
}

export const calculateAdPlacementIndices = calculateAdIndices;

export class AdEligibilityEngine {
  public static evaluate(
    context: AdContext,
    config: AdsConfig = defaultAdsConfig
  ): AdEligibilityResult {
    const defaultSlot: AdSlotConfig = AD_INVENTORY_REGISTRY[context.location] || {
      slotId: "default-slot",
      format: "responsive",
      location: context.location,
    };

    return {
      eligible: true,
      slotConfig: defaultSlot,
    };
  }
}

export function evaluateAdEligibility(
  context: AdContext,
  config: AdsConfig = defaultAdsConfig
): AdEligibilityResult {
  return AdEligibilityEngine.evaluate(context, config);
}

class NullAdProvider implements AdProviderContract {
  readonly id = "null";
  readonly isEnabled = true;
  readonly clientId = null;

  getScriptSrc() {
    return null;
  }

  getSlotMarkupConfig(slot: AdSlotConfig) {
    return {};
  }
}

export function getAdProvider(config?: AdsConfig): AdProviderContract {
  return new NullAdProvider();
}

export const createAdProvider = getAdProvider;
export const getAdsConfig = () => defaultAdsConfig;
