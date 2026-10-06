"use client";

import { useState } from "react";
import Link from "next/link";
import { JobAlertRecord } from "@/types";
import { buildSearchUrl } from "@/components/saved-searches/SavedSearchList";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Bell,
  BellOff,
  Search,
  MapPin,
  Calendar,
  Trash2,
  ExternalLink,
  Loader2,
  Mail,
  Filter,
} from "lucide-react";

export interface JobAlertListProps {
  initialAlerts: JobAlertRecord[];
}

function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function JobAlertList({ initialAlerts }: JobAlertListProps) {
  const [alerts, setAlerts] = useState<JobAlertRecord[]>(initialAlerts);
  const [togglingIds, setTogglingIds] = useState<Set<string>>(new Set());
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  const handleToggle = async (id: string) => {
    setTogglingIds((prev) => new Set(prev).add(id));
    await new Promise((resolve) => setTimeout(resolve, 200));

    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a))
    );
    setTogglingIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleDelete = async (id: string) => {
    setDeletingIds((prev) => new Set(prev).add(id));
    await new Promise((resolve) => setTimeout(resolve, 200));

    setAlerts((prev) => prev.filter((a) => a.id !== id));
    setDeletingIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  if (alerts.length === 0) {
    return (
      <div className="py-16 px-4 text-center max-w-md mx-auto space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-inner">
          <Bell className="w-7 h-7 stroke-[1.5]" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-foreground">No active job alerts</h3>
          <p className="text-xs text-muted-foreground">
            Create alerts from your saved searches or search filters to get notified about new matching positions.
          </p>
        </div>
        <Link href="/jobs" className="inline-block pt-1">
          <Button variant="primary" size="sm">
            <span>Explore Jobs</span>
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {alerts.map((item) => {
        const searchUrl = buildSearchUrl({
          query: item.query,
          location: item.location,
          filters: item.filters,
        });
        const isToggling = togglingIds.has(item.id);
        const isDeleting = deletingIds.has(item.id);
        const f = item.filters || {};

        return (
          <Card
            key={item.id}
            className={`p-5 sm:p-6 transition-all border-border/80 hover:border-primary/40 shadow-sm hover:shadow-md ${
              !item.isActive ? "opacity-75 bg-muted/30" : ""
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2.5 min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-base sm:text-lg text-foreground line-clamp-1">
                    {item.name}
                  </span>

                  <Badge
                    variant={item.isActive ? "verified" : "secondary"}
                    size="sm"
                    className="gap-1 text-[11px]"
                  >
                    {item.isActive ? <Bell className="w-3 h-3" /> : <BellOff className="w-3 h-3" />}
                    <span>{item.isActive ? "Active" : "Paused"}</span>
                  </Badge>

                  <Badge variant="outline" size="sm" className="capitalize text-[11px]">
                    {item.frequency}
                  </Badge>
                </div>

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

                  {item.targetEmail && (
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      {item.targetEmail}
                    </span>
                  )}

                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    Created {formatDate(item.createdAt)}
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
                </div>
              </div>

              {/* Actions */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/50">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggle(item.id)}
                    disabled={isToggling}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                      item.isActive
                        ? "bg-secondary text-foreground hover:bg-secondary/80"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    {isToggling ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : item.isActive ? (
                      <>
                        <BellOff className="w-3.5 h-3.5" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Bell className="w-3.5 h-3.5" />
                        <span>Resume</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    disabled={isDeleting}
                    aria-label="Delete alert"
                    title="Delete alert"
                    className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </button>

                  <Link href={searchUrl}>
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                      <span>View Jobs</span>
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
  );
}
