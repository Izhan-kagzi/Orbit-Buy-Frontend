
import { useEffect, useMemo, useState } from "react";
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import BestSellerCard from "./BestSellerCard";
import api, { getImageUrl } from "../../services/api";

const BestSellers = () => {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("All");
  const [bestSellerData, setBestSellerData] = useState([]);

  // ============================================================
  // FETCH BEST SELLERS
  // ============================================================

  useEffect(() => {
    api
      .get("/products?bestSeller=true&limit=50")
      .then((res) => {
        setBestSellerData(
          (res.products || []).map((product) => ({
            ...product,
            image: getImageUrl(product.image),
          }))
        );
      })
      .catch(() => {
        setBestSellerData([]);
      });
  }, []);

  // ============================================================
  // CATEGORIES
  // ============================================================

  const categories = ["All", "Men", "Women"];

  // ============================================================
  // FILTER PRODUCTS
  // ============================================================

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") {
      return bestSellerData;
    }

    return bestSellerData.filter((product) => {
      const category = String(
        product.category || ""
      ).trim().toLowerCase();

      return category === activeCategory.toLowerCase();
    });
  }, [activeCategory, bestSellerData]);

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* =====================================================
            HEADING
        ====================================================== */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

          <div className="text-center lg:text-left">

            <p className="uppercase tracking-[6px] text-brand-primary font-semibold text-sm">
              Best Sellers
            </p>

            <h2 className="text-4xl lg:text-5xl font-black mt-3">
              Customer Favorites
            </h2>

            <p className="text-gray-500 mt-5 max-w-2xl">
              The most loved fashion pieces chosen by thousands
              of happy customers. Discover premium styles that
              continue to be favorites.
            </p>

          </div>

          {/* =================================================
              NAVIGATION + VIEW ALL
          ================================================== */}

          <div className="flex items-center gap-4">

            {/* PREVIOUS */}

            <button
              type="button"
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

            {/* NEXT */}

            <button
              type="button"
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

            {/* VIEW ALL */}

            <button
              type="button"
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
                  duration-300
                "
              />
            </button>

          </div>
        </div>

        {/* =====================================================
            CATEGORY FILTER
        ====================================================== */}

        <div className="flex flex-wrap justify-center gap-4 mt-16">

          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`
                px-7
                py-3
                rounded-full
                font-semibold
                transition-all
                duration-300
                ${
                  activeCategory === category
                    ? "bg-brand-primary text-white shadow-lg scale-105"
                    : "bg-gray-100 hover:bg-brand-primary hover:text-white hover:scale-105"
                }
              `}
            >
              {category}
            </button>
          ))}

        </div>

        {/* =====================================================
            PRODUCTS SLIDER
        ====================================================== */}

        {filteredProducts.length > 0 ? (

          <div className="mt-16">

            <Swiper
              key={activeCategory}
              modules={[
                Navigation,
                Pagination,
                Autoplay,
              ]}
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
              loop={filteredProducts.length > 4}
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

              {filteredProducts.map((product) => (
                <SwiperSlide
                  key={product.id}
                  className="!h-auto"
                >
                  <BestSellerCard product={product} />
                </SwiperSlide>
              ))}

            </Swiper>

          </div>

        ) : (

          /* =================================================
              EMPTY STATE
          ================================================== */

          <div className="py-20 text-center">

            <h3 className="text-3xl font-bold">
              No Products Found
            </h3>

            <p className="text-gray-500 mt-4">
              We couldn't find best sellers in this category.
            </p>

          </div>
        )}

        

      </div>
    </section>
  );
};

export default BestSellers;
