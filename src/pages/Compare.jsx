import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiTrash2, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

import { useCompare } from "../context/CompareContext";
import { getImageUrl } from "../services/api";
import api from "../services/api";

const ROWS = [
  { key: "price", label: "Price", render: (p) => `₹${p.price}` },
  { key: "brand", label: "Brand" },
  { key: "category", label: "Category" },
  { key: "rating", label: "Rating", render: (p) => (p.rating ? `${p.rating} ★` : "—") },
  { key: "stock", label: "Stock", render: (p) => (p.stock > 0 ? `${p.stock} available` : "Out of stock") },
  { key: "sizes", label: "Sizes", render: (p) => (p.sizes?.length ? p.sizes.join(", ") : "—") },
];

const Compare = () => {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();
  const navigate = useNavigate();

  const [aiResult, setAiResult] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  useEffect(() => {
    if (compareItems.length < 2) return;

    setAiLoading(true);
    setAiError("");

    api
      .post("/ai/compare", { productIds: compareItems.map((p) => p.id) })
      .then((res) => {
        if (!res?.success) {
          throw new Error(res?.message || "Couldn't get an AI comparison.");
        }
        setAiResult(res.comparison || null);
      })
      .catch((err) => setAiError(err.message || "Couldn't get an AI comparison."))
      .finally(() => setAiLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compareItems.map((p) => p.id).join(",")]);

  const findProduct = (id) => compareItems.find((p) => p.id === id);

  if (compareItems.length < 2) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <HiSparkles className="text-6xl text-gray-300 mx-auto mb-6" />
        <h1 className="text-3xl font-serif text-brand-dark mb-4">Nothing to Compare Yet</h1>
        <p className="text-gray-500 mb-8">
          Pick at least 2 products using the compare icon on any product card, then come back here.
        </p>
        <Link to="/shop" className="inline-block bg-brand-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-brown transition">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-5 lg:px-8 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <div>
          <p className="uppercase tracking-[5px] text-brand-primary font-semibold text-sm">AI Powered</p>
          <h1 className="text-4xl font-serif text-brand-dark mt-2">Compare Products</h1>
        </div>
        <button
          onClick={() => { clearCompare(); navigate("/shop"); }}
          className="text-sm font-semibold text-red-600 hover:text-red-800 transition"
        >
          Clear & Browse More
        </button>
      </div>

      {/* AI Summary */}
      <div className="bg-brand-dark text-white rounded-3xl p-8 mb-10">
        <div className="flex items-center gap-3 mb-4">
          <HiSparkles className="text-brand-tan text-xl" />
          <h2 className="text-xl font-serif">AI Assistant's Take</h2>
        </div>

        {aiLoading ? (
          <div className="space-y-3">
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-5/6 rounded" />
            <div className="skeleton h-4 w-2/3 rounded" />
          </div>
        ) : aiError ? (
          <div className="flex items-start gap-3 text-brand-tan">
            <FiAlertCircle className="mt-0.5 shrink-0" />
            <p>{aiError}</p>
          </div>
        ) : aiResult ? (
          <>
            <p className="text-gray-200 leading-relaxed mb-6">{aiResult.summary}</p>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {aiResult.points?.map((point) => {
                const product = findProduct(point.productId);
                return (
                  <div key={point.label} className="bg-white/10 rounded-2xl p-4">
                    <p className="text-xs uppercase tracking-wide text-brand-tan mb-2">{point.label}</p>
                    {product && <p className="font-semibold">{product.name}</p>}
                    <p className="text-sm text-gray-300 mt-1">{point.reason}</p>
                  </div>
                );
              })}
            </div>

            {aiResult.recommendation && (
              <div className="flex items-start gap-3 bg-brand-tan/20 border border-brand-tan/40 rounded-2xl p-5">
                <FiCheckCircle className="text-brand-tan text-xl mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-brand-tan">
                    Our Pick: {findProduct(aiResult.recommendation.productId)?.name}
                  </p>
                  <p className="text-sm text-gray-200 mt-1">{aiResult.recommendation.reason}</p>
                </div>
              </div>
            )}
          </>
        ) : null}
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-3xl border border-gray-200">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-5 text-gray-400 text-sm font-medium w-40">Product</th>
              {compareItems.map((product) => (
                <th key={product.id} className="p-5 min-w-[180px]">
                  <div className="relative">
                    <button
                      onClick={() => removeFromCompare(product.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition flex items-center justify-center"
                      aria-label="Remove from comparison"
                    >
                      <FiTrash2 size={12} />
                    </button>
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={getImageUrl(product.image)}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-xl mb-3"
                      />
                      <p className="font-serif font-semibold text-brand-dark leading-snug">{product.name}</p>
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.key} className="border-t border-gray-200">
                <td className="p-5 text-gray-500 font-medium">{row.label}</td>
                {compareItems.map((product) => (
                  <td key={product.id} className="p-5 text-brand-dark">
                    {row.render ? row.render(product) : product[row.key] || "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Compare;
