import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FiZoomIn,
  FiPlay,
  FiChevronLeft,
  FiChevronRight,
  FiX,
} from "react-icons/fi";

import { getImageUrl } from "../../services/api";

const ProductGallery = ({ product }) => {
  const images =
    Array.isArray(product.images) &&
    product.images.length > 0
      ? product.images
      : product.image
        ? [product.image]
        : [];

  const videos =
    Array.isArray(product.videos)
      ? product.videos
      : [];

  const media = useMemo(
    () => [
      ...images.map((src) => ({
        type: "image",
        src,
      })),

      ...videos.map((src) => ({
        type: "video",
        src,
      })),
    ],
    [images, videos]
  );

  const [selectedIndex, setSelectedIndex] =
    useState(0);

  const [zoomOpen, setZoomOpen] =
    useState(false);

  useEffect(() => {
    setSelectedIndex(0);
  }, [product?.id]);

  if (!media.length) {
    return (
      <div className="rounded-3xl bg-gray-100 h-[600px] flex items-center justify-center text-gray-400">
        No product media available.
      </div>
    );
  }

  const selectedMedia =
    media[selectedIndex] || media[0];

  const goPrevious = () => {
    setSelectedIndex(
      (prev) =>
        (prev - 1 + media.length) %
        media.length
    );
  };

  const goNext = () => {
    setSelectedIndex(
      (prev) =>
        (prev + 1) % media.length
    );
  };

  const discount =
    product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) /
            product.oldPrice) *
            100
        )
      : 0;

  return (
    <>
      <div className="space-y-5">
        {/* Main media */}
        <div className="group relative overflow-hidden rounded-3xl bg-gray-100">
          {selectedMedia.type === "image" ? (
            <img
              src={getImageUrl(selectedMedia.src)}
              alt={product.name}
              className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
          ) : (
            <video
              key={selectedMedia.src}
              src={getImageUrl(selectedMedia.src)}
              controls
              playsInline
              preload="metadata"
              className="w-full h-[600px] object-cover bg-black"
            />
          )}

          {selectedMedia.type === "image" && (
            <button
              type="button"
              onClick={() => setZoomOpen(true)}
              className="absolute right-5 top-5 w-12 h-12 rounded-full bg-white/95 shadow-lg flex items-center justify-center hover:scale-105 transition"
              aria-label="Zoom image"
            >
              <FiZoomIn className="text-xl" />
            </button>
          )}

          {discount > 0 && (
            <div className="absolute left-5 top-5 bg-red-500 text-white px-4 py-2 rounded-full font-semibold text-sm">
              {discount}% OFF
            </div>
          )}

          {media.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:scale-105 transition"
                aria-label="Previous media"
              >
                <FiChevronLeft />
              </button>

              <button
                type="button"
                onClick={goNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:scale-105 transition"
                aria-label="Next media"
              >
                <FiChevronRight />
              </button>
            </>
          )}

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-4 py-2 rounded-full">
            {selectedIndex + 1} / {media.length}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
          {media.map((item, index) => (
            <button
              key={`${item.type}-${item.src}-${index}`}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`relative aspect-square overflow-hidden rounded-xl border-2 transition ${
                selectedIndex === index
                  ? "border-brand-primary"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              {item.type === "image" ? (
                <img
                  src={getImageUrl(item.src)}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={getImageUrl(item.src)}
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover bg-black"
                />
              )}

              {item.type === "video" && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center">
                    <FiPlay className="ml-0.5" />
                  </span>
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Media information */}
        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
          <span className="px-4 py-2 rounded-full bg-gray-100">
            {images.length}{" "}
            {images.length === 1
              ? "Image"
              : "Images"}
          </span>

          {videos.length > 0 && (
            <span className="px-4 py-2 rounded-full bg-gray-100">
              {videos.length}{" "}
              {videos.length === 1
                ? "Video"
                : "Videos"}
            </span>
          )}
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-gray-50 p-5 text-center">
            <h4 className="font-bold text-lg">
              Premium Quality
            </h4>

            <p className="text-gray-500 mt-2 text-sm">
              Carefully crafted using premium materials.
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-5 text-center">
            <h4 className="font-bold text-lg">
              Fast Delivery
            </h4>

            <p className="text-gray-500 mt-2 text-sm">
              Delivered across India with secure packaging.
            </p>
          </div>
        </div>
      </div>

      {/* Image zoom */}
      {zoomOpen &&
        selectedMedia.type === "image" && (
          <div
            className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-5"
            onClick={() => setZoomOpen(false)}
          >
            <button
              type="button"
              onClick={() => setZoomOpen(false)}
              className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center"
              aria-label="Close zoom"
            >
              <FiX />
            </button>

            <img
              src={getImageUrl(selectedMedia.src)}
              alt={product.name}
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
    </>
  );
};

export default ProductGallery;