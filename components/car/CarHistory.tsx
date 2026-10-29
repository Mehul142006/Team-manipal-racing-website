"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/GlassCard";
import { useInView } from "@/hooks/useInView";
import { EV_EVOLUTION, type ResultTier } from "@/lib/data";
import type { EvPhotoId, EvPhotos } from "@/lib/get-site-photos";

const ease = [0.22, 1, 0.36, 1] as const;
const CURRENT_INDEX = EV_EVOLUTION.findIndex((vehicle) => vehicle.id === "EV6");

const TIER_STYLES: Record<ResultTier, string> = {
  gold: "border-amber-300/35 text-amber-200",
  silver: "border-slate-200/30 text-slate-100",
  bronze: "border-orange/40 text-orange",
  listed: "border-white/10 text-white/90",
};

function airTier(result: string): ResultTier {
  const rank = Number(result.match(/AIR\s+(\d+)/i)?.[1]);
  if (rank === 1) return "gold";
  if (rank === 2) return "silver";
  if (rank === 3) return "bronze";
  return "listed";
}

function isPhotoId(id: string): id is EvPhotoId {
  return id !== "EV7";
}

function UpcomingVehicleArt() {
  return (
    <div className="flex w-full max-w-md flex-col items-center px-6 text-center">
      <svg
        viewBox="0 0 360 180"
        className="h-auto w-full text-white/75"
        aria-hidden
      >
        <path
          d="M48 126h28l22-38h92l28 22h62l18 16h28"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M98 88h70l16 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.7"
        />
        <circle cx="112" cy="132" r="22" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="112" cy="132" r="8" fill="currentColor" opacity="0.35" />
        <circle cx="268" cy="132" r="22" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="268" cy="132" r="8" fill="currentColor" opacity="0.35" />
        <path d="M70 126h18M246 126h14" stroke="currentColor" strokeWidth="3" />
      </svg>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.32em] text-muted">
        Details coming soon
      </p>
    </div>
  );
}

type CarHistoryProps = {
  evImages: EvPhotos;
};

export function CarHistory({ evImages }: CarHistoryProps) {
  const [selected, setSelected] = useState(CURRENT_INDEX >= 0 ? CURRENT_INDEX : 0);
  const { ref, inView } = useInView<HTMLElement>();
  const vehicle = EV_EVOLUTION[selected];
  const vehicleImage = isPhotoId(vehicle.id) ? evImages[vehicle.id] : null;

  const goTo = useCallback((index: number) => {
    setSelected(Math.max(0, Math.min(EV_EVOLUTION.length - 1, index)));
  }, []);

  const goPrev = useCallback(
    () => goTo((selected - 1 + EV_EVOLUTION.length) % EV_EVOLUTION.length),
    [goTo, selected],
  );
  const goNext = useCallback(
    () => goTo((selected + 1) % EV_EVOLUTION.length),
    [goTo, selected],
  );

  useEffect(() => {
    if (!inView) return;

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [inView, goPrev, goNext]);

  return (
    <section ref={ref} className="home-section relative py-20 sm:py-28" tabIndex={-1}>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Evolution"
          title="Journey of Our EV"
          description="Results published for each vehicle generation. EV7 is the next car and has no published details yet."
        />

        <div className="mb-8 flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous vehicle"
            className="ev-journey-nav-btn shrink-0"
          >
            ←
          </button>

          <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1">
            {EV_EVOLUTION.map((ev, i) => (
              <button
                key={ev.id}
                type="button"
                onClick={() => goTo(i)}
                aria-current={selected === i ? "true" : undefined}
                className={`ev-journey-tab shrink-0 rounded-xl px-5 py-3.5 font-mono text-base font-bold transition-all duration-300 sm:px-6 sm:py-4 ${
                  selected === i ? "ev-journey-tab--active" : "ev-journey-tab--idle"
                }`}
              >
                {ev.id}
                {ev.id === "EV6" && (
                  <span className="ml-2 hidden text-[9px] uppercase tracking-widest text-accent sm:inline">
                    Current
                  </span>
                )}
                {ev.upcoming && (
                  <span className="ml-2 hidden text-[9px] uppercase tracking-widest text-muted sm:inline">
                    Upcoming
                  </span>
                )}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next vehicle"
            className="ev-journey-nav-btn shrink-0"
          >
            →
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={vehicle.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="grid items-stretch lg:grid-cols-[11fr_9fr]"
          >
            <div className="ev-journey-media relative flex min-h-[260px] items-center justify-center self-stretch sm:min-h-[320px] lg:min-h-[460px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease }}
                  className="ev-journey-image-wrap flex h-full w-full items-center justify-center px-2"
                >
                  {vehicle.upcoming || !vehicleImage ? (
                    <UpcomingVehicleArt />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={vehicleImage}
                      alt={vehicle.id}
                      draggable={false}
                      tabIndex={-1}
                      className="ev-journey-image block h-auto w-full max-h-[min(68vh,620px)] min-w-0 max-w-[92%] object-contain sm:max-w-[88%] lg:max-w-[85%]"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="pointer-events-none absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                <p className="font-mono text-2xl font-bold text-white drop-shadow-lg sm:text-3xl">
                  {vehicle.upcoming ? "EV7 — Upcoming" : vehicle.id}
                </p>
              </div>
            </div>

            <motion.div
              key={`stats-${vehicle.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease }}
              className="liquid-glass flex flex-col rounded-3xl border-t border-white/5 p-5 sm:p-6 lg:rounded-l-none lg:border-l lg:border-t-0 lg:p-7"
            >
              {vehicle.upcoming ? (
                <div className="flex h-full flex-col justify-center">
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                    Next vehicle
                  </p>
                  <h3 className="mt-3 text-2xl font-bold text-white">EV7 — Upcoming</h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                    Details coming soon. Specifications, photographs, and competition results
                    will be added when they are published.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                    Documented results
                  </p>
                  {vehicle.summary && (
                    <p className="mt-3 text-sm leading-relaxed text-muted">{vehicle.summary}</p>
                  )}
                  <ul className="mt-4 space-y-2">
                    {vehicle.results.map((item) => (
                      <li
                        key={`${vehicle.id}-${item.event}`}
                        className={`flex items-baseline justify-between gap-3 rounded-xl border px-3 py-2.5 text-sm ${TIER_STYLES[airTier(item.result)]}`}
                      >
                        <span>{item.event}</span>
                        <span className="shrink-0 font-mono text-xs font-bold">{item.result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
