import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import ProductCard from "../NewArrivals/ProductCard";

const RelatedProducts = ({
  currentProduct,
  products,
}) => {
  const navigate = useNavigate();

  const relatedProducts = useMemo(() => {
    return products
      .filter((item) => {
        if (item.id === currentProduct.id) return false;

        return (
          item.category === currentProduct.category ||
          item.type === currentProduct.type
        );
      })
      .slice(0, 4);
  }, [products, currentProduct]);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-24">

      {/* Header */}

      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12">

        <div>

          <p className="uppercase tracking-[5px] text-brand-primary text-sm font-semibold">
            You May Also Like
          </p>

          <h2 className="text-4xl font-black mt-2">
            Related Products
          </h2>

          <p className="text-gray-500 mt-3 max-w-xl">
            Explore more premium products carefully selected
            based on your current choice.
          </p>

        </div>

        <button
          onClick={() => navigate("/")}
          className="
            group
            flex
            items-center
            gap-3
            border
            border-brand-primary
            px-7
            py-3
            rounded-full
            font-semibold
            hover:bg-brand-primary
            hover:text-white
            transition-all
          "
        >
          View More

          <FiArrowRight
            className="
              transition-transform
              group-hover:translate-x-1
            "
          />

        </button>

      </div>

      {/* Products */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

      {/* View All Products */}

      <div className="flex justify-center mt-14">

        <button
          onClick={() => navigate("/")}
          className="
            bg-brand-primary
            text-white
            px-10
            py-4
            rounded-full
            font-semibold
            hover:bg-brand-brown
            transition-all
            duration-300
            hover:scale-105
          "
        >
          Explore All Products
        </button>

      </div>

    </section>
  );
};

export default RelatedProducts;