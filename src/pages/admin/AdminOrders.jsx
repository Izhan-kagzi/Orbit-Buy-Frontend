import { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp, FiMapPin, FiUser } from "react-icons/fi";

import AdminLayout from "../../components/Admin/AdminLayout";
import TableSkeleton from "../../components/Skeleton/TableSkeleton";
import api from "../../services/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

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

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        {loading ? (
          <TableSkeleton rows={6} cols={5} />
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500 py-24">
            No orders yet.
          </p>
        ) : (
          <div className="divide-y divide-gray-100">
            {orders.map((order) => {
              const isOpen = expandedId === order.id;
              const addr = order.shippingAddress || {};
              const customerName =
                order.customer?.name ||
                `${addr.firstName || ""} ${addr.lastName || ""}`.trim() ||
                "Unknown";

              return (
                <div key={order.id}>
                  <button
                    onClick={() => toggleExpand(order.id)}
                    className="w-full flex flex-wrap items-center justify-between gap-4 px-6 py-5 hover:bg-gray-50 transition text-left"
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

                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                      {order.status}
                    </span>

                    {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                  </button>

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
