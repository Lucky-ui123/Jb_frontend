import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JobSearchForm } from "@/components/jobs/JobSearchForm";
import { JobFilters } from "@/components/jobs/JobFilters";
import { JobList } from "@/components/jobs/JobList";
import { SearchJobsService } from "@/lib/services";
import { SearchJobsQuery, JobSortOption } from "@/types";

export const dynamic = "force-dynamic";

interface JobsPageProps {
  searchParams: Promise<{
    q?: string;
    location?: string;
    workMode?: string | string[];
    employmentType?: string | string[];
    seniority?: string | string[];
    category?: string;
    salaryMin?: string;
    salaryMax?: string;
    sort?: string;
    page?: string;
    pageSize?: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: JobsPageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = params.q ? `"${params.q}"` : "Tech Jobs";
  const location = params.location ? ` in ${params.location}` : "";

  return {
    title: `${query}${location} | Portal Job Discovery`,
    description: `Discover active, direct-from-source ${query}${location}. Authoritative ATS job listings with automated verification.`,
    openGraph: {
      title: `${query}${location} | Portal`,
      description: `Browse verified tech job openings on Portal.`,
    },
  };
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const params = await searchParams;

  const page = params.page ? parseInt(params.page, 10) : 1;
  const pageSize = params.pageSize ? parseInt(params.pageSize, 10) : 20;

  const searchQuery: Partial<SearchJobsQuery> = {
    text: params.q || undefined,
    location: params.location || undefined,
    workMode: params.workMode as SearchJobsQuery["workMode"],
    employmentType: params.employmentType as SearchJobsQuery["employmentType"],
    seniority: params.seniority as SearchJobsQuery["seniority"],
    category: params.category || undefined,
    salaryMin: params.salaryMin ? Number(params.salaryMin) : undefined,
    salaryMax: params.salaryMax ? Number(params.salaryMax) : undefined,
    sort: (params.sort as JobSortOption) || undefined,
    page: isNaN(page) || page < 1 ? 1 : page,
    pageSize: isNaN(pageSize) || pageSize < 1 || pageSize > 50 ? 20 : pageSize,
  };

  const searchService = new SearchJobsService();
  let searchResult;

  try {
    searchResult = await searchService.search(searchQuery);
  } catch (error) {
    console.error("[JobsPage] Error executing SearchJobsService:", error);
    searchResult = {
      data: [],
      pagination: {
        page: 1,
        pageSize: 20,
        total: 0,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main id="main-content" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top Search Header */}
        <section className="space-y-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Discover Authoritative Tech Jobs
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Authoritative listings verified directly from employer ATS feeds
            </p>
          </div>

          <JobSearchForm
            initialQuery={params.q || ""}
            initialLocation={params.location || ""}
          />
        </section>

        {/* Results Layout: Sidebar Filters + Main Job List */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Left Column: Filters (Sticky on desktop) */}
          <div className="lg:col-span-1 lg:sticky lg:top-24">
            <JobFilters
              currentWorkMode={params.workMode}
              currentEmploymentType={params.employmentType}
              currentSeniority={params.seniority}
              currentSort={(params.sort as JobSortOption) || "newest"}
            />
          </div>

          {/* Right Column: Search Results */}
          <div className="lg:col-span-3">
            <JobList
              jobs={searchResult.data}
              pagination={searchResult.pagination}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

