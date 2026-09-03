import { useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { getImageUrl } from "../../services/api";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const wishlistActive = isInWishlist(product.id);

  const isOutOfStock = (product.stock ?? 1) <= 0;
  const isLimitedStock = !isOutOfStock && (product.stock ?? 99) <= 5;

  const discount =
    product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) /
            product.oldPrice) *
            100
        )
      : 0;

  const handleWishlist = () => {
    if (wishlistActive) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist");
    }
  };

  const handleCart = () => {
    if (isOutOfStock) return;
    addToCart(product);
    toast.success("Added to cart");
  };

  return (
    <div
      className="
      group
      bg-white
      rounded-3xl
      overflow-hidden
      shadow-md
      hover:shadow-2xl
      transition-all
      duration-500
      hover:-translate-y-2
      "
    >
      {/* Image */}

      <div className="relative overflow-hidden">

        <img
          src={getImageUrl(product.image)}
          alt={product.name}
          onClick={() => navigate(`/product/${product.id}`)}
          className="
          w-full
          h-[340px]
          object-cover
          transition-transform
          duration-700
          group-hover:scale-110
          cursor-pointer
          "
        />

        {/* Discount Badge */}

        {discount > 0 && !isOutOfStock && (
          <span
            className="
            absolute
            top-4
            left-4
            bg-red-500
            text-white
            px-3
            py-1
            rounded-full
            text-xs
            font-bold
            "
          >
            -{discount}%
          </span>
        )}

        {isOutOfStock && (
          <span className="absolute top-4 left-4 bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-bold">
            Out of Stock
          </span>
        )}

        {isLimitedStock && (
          <span className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            Limited Stock
          </span>
        )}

        {/* Wishlist */}

        <button
          onClick={handleWishlist}
          className="
          absolute
          top-4
          right-4
          w-11
          h-11
          rounded-full
          bg-white
          shadow-lg
          flex
          items-center
          justify-center
          transition
          hover:scale-110
          "
        >
          <FiHeart
            className={`text-xl ${
              wishlistActive
                ? "text-red-500 fill-red-500"
                : "text-gray-700"
            }`}
          />
        </button>

        {/* Quick View */}

        <button
          onClick={() => navigate(`/product/${product.id}`)}
          className="
          absolute
          bottom-4
          right-4
          w-11
          h-11
          rounded-full
          bg-brand-primary
          text-white
          opacity-0
          group-hover:opacity-100
          transition
          duration-300
          flex
          items-center
          justify-center
          hover:bg-brand-brown
          "
        >
          <FiEye className="text-lg" />
        </button>

      </div>

      {/* Content */}

      <div className="p-5">

        <h3 className="text-xl font-bold line-clamp-1">
          {product.name}
        </h3>
                {/* Rating */}

        <div className="flex items-center gap-1 mt-3">

          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={`text-sm ${
                index < Math.round(product.rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}

          <span className="ml-2 text-gray-500 text-sm">
            ({product.reviews})
          </span>

        </div>

        {/* Price */}

        <div className="flex items-center gap-3 mt-4">

          <span className="text-2xl font-black text-brand-dark">
            ₹{product.price}
          </span>

          {product.oldPrice > product.price && (
            <span className="text-gray-400 line-through text-lg">
              ₹{product.oldPrice}
            </span>
          )}

        </div>

        {/* Category */}

        <p className="text-sm text-gray-500 mt-2">
          {product.category}
        </p>

        {/* Add To Cart */}

        <button
          onClick={handleCart}
          disabled={isOutOfStock}
          className={`
          mt-6
          w-full
          py-3.5
          rounded-xl
          font-semibold
          flex
          items-center
          justify-center
          gap-2
          transition-all
          duration-300
          ${
            isOutOfStock
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-brand-primary text-white hover:bg-brand-brown hover:scale-[1.02]"
          }
          `}
        >
          {!isOutOfStock && <FiShoppingCart className="text-lg" />}

          {isOutOfStock ? "Out of Stock" : "Add To Cart"}
        </button>

      </div>

    </div>
  );
};

export default ProductCard;