export type ActivityLifecycleStatus =
  | "discovered"
  | "processing"
  | "active"
  | "expired"
  | "removed";

export type ActivityWorkplaceType = "remote" | "hybrid" | "onsite" | "unknown";

export type ActivityJobType =
  | "full_time"
  | "part_time"
  | "contract"
  | "internship"
  | "temporary"
  | "other";

export interface ActivityCompanySummary {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  websiteUrl: string | null;
}

export interface ActivityJobSummary {
  id: string;
  title: string;
  company: ActivityCompanySummary;
  locationRaw: string | null;
  workplaceType: ActivityWorkplaceType;
  jobType: ActivityJobType;
  lifecycleStatus: ActivityLifecycleStatus;
  canonicalUrl: string | null;
  applicationUrl: string | null;
  publishedAt: Date | null;
}

export interface ViewedJobWithDetails {
  id: string;
  userId: string;
  jobId: string;
  viewCount: number;
  firstViewedAt: Date;
  lastViewedAt: Date;
  job: ActivityJobSummary;
}

export interface AppliedJobWithDetails {
  id: string;
  userId: string;
  jobId: string;
  sourceUrl: string;
  initiatedAt: Date;
  metadata: Record<string, unknown>;
  job: ActivityJobSummary;
}

export interface BatchActivityStatus {
  savedIds: Set<string>;
  appliedIds: Set<string>;
  viewedIds: Set<string>;
}
