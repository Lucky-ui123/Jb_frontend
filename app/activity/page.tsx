import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ActivityDashboard } from "@/components/activity/ActivityDashboard";
import { getCurrentUser } from "@/lib/auth";
import { ListSavedJobsService, ListUserActivityService, ListSavedSearchesService, ListJobAlertsService } from "@/lib/services";



import { Button } from "@/components/ui/Button";
import { Activity, ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My Job Activity | Portal",
  description: "Manage your saved jobs, tracked applications, saved searches, job alerts, and browsing history on Portal.",
};

interface ActivityPageProps {
  searchParams: Promise<{
    tab?: "saved" | "applied" | "viewed" | "searches" | "alerts";
  }>;
}

export default async function ActivityPage({ searchParams }: ActivityPageProps) {
  const { tab } = await searchParams;
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />

        <main id="main-content" className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-inner">
            <Activity className="w-8 h-8 stroke-[1.5]" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Sign In to View Activity
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Track your saved positions, application milestones, saved search queries, job alerts, and recently inspected listings in one unified activity dashboard.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/jobs">
              <Button variant="outline" size="md" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Explore Jobs</span>
              </Button>
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // Parallel load across activity domains
  const [savedJobs, appliedJobs, viewedJobs, savedSearches, jobAlerts] = await Promise.all([
    new ListSavedJobsService().execute(user.id),
    new ListUserActivityService().getAppliedJobs(user.id),
    new ListUserActivityService().getViewedJobs(user.id),
    new ListSavedSearchesService().execute(user.id),
    new ListJobAlertsService().execute(user.id),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main id="main-content" className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation & Header */}
        <div className="space-y-4">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Jobs</span>
          </Link>

          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                My Job Activity
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Your bookmarks, saved searches, active job alerts, submitted applications, and recent browsing history
            </p>
          </div>
        </div>

        {/* Unified Tabbed Dashboard */}
        <ActivityDashboard
          initialSavedJobs={savedJobs}
          initialAppliedJobs={appliedJobs}
          initialViewedJobs={viewedJobs}
          initialSavedSearches={savedSearches}
          initialJobAlerts={jobAlerts}
          defaultTab={tab || "saved"}
        />
      </main>

      <Footer />
    </div>
  );
}

