import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiBox,
  FiShoppingBag,
  FiUsers,
  FiDollarSign,
  FiAlertTriangle,
  FiPlus,
  FiTrendingUp,
  FiTrendingDown,
} from "react-icons/fi";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import AdminLayout from "../../components/Admin/AdminLayout";
import api from "../../services/api";

const StatCard = ({ icon: Icon, label, value, accent }) => (
  <div className="rounded-3xl border border-gray-200 bg-white p-6 flex items-center gap-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
    <div
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl"
      style={{ backgroundColor: accent, color: "#fff" }}
    >
      <Icon />
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-brand-dark">{value}</p>
    </div>
  </div>
);

const PERIODS = [
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

const formatMoney = (value) => `₹${Math.round(Number(value || 0)).toLocaleString("en-IN")}`;

const formatDateTime = (value) => {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg bg-brand-dark px-4 py-2 text-sm text-white shadow-lg">
      <p className="font-semibold">{label}</p>
      <p>{formatMoney(payload[0].value)}</p>
    </div>
  );
};

const priorityForStock = (stock) => {
  if (stock <= 0) return { label: "Critical", className: "bg-red-100 text-red-700" };
  if (stock <= 5) return { label: "High", className: "bg-orange-100 text-orange-700" };
  if (stock <= 15) return { label: "Medium", className: "bg-sky-100 text-sky-700" };
  return { label: "Low", className: "bg-indigo-100 text-indigo-700" };
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("weekly");
  const [sales, setSales] = useState(null);
  const [salesLoading, setSalesLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [activityLoading, setActivityLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/orders/admin/stats"),
      api.get("/orders/admin/all"),
      api.get("/products?limit=200"),
    ])
      .then(([statsRes, ordersRes, productsRes]) => {
        setStats(statsRes?.stats || null);
        setOrders(ordersRes?.orders || []);
        setProducts(productsRes?.products || []);
      })
      .catch(() => {
        setStats(null);
        setOrders([]);
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
        setActivityLoading(false);
      });
  }, []);

  useEffect(() => {
    setSalesLoading(true);
    api
      .get(`/orders/admin/sales?period=${period}`)
      .then((res) => setSales(res))
      .catch(() => setSales(null))
      .finally(() => setSalesLoading(false));
  }, [period]);

  const recentTransactions = useMemo(
    () => orders.filter((order) => order.status !== "Cancelled").slice(0, 6),
    [orders]
  );

  const productPerformance = useMemo(() => {
    const metrics = new Map();

    orders.forEach((order) => {
      if (order.status === "Cancelled") return;

      (order.items || []).forEach((item) => {
        const id = String(item.id);
        const current = metrics.get(id) || {
          id,
          name: item.name || "Unknown product",
          category: item.category || "—",
          units: 0,
          revenue: 0,
        };

        current.units += Number(item.quantity || 0);
        current.revenue += Number(item.lineTotal || item.price || 0) *
          (item.lineTotal ? 1 : Number(item.quantity || 1));
        metrics.set(id, current);
      });
    });

    return products
      .map((product, index) => {
        const metric = metrics.get(String(product.id)) || {
          units: 0,
          revenue: 0,
        };
        const priority = priorityForStock(Number(product.stock || 0));

        return {
          id: product.id || index + 1,
          name: product.name,
          category: product.category || "—",
          units: metric.units,
          revenue: metric.revenue,
          stock: Number(product.stock || 0),
          priority,
        };
      })
      .sort((a, b) => {
        if (b.revenue !== a.revenue) return b.revenue - a.revenue;
        return b.units - a.units;
      })
      .slice(0, 6);
  }, [orders, products]);

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-brand-dark">Dashboard</h1>
          <p className="mt-1 text-gray-500">A quick overview of your store.</p>
        </div>

        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-3 font-semibold text-white transition hover:bg-brand-brown"
        >
          <FiPlus />
          Add Product
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-brand-primary" />
        </div>
      ) : !stats ? (
        <p className="text-gray-500">Couldn't load dashboard stats.</p>
      ) : (
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard icon={FiBox} label="Total Products" value={stats.totalProducts} accent="#09335A" />
          <StatCard icon={FiShoppingBag} label="Total Orders" value={stats.totalOrders} accent="#6B563D" />
          <StatCard icon={FiUsers} label="Registered Users" value={stats.totalUsers} accent="#031E3D" />
          <StatCard icon={FiDollarSign} label="Total Revenue" value={formatMoney(stats.totalRevenue)} accent="#09335A" />
          <StatCard icon={FiAlertTriangle} label="Limited Stock (≤5)" value={stats.lowStockProducts} accent="#B45309" />
          <StatCard icon={FiAlertTriangle} label="Out of Stock" value={stats.outOfStockProducts} accent="#B91C1C" />
        </div>
      )}

      <div className="mb-8 rounded-3xl border border-gray-200 bg-white p-6 lg:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl text-brand-dark">Sale Statistic</h2>
            <p className="mt-1 text-sm text-gray-500">Revenue trend for your store</p>
          </div>

          <div className="flex rounded-full bg-gray-100 p-1">
            {PERIODS.map((p) => (
              <button
                key={p.value}
                onClick={() => setPeriod(p.value)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  period === p.value
                    ? "bg-brand-primary text-white"
                    : "text-gray-500 hover:text-brand-primary"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {salesLoading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-brand-primary" />
          </div>
        ) : !sales ? (
          <p className="py-20 text-center text-gray-500">Couldn't load sales data.</p>
        ) : (
          <>
            <div className="mb-4 flex flex-wrap items-end gap-3">
              <p className="text-3xl font-bold text-brand-dark">{formatMoney(sales.totalSales)}</p>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm font-semibold ${
                  sales.changePercent >= 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {sales.changePercent >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                {Math.abs(sales.changePercent)}%
              </span>
              <span className="text-sm text-gray-400">
                vs last {period === "weekly" ? "week" : period === "monthly" ? "month" : "year"} · {sales.totalOrders} order{sales.totalOrders !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="-ml-2 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sales.data}>
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#09335A" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#09335A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} width={50} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="sales" stroke="#09335A" strokeWidth={3} fill="url(#salesGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[0.8fr_1.2fr]">
        {/* Recent Transactions */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 lg:p-8">
          <div className="mb-8">
            <h2 className="font-serif text-2xl text-brand-dark">Recent Transactions</h2>
            <p className="mt-1 text-gray-500">Latest successful store orders</p>
          </div>

          {activityLoading ? (
            <div className="flex justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-brand-primary" />
            </div>
          ) : recentTransactions.length === 0 ? (
            <div className="py-16 text-center text-sm text-gray-500">No transactions yet.</div>
          ) : (
            <div className="relative space-y-7">
              <div className="absolute bottom-2 left-[10px] top-2 w-px bg-gray-200" />
              {recentTransactions.map((order) => {
                const customer =
                  order.customer?.name ||
                  `${order.shippingAddress?.firstName || ""} ${order.shippingAddress?.lastName || ""}`.trim() ||
                  "Customer";

                return (
                  <div key={order.id} className="relative flex gap-4">
                    <div className="relative z-10 mt-1 h-5 w-5 shrink-0 rounded-full border-2 border-brand-primary bg-white" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-sm text-gray-500">{formatDateTime(order.createdAt)}</span>
                        <span className="font-bold text-brand-dark">{formatMoney(order.total)}</span>
                      </div>
                      <p className="mt-1 font-semibold text-gray-800">Payment received from {customer}</p>
                      <p className="mt-1 text-sm text-gray-500">Order #{order.id} · {order.paymentMethod?.toUpperCase() || "PAYMENT"}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Product Performance */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 lg:p-8">
          <div className="mb-8">
            <h2 className="font-serif text-2xl text-brand-dark">Product Performance</h2>
            <p className="mt-1 text-gray-500">Overview of product sales and inventory</p>
          </div>

          {activityLoading ? (
            <div className="flex justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-brand-primary" />
            </div>
          ) : productPerformance.length === 0 ? (
            <div className="py-16 text-center text-sm text-gray-500">No products available.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-200 text-sm text-gray-500">
                    <th className="px-3 py-3 font-semibold">Id</th>
                    <th className="px-3 py-3 font-semibold">Product</th>
                    <th className="px-3 py-3 font-semibold">Category</th>
                    <th className="px-3 py-3 font-semibold">Priority</th>
                    <th className="px-3 py-3 font-semibold">Revenue</th>
                    <th className="px-3 py-3 text-right font-semibold">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {productPerformance.map((product, index) => (
                    <tr key={product.id} className="border-b border-gray-100 last:border-b-0">
                      <td className="px-3 py-4 text-sm text-gray-400">{index + 1}</td>
                      <td className="px-3 py-4">
                        <p className="font-semibold text-gray-800">{product.name}</p>
                        <p className="text-xs text-gray-400">{product.units} unit{product.units !== 1 ? "s" : ""} sold</p>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">{product.category}</td>
                      <td className="px-3 py-4">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${product.priority.className}`}>
                          {product.priority.label}
                        </span>
                      </td>
                      <td className="px-3 py-4 font-semibold text-gray-700">{formatMoney(product.revenue)}</td>
                      <td className="px-3 py-4 text-right font-semibold text-gray-500">{product.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;