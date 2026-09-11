import { useCart } from "../../context/CartContext";
import { getImageUrl } from "../../services/api";

const OrderSummary = () => {

  const { cartItems } = useCart();

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Order Summary ({cartItems.length})
      </h2>

      <div className="space-y-4 max-h-80 overflow-y-auto pr-1">

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-start gap-3"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">

              <img
                src={getImageUrl(item.image)}
                alt={item.name}
                className="w-14 h-14 rounded-lg object-cover shrink-0"
              />

              <span className="text-sm min-w-0 break-words">
                {item.name} × {item.quantity}
              </span>

            </div>

            <span className="font-semibold shrink-0 whitespace-nowrap">
              ₹{item.price * item.quantity}
            </span>
          </div>
        ))}

      </div>

    </div>
  );
};

export default OrderSummary;
