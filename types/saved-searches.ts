export interface SavedSearchFilters {
  q?: string;
  location?: string;
  workMode?: string | string[];
  employmentType?: string | string[];
  seniority?: string | string[];
  category?: string;
  salaryMin?: number;
  salaryMax?: number;
  sort?: string;
}

export interface SavedSearchRecord {
  id: string;
  userId: string;
  name: string;
  query: string | null;
  location: string | null;
  filters: SavedSearchFilters;
  criteriaHash: string;
  lastRunAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
