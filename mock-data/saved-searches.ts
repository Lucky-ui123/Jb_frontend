/**
 * DESIGN PREVIEW DATA — SAVED SEARCHES
 * Isolated mock data for search subscriptions.
 */
import { SavedSearchRecord } from "@/types/saved-searches";

export const MOCK_SAVED_SEARCHES: SavedSearchRecord[] = [
  {
    id: "search-1",
    userId: "mock-user-alex-morgan",
    name: "Staff / Principal Distributed Systems (Remote)",
    query: "Distributed Systems",
    location: "Remote",
    filters: {
      q: "Distributed Systems",
      workMode: ["remote", "hybrid"],
      seniority: ["Staff", "Principal"],
    },
    criteriaHash: "hash-mock-12345",
    lastRunAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
  },
  {
    id: "search-2",
    userId: "mock-user-alex-morgan",
    name: "Rust Infrastructure Roles (SF Bay Area)",
    query: "Rust",
    location: "San Francisco, CA",
    filters: {
      q: "Rust",
      location: "San Francisco, CA",
    },
    criteriaHash: "hash-mock-67890",
    lastRunAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
  },
];
