"use client";

import { useState } from "react";
import Link from "next/link";
import { SavedSearchRecord, SavedSearchFilters } from "@/types";
import { CreateJobAlertModal } from "@/components/job-alerts/CreateJobAlertModal";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Search,
  MapPin,
  Calendar,
  Trash2,
  ExternalLink,
  Edit2,
  Check,
  X,
  Bell,
  Filter,
  Loader2,
} from "lucide-react";

export interface SavedSearchListProps {
  initialSearches: SavedSearchRecord[];
}

export function buildSearchUrl(item: { query?: string | null; location?: string | null; filters?: SavedSearchFilters }): string {
  const params = new URLSearchParams();
  if (item.query) params.set("q", item.query);
  if (item.location) params.set("location", item.location);

  const f = item.filters || {};
  if (f.workMode) {
    if (Array.isArray(f.workMode)) {
      f.workMode.forEach((m) => params.append("workMode", m));
    } else {
      params.set("workMode", f.workMode);
    }
  }
  if (f.employmentType) {
    if (Array.isArray(f.employmentType)) {
      f.employmentType.forEach((e) => params.append("employmentType", e));
    } else {
      params.set("employmentType", f.employmentType);
    }
  }
  if (f.seniority) {
    if (Array.isArray(f.seniority)) {
      f.seniority.forEach((s) => params.append("seniority", s));
    } else {
      params.set("seniority", f.seniority);
    }
  }
  if (f.sort) params.set("sort", f.sort);

  const qs = params.toString();
  return qs ? `/jobs?${qs}` : "/jobs";
}

function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function SavedSearchList({ initialSearches }: SavedSearchListProps) {
  const [searches, setSearches] = useState<SavedSearchRecord[]>(initialSearches);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  const [alertTargetSearch, setAlertTargetSearch] = useState<SavedSearchRecord | null>(null);
  const [alertSuccessMsg, setAlertSuccessMsg] = useState<string | null>(null);

  const handleStartEdit = (item: SavedSearchRecord) => {
    setEditingId(item.id);
    setEditName(item.name);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  const handleSaveEdit = async (id: string) => {
    if (!editName.trim()) return;

    setSearches((prev) =>
      prev.map((s) => (s.id === id ? { ...s, name: editName.trim() } : s))
    );
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    setDeletingIds((prev) => new Set(prev).add(id));
    await new Promise((resolve) => setTimeout(resolve, 200));

    setSearches((prev) => prev.filter((s) => s.id !== id));
    setDeletingIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  if (searches.length === 0) {
    return (
      <div className="py-16 px-4 text-center max-w-md mx-auto space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-inner">
          <Search className="w-7 h-7 stroke-[1.5]" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-foreground">No saved searches</h3>
          <p className="text-xs text-muted-foreground">
            Save custom filters and keywords on the job search page to quickly re-run queries later.
          </p>
        </div>
        <Link href="/jobs" className="inline-block pt-1">
          <Button variant="primary" size="sm">
            <span>Search Jobs</span>
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {alertSuccessMsg && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4" />
          <span>{alertSuccessMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {searches.map((item) => {
          const searchUrl = buildSearchUrl(item);
          const isEditing = editingId === item.id;
          const isDeleting = deletingIds.has(item.id);
          const f = item.filters || {};

          return (
            <Card
              key={item.id}
              className="p-5 sm:p-6 transition-all border-border/80 hover:border-primary/40 shadow-sm hover:shadow-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2.5 min-w-0 flex-1">
                  {isEditing ? (
                    <div className="flex items-center gap-2 max-w-md">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="px-3 py-1.5 text-sm bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 flex-1"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(item.id)}
                        className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                        title="Save name"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                        title="Cancel"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link
                        href={searchUrl}
                        className="font-bold text-base sm:text-lg text-foreground hover:text-primary transition-colors line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleStartEdit(item)}
                        className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                        title="Edit search name"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-muted-foreground">
                    {item.query && (
                      <span className="flex items-center gap-1 font-medium text-foreground">
                        <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        &quot;{item.query}&quot;
                      </span>
                    )}

                    {item.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        {item.location}
                      </span>
                    )}

                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      Saved {formatDate(item.createdAt)}
                    </span>
                  </div>

                  {/* Filter Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {f.workMode && (
                      <Badge variant="secondary" size="sm">
                        {Array.isArray(f.workMode) ? f.workMode.join(", ") : f.workMode}
                      </Badge>
                    )}
                    {f.employmentType && (
                      <Badge variant="employment" size="sm">
                        {Array.isArray(f.employmentType) ? f.employmentType.join(", ") : f.employmentType}
                      </Badge>
                    )}
                    {f.seniority && (
                      <Badge variant="secondary" size="sm">
                        {Array.isArray(f.seniority) ? f.seniority.join(", ") : f.seniority}
                      </Badge>
                    )}
                    {f.sort && (
                      <Badge variant="outline" size="sm" className="gap-1 text-[11px]">
                        <Filter className="w-2.5 h-2.5" />
                        <span>Sorted: {f.sort}</span>
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/50">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAlertTargetSearch(item)}
                      aria-label="Create job alert from search"
                      title="Create job alert from this search"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 transition-colors"
                    >
                      <Bell className="w-3.5 h-3.5" />
                      <span>Alert</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      disabled={isDeleting}
                      aria-label="Delete saved search"
                      title="Delete saved search"
                      className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>

                    <Link href={searchUrl}>
                      <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                        <span>Run Search</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Create Alert Modal for Saved Search */}
      {alertTargetSearch && (
        <CreateJobAlertModal
          isOpen={true}
          onClose={() => setAlertTargetSearch(null)}
          onCreated={() => {
            setAlertSuccessMsg(`Job alert created for "${alertTargetSearch.name}"!`);
            setTimeout(() => setAlertSuccessMsg(null), 4000);
          }}
          savedSearchId={alertTargetSearch.id}
          defaultName={`${alertTargetSearch.name} Alert`}
          query={alertTargetSearch.query || undefined}
          location={alertTargetSearch.location || undefined}
          filters={alertTargetSearch.filters}
        />
      )}
    </>
  );
}

