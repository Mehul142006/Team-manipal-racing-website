import fs from "node:fs";
import path from "node:path";
import { getHeroVideo } from "./get-hero-video";
import { isGalleryVideoFile } from "./gallery-media";

const TESTING_DIR = path.join(process.cwd(), "public", "photos", "testing");
const VIDEOS_DIR = path.join(process.cwd(), "public", "videos");

/** Returns the best available showcase video for the homepage. */
export function getShowcaseVideo(): string | null {
  const heroVideo = getHeroVideo();
  if (heroVideo) {
    return heroVideo;
  }

  try {
    if (fs.existsSync(TESTING_DIR)) {
      const video = fs
        .readdirSync(TESTING_DIR)
        .filter((file) => !file.startsWith(".") && isGalleryVideoFile(file))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))[0];

      if (video) {
        return `/photos/testing/${encodeURIComponent(video)}`;
      }
    }

    if (fs.existsSync(VIDEOS_DIR)) {
      const video = fs
        .readdirSync(VIDEOS_DIR)
        .filter((file) => !file.startsWith(".") && isGalleryVideoFile(file))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))[0];

      if (video) {
        return `/videos/${encodeURIComponent(video)}`;
      }
    }
  } catch {
    /* ignore */
  }

  return null;
}
