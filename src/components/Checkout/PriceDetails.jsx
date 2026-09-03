const PriceDetails = ({
  subtotal = 0,
  shipping = 0,
  tax = 0,
  discount = 0,
  total = 0,
}) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Price Details
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between gap-3">

          <span className="text-gray-600">
            Subtotal
          </span>

          <span className="font-semibold text-right">
            ₹{Math.round(subtotal).toLocaleString()}
          </span>

        </div>

        <div className="flex justify-between gap-3">

          <span className="text-gray-600">
            Shipping
          </span>

          <span
            className={
              shipping === 0
                ? "font-semibold text-green-600"
                : "font-semibold"
            }
          >
            {shipping === 0
              ? "FREE"
              : `₹${shipping}`}
          </span>

        </div>

        <div className="flex justify-between gap-3">

          <span className="text-gray-600">
            GST (5%)
          </span>

          <span className="font-semibold">
            ₹{Math.round(tax)}
          </span>

        </div>

        {discount > 0 && (
          <div className="flex justify-between gap-3">

            <span className="text-gray-600">
              Coupon Discount
            </span>

            <span className="font-semibold text-green-600">
              - ₹{discount}
            </span>

          </div>
        )}

        <hr />

        <div className="flex justify-between gap-3 text-2xl font-bold">

          <span>Total Amount</span>

          <span className="text-right">
            ₹{Math.round(total).toLocaleString()}
          </span>

        </div>

      </div>

      {shipping === 0 && (
        <div className="mt-6 rounded-lg bg-green-50 border border-green-200 p-4">

          <p className="text-sm text-green-700 font-medium">
            🎉 Congratulations! Your order qualifies
            for FREE shipping.
          </p>

        </div>
      )}

    </div>
  );
};

export default PriceDetails;
