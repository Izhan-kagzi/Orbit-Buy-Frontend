import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiBox,
  FiPlusCircle,
  FiShoppingBag,
  FiTag,
  FiUsers,
  FiXCircle,
  FiLogOut,
  FiArrowLeft,
  FiMessageCircle,
  FiZap,
  FiBell,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
} from "react-icons/fi";

import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";

const adminNavItems = [
  { to: "/admin", label: "Dashboard", icon: FiGrid, exact: true },
  { to: "/admin/products", label: "Products", icon: FiBox },
  { to: "/admin/products/new", label: "Add Product", icon: FiPlusCircle },
  { to: "/admin/orders", label: "Orders", icon: FiShoppingBag },
  { to: "/admin/cancellations", label: "Cancellations", icon: FiXCircle },
  { to: "/admin/reviews", label: "Reviews", icon: FiMessageCircle },
  { to: "/admin/coupons", label: "Coupons", icon: FiTag },
  { to: "/admin/managers", label: "Managers", icon: FiUsers },
  { to: "/admin/flash-sale", label: "Flash Sale", icon: FiZap },
];

const managerNavItems = [
  { to: "/admin", label: "Dashboard", icon: FiGrid, exact: true },
  { to: "/admin/products", label: "Products", icon: FiBox },
  { to: "/admin/products/new", label: "Add Product", icon: FiPlusCircle },
  { to: "/admin/orders", label: "Orders", icon: FiShoppingBag },
  { to: "/admin/cancellations", label: "Cancellations", icon: FiXCircle },
  { to: "/admin/reviews", label: "Reviews", icon: FiMessageCircle },
  { to: "/admin/flash-sale", label: "Flash Sale", icon: FiZap },
];

const relativeTime = (date) => {
  if (!date) return "";
  const diff = Math.max(0, Date.now() - new Date(date).getTime());
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr${hours !== 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? "s" : ""} ago`;
};

const buildNotifications = ({ orders = [], cancellations = [], managers = [] }) => {
  const items = [];

  orders.slice(0, 8).forEach((order) => {
    const customer =
      order.customer?.name ||
      `${order.shippingAddress?.firstName || ""} ${order.shippingAddress?.lastName || ""}`.trim() ||
      "Customer";

    items.push({
      id: `order-${order.id}`,
      icon: FiCheckCircle,
      tone: "text-emerald-400 bg-emerald-400/10",
      title: "New order received",
      description: `${customer} placed order #${order.id}`,
      date: order.createdAt,
    });
  });

  cancellations.slice(0, 5).forEach((order) => {
    items.push({
      id: `cancel-${order.id}`,
      icon: FiAlertCircle,
      tone: "text-amber-400 bg-amber-400/10",
      title: "Cancellation needs review",
      description: `Order #${order.id} is waiting for a decision`,
      date: order.cancellation?.requestedAt || order.createdAt,
    });
  });

  managers
    .filter((manager) => manager.currentLoginAt)
    .slice(0, 5)
    .forEach((manager) => {
      items.push({
        id: `manager-${manager.id}-${manager.currentLoginAt}`,
        icon: FiClock,
        tone: "text-sky-400 bg-sky-400/10",
        title: `${manager.name} is ${manager.online ? "online" : "logged in"}`,
        description: manager.online
          ? "Manager session is currently active"
          : "Manager login was recorded",
        date: manager.currentLoginAt,
      });
    });

  return items
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    .slice(0, 5);
};

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const notificationRef = useRef(null);
  const { user, logout, isAdmin } = useAuth();

  const navItems = isAdmin ? adminNavItems : managerNavItems;

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);

  const loadNotifications = async () => {
    setNotificationsLoading(true);
    try {
      const requests = [
        api.get("/orders/admin/all"),
        api.get("/orders/admin/cancellations"),
      ];

      if (isAdmin) requests.push(api.get("/users/managers"));

      const [ordersRes, cancellationsRes, managersRes] = await Promise.all(
        requests
      );

      setNotifications(
        buildNotifications({
          orders: ordersRes?.orders || [],
          cancellations: cancellationsRes?.orders || [],
          managers: managersRes?.managers || [],
        })
      );
    } catch {
      setNotifications([]);
    } finally {
      setNotificationsLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, [isAdmin]);

  useEffect(() => {
    const handleOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const unreadCount = useMemo(
    () => (notificationsRead ? 0 : notifications.length),
    [notifications, notificationsRead]
  );

  const handleNotificationToggle = () => {
    const next = !notificationsOpen;
    setNotificationsOpen(next);
    if (next) {
      setNotificationsRead(true);
      loadNotifications();
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 lg:flex-row">
      <aside className="flex shrink-0 flex-col bg-brand-dark text-white lg:w-72">
        <div className="border-b border-white/10 px-8 py-8">
          <p className="text-xs uppercase tracking-[4px] text-brand-tan">Orbit Buy</p>
          <h2 className="mt-1 font-serif text-2xl">Admin Panel</h2>
        </div>

        <nav className="flex flex-1 gap-2 overflow-x-auto px-4 py-5 lg:flex-col lg:overflow-visible">
          {navItems.map(({ to, label, icon: Icon, exact }) => {
            const active = exact
              ? location.pathname === to
              : location.pathname.startsWith(to);

            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 whitespace-nowrap rounded-2xl px-5 py-3 transition ${
                  active
                    ? "bg-brand-primary text-white"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 px-8 py-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-primary font-semibold">
              {(user?.name || "A").charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs text-brand-tan">Signed in as</p>
              <p className="truncate font-semibold">{user?.name}</p>
            </div>
          </div>

          <Link
            to="/"
            className="mb-2 flex items-center gap-3 whitespace-nowrap rounded-2xl px-4 py-3 text-brand-tan transition hover:bg-white/10 hover:text-white"
          >
            <FiArrowLeft size={18} />
            Back to Store
          </Link>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-gray-300 transition hover:bg-white/10 hover:text-red-300"
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden">
        <div className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-200 bg-gray-100/90 px-6 py-4 backdrop-blur-sm lg:px-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-dark lg:hidden"
          >
            <FiArrowLeft size={16} />
            Back to Store
          </Link>

          <div className="hidden lg:block" />

          <div className="flex items-center gap-4">
            <div className="relative" ref={notificationRef}>
              <button
                type="button"
                onClick={handleNotificationToggle}
                aria-label="Notifications"
                className="relative flex h-11 w-11 items-center justify-center rounded-full text-brand-dark transition hover:bg-white"
              >
                <FiBell size={21} />
                {unreadCount > 0 && (
                  <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-blue-500 ring-2 ring-gray-100" />
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-14 z-50 w-[min(390px,calc(100vw-32px))] overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 text-white shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                    <div>
                      <h3 className="text-lg font-bold">Notification</h3>
                      <p className="text-xs text-slate-400">Latest admin activity</p>
                    </div>
                    <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-bold">
                      {unreadCount} new
                    </span>
                  </div>

                  <div className="max-h-[420px] overflow-y-auto">
                    {notificationsLoading ? (
                      <div className="flex justify-center py-12">
                        <div className="h-7 w-7 animate-spin rounded-full border-4 border-white/20 border-t-blue-400" />
                      </div>
                    ) : notifications.length === 0 ? (
                      <div className="px-6 py-12 text-center text-sm text-slate-400">
                        No new notifications.
                      </div>
                    ) : (
                      notifications.map((notification) => {
                        const Icon = notification.icon;
                        return (
                          <div
                            key={notification.id}
                            className="flex gap-3 border-b border-white/5 px-5 py-4 last:border-b-0"
                          >
                            <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${notification.tone}`}>
                              <Icon size={18} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold">{notification.title}</p>
                              <p className="mt-1 text-sm text-slate-400">
                                {notification.description}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                {relativeTime(notification.date)}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  <Link
                    to={isAdmin ? "/admin/orders" : "/admin/orders"}
                    onClick={() => setNotificationsOpen(false)}
                    className="m-4 flex items-center justify-center rounded-xl border border-blue-400 px-4 py-3 text-sm font-semibold text-blue-400 transition hover:bg-blue-400 hover:text-white"
                  >
                    See All Notifications
                  </Link>
                </div>
              )}
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-dark text-white font-bold">
              {(user?.name || "A").charAt(0).toUpperCase()}
            </div>

            <span className="hidden rounded-full bg-brand-tan px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-brown sm:inline-flex">
              {isAdmin ? "Admin" : "Manager"}
            </span>
          </div>
        </div>

        <div className="animate-fadeIn p-6 lg:p-10">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
