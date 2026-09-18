
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
  FiImage,
  FiVideo,
  FiCheck,
} from "react-icons/fi";

import { getImageUrl } from "../../services/api";

const ProductGallery = ({ product }) => {
  const images =
    Array.isArray(product?.images) &&
    product.images.length > 0
      ? product.images
      : product?.image
        ? [product.image]
        : [];

  const videos = Array.isArray(product?.videos)
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
    setZoomOpen(false);
  }, [product?.id]);

  useEffect(() => {
    if (!zoomOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setZoomOpen(false);
      }

      if (event.key === "ArrowLeft") {
        goPrevious();
      }

      if (event.key === "ArrowRight") {
        goNext();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow = "";
    };
  }, [zoomOpen]);

  if (!media.length) {
    return (
      <div
        className="
          flex h-[500px] items-center
          justify-center rounded-[2rem]
          border border-gray-200
          bg-gradient-to-br
          from-gray-50 to-gray-100
          text-gray-400
          lg:h-[600px]
        "
      >
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
            <FiImage className="text-2xl text-gray-300" />
          </div>

          <p className="font-semibold">
            No product media available
          </p>

          <p className="mt-1 text-sm text-gray-400">
            Product images will appear here.
          </p>
        </div>
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
    Number(product?.oldPrice || 0) >
    Number(product?.price || 0)
      ? Math.round(
          ((Number(product.oldPrice) -
            Number(product.price)) /
            Number(product.oldPrice)) *
            100
        )
      : 0;

  return (
    <>
      <div className="space-y-5">
        {/* =====================================================
            MAIN MEDIA
        ===================================================== */}

        <div
          className="
            group relative overflow-hidden
            rounded-[2rem]
            border border-gray-100
            bg-gray-100
            shadow-[0_20px_60px_rgba(0,0,0,0.08)]
          "
        >
          {/* Image */}
          {selectedMedia.type === "image" ? (
            <img
              src={getImageUrl(
                selectedMedia.src
              )}
              alt={product?.name || "Product"}
              className="
                h-[500px] w-full
                object-cover
                transition-transform
                duration-700
                ease-out
                group-hover:scale-[1.025]
                sm:h-[550px]
                lg:h-[600px]
              "
            />
          ) : (
            /* Video */
            <video
              key={selectedMedia.src}
              src={getImageUrl(
                selectedMedia.src
              )}
              controls
              playsInline
              preload="metadata"
              className="
                h-[500px] w-full
                bg-black
                object-cover
                sm:h-[550px]
                lg:h-[600px]
              "
            />
          )}

          {/* =================================================
              TOP LEFT BADGES
          ================================================= */}

          <div className="absolute left-5 top-5 flex flex-wrap gap-2">
            {discount > 0 && (
              <span
                className="
                  rounded-full
                  bg-red-500
                  px-4 py-2
                  text-xs
                  font-black
                  tracking-wide
                  text-white
                  shadow-lg
                "
              >
                {discount}% OFF
              </span>
            )}

            {selectedMedia.type ===
              "video" && (
              <span
                className="
                  flex items-center gap-2
                  rounded-full
                  bg-black/70
                  px-4 py-2
                  text-xs
                  font-bold
                  text-white
                  backdrop-blur-md
                "
              >
                <FiVideo />
                Video
              </span>
            )}
          </div>

          {/* =================================================
              ZOOM BUTTON
          ================================================= */}

          {selectedMedia.type ===
            "image" && (
            <button
              type="button"
              onClick={() =>
                setZoomOpen(true)
              }
              className="
                absolute right-5 top-5
                flex h-12 w-12
                items-center justify-center
                rounded-full
                border border-white/60
                bg-white/90
                text-gray-800
                shadow-xl
                backdrop-blur-md
                transition-all
                duration-300
                hover:scale-110
                hover:bg-white
                active:scale-95
              "
              aria-label="Zoom image"
            >
              <FiZoomIn className="text-xl" />
            </button>
          )}

          {/* =================================================
              PREVIOUS / NEXT
          ================================================= */}

          {media.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrevious}
                className="
                  absolute left-4 top-1/2
                  flex h-12 w-12
                  -translate-y-1/2
                  items-center justify-center
                  rounded-full
                  border border-white/50
                  bg-white/90
                  text-gray-800
                  shadow-xl
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:-translate-x-1
                  hover:bg-white
                  active:scale-95
                  sm:left-5
                "
                aria-label="Previous media"
              >
                <FiChevronLeft className="text-xl" />
              </button>

              <button
                type="button"
                onClick={goNext}
                className="
                  absolute right-4 top-1/2
                  flex h-12 w-12
                  -translate-y-1/2
                  items-center justify-center
                  rounded-full
                  border border-white/50
                  bg-white/90
                  text-gray-800
                  shadow-xl
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:translate-x-1
                  hover:bg-white
                  active:scale-95
                  sm:right-5
                "
                aria-label="Next media"
              >
                <FiChevronRight className="text-xl" />
              </button>
            </>
          )}

          {/* =================================================
              MEDIA COUNTER
          ================================================= */}

          {media.length > 1 && (
            <div
              className="
                absolute bottom-5 left-1/2
                -translate-x-1/2
                rounded-full
                border border-white/20
                bg-black/65
                px-4 py-2
                text-xs
                font-bold
                tracking-wide
                text-white
                shadow-lg
                backdrop-blur-md
              "
            >
              {selectedIndex + 1}
              <span className="mx-1.5 text-white/40">
                /
              </span>
              {media.length}
            </div>
          )}

          {/* =================================================
              IMAGE / VIDEO LABEL
          ================================================= */}

          <div
            className="
              absolute bottom-5 left-5
              hidden items-center gap-2
              rounded-full
              bg-black/55
              px-3 py-2
              text-xs
              font-semibold
              text-white
              backdrop-blur-md
              sm:flex
            "
          >
            {selectedMedia.type ===
            "image" ? (
              <>
                <FiImage />
                Product Image
              </>
            ) : (
              <>
                <FiVideo />
                Product Video
              </>
            )}
          </div>
        </div>

        {/* =====================================================
            THUMBNAILS
        ===================================================== */}

        <div>
          <div
            className="
              mb-3 flex items-center
              justify-between
            "
          >
            <p className="text-xs font-black uppercase tracking-[2px] text-gray-400">
              Product Gallery
            </p>

            <p className="text-xs font-semibold text-gray-400">
              {media.length}{" "}
              {media.length === 1
                ? "item"
                : "items"}
            </p>
          </div>

          <div
            className="
              flex gap-3 overflow-x-auto
              pb-2 scrollbar-thin
            "
          >
            {media.map(
              (item, index) => {
                const active =
                  selectedIndex === index;

                return (
                  <button
                    key={`${item.type}-${item.src}-${index}`}
                    type="button"
                    onClick={() =>
                      setSelectedIndex(index)
                    }
                    className={`
                      group/thumb
                      relative
                      h-20 w-20
                      shrink-0
                      overflow-hidden
                      rounded-2xl
                      border-2
                      bg-gray-100
                      transition-all
                      duration-300
                      sm:h-24
                      sm:w-24
                      ${
                        active
                          ? "scale-[1.03] border-brand-primary shadow-lg shadow-brand-primary/15"
                          : "border-gray-200 hover:border-gray-400 hover:-translate-y-0.5"
                      }
                    `}
                    aria-label={`View ${
                      item.type
                    } ${index + 1}`}
                  >
                    {item.type ===
                    "image" ? (
                      <img
                        src={getImageUrl(
                          item.src
                        )}
                        alt={`${product?.name || "Product"} ${index + 1}`}
                        className="
                          h-full w-full
                          object-cover
                          transition-transform
                          duration-500
                          group-hover/thumb:scale-110
                        "
                      />
                    ) : (
                      <video
                        src={getImageUrl(
                          item.src
                        )}
                        muted
                        playsInline
                        preload="metadata"
                        className="
                          h-full w-full
                          bg-black
                          object-cover
                        "
                      />
                    )}

                    {/* Dark overlay */}
                    <span
                      className={`
                        absolute inset-0
                        bg-black/0
                        transition
                        ${
                          active
                            ? "bg-black/10"
                            : "group-hover/thumb:bg-black/10"
                        }
                      `}
                    />

                    {/* Video icon */}
                    {item.type ===
                      "video" && (
                      <span
                        className="
                          absolute inset-0
                          flex items-center
                          justify-center
                        "
                      >
                        <span
                          className="
                            flex h-9 w-9
                            items-center
                            justify-center
                            rounded-full
                            bg-black/70
                            text-white
                            shadow-lg
                            backdrop-blur-sm
                          "
                        >
                          <FiPlay className="ml-0.5 text-sm" />
                        </span>
                      </span>
                    )}

                    {/* Active check */}
                    {active && (
                      <span
                        className="
                          absolute right-1.5
                          top-1.5
                          flex h-6 w-6
                          items-center
                          justify-center
                          rounded-full
                          bg-brand-primary
                          text-white
                          shadow-md
                        "
                      >
                        <FiCheck className="text-xs" />
                      </span>
                    )}
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* =====================================================
            MEDIA INFORMATION
        ===================================================== */}

        <div className="flex flex-wrap gap-3">
          <div
            className="
              flex items-center gap-2
              rounded-2xl
              border border-gray-100
              bg-gray-50
              px-4 py-3
            "
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
              <FiImage />
            </span>

            <div>
              <p className="text-sm font-black text-gray-800">
                {images.length}
              </p>

              <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                {images.length === 1
                  ? "Image"
                  : "Images"}
              </p>
            </div>
          </div>

          {videos.length > 0 && (
            <div
              className="
                flex items-center gap-2
                rounded-2xl
                border border-gray-100
                bg-gray-50
                px-4 py-3
              "
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-900/10 text-gray-700">
                <FiVideo />
              </span>

              <div>
                <p className="text-sm font-black text-gray-800">
                  {videos.length}
                </p>

                <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                  {videos.length === 1
                    ? "Video"
                    : "Videos"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* =====================================================
            PREMIUM HIGHLIGHTS
        ===================================================== */}

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Quality */}
         

          {/* Delivery */}
          
        </div>
      </div>

      {/* =======================================================
          IMAGE ZOOM MODAL
      ======================================================= */}

      {zoomOpen &&
        selectedMedia.type ===
          "image" && (
          <div
            className="
              fixed inset-0 z-[9999]
              flex items-center
              justify-center
              bg-black/95
              p-4
              sm:p-8
            "
            onClick={() =>
              setZoomOpen(false)
            }
          >
            {/* Close */}
            <button
              type="button"
              onClick={() =>
                setZoomOpen(false)
              }
              className="
                absolute right-5 top-5
                z-20
                flex h-12 w-12
                items-center
                justify-center
                rounded-full
                bg-white
                text-gray-900
                shadow-2xl
                transition-all
                duration-300
                hover:scale-110
                hover:bg-gray-100
              "
              aria-label="Close zoom"
            >
              <FiX className="text-xl" />
            </button>

            {/* Previous */}
            {media.length > 1 && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goPrevious();
                }}
                className="
                  absolute left-4 top-1/2
                  z-20
                  flex h-12 w-12
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  bg-white/90
                  text-gray-900
                  shadow-xl
                  backdrop-blur-md
                  transition-all
                  hover:scale-110
                  sm:left-7
                "
                aria-label="Previous image"
              >
                <FiChevronLeft className="text-xl" />
              </button>
            )}

            {/* Image */}
            <div
              className="
                relative flex
                max-h-[90vh]
                max-w-6xl
                items-center
                justify-center
              "
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <img
                src={getImageUrl(
                  selectedMedia.src
                )}
                alt={
                  product?.name ||
                  "Product image"
                }
                className="
                  max-h-[90vh]
                  max-w-full
                  rounded-2xl
                  object-contain
                  shadow-2xl
                "
              />

              {/* Counter */}
              {media.length > 1 && (
                <div
                  className="
                    absolute bottom-4
                    left-1/2
                    -translate-x-1/2
                    rounded-full
                    bg-black/70
                    px-4 py-2
                    text-xs
                    font-bold
                    text-white
                    backdrop-blur-md
                  "
                >
                  {selectedIndex + 1}
                  {" / "}
                  {media.length}
                </div>
              )}
            </div>

            {/* Next */}
            {media.length > 1 && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goNext();
                }}
                className="
                  absolute right-4 top-1/2
                  z-20
                  flex h-12 w-12
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  bg-white/90
                  text-gray-900
                  shadow-xl
                  backdrop-blur-md
                  transition-all
                  hover:scale-110
                  sm:right-7
                "
                aria-label="Next image"
              >
                <FiChevronRight className="text-xl" />
              </button>
            )}
          </div>
        )}
    </>
  );
};

export default ProductGallery;