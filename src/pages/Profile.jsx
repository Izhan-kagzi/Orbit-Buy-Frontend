import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit2,
  FiShoppingBag,
  FiHeart,
  FiHome,
  FiSettings,
  FiLogOut,
  FiChevronRight,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const navigate = useNavigate();

  const { cartItems } = useCart();
  const { wishlistItems = [] } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      const saved = JSON.parse(
        localStorage.getItem("orbit-orders") || "[]"
      );
      setRecentOrders(saved.slice(0, 5));
    } catch (error) {
      console.error("Failed to load orders:", error);
      setRecentOrders([]);
    }
  }, [isAuthenticated, navigate]);

  const [addresses] = useState([
    {
      id: 1,
      title: "Home",
      address: "Add your saved addresses here.",
    },
  ]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleEditProfile = () => {
    alert("Edit Profile Coming Soon!");
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  const displayName =
    user.name ||
    `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
    "Orbit Buy User";

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName
  )}&background=2563eb&color=fff&size=200`;

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

        <div className="flex items-center gap-5">

          <img
            src={avatarUrl}
            alt={displayName}
            className="w-28 h-28 rounded-full object-cover border-4 border-brand-primary"
          />

          <div>

            <h1 className="text-4xl font-bold">
              {displayName}
            </h1>

            <div className="mt-3 space-y-2 text-gray-600">

              <p className="flex items-center gap-2">
                <FiMail />
                {user.email}
              </p>

              {user.mobile && (
                <p className="flex items-center gap-2">
                  <FiPhone />
                  {user.mobile}
                </p>
              )}

            </div>

          </div>

        </div>

        <button
          onClick={handleEditProfile}
          className="flex items-center gap-2 bg-brand-primary hover:bg-brand-dark text-white px-6 py-3 rounded-lg transition"
        >
          <FiEdit2 />
          Edit Profile
        </button>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">

        <div className="bg-white rounded-2xl shadow-md p-6 text-center">

          <FiShoppingBag className="mx-auto text-4xl text-brand-primary mb-3" />

          <h2 className="text-3xl font-bold">
            {recentOrders.length}
          </h2>

          <p className="text-gray-500 mt-1">
            Recent Orders
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 text-center">

          <FiHeart className="mx-auto text-4xl text-red-500 mb-3" />

          <h2 className="text-3xl font-bold">
            {wishlistItems.length}
          </h2>

          <p className="text-gray-500 mt-1">
            Wishlist Items
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 text-center">

          <FiShoppingBag className="mx-auto text-4xl text-green-600 mb-3" />

          <h2 className="text-3xl font-bold">
            {cartItems.length}
          </h2>

          <p className="text-gray-500 mt-1">
            Cart Items
          </p>

        </div>

      </div>
            {/* Main Content */}

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Recent Orders */}

        <div className="lg:col-span-2">

          <div className="bg-white rounded-2xl shadow-md">

            <div className="border-b px-6 py-5">
              <h2 className="text-2xl font-bold">
                Recent Orders
              </h2>
            </div>

            {recentOrders.length === 0 ? (
              <div className="px-6 py-10 text-center text-gray-500">
                No orders yet.
              </div>
            ) : (
              <div className="divide-y">

                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between px-6 py-5 hover:bg-gray-50 transition"
                  >
                    <div>

                      <h3 className="font-semibold text-lg">
                        #{order.id}
                      </h3>

                      <p className="text-gray-500 text-sm mt-1">
                        {new Date(order.date).toLocaleDateString(
                          "en-IN",
                          { year: "numeric", month: "short", day: "numeric" }
                        )}
                      </p>

                    </div>

                    <div className="mt-3 md:mt-0">

                      <p className="font-medium">
                        {order.items?.length || 0} Items
                      </p>

                      <p className="text-brand-primary font-bold">
                        ₹{Math.round(order.total)}
                      </p>

                    </div>

                    <span className="mt-3 md:mt-0 px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                      {order.status || "Confirmed"}
                    </span>

                  </div>
                ))}

              </div>
            )}

          </div>

          <button
            onClick={() => navigate("/orders")}
            className="mt-4 w-full text-center text-brand-primary font-semibold hover:underline"
          >
            View All Orders
          </button>

        </div>

        {/* Right Sidebar */}

        <div className="space-y-6">

          {/* Saved Addresses */}

          <div className="bg-white rounded-2xl shadow-md">

            <div className="border-b px-6 py-5">

              <h2 className="text-xl font-bold flex items-center gap-2">
                <FiHome />
                Saved Addresses
              </h2>

            </div>

            <div className="p-6 space-y-5">

              {addresses.map((address) => (
                <div key={address.id}>

                  <h3 className="font-semibold">
                    {address.title}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1 flex gap-2">
                    <FiMapPin className="mt-1" />
                    {address.address}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Account Settings */}

          <div className="bg-white rounded-2xl shadow-md">

            <div className="border-b px-6 py-5">

              <h2 className="text-xl font-bold flex items-center gap-2">
                <FiSettings />
                Account Settings
              </h2>

            </div>

            <div className="p-4">

              <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100 transition">
                Change Password
                <FiChevronRight />
              </button>

              <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100 transition">
                Notifications
                <FiChevronRight />
              </button>

              <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100 transition">
                Privacy Settings
                <FiChevronRight />
              </button>

              <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100 transition">
                Payment Methods
                <FiChevronRight />
              </button>

            </div>

          </div>

          {/* Logout */}

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-semibold transition"
          >
            <FiLogOut />
            Logout
          </button>

        </div>

      </div>

    </section>
  );
};

export default Profile;