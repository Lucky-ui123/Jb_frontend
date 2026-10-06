"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  Compass,
  Building2,
  BarChart3,
  Bookmark,
  Activity,
  Menu,
  Search,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { UserNav } from "./UserNav";
import { Sheet } from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isJobsActive = pathname === "/jobs" || (pathname.startsWith("/jobs/") && !pathname.startsWith("/jobs/compare"));
  const isCompaniesActive = pathname === "/companies" || pathname.startsWith("/companies/");
  const isInsightsActive = pathname === "/companies/compare";
  const isSavedActive = pathname.startsWith("/saved-jobs");
  const isActivityActive = pathname.startsWith("/activity");
  const isEmployersActive = pathname.startsWith("/employers");

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md transition-all shadow-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 sm:h-16 flex items-center justify-between gap-3">
        {/* Left Side: Brand Logo + Primary Nav */}
        <div className="flex items-center gap-6 lg:gap-8">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold tracking-tight text-foreground hover:opacity-95 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg group"
            title="JobPlatform — Direct ATS Job Portal"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 flex items-center justify-center text-white shadow-xs font-black text-xs tracking-tighter">
              JB
            </div>
            <div className="flex flex-col leading-none">
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white">
                  Job<span className="text-blue-600 dark:text-blue-400">Portal</span>
                </span>
                <span className="hidden xl:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  ATS Verified
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Main Navigation */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1 text-xs sm:text-sm font-medium">
            <Link
              href="/jobs"
              aria-current={isJobsActive ? "page" : undefined}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                isJobsActive
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 font-semibold"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60"
              }`}
            >
              <Compass className="w-4 h-4 text-blue-600" />
              <span>Jobs</span>
            </Link>

            <Link
              href="/companies"
              aria-current={isCompaniesActive && !isInsightsActive ? "page" : undefined}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                isCompaniesActive && !isInsightsActive
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 font-semibold"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60"
              }`}
            >
              <Building2 className="w-4 h-4 text-slate-500" />
              <span>Companies</span>
            </Link>

            <Link
              href="/companies/compare"
              aria-current={isInsightsActive ? "page" : undefined}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                isInsightsActive
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 font-semibold"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60"
              }`}
            >
              <BarChart3 className="w-4 h-4 text-emerald-600" />
              <span>Intelligence</span>
            </Link>

            <Link
              href="/saved-jobs"
              aria-current={isSavedActive ? "page" : undefined}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                isSavedActive
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 font-semibold"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60"
              }`}
            >
              <Bookmark className="w-4 h-4 text-amber-500" />
              <span>Saved</span>
            </Link>

            <Link
              href="/activity"
              aria-current={isActivityActive ? "page" : undefined}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                isActivityActive
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 font-semibold"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60"
              }`}
            >
              <Activity className="w-4 h-4 text-teal-600" />
              <span>Activity</span>
            </Link>
          </nav>
        </div>

        {/* Right Side: Search Shortcut + User Profile + For Employers Hub */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick Search Shortcut */}
          <Link
            href="/jobs"
            aria-label="Search jobs"
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100 hover:bg-slate-200/70 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Search jobs...</span>
            <kbd className="hidden xl:inline-block px-1.5 py-0.2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[10px] text-slate-400 font-mono">
              /
            </kbd>
          </Link>

          {/* Candidate Auth / Profile Dropdown */}
          <div className="flex items-center">
            <UserNav />
          </div>

          <div className="hidden sm:block h-5 w-px bg-slate-200 dark:bg-slate-800 mx-0.5" />

          {/* For Employers Entry Link */}
          <Link
            href="/employers"
            aria-current={isEmployersActive ? "page" : undefined}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              isEmployersActive
                ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 shadow-xs"
                : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/80 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>For Employers</span>
          </Link>

          {/* Mobile Menu Hamburger */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            aria-label="Open mobile navigation menu"
            className="md:hidden text-slate-700 dark:text-slate-200"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Sheet */}
      <Sheet
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        title="Menu"
        description="Portal Navigation"
        position="right"
      >
        <div id="mobile-navigation-menu" className="flex flex-col justify-between h-full space-y-6 pt-2">
          <div className="space-y-6">
            {/* Candidate Quick Header */}
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Candidate Hub
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                  <ShieldCheck className="w-3 h-3" />
                  Verified ATS
                </span>
              </div>
              <div className="mt-2">
                <UserNav />
              </div>
            </div>

            {/* Navigation Groups */}
            <nav aria-label="Mobile Navigation" className="space-y-1 text-sm font-medium">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                  pathname === "/"
                    ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 font-semibold"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  <span>Home</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/jobs"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                  isJobsActive
                    ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 font-semibold"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Compass className="w-4 h-4 text-blue-600" />
                  <span>Discover Jobs</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/companies"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                  isCompaniesActive && !isInsightsActive
                    ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 font-semibold"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Building2 className="w-4 h-4 text-slate-500" />
                  <span>Companies</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/companies/compare"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                  isInsightsActive
                    ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 font-semibold"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-4 h-4 text-emerald-600" />
                  <span>Company Intelligence</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/saved-jobs"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                  isSavedActive
                    ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 font-semibold"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Bookmark className="w-4 h-4 text-amber-500" />
                  <span>Saved Jobs</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/activity"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                  isActivityActive
                    ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 font-semibold"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-teal-600" />
                  <span>Application Activity</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </nav>

            {/* Recruiter / Employer Section */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <span className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Recruiter Portal
              </span>
              <Link
                href="/employers"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-3 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-medium text-sm transition-colors shadow-xs"
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-blue-400" />
                  <div>
                    <p className="font-semibold">For Employers</p>
                    <p className="text-[11px] text-slate-300">Post jobs & hire talent</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>

          {/* Footer inside mobile sheet */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <Zap className="w-3.5 h-3.5" />
              Live Ingestion Active
            </span>
            <span>v1.0</span>
          </div>
        </div>
      </Sheet>
    </header>
  );
}

