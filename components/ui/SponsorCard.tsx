"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SPONSOR_PLACEHOLDER, type SponsorItem } from "@/lib/sponsors";

type SponsorCardProps = {
  name: string;
  logo: string;
  hasLogo?: boolean;
  size?: "sm" | "md" | "lg" | "hero";
  delay?: number;
};

function SponsorLogoArea({
  name,
  logo,
  hasLogo,
  size,
}: {
  name: string;
  logo: string;
  hasLogo: boolean;
  size: SponsorCardProps["size"];
}) {
  const logoHeight =
    size === "hero" ? "max-h-16 sm:max-h-20" : size === "lg" ? "max-h-12 sm:max-h-14" : "max-h-10 sm:max-h-12";

  if (!hasLogo) {
    return (
      <div className="flex h-16 w-full items-center justify-center rounded-lg border border-dashed border-white/15 bg-white/[0.02]">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5 text-muted/40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="8.5" cy="10.5" r="1.5" />
          <path d="M21 16l-5-5-4 4-2-2-5 5" />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex h-16 w-full items-center justify-center px-3 py-2 sm:h-[4.5rem]">
      <Image
        src={logo}
        alt={name}
        width={220}
        height={88}
        className={`sponsor-logo-image w-auto max-w-full object-contain ${logoHeight}`}
      />
    </div>
  );
}

export function SponsorCard({ name, logo, hasLogo, size = "md", delay = 0 }: SponsorCardProps) {
  const resolvedHasLogo = hasLogo ?? logo !== SPONSOR_PLACEHOLDER;

  const heights = {
    sm: "min-h-[8.5rem]",
    md: "min-h-[9.5rem]",
    lg: "min-h-[10.5rem] sm:min-h-[11rem]",
    hero: "min-h-[12rem] sm:min-h-[14rem]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.45 }}
      className={`sponsor-glass-card group flex ${heights[size]} flex-col items-center justify-center rounded-2xl p-6 sm:p-7`}
    >
      <SponsorLogoArea name={name} logo={logo} hasLogo={resolvedHasLogo} size={size} />
      <span className="mt-4 line-clamp-2 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-muted transition-colors group-hover:text-orange sm:text-[11px]">
        {name}
      </span>
    </motion.div>
  );
}

type SponsorCarouselProps = {
  sponsors: readonly SponsorItem[] | readonly { name: string; logo: string; hasLogo?: boolean }[];
  fast?: boolean;
};

export function SponsorCarousel({ sponsors, fast = false }: SponsorCarouselProps) {
  const doubled = [...sponsors, ...sponsors];

  return (
    <div className="relative overflow-hidden py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-midnight to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-midnight to-transparent sm:w-32" />
      <div className={`flex gap-6 sm:gap-8 ${fast ? "animate-marquee-fast" : "animate-marquee"}`}>
        {doubled.map((s, i) => {
          const hasLogo = s.hasLogo ?? s.logo !== SPONSOR_PLACEHOLDER;
          return (
            <div
              key={`${s.name}-${i}`}
              className="sponsor-glass-card group flex h-28 min-w-[200px] shrink-0 flex-col items-center justify-center rounded-xl px-6 sm:h-32 sm:min-w-[240px]"
            >
              <SponsorLogoArea name={s.name} logo={s.logo} hasLogo={hasLogo} size="sm" />
              <span className="mt-3 line-clamp-1 text-center text-[9px] font-medium uppercase tracking-wider text-muted transition-colors group-hover:text-orange sm:text-[10px]">
                {s.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
