"use client";

import React, { createContext, useContext, useMemo, useEffect, useState } from "react";
import Script from "next/script";
import { AdsConfig, AdProviderContract } from "@/types/ads";
import { getAdsConfig } from "@/lib/ads";
import { createAdProvider } from "@/lib/ads";

interface AdContextValue {
  config: AdsConfig;
  provider: AdProviderContract;
  isMounted: boolean;
}

const AdContext = createContext<AdContextValue | null>(null);

export interface AdProviderProps {
  children: React.ReactNode;
  initialConfig?: AdsConfig;
}

export function AdProvider({ children, initialConfig }: AdProviderProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const config = useMemo(() => {
    return initialConfig || getAdsConfig();
  }, [initialConfig]);

  const provider = useMemo(() => {
    return createAdProvider(config);
  }, [config]);

  const scriptSrc = useMemo(() => {
    // Only load external provider scripts if ads are enabled, not in test mode, and script src exists
    if (!config.enabled || config.testMode) {
      return null;
    }
    return provider.getScriptSrc();
  }, [config.enabled, config.testMode, provider]);

  const contextValue = useMemo<AdContextValue>(
    () => ({
      config,
      provider,
      isMounted,
    }),
    [config, provider, isMounted]
  );

  return (
    <AdContext.Provider value={contextValue}>
      {scriptSrc && (
        <Script
          id="adsense-init"
          src={scriptSrc}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      )}
      {children}
    </AdContext.Provider>
  );
}

export function useAds(): AdContextValue {
  const context = useContext(AdContext);
  if (!context) {
    // Fallback if component is rendered outside of AdProvider
    const fallbackConfig = getAdsConfig();
    return {
      config: fallbackConfig,
      provider: createAdProvider(fallbackConfig),
      isMounted: true,
    };
  }
  return context;
}

