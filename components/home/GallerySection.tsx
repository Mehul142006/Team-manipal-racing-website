"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/GlassCard";
import { GALLERY_ITEMS } from "./data";

export function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const aspectClasses: Record<string, string> = {
    tall: "aspect-[3/4]",
    wide: "aspect-[16/10]",
    square: "aspect-square",
  };

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Moments"
          title="Gallery"
          description="Behind the scenes — from workshop builds to competition day."
        />

        <div className="masonry-grid">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setLightbox(i)}
              className={`masonry-item group relative w-full overflow-hidden rounded-2xl ${aspectClasses[item.aspect]}`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-transform duration-500 group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/10" />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <div className="translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-zinc-400">
                    View
                  </p>
                </div>
              </div>
              <div className="liquid-glass-shine absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-h-[85vh] max-w-4xl overflow-hidden rounded-3xl liquid-glass"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`aspect-video bg-gradient-to-br ${GALLERY_ITEMS[lightbox].gradient} p-12 sm:p-20`}
              >
                <h3 className="text-2xl font-bold text-white sm:text-4xl">
                  {GALLERY_ITEMS[lightbox].title}
                </h3>
                <p className="mt-4 max-w-md text-sm text-zinc-400">
                  Team Manipal Racing Electric — capturing the spirit of
                  student motorsport engineering at MIT Manipal.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close lightbox"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full liquid-glass text-white transition-colors hover:bg-white/10"
                onClick={() => setLightbox(null)}
              >
                ✕
              </button>
              <div className="flex items-center justify-between border-t border-white/10 px-6 py-4">
                <button
                  type="button"
                  className="text-xs uppercase tracking-widest text-zinc-500 transition-colors hover:text-white"
                  onClick={() =>
                    setLightbox((l) =>
                      l === null ? 0 : (l - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
                    )
                  }
                >
                  ← Previous
                </button>
                <span className="font-mono text-xs text-zinc-600">
                  {lightbox + 1} / {GALLERY_ITEMS.length}
                </span>
                <button
                  type="button"
                  className="text-xs uppercase tracking-widest text-zinc-500 transition-colors hover:text-white"
                  onClick={() =>
                    setLightbox((l) =>
                      l === null ? 0 : (l + 1) % GALLERY_ITEMS.length
                    )
                  }
                >
                  Next →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
