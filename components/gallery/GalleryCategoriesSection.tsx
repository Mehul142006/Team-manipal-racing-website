"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { GALLERY_CATEGORIES } from "@/lib/data";
import type { CategoryGalleryData, GalleryImageItem, GalleryVideoItem } from "@/lib/gallery-media";
import { getGalleryPlaceholders, type GalleryCategoryId } from "@/lib/images";
import { GalleryLightbox, type GalleryLightboxItem, type GalleryLightboxState } from "@/components/gallery/GalleryLightbox";

type GalleryCategoriesSectionProps = {
  testingMedia: CategoryGalleryData;
  manufacturingMedia: CategoryGalleryData;
  competitionMedia: CategoryGalleryData;
};

type GalleryItem = ReturnType<typeof getGalleryPlaceholders>[number];

const DYNAMIC_CATEGORIES = new Set<GalleryCategoryId>([
  "testing",
  "manufacturing",
  "competition",
]);

function getActiveMedia(
  active: GalleryCategoryId,
  testingMedia: CategoryGalleryData,
  manufacturingMedia: CategoryGalleryData,
  competitionMedia: CategoryGalleryData
): CategoryGalleryData | null {
  if (active === "testing") return testingMedia;
  if (active === "manufacturing") return manufacturingMedia;
  if (active === "competition") return competitionMedia;
  return null;
}

type DynamicGalleryGridProps = {
  media: CategoryGalleryData;
  includeVideos: boolean;
  onOpenImage: (item: GalleryImageItem, allImages: GalleryImageItem[]) => void;
  onOpenVideo: (item: GalleryVideoItem, allVideos: GalleryVideoItem[]) => void;
};

function DynamicGalleryGrid({
  media,
  includeVideos,
  onOpenImage,
  onOpenVideo,
}: DynamicGalleryGridProps) {
  return (
    <>
      {media.images.map((item) => (
        <div key={item.id} className="mb-4 break-inside-avoid">
          <button
            type="button"
            onClick={() => onOpenImage(item, media.images)}
            className="gallery-photo-card group block w-full cursor-pointer overflow-hidden rounded-2xl border-0 bg-transparent p-0"
          >
            <img
              src={item.src}
              alt=""
              loading="lazy"
              decoding="async"
              className="block h-auto w-full border-0 object-contain outline-none transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </button>
        </div>
      ))}

      {includeVideos &&
        media.videos.map((item) => (
          <div key={item.id} className="mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={() => onOpenVideo(item, media.videos)}
              className="gallery-photo-card group relative block w-full cursor-pointer overflow-hidden rounded-2xl border-0 bg-transparent p-0"
            >
              <video
                src={`${item.src}#t=0.5`}
                muted
                playsInline
                preload="metadata"
                aria-hidden
                className="block h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full liquid-glass text-orange transition-transform duration-300 group-hover:scale-110">
                  <svg viewBox="0 0 24 24" aria-hidden className="ml-0.5 h-5 w-5 fill-current">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
            </button>
          </div>
        ))}
    </>
  );
}

export function GalleryCategoriesSection({
  testingMedia,
  manufacturingMedia,
  competitionMedia,
}: GalleryCategoriesSectionProps) {
  const [active, setActive] = useState<GalleryCategoryId>("manufacturing");
  const [lightbox, setLightbox] = useState<GalleryLightboxState | null>(null);
  const placeholderItems = getGalleryPlaceholders(active, 9);
  const activeMedia = getActiveMedia(
    active,
    testingMedia,
    manufacturingMedia,
    competitionMedia
  );
  const isDynamic = DYNAMIC_CATEGORIES.has(active);

  const openPlaceholder = (item: GalleryItem, allItems: GalleryItem[]) => {
    const items: GalleryLightboxItem[] = allItems.map((entry) => ({
      kind: "placeholder",
      title: entry.title,
      src: entry.src,
      gradient: entry.gradient,
    }));
    const index = allItems.findIndex((entry) => entry.id === item.id);
    setLightbox({ items, index: Math.max(0, index) });
  };

  const openImage = (item: GalleryImageItem, allImages: GalleryImageItem[]) => {
    const items: GalleryLightboxItem[] = allImages.map((entry) => ({ ...entry, kind: "image" as const }));
    const index = allImages.findIndex((entry) => entry.id === item.id);
    setLightbox({ items, index: Math.max(0, index) });
  };

  const openVideo = (item: GalleryVideoItem, allVideos: GalleryVideoItem[]) => {
    const items: GalleryLightboxItem[] = allVideos.map((entry) => ({ ...entry, kind: "video" as const }));
    const index = allVideos.findIndex((entry) => entry.id === item.id);
    setLightbox({ items, index: Math.max(0, index) });
  };

  const activeCategory = GALLERY_CATEGORIES.find((cat) => cat.id === active);

  return (
    <>
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap gap-2">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActive(cat.id)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all ${
                  active === cat.id
                    ? "liquid-glass liquid-glass-card border border-orange/50 text-white ring-1 ring-orange/20"
                    : "liquid-glass liquid-glass-card text-muted hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {isDynamic && activeCategory && (
            <h2 className="mb-6 text-xl font-bold text-white sm:text-2xl">{activeCategory.label}</h2>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="columns-1 gap-4 sm:columns-2 lg:columns-3"
            >
              {activeMedia ? (
                activeMedia.stats.photos + activeMedia.stats.videos > 0 ? (
                  <DynamicGalleryGrid
                    media={activeMedia}
                    includeVideos={active === "testing" || active === "competition"}
                    onOpenImage={openImage}
                    onOpenVideo={openVideo}
                  />
                ) : (
                  <p className="mb-4 text-sm text-muted">
                    No media found in <code className="text-accent">public/photos/{active}</code> yet.
                  </p>
                )
              ) : (
                placeholderItems.map((item) => (
                  <div key={item.id} className="mb-4 break-inside-avoid">
                    <button
                      type="button"
                      onClick={() => openPlaceholder(item, placeholderItems)}
                      className="group block w-full overflow-hidden rounded-2xl liquid-glass liquid-glass-card p-2"
                    >
                      <div className="relative aspect-[4/3] min-h-[200px]">
                        <PlaceholderImage
                          src={item.src}
                          alt={item.title}
                          fill
                          gradient={`bg-gradient-to-br ${item.gradient}`}
                          className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                    </button>
                  </div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <GalleryLightbox
            state={lightbox}
            onClose={() => setLightbox(null)}
            onChangeIndex={(index) => setLightbox((current) => (current ? { ...current, index } : null))}
          />
        )}
      </AnimatePresence>
    </>
  );
}
