import { FiClock, FiTrash2 } from "react-icons/fi";

const RecentSearches = ({
  searches = [],
  onSelect,
  onClear,
}) => {
  if (!searches.length) return null;

  return (
    <div className="bg-white border rounded-3xl p-6 shadow-sm">

      <div className="flex items-center justify-between mb-6">

        <div className="flex items-center gap-2">

          <FiClock className="text-xl" />

          <h3 className="font-bold text-xl">
            Recent Searches
          </h3>

        </div>

        <button
          onClick={onClear}
          className="
            flex
            items-center
            gap-2
            text-red-500
            hover:text-red-600
            transition
          "
        >
          <FiTrash2 />

          Clear
        </button>

      </div>

      <div className="flex flex-wrap gap-3">

        {searches.map((item, index) => (

          <button
            key={index}
            onClick={() => onSelect(item)}
            className="
              px-5
              py-2
              rounded-full
              bg-gray-100
              hover:bg-brand-primary
              hover:text-white
              transition-all
            "
          >
            {item}
          </button>

        ))}

      </div>

    </div>
  );
};

export default RecentSearches;