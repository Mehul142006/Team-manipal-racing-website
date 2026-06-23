"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { ModalPortal } from "@/components/ui/ModalPortal";
import { SectionTitleAccent } from "@/components/ui/SectionTitleAccent";
import type { SubsystemSlug } from "@/lib/data";
import { getSubsystem } from "@/lib/data";

type SubsystemModalProps = {
  slug: SubsystemSlug;
  imageSrc: string;
  onClose: () => void;
};

function CloseButton({ onClose, className = "" }: { onClose: () => void; className?: string }) {
  return (
    <button
      type="button"
      aria-label="Close subsystem details"
      className={`subsystem-modal-close flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/60 text-lg text-white backdrop-blur-sm transition-colors hover:border-orange/35 hover:bg-black/80 hover:text-accent ${className}`}
      onClick={onClose}
    >
      ✕
    </button>
  );
}

export function SubsystemModal({ slug, imageSrc, onClose }: SubsystemModalProps) {
  const subsystem = getSubsystem(slug);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

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
  }, [mounted, onClose]);

  if (!subsystem || !mounted) return null;

  return (
    <ModalPortal>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="subsystem-modal-overlay fixed inset-0 z-[120] flex items-end justify-center bg-black/80 p-3 backdrop-blur-xl clickable sm:items-center sm:p-5"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="subsystem-modal-panel relative flex w-full max-w-[72rem] flex-col overflow-hidden rounded-3xl liquid-glass ring-1 ring-white/10 lg:max-h-[85vh]"
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="subsystem-modal-title"
        >
          <div className="subsystem-modal-header sticky top-0 z-30 flex shrink-0 items-center justify-between gap-3 border-b border-white/8 bg-[rgba(6,8,12,0.92)] px-4 py-3 backdrop-blur-md sm:px-5 sm:py-3.5 lg:hidden">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
              Subsystem
            </p>
            <CloseButton onClose={onClose} />
          </div>

          <CloseButton onClose={onClose} className="absolute right-4 top-4 z-20 max-lg:hidden" />

          <div className="subsystem-modal-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain lg:max-h-[85vh]">
            <div className="grid lg:grid-cols-2">
              <div className="relative flex min-h-[220px] items-center justify-center bg-midnight/80 p-4 sm:min-h-[320px] sm:p-6 lg:min-h-[480px]">
                <PlaceholderImage
                  src={imageSrc}
                  alt={subsystem.title}
                  fill
                  objectFit="contain"
                  gradient="from-midnight via-steel to-navy"
                  className="!object-contain p-2 sm:p-4"
                />
              </div>

              <div className="px-5 py-6 sm:px-8 sm:py-9 lg:px-10">
                <p className="hidden text-[10px] font-semibold uppercase tracking-[0.28em] text-accent lg:block">
                  Subsystem
                </p>
                <h2
                  id="subsystem-modal-title"
                  className="mt-2 text-xl font-bold leading-snug text-white sm:text-2xl lg:pr-4 lg:text-3xl"
                >
                  {subsystem.title}
                </h2>

                <SectionTitleAccent size="sm" className="mt-5" />

                <div className="mt-6 space-y-6 sm:mt-7">
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
          </div>
        </motion.div>
      </motion.div>
    </ModalPortal>
  );
}
