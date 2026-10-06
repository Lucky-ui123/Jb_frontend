# Lovable Instructions — JB Frontend Design Sandbox

> **CRITICAL DIRECTIVE FOR LOVABLE:**
> This repository is a pure **Frontend / UI / UX Design Sandbox** for Job Platform (JB).
> **DO NOT** introduce backend architecture, database schemas, ORMs, Supabase authentication infrastructure, Admin panels, or ATS web crawler systems.

---

## 1. Scope & Primary Focus

Lovable should focus on crafting world-class, modern, high-density, and responsive web design for job seekers and candidates.

Prioritize:
* **Visual Aesthetics & Polish:** Refined spacing, high contrast, clean micro-interactions, subtle borders, card elevation, and visual hierarchy.
* **Information Density:** Tech candidates value scannable, dense information (salary ranges, tech stacks, verification badges, hiring velocity, remote policy).
* **Responsive Layouts:** Flawless behavior on mobile (360px+), tablet, desktop, and ultra-wide screens.
* **Component Design:** Clean buttons, badges, modals, drawers (sheets), search filters, and tab navigation.
* **Accessibility:** Semantic HTML elements, ARIA attributes, keyboard navigation, and focus indicators.

---

## 2. Invariants & Rules

1. **Preserve the Font Family:**
   The project uses **Inter** (`var(--font-inter)`). Do not replace the primary font family with arbitrary web fonts.
2. **Preserve the Brand & Visual Baseline:**
   The primary brand is clean tech blue (`#2563eb` / HSL `221.2 83.2% 53.3%`) with dark mode support. Adapt within the established color token system (`globals.css` and `styles/`).
3. **Preserve Customer Route Intent:**
   Do not delete or change the purpose of customer-facing routes (`/jobs`, `/companies`, `/saved-jobs`, `/activity`, `/profile`, `/employers`).
4. **Preserve Ad Placements:**
   Ad slots (`AdPlacement`, `ListingAdPlacement`, `AnchorAd`) are intentional layout inventory for AdSense monetization. Design around them without breaking them.
5. **Mock Data Is Pre-configured:**
   All preview data lives under `mock-data/` and helper types under `types/`. Use these mock objects to render realistic states.

---

## 3. Directory Layout

```text
frontend design/
├── app/                  # Next.js customer-facing App Router pages
├── components/           # Reusable UI, layout, job, and company components
│   ├── layout/           # Header, Footer, UserNav
│   ├── ui/               # Button, Badge, Card, Input, Sheet, Skeleton
│   ├── jobs/             # JobCard, JobList, JobDetail, JobFilters, JobSearchForm
│   ├── companies/        # CompanyCard, Discovery, Comparison, Profiles
│   ├── activity/         # ActivityDashboard
│   ├── saved-jobs/       # SavedJobList
│   ├── saved-searches/   # SavedSearchList, SaveSearchButton
│   ├── job-alerts/       # CreateJobAlertModal, JobAlertList
│   └── ads/              # AdPlacement, AdSlot, AnchorAd, InPageAd
├── mock-data/            # Isolated mock datasets (jobs, companies, activity, auth)
├── types/                # TypeScript interface definitions
├── lib/                  # Frontend utilities, auth preview helpers, mock services
├── styles/               # Design tokens (colors, typography, spacing)
└── public/               # Static assets
```
