import { FiTrash2 } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { getImageUrl } from "../../services/api";

const CartItem = ({ item }) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  return (
    <div className="flex gap-4 border-b pb-4 mb-4">

      {/* Product Image */}
      <img
        src={getImageUrl(item.image)}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-lg"
      />

      {/* Details */}
      <div className="flex-1">

        <h3 className="font-semibold text-lg">
          {item.name}
        </h3>

        <p className="text-brand-primary font-bold mt-1">
          ₹{item.price}
        </p>

        {/* Quantity */}
        <div className="flex items-center gap-3 mt-4">

          <button
            onClick={() => decreaseQuantity(item.id)}
            className="w-8 h-8 rounded border hover:bg-gray-100"
          >
            -
          </button>

          <span className="font-semibold">
            {item.quantity}
          </span>

          <button
            onClick={() => increaseQuantity(item.id)}
            className="w-8 h-8 rounded border hover:bg-gray-100"
          >
            +
          </button>

        </div>

      </div>

      {/* Remove */}
      <button
        onClick={() => removeFromCart(item.id)}
        className="text-red-500 hover:text-red-700 transition"
      >
        <FiTrash2 size={22} />
      </button>

    </div>
  );
};

export default CartItem;