import { FiHeart } from "react-icons/fi";
import { useWishlist } from "../../context/WishlistContext";

const WishlistIcon = ({ onClick }) => {
  const { wishlistCount } = useWishlist();

  return (
    <button onClick={onClick} className="relative cursor-pointer">
      <FiHeart className="text-2xl hover:text-brand-primary transition" />

      {wishlistCount > 0 && (
        <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brand-primary text-white text-[10px] flex items-center justify-center">
          {wishlistCount}
        </span>
      )}
    </button>
  );
};

export default WishlistIcon;