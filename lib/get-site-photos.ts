import fs from "node:fs";
import path from "node:path";
import { isGalleryImageFile } from "./gallery-media";

const PHOTO_DIR = path.join(process.cwd(), "public", "photo");
const PHOTOS_DIR = path.join(process.cwd(), "public", "photos");
const IMAGE_EXTENSIONS = [".jpeg", ".jpg", ".png", ".webp", ".avif", ".gif"] as const;

const SEARCH_DIRS = [
  { dir: PHOTO_DIR, urlPrefix: "/photo" },
  { dir: PHOTOS_DIR, urlPrefix: "/photos" },
] as const;

function findImageInDirectory(dir: string, urlPrefix: string): string | null {
  try {
    if (!fs.existsSync(dir)) return null;

    const match = fs
      .readdirSync(dir)
      .filter((file) => !file.startsWith(".") && isGalleryImageFile(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))[0];

    if (match) {
      return `${urlPrefix}/${encodeURIComponent(match)}`;
    }
  } catch {
    /* ignore */
  }

  return null;
}

function resolveBasenameInDir(dir: string, urlPrefix: string, basename: string): string | null {
  try {
    if (!fs.existsSync(dir)) return null;

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

    const directPath = path.join(dir, basename);
    if (fs.existsSync(directPath)) {
      const stat = fs.statSync(directPath);
      if (stat.isDirectory()) {
        return findImageInDirectory(directPath, `${urlPrefix}/${encodeURIComponent(basename)}`);
      }
      if (isGalleryImageFile(basename)) {
        return `${urlPrefix}/${encodeURIComponent(basename)}`;
      }
    }

    const caseInsensitive = fs
      .readdirSync(dir)
      .find((file) => file.toLowerCase() === basename.toLowerCase());

    if (caseInsensitive) {
      const matchPath = path.join(dir, caseInsensitive);
      if (fs.statSync(matchPath).isDirectory()) {
        return findImageInDirectory(
          matchPath,
          `${urlPrefix}/${encodeURIComponent(caseInsensitive)}`
        );
      }
      return `${urlPrefix}/${encodeURIComponent(caseInsensitive)}`;
    }
  } catch {
    /* ignore */
  }

  return null;
}

/** Resolves a basename under public/photo first, then public/photos. */
export function resolveSitePhoto(basename: string): string {
  for (const { dir, urlPrefix } of SEARCH_DIRS) {
    const resolved = resolveBasenameInDir(dir, urlPrefix, basename);
    if (resolved) {
      return resolved;
    }
  }

  return `/photo/${basename}`;
}

export type SitePhotos = {
  structures: string;
  vehicleHero: string;
  vehicleOverview: string;
  competitionReady: string;
};

export const SITE_PHOTO_BASENAMES = {
  structures: "Structures",
  vehicleHero: "Vehicle_ovr",
  vehicleOverview: "Vehicle_Ov",
  competitionReady: "Comp_ready",
} as const;

export function getSitePhotos(): SitePhotos {
  return {
    structures: resolveSitePhoto(SITE_PHOTO_BASENAMES.structures),
    vehicleHero: resolveSitePhoto(SITE_PHOTO_BASENAMES.vehicleHero),
    vehicleOverview: resolveSitePhoto(SITE_PHOTO_BASENAMES.vehicleOverview),
    competitionReady: resolveSitePhoto(SITE_PHOTO_BASENAMES.competitionReady),
  };
}

/** Logs resolved site photo paths — for build/dev verification. */
export function verifySitePhotos(): SitePhotos {
  const photos = getSitePhotos();
  const required = Object.entries(SITE_PHOTO_BASENAMES) as [keyof SitePhotos, string][];

  for (const [key, basename] of required) {
    const src = photos[key];
    const filePath = path.join(process.cwd(), "public", src.replace(/^\//, "").replace("/", path.sep));

    if (!fs.existsSync(filePath)) {
      throw new Error(`Site photo missing: ${basename} (expected at public${src})`);
    }

    console.log(`[site-photos] ${basename} -> ${src}`);
  }

  return photos;
}

export const EV_PHOTO_IDS = ["EV1", "EV2", "EV3", "EV4", "EV5", "EV6"] as const;
export type EvPhotoId = (typeof EV_PHOTO_IDS)[number];

export type EvPhotos = Record<EvPhotoId, string>;

export function getEvPhotos(): EvPhotos {
  return {
    EV1: resolveSitePhoto("EV1"),
    EV2: resolveSitePhoto("EV2"),
    EV3: resolveSitePhoto("EV3"),
    EV4: resolveSitePhoto("EV4"),
    EV5: resolveSitePhoto("EV5"),
    EV6: resolveSitePhoto("EV6"),
  };
}

export function verifyEvPhotos(): EvPhotos {
  const photos = getEvPhotos();

  for (const id of EV_PHOTO_IDS) {
    const src = photos[id];
    const filePath = path.join(process.cwd(), "public", src.replace(/^\//, "").replace("/", path.sep));

    if (!fs.existsSync(filePath)) {
      throw new Error(`EV photo missing: ${id} (expected at public${src})`);
    }

    console.log(`[ev-photos] ${id} -> ${src}`);
  }

  return photos;
}
