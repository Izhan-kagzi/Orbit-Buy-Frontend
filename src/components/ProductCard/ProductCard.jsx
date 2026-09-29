// src/components/Product/ProductCard.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiHeart,
  FiShoppingCart,
  FiCheck,
  FiBarChart2,
} from "react-icons/fi";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useCompare } from "../../context/CompareContext";
import ProductMedia from "../ProductMedia/ProductMedia";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();
  const {
    isComparing,
    toggleCompare,
  } = useCompare();

  const [justAdded, setJustAdded] = useState(false);

  /*
   * Safety check.
   *
   * Prevent the card from crashing if the API temporarily returns
   * an empty/null product.
   */
  if (!product) {
    return null;
  }

  const wishlisted = isInWishlist(product.id);
  const comparing = isComparing(product.id);

  const stock = Number(product.stock ?? 1);

  const isOutOfStock = stock <= 0;
  const isLimitedStock = !isOutOfStock && stock <= 5;

  const price = Number(product.price || 0);
  const oldPrice = Number(product.oldPrice || 0);

  const hasDiscount =
    oldPrice > price &&
    price > 0 &&
    !isOutOfStock;

  const discountPercent = hasDiscount
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  /*
   * ------------------------------------------------------------
   * NAVIGATION
   * ------------------------------------------------------------
   */

  const openProduct = () => {
    if (!product.id) return;

    navigate(`/product/${product.id}`);
  };

  /*
   * ------------------------------------------------------------
   * WISHLIST
   * ------------------------------------------------------------
   */

  const handleToggleWishlist = (event) => {
    event.stopPropagation();

    if (!product.id) return;

    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  /*
   * ------------------------------------------------------------
   * COMPARE
   * ------------------------------------------------------------
   */

  const handleToggleCompare = (event) => {
    event.stopPropagation();

    if (!product.id) return;

    toggleCompare(product);
  };

  /*
   * ------------------------------------------------------------
   * CART
   * ------------------------------------------------------------
   */

  const handleAddToCart = (event) => {
    event.stopPropagation();

    if (isOutOfStock) return;

    addToCart(product);

    setJustAdded(true);

    window.setTimeout(() => {
      setJustAdded(false);
    }, 1500);
  };

  /*
   * ------------------------------------------------------------
   * BUY NOW
   * ------------------------------------------------------------
   */

  const handleBuyNow = (event) => {
    event.stopPropagation();

    if (isOutOfStock) return;

    addToCart(product);
    navigate("/checkout");
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      className="
        bg-white
        rounded-xl
        shadow-md
        hover:shadow-2xl
        transition-shadow
        duration-300
        overflow-hidden
        group
      "
    >
      {/* ========================================================
          PRODUCT MEDIA
      ========================================================= */}

      <div className="relative overflow-hidden">
        {/* Discount badge */}
        {hasDiscount && (
          <span
            className="
              absolute
              top-4
              left-4
              z-20
              bg-brand-brown
              text-white
              text-xs
              font-bold
              px-3
              py-1.5
              rounded-full
            "
          >
            -{discountPercent}% OFF
          </span>
        )}

        {/* Out of stock badge */}
        {isOutOfStock && (
          <span
            className="
              absolute
              top-4
              left-4
              z-20
              bg-gray-800
              text-white
              text-xs
              font-bold
              px-3
              py-1.5
              rounded-full
            "
          >
            Out of Stock
          </span>
        )}

        {/* Limited stock badge */}
        {isLimitedStock && (
          <span
            className="
              absolute
              top-4
              left-4
              z-20
              bg-amber-500
              text-white
              text-xs
              font-bold
              px-3
              py-1.5
              rounded-full
            "
          >
            Limited Stock
          </span>
        )}

        {/* Product media */}
        <div
          onClick={openProduct}
          className="
            cursor-pointer
            w-full
            h-96
            overflow-hidden
          "
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openProduct();
            }
          }}
        >
          <ProductMedia
            product={product}
            alt={product.name || "Product"}
            dimmed={isOutOfStock}
            className="
              w-full
              h-full
              object-cover
            "
          />
        </div>

        {/* ======================================================
            WISHLIST
        ======================================================= */}

        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={
            wishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className={`
            absolute
            top-4
            right-4
            z-20
            p-2
            rounded-full
            shadow
            transition
            ${
              wishlisted
                ? "bg-red-500 text-white"
                : "bg-white hover:bg-red-500 hover:text-white"
            }
          `}
        >
          <FiHeart
            size={20}
            className={
              wishlisted
                ? "fill-current"
                : ""
            }
          />
        </button>

        {/* ======================================================
            COMPARE
        ======================================================= */}

        <button
          type="button"
          onClick={handleToggleCompare}
          aria-label={
            comparing
              ? "Remove from compare"
              : "Add to compare"
          }
          title={
            comparing
              ? "Remove from compare"
              : "Add to compare"
          }
          className={`
            absolute
            top-16
            right-4
            z-20
            p-2
            rounded-full
            shadow
            transition
            ${
              comparing
                ? "bg-brand-primary text-white"
                : "bg-white hover:bg-brand-primary hover:text-white"
            }
          `}
        >
          <FiBarChart2 size={18} />
        </button>
      </div>

      {/* ========================================================
          PRODUCT INFORMATION
      ========================================================= */}

      <div className="p-5">
        {/* Product name */}
        <h2
          onClick={openProduct}
          className="
            text-xl
            font-semibold
            cursor-pointer
            hover:text-brand-primary
            transition
          "
        >
          {product.name || "Unnamed Product"}
        </h2>

        {/* Brand */}
        {product.brand && (
          <p className="text-gray-500 mt-2">
            {product.brand}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center gap-3 mt-4">
          <span className="text-2xl font-bold text-brand-primary">
            ₹{price.toLocaleString("en-IN")}
          </span>

          {oldPrice > price && (
            <span className="line-through text-gray-400">
              ₹{oldPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* ======================================================
            ACTION BUTTONS
        ======================================================= */}

        <div className="mt-6 flex gap-3">
          {/* Add to cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`
              flex-1
              flex
              items-center
              justify-center
              gap-2
              py-3
              rounded-lg
              font-semibold
              transition
              ${
                isOutOfStock
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : justAdded
                  ? "bg-green-600 text-white"
                  : "bg-brand-primary hover:bg-brand-brown text-white"
              }
            `}
          >
            {isOutOfStock ? null : justAdded ? (
              <FiCheck />
            ) : (
              <FiShoppingCart />
            )}

            {isOutOfStock
              ? "Out of Stock"
              : justAdded
              ? "Added"
              : "Add to Cart"}
          </button>

          {/* Buy now */}
          <button
            type="button"
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className={`
              flex-1
              border
              py-3
              rounded-lg
              font-semibold
              transition
              ${
                isOutOfStock
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-brand-primary hover:bg-brand-primary hover:text-white"
              }
            `}
          >
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;