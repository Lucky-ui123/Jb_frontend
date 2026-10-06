"use client";

import * as React from "react";
import Link from "next/link";
import { CompanySignalSnapshot } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  ShieldCheck,
  Briefcase,
  TrendingUp,
  MapPin,
  Check,
  Plus,
  ArrowUpRight,
  Globe,
  Sparkles,
} from "lucide-react";

export interface CompanyCardProps {
  snapshot: CompanySignalSnapshot;
  isSelected?: boolean;
  onToggleSelect?: (slug: string) => void;
  selectionDisabled?: boolean;
}

export function CompanyCard({
  snapshot,
  isSelected = false,
  onToggleSelect,
  selectionDisabled = false,
}: CompanyCardProps) {
  const { identity, profile, hiring, compensation, freshness } = snapshot;
  const initial = identity.name ? identity.name.charAt(0).toUpperCase() : "C";

  // Derive active jobs count
  const activeCount = hiring.activeJobCount ?? 0;

  // Grade styling
  const grade = compensation.grade || "MODERATE";
  const gradeVariant =
    grade === "VERY_HIGH" || grade === "HIGH"
      ? "salary"
      : grade === "MODERATE"
      ? "warning"
      : "secondary";

  // Velocity badge styling
  const velocityLabel = hiring.hiringVelocity ? hiring.hiringVelocity.replace(/_/g, " ").toUpperCase() : "STEADY";
  const isSurging = hiring.hiringVelocity === "rapid_expansion" || (hiring as unknown as { velocity?: string }).velocity === "SURGING";
  const isGrowing = hiring.hiringVelocity === "steady_hiring" || (hiring as unknown as { velocity?: string }).velocity === "GROWING";

  const remoteScore = hiring.geographicFootprint?.remoteFriendlyScore ?? 0;
  const topSkills = hiring.skillDemand?.topSkills ?? hiring.topSkillsInDemand ?? [];
  const primaryHub = hiring.geographicFootprint?.primaryHubs?.[0]?.location;

  return (
    <Card
      interactive
      className={`group relative p-5 transition-all flex flex-col justify-between border-border/80 hover:border-primary/40 shadow-sm hover:shadow-md ${
        isSelected ? "ring-2 ring-primary border-primary bg-primary/5 dark:bg-primary/10" : ""
      }`}
    >
      <div className="space-y-4">
        {/* Top Header Row: Identity & Selection */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-12 h-12 rounded-xl bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 border border-border flex items-center justify-center font-extrabold text-lg text-foreground shrink-0 shadow-inner group-hover:border-primary/30 transition-colors"
              aria-hidden="true"
            >
              {initial}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <Link
                  href={`/companies/${identity.slug}`}
                  className="font-bold text-base text-foreground group-hover:text-primary transition-colors focus:outline-none truncate hover:underline"
                >
                  {identity.name}
                </Link>
                {identity.isVerified && (
                  <Badge variant="verified" size="sm" className="shrink-0 text-[10px] py-0 px-1.5 h-4">
                    <ShieldCheck className="w-2.5 h-2.5 mr-0.5" />
                    Verified
                  </Badge>
                )}
              </div>

              {profile.industry && (
                <p className="text-xs text-muted-foreground truncate">{profile.industry}</p>
              )}
            </div>
          </div>

          {/* Compare Checkbox / Toggle */}
          {onToggleSelect && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!selectionDisabled || isSelected) {
                  onToggleSelect(identity.slug);
                }
              }}
              disabled={selectionDisabled && !isSelected}
              aria-label={isSelected ? `Remove ${identity.name} from comparison` : `Add ${identity.name} to comparison`}
              className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all shrink-0 z-10 ${
                isSelected
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : selectionDisabled
                  ? "bg-secondary/40 text-muted-foreground border-border/40 cursor-not-allowed opacity-50"
                  : "bg-background hover:bg-secondary border-border text-foreground hover:border-primary/40"
              }`}
            >
              {isSelected ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Compare</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Signals & Badges Row */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {/* Velocity Badge */}
          <Badge
            variant={isSurging ? "match" : isGrowing ? "success" : "secondary"}
            size="sm"
            className="font-semibold"
          >
            <TrendingUp className="w-3 h-3 mr-0.5" />
            <span>{velocityLabel}</span>
          </Badge>

          {/* Remote Ratio / Score */}
          {remoteScore > 0 && (
            <Badge variant="remote" size="sm">
              <span>{remoteScore}% Remote</span>
            </Badge>
          )}

          {/* Salary Transparency Grade */}
          <Badge variant={gradeVariant} size="sm">
            <span>Grade {grade} Comp</span>
          </Badge>

          {/* Confidence Indicator */}
          <Badge variant="outline" size="sm" className="text-muted-foreground text-[10px]">
            <Sparkles className="w-2.5 h-2.5 mr-0.5 text-primary" />
            <span>{freshness?.dataConfidenceScore ?? 95}% Conf</span>
          </Badge>
        </div>

        {/* Top Skills Tags */}
        {topSkills.length > 0 && (
          <div className="space-y-1">
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider block">
              In-Demand Tech:
            </span>
            <div className="flex flex-wrap gap-1">
              {topSkills.slice(0, 4).map((item) => (
                <span
                  key={item.skill}
                  className="px-2 py-0.5 rounded-md bg-secondary/80 text-foreground text-[11px] font-medium"
                >
                  {item.skill}
                </span>
              ))}
              {topSkills.length > 4 && (
                <span className="px-1.5 py-0.5 text-[10px] text-muted-foreground font-semibold">
                  +{topSkills.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Card Footer: Active Openings & Action */}
      <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground mt-4">
        <span className="flex items-center gap-1 font-semibold text-primary">
          <Briefcase className="w-3.5 h-3.5" />
          {activeCount === 1 ? "1 active role" : `${activeCount} active roles`}
        </span>

        {primaryHub ? (
          <span className="flex items-center gap-1 truncate max-w-[130px]">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
            <span className="truncate">{primaryHub}</span>
          </span>
        ) : identity.websiteUrl ? (
          <span className="flex items-center gap-1 text-muted-foreground truncate max-w-[130px]">
            <Globe className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{identity.domain || "Official ATS"}</span>
          </span>
        ) : null}

        <Link
          href={`/companies/${identity.slug}`}
          className="inline-flex items-center gap-0.5 font-semibold text-primary hover:underline text-xs ml-auto"
        >
          <span>Intel & Jobs</span>
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </Card>
  );
}


