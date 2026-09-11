import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { getImageUrl } from "../../services/api";

const WishlistCard = ({ product }) => {
  const { addToCart } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const liked = isInWishlist(product.id);

  const handleWishlist = () => {
    if (liked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group">

      {/* Product Image */}
      <div className="relative overflow-hidden">

        <img
          src={getImageUrl(product.image)}
          alt={product.name}
          className="w-full h-96 object-cover group-hover:scale-105 transition duration-500"
        />

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition ${
            liked
              ? "bg-red-500 text-white"
              : "bg-white text-gray-700 hover:bg-red-500 hover:text-white"
          }`}
        >
          <FiHeart
            size={20}
            className={liked ? "fill-current" : ""}
          />
        </button>

      </div>

      {/* Product Details */}
      <div className="p-5">

        <h3 className="text-xl font-semibold text-gray-800">
          {product.name}
        </h3>

        <p className="text-brand-primary text-2xl font-bold mt-3">
          ₹{product.price}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-brand-primary text-white py-3 rounded-lg hover:bg-brand-brown transition"
        >
          <FiShoppingCart />
          Add to Cart
        </button>

      </div>

    </div>
  );
};

export default WishlistCard;