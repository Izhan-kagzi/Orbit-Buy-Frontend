import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { FiStar } from "react-icons/fi";

import reviews from "./reviewData";

const Reviews = () => {
  return (
    <section id="reviews" className="py-24 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="text-center mb-16">
          <p className="uppercase tracking-[5px] text-brand-primary font-semibold">Testimonials</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-serif text-brand-dark">
            What Our Customers Say
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-gray-500 leading-8">
            Real experiences from real customers who trust Orbit Buy for
            premium, everyday fashion.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={28}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-16!"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="h-full bg-gray-50 border border-gray-200 rounded-3xl p-8 flex flex-col">
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      size={16}
                      className={i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}
                    />
                  ))}
                </div>

                <p className="text-gray-600 leading-7 flex-1">"{review.review}"</p>

                <div className="flex items-center gap-4 mt-8">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-brand-dark">{review.name}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default Reviews;
