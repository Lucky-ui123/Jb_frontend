import { Metadata } from "next";
import { Mail, HelpCircle, Building2, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Support | Job Platform",
  description: "Get in touch with the Job Platform engineering, employer verification, and support team.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200/80 shadow-sm mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>Support & Helpdesk</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">
            Contact Job Platform
          </h1>
          <p className="mt-3 text-base text-slate-500 max-w-2xl">
            Have questions about a job listing, need assistance with your candidate profile, or want to verify an employer company profile? We&apos;re here to help.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Candidate Support</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Questions regarding search filters, profile completeness, saved jobs, or account deletion.
            </p>
            <a
              href="mailto:support@encrew.in"
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              support@encrew.in →
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Employer Inquiries</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Assistance with ATS integration, automated crawl onboarding, and corporate profile verification.
            </p>
            <a
              href="mailto:employers@encrew.in"
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 transition-colors"
            >
              employers@encrew.in →
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Trust & Safety</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Report an expired/closed role that was not caught by our verification crawler, or report policy violations.
            </p>
            <a
              href="mailto:safety@encrew.in"
              className="text-xs font-semibold text-amber-600 hover:text-amber-800 transition-colors"
            >
              safety@encrew.in →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
