import { useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import SearchBar from "./SearchBar";
import SearchSuggestions from "./SearchSuggestions";

const SearchOverlay = ({
  isOpen,
  onClose,
  searchTerm,
  setSearchTerm,
  suggestions = [],
  onSearch,
  onSelect,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        bg-brand-primary/70
        backdrop-blur-md
        animate-fadeIn
      "
    >
      {/* Close Overlay */}

      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      {/* Search Container */}

      <div
        className="
          relative
          mx-auto
          mt-8
          w-[95%]
          max-w-6xl
          bg-white
          rounded-3xl
          shadow-2xl
          overflow-hidden
          animate-slideDown
        "
      >
        {/* Header */}

        <div className="flex items-center justify-between px-8 py-6 border-b">

          <div className="flex items-center gap-3">

            <FiSearch className="text-2xl" />

            <h2 className="text-2xl font-bold">
              Search Products
            </h2>

          </div>

          <button
            onClick={onClose}
            className="
              w-12
              h-12
              rounded-full
              bg-gray-100
              hover:bg-brand-primary
              hover:text-white
              transition-all
              duration-300
              flex
              items-center
              justify-center
            "
          >
            <FiX size={22} />
          </button>

        </div>

        {/* Search */}

        <div className="p-8">

          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={onSearch}
          />

          {searchTerm && suggestions.length > 0 && (

            <div className="mt-6">

              <SearchSuggestions
                suggestions={suggestions}
                onSelect={(product) => {
                  onSelect?.(product);
                  onClose();
                }}
              />

            </div>

          )}

          {!searchTerm && (

            <div className="mt-12">

              <h3 className="text-xl font-bold mb-6">
                Popular Searches
              </h3>

              <div className="flex flex-wrap gap-4">

                {[
                  "Shirts",
                  "T-Shirts",
                  "Jeans",
                  "Wallet",
                  "Belts",
                  "Perfume",
                  "Shoes",
                  "Watches",
                ].map((item) => (

                  <button
                    key={item}
                    onClick={() => setSearchTerm(item)}
                    className="
                      px-6
                      py-3
                      rounded-full
                      border
                      border-gray-300
                      hover:bg-brand-primary
                      hover:text-white
                      hover:border-brand-primary
                      transition-all
                      duration-300
                    "
                  >
                    {item}
                  </button>

                ))}

              </div>

            </div>

          )}

        </div>

      </div>
    </div>
  );
};

export default SearchOverlay;