"use client";

import { GoogleMapsLink } from "@/components/ui/GoogleMapsLink";
import { SITE } from "@/lib/data";

export function FooterLocation() {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Location</p>
      <div className="mt-4 flex items-start gap-3">
        <address className="flex-1 space-y-1 text-sm not-italic leading-relaxed text-muted">
          {SITE.location.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </address>
        <GoogleMapsLink href={SITE.location.googleMapsUrl} />
      </div>
    </div>
  );
}
