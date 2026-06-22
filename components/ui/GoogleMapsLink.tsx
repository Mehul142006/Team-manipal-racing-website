"use client";

import { motion } from "framer-motion";

type GoogleMapsLinkProps = {
  href: string;
  className?: string;
};

export function GoogleMapsLink({ href, className = "" }: GoogleMapsLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open in Google Maps"
      title="Open in Google Maps"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      className={`liquid-glass liquid-glass-card group relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-orange ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
      >
        <path
          fill="currentColor"
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"
        />
      </svg>
      <span className="pointer-events-none absolute -bottom-10 left-1/2 z-20 hidden w-max -translate-x-1/2 rounded-lg border border-white/10 bg-midnight/95 px-3 py-1.5 text-center text-[10px] font-medium text-white shadow-lg backdrop-blur-sm group-hover:block">
        Open in Google Maps
      </span>
    </motion.a>
  );
}
