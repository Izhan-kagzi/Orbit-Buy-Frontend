import { FiShoppingCart, FiCreditCard, FiCheckCircle } from "react-icons/fi";

const CheckoutStepper = () => {
  return (
    <div className="flex justify-center items-center gap-8 py-6">

      <div className="flex items-center gap-2 text-brand-primary font-semibold">
        <FiShoppingCart />
        Cart
      </div>

      <div className="h-px w-20 bg-gray-300"></div>

      <div className="flex items-center gap-2 text-brand-primary font-semibold">
        <FiCreditCard />
        Checkout
      </div>

      <div className="h-px w-20 bg-gray-300"></div>

      <div className="flex items-center gap-2 text-gray-400">
        <FiCheckCircle />
        Success
      </div>

    </div>
  );
};

export default CheckoutStepper;