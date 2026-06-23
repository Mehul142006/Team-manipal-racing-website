"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { MediaNavDropdown } from "@/components/layout/MediaNavDropdown";
import { NAV_LINKS } from "@/lib/data";

const MEDIA_INSERT_AFTER_INDEX = NAV_LINKS.findIndex((link) => link.href === "/team");

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const renderDesktopLink = (link: (typeof NAV_LINKS)[number]) => {
    const active =
      link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

    return (
      <Link
        key={link.href}
        href={link.href}
        className={`nav-link-hover group relative rounded-xl px-3 py-2.5 text-[11px] font-medium uppercase tracking-[0.12em] ${
          active ? "text-white" : "text-muted"
        }`}
      >
        <span className="pointer-events-none absolute inset-0 rounded-xl bg-white/0 opacity-0 transition-all duration-300 group-hover:bg-white/[0.04] group-hover:opacity-100" />
        {active && (
          <motion.span
            layoutId="nav-glass-pill"
            className="absolute inset-0 rounded-xl border border-white/[0.08] bg-white/[0.04]"
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
          />
        )}
        {active && (
          <motion.span
            layoutId="nav-underline"
            className="nav-active-underline"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10">{link.label}</span>
      </Link>
    );
  };

  const renderMobileLink = (link: (typeof NAV_LINKS)[number]) => {
    const active =
      link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

    return (
      <Link
        key={link.href}
        href={link.href}
        className={`rounded-xl border-l-2 px-4 py-3 text-sm font-medium uppercase tracking-widest transition-all ${
          active
            ? "border-orange bg-white/[0.04] text-white"
            : "border-transparent text-muted hover:border-orange/35 hover:bg-white/[0.03] hover:text-white"
        }`}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <header className="site-navbar fixed inset-x-0 top-0 z-[80] px-3 pt-3 sm:px-4">
      <div
        className={`site-navbar-shell mx-auto max-w-7xl transition-all duration-500 ${
          scrolled || menuOpen
            ? "liquid-glass-nav liquid-glass-nav-floating shadow-md shadow-black/40"
            : ""
        }`}
      >
        <div className="flex items-center justify-between px-3 py-3 sm:px-5 sm:py-3.5 lg:px-6">
          <Link href="/" className="relative z-10 flex shrink-0 items-center" aria-label="Team Manipal Racing Electric home">
            <TeamLogo variant="nav" priority />
          </Link>

          <nav className="relative z-[1] hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((link, index) => (
              <span key={link.href} className="contents">
                {renderDesktopLink(link)}
                {index === MEDIA_INSERT_AFTER_INDEX && <MediaNavDropdown />}
              </span>
            ))}
          </nav>

          <button
            type="button"
            aria-label="Toggle menu"
            className="liquid-glass liquid-glass-btn relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl lg:hidden"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mobile-nav-panel overflow-hidden border-t border-white/8 bg-[rgba(8,12,18,0.96)] backdrop-blur-xl lg:hidden"
            >
              <nav className="flex flex-col gap-1 px-3 py-3 sm:px-4 sm:py-4">
                {NAV_LINKS.map((link, index) => (
                  <span key={link.href} className="contents">
                    {renderMobileLink(link)}
                    {index === MEDIA_INSERT_AFTER_INDEX && (
                      <MediaNavDropdown variant="mobile" onNavigate={() => setMenuOpen(false)} />
                    )}
                  </span>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
