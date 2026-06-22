import { PageHero } from "@/components/ui/GlassCard";
import { GalleryCategoriesSection } from "@/components/gallery/GalleryCategoriesSection";
import { getCompetitionGalleryMedia } from "@/lib/get-competition-gallery";
import { getManufacturingGalleryMedia } from "@/lib/get-manufacturing-gallery";
import { getTestingGalleryMedia } from "@/lib/get-testing-gallery";

export default function PhotosPage() {
  const testingMedia = getTestingGalleryMedia();
  const manufacturingMedia = getManufacturingGalleryMedia();
  const competitionMedia = getCompetitionGalleryMedia();

  return (
    <>
      <PageHero
        eyebrow="Media"
        title="Photos"
        description="Manufacturing, testing, and competition — the TMRE story in images and video."
      />
      <GalleryCategoriesSection
        testingMedia={testingMedia}
        manufacturingMedia={manufacturingMedia}
        competitionMedia={competitionMedia}
      />
    </>
  );
}
