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
} from "react-icons/fi";

import { useAuth } from "../../hooks/useAuth";

const adminNavItems = [
  { to: "/admin", label: "Dashboard", icon: FiGrid, exact: true },
  { to: "/admin/products", label: "Products", icon: FiBox },
  { to: "/admin/products/new", label: "Add Product", icon: FiPlusCircle },
  { to: "/admin/orders", label: "Orders", icon: FiShoppingBag },
  { to: "/admin/cancellations", label: "Cancellations", icon: FiXCircle },
  { to: "/admin/coupons", label: "Coupons", icon: FiTag },
  { to: "/admin/managers", label: "Managers", icon: FiUsers },
];

// Managers get full control over products, inventory and orders.
// Coupons and manager-account management stay admin-only.
const managerNavItems = [
  { to: "/admin", label: "Dashboard", icon: FiGrid, exact: true },
  { to: "/admin/products", label: "Products", icon: FiBox },
  { to: "/admin/products/new", label: "Add Product", icon: FiPlusCircle },
  { to: "/admin/orders", label: "Orders", icon: FiShoppingBag },
  { to: "/admin/cancellations", label: "Cancellations", icon: FiXCircle },
];

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  const navItems = isAdmin ? adminNavItems : managerNavItems;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">

      {/* Sidebar */}
      <aside className="lg:w-72 shrink-0 bg-brand-dark text-white flex flex-col">

        <div className="px-8 py-8 border-b border-white/10">
          <p className="uppercase tracking-[4px] text-xs text-brand-tan">Orbit Buy</p>
          <h2 className="text-2xl font-serif mt-1">Admin Panel</h2>
        </div>

        <nav className="flex-1 px-4 py-5 space-y-2 overflow-x-auto lg:overflow-visible flex lg:flex-col gap-2 lg:gap-0">
          {navItems.map(({ to, label, icon: Icon, exact }) => {
            const active = exact
              ? location.pathname === to
              : location.pathname.startsWith(to);

            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-5 py-3 rounded-2xl transition whitespace-nowrap ${
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

        <div className="px-8 py-6 border-t border-white/10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-full bg-brand-primary flex items-center justify-center font-semibold shrink-0">
              {(user?.name || "A").charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs text-brand-tan">Signed in as</p>
              <p className="font-semibold truncate">{user?.name}</p>
            </div>
          </div>

          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-brand-tan hover:bg-white/10 hover:text-white transition whitespace-nowrap mb-2"
          >
            <FiArrowLeft size={18} />
            Back to Store
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-300 hover:bg-white/10 hover:text-red-300 transition"
          >
            <FiLogOut size={18} /> Logout
          </button>
        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">

        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-gray-100/90 backdrop-blur-sm border-b border-gray-200 px-6 lg:px-10 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="lg:hidden inline-flex items-center gap-2 text-sm text-brand-dark font-semibold"
          >
            <FiArrowLeft size={16} /> Back to Store
          </Link>
          <div className="hidden lg:block" />

          <span className="px-3 py-1 rounded-full bg-brand-tan text-brand-brown text-xs font-bold uppercase tracking-wide">
            {isAdmin ? "Admin" : "Manager"}
          </span>
        </div>

        <div className="p-6 lg:p-10 animate-fadeIn">{children}</div>

      </main>

    </div>
  );
};

export default AdminLayout;
