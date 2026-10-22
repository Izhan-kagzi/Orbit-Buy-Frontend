import { useEffect, useState } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiMapPin,
  FiSearch,
  FiUser,
  FiX,
} from "react-icons/fi";
import toast from "react-hot-toast";

import AdminLayout from "../../components/Admin/AdminLayout";
import TableSkeleton from "../../components/Skeleton/TableSkeleton";
import api from "../../services/api";

const STATUS_OPTIONS = [
  "Pending",
  "Confirmed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const STATUS_STYLES = {
  Pending: "bg-amber-100 text-amber-700",
  Confirmed: "bg-green-100 text-green-700",
  Processing: "bg-purple-100 text-purple-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-red-100 text-red-600",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [busyId, setBusyId] = useState(null);

  const normalizedSearch = search.trim().replace(/^#/, "").toLowerCase();

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;
    const matchesSearch =
      !normalizedSearch ||
      String(order.id).toLowerCase().includes(normalizedSearch);
    return matchesStatus && matchesSearch;
  });

  const changeStatus = async (order, status) => {
    if (status === order.status) return;

    if (
      status === "Cancelled" &&
      !window.confirm(
        `Cancel order #${order.id}? Stock will be restored and this can't be undone.`
      )
    ) {
      return;
    }

    setBusyId(order.id);
    try {
      const res = await api.put(`/orders/${order.id}/status`, { status });
      setOrders((prev) =>
        prev.map((o) =>
          o.id === order.id ? { ...o, ...res.order } : o
        )
      );
      toast.success(`Order #${order.id} marked ${status}.`);
    } catch (error) {
      toast.error(error.message || "Couldn't update the order status.");
    } finally {
      setBusyId(null);
    }
  };

  useEffect(() => {
    api
      .get("/orders/admin/all")
      .then((res) => setOrders(res.orders))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <AdminLayout>

      <div className="mb-8">
        <h1 className="text-3xl font-black">Orders</h1>
        <p className="text-gray-500 mt-1">
          {orders.length} order{orders.length !== 1 ? "s" : ""} placed across your store
        </p>
      </div>

      <div className="mb-6 space-y-4">
        <div className="relative max-w-md">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order ID (e.g. OB123456)"
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-10 text-sm outline-none focus:border-gray-400"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FiX />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {["All", ...STATUS_OPTIONS].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setStatusFilter(option)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                statusFilter === option
                  ? "bg-black text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        {loading ? (
          <TableSkeleton rows={6} cols={5} />
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500 py-24">
            No orders yet.
          </p>
        ) : filteredOrders.length === 0 ? (
          <p className="text-center text-gray-500 py-24">
            No orders match your search.
          </p>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredOrders.map((order) => {
              const isOpen = expandedId === order.id;
              const addr = order.shippingAddress || {};
              const customerName =
                order.customer?.name ||
                `${addr.firstName || ""} ${addr.lastName || ""}`.trim() ||
                "Unknown";

              return (
                <div key={order.id}>
                  <div className="flex flex-wrap items-center gap-4 pr-6 hover:bg-gray-50 transition">
                  <button
                    onClick={() => toggleExpand(order.id)}
                    className="flex-1 flex flex-wrap items-center justify-between gap-4 pl-6 py-5 text-left"
                  >
                    <div className="min-w-[110px]">
                      <p className="text-xs text-gray-400">Order ID</p>
                      <p className="font-semibold">#{order.id}</p>
                    </div>

                    <div className="min-w-[160px]">
                      <p className="text-xs text-gray-400">Customer</p>
                      <p className="font-semibold">{customerName}</p>
                    </div>

                    <div className="min-w-[120px]">
                      <p className="text-xs text-gray-400">Date</p>
                      <p className="text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString(
                          "en-IN",
                          { year: "numeric", month: "short", day: "numeric" }
                        )}
                      </p>
                    </div>

                    <div className="min-w-[80px]">
                      <p className="text-xs text-gray-400">Items</p>
                      <p className="text-gray-600">
                        {order.items?.length || 0}
                      </p>
                    </div>

                    <div className="min-w-[100px]">
                      <p className="text-xs text-gray-400">Total</p>
                      <p className="font-bold text-brand-primary">
                        ₹{Math.round(order.total)}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        STATUS_STYLES[order.status] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.status}
                    </span>

                    {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                  </button>

                  <select
                    value={order.status}
                    disabled={
                      busyId === order.id || order.status === "Cancelled"
                    }
                    onChange={(e) => changeStatus(order, e.target.value)}
                    aria-label={`Update status of order ${order.id}`}
                    className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium outline-none focus:border-gray-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {!STATUS_OPTIONS.includes(order.status) && (
                      <option value={order.status}>{order.status}</option>
                    )}
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  </div>

                  {isOpen && (
                    <div className="bg-gray-50 px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                      <div className="bg-white rounded-xl p-5 border border-gray-100">
                        <p className="flex items-center gap-2 font-semibold mb-3">
                          <FiUser /> Customer
                        </p>
                        <p className="text-sm text-gray-600">
                          {customerName}
                        </p>
                        {order.customer?.email && (
                          <p className="text-sm text-gray-600">
                            {order.customer.email}
                          </p>
                        )}
                        {(order.customer?.mobile || addr.phone) && (
                          <p className="text-sm text-gray-600">
                            {order.customer?.mobile || addr.phone}
                          </p>
                        )}
                      </div>

                      <div className="bg-white rounded-xl p-5 border border-gray-100">
                        <p className="flex items-center gap-2 font-semibold mb-3">
                          <FiMapPin /> Shipping Address
                        </p>
                        <p className="text-sm text-gray-600">
                          {addr.address}
                          {addr.apartment ? `, ${addr.apartment}` : ""}
                        </p>
                        <p className="text-sm text-gray-600">
                          {addr.city}
                          {addr.state ? `, ${addr.state}` : ""}
                          {addr.pincode ? ` - ${addr.pincode}` : ""}
                        </p>
                        <p className="text-sm text-gray-600">
                          {addr.country}
                        </p>
                        {addr.phone && (
                          <p className="text-sm text-gray-600 mt-1">
                            📞 {addr.phone}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2 bg-white rounded-xl p-5 border border-gray-100">
                        <p className="font-semibold mb-3">Items</p>
                        <div className="space-y-3">
                          {order.items?.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between text-sm"
                            >
                              <span className="text-gray-600">
                                {item.name} × {item.quantity}
                              </span>
                              <span className="font-semibold">
                                ₹{item.price * item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>

    </AdminLayout>
  );
};

export default AdminOrders;
