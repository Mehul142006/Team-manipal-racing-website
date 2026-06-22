"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { SITE } from "@/lib/data";

export function ContactPreview() {
  return (
    <section className="home-section relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="liquid-glass overflow-hidden rounded-3xl"
        >
          <div className="grid lg:grid-cols-2">
            <div className="p-8 sm:p-12 lg:p-16">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
                Get In Touch
              </p>
              <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                Partner With TMRE
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                Interested in sponsorship, recruitment, or collaboration? Connect with{" "}
                {SITE.name} at MIT Manipal.
              </p>
              <div className="mt-8 space-y-3">
                <a
                  href={`mailto:${SITE.email}`}
                  className="block font-mono text-sm text-accent transition-colors hover:text-white sm:text-base"
                >
                  {SITE.email}
                </a>
                <p className="text-sm text-white">{SITE.captain.name} · Team Captain</p>
                <a
                  href={`tel:${SITE.captain.phone.replace(/\s/g, "")}`}
                  className="block text-sm text-muted transition-colors hover:text-accent"
                >
                  {SITE.captain.phone}
                </a>
              </div>
              <SocialLinks className="mt-6" />
              <Link
                href="/contact"
                className="mt-8 inline-flex btn-primary rounded-xl px-8 py-3.5 text-sm"
              >
                Contact Us
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center border-t border-white/5 bg-steel/10 p-8 lg:border-l lg:border-t-0 lg:p-16">
              <TeamLogo variant="loading" />
              <p className="mt-6 text-center text-sm font-semibold text-white">
                Team Manipal Racing Electric
              </p>
              <p className="mt-1 text-center text-xs uppercase tracking-[0.2em] text-muted">
                MIT Manipal · {SITE.tagline}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
