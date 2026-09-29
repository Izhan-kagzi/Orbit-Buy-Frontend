import { useEffect, useRef, useState } from "react";
import { FiPlay } from "react-icons/fi";

import {
  getImageUrl,
  getVideoUrl,
} from "../../services/api";

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
 * Supports:
 * - Product images
 * - Product videos
 * - Multiple images
 * - Multiple videos
 * - Absolute media URLs
 * - /uploads/products/... URLs
 * - Broken image fallback
 * - Broken video fallback
 * - Video hover playback
 */
const ProductMedia = ({
  product,
  alt,
  className = "",
  dimmed = false,
}) => {
  const {
    images = [],
    videos = [],
    video = null,
  } = getProductMedia(product) || {};

  const [imageIndex, setImageIndex] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const videoRef = useRef(null);

  /*
   * Reset media state when a different product is rendered.
   */
  useEffect(() => {
    setImageIndex(0);
    setImageFailed(false);
    setVideoFailed(false);
    setVideoPlaying(false);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [product?._id, product?.id]);

  /*
   * Make sure imageIndex never points outside the images array.
   */
  useEffect(() => {
    if (
      images.length > 0 &&
      imageIndex >= images.length
    ) {
      setImageIndex(0);
      setImageFailed(false);
    }
  }, [images.length, imageIndex]);

  /*
   * Normalize arrays and remove empty values.
   */
  const validImages = Array.isArray(images)
    ? images.filter(Boolean)
    : [];

  const validVideos = Array.isArray(videos)
    ? videos.filter(Boolean)
    : [];

  /*
   * Some products may have a legacy single `video`
   * field instead of the videos array.
   */
  const activeVideo =
    video ||
    validVideos[0] ||
    null;

  const currentImage =
    validImages[imageIndex] || null;

  const hasImage =
    Boolean(currentImage) &&
    !imageFailed;

  const hasVideo =
    Boolean(activeVideo) &&
    !videoFailed;

  const dimClass = dimmed
    ? "grayscale opacity-60"
    : "";

  /*
   * ---------------------------------------------------------
   * VIDEO PLAY
   * ---------------------------------------------------------
   */
  const playVideo = async () => {
    const el = videoRef.current;

    if (!el || !hasVideo) {
      return;
    }

    try {
      el.currentTime = 0;

      await el.play();

      setVideoPlaying(true);
    } catch {
      /*
       * Autoplay can be blocked by the browser.
       * The image remains visible.
       */
      setVideoPlaying(false);
    }
  };

  /*
   * ---------------------------------------------------------
   * VIDEO STOP
   * ---------------------------------------------------------
   */
  const stopVideo = () => {
    const el = videoRef.current;

    if (!el) {
      return;
    }

    el.pause();

    try {
      el.currentTime = 0;
    } catch {
      // Ignore media reset errors.
    }

    setVideoPlaying(false);
  };

  /*
   * ---------------------------------------------------------
   * IMAGE ERROR
   * ---------------------------------------------------------
   *
   * Try the next available image.
   */
  const handleImageError = () => {
    if (
      imageIndex <
      validImages.length - 1
    ) {
      setImageIndex(
        (index) => index + 1
      );

      return;
    }

    /*
     * All images failed.
     * Allow the video/placeholder fallback.
     */
    setImageFailed(true);
  };

  /*
   * ---------------------------------------------------------
   * VIDEO ERROR
   * ---------------------------------------------------------
   */
  const handleVideoError = () => {
    setVideoFailed(true);
    setVideoPlaying(false);
  };

  /*
   * ---------------------------------------------------------
   * NO IMAGE
   * ---------------------------------------------------------
   *
   * If every image failed, show video if available.
   */
  if (!hasImage) {
    if (hasVideo) {
      return (
        <div
          className={`relative h-full w-full ${className} ${dimClass}`}
        >
          <video
            ref={videoRef}
            src={`${getVideoUrl(
              activeVideo
            )}#t=0.1`}
            muted
            playsInline
            loop
            preload="metadata"
            onError={handleVideoError}
            onMouseEnter={playVideo}
            onMouseLeave={stopVideo}
            className="h-full w-full object-cover"
          />

          <VideoBadge
            count={validVideos.length}
          />
        </div>
      );
    }

    /*
     * Final fallback.
     */
    return (
      <img
        src={PLACEHOLDER}
        alt={
          alt ||
          product?.name ||
          "Product"
        }
        className={`${className} ${dimClass}`}
      />
    );
  }

  /*
   * ---------------------------------------------------------
   * NORMAL PRODUCT IMAGE + VIDEO
   * ---------------------------------------------------------
   */

  return (
    <div
      className="group relative w-full h-full overflow-hidden"
      onMouseEnter={
        hasVideo
          ? playVideo
          : undefined
      }
      onMouseLeave={
        hasVideo
          ? stopVideo
          : undefined
      }
    >
      {/* ---------------------------------------------------
          PRODUCT IMAGE
      --------------------------------------------------- */}

      <img
        src={getImageUrl(currentImage)}
        alt={
          alt ||
          product?.name ||
          "Product"
        }
        loading="lazy"
        decoding="async"
        onError={handleImageError}
        className={`${className} ${dimClass}`}
      />

      {/* ---------------------------------------------------
          PRODUCT VIDEO
      --------------------------------------------------- */}

      {hasVideo && (
        <>
          <video
            ref={videoRef}
            src={getVideoUrl(activeVideo)}
            muted
            playsInline
            loop
            preload="metadata"
            onError={handleVideoError}
            className={`
              pointer-events-none
              absolute
              inset-0
              h-full
              w-full
              object-cover
              transition-opacity
              duration-300
              ${
                videoPlaying
                  ? "opacity-100"
                  : "opacity-0"
              }
            `}
          />

          <VideoBadge
            count={validVideos.length}
          />
        </>
      )}
    </div>
  );
};

/*
============================================================
VIDEO BADGE
============================================================
*/

const VideoBadge = ({ count }) => (
  <span className="pointer-events-none absolute bottom-3 right-3 z-20 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-md">
    <FiPlay size={11} />

    {count > 1
      ? `${count} videos`
      : "Video"}
  </span>
);

export default ProductMedia;