"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

type LiquidGlassCursorProps = {
  containerRef: React.RefObject<HTMLElement | null>;
};

export function LiquidGlassCursor({ containerRef }: LiquidGlassCursorProps) {
  const [enabled, setEnabled] = useState(false);
  const x = useSpring(0, { stiffness: 140, damping: 24, mass: 0.5 });
  const y = useSpring(0, { stiffness: 140, damping: 24, mass: 0.5 });
  const opacity = useSpring(0, { stiffness: 200, damping: 30 });
  const scale = useSpring(0.6, { stiffness: 200, damping: 28 });

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || coarsePointer) return;

    setEnabled(true);
    const container = containerRef.current;
    if (!container) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      opacity.set(0.55);
      scale.set(1);
    };

    const onLeave = () => {
      opacity.set(0);
      scale.set(0.6);
    };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);

    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, [containerRef, opacity, scale, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="liquid-glass-cursor pointer-events-none fixed left-0 top-0 z-[2] hidden md:block"
      style={{ x, y, opacity, scale, translateX: "-50%", translateY: "-50%" }}
    />
  );
}
