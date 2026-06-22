"use client";

import { motion } from "framer-motion";
import { SectionTitleAccent } from "@/components/ui/SectionTitleAccent";
import { HomePhotoCard } from "@/components/ui/HomePhotoCard";
import { EBAJA_INFO } from "@/lib/data";

type EbajaSectionProps = {
  saeEbajaSrc: string;
};

export function EbajaSection({ saeEbajaSrc }: EbajaSectionProps) {
  return (
    <section className="home-section relative py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
              The Competition
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              E-BAJA SAE India
            </h2>
            <SectionTitleAccent size="lg" className="mt-4" />

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {EBAJA_INFO.intro}
            </p>

            <div className="mt-6 space-y-4">
              {EBAJA_INFO.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>

            <blockquote className="liquid-glass liquid-glass-card mt-8 border-l-2 border-orange/50 px-5 py-4 sm:px-6 sm:py-5">
              <p className="text-sm leading-relaxed text-white/90 sm:text-base">
                &ldquo;{EBAJA_INFO.highlight}&rdquo;
              </p>
            </blockquote>

            <a
              href={EBAJA_INFO.learnMoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary liquid-glass-btn mt-8 inline-flex rounded-2xl px-7 py-3.5 text-xs"
            >
              Learn More
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 flex justify-center lg:order-2 lg:justify-end"
          >
            <HomePhotoCard
              src={saeEbajaSrc}
              alt="E-BAJA SAE India"
              maxWidthClass="max-w-[520px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
