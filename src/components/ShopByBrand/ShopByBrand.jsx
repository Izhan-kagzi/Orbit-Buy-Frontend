import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import FadeIn from "../Motion/FadeIn";

/* ------------------------------------------------------------------
   DATA
   `for` drives the filter tabs, `style` is the one-line description.
------------------------------------------------------------------ */
const BRANDS = [
  { name: "Zara", for: ["Women", "Men"], style: "Contemporary" },
  { name: "H&M", for: ["Women", "Men"], style: "Everyday essentials" },
  { name: "Adidas", for: ["Women", "Men", "Sport"], style: "Performance and lifestyle" },
  { name: "Jack & Jones", for: ["Men"], style: "Modern tailoring" },
  { name: "Diesel", for: ["Men", "Women"], style: "Denim culture" },
  { name: "Calvin Klein", for: ["Men", "Women"], style: "Minimal luxury" },
  { name: "D&G", for: ["Women", "Men"], style: "Italian luxury" },
  { name: "Versace", for: ["Women", "Men"], style: "Italian glamour" },
  { name: "Forever 21", for: ["Women"], style: "Youth fashion" },
  { name: "PrettyLittleThing", for: ["Women"], style: "Statement style" },
  { name: "Shein", for: ["Women", "Men"], style: "Trend forward" },
  { name: "Revolve", for: ["Women"], style: "Contemporary" },
  { name: "Wrangler", for: ["Men", "Women"], style: "Denim heritage" },
  { name: "Hugo Boss", for: ["Men"], style: "Luxury tailoring" },
];

const FILTERS = ["All", "Women", "Men", "Sport"];

const ShopByBrand = () => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const [filter, setFilter] = useState("All");
  const [activeName, setActiveName] = useState(BRANDS[0].name);

  const visible = useMemo(
    () =>
      filter === "All" ? BRANDS : BRANDS.filter((b) => b.for.includes(filter)),
    [filter]
  );

  // If the active brand is filtered out, fall back to the first visible one.
  const active = visible.find((b) => b.name === activeName) || visible[0];

  const goToBrand = (name) => {
    navigate(`/shop?brand=${encodeURIComponent(name)}`);
  };

  return (
    <section className="relative overflow-hidden bg-brand-tan py-20 text-brand-dark md:py-28">
      {/* Soft depth, nothing more */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-white/25 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-[420px] w-[420px] rounded-full bg-brand-dark/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* ---------------------------------------------------------
            HEADER
        --------------------------------------------------------- */}
        <FadeIn>
          <div className="mb-10 flex flex-col gap-8 md:mb-14 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
              Pick a label,
              <br />
              start shopping.
            </h2>

            <div className="max-w-sm">
              <p className="text-base leading-7 text-brand-dark/70">
                {BRANDS.length} brands in one store. Choose one to see its
                latest pieces.
              </p>
            </div>
          </div>

          {/* Filter tabs */}
          <div
            className="flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Filter brands"
          >
            {FILTERS.map((f) => {
              const selected = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setFilter(f)}
                  className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 focus-visible:ring-offset-brand-tan ${
                    selected
                      ? "border-brand-dark bg-brand-dark text-brand-tan"
                      : "border-brand-dark/25 text-brand-dark/75 hover:border-brand-dark hover:text-brand-dark"
                  }`}
                >
                  {f}
                </button>
              );
            })}

            <span className="ml-auto text-sm text-brand-dark/60" aria-live="polite">
              Showing {visible.length} {visible.length === 1 ? "brand" : "brands"}
            </span>
          </div>
        </FadeIn>

        {/* ---------------------------------------------------------
            INDEX + PREVIEW
        --------------------------------------------------------- */}
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Brand index */}
          <ul className="divide-y divide-brand-dark/15 border-y border-brand-dark/15 lg:col-span-7">
            {visible.map((brand) => {
              const isActive = active && brand.name === active.name;

              return (
                <li key={brand.name}>
                  <button
                    type="button"
                    onClick={() => goToBrand(brand.name)}
                    onMouseEnter={() => setActiveName(brand.name)}
                    onFocus={() => setActiveName(brand.name)}
                    className="group flex w-full items-center justify-between gap-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 focus-visible:ring-offset-brand-tan md:py-6"
                  >
                    <span className="min-w-0">
                      <span
                        className={`block break-words font-display text-4xl font-black leading-none tracking-tight transition-all duration-300 sm:text-5xl md:text-6xl ${
                          isActive
                            ? "text-brand-dark lg:translate-x-3"
                            : "text-brand-dark/80 lg:text-brand-dark/35"
                        }`}
                      >
                        {brand.name}
                      </span>

                      {/* On small screens the preview panel is hidden, so show the style here */}
                      <span className="mt-2 block text-sm text-brand-dark/60 lg:hidden">
                        {brand.style}
                      </span>
                    </span>

                    <span
                      aria-hidden="true"
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-lg transition-all duration-300 ${
                        isActive
                          ? "border-brand-dark bg-brand-dark text-brand-tan"
                          : "border-brand-dark/25 text-brand-dark/50"
                      }`}
                    >
                      ↗
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Preview panel (desktop) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative flex min-h-[460px] flex-col justify-between overflow-hidden rounded-[2rem] bg-brand-dark p-10 text-white">
                {/* Monogram */}
                <AnimatePresence mode="wait">
                  {active && (
                    <motion.span
                      key={`mono-${active.name}`}
                      aria-hidden="true"
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
                      transition={{ duration: 0.3 }}
                      className="pointer-events-none absolute -bottom-16 -right-6 select-none font-display text-[18rem] font-black leading-none text-brand-tan/10"
                    >
                      {active.name.charAt(0)}
                    </motion.span>
                  )}
                </AnimatePresence>

                <p className="relative text-sm text-white/50">
                  {active ? `Selected: ${active.for.join(", ")}` : ""}
                </p>

                <div className="relative">
                  <AnimatePresence mode="wait">
                    {active && (
                      <motion.div
                        key={active.name}
                        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <h3 className="break-words font-display text-5xl font-black leading-[0.95] tracking-tight xl:text-6xl">
                          {active.name}
                        </h3>

                        <p className="mt-4 text-lg text-white/70">
                          {active.style}
                        </p>

                        <button
                          type="button"
                          onClick={() => goToBrand(active.name)}
                          className="mt-8 inline-flex items-center gap-3 rounded-full bg-brand-tan px-7 py-3.5 text-sm font-bold text-brand-dark transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-tan focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
                        >
                          Shop {active.name}
                          <span aria-hidden="true">→</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------
            FOOTER ACTION
        --------------------------------------------------------- */}
        <div className="mt-14 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <p className="text-lg font-semibold">Not sure which brand?</p>

          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="inline-flex items-center gap-3 rounded-full border border-brand-dark px-7 py-3.5 text-sm font-bold transition-colors duration-300 hover:bg-brand-dark hover:text-brand-tan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 focus-visible:ring-offset-brand-tan"
          >
            Browse all products
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShopByBrand;