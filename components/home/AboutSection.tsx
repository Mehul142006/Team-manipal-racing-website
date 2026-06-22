"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionTitleAccent } from "@/components/ui/SectionTitleAccent";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useInView } from "@/hooks/useInView";
import { TEAM_STATS } from "@/lib/data";

type AboutSectionProps = {
  teamPhotoSrc: string;
};

export function AboutSection({ teamPhotoSrc }: AboutSectionProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section ref={ref} className="home-section relative py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="order-1 flex justify-center lg:justify-start"
          >
            <div className="w-full max-w-[520px] overflow-hidden rounded-3xl liquid-glass liquid-glass-card shadow-[0_24px_64px_rgba(0,0,0,0.45)]">
              <img
                src={teamPhotoSrc}
                alt="Team Manipal Racing Electric"
                loading="eager"
                decoding="async"
                className="block h-auto w-full object-contain transition-transform duration-700 hover:scale-[1.02]"
              />
              <div className="grid grid-cols-2 gap-px border-t border-white/5 bg-black/30 backdrop-blur-sm sm:grid-cols-4">
                {TEAM_STATS.map((stat) => (
                  <div key={stat.label} className="px-4 py-4 text-center sm:py-5">
                    <p className="font-mono text-2xl font-bold text-white sm:text-3xl">
                      <AnimatedCounter value={stat.value} active={inView} />
                      <span className="text-accent">{stat.suffix}</span>
                    </p>
                    <p className="mt-1 text-[9px] font-medium uppercase tracking-widest text-muted">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-2"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
              About The Team
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Team Manipal Racing Electric
            </h2>
            <SectionTitleAccent size="md" className="mt-4" />
            <p className="mt-6 text-base leading-relaxed text-muted">
              MIT Manipal&apos;s official E-BAJA SAE electric team — student engineers designing,
              building, and racing championship off-road vehicles from the Techshila workshop.
            </p>
            <Link
              href="/about"
              className="btn-primary mt-8 inline-flex rounded-2xl px-6 py-3.5 text-xs"
            >
              Our Story
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
