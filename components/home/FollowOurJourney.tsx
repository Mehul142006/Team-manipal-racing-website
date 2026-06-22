"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/GlassCard";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function FollowOurJourney() {
  return (
    <section className="home-section relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 section-glow" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Stay Connected"
          title="Follow Our Journey"
          description="Track our build season, competition updates, and engineering milestones across social media."
        />
        <SocialLinks variant="cards" />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/contact"
            className="inline-flex rounded-2xl liquid-glass px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-all hover:bg-white/10"
          >
            Get In Touch
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
