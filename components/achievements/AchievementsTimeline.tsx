"use client";

import { motion } from "framer-motion";
import {
  AchievementOutlineIcon,
  type AchievementIconType,
} from "@/components/ui/AchievementOutlineIcon";
import { highlightRanking } from "@/components/ui/AchievementHighlight";
import { ACHIEVEMENT_TIMELINE } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

type TimelineEntry = {
  year: string;
  title: string;
  detail: string;
  icon: AchievementIconType;
};

function getAchievementIcon(title: string): AchievementIconType {
  if (/innovation/i.test(title)) return "lightning";
  if (/founded|prototype|platform|debut|integration|systems/i.test(title)) return "trend";
  if (/competition|baja|national/i.test(title)) return "flag";
  if (/vehicle|ev\d|car|chassis/i.test(title)) return "vehicle";
  if (/1st|2nd|3rd|overall|pull|maneuverability|design|podium|top/i.test(title)) return "trophy";
  if (/medal|award|winner/i.test(title)) return "medal";
  return "trophy";
}

function buildTimelineEntries(): TimelineEntry[] {
  return [...ACHIEVEMENT_TIMELINE]
    .reverse()
    .flatMap((yearBlock) =>
      yearBlock.items.map((item) => ({
        year: yearBlock.year,
        title: item.title,
        detail: item.detail,
        icon: getAchievementIcon(item.title),
      })),
    );
}

export function AchievementsTimeline() {
  const entries = buildTimelineEntries();

  return (
    <section className="pb-20 sm:pb-28">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative space-y-8 sm:space-y-10 lg:space-y-12">
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-2 left-1/2 top-2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/12 to-transparent md:block"
          />

          {entries.map((entry, index) => {
            const cardOnLeft = index % 2 === 1;

            return (
              <motion.div
                key={`${entry.year}-${entry.title}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-24px" }}
                transition={{ duration: 0.45, delay: index * 0.025, ease }}
                className="achievement-timeline-row group relative grid grid-cols-1 items-center gap-4 md:grid-cols-[minmax(0,1fr)_4rem_minmax(0,1fr)] md:gap-6"
              >
                <div className={`hidden min-w-0 md:flex ${cardOnLeft ? "justify-end" : ""}`}>
                  {cardOnLeft ? <AchievementCard entry={entry} side="left" /> : null}
                </div>

                <div className="relative z-10 flex flex-row items-center gap-3 md:flex-col md:justify-center md:gap-2">
                  <button
                    type="button"
                    aria-label={`${entry.year} — ${entry.title}`}
                    className="achievement-timeline-node h-3 w-3 shrink-0 rounded-full md:h-3.5 md:w-3.5"
                  />
                  <span className="font-mono text-lg font-bold tracking-wide text-accent md:text-base">
                    {entry.year}
                  </span>
                </div>

                <div className={`hidden min-w-0 md:flex ${cardOnLeft ? "" : "justify-start"}`}>
                  {!cardOnLeft ? <AchievementCard entry={entry} side="right" /> : null}
                </div>

                <div className="md:hidden">
                  <AchievementCard entry={entry} side="left" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AchievementCard({ entry, side }: { entry: TimelineEntry; side: "left" | "right" }) {
  return (
    <article
      className={`achievement-timeline-card liquid-glass w-full max-w-[420px] rounded-2xl p-6 sm:max-w-[440px] sm:p-7 ${
        side === "left" ? "md:ml-auto md:mr-3" : "md:mr-auto md:ml-3"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-orange/25 bg-orange/5">
          <AchievementOutlineIcon type={entry.icon} className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent/90">
            {entry.year}
          </p>
          <h3 className="mt-2 text-lg font-bold leading-snug text-white sm:text-xl">
            {highlightRanking(entry.title)}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{entry.detail}</p>
        </div>
      </div>
    </article>
  );
}
