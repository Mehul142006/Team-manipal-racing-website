"use client";

import { motion } from "framer-motion";

type AnimatedProgressBarProps = {
  label: string;
  progress: number;
  note?: string;
  active: boolean;
  delay?: number;
};

export function AnimatedProgressBar({
  label,
  progress,
  note,
  active,
  delay = 0,
}: AnimatedProgressBarProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-white">{label}</span>
        {note && <span className="text-[10px] font-semibold text-orange">{note}</span>}
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={active ? { width: `${progress}%` } : { width: 0 }}
          transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-orange via-[var(--hover-orange)] to-accent/90"
        />
      </div>
    </div>
  );
}
