import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SavedJobList } from "@/components/saved-jobs/SavedJobList";
import { getCurrentUser } from "@/lib/auth";
import { ListSavedJobsService } from "@/lib/services";
import { Button } from "@/components/ui/Button";
import { Bookmark, ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Saved Jobs | Portal",
  description: "View and manage your bookmarked tech job opportunities on Portal.",
};

export default async function SavedJobsPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />

        <main id="main-content" className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-inner">
            <Bookmark className="w-8 h-8 stroke-[1.5]" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Sign In to View Saved Jobs
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Authenticate with your Google account to bookmark positions, view saved opportunities, and track applications.
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

  const listService = new ListSavedJobsService();
  const savedJobs = await listService.execute(user.id);

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
                <Bookmark className="w-5 h-5 fill-primary/20 text-primary" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                Saved Jobs
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Your bookmarked opportunities and direct-apply ATS listings
            </p>
          </div>
        </div>

        {/* Saved Jobs List with Live Actions */}
        <SavedJobList initialSavedJobs={savedJobs} />
      </main>

      <Footer />
    </div>
  );
}

