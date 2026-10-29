import { AchievementsTimeline } from "@/components/achievements/AchievementsTimeline";
import { PageHero } from "@/components/ui/GlassCard";
import { getHomePhotos } from "@/lib/get-home-photos";
import { getEvPhotos } from "@/lib/get-site-photos";

export default function AchievementsPage() {
  const evImages = getEvPhotos();
  const { nationalPodiums, saeEbaja } = getHomePhotos();

  return (
    <>
      <PageHero
        eyebrow="Results"
        title="Achievements"
        description="E-BAJA 2025 and E-BAJA 2026 results, followed by the documented journey of each electric vehicle."
      />
      <AchievementsTimeline
        evImages={evImages}
        podiumSrc={nationalPodiums}
        competitionSrc={saeEbaja}
      />
    </>
  );
}
