"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { SavedSearchFilters } from "@/types";
import { Bookmark, BookmarkCheck, Loader2, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface SaveSearchButtonProps {
  query?: string;
  location?: string;
  filters?: SavedSearchFilters;
  className?: string;
}

export function SaveSearchButton({
  query,
  location,
  filters,
  className = "",
}: SaveSearchButtonProps) {
  const searchParams = useSearchParams();
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customName, setCustomName] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Extract from current URL search params if not explicitly passed
  const currentQuery = query ?? searchParams.get("q") ?? "";
  const currentLocation = location ?? searchParams.get("location") ?? "";

  const currentFilters: SavedSearchFilters = useMemo(() => {
    if (filters) return filters;
    return {
      workMode: searchParams.getAll("workMode").length > 0 ? searchParams.getAll("workMode") : searchParams.get("workMode") || undefined,
      employmentType: searchParams.getAll("employmentType").length > 0 ? searchParams.getAll("employmentType") : searchParams.get("employmentType") || undefined,
      seniority: searchParams.getAll("seniority").length > 0 ? searchParams.getAll("seniority") : searchParams.get("seniority") || undefined,
      sort: searchParams.get("sort") || undefined,
    };
  }, [filters, searchParams]);

  const handleOpenModal = () => {
    if (isSaved) {
      setIsSaved(false);
      setFeedbackMsg("Saved search removed.");
      setTimeout(() => setFeedbackMsg(null), 3000);
      return;
    }

    // Generate smart default name
    const parts: string[] = [];
    if (currentQuery.trim()) {
      parts.push(`"${currentQuery.trim()}"`);
    } else {
      parts.push("All Jobs");
    }
    if (currentLocation.trim()) {
      parts.push(`in ${currentLocation.trim()}`);
    }
    if (currentFilters.workMode) {
      const wm = Array.isArray(currentFilters.workMode) ? currentFilters.workMode.join(", ") : currentFilters.workMode;
      parts.push(`(${wm})`);
    }

    setCustomName(parts.join(" "));
    setIsModalOpen(true);
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setFeedbackMsg(null);

    await new Promise((resolve) => setTimeout(resolve, 300));
    setIsSaved(true);
    setIsModalOpen(false);
    setIsLoading(false);
    setFeedbackMsg("Search saved successfully!");
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  return (
    <>
      <div className={`inline-flex items-center gap-2 ${className}`}>
        {feedbackMsg && (
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1 animate-fade-in">
            <Check className="w-3.5 h-3.5" />
            <span>{feedbackMsg}</span>
          </span>
        )}

        <Button
          type="button"
          onClick={handleOpenModal}
          disabled={isLoading}
          variant={isSaved ? "primary" : "outline"}
          size="sm"
          className="gap-1.5 text-xs font-semibold shadow-sm transition-all"
        >
          {isLoading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : isSaved ? (
            <BookmarkCheck className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Bookmark className="w-3.5 h-3.5" />
          )}

          <span>{isSaved ? "Search Saved" : "Save Search"}</span>
        </Button>
      </div>

      {/* Save Search Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-card text-card-foreground border border-border w-full max-w-md rounded-2xl shadow-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Bookmark className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-foreground">Save This Search</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground text-sm font-medium p-1 rounded-md"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-muted-foreground">
              Save your current search query and filters to quickly re-run or manage from your activity dashboard.
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Search Name
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Senior Frontend in London"
                  required
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={isLoading}
                  className="gap-1.5"
                >
                  {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                  <span>Save Search</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
