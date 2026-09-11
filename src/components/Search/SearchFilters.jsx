import SortDropdown from "./SortDropdown";

const SearchFilters = ({
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
}) => {
  // Orbit Buy sells men's & women's clothing only — no accessories,
  // perfume, wallets, or belts, so the filter list only ever shows
  // categories that actually exist in the catalog.
  const categories = ["All", "Men", "Women"];

  const sortOptions = [
    "Newest",
    "Price Low",
    "Price High",
    "Rating",
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-5 justify-between items-center bg-gray-50 p-6 rounded-2xl border border-gray-200">

      <div className="flex flex-wrap gap-3">

        {categories.map((category) => (

          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`
              px-5
              py-2
              rounded-full
              transition-all
              duration-300
              font-medium

              ${
                selectedCategory === category
                  ? "bg-brand-primary text-white"
                  : "bg-white border border-gray-200 hover:bg-brand-primary hover:text-white"
              }
            `}
          >
            {category}
          </button>

        ))}

      </div>

      <SortDropdown value={sortBy} onChange={setSortBy} options={sortOptions} />

    </div>
  );
};

export default SearchFilters;
