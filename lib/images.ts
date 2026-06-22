import { GALLERY_CATEGORIES } from "./data";

export type GalleryCategoryId = (typeof GALLERY_CATEGORIES)[number]["id"];

const PLACEHOLDER_GRADIENTS: Record<GalleryCategoryId, string> = {
  manufacturing: "from-steel via-navy to-midnight",
  testing: "from-midnight via-steel to-navy",
  competition: "from-navy via-accent/10 to-midnight",
};

export function getCategoryGradient(id: GalleryCategoryId) {
  return PLACEHOLDER_GRADIENTS[id];
}

/** Placeholder gallery items — replace src when images exist in public/photos/{category}/ */
export function getGalleryPlaceholders(category: GalleryCategoryId, count = 6) {
  const cat = GALLERY_CATEGORIES.find((c) => c.id === category);
  return Array.from({ length: count }, (_, i) => ({
    id: `${category}-${i + 1}`,
    title: `${cat?.label ?? category} ${i + 1}`,
    src: `${cat?.path ?? `/photos/${category}`}/photo-${i + 1}.jpg`,
    gradient: getCategoryGradient(category),
    placeholder: true,
  }));
}

export function getAllGalleryItems() {
  return GALLERY_CATEGORIES.flatMap((cat) =>
    getGalleryPlaceholders(cat.id, 4).map((item) => ({
      ...item,
      category: cat.id,
      categoryLabel: cat.label,
    }))
  );
}

export function getHomeGalleryPreview(count = 6) {
  return GALLERY_CATEGORIES.slice(0, count).map((cat, i) => ({
    id: cat.id,
    title: cat.label,
    gradient: getCategoryGradient(cat.id),
    src: `${cat.path}/cover.jpg`,
    aspect: i % 3 === 0 ? "tall" : i % 3 === 1 ? "wide" : "square",
  }));
}

export const MEMBER_PLACEHOLDER = "/photos/team/member-placeholder.jpg";

/** Homepage section image paths — auto-load from public/photos when files exist */
export const HOME_IMAGES = {
  teamCover: "/photos/team/cover.jpg",
  competitionVehicle: "/photos/competition/vehicle-showcase.jpg",
  achievementsPodium: "/photos/competition/podium.jpg",
} as const;
