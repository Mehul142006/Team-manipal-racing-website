"use client";

import { motion } from "framer-motion";

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Twitter", href: "#" },
];

const FOOTER_LINKS = [
  { label: "About", href: "#about" },
  { label: "Vehicle", href: "#vehicle" },
  { label: "Performance", href: "#performance" },
  { label: "Technology", href: "#technology" },
  { label: "Gallery", href: "#gallery" },
  { label: "Sponsors", href: "#sponsors" },
];

export function Footer() {
  return (
    <footer id="contact" className="relative border-t border-white/10">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-950/10" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-red-800 font-mono text-sm font-black italic text-white">
                TMRE
              </div>
              <div>
                <p className="font-bold text-white">
                  Team Manipal Racing Electric
                </p>
                <p className="text-xs text-zinc-500">
                  MIT Manipal · Karnataka, India
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-500">
              Engineering the future of off-road electric racing. Competing in
              BAJA SAE India with passion, precision, and innovation.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Quick Links
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {FOOTER_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-zinc-400 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Contact
            </p>
            <div className="mt-4 space-y-3">
              <p className="text-sm text-zinc-400">
                Manipal Institute of Technology
                <br />
                Manipal, Karnataka 576104
              </p>
              <a
                href="mailto:team@manipalracing.in"
                className="block text-sm text-red-400 transition-colors hover:text-red-300"
              >
                team@manipalracing.in
              </a>
              <div className="flex flex-wrap gap-4 pt-2">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-xs font-medium uppercase tracking-widest text-zinc-500 transition-colors duration-300 hover:text-white"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row"
        >
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Team Manipal Racing Electric. All
            rights reserved.
          </p>
          <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-700">
            eBAJA · BAJA SAE India · MIT Manipal
          </p>
        </motion.div>
      </div>

      {/* Red accent stripe */}
      <div className="h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
    </footer>
  );
}
