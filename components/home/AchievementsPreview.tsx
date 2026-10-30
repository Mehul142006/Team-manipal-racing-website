"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/GlassCard";
import { EBAJA_SEASONS, type ResultTier } from "@/lib/data";

const TIER_TEXT: Record<ResultTier, string> = {
  gold: "text-amber-200",
  silver: "text-slate-100",
  bronze: "text-orange",
  listed: "text-white",
};

type AchievementsPreviewProps = {
  podiumImageSrc: string;
};

export function AchievementsPreview({ podiumImageSrc }: AchievementsPreviewProps) {
  return (
    <section className="home-section relative py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Results"
          title="Achievements"
          description="E-BAJA 2025 and E-BAJA 2026 competition results."
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <div className="h-full overflow-hidden rounded-3xl border border-white/10 bg-black">
              <div className="relative aspect-[4/5] min-h-[280px] lg:h-full lg:min-h-[460px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={podiumImageSrc}
                  alt="Team Manipal Racing Electric at E-BAJA"
                  className="absolute inset-0 h-full w-full object-contain p-2"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="text-lg font-bold text-white">E-BAJA SAE India</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-accent">
                    2025 and 2026
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4 lg:col-span-8">
            {EBAJA_SEASONS.map((season, index) => (
              <motion.article
                key={season.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="achievement-bubble liquid-glass rounded-3xl p-5 sm:p-6"
              >
                <h3 className="text-xl font-bold text-white sm:text-2xl">{season.title}</h3>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {season.results.map((result) => (
                    <li key={`${season.id}-${result.event}`} className="min-w-0">
                      <p className={`font-mono text-sm font-bold ${TIER_TEXT[result.tier]}`}>
                        {result.place}
                        {"note" in result && result.note ? (
                          <span className="ml-2 font-sans text-[10px] font-semibold uppercase tracking-wider text-muted">
                            {result.note}
                          </span>
                        ) : null}
                      </p>
                      <p className="text-sm text-white/85">{result.event}</p>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link href="/achievements" className="btn-primary inline-flex rounded-2xl px-8 py-4 text-sm">
            Full Results
          </Link>
        </div>
      </div>
    </section>
  );
}
