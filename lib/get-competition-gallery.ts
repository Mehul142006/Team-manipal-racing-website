import { getCompetitionGalleryMedia as getCompetitionMedia } from "./get-home-photos";

/** Reads public/photos/competition at build time. */
export function getCompetitionGalleryMedia() {
  return getCompetitionMedia();
}
