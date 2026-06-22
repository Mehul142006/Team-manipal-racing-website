"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type ParallaxBackgroundProps = {
  src: string;
  alt?: string;
  opacity?: number;
};

export function ParallaxBackground({
  src,
  alt = "",
  opacity = 0.08,
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.12]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          style={{ opacity }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/90 via-midnight/75 to-midnight/90" />
    </div>
  );
}
