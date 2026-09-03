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
  "Gul Ahmed",
];

const ShopByBrand = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6">

        <FadeIn className="text-center mb-12">
          <p className="uppercase tracking-[6px] text-brand-tan font-semibold">
            Curated Labels
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3">
            Shop by Brand
          </h2>
          <p className="text-gray-300 mt-4 max-w-xl mx-auto">
            Explore pieces from the labels you love, all in one place.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
          {BRANDS.map((brand, index) => (
            <motion.button
              key={brand}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                navigate(`/shop?brand=${encodeURIComponent(brand)}`)
              }
              className="
                group
                aspect-[3/2]
                rounded-2xl
                bg-white/5
                border border-white/10
                hover:border-brand-tan
                hover:bg-white/10
                transition-colors
                duration-300
                flex
                items-center
                justify-center
                px-4
              "
            >
              <span
                className="
                  text-white
                  group-hover:text-brand-tan
                  font-bold
                  text-lg
                  md:text-xl
                  tracking-wide
                  text-center
                  transition-colors
                  duration-300
                "
              >
                {brand}
              </span>
            </motion.button>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ShopByBrand;
