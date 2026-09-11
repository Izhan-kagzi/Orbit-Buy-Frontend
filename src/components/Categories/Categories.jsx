import { Link } from "react-router-dom";
import categoriesData from "./categoriesData";
import FadeIn from "../Motion/FadeIn";

const Categories = () => {
  return (
    <section
      className="bg-gray-50 py-20 md:py-24"
      aria-labelledby="categories-heading"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* =====================================================
            SECTION HEADER
        ====================================================== */}
        <FadeIn className="text-center mb-14 md:mb-16">

          <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-[0.35em] text-brand-primary">
            Curated For You
          </span>

          <h2
            id="categories-heading"
            className="
              mt-4
              text-4xl
              md:text-5xl
              lg:text-6xl
              font-black
              tracking-tight
              text-gray-900
            "
          >
            Explore Our Collections
          </h2>

          <p
            className="
              max-w-2xl
              mx-auto
              mt-5
              text-sm
              md:text-base
              leading-7
              text-gray-500
            "
          >
            Discover thoughtfully curated fashion collections designed
            to elevate your everyday style.
          </p>

        </FadeIn>

        {/* =====================================================
            CATEGORY CARDS
        ====================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">

          {categoriesData.map((category, index) => (

            <FadeIn
              key={category.id}
              delay={index * 0.08}
              className="h-full"
            >

              <article
                className="
                  group
                  relative
                  h-full
                  min-h-[560px]
                  overflow-hidden
                  rounded-[28px]
                  bg-gray-900
                  shadow-[0_15px_45px_rgba(0,0,0,0.10)]
                  hover:shadow-[0_25px_65px_rgba(0,0,0,0.20)]
                  transition-all
                  duration-700
                  hover:-translate-y-2
                "
              >

                {/* =================================================
                    FULL CARD LINK
                ================================================== */}
                <Link
                  to={category.link}
                  className="absolute inset-0 z-20"
                  aria-label={`Explore ${category.title}`}
                >
                  <span className="sr-only">
                    Explore {category.title}
                  </span>
                </Link>

                {/* =================================================
                    IMAGE
                ================================================== */}
                <div className="absolute inset-0 overflow-hidden">

                  <img
                    src={category.image}
                    alt={`${category.title} - Orbit Buy`}
                    loading="lazy"
                    decoding="async"
                    className="
                      absolute
                      inset-0
                      w-full
                      h-full
                      object-cover
                      scale-100
                      group-hover:scale-110
                      transition-transform
                      duration-[1200ms]
                      ease-out
                    "
                  />

                  {/* Dark luxury gradient */}
                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/85
                      via-black/25
                      to-black/5
                    "
                  />

                  {/* Hover overlay */}
                  <div
                    className="
                      absolute
                      inset-0
                      bg-black/0
                      group-hover:bg-black/15
                      transition-colors
                      duration-700
                    "
                  />

                </div>

                {/* =================================================
                    TOP BADGE
                ================================================== */}
                <div className="absolute top-5 left-5 z-10">

                  <span
                    className="
                      inline-flex
                      items-center
                      rounded-full
                      border
                      border-white/30
                      bg-black/20
                      px-4
                      py-2
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-white
                      backdrop-blur-md
                    "
                  >
                    {index === 0 && "For Him"}
                    {index === 1 && "For Her"}
                    {index === 2 && "Just In"}
                    {index === 3 && "Trending"}
                  </span>

                </div>

                {/* =================================================
                    CONTENT
                ================================================== */}
                <div
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    z-10
                    p-6
                    md:p-7
                  "
                >

                  {/* Small line */}
                  <div
                    className="
                      mb-4
                      h-[1px]
                      w-10
                      bg-white/70
                      group-hover:w-16
                      transition-all
                      duration-500
                    "
                  />

                  {/* Title */}
                  <h3
                    className="
                      text-2xl
                      md:text-3xl
                      font-bold
                      tracking-tight
                      text-white
                    "
                  >
                    {category.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="
                      mt-3
                      max-w-[280px]
                      text-sm
                      leading-6
                      text-white/75
                    "
                  >
                    {category.subtitle}
                  </p>

                  {/* =================================================
                      CTA
                  ================================================== */}
                  <div
                    className="
                      mt-6
                      inline-flex
                      items-center
                      gap-3
                      text-sm
                      font-semibold
                      text-white
                    "
                  >

                    <span
                      className="
                        border-b
                        border-white/60
                        pb-1
                        group-hover:border-white
                        transition-colors
                        duration-300
                      "
                    >
                      {category.button}
                    </span>

                    <span
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/40
                        bg-white/10
                        backdrop-blur-sm
                        group-hover:bg-white
                        group-hover:text-gray-900
                        group-hover:translate-x-1
                        transition-all
                        duration-500
                      "
                    >
                      →
                    </span>

                  </div>

                </div>

              </article>

            </FadeIn>

          ))}

        </div>

      </div>
    </section>
  );
};

export default Categories;