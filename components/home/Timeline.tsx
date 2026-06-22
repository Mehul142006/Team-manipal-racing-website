"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/GlassCard";
import { TIMELINE_EVENTS } from "./data";

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineWidth = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

  return (
    <section id="timeline" ref={containerRef} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Journey"
          title="Team Achievements Timeline"
          description="From formation to electric innovation — the milestones that define Team Manipal Racing Electric."
        />

        <div className="relative">
          {/* Progress line */}
          <div className="absolute left-0 right-0 top-[52px] hidden h-px bg-white/10 md:block">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-red-600 via-red-500 to-red-600"
              style={{ width: lineWidth }}
            />
          </div>

          {/* Horizontal scroll on mobile, grid on desktop */}
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-5 md:overflow-visible md:pb-0">
            {TIMELINE_EVENTS.map((event, i) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative min-w-[260px] snap-center md:min-w-0"
              >
                {/* Dot */}
                <div className="mb-6 flex items-center gap-4 md:flex-col md:items-center md:gap-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.12, type: "spring" }}
                    className="relative z-10 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-red-500 bg-black md:mb-6"
                  >
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                  </motion.div>
                  <span className="font-mono text-sm font-bold text-red-500 md:mt-0">
                    {event.year}
                  </span>
                </div>

                <div className="liquid-glass rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.08]">
                  <h3 className="text-sm font-bold text-white sm:text-base">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-500 sm:text-sm">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
