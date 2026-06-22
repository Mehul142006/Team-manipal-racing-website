"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { SubsystemCard } from "@/components/subsystems/SubsystemCard";
import { SubsystemModal } from "@/components/subsystems/SubsystemModal";
import type { SubsystemSlug } from "@/lib/data";
import { SUBSYSTEMS } from "@/lib/data";

type SubsystemsGridProps = {
  initialSlug?: SubsystemSlug | null;
  onInitialSlugHandled?: () => void;
  imageOverrides?: Partial<Record<SubsystemSlug, string>>;
};

export function SubsystemsGrid({
  initialSlug,
  onInitialSlugHandled,
  imageOverrides,
}: SubsystemsGridProps) {
  const [activeSlug, setActiveSlug] = useState<SubsystemSlug | null>(initialSlug ?? null);

  useEffect(() => {
    if (initialSlug) {
      setActiveSlug(initialSlug);
      onInitialSlugHandled?.();
    }
  }, [initialSlug, onInitialSlugHandled]);

  const resolveImage = (slug: SubsystemSlug, fallback: string) =>
    imageOverrides?.[slug] ?? fallback;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SUBSYSTEMS.map((sub, i) => (
          <SubsystemCard
            key={sub.slug}
            slug={sub.slug}
            title={sub.title}
            tagline={sub.tagline}
            image={resolveImage(sub.slug, sub.image)}
            delay={i * 0.04}
            onSelect={setActiveSlug}
          />
        ))}
      </div>

      <AnimatePresence>
        {activeSlug && (
          <SubsystemModal
            slug={activeSlug}
            imageSrc={resolveImage(activeSlug, getSubsystemImage(activeSlug))}
            onClose={() => setActiveSlug(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function getSubsystemImage(slug: SubsystemSlug): string {
  return SUBSYSTEMS.find((sub) => sub.slug === slug)?.image ?? "";
}
