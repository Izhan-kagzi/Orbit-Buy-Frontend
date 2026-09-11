const ShippingAddress = ({ shippingData, setShippingData }) => {
  const handleChange = (field) => (e) => {
    setShippingData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Shipping Address
      </h2>

      <div className="space-y-5">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="First Name"
            value={shippingData?.firstName || ""}
            onChange={handleChange("firstName")}
            className="border rounded-lg p-3 w-full min-w-0"
          />

          <input
            type="text"
            placeholder="Last Name"
            value={shippingData?.lastName || ""}
            onChange={handleChange("lastName")}
            className="border rounded-lg p-3 w-full min-w-0"
          />

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <input
            type="email"
            placeholder="Email"
            value={shippingData?.email || ""}
            onChange={handleChange("email")}
            className="border rounded-lg p-3 w-full min-w-0"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={shippingData?.phone || ""}
            onChange={handleChange("phone")}
            className="border rounded-lg p-3 w-full min-w-0"
          />

        </div>

        <input
          type="text"
          placeholder="Address"
          value={shippingData?.address || ""}
          onChange={handleChange("address")}
          className="border rounded-lg p-3 w-full min-w-0"
        />

        <input
          type="text"
          placeholder="Apartment, suite, etc. (optional)"
          value={shippingData?.apartment || ""}
          onChange={handleChange("apartment")}
          className="border rounded-lg p-3 w-full min-w-0"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

          <input
            type="text"
            placeholder="City"
            value={shippingData?.city || ""}
            onChange={handleChange("city")}
            className="border rounded-lg p-3 w-full min-w-0"
          />

          <input
            type="text"
            placeholder="State"
            value={shippingData?.state || ""}
            onChange={handleChange("state")}
            className="border rounded-lg p-3 w-full min-w-0"
          />

          <input
            type="text"
            placeholder="PIN Code"
            value={shippingData?.pincode || ""}
            onChange={handleChange("pincode")}
            className="border rounded-lg p-3 w-full min-w-0"
          />

        </div>

      </div>

    </div>
  );
};

export default ShippingAddress;
