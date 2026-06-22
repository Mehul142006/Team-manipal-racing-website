"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { VISION } from "@/lib/data";

const HIGHLIGHT_WORDS = new Set([
  "innovation,",
  "sustainability,",
  "excellence.",
  "high-performance",
  "electric",
]);

export function VisionSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const words = VISION.split(" ");

  return (
    <section ref={ref} className="home-section relative py-28 sm:py-40">
      <div className="pointer-events-none absolute inset-0 section-glow" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div style={{ y }} className="liquid-glass mx-auto max-w-5xl rounded-3xl p-10 sm:p-16 lg:p-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-xs font-semibold uppercase tracking-[0.4em] text-accent"
          >
            Our Vision
          </motion.p>

          <blockquote className="mt-10 text-center">
            <p className="text-2xl font-light leading-relaxed tracking-tight sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-snug">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.035,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`mr-[0.28em] inline-block ${
                    HIGHLIGHT_WORDS.has(word.toLowerCase())
                      ? "text-accent"
                      : "text-white/90"
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </p>
          </blockquote>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-12 h-px max-w-sm origin-center bg-gradient-to-r from-transparent via-accent/30 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
