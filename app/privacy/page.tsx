import { Metadata } from "next";
import Link from "next/link";
import { Shield, Lock, Eye, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Job Platform",
  description: "Read our Privacy Policy to understand how Job Platform collects, protects, and handles your candidate data and applications.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200/80 shadow-sm mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>Trust & Data Protection</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Last Updated: October 4, 2026 • Effective Immediately
          </p>
        </div>

        {/* Content sections */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200/80 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm">
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-600" />
              1. Overview & Commitment
            </h2>
            <p>
              Job Platform (&quot;JB&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. We direct candidates exclusively to official company Applicant Tracking Systems (ATS) such as Greenhouse, Lever, Ashby, and verified career portals. We do not sell, rent, or trade your personal resume data or application history to third-party data brokers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-600" />
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-slate-900">Authentication Data:</strong> When signing in via Google Sign-In, we receive your verified email, full name, and profile picture avatar via secure OAuth 2.0 tokens.
              </li>
              <li>
                <strong className="text-slate-900">Candidate Profile & Preferences:</strong> Information you voluntarily configure, including target job titles, preferred work mode (Remote/Hybrid/Onsite), minimum salary expectations, and skills.
              </li>
              <li>
                <strong className="text-slate-900">Saved Jobs & Activity:</strong> Jobs you bookmark and application timestamp audit trails.
              </li>
              <li>
                <strong className="text-slate-900">Telemetry & Analytics:</strong> Aggregated, non-personally identifiable metrics (such as search queries, latency, and click-through rates) used solely to enhance search relevancy.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              3. Direct Application Handoff
            </h2>
            <p>
              When you click &quot;Apply on Official Site&quot;, you are redirected directly to the hiring organization&apos;s verified ATS URL. Any resumes, cover letters, or sensitive personal documents submitted on external ATS pages are governed exclusively by the privacy policy of the respective hiring organization.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" />
              4. Cookies and Advertising
            </h2>
            <p>
              We use essential session cookies to maintain your login state. Non-intrusive contextual advertisements delivered through Google AdSense may use cookies to serve ads based on prior visits. You can manage or disable cookie preferences via your web browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              5. Your Rights & Data Deletion
            </h2>
            <p>
              You have the right to access, export, or permanently delete your account and associated candidate preferences at any time. To request complete data erasure, please contact us at{" "}
              <Link href="/contact" className="text-blue-600 hover:underline font-semibold">
                our support portal
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
