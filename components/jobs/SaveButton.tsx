"use client";

import { useState, useTransition, MouseEvent } from "react";
import { Bookmark, Loader2 } from "lucide-react";
import { signInWithGoogle } from "@/lib/auth";
import { clsx } from "clsx";

export interface SaveButtonProps {
  jobId: string;
  initialIsSaved?: boolean;
  variant?: "icon" | "button";
  size?: "sm" | "md" | "lg";
  className?: string;
  onToggle?: (isSaved: boolean) => void;
}

export function SaveButton({
  jobId,
  initialIsSaved = false,
  variant = "icon",
  size = "md",
  className = "",
  onToggle,
}: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const [isPending, startTransition] = useTransition();

  const handleToggle = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isPending) return;

    const nextState = !isSaved;

    // Optimistic UI update
    setIsSaved(nextState);

    startTransition(async () => {
      // Simulate rapid frontend preview interaction
      await new Promise((resolve) => setTimeout(resolve, 200));
      onToggle?.(nextState);
    });
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={handleToggle}
        disabled={isPending}
        aria-pressed={isSaved}
        aria-label={isSaved ? "Saved job" : "Save job"}
        className={clsx(
          "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
          isSaved
            ? "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
          className
        )}
      >
        {isPending ? (
          <Loader2 className={clsx(iconSizes[size], "animate-spin")} />
        ) : (
          <Bookmark
            className={clsx(
              iconSizes[size],
              isSaved && "fill-primary text-primary"
            )}
          />
        )}
        <span>{isSaved ? "Saved" : "Save Job"}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      aria-pressed={isSaved}
      aria-label={isSaved ? "Saved job" : "Save job"}
      title={isSaved ? "Unsave job" : "Save job"}
      className={clsx(
        "relative z-10 inline-flex items-center justify-center rounded-lg p-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        isSaved
          ? "text-primary bg-primary/10 hover:bg-primary/20"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary/80",
        className
      )}
    >
      {isPending ? (
        <Loader2 className={clsx(iconSizes[size], "animate-spin")} />
      ) : (
        <Bookmark
          className={clsx(
            iconSizes[size],
            isSaved && "fill-primary text-primary"
          )}
        />
      )}
    </button>
  );
}
