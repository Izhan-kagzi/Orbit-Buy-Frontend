import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";

import api, { getImageUrl } from "../../services/api";

const POPULAR_SEARCHES = [
  "Shirts",
  "T-Shirts",
  "Jeans",
  "Hoodies",
  "Dresses",
  "Party Wear",
];

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      api
        .get(`/products?q=${encodeURIComponent(query.trim())}&limit=6`)
        .then((res) => setResults(res.products))
        .catch(() => setResults([]));
    }, 250);

    return () => clearTimeout(timeout);
  }, [query]);

  if (!isOpen) return null;

  const runSearch = (term) => {
    const value = term ?? query;
    if (!value.trim()) return;
    navigate(`/search?q=${encodeURIComponent(value.trim())}`);
    setQuery("");
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runSearch();
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-brand-dark/60 backdrop-blur-md flex items-start justify-center px-5 overflow-y-auto py-24 sm:py-32 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white/95 rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-10 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-serif text-brand-dark">Search Products</h2>
          <button
            onClick={onClose}
            className="w-11 h-11 rounded-full border border-gray-200 hover:bg-brand-dark hover:text-white hover:border-brand-dark transition flex items-center justify-center"
            aria-label="Close search"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-primary" size={22} />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search shirts, jeans, dresses..."
            className="w-full pl-16 pr-6 py-5 rounded-full border border-gray-200 bg-white text-lg outline-none focus:border-brand-primary transition"
          />
        </form>

        {results.length > 0 ? (
          <div className="mt-8 space-y-2 max-h-80 overflow-y-auto">
            {results.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                onClick={onClose}
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition"
              >
                <img
                  src={getImageUrl(product.image)}
                  alt={product.name}
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-brand-dark truncate">{product.name}</p>
                  <p className="text-sm text-gray-500">₹{product.price}</p>
                </div>
              </Link>
            ))}

            <button
              onClick={() => runSearch()}
              className="w-full text-center text-brand-primary font-semibold py-3 hover:underline"
            >
              See all results for "{query}"
            </button>
          </div>
        ) : (
          <div className="mt-10">
            <h3 className="uppercase tracking-[3px] text-brand-primary font-semibold mb-5 text-sm">
              Popular Searches
            </h3>

            <div className="flex flex-wrap gap-3">
              {POPULAR_SEARCHES.map((item) => (
                <button
                  key={item}
                  onClick={() => runSearch(item)}
                  className="px-5 py-2.5 rounded-full bg-gray-100 border border-gray-200 hover:bg-brand-dark hover:text-white hover:border-brand-dark transition"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
