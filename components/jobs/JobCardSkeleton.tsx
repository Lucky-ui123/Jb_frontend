import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

export function JobCardSkeleton() {
  return (
    <Card className="p-5 sm:p-6 border-border/80 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* Left Column: Monogram + Title + Meta skeletons */}
        <div className="flex items-start gap-4 w-full">
          <Skeleton variant="rounded" className="w-12 h-12 shrink-0" />

          <div className="space-y-2.5 w-full max-w-md">
            {/* Title */}
            <Skeleton variant="rounded" className="h-5 w-3/4" />

            {/* Meta Row */}
            <div className="flex items-center gap-3">
              <Skeleton variant="rounded" className="h-4 w-24" />
              <Skeleton variant="rounded" className="h-4 w-20" />
              <Skeleton variant="rounded" className="h-4 w-16" />
            </div>
          </div>
        </div>

        {/* Right Column: Salary & Verified pill skeletons */}
        <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
          <Skeleton variant="rounded" className="h-6 w-24" />
          <Skeleton variant="rounded" className="h-5 w-20" />
        </div>
      </div>

      {/* Badges row skeleton */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <Skeleton variant="rounded" className="h-6 w-16" />
        <Skeleton variant="rounded" className="h-6 w-20" />
        <Skeleton variant="rounded" className="h-6 w-14" />
        <Skeleton variant="rounded" className="h-6 w-16" />
      </div>
    </Card>
  );
}
