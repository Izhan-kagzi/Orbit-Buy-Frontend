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
  return (
    <section
      className="
    relative
    w-full
    h-[85vh] lg:h-[90vh]
    min-h-[725px]
    max-h-[975px]
    overflow-hidden
    pt-20 lg:pt-24
  "
    >

      <Swiper
        modules={[
          Autoplay, 
          Pagination,
          Navigation,
          EffectFade,
        ]}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        className="w-full h-full"
      >

        {heroData.map((slide, index) => (
          <SwiperSlide key={slide.id}>

            <div className="relative w-full h-full overflow-hidden">

              {/* ================= BACKGROUND ================= */}

              {slide.type === "video" ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload={index === 0 ? "auto" : "none"}
                  className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    object-cover
                  "
                >
                  <source
                    src={slide.media}
                    type="video/mp4"
                  />
                </video>
              ) : (
                <img
                  src={slide.media}
                  alt={slide.title}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding={index === 0 ? "sync" : "async"}
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

              {/* ================= OVERLAY ================= */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-r
                  from-brand-dark/75
                  via-brand-primary/40
                  to-brand-dark/20
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-brand-primary/10
                "
              />

              {/* ================= CONTENT ================= */}

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

              {/* ================= SCROLL ================= */}

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