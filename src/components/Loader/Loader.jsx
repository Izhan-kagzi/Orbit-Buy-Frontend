import { FiShoppingBag } from "react-icons/fi";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-9999">

      {/* Spinner */}
      <div className="relative">

        <div className="w-24 h-24 border-[6px] border-gray-200 rounded-full"></div>

        <div className="absolute inset-0 w-24 h-24 border-[6px] border-transparent border-t-blue-600 rounded-full animate-spin"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <FiShoppingBag className="text-4xl text-brand-primary" />
        </div>

      </div>

      {/* Brand Name */}
      <h1 className="mt-8 text-4xl font-extrabold tracking-[6px]">
        ORBIT<span className="text-brand-primary">BUY</span>
      </h1>

      {/* Loading Text */}
      <p className="mt-3 text-gray-500 text-lg animate-pulse">
        Setting up style…
      </p>

    </div>
  );
};

export default Loader;