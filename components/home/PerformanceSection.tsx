"use client";

import { GlassCard, SectionHeading } from "@/components/ui/GlassCard";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useInView } from "@/hooks/useInView";
import { PERFORMANCE_METRICS } from "./data";

export function PerformanceSection() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section id="performance" ref={ref} className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/5 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Design Report Data"
          title="Vehicle Performance"
          description="Official performance metrics from our eBAJA prototype design report — engineered for speed, torque, and terrain dominance."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PERFORMANCE_METRICS.map((metric, i) => (
            <GlassCard key={metric.label} delay={i * 0.05} className="p-6 sm:p-8">
              <p className="font-mono text-3xl font-bold text-white sm:text-4xl">
                <AnimatedCounter
                  value={metric.value}
                  decimals={metric.decimals}
                  active={inView}
                />
                <span className="ml-1 text-lg text-red-500 sm:text-xl">
                  {metric.unit}
                </span>
              </p>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">
                {metric.label}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
