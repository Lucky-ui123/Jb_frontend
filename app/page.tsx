import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JobSearchForm } from "@/components/jobs/JobSearchForm";
import { JobCard } from "@/components/jobs/JobCard";
import { CompanyCard } from "@/components/companies/CompanyCard";
import { Button } from "@/components/ui/Button";
import { SearchJobsService, DiscoverCompaniesService } from "@/lib/services";
import { SearchJobItem, CompanySignalSnapshot } from "@/types";


import { AdPlacement } from "@/components/ads";
import {
  ShieldCheck,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Globe2,
  Building2,
  Briefcase,
  TrendingUp,
  UserCheck,
  CheckCircle2,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // 1. Fetch recent active authoritative jobs
  let recentJobs: SearchJobItem[] = [];
  let totalJobsCount = 0;
  try {
    const searchService = new SearchJobsService();
    const searchResult = await searchService.search({
      page: 1,
      pageSize: 8,
      sort: "newest",
    });
    recentJobs = searchResult.data;
    totalJobsCount = searchResult.pagination.total;
  } catch (error) {
    console.error("[HomePage] Error fetching recent jobs:", error);
    recentJobs = [];
  }

  // 2. Fetch featured companies with intelligence snapshots
  let featuredCompanies: CompanySignalSnapshot[] = [];
  try {
    const discoverService = new DiscoverCompaniesService();
    const discoveryResult = await discoverService.execute({
      limit: 4,
      sortBy: "active_jobs",
    });
    featuredCompanies = discoveryResult.items;
  } catch (error) {
    console.error("[HomePage] Error fetching featured companies:", error);
    featuredCompanies = [];
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main id="main-content" className="flex-1">
        {/* Hero Section — Naukri-Inspired Search Area */}
        <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-b from-blue-50/70 via-slate-50/40 to-background dark:from-slate-900/40 dark:via-background dark:to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto space-y-5">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100/80 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>100% Direct ATS Feeds • Zero Ghost Jobs Guaranteed</span>
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                Find Your Next Career Move <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Direct From Official ATS Endpoints
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
                Real-time synchronized tech openings from Greenhouse, Lever, Ashby, and top corporate career portals. No duplicate scrapes, no stale reposts.
              </p>

              {/* Search Form Container */}
              <div className="pt-4 max-w-3xl mx-auto">
                <JobSearchForm size="large" />
              </div>

              {/* Popular / Trending Searches */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-3 text-xs text-slate-500">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Popular Searches:</span>
                <Link href="/jobs?workMode=remote" className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-medium hover:bg-emerald-100 transition-colors">
                  Remote Roles
                </Link>
                <Link href="/jobs?q=Frontend" className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium hover:border-blue-400 transition-colors">
                  Frontend
                </Link>
                <Link href="/jobs?q=Backend" className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium hover:border-blue-400 transition-colors">
                  Backend
                </Link>
                <Link href="/jobs?q=Full+Stack" className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium hover:border-blue-400 transition-colors">
                  Full Stack
                </Link>
                <Link href="/jobs?q=DevOps" className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium hover:border-blue-400 transition-colors">
                  DevOps / Cloud
                </Link>
                <Link href="/jobs?q=AI" className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium hover:border-blue-400 transition-colors">
                  AI / ML
                </Link>
                <Link href="/jobs?sort=salary_desc" className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-medium hover:bg-amber-100 transition-colors">
                  High Salary ($150k+)
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Ad Placement: Home Page Hero Below Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <AdPlacement location="HOME_PAGE_HERO_BELOW" />
        </div>

        {/* Key Platform Value Cards (Naukri-style Trust Bar) */}
        <section className="py-8 border-b border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center shrink-0">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Direct ATS Endpoints</h2>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">Ingested from official Greenhouse, Lever & Ashby feeds</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shrink-0">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Real-Time Verification</h2>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">Automated lifecycle sweeps invalidate closed roles</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Salary Transparency</h2>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">Direct compensation ranges and grade evaluations</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Direct Apply Links</h2>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">1-click navigation to official employer application forms</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured / Recent Active Jobs — High-Density Naukri-Style Grid */}
        {recentJobs.length > 0 && (
          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                      Recently Ingested Tech Roles
                    </h2>
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      Live
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    {totalJobsCount > 0 ? `${totalJobsCount.toLocaleString()}+ active roles ` : ""}verified directly from official employer career boards
                  </p>
                </div>
                <Link
                  href="/jobs"
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>View All Jobs</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>

              <div className="pt-2 text-center">
                <Link href="/jobs">
                  <Button variant="secondary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />} className="font-semibold shadow-xs">
                    Explore All Active Openings
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Top Hiring Tech Companies & Intelligence */}
        {featuredCompanies.length > 0 && (
          <section className="py-12 sm:py-16 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                      Top Verified Companies
                    </h2>
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      Intelligence Signals
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Hiring velocity, remote friendly scores, and compensation grades from verified endpoints
                  </p>
                </div>
                <Link
                  href="/companies"
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>All Companies</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {featuredCompanies.map((snapshot) => (
                  <CompanyCard key={snapshot.identity.slug} snapshot={snapshot} />
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link href="/companies">
                  <Button variant="outline" size="md" className="font-semibold">
                    <Building2 className="w-4 h-4 mr-2 text-slate-500" />
                    <span>Explore Company Directory</span>
                  </Button>
                </Link>
                <Link href="/companies/compare">
                  <Button variant="secondary" size="md" className="font-semibold">
                    <TrendingUp className="w-4 h-4 mr-2 text-emerald-600" />
                    <span>Compare Hiring & Salaries</span>
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Candidate Profile Conversion Banner (Naukri Style) */}
        <section className="py-12 sm:py-16 border-t border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-200 border border-blue-400/30">
                  <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                  <span>Personalized Discovery</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
                  Supercharge Your Tech Search with a Candidate Profile
                </h2>
                <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                  Set your skills, target compensation, and remote preferences to unlock smart match scoring, personalized recommendations, and instant 1-click ATS tracking.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>AI Skill Matching</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Salary Fit Estimates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Application Tracker</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch gap-3">
                <Link href="/profile" className="w-full">
                  <Button size="lg" className="w-full bg-white hover:bg-slate-100 text-slate-900 font-bold shadow-lg">
                    <span>Complete Candidate Profile</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/saved-jobs" className="w-full">
                  <Button variant="outline" size="lg" className="w-full text-white border-white/30 hover:bg-white/10 font-semibold">
                    <span>View Saved Jobs</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Recruiter & Employer Banner */}
        <section className="py-12 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  <Briefcase className="w-4 h-4" />
                  <span>For Employers & Hiring Teams</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Hiring Engineering Talent? Connect Your ATS Directly
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
                  Automate job distribution from your Greenhouse, Lever, or Ashby board. Reach active tech candidates with zero stale listings.
                </p>
              </div>
              <Link href="/employers" className="shrink-0">
                <Button size="lg" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-6 shadow-sm">
                  <span>Explore Recruiter Solutions</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


