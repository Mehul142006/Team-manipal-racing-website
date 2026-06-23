"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { ModalPortal } from "@/components/ui/ModalPortal";
import { GalleryCloseButton } from "@/components/gallery/GalleryCloseButton";
import type { GalleryLightboxItem, GalleryLightboxState } from "@/components/gallery/GalleryLightbox";

type MobileGalleryLightboxProps = {
  state: GalleryLightboxState;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
};

const SWIPE_THRESHOLD = 56;
const SWIPE_VELOCITY = 420;

function preloadGalleryItem(item: GalleryLightboxItem | undefined) {
  if (!item) return;
  if (item.kind === "image" || item.kind === "placeholder") {
    const img = new window.Image();
    img.src = item.src;
  }
}

function MobileGallerySlide({
  item,
  isActive,
}: {
  item: GalleryLightboxItem;
  isActive: boolean;
}) {
  const [scale, setScale] = useState(1);
  const pinchRef = useRef<{ distance: number; scale: number } | null>(null);

  useEffect(() => {
    if (!isActive) setScale(1);
  }, [isActive]);

  const onTouchStart = (event: React.TouchEvent) => {
    if (event.touches.length !== 2) return;
    const [a, b] = [event.touches[0], event.touches[1]];
    const distance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
    pinchRef.current = { distance, scale };
  };

  const onTouchMove = (event: React.TouchEvent) => {
    if (event.touches.length !== 2 || !pinchRef.current) return;
    const [a, b] = [event.touches[0], event.touches[1]];
    const distance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
    const nextScale = Math.min(3, Math.max(1, (pinchRef.current.scale * distance) / pinchRef.current.distance));
    setScale(nextScale);
  };

  const onTouchEnd = () => {
    pinchRef.current = null;
    if (scale < 1.05) setScale(1);
  };

  if (item.kind === "video") {
    return (
      <div className="flex h-full w-full items-center justify-center px-3">
        <video
          key={item.src}
          src={item.src}
          controls
          playsInline
          preload="metadata"
          className="max-h-[calc(100dvh-7rem)] w-full max-w-full object-contain"
        />
      </div>
    );
  }

  const media = (
    <>
      {item.kind === "placeholder" && (
        <div className="relative h-[min(72dvh,640px)] w-full max-w-full">
          <PlaceholderImage
            src={item.src}
            alt={item.title}
            fill
            gradient={`bg-gradient-to-br ${item.gradient}`}
            className="object-contain"
          />
        </div>
      )}
      {item.kind === "image" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.src}
          alt={item.title}
          loading={isActive ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          className="max-h-[calc(100dvh-7rem)] w-auto max-w-full select-none object-contain"
          style={{ transform: `scale(${scale})`, transition: scale === 1 ? "transform 0.25s ease" : "none" }}
        />
      )}
    </>
  );

  if (item.kind !== "image") {
    return <div className="flex h-full w-full items-center justify-center px-3">{media}</div>;
  }

  return (
    <div
      className="mobile-gallery-pinch flex h-full w-full items-center justify-center overflow-hidden px-3"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
    >
      {media}
    </div>
  );
}

export function MobileGalleryLightbox({ state, onClose, onChangeIndex }: MobileGalleryLightboxProps) {
  const { items, index } = state;
  const item = items[index];
  const hasMultiple = items.length > 1;
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (nextIndex: number, nextDirection: number) => {
      if (nextIndex === index) return;
      setDirection(nextDirection);
      onChangeIndex(nextIndex);
    },
    [index, onChangeIndex],
  );

  const goNext = useCallback(() => {
    if (!hasMultiple) return;
    goTo((index + 1) % items.length, 1);
  }, [goTo, hasMultiple, index, items.length]);

  const goPrev = useCallback(() => {
    if (!hasMultiple) return;
    goTo((index - 1 + items.length) % items.length, -1);
  }, [goTo, hasMultiple, index, items.length]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x <= -SWIPE_THRESHOLD || info.velocity.x <= -SWIPE_VELOCITY) {
      goNext();
      return;
    }
    if (info.offset.x >= SWIPE_THRESHOLD || info.velocity.x >= SWIPE_VELOCITY) {
      goPrev();
    }
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    preloadGalleryItem(items[(index - 1 + items.length) % items.length]);
    preloadGalleryItem(items[(index + 1) % items.length]);
  }, [index, items]);

  if (!item) return null;

  const slideVariants = {
    enter: (slideDirection: number) => ({
      x: slideDirection >= 0 ? "100%" : "-100%",
      opacity: 0.35,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (slideDirection: number) => ({
      x: slideDirection >= 0 ? "-100%" : "100%",
      opacity: 0.35,
    }),
  };

  return (
    <ModalPortal>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="mobile-gallery-lightbox fixed inset-0 z-[120] flex flex-col bg-black touch-none"
        onClick={onClose}
      >
        <GalleryCloseButton
          onClose={onClose}
          className="right-[max(1rem,env(safe-area-inset-right))] top-[max(1rem,env(safe-area-inset-top))]"
        />

        <div
          className="mobile-gallery-toolbar relative z-20 flex shrink-0 items-center px-4 pb-3 pt-[max(3.75rem,calc(env(safe-area-inset-top)+3rem))]"
          onClick={(event) => event.stopPropagation()}
        >
          <p className="font-mono text-xs tracking-[0.18em] text-white/55">
            <span className="font-semibold text-orange">{index + 1}</span>
            <span className="text-white/35"> / </span>
            {items.length}
          </p>
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden" onClick={(event) => event.stopPropagation()}>
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={`${item.kind}-${"id" in item ? item.id : item.src}-${index}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 340, damping: 34 }}
              drag={hasMultiple ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 flex items-center justify-center"
            >
              <MobileGallerySlide item={item} isActive />
            </motion.div>
          </AnimatePresence>
        </div>

        {hasMultiple && (
          <div
            className="mobile-gallery-dots flex shrink-0 justify-center gap-1.5 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2"
            onClick={(event) => event.stopPropagation()}
          >
            {items.map((entry, dotIndex) => (
              <span
                key={`${entry.kind}-${"id" in entry ? entry.id : entry.src}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  dotIndex === index ? "w-5 bg-orange" : "w-1.5 bg-white/25"
                }`}
                aria-hidden
              />
            ))}
          </div>
        )}
      </motion.div>
    </ModalPortal>
  );
}
