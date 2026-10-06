"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { X, RotateCcw } from "lucide-react";

export function ActiveFilterChips() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!searchParams) return null;

  const activeChips: { key: string; label: string; value: string }[] = [];

  const q = searchParams.get("q");
  if (q) {
    activeChips.push({ key: "q", label: `Search: "${q}"`, value: q });
  }

  const location = searchParams.get("location");
  if (location) {
    activeChips.push({ key: "location", label: `Location: "${location}"`, value: location });
  }

  const workMode = searchParams.get("workMode");
  if (workMode) {
    const formatWorkMode = (v: string) => {
      if (v === "remote") return "Remote";
      if (v === "hybrid") return "Hybrid";
      if (v === "onsite") return "On-site";
      return v;
    };
    activeChips.push({ key: "workMode", label: formatWorkMode(workMode), value: workMode });
  }

  const employmentType = searchParams.get("employmentType");
  if (employmentType) {
    const formatType = (v: string) => {
      if (v === "full_time") return "Full-Time";
      if (v === "part_time") return "Part-Time";
      if (v === "contract") return "Contract";
      if (v === "internship") return "Internship";
      return v.replace(/_/g, " ");
    };
    activeChips.push({ key: "employmentType", label: formatType(employmentType), value: employmentType });
  }

  const seniority = searchParams.get("seniority");
  if (seniority) {
    const formatSeniority = (v: string) => {
      if (v === "entry") return "Entry Level";
      if (v === "mid") return "Mid Level";
      if (v === "senior") return "Senior";
      if (v === "lead") return "Lead / Staff";
      if (v === "principal") return "Principal";
      return v;
    };
    activeChips.push({ key: "seniority", label: formatSeniority(seniority), value: seniority });
  }

  const salaryMin = searchParams.get("salaryMin");
  if (salaryMin) {
    activeChips.push({ key: "salaryMin", label: `Salary: $${Number(salaryMin).toLocaleString()}+`, value: salaryMin });
  }

  const sort = searchParams.get("sort");
  if (sort && sort !== "newest") {
    const formatSort = (v: string) => {
      if (v === "relevance") return "Best Match";
      if (v === "salary_desc") return "Salary: High to Low";
      if (v === "salary_asc") return "Salary: Low to High";
      return v;
    };
    activeChips.push({ key: "sort", label: `Sorted: ${formatSort(sort)}`, value: sort });
  }

  if (activeChips.length === 0) {
    return null;
  }

  const removeFilter = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAll = () => {
    router.push(pathname);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 py-2">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Active Filters:
      </span>

      {activeChips.map((chip) => (
        <button
          key={`${chip.key}-${chip.value}`}
          type="button"
          onClick={() => removeFilter(chip.key)}
          className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-medium transition-colors"
          aria-label={`Remove filter ${chip.label}`}
        >
          <span>{chip.label}</span>
          <X className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
        </button>
      ))}

      <button
        type="button"
        onClick={clearAll}
        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:underline transition-colors"
      >
        <RotateCcw className="w-3 h-3" />
        <span>Clear all</span>
      </button>
    </div>
  );
}
