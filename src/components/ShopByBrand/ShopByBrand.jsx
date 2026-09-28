import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FadeIn from "../Motion/FadeIn";

const BRANDS = [
  "Zara",
  "H&M",
  "Adidas",
  "Jack & Jones",
  "Diesel",
  "Calvin Klein",
  "D&G",
  "Versace",
  "Forever 21",
  "PrettyLittleThing",
  "Shein",
  "Revolve",
  "Wrangler",
  "Hugo Boss",
];

const BRAND_META = [
  { category: "WOMEN · MEN", style: "Contemporary" },
  { category: "WOMEN · MEN", style: "Everyday Essentials" },
  { category: "SPORT · LIFESTYLE", style: "Performance" },
  { category: "MEN", style: "Modern Tailoring" },
  { category: "MEN · WOMEN", style: "Denim Culture" },
  { category: "MEN · WOMEN", style: "Minimal Luxury" },
  { category: "WOMEN · MEN", style: "Italian Luxury" },
  { category: "WOMEN · MEN", style: "Italian Glamour" },
  { category: "WOMEN", style: "Youth Fashion" },
  { category: "WOMEN", style: "Statement Style" },
  { category: "WOMEN · MEN", style: "Trend Forward" },
  { category: "WOMEN", style: "Contemporary" },
  { category: "MEN · WOMEN", style: "Denim Heritage" },
  { category: "MEN", style: "Luxury Tailoring" },
];

const BrandNumber = ({ index }) => (
  <span className="font-mono text-[10px] tracking-[0.3em] text-brand-tan/70">
    {String(index + 1).padStart(2, "0")}
  </span>
);

const ShopByBrand = () => {
  const navigate = useNavigate();

  const goToBrand = (brand) => {
    navigate(`/shop?brand=${encodeURIComponent(brand)}`);
  };

  return (
    <section className="relative overflow-hidden bg-brand-dark py-24 md:py-32">
      {/* ============================================================
          ORIGINAL ORBIT BUY AMBIENT BACKGROUND
      ============================================================ */}

      <div className="pointer-events-none absolute inset-0">
        {/* Top radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-tan/[0.07] via-transparent to-transparent" />

        {/* Left glow */}
        <div className="absolute -left-40 top-10 h-[500px] w-[500px] rounded-full bg-brand-tan/[0.055] blur-[140px]" />

        {/* Right glow */}
        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-brand-tan/[0.045] blur-[140px]" />

        {/* Original subtle grid */}
        <div className="absolute inset-0 opacity-[0.025]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* ============================================================
            HEADER
        ============================================================ */}

        <FadeIn>
          <div className="mb-14 flex flex-col gap-8 border-b border-white/[0.08] pb-10 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              {/* Eyebrow */}

              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-brand-tan/60" />

                <p className="text-xs font-medium uppercase tracking-[0.4em] text-brand-tan">
                  Curated Labels
                </p>

                <span className="h-px w-8 bg-brand-tan/60" />
              </div>

              {/* Heading */}

              <h2 className="font-display text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl">
                Shop by
                <br />
                <span className="text-white/30">Brand.</span>
              </h2>
            </div>

            {/* Description */}

            <div className="max-w-md md:pb-1">
              <p className="text-[15px] font-light leading-7 text-gray-400">
                Discover elevated pieces from the houses you admire,
                thoughtfully selected and brought together in one place.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* ============================================================
            FEATURED BRAND
        ============================================================ */}

        <FadeIn delay={0.05}>
          <motion.button
            type="button"
            onClick={() => goToBrand(BRANDS[0])}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.995 }}
            className="
              group relative block w-full overflow-hidden
              rounded-[1.7rem]
              border border-white/[0.09]
              bg-gradient-to-br
              from-white/[0.075]
              via-white/[0.035]
              to-brand-tan/[0.025]
              text-left
              shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]
              backdrop-blur-sm
              transition-all duration-500
              hover:border-brand-tan/35
              hover:shadow-[0_20px_60px_-30px_rgba(212,175,120,0.35)]
            "
          >
            {/* Featured glow */}

            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_40%,_var(--tw-gradient-stops))] from-brand-tan/[0.13] via-transparent to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-100" />

            {/* Giant background letter */}

            <span className="pointer-events-none absolute -right-5 top-1/2 hidden -translate-y-1/2 select-none font-display text-[17rem] font-black leading-none text-white/[0.025] transition-transform duration-1000 group-hover:translate-x-4 md:block">
              Z
            </span>

            {/* Decorative circle */}

            <span className="pointer-events-none absolute right-16 top-1/2 hidden h-64 w-64 -translate-y-1/2 rounded-full border border-brand-tan/[0.08] md:block" />

            <span className="pointer-events-none absolute right-28 top-1/2 hidden h-40 w-40 -translate-y-1/2 rounded-full border border-brand-tan/[0.06] md:block" />

            <div className="relative flex min-h-[310px] flex-col justify-between p-7 sm:p-10 md:min-h-[370px] md:p-14">
              {/* Top */}

              <div className="flex items-start justify-between">
                <div>
                  <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.35em] text-brand-tan">
                    Featured Label
                  </p>

                  <BrandNumber index={0} />
                </div>

                <span
                  className="
                    flex h-11 w-11 items-center justify-center
                    rounded-full
                    border border-white/10
                    bg-white/[0.025]
                    text-white/45
                    transition-all duration-500
                    group-hover:border-brand-tan/50
                    group-hover:bg-brand-tan
                    group-hover:text-brand-dark
                    group-hover:shadow-[0_0_25px_-5px_rgba(212,175,120,0.6)]
                  "
                >
                  ↗
                </span>
              </div>

              {/* Bottom */}

              <div>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="text-[9px] uppercase tracking-[0.28em] text-white/35">
                    {BRAND_META[0].category}
                  </span>

                  <span className="h-1 w-1 rounded-full bg-brand-tan/70" />

                  <span className="text-[9px] uppercase tracking-[0.28em] text-white/35">
                    {BRAND_META[0].style}
                  </span>
                </div>

                <h3
                  className="
                    font-display text-6xl font-black
                    tracking-[-0.055em]
                    text-white
                    transition-all duration-700
                    group-hover:translate-x-2
                    sm:text-7xl md:text-8xl
                  "
                >
                  {BRANDS[0]}
                </h3>
              </div>
            </div>

            {/* Bottom gold line */}

            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-brand-tan transition-all duration-700 ease-out group-hover:w-full" />
          </motion.button>
        </FadeIn>

        {/* ============================================================
            DIRECTORY HEADER
        ============================================================ */}

        <div className="mt-20 flex items-center justify-between border-b border-white/[0.08] pb-5">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/35">
              Brand Directory
            </span>

            <span className="h-px w-8 bg-white/10" />

            <span className="font-mono text-[10px] tracking-[0.2em] text-brand-tan">
              {String(BRANDS.length).padStart(2, "0")} LABELS
            </span>
          </div>

          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="
              hidden text-[10px] font-semibold
              uppercase tracking-[0.25em]
              text-white/40
              transition-colors
              hover:text-brand-tan
              sm:block
            "
          >
            Explore All →
          </button>
        </div>

        {/* ============================================================
            BRAND DIRECTORY
        ============================================================ */}

        <div className="divide-y divide-white/[0.08]">
          {BRANDS.slice(1).map((brand, index) => {
            const actualIndex = index + 1;
            const meta = BRAND_META[actualIndex];

            return (
              <motion.button
                key={brand}
                type="button"
                onClick={() => goToBrand(brand)}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.025,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  group relative flex w-full
                  flex-col gap-4
                  py-7 text-left
                  transition-all duration-500
                  sm:flex-row sm:items-center
                  sm:justify-between
                  md:py-8
                "
              >
                {/* Hover background */}

                <span
                  className="
                    pointer-events-none absolute
                    inset-x-[-16px] inset-y-1
                    rounded-2xl
                    bg-white/[0.025]
                    opacity-0
                    transition-opacity duration-500
                    group-hover:opacity-100
                  "
                />

                {/* Gold hover glow */}

                <span
                  className="
                    pointer-events-none absolute
                    left-0 top-1/2
                    h-8 w-8
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-brand-tan/20
                    blur-xl
                    opacity-0
                    transition-opacity duration-500
                    group-hover:opacity-100
                  "
                />

                {/* Brand */}

                <div className="relative z-10 flex items-center gap-5 md:gap-8">
                  <BrandNumber index={actualIndex} />

                  <h3
                    className="
                      font-display
                      text-2xl
                      font-semibold
                      tracking-[-0.025em]
                      text-white/75
                      transition-all
                      duration-500
                      group-hover:translate-x-2
                      group-hover:text-white
                      sm:text-3xl
                      md:text-4xl
                    "
                  >
                    {brand}
                  </h3>
                </div>

                {/* Metadata */}

                <div
                  className="
                    relative z-10
                    hidden
                    items-center
                    gap-4
                    text-[9px]
                    uppercase
                    tracking-[0.28em]
                    text-white/25
                    transition-colors
                    lg:flex
                    group-hover:text-white/40
                  "
                >
                  <span>{meta.category}</span>

                  <span className="h-1 w-1 rounded-full bg-brand-tan/50" />

                  <span>{meta.style}</span>
                </div>

                {/* Right interaction */}

                <div className="relative z-10 flex items-center justify-between sm:justify-end sm:gap-8">
                  <span
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.25em]
                      text-white/25
                      transition-colors
                      group-hover:text-brand-tan/70
                      lg:hidden
                    "
                  >
                    {meta.style}
                  </span>

                  <span
                    className="
                      flex h-9 w-9
                      items-center justify-center
                      rounded-full
                      border border-white/10
                      bg-white/[0.02]
                      text-sm
                      text-white/25
                      transition-all duration-500
                      group-hover:border-brand-tan/50
                      group-hover:bg-brand-tan
                      group-hover:text-brand-dark
                      group-hover:shadow-[0_0_18px_-4px_rgba(212,175,120,0.6)]
                    "
                  >
                    ↗
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* ============================================================
            BOTTOM CTA
        ============================================================ */}

        <FadeIn delay={0.15} className="mt-16">
          <div
            className="
              group relative overflow-hidden
              rounded-[1.6rem]
              border border-brand-tan/20
              bg-gradient-to-r
              from-brand-tan/[0.07]
              via-white/[0.025]
              to-brand-tan/[0.035]
              px-7 py-9
              shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]
              sm:px-10
              md:flex md:items-center
              md:justify-between
              md:px-12 md:py-11
            "
          >
            {/* Glow */}

            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-brand-tan/[0.09] blur-[80px]" />

            <div className="relative">
              <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.35em] text-brand-tan">
                Keep exploring
              </p>

              <h3 className="font-display text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                Find your next favorite label.
              </h3>

              <p className="mt-3 max-w-lg text-sm font-light leading-relaxed text-white/40">
                Browse the complete Orbit Buy collection and discover pieces
                from brands made for your style.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="
                relative mt-7
                inline-flex items-center
                gap-3
                rounded-full
                border border-brand-tan/40
                bg-brand-tan
                px-7 py-3.5
                text-[10px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-brand-dark
                shadow-[0_8px_30px_-12px_rgba(212,175,120,0.7)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-brand-tan/90
                md:mt-0
              "
            >
              Explore Collection

              <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ShopByBrand;