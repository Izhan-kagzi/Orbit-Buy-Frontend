import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import ProductCard from "../components/ProductCard/ProductCard";
import ProductGridSkeleton from "../components/Skeleton/ProductGridSkeleton";
import SearchFilters from "../components/Search/SearchFilters";
import SearchEmpty from "../components/Search/SearchEmpty";

import api from "../services/api";

const PAGE_SIZE = 12;

const Shop = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const view =
    searchParams.get("view") ||
    location.pathname.replace("/", "") ||
    null;

  const brandParam = searchParams.get("brand") || "";

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [sortBy, setSortBy] = useState("Newest");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const heading = useMemo(() => {
    if (view === "best-sellers") return "Best Sellers";
    if (view === "new-arrivals") return "New Arrivals";
    if (view === "sale-men") return "Men's Sale";
    if (view === "sale-women") return "Women's Sale";
    if (view === "sale") return "Sale";
    if (brandParam) return brandParam;
    return "Shop All Products";
  }, [view, brandParam]);

  const isSaleView = view === "sale-men" || view === "sale-women" || view === "sale";

  // Reset to page 1 whenever a filter changes.
  useEffect(() => {
    setPage(1);
  }, [view, selectedCategory, sortBy, brandParam]);

  useEffect(() => {
    setLoading(true);

    const params = new URLSearchParams();
    params.set("limit", String(PAGE_SIZE));
    params.set("page", String(page));

    if (view === "best-sellers") params.set("bestSeller", "true");
    if (view === "new-arrivals") params.set("newArrival", "true");
    if (view === "sale-men") params.set("category", "Men");
    if (view === "sale-women") params.set("category", "Women");
    if (isSaleView) params.set("onSale", "true");
    if (brandParam) params.set("brand", brandParam);

    const sortParam =
      sortBy === "Price Low"
        ? "price_asc"
        : sortBy === "Price High"
        ? "price_desc"
        : sortBy === "Rating"
        ? "rating"
        : "";
    if (sortParam) params.set("sort", sortParam);

    if (selectedCategory !== "All" && view !== "sale-men" && view !== "sale-women") {
      params.set("category", selectedCategory);
    }

    api
      .get(`/products?${params.toString()}`)
      .then((res) => {
        setProducts(res.products);
        setTotalPages(res.pages || 1);
        setTotalCount(res.count || 0);
      })
      .catch(() => {
        setProducts([]);
        setTotalPages(1);
        setTotalCount(0);
      })
      .finally(() => setLoading(false));
  }, [view, selectedCategory, sortBy, brandParam, isSaleView, page]);

  const goToPage = (nextPage) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[6px] text-brand-primary font-semibold">
            Orbit Buy
          </p>
          <h1 className="text-5xl font-black mt-3">{heading}</h1>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            {isSaleView
              ? "Grab premium fashion at unbeatable discounted prices."
              : "Browse our full collection of premium fashion for men and women."}
          </p>
        </div>

        <SearchFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <div className="mt-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              {loading ? "Loading..." : `${totalCount} Product${totalCount !== 1 ? "s" : ""}`}
            </h2>
          </div>

          {loading ? (
            <ProductGridSkeleton count={12} />
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-14">
                  <button
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 1}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 font-semibold hover:border-brand-primary hover:text-brand-primary transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-inherit"
                  >
                    <FiChevronLeft />
                    Prev
                  </button>

                  <span className="text-gray-500 font-medium">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    onClick={() => goToPage(page + 1)}
                    disabled={page === totalPages}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 font-semibold hover:border-brand-primary hover:text-brand-primary transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-inherit"
                  >
                    Next
                    <FiChevronRight />
                  </button>
                </div>
              )}
            </>
          ) : (
            <SearchEmpty
              searchTerm=""
              onClear={() => setSelectedCategory("All")}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Shop;
