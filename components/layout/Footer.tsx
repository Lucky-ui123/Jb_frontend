import Link from "next/link";
import { ShieldCheck, Zap, CheckCircle2, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 mt-auto text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10 mb-12">
          {/* Brand & Mission Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 space-y-4 pr-0 lg:pr-6">
            <div className="flex items-center gap-2.5 font-bold text-base text-slate-900 dark:text-white">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs font-black text-xs">
                JB
              </div>
              <span className="text-lg font-black tracking-tight">
                Job<span className="text-blue-600 dark:text-blue-400">Portal</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              Authoritative, direct-from-source tech career discovery engine. Every job posting is synced in real-time from official ATS endpoints (Greenhouse, Lever, Ashby, and company career portals).
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Zero Ghost Postings
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                Direct ATS Sync
              </span>
            </div>
          </div>

          {/* Column 2: Job Seekers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Job Seekers
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/jobs" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Explore All Jobs
                </Link>
              </li>
              <li>
                <Link href="/jobs?workMode=remote" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Remote Tech Jobs
                </Link>
              </li>
              <li>
                <Link href="/jobs?sort=salary_desc" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  High Salary Roles
                </Link>
              </li>
              <li>
                <Link href="/saved-jobs" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Saved Opportunities
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Candidate Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Companies & Intel */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Companies & Intel
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/companies" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Company Directory
                </Link>
              </li>
              <li>
                <Link href="/companies/compare" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Compare Companies
                </Link>
              </li>
              <li>
                <Link href="/companies?industry=tech" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Tech Employers
                </Link>
              </li>
              <li>
                <Link href="/activity" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Application Tracker
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Recruiters */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Recruiters
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/employers" className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                  <span>For Employers</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link href="/employers#post-job" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/employers#ats-integration" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  ATS Integration
                </Link>
              </li>
              <li>
                <Link href="/employers#verification" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Verification Standards
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Legal & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Trust & Legal
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <a href="/api/health" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  System Health
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Popular Tags / Naukri-style quick category discovery bar */}
        <div className="pt-6 pb-8 border-t border-slate-200/60 dark:border-slate-800/80 text-xs">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-500">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Popular Searches:</span>
            <Link href="/jobs?query=frontend" className="hover:text-blue-600 transition-colors">Frontend Developer</Link>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <Link href="/jobs?query=backend" className="hover:text-blue-600 transition-colors">Backend Engineer</Link>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <Link href="/jobs?query=full+stack" className="hover:text-blue-600 transition-colors">Full Stack Developer</Link>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <Link href="/jobs?query=devops" className="hover:text-blue-600 transition-colors">DevOps & Cloud</Link>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <Link href="/jobs?query=data+engineer" className="hover:text-blue-600 transition-colors">Data Engineer</Link>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <Link href="/jobs?query=machine+learning" className="hover:text-blue-600 transition-colors">AI / ML Engineer</Link>
          </div>
        </div>

        {/* Bottom Bar: Copyright + Telemetry Status */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {currentYear} JobPlatform (JB). Production-grade Authoritative Job Monolith.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
              <Zap className="w-3.5 h-3.5" />
              Automated Lifecycle Ingestion Active
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-slate-500 dark:text-slate-400">Direct ATS Endpoints Only</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

