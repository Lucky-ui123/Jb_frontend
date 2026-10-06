"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { SearchJobItem, SearchPaginationMeta } from "@/types";
import { JobCard } from "./JobCard";
import { ActiveFilterChips } from "./ActiveFilterChips";
import { ListingAdPlacement } from "@/components/ads/ListingAdPlacement";
import { SaveSearchButton } from "@/components/saved-searches/SaveSearchButton";
import { calculateAdPlacementIndices } from "@/lib/ads";
import { ChevronLeft, ChevronRight, SearchX, RotateCcw } from "lucide-react";

export interface JobListProps {
  jobs: SearchJobItem[];
  pagination: SearchPaginationMeta;
}

export function JobList({ jobs, pagination }: JobListProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const adPlacementIndices = calculateAdPlacementIndices({
    totalItems: jobs.length,
    interval: 6,
    initialOffset: 4,
    maxAds: 3,
  });

  const createPageUrl = (targetPage: number) => {
    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
    params.set("page", targetPage.toString());
    return `${pathname}?${params.toString()}`;
  };

  const clearAllFilters = () => {
    return pathname;
  };

  if (jobs.length === 0) {
    return (
      <div className="space-y-6">
        <ActiveFilterChips />

        <div className="w-full bg-card rounded-2xl border border-dashed border-border p-12 text-center space-y-5 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-muted/60 text-muted-foreground flex items-center justify-center mx-auto">
            <SearchX className="w-7 h-7 text-muted-foreground" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="font-bold text-lg text-foreground">
              No matching job postings found
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              We couldn&apos;t find any active, verified openings matching your exact filters. Try broadening your keywords or removing some filters.
            </p>
          </div>

          <div>
            <Link
              href={clearAllFilters()}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs sm:text-sm font-semibold text-primary bg-primary/10 hover:bg-primary/20 rounded-xl transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear all filters & search</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Active Filter Chips */}
      <ActiveFilterChips />

      {/* Search count, Save Search action, and page indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-muted-foreground px-1">
        <span>
          Showing <strong className="text-foreground font-semibold">{jobs.length}</strong> of{" "}
          <strong className="text-foreground font-semibold">{pagination.total}</strong> active jobs
        </span>
        <div className="flex items-center gap-3">
          <SaveSearchButton />
          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>
        </div>
      </div>

      {/* List of Job Cards & In-Feed Ad Units */}
      <div className="space-y-3.5">
        {jobs.map((job, idx) => (
          <React.Fragment key={job.id}>
            <JobCard job={job} />
            {adPlacementIndices.includes(idx) && (
              <ListingAdPlacement key={`listing-ad-${idx}`} index={idx} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Pagination Controls */}
      {pagination.totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="flex items-center justify-center gap-2 pt-6"
        >
          {pagination.hasPrevPage ? (
            <Link
              href={createPageUrl(pagination.page - 1)}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-foreground bg-card hover:bg-secondary border border-border shadow-sm transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-muted-foreground bg-card/40 border border-border/50 cursor-not-allowed opacity-50">
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </span>
          )}

          <div className="flex items-center gap-1 text-xs font-semibold px-3 text-muted-foreground">
            Page <strong className="text-foreground">{pagination.page}</strong> of{" "}
            <strong className="text-foreground">{pagination.totalPages}</strong>
          </div>

          {pagination.hasNextPage ? (
            <Link
              href={createPageUrl(pagination.page + 1)}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-foreground bg-card hover:bg-secondary border border-border shadow-sm transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-muted-foreground bg-card/40 border border-border/50 cursor-not-allowed opacity-50">
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </span>
          )}
        </nav>
      )}
    </div>
  );
}

