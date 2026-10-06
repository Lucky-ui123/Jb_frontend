/**
 * DESIGN PREVIEW DATA — ACTIVITY
 * Isolated mock candidate activity data for rendering application history and telemetry.
 */
import { ViewedJobWithDetails, AppliedJobWithDetails } from "@/types/activity";

export const MOCK_VIEWED_JOBS: ViewedJobWithDetails[] = [
  {
    id: "view-1",
    userId: "mock-user-alex-morgan",
    jobId: "job-stripe-staff-plat",
    viewCount: 3,
    firstViewedAt: new Date(Date.now() - 1000 * 60 * 60 * 18),
    lastViewedAt: new Date(Date.now() - 1000 * 60 * 30),
    job: {
      id: "job-stripe-staff-plat",
      title: "Staff Platform Engineer — High-Throughput Settlement Infrastructure",
      company: {
        id: "comp-stripe",
        name: "Stripe",
        slug: "stripe",
        logoUrl: null,
        websiteUrl: "https://stripe.com",
      },
      locationRaw: "San Francisco, CA (Hybrid)",
      workplaceType: "hybrid",
      jobType: "full_time",
      lifecycleStatus: "active",
      canonicalUrl: "https://stripe.com/jobs/staff-platform-settlements",
      applicationUrl: "https://jobs.lever.co/stripe/84920-settlements",
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
    },
  },
  {
    id: "view-2",
    userId: "mock-user-alex-morgan",
    jobId: "job-cloudflare-runtime",
    viewCount: 1,
    firstViewedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    lastViewedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    job: {
      id: "job-cloudflare-runtime",
      title: "Staff Systems Engineer — Cloudflare Workers Runtime Core",
      company: {
        id: "comp-cloudflare",
        name: "Cloudflare",
        slug: "cloudflare",
        logoUrl: null,
        websiteUrl: "https://cloudflare.com",
      },
      locationRaw: "Austin, TX (Hybrid)",
      workplaceType: "hybrid",
      jobType: "full_time",
      lifecycleStatus: "active",
      canonicalUrl: "https://cloudflare.com/careers/staff-systems-edge",
      applicationUrl: "https://boards.greenhouse.io/cloudflare/jobs/839102",
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    },
  },
];

export const MOCK_APPLIED_JOBS: AppliedJobWithDetails[] = [
  {
    id: "app-1",
    userId: "mock-user-alex-morgan",
    jobId: "job-stripe-staff-plat",
    sourceUrl: "https://jobs.lever.co/stripe/84920-settlements",
    initiatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    metadata: { atsSource: "lever" },
    job: {
      id: "job-stripe-staff-plat",
      title: "Staff Platform Engineer — High-Throughput Settlement Infrastructure",
      company: {
        id: "comp-stripe",
        name: "Stripe",
        slug: "stripe",
        logoUrl: null,
        websiteUrl: "https://stripe.com",
      },
      locationRaw: "San Francisco, CA (Hybrid)",
      workplaceType: "hybrid",
      jobType: "full_time",
      lifecycleStatus: "active",
      canonicalUrl: "https://stripe.com/jobs/staff-platform-settlements",
      applicationUrl: "https://jobs.lever.co/stripe/84920-settlements",
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
    },
  },
];
