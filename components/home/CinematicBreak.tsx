"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

type CinematicBreakProps = {
  src: string;
  alt: string;
  caption?: string;
};

export function CinematicBreak({ src, alt, caption }: CinematicBreakProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <div ref={ref} className="relative py-6 sm:py-10">
      <div className="mx-auto max-w-[96rem] px-3 sm:px-5 lg:px-8">
        <div className="liquid-glass liquid-glass-card overflow-hidden rounded-3xl ring-1 ring-white/5">
          <div className="relative aspect-[21/9] min-h-[180px] overflow-hidden sm:min-h-[240px] lg:min-h-[320px]">
            <motion.div style={{ y }} className="absolute inset-0 scale-105">
              <PlaceholderImage
                src={src}
                alt={alt}
                fill
                gradient="from-midnight via-steel to-navy"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-midnight/20 to-midnight/50" />
            {caption && (
              <p className="absolute bottom-5 left-6 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/70 sm:bottom-8 sm:left-10 sm:text-xs">
                {caption}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
