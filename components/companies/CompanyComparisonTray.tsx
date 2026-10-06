"use client";

import * as React from "react";
import Link from "next/link";
import { X, ArrowRight, Layers, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface CompanyComparisonTrayProps {
  selectedSlugs: string[];
  onRemoveSlug: (slug: string) => void;
  onClearAll: () => void;
  companyNamesMap?: Record<string, string>;
}

export function CompanyComparisonTray({
  selectedSlugs,
  onRemoveSlug,
  onClearAll,
  companyNamesMap = {},
}: CompanyComparisonTrayProps) {
  if (selectedSlugs.length === 0) {
    return null;
  }

  const canCompare = selectedSlugs.length >= 2;
  const compareHref = `/companies/compare?slugs=${selectedSlugs.join(",")}`;

  return (
    <div
      role="region"
      aria-label="Company Comparison Tray"
      className="fixed bottom-6 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="pointer-events-auto w-full max-w-3xl bg-card/95 dark:bg-slate-900/95 backdrop-blur-xl border border-primary/30 shadow-2xl shadow-primary/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Summary & Chips */}
        <div className="flex items-center gap-3 overflow-hidden w-full sm:w-auto">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>

          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-foreground">
                Compare Companies ({selectedSlugs.length}/5)
              </span>
              {!canCompare && (
                <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                  • Pick at least 1 more
                </span>
              )}
            </div>

            {/* Chips */}
            <div className="flex flex-wrap items-center gap-1.5 max-h-16 overflow-y-auto">
              {selectedSlugs.map((slug) => {
                const displayName = companyNamesMap[slug] || slug;
                return (
                  <span
                    key={slug}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary text-foreground text-xs font-medium border border-border/80"
                  >
                    <span className="truncate max-w-[120px]">{displayName}</span>
                    <button
                      type="button"
                      onClick={() => onRemoveSlug(slug)}
                      aria-label={`Remove ${displayName}`}
                      className="text-muted-foreground hover:text-destructive focus:outline-none"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={onClearAll}
            className="px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 focus:outline-none"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>

          {canCompare ? (
            <Link href={compareHref}>
              <Button size="sm" className="font-semibold shadow-md">
                <span>Compare Now</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          ) : (
            <Button size="sm" disabled className="opacity-60 cursor-not-allowed">
              <span>Select 2+ to Compare</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
