import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JobDetail } from "@/components/jobs/JobDetail";
import { JobPostingJsonLd } from "@/components/jobs/JobPostingJsonLd";
import { JobViewTracker } from "@/components/jobs/JobViewTracker";
import { GetJobService, GetRelatedJobsService, GetApplicationStatusService } from "@/lib/services";
import { RelatedJobSummary } from "@/types";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

interface JobDetailPageProps {
  params: Promise<{
    jobId: string;
  }>;
}

export async function generateMetadata({
  params,
}: JobDetailPageProps): Promise<Metadata> {
  try {
    const { jobId } = await params;
    const getJobService = new GetJobService();
    const job = await getJobService.getById(jobId);

    if (!job) {
      return {
        title: "Job Not Found | Portal",
        description: "This job posting could not be found or is no longer active.",
      };
    }

    const descriptionSnippet =
      job.aiSummary ||
      job.description.slice(0, 160).replace(/\s+/g, " ").trim() + "...";

    return {
      title: `${job.title} at ${job.company.name} | Portal`,
      description: descriptionSnippet,
      alternates: {
        canonical: `/jobs/${job.id}`,
      },
      openGraph: {
        title: `${job.title} at ${job.company.name}`,
        description: descriptionSnippet,
        type: "website",
      },
    };
  } catch (err) {
    console.error("[JobDetailPage.generateMetadata] Error:", err);
    return {
      title: "Job Details | Portal",
      description: "Direct-from-source verified job listing",
    };
  }
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { jobId } = await params;

  const getJobService = new GetJobService();
  const job = await getJobService.getById(jobId);

  if (!job) {
    notFound();
  }

  // 2. Parallel fetch for application status and related jobs
  let hasApplied = false;
  let relatedJobs: RelatedJobSummary[] = [];

  try {
    const user = await getCurrentUser();
    const appStatusService = new GetApplicationStatusService();
    const relatedJobsService = new GetRelatedJobsService();

    const [appliedRes, relatedRes] = await Promise.all([
      appStatusService.hasApplied(user?.id, job.id),
      relatedJobsService.execute(job.id, 4),
    ]);
    hasApplied = appliedRes;
    relatedJobs = relatedRes;
  } catch (err) {
    console.error("[JobDetailPage] Error fetching supplemental job data:", err);
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <JobPostingJsonLd job={job} />
      <JobViewTracker jobId={job.id} />
      <Header />

      <main id="main-content" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <JobDetail job={job} hasApplied={hasApplied} relatedJobs={relatedJobs} />
      </main>

      <Footer />
    </div>
  );
}
