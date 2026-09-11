import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { FiLock, FiAlertCircle } from "react-icons/fi";
import toast from "react-hot-toast";

import api from "../../services/api";

let stripePromise = null;
function getStripePromise(publishableKey) {
  if (!stripePromise) {
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
}

// Inner form — must live inside <Elements> to use the Stripe hooks.
const InnerForm = ({ clientSecret, onPaymentConfirmed, disabled }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handlePay = async () => {
    if (!stripe || !elements) return;

    setError("");
    setProcessing(true);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message);
        setProcessing(false);
        return;
      }

      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        redirect: "if_required",
      });

      if (confirmError) {
        setError(confirmError.message || "Payment failed. Please try again.");
        setProcessing(false);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        await onPaymentConfirmed(paymentIntent.id);
      } else {
        setError("Payment could not be completed. Please try again.");
        setProcessing(false);
      }
    } catch (err) {
      setError(err.message || "Something went wrong confirming your payment.");
      setProcessing(false);
    }
  };

  // Exposes the pay handler + processing state up to the parent
  // (PlaceOrderButton) via a global-ish pattern would be messy, so
  // instead this component owns its own submit button.
  return (
    <div className="space-y-5">
      <PaymentElement options={{ layout: "tabs" }} />

      {error && (
        <div className="flex items-start gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl p-3">
          <FiAlertCircle className="mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <button
        type="button"
        onClick={handlePay}
        disabled={!stripe || processing || disabled}
        className="w-full bg-brand-primary text-white py-4 rounded-xl font-semibold hover:bg-brand-brown transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <FiLock size={16} />
        {processing ? "Processing...." : "Pay & Place Order"}
      </button>

      <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1.5">
        <FiLock size={12} /> Secured by Stripe · Test mode
      </p>
    </div>
  );
};

// Outer wrapper — fetches a fresh PaymentIntent for the current cart
// total and mounts Stripe Elements once we have a clientSecret.
const StripeCardForm = ({ createPaymentIntent, onPaymentConfirmed, disabled }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [publishableKey, setPublishableKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [configError, setConfigError] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const config = await api.get("/payments/config", { auth: false });

        if (!config.stripeEnabled || !config.publishableKey) {
          if (!cancelled) {
            setConfigError(
              "Card payments aren't set up yet. Please choose another payment method."
            );
            setLoading(false);
          }
          return;
        }

        setPublishableKey(config.publishableKey);

        const intent = await createPaymentIntent();
        if (!cancelled) {
          setClientSecret(intent.clientSecret);
        }
      } catch (err) {
        if (!cancelled) {
          setConfigError(err.message || "Couldn't set up card payment.");
          toast.error(err.message || "Couldn't set up card payment.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="skeleton h-14 w-full rounded-xl" />
        <div className="skeleton h-14 w-full rounded-xl" />
        <div className="skeleton h-14 w-full rounded-xl" />
      </div>
    );
  }

  if (configError || !clientSecret || !publishableKey) {
    return (
      <div className="flex items-start gap-2 text-brand-brown text-sm bg-brand-tan/20 border border-brand-tan rounded-xl p-4">
        <FiAlertCircle className="mt-0.5 shrink-0" />
        <p>{configError || "Card payment isn't available right now."}</p>
      </div>
    );
  }

  return (
    <Elements
      stripe={getStripePromise(publishableKey)}
      options={{ clientSecret, appearance: { theme: "stripe" } }}
    >
      <InnerForm
        clientSecret={clientSecret}
        onPaymentConfirmed={onPaymentConfirmed}
        disabled={disabled}
      />
    </Elements>
  );
};

export default StripeCardForm;
