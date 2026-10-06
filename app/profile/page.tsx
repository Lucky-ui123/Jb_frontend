"use client";

import { useEffect, useState, useTransition } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getBrowserSupabaseClient, signInWithGoogle } from "@/lib/auth";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  User,
  Sparkles,
  Layers,
  DollarSign,
  Plus,
  X,
  Check,
  AlertCircle,
  LogIn,
  Sliders,
} from "lucide-react";

const SUGGESTED_SKILLS = [
  "React",
  "TypeScript",
  "Node.js",
  "Next.js",
  "Python",
  "PostgreSQL",
  "Go",
  "AWS",
  "Docker",
  "Kubernetes",
  "GraphQL",
  "Tailwind CSS",
  "Rust",
  "Java",
];

const WORK_MODES = [
  { id: "remote", label: "Remote" },
  { id: "hybrid", label: "Hybrid" },
  { id: "onsite", label: "On-site" },
];

const EMPLOYMENT_TYPES = [
  { id: "full_time", label: "Full-time" },
  { id: "contract", label: "Contract" },
  { id: "part_time", label: "Part-time" },
  { id: "internship", label: "Internship" },
];

const SENIORITY_LEVELS = [
  { id: "entry", label: "Entry Level" },
  { id: "mid", label: "Mid Level" },
  { id: "senior", label: "Senior" },
  { id: "lead", label: "Lead / Staff" },
  { id: "executive", label: "Executive / Director" },
];

export default function ProfilePage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, startTransition] = useTransition();
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Profile fields
  const [fullName, setFullName] = useState("");
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [experienceYears, setExperienceYears] = useState<number | "">("");
  const [currentLocation, setCurrentLocation] = useState("");

  // Preferences fields
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkillInput, setNewSkillInput] = useState("");
  const [preferredRoles, setPreferredRoles] = useState<string[]>([]);
  const [newRoleInput, setNewRoleInput] = useState("");
  const [preferredLocations, setPreferredLocations] = useState<string[]>([]);
  const [newLocationInput, setNewLocationInput] = useState("");
  const [workModes, setWorkModes] = useState<string[]>([]);
  const [employmentTypes, setEmploymentTypes] = useState<string[]>([]);
  const [seniorityLevels, setSeniorityLevels] = useState<string[]>([]);
  const [minSalary, setMinSalary] = useState<number | "">("");
  const [salaryInterval, setSalaryInterval] = useState("yearly");

  useEffect(() => {
    const supabase = getBrowserSupabaseClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      setIsAuthenticated(true);
      fetchProfile();
    });
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/users/me/profile");
      if (res.ok) {
        const data = await res.json();
        if (data.profile) {
          const p = data.profile;
          setFullName(p.fullName || "");
          setHeadline(p.headline || "");
          setBio(p.bio || "");
          setExperienceYears(p.experienceYears !== null ? p.experienceYears : "");
          setCurrentLocation(p.currentLocation || "");

          const pref = p.preferences || {};
          setSkills(pref.skills || []);
          setPreferredRoles(pref.preferredRoles || []);
          setPreferredLocations(pref.preferredLocations || []);
          setWorkModes(pref.workModes || []);
          setEmploymentTypes(pref.employmentTypes || []);
          setSeniorityLevels(pref.seniorityLevels || []);
          setMinSalary(pref.minSalary !== null && pref.minSalary !== undefined ? pref.minSalary : "");
          setSalaryInterval(pref.salaryInterval || "yearly");
        }
      }
    } catch (err) {
      console.error("Failed to load profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(false);
    setErrorMessage(null);

    startTransition(async () => {
      try {
        const res = await fetch("/api/users/me/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: fullName.trim() || null,
            headline: headline.trim() || null,
            bio: bio.trim() || null,
            experienceYears: experienceYears !== "" ? Number(experienceYears) : null,
            currentLocation: currentLocation.trim() || null,
            preferences: {
              skills,
              preferredRoles,
              preferredLocations,
              workModes,
              employmentTypes,
              seniorityLevels,
              minSalary: minSalary !== "" ? Number(minSalary) : null,
              salaryCurrency: "USD",
              salaryInterval,
            },
          }),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setSaveSuccess(true);
          setTimeout(() => setSaveSuccess(false), 4000);
        } else {
          setErrorMessage(
            data.errors ? data.errors.join(", ") : data.error || "Failed to save profile"
          );
        }
      } catch (err: unknown) {
        setErrorMessage((err as Error).message || "An unexpected error occurred");
      }
    });
  };

  const addSkill = (skill: string) => {
    const clean = skill.trim();
    if (clean && !skills.some((s) => s.toLowerCase() === clean.toLowerCase())) {
      setSkills([...skills, clean]);
    }
    setNewSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const addRole = (role: string) => {
    const clean = role.trim();
    if (clean && !preferredRoles.some((r) => r.toLowerCase() === clean.toLowerCase())) {
      setPreferredRoles([...preferredRoles, clean]);
    }
    setNewRoleInput("");
  };

  const removeRole = (role: string) => {
    setPreferredRoles(preferredRoles.filter((r) => r !== role));
  };

  const addLocation = (loc: string) => {
    const clean = loc.trim();
    if (clean && !preferredLocations.some((l) => l.toLowerCase() === clean.toLowerCase())) {
      setPreferredLocations([...preferredLocations, clean]);
    }
    setNewLocationInput("");
  };

  const removeLocation = (loc: string) => {
    setPreferredLocations(preferredLocations.filter((l) => l !== loc));
  };

  const toggleWorkMode = (mode: string) => {
    setWorkModes((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    );
  };

  const toggleEmploymentType = (type: string) => {
    setEmploymentTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleSeniorityLevel = (level: string) => {
    setSeniorityLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main id="main-content" className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 space-y-6">
          <div className="h-10 w-64 bg-muted/60 animate-pulse rounded-lg" />
          <div className="h-64 bg-muted/40 animate-pulse rounded-2xl" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main id="main-content" className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-inner">
              <User className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-black text-foreground">Sign In to Your Profile</h1>
              <p className="text-sm text-muted-foreground">
                Save your career preferences, target roles, and skill set for personalized job recommendations.
              </p>
            </div>
            <Button
              onClick={() => signInWithGoogle()}
              size="lg"
              className="w-full gap-2 font-semibold shadow-md"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In with Google</span>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main id="main-content" className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="verified" size="md">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            <span>V2 Smart Discovery</span>
          </Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
          Profile & Preferences
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Set your skills, target roles, and work preferences to power your personalized job discovery feed.
        </p>
      </div>

      {/* Naukri-Style Candidate Profile Completeness Card */}
      {(() => {
        // Calculate live profile completeness
        let score = 0;
        const missing: { label: string; points: number }[] = [];

        if (fullName.trim()) score += 15;
        else missing.push({ label: "Full Name", points: 15 });

        if (headline.trim()) score += 15;
        else missing.push({ label: "Professional Headline", points: 15 });

        if (currentLocation.trim()) score += 10;
        else missing.push({ label: "Location", points: 10 });

        if (bio.trim().length >= 20) score += 10;
        else missing.push({ label: "Brief Bio (20+ chars)", points: 10 });

        if (skills.length >= 3) score += 20;
        else if (skills.length > 0) score += 10;
        else missing.push({ label: "3+ Core Skills", points: 20 });

        if (preferredRoles.length > 0) score += 15;
        else missing.push({ label: "Target Job Roles", points: 15 });

        if (workModes.length > 0) score += 15;
        else missing.push({ label: "Workplace Preferences", points: 15 });

        score = Math.min(100, score);

        return (
          <Card className="p-6 sm:p-7 border-border/80 shadow-sm bg-gradient-to-r from-blue-50/50 via-indigo-50/30 to-purple-50/40 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="font-extrabold text-sm sm:text-base text-foreground">
                    Profile Completeness: {score}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {score >= 85
                    ? "🎉 Your profile is optimized for maximum relevancy and direct employer recommendations."
                    : "Complete remaining sections to get up to 3x higher match precision across direct ATS feeds."}
                </p>
              </div>

              <Badge
                variant={score >= 80 ? "success" : score >= 50 ? "match" : "warning"}
                size="md"
                className="self-start sm:self-auto font-bold"
              >
                {score >= 80 ? "High Strength" : score >= 50 ? "Moderate" : "Action Needed"}
              </Badge>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500"
                style={{ width: `${score}%` }}
                role="progressbar"
                aria-valuenow={score}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>

            {/* Missing Sections Recommendations */}
            {missing.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                  Recommended additions to reach 100%:
                </span>
                <div className="flex flex-wrap gap-2">
                  {missing.slice(0, 3).map((item) => (
                    <span
                      key={item.label}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-background/80 text-foreground border border-border/80 text-xs font-medium"
                    >
                      <Plus className="w-3 h-3 text-primary" />
                      <span>{item.label} (+{item.points}%)</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Card>
        );
      })()}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Professional Identity */}
        <Card className="p-6 sm:p-8 space-y-6 border-border/80 shadow-sm">
          <div className="flex items-center gap-2.5 pb-4 border-b border-border/60">
            <User className="w-5 h-5 text-primary" />
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              Professional Profile
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Alex Morgan"
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Years of Experience</label>
              <input
                type="number"
                min="0"
                max="60"
                value={experienceYears}
                onChange={(e) =>
                  setExperienceYears(e.target.value === "" ? "" : Number(e.target.value))
                }
                placeholder="e.g. 5"
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-foreground">Headline</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="e.g. Senior Full-Stack Engineer • React / Node / Distributed Systems"
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-foreground">Current Location</label>
              <input
                type="text"
                value={currentLocation}
                onChange={(e) => setCurrentLocation(e.target.value)}
                placeholder="e.g. San Francisco, CA or Remote"
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-foreground">Short Bio</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Brief summary of your background, architectural focus, and engineering passions..."
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </Card>

        {/* Section 2: Skills & Taxonomy */}
        <Card className="p-6 sm:p-8 space-y-6 border-border/80 shadow-sm">
          <div className="flex items-center gap-2.5 pb-4 border-b border-border/60">
            <Layers className="w-5 h-5 text-primary" />
            <div className="space-y-0.5">
              <h2 className="text-lg sm:text-xl font-bold text-foreground">
                Skills & Tech Stack
              </h2>
              <p className="text-xs text-muted-foreground">
                Add your core technologies to help our deterministic matching engine rank opportunities.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Active Skills Chips */}
            <div className="flex flex-wrap gap-2 min-h-[40px] p-3 rounded-xl border border-border bg-secondary/30">
              {skills.length === 0 ? (
                <span className="text-xs text-muted-foreground italic self-center">
                  No skills added yet. Type below or click popular suggestions.
                </span>
              ) : (
                skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-xs font-semibold text-primary"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="hover:text-red-500 focus:outline-none"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))
              )}
            </div>

            {/* Custom Skill Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill(newSkillInput);
                  }
                }}
                placeholder="Type a skill and press Enter (e.g. Next.js, Rust)..."
                className="flex-1 px-3.5 py-2 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => addSkill(newSkillInput)}
                disabled={!newSkillInput.trim()}
                className="gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </Button>
            </div>

            {/* Suggested Skills */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-muted-foreground">Suggested Skills:</span>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_SKILLS.filter((s) => !skills.includes(s)).map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => addSkill(skill)}
                    className="px-2.5 py-1 rounded-md bg-secondary hover:bg-secondary/80 border border-border/60 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    + {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Section 3: Job Role & Work Preferences */}
        <Card className="p-6 sm:p-8 space-y-6 border-border/80 shadow-sm">
          <div className="flex items-center gap-2.5 pb-4 border-b border-border/60">
            <Sliders className="w-5 h-5 text-primary" />
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              Work & Role Preferences
            </h2>
          </div>

          <div className="space-y-6">
            {/* Target Job Titles */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">
                Target Roles / Job Titles
              </label>
              <div className="flex flex-wrap gap-2 min-h-[36px] p-2.5 rounded-xl border border-border bg-secondary/30">
                {preferredRoles.length === 0 ? (
                  <span className="text-xs text-muted-foreground italic self-center">
                    e.g. Full Stack Engineer, Frontend Engineer, Tech Lead
                  </span>
                ) : (
                  preferredRoles.map((role) => (
                    <span
                      key={role}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-secondary border border-border text-xs font-semibold text-foreground"
                    >
                      <span>{role}</span>
                      <button
                        type="button"
                        onClick={() => removeRole(role)}
                        className="hover:text-red-500 focus:outline-none"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newRoleInput}
                  onChange={(e) => setNewRoleInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addRole(newRoleInput);
                    }
                  }}
                  placeholder="Add target title (e.g. Staff Engineer) and press Enter..."
                  className="flex-1 px-3.5 py-2 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addRole(newRoleInput)}
                  disabled={!newRoleInput.trim()}
                  className="gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </Button>
              </div>
            </div>

            {/* Target Locations */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">
                Preferred Locations
              </label>
              <div className="flex flex-wrap gap-2 min-h-[36px] p-2.5 rounded-xl border border-border bg-secondary/30">
                {preferredLocations.length === 0 ? (
                  <span className="text-xs text-muted-foreground italic self-center">
                    e.g. San Francisco, CA • Remote • New York, NY
                  </span>
                ) : (
                  preferredLocations.map((loc) => (
                    <span
                      key={loc}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-secondary border border-border text-xs font-semibold text-foreground"
                    >
                      <span>{loc}</span>
                      <button
                        type="button"
                        onClick={() => removeLocation(loc)}
                        className="hover:text-red-500 focus:outline-none"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newLocationInput}
                  onChange={(e) => setNewLocationInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addLocation(newLocationInput);
                    }
                  }}
                  placeholder="Add target location and press Enter..."
                  className="flex-1 px-3.5 py-2 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addLocation(newLocationInput)}
                  disabled={!newLocationInput.trim()}
                  className="gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </Button>
              </div>
            </div>

            {/* Workplace Modes */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">Workplace Type</label>
              <div className="flex flex-wrap gap-2.5">
                {WORK_MODES.map((mode) => {
                  const selected = workModes.includes(mode.id);
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => toggleWorkMode(mode.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        selected
                          ? "bg-primary text-white border-primary shadow-sm"
                          : "bg-card text-muted-foreground border-border hover:border-primary/40"
                      }`}
                    >
                      {mode.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Employment Types */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">Employment Type</label>
              <div className="flex flex-wrap gap-2.5">
                {EMPLOYMENT_TYPES.map((type) => {
                  const selected = employmentTypes.includes(type.id);
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => toggleEmploymentType(type.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        selected
                          ? "bg-primary text-white border-primary shadow-sm"
                          : "bg-card text-muted-foreground border-border hover:border-primary/40"
                      }`}
                    >
                      {type.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Seniority Levels */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">Seniority Level</label>
              <div className="flex flex-wrap gap-2.5">
                {SENIORITY_LEVELS.map((level) => {
                  const selected = seniorityLevels.includes(level.id);
                  return (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => toggleSeniorityLevel(level.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        selected
                          ? "bg-primary text-white border-primary shadow-sm"
                          : "bg-card text-muted-foreground border-border hover:border-primary/40"
                      }`}
                    >
                      {level.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Salary Expectations */}
            <div className="space-y-2 pt-2 border-t border-border/60">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>Minimum Target Salary (USD)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="number"
                  min="0"
                  step="5000"
                  value={minSalary}
                  onChange={(e) =>
                    setMinSalary(e.target.value === "" ? "" : Number(e.target.value))
                  }
                  placeholder="e.g. 150000"
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <select
                  value={salaryInterval}
                  onChange={(e) => setSalaryInterval(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="yearly">Per Year</option>
                  <option value="monthly">Per Month</option>
                  <option value="hourly">Per Hour</option>
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Feedback & Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div>
            {saveSuccess && (
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                <Check className="w-4 h-4" />
                <span>Preferences saved successfully!</span>
              </div>
            )}
            {errorMessage && (
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-rose-600 dark:text-rose-400">
                <AlertCircle className="w-4 h-4" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSaving}
            className="w-full sm:w-auto min-w-[160px] font-bold shadow-md"
          >
            {isSaving ? "Saving..." : "Save Preferences"}
          </Button>
        </div>
      </form>
    </main>

    <Footer />
  </div>
);
}

