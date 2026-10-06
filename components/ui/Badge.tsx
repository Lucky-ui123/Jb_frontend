import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "outline"
  | "success"
  | "warning"
  | "destructive"
  | "remote"
  | "hybrid"
  | "onsite"
  | "employment"
  | "seniority"
  | "salary"
  | "verified"
  | "match"
  | "ai";

export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-secondary text-secondary-foreground border-border/60",
  primary: "bg-primary/10 text-primary border-primary/20",
  secondary: "bg-muted text-muted-foreground border-transparent",
  outline: "bg-transparent text-foreground border-border",
  success: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
  destructive: "bg-destructive/10 text-destructive border-destructive/20",
  remote: "bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/25 font-medium",
  hybrid: "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/25 font-medium",
  onsite: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/25 font-medium",
  employment: "bg-secondary/90 text-foreground border-border/50 font-medium",
  seniority: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/25 capitalize font-medium",
  salary: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 font-semibold",
  verified: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/25 font-medium",
  match: "bg-gradient-to-r from-violet-600/15 to-indigo-600/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30 font-semibold",
  ai: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/25 font-medium",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "text-[11px] px-2 py-0.5 rounded-md gap-1",
  md: "text-xs px-2.5 py-1 rounded-lg gap-1.5",
  lg: "text-sm px-3 py-1.5 rounded-xl gap-2",
};

export function Badge({
  variant = "default",
  size = "md",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center border font-medium transition-colors select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
