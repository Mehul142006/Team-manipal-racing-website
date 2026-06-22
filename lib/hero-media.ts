import { HOME_IMAGES } from "./images";

export const HERO_VIDEO_BASENAME = "Main_page_loop";

export const HERO_VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov"] as const;

export const HERO_VIDEO_CANDIDATES = HERO_VIDEO_EXTENSIONS.map(
  (ext) => `/videos/${HERO_VIDEO_BASENAME}${ext}`
);

/** Static image shown when the hero video cannot load. */
export const HERO_FALLBACK_IMAGE = HOME_IMAGES.competitionVehicle;

export function getVideoMimeType(src: string): string {
  if (src.endsWith(".webm")) return "video/webm";
  if (src.endsWith(".mov")) return "video/quicktime";
  return "video/mp4";
}
