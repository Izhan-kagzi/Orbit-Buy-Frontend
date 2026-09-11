import { useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  Autoplay,
  Pagination,
  Navigation,
  EffectFade,
} from "swiper/modules";

import { FiChevronDown } from "react-icons/fi";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import heroData from "./heroData";

const Hero = () => {
  /*
  ============================================================
  PLAY ACTIVE VIDEO
  ============================================================
  */

  const playActiveVideo = useCallback((swiper) => {
    if (!swiper || !swiper.slides) return;

    // Get the ACTUAL active slide.
    // This works correctly even when loop=true creates cloned slides.
    const activeSlide = swiper.slides[swiper.activeIndex];

    if (!activeSlide) return;

    // Pause all videos inside all Swiper slides
    swiper.slides.forEach((slide) => {
      const video = slide.querySelector("video");

      if (!video) return;

      if (!slide.classList.contains("swiper-slide-active")) {
        video.pause();
      }
    });

    // Find video inside active slide
    const activeVideo = activeSlide.querySelector("video");

    if (!activeVideo) return;

    /*
      IMPORTANT:
      Do NOT call activeVideo.load() here.

      Calling load() repeatedly can cause:
      - video splash
      - black flash
      - video restarting
      - double playback
    */

    activeVideo.muted = true;
    activeVideo.playsInline = true;

    const playPromise = activeVideo.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay can occasionally be delayed by the browser.
        // No forced reload is performed.
      });
    }
  }, []);

  /*
  ============================================================
  SLIDE TRANSITION START
  ============================================================
  */

  const handleTransitionStart = useCallback((swiper) => {
    if (!swiper || !swiper.slides) return;

    // Pause videos while the fade transition is happening.
    swiper.slides.forEach((slide) => {
      const video = slide.querySelector("video");

      if (video) {
        video.pause();
      }
    });
  }, []);

  /*
  ============================================================
  SLIDE TRANSITION END
  ============================================================
  */

  const handleTransitionEnd = useCallback(
    (swiper) => {
      // Start ONLY the video belonging to the final active slide.
      playActiveVideo(swiper);
    },
    [playActiveVideo]
  );

  /*
  ============================================================
  SWIPER INITIALIZATION
  ============================================================
  */

  const handleSwiperInit = useCallback(
    (swiper) => {
      // Allow Swiper to finish mounting before starting video.
      requestAnimationFrame(() => {
        playActiveVideo(swiper);
      });
    },
    [playActiveVideo]
  );

  /*
  ============================================================
  VIDEO ERROR
  ============================================================
  */

  const handleVideoError = (event, videoPath) => {
    console.error(
      "Orbit Buy Hero Video Error:",
      videoPath,
      event.currentTarget.error
    );
  };

  return (
    <section
      className="
        relative
        w-full
        h-[85vh]
        lg:h-[90vh]
        min-h-[725px]
        max-h-[975px]
        overflow-hidden
        pt-20
        lg:pt-24
        bg-brand-dark
      "
    >
      <Swiper
        modules={[
          Autoplay,
          Pagination,
          Navigation,
          EffectFade,
        ]}

        /*
        ========================================================
        SWIPER EFFECT
        ========================================================
        */

        effect="fade"

        fadeEffect={{
          crossFade: true,
        }}

        speed={1000}

        /*
        ========================================================
        AUTOPLAY
        ========================================================
        */

        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}

        /*
        ========================================================
        CONTROLS
        ========================================================
        */

        pagination={{
          clickable: true,
        }}

        navigation={true}

        /*
        ========================================================
        LOOP
        ========================================================
        */

        loop={true}

        /*
        ========================================================
        PERFORMANCE
        ========================================================
        */

        watchSlidesProgress={true}
        observer={true}
        observeParents={true}

        className="w-full h-full"

        /*
        ========================================================
        EVENTS

        IMPORTANT:
        We no longer use onSlideChange + onSlideChangeTransitionEnd
        together to start the same video.

        This prevents the double splash.
        ========================================================
        */

        onSwiper={handleSwiperInit}
        onSlideChangeTransitionStart={handleTransitionStart}
        onSlideChangeTransitionEnd={handleTransitionEnd}
      >
        {heroData.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full overflow-hidden">

              {/* =====================================================
                  BACKGROUND MEDIA
              ===================================================== */}

              {slide.type === "video" ? (
                <video
                  className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    object-cover
                    object-center
                  "
                  muted
                  autoPlay={index === 0}
                  loop
                  playsInline
                  webkit-playsinline="true"
                  preload={index === 0 ? "auto" : "metadata"}
                  controls={false}
                  disablePictureInPicture
                  onError={(event) =>
                    handleVideoError(event, slide.media)
                  }
                >
                  <source
                    src={slide.media}
                    type="video/mp4"
                  />
                </video>
              ) : (
                <img
                  src={slide.media}
                  alt={
                    slide.title ||
                    "Orbit Buy premium fashion collection"
                  }
                  fetchPriority={
                    index === 0 ? "high" : "auto"
                  }
                  loading={
                    index === 0 ? "eager" : "lazy"
                  }
                  decoding={
                    index === 0 ? "sync" : "async"
                  }
                  className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    object-cover
                    object-center
                  "
                />
              )}

              {/* =====================================================
                  DARK GRADIENT OVERLAY
              ===================================================== */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-r
                  from-brand-dark/75
                  via-brand-primary/40
                  to-brand-dark/20
                  pointer-events-none
                  z-10
                "
              />

              {/* =====================================================
                  SECONDARY OVERLAY
              ===================================================== */}

              <div
                className="
                  absolute
                  inset-0
                  bg-brand-primary/10
                  pointer-events-none
                  z-10
                "
              />

              {/* =====================================================
                  CONTENT
              ===================================================== */}

              <div
                className="
                  absolute
                  inset-0
                  z-20
                  max-w-7xl
                  mx-auto
                  px-6
                  lg:px-12
                  flex
                  items-center
                "
              >
                <div className="max-w-2xl">

                  {/* =================================================
                      TAG
                  ================================================= */}

                  {slide.tag && (
                    <p
                      className="
                        uppercase
                        tracking-[6px]
                        text-brand-tan
                        text-xs
                        md:text-sm
                        font-semibold
                        mb-4
                      "
                    >
                      {slide.tag}
                    </p>
                  )}

                  {/* =================================================
                      TITLE
                  ================================================= */}

                  {slide.title && (
                    <h1
                      className="
                        text-white
                        font-black
                        leading-[1.05]
                        text-4xl
                        sm:text-5xl
                        md:text-6xl
                        lg:text-7xl
                      "
                    >
                      {slide.title}
                    </h1>
                  )}

                  {/* =================================================
                      SUBTITLE
                  ================================================= */}

                  {slide.subtitle && (
                    <p
                      className="
                        mt-6
                        text-white/90
                        leading-7
                        text-base
                        md:text-xl
                        max-w-xl
                      "
                    >
                      {slide.subtitle}
                    </p>
                  )}

                </div>
              </div>

              {/* =====================================================
                  SCROLL INDICATOR
              ===================================================== */}

              <div
                className="
                  absolute
                  bottom-5
                  left-1/2
                  -translate-x-1/2
                  z-30
                  flex
                  flex-col
                  items-center
                  text-white
                  animate-bounce
                  pointer-events-none
                "
              >
                <span
                  className="
                    text-[9px]
                    md:text-[10px]
                    uppercase
                    tracking-[4px]
                    mb-1
                  "
                >
                  Scroll
                </span>

                <FiChevronDown className="text-lg" />
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;