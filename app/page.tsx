import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { EbajaSection } from "@/components/home/EbajaSection";
import { VisionSection } from "@/components/home/VisionSection";
import { SubsystemsPreview } from "@/components/home/SubsystemsPreview";
import { AchievementsPreview } from "@/components/home/AchievementsPreview";
import { SponsorsPreview } from "@/components/home/SponsorsPreview";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { FollowOurJourney } from "@/components/home/FollowOurJourney";
import { ContactPreview } from "@/components/home/ContactPreview";
import { getHomeGalleryPreviewItems, getHomePhotos } from "@/lib/get-home-photos";
import { verifySubsystemPhotos } from "@/lib/get-subsystem-photos";
import { getSponsors } from "@/lib/get-sponsors";

export default function HomePage() {
  const sponsors = getSponsors();
  const { teamPhoto, saeEbaja, nationalPodiums } = getHomePhotos();
  const galleryItems = getHomeGalleryPreviewItems();
  const subsystemPhotos = verifySubsystemPhotos();

  if (!teamPhoto) {
    throw new Error("Homepage image missing: add Team_Photo to public/photo/.");
  }

  if (!saeEbaja) {
    throw new Error("Homepage image missing: add SAE-Ebaja to public/photo/.");
  }

  if (!nationalPodiums) {
    throw new Error("Homepage image missing: add National_podiums to public/photo/.");
  }

  return (
    <>
      <HeroSection />
      <AboutSection teamPhotoSrc={teamPhoto} />
      <EbajaSection saeEbajaSrc={saeEbaja} />
      <VisionSection />
      <SubsystemsPreview subsystemPhotos={subsystemPhotos} />
      <AchievementsPreview podiumImageSrc={nationalPodiums} />
      <SponsorsPreview sponsors={sponsors} />
      <GalleryPreview items={galleryItems} />
      <FollowOurJourney />
      <ContactPreview />
    </>
  );
}
