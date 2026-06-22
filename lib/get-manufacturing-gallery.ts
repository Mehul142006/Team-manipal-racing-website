import { EMPTY_CATEGORY_GALLERY } from "./gallery-media";
import { getCategoryGalleryDir, readCategoryGallery } from "./read-category-gallery";

/** Reads public/photos/manufacturing at build time. */
export function getManufacturingGalleryMedia() {
  return readCategoryGallery(
    getCategoryGalleryDir("manufacturing"),
    "/photos/manufacturing",
    { includeVideos: false, fallback: EMPTY_CATEGORY_GALLERY }
  );
}
