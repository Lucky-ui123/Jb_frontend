# Component Inventory — JB Frontend Design Sandbox

This inventory catalogues the reusable UI and domain presentation components currently implemented in `D:\All\frontend design\components`.

---

## 1. Layout Components (`components/layout/`)
* **Header (`Header.tsx`):**
  Global navigation bar with logo, navigation links (`/jobs`, `/companies`, `/saved-jobs`, `/activity`), theme/search shortcuts, mobile sheet drawer menu, and `UserNav`.
* **Footer (`Footer.tsx`):**
  Semantic footer containing category directories, legal links (`/privacy`, `/terms`), direct ATS integrity badges, and copyright notices.
* **UserNav (`UserNav.tsx`):**
  Client-side navigation control displaying authenticated user avatar / initial, dropdown menu for quick navigation to profile, saved jobs, activity, or sign-in CTA button.

---

## 2. Core UI Components (`components/ui/`)
* **Badge (`Badge.tsx`):**
  Multi-variant status indicator supporting variants: `default`, `secondary`, `outline`, `verified`, `match`, `salary`, `remote`, `employment`, `destructive`, `warning`, `success`.
* **Button (`Button.tsx`):**
  Accessible button supporting variants (`primary`, `secondary`, `outline`, `ghost`, `destructive`, `link`) and sizes (`sm`, `md`, `lg`, `icon`).
* **Card (`Card.tsx`):**
  Container surface with rounded corners, subtle border, elevation shadows, and optional hover interactivity.
* **Input (`Input.tsx`):**
  Standardized text input with focus ring and error state styling.
* **Sheet (`Sheet.tsx`):**
  Accessible slide-over drawer modal used for mobile navigation menus and mobile filter panels.
* **Skeleton (`Skeleton.tsx`):**
  Pulse loading placeholder for async data loading states.

---

## 3. Job Components (`components/jobs/`)
* **JobCard (`JobCard.tsx`):**
  High-density card presenting job title, company name, location, work mode badge, employment type, salary range, AI match reason pills, and quick save button.
* **JobList (`JobList.tsx`):**
  Renders paginated list of `JobCard` items with integrated in-feed ad placement slots and pagination controls.
* **JobDetail (`JobDetail.tsx`):**
  Comprehensive presentation of job specifications, compensation bounds, tech skills, ATS source provenance, and sticky apply action bar.
* **JobDescription (`JobDescription.tsx`):**
  Sanitized and formatted description display with section headers.
* **JobSearchForm (`JobSearchForm.tsx`):**
  Dual-input search bar for keywords and location with clearable inputs and immediate form submission.
* **JobFilters (`JobFilters.tsx`):**
  Multifaceted filter sidebar (work mode, employment type, seniority level, sorting) with active filter counters and reset actions.
* **ActiveFilterChips (`ActiveFilterChips.tsx`):**
  Horizontal chips representing currently applied search filters with one-click removal.
* **ApplyButton (`ApplyButton.tsx`):**
  Direct ATS handoff button handling unauthenticated sign-in prompt, recording simulated application state, and opening employer career portals.
* **SaveButton (`SaveButton.tsx`):**
  One-click bookmark button with optimistic toggle feedback.
* **RelatedJobsSection (`RelatedJobsSection.tsx`):**
  Carousel / grid of similar positions based on skill overlap and job category.
* **JobPostingJsonLd (`JobPostingJsonLd.tsx`):**
  Injects structured Schema.org `JobPosting` JSON-LD for search engine indexing and Google Jobs rich snippets.

---

## 4. Company Components (`components/companies/`)
* **CompanyCard (`CompanyCard.tsx`):**
  Signal-rich card highlighting hiring velocity, remote friendliness score, salary transparency grade, and comparison toggle.
* **CompanyDiscoveryClient (`CompanyDiscoveryClient.tsx`):**
  Client controller for filtering, sorting, and pagination across verified employer datasets.
* **CompanyDiscoveryFilters (`CompanyDiscoveryFilters.tsx`):**
  Filter controls for company industry, velocity tier, remote score, and compensation grade.
* **CompanyComparisonTray (`CompanyComparisonTray.tsx`):**
  Sticky bottom bar showing selected companies with direct navigation to the side-by-side comparison page.
* **CompanyComparisonView (`CompanyComparisonView.tsx`):**
  Side-by-side analytical matrix comparing hiring volume, remote distribution, seniority ratio, and salary transparency.
* **CompanyIntelligenceProfile (`profile/CompanyIntelligenceProfile.tsx`):**
  Comprehensive employer dossier detailing 30/90-day hiring trends, department breakdown, top skills, and ATS provenance.

---

## 5. Candidate Activity Components (`components/activity/`, `components/saved-jobs/`, `components/saved-searches/`, `components/job-alerts/`)
* **ActivityDashboard (`components/activity/ActivityDashboard.tsx`):**
  Unified tabbed dashboard switching between Saved Jobs, Applied Jobs, Viewed History, Saved Searches, and Job Alerts.
* **SavedJobList (`components/saved-jobs/SavedJobList.tsx`):**
  List of bookmarked opportunities with remove action and direct apply links.
* **SavedSearchList (`components/saved-searches/SavedSearchList.tsx`):**
  List of saved search criteria with one-click re-run, inline name editing, and alert creation.
* **SaveSearchButton (`components/saved-searches/SaveSearchButton.tsx`):**
  Button and modal trigger to bookmark current search query and active filters.
* **JobAlertList (`components/job-alerts/JobAlertList.tsx`):**
  List of active email notifications with pause/resume and delete actions.
* **CreateJobAlertModal (`components/job-alerts/CreateJobAlertModal.tsx`):**
  Modal dialog for configuring notification frequency and destination email for job searches.

---

## 6. Advertising Components (`components/ads/`)
* **AdProvider (`AdProvider.tsx`):**
  Context provider supplying safe ad configuration and null provider fallback in design mode.
* **AdPlacement (`AdPlacement.tsx`):**
  Context-aware container wrapping AdSense slot inventory at designated layout locations.
* **AdSlot (`AdSlot.tsx`):**
  Visual placeholder or production unit rendering appropriate responsive dimensions.
* **ListingAdPlacement (`ListingAdPlacement.tsx`):**
  In-feed ad slot inserted deterministically between job list items.
* **AnchorAd (`AnchorAd.tsx`):**
  Mobile-only sticky bottom banner with dismiss button.
* **InPageAd (`InPageAd.tsx`):**
  Universal banner or rectangle slot for content containers.
