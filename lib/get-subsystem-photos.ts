import fs from "node:fs";
import path from "node:path";
import { isGalleryImageFile } from "./gallery-media";
import type { SubsystemSlug } from "./data";
import { SUBSYSTEMS } from "./data";

const PHOTO_DIR = path.join(process.cwd(), "public", "photo");

const SUBSYSTEM_PHOTO_CANDIDATES: Record<SubsystemSlug, readonly string[]> = {
  "vehicle-dynamics": ["Vd", "VD"],
  "data-acquisition": ["DAQ"],
  structures: ["Structures"],
  transmission: ["Transmission"],
  electronics: ["Electronics"],
  management: ["Management"],
  "research-and-development": [
    "ResearchAndDevelopment",
    "Research_and_Development",
    "Research",
  ],
  "electric-powertrain": [
    "ElectricPowertrain",
    "Electric_Powertrain",
    "Electric Powertrain",
  ],
};

function normalizeKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function resolveBasenameInDir(dir: string, urlPrefix: string, basename: string): string | null {
  try {
    if (!fs.existsSync(dir)) return null;

    const extensions = [".jpeg", ".jpg", ".png", ".webp", ".avif", ".gif"];

    for (const ext of extensions) {
      const filename = `${basename}${ext}`;
      if (fs.existsSync(path.join(dir, filename))) {
        return `${urlPrefix}/${encodeURIComponent(filename)}`;
      }
    }

    const caseInsensitive = fs
      .readdirSync(dir)
      .find((file) => normalizeKey(file.replace(/\.[^.]+$/, "")) === normalizeKey(basename));

    if (caseInsensitive && isGalleryImageFile(caseInsensitive)) {
      return `${urlPrefix}/${encodeURIComponent(caseInsensitive)}`;
    }
  } catch {
    /* ignore */
  }

  return null;
}

function findByKeywordInDir(dir: string, urlPrefix: string, keywords: readonly string[]): string | null {
  try {
    if (!fs.existsSync(dir)) return null;

    const normalizedKeywords = keywords.map(normalizeKey);

    const match = fs
      .readdirSync(dir)
      .filter((file) => !file.startsWith(".") && isGalleryImageFile(file))
      .find((file) => {
        const normalizedFile = normalizeKey(file.replace(/\.[^.]+$/, ""));
        return normalizedKeywords.some(
          (keyword) =>
            normalizedFile === keyword ||
            normalizedFile.includes(keyword) ||
            keyword.includes(normalizedFile)
        );
      });

    if (match) {
      return `${urlPrefix}/${encodeURIComponent(match)}`;
    }
  } catch {
    /* ignore */
  }

  return null;
}

function resolveSubsystemPhoto(slug: SubsystemSlug): string {
  const candidates = SUBSYSTEM_PHOTO_CANDIDATES[slug];

  for (const basename of candidates) {
    const resolved = resolveBasenameInDir(PHOTO_DIR, "/photo", basename);
    if (resolved) return resolved;
  }

  const keywordMatch = findByKeywordInDir(PHOTO_DIR, "/photo", candidates);
  if (keywordMatch) return keywordMatch;

  const fallback = SUBSYSTEMS.find((sub) => sub.slug === slug)?.image ?? `/photo/${slug}.jpg`;
  return fallback;
}

export type SubsystemPhotos = Record<SubsystemSlug, string>;

export function getSubsystemPhotos(): SubsystemPhotos {
  return SUBSYSTEMS.reduce((acc, sub) => {
    acc[sub.slug] = resolveSubsystemPhoto(sub.slug);
    return acc;
  }, {} as SubsystemPhotos);
}

export function verifySubsystemPhotos(): SubsystemPhotos {
  const photos = getSubsystemPhotos();

  for (const sub of SUBSYSTEMS) {
    const src = photos[sub.slug];
    const filePath = path.join(process.cwd(), "public", src.replace(/^\//, "").replace("/", path.sep));

    if (!fs.existsSync(filePath)) {
      console.warn(`[subsystem-photos] missing file for ${sub.slug}: ${src}`);
    } else {
      console.log(`[subsystem-photos] ${sub.slug} -> ${src}`);
    }
  }

  return photos;
}
