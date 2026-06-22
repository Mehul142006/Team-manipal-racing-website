import {
  TESTING_GALLERY_MANIFEST,
  type TestingGalleryData,
} from "./testing-gallery";
import { getCategoryGalleryDir, readCategoryGallery } from "./read-category-gallery";

/** Reads public/photos/testing at build time. Falls back to manifest if the folder is unavailable. */
export function getTestingGalleryMedia(): TestingGalleryData {
  return readCategoryGallery(
    getCategoryGalleryDir("testing"),
    "/photos/testing",
    { fallback: TESTING_GALLERY_MANIFEST }
  );
}
