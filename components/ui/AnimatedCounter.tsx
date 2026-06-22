"use client";

import { useEffect, useState } from "react";

type AnimatedCounterProps = {
  value: number;
  active: boolean;
  decimals?: number;
  duration?: number;
};

export function AnimatedCounter({
  value,
  active,
  decimals = 0,
  duration = 2000,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    let startTime: number | null = null;
    let frame: number;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * value);
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [value, active, duration]);

  return (
    <span className="tabular-nums">
      {count.toFixed(decimals)}
    </span>
  );
}
