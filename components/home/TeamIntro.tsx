"use client";

import { motion } from "framer-motion";
import { GlassCard, SectionHeading } from "@/components/ui/GlassCard";

export function TeamIntro() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Who We Are"
          title="Team Manipal Racing Electric"
          description="A student-led motorsport team from Manipal Institute of Technology, pioneering electric off-road racing through engineering excellence, data-driven design, and relentless innovation."
          align="left"
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              stat: "eBAJA",
              label: "Competition",
              text: "Competing in BAJA SAE India with a fully electric prototype engineered for extreme off-road performance.",
            },
            {
              stat: "230 kg",
              label: "Lightweight Design",
              text: "Optimized chassis and powertrain integration achieving competitive weight with maximum structural integrity.",
            },
            {
              stat: "9 kW",
              label: "Peak Power",
              text: "PMSM motor delivering instant torque for acceleration, gradeability, and endurance across demanding terrain.",
            },
          ].map((item, i) => (
            <GlassCard key={item.label} delay={i * 0.1} className="p-8">
              <p className="font-mono text-3xl font-bold text-red-500">
                {item.stat}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                {item.label}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                {item.text}
              </p>
            </GlassCard>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 liquid-glass rounded-3xl p-8 sm:p-12"
        >
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                Built by Engineers.
                <br />
                <span className="text-zinc-500">Driven by Passion.</span>
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
                From suspension kinematics to battery thermal management, every
                subsystem is designed, validated, and optimized in-house. Our
                team brings together mechanical, electrical, and software
                engineers united by one goal — dominate off-road electric
                racing.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                "Mechanical",
                "Electrical",
                "Software",
                "Aero",
                "Manufacturing",
                "Business",
              ].map((dept) => (
                <span
                  key={dept}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-widest text-zinc-400"
                >
                  {dept}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
