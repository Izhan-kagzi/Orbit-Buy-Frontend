import { FiMinus, FiPlus } from "react-icons/fi";

const QuantitySelector = ({
  quantity,
  setQuantity,
  maxStock = 99,
}) => {
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < maxStock) {
      setQuantity(quantity + 1);
    }
  };

  const handleChange = (e) => {
    const value = Number(e.target.value);

    if (isNaN(value)) {
      setQuantity(1);
      return;
    }

    if (value < 1) {
      setQuantity(1);
    } else if (value > maxStock) {
      setQuantity(maxStock);
    } else {
      setQuantity(value);
    }
  };

  return (
    <div className="flex flex-col gap-3">

      <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
        Quantity
      </label>

      <div className="flex items-center w-fit rounded-xl border border-gray-300 overflow-hidden">

        <button
          onClick={decreaseQuantity}
          className="
            w-12
            h-12
            flex
            items-center
            justify-center
            bg-gray-100
            hover:bg-brand-primary
            hover:text-white
            transition-all
            duration-300
          "
        >
          <FiMinus />
        </button>

        <input
          type="number"
          value={quantity}
          onChange={handleChange}
          min={1}
          max={maxStock}
          className="
            w-16
            h-12
            text-center
            outline-none
            font-semibold
            appearance-none
          "
        />

        <button
          onClick={increaseQuantity}
          className="
            w-12
            h-12
            flex
            items-center
            justify-center
            bg-gray-100
            hover:bg-brand-primary
            hover:text-white
            transition-all
            duration-300
          "
        >
          <FiPlus />
        </button>

      </div>

      <p className="text-sm text-gray-500">
        {maxStock} item{maxStock !== 1 ? "s" : ""} available
      </p>

    </div>
  );
};

export default QuantitySelector;