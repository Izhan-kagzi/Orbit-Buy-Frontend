const BillingForm = ({
  billingData,
  setBillingData,
  billingSameAsShipping,
  setBillingSameAsShipping,
}) => {
  const handleChange = (field) => (e) => {
    setBillingData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">

        <h2 className="text-2xl font-bold">
          Billing Details
        </h2>

        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={billingSameAsShipping}
            onChange={(e) =>
              setBillingSameAsShipping(e.target.checked)
            }
            className="w-4 h-4"
          />
          Same as shipping address
        </label>

      </div>

      {!billingSameAsShipping && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="First Name"
            value={billingData?.firstName || ""}
            onChange={handleChange("firstName")}
            className="border rounded-lg p-3 w-full min-w-0"
          />

          <input
            type="text"
            placeholder="Last Name"
            value={billingData?.lastName || ""}
            onChange={handleChange("lastName")}
            className="border rounded-lg p-3 w-full min-w-0"
          />

          <input
            type="email"
            placeholder="Email"
            value={billingData?.email || ""}
            onChange={handleChange("email")}
            className="border rounded-lg p-3 w-full min-w-0"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={billingData?.phone || ""}
            onChange={handleChange("phone")}
            className="border rounded-lg p-3 w-full min-w-0"
          />

          <input
            type="text"
            placeholder="Address"
            value={billingData?.address || ""}
            onChange={handleChange("address")}
            className="border rounded-lg p-3 w-full min-w-0 sm:col-span-2"
          />

          <input
            type="text"
            placeholder="City"
            value={billingData?.city || ""}
            onChange={handleChange("city")}
            className="border rounded-lg p-3 w-full min-w-0"
          />

          <input
            type="text"
            placeholder="State"
            value={billingData?.state || ""}
            onChange={handleChange("state")}
            className="border rounded-lg p-3 w-full min-w-0"
          />

          <input
            type="text"
            placeholder="PIN Code"
            value={billingData?.pincode || ""}
            onChange={handleChange("pincode")}
            className="border rounded-lg p-3 w-full min-w-0 sm:col-span-2"
          />

        </div>
      )}

    </div>
  );
};

export default BillingForm;
