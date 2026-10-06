export interface CompanyItem {
  id: string;
  name: string;
  slug: string;
  domain?: string | null;
  websiteUrl?: string | null;
  logoUrl?: string | null;
  description?: string | null;
  industry?: string | null;
  headquarters?: string | null;
  employeeCount?: number | null;
  isVerified?: boolean;
}

export interface CompanyJobSummary {
  id: string;
  title: string;
  location: string | null;
  workMode: string;
  employmentType: string;
  seniority: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string | null;
  salaryInterval: string | null;
  sourcePostedAt: Date | null;
  firstDiscoveredAt: Date;
}

export type HiringVelocityTier =
  | "rapid_expansion"
  | "steady_hiring"
  | "selective"
  | "minimal"
  | "inactive";

export type CompensationGrade = "VERY_HIGH" | "HIGH" | "MODERATE" | "LOW" | "NONE";

export interface CompanySignalSnapshot {
  identity: {
    id: string;
    name: string;
    slug: string;
    domain?: string | null;
    logoUrl?: string | null;
    websiteUrl?: string | null;
    isVerified?: boolean;
    primaryAtsSource?: string | null;
  };
  profile: {
    domain?: string | null;
    industry?: string | null;
    headquarters?: string | null;
    employeeCount?: number | null;
    description?: string | null;
    techStack?: string[];
  };
  hiring: {
    activeJobCount: number;
    newJobsLast7Days?: number;
    newJobsLast30Days: number;
    newJobsLast90Days: number;
    hiringVelocity: HiringVelocityTier;
    averagePostingIntervalDays?: number;
    topSkillsInDemand: Array<{ skill: string; count: number; percentage?: number }>;
    skillDemand?: {
      topSkills?: Array<{ skill: string; count: number; percentage?: number }>;
      categoryDistribution?: Record<string, number>;
    };
    topCategories: Array<{ category: string; count: number }>;
    geographicFootprint?: {
      primaryHubs: Array<{ location: string; count?: number; activeJobCount?: number }>;
      totalDistinctLocations: number;
      remoteFriendlyScore: number;
    };
  };
  distributions: {
    seniority: {
      entry: { count: number; percentage: number };
      mid: { count: number; percentage: number };
      senior: { count: number; percentage: number };
      lead: { count: number; percentage: number };
      principal: { count: number; percentage: number };
      executive?: { count: number; percentage: number };
    };
    workplace: {
      remote: { count: number; percentage: number };
      hybrid: { count: number; percentage: number };
      onsite: { count: number; percentage: number };
    };
  };
  compensation: {
    transparencyRate: number;
    observedMinSalary?: number;
    observedMaxSalary?: number;
    observedMedianSalary?: number;
    currency: string;
    grade: CompensationGrade;
  };
  freshness?: {
    lastCalculatedAt?: Date | string;
    lastRefreshedAt?: Date | string;
    syncFrequencyHours?: number;
    isFresh?: boolean;
    dataConfidenceScore?: number;
    confidenceRating?: string;
  };
  provenance?: any;
  trendSnapshot?: any;
  hiringReport?: any;
}

export interface CompanyDiscoveryQuery {
  search?: string;
  workMode?: "remote" | "hybrid" | "onsite";
  velocity?: HiringVelocityTier;
  compensationGrade?: CompensationGrade;
  industry?: string;
  sortBy?: "active_jobs" | "hiring_velocity" | "salary_transparency" | "remote_score" | "confidence" | "name";
  limit?: number;
  offset?: number;
}

export interface CompanyDiscoveryFacets {
  industries: Record<string, number>;
  workModes: Record<string, number>;
  compensationGrades: Record<string, number>;
  velocities: Record<string, number>;
}

export interface CompanyDiscoveryResult {
  items: CompanySignalSnapshot[];
  total: number;
  limit: number;
  offset: number;
  filtersApplied: Partial<CompanyDiscoveryQuery>;
  facets: CompanyDiscoveryFacets;
}

export interface CompanyComparisonResult {
  companies: CompanySignalSnapshot[];
  volumeComparison: any[];
  workplaceComparison: any[];
  seniorityComparison: any[];
  compensationComparison: any[];
  skillComparison: {
    sharedSkills: string[];
    companySkills: Array<{
      companyId: string;
      slug: string;
      name: string;
      topSkills: string[];
      uniqueSkills: string[];
    }>;
  };
  geographyComparison: any[];
  leaders: {
    highestVolumeCompany: string;
    fastestGrowingCompany: string;
    mostRemoteFriendlyCompany: string;
    highestCompensationTransparencyCompany: string;
    broadestSkillFootprintCompany: string;
  };
  evidence: "FACT";
  comparedAt: Date;
}
