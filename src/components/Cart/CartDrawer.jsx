import { useNavigate } from "react-router-dom";
import {
  FiX,
  FiPlus,
  FiMinus,
  FiTrash2,
} from "react-icons/fi";

import { useCart } from "../../context/CartContext";
import EmptyCart from "./EmptyCart";
import { getImageUrl } from "../../services/api";

const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const {
    cartItems,
    cartTotal,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-brand-primary/50 z-40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 w-full sm:w-[430px] h-screen bg-white shadow-2xl z-50 transition-transform duration-300 flex flex-col ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h2 className="text-2xl font-bold">
            Shopping Cart
          </h2>

          <button
            onClick={onClose}
            className="text-2xl hover:text-red-500 transition"
          >
            <FiX />
          </button>
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <EmptyCart onClose={onClose} />
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border rounded-xl p-3"
                >
                  {/* Product Image */}
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />

                  {/* Product Info */}
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
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                        className="border rounded p-1 hover:bg-gray-100"
                      >
                        <FiMinus />
                      </button>

                      <span className="font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                        className="border rounded p-1 hover:bg-gray-100"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                    className="text-red-500 hover:text-red-700 text-xl"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t p-6">
              <div className="flex justify-between text-xl font-bold mb-5">
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-brand-primary text-white py-4 rounded-lg hover:bg-brand-brown transition font-semibold"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={clearCart}
                className="w-full mt-3 border border-red-500 text-red-500 py-3 rounded-lg hover:bg-red-500 hover:text-white transition"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;