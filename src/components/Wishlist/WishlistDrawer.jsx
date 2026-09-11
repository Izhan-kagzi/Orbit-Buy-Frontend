import { FiX } from "react-icons/fi";
import { useWishlist } from "../../context/WishlistContext";
import WishlistItem from "./WishlistItem";
import EmptyWishlist from "./EmptyWishlist";

const WishlistDrawer = ({ isOpen, onClose }) => {
  const { wishlistItems } = useWishlist();

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-brand-primary/50 z-40 transition ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <div
        className={`fixed top-0 right-0 w-full sm:w-[420px] h-screen bg-white z-50 shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-2xl font-bold">Wishlist</h2>
          <button onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        <div className="p-5 overflow-y-auto h-[calc(100vh-80px)]">
          {wishlistItems.length === 0 ? (
            <EmptyWishlist />
          ) : (
            <div className="space-y-4">
              {wishlistItems.map((item) => (
                <WishlistItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistDrawer;