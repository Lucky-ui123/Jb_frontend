import { Metadata } from "next";
import Link from "next/link";
import { FileText, ShieldCheck, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Job Platform",
  description: "Terms and conditions governing the use of Job Platform for job seekers and employers.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200/80 shadow-sm mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-4">
            <FileText className="w-3.5 h-3.5" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Last Updated: October 4, 2026 • Effective Immediately
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200/80 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm">
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using Job Platform (&quot;JB&quot;, &quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must discontinue use of the platform immediately.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              2. Job Listings and Direct ATS Guarantee
            </h2>
            <p>
              Job Platform aggregates publicly available career listings directly from authorized employer applicant tracking systems. While our verification engine continuously verifies role availability, we do not guarantee employment outcomes or that employer listings remain open indefinitely.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              3. Prohibited Conduct
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Deploying automated scrapers or bots to disrupt search infrastructure or bypass rate limits.</li>
              <li>Impersonating any employer or claiming unauthorized ownership of company profiles.</li>
              <li>Attempting to probe, scan, or exploit vulnerabilities in our authentication or database infrastructure.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              4. Employer Accounts & Company Profiles
            </h2>
            <p>
              Employers claiming corporate profiles must verify domain ownership via corporate email matching. Job Platform reserves the right to revoke or suspend accounts found in violation of ethical recruiting practices.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              5. Contact & Inquiries
            </h2>
            <p>
              For legal notices or questions regarding these terms, please contact{" "}
              <Link href="/contact" className="text-blue-600 hover:underline font-semibold">
                our support desk
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
