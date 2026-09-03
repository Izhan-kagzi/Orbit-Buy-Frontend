import { FiTrash2, FiShoppingCart } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { getImageUrl } from "../../services/api";

const WishlistItem = ({ item }) => {
  const { addToCart } = useCart();
  const { removeFromWishlist } = useWishlist();

  const handleMoveToCart = () => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={getImageUrl(item.image)}
          alt={item.name}
          className="w-full h-80 object-cover hover:scale-105 transition duration-500"
        />
      </div>

      {/* Details */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800">
          {item.name}
        </h3>

        <p className="text-brand-primary text-2xl font-bold mt-3">
          ₹{item.price}
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={handleMoveToCart}
            className="flex-1 flex items-center justify-center gap-2 bg-brand-primary text-white py-3 rounded-lg hover:bg-brand-brown transition"
          >
            <FiShoppingCart />
            Add to Cart
          </button>

          <button
            onClick={() => removeFromWishlist(item.id)}
            className="w-14 flex items-center justify-center border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
          >
            <FiTrash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;