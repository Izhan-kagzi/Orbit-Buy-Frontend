import { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import toast from "react-hot-toast";

const PlaceOrderButton = ({
  disabled = false,
  onPlaceOrder,
}) => {
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (disabled) {
      toast.error("Please complete all required fields.");
      return;
    }

    setLoading(true);

    try {
      const result = onPlaceOrder ? await onPlaceOrder() : null;

      if (result && result.success === false) {
        toast.error(result.message || "Failed to place order.");
        return;
      }

      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error(error?.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <button
        onClick={handlePlaceOrder}
        disabled={loading || disabled}
        className="
          w-full
          flex
          items-center
          justify-center
          gap-3
          py-4
          rounded-xl
          bg-brand-primary
          text-white
          font-semibold
          text-lg
          transition-all
          duration-300
          hover:bg-brand-brown
          disabled:opacity-60
          disabled:cursor-not-allowed
        "
      >
        {loading ? (
          <>
            <svg
              className="h-5 w-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-20"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />

              <path
                className="opacity-100"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>

            Processing....
          </>
        ) : (
          <>
            <FiShoppingBag size={22} />
            Place Order
          </>
        )}
      </button>

      <p className="text-center text-gray-500 text-sm mt-4">
        By placing your order, you agree to our
        Terms & Conditions and Privacy Policy.
      </p>

    </div>
  );
};

export default PlaceOrderButton;