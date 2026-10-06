import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GetCompanyIntelligenceService, GetCompanyJobsService } from "@/lib/services";

import { CompanyIntelligenceProfile } from "@/components/companies";

export const dynamic = "force-dynamic";

interface CompanyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CompanyPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const intelligenceService = new GetCompanyIntelligenceService();
    const snapshot = await intelligenceService.execute(slug);

    if (!snapshot) {
      return {
        title: "Company Not Found | Job Portal",
        description: "The requested company intelligence profile could not be found.",
      };
    }

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://jobs.encrew.in").replace(/\/+$/, "");
    const pageTitle = `${snapshot.identity.name} Hiring Intelligence, Tech Stack & Careers | Direct ATS`;
    const pageDesc = snapshot.profile.description
      ? snapshot.profile.description.slice(0, 160)
      : `Explore verified hiring intelligence, tech stack footprint, salary transparency, and active verified jobs at ${snapshot.identity.name}.`;

    return {
      title: pageTitle,
      description: pageDesc,
      alternates: {
        canonical: `${siteUrl}/companies/${snapshot.identity.slug}`,
      },
      openGraph: {
        title: pageTitle,
        description: pageDesc,
        url: `${siteUrl}/companies/${snapshot.identity.slug}`,
        siteName: "Job Portal",
        type: "website",
      },
    };
  } catch (err) {
    console.error("[CompanyPage.generateMetadata] Error:", err);
    return {
      title: "Company Intelligence | Portal",
      description: "Verified tech employer directory and hiring intelligence.",
    };
  }
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { slug } = await params;

  let snapshot: Awaited<ReturnType<GetCompanyIntelligenceService["execute"]>> = null;
  try {
    const intelligenceService = new GetCompanyIntelligenceService();
    snapshot = await intelligenceService.execute(slug);
  } catch (err) {
    console.error("[CompanyPage] Error fetching snapshot:", err);
    notFound();
  }

  if (!snapshot) {
    notFound();
  }

  let companyJobs: Awaited<ReturnType<GetCompanyJobsService["execute"]>>["jobs"] = [];
  let total = 0;

  try {
    const companyJobsService = new GetCompanyJobsService();
    const res = await companyJobsService.execute({
      companyId: snapshot.identity.id,
      limit: 50,
    });
    companyJobs = res.jobs;
    total = res.total;
  } catch (err) {
    console.error("[CompanyPage] Error fetching company jobs:", err);
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main id="main-content" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <CompanyIntelligenceProfile
          snapshot={snapshot}
          jobs={companyJobs}
          totalJobs={total}
        />
      </main>

      <Footer />
    </div>
  );
}

