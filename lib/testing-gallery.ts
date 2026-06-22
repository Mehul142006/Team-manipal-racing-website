import {
  formatGalleryTitle,
  type CategoryGalleryData,
  type GalleryImageItem,
  type GalleryVideoItem,
} from "./gallery-media";

export type TestingImageItem = GalleryImageItem;
export type TestingVideoItem = GalleryVideoItem;
export type TestingGalleryData = CategoryGalleryData;

export const formatTestingTitle = formatGalleryTitle;

/** Static manifest — kept in sync with public/photos/testing for build-time fallback. */
export const TESTING_GALLERY_MANIFEST: TestingGalleryData = {
  images: [
    {
      id: "IMG_20260419_125004904.jpg",
      type: "image",
      src: "/photos/testing/IMG_20260419_125004904.jpg",
      title: formatGalleryTitle("IMG_20260419_125004904.jpg"),
    },
  ],
  videos: [
    {
      id: "20260417_172816.mp4",
      type: "video",
      src: "/photos/testing/20260417_172816.mp4",
      title: formatGalleryTitle("20260417_172816.mp4"),
    },
    {
      id: "IMG_8999.mp4",
      type: "video",
      src: "/photos/testing/IMG_8999.mp4",
      title: formatGalleryTitle("IMG_8999.mp4"),
    },
    {
      id: "IMG_9002.MOV",
      type: "video",
      src: "/photos/testing/IMG_9002.MOV",
      title: formatGalleryTitle("IMG_9002.MOV"),
    },
    {
      id: "VID20260212170129.mp4",
      type: "video",
      src: "/photos/testing/VID20260212170129.mp4",
      title: formatGalleryTitle("VID20260212170129.mp4"),
    },
    {
      id: "VID20260417173732.mp4",
      type: "video",
      src: "/photos/testing/VID20260417173732.mp4",
      title: formatGalleryTitle("VID20260417173732.mp4"),
    },
    {
      id: "VID20260419122325.mp4",
      type: "video",
      src: "/photos/testing/VID20260419122325.mp4",
      title: formatGalleryTitle("VID20260419122325.mp4"),
    },
    {
      id: "video_20251221_090602.mp4",
      type: "video",
      src: "/photos/testing/video_20251221_090602.mp4",
      title: formatGalleryTitle("video_20251221_090602.mp4"),
    },
    {
      id: "VID_20260419_121102172.mp4",
      type: "video",
      src: "/photos/testing/VID_20260419_121102172.mp4",
      title: formatGalleryTitle("VID_20260419_121102172.mp4"),
    },
    {
      id: "VID_20260517_103035992.mp4",
      type: "video",
      src: "/photos/testing/VID_20260517_103035992.mp4",
      title: formatGalleryTitle("VID_20260517_103035992.mp4"),
    },
  ],
  stats: { photos: 1, videos: 9 },
};
