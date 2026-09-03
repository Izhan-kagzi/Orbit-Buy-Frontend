import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

const EmptyWishlist = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      {/* Icon */}
      <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mb-6">
        <FiHeart className="text-5xl text-red-500" />
      </div>

      {/* Heading */}
      <h2 className="text-3xl font-bold text-gray-800">
        Your Wishlist is Empty
      </h2>

      {/* Description */}
      <p className="text-gray-500 mt-3 max-w-md">
        Save your favorite products to your wishlist so you can
        easily find them later.
      </p>

      {/* Button */}
      <Link to="/">
        <button className="mt-8 bg-brand-primary text-white px-8 py-3 rounded-xl hover:bg-brand-brown transition duration-300 font-semibold shadow-lg">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
};

export default EmptyWishlist;