"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard, SectionHeading } from "@/components/ui/GlassCard";
import { TECHNOLOGY_ITEMS } from "./data";

const ICONS: Record<string, React.ReactNode> = {
  cpu: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  ),
  network: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  ),
  battery: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h1a2 2 0 012 2v4a2 2 0 01-2 2h-1M7 8H6a2 2 0 00-2 2v4a2 2 0 002 2h1m10-8V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0H7m10 0v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8" />
    </svg>
  ),
  motor: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  signal: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  wifi: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
    </svg>
  ),
  chart: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
    </svg>
  ),
};

export function TechnologySection() {
  const [active, setActive] = useState(0);

  return (
    <section id="technology" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/5 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Systems"
          title="Data Acquisition & Technology"
          description="A fully integrated electronics architecture powering real-time monitoring, control, and performance optimization."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Interactive list */}
          <div className="flex flex-col gap-2">
            {TECHNOLOGY_ITEMS.map((item, i) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActive(i)}
                className={`flex items-center gap-4 rounded-2xl px-5 py-4 text-left transition-all duration-300 ${
                  active === i
                    ? "liquid-glass text-white"
                    : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                    active === i
                      ? "bg-red-600/20 text-red-400"
                      : "bg-white/5 text-zinc-500"
                  }`}
                >
                  {ICONS[item.icon]}
                </span>
                <span className="text-sm font-semibold">{item.title}</span>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="liquid-glass relative min-h-[320px] overflow-hidden rounded-3xl p-8 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600/20 text-red-400">
                  {ICONS[TECHNOLOGY_ITEMS[active].icon]}
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {TECHNOLOGY_ITEMS[active].title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
                  {TECHNOLOGY_ITEMS[active].description}
                </p>
                <div className="mt-8 flex items-center gap-2">
                  <div className="h-px flex-1 bg-gradient-to-r from-red-500/50 to-transparent" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                    Active System
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
