// src/utils/productMedia.js
//
// Single place that decides which image / video a product card shows.
//
// Supported product formats:
// - Older products: image
// - Admin-created products: images[]
// - Admin-created products: videos[]
// - Legacy/singular video: video
//
// This helper only normalizes the media values.
// URL conversion is handled by src/services/api.js.

const clean = (list) => {
  if (!Array.isArray(list)) return [];

  return list
    .map((item) => {
      if (item === null || item === undefined) return "";

      // Support plain strings as well as simple media objects.
      if (typeof item === "object") {
        return String(
          item.url ||
          item.path ||
          item.src ||
          item.location ||
          ""
        ).trim();
      }

      return String(item).trim();
    })
    .filter(Boolean);
};

const unique = (list) => [...new Set(list)];

export function getProductMedia(product) {
  if (!product || typeof product !== "object") {
    return {
      cover: "",
      images: [],
      videos: [],
      video: "",
    };
  }

  /*
   * IMAGES
   *
   * New products:
   *   product.images = [...]
   *
   * Older products:
   *   product.image = "..."
   *
   * We keep product.image first so that an explicitly
   * selected main image remains the cover.
   */
  const images = clean([
    ...(Array.isArray(product.images) ? product.images : []),
    product.image,
  ]);

  /*
   * VIDEOS
   *
   * New products:
   *   product.videos = [...]
   *
   * Legacy/singular:
   *   product.video = "..."
   */
  const videos = clean([
    ...(Array.isArray(product.videos) ? product.videos : []),
    product.video,
  ]);

  const uniqueImages = unique(images);
  const uniqueVideos = unique(videos);

  /*
   * Main/cover image:
   *
   * 1. Explicit product.image
   * 2. First image from images[]
   * 3. Empty string if nothing exists
   */
  const cover =
    clean([product.image])[0] ||
    uniqueImages[0] ||
    "";

  return {
    cover,
    images: uniqueImages,
    videos: uniqueVideos,
    video: uniqueVideos[0] || "",
  };
}

export default getProductMedia;