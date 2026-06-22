import { AboutPageContent } from "@/components/about/AboutPageContent";
import { getAboutPhotos } from "@/lib/get-about-photo";

export default function AboutPage() {
  const photos = getAboutPhotos();

  if (!photos) {
    throw new Error(
      "About page images missing: add Best_photo, Team_History, and Team_Structure to public/photo."
    );
  }

  return <AboutPageContent photos={photos} />;
}
