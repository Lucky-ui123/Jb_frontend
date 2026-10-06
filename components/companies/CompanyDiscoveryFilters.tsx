"use client";

import * as React from "react";
import { Search, X, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { CompanyDiscoveryFacets } from "@/types";

export interface FilterState {
  search: string;
  workMode: string;
  velocity: string;
  compensationGrade: string;
  sortBy: string;
}

export interface CompanyDiscoveryFiltersProps {
  filters: FilterState;
  facets?: CompanyDiscoveryFacets;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onReset: () => void;
  totalResults: number;
}

export function CompanyDiscoveryFilters({
  filters,
  facets,
  onFilterChange,
  onReset,
  totalResults,
}: CompanyDiscoveryFiltersProps) {
  const hasActiveFilters = Boolean(
    filters.search ||
      filters.workMode ||
      filters.velocity ||
      filters.compensationGrade ||
      (filters.sortBy && filters.sortBy !== "active_jobs")
  );

  return (
    <div className="space-y-4 bg-card border border-border/80 rounded-2xl p-4 sm:p-5 shadow-sm">
      {/* Search Input Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            placeholder="Search companies by name or tech keyword..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => onFilterChange({ search: "" })}
              aria-label="Clear search text"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative w-full sm:w-auto">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value })}
              className="w-full sm:w-auto appearance-none pl-9 pr-8 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer"
            >
              <option value="active_jobs">Sort: Most Openings</option>
              <option value="hiring_velocity">Sort: Highest Velocity</option>
              <option value="salary_transparency">Sort: Salary Transparency</option>
              <option value="remote_score">Sort: Remote Friendly</option>
              <option value="confidence">Sort: Data Confidence</option>
              <option value="name">Sort: Company Name (A-Z)</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="px-3 py-2.5 text-xs font-semibold text-muted-foreground hover:text-destructive transition-colors shrink-0 flex items-center gap-1 border border-transparent hover:border-destructive/20 rounded-xl"
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Pills Row */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/60 text-xs">
        <div className="flex items-center gap-1 text-muted-foreground mr-1">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="font-semibold">Filters:</span>
        </div>

        {/* Workplace Mode Filter */}
        <div className="flex items-center rounded-lg bg-secondary/60 p-0.5 border border-border/60">
          {["", "remote", "hybrid", "onsite"].map((mode) => {
            const isActive = filters.workMode === mode;
            const label = mode === "" ? "All Modes" : mode.charAt(0).toUpperCase() + mode.slice(1);
            const count = mode ? facets?.workModes[mode] : undefined;

            return (
              <button
                key={mode}
                type="button"
                onClick={() => onFilterChange({ workMode: mode })}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  isActive
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label} {count !== undefined && count > 0 ? `(${count})` : ""}
              </button>
            );
          })}
        </div>

        {/* Velocity Filter */}
        <div className="flex items-center rounded-lg bg-secondary/60 p-0.5 border border-border/60">
          {["", "SURGING", "GROWING", "STABLE"].map((vel) => {
            const isActive = filters.velocity === vel;
            const label = vel === "" ? "Any Velocity" : vel.charAt(0) + vel.slice(1).toLowerCase();

            return (
              <button
                key={vel}
                type="button"
                onClick={() => onFilterChange({ velocity: vel })}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  isActive
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Compensation Grade Filter */}
        <div className="flex items-center rounded-lg bg-secondary/60 p-0.5 border border-border/60">
          {["", "A", "B", "C"].map((grade) => {
            const isActive = filters.compensationGrade === grade;
            const label = grade === "" ? "Any Comp" : `Grade ${grade}`;

            return (
              <button
                key={grade}
                type="button"
                onClick={() => onFilterChange({ compensationGrade: grade })}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  isActive
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Total Results Summary */}
        <div className="ml-auto text-xs text-muted-foreground font-medium py-1">
          {totalResults === 1 ? "1 company found" : `${totalResults} companies found`}
        </div>
      </div>
    </div>
  );
}

