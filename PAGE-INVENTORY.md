# Page Inventory — JB Customer-Facing Routes

This inventory documents every customer-facing route present in the `frontend design` workspace. (Admin routes are strictly out-of-scope and excluded).

---

## 1. Homepage
* **Route:** `/`
* **Purpose:** Landing page highlighting direct-from-ATS verified tech openings, top hiring tech companies, search entry, value props, and recruiter portal banner.
* **Primary Components:** `Header`, `JobSearchForm`, `JobCard`, `CompanyCard`, `AdPlacement`, `Footer`.
* **Data Required:** Featured jobs, verified company snapshots.
* **Mock Data Used:** `MOCK_JOBS`, `MOCK_SNAPSHOTS`.
* **Responsive Considerations:** Hero search collapses into stacked inputs; featured jobs render 1-col on mobile, 2-col on desktop.

---

## 2. Job Search & Listing
* **Route:** `/jobs`
* **Purpose:** Core search experience with multifaceted filtering (work mode, employment type, seniority level, salary, keywords, location).
* **Primary Components:** `Header`, `JobSearchForm`, `JobFilters`, `JobList`, `JobCard`, `ActiveFilterChips`, `ListingAdPlacement`, `SaveSearchButton`, `Footer`.
* **Data Required:** Filtered job list, pagination metadata.
* **Mock Data Used:** `MOCK_JOBS` filtered via `SearchJobsService`.
* **Responsive Considerations:** Desktop uses sticky sidebar filters; mobile renders slide-over drawer `Sheet` via floating filter button.

---

## 3. Job Detail View
* **Route:** `/jobs/[jobId]`
* **Purpose:** Deep dive into a specific job posting with verified source badge, salary range, tech stack, AI summary, full description, direct-apply handoff, and related openings.
* **Primary Components:** `Header`, `JobDetail`, `JobDescription`, `ApplyButton`, `SaveButton`, `RelatedJobsSection`, `JobPostingJsonLd`, `AdPlacement`, `Footer`.
* **Data Required:** `JobDetailItem`, related jobs array, application status.
* **Mock Data Used:** `MOCK_JOBS` via `GetJobService` and `RelatedJobsService`.
* **Responsive Considerations:** Desktop uses 2-column layout with sticky right sidebar for application CTAs; mobile places apply bar at top and bottom.

---

## 4. Company Directory & Discovery
* **Route:** `/companies`
* **Purpose:** Directory of verified tech employers with hiring velocity signals, workplace distribution, salary transparency grades, and comparison tray.
* **Primary Components:** `Header`, `CompanyDiscoveryClient`, `CompanyDiscoveryFilters`, `CompanyCard`, `CompanyComparisonTray`, `AdPlacement`, `Footer`.
* **Data Required:** `CompanySignalSnapshot[]`, facets.
* **Mock Data Used:** `MOCK_SNAPSHOTS` via `DiscoverCompaniesService`.
* **Responsive Considerations:** Comparison tray fixed to bottom when items are selected; filter chips wrap responsively.

---

## 5. Company Intelligence Profile
* **Route:** `/companies/[slug]`
* **Purpose:** In-depth employer dossier showing 30/90-day hiring velocity, department distribution, tech stack footprint, active job openings, and ATS provenance.
* **Primary Components:** `Header`, `CompanyIntelligenceProfile`, `CompanyCard`, `Badge`, `AdPlacement`, `Footer`.
* **Data Required:** `CompanySignalSnapshot`, active `CompanyJobSummary[]`.
* **Mock Data Used:** `MOCK_SNAPSHOTS`, `MOCK_COMPANY_JOBS` via `GetCompanyIntelligenceService`.
* **Responsive Considerations:** Multi-column dashboard grid collapses to single column on mobile.

---

## 6. Company Comparison
* **Route:** `/companies/compare`
* **Purpose:** Side-by-side analytical comparison of multiple tech employers on hiring velocity, remote policy, compensation grade, and tech stack overlap.
* **Primary Components:** `Header`, `CompanyComparisonView`, `Badge`, `AdPlacement`, `Footer`.
* **Data Required:** `CompanyComparisonResult`.
* **Mock Data Used:** `CompareCompaniesService` over `MOCK_SNAPSHOTS`.
* **Responsive Considerations:** Horizontally scrollable comparison matrix on small screens.

---

## 7. Saved Jobs
* **Route:** `/saved-jobs`
* **Purpose:** Candidate bookmarks dashboard for tracking saved positions and one-click application initiation.
* **Primary Components:** `Header`, `SavedJobList`, `Card`, `Badge`, `Button`, `Footer`.
* **Data Required:** `SavedJobWithDetails[]`.
* **Mock Data Used:** `MOCK_SAVED_JOBS`.
* **Responsive Considerations:** Full-width card layout with responsive action buttons.

---

## 8. Candidate Activity Dashboard
* **Route:** `/activity`
* **Purpose:** Tabbed central hub for candidate history: Bookmarked jobs, Submitted applications, Recently viewed positions, Saved searches, and Job alert subscriptions.
* **Primary Components:** `Header`, `ActivityDashboard`, `SavedJobList`, `SavedSearchList`, `JobAlertList`, `CreateJobAlertModal`, `Footer`.
* **Data Required:** Saved jobs, applied jobs, viewed jobs, saved searches, job alerts.
* **Mock Data Used:** `MOCK_SAVED_JOBS`, `MOCK_APPLIED_JOBS`, `MOCK_VIEWED_JOBS`, `MOCK_SAVED_SEARCHES`, `MOCK_JOB_ALERTS`.
* **Responsive Considerations:** Horizontal scrollable tab headers on mobile.

---

## 9. Candidate Profile & Preferences
* **Route:** `/profile`
* **Purpose:** Management of candidate target titles, skills, preferred locations, workplace modes, seniority levels, and salary minimums.
* **Primary Components:** `Header`, `Card`, `Badge`, `Button`, `Footer`.
* **Data Required:** Candidate preferences.
* **Mock Data Used:** `MOCK_USER` profile.
* **Responsive Considerations:** Responsive form fields, chip multi-selectors.

---

## 10. Employers & Recruiters
* **Route:** `/employers`
* **Purpose:** Landing page for hiring teams and engineering leaders to connect ATS feeds (Greenhouse, Lever, Ashby) directly to the platform.
* **Primary Components:** `Header`, `Button`, `Card`, `Badge`, `Footer`.
* **Data Required:** Static content.
* **Mock Data Used:** None required.
* **Responsive Considerations:** Responsive feature grid and CTA cards.

---

## 11. Support & Contact
* **Route:** `/contact`
* **Purpose:** Contact form and support information for candidates and employers.
* **Primary Components:** `Header`, `Input`, `Button`, `Footer`.
* **Data Required:** Static content.
* **Mock Data Used:** None.

---

## 12. Legal: Privacy & Terms
* **Routes:** `/privacy`, `/terms`
* **Purpose:** Authoritative privacy policy, data rights, direct-ATS handoff disclosure, and terms of service.
* **Primary Components:** `Header`, `Footer`.
* **Data Required:** Static legal content.

---

## 13. Not Found (404)
* **Route:** `/_not-found`
* **Purpose:** Clear fallback page with recovery actions to return home or browse active jobs.
