import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { getImageUrl } from "../../services/api";

const SearchSuggestions = ({
  suggestions = [],
  onSelect,
}) => {
  if (!suggestions.length) return null;

  return (
    <div
      className="
        w-full
        max-w-4xl
        mx-auto
        bg-white
        rounded-3xl
        shadow-2xl
        border
        border-gray-200
        overflow-hidden
      "
    >
      {/* Header */}

      <div className="px-6 py-4 border-b bg-gray-50">

        <h3 className="font-bold text-lg">
          Suggested Products
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Click a product to view details
        </p>

      </div>

      {/* Suggestions */}

      <div className="divide-y divide-gray-100">

        {suggestions.map((product) => (

          <Link
            key={product.id}
            to={`/product/${product.id}`}
            onClick={() => onSelect?.(product)}
            className="
              flex
              items-center
              gap-5
              p-5
              hover:bg-gray-50
              transition-all
              duration-300
            "
          >

            {/* Image */}

            <img
              src={getImageUrl(product.image)}
              alt={product.name}
              className="
                w-20
                h-20
                rounded-2xl
                object-cover
                border
              "
            />

            {/* Info */}

            <div className="flex-1 min-w-0">

              <h4 className="font-bold text-lg truncate">
                {product.name}
              </h4>

              <p className="text-gray-500 text-sm mt-1">
                {product.category}
                {product.type && ` • ${product.type}`}
              </p>

              <div className="flex items-center gap-3 mt-3">

                <span className="font-bold text-xl">
                  ₹{product.price}
                </span>

                {product.oldPrice > product.price && (
                  <span className="text-gray-400 line-through">
                    ₹{product.oldPrice}
                  </span>
                )}

              </div>

            </div>

            {/* Arrow */}

            <div
              className="
                w-12
                h-12
                rounded-full
                bg-brand-primary
                text-white
                flex
                items-center
                justify-center
                shrink-0
                transition-transform
                duration-300
                group-hover:rotate-45
              "
            >
              <FiArrowUpRight size={20} />
            </div>

          </Link>

        ))}

      </div>

      {/* Footer */}

      <div className="px-6 py-4 bg-gray-50 text-center">

        <p className="text-sm text-gray-500">
          {suggestions.length} suggestion
          {suggestions.length > 1 ? "s" : ""} found
        </p>

      </div>

    </div>
  );
};

export default SearchSuggestions;