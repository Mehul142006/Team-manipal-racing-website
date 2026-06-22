import { PageHero } from "@/components/ui/GlassCard";
import { AchievementsTimeline } from "@/components/achievements/AchievementsTimeline";

export default function AchievementsPage() {
  return (
    <>
      <PageHero
        eyebrow="Results"
        title="Achievements"
        description="Our competition journey — from founding to national podiums at BAJA SAE India."
      />
      <AchievementsTimeline />
    </>
  );
}
