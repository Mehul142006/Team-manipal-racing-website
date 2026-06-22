"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
};

export function GlassCard({
  children,
  className = "",
  hover = true,
  delay = 0,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`liquid-glass liquid-glass-card group relative overflow-hidden rounded-2xl ${!hover ? "liquid-glass-card-static" : ""} ${className}`}
    >
      <div className="liquid-glass-refraction pointer-events-none absolute inset-0 rounded-[inherit]" />
      <div className="liquid-glass-shine pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-[1]">{children}</div>
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  compact = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  compact?: boolean;
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`${compact ? "mb-8 sm:mb-10" : "mb-12 sm:mb-16"} max-w-3xl ${alignClass}`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <div className={`section-title-accent ${align === "center" ? "section-title-accent-center" : ""}`} />
      {description && !compact && (
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
          {description}
        </p>
      )}
    </motion.div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div className="pointer-events-none absolute inset-0 section-glow" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-[0.35em] text-accent"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        <div className="section-title-accent mt-5" />
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
