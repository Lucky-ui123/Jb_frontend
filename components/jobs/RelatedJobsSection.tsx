import Link from "next/link";
import { RelatedJobSummary } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Sparkles,
  Building2,
  MapPin,
  DollarSign,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export interface RelatedJobsSectionProps {
  relatedJobs: RelatedJobSummary[];
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

export function RelatedJobsSection({ relatedJobs }: RelatedJobsSectionProps) {
  if (!relatedJobs || relatedJobs.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4 pt-4 border-t border-border/60">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              Related Positions
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Active tech openings matching this role, skill set, and experience level
          </p>
        </div>

        <Link
          href="/jobs"
          className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
        >
          <span>Explore All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {relatedJobs.map((item) => {
          const salaryDisplay = formatSalary(item);
          const companyInitial = item.company.name ? item.company.name.charAt(0).toUpperCase() : "C";

          return (
            <Card
              key={item.id}
              className="p-4 sm:p-5 border-border/80 hover:border-primary/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 border border-border flex items-center justify-center font-bold text-sm text-foreground shrink-0 shadow-inner"
                    aria-hidden="true"
                  >
                    {companyInitial}
                  </div>

                  <div className="min-w-0 space-y-0.5">
                    <Link
                      href={`/jobs/${item.id}`}
                      className="font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors line-clamp-1"
                    >
                      {item.title}
                    </Link>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Link
                        href={`/companies/${item.company.slug}`}
                        className="font-medium text-foreground hover:text-primary hover:underline flex items-center gap-1 truncate transition-colors"
                      >
                        <Building2 className="w-3 h-3 text-muted-foreground shrink-0" />
                        <span>{item.company.name}</span>
                      </Link>

                      {item.location && (
                        <span className="flex items-center gap-0.5 truncate">
                          <MapPin className="w-3 h-3 shrink-0" />
                          {item.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <Badge variant="secondary" size="sm">
                    {item.workplaceType}
                  </Badge>

                  {salaryDisplay && (
                    <Badge variant="salary" size="sm">
                      <DollarSign className="w-3 h-3 mr-0.5" />
                      <span>{salaryDisplay}</span>
                    </Badge>
                  )}

                  {item.skills.slice(0, 2).map((skill) => (
                    <Badge key={skill} variant="outline" size="sm" className="text-[10px]">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-border/50 flex items-center justify-between text-xs">
                <span className="text-muted-foreground capitalize">
                  {item.jobType.replace(/_/g, " ")}
                </span>

                <Link
                  href={`/jobs/${item.id}`}
                  className="font-semibold text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>View Details</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

