import { PageHero } from "@/components/ui/GlassCard";
import { BecomeSponsorSection } from "@/components/sponsors/BecomeSponsorSection";
import { SponsorsShowcase } from "@/components/sponsors/SponsorsShowcase";
import { getBecomeSponsorImageUrl } from "@/lib/get-become-sponsor-image";
import { getSponsorsByTier } from "@/lib/get-sponsors";

export default function SponsorsPage() {
  const sponsorsByTier = getSponsorsByTier();
  const becomeSponsorImageSrc = getBecomeSponsorImageUrl();

  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="Our Sponsors"
        description="Team Manipal Racing Electric is powered by partners who believe in student engineering. Their support fuels our workshop, our competition program, and our pursuit of excellence at E-BAJA SAE India."
      />

      <SponsorsShowcase sponsorsByTier={sponsorsByTier} />

      <BecomeSponsorSection imageSrc={becomeSponsorImageSrc} />
    </>
  );
}
