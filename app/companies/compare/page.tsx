import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CompareCompaniesService, ListCompaniesService } from "@/lib/services";

import { CompanyComparisonView } from "@/components/companies";

export const metadata: Metadata = {
  title: "Compare Companies Side-by-Side | Tech Employer Intelligence",
  description:
    "Factually compare verified employers on hiring volume, 30-day velocity, remote friendliness, salary transparency, and tech stack overlap directly from official ATS data.",
};

interface ComparePageProps {
  searchParams: Promise<{
    slugs?: string;
  }>;
}

export default async function CompanyComparePage({ searchParams }: ComparePageProps) {
  const { slugs: rawSlugs } = await searchParams;

  const initialSlugs = (rawSlugs || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const compareService = new CompareCompaniesService();
  const comparisonResult = await compareService.execute(initialSlugs);

  // List available verified companies for suggestions and dropdown
  const listService = new ListCompaniesService();
  const { companies: availableList } = await listService.execute({ limit: 50 });

  const availableCompanies = availableList.map((c) => ({
    name: c.name,
    slug: c.slug,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main id="main-content" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <CompanyComparisonView
          comparison={comparisonResult}
          initialSlugs={initialSlugs}
          availableCompanies={availableCompanies}
        />
      </main>

      <Footer />
    </div>
  );
}

