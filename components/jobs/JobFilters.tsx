"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SlidersHorizontal, RotateCcw, Check, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Sheet } from "@/components/ui/Sheet";
import { Badge } from "@/components/ui/Badge";
import {
  WorkModeFilter,
  EmploymentTypeFilter,
  SeniorityFilter,
  JobSortOption,
} from "@/types";

export interface JobFiltersProps {
  currentWorkMode?: string | string[];
  currentEmploymentType?: string | string[];
  currentSeniority?: string | string[];
  currentSort?: JobSortOption;
  currentSalaryMin?: number;
  className?: string;
}

const WORK_MODES: { value: WorkModeFilter; label: string }[] = [
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "onsite", label: "On-site" },
];

const EMPLOYMENT_TYPES: { value: EmploymentTypeFilter; label: string }[] = [
  { value: "full_time", label: "Full-Time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "part_time", label: "Part-Time" },
];

const SENIORITIES: { value: SeniorityFilter; label: string }[] = [
  { value: "entry", label: "Entry Level (0-2 yrs)" },
  { value: "mid", label: "Mid Level (3-5 yrs)" },
  { value: "senior", label: "Senior (5-8 yrs)" },
  { value: "lead", label: "Lead / Staff (8+ yrs)" },
  { value: "principal", label: "Principal / Architect" },
];

const SALARY_BRACKETS: { value: string; label: string }[] = [
  { value: "50000", label: "$50,000+ / yr" },
  { value: "100000", label: "$100,000+ / yr" },
  { value: "150000", label: "$150,000+ / yr" },
  { value: "200000", label: "$200,000+ / yr" },
];

const SORT_OPTIONS: { value: JobSortOption; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "relevance", label: "Best Match" },
  { value: "salary_desc", label: "Salary: High to Low" },
  { value: "salary_asc", label: "Salary: Low to High" },
];

export function JobFilters({
  currentSort = "newest",
  className = "",
}: JobFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");

    if (value === null || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    params.set("page", "1"); // reset page on filter change
    router.push(`${pathname}?${params.toString()}`);
  };

  const isSelected = (paramKey: string, value: string) => {
    const param = searchParams ? searchParams.get(paramKey) : null;
    return param === value;
  };

  const activeFilterCount = [
    searchParams?.get("workMode"),
    searchParams?.get("employmentType"),
    searchParams?.get("seniority"),
    searchParams?.get("salaryMin"),
    searchParams?.get("sort") && searchParams.get("sort") !== "newest",
  ].filter(Boolean).length;

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
    params.delete("workMode");
    params.delete("employmentType");
    params.delete("seniority");
    params.delete("salaryMin");
    params.delete("salaryMax");
    params.delete("sort");
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const FilterContent = () => (
    <div className="space-y-5 text-xs sm:text-sm">
      {/* Header with clear button */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
          <SlidersHorizontal className="w-4 h-4 text-blue-600" />
          <span>All Filters</span>
          {activeFilterCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Sort Option */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
          Sort By
        </label>
        <select
          value={searchParams?.get("sort") || currentSort || "newest"}
          onChange={(e) => updateParam("sort", e.target.value)}
          aria-label="Sort jobs by"
          className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Work Mode Filter */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
          Work Mode
        </label>
        <div className="space-y-1" role="group" aria-label="Filter by work mode">
          {WORK_MODES.map((mode) => {
            const active = isSelected("workMode", mode.value);
            return (
              <button
                key={mode.value}
                type="button"
                aria-pressed={active}
                onClick={() => updateParam("workMode", active ? null : mode.value)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  active
                    ? "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                }`}
              >
                <span>{mode.label}</span>
                {active && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Experience Level / Seniority Filter */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
          Experience Level
        </label>
        <div className="space-y-1" role="group" aria-label="Filter by seniority">
          {SENIORITIES.map((sen) => {
            const active = isSelected("seniority", sen.value);
            return (
              <button
                key={sen.value}
                type="button"
                aria-pressed={active}
                onClick={() => updateParam("seniority", active ? null : sen.value)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  active
                    ? "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                }`}
              >
                <span>{sen.label}</span>
                {active && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Salary Filter */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
          Minimum Salary
        </label>
        <div className="space-y-1" role="group" aria-label="Filter by minimum salary">
          {SALARY_BRACKETS.map((bracket) => {
            const active = isSelected("salaryMin", bracket.value);
            return (
              <button
                key={bracket.value}
                type="button"
                aria-pressed={active}
                onClick={() => updateParam("salaryMin", active ? null : bracket.value)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  active
                    ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                }`}
              >
                <span>{bracket.label}</span>
                {active && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Employment Type Filter */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
          Job Type
        </label>
        <div className="space-y-1" role="group" aria-label="Filter by employment type">
          {EMPLOYMENT_TYPES.map((type) => {
            const active = isSelected("employmentType", type.value);
            return (
              <button
                key={type.value}
                type="button"
                aria-pressed={active}
                onClick={() => updateParam("employmentType", active ? null : type.value)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  active
                    ? "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                }`}
              >
                <span>{type.label}</span>
                {active && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Trigger Button (< lg) */}
      <div className="lg:hidden w-full mb-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setMobileDrawerOpen(true)}
          className="w-full justify-between font-semibold"
          leftIcon={<Filter className="w-4 h-4 text-blue-600" />}
        >
          <span>Filters & Sort</span>
          {activeFilterCount > 0 && (
            <Badge variant="primary" size="sm">
              {activeFilterCount} Active
            </Badge>
          )}
        </Button>

        {/* Mobile Filter Sheet Drawer */}
        <Sheet
          isOpen={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
          title="Filter Tech Jobs"
          description="Filter by work mode, seniority, and salary"
        >
          <div className="space-y-6 pt-2">
            <FilterContent />
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <Button
                type="button"
                variant="primary"
                onClick={() => setMobileDrawerOpen(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 font-semibold"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </Sheet>
      </div>

      {/* Desktop Persistent Sidebar (>= lg) */}
      <aside
        className={`hidden lg:block w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-card ${className}`}
      >
        <FilterContent />
      </aside>
    </>
  );
}


