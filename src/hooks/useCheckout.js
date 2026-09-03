import { useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import api from "../services/api";

const TAX_RATE = 0.05;
const SHIPPING_CHARGE = 99;
const FREE_SHIPPING_THRESHOLD = 999;

const useCheckout = () => {
  const { cartItems, clearCart } = useCart();

  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
  });

  const [billingData, setBillingData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
  });

  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const [showSuccess, setShowSuccess] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + Number(item.price) * Number(item.quantity || 1),
      0
    );
  }, [cartItems]);

  const tax = useMemo(() => subtotal * TAX_RATE, [subtotal]);

  const shippingCharge = useMemo(
    () => (subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CHARGE),
    [subtotal]
  );

  const total = useMemo(() => {
    return subtotal + shippingCharge + tax - discount;
  }, [subtotal, shippingCharge, tax, discount]);

  const applyCoupon = async () => {
    try {
      const res = await api.post("/coupons/apply", {
        code: coupon,
        subtotal,
      });
      setDiscount(res.discount);
      return true;
    } catch (error) {
      setDiscount(0);
      return false;
    }
  };

  // Asks the backend to create a Stripe PaymentIntent for the
  // current cart total (server computes the amount — never trust a
  // client-supplied figure here). Returns { clientSecret } to hand
  // to Stripe Elements for card confirmation.
  const createPaymentIntent = async () => {
    return api.post("/payments/create-intent", {
      couponCode: discount > 0 ? coupon : undefined,
    });
  };

  const placeOrder = async ({ paymentIntentId } = {}) => {
    if (cartItems.length === 0) return { success: false };

    const billing = billingSameAsShipping ? shippingData : billingData;

    setPlacing(true);

    try {
      const res = await api.post("/orders", {
        paymentMethod,
        paymentIntentId,
        couponCode: discount > 0 ? coupon : undefined,
        shippingAddress: {
          firstName: shippingData.firstName,
          lastName: shippingData.lastName,
          phone: shippingData.phone,
          email: shippingData.email,
          address: shippingData.address,
          apartment: shippingData.apartment,
          city: shippingData.city,
          state: shippingData.state,
          country: shippingData.country,
          pincode: shippingData.pincode,
        },
        billingAddress: billing,
      });

      setLastOrder(res.order);
      setShowSuccess(true);

      // The backend already empties the cart on its side once the
      // order is created — clear the client's local cart state too,
      // immediately, so the UI (cart badge, cart page) reflects it
      // without waiting on a refetch.
      await clearCart();

      return { success: true, orderId: res.order.id };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setPlacing(false);
    }
  };

  return {
    cartItems,

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

    showSuccess,
    setShowSuccess,

    placing,
    lastOrder,

    applyCoupon,

    createPaymentIntent,

    placeOrder,
  };
};

export default useCheckout;
