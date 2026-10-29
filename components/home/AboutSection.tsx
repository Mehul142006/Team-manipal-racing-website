"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionTitleAccent } from "@/components/ui/SectionTitleAccent";
import { ABOUT_CONTENT, ABOUT_HIGHLIGHTS, TEAM_STATS } from "@/lib/data";

type AboutSectionProps = {
  teamPhotoSrc: string;
};

export function AboutSection({ teamPhotoSrc }: AboutSectionProps) {
  return (
    <section className="home-section relative py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/40 shadow-[0_24px_64px_rgba(0,0,0,0.45)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={teamPhotoSrc}
              alt="Team Manipal Racing Electric"
              className="block h-auto w-full object-contain"
            />
            <div className="grid grid-cols-2 gap-px border-t border-white/10 bg-white/[0.03] sm:grid-cols-4">
              {TEAM_STATS.map((stat) => (
                <div key={stat.label} className="px-3 py-4 text-center">
                  <p className="font-mono text-xl font-bold text-white sm:text-2xl">
                    {stat.value}
                    <span className="text-accent">{stat.suffix}</span>
                  </p>
                  <p className="mt-1 text-[9px] font-medium uppercase tracking-widest text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
              About the team
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Team Manipal Racing Electric
            </h2>
            <SectionTitleAccent size="md" className="mt-4" />
            <p className="mt-5 font-mono text-sm uppercase tracking-[0.22em] text-accent">
              {ABOUT_CONTENT.motto}
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted">{ABOUT_CONTENT.lead}</p>
            <p className="mt-4 text-base leading-relaxed text-muted">{ABOUT_CONTENT.body}</p>
            <p className="mt-4 text-base leading-relaxed text-muted">{ABOUT_CONTENT.vehicle}</p>
            <Link href="/about" className="btn-primary mt-8 inline-flex rounded-2xl px-6 py-3.5 text-xs">
              Our Story
            </Link>
          </motion.div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {ABOUT_HIGHLIGHTS.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="liquid-glass rounded-2xl border border-white/10 p-5 sm:p-6"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/85">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
