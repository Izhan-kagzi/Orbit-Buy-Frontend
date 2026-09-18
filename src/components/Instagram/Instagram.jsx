import { useMemo } from "react";

import {
  FiInstagram,
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import { Swiper, SwiperSlide } from "swiper/react";

import {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/* =====================================================
   MEN'S FASHION
===================================================== */

import tshirt10 from "../../assets/instagram/tshirt10.jpg";
import tshirt11 from "../../assets/instagram/tshirt11.jpg";
import tshirt12 from "../../assets/instagram/tshirt12.jpg";

import hoodie1 from "../../assets/instagram/hoodie1.jpg";
import hoodie2 from "../../assets/instagram/hoodie2.jpg";
import hoodie3 from "../../assets/instagram/hoodie3.jpg";

/* =====================================================
   WOMEN'S FASHION
===================================================== */

import dress7 from "../../assets/instagram/dress7.jpg";
import dress9 from "../../assets/instagram/dress9.png";

import party2 from "../../assets/instagram/party2.jpg";

import corset8 from "../../assets/instagram/cordset8.jpg";
import corset9 from "../../assets/instagram/cordset9.jpg";
import corset10 from "../../assets/instagram/cordset10.jpg";

/* =====================================================
   COMPONENT
===================================================== */

const Instagram = () => {
  /* =====================================================
     MEN'S IMAGES
  ====================================================== */

  const menImages = useMemo(
    () => [
      {
        image: tshirt10,
        category: "T-Shirts",
      },
      {
        image: tshirt11,
        category: "T-Shirts",
      },
      {
        image: tshirt12,
        category: "T-Shirts",
      },
      {
        image: hoodie1,
        category: "Hoodies",
      },
      {
        image: hoodie2,
        category: "Hoodies",
      },
      {
        image: hoodie3,
        category: "Hoodies",
      },
    ],
    []
  );

  /* =====================================================
     WOMEN'S IMAGES
  ====================================================== */

  const womenImages = useMemo(
    () => [
      {
        image: dress7,
        category: "Dresses",
      },
      {
        image: dress9,
        category: "Dresses",
      },
      {
        image: party2,
        category: "Partywear",
      },
      {
        image: corset8,
        category: "Cord Sets",
      },
      {
        image: corset9,
        category: "Cord Sets",
      },
      {
        image: corset10,
        category: "Cord Sets",
      },
    ],
    []
  );

  /* =====================================================
     REUSABLE FASHION SLIDER
  ====================================================== */

  const FashionSlider = ({
    images,
    sliderClass,
    prevClass,
    nextClass,
    paginationClass,
  }) => {
    return (
      <div className="relative">

        <Swiper
          modules={[
            Navigation,
            Pagination,
            Autoplay,
          ]}
          navigation={{
            prevEl: `.${prevClass}`,
            nextEl: `.${nextClass}`,
          }}
          pagination={{
            el: `.${paginationClass}`,
            clickable: true,
            dynamicBullets: false,
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={images.length > 4}
          speed={700}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            480: {
              slidesPerView: 1.4,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 18,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 22,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          className={`${sliderClass} !pb-14`}
        >

          {images.map((item, index) => (
            <SwiperSlide
              key={`${item.category}-${index}`}
              className="!h-auto"
            >
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${item.category} on Instagram`}
                className="
                  group
                  relative
                  block
                  aspect-[3/4]
                  overflow-hidden
                  rounded-[1.5rem]
                  bg-gray-100
                  shadow-sm
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  hover:shadow-2xl
                "
              >

                {/* IMAGE */}

                <img
                  src={item.image}
                  alt={`${item.category} fashion look ${index + 1}`}
                  loading="lazy"
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-110
                  "
                />

                {/* GRADIENT */}

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/70
                    via-black/10
                    to-transparent
                    opacity-70
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                />

                {/* INSTAGRAM BUTTON */}

                <div
                  className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                  "
                >
                  <div
                    className="
                      flex
                      h-14
                      w-14
                      scale-75
                      items-center
                      justify-center
                      rounded-full
                      bg-white/95
                      text-gray-900
                      opacity-0
                      shadow-2xl
                      backdrop-blur-sm
                      transition-all
                      duration-500
                      group-hover:scale-100
                      group-hover:opacity-100
                    "
                  >
                    <FiInstagram size={22} />
                  </div>
                </div>

                {/* CATEGORY */}

                <div
                  className="
                    absolute
                    bottom-4
                    left-4
                    right-4
                    flex
                    items-center
                    justify-between
                    gap-3
                    translate-y-2
                    opacity-0
                    transition-all
                    duration-500
                    group-hover:translate-y-0
                    group-hover:opacity-100
                  "
                >
                  <span
                    className="
                      rounded-full
                      border
                      border-white/20
                      bg-white/90
                      px-3
                      py-1.5
                      text-xs
                      font-semibold
                      text-gray-900
                      shadow-lg
                      backdrop-blur-md
                    "
                  >
                    {item.category}
                  </span>

                  <span
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-white/90
                      text-gray-900
                      shadow-lg
                    "
                  >
                    <FiArrowUpRight size={16} />
                  </span>
                </div>

              </a>
            </SwiperSlide>
          ))}

        </Swiper>

        {/* =====================================================
            SLIDER CONTROLS
        ====================================================== */}

        <div className="mt-1 flex items-center justify-center gap-4">

          <button
            type="button"
            className={`
              ${prevClass}
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-gray-200
              bg-white
              text-gray-700
              shadow-sm
              transition-all
              duration-300
              hover:border-gray-900
              hover:bg-gray-900
              hover:text-white
              hover:shadow-lg
            `}
            aria-label="Previous fashion images"
          >
            <FiChevronLeft size={18} />
          </button>

          <div
            className={`
              ${paginationClass}
              custom-swiper-pagination
              !static
              !transform-none
              !flex
              !w-auto
              !items-center
              !justify-center
              gap-1.5
            `}
          />

          <button
            type="button"
            className={`
              ${nextClass}
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-gray-200
              bg-white
              text-gray-700
              shadow-sm
              transition-all
              duration-300
              hover:border-gray-900
              hover:bg-gray-900
              hover:text-white
              hover:shadow-lg
            `}
            aria-label="Next fashion images"
          >
            <FiChevronRight size={18} />
          </button>

        </div>

      </div>
    );
  };

  return (
    <section
      id="orbit-instagram"
      aria-labelledby="orbit-instagram-title"
      className="
        relative
        overflow-hidden
        bg-white
        py-20
        md:py-24
        lg:py-28
      "
    >

      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-40
          top-32
          h-80
          w-80
          rounded-full
          bg-brand-primary/5
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-20
          h-80
          w-80
          rounded-full
          bg-brand-primary/5
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-[1800px] px-5 sm:px-6 lg:px-8">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mx-auto mb-14 max-w-3xl text-center">

          <div
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-gray-200
              bg-gray-50
              px-4
              py-2
            "
          >
            <FiInstagram
              size={16}
              className="text-gray-900"
            />

            <span
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.22em]
                text-gray-600
              "
            >
              Follow Us On Instagram
            </span>
          </div>

          <h2
            id="orbit-instagram-title"
            className="
              text-3xl
              font-black
              tracking-tight
              text-gray-900
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
            "
          >
            The Orbit
            <span className="text-brand-primary">
              {" "}Fashion
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-sm
              leading-7
              text-gray-500
              sm:text-base
            "
          >
            Explore the latest fashion inspiration from
            Orbit Buy — contemporary styles, statement
            pieces and timeless looks.
          </p>

        </div>

        {/* =====================================================
            MEN'S FASHION
        ====================================================== */}

        <div className="mb-20">

          <div
            className="
              mb-8
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>

              <p
                className="
                  mb-2
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-brand-primary
                "
              >
                Men's Collection
              </p>

              <h3
                className="
                  text-2xl
                  font-black
                  tracking-tight
                  text-gray-900
                  sm:text-3xl
                "
              >
                Men’s Fashion
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                T-Shirts, Hoodies & modern everyday styles
              </p>

            </div>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                inline-flex
                w-fit
                items-center
                gap-2
                text-sm
                font-semibold
                text-gray-800
                transition-colors
                hover:text-brand-primary
              "
            >
              View Men's Fashion

              <FiArrowUpRight
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />
            </a>

          </div>

          <FashionSlider
            images={menImages}
            sliderClass="orbit-men-swiper"
            prevClass="orbit-men-prev"
            nextClass="orbit-men-next"
            paginationClass="orbit-men-pagination"
          />

        </div>

        {/* =====================================================
            WOMEN'S FASHION
        ====================================================== */}

        <div>

          <div
            className="
              mb-8
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>

              <p
                className="
                  mb-2
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-brand-primary
                "
              >
                Women's Collection
              </p>

              <h3
                className="
                  text-2xl
                  font-black
                  tracking-tight
                  text-gray-900
                  sm:text-3xl
                "
              >
                Women’s Fashion
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Dresses, Partywear, Cord Sets & statement looks
              </p>

            </div>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                inline-flex
                w-fit
                items-center
                gap-2
                text-sm
                font-semibold
                text-gray-800
                transition-colors
                hover:text-brand-primary
              "
            >
              View Women's Fashion

              <FiArrowUpRight
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />
            </a>

          </div>

          <FashionSlider
            images={womenImages}
            sliderClass="orbit-women-swiper"
            prevClass="orbit-women-prev"
            nextClass="orbit-women-next"
            paginationClass="orbit-women-pagination"
          />

        </div>

        {/* =====================================================
            MAIN INSTAGRAM BUTTON
        ====================================================== */}

        <div className="mt-16 flex justify-center">

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-gray-900
              px-7
              py-3.5
              text-sm
              font-bold
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-brand-primary
              hover:shadow-xl
            "
          >
            <FiInstagram size={18} />

            <span>Follow us on Instagram</span>

            <FiArrowUpRight
              size={18}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />
          </a>

        </div>

      </div>

      {/* =====================================================
          SWIPER STYLING
      ====================================================== */}

      <style>{`
        .custom-swiper-pagination {
          position: static !important;
          transform: none !important;
          width: auto !important;
          inset: auto !important;
        }

        .custom-swiper-pagination .swiper-pagination-bullet {
          position: relative !important;
          left: auto !important;
          top: auto !important;
          transform: none !important;
          width: 7px;
          height: 7px;
          margin: 0 3px !important;
          opacity: 0.25;
          transition: all 0.3s ease;
        }

        .custom-swiper-pagination
          .swiper-pagination-bullet-active {
          width: 22px;
          border-radius: 999px;
          opacity: 1;
          background: #09335A;
        }

        .orbit-men-swiper,
        .orbit-women-swiper {
          overflow: visible;
        }

        @media (max-width: 639px) {
          .orbit-men-swiper,
          .orbit-women-swiper {
            overflow: hidden;
          }
        }
      `}</style>

    </section>
  );
};

export default Instagram; 