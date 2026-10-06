import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClear?: () => void;
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      startIcon,
      endIcon,
      onClear,
      value,
      error = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const hasValue = value !== undefined && value !== "" && value !== null;

    return (
      <div
        className={cn(
          "relative flex items-center w-full rounded-xl border bg-secondary/40 transition-all",
          "focus-within:bg-background focus-within:ring-2 focus-within:ring-primary/25 focus-within:border-primary",
          error
            ? "border-destructive focus-within:ring-destructive/25 focus-within:border-destructive"
            : "border-border/80 hover:border-border",
          disabled && "opacity-50 cursor-not-allowed bg-muted/40",
          className
        )}
      >
        {startIcon && (
          <div className="pl-3.5 flex items-center pointer-events-none text-muted-foreground shrink-0">
            {startIcon}
          </div>
        )}

        <input
          type={type}
          ref={ref}
          value={value}
          disabled={disabled}
          aria-invalid={error ? "true" : undefined}
          className={cn(
            "w-full bg-transparent px-3.5 py-2.5 text-sm sm:text-base text-foreground placeholder:text-muted-foreground/70",
            "focus:outline-none disabled:cursor-not-allowed",
            startIcon && "pl-2.5",
            (endIcon || (onClear && hasValue)) && "pr-2"
          )}
          {...props}
        />

        {onClear && hasValue && !disabled && (
          <button
            type="button"
            onClick={onClear}
            className="p-1 mr-1 text-muted-foreground hover:text-foreground rounded-md transition-colors"
            tabIndex={-1}
            aria-label="Clear input"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {endIcon && (
          <div className="pr-3.5 flex items-center pointer-events-none text-muted-foreground shrink-0">
            {endIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
