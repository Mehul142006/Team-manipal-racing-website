"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PageHero } from "@/components/ui/GlassCard";
import { SubsystemsGrid } from "@/components/subsystems/SubsystemsGrid";
import { SUBSYSTEMS, type SubsystemSlug } from "@/lib/data";

function isSubsystemSlug(value: string | null): value is SubsystemSlug {
  return SUBSYSTEMS.some((sub) => sub.slug === value);
}

type SubsystemsPageContentProps = {
  imageOverrides?: Partial<Record<SubsystemSlug, string>>;
};

export default function SubsystemsPageContent({ imageOverrides }: SubsystemsPageContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const openParam = searchParams.get("open");

  const initialSlug = useMemo(
    () => (isSubsystemSlug(openParam) ? openParam : null),
    [openParam]
  );

  const handleInitialSlugHandled = () => {
    router.replace("/subsystems", { scroll: false });
  };

  return (
    <>
      <PageHero
        eyebrow="Engineering"
        title="Subsystems"
        description="Eight integrated disciplines — tap a card to explore what each team brings to the vehicle."
      />
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SubsystemsGrid
            initialSlug={initialSlug}
            onInitialSlugHandled={handleInitialSlugHandled}
            imageOverrides={imageOverrides}
          />
        </div>
      </section>
    </>
  );
}
