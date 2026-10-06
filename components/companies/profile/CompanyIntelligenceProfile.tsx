"use client";

import * as React from "react";
import Link from "next/link";
import { CompanySignalSnapshot } from "@/types";
import { CompanyJobSummary } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SaveButton } from "@/components/jobs/SaveButton";
import { AdPlacement } from "@/components/ads";
import {
  Globe,
  MapPin,
  Briefcase,
  Layers,
  ArrowLeft,
  ShieldCheck,
  DollarSign,
  Calendar,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
  Zap,
  CheckCircle2,
  Users,
} from "lucide-react";

export interface CompanyIntelligenceProfileProps {
  snapshot: CompanySignalSnapshot;
  jobs: CompanyJobSummary[];
  totalJobs: number;
}

function formatSalary(
  salaryMin: number | null,
  salaryMax: number | null,
  interval: string | null
): string | null {
  if (!salaryMin && !salaryMax) return null;

  const formatNum = (num: number) => {
    if (num >= 1000) return `$${Math.round(num / 1000)}k`;
    return `$${num.toLocaleString()}`;
  };

  const intervalText = interval ? ` / ${interval.replace("ly", "")}` : "";

  if (salaryMin && salaryMax) {
    if (salaryMin === salaryMax) return `${formatNum(salaryMin)}${intervalText}`;
    return `${formatNum(salaryMin)} – ${formatNum(salaryMax)}${intervalText}`;
  }
  if (salaryMin) return `From ${formatNum(salaryMin)}${intervalText}`;
  if (salaryMax) return `Up to ${formatNum(salaryMax)}${intervalText}`;
  return null;
}

function formatPostedDate(date: Date | null): string {
  if (!date) return "Recently";
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "1d ago";
  if (diffDays < 30) return `${diffDays}d ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function CompanyIntelligenceProfile({
  snapshot,
  jobs,
  totalJobs,
}: CompanyIntelligenceProfileProps) {
  const { identity, profile, hiring, distributions, compensation, freshness, provenance, trendSnapshot, hiringReport } =
    snapshot;

  const initial = identity.name ? identity.name.charAt(0).toUpperCase() : "C";

  // Velocity badge styling
  const velocityLabel = hiring.hiringVelocity
    ? hiring.hiringVelocity.replace(/_/g, " ").toUpperCase()
    : "STEADY";
  const isSurging =
    hiring.hiringVelocity === "rapid_expansion" ||
    (hiring as unknown as { velocity?: string }).velocity === "SURGING";
  const isGrowing =
    hiring.hiringVelocity === "steady_hiring" ||
    (hiring as unknown as { velocity?: string }).velocity === "GROWING";

  const accelerationStatus = hiringReport?.velocityTrend?.accelerationStatus ?? "STEADY";
  const remoteFriendlyScore = hiring.geographicFootprint?.remoteFriendlyScore ?? 0;
  const grade = compensation.grade || "C";
  const cadenceScore = hiringReport?.cadence?.cadenceConsistencyScore ?? 85;
  const cadencePattern = hiringReport?.cadence?.cadencePattern ?? "CONSISTENT";
  const primaryDriver = hiringReport?.primaryHiringDrivers?.[0] ?? "ENGINEERING_EXPANSION";

  const windowMetrics = [
    { windowDays: 7, postingsCount: hiring.newJobsLast7Days },
    { windowDays: 30, postingsCount: hiring.newJobsLast30Days },
    { windowDays: 90, postingsCount: hiring.newJobsLast90Days },
  ];

  const topSkills = hiring.skillDemand?.topSkills ?? hiring.topSkillsInDemand ?? [];
  const primaryHubs = hiring.geographicFootprint?.primaryHubs ?? [];
  const totalLocations = hiring.geographicFootprint?.totalDistinctLocations ?? 1;

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Back Navigation & Compare CTA */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/companies"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to All Companies</span>
        </Link>

        <Link href={`/companies/compare?slugs=${identity.slug}`}>
          <Button variant="outline" size="sm" className="font-semibold gap-1.5">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span>Compare with Competitors</span>
          </Button>
        </Link>
      </div>

      {/* Hero Header Card */}
      <Card className="p-6 sm:p-8 space-y-6 border-border/80 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div className="flex items-start gap-4 sm:gap-6">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 border border-border flex items-center justify-center font-extrabold text-2xl sm:text-3xl text-foreground shrink-0 shadow-inner"
              aria-hidden="true"
            >
              {initial}
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  {identity.name}
                </h1>
                {identity.isVerified && (
                  <Badge variant="verified" size="sm">
                    <ShieldCheck className="w-3 h-3 mr-1" />
                    <span>Direct ATS Verified</span>
                  </Badge>
                )}
                <Badge variant="outline" size="sm">
                  <Sparkles className="w-3 h-3 mr-1 text-primary" />
                  <span>{freshness?.dataConfidenceScore ?? 95}% Confidence</span>
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                {identity.websiteUrl && (
                  <a
                    href={identity.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline font-medium inline-flex items-center gap-1 text-primary"
                  >
                    <Globe className="w-4 h-4" />
                    <span>{identity.domain || identity.websiteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}

                {profile.industry && (
                  <span className="flex items-center gap-1">
                    <Layers className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.industry}</span>
                  </span>
                )}

                {identity.primaryAtsSource && (
                  <span className="text-xs px-2 py-0.5 rounded-md bg-secondary text-foreground font-medium uppercase tracking-wider">
                    {identity.primaryAtsSource} Portal
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Hero Badge: Active Openings */}
          <div className="flex items-center sm:flex-col sm:items-end gap-2 shrink-0">
            <div className="px-5 py-3 rounded-2xl bg-primary/10 border border-primary/20 text-center">
              <span className="text-2xl sm:text-3xl font-black text-primary block leading-tight">
                {totalJobs}
              </span>
              <span className="text-xs font-semibold text-primary/90 uppercase tracking-wider">
                {totalJobs === 1 ? "Active Role" : "Active Roles"}
              </span>
            </div>
          </div>
        </div>

        {/* Company Description */}
        {profile.description && (
          <div className="pt-4 border-t border-border/60">
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-4xl">
              {profile.description}
            </p>
          </div>
        )}
      </Card>

      {/* 4-KPI Overview Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Velocity & Volume */}
        <Card className="p-5 space-y-2 border-border/80">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">Hiring Velocity</span>
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-foreground">{velocityLabel}</span>
              <Badge
                variant={isSurging ? "match" : isGrowing ? "success" : "secondary"}
                size="sm"
              >
                {accelerationStatus}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {hiring.newJobsLast30Days} new roles in last 30d
            </p>
          </div>
        </Card>

        {/* KPI 2: Workplace & Remote Score */}
        <Card className="p-5 space-y-2 border-border/80">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">Remote Friendliness</span>
            <Globe className="w-4 h-4 text-teal-600" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-teal-700 dark:text-teal-400">
                {remoteFriendlyScore}%
              </span>
              <Badge variant="remote" size="sm">
                Score
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {distributions.workplace.remote.percentage}% remote • {distributions.workplace.hybrid.percentage}% hybrid
            </p>
          </div>
        </Card>

        {/* KPI 3: Salary Transparency */}
        <Card className="p-5 space-y-2 border-border/80">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">Salary Transparency</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-foreground">
                Grade {grade}
              </span>
              <Badge variant="salary" size="sm">
                {compensation.transparencyRate}% Disclosed
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {compensation.observedMedianSalary
                ? `$${Math.round(compensation.observedMedianSalary / 1000)}k Median Salary`
                : "Limited salary disclosures"}
            </p>
          </div>
        </Card>

        {/* KPI 4: Cadence & Consistency */}
        <Card className="p-5 space-y-2 border-border/80">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">Posting Cadence</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-foreground">
                {cadenceScore}/100
              </span>
              <Badge variant="outline" size="sm">
                {cadencePattern}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Avg interval: {hiring.averagePostingIntervalDays ? `${hiring.averagePostingIntervalDays} days` : "Continuous"}
            </p>
          </div>
        </Card>
      </div>

      {/* Main Intelligence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Hiring & Trends Analytics (2 cols on large screen) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section: Hiring Drivers & Trends */}
          <Card className="p-6 space-y-5 border-border/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                <h2 className="text-base sm:text-lg font-bold text-foreground">
                  Hiring Intelligence & Strategic Drivers
                </h2>
              </div>
              <Badge variant="outline" size="sm">
                Primary Driver: {primaryDriver.replace(/_/g, " ")}
              </Badge>
            </div>

            {/* Time Window Volumes */}
            <div className="grid grid-cols-3 gap-3">
              {windowMetrics.map((vm) => (
                <div key={vm.windowDays} className="p-3 rounded-xl bg-secondary/50 border border-border/60 text-center">
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase block">
                    {vm.windowDays}-Day Window
                  </span>
                  <span className="text-lg font-black text-foreground block mt-0.5">
                    {vm.postingsCount}
                  </span>
                  <span className="text-[10px] text-muted-foreground">postings</span>
                </div>
              ))}
            </div>

            {/* Strategic Shifts if available from Trends */}
            {trendSnapshot && trendSnapshot.topStrategicShifts.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-border/60">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground block">
                  Observed Strategic Shifts:
                </span>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {trendSnapshot.topStrategicShifts.map((shift: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{shift}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>

          {/* Section: Workplace & Seniority Composition */}
          <Card className="p-6 space-y-5 border-border/80">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="text-base sm:text-lg font-bold text-foreground">
                Workforce Distribution & Seniority Mix
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Workplace Breakdown */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                  Workplace Mode:
                </span>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Remote:</span>
                    <span className="font-bold text-teal-700 dark:text-teal-400">
                      {distributions.workplace.remote.percentage}% ({distributions.workplace.remote.count})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Hybrid:</span>
                    <span className="font-bold text-sky-700 dark:text-sky-400">
                      {distributions.workplace.hybrid.percentage}% ({distributions.workplace.hybrid.count})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Onsite:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      {distributions.workplace.onsite.percentage}% ({distributions.workplace.onsite.count})
                    </span>
                  </div>
                </div>
              </div>

              {/* Seniority Composition */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                  Seniority Level:
                </span>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Entry / Junior:</span>
                    <span className="font-bold text-foreground">
                      {distributions.seniority.entry.percentage}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Mid-Level:</span>
                    <span className="font-bold text-foreground">
                      {distributions.seniority.mid.percentage}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Senior & Staff:</span>
                    <span className="font-bold text-foreground">
                      {distributions.seniority.senior.percentage + distributions.seniority.lead.percentage}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Principal & Executive:</span>
                    <span className="font-bold text-foreground">
                      {distributions.seniority.principal.percentage + (distributions.seniority.executive?.percentage ?? 0)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Skills, Footprint & Integrity */}
        <div className="space-y-6">
          {/* Top In-Demand Tech Stack */}
          <Card className="p-6 space-y-4 border-border/80">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-base font-bold text-foreground">
                In-Demand Tech Stack
              </h2>
            </div>

            {topSkills.length === 0 ? (
              <p className="text-xs text-muted-foreground italic">No skills cataloged yet.</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {topSkills.map((item) => (
                  <span
                    key={item.skill}
                    className="px-2.5 py-1 rounded-lg bg-secondary text-foreground text-xs font-medium border border-border/60"
                  >
                    {item.skill} <span className="text-muted-foreground text-[10px]">({item.percentage ?? item.count}%)</span>
                  </span>
                ))}
              </div>
            )}
          </Card>

          {/* Geographic Hubs */}
          <Card className="p-6 space-y-4 border-border/80">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <h2 className="text-base font-bold text-foreground">
                Geographic Presence
              </h2>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-foreground block">
                {totalLocations} Distinct Locations Observed
              </span>

              {primaryHubs.length > 0 && (
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  {primaryHubs.slice(0, 5).map((hub) => (
                    <div key={hub.location} className="flex items-center justify-between">
                      <span className="text-foreground truncate max-w-[180px]">{hub.location}</span>
                      <span className="text-muted-foreground font-medium">
                        {hub.count ?? hub.activeJobCount ?? 1} {(hub.count ?? hub.activeJobCount ?? 1) === 1 ? "role" : "roles"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Data Freshness & Provenance */}
          <Card className="p-5 bg-secondary/30 border-border/80 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Direct ATS Verification & Provenance</span>
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>Status: <span className="font-semibold text-foreground">{provenance?.dataFreshnessStatus ?? "ACTIVE_CRAWL"}</span></p>
              <p>Active Sources: <span className="font-semibold text-foreground">{provenance?.activeSourcesCount ?? 1} verified endpoint</span></p>
              <p>Confidence Rating: <span className="font-semibold text-foreground">{freshness?.confidenceRating ?? "High"}</span></p>
            </div>
          </Card>

          {/* Company Profile Sidebar Ad Placement */}
          <AdPlacement location="COMPANY_PAGE_SIDEBAR" />
        </div>
      </div>

      {/* Active Jobs Section */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              Verified Open Positions ({totalJobs})
            </h2>
          </div>
        </div>

        {jobs.length === 0 ? (
          <Card className="p-8 text-center space-y-3 border-dashed border-border/80">
            <p className="text-muted-foreground text-sm">
              There are currently no active job openings listed for {identity.name}.
            </p>
            <p className="text-xs text-muted-foreground">
              Check back soon as our direct ATS crawlers index new positions in real-time.
            </p>
            <div className="pt-2">
              <Link
                href="/jobs"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-semibold"
              >
                <span>Browse other open jobs</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {jobs.map((job) => {
              const salaryDisplay = formatSalary(job.salaryMin, job.salaryMax, job.salaryInterval);

              return (
                <Card
                  key={job.id}
                  interactive
                  className="group relative p-5 transition-all border-border/80 hover:border-primary/40 shadow-sm hover:shadow-md"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-2 min-w-0">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/jobs/${job.id}`}
                          className="font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors focus:outline-none after:absolute after:inset-0 after:rounded-2xl"
                        >
                          <span>{job.title}</span>
                        </Link>
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-primary shrink-0 pointer-events-none" />
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        {job.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 shrink-0" />
                            {job.location}
                          </span>
                        )}

                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          {formatPostedDate(job.sourcePostedAt || job.firstDiscoveredAt)}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <Badge variant="outline" size="sm">
                          {job.workMode}
                        </Badge>
                        <Badge variant="outline" size="sm">
                          {job.employmentType.replace(/_/g, " ")}
                        </Badge>
                        {job.seniority && (
                          <Badge variant="outline" size="sm">
                            {job.seniority}
                          </Badge>
                        )}
                        {salaryDisplay && (
                          <Badge variant="salary" size="sm">
                            <DollarSign className="w-3 h-3 mr-0.5" />
                            <span>{salaryDisplay}</span>
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 relative z-10">
                      <SaveButton jobId={job.id} size="sm" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Monetization & Sponsorship Placement */}
      <div className="pt-4">
        <AdPlacement location="COMPANY_COMPARE_BOTTOM" />
      </div>
    </div>
  );
}


