import Link from "next/link";
import { SectionHeading } from "@/components/ui/GlassCard";
import { SubsystemsPreviewClient } from "@/components/home/SubsystemsPreviewClient";
import type { SubsystemPhotos } from "@/lib/get-subsystem-photos";

type SubsystemsPreviewProps = {
  subsystemPhotos: SubsystemPhotos;
};

export function SubsystemsPreview({ subsystemPhotos }: SubsystemsPreviewProps) {
  return (
    <section className="home-section relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Engineering" title="Subsystems" compact />
        <SubsystemsPreviewClient imageOverrides={subsystemPhotos} />

        <div className="mt-8 text-center">
          <Link
            href="/subsystems"
            className="liquid-glass liquid-glass-btn inline-flex rounded-2xl px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white"
          >
            All Subsystems
          </Link>
        </div>
      </div>
    </section>
  );
}
