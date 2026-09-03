import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import SearchBar from "../components/Search/SearchBar";
import SearchSuggestions from "../components/Search/SearchSuggestions";
import SearchFilters from "../components/Search/SearchFilters";
import SearchResults from "../components/Search/SearchResults";
import SearchEmpty from "../components/Search/SearchEmpty";
import RecentSearches from "../components/Search/RecentSearches";

import api from "../services/api";

const Search = () => {
  const [searchParams] = useSearchParams();

  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    api
      .get("/products?limit=500")
      .then((res) => setAllProducts(res.products))
      .catch(() => setAllProducts([]));
  }, []);

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("q") || ""
  );

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("Newest");

  const [recentSearches, setRecentSearches] =
    useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(
        localStorage.getItem("orbit_recent_searches")
      ) || [];

    setRecentSearches(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "orbit_recent_searches",
      JSON.stringify(recentSearches)
    );
  }, [recentSearches]);

  const saveRecentSearch = (value) => {
    if (!value.trim()) return;

    const updated = [
      value,
      ...recentSearches.filter(
        (item) =>
          item.toLowerCase() !==
          value.toLowerCase()
      ),
    ].slice(0, 8);

    setRecentSearches(updated);
  };

  const suggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];

    return allProducts
      .filter((item) =>
        (item.name || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
      .slice(0, 5);
  }, [searchTerm, allProducts]);

  const filteredProducts = useMemo(() => {
    let data = [...allProducts];

    if (searchTerm.trim()) {
      data = data.filter((item) => {
        const keyword =
          searchTerm.toLowerCase();

        return (
          (item.name || "")
            .toLowerCase()
            .includes(keyword) ||
          (item.category || "")
            .toLowerCase()
            .includes(keyword) ||
          (item.type || "")
            .toLowerCase()
            .includes(keyword)
        );
      });
    }

    if (selectedCategory !== "All") {
      data = data.filter(
        (item) =>
          item.category === selectedCategory
      );
    }

    switch (sortBy) {
      case "Price Low":
        data.sort(
          (a, b) => a.price - b.price
        );
        break;

      case "Price High":
        data.sort(
          (a, b) => b.price - a.price
        );
        break;

      case "Rating":
        data.sort(
          (a, b) => b.rating - a.rating
        );
        break;

      default:
        break;
    }

    return data;
  }, [
    allProducts,
    searchTerm,
    selectedCategory,
    sortBy,
  ]);

  return (
    <section className="bg-white min-h-screen py-12">

      <div className="max-w-7xl mx-auto px-5">

        <div className="text-center mb-12">

          <p className="uppercase tracking-[6px] text-brand-primary font-semibold">
            Search
          </p>

          <h1 className="text-5xl font-black mt-3">
            Find Your Perfect Product
          </h1>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Search thousands of premium fashion
            products across Orbit Buy.
          </p>

        </div>
                {/* Search Bar */}

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={() => saveRecentSearch(searchTerm)}
        />

        {/* Suggestions */}

        {searchTerm.trim() && suggestions.length > 0 && (

          <div className="mt-6">

            <SearchSuggestions
              suggestions={suggestions}
              onSelect={(product) => {
                setSearchTerm(product.name);
                saveRecentSearch(product.name);
              }}
            />

          </div>

        )}

        {/* Recent Searches */}

        {!searchTerm.trim() &&
          recentSearches.length > 0 && (

            <div className="mt-8">

              <RecentSearches
                searches={recentSearches}
                onSelect={(value) =>
                  setSearchTerm(value)
                }
                onClear={() => {
                  localStorage.removeItem(
                    "orbit_recent_searches"
                  );
                  setRecentSearches([]);
                }}
              />

            </div>

        )}

        {/* Filters */}

        <div className="mt-10">

          <SearchFilters
            selectedCategory={selectedCategory}
            setSelectedCategory={
              setSelectedCategory
            }
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

        </div>

        {/* Results */}
                <div className="mt-12">

          {/* Results Count */}

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-2xl font-bold">

              {filteredProducts.length > 0
                ? `${filteredProducts.length} Product${
                    filteredProducts.length > 1 ? "s" : ""
                  } Found`
                : "No Products Found"}

            </h2>

            {searchTerm && (
              <p className="text-gray-500">
                Showing results for
                <span className="font-semibold text-brand-dark">
                  {" "}
                  "{searchTerm}"
                </span>
              </p>
            )}

          </div>

          {/* Results */}

          {filteredProducts.length > 0 ? (

            <SearchResults
              products={filteredProducts}
            />

          ) : (

            <SearchEmpty
              searchTerm={searchTerm}
              onClear={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSortBy("Newest");
              }}
            />

          )}

        </div>

      </div>

    </section>
  );
};

export default Search;