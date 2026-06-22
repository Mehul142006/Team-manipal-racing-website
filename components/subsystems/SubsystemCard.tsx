"use client";

import { motion } from "framer-motion";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import type { SubsystemSlug } from "@/lib/data";

type SubsystemCardProps = {
  slug: SubsystemSlug;
  title: string;
  tagline: string;
  image: string;
  delay?: number;
  onSelect: (slug: SubsystemSlug) => void;
};

export function SubsystemCard({
  slug,
  title,
  tagline,
  image,
  delay = 0,
  onSelect,
}: SubsystemCardProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onSelect(slug)}
      className="subsystem-card group relative w-full overflow-hidden rounded-2xl border border-white/8 text-left"
    >
      <div className="relative aspect-[4/5] min-h-[240px] overflow-hidden bg-midnight">
        <PlaceholderImage
          src={image}
          alt={title}
          fill
          objectFit="cover"
          gradient="from-midnight via-steel to-navy"
          className="transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15" />

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <h3 className="text-base font-bold text-white sm:text-lg">{title}</h3>
          <p className="mt-1.5 line-clamp-1 text-xs leading-snug text-white/75 sm:text-[13px]">
            {tagline}
          </p>
        </div>
      </div>
    </motion.button>
  );
}
