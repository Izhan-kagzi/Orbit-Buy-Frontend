import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import women_banner from "../assets/featured/women_banner.png";

const WomenWearBanner = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8">
      <Link
        to="/search?q=women"
        aria-label="Shop Women's Wear"
        className="group relative block w-full overflow-hidden rounded-[24px] sm:rounded-[32px] lg:rounded-[40px] bg-neutral-100 shadow-[0_20px_60px_rgba(0,0,0,0.10)]"
      >
        {/* Image */}
        <motion.img
          src={women_banner}
          alt="Women's Wear"
          loading="lazy"
          decoding="async"
          className="h-auto min-h-[280px] w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.035] sm:min-h-[360px] lg:min-h-[480px]"
        />

        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />

        {/* Subtle bottom vignette */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/35 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full p-6 sm:p-8 lg:p-12 xl:p-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-xl text-white"
            >
              <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.35em] text-white/75 sm:text-xs">
                ORBIT BUY · WOMEN'S COLLECTION
              </p>

              <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
                Effortless
                <span className="block italic font-light">
                  Women's Fashion
                </span>
              </h2>

              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80 sm:mt-4 sm:text-base">
                Discover elegant dresses, shirts, jeans, skirts and more,
                curated for a modern wardrobe.
              </p>

              {/* CTA */}
              <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-medium backdrop-blur-md transition-all duration-300 group-hover:border-white/60 group-hover:bg-white group-hover:text-[#09335A] sm:mt-7 sm:px-6">
                <span>Explore Collection</span>

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#09335A] transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={16} strokeWidth={2} />
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative corner detail */}
        <div className="absolute right-5 top-5 hidden h-14 w-14 rounded-full border border-white/25 backdrop-blur-sm sm:block lg:right-8 lg:top-8 lg:h-16 lg:w-16" />

        {/* Hover shine */}
        <div className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[120%] group-hover:opacity-100" />
      </Link>
    </section>
  );
};

export default WomenWearBanner;