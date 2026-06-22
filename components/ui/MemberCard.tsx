"use client";

import { motion } from "framer-motion";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { MEMBER_PLACEHOLDER } from "@/lib/images";

function getBadgeStyle(role: string): string {
  const normalized = role.toLowerCase();

  if (normalized.includes("vice captain")) {
    return "border-accent/40 bg-accent/10 text-accent";
  }
  if (normalized.includes("captain")) {
    return "border-accent/40 bg-accent/10 text-accent";
  }
  if (normalized.includes("subsystem head")) {
    return "border-orange/40 bg-orange/10 text-orange";
  }
  if (normalized.includes("driver")) {
    return "border-orange/35 bg-orange/10 text-orange";
  }

  return "border-white/10 bg-white/5 text-muted";
}

type MemberCardProps = {
  name: string;
  role: string;
  image?: string;
  linkedin?: string;
  size?: "default" | "leadership";
  delay?: number;
};

export function MemberCard({
  name,
  role,
  image,
  linkedin,
  size = "default",
  delay = 0,
}: MemberCardProps) {
  const isLeadership = size === "leadership";

  const photoAspect = isLeadership ? "aspect-[6/5]" : "aspect-[5/4]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="liquid-glass liquid-glass-card group flex h-full flex-col overflow-hidden rounded-2xl"
    >
      <div className={`relative w-full shrink-0 overflow-hidden ${photoAspect}`}>
        <PlaceholderImage
          src={image ?? MEMBER_PLACEHOLDER}
          alt={name}
          fill
          gradient="from-steel via-navy to-midnight"
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/70 via-transparent to-transparent opacity-50" />
      </div>

      <div
        className={`flex flex-1 flex-col ${isLeadership ? "p-4 sm:p-5" : "p-4"}`}
      >
        <h3
          className={`font-semibold leading-snug text-white ${
            isLeadership ? "text-base sm:text-lg" : "text-sm sm:text-base"
          }`}
        >
          {name}
        </h3>

        <span
          className={`mt-2 inline-flex w-fit rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${getBadgeStyle(role)}`}
        >
          {role}
        </span>

        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} LinkedIn`}
            className="mt-auto inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-muted transition-colors hover:bg-accent/10 hover:text-accent"
          >
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        )}
      </div>
    </motion.div>
  );
}
