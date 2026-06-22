"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "./data";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "liquid-glass-nav shadow-lg shadow-black/40" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-red-600 to-red-800 font-mono text-xs font-black italic text-white shadow-lg shadow-red-600/30">
            <span className="relative z-10">TMRE</span>
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold tracking-wide text-white">
              Team Manipal Racing Electric
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              MIT Manipal
            </p>
          </div>
        </a>

        <div className="hidden items-center gap-6 xl:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-400 transition-colors duration-300 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="liquid-glass rounded-xl px-5 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-red-400 transition-all duration-300 hover:text-white"
          >
            Contact
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl liquid-glass xl:hidden"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span
            className={`block h-0.5 w-5 bg-white transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-white transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 liquid-glass-nav xl:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-xl px-4 py-3 text-sm font-medium uppercase tracking-widest text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
