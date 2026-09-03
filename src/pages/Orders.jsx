import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPackage, FiChevronDown, FiChevronUp, FiXCircle } from "react-icons/fi";
import toast from "react-hot-toast";

import api, { getImageUrl } from "../services/api";
import { useAuth } from "../hooks/useAuth";

const CANCELLABLE_STATUSES = ["Confirmed"];

const cancellationBadge = (order) => {
  const status = order.cancellation?.status;

  if (order.status === "Cancelled") {
    return <span className="inline-block px-4 py-1.5 rounded-full bg-gray-200 text-gray-600 text-sm font-semibold">Cancelled</span>;
  }
  if (status === "requested") {
    return <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold">Cancellation Requested</span>;
  }
  if (status === "rejected") {
    return <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 text-red-600 text-sm font-semibold">Cancellation Rejected</span>;
  }
  return <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold">{order.status || "Confirmed"}</span>;
};

const Orders = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadOrders = () => {
    api
      .get("/orders")
      .then((res) => setOrders(res.orders))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, navigate]);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const submitCancellation = async (orderId) => {
    setSubmitting(true);
    try {
      await api.post(`/orders/${orderId}/request-cancellation`, { reason });
      toast.success("Cancellation request submitted for review.");
      setCancellingId(null);
      setReason("");
      loadOrders();
    } catch (error) {
      toast.error(error.message || "Couldn't submit cancellation request.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-brand-primary rounded-full animate-spin" />
      </section>
    );
  }

  if (orders.length === 0) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="text-center">
          <FiPackage className="text-7xl text-gray-300 mb-6 mx-auto" />

          <h2 className="text-3xl font-serif text-brand-dark">No Orders Yet</h2>

          <p className="text-gray-500 mt-3 max-w-md mx-auto">
            You haven't placed any orders yet. Start shopping to see
            your order history here.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-8 bg-brand-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-brand-brown transition"
          >
            Start Shopping
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-5">
        <div className="mb-10">
          <p className="uppercase tracking-[6px] text-brand-primary font-semibold">
            Account
          </p>
          <h1 className="text-4xl font-serif text-brand-dark mt-3">My Orders</h1>
          <p className="text-gray-500 mt-2">
            {orders.length} order{orders.length > 1 ? "s" : ""} placed
          </p>
        </div>

        <div className="space-y-5">
          {orders.map((order) => {
            const isOpen = expandedId === order.id;
            const canRequestCancellation =
              CANCELLABLE_STATUSES.includes(order.status) &&
              !order.cancellation?.status;
            const isCancelling = cancellingId === order.id;

            return (
              <div
                key={order.id}
                className="border border-gray-200 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => toggleExpand(order.id)}
                  className="w-full flex flex-wrap items-center justify-between gap-4 p-6 hover:bg-gray-50 transition text-left"
                >
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-bold text-lg">{order.id}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-semibold">
                      {new Date(order.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Items</p>
                    <p className="font-semibold">
                      {order.items?.length || 0}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-bold text-lg text-brand-primary">
                      ₹{Math.round(order.total)}
                    </p>
                  </div>

                  <div>{cancellationBadge(order)}</div>

                  {isOpen ? (
                    <FiChevronUp className="text-xl shrink-0" />
                  ) : (
                    <FiChevronDown className="text-xl shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="border-t border-gray-100 p-6 bg-gray-50">
                    <div className="space-y-4">
                      {order.items?.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-100"
                        >
                          <img
                            src={getImageUrl(item.image)}
                            alt={item.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />

                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">
                              {item.name}
                            </p>
                            <p className="text-gray-500 text-sm">
                              Qty: {item.quantity}
                            </p>
                          </div>

                          <p className="font-bold">
                            ₹{item.price * item.quantity}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-col items-end text-sm space-y-1 text-gray-600">
                      <p>Subtotal: ₹{Math.round(order.subtotal)}</p>
                      <p>Tax: ₹{Math.round(order.tax)}</p>
                      {order.discount > 0 && (
                        <p>Discount: -₹{order.discount}</p>
                      )}
                      <p className="font-bold text-brand-dark text-base mt-1">
                        Total: ₹{Math.round(order.total)}
                      </p>
                    </div>

                    {order.cancellation?.status === "requested" && (
                      <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                        Your cancellation request is being reviewed by our team.
                      </div>
                    )}

                    {order.cancellation?.status === "rejected" && (
                      <div className="mt-5 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                        Your cancellation request was reviewed and rejected.
                        Contact support if you have questions.
                      </div>
                    )}

                    {canRequestCancellation && (
                      <div className="mt-5 pt-5 border-t border-gray-200">
                        {isCancelling ? (
                          <div className="space-y-3">
                            <textarea
                              value={reason}
                              onChange={(e) => setReason(e.target.value)}
                              placeholder="Optional — tell us why you'd like to cancel"
                              rows={3}
                              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-brand-primary resize-none"
                            />
                            <div className="flex gap-3">
                              <button
                                onClick={() => submitCancellation(order.id)}
                                disabled={submitting}
                                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition disabled:opacity-60"
                              >
                                {submitting ? "Submitting..." : "Submit Request"}
                              </button>
                              <button
                                onClick={() => {
                                  setCancellingId(null);
                                  setReason("");
                                }}
                                className="px-5 py-2.5 rounded-full text-sm font-semibold border border-gray-200 hover:bg-gray-100 transition"
                              >
                                Keep Order
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setCancellingId(order.id)}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-800 transition"
                          >
                            <FiXCircle size={16} />
                            Apply for Cancellation
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Orders;
