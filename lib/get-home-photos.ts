import fs from "node:fs";
import path from "node:path";
import { GALLERY_CATEGORIES } from "./data";
import { getCategoryGradient, type GalleryCategoryId } from "./images";
import {
  getCategoryGalleryDir,
  readCategoryGallery,
} from "./read-category-gallery";
import { isGalleryImageFile } from "./gallery-media";

const PHOTOS_DIR = path.join(process.cwd(), "public", "photos");
const PHOTO_DIR = path.join(process.cwd(), "public", "photo");
const IMAGE_EXTENSIONS = [".jpeg", ".jpg", ".png", ".webp", ".avif", ".gif"] as const;

export type HomePhotos = {
  teamPhoto: string | null;
  saeEbaja: string | null;
  nationalPodiums: string | null;
};

export type HomeGalleryPreviewItem = {
  id: GalleryCategoryId;
  title: string;
  src: string;
  gradient: string;
  aspect: "tall" | "wide" | "square";
};

function resolveBasenameInDir(dir: string, urlPrefix: string, basename: string): string | null {
  try {
    if (!fs.existsSync(dir)) {
      return null;
    }

    const match = fs
      .readdirSync(dir)
      .find((filename) =>
        IMAGE_EXTENSIONS.some(
          (ext) => filename.toLowerCase() === `${basename.toLowerCase()}${ext}`
        )
      );

    if (match) {
      return `${urlPrefix}/${match}`;
    }
  } catch {
    /* ignore */
  }

  return null;
}

/** First image file in public/photos/{category}, sorted alphabetically. */
export function getFirstCategoryImage(category: string): string | null {
  try {
    const dir = getCategoryGalleryDir(category);
    if (!fs.existsSync(dir)) {
      return null;
    }

    const match = fs
      .readdirSync(dir)
      .filter((file) => !file.startsWith(".") && isGalleryImageFile(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))[0];

    if (match) {
      return `/photos/${category}/${encodeURIComponent(match)}`;
    }
  } catch {
    /* ignore */
  }

  return null;
}

function resolveBasename(basename: string): string | null {
  return (
    resolveBasenameInDir(PHOTO_DIR, "/photo", basename) ??
    resolveBasenameInDir(PHOTOS_DIR, "/photos", basename)
  );
}

export function getHomePhotos(): HomePhotos {
  return {
    teamPhoto: resolveBasename("Team_Photo"),
    saeEbaja: resolveBasename("SAE-Ebaja"),
    nationalPodiums: resolveBasename("National_podiums"),
  };
}

export function getHomeGalleryPreviewItems(): HomeGalleryPreviewItem[] {
  return GALLERY_CATEGORIES.map((cat, i) => {
    let src = `${cat.path}/cover.jpg`;
    const firstImage = getFirstCategoryImage(cat.id);
    if (firstImage) {
      src = firstImage;
    }

    return {
      id: cat.id,
      title: cat.label,
      gradient: getCategoryGradient(cat.id),
      src,
      aspect: i % 3 === 0 ? "tall" : i % 3 === 1 ? "wide" : "square",
    };
  });
}

/** Reads all images and videos from public/photos/competition. */
export function getCompetitionGalleryMedia() {
  return readCategoryGallery(
    getCategoryGalleryDir("competition"),
    "/photos/competition",
    { includeVideos: true }
  );
}
