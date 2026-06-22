"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/GlassCard";
import { VEHICLE_VIEWS } from "./data";

export function VehicleShowcase() {
  const [activeView, setActiveView] = useState(0);

  return (
    <section id="vehicle" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Machine"
          title="Interactive Vehicle Showcase"
          description="Explore our eBAJA prototype from every angle — engineered views from the official design report."
        />

        <div className="liquid-glass overflow-hidden rounded-3xl">
          {/* Tabs */}
          <div className="flex border-b border-white/10">
            {VEHICLE_VIEWS.map((view, i) => (
              <button
                key={view.id}
                type="button"
                onClick={() => setActiveView(i)}
                className={`relative flex-1 px-4 py-4 text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-300 sm:py-5 sm:text-sm ${
                  activeView === i
                    ? "text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {activeView === i && (
                  <motion.div
                    layoutId="vehicle-tab"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-red-500"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {view.label}
              </button>
            ))}
          </div>

          {/* View panel */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-950 via-black to-zinc-900 p-6 sm:p-12"
              >
                <Image
                  src={VEHICLE_VIEWS[activeView].src}
                  alt={VEHICLE_VIEWS[activeView].alt}
                  width={800}
                  height={600}
                  className="max-h-full w-auto object-contain drop-shadow-2xl"
                  priority={activeView === 0}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Spec bar */}
          <div className="grid grid-cols-2 gap-px border-t border-white/10 bg-white/5 sm:grid-cols-4">
            {[
              { label: "Weight", value: "230 kg" },
              { label: "Wheelbase", value: "1248 mm" },
              { label: "Peak Power", value: "9 kW" },
              { label: "Battery", value: "50.4V 78Ah" },
            ].map((spec) => (
              <div key={spec.label} className="bg-black/40 px-4 py-4 text-center sm:py-5">
                <p className="font-mono text-sm font-bold text-white sm:text-base">
                  {spec.value}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-zinc-500">
                  {spec.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
