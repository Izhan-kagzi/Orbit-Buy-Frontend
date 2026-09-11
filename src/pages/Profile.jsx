import { useEffect, useRef, useState } from "react";
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
  FiCamera,
  FiTrash2,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const { cartItems = [] } = useCart();
  const { wishlistItems = [] } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();

  const [recentOrders, setRecentOrders] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [uploadError, setUploadError] = useState("");

  /* =========================================================
     AUTH + ORDERS
  ========================================================== */
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      const saved = JSON.parse(
        localStorage.getItem("orbit-orders") || "[]"
      );

      setRecentOrders(Array.isArray(saved) ? saved.slice(0, 5) : []);
    } catch (error) {
      console.error("Failed to load orders:", error);
      setRecentOrders([]);
    }
  }, [isAuthenticated, navigate]);

  /* =========================================================
     ADDRESSES
  ========================================================== */
  const [addresses] = useState([
    {
      id: 1,
      title: "Home",
      address: "Add your saved addresses here.",
    },
  ]);

  /* =========================================================
     PROFILE PICTURE STORAGE KEY
     Each user gets a separate profile picture.
  ========================================================== */
  const getProfilePictureKey = () => {
    if (!user) return "orbit-profile-picture";

    return `orbit-profile-picture-${
      user.id || user._id || user.email || "user"
    }`;
  };

  /* =========================================================
     LOAD SAVED PROFILE PICTURE
  ========================================================== */
  useEffect(() => {
    if (!user) return;

    const savedPicture = localStorage.getItem(
      getProfilePictureKey()
    );

    if (savedPicture) {
      setProfilePicture(savedPicture);
    } else {
      setProfilePicture(null);
    }
  }, [user]);

  /* =========================================================
     PROFILE PICTURE UPLOAD
  ========================================================== */
  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploadError("");

    /* Allowed formats */
    const allowedTypes = [
      "image/png",
      "image/jpeg",
    ];

    if (!allowedTypes.includes(file.type)) {
      setUploadError(
        "Please select a PNG, JPG, or JPEG image."
      );

      event.target.value = "";
      return;
    }

    /* Maximum file size: 5MB */
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setUploadError(
        "Profile picture must be smaller than 5MB."
      );

      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const imageData = reader.result;

      try {
        localStorage.setItem(
          getProfilePictureKey(),
          imageData
        );

        setProfilePicture(imageData);
      } catch (error) {
        console.error(
          "Failed to save profile picture:",
          error
        );

        setUploadError(
          "Unable to save this image. Please try a smaller image."
        );
      }
    };

    reader.onerror = () => {
      setUploadError(
        "Unable to read the selected image."
      );
    };

    reader.readAsDataURL(file);

    /* Allow selecting the same file again */
    event.target.value = "";
  };

  /* =========================================================
     REMOVE PROFILE PICTURE
  ========================================================== */
  const handleRemoveProfilePicture = () => {
    try {
      localStorage.removeItem(getProfilePictureKey());
      setProfilePicture(null);
      setUploadError("");
    } catch (error) {
      console.error(
        "Failed to remove profile picture:",
        error
      );
    }
  };

  /* =========================================================
     LOGOUT
  ========================================================== */
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  /* =========================================================
     EDIT PROFILE
  ========================================================== */
  const handleEditProfile = () => {
    alert("Edit Profile Coming Soon!");
  };

  /* =========================================================
     AUTH GUARD
  ========================================================== */
  if (!isAuthenticated || !user) {
    return null;
  }

  /* =========================================================
     USER NAME
  ========================================================== */
  const displayName =
    user.name ||
    `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
    "Orbit Buy User";

  /* =========================================================
     FALLBACK AVATAR
  ========================================================== */
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName
  )}&background=2563eb&color=fff&size=200`;

  const currentProfilePicture =
    profilePicture || avatarUrl;

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-12">

        {/* ===================================================
            PROFILE HEADER
        ==================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

          <div className="flex items-center gap-5">

            {/* =================================================
                PROFILE PICTURE
            ================================================== */}
            <div className="relative shrink-0">

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".png,.jpg,.jpeg,image/png,image/jpeg"
                onChange={handleProfilePictureChange}
                className="hidden"
              />

              {/* Profile Image */}
              <button
                type="button"
                onClick={handleProfilePictureClick}
                className="group relative block w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-lg ring-2 ring-brand-primary/20 focus:outline-none focus:ring-4 focus:ring-brand-primary/20"
                aria-label="Change profile picture"
              >
                <img
                  src={currentProfilePicture}
                  alt={displayName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Hover Overlay */}
                <span className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white">
                  <FiCamera className="text-xl mb-1" />

                  <span className="text-[11px] font-semibold">
                    Change
                  </span>
                </span>
              </button>

              {/* Online Indicator */}
              <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full pointer-events-none" />

              {/* Remove Picture */}
              {profilePicture && (
                <button
                  type="button"
                  onClick={handleRemoveProfilePicture}
                  className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-red-500 hover:bg-red-50 hover:text-red-600 transition z-10"
                  title="Remove profile picture"
                  aria-label="Remove profile picture"
                >
                  <FiTrash2 size={14} />
                </button>
              )}
            </div>

            {/* =================================================
                USER INFORMATION
            ================================================== */}
            <div className="min-w-0">

              <p className="text-sm font-medium text-brand-primary mb-1">
                Welcome back
              </p>

              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 truncate">
                {displayName}
              </h1>

              <div className="mt-3 space-y-1.5 text-gray-500">

                {user.email && (
                  <p className="flex items-center gap-2 text-sm sm:text-base">
                    <FiMail className="shrink-0" />

                    <span className="truncate">
                      {user.email}
                    </span>
                  </p>
                )}

                {user.mobile && (
                  <p className="flex items-center gap-2 text-sm sm:text-base">
                    <FiPhone className="shrink-0" />
                    {user.mobile}
                  </p>
                )}

              </div>

              {/* Upload Hint */}
              <p className="text-xs text-gray-400 mt-2">
                Click your photo to change it • PNG, JPG, JPEG
              </p>

              {/* Upload Error */}
              {uploadError && (
                <p className="text-xs text-red-500 font-medium mt-1">
                  {uploadError}
                </p>
              )}

            </div>
          </div>

          {/* =================================================
              EDIT PROFILE BUTTON
          ================================================== */}
          <button
            onClick={handleEditProfile}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-dark text-white px-6 py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            <FiEdit2 />
            Edit Profile
          </button>

        </div>

        {/* ===================================================
            STATS
        ==================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">

          {/* Orders */}
          <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Recent Orders
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-2">
                  {recentOrders.length}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center">
                <FiShoppingBag className="text-2xl text-brand-primary" />
              </div>

            </div>
          </div>

          {/* Wishlist */}
          <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Wishlist Items
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-2">
                  {wishlistItems.length}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
                <FiHeart className="text-2xl text-red-500" />
              </div>

            </div>
          </div>

          {/* Cart */}
          <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Cart Items
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-2">
                  {cartItems.length}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center">
                <FiShoppingBag className="text-2xl text-green-600" />
              </div>

            </div>
          </div>

        </div>

        {/* ===================================================
            MAIN CONTENT
        ==================================================== */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">

          {/* =================================================
              RECENT ORDERS
          ================================================== */}
          <div className="lg:col-span-2">

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

              {/* Header */}
              <div className="px-6 py-5 border-b border-gray-200">

                <div className="flex items-center justify-between">

                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                      Recent Orders
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Your latest purchases
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                    <FiShoppingBag className="text-xl text-brand-primary" />
                  </div>

                </div>

              </div>

              {/* Orders */}
              {recentOrders.length === 0 ? (

                <div className="px-6 py-14 text-center">

                  <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <FiShoppingBag className="text-2xl text-gray-400" />
                  </div>

                  <h3 className="font-semibold text-gray-900">
                    No orders yet
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Your recent purchases will appear here.
                  </p>

                </div>

              ) : (

                <div className="divide-y divide-gray-200">

                  {recentOrders.map((order, index) => (

                    <div
                      key={order.id || index}
                      className="group px-6 py-5 hover:bg-gray-50 transition-colors duration-200"
                    >

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        {/* Order */}
                        <div className="flex items-center gap-4">

                          <div className="hidden sm:flex w-11 h-11 rounded-xl bg-gray-100 items-center justify-center shrink-0">
                            <FiShoppingBag className="text-gray-600" />
                          </div>

                          <div>

                            <h3 className="font-bold text-gray-900">
                              #{order.id}
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                              {order.date
                                ? new Date(
                                    order.date
                                  ).toLocaleDateString("en-IN", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })
                                : "Date unavailable"}
                            </p>

                          </div>

                        </div>

                        {/* Amount */}
                        <div>

                          <p className="text-sm text-gray-500">
                            {order.items?.length || 0}{" "}
                            {order.items?.length === 1
                              ? "Item"
                              : "Items"}
                          </p>

                          <p className="text-lg font-bold text-brand-primary mt-0.5">
                            ₹{Math.round(order.total || 0)}
                          </p>

                        </div>

                        {/* Status */}
                        <span className="inline-flex w-fit items-center px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-green-100 text-green-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />

                          {order.status || "Confirmed"}
                        </span>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

            {/* View Orders */}
            <button
              onClick={() => navigate("/orders")}
              className="mt-4 w-full flex items-center justify-center gap-2 py-3 text-brand-primary font-semibold hover:text-brand-dark transition"
            >
              View All Orders
              <FiChevronRight />
            </button>

          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================== */}
          <div className="space-y-6">

            {/* Saved Addresses */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

              <div className="px-6 py-5 border-b border-gray-200">

                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">

                  <span className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                    <FiHome className="text-brand-primary" />
                  </span>

                  Saved Addresses

                </h2>

              </div>

              <div className="p-6 space-y-5">

                {addresses.map((address) => (

                  <div
                    key={address.id}
                    className="rounded-xl border border-gray-100 p-4 hover:border-brand-primary/30 hover:bg-gray-50 transition"
                  >

                    <div className="flex items-center justify-between">

                      <h3 className="font-semibold text-gray-900">
                        {address.title}
                      </h3>

                      <FiHome className="text-gray-400" />

                    </div>

                    <p className="text-gray-500 text-sm mt-2 flex gap-2 leading-relaxed">
                      <FiMapPin className="mt-0.5 shrink-0" />
                      {address.address}
                    </p>

                  </div>

                ))}

              </div>

            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

              <div className="px-6 py-5 border-b border-gray-200">

                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">

                  <span className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                    <FiSettings className="text-gray-700" />
                  </span>

                  Account Settings

                </h2>

              </div>

              <div className="p-3">

                <button
                  onClick={() =>
                    alert("Change Password Coming Soon!")
                  }
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-gray-50 transition"
                >
                  <span className="text-gray-800">
                    Change Password
                  </span>

                  <FiChevronRight className="text-gray-400" />
                </button>

                <button
                  onClick={() =>
                    alert("Notifications Coming Soon!")
                  }
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-gray-50 transition"
                >
                  <span className="text-gray-800">
                    Notifications
                  </span>

                  <FiChevronRight className="text-gray-400" />
                </button>

                <button
                  onClick={() =>
                    alert("Privacy Settings Coming Soon!")
                  }
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-gray-50 transition"
                >
                  <span className="text-gray-800">
                    Privacy Settings
                  </span>

                  <FiChevronRight className="text-gray-400" />
                </button>

                <button
                  onClick={() =>
                    alert("Payment Methods Coming Soon!")
                  }
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-gray-50 transition"
                >
                  <span className="text-gray-800">
                    Payment Methods
                  </span>

                  <FiChevronRight className="text-gray-400" />
                </button>

              </div>

            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-semibold shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <FiLogOut />
              Logout
            </button>

          </div>

        </div>

      </section>
    </main>
  );
};

export default Profile;
