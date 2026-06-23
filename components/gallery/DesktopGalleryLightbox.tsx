"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { ModalPortal } from "@/components/ui/ModalPortal";
import type { GalleryLightboxState } from "@/components/gallery/GalleryLightbox";

type DesktopGalleryLightboxProps = {
  state: GalleryLightboxState;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
};

export function DesktopGalleryLightbox({ state, onClose, onChangeIndex }: DesktopGalleryLightboxProps) {
  const { items, index } = state;
  const item = items[index];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const hasMultiple = items.length > 1;

  const goNext = useCallback(() => {
    if (!hasMultiple) return;
    onChangeIndex((index + 1) % items.length);
  }, [hasMultiple, index, items.length, onChangeIndex]);

  const goPrev = useCallback(() => {
    if (!hasMultiple) return;
    onChangeIndex((index - 1 + items.length) % items.length);
  }, [hasMultiple, index, items.length, onChangeIndex]);

  const togglePlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
      if (item.kind === "video" && event.key === " ") {
        event.preventDefault();
        togglePlayback();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    if (item.kind === "video") {
      const video = videoRef.current;
      void video?.play().catch(() => setIsPlaying(false));
      return () => {
        window.removeEventListener("keydown", onKeyDown);
        video?.pause();
      };
    }

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [item.kind, onClose, goNext, goPrev, togglePlayback]);

  if (!item) return null;

  return (
    <ModalPortal>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120] flex items-center justify-center bg-midnight/95 p-4 backdrop-blur-xl clickable"
        onClick={onClose}
      >
        {hasMultiple && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-[110] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full liquid-glass text-white transition-colors hover:bg-white/10 sm:left-6"
              onClick={(event) => {
                event.stopPropagation();
                goPrev();
              }}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-[110] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full liquid-glass text-white transition-colors hover:bg-white/10 sm:right-6"
              onClick={(event) => {
                event.stopPropagation();
                goNext();
              }}
            >
              ›
            </button>
          </>
        )}

        <motion.div
          key={`${item.kind}-${"id" in item ? item.id : item.src}-${index}`}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="relative max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-3xl liquid-glass lightbox-glow"
          onClick={(event) => event.stopPropagation()}
        >
          {item.kind === "placeholder" && (
            <div className="relative aspect-video min-w-[280px] sm:min-w-[600px]">
              <PlaceholderImage
                src={item.src}
                alt={item.title}
                fill
                gradient={`bg-gradient-to-br ${item.gradient}`}
              />
            </div>
          )}

          {item.kind === "image" && (
            <div className="relative h-[60vh] min-h-[280px] w-full sm:h-[70vh]">
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="100vw"
                className="object-contain p-2 sm:p-4"
                priority
              />
            </div>
          )}

          {item.kind === "video" && (
            <div className="relative aspect-video bg-black">
              <video
                ref={videoRef}
                src={item.src}
                controls
                playsInline
                className="h-full w-full object-contain"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-orange/15 px-6 py-4">
            <div>
              {item.kind === "placeholder" && (
                <p className="text-sm font-semibold text-white">{item.title}</p>
              )}
              {item.kind === "video" && (
                <p className="text-xs text-muted">Press space to play or pause</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {item.kind === "video" && (
                <button
                  type="button"
                  onClick={togglePlayback}
                  className="rounded-xl liquid-glass px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:ring-1 hover:ring-orange/25 hover:orange-glow"
                >
                  {isPlaying ? "Pause" : "Play"}
                </button>
              )}
              <button
                type="button"
                aria-label="Close lightbox"
                className="flex h-9 w-9 items-center justify-center rounded-full liquid-glass text-white transition-colors hover:bg-white/10"
                onClick={onClose}
              >
                ✕
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </ModalPortal>
  );
}
