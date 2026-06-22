"use client";

import Link from "next/link";
import { SectionHeading } from "@/components/ui/GlassCard";
import { SponsorCarousel } from "@/components/ui/SponsorCard";
import type { SponsorItem } from "@/lib/sponsors";

type SponsorsPreviewProps = {
  sponsors: SponsorItem[];
};

export function SponsorsPreview({ sponsors }: SponsorsPreviewProps) {
  return (
    <section className="home-section relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Partners" title="Our Sponsors" compact />
      </div>
      <SponsorCarousel sponsors={sponsors} fast />
      <div className="mt-6 text-center">
        <Link
          href="/sponsors"
          className="text-sm font-semibold uppercase tracking-widest text-accent transition-colors hover:text-white"
        >
          View All Sponsors →
        </Link>
      </div>
    </section>
  );
}
