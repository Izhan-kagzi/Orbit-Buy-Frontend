import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import CheckoutLayout from "../components/Checkout/CheckoutLayout";
import ShippingAddress from "../components/Checkout/ShippingAddress";
import BillingForm from "../components/Checkout/BillingForm";
import PaymentMethod from "../components/Checkout/PaymentMethod";
import OrderSummary from "../components/Checkout/OrderSummary";
import CouponBox from "../components/Checkout/CouponBox";
import PriceDetails from "../components/Checkout/PriceDetails";
import PlaceOrderButton from "../components/Checkout/PlaceOrderButton";
import StripeCardForm from "../components/Payment/StripeCardForm";

import useCheckout from "../hooks/useCheckout";

const Checkout = () => {
  const navigate = useNavigate();

  const {
    shippingData,
    setShippingData,

    billingData,
    setBillingData,

    billingSameAsShipping,
    setBillingSameAsShipping,

    paymentMethod,
    setPaymentMethod,

    coupon,
    setCoupon,

    discount,
    shippingCharge,
    tax,

    subtotal,
    total,

    cartItems,

    applyCoupon,
    createPaymentIntent,
    placeOrder,
  } = useCheckout();

  const addressComplete = Boolean(
    shippingData.address &&
      shippingData.city &&
      shippingData.pincode &&
      shippingData.phone
  );

  const goToConfirmation = (orderId) => {
    navigate(`/order-confirmation/${orderId}`);
  };

  const handlePlaceOrder = async () => {
    if (!addressComplete) {
      return {
        success: false,
        message:
          "Please fill in your address, city, PIN code and phone number.",
      };
    }

    const result = await placeOrder();

    if (result.success) {
      goToConfirmation(result.orderId);
    }

    return result;
  };

  const handleCardPaymentConfirmed = async (paymentIntentId) => {
    const result = await placeOrder({ paymentIntentId });

    if (result.success) {
      goToConfirmation(result.orderId);
    } else {
      toast.error(
        result.message ||
          "Your payment succeeded but we couldn't record the order. Please contact support."
      );
    }
  };

  return (
    <CheckoutLayout>
      <div className="py-4">

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-serif text-brand-dark">
            Checkout
          </h1>

          <p className="text-gray-500 mt-2">
            Complete your order securely with Orbit Buy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 min-w-0">

          {/* Left Side */}
          <div className="lg:col-span-2 space-y-8 min-w-0">

            <ShippingAddress
              shippingData={shippingData}
              setShippingData={setShippingData}
            />

            <BillingForm
              billingData={billingData}
              setBillingData={setBillingData}
              billingSameAsShipping={billingSameAsShipping}
              setBillingSameAsShipping={setBillingSameAsShipping}
              shippingData={shippingData}
            />

            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />

            {paymentMethod === "card" && (
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-2xl font-serif text-brand-dark mb-6">
                  Card Details
                </h2>

                {!addressComplete ? (
                  <p className="text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-xl p-4">
                    Please complete your shipping address above before
                    entering payment details.
                  </p>
                ) : (
                  <StripeCardForm
                    createPaymentIntent={createPaymentIntent}
                    onPaymentConfirmed={handleCardPaymentConfirmed}
                    disabled={cartItems.length === 0}
                  />
                )}
              </div>
            )}

          </div>

          {/* Right Side */}
          <div className="space-y-6 min-w-0">

            <CouponBox
              coupon={coupon}
              setCoupon={setCoupon}
              applyCoupon={applyCoupon}
            />

            <OrderSummary
              cartItems={cartItems}
            />

            <PriceDetails
              subtotal={subtotal}
              shipping={shippingCharge}
              tax={tax}
              discount={discount}
              total={total}
            />

            {/* Card payments use their own "Pay & Place Order" button
                inside StripeCardForm, since that flow needs to confirm
                payment with Stripe before an order can be created. */}
            {paymentMethod !== "card" && (
              <PlaceOrderButton
                disabled={cartItems.length === 0}
                onPlaceOrder={handlePlaceOrder}
              />
            )}

          </div>

        </div>
      </div>
    </CheckoutLayout>
  );
};

export default Checkout;
