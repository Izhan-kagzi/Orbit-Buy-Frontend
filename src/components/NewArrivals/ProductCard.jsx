import { useNavigate } from "react-router-dom";

import {
  FiHeart,
  FiShoppingCart,
  FiEye,
  FiArrowUpRight,
  FiCheck,
  FiZap,
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

  const wishlistActive = isInWishlist(
    product.id
  );

  // ============================================================
  // PRODUCT DATA
  // ============================================================

  const stock = Number(
    product.stock ?? 0
  );

  const isOutOfStock = stock <= 0;

  const isLimitedStock =
    !isOutOfStock && stock <= 5;

  const rating = Number(
    product.rating || 0
  );

  const reviews = Number(
    product.reviews || 0
  );

  const price = Number(
    product.price || 0
  );

  const oldPrice = Number(
    product.oldPrice || 0
  );

  const discount =
    oldPrice > price
      ? Math.round(
          ((oldPrice - price) /
            oldPrice) *
            100
        )
      : 0;

  // ============================================================
  // NAVIGATION
  // ============================================================

  const openProduct = () => {
    navigate(
      `/product/${product.id}`
    );
  };

  // ============================================================
  // WISHLIST
  // ============================================================

  const handleWishlist = (event) => {
    event.stopPropagation();

    if (wishlistActive) {
      removeFromWishlist(product.id);

      toast.success(
        "Removed from wishlist"
      );
    } else {
      addToWishlist(product);

      toast.success(
        "Added to wishlist"
      );
    }
  };

  // ============================================================
  // CART
  // ============================================================

  const handleCart = (event) => {
    event.stopPropagation();

    if (isOutOfStock) {
      toast.error(
        "This product is currently out of stock."
      );
      return;
    }

    addToCart(product);

    toast.success(
      "Added to cart"
    );
  };

  return (
    <article
      className="
        group relative flex h-full
        flex-col overflow-hidden
        rounded-[2rem]
        border border-gray-100
        bg-white
        shadow-[0_8px_30px_rgba(0,0,0,0.04)]
        transition-all duration-500
        hover:-translate-y-2
        hover:border-gray-200
        hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)]
      "
    >
      {/* ======================================================
          PRODUCT IMAGE
      ======================================================= */}

      <div
        className="
          relative
          cursor-pointer
          overflow-hidden
          bg-gray-100
        "
        onClick={openProduct}
      >
        <img
          src={getImageUrl(
            product.image
          )}
          alt={
            product.name ||
            "Orbit Buy product"
          }
          loading="lazy"
          className="
            h-[320px]
            w-full
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.06]
            sm:h-[340px]
          "
        />

        {/* ==================================================
            IMAGE GRADIENT
        ================================================== */}

        <div
          className="
            pointer-events-none
            absolute inset-0
            bg-gradient-to-t
            from-black/30
            via-transparent
            to-transparent
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
        />

        {/* ==================================================
            BADGES
        ================================================== */}

        <div className="absolute left-4 top-4 flex flex-col gap-2">
          {discount > 0 &&
            !isOutOfStock && (
              <span
                className="
                  inline-flex w-fit
                  items-center
                  rounded-full
                  bg-red-500
                  px-3.5 py-2
                  text-[10px]
                  font-black
                  tracking-[1px]
                  text-white
                  shadow-lg
                "
              >
                -{discount}%
              </span>
            )}

          {isOutOfStock && (
            <span
              className="
                inline-flex w-fit
                items-center
                rounded-full
                bg-gray-950/90
                px-3.5 py-2
                text-[10px]
                font-black
                tracking-wide
                text-white
                shadow-lg
                backdrop-blur-md
              "
            >
              Out of Stock
            </span>
          )}

          {isLimitedStock && (
            <span
              className="
                inline-flex w-fit
                items-center
                rounded-full
                bg-amber-500
                px-3.5 py-2
                text-[10px]
                font-black
                tracking-wide
                text-white
                shadow-lg
              "
            >
              Only {stock} Left
            </span>
          )}
        </div>

        {/* ==================================================
            WISHLIST BUTTON
        ================================================== */}

        <button
          type="button"
          onClick={handleWishlist}
          aria-label={
            wishlistActive
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className={`
            absolute right-4 top-4
            flex h-11 w-11
            items-center justify-center
            rounded-full
            border
            shadow-lg
            backdrop-blur-md
            transition-all
            duration-300
            hover:scale-110
            active:scale-95
            ${
              wishlistActive
                ? "border-red-100 bg-red-50 text-red-500"
                : "border-white/70 bg-white/95 text-gray-700 hover:text-red-500"
            }
          `}
        >
          <FiHeart
            className={`
              text-lg
              transition-all
              duration-300
              ${
                wishlistActive
                  ? "fill-current"
                  : ""
              }
            `}
          />
        </button>

        {/* ==================================================
            QUICK VIEW
        ================================================== */}

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            openProduct();
          }}
          aria-label="View product"
          className="
            absolute
            bottom-4 right-4
            flex h-11 w-11
            translate-y-3
            items-center
            justify-center
            rounded-full
            bg-brand-primary
            text-white
            opacity-0
            shadow-xl
            transition-all
            duration-300
            group-hover:translate-y-0
            group-hover:opacity-100
            hover:bg-brand-brown
            hover:scale-110
            active:scale-95
          "
        >
          <FiEye className="text-lg" />
        </button>

        {/* ==================================================
            MEDIA INDICATOR
        ================================================== */}

        {(product.images?.length > 1 ||
          product.videos?.length > 0) && (
          <span
            className="
              absolute
              bottom-4 left-4
              rounded-full
              bg-black/60
              px-3 py-1.5
              text-[10px]
              font-bold
              text-white
              opacity-0
              backdrop-blur-md
              transition-opacity
              duration-300
              group-hover:opacity-100
            "
          >
            View Gallery
          </span>
        )}
      </div>

      {/* ======================================================
          PRODUCT INFORMATION
      ======================================================= */}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Brand + Category */}

        <div className="flex items-center justify-between gap-3">
          {product.brand ? (
            <p
              className="
                truncate
                text-[10px]
                font-black
                uppercase
                tracking-[2px]
                text-gray-400
              "
            >
              {product.brand}
            </p>
          ) : (
            <span />
          )}

          {product.category && (
            <span
              className="
                shrink-0
                rounded-full
                bg-gray-50
                px-2.5 py-1
                text-[9px]
                font-bold
                uppercase
                tracking-wide
                text-gray-400
              "
            >
              {product.category}
            </span>
          )}
        </div>

        {/* ==================================================
            PRODUCT NAME
        ================================================== */}

        <h3
          onClick={openProduct}
          title={product.name}
          className="
            mt-3
            line-clamp-2
            min-h-[52px]
            cursor-pointer
            text-lg
            font-black
            leading-7
            tracking-tight
            text-gray-900
            transition-colors
            duration-300
            hover:text-brand-primary
            sm:text-xl
          "
        >
          {product.name}
        </h3>

        {/* ==================================================
            RATING
        ================================================== */}

        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map(
              (_, index) => (
                <FaStar
                  key={index}
                  className={`
                    text-xs
                    ${
                      index <
                      Math.round(
                        rating
                      )
                        ? "text-yellow-400"
                        : "text-gray-200"
                    }
                  `}
                />
              )
            )}
          </div>

          <span className="text-xs font-bold text-gray-700">
            {rating > 0
              ? rating.toFixed(1)
              : "0.0"}
          </span>

          <span className="text-xs text-gray-400">
            (
            {reviews > 0
              ? `${reviews} ${
                  reviews === 1
                    ? "review"
                    : "reviews"
                }`
              : "No reviews"}
            )
          </span>
        </div>

        {/* ==================================================
            PRICE
        ================================================== */}

        <div className="mt-4 flex flex-wrap items-end gap-2.5">
          <span
            className="
              text-2xl
              font-black
              tracking-tight
              text-brand-dark
            "
          >
            ₹
            {price.toLocaleString(
              "en-IN"
            )}
          </span>

          {oldPrice > price && (
            <span className="mb-0.5 text-sm font-medium text-gray-400 line-through">
              ₹
              {oldPrice.toLocaleString(
                "en-IN"
              )}
            </span>
          )}

          {discount > 0 && (
            <span
              className="
                mb-0.5
                rounded-full
                bg-green-50
                px-2.5 py-1
                text-[10px]
                font-black
                text-green-600
              "
            >
              SAVE {discount}%
            </span>
          )}
        </div>

        {/* ==================================================
            STOCK INFORMATION
        ================================================== */}

        <div className="mt-3">
          {isOutOfStock ? (
            <div className="flex items-center gap-2 text-xs font-semibold text-red-500">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              Currently unavailable
            </div>
          ) : isLimitedStock ? (
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-600">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Hurry! Only {stock} left
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-semibold text-green-600">
             
            </div>
          )}
        </div>

        {/* ==================================================
            SPACER
        ================================================== */}

        <div className="flex-1" />

        {/* ==================================================
            ADD TO CART
        ================================================== */}

        <button
          type="button"
          onClick={handleCart}
          disabled={isOutOfStock}
          className={`
            group/cart
            mt-5
            flex
            min-h-[52px]
            w-full
            items-center
            justify-center
            gap-2.5
            rounded-2xl
            px-5
            text-sm
            font-black
            transition-all
            duration-300
            ${
              isOutOfStock
                ? "cursor-not-allowed bg-gray-100 text-gray-400"
                : "bg-brand-primary text-white shadow-lg shadow-brand-primary/15 hover:-translate-y-0.5 hover:bg-brand-brown hover:shadow-xl"
            }
          `}
        >
          {!isOutOfStock && (
            <FiShoppingCart
              className="
                text-lg
                transition-transform
                duration-300
                group-hover/cart:scale-110
              "
            />
          )}

          {isOutOfStock
            ? "Out of Stock"
            : "Add to Cart"}
        </button>

        {/* ==================================================
            VIEW DETAILS
        ================================================== */}

        <button
          type="button"
          onClick={openProduct}
          className="
            mt-3
            flex
            items-center
            justify-center
            gap-2
            py-1
            text-xs
            font-bold
            text-gray-400
            transition-colors
            duration-300
            hover:text-brand-primary
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
      </div>

      {/* ======================================================
          PREMIUM BOTTOM ACCENT
      ======================================================= */}

      <div
        className="
          h-1
          w-full
          origin-left
          scale-x-0
          bg-brand-primary
          transition-transform
          duration-500
          group-hover:scale-x-100
        "
      />
    </article>
  );
};

export default ProductCard;
