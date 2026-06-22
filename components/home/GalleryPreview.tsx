"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/GlassCard";
import type { HomeGalleryPreviewItem } from "@/lib/get-home-photos";

type GalleryPreviewProps = {
  items: HomeGalleryPreviewItem[];
};

function GalleryPreviewCard({ item }: { item: HomeGalleryPreviewItem }) {
  return (
    <Link
      href="/gallery"
      className="group block overflow-hidden rounded-2xl liquid-glass liquid-glass-card p-2 sm:p-3"
    >
      <img
        src={item.src}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className="block h-auto max-h-[280px] w-full object-contain transition-transform duration-700 group-hover:scale-[1.02] sm:max-h-[320px]"
      />
      <p className="px-2 pb-2 pt-3 text-sm font-semibold uppercase tracking-widest text-white">
        {item.title}
      </p>
    </Link>
  );
}

export function GalleryPreview({ items }: GalleryPreviewProps) {
  return (
    <section className="home-section relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Moments" title="Gallery" compact />

        <div className="grid gap-4 sm:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <GalleryPreviewCard item={item} />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/gallery"
            className="liquid-glass liquid-glass-btn inline-flex rounded-2xl px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white"
          >
            View Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
