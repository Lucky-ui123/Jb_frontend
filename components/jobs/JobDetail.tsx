import Link from "next/link";
import { JobDetailItem } from "@/types";
import { RelatedJobSummary } from "@/types";
import { RelatedJobsSection } from "./RelatedJobsSection";
import { ApplyButton } from "./ApplyButton";
import { SaveButton } from "./SaveButton";
import { JobDescription } from "./JobDescription";
import { AdPlacement } from "@/components/ads";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  MapPin,
  Calendar,
  DollarSign,
  Layers,
  Sparkles,
  ArrowLeft,
  Globe,
  ShieldCheck,
  Building2,
} from "lucide-react";

export interface JobDetailProps {
  job: JobDetailItem;
  hasApplied?: boolean;
  relatedJobs?: RelatedJobSummary[];
}

function formatSalary(salary: JobDetailItem["salary"]): string | null {
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
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
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

export function JobDetail({ job, hasApplied = false, relatedJobs = [] }: JobDetailProps) {
  const salaryDisplay = formatSalary(job.salary);
  const companyInitial = job.company.name ? job.company.name.charAt(0).toUpperCase() : "C";

  return (
    <div className="space-y-8">
      {/* Back to Jobs & Breadcrumbs Navigation */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-muted-foreground">
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-primary" />
            <span>Back to Jobs</span>
          </Link>
          <span className="text-border">/</span>
          <Link
            href={`/companies/${job.company.slug}`}
            className="hover:text-foreground transition-colors truncate max-w-[150px] sm:max-w-[200px]"
          >
            {job.company.name}
          </Link>
          <span className="text-border">/</span>
          <span className="text-foreground font-semibold truncate max-w-[180px] sm:max-w-[300px]">
            {job.title}
          </span>
        </div>
      </nav>

      {/* Main Grid: Job Content (Left) + Apply/Company Card (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Job Description & Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <Card className="p-6 sm:p-8 space-y-6 border-border/80 shadow-sm">
            <div className="flex items-start gap-4">
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 border border-border flex items-center justify-center font-bold text-xl sm:text-2xl text-foreground shrink-0 shadow-inner"
                aria-hidden="true"
              >
                {companyInitial}
              </div>

              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/companies/${job.company.slug}`}
                    className="font-semibold text-sm sm:text-base text-muted-foreground hover:text-primary hover:underline flex items-center gap-1 transition-colors"
                  >
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span>{job.company.name}</span>
                  </Link>
                  <Badge variant="verified" size="sm">
                    <ShieldCheck className="w-3 h-3 mr-1" />
                    <span>Direct ATS Verified</span>
                  </Badge>
                </div>

                <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-foreground tracking-tight leading-tight">
                  {job.title}
                </h1>
              </div>
            </div>

            {/* Semantic Meta Badges */}
            <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-border/60">
              <Badge variant={getWorkModeBadgeVariant(job.workMode)} size="md">
                {formatWorkModeLabel(job.workMode)}
              </Badge>

              <Badge variant="employment" size="md">
                {formatEmploymentTypeLabel(job.employmentType)}
              </Badge>

              {job.seniority && (
                <Badge variant="seniority" size="md">
                  {job.seniority}
                </Badge>
              )}

              {salaryDisplay && (
                <Badge variant="salary" size="md">
                  <DollarSign className="w-3.5 h-3.5 mr-0.5" />
                  <span>{salaryDisplay}</span>
                </Badge>
              )}

              {job.location && (
                <div className="inline-flex items-center gap-1 text-xs sm:text-sm text-muted-foreground px-2 py-1">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <span>{job.location}</span>
                </div>
              )}

              <div className="inline-flex items-center gap-1 text-xs sm:text-sm text-muted-foreground px-2 py-1">
                <Calendar className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <span>Posted {formatPostedDate(job.postedAt)}</span>
              </div>
            </div>

            {/* AI Overview Banner (strictly secondary) */}
            {job.aiSummary && (
              <div className="p-4 sm:p-5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/50 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
                    <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span>AI Overview</span>
                  </div>
                  <Badge variant="ai" size="sm">
                    AI Summary
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {job.aiSummary}
                </p>
                <p className="text-[11px] text-muted-foreground italic">
                  Concise summary generated from the employer-provided posting. The official description below is authoritative.
                </p>
              </div>
            )}

            {/* Skills & Tech Stack */}
            {job.skills && job.skills.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Required & Relevant Skills</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="primary" size="md">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Mobile Apply CTA (Visible on < lg screens) */}
          <div className="lg:hidden">
            <Card className="p-5 border-border/80 shadow-sm space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-foreground">Apply for this position</h3>
                <p className="text-xs text-muted-foreground">
                  Apply directly with {job.company.name} on their official career portal.
                </p>
              </div>
              <div className="space-y-3">
                <ApplyButton
                  jobId={job.id}
                  applicationUrl={job.applicationUrl}
                  initialHasApplied={hasApplied}
                />
                <SaveButton
                  jobId={job.id}
                  variant="button"
                  className="w-full"
                />
              </div>
            </Card>
          </div>

          {/* Official Job Description Card */}
          <Card className="p-6 sm:p-8 space-y-6 border-border/80 shadow-sm">
            <div className="space-y-1 border-b border-border/60 pb-4">
              <h2 className="text-lg sm:text-xl font-bold text-foreground">
                Job Description
              </h2>
              <p className="text-xs text-muted-foreground">
                Authoritative posting from {job.company.name}&apos;s official ATS feed
              </p>
            </div>

            {/* Sanitized Rich ATS Description */}
            <JobDescription description={job.description} />
          </Card>

          {/* Direct ATS Verification & Trust Guarantee Box */}
          <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/70 dark:border-blue-900/60 space-y-3">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>Direct ATS Verification Guarantee</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              This role was crawled directly from <strong>{job.company.name}&apos;s</strong> official ATS system. Portal automatically verifies active status every few hours to eliminate ghost jobs and expired postings.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1 border-t border-blue-200/50 dark:border-blue-900/40">
              <span>Source: Official Career Feed</span>
              <span>•</span>
              <span>Verification Status: Active & Confirmed</span>
            </div>
          </div>

          {/* Related Jobs Section */}
          <RelatedJobsSection relatedJobs={relatedJobs} />

          {/* Job Detail Footer Ad Placement */}
          <div className="pt-2">
            <AdPlacement location="JOB_DETAIL_FOOTER" />
          </div>
        </div>

        {/* Right Column: Sticky Sidebar with Apply CTA & Company Info */}
        <div className="space-y-6 lg:sticky lg:top-24">
          {/* Apply CTA Card (Desktop) */}
          <div className="hidden lg:block">
            <Card className="p-6 shadow-sm space-y-6 border-border/80">
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-foreground">Apply for this position</h3>
                <p className="text-xs text-muted-foreground">
                  Apply directly with {job.company.name} on their official career portal.
                </p>
              </div>

              <div className="space-y-3">
                <ApplyButton
                  jobId={job.id}
                  applicationUrl={job.applicationUrl}
                  initialHasApplied={hasApplied}
                />
                <SaveButton
                  jobId={job.id}
                  variant="button"
                  className="w-full"
                />
              </div>
            </Card>
          </div>

          {/* Company Card */}
          <Card className="p-6 shadow-sm space-y-4 border-border/80">
            <CardHeader className="p-0">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                About {job.company.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0 space-y-3 text-xs sm:text-sm text-muted-foreground">
              {job.company.description && (
                <p className="line-clamp-5 leading-relaxed">{job.company.description}</p>
              )}

              {job.company.websiteUrl && (
                <a
                  href={job.company.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary hover:underline font-medium pt-1"
                >
                  <Globe className="w-4 h-4" />
                  <span>Official Company Website</span>
                </a>
              )}

              <div className="pt-3 border-t border-border/60 flex flex-col gap-2">
                <Link
                  href={`/companies/${job.company.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-semibold"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>View All Openings at {job.company.name}</span>
                </Link>

                <Link
                  href={`/companies/compare?slugs=${job.company.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>View Hiring & Tech Intelligence</span>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Job Detail Sidebar Ad Placement */}
          <AdPlacement location="JOB_DETAIL_SIDEBAR" />
        </div>
      </div>

      {/* Floating Bottom Apply Bar for Mobile screens (< lg) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border p-3 sm:p-4 shadow-lg flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-foreground truncate">{job.title}</p>
          <p className="text-[11px] text-muted-foreground truncate">{job.company.name}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <SaveButton jobId={job.id} size="sm" />
          <ApplyButton
            jobId={job.id}
            applicationUrl={job.applicationUrl}
            initialHasApplied={hasApplied}
          />
        </div>
      </div>
    </div>
  );
}

