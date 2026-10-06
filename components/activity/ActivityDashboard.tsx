"use client";

import { useState } from "react";
import Link from "next/link";



import { SavedJobWithDetails, ViewedJobWithDetails, AppliedJobWithDetails, SavedSearchRecord, JobAlertRecord } from "@/types";
import { SavedSearchList } from "@/components/saved-searches/SavedSearchList";
import { JobAlertList } from "@/components/job-alerts/JobAlertList";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SaveButton } from "@/components/jobs/SaveButton";
import {
  Bookmark,
  CheckCircle2,
  Clock,
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  ArrowRight,
  Trash2,
  AlertCircle,
  ExternalLink,
  Eye,
  Search,
  Bell,
} from "lucide-react";

export interface ActivityDashboardProps {
  initialSavedJobs: SavedJobWithDetails[];
  initialAppliedJobs: AppliedJobWithDetails[];
  initialViewedJobs: ViewedJobWithDetails[];
  initialSavedSearches?: SavedSearchRecord[];
  initialJobAlerts?: JobAlertRecord[];
  defaultTab?: "saved" | "applied" | "viewed" | "searches" | "alerts";
}

function formatSalary(job: { salaryMin?: number | null; salaryMax?: number | null; salaryInterval?: string | null }): string | null {
  if (!job.salaryMin && !job.salaryMax) return null;

  const formatNum = (num: number) => {
    if (num >= 1000) return `$${Math.round(num / 1000)}k`;
    return `$${num.toLocaleString()}`;
  };

  const intervalText = job.salaryInterval ? ` / ${job.salaryInterval.replace("ly", "")}` : "";

  if (job.salaryMin && job.salaryMax) {
    if (job.salaryMin === job.salaryMax) return `${formatNum(job.salaryMin)}${intervalText}`;
    return `${formatNum(job.salaryMin)} – ${formatNum(job.salaryMax)}${intervalText}`;
  }

  if (job.salaryMin) return `From ${formatNum(job.salaryMin)}${intervalText}`;
  if (job.salaryMax) return `Up to ${formatNum(job.salaryMax)}${intervalText}`;
  return null;
}

function formatDate(date: Date): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ActivityDashboard({
  initialSavedJobs,
  initialAppliedJobs,
  initialViewedJobs,
  initialSavedSearches = [],
  initialJobAlerts = [],
  defaultTab = "saved",
}: ActivityDashboardProps) {
  const [activeTab, setActiveTab] = useState<"saved" | "applied" | "viewed" | "searches" | "alerts">(defaultTab);
  const [savedJobs, setSavedJobs] = useState<SavedJobWithDetails[]>(initialSavedJobs);
  const [appliedJobs] = useState<AppliedJobWithDetails[]>(initialAppliedJobs);
  const [viewedJobs] = useState<ViewedJobWithDetails[]>(initialViewedJobs);
  const [savedSearches] = useState<SavedSearchRecord[]>(initialSavedSearches);
  const [jobAlerts] = useState<JobAlertRecord[]>(initialJobAlerts);
  const [removingSavedIds, setRemovingSavedIds] = useState<Set<string>>(new Set());

  const handleUnsave = async (jobId: string) => {
    setRemovingSavedIds((prev) => new Set(prev).add(jobId));

    try {
      const response = await fetch(`/api/jobs/${jobId}/save`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSavedJobs((prev) => prev.filter((item) => item.jobId !== jobId));
      }
    } catch (err: unknown) {
      console.error("[Unsave] Failed to remove saved job:", err);
    } finally {
      setRemovingSavedIds((prev) => {
        const next = new Set(prev);
        next.delete(jobId);
        return next;
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Activity Tabs Header */}
      <div className="flex items-center gap-2 border-b border-border/70 pb-3 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab("saved")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all shrink-0 ${
            activeTab === "saved"
              ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved Jobs</span>
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === "saved" ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            {savedJobs.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("searches")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all shrink-0 ${
            activeTab === "searches"
              ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Saved Searches</span>
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === "searches" ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            {savedSearches.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("alerts")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all shrink-0 ${
            activeTab === "alerts"
              ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Job Alerts</span>
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === "alerts" ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            {jobAlerts.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("applied")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all shrink-0 ${
            activeTab === "applied"
              ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Applied Jobs</span>
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === "applied" ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`}>
            {appliedJobs.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("viewed")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all shrink-0 ${
            activeTab === "viewed"
              ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Recently Viewed</span>
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === "viewed" ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            {viewedJobs.length}
          </span>
        </button>
      </div>

      {/* Tab 1: Saved Jobs */}
      {activeTab === "saved" && (
        <div className="space-y-4">
          {savedJobs.length === 0 ? (
            <div className="py-16 px-4 text-center max-w-md mx-auto space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-inner">
                <Bookmark className="w-7 h-7 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-foreground">No saved jobs</h3>
                <p className="text-xs text-muted-foreground">
                  Bookmark jobs while browsing to review and apply to them later.
                </p>
              </div>
              <Link href="/jobs" className="inline-block pt-1">
                <Button variant="primary" size="sm" className="gap-2">
                  <span>Discover Jobs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {savedJobs.map((item) => {
                const { job } = item;
                const salaryDisplay = formatSalary(job);
                const isExpired = job.lifecycleStatus !== "active";
                const isRemoving = removingSavedIds.has(item.jobId);
                const companyInitial = job.company.name ? job.company.name.charAt(0).toUpperCase() : "C";

                return (
                  <Card
                    key={item.id}
                    className={`p-5 sm:p-6 transition-all border-border/80 hover:border-primary/40 shadow-sm hover:shadow-md ${
                      isExpired ? "opacity-75 bg-muted/20" : ""
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex items-start gap-4 min-w-0">
                        <div
                          className="w-12 h-12 rounded-xl bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 border border-border flex items-center justify-center font-bold text-base text-foreground shrink-0 shadow-inner"
                          aria-hidden="true"
                        >
                          {companyInitial}
                        </div>

                        <div className="space-y-1.5 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <Link
                              href={`/jobs/${job.id}`}
                              className="font-bold text-base sm:text-lg text-foreground hover:text-primary transition-colors line-clamp-1"
                            >
                              {job.title}
                            </Link>

                            {isExpired && (
                              <Badge variant="warning" size="sm" className="gap-1">
                                <AlertCircle className="w-3 h-3" />
                                <span>Listing Expired</span>
                              </Badge>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground flex items-center gap-1">
                              <Building2 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                              {job.company.name}
                            </span>

                            {job.locationRaw && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 shrink-0" />
                                {job.locationRaw}
                              </span>
                            )}

                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 shrink-0" />
                              Saved {formatDate(item.savedAt)}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 pt-2">
                            <Badge variant="secondary" size="sm">
                              {job.workplaceType}
                            </Badge>
                            <Badge variant="employment" size="sm">
                              {job.jobType.replace(/_/g, " ")}
                            </Badge>
                            {salaryDisplay && (
                              <Badge variant="salary" size="sm">
                                <DollarSign className="w-3 h-3 mr-0.5" />
                                <span>{salaryDisplay}</span>
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/50">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleUnsave(item.jobId)}
                            disabled={isRemoving}
                            aria-label="Remove saved job"
                            title="Remove saved job"
                            className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <Link href={`/jobs/${job.id}`}>
                            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                              <span>View Details</span>
                              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Saved Searches */}
      {activeTab === "searches" && (
        <div className="space-y-4">
          <SavedSearchList initialSearches={savedSearches} />
        </div>
      )}

      {/* Tab 3: Job Alerts */}
      {activeTab === "alerts" && (
        <div className="space-y-4">
          <JobAlertList initialAlerts={jobAlerts} />
        </div>
      )}

      {/* Tab 4: Applied Jobs */}
      {activeTab === "applied" && (
        <div className="space-y-4">
          {appliedJobs.length === 0 ? (
            <div className="py-16 px-4 text-center max-w-md mx-auto space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-7 h-7 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-foreground">No applications recorded yet</h3>
                <p className="text-xs text-muted-foreground">
                  When you click &quot;Apply on Company Site&quot; while signed in, your application history will be tracked here.
                </p>
              </div>
              <Link href="/jobs" className="inline-block pt-1">
                <Button variant="primary" size="sm" className="gap-2">
                  <span>Explore Open Positions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {appliedJobs.map((item) => {
                const { job } = item;
                const companyInitial = job.company.name ? job.company.name.charAt(0).toUpperCase() : "C";

                return (
                  <Card
                    key={item.id}
                    className="p-5 sm:p-6 transition-all border-border/80 hover:border-emerald-500/40 shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex items-start gap-4 min-w-0">
                        <div
                          className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-bold text-base text-emerald-700 dark:text-emerald-400 shrink-0 shadow-inner"
                          aria-hidden="true"
                        >
                          {companyInitial}
                        </div>

                        <div className="space-y-1.5 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <Link
                              href={`/jobs/${job.id}`}
                              className="font-bold text-base sm:text-lg text-foreground hover:text-emerald-600 transition-colors line-clamp-1"
                            >
                              {job.title}
                            </Link>

                            <Badge variant="success" size="sm" className="gap-1 font-semibold">
                              <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                              <span>Applied</span>
                            </Badge>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground flex items-center gap-1">
                              <Building2 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                              {job.company.name}
                            </span>

                            {job.locationRaw && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 shrink-0" />
                                {job.locationRaw}
                              </span>
                            )}

                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 shrink-0" />
                              Initiated {formatDate(item.initiatedAt)}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 pt-2">
                            <Badge variant="secondary" size="sm">
                              {job.workplaceType}
                            </Badge>
                            <Badge variant="employment" size="sm">
                              {job.jobType.replace(/_/g, " ")}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/50">
                        <div className="flex items-center gap-2">
                          {item.sourceUrl && (
                            <a
                              href={item.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-xs font-semibold text-foreground hover:bg-secondary/80 transition-colors"
                            >
                              <span>Employer ATS</span>
                              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                            </a>
                          )}

                          <Link href={`/jobs/${job.id}`}>
                            <Button variant="outline" size="sm" className="text-xs">
                              <span>Job Details</span>
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Recently Viewed */}
      {activeTab === "viewed" && (
        <div className="space-y-4">
          {viewedJobs.length === 0 ? (
            <div className="py-16 px-4 text-center max-w-md mx-auto space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-inner">
                <Clock className="w-7 h-7 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-foreground">No viewed jobs history</h3>
                <p className="text-xs text-muted-foreground">
                  Positions you inspect while authenticated will automatically be remembered here.
                </p>
              </div>
              <Link href="/jobs" className="inline-block pt-1">
                <Button variant="primary" size="sm" className="gap-2">
                  <span>Browse Jobs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {viewedJobs.map((item) => {
                const { job } = item;
                const companyInitial = job.company.name ? job.company.name.charAt(0).toUpperCase() : "C";

                return (
                  <Card
                    key={item.id}
                    className="p-5 sm:p-6 transition-all border-border/80 hover:border-primary/40 shadow-sm hover:shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex items-start gap-4 min-w-0">
                        <div
                          className="w-12 h-12 rounded-xl bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 border border-border flex items-center justify-center font-bold text-base text-foreground shrink-0 shadow-inner"
                          aria-hidden="true"
                        >
                          {companyInitial}
                        </div>

                        <div className="space-y-1.5 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <Link
                              href={`/jobs/${job.id}`}
                              className="font-bold text-base sm:text-lg text-foreground hover:text-primary transition-colors line-clamp-1"
                            >
                              {job.title}
                            </Link>

                            {item.viewCount > 1 && (
                              <Badge variant="secondary" size="sm" className="gap-1 text-[10px]">
                                <Eye className="w-3 h-3" />
                                <span>{item.viewCount} views</span>
                              </Badge>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground flex items-center gap-1">
                              <Building2 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                              {job.company.name}
                            </span>

                            {job.locationRaw && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 shrink-0" />
                                {job.locationRaw}
                              </span>
                            )}

                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 shrink-0" />
                              Last viewed {formatDate(item.lastViewedAt)}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 pt-2">
                            <Badge variant="secondary" size="sm">
                              {job.workplaceType}
                            </Badge>
                            <Badge variant="employment" size="sm">
                              {job.jobType.replace(/_/g, " ")}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/50">
                        <div className="flex items-center gap-2">
                          <SaveButton jobId={job.id} size="sm" />

                          <Link href={`/jobs/${job.id}`}>
                            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                              <span>View Details</span>
                              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}


