import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JobCardSkeleton } from "@/components/jobs/JobCardSkeleton";
import { Skeleton } from "@/components/ui/Skeleton";

export default function JobsLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Skeleton */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton variant="rounded" className="h-8 w-64" />
            <Skeleton variant="rounded" className="h-4 w-96" />
          </div>

          <Skeleton variant="rounded" className="h-16 w-full" />
        </div>

        {/* Results Layout Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Sidebar Filter Skeleton */}
          <div className="hidden lg:block lg:col-span-1 space-y-4">
            <Skeleton variant="rounded" className="h-80 w-full" />
          </div>

          {/* Job List Skeletons */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex justify-between">
              <Skeleton variant="rounded" className="h-5 w-48" />
              <Skeleton variant="rounded" className="h-5 w-24" />
            </div>

            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
