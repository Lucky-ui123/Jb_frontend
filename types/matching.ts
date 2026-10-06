export interface MatchScoreBreakdown {
  skillScore: number;
  roleScore: number;
  locationScore: number;
  workplaceScore: number;
  seniorityScore: number;
  employmentScore: number;
  compensationScore: number;
}

export interface MatchReason {
  type:
    | "skill_match"
    | "role_match"
    | "location_match"
    | "workplace_match"
    | "seniority_match"
    | "compensation_match";
  description: string;
  weight: "strong" | "moderate" | "supporting";
}

export interface JobMatchResult {
  matched: boolean;
  score: number;
  breakdown: MatchScoreBreakdown;
  matchReasons: MatchReason[];
  matchingSkills: string[];
}
