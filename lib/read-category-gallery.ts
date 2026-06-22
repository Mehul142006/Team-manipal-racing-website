import fs from "node:fs";
import path from "node:path";
import {
  EMPTY_CATEGORY_GALLERY,
  formatGalleryTitle,
  isGalleryImageFile,
  isGalleryVideoFile,
  type CategoryGalleryData,
  type GalleryImageItem,
  type GalleryVideoItem,
} from "./gallery-media";

type ReadCategoryGalleryOptions = {
  includeVideos?: boolean;
  fallback?: CategoryGalleryData;
};

/** Reads image/video files from a public/photos/{category} folder at build time. */
export function readCategoryGallery(
  categoryDir: string,
  publicUrlPrefix: string,
  options: ReadCategoryGalleryOptions = {}
): CategoryGalleryData {
  const { includeVideos = true, fallback = EMPTY_CATEGORY_GALLERY } = options;

  try {
    if (!fs.existsSync(categoryDir)) {
      return fallback;
    }

    const files = fs
      .readdirSync(categoryDir)
      .filter((file) => !file.startsWith("."))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    const images: GalleryImageItem[] = [];
    const videos: GalleryVideoItem[] = [];

    for (const file of files) {
      const src = `${publicUrlPrefix}/${encodeURIComponent(file)}`;
      const title = formatGalleryTitle(file);

      if (isGalleryImageFile(file)) {
        images.push({ id: file, type: "image", src, title });
      } else if (includeVideos && isGalleryVideoFile(file)) {
        videos.push({ id: file, type: "video", src, title });
      }
    }

    if (images.length === 0 && videos.length === 0) {
      return fallback;
    }

    return {
      images,
      videos,
      stats: { photos: images.length, videos: videos.length },
    };
  } catch {
    return fallback;
  }
}

export function getCategoryGalleryDir(category: string): string {
  return path.join(process.cwd(), "public", "photos", category);
}
