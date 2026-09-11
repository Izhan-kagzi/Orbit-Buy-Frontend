import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiPackage,
  FiTruck,
  FiCopy,
  FiShoppingBag,
  FiMapPin,
} from "react-icons/fi";
import toast from "react-hot-toast";

import api, { getImageUrl } from "../services/api";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0 });

    api
      .get(`/orders/${orderId}`)
      .then((res) => setOrder(res.order))
      .catch(() => setOrder(null))
      .finally(() => setLoading(false));
  }, [orderId]);

  const copyTrackingNumber = () => {
    navigator.clipboard.writeText(orderId);
    toast.success("Tracking number copied");
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-brand-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl font-serif text-brand-dark mb-4">Order Not Found</h1>
        <p className="text-gray-500 mb-8">We couldn't find that order.</p>
        <Link to="/" className="bg-brand-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-brown transition">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-5">
      <div className="max-w-3xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          {/* Success header */}
          <div className="bg-brand-dark px-8 py-14 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6"
            >
              <FiCheckCircle className="text-brand-tan" size={44} />
            </motion.div>

            <p className="uppercase tracking-[5px] text-brand-tan text-xs font-semibold">
              Order Confirmed
            </p>
            <h1 className="text-3xl md:text-4xl font-serif text-white mt-3">
              Thank You{order.shippingAddress?.firstName ? `, ${order.shippingAddress.firstName}` : ""}!
            </h1>
            <p className="text-gray-300 mt-3 max-w-md mx-auto">
              Your order has been placed successfully and is being prepared.
            </p>
          </div>

          {/* Tracking number */}
          <div className="px-8 -mt-8">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Order Tracking Number
                </p>
                <p className="text-2xl font-bold text-brand-dark font-mono mt-1">
                  {order.id}
                </p>
              </div>
              <button
                onClick={copyTrackingNumber}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gray-100 hover:bg-brand-primary hover:text-white transition font-semibold text-sm"
              >
                <FiCopy size={14} />
                Copy
              </button>
            </div>
          </div>

          <div className="p-8 pt-6">

            {/* Status timeline */}
            <div className="flex items-center justify-between mb-10 mt-4">
              {[
                { icon: FiCheckCircle, label: "Confirmed", done: true },
                { icon: FiPackage, label: "Processing", done: false },
                { icon: FiTruck, label: "Shipped", done: false },
              ].map((step, i, arr) => (
                <div key={step.label} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center ${
                        step.done ? "bg-brand-primary text-white" : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <step.icon size={18} />
                    </div>
                    <span className="text-xs mt-2 text-gray-500">{step.label}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-2 ${step.done ? "bg-brand-primary" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Order details */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="flex items-center gap-2 font-semibold text-brand-dark mb-2">
                  <FiMapPin size={15} /> Shipping To
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {order.shippingAddress?.address}
                  {order.shippingAddress?.apartment ? `, ${order.shippingAddress.apartment}` : ""}
                  <br />
                  {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.pincode}
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="font-semibold text-brand-dark mb-2">Payment</p>
                <p className="text-sm text-gray-600 capitalize">
                  {order.paymentMethod === "card" ? "Credit / Debit Card" : order.paymentMethod}
                </p>
                <p className="text-sm text-green-600 font-semibold mt-1">
                  {order.paymentStatus || "Pending"}
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-4 mb-8">
              {order.items?.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-0">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-brand-dark truncate">{item.name}</p>
                    <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-brand-dark">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-xl font-bold text-brand-dark border-t border-gray-200 pt-6 mb-8">
              <span>Total Paid</span>
              <span>₹{Math.round(order.total)}</span>
            </div>

            {/* Actions */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                to="/orders"
                className="flex items-center justify-center gap-2 rounded-full bg-brand-primary py-4 font-semibold text-white hover:bg-brand-brown transition"
              >
                <FiShoppingBag />
                View My Orders
              </Link>
              <button
                onClick={() => navigate("/shop")}
                className="flex items-center justify-center rounded-full border-2 border-gray-200 py-4 font-semibold hover:border-brand-primary hover:text-brand-primary transition"
              >
                Continue Shopping
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
