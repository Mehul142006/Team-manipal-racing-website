"use client";

import { motion } from "framer-motion";
import { EBAJA_SEASONS, EV_EVOLUTION, type ResultTier } from "@/lib/data";
import type { EvPhotos } from "@/lib/get-site-photos";

const ease = [0.22, 1, 0.36, 1] as const;

const TIER_STYLES: Record<ResultTier, string> = {
  gold: "border-amber-300/40 bg-amber-300/[0.07] text-amber-200",
  silver: "border-slate-200/35 bg-slate-200/[0.06] text-slate-100",
  bronze: "border-orange/45 bg-orange/[0.08] text-orange",
  listed: "border-white/10 bg-white/[0.03] text-white",
};

function airTier(result: string): ResultTier {
  const rank = Number(result.match(/AIR\s+(\d+)/i)?.[1]);
  if (rank === 1) return "gold";
  if (rank === 2) return "silver";
  if (rank === 3) return "bronze";
  return "listed";
}

type AchievementsTimelineProps = {
  evImages: EvPhotos;
  podiumSrc?: string | null;
  competitionSrc?: string | null;
};

export function AchievementsTimeline({
  evImages,
  podiumSrc,
  competitionSrc,
}: AchievementsTimelineProps) {
  const seasonImages = [podiumSrc, competitionSrc];

  return (
    <div className="pb-20 sm:pb-28">
      <div className="mx-auto max-w-7xl space-y-16 px-4 sm:space-y-24 sm:px-6 lg:px-8">
        {EBAJA_SEASONS.map((season, seasonIndex) => {
          const imageSrc = seasonImages[seasonIndex] ?? seasonImages[0];

          return (
            <motion.section
              key={season.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease }}
            >
              <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.02]">
                <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
                  {imageSrc && (
                    <div className="relative min-h-[240px] border-b border-white/10 bg-black lg:min-h-[420px] lg:border-b-0 lg:border-r">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageSrc}
                        alt={`${season.title} — Team Manipal Racing Electric`}
                        className="absolute inset-0 h-full w-full object-contain p-3 sm:p-5"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                      <p className="absolute bottom-5 left-5 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                        {season.title}
                      </p>
                    </div>
                  )}

                  <div className="p-5 sm:p-8 lg:p-10">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
                      Competition results
                    </p>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                      {season.title}
                    </h2>
                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      {season.results.map((result, index) => (
                        <motion.article
                          key={`${season.id}-${result.event}`}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.04, ease }}
                          className={`achievement-bubble rounded-2xl border px-4 py-4 sm:px-5 ${TIER_STYLES[result.tier]} ${
                            result.event === "Overall Ranking" ? "sm:col-span-2" : ""
                          }`}
                        >
                          <p className="font-mono text-2xl font-bold sm:text-3xl">{result.place}</p>
                          <p className="mt-1 text-sm font-medium text-white/90">{result.event}</p>
                          {"note" in result && result.note ? (
                            <p className="mt-1 text-xs uppercase tracking-wider text-muted">
                              {result.note}
                            </p>
                          ) : null}
                        </motion.article>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          );
        })}

        <section>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
            className="max-w-3xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
              Vehicle record
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Journey of Our EV
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              Documented results for each vehicle generation. AIR is the All India Rank
              published for that event.
            </p>
          </motion.div>

          <div className="mt-10 space-y-5">
            {EV_EVOLUTION.filter((vehicle) => !vehicle.upcoming).map((vehicle, index) => {
              const image = evImages[vehicle.id as keyof EvPhotos];

              return (
                <motion.article
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: index * 0.03, ease }}
                  className="grid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] lg:grid-cols-[220px_minmax(0,1fr)]"
                >
                  <div className="flex items-center justify-center border-b border-white/10 bg-black/50 p-4 lg:border-b-0 lg:border-r">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image}
                      alt={vehicle.id}
                      className="max-h-44 w-full object-contain lg:max-h-52"
                    />
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="font-mono text-2xl font-bold text-white">{vehicle.id}</h3>
                    {vehicle.summary && (
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                        {vehicle.summary}
                      </p>
                    )}
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {vehicle.results.map((item) => {
                        const tier = airTier(item.result);
                        return (
                          <li
                            key={`${vehicle.id}-${item.event}`}
                            className={`achievement-bubble flex items-baseline justify-between gap-3 rounded-xl border px-3 py-2 text-sm ${TIER_STYLES[tier]}`}
                          >
                            <span className="text-white/85">{item.event}</span>
                            <span className="shrink-0 font-mono text-xs font-bold tracking-wide">
                              {item.result}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
