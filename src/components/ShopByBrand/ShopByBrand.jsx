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

// Subtle luxury icons (inline SVG) – no arrows, no numbers
const BRAND_ICONS = [
  // Diamond
  <svg key="diamond" viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 2L2 9l10 13 10-13-10-7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M2 9h20M12 2v20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>,
  // Crown
  <svg key="crown" viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M3 17h18v2H3v-2zM5 17l2-8 3 4 2-6 2 6 3-4 2 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Sparkle
  <svg key="sparkle" viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.4" />
  </svg>,
  // Hanger
  <svg key="hanger" viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 4a2 2 0 012 2v1h6l-8 10-8-10h6V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

const BrandIcon = ({ index }) => BRAND_ICONS[index % BRAND_ICONS.length];

const ShopByBrand = () => {
  const navigate = useNavigate();

  const goToBrand = (brand) =>
    navigate(`/shop?brand=${encodeURIComponent(brand)}`);

  return (
    <section className="relative overflow-hidden bg-brand-dark py-24 md:py-28">
      {/* ============================================================
          AMBIENT BACKGROUND
      ============================================================ */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-tan/[0.07] via-transparent to-transparent" />
        <div className="absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-brand-tan/[0.06] blur-[130px]" />
        <div className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-brand-tan/[0.05] blur-[130px]" />

        {/* Faint grid texture */}
        <div className="absolute inset-0 opacity-[0.03]">
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
        {/* ==========================================================
            HEADER
        ========================================================== */}
        <FadeIn className="mb-16 text-center md:mb-20">
          <div className="mb-5 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-brand-tan/60" />
            <p className="text-xs font-medium uppercase tracking-[0.4em] text-brand-tan">
              Curated Labels
            </p>
            <span className="h-px w-8 bg-brand-tan/60" />
          </div>

          <h2 className="font-display text-4xl font-black tracking-tight text-white md:text-5xl lg:text-[3.4rem]">
            Shop by Brand
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-[15px] font-light leading-relaxed text-gray-400">
            Discover elevated pieces from the houses you admire — carefully
            selected, all in one place.
          </p>
        </FadeIn>

        {/* ==========================================================
            BRAND GRID
        ========================================================== */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5">
          {BRANDS.map((brand, index) => (
            <motion.button
              key={brand}
              type="button"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.55,
                delay: index * 0.045,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => goToBrand(brand)}
              className="
                group relative isolate
                aspect-[4/3] overflow-hidden
                rounded-[1.4rem]
                border border-white/[0.08]
                bg-gradient-to-b from-white/[0.06] to-white/[0.015]
                px-4
                shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]
                backdrop-blur-sm
                transition-colors duration-500
                hover:border-brand-tan/40
              "
            >
              {/* Hover glow */}
              <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,_var(--tw-gradient-stops))] from-brand-tan/[0.14] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Corner sheen */}
              <span className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rotate-45 bg-white/[0.06] opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative flex h-full flex-col items-center justify-center gap-3">
                {/* Icon badge */}
                <span
                  className="
                    flex h-11 w-11 items-center justify-center rounded-full
                    border border-white/10 bg-white/[0.04]
                    p-2.5 text-brand-tan/70
                    transition-all duration-500
                    group-hover:scale-110 group-hover:border-brand-tan/50 group-hover:text-brand-tan group-hover:shadow-[0_0_18px_-2px_rgba(212,175,120,0.5)]
                  "
                >
                  <BrandIcon index={index} />
                </span>

                {/* Brand name */}
                <span
                  className="
                    text-center text-sm font-semibold uppercase tracking-[0.1em]
                    text-white/85 transition-colors duration-400
                    group-hover:text-brand-tan
                    md:text-base
                  "
                >
                  {brand}
                </span>
              </div>

              {/* Bottom accent line */}
              <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-brand-tan transition-all duration-500 ease-out group-hover:w-12" />
            </motion.button>
          ))}
        </div>

        {/* ==========================================================
            FOOTNOTE / CTA
        ========================================================== */}
        <FadeIn delay={0.15} className="mt-14 text-center md:mt-16">
          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="
              group inline-flex items-center gap-2.5 rounded-full
              border border-white/15 bg-white/[0.03] px-7 py-3.5
              text-xs font-semibold uppercase tracking-[0.25em] text-white/70
              transition-all duration-400
              hover:border-brand-tan/50 hover:bg-brand-tan/10 hover:text-brand-tan
            "
          >
            Explore Every Label
            <span className="transition-transform duration-400 group-hover:translate-x-1">
              →
            </span>
          </button>
        </FadeIn>
      </div>
    </section>
  );
};

export default ShopByBrand;