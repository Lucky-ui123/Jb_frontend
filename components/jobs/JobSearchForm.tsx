"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, MapPin, ArrowRight, Briefcase, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export interface JobSearchFormProps {
  initialQuery?: string;
  initialLocation?: string;
  initialSeniority?: string;
  className?: string;
  size?: "default" | "large";
}

export function JobSearchForm({
  initialQuery = "",
  initialLocation = "",
  initialSeniority = "",
  className = "",
  size = "default",
}: JobSearchFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [text, setText] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const [seniority, setSeniority] = useState(initialSeniority);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");

    if (text.trim()) {
      params.set("q", text.trim());
    } else {
      params.delete("q");
    }

    if (location.trim()) {
      params.set("location", location.trim());
    } else {
      params.delete("location");
    }

    if (seniority.trim()) {
      params.set("seniority", seniority.trim());
    } else {
      params.delete("seniority");
    }

    // Reset page to 1 when performing a new search
    params.set("page", "1");

    router.push(`/jobs?${params.toString()}`);
  };

  const isLarge = size === "large";

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/60 dark:shadow-none border border-slate-200 dark:border-slate-800 p-2 sm:p-2.5 transition-all ${className}`}
    >
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
        {/* Keyword Search Input */}
        <div className="flex-[1.4]">
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onClear={() => setText("")}
            placeholder="Enter skills / designations / companies"
            aria-label="Search by job title, skills, or company"
            startIcon={<Search className="w-4 h-4 text-slate-400" />}
            className="border-0 bg-slate-50/60 dark:bg-slate-800/60 focus:bg-white dark:focus:bg-slate-900"
          />
        </div>

        {/* Divider for desktop */}
        <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-800" />

        {/* Experience Select (for large/hero form) */}
        {isLarge && (
          <>
            <div className="relative flex-1">
              <div className="relative flex items-center">
                <Briefcase className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
                <select
                  value={seniority}
                  onChange={(e) => setSeniority(e.target.value)}
                  aria-label="Select experience level"
                  className="w-full h-10 pl-9 pr-8 text-xs sm:text-sm font-medium bg-slate-50/60 dark:bg-slate-800/60 focus:bg-white dark:focus:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer transition-all"
                >
                  <option value="">Select experience</option>
                  <option value="entry">Entry level (0-2 yrs)</option>
                  <option value="mid">Mid level (3-5 yrs)</option>
                  <option value="senior">Senior (5-8 yrs)</option>
                  <option value="lead">Lead / Principal (8+ yrs)</option>
                </select>
                <ChevronDown className="absolute right-3 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-800" />
          </>
        )}

        {/* Location Search Input */}
        <div className="flex-1">
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onClear={() => setLocation("")}
            placeholder="Enter location / Remote"
            aria-label="Search by location, city, or remote"
            startIcon={<MapPin className="w-4 h-4 text-slate-400" />}
            className="border-0 bg-slate-50/60 dark:bg-slate-800/60 focus:bg-white dark:focus:bg-slate-900"
          />
        </div>

        {/* Search CTA */}
        <Button
          type="submit"
          variant="primary"
          size={isLarge ? "lg" : "md"}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 shadow-sm"
        >
          Search
        </Button>
      </div>
    </form>
  );
}

