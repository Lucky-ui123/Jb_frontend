"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { CompanySignalSnapshot, CompanyDiscoveryFacets } from "@/types";
import { CompanyCard } from "./CompanyCard";
import { CompanyDiscoveryFilters, FilterState } from "./CompanyDiscoveryFilters";
import { CompanyComparisonTray } from "./CompanyComparisonTray";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SearchX, ChevronLeft, ChevronRight } from "lucide-react";

export interface CompanyDiscoveryClientProps {
  initialSnapshots: CompanySignalSnapshot[];
  facets?: CompanyDiscoveryFacets;
  initialQuery?: {
    search?: string;
    workMode?: string;
    velocity?: string;
    compensationGrade?: string;
    sortBy?: string;
  };
}

const ITEMS_PER_PAGE = 12;

export function CompanyDiscoveryClient({
  initialSnapshots,
  facets,
  initialQuery,
}: CompanyDiscoveryClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: initialQuery?.search || "",
    workMode: initialQuery?.workMode || "",
    velocity: initialQuery?.velocity || "",
    compensationGrade: initialQuery?.compensationGrade || "",
    sortBy: initialQuery?.sortBy || "active_jobs",
  });

  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Map of slugs to company names for the comparison tray chips
  const companyNamesMap = useMemo(() => {
    const map: Record<string, string> = {};
    initialSnapshots.forEach((s) => {
      map[s.identity.slug] = s.identity.name;
    });
    return map;
  }, [initialSnapshots]);

  // Client-side filtering & sorting
  const filteredCompanies = useMemo(() => {
    let result = [...initialSnapshots];

    // Search filter
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.identity.name.toLowerCase().includes(q) ||
          (s.profile.industry && s.profile.industry.toLowerCase().includes(q)) ||
          (s.hiring.skillDemand?.topSkills || []).some((k) => k.skill.toLowerCase().includes(q))
      );
    }

    // Work Mode
    if (filters.workMode) {
      if (filters.workMode === "remote") {
        result = result.filter(
          (s) =>
            s.distributions.workplace.remote.count > 0 ||
            (s.hiring.geographicFootprint?.remoteFriendlyScore ?? 0) >= 50
        );
      } else if (filters.workMode === "hybrid") {
        result = result.filter((s) => s.distributions.workplace.hybrid.count > 0);
      } else if (filters.workMode === "onsite") {
        result = result.filter((s) => s.distributions.workplace.onsite.count > 0);
      }
    }

    // Velocity
    if (filters.velocity) {
      result = result.filter((s) => {
        const vel = (s.hiring as unknown as { velocity?: string }).velocity || s.hiring.hiringVelocity;
        return vel === filters.velocity;
      });
    }

    // Compensation Grade
    if (filters.compensationGrade) {
      result = result.filter(
        (s) => s.compensation.grade === filters.compensationGrade
      );
    }

    // Sorting
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case "hiring_velocity": {
          const velWeight: Record<string, number> = {
            SURGING: 4,
            rapid_expansion: 4,
            GROWING: 3,
            steady_hiring: 3,
            STABLE: 2,
            moderate_activity: 2,
            DECLINING: 1,
            selective_hiring: 1,
            DORMANT: 0,
            frozen: 0,
          };
          const aVel = (a.hiring as unknown as { velocity?: string }).velocity || a.hiring.hiringVelocity;
          const bVel = (b.hiring as unknown as { velocity?: string }).velocity || b.hiring.hiringVelocity;
          return (velWeight[bVel] || 0) - (velWeight[aVel] || 0);
        }
        case "salary_transparency":
          return b.compensation.transparencyRate - a.compensation.transparencyRate;
        case "remote_score":
          return (
            (b.hiring.geographicFootprint?.remoteFriendlyScore ?? 0) -
            (a.hiring.geographicFootprint?.remoteFriendlyScore ?? 0)
          );
        case "confidence":
          return (b.freshness?.dataConfidenceScore ?? 95) - (a.freshness?.dataConfidenceScore ?? 95);
        case "name":
          return a.identity.name.localeCompare(b.identity.name);
        case "active_jobs":
        default:
          return b.hiring.activeJobCount - a.hiring.activeJobCount;
      }
    });

    return result;
  }, [initialSnapshots, filters]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE) || 1;
  const paginatedCompanies = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCompanies.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCompanies, currentPage]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({
      search: "",
      workMode: "",
      velocity: "",
      compensationGrade: "",
      sortBy: "active_jobs",
    });
    setCurrentPage(1);
  };

  const handleToggleSelect = (slug: string) => {
    setSelectedSlugs((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((s) => s !== slug);
      }
      if (prev.length >= 5) {
        return prev; // bounded to 5 companies max
      }
      return [...prev, slug];
    });
  };

  const handleRemoveSlug = (slug: string) => {
    setSelectedSlugs((prev) => prev.filter((s) => s !== slug));
  };

  const handleClearAll = () => {
    setSelectedSlugs([]);
  };

  return (
    <div className="space-y-6">
      {/* Discovery Filters Bar */}
      <CompanyDiscoveryFilters
        filters={filters}
        facets={facets}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
        totalResults={filteredCompanies.length}
      />

      {/* Grid of Companies */}
      {paginatedCompanies.length === 0 ? (
        <Card className="p-12 text-center space-y-4 border-dashed border-border/80">
          <div className="w-12 h-12 rounded-2xl bg-secondary/80 flex items-center justify-center mx-auto text-muted-foreground">
            <SearchX className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-foreground">No companies found</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              We couldn&apos;t find any companies matching your active filters. Try adjusting your search or resetting filters.
            </p>
          </div>
          <div className="pt-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              Reset all filters
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedCompanies.map((snapshot) => (
            <CompanyCard
              key={snapshot.identity.id || snapshot.identity.slug}
              snapshot={snapshot}
              isSelected={selectedSlugs.includes(snapshot.identity.slug)}
              onToggleSelect={handleToggleSelect}
              selectionDisabled={selectedSlugs.length >= 5}
            />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-border/60">
          <span className="text-xs text-muted-foreground">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredCompanies.length)} of{" "}
            {filteredCompanies.length} companies
          </span>

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage <= 1}
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4 mr-0.5" />
              <span>Previous</span>
            </Button>

            <span className="px-3 py-1 rounded-lg bg-secondary text-xs font-semibold text-foreground">
              {currentPage} / {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage >= totalPages}
              aria-label="Next page"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4 ml-0.5" />
            </Button>
          </div>
        </div>
      )}

      {/* Sticky Comparison Tray */}
      <CompanyComparisonTray
        selectedSlugs={selectedSlugs}
        onRemoveSlug={handleRemoveSlug}
        onClearAll={handleClearAll}
        companyNamesMap={companyNamesMap}
      />
    </div>
  );
}


