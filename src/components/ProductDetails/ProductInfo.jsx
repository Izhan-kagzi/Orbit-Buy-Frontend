import { useState } from "react";
import { FaStar } from "react-icons/fa";
import {
  FiHeart,
  FiShoppingCart,
  FiTruck,
  FiShield,
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

  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.[0] || "M"
  );

  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] || "#000000"
  );

  const [quantity, setQuantity] = useState(1);

  const wishlistActive = isInWishlist(product.id);

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
      toast.success("Removed from Wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to Wishlist");
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });

    toast.success("Added to Cart");
  };

  return (
    <div className="space-y-8">

      {/* Category */}

      <p className="uppercase tracking-[5px] text-brand-primary text-sm font-semibold">
        {product.category}
      </p>

      {/* Product Name */}

      <h1 className="text-4xl lg:text-5xl font-black leading-tight">
        {product.name}
      </h1>

      {/* Rating */}

      <div className="flex items-center gap-2">

        {[...Array(5)].map((_, index) => (

          <FaStar
            key={index}
            className={`text-lg ${
              index < Math.round(product.rating)
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
          />

        ))}

        <span className="font-semibold">
          {product.rating}
        </span>

        <span className="text-gray-500">
          ({product.reviews} Reviews)
        </span>

      </div>

      {/* Price */}

      <div className="flex items-center gap-4">

        <span className="text-4xl font-black">
          ₹{product.price}
        </span>

        {product.oldPrice > product.price && (

          <span className="text-2xl text-gray-400 line-through">
            ₹{product.oldPrice}
          </span>

        )}

        {discount > 0 && (

          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            {discount}% OFF
          </span>

        )}

      </div>

      {/* Stock */}

      <div className="flex items-center gap-3">

        <span
          className={`w-3 h-3 rounded-full ${
            product.stock > 0
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        />

        <span
          className={`font-semibold ${
            product.stock > 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {product.stock > 0
            ? `In Stock (${product.stock} Available)`
            : "Out of Stock"}
        </span>

      </div>

      {/* Description */}

      <p className="text-gray-600 leading-8">
        {product.description ||
          "Designed with premium craftsmanship and superior materials, this product offers exceptional comfort, durability and timeless style. Perfect for everyday wear as well as special occasions."}
      </p>
            {/* Size Selection */}

      <div>

        <h3 className="text-lg font-bold mb-4">
          Select Size
        </h3>

        <div className="flex flex-wrap gap-3">

          {(product.sizes || ["S", "M", "L", "XL"]).map((size) => (

            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`
                px-6
                py-3
                rounded-xl
                border-2
                font-semibold
                transition-all
                duration-300

                ${
                  selectedSize === size
                    ? "bg-brand-primary text-white border-brand-primary"
                    : "border-gray-300 hover:border-brand-primary"
                }
              `}
            >
              {size}
            </button>

          ))}

        </div>

      </div>

      {/* Color Selection */}

      <div>

        <h3 className="text-lg font-bold mb-4">
          Select Color
        </h3>

        <div className="flex flex-wrap gap-4">

          {(product.colors || [
            "#000000",
            "#ffffff",
            "#2563eb",
            "#dc2626",
          ]).map((color, index) => (

            <button
              key={index}
              onClick={() => setSelectedColor(color)}
              className={`
                relative
                w-12
                h-12
                rounded-full
                border-4
                transition-all
                duration-300
                hover:scale-110

                ${
                  selectedColor === color
                    ? "border-brand-primary scale-110"
                    : "border-gray-200"
                }
              `}
              style={{ backgroundColor: color }}
              title={color}
            >

              {selectedColor === color && (
                <span
                  className="
                    absolute
                    inset-0
                    rounded-full
                    border-2
                    border-white
                  "
                />
              )}

            </button>

          ))}

        </div>

      </div>

      {/* Quantity */}

      <QuantitySelector
        quantity={quantity}
        setQuantity={setQuantity}
        maxStock={product.stock || 99}
      />
            {/* Action Buttons */}

      <div className="flex flex-col sm:flex-row gap-4">

        {/* Wishlist */}

        <button
          onClick={handleWishlist}
          className={`
            flex
            items-center
            justify-center
            gap-3
            px-8
            py-4
            rounded-xl
            border-2
            font-semibold
            transition-all
            duration-300

            ${
              wishlistActive
                ? "bg-red-500 text-white border-red-500"
                : "border-gray-300 hover:border-red-500 hover:text-red-500"
            }
          `}
        >
          <FiHeart
            className={`text-xl ${
              wishlistActive ? "fill-white" : ""
            }`}
          />

          {wishlistActive
            ? "Wishlisted"
            : "Add to Wishlist"}
        </button>

        {/* Add To Cart */}

        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className="
            flex-1
            flex
            items-center
            justify-center
            gap-3
            bg-brand-primary
            text-white
            py-4
            rounded-xl
            font-semibold
            transition-all
            duration-300
            hover:bg-brand-brown
            disabled:bg-gray-400
            disabled:cursor-not-allowed
          "
        >
          <FiShoppingCart className="text-xl" />

          Add To Cart
        </button>

      </div>

      {/* Buy Now */}

      <button
        onClick={() => {
          handleAddToCart();
          toast.success("Redirecting to Checkout...");
        }}
        disabled={product.stock <= 0}
        className="
          w-full
          bg-brand-primary
          text-white
          py-4
          rounded-xl
          text-lg
          font-bold
          transition-all
          duration-300
          hover:bg-brand-dark
          disabled:bg-gray-400
          disabled:cursor-not-allowed
        "
      >
        Buy Now
      </button>

      {/* Delivery & Security */}

      <div className="grid sm:grid-cols-2 gap-5">

        <div
          className="
            p-5
            rounded-2xl
            bg-gray-50
            border
            border-gray-200
          "
        >
          <div className="flex items-center gap-3 mb-3">

            <FiTruck className="text-2xl text-brand-primary" />

            <h4 className="font-bold">
              Free Delivery
            </h4>

          </div>

          <p className="text-gray-600 text-sm leading-7">
            Free shipping across India on eligible orders.
            Estimated delivery within 3–7 business days.
          </p>

        </div>

        <div
          className="
            p-5
            rounded-2xl
            bg-gray-50
            border
            border-gray-200
          "
        >
          <div className="flex items-center gap-3 mb-3">

            <FiShield className="text-2xl text-green-600" />

            <h4 className="font-bold">
              Secure Payments
            </h4>

          </div>

          <p className="text-gray-600 text-sm leading-7">
            All transactions are protected with industry-standard
            encryption and secure payment gateways.
          </p>

        </div>

      </div>
            {/* Product Information */}

      <div className="border-t border-gray-200 pt-8">

        <h3 className="text-xl font-bold mb-5">
          Product Details
        </h3>

        <div className="grid grid-cols-2 gap-y-4 text-sm">

          <span className="text-gray-500">
            Brand
          </span>

          <span className="font-semibold">
            {product.brand || "Orbit Buy"}
          </span>

          <span className="text-gray-500">
            Category
          </span>

          <span className="font-semibold">
            {product.category}
          </span>

          <span className="text-gray-500">
            Type
          </span>

          <span className="font-semibold">
            {product.type || "Fashion"}
          </span>

          <span className="text-gray-500">
            SKU
          </span>

          <span className="font-semibold">
            ORB-{product.id}
          </span>

          <span className="text-gray-500">
            Material
          </span>

          <span className="font-semibold">
            {product.material || "Premium Cotton"}
          </span>

          <span className="text-gray-500">
            Fit
          </span>

          <span className="font-semibold">
            {product.fit || "Regular Fit"}
          </span>

        </div>

      </div>

      {/* Return Policy */}

      <div
        className="
          rounded-2xl
          bg-brand-tan/20
          border
          border-brand-tan/40
          p-6
        "
      >

        <h3 className="text-lg font-bold mb-3">
          Return & Exchange
        </h3>

        <ul className="space-y-2 text-gray-700 text-sm">

          <li>✓ 7-Day Easy Returns</li>

          <li>✓ Free Size Exchange</li>

          <li>✓ Secure Packaging</li>

          <li>✓ 100% Genuine Products</li>

        </ul>

      </div>

      {/* Guarantee */}

      <div
        className="
          rounded-2xl
          border
          border-green-200
          bg-green-50
          p-6
        "
      >

        <h3 className="text-lg font-bold text-green-700 mb-2">
          Orbit Buy Promise
        </h3>

        <p className="text-sm text-gray-700 leading-7">
          Every product available on Orbit Buy is quality checked before dispatch.
          We ensure premium craftsmanship, secure packaging, fast shipping, and
          dedicated customer support for a worry-free shopping experience.
        </p>

      </div>

    </div>
  );
};

export default ProductInfo;