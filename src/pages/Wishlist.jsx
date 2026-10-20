import { Link } from "react-router-dom";
import {
  FiChevronRight,
  FiShoppingBag,
  FiTrash2,
  FiHeart,
  FiArrowRight,
} from "react-icons/fi";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { getImageUrl } from "../services/api";

const Wishlist = () => {
  const {
    wishlistItems,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  const totalValue = wishlistItems.reduce(
    (total, item) => total + Number(item.price || 0),
    0
  );

  return (
    <>
      {/* Page Header — matching Cart */}
      <section className="bg-gray-100 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
          <p className="uppercase tracking-[5px] text-brand-primary font-semibold text-sm">
            Your Favorites
          </p>

          <h1 className="mt-4 text-4xl md:text-6xl font-serif text-brand-dark">
            My Wishlist
          </h1>

          <div className="mt-6 flex items-center justify-center gap-2 text-gray-500">
            <Link
              to="/"
              className="hover:text-brand-primary transition"
            >
              Home
            </Link>

            <FiChevronRight />

            <span className="text-brand-primary font-semibold">
              Wishlist
            </span>
          </div>
        </div>
      </section>

      {/* Wishlist Content */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          {wishlistItems.length === 0 ? (
            /* Empty Wishlist */
            <div className="bg-white border border-gray-200 rounded-3xl text-center py-20 md:py-24 px-6">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <FiHeart className="text-3xl text-brand-primary" />
              </div>

              <h2 className="text-3xl md:text-4xl font-serif text-brand-dark">
                Your Wishlist is Empty
              </h2>

              <p className="mt-5 text-gray-500 max-w-md mx-auto leading-relaxed">
                You haven't saved any favorites yet.
                Explore our collection and save the products
                you love for later.
              </p>

              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 mt-10 px-10 py-4 rounded-full bg-brand-primary hover:bg-brand-brown text-white font-semibold transition-all duration-300"
              >
                <FiShoppingBag />
                Explore Collection
                <FiArrowRight />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
              {/* Wishlist Items */}
              <div className="lg:col-span-2">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-serif text-brand-dark">
                      Saved Products
                    </h2>

                    <p className="text-gray-500 text-sm mt-2">
                      {wishlistItems.length}{" "}
                      {wishlistItems.length === 1 ? "item" : "items"}{" "}
                      saved for later
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={clearWishlist}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-700 transition"
                  >
                    <FiTrash2 />
                    Clear Wishlist
                  </button>
                </div>

                <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
                  {wishlistItems.map((product) => {
                    const isOutOfStock =
                      (product.stock ?? 0) <= 0;

                    return (
                      <div
                        key={product.id}
                        className="flex flex-col sm:flex-row items-center gap-5 md:gap-6 p-5 md:p-8 border-b border-gray-200 last:border-b-0"
                      >
                        {/* Product Image */}
                        <Link
                          to={`/product/${product.id}`}
                          className="shrink-0"
                        >
                          <img
                            src={getImageUrl(product.image)}
                            alt={product.name}
                            className={`w-32 h-32 md:w-36 md:h-36 rounded-2xl object-cover ${
                              isOutOfStock
                                ? "grayscale opacity-60"
                                : ""
                            }`}
                          />
                        </Link>

                        {/* Product Information */}
                        <div className="flex-1 w-full text-center sm:text-left">
                          <Link
                            to={`/product/${product.id}`}
                            className="inline-block"
                          >
                            <h3 className="text-xl md:text-2xl font-serif text-brand-dark hover:text-brand-primary transition">
                              {product.name}
                            </h3>
                          </Link>

                          <p className="text-xl font-bold text-brand-dark mt-3">
                            ₹{Number(product.price || 0).toLocaleString("en-IN")}
                          </p>

                          <p
                            className={`text-sm mt-2 font-medium ${
                              isOutOfStock
                                ? "text-red-500"
                                : "text-green-600"
                            }`}
                          >
                            {isOutOfStock
                              ? "Currently unavailable"
                              : "In stock"}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center justify-center gap-3">
                          <button
                            type="button"
                            onClick={() => addToCart(product)}
                            disabled={isOutOfStock}
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-brand-primary hover:bg-brand-brown text-white text-sm font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <FiShoppingBag size={16} />

                            {isOutOfStock
                              ? "Sold Out"
                              : "Add to Cart"}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              removeFromWishlist(product.id)
                            }
                            aria-label={`Remove ${product.name} from wishlist`}
                            title="Remove from wishlist"
                            className="w-11 h-11 rounded-full border border-red-100 bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Continue Shopping */}
                <div className="mt-8">
                  <Link
                    to="/shop"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-brand-tan bg-white text-brand-dark font-semibold hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-300"
                  >
                    <FiArrowRight className="rotate-180" />
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Wishlist Summary — matching Cart sidebar */}
              <div>
                <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 lg:sticky lg:top-28 shadow-sm">
                  <h2 className="text-2xl md:text-3xl font-serif text-brand-dark mb-8">
                    Wishlist Summary
                  </h2>

                  <div className="space-y-5">
                    <div className="flex justify-between items-center gap-4 text-gray-500">
                      <span>Saved Products</span>
                      <span className="font-semibold text-brand-dark">
                        {wishlistItems.length}
                      </span>
                    </div>

                    <div className="flex justify-between items-center gap-4 text-gray-500">
                      <span>Available Products</span>
                      <span className="font-semibold text-brand-dark">
                        {
                          wishlistItems.filter(
                            (item) => (item.stock ?? 0) > 0
                          ).length
                        }
                      </span>
                    </div>

                    <div className="flex justify-between items-center gap-4 text-gray-500">
                      <span>Out of Stock</span>
                      <span className="font-semibold text-brand-dark">
                        {
                          wishlistItems.filter(
                            (item) => (item.stock ?? 0) <= 0
                          ).length
                        }
                      </span>
                    </div>

                    <hr className="border-gray-200" />

                    <div className="space-y-2">
                      <p className="text-gray-500 text-sm">
                        Combined Product Value
                      </p>

                      <p className="text-3xl font-bold text-brand-dark">
                        ₹{totalValue.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/shop"
                    className="w-full mt-8 flex items-center justify-center gap-2 py-4 rounded-full bg-brand-primary hover:bg-brand-brown text-white font-semibold transition-all duration-300"
                  >
                    Discover More
                    <FiArrowRight />
                  </Link>

                  <p className="text-center text-sm text-gray-400 mt-5 leading-relaxed">
                    Your favorite products are saved here
                    so you can find them easily.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Wishlist;