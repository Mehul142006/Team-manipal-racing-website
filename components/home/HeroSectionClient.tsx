"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeroImageFallback } from "@/components/home/HeroImageFallback";
import {
  HERO_VIDEO_CANDIDATES,
  getVideoMimeType,
} from "@/lib/hero-media";
import { SITE } from "@/lib/data";

const HEADING_LINES = ["TEAM MANIPAL", "RACING", "ELECTRIC"] as const;

const ease = [0.22, 1, 0.36, 1] as const;

type HeroSectionClientProps = {
  heroVideoSrc: string | null;
};

function probeVideo(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const probe = document.createElement("video");
    probe.preload = "metadata";
    probe.src = src;

    const finish = (ok: boolean) => {
      probe.removeEventListener("loadeddata", onReady);
      probe.removeEventListener("error", onFail);
      resolve(ok);
    };

    const onReady = () => finish(true);
    const onFail = () => finish(false);

    probe.addEventListener("loadeddata", onReady);
    probe.addEventListener("error", onFail);
  });
}

async function resolveHeroVideo(
  serverSrc: string | null
): Promise<string | null> {
  const candidates = serverSrc
    ? [serverSrc, ...HERO_VIDEO_CANDIDATES.filter((src) => src !== serverSrc)]
    : HERO_VIDEO_CANDIDATES;

  for (const src of candidates) {
    if (await probeVideo(src)) {
      return src;
    }
  }

  return null;
}

export function HeroSectionClient({ heroVideoSrc }: HeroSectionClientProps) {
  const [videoSrc, setVideoSrc] = useState<string | null>(heroVideoSrc);
  const [videoChecked, setVideoChecked] = useState(Boolean(heroVideoSrc));

  useEffect(() => {
    let cancelled = false;

    resolveHeroVideo(heroVideoSrc).then((src) => {
      if (cancelled) return;
      setVideoSrc(src);
      setVideoChecked(true);
    });

    return () => {
      cancelled = true;
    };
  }, [heroVideoSrc]);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-end overflow-hidden pb-20 pt-24 sm:pb-24 sm:pt-28">
      {videoChecked && videoSrc ? (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
            className="hero-media-layer h-full w-full object-cover"
            onError={() => setVideoSrc(null)}
          >
            <source src={videoSrc} type={getVideoMimeType(videoSrc)} />
          </video>
        </div>
      ) : videoChecked ? (
        <HeroImageFallback />
      ) : null}

      <div className="pointer-events-none absolute inset-0 z-[1] hero-overlay" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="space-y-0 sm:space-y-0.5">
            {HEADING_LINES.map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.8,
                  delay: 2.3 + i * 0.08,
                  ease,
                }}
                className="hero-title-line block text-[clamp(0.95rem,3.2vw,2.35rem)] font-bold uppercase leading-[0.95] tracking-tight text-white"
              >
                {line === "ELECTRIC" ? (
                  <span className="text-gradient-accent">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.65, ease }}
            className="hero-title-line mt-4 text-xs font-medium tracking-[0.28em] text-white/85 sm:text-sm"
          >
            {SITE.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.85, ease }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <Link
              href="/car"
              className="btn-primary liquid-glass-btn group relative w-full min-w-[200px] overflow-hidden rounded-xl px-7 py-3.5 text-xs sm:w-auto"
            >
              <span className="relative z-10">Explore the Vehicle</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
            <Link
              href="/team"
              className="liquid-glass liquid-glass-btn w-full min-w-[200px] rounded-xl px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-white hover:ring-1 hover:ring-white/12 sm:w-auto"
            >
              Meet the Team
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Scroll</span>
          <div className="h-6 w-px bg-gradient-to-b from-white/25 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
