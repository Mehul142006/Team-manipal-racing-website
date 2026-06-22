"use client";

import { useEffect, useRef, useState } from "react";
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
const HERO_TITLE_START_SCALE = 1.75;
const HERO_TITLE_END_SCALE = 0.5;
const HERO_TITLE_START_OPACITY = 1;
const HERO_TITLE_END_OPACITY = 0.85;
const HERO_TITLE_MAX_Y = -80;

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

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

export function HeroSectionClient({ heroVideoSrc }: HeroSectionClientProps) {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const hero = heroRef.current;
    const title = titleRef.current;
    if (!hero || !title) return;

    let frameId = 0;

    const updateTitleTransform = () => {
      const currentHero = heroRef.current;
      const currentTitle = titleRef.current;
      if (!currentHero || !currentTitle) return;

      const scrollDistance = Math.max(currentHero.offsetHeight * 0.92, 1);
      const progress = clamp(window.scrollY / scrollDistance, 0, 1);
      const scale = lerp(HERO_TITLE_START_SCALE, HERO_TITLE_END_SCALE, progress);
      const opacity = lerp(HERO_TITLE_START_OPACITY, HERO_TITLE_END_OPACITY, progress);
      const y = lerp(0, HERO_TITLE_MAX_Y, progress);

      currentTitle.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
      currentTitle.style.opacity = `${opacity}`;
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateTitleTransform);
    };

    updateTitleTransform();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-28 pt-32 sm:px-6 sm:pb-32 sm:pt-36 lg:px-8"
    >
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

      <div className="hero-content relative z-10 w-full max-w-4xl translate-y-[1.5vh] sm:translate-y-[2vh]">
        <div className="mx-auto flex flex-col items-center gap-8 text-center sm:gap-10 lg:gap-12">
          <div
            ref={titleRef}
            className="hero-scroll-title mx-auto w-full max-w-[min(96vw,54rem)] origin-center pb-[clamp(3rem,9vh,5.5rem)] pt-[clamp(0.75rem,2vh,1.5rem)] will-change-transform"
            style={{
              transform: `translate3d(0, 0, 0) scale(${HERO_TITLE_START_SCALE})`,
              opacity: HERO_TITLE_START_OPACITY,
            }}
          >
            <h1 className="flex flex-col gap-3 sm:gap-4 md:gap-5">
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
                  className="hero-title-line block text-[clamp(1.4rem,5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-tight text-white"
                >
                  {line === "ELECTRIC" ? (
                    <span className="text-gradient-accent">{line}</span>
                  ) : (
                    line
                  )}
                </motion.span>
              ))}
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.65, ease }}
            className="hero-title-line max-w-xl text-xs font-medium tracking-[0.28em] text-white/85 sm:text-sm"
          >
            {SITE.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.85, ease }}
            className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
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
