"use client";

import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { HERO_FALLBACK_IMAGE } from "@/lib/hero-media";

export function HeroImageFallback() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <PlaceholderImage
        src={HERO_FALLBACK_IMAGE}
        alt="Team Manipal Racing Electric vehicle"
        fill
        priority
        gradient="from-midnight via-steel to-navy"
        className="hero-media-layer"
      />
    </div>
  );
}
