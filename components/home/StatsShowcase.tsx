"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { useInView } from "@/hooks/useInView";
import { HOME_SHOWCASE_STATS } from "@/lib/data";

export function StatsShowcase() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <SectionAtmosphere watermark="LEGACY" className="py-16 sm:py-20">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_SHOWCASE_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="liquid-glass liquid-glass-card rounded-2xl px-6 py-8 text-center"
            >
              {"display" in stat ? (
                <p className="font-mono text-2xl font-bold text-white sm:text-3xl">{stat.display}</p>
              ) : (
                <p className="font-mono text-3xl font-bold text-white sm:text-4xl">
                  <AnimatedCounter value={stat.value} active={inView} />
                  <span className="text-accent">{stat.suffix}</span>
                </p>
              )}
              <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionAtmosphere>
  );
}
