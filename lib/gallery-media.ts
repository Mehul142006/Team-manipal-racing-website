export type GalleryImageItem = {
  id: string;
  type: "image";
  src: string;
  title: string;
};

export type GalleryVideoItem = {
  id: string;
  type: "video";
  src: string;
  title: string;
};

export type CategoryGalleryData = {
  images: GalleryImageItem[];
  videos: GalleryVideoItem[];
  stats: { photos: number; videos: number };
};

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
  ".heic",
  ".heif",
]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".mov", ".webm", ".m4v"]);

export function formatGalleryTitle(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, "");
  return base.replace(/[_-]+/g, " ").trim();
}

export function isGalleryImageFile(filename: string): boolean {
  const ext = filename.slice(filename.lastIndexOf(".")).toLowerCase();
  return IMAGE_EXTENSIONS.has(ext);
}

export function isGalleryVideoFile(filename: string): boolean {
  const ext = filename.slice(filename.lastIndexOf(".")).toLowerCase();
  return VIDEO_EXTENSIONS.has(ext);
}

export const EMPTY_CATEGORY_GALLERY: CategoryGalleryData = {
  images: [],
  videos: [],
  stats: { photos: 0, videos: 0 },
};
