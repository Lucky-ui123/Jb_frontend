"use client";

import { useState } from "react";
import Link from "next/link";
import { SavedJobWithDetails } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Bookmark,
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  ArrowRight,
  Trash2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

export interface SavedJobListProps {
  initialSavedJobs: SavedJobWithDetails[];
}

function formatSalary(job: SavedJobWithDetails["job"]): string | null {
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

function formatSavedDate(date: Date): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function SavedJobList({ initialSavedJobs }: SavedJobListProps) {
  const [savedJobs, setSavedJobs] = useState<SavedJobWithDetails[]>(initialSavedJobs);
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());

  const handleRemove = async (jobId: string) => {
    setRemovingIds((prev) => new Set(prev).add(jobId));
    await new Promise((resolve) => setTimeout(resolve, 200));

    setSavedJobs((prev) => prev.filter((item) => item.jobId !== jobId));
    setRemovingIds((prev) => {
      const next = new Set(prev);
      next.delete(jobId);
      return next;
    });
  };

  if (savedJobs.length === 0) {
    return (
      <div className="py-20 px-4 text-center max-w-md mx-auto space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-inner">
          <Bookmark className="w-8 h-8 stroke-[1.5]" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-xl font-bold text-foreground">No saved jobs yet</h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            When you find high-signal positions you want to revisit or apply to later, save them to access them here.
          </p>
        </div>
        <Link href="/jobs" className="inline-block pt-2">
          <Button variant="primary" size="md" className="gap-2 font-semibold">
            <span>Browse Active Jobs</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground pb-1">
        <span>Showing {savedJobs.length} bookmarked position{savedJobs.length === 1 ? "" : "s"}</span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {savedJobs.map((item) => {
          const { job } = item;
          const salaryString = formatSalary(job);
          const isRemoving = removingIds.has(item.jobId);
          const isExpired = job.lifecycleStatus === "expired" || job.lifecycleStatus === "removed";
          const companyInitial = job.company.name ? job.company.name.charAt(0).toUpperCase() : "C";

          return (
            <Card
              key={item.id}
              className={`p-5 sm:p-6 transition-all border-border/80 hover:border-primary/40 shadow-sm hover:shadow-md ${
                isExpired ? "opacity-75 bg-muted/40" : ""
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
                        <Badge variant="destructive" size="sm" className="gap-1">
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

                      {salaryString && (
                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                          <DollarSign className="w-3.5 h-3.5 shrink-0" />
                          {salaryString}
                        </span>
                      )}

                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        Saved {formatSavedDate(item.savedAt)}
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
                    <button
                      type="button"
                      onClick={() => handleRemove(item.jobId)}
                      disabled={isRemoving}
                      aria-label="Remove saved job"
                      title="Remove from saved jobs"
                      className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {job.applicationUrl && !isExpired && (
                      <a
                        href={job.applicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shadow-xs"
                      >
                        <span>Apply</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <Link href={`/jobs/${job.id}`}>
                      <Button variant="outline" size="sm" className="text-xs">
                        <span>Details</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
