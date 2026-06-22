"use client";

import { GlassCard, SectionHeading } from "@/components/ui/GlassCard";
import { SENSORS } from "./data";

export function SensorShowcase() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Instrumentation"
          title="Sensor Showcase"
          description="Precision sensors capturing every data point — from suspension forces to thermal profiles — enabling data-driven vehicle optimization."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SENSORS.map((sensor, i) => (
            <GlassCard key={sensor.title} delay={i * 0.05} className="p-6 sm:p-8">
              <div className="mb-4 inline-flex rounded-xl bg-red-600/10 px-3 py-1.5">
                <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-red-400">
                  {sensor.data}
                </span>
              </div>
              <h3 className="text-base font-bold text-white sm:text-lg">
                {sensor.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                {sensor.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
