import Link from "next/link";
import { SearchJobItem } from "@/types";
import { JobMatchResult } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SaveButton } from "./SaveButton";
import {
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Check,
} from "lucide-react";

export interface JobCardProps {
  job: SearchJobItem & { matchResult?: JobMatchResult };
  hasApplied?: boolean;
  initialIsSaved?: boolean;
}

function formatSalary(salary: SearchJobItem["salary"]): string | null {
  if (!salary || (!salary.min && !salary.max)) {
    return null;
  }

  const formatNum = (num: number) => {
    if (num >= 1000) {
      return `$${Math.round(num / 1000)}k`;
    }
    return `$${num.toLocaleString()}`;
  };

  const intervalText = salary.interval ? ` / ${salary.interval.replace("ly", "")}` : "";

  if (salary.min && salary.max) {
    if (salary.min === salary.max) {
      return `${formatNum(salary.min)}${intervalText}`;
    }
    return `${formatNum(salary.min)} – ${formatNum(salary.max)}${intervalText}`;
  }

  if (salary.min) {
    return `From ${formatNum(salary.min)}${intervalText}`;
  }

  if (salary.max) {
    return `Up to ${formatNum(salary.max)}${intervalText}`;
  }

  return null;
}

function formatPostedDate(date: Date): string {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) {
    return "Today";
  }
  if (diffDays === 1) {
    return "1d ago";
  }
  if (diffDays < 30) {
    return `${diffDays}d ago`;
  }
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function getWorkModeBadgeVariant(
  workMode: string
): "remote" | "hybrid" | "onsite" {
  if (workMode === "remote") return "remote";
  if (workMode === "hybrid") return "hybrid";
  return "onsite";
}

function formatWorkModeLabel(workMode: string): string {
  switch (workMode) {
    case "remote":
      return "Remote";
    case "hybrid":
      return "Hybrid";
    case "onsite":
      return "On-site";
    default:
      return workMode;
  }
}

function formatEmploymentTypeLabel(type: string): string {
  switch (type) {
    case "full_time":
      return "Full-Time";
    case "part_time":
      return "Part-Time";
    case "contract":
      return "Contract";
    case "internship":
      return "Internship";
    default:
      return type.replace(/_/g, " ");
  }
}

export function JobCard({ job, hasApplied = false, initialIsSaved = false }: JobCardProps) {
  const salaryDisplay = formatSalary(job.salary);
  const companyInitial = job.company.name ? job.company.name.charAt(0).toUpperCase() : "C";

  return (
    <Card
      interactive
      className="group relative p-5 sm:p-6 transition-all border-border/80 hover:border-primary/40 shadow-sm hover:shadow-md"
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* Left Column: Company monogram + title + metadata */}
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-xl bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 border border-border flex items-center justify-center font-bold text-base text-foreground shrink-0 shadow-inner group-hover:border-primary/30 transition-colors"
            aria-hidden="true"
          >
            {companyInitial}
          </div>

          <div className="space-y-1.5 min-w-0">
            {/* Title with accessible stretched link to make entire card clickable */}
            <div className="flex items-center gap-2">
              <Link
                href={`/jobs/${job.id}`}
                className="font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors focus:outline-none after:absolute after:inset-0 after:rounded-2xl"
              >
                <span>{job.title}</span>
              </Link>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-primary shrink-0 pointer-events-none" />
            </div>

            {/* Company & Core Location Meta */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-muted-foreground">
              <Link
                href={`/companies/${job.company.slug}`}
                className="font-semibold text-foreground hover:text-primary hover:underline flex items-center gap-1 relative z-10 transition-colors"
              >
                <Building2 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <span>{job.company.name}</span>
              </Link>

              {job.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  {job.location}
                </span>
              )}

              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                {formatPostedDate(job.postedAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Salary, Match Score, Authoritative Badge & Save Action */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0">
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {job.matchResult && job.matchResult.score > 0 && (
              <Badge variant="match" size="sm" className="gap-1 shadow-sm">
                <Sparkles className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                <span>{job.matchResult.score}% Match</span>
              </Badge>
            )}

            {hasApplied && (
              <Badge variant="success" size="sm" className="gap-1 font-semibold">
                <Check className="w-3 h-3 stroke-[2.5]" />
                <span>Applied</span>
              </Badge>
            )}

            <Badge variant="verified" size="sm">
              <ShieldCheck className="w-3 h-3 mr-1" />
              <span>Direct ATS</span>
            </Badge>

            <SaveButton jobId={job.id} initialIsSaved={initialIsSaved} size="sm" />
          </div>

          {salaryDisplay && (
            <Badge variant="salary" size="md">
              <DollarSign className="w-3.5 h-3.5 mr-0.5" />
              <span>{salaryDisplay}</span>
            </Badge>
          )}
        </div>
      </div>

      {/* Match Reasons Explanation Banner (if available from personalized feed) */}
      {job.matchResult && job.matchResult.matchReasons && job.matchResult.matchReasons.length > 0 && (
        <div className="mt-3 pt-2.5 border-t border-border/40 text-xs text-indigo-700 dark:text-indigo-300/90 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
          <span className="font-medium">Why this matches:</span>
          <span className="text-muted-foreground truncate">
            {job.matchResult.matchReasons.slice(0, 2).map((r) => r.description).join(" • ")}
          </span>
        </div>
      )}

      {/* AI Overview Banner (if available) */}
      {job.aiSummary && !job.matchResult && (
        <div className="mt-3.5 pt-3 border-t border-border/50 text-xs sm:text-sm text-muted-foreground flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
          <p className="line-clamp-2">{job.aiSummary}</p>
        </div>
      )}

      {/* Semantic Tags: Work mode, Employment type, Seniority, Skills */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge variant={getWorkModeBadgeVariant(job.workMode)} size="sm">
          {formatWorkModeLabel(job.workMode)}
        </Badge>
        <Badge variant="employment" size="sm">
          {formatEmploymentTypeLabel(job.employmentType)}
        </Badge>
        {job.seniority && (
          <Badge variant="seniority" size="sm">
            {job.seniority}
          </Badge>
        )}
        {job.skills?.slice(0, 3).map((skill) => (
          <Badge key={skill} variant="primary" size="sm">
            {skill}
          </Badge>
        ))}
      </div>
    </Card>
  );
}

