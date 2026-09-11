import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import featuredData from "./featuredData";

const FeaturedCollection = () => {
  return (
    <section className="relative pt-10 pb-20 md:pt-12 md:pb-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center mb-10 md:mb-12">

          <p className="inline-flex items-center gap-3 uppercase tracking-[5px] text-brand-primary font-semibold text-xs sm:text-sm">
            <span className="w-8 h-px bg-brand-primary" />
            Featured Collection
            <span className="w-8 h-px bg-brand-primary" />
          </p>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mt-5 tracking-tight text-gray-900">
            Curated For You
          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto mt-5 text-sm sm:text-base leading-7">
            Explore our handpicked premium collections designed with
            modern elegance, timeless silhouettes and effortless style.
          </p>

        </div>

        {/* Featured Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">

          {featuredData.map((item) => (

            <Link
              key={item.id}
              to={item.link}
              className="group relative block overflow-hidden rounded-[2rem] h-[520px] sm:h-[580px] lg:h-[620px] bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-700"
              aria-label={`Shop ${item.title}`}
            >

              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="
                  absolute inset-0
                  w-full h-full
                  object-cover
                  transition-transform
                  duration-[1200ms]
                  ease-out
                  group-hover:scale-105
                "
              />

              {/* Dark Editorial Overlay */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/90
                  via-black/35
                  to-transparent
                "
              />

              {/* Top subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

              {/* Top Label */}
              <div className="absolute top-6 left-6 sm:top-8 sm:left-8">

                <span
                  className="
                    inline-flex items-center
                    px-4 py-2
                    rounded-full
                    bg-white/15
                    backdrop-blur-md
                    border border-white/25
                    text-white
                    text-[10px] sm:text-xs
                    font-semibold
                    tracking-[2px]
                  "
                >
                  {item.tag}
                </span>

              </div>

              {/* Collection Number */}
              <div className="absolute top-7 right-7 sm:top-9 sm:right-9">

                <span className="text-white/60 text-xs font-semibold tracking-[3px]">
                  0{item.id}
                </span>

              </div>

              {/* Content */}
              <div
                className="
                  absolute
                  left-6 right-6
                  sm:left-9 sm:right-9
                  bottom-7 sm:bottom-9
                  max-w-xl
                "
              >

                {/* Small accent */}
                <div className="w-10 h-[2px] bg-white mb-5 transition-all duration-500 group-hover:w-16" />

                <h3
                  className="
                    text-white
                    text-3xl
                    sm:text-4xl
                    md:text-5xl
                    font-black
                    leading-[1.05]
                    tracking-tight
                    max-w-lg
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    text-white/75
                    text-sm sm:text-base
                    leading-7
                    mt-5
                    max-w-md
                  "
                >
                  {item.description}
                </p>

                {/* CTA */}
                <div className="mt-7">

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-3
                      px-6 py-3.5
                      rounded-full
                      bg-white
                      text-gray-900
                      text-sm
                      font-semibold
                      transition-all
                      duration-500
                      group-hover:bg-brand-primary
                      group-hover:text-white
                    "
                  >
                    {item.button}

                    <span
                      className="
                        flex items-center justify-center
                        w-7 h-7
                        rounded-full
                        bg-gray-900
                        text-white
                        transition-all
                        duration-500
                        group-hover:bg-white
                        group-hover:text-brand-primary
                        group-hover:rotate-45
                      "
                    >
                      <FiArrowUpRight size={16} />
                    </span>
                  </span>

                </div>

              </div>

              {/* Hover Border */}
              <div
                className="
                  absolute inset-0
                  rounded-[2rem]
                  border border-white/0
                  group-hover:border-white/20
                  transition-all duration-700
                  pointer-events-none
                "
              />

            </Link>

          ))}

        </div>

      </div>
    </section>
  );
};

export default FeaturedCollection;