"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/GlassCard";
import { ApplicationModal } from "@/components/contact/ApplicationModal";

type RecruitmentSectionProps = {
  recruitmentImageSrc: string;
};

export function RecruitmentSection({ recruitmentImageSrc }: RecruitmentSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="mt-16 sm:mt-20 lg:mt-24">
        <div className="h-px bg-white/10" aria-hidden />

        <div className="mt-16 grid items-center gap-10 sm:mt-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Recruitment"
              title="Join Team Manipal Racing Electric"
              description="Interested in joining Team Manipal Racing Electric? Submit your application below and indicate your preferred subsystems."
              align="left"
              compact
            />

            <p className="mb-8 max-w-3xl text-sm leading-relaxed text-muted sm:mb-10 sm:text-base">
              Applications are reviewed by the Team Captain, Vice Captain and respective subsystem
              heads. Shortlisted candidates will be contacted through WhatsApp.
            </p>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="recruitment-apply-btn btn-primary rounded-2xl px-8 py-4 text-sm"
            >
              Apply for Position
            </button>
          </div>

          <div className="recruitment-image-frame group overflow-hidden rounded-3xl border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={recruitmentImageSrc}
              alt="Team Manipal Racing Electric recruitment"
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full bg-black/30 object-contain object-center transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>

      <ApplicationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
