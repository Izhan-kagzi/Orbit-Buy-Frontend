import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Pause,
  Play,
} from "lucide-react";

import men_banner from "../assets/featured/men_banner.png";

// Import your men's fashion videos here.
// Change the paths if your videos are stored in another folder.
//
// import menVideo1 from "../assets/featured/men-video-1.mp4";
// import menVideo2 from "../assets/featured/men-video-2.mp4";

const slides = [
  {
    type: "image",
    src: men_banner,
    eyebrow: "ORBIT BUY · MEN'S COLLECTION",
    title: "Refined",
    accent: "Men's Fashion",
    description:
      "Discover premium shirts, T-shirts, jeans and more, designed for a modern wardrobe.",
  },

  // Example video slide:
  // {
  //   type: "video",
  //   src: menVideo1,
  //   eyebrow: "NEW SEASON",
  //   title: "Modern",
  //   accent: "Essentials",
  //   description:
  //     "Elevate your everyday style with contemporary men's fashion.",
  // },

  // Example second video slide:
  // {
  //   type: "video",
  //   src: menVideo2,
  //   eyebrow: "ORBIT BUY · MEN",
  //   title: "Made For",
  //   accent: "Every Occasion",
  //   description:
  //     "From effortless everyday looks to sophisticated statement pieces.",
  // },
];

const AUTOPLAY_DELAY = 6000;

const MensWearBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const videoRefs = useRef([]);

  const activeSlide = slides[activeIndex];

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  const previousSlide = () => {
    setActiveIndex(
      (current) => (current - 1 + slides.length) % slides.length
    );
  };

  // ------------------------------------------------------------
  // AUTOPLAY
  // ------------------------------------------------------------

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_DELAY);

    return () => clearInterval(timer);
  }, [activeIndex, isPaused]);

  // ------------------------------------------------------------
  // VIDEO CONTROL
  // ------------------------------------------------------------

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeIndex && !isPaused) {
        video.currentTime = 0;

        const playPromise = video.play();

        if (playPromise?.catch) {
          playPromise.catch(() => {
            // Browser may block autoplay.
          });
        }
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeIndex, isPaused]);

  // ------------------------------------------------------------
  // KEYBOARD NAVIGATION
  // ------------------------------------------------------------

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        nextSlide();
      }

      if (event.key === "ArrowLeft") {
        previousSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <section className="w-full px-3 sm:px-5 lg:px-8">
      <div
        className="
          group relative mx-auto w-full overflow-hidden
          rounded-[24px]
          bg-neutral-100
          shadow-[0_25px_80px_rgba(0,0,0,0.12)]
          sm:rounded-[30px]
          lg:rounded-[38px]
        "
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* =====================================================
            SLIDER
        ===================================================== */}

        <div
          className="
            relative aspect-[4/5] min-h-[520px]
            w-full
            sm:aspect-[16/9] sm:min-h-[500px]
            lg:min-h-[580px]
          "
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="absolute inset-0"
            >
              {activeSlide.type === "video" ? (
                <video
                  ref={(element) => {
                    videoRefs.current[activeIndex] = element;
                  }}
                  src={activeSlide.src}
                  className="
                    h-full w-full object-cover
                    transition-transform duration-[7000ms]
                    ease-out
                    group-hover:scale-[1.025]
                  "
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : (
                <img
                  src={activeSlide.src}
                  alt="Men's Wear"
                  className="
                    h-full w-full object-cover
                    transition-transform duration-[7000ms]
                    ease-out
                    group-hover:scale-[1.025]
                  "
                  loading={activeIndex === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* =====================================================
              CINEMATIC OVERLAYS
          ===================================================== */}

          <div
            className="
              pointer-events-none absolute inset-0
              bg-gradient-to-r
              from-black/60
              via-black/25
              to-transparent
            "
          />

          <div
            className="
              pointer-events-none absolute inset-x-0 bottom-0
              h-[55%]
              bg-gradient-to-t
              from-black/55
              via-black/15
              to-transparent
            "
          />

          {/* =====================================================
              CONTENT
          ===================================================== */}

          <div className="absolute inset-0 flex items-end">
            <div className="w-full p-6 sm:p-9 lg:p-12 xl:p-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${activeIndex}`}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -15,
                  }}
                  transition={{
                    duration: 0.65,
                    ease: "easeOut",
                  }}
                  className="max-w-2xl text-white"
                >
                  {/* Eyebrow */}
                  <p
                    className="
                      mb-3
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.38em]
                      text-white/75
                      sm:text-[11px]
                    "
                  >
                    {activeSlide.eyebrow}
                  </p>

                  {/* Heading */}
                  <h2
                    className="
                      font-serif
                      text-[2.2rem]
                      font-medium
                      leading-[0.95]
                      tracking-[-0.03em]
                      sm:text-5xl
                      lg:text-6xl
                      xl:text-7xl
                    "
                  >
                    {activeSlide.title}

                    <span className="mt-1 block font-light italic">
                      {activeSlide.accent}
                    </span>
                  </h2>

                  {/* Description */}
                  <p
                    className="
                      mt-4
                      max-w-lg
                      text-xs
                      leading-relaxed
                      text-white/80
                      sm:mt-5
                      sm:text-sm
                      lg:text-base
                    "
                  >
                    {activeSlide.description}
                  </p>

                  {/* CTA */}
                  <Link
                    to="/search?q=men"
                    aria-label="Explore Men's Collection"
                    className="
                      mt-5 inline-flex items-center gap-3
                      rounded-full
                      border border-white/30
                      bg-white/10
                      px-4 py-2.5
                      text-xs font-medium
                      backdrop-blur-xl
                      transition-all duration-300
                      hover:border-white
                      hover:bg-white
                      hover:text-[#09335A]
                      sm:mt-7
                      sm:px-5 sm:py-3
                      sm:text-sm
                    "
                  >
                    <span>Explore Collection</span>

                    <span
                      className="
                        flex h-7 w-7 items-center justify-center
                        rounded-full
                        bg-white
                        text-[#09335A]
                        transition-transform duration-300
                        group-hover:rotate-45
                      "
                    >
                      <ArrowUpRight
                        size={15}
                        strokeWidth={2}
                      />
                    </span>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* =====================================================
              TOP RIGHT CONTROLS
          ===================================================== */}

          {slides.length > 1 && (
            <div
              className="
                absolute right-4 top-4
                flex items-center gap-2
                sm:right-6 sm:top-6
              "
            >
              <button
                type="button"
                onClick={() => setIsPaused((current) => !current)}
                aria-label={isPaused ? "Play slider" : "Pause slider"}
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-full
                  border border-white/25
                  bg-black/20
                  text-white
                  backdrop-blur-xl
                  transition-all duration-300
                  hover:bg-white
                  hover:text-[#09335A]
                  sm:h-10 sm:w-10
                "
              >
                {isPaused ? (
                  <Play
                    size={14}
                    fill="currentColor"
                  />
                ) : (
                  <Pause size={14} />
                )}
              </button>

              <div
                className="
                  rounded-full
                  border border-white/20
                  bg-black/20
                  px-3 py-2
                  text-[10px]
                  font-medium
                  tracking-[0.15em]
                  text-white
                  backdrop-blur-xl
                "
              >
                {String(activeIndex + 1).padStart(2, "0")}
                <span className="mx-1 text-white/40">
                  /
                </span>
                {String(slides.length).padStart(2, "0")}
              </div>
            </div>
          )}

          {/* =====================================================
              NAVIGATION
          ===================================================== */}

          {slides.length > 1 && (
            <div
              className="
                absolute bottom-6 right-5
                hidden items-center gap-2
                sm:flex
                lg:bottom-8 lg:right-8
              "
            >
              <button
                type="button"
                onClick={previousSlide}
                aria-label="Previous slide"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full
                  border border-white/25
                  bg-black/20
                  text-white
                  backdrop-blur-xl
                  transition-all duration-300
                  hover:bg-white
                  hover:text-[#09335A]
                "
              >
                <ArrowLeft size={17} />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full
                  border border-white/25
                  bg-black/20
                  text-white
                  backdrop-blur-xl
                  transition-all duration-300
                  hover:bg-white
                  hover:text-[#09335A]
                "
              >
                <ArrowRight size={17} />
              </button>
            </div>
          )}

          {/* =====================================================
              PAGINATION
          ===================================================== */}

          {slides.length > 1 && (
            <div
              className="
                absolute bottom-5 left-1/2
                flex -translate-x-1/2
                items-center gap-2
                sm:bottom-7
              "
            >
              {slides.map((slide, index) => (
                <button
                  key={`${slide.type}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className="group/dot flex h-5 items-center"
                >
                  <span
                    className={`
                      block h-1 rounded-full
                      transition-all duration-500
                      ${
                        activeIndex === index
                          ? "w-8 bg-white"
                          : "w-2 bg-white/45 group-hover/dot:bg-white/75"
                      }
                    `}
                  />
                </button>
              ))}
            </div>
          )}

          {/* =====================================================
              DECORATIVE DETAIL
          ===================================================== */}

          <div
            className="
              pointer-events-none absolute
              right-6 top-20
              hidden h-16 w-16
              rounded-full
              border border-white/20
              sm:block
              lg:right-10 lg:top-24
              lg:h-20 lg:w-20
            "
          />

          {/* Shine */}
          <div
            className="
              pointer-events-none absolute inset-y-0
              -left-1/3 w-1/4
              skew-x-[-18deg]
              bg-gradient-to-r
              from-transparent
              via-white/10
              to-transparent
              opacity-0
              transition-all duration-[1200ms]
              group-hover:left-[120%]
              group-hover:opacity-100
            "
          />
        </div>
      </div>
    </section>
  );
};

export default MensWearBanner;
