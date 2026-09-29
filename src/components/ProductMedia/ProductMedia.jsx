import { useRef, useState } from "react";
import { FiPlay } from "react-icons/fi";

import { getImageUrl } from "../../services/api";
import { getProductMedia } from "../../utils/productMedia";

const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">
      <rect width="600" height="800" fill="#f3f4f6"/>
      <text x="300" y="410" font-family="Arial" font-size="28" fill="#9ca3af" text-anchor="middle">No image</text>
    </svg>`
  );

/**
 * Shared product-card media.
 *
 * - Shows the cover image (falls back to images[0]).
 * - If the image is missing or fails to load, falls back to the next
 *   image, then the first video (paused frame), then a placeholder.
 * - If the product has a video, it plays muted on hover and a small
 *   play badge is shown so touch users can tell there is a video.
 *
 * Render it inside a wrapper that is `relative overflow-hidden`.
 * `className` is applied to the <img>/<video> (size, object-fit, etc.).
 */
const ProductMedia = ({ product, alt, className = "", dimmed = false }) => {
  const { images, videos, video } = getProductMedia(product);

  const [imageIndex, setImageIndex] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef(null);

  const currentImage = images[imageIndex];
  const hasImage = Boolean(currentImage);
  const canUseVideo = Boolean(video) && !videoFailed;

  const dimClass = dimmed ? "grayscale opacity-60" : "";

  const playVideo = () => {
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  const stopVideo = () => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  };

  // No usable image: show the first video frame, else a placeholder.
  if (!hasImage) {
    if (canUseVideo) {
      return (
        <>
          <video
            src={`${getImageUrl(video)}#t=0.1`}
            muted
            playsInline
            loop
            preload="metadata"
            onError={() => setVideoFailed(true)}
            onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
            onMouseLeave={(e) => e.currentTarget.pause()}
            className={`${className} ${dimClass}`}
          />
          <VideoBadge count={videos.length} />
        </>
      );
    }

    return (
      <img
        src={PLACEHOLDER}
        alt={alt || product?.name || "Product"}
        className={`${className} ${dimClass}`}
      />
    );
  }

  return (
    <div
      className="relative w-full"
      onMouseEnter={canUseVideo ? playVideo : undefined}
      onMouseLeave={canUseVideo ? stopVideo : undefined}
    >
      <img
        src={getImageUrl(currentImage)}
        alt={alt || product?.name || "Product"}
        loading="lazy"
        onError={() => {
          // Try the next image; when none are left the placeholder shows.
          setImageIndex((i) => i + 1);
        }}
        className={`${className} ${dimClass}`}
      />

      {canUseVideo && (
        <>
          <video
            ref={videoRef}
            src={getImageUrl(video)}
            muted
            playsInline
            loop
            preload="none"
            onError={() => setVideoFailed(true)}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
          <VideoBadge count={videos.length} />
        </>
      )}
    </div>
  );
};

const VideoBadge = ({ count }) => (
  <span className="pointer-events-none absolute bottom-3 right-3 z-10 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-md">
    <FiPlay size={11} />
    {count > 1 ? `${count} videos` : "Video"}
  </span>
);

export default ProductMedia;
