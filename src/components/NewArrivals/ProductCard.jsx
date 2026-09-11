import { useNavigate } from "react-router-dom";
import {
  FiHeart,
  FiShoppingCart,
  FiEye,
  FiArrowUpRight,
} from "react-icons/fi";
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

  const stock = Number(product.stock ?? 0);

  const isOutOfStock = stock <= 0;
  const isLimitedStock = !isOutOfStock && stock <= 5;

  const rating = Number(product.rating || 0);
  const reviews = Number(product.reviews || 0);

  const price = Number(product.price || 0);
  const oldPrice = Number(product.oldPrice || 0);

  const discount =
    oldPrice > price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : 0;

  // ============================================================
  // WISHLIST
  // ============================================================

  const handleWishlist = (event) => {
    event.stopPropagation();

    if (wishlistActive) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist");
    }
  };

  // ============================================================
  // CART
  // ============================================================

  const handleCart = (event) => {
    event.stopPropagation();

    if (isOutOfStock) return;

    addToCart(product);
    toast.success("Added to cart");
  };

  // ============================================================
  // PRODUCT DETAILS
  // ============================================================

  const openProduct = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <article
      className="
        group
        relative
        bg-white
        rounded-[1.75rem]
        overflow-hidden
        border border-gray-100
        shadow-sm
        hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)]
        hover:-translate-y-2
        transition-all
        duration-500
        h-full
      "
    >

      {/* ======================================================
          IMAGE
      ======================================================= */}

      <div
        className="
          relative
          overflow-hidden
          bg-gray-100
          cursor-pointer
        "
        onClick={openProduct}
      >

        <img
          src={getImageUrl(product.image)}
          alt={product.name}
          loading="lazy"
          className="
            w-full
            h-[320px]
            sm:h-[340px]
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-105
          "
        />

        {/* Image Overlay */}

        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-black/25
            via-transparent
            to-transparent
            opacity-0
            group-hover:opacity-100
            transition-opacity duration-500
            pointer-events-none
          "
        />

        {/* ====================================================
            DISCOUNT / STOCK BADGE
        ===================================================== */}

        <div className="absolute top-4 left-4 flex flex-col gap-2">

          {discount > 0 && !isOutOfStock && (
            <span
              className="
                inline-flex
                items-center
                justify-center
                w-fit
                px-3
                py-1.5
                rounded-full
                bg-red-500
                text-white
                text-[11px]
                font-bold
                tracking-wide
                shadow-lg
              "
            >
              -{discount}%
            </span>
          )}

          {isOutOfStock && (
            <span
              className="
                inline-flex
                items-center
                justify-center
                w-fit
                px-3
                py-1.5
                rounded-full
                bg-gray-900/90
                text-white
                text-[11px]
                font-bold
                shadow-lg
              "
            >
              Out of Stock
            </span>
          )}

          {isLimitedStock && (
            <span
              className="
                inline-flex
                items-center
                justify-center
                w-fit
                px-3
                py-1.5
                rounded-full
                bg-amber-500
                text-white
                text-[11px]
                font-bold
                shadow-lg
              "
            >
              Only {stock} left
            </span>
          )}

        </div>

        {/* ====================================================
            WISHLIST
        ===================================================== */}

        <button
          type="button"
          onClick={handleWishlist}
          aria-label={
            wishlistActive
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className="
            absolute
            top-4
            right-4
            w-11
            h-11
            rounded-full
            bg-white/95
            backdrop-blur-sm
            shadow-lg
            flex
            items-center
            justify-center
            transition-all
            duration-300
            hover:scale-110
          "
        >
          <FiHeart
            className={`
              text-lg
              transition-colors
              ${
                wishlistActive
                  ? "text-red-500 fill-red-500"
                  : "text-gray-700"
              }
            `}
          />
        </button>

        {/* ====================================================
            QUICK VIEW
        ===================================================== */}

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            openProduct();
          }}
          aria-label="View product"
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
            translate-y-3
            group-hover:opacity-100
            group-hover:translate-y-0
            transition-all
            duration-300
            flex
            items-center
            justify-center
            shadow-lg
            hover:bg-brand-brown
          "
        >
          <FiEye className="text-lg" />
        </button>

      </div>

      {/* ======================================================
          PRODUCT INFORMATION
      ======================================================= */}

      <div className="p-5">

        {/* Brand */}

        {product.brand && (
          <p className="text-[10px] uppercase tracking-[2px] text-gray-400 font-semibold">
            {product.brand}
          </p>
        )}

        {/* Product Name */}

        <h3
          onClick={openProduct}
          className="
            mt-2
            text-lg
            sm:text-xl
            font-bold
            text-gray-900
            line-clamp-1
            cursor-pointer
            hover:text-brand-primary
            transition-colors
          "
        >
          {product.name}
        </h3>

        {/* Rating */}

        <div className="flex items-center gap-1 mt-3">

          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={`
                text-xs
                ${
                  index < Math.round(rating)
                    ? "text-yellow-400"
                    : "text-gray-200"
                }
              `}
            />
          ))}

          <span className="ml-2 text-xs text-gray-400">
            {reviews > 0
              ? `${reviews} ${reviews === 1 ? "review" : "reviews"}`
              : "No reviews"}
          </span>

        </div>

        {/* Price */}

        <div className="flex items-center flex-wrap gap-3 mt-4">

          <span className="text-2xl font-black text-brand-dark">
            ₹{price.toLocaleString("en-IN")}
          </span>

          {oldPrice > price && (
            <span className="text-sm text-gray-400 line-through">
              ₹{oldPrice.toLocaleString("en-IN")}
            </span>
          )}

          {discount > 0 && (
            <span className="text-xs font-bold text-green-600">
              {discount}% OFF
            </span>
          )}

        </div>

        {/* Category */}

        {product.category && (
          <p className="text-xs text-gray-400 mt-2">
            {product.category}
          </p>
        )}

        {/* ====================================================
            ADD TO CART
        ===================================================== */}

        <button
          type="button"
          onClick={handleCart}
          disabled={isOutOfStock}
          className={`
            mt-5
            w-full
            py-3.5
            rounded-xl
            font-semibold
            text-sm
            flex
            items-center
            justify-center
            gap-2
            transition-all
            duration-300
            ${
              isOutOfStock
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-brand-primary text-white hover:bg-brand-brown hover:shadow-lg hover:scale-[1.01]"
            }
          `}
        >

          {!isOutOfStock && (
            <FiShoppingCart className="text-lg" />
          )}

          {isOutOfStock
            ? "Out of Stock"
            : "Add to Cart"}

        </button>

        {/* View Details */}

        {!isOutOfStock && (
          <button
            type="button"
            onClick={openProduct}
            className="
              mt-3
              w-full
              flex
              items-center
              justify-center
              gap-2
              text-xs
              font-semibold
              text-gray-500
              hover:text-brand-primary
              transition-colors
            "
          >
            View Details

            <FiArrowUpRight
              className="
                transition-transform
                duration-300
                group-hover:translate-x-0.5
              "
            />
          </button>
        )}

      </div>

    </article>
  );
};

export default ProductCard;