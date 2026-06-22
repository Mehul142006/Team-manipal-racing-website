"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

type LiquidGlassHeadingProps = {
  children: React.ReactNode;
  className?: string;
};

export function LiquidGlassHeading({ children, className = "" }: LiquidGlassHeadingProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const offsetX = useSpring(0, { stiffness: 180, damping: 22, mass: 0.4 });
  const offsetY = useSpring(0, { stiffness: 180, damping: 22, mass: 0.4 });

  const measure = useCallback(() => {
    if (!ref.current) return;
    const { width, height } = ref.current.getBoundingClientRect();
    setSize({ width: width + 56, height: height + 28 });
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    offsetX.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    offsetY.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const handleLeave = () => {
    setActive(false);
    offsetX.set(0);
    offsetY.set(0);
  };

  return (
    <span
      ref={ref}
      className={`relative inline-block ${className}`}
      onMouseEnter={() => {
        measure();
        setActive(true);
      }}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
    >
      <motion.span
        aria-hidden
        className="liquid-glass-blob absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: size.width,
          height: size.height,
          x: offsetX,
          y: offsetY,
        }}
        initial={false}
        animate={{
          opacity: active ? 1 : 0,
          scale: active ? 1 : 0.85,
          borderRadius: active
            ? ["42% 58% 55% 45%", "55% 45% 48% 52%", "48% 52% 58% 42%", "42% 58% 55% 45%"]
            : "50%",
        }}
        transition={{
          opacity: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
          scale: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
          borderRadius: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
}
