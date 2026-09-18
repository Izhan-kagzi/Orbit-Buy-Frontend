import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

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
} from "react-icons/fi";

import { useAuth } from "../../hooks/useAuth";

const adminNavItems = [
  {
    to: "/admin",
    label: "Dashboard",
    icon: FiGrid,
    exact: true,
  },

  {
    to: "/admin/products",
    label: "Products",
    icon: FiBox,
  },

  {
    to: "/admin/products/new",
    label: "Add Product",
    icon: FiPlusCircle,
  },

  {
    to: "/admin/orders",
    label: "Orders",
    icon: FiShoppingBag,
  },

  {
    to: "/admin/cancellations",
    label: "Cancellations",
    icon: FiXCircle,
  },

  {
    to: "/admin/reviews",
    label: "Reviews",
    icon: FiMessageCircle,
  },

  {
    to: "/admin/coupons",
    label: "Coupons",
    icon: FiTag,
  },

  {
    to: "/admin/managers",
    label: "Managers",
    icon: FiUsers,
  },

  {
    to: "/admin/flash-sale",
    label: "Flash Sale",
    icon: FiZap,
  },
];

/* ============================================================
   MANAGER NAVIGATION
============================================================ */

const managerNavItems = [
  {
    to: "/admin",
    label: "Dashboard",
    icon: FiGrid,
    exact: true,
  },

  {
    to: "/admin/products",
    label: "Products",
    icon: FiBox,
  },

  {
    to: "/admin/products/new",
    label: "Add Product",
    icon: FiPlusCircle,
  },

  {
    to: "/admin/orders",
    label: "Orders",
    icon: FiShoppingBag,
  },

  {
    to: "/admin/cancellations",
    label: "Cancellations",
    icon: FiXCircle,
  },

  {
    to: "/admin/reviews",
    label: "Reviews",
    icon: FiMessageCircle,
  },

  // Managers manage flash sales too — the route already allows
  // staff through, so the link belongs here as well.
  {
    to: "/admin/flash-sale",
    label: "Flash Sale",
    icon: FiZap,
  },
];

const AdminLayout = ({ children }) => {
  const location = useLocation();

  const navigate = useNavigate();

  const {
    user,
    logout,
    isAdmin,
  } = useAuth();

  const navItems = isAdmin
    ? adminNavItems
    : managerNavItems;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 lg:flex-row">
      {/* ====================================================
          SIDEBAR
      ==================================================== */}

      <aside className="flex shrink-0 flex-col bg-brand-dark text-white lg:w-72">
        <div className="border-b border-white/10 px-8 py-8">
          <p className="text-xs uppercase tracking-[4px] text-brand-tan">
            Orbit Buy
          </p>

          <h2 className="mt-1 font-serif text-2xl">
            Admin Panel
          </h2>
        </div>

        <nav className="flex flex-1 gap-2 overflow-x-auto px-4 py-5 lg:flex-col lg:overflow-visible">
          {navItems.map(
            ({
              to,
              label,
              icon: Icon,
              exact,
            }) => {
              const active = exact
                ? location.pathname === to
                : location.pathname.startsWith(
                    to
                  );

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
            }
          )}
        </nav>

        {/* ==================================================
            USER
        ================================================== */}

        <div className="border-t border-white/10 px-8 py-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-primary font-semibold">
              {(user?.name || "A")
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="text-xs text-brand-tan">
                Signed in as
              </p>

              <p className="truncate font-semibold">
                {user?.name}
              </p>
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

      {/* ====================================================
          MAIN
      ==================================================== */}

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

          <span className="rounded-full bg-brand-tan px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-brown">
            {isAdmin
              ? "Admin"
              : "Manager"}
          </span>
        </div>

        <div className="animate-fadeIn p-6 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;