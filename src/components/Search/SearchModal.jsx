import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiSearch, FiX, FiArrowUpRight } from "react-icons/fi";

import api, { getImageUrl } from "../../services/api";

const POPULAR_SEARCHES = [
  "Shirt",
  "T-Shirt",
  "Jeans",
  "Hoodie",
  "Dress",
  "Party Wear",
  "Jumpsuit",
  "Track Pant",
  "Cord Set",
  "Skirts",
];

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
      setLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const timeout = setTimeout(() => {
      api
        .get(`/products?q=${encodeURIComponent(query.trim())}&limit=6`)
        .then((res) => {
          setResults(res.products || []);
        })
        .catch(() => {
          setResults([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

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

  const hasQuery = query.trim().length > 0;

  return (
    <div
      className="
        fixed inset-0 z-[100]
        bg-brand-dark/70
        backdrop-blur-xl
        flex items-start justify-center
        px-4 sm:px-6
        py-16 sm:py-24
        overflow-y-auto
        animate-fadeIn
      "
      onClick={onClose}
    >
      <div
        className="
          relative
          w-full max-w-3xl
          overflow-hidden
          rounded-[2rem]
          bg-white
          shadow-[0_30px_100px_rgba(0,0,0,0.35)]
          border border-white/20
          animate-scale-in
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Premium top accent */}
        <div className="h-1 w-full bg-gradient-to-r from-brand-dark via-brand-primary to-brand-dark" />

        <div className="p-5 sm:p-8 md:p-10">
          {/* Header */}
          <div className="flex items-start justify-between gap-6 mb-7">
            <div>
              <p className="text-[11px] uppercase tracking-[4px] text-brand-primary font-semibold mb-2">
                Discover
              </p>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-brand-dark leading-tight">
                Find something
                <span className="block italic font-normal">
                  extraordinary.
                </span>
              </h2>
            </div>

            <button
              onClick={onClose}
              className="
                shrink-0
                w-11 h-11
                rounded-full
                border border-gray-200
                bg-white
                text-gray-600
                flex items-center justify-center
                hover:bg-brand-dark
                hover:text-white
                hover:border-brand-dark
                hover:rotate-90
                transition-all duration-300
              "
              aria-label="Close search"
            >
              <FiX size={19} />
            </button>
          </div>

          {/* Search box */}
          <form onSubmit={handleSubmit}>
            <div
              className="
                relative
                group
                rounded-2xl
                border border-gray-200
                bg-gray-50
                transition-all duration-300
                focus-within:bg-white
                focus-within:border-brand-primary
                focus-within:shadow-[0_10px_35px_rgba(0,0,0,0.08)]
              "
            >
              <FiSearch
                className="
                  absolute left-5 sm:left-6
                  top-1/2
                  -translate-y-1/2
                  text-brand-primary
                  transition-transform
                  group-focus-within:scale-110
                "
                size={22}
              />

              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search shirts, jeans, dresses..."
                className="
                  w-full
                  pl-14 sm:pl-16
                  pr-14
                  py-5
                  bg-transparent
                  text-base sm:text-lg
                  text-brand-dark
                  placeholder:text-gray-400
                  outline-none
                "
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="
                    absolute right-4
                    top-1/2
                    -translate-y-1/2
                    w-8 h-8
                    rounded-full
                    bg-gray-200
                    text-gray-500
                    flex items-center justify-center
                    hover:bg-brand-dark
                    hover:text-white
                    transition
                  "
                  aria-label="Clear search"
                >
                  <FiX size={15} />
                </button>
              )}
            </div>
          </form>

          {/* Search results */}
          {hasQuery ? (
            <div className="mt-7">
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="
                        flex items-center gap-4
                        p-3
                        rounded-2xl
                        animate-pulse
                      "
                    >
                      <div className="w-16 h-16 rounded-xl bg-gray-200" />

                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-2/3 bg-gray-200 rounded" />
                        <div className="h-3 w-1/4 bg-gray-200 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : results.length > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs uppercase tracking-[2px] text-gray-400 font-semibold">
                      Products
                    </p>

                    <span className="text-xs text-gray-400">
                      {results.length} found
                    </span>
                  </div>

                  <div className="space-y-1 max-h-[360px] overflow-y-auto pr-1">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={onClose}
                        className="
                          group
                          flex items-center gap-4
                          p-3
                          rounded-2xl
                          hover:bg-gray-50
                          transition-all duration-200
                        "
                      >
                        {/* Product image */}
                        <div
                          className="
                            relative
                            w-16 h-16
                            rounded-xl
                            overflow-hidden
                            bg-gray-100
                            shrink-0
                          "
                        >
                          <img
                            src={getImageUrl(product.image)}
                            alt={product.name}
                            className="
                              w-full h-full
                              object-cover
                              transition-transform duration-500
                              group-hover:scale-110
                            "
                          />
                        </div>

                        {/* Product details */}
                        <div className="min-w-0 flex-1">
                          <p
                            className="
                              font-semibold
                              text-brand-dark
                              truncate
                              group-hover:text-brand-primary
                              transition
                            "
                          >
                            {product.name}
                          </p>

                          <p className="mt-1 text-sm font-medium text-gray-500">
                            ₹{Number(product.price).toLocaleString("en-IN")}
                          </p>
                        </div>

                        {/* Arrow */}
                        <div
                          className="
                            w-9 h-9
                            rounded-full
                            border border-gray-200
                            flex items-center justify-center
                            text-gray-400
                            group-hover:bg-brand-dark
                            group-hover:text-white
                            group-hover:border-brand-dark
                            transition-all
                            shrink-0
                          "
                        >
                          <FiArrowUpRight size={16} />
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* See all */}
                  <button
                    onClick={() => runSearch()}
                    className="
                      group
                      w-full
                      mt-5
                      py-4
                      rounded-2xl
                      bg-brand-dark
                      text-white
                      font-semibold
                      flex items-center justify-center gap-2
                      hover:bg-brand-primary
                      transition-all duration-300
                    "
                  >
                    See all results
                    <FiArrowUpRight
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"
                    />
                  </button>
                </>
              ) : (
                /* No results */
                <div className="py-10 text-center">
                  <div
                    className="
                      mx-auto
                      w-16 h-16
                      rounded-full
                      bg-gray-100
                      flex items-center justify-center
                      text-gray-400
                      mb-4
                    "
                  >
                    <FiSearch size={24} />
                  </div>

                  <h3 className="text-lg font-semibold text-brand-dark">
                    No products found
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Try searching for something else.
                  </p>

                  <button
                    onClick={() => setQuery("")}
                    className="
                      mt-5
                      text-sm
                      font-semibold
                      text-brand-primary
                      hover:underline
                    "
                  >
                    Browse popular searches
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Popular searches */
            <div className="mt-9">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-[11px] uppercase tracking-[3px] text-brand-primary font-semibold">
                    Explore
                  </p>

                  <h3 className="mt-1 text-lg font-semibold text-brand-dark">
                    Popular searches
                  </h3>
                </div>

                <span className="hidden sm:block text-xs text-gray-400">
                  Trending now
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {POPULAR_SEARCHES.map((item) => (
                  <button
                    key={item}
                    onClick={() => runSearch(item)}
                    className="
                      group
                      px-4 sm:px-5
                      py-2.5
                      rounded-full
                      border border-gray-200
                      bg-white
                      text-sm
                      font-medium
                      text-gray-700
                      hover:bg-brand-dark
                      hover:text-white
                      hover:border-brand-dark
                      hover:-translate-y-0.5
                      transition-all duration-200
                    "
                  >
                    <span className="flex items-center gap-1.5">
                      {item}
                      <FiArrowUpRight
                        size={13}
                        className="
                          opacity-0
                          -translate-x-1
                          group-hover:opacity-100
                          group-hover:translate-x-0
                          transition-all
                        "
                      />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bottom hint */}
          <div className="hidden sm:flex items-center justify-center gap-2 mt-8 pt-6 border-t border-gray-100">
            <span className="text-[11px] text-gray-400 uppercase tracking-wider">
              Press
            </span>

            <kbd
              className="
                px-2 py-1
                rounded-md
                bg-gray-100
                border border-gray-200
                text-[10px]
                text-gray-500
                font-medium
              "
            >
              ESC
            </kbd>

            <span className="text-[11px] text-gray-400 uppercase tracking-wider">
              to close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
