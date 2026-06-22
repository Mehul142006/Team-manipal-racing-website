"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const SPONSOR_BENEFITS = [
  "Access to top engineering talent",
  "Brand visibility across national competitions",
  "Exposure through media and social platforms",
  "Opportunity to support student innovation",
] as const;

export function BecomeSponsorSection() {
  return (
    <section className="pb-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="liquid-glass liquid-glass-card overflow-hidden rounded-3xl"
        >
          <div className="grid lg:grid-cols-2">
            <div className="p-8 sm:p-12 lg:p-16">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
                Join Our Team
              </p>
              <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Become a Sponsor</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                Partner with Team Manipal Racing Electric and invest in the next generation of
                motorsport engineers. Your support fuels innovation, competition readiness, and
                real-world engineering excellence.
              </p>
              <ul className="mt-8 space-y-3">
                {SPONSOR_BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange/70" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="btn-primary mt-10 inline-flex rounded-xl px-8 py-3.5 text-sm"
              >
                Partner With TMRE
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center border-t border-white/5 bg-steel/10 p-8 lg:border-l lg:border-t-0 lg:p-16">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 liquid-glass">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-10 w-10 text-orange"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <p className="mt-6 text-center text-sm font-semibold text-white">
                Fuel Student Innovation
              </p>
              <p className="mt-2 max-w-xs text-center text-xs leading-relaxed text-muted">
                Join industry leaders supporting TMRE at E-BAJA and beyond.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
