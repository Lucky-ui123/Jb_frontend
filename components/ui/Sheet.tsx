"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  position?: "left" | "right" | "bottom";
  className?: string;
}

export function Sheet({
  isOpen,
  onClose,
  title,
  description,
  children,
  position = "bottom",
  className,
}: SheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const positionStyles = {
    bottom:
      "inset-x-0 bottom-0 max-h-[85vh] rounded-t-3xl border-t border-border animate-in slide-in-from-bottom duration-200",
    right:
      "inset-y-0 right-0 max-w-md w-full rounded-l-3xl border-l border-border animate-in slide-in-from-right duration-200",
    left:
      "inset-y-0 left-0 max-w-md w-full rounded-r-3xl border-r border-border animate-in slide-in-from-left duration-200",
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title || "Drawer"}
      className="fixed inset-0 z-50 flex"
    >
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
        aria-hidden="true"
      />

      {/* Sheet Content Container */}
      <div
        ref={sheetRef}
        className={cn(
          "fixed z-50 bg-background p-6 shadow-2xl flex flex-col overflow-y-auto",
          positionStyles[position],
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border/60">
          <div className="space-y-1">
            {title && (
              <h2 className="text-base sm:text-lg font-bold text-foreground">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xs sm:text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 py-4">{children}</div>
      </div>
    </div>
  );
}
