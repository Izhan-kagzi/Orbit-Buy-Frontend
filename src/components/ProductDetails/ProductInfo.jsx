import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

import {
  FiCheck,
  FiHeart,
  FiShield,
  FiShoppingCart,
  FiTruck,
  FiZap,
} from "react-icons/fi";

import toast from "react-hot-toast";

import QuantitySelector from "./QuantitySelector";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const ProductInfo = ({ product }) => {
  const { addToCart } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const [selectedSize, setSelectedSize] =
    useState(product?.sizes?.[0] || "M");

  const [selectedColor, setSelectedColor] =
    useState(product?.colors?.[0] || "#000000");

  const [quantity, setQuantity] = useState(1);

  const wishlistActive = isInWishlist(
    product?.id
  );

  const rating = Number(product?.rating || 0);
  const reviewCount = Number(
    product?.reviews || 0
  );

  const price = Number(product?.price || 0);
  const oldPrice = Number(
    product?.oldPrice || 0
  );

  const stock = Number(
    product?.stock || 0
  );

  const discount =
    oldPrice > price && oldPrice > 0
      ? Math.round(
          ((oldPrice - price) /
            oldPrice) *
            100
        )
      : 0;

  const sizes =
    Array.isArray(product?.sizes) &&
    product.sizes.length > 0
      ? product.sizes
      : ["S", "M", "L", "XL"];

  const colors =
    Array.isArray(product?.colors) &&
    product.colors.length > 0
      ? product.colors
      : [
          "#000000",
          "#ffffff",
          "#2563eb",
          "#dc2626",
        ];

  // Keep selected options valid when the product changes.
  useEffect(() => {
    setSelectedSize(
      product?.sizes?.[0] || "M"
    );

    setSelectedColor(
      product?.colors?.[0] || "#000000"
    );

    setQuantity(1);
  }, [product?.id]);

  // ------------------------------------------------------------
  // WISHLIST
  // ------------------------------------------------------------

  const handleWishlist = () => {
    if (!product?.id) {
      return;
    }

    if (wishlistActive) {
      removeFromWishlist(product.id);
      toast.success(
        "Removed from Wishlist"
      );
    } else {
      addToWishlist(product);
      toast.success(
        "Added to Wishlist"
      );
    }
  };

  // ------------------------------------------------------------
  // ADD TO CART
  // ------------------------------------------------------------

  const handleAddToCart = () => {
    if (stock <= 0) {
      toast.error(
        "This product is currently out of stock."
      );
      return;
    }

    addToCart({
      ...product,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });

    toast.success(
      "Added to Cart"
    );
  };

  // ------------------------------------------------------------
  // BUY NOW
  // ------------------------------------------------------------

  const handleBuyNow = () => {
    if (stock <= 0) {
      toast.error(
        "This product is currently out of stock."
      );
      return;
    }

    addToCart({
      ...product,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });

    toast.success(
      "Added to Cart"
    );

    toast.success(
      "Redirecting to Checkout..."
    );
  };

  return (
    <div className="space-y-7 lg:space-y-8">
      {/* ========================================================
          CATEGORY + BRAND
      ======================================================== */}

      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-brand-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-brand-primary">
          {product?.category ||
            "Fashion"}
        </span>

        {product?.brand && (
          <span className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-600">
            {product.brand}
          </span>
        )}

        {discount > 0 && (
          <span className="rounded-full bg-red-50 px-4 py-2 text-xs font-bold text-red-600">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* ========================================================
          PRODUCT NAME
      ======================================================== */}

      <div>
        <h1 className="max-w-3xl text-4xl font-black leading-[1.08] tracking-tight text-gray-950 sm:text-5xl lg:text-[3.5rem]">
          {product?.name}
        </h1>

        <div className="mt-5 h-1 w-16 rounded-full bg-brand-primary" />
      </div>

      {/* ========================================================
          RATING
      ======================================================== */}

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-1.5">
          {[...Array(5)].map(
            (_, index) => (
              <FaStar
                key={index}
                className={`text-base sm:text-lg ${
                  index <
                  Math.round(rating)
                    ? "text-yellow-400"
                    : "text-gray-200"
                }`}
              />
            )
          )}
        </div>

        <span className="font-black text-gray-900">
          {rating.toFixed(1)}
        </span>

        <span className="h-5 w-px bg-gray-200" />

        <span className="text-sm font-medium text-gray-500">
          {reviewCount}{" "}
          {reviewCount === 1
            ? "Review"
            : "Reviews"}
        </span>
      </div>

      {/* ========================================================
          PRICE
      ======================================================== */}

      <div className="rounded-3xl border border-gray-100 bg-gray-50/70 p-5 sm:p-6">
        <div className="flex flex-wrap items-end gap-3">
          <span className="text-4xl font-black tracking-tight text-gray-950 sm:text-5xl">
            ₹{price.toLocaleString(
              "en-IN"
            )}
          </span>

          {oldPrice > price && (
            <span className="mb-1 text-xl font-medium text-gray-400 line-through">
              ₹
              {oldPrice.toLocaleString(
                "en-IN"
              )}
            </span>
          )}

          {discount > 0 && (
            <span className="mb-1 rounded-full bg-red-500 px-3 py-1.5 text-xs font-black text-white">
              SAVE {discount}%
            </span>
          )}
        </div>

        <p className="mt-2 text-xs text-gray-500">
          Inclusive of applicable taxes
        </p>
      </div>

      {/* ========================================================
          STOCK STATUS
      ======================================================== */}

      <div
        className={`
          flex items-center justify-between
          rounded-2xl border p-4
          ${
            stock > 0
              ? stock <= 5
                ? "border-orange-200 bg-orange-50"
                : "border-green-200 bg-green-50"
              : "border-red-200 bg-red-50"
          }
        `}
      >
        <div className="flex items-center gap-3">
          <span
            className={`
              h-3 w-3 rounded-full
              ${
                stock > 0
                  ? stock <= 5
                    ? "bg-orange-500"
                    : "bg-green-500"
                  : "bg-red-500"
              }
            `}
          />

          <div>
            <p
              className={`
                text-sm font-bold
                ${
                  stock > 0
                    ? stock <= 5
                      ? "text-orange-700"
                      : "text-green-700"
                    : "text-red-700"
                }
              `}
            >
              {stock > 0
                ? stock <= 5
                  ? "Limited Stock"
                  : "In Stock"
                : "Out of Stock"}
            </p>

            <p className="text-xs text-gray-500">
              {stock > 0
                ? `${stock} ${
                    stock === 1
                      ? "item"
                      : "items"
                  } available`
                : "Currently unavailable"}
            </p>
          </div>
        </div>

        {stock > 0 && (
          <span className="hidden text-xs font-bold text-gray-500 sm:block">
            Ready to ship
          </span>
        )}
      </div>

      {/* ========================================================
          DESCRIPTION
      ======================================================== */}

      <div>
        <p className="text-base leading-8 text-gray-600">
          {product?.description ||
            "Designed with premium craftsmanship and superior materials, this product offers exceptional comfort, durability and timeless style. Perfect for everyday wear as well as special occasions."}
        </p>
      </div>

      {/* ========================================================
          SIZE
      ======================================================== */}

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-[1.5px] text-gray-900">
            Select Size
          </h3>

        <Link
  to="/ai-stylist"
  className="inline-block bg-brand-primary text-white text-lg font-bold px-6 py-3 rounded-md shadow-md hover:bg-brand-primary/90 hover:scale-105 transition-transform duration-200"
>
  Ask Ai-Stylist
</Link>
        </div>

        <div className="flex flex-wrap gap-3">
          {sizes.map((size) => {
            const active =
              selectedSize === size;

            return (
              <button
                key={size}
                type="button"
                onClick={() =>
                  setSelectedSize(size)
                }
                className={`
                  min-w-[58px]
                  rounded-xl
                  border-2
                  px-5
                  py-3
                  text-sm
                  font-bold
                  transition-all
                  duration-300
                  ${
                    active
                      ? "border-brand-primary bg-brand-primary text-white shadow-lg shadow-brand-primary/20"
                      : "border-gray-200 bg-white text-gray-700 hover:-translate-y-0.5 hover:border-brand-primary hover:text-brand-primary"
                  }
                `}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          COLOR
      ======================================================== */}

      <div>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[1.5px] text-gray-900">
          Select Color
        </h3>

        <div className="flex flex-wrap items-center gap-4">
          {colors.map(
            (color, index) => {
              const active =
                selectedColor === color;

              return (
                <button
                  key={`${color}-${index}`}
                  type="button"
                  onClick={() =>
                    setSelectedColor(color)
                  }
                  aria-label={`Select color ${color}`}
                  className={`
                    relative h-11 w-11
                    rounded-full
                    border-2
                    p-1
                    transition-all
                    duration-300
                    ${
                      active
                        ? "scale-110 border-brand-primary shadow-lg"
                        : "border-gray-200 hover:scale-105 hover:border-gray-400"
                    }
                  `}
                >
                  <span
                    className="block h-full w-full rounded-full border border-black/10"
                    style={{
                      backgroundColor:
                        color,
                    }}
                  />

                  {active && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span
                        className={`
                          flex h-5 w-5
                          items-center justify-center
                          rounded-full
                          ${
                            color ===
                              "#ffffff" ||
                            color ===
                              "#FFFFFF"
                              ? "bg-gray-900 text-white"
                              : "bg-white text-gray-900"
                          }
                        `}
                      >
                        <FiCheck className="text-xs" />
                      </span>
                    </span>
                  )}
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* ========================================================
          QUANTITY
      ======================================================== */}

      <div className="border-t border-gray-100 pt-7">
        <QuantitySelector
          quantity={quantity}
          setQuantity={setQuantity}
          maxStock={stock || 99}
        />
      </div>

      {/* ========================================================
          ACTION BUTTONS
      ======================================================== */}

      <div className="grid gap-3 sm:grid-cols-[auto_1fr]">
        {/* Wishlist */}
        <button
          type="button"
          onClick={handleWishlist}
          className={`
            flex min-h-[58px]
            items-center
            justify-center
            gap-2.5
            rounded-2xl
            border-2
            px-6
            font-bold
            transition-all
            duration-300
            ${
              wishlistActive
                ? "border-red-500 bg-red-500 text-white shadow-lg shadow-red-500/20"
                : "border-gray-200 bg-white text-gray-700 hover:-translate-y-0.5 hover:border-red-400 hover:text-red-500"
            }
          `}
        >
          <FiHeart
            className={`text-xl ${
              wishlistActive
                ? "fill-current"
                : ""
            }`}
          />

          <span className="sm:hidden lg:inline">
            {wishlistActive
              ? "Wishlisted"
              : "Wishlist"}
          </span>
        </button>

        {/* Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={stock <= 0}
          className="
            group
            flex min-h-[58px]
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-brand-primary
            px-8
            font-black
            text-white
            shadow-xl
            shadow-brand-primary/20
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-brand-brown
            hover:shadow-2xl
            disabled:cursor-not-allowed
            disabled:bg-gray-300
            disabled:text-gray-500
            disabled:shadow-none
          "
        >
          <FiShoppingCart className="text-xl transition-transform duration-300 group-hover:scale-110" />

          Add to Cart
        </button>
      </div>

      {/* ========================================================
          BUY NOW
      ======================================================== */}

      <button
        type="button"
        onClick={handleBuyNow}
        disabled={stock <= 0}
        className="
          group
          flex min-h-[62px]
          w-full
          items-center
          justify-center
          gap-3
          rounded-2xl
          border-2
          border-gray-900
          bg-gray-900
          px-8
          text-base
          font-black
          text-white
          transition-all
          duration-300
          hover:-translate-y-1
          hover:bg-black
          hover:shadow-xl
          disabled:cursor-not-allowed
          disabled:border-gray-300
          disabled:bg-gray-300
          disabled:text-gray-500
          disabled:shadow-none
        "
      >
        <FiZap className="text-lg transition-transform duration-300 group-hover:scale-110" />

        Buy Now
      </button>

      {/* ========================================================
          DELIVERY + SECURITY
      ======================================================== */}

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Delivery */}
        <div className="group rounded-3xl border border-gray-100 bg-gray-50/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
              <FiTruck className="text-xl" />
            </span>

            <div>
              <h4 className="font-black text-gray-900">
                Free Delivery
              </h4>

              <p className="text-xs text-gray-500">
                Across India
              </p>
            </div>
          </div>

          <p className="text-sm leading-7 text-gray-600">
            Free shipping on eligible
            orders with estimated
            delivery within 3–7
            business days.
          </p>
        </div>

        {/* Security */}
        <div className="group rounded-3xl border border-gray-100 bg-gray-50/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-green-600">
              <FiShield className="text-xl" />
            </span>

            <div>
              <h4 className="font-black text-gray-900">
                Secure Payments
              </h4>

              <p className="text-xs text-gray-500">
                Protected checkout
              </p>
            </div>
          </div>

          <p className="text-sm leading-7 text-gray-600">
            Your transactions are
            protected with secure
            payment processing and
            industry-standard security.
          </p>
        </div>
      </div>

      {/* ========================================================
          PRODUCT DETAILS
      ======================================================== */}

      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-7">
        <h3 className="mb-6 text-xl font-black text-gray-900">
          Product Details
        </h3>

        <div className="grid grid-cols-2 gap-x-6 gap-y-5 text-sm">
          <span className="text-gray-400">
            Brand
          </span>

          <span className="font-bold text-gray-800">
            {product?.brand ||
              "Orbit Buy"}
          </span>

          <span className="text-gray-400">
            Category
          </span>

          <span className="font-bold text-gray-800">
            {product?.category ||
              "Fashion"}
          </span>

          <span className="text-gray-400">
            Type
          </span>

          <span className="font-bold text-gray-800">
            {product?.type ||
              "Fashion"}
          </span>

          <span className="text-gray-400">
            SKU
          </span>

          <span className="break-all font-bold text-gray-800">
            ORB-{product?.id}
          </span>

          <span className="text-gray-400">
            Material
          </span>

          <span className="font-bold text-gray-800">
            {product?.material ||
              "Premium Cotton"}
          </span>

          <span className="text-gray-400">
            Fit
          </span>

          <span className="font-bold text-gray-800">
            {product?.fit ||
              "Regular Fit"}
          </span>
        </div>
      </div>

      {/* ========================================================
          RETURN POLICY
      ======================================================== */}

      <div className="overflow-hidden rounded-3xl border border-brand-tan/40 bg-gradient-to-br from-brand-tan/20 to-white p-6">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-tan/40 text-brand-brown">
            <FiCheck className="text-xl" />
          </span>

          <div>
            <h3 className="font-black text-gray-900">
              Return & Exchange
            </h3>

            <p className="text-xs text-gray-500">
              Shop with confidence
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "7-Day Easy Returns",
            "Free Size Exchange",
            "Secure Packaging",
            "100% Genuine Products",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <FiCheck className="shrink-0 text-green-600" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================
          ORBIT BUY PROMISE
      ======================================================== */}

      <div className="relative overflow-hidden rounded-3xl border border-green-200 bg-green-50 p-6">
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-green-200/30 blur-2xl" />

        <div className="relative">
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
              <FiShield />
            </span>

            <h3 className="text-lg font-black text-green-700">
              Orbit Buy Promise
            </h3>
          </div>

          <p className="text-sm leading-7 text-gray-700">
            Every product available on
            Orbit Buy is quality checked
            before dispatch. We ensure
            premium craftsmanship, secure
            packaging, fast shipping, and
            dedicated customer support for
            a worry-free shopping
            experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;