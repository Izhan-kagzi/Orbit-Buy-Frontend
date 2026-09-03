import { useEffect, useState } from "react";
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
  <div className="bg-white rounded-3xl border border-gray-200 p-6 flex items-center gap-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
      style={{ backgroundColor: accent, color: "#fff" }}
    >
      <Icon />
    </div>
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-2xl font-bold text-brand-dark mt-1">{value}</p>
    </div>
  </div>
);

const PERIODS = [
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-brand-dark text-white px-4 py-2 rounded-lg shadow-lg text-sm">
      <p className="font-semibold">{label}</p>
      <p>₹{payload[0].value.toLocaleString()}</p>
    </div>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const [period, setPeriod] = useState("weekly");
  const [sales, setSales] = useState(null);
  const [salesLoading, setSalesLoading] = useState(true);

  useEffect(() => {
    api
      .get("/orders/admin/stats")
      .then((res) => setStats(res.stats))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setSalesLoading(true);
    api
      .get(`/orders/admin/sales?period=${period}`)
      .then((res) => setSales(res))
      .catch(() => setSales(null))
      .finally(() => setSalesLoading(false));
  }, [period]);

  return (
    <AdminLayout>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif text-brand-dark">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            A quick overview of your store.
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-2 bg-brand-primary text-white px-5 py-3 rounded-full font-semibold hover:bg-brand-brown transition"
        >
          <FiPlus />
          Add Product
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-brand-primary rounded-full animate-spin" />
        </div>
      ) : !stats ? (
        <p className="text-gray-500">Couldn't load dashboard stats.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={FiBox}
            label="Total Products"
            value={stats.totalProducts}
            accent="#09335A"
          />
          <StatCard
            icon={FiShoppingBag}
            label="Total Orders"
            value={stats.totalOrders}
            accent="#6B563D"
          />
          <StatCard
            icon={FiUsers}
            label="Registered Users"
            value={stats.totalUsers}
            accent="#031E3D"
          />
          <StatCard
            icon={FiDollarSign}
            label="Total Revenue"
            value={`₹${stats.totalRevenue.toLocaleString()}`}
            accent="#09335A"
          />
          <StatCard
            icon={FiAlertTriangle}
            label="Limited Stock (≤5)"
            value={stats.lowStockProducts}
            accent="#B45309"
          />
          <StatCard
            icon={FiAlertTriangle}
            label="Out of Stock"
            value={stats.outOfStockProducts}
            accent="#B91C1C"
          />
        </div>
      )}

      {/* Sale Statistic */}
      <div className="bg-white rounded-3xl border border-gray-200 p-8">

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-serif text-brand-dark">Sale Statistic</h2>

          <div className="flex bg-gray-100 rounded-full p-1">
            {PERIODS.map((p) => (
              <button
                key={p.value}
                onClick={() => setPeriod(p.value)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
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
            <div className="w-8 h-8 border-4 border-gray-200 border-t-brand-primary rounded-full animate-spin" />
          </div>
        ) : !sales ? (
          <p className="text-gray-500 text-center py-20">
            Couldn't load sales data.
          </p>
        ) : (
          <>
            <div className="flex flex-wrap items-end gap-3 mb-4">
              <p className="text-3xl font-bold text-brand-dark">
                ₹{sales.totalSales.toLocaleString()}
              </p>
              <span
                className={`inline-flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-full ${
                  sales.changePercent >= 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {sales.changePercent >= 0 ? (
                  <FiTrendingUp />
                ) : (
                  <FiTrendingDown />
                )}
                {Math.abs(sales.changePercent)}%
              </span>
              <span className="text-gray-400 text-sm">
                vs last {period === "weekly" ? "week" : period === "monthly" ? "month" : "year"} · {sales.totalOrders} order{sales.totalOrders !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="h-72 -ml-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sales.data}>
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#09335A" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#09335A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 12, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                    width={50}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#09335A"
                    strokeWidth={3}
                    fill="url(#salesGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>

    </AdminLayout>
  );
};

export default AdminDashboard;