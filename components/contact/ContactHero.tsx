"use client";

import { motion } from "framer-motion";
import { SectionTitleAccent } from "@/components/ui/SectionTitleAccent";

export function ContactHero() {
  return (
    <section className="contact-hero relative overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/contact/contact-hero-placeholder.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="contact-hero-overlay absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-40 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-[0.35em] text-accent"
        >
          Get In Touch
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Contact Us
        </motion.h1>
        <SectionTitleAccent size="lg" className="mt-5" />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg"
        >
          Reach out for sponsorship, recruitment, media inquiries, or collaboration with Team
          Manipal Racing Electric at MIT Manipal.
        </motion.p>
      </div>
    </section>
  );
}
