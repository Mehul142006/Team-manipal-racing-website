"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { SectionTitleAccent } from "@/components/ui/SectionTitleAccent";
import type { SubsystemSlug } from "@/lib/data";
import { getSubsystem } from "@/lib/data";

type SubsystemModalProps = {
  slug: SubsystemSlug;
  imageSrc: string;
  onClose: () => void;
};

export function SubsystemModal({ slug, imageSrc, onClose }: SubsystemModalProps) {
  const subsystem = getSubsystem(slug);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  if (!subsystem) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-3 backdrop-blur-xl sm:p-5"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex max-h-[90vh] w-[min(94vw,72rem)] flex-col overflow-hidden rounded-3xl liquid-glass ring-1 ring-white/10 lg:max-h-[85vh]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="subsystem-modal-title"
      >
        <button
          type="button"
          aria-label="Close subsystem details"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-lg text-white backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-accent"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="grid min-h-0 flex-1 lg:grid-cols-2">
          <div className="relative flex min-h-[240px] items-center justify-center bg-midnight/80 p-4 sm:min-h-[320px] sm:p-6 lg:min-h-[480px]">
            <PlaceholderImage
              src={imageSrc}
              alt={subsystem.title}
              fill
              objectFit="contain"
              gradient="from-midnight via-steel to-navy"
              className="!object-contain p-2 sm:p-4"
            />
          </div>

          <div className="overflow-y-auto px-6 py-7 sm:px-8 sm:py-9 lg:px-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
              Subsystem
            </p>
            <h2 id="subsystem-modal-title" className="mt-2 pr-10 text-2xl font-bold text-white sm:text-3xl">
              {subsystem.title}
            </h2>

            <SectionTitleAccent size="sm" className="mt-5" />

            <div className="mt-7 space-y-6">
              <section>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
                  What The Subsystem Does
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[15px]">
                  {subsystem.whatItDoes}
                </p>
              </section>

              <section>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
                  Role In The Vehicle
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[15px]">
                  {subsystem.whyImportant}
                </p>
              </section>

              <section>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
                  Key Responsibilities
                </h3>
                <ul className="mt-3 space-y-2">
                  {subsystem.roleInVehicle.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-orange/80" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
