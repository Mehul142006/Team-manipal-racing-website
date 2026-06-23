"use client";

import type { GalleryImageItem, GalleryVideoItem } from "@/lib/gallery-media";
import { useMobileGalleryViewport } from "@/hooks/useMobileGalleryViewport";
import { DesktopGalleryLightbox } from "@/components/gallery/DesktopGalleryLightbox";
import { MobileGalleryLightbox } from "@/components/gallery/MobileGalleryLightbox";

type PlaceholderLightboxItem = {
  kind: "placeholder";
  title: string;
  src: string;
  gradient: string;
};

export type GalleryLightboxItem =
  | PlaceholderLightboxItem
  | (GalleryImageItem & { kind: "image" })
  | (GalleryVideoItem & { kind: "video" });

export type GalleryLightboxState = {
  items: GalleryLightboxItem[];
  index: number;
};

type GalleryLightboxProps = {
  state: GalleryLightboxState;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
};

export function GalleryLightbox(props: GalleryLightboxProps) {
  const isMobileGallery = useMobileGalleryViewport();

  if (isMobileGallery) {
    return <MobileGalleryLightbox {...props} />;
  }

  return <DesktopGalleryLightbox {...props} />;
}
