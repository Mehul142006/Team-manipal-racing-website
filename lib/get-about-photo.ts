import fs from "node:fs";
import path from "node:path";

const PHOTO_DIR = path.join(process.cwd(), "public", "photo");
const PHOTO_EXTENSIONS = [".jpeg", ".jpg", ".png", ".webp", ".avif"] as const;

export type AboutPhotos = {
  bestPhoto: string;
  teamHistory: string;
  teamStructure: string;
};

function resolvePhoto(basename: string): string | null {
  try {
    if (!fs.existsSync(PHOTO_DIR)) {
      return null;
    }

    const match = fs
      .readdirSync(PHOTO_DIR)
      .find((filename) =>
        PHOTO_EXTENSIONS.some(
          (ext) => filename.toLowerCase() === `${basename.toLowerCase()}${ext}`
        )
      );

    if (match) {
      return `/photo/${match}`;
    }
  } catch {
    /* ignore */
  }

  return null;
}

/** Resolves Best_photo, Team_History, and Team_Structure from public/photo. */
export function getAboutPhotos(): AboutPhotos | null {
  const bestPhoto = resolvePhoto("Best_photo");
  const teamHistory = resolvePhoto("Team_History");
  const teamStructure = resolvePhoto("Team_Structure");

  if (!bestPhoto || !teamHistory || !teamStructure) {
    return null;
  }

  return { bestPhoto, teamHistory, teamStructure };
}

/** @deprecated Use getAboutPhotos */
export function getBestPhotoSrc(): string | null {
  return resolvePhoto("Best_photo");
}
