"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/GlassCard";
import { ApplicationModal } from "@/components/contact/ApplicationModal";

export function RecruitmentSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="mt-16 sm:mt-20 lg:mt-24">
        <div className="h-px bg-white/10" aria-hidden />

        <div className="mt-16 sm:mt-20">
          <SectionHeading
            eyebrow="Recruitment"
            title="Join Team Manipal Racing Electric"
            description="Interested in joining Team Manipal Racing Electric? Submit your application below and indicate your preferred subsystems."
            align="left"
            compact
          />

          <p className="mb-8 max-w-3xl text-sm leading-relaxed text-muted sm:mb-10 sm:text-base">
            Applications are reviewed by the Team Captain, Vice Captain and respective subsystem heads.
            Shortlisted candidates will be contacted through WhatsApp.
          </p>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="recruitment-apply-btn btn-primary rounded-2xl px-8 py-4 text-sm"
          >
            Apply for Position
          </button>
        </div>
      </div>

      <ApplicationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
