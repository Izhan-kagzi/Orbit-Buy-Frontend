import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import ProductCard from "../ProductCard/ProductCard";
import ProductGridSkeleton from "../Skeleton/ProductGridSkeleton";
import api from "../../services/api";

const CategoryPage = ({ slug, title, description }) => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    api
      .get(`/products?slug=${slug}&limit=100`)
      .then((res) => setProducts(res.products))
      .catch(() =>
        setError("Couldn't load products. Is the backend running?")
      )
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <section className="max-w-7xl mx-auto py-12 px-6">

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="inline-flex items-center gap-3 px-5 py-3 mb-8 rounded-xl bg-gray-100 hover:bg-brand-brown hover:text-white transition-all duration-300 shadow-md hover:shadow-lg text-xl font-bold"
      >
        <FiArrowLeft className="text-xl" />
        <span className="font-medium">Back</span>
      </button>

      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-gray-500 mt-2">{description}</p>
      </div>

      {/* Products */}
      {loading ? (
        <ProductGridSkeleton count={9} columns="sm:grid-cols-2 lg:grid-cols-3" />
      ) : error ? (
        <p className="text-center text-gray-500 py-24">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500 py-24">
          No products found in this category yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </section>
  );
};

export default CategoryPage;
