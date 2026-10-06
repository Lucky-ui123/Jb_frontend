# JB Frontend Design Workspace — System & Architectural Boundary

## 1. Purpose

This repository (`frontend design`) is an isolated frontend and visual design sandbox created specifically for iterating on UI/UX, layouts, and candidate experiences for **Job Platform (JB)** using tools such as Lovable and GitHub.

Its role in the product development lifecycle is:

```text
JB Portal (Production Source of Truth: D:\All\Portal)
        ↓
Isolated Frontend / Design Copy (D:\All\frontend design)
        ↓
GitHub (Design Sandbox Repository)
        ↓
Lovable (Visual Design & UX Iterations)
        ↓
Human Review & Stakeholder Approval
        ↓
Approved UI/UX components and CSS brought back into JB Portal via Antigravity
```

---

## 2. Source of Truth vs. Design Sandbox

* **Production Application (Source of Truth):**
  `D:\All\Portal` (or `D:\All\JB Portal\Portal`)
  Contains the full modular monolith, PostgreSQL/Drizzle persistence, Supabase authentication, ATS crawlers/adapters (Greenhouse, Lever, Ashby), ATS ingestion pipelines, verification engines, matching algorithms, and the Admin Control Console.

* **Design Workspace (Visual Sandbox):**
  `D:\All\frontend design`
  Contains **only customer-facing UI**, components, page routes, styling tokens, and isolated preview mock data.

---

## 3. Explicit Boundaries

### Allowed in this Repository
* **Customer-facing routes:** `/`, `/jobs`, `/jobs/[jobId]`, `/companies`, `/companies/[slug]`, `/companies/compare`, `/saved-jobs`, `/activity`, `/profile`, `/employers`, `/contact`, `/privacy`, `/terms`, `not-found`.
* **Visual components & styling:** Tailwind CSS, design tokens, layout hierarchy, card density, typography, badges, modals, trays, responsive layouts.
* **Mock preview data:** Stored under `mock-data/` for demonstration and preview states.
* **Client-side interactions:** Filters, sorting, keyword search, tabs, bookmark toggles, drawer sheets.
* **Ad placement slots:** Visual containers and mock formats for Google AdSense slots without executing production ad scripts.

### Strictly Prohibited in this Repository
* **No Database or ORM:** No PostgreSQL, Drizzle, migrations, or database tables.
* **No ATS Ingestion:** No crawlers, scrapers, parser pipelines, or ingestion workers.
* **No Admin Systems:** No Admin dashboards, RBAC tables, or operations consoles.
* **No Production Secrets:** No `.env` with real credentials, service-role keys, or OAuth secrets.
* **No Backend Monolith Re-creation:** No `modules/*/domain`, `modules/*/infrastructure`, or server orchestration layers.

---

## 4. How Changes Flow Back to Production

1. Designers iterate in Lovable or on GitHub branches.
2. Once visual design and UX are approved, senior engineering inspects the diff (components, CSS variables, HTML markup).
3. The approved presentation code is mapped into the production modular monolith architecture inside `D:\All\Portal`.
