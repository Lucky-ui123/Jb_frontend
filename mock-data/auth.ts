/**
 * DESIGN PREVIEW DATA — MOCK AUTHENTICATION
 * Safe preview user credentials with zero production secrets.
 */
export const MOCK_USER = {
  id: "mock-user-alex-morgan",
  email: "alex.morgan@example.com",
  user_metadata: {
    full_name: "Alex Morgan",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    headline: "Staff Systems Engineer | Distributed Platforms",
    preferredLocations: ["San Francisco, CA", "Austin, TX", "Remote"],
    workModes: ["remote", "hybrid"],
    employmentTypes: ["full_time"],
    seniorityLevels: ["Senior", "Staff", "Principal"],
    minSalary: 210000,
    salaryInterval: "yearly",
  },
  aud: "authenticated",
  role: "authenticated",
  created_at: new Date("2026-01-15T00:00:00Z").toISOString(),
};
