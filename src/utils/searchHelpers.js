// src/utils/searchHelpers.js

// -----------------------------
// Search Products
// -----------------------------

export const searchProducts = (products = [], keyword = "") => {
  if (!keyword.trim()) return products;

  const query = keyword.toLowerCase().trim();

  return products.filter((product) => {
    return (
      product.name?.toLowerCase().includes(query) ||
      product.category?.toLowerCase().includes(query) ||
      product.type?.toLowerCase().includes(query) ||
      product.brand?.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query)
    );
  });
};

// -----------------------------
// Filter By Category
// -----------------------------

export const filterByCategory = (
  products = [],
  category = "All"
) => {
  if (category === "All") return products;

  return products.filter(
    (product) => product.category === category
  );
};

// -----------------------------
// Sort Products
// -----------------------------

export const sortProducts = (
  products = [],
  sortBy = "Newest"
) => {
  const sorted = [...products];

  switch (sortBy) {
    case "Price Low":
      return sorted.sort((a, b) => a.price - b.price);

    case "Price High":
      return sorted.sort((a, b) => b.price - a.price);

    case "Rating":
      return sorted.sort(
        (a, b) => (b.rating || 0) - (a.rating || 0)
      );

    case "Discount":
      return sorted.sort((a, b) => {
        const discountA =
          ((a.oldPrice - a.price) / a.oldPrice) * 100 || 0;

        const discountB =
          ((b.oldPrice - b.price) / b.oldPrice) * 100 || 0;

        return discountB - discountA;
      });

    case "Newest":
    default:
      return sorted.sort((a, b) => b.id - a.id);
  }
};

// -----------------------------
// Search Suggestions
// -----------------------------

export const getSuggestions = (
  products = [],
  keyword = "",
  limit = 6
) => {
  if (!keyword.trim()) return [];

  const query = keyword.toLowerCase();

  return products
    .filter((product) =>
      product.name?.toLowerCase().includes(query)
    )
    .slice(0, limit);
};

// -----------------------------
// Calculate Discount
// -----------------------------

export const calculateDiscount = (
  price,
  oldPrice
) => {
  if (!oldPrice || oldPrice <= price) return 0;

  return Math.round(
    ((oldPrice - price) / oldPrice) * 100
  );
};

// -----------------------------
// Get Unique Categories
// -----------------------------

export const getCategories = (products = []) => {
  const categories = products.map(
    (product) => product.category
  );

  return ["All", ...new Set(categories)];
};

// -----------------------------
// Filter By Price Range
// -----------------------------

export const filterByPrice = (
  products = [],
  min = 0,
  max = Infinity
) => {
  return products.filter(
    (product) =>
      product.price >= min &&
      product.price <= max
  );
};

// -----------------------------
// Filter By Rating
// -----------------------------

export const filterByRating = (
  products = [],
  rating = 0
) => {
  return products.filter(
    (product) => (product.rating || 0) >= rating
  );
};

// -----------------------------
// Get Related Products
// -----------------------------

export const getRelatedProducts = (
  products = [],
  currentProduct,
  limit = 4
) => {
  if (!currentProduct) return [];

  return products
    .filter(
      (product) =>
        product.id !== currentProduct.id &&
        (
          product.category === currentProduct.category ||
          product.type === currentProduct.type
        )
    )
    .slice(0, limit);
};

// -----------------------------
// Format Price
// -----------------------------

export const formatPrice = (price = 0) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};