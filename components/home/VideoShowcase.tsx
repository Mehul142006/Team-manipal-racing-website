"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { getVideoMimeType } from "@/lib/hero-media";

type VideoShowcaseProps = {
  videoSrc: string | null;
  fallbackImage?: string;
};

export function VideoShowcase({ videoSrc, fallbackImage }: VideoShowcaseProps) {
  const [activeSrc, setActiveSrc] = useState<string | null>(videoSrc);

  useEffect(() => {
    setActiveSrc(videoSrc);
  }, [videoSrc]);

  return (
    <SectionAtmosphere
      watermark="MOTION"
      backgroundSrc={fallbackImage}
      backgroundOpacity={0.06}
      className="py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-center text-xs font-semibold uppercase tracking-[0.4em] text-accent">
            On Track
          </p>
          <h2 className="mt-3 text-center text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Competition in Motion
          </h2>
          <div className="section-title-accent section-title-accent-center mt-4" />

          <div className="liquid-glass liquid-glass-card mx-auto mt-10 max-w-6xl overflow-hidden rounded-3xl ring-1 ring-white/10">
            <div className="relative aspect-video min-h-[220px] bg-midnight sm:min-h-[360px]">
              {activeSrc ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-label="Competition footage"
                  className="h-full w-full object-cover"
                  onError={() => setActiveSrc(null)}
                >
                  <source src={activeSrc} type={getVideoMimeType(activeSrc)} />
                </video>
              ) : fallbackImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={fallbackImage}
                  alt="Competition showcase"
                  className="h-full w-full object-cover opacity-90"
                />
              ) : null}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/50 via-transparent to-midnight/20" />
            </div>
          </div>
        </motion.div>
      </div>
    </SectionAtmosphere>
  );
}
