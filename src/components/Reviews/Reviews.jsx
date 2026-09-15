import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { FiStar, FiArrowUpRight } from "react-icons/fi";

import reviews from "./reviewData";

const Reviews = () => {
  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-white py-24 md:py-28 lg:py-32 scroll-mt-24"
    >
      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-brand-primary/[0.035] blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-blue-100/30 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-slate-100/80 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
          <div className="mb-5 inline-flex items-center gap-3">
            <span className="h-px w-10 bg-brand-primary/40" />
            <p className="text-[11px] font-bold uppercase tracking-[5px] text-brand-primary">
              Client Stories
            </p>
            <span className="h-px w-10 bg-brand-primary/40" />
          </div>

          <h2 className="font-serif text-4xl leading-tight text-brand-dark sm:text-5xl md:text-6xl">
            Loved by those who
            <span className="block italic text-brand-primary">
              wear Orbit Buy.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base sm:leading-8">
            Discover why customers choose Orbit Buy for refined styles,
            effortless shopping, and fashion designed for every moment.
          </p>
        </div>

        {/* REVIEWS SLIDER */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          loop={reviews.length > 3}
          speed={800}
          autoplay={{
            delay: 4200,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            el: ".orbit-reviews-pagination",
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 24,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 28,
            },
          }}
          className="!overflow-visible"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id} className="!h-auto">
              <article className="group relative h-full overflow-hidden rounded-[28px] border border-gray-200/80 bg-white p-7 shadow-[0_12px_45px_rgba(9,51,90,0.06)] transition-all duration-500 hover:-translate-y-2 hover:border-brand-primary/20 hover:shadow-[0_24px_65px_rgba(9,51,90,0.12)] sm:p-8">
                {/* Top decorative line */}
                <div className="absolute left-0 top-0 h-[3px] w-0 bg-brand-primary transition-all duration-500 group-hover:w-full" />

                {/* Soft card glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-brand-primary/[0.035] blur-3xl transition-all duration-500 group-hover:bg-brand-primary/[0.07]" />

                {/* QUOTE + RATING */}
                <div className="relative flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-primary/[0.07] text-2xl font-serif text-brand-primary">
                    “
                  </div>

                  <div className="flex items-center gap-1 rounded-full border border-amber-100 bg-amber-50/70 px-3 py-2">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        size={13}
                        strokeWidth={1.8}
                        className={
                          i < review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* REVIEW TEXT */}
                <div className="relative mt-7">
                  <p className="text-[15px] leading-8 text-gray-600">
                    “{review.review}”
                  </p>
                </div>

                {/* Divider */}
                <div className="my-7 h-px bg-gradient-to-r from-gray-200 via-gray-100 to-transparent" />

                {/* CUSTOMER INFO */}
                <div className="relative flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-4">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <div className="absolute -inset-1 rounded-full bg-brand-primary/10 opacity-0 blur-sm transition duration-500 group-hover:opacity-100" />

                      <img
                        src={review.image}
                        alt={`${review.name} - Orbit Buy customer`}
                        loading="lazy"
                        className="relative h-12 w-12 rounded-full border-2 border-white object-cover shadow-md"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-brand-dark">
                        {review.name}
                      </p>

                      <p className="mt-1 text-xs font-medium uppercase tracking-[1.5px] text-gray-400">
                        {review.role || "Verified Customer"}
                      </p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-all duration-300 group-hover:border-brand-primary group-hover:bg-brand-primary group-hover:text-white">
                    <FiArrowUpRight size={16} />
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CUSTOM PAGINATION */}
        <div className="orbit-reviews-pagination mt-12 flex justify-center" />
      </div>

      {/* SWIPER PAGINATION STYLES */}
      <style>{`
        .orbit-reviews-pagination .swiper-pagination-bullet {
          width: 7px;
          height: 7px;
          margin: 0 5px !important;
          opacity: 1;
          background: #d1d5db;
          transition: all 0.35s ease;
        }

        .orbit-reviews-pagination .swiper-pagination-bullet-active {
          width: 28px;
          border-radius: 999px;
          background: #09335a;
        }
      `}</style>
    </section>
  );
};

export default Reviews;