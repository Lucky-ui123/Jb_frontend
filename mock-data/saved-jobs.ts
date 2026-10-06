/**
 * DESIGN PREVIEW DATA — SAVED JOBS
 * Isolated mock data for bookmarks and saved job lists.
 */
import { SavedJobWithDetails } from "@/types/saved-jobs";

export const MOCK_SAVED_JOBS: SavedJobWithDetails[] = [
  {
    id: "saved-1",
    userId: "mock-user-alex-morgan",
    jobId: "job-openai-principal-ai",
    savedAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
    job: {
      id: "job-openai-principal-ai",
      title: "Principal AI Platform Engineer — Inference Infrastructure",
      company: {
        id: "comp-openai",
        name: "OpenAI",
        slug: "openai",
        logoUrl: null,
        websiteUrl: "https://openai.com",
      },
      locationRaw: "San Francisco, CA (Onsite)",
      workplaceType: "onsite",
      jobType: "full_time",
      salaryMin: 300000,
      salaryMax: 420000,
      salaryCurrency: "USD",
      salaryInterval: "yearly",
      lifecycleStatus: "active",
      canonicalUrl: "https://openai.com/careers/principal-inference",
      applicationUrl: "https://jobs.ashbyhq.com/openai/9102-principal-inf",
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 20),
    },
  },
  {
    id: "saved-2",
    userId: "mock-user-alex-morgan",
    jobId: "job-vercel-fullstack",
    savedAt: new Date(Date.now() - 1000 * 60 * 60 * 16),
    job: {
      id: "job-vercel-fullstack",
      title: "Senior Full Stack Engineer — Next.js & Developer Experience",
      company: {
        id: "comp-vercel",
        name: "Vercel",
        slug: "vercel",
        logoUrl: null,
        websiteUrl: "https://vercel.com",
      },
      locationRaw: "Remote (Global)",
      workplaceType: "remote",
      jobType: "full_time",
      salaryMin: 165000,
      salaryMax: 215000,
      salaryCurrency: "USD",
      salaryInterval: "yearly",
      lifecycleStatus: "active",
      canonicalUrl: "https://vercel.com/careers/sr-fullstack",
      applicationUrl: "https://jobs.lever.co/vercel/2910-fullstack",
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 28),
    },
  },
];
