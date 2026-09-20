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
const BrandIcon = ({ index }) => {
  const icons = [
    // Diamond
    <svg key="diamond" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path d="M12 2L2 9l10 13 10-13-10-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M2 9h20M12 2v20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>,
    // Crown
    <svg key="crown" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path d="M3 17h18v2H3v-2zM5 17l2-8 3 4 2-6 2 6 3-4 2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    // Sparkle
    <svg key="sparkle" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>,
    // Hanger
    <svg key="hanger" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path d="M12 4a2 2 0 012 2v1h6l-8 10-8-10h6V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
  ];
  return icons[index % icons.length];
};

const ShopByBrand = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 md:py-24 bg-brand-dark relative overflow-hidden">
      {/* Soft ambient glow for depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-tan/5 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <FadeIn className="text-center mb-14 md:mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-brand-tan/60" />
            <p className="uppercase tracking-[0.35em] text-brand-tan text-xs font-medium">
              Curated Labels
            </p>
            <span className="h-px w-8 bg-brand-tan/60" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-black text-white tracking-tight">
            Shop by Brand
          </h2>

          <p className="text-gray-400 mt-5 max-w-lg mx-auto text-[15px] leading-relaxed font-light">
            Discover elevated pieces from the houses you admire — carefully selected, all in one place.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
          {BRANDS.map((brand, index) => (
            <motion.button
              key={brand}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.5,
                delay: index * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                navigate(`/shop?brand=${encodeURIComponent(brand)}`)
              }
              className="
                group relative
                aspect-[4/3]
                rounded-2xl
                bg-gradient-to-b from-white/[0.07] to-white/[0.02]
                border border-white/10
                hover:border-brand-tan/50
                shadow-[0_0_0_1px_rgba(255,255,255,0.02)]
                hover:shadow-[0_8px_30px_-8px_rgba(212,175,120,0.15)]
                transition-all duration-500 ease-out
                flex flex-col items-center justify-center
                gap-3
                px-4
                overflow-hidden
              "
            >
              {/* Soft hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-tan/10 via-transparent to-transparent" />

              {/* Icon */}
              <span className="relative text-brand-tan/70 group-hover:text-brand-tan transition-colors duration-400">
                <BrandIcon index={index} />
              </span>

              {/* Brand name */}
              <span
                className="
                  relative
                  text-white/90
                  group-hover:text-brand-tan
                  font-semibold
                  text-sm md:text-base
                  tracking-[0.08em]
                  uppercase
                  text-center
                  transition-colors
                  duration-400
                "
              >
                {brand}
              </span>

              {/* Bottom accent line */}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-10 bg-brand-tan transition-all duration-500 ease-out rounded-full" />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByBrand;