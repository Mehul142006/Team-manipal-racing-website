"use client";

import { motion } from "framer-motion";
import { CarHistory } from "@/components/car/CarHistory";
import { GlassCard, SectionHeading } from "@/components/ui/GlassCard";
import { SectionTitleAccent } from "@/components/ui/SectionTitleAccent";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { CAR_PAGE } from "@/lib/data";
import type { EvPhotos, SitePhotos } from "@/lib/get-site-photos";

const ease = [0.22, 1, 0.36, 1] as const;

type CarPageContentProps = {
  photos: SitePhotos;
  evImages: EvPhotos;
};

function VehicleShowcaseImage({ src, alt }: { src: string; alt: string }) {
  return (
    // Native img preserves natural aspect ratio without fixed-height cropping.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="mx-auto block h-auto w-full max-w-[min(100%,36rem)] object-contain sm:max-w-[min(100%,40rem)] lg:mx-0 lg:max-w-none lg:w-full"
    />
  );
}

export function CarPageContent({ photos, evImages }: CarPageContentProps) {
  return (
    <>
      <section className="relative flex min-h-[80vh] items-end overflow-hidden pt-32 pb-16 sm:min-h-[85vh] sm:pb-20">
        <div className="absolute inset-0 bg-midnight">
          <PlaceholderImage
            src={photos.vehicleHero}
            alt="Team Manipal Racing Electric EV6"
            fill
            priority
            objectFit="contain"
            className="brightness-[1.06] contrast-[1.08] saturate-[1.05]"
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-midnight/80 via-midnight/30 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[min(100%,42rem)] bg-gradient-to-r from-midnight/55 via-midnight/15 to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="hero-title-line text-xs font-semibold uppercase tracking-[0.4em] text-accent"
          >
            {CAR_PAGE.hero.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="hero-title-line mt-4 text-5xl font-bold text-white sm:text-7xl"
          >
            {CAR_PAGE.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            className="hero-title-line mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg"
          >
            {CAR_PAGE.hero.tagline}
          </motion.p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 xl:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
                The Platform
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                {CAR_PAGE.overview.title}
              </h2>
              <SectionTitleAccent size="md" className="mt-4" />
              <div className="mt-6 space-y-4">
                {CAR_PAGE.overview.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-sm leading-relaxed text-muted sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease }}
              className="w-full"
            >
              <VehicleShowcaseImage src={photos.vehicleOverview} alt={CAR_PAGE.overview.title} />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-steel/5 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Engineering"
            title="Engineering Focus Areas"
            align="left"
            compact
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAR_PAGE.focusAreas.map((area, i) => (
              <GlassCard key={area.title} delay={i * 0.05} className="h-full p-6">
                <h3 className="text-base font-bold text-white">{area.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{area.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 xl:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
                Built to Compete
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                {CAR_PAGE.competitionReady.title}
              </h2>
              <SectionTitleAccent size="md" className="mt-4" />
              <div className="mt-6 space-y-4">
                {CAR_PAGE.competitionReady.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease }}
              className="w-full"
            >
              <VehicleShowcaseImage
                src={photos.competitionReady}
                alt="Team Manipal Racing Electric at competition"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <CarHistory evImages={evImages} />
    </>
  );
}
