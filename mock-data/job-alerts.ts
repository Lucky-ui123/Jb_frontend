/**
 * DESIGN PREVIEW DATA — JOB ALERTS
 * Isolated mock data for active notifications.
 */
import { JobAlertRecord } from "@/types/job-alerts";

export const MOCK_JOB_ALERTS: JobAlertRecord[] = [
  {
    id: "alert-1",
    userId: "mock-user-alex-morgan",
    savedSearchId: "search-1",
    name: "Daily Staff Systems Openings",
    query: "Distributed Systems",
    location: "Remote",
    filters: {
      q: "Distributed Systems",
      workMode: ["remote"],
      seniority: ["Staff"],
    },
    frequency: "daily",
    channel: "email",
    targetEmail: "alex.morgan@example.com",
    isActive: true,
    lastCheckedAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
    lastSentAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
  },
];
