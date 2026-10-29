"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExpandablePhoto } from "@/components/ui/ExpandablePhoto";
import { PageHero } from "@/components/ui/GlassCard";
import { SectionTitleAccent } from "@/components/ui/SectionTitleAccent";
import type { AboutPhotos } from "@/lib/get-about-photo";
import { ABOUT_CONTENT, ABOUT_HIGHLIGHTS, SUBSYSTEMS } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

type AboutPageContentProps = {
  photos: AboutPhotos;
};

export function AboutPageContent({ photos }: AboutPageContentProps) {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Team Manipal Racing Electric"
        description={ABOUT_CONTENT.lead}
      />

      <section className="pb-8 sm:pb-12">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease }}
            className="overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.45)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos.bestPhoto}
              alt="Team Manipal Racing Electric vehicle"
              className="block h-auto w-full object-contain"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08, ease }}
            className="liquid-glass rounded-[1.75rem] p-6 sm:p-8"
          >
            <p className="font-mono text-sm uppercase tracking-[0.28em] text-accent">
              {ABOUT_CONTENT.motto}
            </p>
            <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
              Founded in 2021
            </h2>
            <SectionTitleAccent size="sm" className="mt-3" />
            <p className="mt-5 text-base leading-relaxed text-muted">{ABOUT_CONTENT.body}</p>
            <p className="mt-4 text-base leading-relaxed text-muted">{ABOUT_CONTENT.vehicle}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {ABOUT_HIGHLIGHTS.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.05, ease }}
              className="liquid-glass rounded-2xl p-6"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/85">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <h2 className="text-2xl font-bold text-white sm:text-3xl">The vehicle</h2>
            <SectionTitleAccent size="sm" />
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              Since its founding in 2021, the team has continued to raise the bar.
              {ABOUT_CONTENT.vehicle}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.06, ease }}
            className="overflow-hidden rounded-3xl border border-white/10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos.teamHistory}
              alt="Team Manipal Racing Electric history"
              className="block h-auto w-full object-contain"
            />
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Team structure</h2>
          <SectionTitleAccent size="sm" className="mb-8 mt-3" />
          <p className="mb-6 max-w-2xl text-base leading-relaxed text-muted">
            Eight subsystems work together across design, manufacturing, and competition.
          </p>
          <ExpandablePhoto
            src={photos.teamStructure}
            alt="Team Manipal Racing Electric team structure"
          />
        </div>
      </section>

      <section className="py-12 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Subsystems</h2>
          <SectionTitleAccent size="sm" className="mb-8 mt-3" />
          <div className="flex flex-wrap gap-3">
            {SUBSYSTEMS.map((subsystem) => (
              <Link
                key={subsystem.slug}
                href={`/subsystems?open=${subsystem.slug}`}
                className="liquid-glass rounded-xl px-4 py-2 text-xs font-medium uppercase tracking-widest text-muted transition-colors hover:text-accent"
              >
                {subsystem.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
