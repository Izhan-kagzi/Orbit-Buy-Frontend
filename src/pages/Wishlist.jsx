import { Link } from "react-router-dom";
import { FiShoppingBag, FiTrash2, FiHeart } from "react-icons/fi";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { getImageUrl } from "../services/api";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <FiHeart className="text-6xl text-gray-300 mb-6" />
        <h2 className="text-3xl font-serif text-brand-dark mb-4">Your Wishlist is Empty</h2>
        <p className="text-gray-500 mb-8">Explore our collection to add your favorite items.</p>
        <Link to="/shop" className="bg-brand-primary text-white px-8 py-3 rounded-full font-bold tracking-wider hover:bg-brand-brown transition">
          RETURN TO SHOP
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
      <div className="flex flex-wrap justify-between items-center gap-4 border-b border-gray-200 pb-6 mb-10">
        <div>
          <p className="uppercase tracking-[5px] text-brand-primary font-semibold text-sm">Saved Items</p>
          <h1 className="text-4xl font-serif font-semibold text-brand-dark mt-2">My Wishlist</h1>
        </div>
        <button
          onClick={clearWishlist}
          className="text-sm font-bold text-red-600 hover:text-red-800 transition uppercase tracking-wider"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map((product) => {
          const isOutOfStock = (product.stock ?? 0) <= 0;
          return (
            <div key={product.id} className="border border-gray-200 bg-white rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow-lg transition">
              <div>
                <Link to={`/product/${product.id}`}>
                  <img
                    src={getImageUrl(product.image)}
                    alt={product.name}
                    className={`w-full h-48 object-cover rounded-xl mb-4 ${isOutOfStock ? "grayscale opacity-70" : ""}`}
                  />
                </Link>
                <h3 className="text-lg font-serif font-semibold text-brand-dark">{product.name}</h3>
                <p className="text-brand-primary font-bold mt-1">₹{product.price}</p>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => addToCart(product)}
                  disabled={isOutOfStock}
                  className="flex-1 bg-brand-primary text-white py-2.5 rounded-full text-sm font-bold tracking-wide hover:bg-brand-brown transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiShoppingBag size={15} />
                  {isOutOfStock ? "Sold Out" : "Add to Cart"}
                </button>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="w-11 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition flex items-center justify-center"
                  aria-label="Remove from wishlist"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;
