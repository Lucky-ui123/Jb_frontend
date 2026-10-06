export type JobLifecycleStatus =
  | "discovered"
  | "processing"
  | "active"
  | "expired"
  | "removed";

export type JobSourceStatus =
  | "active"
  | "paused"
  | "removed_by_source"
  | "unknown";

export type EmploymentType =
  | "full_time"
  | "part_time"
  | "contract"
  | "internship"
  | "temporary"
  | "other";

export type WorkMode = "remote" | "hybrid" | "onsite" | "unknown";

export interface JobDetailCompany {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
  websiteUrl?: string | null;
  description?: string | null;
}

export interface JobDetailSalary {
  min: number | null;
  max: number | null;
  currency: string;
  interval: string | null;
}

export interface JobDetailItem {
  id: string;
  title: string;
  originalTitle: string;
  company: JobDetailCompany;
  location: string | null;
  workMode: string;
  employmentType: string;
  seniority: string | null;
  category: string | null;
  skills: string[];
  salary: JobDetailSalary | null;
  aiSummary: string | null;
  description: string;
  postedAt: Date;
  canonicalUrl: string;
  applicationUrl: string;
  lifecycleStatus: JobLifecycleStatus;
}

export interface SearchJobCompany {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
}

export interface SearchJobItem {
  id: string;
  title: string;
  company: SearchJobCompany;
  location: string | null;
  workMode: string;
  employmentType: string;
  seniority: string | null;
  skills: string[];
  salary: JobDetailSalary | null;
  aiSummary: string | null;
  postedAt: Date;
}

export interface PostalAddressSchema {
  "@type": "PostalAddress";
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  streetAddress?: string;
  addressCountry?: string;
}

export interface MonetaryAmountSchema {
  "@type": "MonetaryAmount";
  currency: string;
  value: {
    "@type": "QuantitativeValue";
    value?: number;
    minValue?: number;
    maxValue?: number;
    unitText: "HOUR" | "DAY" | "WEEK" | "MONTH" | "YEAR";
  };
}

export interface JobPostingJsonLd {
  "@context": "https://schema.org";
  "@type": "JobPosting";
  title: string;
  description: string;
  datePosted: string;
  validThrough?: string;
  employmentType?: string;
  hiringOrganization: {
    "@type": "Organization";
    name: string;
    sameAs?: string;
    logo?: string;
  };
  jobLocation?: {
    "@type": "Place";
    address: PostalAddressSchema;
  };
  jobLocationType?: "TELECOMMUTE";
  applicantLocationRequirements?: {
    "@type": "Country";
    name: string;
  };
  baseSalary?: MonetaryAmountSchema;
  identifier?: {
    "@type": "PropertyValue";
    name: string;
    value: string;
  };
  url?: string;
}

export interface RelatedJobCompany {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
}

export interface RelatedJobSummary {
  id: string;
  title: string;
  company: RelatedJobCompany;
  location: string | null;
  workplaceType: string;
  jobType: string;
  seniority: string | null;
  category: string | null;
  skills: string[];
  salaryMin: number | null;
  salaryMax: number | null;
  salaryInterval: string | null;
  publishedAt: Date;
  similarityScore: number;
}
