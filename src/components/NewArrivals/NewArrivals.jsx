import { useEffect, useMemo, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import ProductCard from "./ProductCard";
import api, { getImageUrl } from "../../services/api";

const NewArrivals = () => {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("All");
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    api
      .get("/products?newArrival=true&limit=50")
      .then((res) =>
        setProductsData(
          res.products.map((p) => ({ ...p, image: getImageUrl(p.image) }))
        )
      )
      .catch(() => setProductsData([]));
  }, []);

  const categories = [
    "All",
    "Men",
    "Women",
  ];

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") {
      return productsData;
    }

    return productsData.filter(
      (product) => product.category === activeCategory
    );
  }, [activeCategory, productsData]);

  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

          <div>

            <p className="uppercase tracking-[6px] text-brand-primary font-semibold text-sm">
              New Arrivals
            </p>

            <h2 className="text-4xl lg:text-5xl font-black mt-3">
              Fresh Fashion Collection
            </h2>

            <p className="text-gray-500 mt-5 max-w-2xl">
              Discover the latest premium styles, carefully curated
              to keep your wardrobe modern, elegant and timeless.
            </p>

          </div>

          <button
            onClick={() => navigate("/new-arrivals")}
            className="group flex items-center gap-3 border border-brand-primary px-7 py-3 rounded-full font-semibold hover:bg-brand-primary hover:text-white transition"
          >
            View All

            <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />

          </button>

        </div>

        {/* Category Filter */}

        <div className="flex flex-wrap justify-center gap-4 mt-16">

          {categories.map((category) => (

            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-7 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? "bg-brand-primary text-white"
                  : "bg-gray-100 hover:bg-brand-primary hover:text-white"
              }`}
            >
              {category}
            </button>

          ))}

        </div>

        {/* Products */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {filteredProducts.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}
                    

        </div>

        {/* Empty State */}

        {filteredProducts.length === 0 && (

          <div className="py-20 text-center">

            <h3 className="text-3xl font-bold">
              No Products Found
            </h3>

            <p className="text-gray-500 mt-4">
              We couldn't find products in this category.
            </p>

          </div>

        )}

        {/* Bottom Banner */}

        <div className="mt-24 rounded-3xl bg-gradient-to-r from-brand-dark via-gray-900 to-brand-dark text-white px-8 lg:px-16 py-16 flex flex-col lg:flex-row items-center justify-between gap-8">

          <div>

            <p className="uppercase tracking-[5px] text-brand-tan text-sm">
              Exclusive Offer
            </p>

            <h2 className="text-4xl lg:text-5xl font-black mt-3">
              Up To 50% OFF
            </h2>

            <p className="text-gray-300 mt-5 max-w-xl leading-8">
              Discover premium collections at exclusive prices.
              Limited-time offers on our best-selling products.
            </p>

          </div>

          <button
            onClick={() => navigate("/")}
            className="bg-white text-brand-dark px-10 py-4 rounded-full font-semibold hover:bg-brand-brown hover:text-white transition duration-300"
          >
            Shop Now
          </button>

        </div>

      </div>

    </section>
  );
};

export default NewArrivals;