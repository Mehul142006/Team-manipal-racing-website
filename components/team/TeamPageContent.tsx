"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { PageHero } from "@/components/ui/GlassCard";
import { MemberCard } from "@/components/ui/MemberCard";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { LEADERSHIP, SUBSYSTEM_TEAMS, SUBSYSTEMS } from "@/lib/data";

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-white sm:text-2xl">{children}</h2>
      <div className="section-title-accent mt-3" />
    </div>
  );
}

type TeamPageContentProps = {
  teamPhotoSrc?: string | null;
};

export function TeamPageContent({ teamPhotoSrc }: TeamPageContentProps) {
  return (
    <>
      <PageHero
        eyebrow="The People"
        title="Meet The Team"
        description="Team Manipal Racing Electric 2025 — the engineers and leaders behind our championship E-BAJA program."
      />

      <SectionAtmosphere
        watermark="PEOPLE"
        backgroundSrc={teamPhotoSrc ?? undefined}
        backgroundOpacity={0.07}
        className="pb-12 sm:pb-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle>Leadership</SectionTitle>
          <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
            {LEADERSHIP.map((member, i) => (
              <MemberCard
                key={member.name}
                name={member.name}
                role={member.role}
                size="leadership"
                delay={i * 0.08}
              />
            ))}
          </div>
        </div>
      </SectionAtmosphere>

      <SectionAtmosphere
        watermark="PEOPLE"
        backgroundSrc={teamPhotoSrc ?? undefined}
        backgroundOpacity={0.05}
        className="pb-24 sm:pb-32"
      >
        <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
          <SectionTitle>Subsystem Teams</SectionTitle>

          {SUBSYSTEM_TEAMS.map((team, sectionIndex) => {
            const subsystem = SUBSYSTEMS.find((s) => s.slug === team.id);

            return (
              <div key={team.id}>
                <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white sm:text-xl">{team.title}</h3>
                    {subsystem && (
                      <Link
                        href={`/subsystems?open=${subsystem.slug}`}
                        className="mt-1 inline-block text-[11px] font-semibold uppercase tracking-widest text-accent transition-colors hover:text-white"
                      >
                        View subsystem →
                      </Link>
                    )}
                  </div>
                </div>

                {"emptyMessage" in team && team.members.length === 0 ? (
                  <div className="liquid-glass liquid-glass-card rounded-2xl px-6 py-10 text-center">
                    <p className="text-sm text-muted">{team.emptyMessage}</p>
                  </div>
                ) : (
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {team.members.map((member, i) => (
                      <MemberCard
                        key={`${team.id}-${member.name}`}
                        name={member.name}
                        role={member.role}
                        delay={sectionIndex * 0.04 + i * 0.06}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </SectionAtmosphere>
    </>
  );
}
