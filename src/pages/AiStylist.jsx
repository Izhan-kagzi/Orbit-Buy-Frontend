import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiSend,
  FiAlertCircle,
  FiShoppingCart,
  FiHeart,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

import api, { getImageUrl } from "../services/api";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const SUGGESTIONS = [
  "Casual outfit for a college hangout under ₹2000",
  "Something formal for a job interview",
  "Comfortable clothes for a weekend workout",
  "A festive look for a family celebration",
];

const AiStylist = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  const askAi = async (text) => {
    const finalQuery = text ?? query;

    if (!finalQuery.trim()) {
      setError("Please tell me what you're looking for.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await api.post("/ai/recommend", {
        query: finalQuery.trim(),
        category,
      });

      const data = res || {};

      if (!data.success) {
        throw new Error(data.message || "The AI stylist is unavailable right now.");
      }

      setResult({
        success: data.success ?? true,
        message: data.message || "Here are some recommendations for you.",
        recommendations: Array.isArray(data.recommendations)
          ? data.recommendations
          : [],
      });
    } catch (err) {
      console.error("AI Stylist error:", err);

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "The AI stylist is unavailable right now.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    askAi();
  };

  const handleSuggestion = (suggestion) => {
    setQuery(suggestion);
    askAi(suggestion);
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}
      <section className="bg-brand-dark py-20 px-6 text-center">
        <HiSparkles className="text-brand-tan text-4xl mx-auto mb-5" />

        <p className="uppercase tracking-[5px] text-brand-tan font-semibold text-sm">
          Orbit Buy
        </p>

        <h1 className="text-4xl md:text-5xl font-serif text-white mt-3">
          AI Stylist
        </h1>

        <p className="text-gray-300 max-w-xl mx-auto mt-5">
          Tell us what you're shopping for, and our AI will pick the best
          matches from our catalog for you.
        </p>

        {/* SEARCH FORM */}
        <form onSubmit={handleSubmit} className="w-full max-w-5xl mx-auto mt-10">
          <div className="flex flex-col md:flex-row items-stretch gap-3">

            {/* TEXT INPUT */}
            <div className="flex-1 min-w-0">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Office wear for men under ₹3000"
                className="block w-full h-16 px-6 rounded-full bg-white text-brand-dark placeholder-gray-400 border-2 border-white shadow-lg outline-none focus:border-brand-tan focus:ring-2 focus:ring-brand-tan/30 transition"
                disabled={loading}
                aria-label="What are you looking for?"
              />
            </div>

            {/* CATEGORY */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full md:w-40 h-16 px-5 rounded-full text-brand-dark bg-white border-2 border-white shadow-lg outline-none focus:border-brand-tan"
              disabled={loading}
              aria-label="Select category"
            >
              <option value="All">All</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
            </select>

            {/* ASK AI */}
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="w-full md:w-44 h-16 inline-flex items-center justify-center gap-2 bg-brand-tan text-brand-dark rounded-full font-semibold shadow-lg hover:bg-white hover:scale-[1.02] transition disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <FiSend size={18} />
              {loading ? "Thinking..." : "Ask AI"}
            </button>

          </div>
        </form>

        {/* SUGGESTIONS */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleSuggestion(suggestion)}
              disabled={loading}
              className="text-sm px-4 py-2 rounded-full bg-white/10 text-gray-200 hover:bg-white/20 hover:text-white transition disabled:opacity-50"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </section>

      {/* RESULTS */}
      <section className="max-w-6xl mx-auto px-5 lg:px-8 py-16">

        {/* LOADING */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow"
              >
                <div className="skeleton h-64 w-full" />

                <div className="p-5 space-y-3">
                  <div className="skeleton h-5 w-3/4 rounded" />
                  <div className="skeleton h-4 w-full rounded" />
                  <div className="skeleton h-4 w-2/3 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ERROR */}
        {error && !loading && (
          <div className="max-w-xl mx-auto text-center bg-red-50 border border-red-200 rounded-2xl p-8">
            <FiAlertCircle className="text-3xl text-red-500 mx-auto mb-4" />

            <p className="text-red-700">
              {error}
            </p>

            <button
              onClick={() => askAi()}
              className="mt-5 px-6 py-2.5 rounded-full bg-brand-primary text-white font-semibold hover:bg-brand-brown transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* AI RESULT */}
        {result && !loading && !error && (
          <>
            {/* AI MESSAGE */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10 flex items-start gap-4 shadow-sm">
              <HiSparkles className="text-brand-primary text-xl mt-1 shrink-0" />

              <p className="text-brand-dark leading-relaxed">
                {result.message}
              </p>
            </div>

            {/* NO PRODUCTS */}
            {result.recommendations.length === 0 ? (
              <div className="text-center py-10">
                <HiSparkles className="text-4xl mx-auto mb-4 text-gray-300" />

                <p className="text-gray-500">
                  No matching products found — try rephrasing your request.
                </p>
              </div>
            ) : (

              /* PRODUCT GRID */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {result.recommendations.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
                  >

                    {/* PRODUCT IMAGE */}
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={getImageUrl(product.image)}
                        alt={product.name}
                        className="w-full h-64 object-cover"
                      />
                    </Link>

                    <div className="p-5">

                      {/* PRODUCT NAME */}
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-serif font-semibold text-brand-dark hover:text-brand-primary transition">
                          {product.name}
                        </h3>
                      </Link>

                      {/* PRICE */}
                      <p className="text-brand-primary font-bold mt-2">
                        ₹{product.price}
                      </p>

                      {/* AI REASON */}
                      <div className="mt-3 flex items-start gap-2 bg-gray-50 rounded-xl p-3">
                        <HiSparkles
                          className="text-brand-primary shrink-0 mt-0.5"
                          size={14}
                        />

                        <p className="text-sm text-gray-600">
                          {product.reason ||
                            "Recommended based on your preferences."}
                        </p>
                      </div>

                      {/* ACTIONS */}
                      <div className="mt-4 flex gap-2">

                        {/* CART */}
                        <button
                          onClick={() => addToCart(product)}
                          disabled={product.stock <= 0}
                          className="flex-1 bg-brand-primary text-white py-2.5 rounded-full text-sm font-semibold hover:bg-brand-brown transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FiShoppingCart size={14} />

                          {product.stock <= 0
                            ? "Sold Out"
                            : "Add to Cart"}
                        </button>

                        {/* WISHLIST */}
                        <button
                          type="button"
                          onClick={() => addToWishlist(product)}
                          className={`w-11 rounded-full flex items-center justify-center transition ${
                            isInWishlist(product.id)
                              ? "bg-red-500 text-white"
                              : "bg-gray-100 hover:bg-red-500 hover:text-white"
                          }`}
                          aria-label="Add to wishlist"
                        >
                          <FiHeart size={15} />
                        </button>

                      </div>
                    </div>
                  </div>
                ))}

              </div>
            )}
          </>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && !result && (
          <div className="text-center text-gray-400 py-10">
            <HiSparkles className="text-4xl mx-auto mb-4 text-gray-300" />

            <p>
              Ask above and your personalized picks will show up here.
            </p>
          </div>
        )}

      </section>
    </div>
  );
};

export default AiStylist;