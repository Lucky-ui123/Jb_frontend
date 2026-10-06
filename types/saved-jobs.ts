export interface SavedJobCompanySummary {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  websiteUrl: string | null;
}

export interface SavedJobWithDetails {
  id: string;
  userId: string;
  jobId: string;
  savedAt: Date;
  job: {
    id: string;
    title: string;
    company: SavedJobCompanySummary;
    locationRaw: string | null;
    workplaceType: "remote" | "hybrid" | "onsite" | "unknown";
    jobType: "full_time" | "part_time" | "contract" | "internship" | "temporary" | "other";
    salaryMin: number | null;
    salaryMax: number | null;
    salaryCurrency: string | null;
    salaryInterval: string | null;
    lifecycleStatus: "discovered" | "processing" | "active" | "expired" | "removed";
    canonicalUrl: string | null;
    applicationUrl: string | null;
    publishedAt: Date | null;
  };
}
