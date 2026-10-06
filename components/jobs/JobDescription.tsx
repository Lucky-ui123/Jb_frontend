import React from "react";

export interface JobDescriptionProps {
  description: string;
  className?: string;
}

/**
 * Decodes standard and numeric HTML entities (e.g., &lt;, &gt;, &quot;, &#39;, &amp;, &nbsp;)
 */
export function decodeHtmlEntities(text: string): string {
  if (!text) return "";

  const entityMap: Record<string, string> = {
    "&quot;": '"',
    "&apos;": "'",
    "&#39;": "'",
    "&#x27;": "'",
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&nbsp;": " ",
  };

  // 1. Replace named and common entities
  let decoded = text.replace(/&(?:quot|apos|#39|#x27|lt|gt|amp|nbsp);/gi, (match) => {
    return entityMap[match.toLowerCase()] ?? match;
  });

  // 2. Decode decimal numeric entities (e.g. &#60; -> <)
  decoded = decoded.replace(/&#(\d+);/g, (_, dec) => {
    try {
      return String.fromCharCode(parseInt(dec, 10));
    } catch {
      return _;
    }
  });

  // 3. Decode hex numeric entities (e.g. &#x3C; -> <)
  decoded = decoded.replace(/&#x([0-9a-f]+);/gi, (_, hex) => {
    try {
      return String.fromCharCode(parseInt(hex, 16));
    } catch {
      return _;
    }
  });

  return decoded;
}

/**
 * Sanitizes HTML content for safe rendering:
 * - Strips executable scripts, styles, iframes, objects, forms, and handlers.
 * - Enforces safe attributes on links (target="_blank", rel="noopener noreferrer").
 * - Strips dangerous URI schemes (javascript:, data:, vbscript:).
 * - Preserves legitimate formatting tags (p, ul, ol, li, h1-h6, strong, em, etc.).
 */
export function sanitizeHtml(rawHtml: string): string {
  if (!rawHtml) return "";

  // Decode entity-encoded HTML (common in ATS payloads like Greenhouse)
  let clean = decodeHtmlEntities(rawHtml);

  // 1. Remove dangerous blocks completely: scripts, styles, objects, embeds, iframes, forms
  clean = clean.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");
  clean = clean.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "");
  clean = clean.replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, "");
  clean = clean.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "");
  clean = clean.replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, "");

  // 2. Remove HTML comments
  clean = clean.replace(/<!--[\s\S]*?-->/g, "");

  // 3. Remove all on* event handler attributes (e.g. onclick, onload, onerror)
  clean = clean.replace(/\s+on[a-z]+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, "");

  // 4. Disallow dangerous protocol schemes in href/src
  clean = clean.replace(/\s+(?:href|src)\s*=\s*(?:'|")\s*(?:javascript|data|vbscript):[^'"]*(?:'|")/gi, ' href="#"');

  // 5. Allowed tags set
  const allowedTags = new Set([
    "p", "br", "strong", "b", "em", "i", "u", "s", "strike",
    "h1", "h2", "h3", "h4", "h5", "h6",
    "ul", "ol", "li", "blockquote", "code", "pre", "hr",
    "span", "div", "a"
  ]);

  // 6. Filter tags and sanitize attributes
  clean = clean.replace(/<\/?([a-z0-9]+)([^>]*)>/gi, (match, tagRaw, attrsRaw) => {
    const tag = tagRaw.toLowerCase();
    const isClosing = match.startsWith("</");

    if (!allowedTags.has(tag)) {
      return ""; // strip disallowed tag
    }

    if (isClosing) {
      return `</${tag}>`;
    }

    // Sanitize attributes on allowed opening tags
    if (tag === "a") {
      const hrefMatch = attrsRaw.match(/\bhref\s*=\s*(?:'([^']*)'|"([^"]*)"|([^\s>]+))/i);
      const href = hrefMatch ? (hrefMatch[1] || hrefMatch[2] || hrefMatch[3]) : "#";
      
      // Ensure safe HTTP/HTTPS/mailto link
      const isSafe = /^https?:\/\//i.test(href) || /^mailto:/i.test(href) || href.startsWith("/");
      const safeHref = isSafe ? href : "#";
      return `<a href="${safeHref}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-medium">`;
    }

    // For other allowed tags, strip custom inline styles/classes to preserve theme consistency
    return `<${tag}>`;
  });

  return clean;
}

/**
 * Checks whether content contains HTML tags (either raw or entity-encoded)
 */
function isHtmlContent(text: string): boolean {
  if (/<[a-z][\s\S]*>/i.test(text)) return true;
  if (/&lt;[a-z][\s\S]*&gt;/i.test(text)) return true;
  return false;
}

export function JobDescription({ description, className = "" }: JobDescriptionProps) {
  if (!description) {
    return (
      <p className="text-muted-foreground text-sm italic">
        No description provided for this position.
      </p>
    );
  }

  const isHtml = isHtmlContent(description);

  if (isHtml) {
    const sanitizedHtml = sanitizeHtml(description);
    return (
      <div
        className={`job-description-content text-foreground/90 text-sm sm:text-base leading-relaxed space-y-4 [&>p]:mb-3 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1.5 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1.5 [&>li]:text-foreground/90 [&>h1]:text-xl [&>h1]:font-bold [&>h1]:mt-6 [&>h1]:mb-2 [&>h2]:text-lg [&>h2]:font-bold [&>h2]:mt-5 [&>h2]:mb-2 [&>h3]:text-base [&>h3]:font-bold [&>h3]:mt-4 [&>h3]:mb-1.5 [&>strong]:text-foreground [&>blockquote]:border-l-2 [&>blockquote]:border-primary/40 [&>blockquote]:pl-4 [&>blockquote]:italic ${className}`}
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />
    );
  }

  // Plain text fallback with clean line breaking
  return (
    <div
      className={`text-foreground/90 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-3 ${className}`}
    >
      {description}
    </div>
  );
}
