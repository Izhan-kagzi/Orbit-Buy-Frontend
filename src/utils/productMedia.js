// Single place that decides which image / video a product card shows.
// Older products only have `image`; admin-created products have
// `images[]` and `videos[]`. `image` can also be null or stale after
// an edit, so every card must go through this helper instead of
// reading `product.image` directly.

const clean = (list) =>
  (Array.isArray(list) ? list : [])
    .map((item) => (item ? String(item).trim() : ""))
    .filter(Boolean);

export function getProductMedia(product) {
  const images = clean([
    ...(Array.isArray(product?.images) ? product.images : []),
    product?.image,
  ]);

  const videos = clean([
    ...(Array.isArray(product?.videos) ? product.videos : []),
    product?.video,
  ]);

  const uniqueImages = [...new Set(images)];
  const uniqueVideos = [...new Set(videos)];

  return {
    // Prefer the explicit main image, then the first gallery image.
    cover: clean([product?.image])[0] || uniqueImages[0] || "",
    images: uniqueImages,
    videos: uniqueVideos,
    video: uniqueVideos[0] || "",
  };
}
