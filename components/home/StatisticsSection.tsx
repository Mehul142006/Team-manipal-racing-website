"use client";

import { GlassCard, SectionHeading } from "@/components/ui/GlassCard";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useInView } from "@/hooks/useInView";
import { VEHICLE_STATS } from "./data";

export function StatisticsSection() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section id="stats" ref={ref} className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Chassis Data"
          title="Vehicle Statistics"
          description="Key dimensional and weight specifications defining our eBAJA platform geometry and performance envelope."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VEHICLE_STATS.map((stat, i) => (
            <GlassCard key={stat.label} delay={i * 0.06} className="p-6 sm:p-8">
              <p className="font-mono text-3xl font-bold text-white sm:text-4xl">
                <AnimatedCounter
                  value={stat.value}
                  decimals={stat.decimals}
                  active={inView}
                />
                <span className="ml-1 text-base font-normal text-red-500 sm:text-lg">
                  {stat.unit}
                </span>
              </p>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">
                {stat.label}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
