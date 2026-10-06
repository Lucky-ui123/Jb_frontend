/**
 * DESIGN PREVIEW DATA — JOBS
 * Isolated mock data for rendering customer-facing job discovery and detail UI.
 */
import { JobDetailItem, SearchJobItem } from "@/types/jobs";

export const MOCK_JOBS: JobDetailItem[] = [
  {
    id: "job-stripe-staff-plat",
    title: "Staff Platform Engineer — High-Throughput Settlement Infrastructure",
    originalTitle: "Staff Software Engineer, Ledger & Settlements Engine",
    company: {
      id: "comp-stripe",
      name: "Stripe",
      slug: "stripe",
      logoUrl: null,
      websiteUrl: "https://stripe.com",
      description: "Stripe builds economic infrastructure for the internet.",
    },
    location: "San Francisco, CA (Hybrid)",
    workMode: "hybrid",
    employmentType: "full_time",
    seniority: "Staff",
    category: "Infrastructure & Systems",
    skills: ["Ruby", "Go", "Java", "PostgreSQL", "Kafka", "Distributed Systems"],
    salary: {
      min: 225000,
      max: 290000,
      currency: "USD",
      interval: "yearly",
    },
    aiSummary: "Architect resilient, double-entry financial settlement engines handling hundreds of billions in global transactional volume.",
    description: `## Role Overview

Stripe's Ledger and Settlements team architects the core financial ledger that guarantees zero-data-loss consistency for global money movement.

### Key Responsibilities:
* Design fault-tolerant distributed transaction ledgers with strict idempotency guarantees.
* Scale event-driven settlement systems processing billions in daily transaction flow.
* Partner with regulatory and financial engineering teams across global payment rails.

### Requirements:
* Proven expertise designing mission-critical distributed systems.
* Deep understanding of ACID guarantees, consensus algorithms, and relational data stores.
* Proficiency in Go, Java, or modern backend systems languages.`,
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
    canonicalUrl: "https://stripe.com/jobs/staff-platform-settlements",
    applicationUrl: "https://jobs.lever.co/stripe/84920-settlements",
    lifecycleStatus: "active",
  },
  {
    id: "job-cloudflare-runtime",
    title: "Staff Systems Engineer — Cloudflare Workers Runtime Core",
    originalTitle: "Staff Systems Engineer, Cloudflare Workers Runtime",
    company: {
      id: "comp-cloudflare",
      name: "Cloudflare",
      slug: "cloudflare",
      logoUrl: null,
      websiteUrl: "https://cloudflare.com",
      description: "Cloudflare is the leading security, performance, and reliability company helping to build a better Internet.",
    },
    location: "Austin, TX (Hybrid)",
    workMode: "hybrid",
    employmentType: "full_time",
    seniority: "Staff",
    category: "Infrastructure & Systems",
    skills: ["Rust", "C++", "V8", "Distributed Systems", "WebAssembly"],
    salary: {
      min: 210000,
      max: 270000,
      currency: "USD",
      interval: "yearly",
    },
    aiSummary: "Architect low-latency edge runtime execution environments powered by V8 isolates and Rust. High concurrency, distributed consensus, and Linux kernel optimization.",
    description: `## About the Team

The Cloudflare Workers team is building the serverless cloud of tomorrow. We run millions of user programs within microsecond cold starts at our global network edge in hundreds of cities.

### Key Responsibilities:
* Design and implement core V8 isolate sandbox execution and scheduling algorithms.
* Optimize memory footprint, IPC, and distributed storage primitives.
* Scale real-time telemetry, tracing, and multi-tenant security isolation.

### Requirements:
* Deep proficiency in Rust, C++, or modern systems languages.
* Thorough understanding of operating system internals, Linux kernel primitives, and network protocols.`,
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    canonicalUrl: "https://cloudflare.com/careers/staff-systems-edge",
    applicationUrl: "https://boards.greenhouse.io/cloudflare/jobs/839102",
    lifecycleStatus: "active",
  },
  {
    id: "job-openai-principal-ai",
    title: "Principal AI Platform Engineer — Inference Infrastructure",
    originalTitle: "Principal Systems Engineer, AI Serving & Inference",
    company: {
      id: "comp-openai",
      name: "OpenAI",
      slug: "openai",
      logoUrl: null,
      websiteUrl: "https://openai.com",
      description: "OpenAI is an AI research and deployment company. Our mission is to ensure that artificial general intelligence benefits all of humanity.",
    },
    location: "San Francisco, CA (Onsite)",
    workMode: "onsite",
    employmentType: "full_time",
    seniority: "Principal",
    category: "AI & Machine Learning",
    skills: ["Python", "C++", "CUDA", "PyTorch", "Distributed Systems", "Kubernetes"],
    salary: {
      min: 300000,
      max: 420000,
      currency: "USD",
      interval: "yearly",
    },
    aiSummary: "Scale large-scale GPU inference clusters serving hundreds of millions of active weekly requests with ultra-low latency.",
    description: `## Overview

Join OpenAI's core inference platform team responsible for serving state-of-the-art foundation models with high availability and hardware efficiency.

### Responsibilities:
* Build and scale GPU cluster orchestration and dynamic batching kernels.
* Optimize CUDA kernels, kv-cache memory architectures, and tensor parallelism.
* Partner with research teams to deploy next-generation reasoning architectures.`,
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 20),
    canonicalUrl: "https://openai.com/careers/principal-inference",
    applicationUrl: "https://jobs.ashbyhq.com/openai/9102-principal-inf",
    lifecycleStatus: "active",
  },
  {
    id: "job-vercel-fullstack",
    title: "Senior Full Stack Engineer — Next.js & Developer Experience",
    originalTitle: "Senior Full-Stack Engineer, Core Platform",
    company: {
      id: "comp-vercel",
      name: "Vercel",
      slug: "vercel",
      logoUrl: null,
      websiteUrl: "https://vercel.com",
      description: "Vercel provides the developer platform to build, preview, and deploy modern web applications effortlessly.",
    },
    location: "Remote (Global)",
    workMode: "remote",
    employmentType: "full_time",
    seniority: "Senior",
    category: "Full Stack Engineering",
    skills: ["TypeScript", "Next.js", "React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    salary: {
      min: 165000,
      max: 215000,
      currency: "USD",
      interval: "yearly",
    },
    aiSummary: "Build features across Vercel Dashboard, deployment pipelines, and preview engine. 100% remote-first engineering culture.",
    description: `## Role Overview

We are seeking a versatile Senior Full Stack Engineer to elevate our developer platform tools and dashboard experiences used by millions of engineers globally.`,
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 28),
    canonicalUrl: "https://vercel.com/careers/sr-fullstack",
    applicationUrl: "https://jobs.lever.co/vercel/2910-fullstack",
    lifecycleStatus: "active",
  },
  {
    id: "job-datadog-backend-data",
    title: "Senior Backend Engineer — Real-Time Streaming Telemetry",
    originalTitle: "Senior Software Engineer, Metrics Ingestion Engine",
    company: {
      id: "comp-datadog",
      name: "Datadog",
      slug: "datadog",
      logoUrl: null,
      websiteUrl: "https://datadoghq.com",
      description: "Datadog is the monitoring and security platform for cloud applications.",
    },
    location: "New York, NY (Hybrid)",
    workMode: "hybrid",
    employmentType: "full_time",
    seniority: "Senior",
    category: "Backend Engineering",
    skills: ["Go", "Kafka", "PostgreSQL", "Redis", "Distributed Systems"],
    salary: {
      min: 180000,
      max: 230000,
      currency: "USD",
      interval: "yearly",
    },
    aiSummary: "Scale high-throughput streaming telemetry pipelines ingesting trillions of events daily with Go and Kafka.",
    description: `## The Opportunity

Join Datadog's core metrics platform team to process trillions of metrics and trace points per second across multi-cloud environments.`,
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 36),
    canonicalUrl: "https://datadoghq.com/careers/backend-streaming",
    applicationUrl: "https://boards.greenhouse.io/datadog/jobs/381920",
    lifecycleStatus: "active",
  },
  {
    id: "job-github-cloud-security",
    title: "Staff Security Engineer — Application & Supply Chain Security",
    originalTitle: "Staff Product Security Engineer, GitHub Advanced Security",
    company: {
      id: "comp-github",
      name: "GitHub",
      slug: "github",
      logoUrl: null,
      websiteUrl: "https://github.com",
      description: "GitHub is where over 100 million developers shape the future of software.",
    },
    location: "Remote (US/Canada)",
    workMode: "remote",
    employmentType: "full_time",
    seniority: "Staff",
    category: "Security & Cloud",
    skills: ["Ruby", "Go", "Kubernetes", "AppSec", "OAuth", "Cryptographic Protocols"],
    salary: {
      min: 195000,
      max: 255000,
      currency: "USD",
      interval: "yearly",
    },
    aiSummary: "Drive threat modeling and security architecture for GitHub Advanced Security and Actions supply chain tooling.",
    description: `## Overview

Help secure the open-source software ecosystem and enterprise codebases with GitHub Advanced Security.`,
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    canonicalUrl: "https://github.com/careers/staff-security",
    applicationUrl: "https://jobs.lever.co/github/5819-staff-sec",
    lifecycleStatus: "active",
  }
];

export function mapJobToSearchItem(job: JobDetailItem): SearchJobItem {
  return {
    id: job.id,
    title: job.title,
    company: {
      id: job.company.slug || job.id,
      name: job.company.name,
      slug: job.company.slug,
      logoUrl: job.company.logoUrl,
    },
    location: job.location,
    workMode: job.workMode,
    employmentType: job.employmentType,
    seniority: job.seniority,
    skills: job.skills,
    salary: job.salary,
    aiSummary: job.aiSummary,
    postedAt: job.postedAt,
  };
}
