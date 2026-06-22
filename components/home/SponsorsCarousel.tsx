"use client";

import { SectionHeading } from "@/components/ui/GlassCard";
import { SPONSORS } from "./data";

export function SponsorsCarousel() {
  const doubled = [...SPONSORS, ...SPONSORS];

  return (
    <section id="sponsors" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Partners"
          title="Our Sponsors"
          description="Powered by industry leaders who invest in the next generation of motorsport engineers."
        />
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-black to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-black to-transparent sm:w-32" />

        <div className="flex animate-marquee gap-6 py-2">
          {doubled.map((sponsor, i) => (
            <div
              key={`${sponsor}-${i}`}
              className="liquid-glass flex h-20 min-w-[180px] shrink-0 items-center justify-center rounded-2xl px-8 transition-all duration-300 hover:bg-white/[0.1] sm:min-w-[220px] sm:h-24"
            >
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500 transition-colors duration-300 hover:text-zinc-300">
                {sponsor}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
