import type { CategoryGalleryData } from "@/lib/gallery-media";
import type { GalleryLightboxItem } from "@/components/gallery/GalleryLightbox";

export function buildCombinedGalleryItems(
  media: CategoryGalleryData,
  includeVideos: boolean,
): GalleryLightboxItem[] {
  const images: GalleryLightboxItem[] = media.images.map((entry) => ({
    ...entry,
    kind: "image" as const,
  }));

  if (!includeVideos) return images;

  const videos: GalleryLightboxItem[] = media.videos.map((entry) => ({
    ...entry,
    kind: "video" as const,
  }));

  return [...images, ...videos];
}
