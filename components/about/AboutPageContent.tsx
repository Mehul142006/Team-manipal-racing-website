"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GlassCard, PageHero } from "@/components/ui/GlassCard";
import type { AboutPhotos } from "@/lib/get-about-photo";
import { MISSION, SUBSYSTEMS, VISION } from "@/lib/data";

const SECTIONS = [
  {
    id: "history",
    title: "Team History",
    text: "Founded in 2021 as the official E-BAJA SAE team of MAHE, Team Manipal Racing Electric emerged from years of electric vehicle research at MIT Manipal. From EV1 to EV6, each generation represents a leap in engineering capability and competition performance.",
    layout: "text-left",
    photoKey: "teamHistory",
    alt: "Team Manipal Racing Electric team history",
  },
  {
    id: "offroad",
    title: "Why Electric Off-Road?",
    text: "Electric powertrains deliver instant torque, zero emissions, and unprecedented design freedom for off-road racing. We build electric ATVs to prove that sustainable engineering and championship performance are not mutually exclusive.",
    layout: "image-left",
    photoKey: "bestPhoto",
    alt: "Team Manipal Racing Electric off-road vehicle",
  },
  {
    id: "structure",
    title: "Team Structure",
    text: "TMRE operates as a professional engineering organization with eight specialized subsystems — each led by dedicated student engineers working collaboratively from design through competition.",
    layout: "text-left",
    photoKey: "teamStructure",
    alt: "Team Manipal Racing Electric team structure",
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

type AboutPageContentProps = {
  photos: AboutPhotos;
};

type AboutSectionProps = {
  title: string;
  text: string;
  imageSrc: string;
  alt: string;
  layout: "image-left" | "text-left";
  priority?: boolean;
};

function AboutSectionImage({
  imageSrc,
  alt,
  layout,
  priority = false,
}: {
  imageSrc: string;
  alt: string;
  layout: "image-left" | "text-left";
  priority?: boolean;
}) {
  return (
    <div
      className={`flex w-full ${layout === "text-left" ? "justify-center lg:justify-end" : "justify-center lg:justify-start"}`}
    >
      <div className="group w-full max-w-[420px] liquid-glass liquid-glass-card overflow-hidden rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.45)]">
        {/* Native img so height follows the full uncropped photograph */}
        <img
          src={imageSrc}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="block h-auto w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
        />
      </div>
    </div>
  );
}

function AboutSectionBlock({ title, text, imageSrc, alt, layout, priority }: AboutSectionProps) {
  const imageFirstOnMobile = layout === "text-left";
  const imageOrder = imageFirstOnMobile ? "order-1 lg:order-2" : "order-1 lg:order-1";
  const textOrder = imageFirstOnMobile ? "order-2 lg:order-1" : "order-2 lg:order-2";

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: layout === "text-left" ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease }}
            className={textOrder}
          >
            <h2 className="text-2xl font-bold text-white sm:text-3xl">{title}</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{text}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease, delay: 0.08 }}
            className={imageOrder}
          >
            <AboutSectionImage
              imageSrc={imageSrc}
              alt={alt}
              layout={layout}
              priority={priority}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function AboutPageContent({ photos }: AboutPageContentProps) {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Engineering Excellence at MIT Manipal"
        description="The official E-BAJA SAE electric team of MAHE — designing, building, and racing high-performance electric off-road vehicles since 2021."
      />

      {SECTIONS.map((section, index) => (
        <AboutSectionBlock
          key={section.id}
          title={section.title}
          text={section.text}
          imageSrc={photos[section.photoKey]}
          alt={section.alt}
          layout={section.layout}
          priority={index === 0}
        />
      ))}

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <GlassCard className="p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">Mission</p>
              <p className="mt-4 text-base leading-relaxed text-muted">{MISSION}</p>
            </GlassCard>
            <GlassCard className="p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">Vision</p>
              <p className="mt-4 text-base leading-relaxed text-muted">{VISION}</p>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Subsystems</h2>
          <div className="section-title-accent mt-3 mb-8" />
          <div className="flex flex-wrap gap-3">
            {SUBSYSTEMS.map((s) => (
              <Link
                key={s.slug}
                href={`/subsystems?open=${s.slug}`}
                className="rounded-xl liquid-glass liquid-glass-card px-4 py-2 text-xs font-medium uppercase tracking-widest text-muted transition-colors hover:text-accent"
              >
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
