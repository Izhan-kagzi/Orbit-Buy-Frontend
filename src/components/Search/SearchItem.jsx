import { FiArrowUpRight } from "react-icons/fi";
import { getImageUrl } from "../../services/api";

const SearchItem = ({ product, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition duration-300 border-b last:border-b-0 text-left group"
    >
      {/* Product Image */}
      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
        <img
          src={getImageUrl(product.image)}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 truncate group-hover:text-brand-primary transition">
          {product.name}
        </h3>

        {product.category && (
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">
            {product.category}
          </p>
        )}

        <p className="text-brand-primary font-bold mt-2">
          ₹{product.price}
        </p>
      </div>

      {/* Arrow */}
      <div className="text-gray-400 group-hover:text-brand-primary group-hover:translate-x-1 transition duration-300">
        <FiArrowUpRight size={20} />
      </div>
    </button>
  );
};

export default SearchItem;