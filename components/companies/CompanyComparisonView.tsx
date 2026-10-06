"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import {
  CompanyComparisonResult,
} from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AdPlacement } from "@/components/ads";
import {
  ShieldCheck,
  TrendingUp,
  MapPin,
  Briefcase,
  X,
  Plus,
  Award,
  Zap,
  Globe,
  DollarSign,
  Sparkles,
  Search,
  ArrowLeft,
} from "lucide-react";

export interface CompanyComparisonViewProps {
  comparison: CompanyComparisonResult | null;
  initialSlugs: string[];
  availableCompanies?: Array<{ name: string; slug: string }>;
}

export function CompanyComparisonView({
  comparison,
  initialSlugs,
  availableCompanies = [],
}: CompanyComparisonViewProps) {
  const [searchAdd, setSearchAdd] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // If no comparison result or fewer than 2 companies
  if (!comparison || comparison.companies.length < 2) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-12 space-y-8 animate-in fade-in duration-300">
        <div className="flex items-center gap-2">
          <Link
            href="/companies"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Company Directory</span>
          </Link>
        </div>

        <Card className="p-8 sm:p-12 text-center space-y-6 border-dashed border-border/80">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-inner">
            <Zap className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h1 className="text-xl sm:text-2xl font-black text-foreground">
              Compare Tech Employers Side-by-Side
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Select 2 to 5 verified tech companies to analyze factual differences in hiring volume, remote friendliness, salary transparency, and tech stacks.
            </p>
          </div>

          {/* Quick select suggestions */}
          {availableCompanies.length > 0 && (
            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                Suggested Companies to Compare:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg mx-auto">
                {availableCompanies.slice(0, 6).map((c) => {
                  const nextSlugs = [...initialSlugs.filter((s) => s !== c.slug), c.slug].slice(0, 5);
                  return (
                    <Link
                      key={c.slug}
                      href={`/companies/compare?slugs=${nextSlugs.join(",")}`}
                      className="px-3 py-1.5 rounded-xl border border-border bg-secondary/80 hover:bg-secondary text-xs font-semibold text-foreground flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 text-primary" />
                      <span>{c.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <div className="pt-4">
            <Link href="/companies">
              <Button size="md" className="font-semibold">
                Browse Companies Directory
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const { companies, volumeComparison, workplaceComparison, seniorityComparison, compensationComparison, skillComparison, geographyComparison, leaders } = comparison;

  const currentSlugs = companies.map((c) => c.identity.slug);

  const filteredCandidates = availableCompanies.filter(
    (c) =>
      !currentSlugs.includes(c.slug) &&
      c.name.toLowerCase().includes(searchAdd.toLowerCase().trim())
  );

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header & Breadcrumb */}
      <div className="space-y-3">
        <Link
          href="/companies"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Company Directory</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="match" size="md">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                <span>Side-by-Side Intelligence Matrix</span>
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight mt-1">
              Company Intelligence Comparison
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mt-1">
              Objective, factually derived hiring analytics indexed directly from verified applicant tracking systems.
            </p>
          </div>

          {/* Add Company Trigger */}
          {currentSlugs.length < 5 && (
            <div className="relative shrink-0">
              {isAdding ? (
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    autoFocus
                    value={searchAdd}
                    onChange={(e) => setSearchAdd(e.target.value)}
                    placeholder="Search company to add..."
                    className="w-full pl-9 pr-8 py-2 rounded-xl border border-primary bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdding(false);
                      setSearchAdd("");
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  {/* Dropdown suggestions */}
                  {searchAdd.trim() && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-xl z-50 max-h-48 overflow-y-auto p-1">
                      {filteredCandidates.length === 0 ? (
                        <div className="p-3 text-xs text-muted-foreground text-center">
                          No matching company found
                        </div>
                      ) : (
                        filteredCandidates.slice(0, 5).map((c) => (
                          <Link
                            key={c.slug}
                            href={`/companies/compare?slugs=${[...currentSlugs, c.slug].join(",")}`}
                            onClick={() => {
                              setIsAdding(false);
                              setSearchAdd("");
                            }}
                            className="w-full text-left px-3 py-2 text-xs font-semibold text-foreground hover:bg-secondary rounded-lg flex items-center justify-between"
                          >
                            <span>{c.name}</span>
                            <Plus className="w-3.5 h-3.5 text-primary" />
                          </Link>
                        ))
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAdding(true)}
                  className="font-semibold"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  <span>Add Company ({currentSlugs.length}/5)</span>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Dimension Leaders Ribbon */}
      <Card className="p-5 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 border-primary/20 shadow-sm">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-primary" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-primary">
              Dimension Leaders in this Comparison
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <div className="p-3 rounded-xl bg-background/80 border border-border/60">
              <span className="text-[11px] text-muted-foreground block font-medium">Largest Volume</span>
              <span className="text-sm font-bold text-foreground truncate block mt-0.5">
                {leaders.highestVolumeCompany}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-background/80 border border-border/60">
              <span className="text-[11px] text-muted-foreground block font-medium">Fastest Growth</span>
              <span className="text-sm font-bold text-foreground truncate block mt-0.5">
                {leaders.fastestGrowingCompany}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-background/80 border border-border/60">
              <span className="text-[11px] text-muted-foreground block font-medium">Most Remote Friendly</span>
              <span className="text-sm font-bold text-foreground truncate block mt-0.5">
                {leaders.mostRemoteFriendlyCompany}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-background/80 border border-border/60">
              <span className="text-[11px] text-muted-foreground block font-medium">Salary Transparency</span>
              <span className="text-sm font-bold text-foreground truncate block mt-0.5">
                {leaders.highestCompensationTransparencyCompany}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-background/80 border border-border/60 col-span-2 sm:col-span-1">
              <span className="text-[11px] text-muted-foreground block font-medium">Broadest Tech Stack</span>
              <span className="text-sm font-bold text-foreground truncate block mt-0.5">
                {leaders.broadestSkillFootprintCompany}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Shared Skills Highlight Banner */}
      {skillComparison.sharedSkills.length > 0 && (
        <Card className="p-4 bg-secondary/40 border-border/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span className="text-xs font-bold text-foreground">
                Shared Skills Required by All {companies.length} Companies:
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {skillComparison.sharedSkills.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-semibold text-xs border border-indigo-500/20"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Side-by-Side Comparison Matrix Table */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[700px] border border-border/80 rounded-2xl bg-card shadow-sm divide-y divide-border/60">
          {/* Header Row: Company Identity */}
          <div
            className="grid p-4 items-center bg-secondary/30 rounded-t-2xl"
            style={{ gridTemplateColumns: `200px repeat(${companies.length}, minmax(0, 1fr))` }}
          >
            <div className="font-bold text-xs uppercase tracking-wider text-muted-foreground">
              Company
            </div>

            {companies.map((c) => {
              const initial = c.identity.name ? c.identity.name.charAt(0).toUpperCase() : "C";
              const removeSlugs = currentSlugs.filter((s) => s !== c.identity.slug);

              return (
                <div key={c.identity.slug} className="px-3 flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 border border-border flex items-center justify-center font-bold text-base text-foreground shrink-0 shadow-inner">
                      {initial}
                    </div>

                    <div className="min-w-0">
                      <Link
                        href={`/companies/${c.identity.slug}`}
                        className="font-bold text-sm text-foreground hover:text-primary transition-colors block truncate"
                      >
                        {c.identity.name}
                      </Link>
                      {c.identity.isVerified && (
                        <div className="flex items-center gap-1 text-[10px] text-blue-600 dark:text-blue-400 font-medium">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Direct ATS</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/companies/compare?slugs=${removeSlugs.join(",")}`}
                    aria-label={`Remove ${c.identity.name} from comparison`}
                    className="p-1 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Section: Volume & Velocity */}
          <div className="p-3 bg-secondary/20 text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-primary" />
            <span>Hiring Volume & Velocity</span>
          </div>

          {/* Active Openings */}
          <div
            className="grid p-4 items-center"
            style={{ gridTemplateColumns: `200px repeat(${companies.length}, minmax(0, 1fr))` }}
          >
            <div className="text-xs font-semibold text-foreground">Active Openings</div>
            {volumeComparison.map((v) => (
              <div key={v.slug} className="px-3">
                <span className="text-lg font-black text-foreground block">
                  {v.activeJobs}
                </span>
                <span className="text-[11px] text-muted-foreground">open positions</span>
              </div>
            ))}
          </div>

          {/* 30-Day New Postings */}
          <div
            className="grid p-4 items-center bg-secondary/5"
            style={{ gridTemplateColumns: `200px repeat(${companies.length}, minmax(0, 1fr))` }}
          >
            <div className="text-xs font-semibold text-foreground">New in Last 30 Days</div>
            {volumeComparison.map((v) => (
              <div key={v.slug} className="px-3">
                <span className="text-sm font-bold text-foreground">
                  +{v.newJobsLast30Days} postings
                </span>
              </div>
            ))}
          </div>

          {/* Velocity & Acceleration */}
          <div
            className="grid p-4 items-center"
            style={{ gridTemplateColumns: `200px repeat(${companies.length}, minmax(0, 1fr))` }}
          >
            <div className="text-xs font-semibold text-foreground">Velocity Status</div>
            {volumeComparison.map((v) => {
              const isRapid = v.velocity === "rapid_expansion" || (v.velocity as string) === "SURGING";
              const isSteady = v.velocity === "steady_hiring" || (v.velocity as string) === "GROWING";
              return (
                <div key={v.slug} className="px-3 flex flex-wrap gap-1.5">
                  <Badge
                    variant={isRapid ? "match" : isSteady ? "success" : "secondary"}
                    size="sm"
                  >
                    <TrendingUp className="w-3 h-3 mr-0.5" />
                    <span>{v.velocity.replace(/_/g, " ")}</span>
                  </Badge>
                  <Badge variant="outline" size="sm">
                    {v.accelerationStatus}
                  </Badge>
                </div>
              );
            })}
          </div>

          {/* Section: Workplace & Remote Distribution */}
          <div className="p-3 bg-secondary/20 text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-teal-600" />
            <span>Workplace & Remote Flexibility</span>
          </div>

          {/* Remote Score */}
          <div
            className="grid p-4 items-center"
            style={{ gridTemplateColumns: `200px repeat(${companies.length}, minmax(0, 1fr))` }}
          >
            <div className="text-xs font-semibold text-foreground">Remote-Friendly Score</div>
            {workplaceComparison.map((w) => (
              <div key={w.slug} className="px-3 space-y-1">
                <span className="text-sm font-bold text-teal-700 dark:text-teal-400">
                  {w.remoteFriendlyScore} / 100
                </span>
                <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-teal-500 h-1.5 rounded-full"
                    style={{ width: `${w.remoteFriendlyScore}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Breakdown Remote / Hybrid / Onsite */}
          <div
            className="grid p-4 items-center bg-secondary/5"
            style={{ gridTemplateColumns: `200px repeat(${companies.length}, minmax(0, 1fr))` }}
          >
            <div className="text-xs font-semibold text-foreground">Workplace Breakdown</div>
            {workplaceComparison.map((w) => (
              <div key={w.slug} className="px-3 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Remote:</span>
                  <span className="font-semibold text-foreground">{w.remotePct}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Hybrid:</span>
                  <span className="font-semibold text-foreground">{w.hybridPct}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Onsite:</span>
                  <span className="font-semibold text-foreground">{w.onsitePct}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Section: Compensation Transparency */}
          <div className="p-3 bg-secondary/20 text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            <span>Compensation Transparency</span>
          </div>

          {/* Transparency Grade & Rate */}
          <div
            className="grid p-4 items-center"
            style={{ gridTemplateColumns: `200px repeat(${companies.length}, minmax(0, 1fr))` }}
          >
            <div className="text-xs font-semibold text-foreground">Transparency Rating</div>
            {compensationComparison.map((c) => (
              <div key={c.slug} className="px-3 space-y-1">
                <Badge
                  variant={c.grade === "VERY_HIGH" || c.grade === "HIGH" ? "salary" : "warning"}
                  size="md"
                >
                  Grade {c.grade.replace(/_/g, " ")} ({c.transparencyRate}% disclosed)
                </Badge>
              </div>
            ))}
          </div>

          {/* Observed Median Salary */}
          <div
            className="grid p-4 items-center bg-secondary/5"
            style={{ gridTemplateColumns: `200px repeat(${companies.length}, minmax(0, 1fr))` }}
          >
            <div className="text-xs font-semibold text-foreground">Observed Salary Range</div>
            {compensationComparison.map((c) => (
              <div key={c.slug} className="px-3 text-xs space-y-0.5">
                {c.observedMedianSalary ? (
                  <>
                    <span className="font-bold text-foreground block">
                      ${Math.round(c.observedMedianSalary / 1000)}k Median
                    </span>
                    <span className="text-[11px] text-muted-foreground block">
                      ${c.observedMinSalary ? Math.round(c.observedMinSalary / 1000) : 0}k – $
                      {c.observedMaxSalary ? Math.round(c.observedMaxSalary / 1000) : 0}k
                    </span>
                  </>
                ) : (
                  <span className="text-muted-foreground italic text-[11px]">
                    No salary disclosed
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Section: Seniority Distribution */}
          <div className="p-3 bg-secondary/20 text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
            <span>Seniority Composition</span>
          </div>

          <div
            className="grid p-4 items-center"
            style={{ gridTemplateColumns: `200px repeat(${companies.length}, minmax(0, 1fr))` }}
          >
            <div className="text-xs font-semibold text-foreground">Seniority Breakdown</div>
            {seniorityComparison.map((s) => (
              <div key={s.slug} className="px-3 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Leadership/Staff:</span>
                  <span className="font-semibold text-foreground">{s.leadershipPct}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Mid-Level:</span>
                  <span className="font-semibold text-foreground">{s.midLevelPct}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Early Career:</span>
                  <span className="font-semibold text-foreground">{s.earlyCareerPct}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Section: Tech Stack & Skill Footprint */}
          <div className="p-3 bg-secondary/20 text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Tech Stack & Skill Footprint</span>
          </div>

          {/* Top Skills */}
          <div
            className="grid p-4 items-start"
            style={{ gridTemplateColumns: `200px repeat(${companies.length}, minmax(0, 1fr))` }}
          >
            <div className="text-xs font-semibold text-foreground pt-1">Top In-Demand Skills</div>
            {skillComparison.companySkills.map((cs) => (
              <div key={cs.slug} className="px-3 space-y-2">
                <div className="flex flex-wrap gap-1">
                  {cs.topSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md bg-secondary text-foreground text-[11px] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Unique skills */}
                {cs.uniqueSkills.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] uppercase font-bold text-primary tracking-wider block">
                      Unique to {cs.name}:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {cs.uniqueSkills.map((skill) => (
                        <span
                          key={skill}
                          className="px-1.5 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold border border-primary/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Section: Geographic Footprint */}
          <div className="p-3 bg-secondary/20 text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>Geographic Footprint</span>
          </div>

          <div
            className="grid p-4 items-center"
            style={{ gridTemplateColumns: `200px repeat(${companies.length}, minmax(0, 1fr))` }}
          >
            <div className="text-xs font-semibold text-foreground">Locations & Hubs</div>
            {geographyComparison.map((g) => (
              <div key={g.slug} className="px-3 text-xs space-y-1">
                <span className="font-bold text-foreground block">
                  {g.totalLocations === 1 ? "1 Location" : `${g.totalLocations} Distinct Locations`}
                </span>
                {g.primaryHubs.length > 0 && (
                  <span className="text-muted-foreground text-[11px] block truncate">
                    Hubs: {g.primaryHubs.slice(0, 3).join(", ")}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Section: Data Integrity & Provenance */}
          <div className="p-3 bg-secondary/20 text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Data Integrity & Confidence</span>
          </div>

          <div
            className="grid p-4 items-center rounded-b-2xl"
            style={{ gridTemplateColumns: `200px repeat(${companies.length}, minmax(0, 1fr))` }}
          >
            <div className="text-xs font-semibold text-foreground">Data Confidence</div>
            {companies.map((c) => (
              <div key={c.identity.slug} className="px-3 space-y-1 text-xs">
                <Badge variant="verified" size="sm">
                  {c.freshness?.dataConfidenceScore ?? 95}% Confidence ({c.freshness?.confidenceRating ?? "High"})
                </Badge>
                <span className="text-[11px] text-muted-foreground block">
                  Status: {c.provenance?.dataFreshnessStatus ?? "FRESH"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Company Comparison Bottom Ad Placement */}
        <div className="pt-4">
          <AdPlacement location="COMPANY_COMPARE_BOTTOM" />
        </div>
      </div>
    </div>
  );
}


