
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  FiArrowUpRight,
  FiArrowRight,
  FiShoppingBag,
} from "react-icons/fi";

import FadeIn from "../Motion/FadeIn";

// ============================================================
// BRAND DATA
// ============================================================

const BRANDS = [
  { name: "Zara", for: ["Women", "Men"], style: "Contemporary fashion" },
  { name: "H&M", for: ["Women", "Men"], style: "Everyday essentials" },
  { name: "Adidas", for: ["Women", "Men", "Sport"], style: "Performance & lifestyle" },
  { name: "Jack & Jones", for: ["Men"], style: "Modern menswear" },
  { name: "Diesel", for: ["Men", "Women"], style: "Denim culture" },
  { name: "Calvin Klein", for: ["Men", "Women"], style: "Minimal luxury" },
  { name: "D&G", for: ["Women", "Men"], style: "Italian luxury" },
  { name: "Versace", for: ["Women", "Men"], style: "Italian glamour" },
  { name: "Forever 21", for: ["Women"], style: "Youth fashion" },
  { name: "PrettyLittleThing", for: ["Women"], style: "Statement fashion" },
  { name: "Shein", for: ["Women", "Men"], style: "Trend forward" },
  { name: "Revolve", for: ["Women"], style: "Contemporary style" },
  { name: "Wrangler", for: ["Men", "Women"], style: "Denim heritage" },
  { name: "Hugo Boss", for: ["Men"], style: "Luxury tailoring" },
];

const FILTERS = ["All", "Women", "Men", "Sport"];

// ============================================================
// SHOP BY BRAND
// ============================================================

const ShopByBrand = () => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const [filter, setFilter] = useState("All");
  const [activeBrand, setActiveBrand] = useState(null);

  // FILTER BRANDS

  const visibleBrands = useMemo(() => {
    return filter === "All"
      ? BRANDS
      : BRANDS.filter((brand) => brand.for.includes(filter));
  }, [filter]);

  // NAVIGATE TO BRAND

  const goToBrand = (name) => {
    navigate(`/shop?brand=${encodeURIComponent(name)}`);
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <section className="relative overflow-hidden bg-[#061B35] py-20 md:py-28 text-white">

      {/* ========================================================
          BACKGROUND EFFECTS
      ======================================================== */}

      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#D9C3A3]/10 blur-[150px]" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-400/10 blur-[150px]" />

      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#12365B]/20 blur-[150px]" />


      <div className="relative mx-auto max-w-7xl px-6">

        {/* ========================================================
            SECTION HEADER
        ======================================================== */}

        <FadeIn>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-6">

                <span className="h-[1px] w-10 bg-[#D9C3A3]" />

                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#D9C3A3]">
                  The Brand Edit
                </span>

              </div>

              <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-black leading-[1.05] tracking-tight">

                The Brands Behind

                <br />

                <span className="text-[#D9C3A3] italic">
                  Your Style.
                </span>

              </h2>

            </div>


            <div className="max-w-md">

              <p className="text-sm md:text-base leading-7 text-white/60">
                Discover iconic labels, explore signature aesthetics,
                and find the names that define your personal style.
              </p>

              <div className="mt-6 flex items-center gap-3 text-sm font-semibold text-white/80">

                <span className="text-3xl font-black text-[#D9C3A3]">
                  {BRANDS.length.toString().padStart(2, "0")}
                </span>

                Curated fashion brands

              </div>

            </div>

          </div>

        </FadeIn>


        {/* ========================================================
            FILTER TABS
        ======================================================== */}

        <FadeIn delay={0.1}>

          <div className="mt-14 flex flex-wrap items-center justify-between gap-5 border-b border-white/10 pb-6">

            <div className="flex flex-wrap gap-2">

              {FILTERS.map((item) => (

                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setFilter(item);
                    setActiveBrand(null);
                  }}
                  aria-pressed={filter === item}
                  className={`
                    rounded-full px-6 py-2.5
                    text-sm font-semibold
                    transition-all duration-300
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#D9C3A3]
                    ${
                      filter === item
                        ? "bg-[#D9C3A3] text-[#061B35] shadow-lg shadow-[#D9C3A3]/10"
                        : "border border-white/15 text-white/60 hover:border-[#D9C3A3] hover:text-[#D9C3A3]"
                    }
                  `}
                >
                  {item}
                </button>

              ))}

            </div>


            <span className="text-xs tracking-wider text-white/40">
              SHOWING {visibleBrands.length} BRANDS
            </span>

          </div>

        </FadeIn>


        {/* ========================================================
            BRAND GRID
        ======================================================== */}

        <motion.div
          layout
          className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
        >

          <AnimatePresence mode="popLayout">

            {visibleBrands.map((brand, index) => {

              const selected = activeBrand === brand.name;

              return (

                <motion.article
                  layout
                  key={brand.name}

                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: 20 }
                  }

                  animate={{
                    opacity: 1,
                    y: 0,
                  }}

                  exit={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.94 }
                  }

                  transition={{
                    duration: 0.35,
                    delay: reduceMotion ? 0 : index * 0.025,
                  }}

                  onMouseEnter={() => setActiveBrand(brand.name)}
                  onMouseLeave={() => setActiveBrand(null)}

                  className={`
                    group relative flex min-h-[210px] md:min-h-[250px]
                    flex-col justify-between overflow-hidden
                    rounded-2xl border p-5 md:p-7
                    transition-all duration-500 cursor-pointer
                    ${
                      selected
                        ? "border-[#D9C3A3]/60 bg-[#12365B]"
                        : "border-white/10 bg-[#0B2747] hover:border-[#D9C3A3]/50 hover:bg-[#103255]"
                    }
                  `}
                >

                  {/* CARD GLOW */}

                  <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#D9C3A3]/0 blur-3xl transition-all duration-700 group-hover:bg-[#D9C3A3]/15" />


                  {/* CARD TOP */}

                  <div className="relative flex items-center justify-between">

                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="
                      flex h-9 w-9 items-center justify-center
                      rounded-full border border-white/15
                      text-white/50 text-lg
                      transition-all duration-300
                      group-hover:border-[#D9C3A3]
                      group-hover:bg-[#D9C3A3]
                      group-hover:text-[#061B35]
                      group-hover:rotate-45
                    ">
                      <FiArrowUpRight />
                    </span>

                  </div>


                  {/* BRAND INFORMATION */}

                  <div className="relative mt-10">

                    <h3
                      className={`
                        break-words font-display font-black
                        text-2xl sm:text-3xl md:text-4xl
                        tracking-tight leading-tight
                        transition-colors duration-300
                        ${
                          selected
                            ? "text-[#D9C3A3]"
                            : "text-white group-hover:text-[#D9C3A3]"
                        }
                      `}
                    >
                      {brand.name}
                    </h3>

                    <p className="mt-3 text-xs md:text-sm text-white/45">
                      {brand.style}
                    </p>

                  </div>


                  {/* CARD FOOTER */}

                  <div className="relative mt-7 flex items-center justify-between gap-2">

                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-white/35">
                      {brand.for.join(" / ")}
                    </span>

                    <button
                      type="button"
                      onClick={() => goToBrand(brand.name)}
                      aria-label={`Shop ${brand.name}`}
                      className="
                        flex items-center gap-2
                        text-xs font-bold text-[#D9C3A3]
                        transition-all duration-300
                        group-hover:gap-3
                      "
                    >
                      Shop Now
                      <FiArrowRight />

                    </button>

                  </div>

                </motion.article>

              );

            })}

          </AnimatePresence>

        </motion.div>


        {/* ========================================================
            BOTTOM CTA
        ======================================================== */}

        <FadeIn delay={0.2}>

          <div className="mt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-white/10 pt-10">

            <div>

              <h3 className="text-xl md:text-2xl font-bold text-white">
                Your next favourite brand awaits.
              </h3>

              <p className="mt-2 text-sm text-white/45">
                Explore the complete Orbit Buy collection.
              </p>

            </div>


            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="
                group inline-flex items-center justify-center gap-3
                rounded-full bg-[#D9C3A3] px-8 py-4
                text-sm font-bold text-[#061B35]
                transition-all duration-300
                hover:-translate-y-1 hover:bg-white
                hover:shadow-xl hover:shadow-[#D9C3A3]/10
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white
              "
            >

              <FiShoppingBag />

              Explore All Brands

              <FiArrowRight className="transition-transform group-hover:translate-x-1" />

            </button>

          </div>

        </FadeIn>

      </div>

    </section>
  );
};

export default ShopByBrand;
