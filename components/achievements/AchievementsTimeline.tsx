"use client";

import { motion } from "framer-motion";
import { highlightRanking } from "@/components/ui/AchievementHighlight";
import { ACHIEVEMENT_TIMELINE } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

type TimelineEntry = {
  year: string;
  title: string;
  detail: string;
  icon: string;
};

function getAchievementIcon(title: string): string {
  if (/innovation/i.test(title)) return "⚡";
  if (/founded|prototype|platform|debut|integration|systems/i.test(title)) return "📈";
  if (/competition|baja|national/i.test(title)) return "🚩";
  if (/1st|2nd|3rd|overall|pull|maneuverability|design|podium|top/i.test(title)) return "🏆";
  return "🏆";
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
      }))
    );
}

export function AchievementsTimeline() {
  const entries = buildTimelineEntries();

  return (
    <section className="pb-16 sm:pb-20">
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative space-y-5 sm:space-y-6">
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
                className="achievement-timeline-row group relative grid grid-cols-1 items-center gap-3 md:grid-cols-[minmax(0,1fr)_3.5rem_minmax(0,1fr)] md:gap-4"
              >
                <div className={`hidden min-w-0 md:flex ${cardOnLeft ? "justify-end" : ""}`}>
                  {cardOnLeft ? <AchievementCard entry={entry} side="left" /> : null}
                </div>

                <div className="relative z-10 flex flex-row items-center gap-2.5 md:flex-col md:justify-center md:gap-1.5">
                  <button
                    type="button"
                    aria-label={`${entry.year} — ${entry.title}`}
                    className="achievement-timeline-node h-2.5 w-2.5 shrink-0 rounded-full md:h-3 md:w-3"
                  />
                  <span className="font-mono text-base font-bold tracking-wide text-accent md:text-sm">
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
      className={`achievement-timeline-card liquid-glass w-full max-w-[320px] rounded-xl p-4 sm:max-w-[340px] sm:p-5 ${
        side === "left" ? "md:ml-auto md:mr-2" : "md:mr-auto md:ml-2"
      }`}
    >
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 text-lg leading-none" aria-hidden>
          {entry.icon}
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-accent/90">
            {entry.year}
          </p>
          <h3 className="mt-1 text-[15px] font-bold leading-snug text-white">
            {highlightRanking(entry.title)}
          </h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{entry.detail}</p>
        </div>
      </div>
    </article>
  );
}
