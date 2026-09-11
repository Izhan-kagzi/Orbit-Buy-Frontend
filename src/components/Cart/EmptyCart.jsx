import { FiShoppingBag } from "react-icons/fi";

const EmptyCart = ({ onClose }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
      <FiShoppingBag className="text-7xl text-gray-300 mb-6" />

      <h3 className="text-2xl font-bold mb-2">
        Your cart is empty
      </h3>

      <p className="text-gray-500">
        Looks like you haven't added anything yet.
      </p>

      <button
        onClick={onClose}
        className="mt-8 bg-brand-primary text-white px-8 py-3 rounded-lg hover:bg-brand-brown transition"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default EmptyCart;