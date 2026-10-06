import React from "react";
import { JobDetailItem } from "@/types";
import { mapJobDetailToJobPostingJsonLd } from "@/lib/services";

export interface JobPostingJsonLdProps {
  job: JobDetailItem;
}

export function JobPostingJsonLd({ job }: JobPostingJsonLdProps) {
  const jsonLd = mapJobDetailToJobPostingJsonLd(job);

  if (!jsonLd) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}

