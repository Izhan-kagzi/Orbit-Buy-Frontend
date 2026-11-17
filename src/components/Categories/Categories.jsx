import { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ProductCard from "../NewArrivals/ProductCard";
import api, { getImageUrl } from "../../services/api";

const collectionConfig = [
  {
    id: "men",
    title: "Men's Collection",
    subtitle:
      "Discover refined shirts, T-shirts, denim, jackets and modern essentials designed for your everyday style.",
    category: "Men",
    link: "/mens-shirts",
    label: "FOR HIM",
    prevClass: "men-collection-prev",
    nextClass: "men-collection-next",
  },
  {
    id: "women",
    title: "Women's Collection",
    subtitle:
      "Explore elegant dresses, shirts, denim, skirts and contemporary styles that redefine everyday fashion.",
    category: "Women",
    link: "/women-dresses",
    label: "FOR HER",
    prevClass: "women-collection-prev",
    nextClass: "women-collection-next",
  },
];

const CollectionSlider = ({ collection }) => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await api.get(
          `/products?category=${collection.category}&limit=50`
        );

        if (!mounted) return;

        const data = res?.products || res?.data?.products || [];

        const formattedProducts = Array.isArray(data)
          ? data.map((product) => ({
              ...product,
              image: product?.image
                ? getImageUrl(product.image)
                : "",
            }))
          : [];

        setProducts(formattedProducts);
      } catch (error) {
        console.error(
          `${collection.title} loading error:`,
          error
        );

        if (mounted) setProducts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, [collection.category, collection.title]);

  return (
    <section
      className="bg-white py-20 md:py-24 overflow-hidden"
      aria-labelledby={`${collection.id}-heading`}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* SECTION HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-7">

          <div className="max-w-2xl">

            <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-brand-primary">
              {collection.label}
            </span>

            <h2
              id={`${collection.id}-heading`}
              className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-gray-900"
            >
              {collection.title}
            </h2>

            <p className="mt-5 text-sm md:text-base leading-7 text-gray-500">
              {collection.subtitle}
            </p>

          </div>

          {/* NAVIGATION */}

          <div className="flex items-center gap-3 shrink-0">

            <button
              type="button"
              className={`
                ${collection.prevClass}
                w-12 h-12 rounded-full border border-gray-200
                bg-white flex items-center justify-center
                shadow-sm hover:bg-brand-primary hover:text-white
                hover:border-brand-primary transition-all duration-300
              `}
              aria-label={`Previous ${collection.title} products`}
            >
              <FiChevronLeft className="text-xl" />
            </button>

            <button
              type="button"
              className={`
                ${collection.nextClass}
                w-12 h-12 rounded-full border border-gray-200
                bg-white flex items-center justify-center
                shadow-sm hover:bg-brand-primary hover:text-white
                hover:border-brand-primary transition-all duration-300
              `}
              aria-label={`Next ${collection.title} products`}
            >
              <FiChevronRight className="text-xl" />
            </button>

            <button
              type="button"
              onClick={() => navigate(collection.link)}
              className="
                group flex items-center gap-3
                border border-brand-primary
                px-6 md:px-7 py-3 rounded-full
                font-semibold text-sm md:text-base
                hover:bg-brand-primary hover:text-white
                transition-all duration-300
              "
            >
              View All

              <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>

          </div>

        </div>

        {/* PRODUCTS */}

        {loading ? (

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-14">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse"
              >
                <div className="aspect-[3/4] rounded-2xl bg-gray-100" />
                <div className="h-4 bg-gray-100 rounded mt-4 w-3/4" />
                <div className="h-4 bg-gray-100 rounded mt-3 w-1/2" />
              </div>
            ))}
          </div>

        ) : products.length > 0 ? (

          <div className="mt-14">

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation={{
                prevEl: `.${collection.prevClass}`,
                nextEl: `.${collection.nextClass}`,
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
              loop={products.length > 4}
              speed={700}
              spaceBetween={28}
              slidesPerView={1}
              breakpoints={{
                480: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 28,
                },
              }}
              className="!pb-14"
            >

              {products.map((product, index) => (
                <SwiperSlide
                  key={
                    product?._id ||
                    product?.id ||
                    `${collection.id}-${index}`
                  }
                  className="!h-auto"
                >
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}

            </Swiper>

          </div>

        ) : (

          <div className="py-20 text-center">

            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              No Products Found
            </h3>

            <p className="text-gray-500 mt-4">
              There are currently no products available in this collection.
            </p>

            <button
              type="button"
              onClick={() => navigate(collection.link)}
              className="mt-6 px-7 py-3 rounded-full bg-brand-primary text-white font-semibold hover:opacity-90 transition"
            >
              Explore Collection
            </button>

          </div>

        )}

      </div>
    </section>
  );
};

const Categories = () => {
  return (
    <>
      {collectionConfig.map((collection) => (
        <CollectionSlider
          key={collection.id}
          collection={collection}
        />
      ))}
    </>
  );
};

export default Categories;
