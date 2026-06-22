"use client";

import type { ReactNode } from "react";
import { ParallaxBackground } from "@/components/ui/ParallaxBackground";
import { SectionWatermark } from "@/components/ui/SectionWatermark";

type SectionAtmosphereProps = {
  children: ReactNode;
  watermark?: string;
  backgroundSrc?: string;
  backgroundOpacity?: number;
  className?: string;
  watermarkAlign?: "center" | "left";
};

export function SectionAtmosphere({
  children,
  watermark,
  backgroundSrc,
  backgroundOpacity = 0.08,
  className = "py-20 sm:py-28",
  watermarkAlign = "center",
}: SectionAtmosphereProps) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      {backgroundSrc && (
        <ParallaxBackground src={backgroundSrc} opacity={backgroundOpacity} />
      )}
      {watermark && <SectionWatermark text={watermark} align={watermarkAlign} />}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
