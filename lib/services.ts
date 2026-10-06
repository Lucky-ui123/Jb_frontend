/**
 * FRONTEND PREVIEW SERVICES
 * Lightweight, in-memory operations over isolated mock datasets for rendering UI.
 */
import {
  JobDetailItem,
  SearchJobItem,
  SearchJobsQuery,
  SearchJobsResponse,
  JobSortOption,
  CompanyItem,
  CompanyJobSummary,
  CompanySignalSnapshot,
  CompanyDiscoveryQuery,
  CompanyDiscoveryResult,
  CompanyComparisonResult,
  JobPostingJsonLd,
  RelatedJobSummary,
  SavedJobWithDetails,
  ViewedJobWithDetails,
  AppliedJobWithDetails,
  SavedSearchRecord,
  JobAlertRecord,
} from "@/types";
import {
  MOCK_JOBS,
  mapJobToSearchItem,
  MOCK_COMPANIES,
  MOCK_COMPANY_JOBS,
  MOCK_SNAPSHOTS,
  MOCK_SAVED_JOBS,
  MOCK_VIEWED_JOBS,
  MOCK_APPLIED_JOBS,
  MOCK_SAVED_SEARCHES,
  MOCK_JOB_ALERTS,
} from "@/mock-data";

// 1. Search Jobs Service
export class SearchJobsService {
  async search(rawQuery: Partial<SearchJobsQuery> = {}): Promise<SearchJobsResponse> {
    let items: SearchJobItem[] = MOCK_JOBS.map(mapJobToSearchItem);

    if (rawQuery.text) {
      const q = rawQuery.text.toLowerCase();
      items = items.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.name.toLowerCase().includes(q) ||
          j.skills.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (rawQuery.workMode) {
      const modes = Array.isArray(rawQuery.workMode)
        ? rawQuery.workMode
        : [rawQuery.workMode];
      items = items.filter((j) => modes.includes(j.workMode as any));
    }

    if (rawQuery.employmentType) {
      const types = Array.isArray(rawQuery.employmentType)
        ? rawQuery.employmentType
        : [rawQuery.employmentType];
      items = items.filter((j) => types.includes(j.employmentType as any));
    }

    if (rawQuery.seniority) {
      const sens = (Array.isArray(rawQuery.seniority) ? rawQuery.seniority : [rawQuery.seniority]) as any[];
      items = items.filter((j) => j.seniority && sens.includes(j.seniority));
    }

    const page = rawQuery.page || 1;
    const pageSize = rawQuery.pageSize || 20;
    const total = items.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return {
      data: items,
      pagination: {
        page,
        pageSize,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }
}

// 2. Get Job Detail Service
export class GetJobService {
  async getById(id: string): Promise<JobDetailItem | null> {
    const found = MOCK_JOBS.find((j) => j.id === id);
    if (found) return found;

    // Fallback dynamic mock if unknown id requested in design preview
    return {
      ...MOCK_JOBS[0],
      id,
      title: `Software Engineer (${id})`,
    };
  }
}

// 3. Related Jobs Service
export class RelatedJobsService {
  async execute(jobId: string, limit = 4): Promise<RelatedJobSummary[]> {
    const otherJobs = MOCK_JOBS.filter((j) => j.id !== jobId);
    return otherJobs.slice(0, limit).map((job) => ({
      id: job.id,
      title: job.title,
      company: {
        id: job.company.slug || job.id,
        name: job.company.name,
        slug: job.company.slug,
        logoUrl: job.company.logoUrl || null,
      },
      location: job.location,
      workplaceType: job.workMode,
      jobType: job.employmentType,
      seniority: job.seniority,
      category: job.category,
      skills: job.skills,
      salaryMin: job.salary?.min || null,
      salaryMax: job.salary?.max || null,
      salaryInterval: job.salary?.interval || null,
      publishedAt: job.postedAt,
      similarityScore: 88,
    }));
  }

  async getRelatedJobs(jobId: string, limit = 4): Promise<RelatedJobSummary[]> {
    return this.execute(jobId, limit);
  }
}

export const GetRelatedJobsService = RelatedJobsService;

export function calculateJobSimilarityScore(): number {
  return 88;
}

// 4. Company Directory Services
export class ListCompaniesService {
  async execute(params: { limit?: number; offset?: number } = {}) {
    const limit = params.limit || 50;
    return {
      companies: MOCK_COMPANIES.slice(0, limit),
      total: MOCK_COMPANIES.length,
    };
  }
}

export class GetCompanyJobsService {
  async execute(params: { companyId: string; limit?: number }) {
    const jobs = MOCK_COMPANY_JOBS[params.companyId] || [
      {
        id: "job-comp-1",
        title: "Senior Full Stack Engineer",
        location: "San Francisco, CA (or Remote)",
        workMode: "remote",
        employmentType: "full_time",
        seniority: "Senior",
        salaryMin: 170000,
        salaryMax: 220000,
        salaryCurrency: "USD",
        salaryInterval: "yearly",
        sourcePostedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        firstDiscoveredAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      },
    ];

    return {
      jobs,
      total: jobs.length,
    };
  }
}

export class DiscoverCompaniesService {
  async execute(params: Partial<CompanyDiscoveryQuery> = {}): Promise<CompanyDiscoveryResult> {
    let items = [...MOCK_SNAPSHOTS];

    if (params.search) {
      const q = params.search.toLowerCase();
      items = items.filter(
        (c) =>
          c.identity.name.toLowerCase().includes(q) ||
          (c.profile.industry && c.profile.industry.toLowerCase().includes(q))
      );
    }

    if (params.limit) {
      items = items.slice(0, params.limit);
    }

    const facets = {
      industries: { "Fintech & Payments": 1, "Cloud Infrastructure & Cybersecurity": 1 },
      workModes: { remote: 2, hybrid: 2, onsite: 1 },
      compensationGrades: { VERY_HIGH: 1, HIGH: 1 },
      velocities: { rapid_expansion: 1, steady_hiring: 1 },
    };

    return {
      items,
      total: items.length,
      limit: params.limit || 50,
      offset: params.offset || 0,
      filtersApplied: params,
      facets,
    };
  }
}

export class GetCompanyIntelligenceService {
  async execute(slug: string): Promise<CompanySignalSnapshot | null> {
    const found = MOCK_SNAPSHOTS.find((c) => c.identity.slug === slug);
    if (found) return found;

    return {
      ...MOCK_SNAPSHOTS[0],
      identity: {
        ...MOCK_SNAPSHOTS[0].identity,
        name: slug.charAt(0).toUpperCase() + slug.slice(1),
        slug,
      },
    };
  }
}

export class CompareCompaniesService {
  async execute(slugs: string[]): Promise<CompanyComparisonResult> {
    const targetSlugs = slugs.length > 0 ? slugs : ["stripe", "cloudflare"];
    const matched = MOCK_SNAPSHOTS.filter((s) => targetSlugs.includes(s.identity.slug));
    const companies = matched.length > 0 ? matched : MOCK_SNAPSHOTS.slice(0, 2);

    return {
      companies,
      volumeComparison: companies.map((c) => ({
        companyId: c.identity.id,
        slug: c.identity.slug,
        name: c.identity.name,
        activeJobs: c.hiring.activeJobCount,
        newJobsLast30Days: c.hiring.newJobsLast30Days,
        velocity: c.hiring.hiringVelocity,
        accelerationStatus: c.hiringReport?.velocityTrend.accelerationStatus || "STABLE",
      })),
      workplaceComparison: companies.map((c) => ({
        companyId: c.identity.id,
        slug: c.identity.slug,
        name: c.identity.name,
        remotePct: c.distributions.workplace.remote.percentage,
        hybridPct: c.distributions.workplace.hybrid.percentage,
        onsitePct: c.distributions.workplace.onsite.percentage,
        remoteFriendlyScore: c.hiring.geographicFootprint?.remoteFriendlyScore || 80,
        remoteTrend: "INCREASING",
      })),
      seniorityComparison: companies.map((c) => ({
        companyId: c.identity.id,
        slug: c.identity.slug,
        name: c.identity.name,
        leadershipPct: c.distributions.seniority.senior.percentage + c.distributions.seniority.lead.percentage,
        midLevelPct: c.distributions.seniority.mid.percentage,
        earlyCareerPct: c.distributions.seniority.entry.percentage,
        primarySeniorityShift: "UPWARD_EXPANSION",
      })),
      compensationComparison: companies.map((c) => ({
        companyId: c.identity.id,
        slug: c.identity.slug,
        name: c.identity.name,
        transparencyRate: c.compensation.transparencyRate,
        grade: c.compensation.grade,
        observedMinSalary: c.compensation.observedMinSalary,
        observedMaxSalary: c.compensation.observedMaxSalary,
        observedMedianSalary: c.compensation.observedMedianSalary,
        currency: c.compensation.currency,
      })),
      skillComparison: {
        sharedSkills: ["React", "TypeScript", "PostgreSQL"],
        companySkills: companies.map((c) => ({
          companyId: c.identity.id,
          slug: c.identity.slug,
          name: c.identity.name,
          topSkills: c.hiring.topSkillsInDemand.map((s) => s.skill),
          uniqueSkills: [],
        })),
      },
      geographyComparison: companies.map((c) => ({
        companyId: c.identity.id,
        slug: c.identity.slug,
        name: c.identity.name,
        primaryHubs: c.hiring.geographicFootprint?.primaryHubs.map((h) => h.location) || [],
        totalLocations: c.hiring.geographicFootprint?.totalDistinctLocations || 4,
        remoteFriendlyScore: c.hiring.geographicFootprint?.remoteFriendlyScore || 80,
      })),
      leaders: {
        highestVolumeCompany: companies[0]?.identity.name || "Stripe",
        fastestGrowingCompany: companies[0]?.identity.name || "Stripe",
        mostRemoteFriendlyCompany: companies[0]?.identity.name || "Stripe",
        highestCompensationTransparencyCompany: companies[0]?.identity.name || "Stripe",
        broadestSkillFootprintCompany: companies[0]?.identity.name || "Stripe",
      },
      evidence: "FACT",
      comparedAt: new Date(),
    };
  }
}

// 5. User Activity, Saved Jobs & Application Services
export class ListSavedJobsService {
  async execute(_userId?: string): Promise<SavedJobWithDetails[]> {
    return MOCK_SAVED_JOBS;
  }
}

export class ListUserActivityService {
  async getAppliedJobs(_userId?: string): Promise<AppliedJobWithDetails[]> {
    return MOCK_APPLIED_JOBS;
  }

  async getViewedJobs(_userId?: string): Promise<ViewedJobWithDetails[]> {
    return MOCK_VIEWED_JOBS;
  }

  async execute(_userId?: string) {
    return {
      viewed: MOCK_VIEWED_JOBS,
      applied: MOCK_APPLIED_JOBS,
    };
  }
}

export class ListSavedSearchesService {
  async execute(_userId?: string): Promise<SavedSearchRecord[]> {
    return MOCK_SAVED_SEARCHES;
  }
}

export class ListJobAlertsService {
  async execute(_userId?: string): Promise<JobAlertRecord[]> {
    return MOCK_JOB_ALERTS;
  }
}

export class GetApplicationStatusService {
  async hasApplied(_userId?: string, _jobId?: string): Promise<boolean> {
    return false;
  }
}

// 6. Job Posting Schema Mapper
export function mapJobDetailToJobPostingJsonLd(
  job: JobDetailItem,
  canonicalUrl?: string
): JobPostingJsonLd {
  const canonicalJobUrl = canonicalUrl || job.canonicalUrl;
  const datePosted = job.postedAt instanceof Date ? job.postedAt.toISOString() : new Date().toISOString();

  const hiringOrganization = {
    "@type": "Organization" as const,
    name: job.company.name?.trim() || "Employer",
    ...(job.company.websiteUrl ? { sameAs: job.company.websiteUrl.trim() } : {}),
    ...(job.company.logoUrl ? { logo: job.company.logoUrl.trim() } : {}),
  };

  const jsonLd: JobPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: (job.originalTitle || job.title).trim(),
    description: job.description,
    datePosted,
    hiringOrganization,
    identifier: {
      "@type": "PropertyValue",
      name: job.company.name?.trim() || "Employer",
      value: job.id,
    },
    url: canonicalJobUrl,
  };

  return jsonLd;
}
