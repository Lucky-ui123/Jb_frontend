"use client";

import { useState } from "react";
import { SavedSearchFilters, AlertFrequency } from "@/types";
import { Bell, Loader2, Plus, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface CreateJobAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
  savedSearchId?: string;
  defaultName?: string;
  query?: string;
  location?: string;
  filters?: SavedSearchFilters;
}

export function CreateJobAlertModal({
  isOpen,
  onClose,
  onCreated,
  savedSearchId,
  defaultName = "",
  query,
  location,
  filters,
}: CreateJobAlertModalProps) {
  const [name, setName] = useState<string>(defaultName || (query ? `Alert for "${query}"` : "Daily Job Alert"));
  const [frequency, setFrequency] = useState<AlertFrequency>("daily");
  const [targetEmail, setTargetEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate creation for design preview
    await new Promise((resolve) => setTimeout(resolve, 300));
    setIsLoading(false);
    onCreated?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-card text-card-foreground border border-border w-full max-w-md rounded-2xl shadow-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-foreground">Create Job Alert</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground text-sm font-medium p-1 rounded-md"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-muted-foreground">
          Receive email notifications when new direct-ATS job postings match this criteria.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">
              Alert Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Daily Staff Systems Openings"
              required
              className="w-full px-3 py-2 text-sm bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">
              Notification Frequency
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as AlertFrequency)}
              className="w-full px-3 py-2 text-sm bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="instant">Instant (As discovered)</option>
              <option value="daily">Daily Digest</option>
              <option value="weekly">Weekly Summary</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">
              Delivery Email (Optional)
            </label>
            <div className="relative">
              <input
                type="email"
                value={targetEmail}
                onChange={(e) => setTargetEmail(e.target.value)}
                placeholder="Leave blank to use account email"
                className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
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
              <span>Create Alert</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
