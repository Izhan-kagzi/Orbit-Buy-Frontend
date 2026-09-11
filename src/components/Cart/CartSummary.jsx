import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const CartSummary = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal } = useCart();

  const subtotal = cartTotal;
  const shipping = subtotal > 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white border rounded-2xl shadow-md p-6 sticky top-24">
      <h2 className="text-2xl font-bold mb-6">
        Order Summary
      </h2>

      {/* Item Count */}
      <div className="flex justify-between mb-4 text-gray-600">
        <span>Items</span>
        <span>{cartItems.length}</span>
      </div>

      {/* Subtotal */}
      <div className="flex justify-between mb-4">
        <span>Subtotal</span>
        <span className="font-semibold">
          ₹{subtotal}
        </span>
      </div>

      {/* Shipping */}
      <div className="flex justify-between mb-4">
        <span>Shipping</span>

        {shipping === 0 ? (
          <span className="text-green-600 font-semibold">
            FREE
          </span>
        ) : (
          <span>₹{shipping}</span>
        )}
      </div>

      {/* GST */}
      <div className="flex justify-between mb-6">
        <span>GST (5%)</span>
        <span>₹{tax}</span>
      </div>

      <hr />

      {/* Total */}
      <div className="flex justify-between text-2xl font-bold mt-6 mb-8">
        <span>Total</span>
        <span className="text-brand-primary">
          ₹{total}
        </span>
      </div>

      {/* Checkout */}
      <button
        onClick={() => navigate("/checkout")}
        disabled={cartItems.length === 0}
        className="w-full bg-brand-primary text-white py-4 rounded-xl hover:bg-brand-brown transition font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Proceed to Checkout
      </button>

      {/* Continue Shopping */}
      <button
        onClick={() => navigate("/shop")}
        className="w-full mt-3 border border-brand-primary py-3 rounded-xl hover:bg-brand-primary hover:text-white transition"
      >
        Continue Shopping
      </button>

      {/* Free Shipping Message */}
      {shipping !== 0 && (
        <p className="mt-5 text-center text-sm text-gray-500">
          Add{" "}
          <span className="font-semibold text-brand-primary">
            ₹{1000 - subtotal}
          </span>{" "}
          more to get
          <span className="font-semibold text-green-600">
            {" "}FREE Shipping
          </span>
        </p>
      )}
    </div>
  );
};

export default CartSummary;