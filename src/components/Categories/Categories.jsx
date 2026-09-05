import { Link } from "react-router-dom";
import categoriesData from "./categoriesData";
import FadeIn from "../Motion/FadeIn";

const Categories = () => {
  return (
    <section
      className="bg-gray-50 py-20"
      aria-labelledby="categories-heading"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* =====================================================
            SECTION HEADING
        ====================================================== */}
        <FadeIn className="text-center mb-16">

          <span className="uppercase tracking-[6px] text-brand-primary font-semibold text-sm">
            Shop Collections
          </span>

          <h2
            id="categories-heading"
            className="text-4xl md:text-5xl font-black mt-4"
          >
            Explore Our Categories
          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto mt-5">
            Discover premium men's and women's fashion collections
            designed for every style and every season.
          </p>

        </FadeIn>

        {/* =====================================================
            CATEGORY CARDS
        ====================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {categoriesData.map((category) => (

            <article
              key={category.id}
              className="
                group
                bg-white
                rounded-3xl
                overflow-hidden
                shadow-md
                hover:shadow-2xl
                transition-all
                duration-500
                hover:-translate-y-2
              "
            >

              {/* =================================================
                  IMAGE
              ================================================== */}
              <Link
                to={category.link}
                aria-label={`Shop ${category.title}`}
                className="block overflow-hidden h-[380px]"
              >
                <img
                  src={category.image}
                  alt={`${category.title} - Orbit Buy`}
                  loading="lazy"
                  decoding="async"
                  className="
                    w-full
                    h-full
                    object-cover
                    group-hover:scale-110
                    transition-transform
                    duration-700
                  "
                />
              </Link>

              {/* =================================================
                  CONTENT
              ================================================== */}
              <div className="p-6">

                <h3 className="text-2xl font-bold">
                  <Link
                    to={category.link}
                    className="hover:text-brand-primary transition-colors"
                  >
                    {category.title}
                  </Link>
                </h3>

                <p className="text-gray-500 mt-2">
                  {category.subtitle}
                </p>

                {/* =================================================
                    CRAWLABLE CTA
                ================================================== */}
                <Link
                  to={category.link}
                  className="
                    mt-6
                    w-full
                    bg-brand-primary
                    text-white
                    py-3
                    rounded-xl
                    font-semibold
                    hover:bg-brand-brown
                    transition
                    duration-300
                    flex
                    items-center
                    justify-center
                    text-center
                  "
                  aria-label={`${category.button} - ${category.title}`}
                >
                  {category.button}
                </Link>

              </div>

            </article>

          ))}

        </div>

      </div>
    </section>
  );
};

export default Categories;