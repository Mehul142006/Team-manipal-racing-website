"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/GlassCard";
import { AnimatedProgressBar } from "@/components/ui/AnimatedProgressBar";
import { useInView } from "@/hooks/useInView";
import { EV_EVOLUTION } from "@/lib/data";
import type { EvPhotoId, EvPhotos } from "@/lib/get-site-photos";

const ease = [0.22, 1, 0.36, 1] as const;
const LAST_INDEX = EV_EVOLUTION.length - 1;

type CarHistoryProps = {
  evImages: EvPhotos;
};

export function CarHistory({ evImages }: CarHistoryProps) {
  const [selected, setSelected] = useState(LAST_INDEX);
  const { ref, inView } = useInView<HTMLElement>();
  const vehicle = EV_EVOLUTION[selected];
  const vehicleImage = evImages[vehicle.id as EvPhotoId];

  const goTo = useCallback((index: number) => {
    setSelected(Math.max(0, Math.min(LAST_INDEX, index)));
  }, []);

  const goPrev = useCallback(() => goTo(selected - 1), [goTo, selected]);
  const goNext = useCallback(() => goTo(selected + 1), [goTo, selected]);

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
        <SectionHeading eyebrow="Evolution" title="Vehicle Journey" compact />

        <div className="mb-8 flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={goPrev}
            disabled={selected === 0}
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
                className={`ev-journey-tab shrink-0 rounded-xl px-6 py-3.5 font-mono text-base font-bold transition-all duration-300 sm:px-7 sm:py-4 ${
                  selected === i ? "ev-journey-tab--active" : "ev-journey-tab--idle"
                }`}
              >
                {ev.id}
                {i === LAST_INDEX && (
                  <span className="ml-2 hidden text-[9px] uppercase tracking-widest text-accent sm:inline">
                    Current
                  </span>
                )}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={selected === LAST_INDEX}
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
                  key={vehicleImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease }}
                  className="ev-journey-image-wrap flex h-full w-full items-center justify-center px-2"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={vehicleImage}
                    alt={`${vehicle.id} — ${vehicle.year}`}
                    draggable={false}
                    tabIndex={-1}
                    className="ev-journey-image block h-auto w-full max-h-[min(68vh,620px)] min-w-0 max-w-[92%] object-contain sm:max-w-[88%] lg:max-w-[85%]"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="pointer-events-none absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                <p className="font-mono text-2xl font-bold text-white drop-shadow-lg sm:text-3xl">
                  {vehicle.id}
                </p>
                <p className="mt-0.5 text-sm text-accent">{vehicle.year}</p>
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
              <div className="grid flex-1 gap-6 lg:grid-cols-2 lg:gap-5">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.06, ease }}
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                    Achievements
                  </p>
                  <ul className="mt-3 space-y-2">
                    {vehicle.achievements.map((a) => (
                      <li key={a} className="flex items-start gap-2 text-sm leading-snug text-muted">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-orange/70" />
                        {a}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-accent">
                    Highlights
                  </p>
                  <ul className="mt-3 space-y-2">
                    {vehicle.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm leading-snug text-muted">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.12, ease }}
                  className="space-y-3.5"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                    Development Focus
                  </p>
                  {vehicle.improvements.map((imp, i) => (
                    <AnimatedProgressBar
                      key={`${vehicle.id}-${imp.label}-${selected}`}
                      label={imp.label}
                      progress={imp.progress}
                      active={inView}
                      delay={i * 0.1}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
