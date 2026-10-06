import { SavedSearchFilters } from "./saved-searches";

export type AlertFrequency = "instant" | "daily" | "weekly";
export type AlertChannel = "email" | "in_app" | "both";

export interface JobAlertRecord {
  id: string;
  userId: string;
  savedSearchId: string | null;
  name: string;
  query: string | null;
  location: string | null;
  filters: SavedSearchFilters;
  frequency: AlertFrequency;
  channel: AlertChannel;
  targetEmail: string | null;
  isActive: boolean;
  lastCheckedAt: Date | null;
  lastSentAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateJobAlertInput {
  name: string;
  query?: string;
  location?: string;
  filters?: SavedSearchFilters;
  frequency: AlertFrequency;
  channel?: AlertChannel;
  targetEmail?: string;
}
