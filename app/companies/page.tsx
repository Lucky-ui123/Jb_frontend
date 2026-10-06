import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DiscoverCompaniesService } from "@/lib/services";
import { CompanyDiscoveryClient } from "@/components/companies";
import { AdPlacement } from "@/components/ads";
import { Badge } from "@/components/ui/Badge";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Tech Company Intelligence & Direct ATS Directory | Portal",
  description:
    "Explore verified technology employers and analyze real-time hiring velocity, workplace distribution, salary transparency, and tech stacks directly from official ATS feeds.",
};

interface CompaniesPageProps {
  searchParams: Promise<{
    q?: string;
    workMode?: string;
    velocity?: string;
    grade?: string;
    sortBy?: string;
  }>;
}

export default async function CompaniesPage({ searchParams }: CompaniesPageProps) {
  const { q, workMode, velocity, grade, sortBy } = await searchParams;

  const discoveryService = new DiscoverCompaniesService();
  const discoveryResult = await discoveryService.execute({
    search: q,
    workMode: workMode as "remote" | "hybrid" | "onsite" | undefined,
    velocity: velocity as "rapid_expansion" | "steady_hiring" | "selective" | "minimal" | "inactive" | undefined,
    compensationGrade: grade as "VERY_HIGH" | "HIGH" | "MODERATE" | "LOW" | "NONE" | undefined,
    sortBy: (sortBy as "active_jobs" | "hiring_velocity" | "salary_transparency" | "remote_score" | "confidence" | "name") || "active_jobs",
    limit: 50,
  });

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main id="main-content" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
        {/* Header & Description */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="verified" size="md">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              <span>Direct ATS Employer Intelligence</span>
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
            Hiring Companies & Intelligence Directory
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-3xl leading-relaxed">
            Discover verified employers hiring directly on official ATS portals. Analyze factual hiring velocity, remote friendliness, salary transparency, and tech stacks — zero ghost postings.
          </p>
        </div>

        {/* Discovery Client with Filters, Grid, and Comparison Tray */}
        <CompanyDiscoveryClient
          initialSnapshots={discoveryResult.items}
          facets={discoveryResult.facets}
          initialQuery={{
            search: q,
            workMode,
            velocity,
            compensationGrade: grade,
            sortBy,
          }}
        />

        {/* Ad Placement: Bottom Leaderboard */}
        <div className="pt-4">
          <AdPlacement location="COMPANY_COMPARE_BOTTOM" />
        </div>
      </main>

      <Footer />
    </div>
  );
}

