"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GlassCard, SectionHeading } from "@/components/ui/GlassCard";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { highlightRanking, TrophyIcon } from "@/components/ui/AchievementHighlight";
import { ACHIEVEMENT_TIMELINE } from "@/lib/data";

type AchievementsPreviewProps = {
  podiumImageSrc: string;
};

export function AchievementsPreview({ podiumImageSrc }: AchievementsPreviewProps) {
  const preview = ACHIEVEMENT_TIMELINE.slice(-4);

  return (
    <section className="home-section relative py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Results" title="Achievements" compact />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <div className="liquid-glass liquid-glass-card group h-full overflow-hidden rounded-3xl">
              <div className="relative aspect-[4/5] min-h-[320px] bg-midnight lg:aspect-auto lg:min-h-full lg:h-full">
                <PlaceholderImage
                  src={podiumImageSrc}
                  alt="National podiums — Team Manipal Racing Electric"
                  fill
                  objectFit="contain"
                  gradient="from-midnight via-navy to-steel"
                  className="p-1 sm:p-2"
                />
                <div className="pointer-events-none absolute inset-0 bg-black/30" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/35 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <TrophyIcon className="h-5 w-5" />
                  <p className="mt-3 text-lg font-bold text-white drop-shadow-md">National Podiums</p>
                  <p className="mt-1 text-xs text-white/80 drop-shadow-sm">BAJA SAE India · E-BAJA</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {preview.map((year, i) => (
              <motion.div
                key={year.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <GlassCard className="h-full p-5">
                  <div className="flex items-center gap-2">
                    <TrophyIcon className="h-4 w-4" />
                    <span className="font-mono text-xl font-bold text-orange">{year.year}</span>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {year.items.map((item) => (
                      <li key={item.title}>
                        <p className="text-sm font-medium text-white">
                          {highlightRanking(item.title)}
                        </p>
                        <p className="mt-0.5 line-clamp-1 text-xs text-muted">{item.detail}</p>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link href="/achievements" className="btn-primary inline-flex rounded-2xl px-8 py-4 text-sm">
            Full Timeline
          </Link>
        </div>
      </div>
    </section>
  );
}
