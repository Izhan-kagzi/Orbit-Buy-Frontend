import { FiCheckCircle, FiShoppingBag, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const OrderSuccessModal = ({
  isOpen,
  onClose,
  orderId = "#OB123456",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-primary/60 px-4">

      <div className="relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">

        {/* Close */}

        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 hover:bg-gray-100 transition"
        >
          <FiX size={22} />
        </button>

        {/* Success Icon */}

        <div className="flex justify-center">

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">

            <FiCheckCircle
              size={60}
              className="text-green-600"
            />

          </div>

        </div>

        {/* Heading */}

        <div className="mt-6 text-center">

          <h2 className="text-3xl font-black">
            Order Placed!
          </h2>

          <p className="mt-3 text-gray-500 leading-7">
            Thank you for shopping with
            <span className="font-semibold">
              {" "}Orbit Buy
            </span>.
            Your order has been placed successfully.
          </p>

        </div>

        {/* Order Details */}

        <div className="mt-8 rounded-2xl border bg-gray-50 p-5">

          <div className="flex justify-between">

            <span className="text-gray-500">
              Order ID
            </span>

            <span className="font-bold">
              {orderId}
            </span>

          </div>

          <div className="mt-4 flex justify-between">

            <span className="text-gray-500">
              Payment Status
            </span>

            <span className="font-semibold text-green-600">
              Successful
            </span>

          </div>

          <div className="mt-4 flex justify-between">

            <span className="text-gray-500">
              Estimated Delivery
            </span>

            <span className="font-semibold">
              3 - 5 Days
            </span>

          </div>

        </div>

        {/* Buttons */}

        <div className="mt-8 grid gap-4 sm:grid-cols-2">

          <Link
            to="/orders"
            className="flex items-center justify-center gap-2 rounded-xl bg-brand-primary py-4 font-semibold text-white transition hover:bg-brand-brown"
          >
            <FiShoppingBag />
            My Orders
          </Link>

          <Link
            to="/"
            onClick={onClose}
            className="flex items-center justify-center rounded-xl border-2 border-gray-300 py-4 font-semibold transition hover:border-brand-primary hover:bg-gray-100"
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  );
};

export default OrderSuccessModal;