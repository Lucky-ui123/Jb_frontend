import { SearchJobItem } from "./jobs";

export type JobSortOption = "newest" | "relevance" | "salary_desc" | "salary_asc";

export type WorkModeFilter = "remote" | "hybrid" | "onsite";
export type EmploymentTypeFilter = "full_time" | "part_time" | "contract" | "internship" | "temporary" | "other";
export type SeniorityFilter =
  | "entry"
  | "mid"
  | "senior"
  | "lead"
  | "principal"
  | "executive"
  | "Entry"
  | "Mid"
  | "Senior"
  | "Lead"
  | "Principal"
  | "Executive";

export interface SearchJobsQuery {
  text?: string;
  location?: string;
  workMode?: string | string[];
  employmentType?: string | string[];
  seniority?: string | string[];
  category?: string;
  salaryMin?: number;
  salaryMax?: number;
  sort?: JobSortOption;
  page?: number;
  pageSize?: number;
}

export interface SearchPaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface SearchJobsResponse {
  data: SearchJobItem[];
  pagination: SearchPaginationMeta;
}
