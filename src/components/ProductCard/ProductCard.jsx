import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHeart, FiShoppingCart, FiCheck, FiBarChart2 } from "react-icons/fi";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useCompare } from "../../context/CompareContext";
import { getImageUrl } from "../../services/api";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isComparing, toggleCompare } = useCompare();

  const [justAdded, setJustAdded] = useState(false);

  const wishlisted = isInWishlist(product.id);
  const comparing = isComparing(product.id);

  const isOutOfStock = (product.stock ?? 1) <= 0;
  const isLimitedStock = !isOutOfStock && (product.stock ?? 99) <= 5;

  const handleToggleWishlist = () => {
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product);
    navigate("/checkout");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"
    >
      <div className="relative overflow-hidden">
        {product.oldPrice > product.price && !isOutOfStock && (
          <span className="absolute top-4 left-4 z-10 bg-brand-brown text-white text-xs font-bold px-3 py-1.5 rounded-full">
            -{Math.round(
              ((product.oldPrice - product.price) / product.oldPrice) * 100
            )}% OFF
          </span>
        )}
        {isOutOfStock && (
          <span className="absolute top-4 left-4 z-10 bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            Out of Stock
          </span>
        )}
        {isLimitedStock && (
          <span className="absolute top-4 left-4 z-10 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            Limited Stock
          </span>
        )}
        <img
          src={getImageUrl(product.image)}
          alt={product.name}
          onClick={() => navigate(`/product/${product.id}`)}
          className={`w-full h-96 object-cover group-hover:scale-110 transition duration-500 cursor-pointer ${
            isOutOfStock ? "grayscale opacity-60" : ""
          }`}
        />
        <button
          onClick={handleToggleWishlist}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-4 right-4 p-2 rounded-full shadow transition ${
            wishlisted
              ? "bg-red-500 text-white"
              : "bg-white hover:bg-red-500 hover:text-white"
          }`}
        >
          <FiHeart size={20} className={wishlisted ? "fill-current" : ""} />
        </button>

        <button
          onClick={() => toggleCompare(product)}
          aria-label={comparing ? "Remove from compare" : "Add to compare"}
          title={comparing ? "Remove from compare" : "Add to compare"}
          className={`absolute top-16 right-4 p-2 rounded-full shadow transition ${
            comparing
              ? "bg-brand-primary text-white"
              : "bg-white hover:bg-brand-primary hover:text-white"
          }`}
        >
          <FiBarChart2 size={18} />
        </button>
      </div>

      <div className="p-5">
        <h2
          onClick={() => navigate(`/product/${product.id}`)}
          className="text-xl font-semibold cursor-pointer hover:text-brand-primary transition"
        >
          {product.name}
        </h2>

        {product.brand && <p className="text-gray-500 mt-2">{product.brand}</p>}

        <div className="flex items-center gap-3 mt-4">
          <span className="text-2xl font-bold text-brand-primary">₹{product.price}</span>
          {product.oldPrice && (
            <span className="line-through text-gray-400">₹{product.oldPrice}</span>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition ${
              isOutOfStock
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : justAdded
                ? "bg-green-600 text-white"
                : "bg-brand-primary hover:bg-brand-brown text-white"
            }`}
          >
            {isOutOfStock ? null : justAdded ? <FiCheck /> : <FiShoppingCart />}
            {isOutOfStock ? "Out of Stock" : justAdded ? "Added" : "Add to Cart"}
          </button>

          <button
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className={`flex-1 border py-3 rounded-lg font-semibold transition ${
              isOutOfStock
                ? "border-gray-200 text-gray-400 cursor-not-allowed"
                : "border-brand-primary hover:bg-brand-primary hover:text-white"
            }`}
          >
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;