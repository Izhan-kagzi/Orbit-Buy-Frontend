import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import BestSellerCard from "./BestSellerCard";
import api, { getImageUrl } from "../../services/api";

const BestSellers = () => {
  const navigate = useNavigate();
  const [bestSellerData, setBestSellerData] = useState([]);

  useEffect(() => {
    api
      .get("/products?bestSeller=true&limit=50")
      .then((res) =>
        setBestSellerData(
          res.products.map((p) => ({ ...p, image: getImageUrl(p.image) }))
        )
      )
      .catch(() => setBestSellerData([]));
  }, []);

  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-16">

          <div>

            <p className="uppercase tracking-[6px] text-brand-primary text-sm font-semibold">
              Best Sellers
            </p>

            <h2 className="text-4xl lg:text-5xl font-black mt-3">
              Customer Favorites
            </h2>

            <p className="text-gray-500 mt-5 max-w-2xl">
              The most loved fashion pieces chosen by thousands of happy customers.
            </p>

          </div>

          <button
            onClick={() => navigate("/best-sellers")}
            className="group flex items-center gap-3 border border-brand-primary px-7 py-3 rounded-full font-semibold hover:bg-brand-primary hover:text-white transition"
          >
            View All

            <FiArrowRight className="group-hover:translate-x-1 transition" />

          </button>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {bestSellerData.map((product) => (

            <BestSellerCard
              key={product.id}
              product={product}
            />

          ))}

        </div>

      </div>

    </section>
  );
};

export default BestSellers;