import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Briefcase,
  ShieldCheck,
  Zap,
  Building2,
  TrendingUp,
  FileCheck,
} from "lucide-react";

export const metadata = {
  title: "For Employers & Recruiters — JobPlatform",
  description: "Direct ATS Integration, verified tech candidate pipeline, zero ghost job degradation.",
};

export default function EmployersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 sm:py-24 border-b border-border/60 bg-gradient-to-b from-blue-50/50 via-background to-background dark:from-slate-900/50 dark:via-background dark:to-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2">
              <Badge variant="verified" size="lg">
                <ShieldCheck className="w-4 h-4 mr-1 text-primary" />
                <span>Authoritative Employer Solutions</span>
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight max-w-3xl mx-auto">
              Hire Elite Tech Talent Directly Through Authoritative ATS Sync
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Connect your Greenhouse, Lever, Ashby, or custom career portal. Our automated lifecycle engine syncs your open roles in real-time, eliminating ghost applications and delivering pre-qualified engineering candidates.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 shadow-md shadow-blue-500/20">
                <Briefcase className="w-4 h-4 mr-2" />
                <span>Connect Company ATS</span>
              </Button>
              <Link href="/companies">
                <Button variant="outline" size="lg" className="font-semibold px-6">
                  <Building2 className="w-4 h-4 mr-2 text-slate-500" />
                  <span>Explore Company Hub</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Why Top Engineering Teams Choose JobPlatform
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              A recruiter portal built with engineering rigor and zero data pollution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 space-y-4 border-border/80 hover:shadow-card-hover transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Automated ATS Sync</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                No manual job postings required. Connect your ATS endpoint and our background crawlers continuously verify and update job status automatically.
              </p>
            </Card>

            <Card className="p-6 space-y-4 border-border/80 hover:shadow-card-hover transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Verified Candidate Intelligence</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Candidates complete verified skill profiles with work experience, tech stack proficiency, and salary expectations matching your engineering requirements.
              </p>
            </Card>

            <Card className="p-6 space-y-4 border-border/80 hover:shadow-card-hover transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Company Intelligence Signals</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Showcase your tech stack, hiring velocity, remote culture, and compensation transparency to attract high-intent engineering talent.
              </p>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
