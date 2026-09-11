import { useMemo, useState, useEffect } from "react";

const STORAGE_KEY = "orbit_recent_searches";

const useSearch = (products = []) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [recentSearches, setRecentSearches] =
    useState([]);

  // Load Recent Searches

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    setRecentSearches(saved);
  }, []);

  // Save Recent Searches

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(recentSearches)
    );
  }, [recentSearches]);

  // Save Search

  const saveSearch = (value) => {
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

  // Clear Recent Searches

  const clearRecentSearches = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRecentSearches([]);
  };

  // Suggestions

  const suggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];

    return products
      .filter((item) =>
        item.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
      .slice(0, 6);
  }, [products, searchTerm]);

  // Filter Products

  const filteredProducts = useMemo(() => {
    let data = [...products];

    if (searchTerm.trim()) {
      const keyword = searchTerm.toLowerCase();

      data = data.filter((item) => {
        return (
          item.name
            .toLowerCase()
            .includes(keyword) ||
          item.category
            .toLowerCase()
            .includes(keyword) ||
          (item.type || "")
            .toLowerCase()
            .includes(keyword) ||
          (item.brand || "")
            .toLowerCase()
            .includes(keyword)
        );
      });
    }

    if (selectedCategory !== "All") {
      data = data.filter(
        (item) => item.category === selectedCategory
      );
    }

    switch (sortBy) {
      case "Price Low":
        data.sort((a, b) => a.price - b.price);
        break;

      case "Price High":
        data.sort((a, b) => b.price - a.price);
        break;

      case "Rating":
        data.sort(
          (a, b) => (b.rating || 0) - (a.rating || 0)
        );
        break;

      case "Newest":
      default:
        data.sort((a, b) => b.id - a.id);
        break;
    }

    return data;
  }, [
    products,
    searchTerm,
    selectedCategory,
    sortBy,
  ]);

  // Reset Filters

  const resetSearch = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortBy("Newest");
  };

  return {
    // State
    searchTerm,
    selectedCategory,
    sortBy,
    recentSearches,

    // Data
    suggestions,
    filteredProducts,

    // Setters
    setSearchTerm,
    setSelectedCategory,
    setSortBy,

    // Functions
    saveSearch,
    clearRecentSearches,
    resetSearch,
  };
};

export default useSearch;