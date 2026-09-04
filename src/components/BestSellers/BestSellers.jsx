import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import BestSellerCard from "./BestSellerCard";
import api, { getImageUrl } from "../../services/api";

const BestSellers = () => {
  const navigate = useNavigate();
  const [bestSellerData, setBestSellerData] = useState([]);

  useEffect(() => {
    api
      .get("/products?bestSeller=true&limit=50")
      .then((res) => {
        setBestSellerData(
          (res.products || []).map((p) => ({
            ...p,
            image: getImageUrl(p.image),
          }))
        );
      })
      .catch(() => setBestSellerData([]));
  }, []);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= HEADING ================= */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-14">

          <div className="text-center lg:text-left">

            <p className="uppercase tracking-[6px] text-brand-primary text-sm font-semibold">
              Best Sellers
            </p>

            <h2 className="text-4xl lg:text-5xl font-black mt-3">
              Customer Favorites
            </h2>

            <p className="text-gray-500 mt-5 max-w-2xl">
              The most loved fashion pieces chosen by thousands of happy
              customers.
            </p>

          </div>

          {/* View All + Navigation */}

          <div className="flex items-center gap-4">

            {/* Previous */}

            <button
              className="
                best-seller-prev
                w-12
                h-12
                rounded-full
                border
                border-gray-200
                bg-white
                flex
                items-center
                justify-center
                shadow-sm
                hover:bg-brand-primary
                hover:text-white
                hover:border-brand-primary
                transition-all
                duration-300
              "
              aria-label="Previous products"
            >
              <FiChevronLeft className="text-xl" />
            </button>

            {/* Next */}

            <button
              className="
                best-seller-next
                w-12
                h-12
                rounded-full
                border
                border-gray-200
                bg-white
                flex
                items-center
                justify-center
                shadow-sm
                hover:bg-brand-primary
                hover:text-white
                hover:border-brand-primary
                transition-all
                duration-300
              "
              aria-label="Next products"
            >
              <FiChevronRight className="text-xl" />
            </button>

            {/* View All */}

            <button
              onClick={() => navigate("/best-sellers")}
              className="
                group
                flex
                items-center
                gap-3
                border
                border-brand-primary
                px-7
                py-3
                rounded-full
                font-semibold
                hover:bg-brand-primary
                hover:text-white
                transition-all
                duration-300
              "
            >
              View All

              <FiArrowRight
                className="
                  group-hover:translate-x-1
                  transition-transform
                "
              />
            </button>

          </div>

        </div>

        {/* ================= SLIDER ================= */}

        {bestSellerData.length > 0 ? (

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}

            navigation={{
              prevEl: ".best-seller-prev",
              nextEl: ".best-seller-next",
            }}

            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}

            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}

            loop={bestSellerData.length > 4}

            speed={700}

            spaceBetween={28}

            slidesPerView={1}

            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },

              1024: {
                slidesPerView: 3,
                spaceBetween: 28,
              },

              1280: {
                slidesPerView: 4,
                spaceBetween: 28,
              },
            }}

            className="best-seller-swiper !pb-14"
          >

            {bestSellerData.map((product) => (

              <SwiperSlide key={product.id} className="!h-auto">

                <BestSellerCard product={product} />

              </SwiperSlide>

            ))}

          </Swiper>

        ) : (

          /* ================= EMPTY STATE ================= */

          <div className="py-16 text-center">

            <p className="text-gray-500">
              No best sellers available right now.
            </p>

          </div>

        )}

      </div>
    </section>
  );
};

export default BestSellers;
