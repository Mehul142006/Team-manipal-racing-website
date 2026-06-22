"use client";

import { SubsystemsGrid } from "@/components/subsystems/SubsystemsGrid";
import type { SubsystemSlug } from "@/lib/data";

type SubsystemsPreviewClientProps = {
  imageOverrides?: Partial<Record<SubsystemSlug, string>>;
};

export function SubsystemsPreviewClient({ imageOverrides }: SubsystemsPreviewClientProps) {
  return <SubsystemsGrid imageOverrides={imageOverrides} />;
}
