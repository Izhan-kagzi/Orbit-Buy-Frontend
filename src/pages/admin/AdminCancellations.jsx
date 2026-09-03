import { useEffect, useState } from "react";
import { FiCheck, FiX, FiClock, FiUser, FiMapPin } from "react-icons/fi";
import toast from "react-hot-toast";

import AdminLayout from "../../components/Admin/AdminLayout";
import TableSkeleton from "../../components/Skeleton/TableSkeleton";
import api from "../../services/api";

const AdminCancellations = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const loadRequests = () => {
    setLoading(true);
    api
      .get("/orders/admin/cancellations")
      .then((res) => setRequests(res.orders))
      .catch(() => setRequests([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const resolve = async (order, action) => {
    setBusyId(order.id);
    try {
      await api.put(`/orders/${order.id}/cancellation`, { action });
      toast.success(
        action === "approve"
          ? `Order #${order.id} cancelled — stock restored.`
          : `Cancellation request for #${order.id} rejected.`
      );
      setRequests((prev) => prev.filter((r) => r.id !== order.id));
    } catch (error) {
      toast.error(error.message || "Couldn't resolve this request.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <AdminLayout>

      <div className="mb-8">
        <h1 className="text-3xl font-serif text-brand-dark">Cancellation Requests</h1>
        <p className="text-gray-500 mt-1">
          {requests.length} pending request{requests.length !== 1 ? "s" : ""} awaiting review
        </p>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <TableSkeleton rows={4} cols={5} />
        </div>
      ) : requests.length === 0 ? (
        <div className="bg-white rounded-2xl shadow text-center py-24">
          <FiClock className="text-4xl text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No pending cancellation requests.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {requests.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl shadow p-6">

              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-xs text-gray-400">Order</p>
                  <p className="font-bold text-lg">#{order.id}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Requested</p>
                  <p className="text-gray-700">
                    {new Date(order.cancellation.requestedAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Order Total</p>
                  <p className="font-bold text-brand-primary">₹{Math.round(order.total)}</p>
                </div>

                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold self-center">
                  Awaiting Review
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="flex items-center gap-2 font-semibold text-sm mb-2">
                    <FiUser size={14} /> Customer
                  </p>
                  <p className="text-sm text-gray-600">{order.customer?.name}</p>
                  <p className="text-sm text-gray-600">{order.customer?.email}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="flex items-center gap-2 font-semibold text-sm mb-2">
                    <FiMapPin size={14} /> Shipping To
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.shippingAddress?.city}, {order.shippingAddress?.state}
                  </p>
                </div>
              </div>

              {order.cancellation.reason && (
                <div className="bg-brand-tan/20 border border-brand-tan rounded-xl p-4 mb-5">
                  <p className="text-xs uppercase tracking-wide text-brand-brown font-semibold mb-1">
                    Customer's Reason
                  </p>
                  <p className="text-sm text-brand-dark">{order.cancellation.reason}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => resolve(order, "approve")}
                  disabled={busyId === order.id}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
                >
                  <FiCheck /> Approve Cancellation
                </button>
                <button
                  onClick={() => resolve(order, "reject")}
                  disabled={busyId === order.id}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-red-500 hover:text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
                >
                  <FiX /> Reject
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </AdminLayout>
  );
};

export default AdminCancellations;
