import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "../../context/CartContext";

const CartIcon = ({ onClick }) => {
  const { cartCount } = useCart();

  return (
    <button
      onClick={onClick}
      className="relative cursor-pointer"
    >
      <FiShoppingCart className="text-2xl hover:text-brand-primary transition" />

      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brand-primary text-white text-[10px] flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </button>
  );
};

export default CartIcon;