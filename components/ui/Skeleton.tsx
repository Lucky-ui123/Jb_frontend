import * as React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "rounded" | "circular" | "rectangular";
}

export function Skeleton({
  variant = "rounded",
  className,
  ...props
}: SkeletonProps) {
  const variantStyles = {
    rounded: "rounded-xl",
    circular: "rounded-full",
    rectangular: "rounded-none",
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse bg-muted/80 dark:bg-muted/40",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
