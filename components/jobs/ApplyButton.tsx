"use client";

import { useState, useEffect } from "react";
import { getBrowserSupabaseClient, signInWithGoogle, MockAuthUser } from "@/lib/auth";
import { Check, ExternalLink, Loader2, LogIn, Send } from "lucide-react";

export interface ApplyButtonProps {
  jobId: string;
  applicationUrl: string;
  initialHasApplied?: boolean;
}

export function ApplyButton({
  jobId,
  applicationUrl,
  initialHasApplied = false,
}: ApplyButtonProps) {
  const [user, setUser] = useState<MockAuthUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(initialHasApplied);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getBrowserSupabaseClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleApply = async () => {
    setError(null);

    // 1. If not logged in -> initiate Google OAuth
    if (!user) {
      if (typeof window !== "undefined") {
        await signInWithGoogle(window.location.pathname);
      }
      return;
    }

    // 2. If already applied -> re-open destination link
    if (hasApplied) {
      if (applicationUrl && typeof window !== "undefined") {
        window.open(applicationUrl, "_blank", "noopener,noreferrer");
      }
      return;
    }

    // 3. Initiate simulated application recording
    setSubmitting(true);
    try {
      // Simulate network response for frontend design preview
      await new Promise((resolve) => setTimeout(resolve, 400));
      setHasApplied(true);

      // Open external employer URL in a new window/tab safely
      if (applicationUrl && typeof window !== "undefined") {
        window.open(applicationUrl, "_blank", "noopener,noreferrer");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to record application");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-3">
      {hasApplied ? (
        <div className="space-y-2">
          <button
            onClick={handleApply}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all"
          >
            <Check className="w-5 h-5 stroke-[2.5]" />
            <span>✓ Applied</span>
            <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
          </button>
          <p className="text-xs text-center text-muted-foreground">
            Application initiation recorded. Click to re-open the official employer page.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <button
            onClick={handleApply}
            disabled={authLoading || submitting}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 active:scale-[0.99] disabled:opacity-60 transition-all"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Opening Application...</span>
              </>
            ) : !user && !authLoading ? (
              <>
                <LogIn className="w-5 h-5" />
                <span>Sign in with Google to Apply</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Apply on Employer Website</span>
                <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
              </>
            )}
          </button>
          <p className="text-xs text-center text-muted-foreground">
            Direct authoritative ATS link. You will complete your application on the employer&apos;s official board.
          </p>
        </div>
      )}

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-xs text-center">
          {error}
        </div>
      )}
    </div>
  );
}
