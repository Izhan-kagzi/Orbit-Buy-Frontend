import { useState } from "react";
import toast from "react-hot-toast";

const CouponBox = ({ coupon, setCoupon, applyCoupon }) => {
  const [applied, setApplied] = useState(false);

  const handleApply = async () => {
    if (!coupon || !coupon.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    const success = await applyCoupon();

    if (success) {
      setApplied(true);
      toast.success("Coupon applied successfully!");
    } else {
      setApplied(false);
      toast.error("Invalid coupon code");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-4">
        Coupon
      </h2>

      <div className="flex flex-col sm:flex-row gap-3">

        <input
          type="text"
          placeholder="Coupon Code"
          value={coupon || ""}
          onChange={(e) => {
            setCoupon(e.target.value);
            setApplied(false);
          }}
          className="border rounded-lg p-3 flex-1 w-full min-w-0"
        />

        <button
          onClick={handleApply}
          className="bg-brand-primary text-white px-6 py-3 sm:py-0 rounded-lg hover:bg-brand-brown transition shrink-0"
        >
          Apply
        </button>

      </div>

      {applied && (
        <p className="text-green-600 text-sm mt-3">
          Coupon applied!
        </p>
      )}

      <p className="text-gray-400 text-xs mt-3">
        Try: WELCOME10, SAVE20, or ORBIT50
      </p>

    </div>
  );
};

export default CouponBox;
