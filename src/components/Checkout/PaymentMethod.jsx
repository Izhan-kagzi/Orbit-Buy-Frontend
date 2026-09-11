const options = [
  { value: "cod", label: "Cash on Delivery" },
  { value: "card", label: "Credit / Debit Card" },
  { value: "upi", label: "UPI" },
  { value: "netbanking", label: "Net Banking" },
];

const PaymentMethod = ({ paymentMethod, setPaymentMethod }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Payment Method
      </h2>

      <div className="space-y-4">

        {options.map((option) => (
          <label
            key={option.value}
            className="flex gap-3 items-center cursor-pointer"
          >
            <input
              type="radio"
              name="payment"
              value={option.value}
              checked={paymentMethod === option.value}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-4 h-4 shrink-0"
            />
            {option.label}
          </label>
        ))}

      </div>

    </div>
  );
};

export default PaymentMethod;
