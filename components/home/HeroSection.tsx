import { getHeroVideo } from "@/lib/get-hero-video";
import { HeroSectionClient } from "@/components/home/HeroSectionClient";

export function HeroSection() {
  const heroVideoSrc = getHeroVideo();
  return <HeroSectionClient heroVideoSrc={heroVideoSrc} />;
}
