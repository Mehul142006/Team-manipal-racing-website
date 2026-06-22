import { SectionHeading } from "@/components/ui/GlassCard";
import { SponsorCard } from "@/components/ui/SponsorCard";
import type { SponsorItem, SponsorTier } from "@/lib/sponsors";

const TIER_SECTIONS: {
  tier: SponsorTier;
  eyebrow: string;
  title: string;
  description: string;
  cardSize: "hero" | "lg" | "md";
  columns: string;
}[] = [
  {
    tier: "title",
    eyebrow: "Title Partner",
    title: "Powered By",
    description: "Our lead partner driving electric innovation at TMRE.",
    cardSize: "hero",
    columns: "grid-cols-1 max-w-md mx-auto",
  },
  {
    tier: "major",
    eyebrow: "Major Partners",
    title: "Championship Support",
    description: "Partners who anchor our competition program and team operations.",
    cardSize: "lg",
    columns: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
  },
  {
    tier: "technical",
    eyebrow: "Technical Partners",
    title: "Our Engineering Ecosystem",
    description: "Software, simulation, and manufacturing partners behind every subsystem.",
    cardSize: "md",
    columns: "grid-cols-2 md:grid-cols-3 xl:grid-cols-4",
  },
  {
    tier: "supporting",
    eyebrow: "Supporting Partners",
    title: "Extended Team",
    description: "Additional partners who help us compete at the national level.",
    cardSize: "md",
    columns: "grid-cols-2 md:grid-cols-3 xl:grid-cols-4",
  },
];

type SponsorsShowcaseProps = {
  sponsorsByTier: Record<SponsorTier, SponsorItem[]>;
};

export function SponsorsShowcase({ sponsorsByTier }: SponsorsShowcaseProps) {
  return (
    <section className="sponsors-showcase-bg pb-24 sm:pb-32">
      <div className="mx-auto max-w-7xl space-y-20 px-4 sm:space-y-24 sm:px-6 lg:px-8">
        {TIER_SECTIONS.map((section) => {
          const sponsors = sponsorsByTier[section.tier];
          if (sponsors.length === 0) return null;

          return (
            <div key={section.tier}>
              <SectionHeading
                eyebrow={section.eyebrow}
                title={section.title}
                description={section.description}
                align="left"
              />
              <div className={`mt-10 grid gap-5 sm:gap-6 ${section.columns}`}>
                {sponsors.map((sponsor, i) => (
                  <SponsorCard
                    key={sponsor.id}
                    name={sponsor.name}
                    logo={sponsor.logo}
                    hasLogo={sponsor.hasLogo}
                    size={section.cardSize}
                    delay={i * 0.04}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
