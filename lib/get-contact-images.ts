import fs from "node:fs";
import path from "node:path";

const PHOTO_DIR = path.join(process.cwd(), "public", "photo");
const URL_PREFIX = "/photo";
const IMAGE_EXTENSIONS = [".jpeg", ".jpg", ".png", ".webp", ".avif", ".gif"];

function normalizeKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function resolvePhotoUrl(basename: string, fallbackFilename: string): string {
  for (const ext of IMAGE_EXTENSIONS) {
    const filename = `${basename}${ext}`;
    if (fs.existsSync(path.join(PHOTO_DIR, filename))) {
      return `${URL_PREFIX}/${encodeURIComponent(filename)}`;
    }
  }

  if (fs.existsSync(PHOTO_DIR)) {
    const match = fs
      .readdirSync(PHOTO_DIR)
      .find((file) => normalizeKey(file.replace(/\.[^.]+$/, "")) === normalizeKey(basename));

    if (match) {
      return `${URL_PREFIX}/${encodeURIComponent(match)}`;
    }
  }

  return `${URL_PREFIX}/${encodeURIComponent(fallbackFilename)}`;
}

export function getContactHeroImageUrl(): string {
  return resolvePhotoUrl("Contact_us", "Contact_us.jpeg");
}

export function getRecruitmentImageUrl(): string {
  return resolvePhotoUrl("Recruitment", "Recruitment.jpeg");
}
