import fs from "fs";
import path from "path";
import { HERO_VIDEO_BASENAME, HERO_VIDEO_EXTENSIONS } from "./hero-media";

const HERO_VIDEO_DIR = path.join(process.cwd(), "public", "videos");

function isHeroVideoFile(filename: string): boolean {
  const lower = filename.toLowerCase();
  const base = HERO_VIDEO_BASENAME.toLowerCase();

  return HERO_VIDEO_EXTENSIONS.some((ext) => lower === `${base}${ext}`);
}

/** Returns hero video URL when a Main_page_loop video exists in public/videos at build time. */
export function getHeroVideo(): string | null {
  try {
    if (!fs.existsSync(HERO_VIDEO_DIR)) {
      return null;
    }

    const match = fs
      .readdirSync(HERO_VIDEO_DIR)
      .find((filename) => isHeroVideoFile(filename));

    if (match) {
      return `/videos/${match}`;
    }
  } catch {
    /* ignore — fall back to hero image */
  }
  return null;
}
