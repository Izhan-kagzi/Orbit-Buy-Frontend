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
  FiCheck,
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
  const { user, isAuthenticated } = useAuth();

  const [recentOrders, setRecentOrders] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [uploadError, setUploadError] = useState("");

  // Account settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [profilePrivate, setProfilePrivate] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeSetting, setActiveSetting] = useState(null);
  const [toast, setToast] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedMobile, setEditedMobile] = useState("");
  const [savedProfile, setSavedProfile] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    window.clearTimeout(window.__orbitToastTimer);
    window.__orbitToastTimer = window.setTimeout(() => {
      setToast(null);
    }, 2800);
  };

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
     LOAD SAVED ACCOUNT SETTINGS
  ========================================================== */
  useEffect(() => {
    if (!user) return;

    try {
      const saved = JSON.parse(
        localStorage.getItem(`orbit-account-settings-${user.id || user._id || user.email || "user"}`) || "{}"
      );

      if (typeof saved.notificationsEnabled === "boolean") {
        setNotificationsEnabled(saved.notificationsEnabled);
      }
      if (typeof saved.profilePrivate === "boolean") {
        setProfilePrivate(saved.profilePrivate);
      }
      if (saved.paymentMethod) {
        setPaymentMethod(saved.paymentMethod);
      }
    } catch (error) {
      console.error("Failed to load account settings:", error);
    }
  }, [user]);

  /* =========================================================
     LOAD SAVED PROFILE DETAILS
  ========================================================== */
  useEffect(() => {
    if (!user) return;

    const fallbackProfile = {
      name:
        user.name ||
        `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
        "Orbit Buy User",
      email: user.email || "",
      mobile: user.mobile || "",
    };

    try {
      const saved = JSON.parse(
        localStorage.getItem(
          `orbit-profile-${user.id || user._id || user.email || "user"}`
        ) || "null"
      );

      const profile =
        saved && typeof saved === "object"
          ? { ...fallbackProfile, ...saved }
          : fallbackProfile;

      setSavedProfile(profile);
      setEditedName(profile.name);
      setEditedEmail(profile.email);
      setEditedMobile(profile.mobile);
    } catch (error) {
      console.error("Failed to load profile details:", error);
      setSavedProfile(fallbackProfile);
      setEditedName(fallbackProfile.name);
      setEditedEmail(fallbackProfile.email);
      setEditedMobile(fallbackProfile.mobile);
    }
  }, [user]);

  const getProfileDetailsKey = () => {
    if (!user) return "orbit-profile-user";
    return `orbit-profile-${user.id || user._id || user.email || "user"}`;
  };

  const getAccountSettingsKey = () => {
    if (!user) return "orbit-account-settings";
    return `orbit-account-settings-${user.id || user._id || user.email || "user"}`;
  };

  const handleSaveSettings = () => {
    if (newPassword || confirmPassword) {
      if (newPassword.length < 8) {
        showToast("New password must be at least 8 characters.", "error");
        return;
      }

      if (newPassword !== confirmPassword) {
        showToast("New password and confirmation do not match.", "error");
        return;
      }

      // Never store passwords in localStorage. A real password change
      // should be sent securely to your backend/authentication API.
    }

    try {
      localStorage.setItem(
        getAccountSettingsKey(),
        JSON.stringify({
          notificationsEnabled,
          profilePrivate,
          paymentMethod,
          updatedAt: new Date().toISOString(),
        })
      );

      setNewPassword("");
      setConfirmPassword("");

      showToast(
        newPassword
          ? "Settings saved. Password is ready to be updated through your secure backend."
          : "Your account settings have been saved."
      );
    } catch (error) {
      console.error("Failed to save account settings:", error);
      showToast("Could not save your changes. Please try again.", "error");
    }
  };

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
     EDIT PROFILE
  ========================================================== */
  const handleEditProfile = () => {
    setEditedName(savedProfile.name);
    setEditedEmail(savedProfile.email);
    setEditedMobile(savedProfile.mobile);
    setIsEditingProfile(true);
  };

  const handleCancelEditProfile = () => {
    setEditedName(savedProfile.name);
    setEditedEmail(savedProfile.email);
    setEditedMobile(savedProfile.mobile);
    setIsEditingProfile(false);
  };

  const handleSaveProfile = () => {
    const name = editedName.trim();
    const email = editedEmail.trim();
    const mobile = editedMobile.trim();

    if (!name) {
      showToast("Please enter your name.", "error");
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast("Please enter a valid email address.", "error");
      return;
    }

    const profile = { name, email, mobile };

    try {
      localStorage.setItem(getProfileDetailsKey(), JSON.stringify(profile));
      setSavedProfile(profile);
      setIsEditingProfile(false);
      showToast("Profile updated successfully.");
    } catch (error) {
      console.error("Failed to save profile details:", error);
      showToast("Could not save your profile. Please try again.", "error");
    }
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
    savedProfile.name ||
    user.name ||
    `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
    "Orbit Buy User";

  const displayEmail = savedProfile.email || user.email || "";
  const displayMobile = savedProfile.mobile || user.mobile || "";

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
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-brand-primary mb-1">
                Welcome back
              </p>

              {isEditingProfile ? (
                <div className="space-y-3 max-w-xl">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    placeholder="Full name"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xl sm:text-2xl font-bold text-slate-900 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />

                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      type="email"
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                      placeholder="Email address"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    />
                    <input
                      type="tel"
                      value={editedMobile}
                      onChange={(e) => setEditedMobile(e.target.value)}
                      placeholder="Mobile number"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleSaveProfile}
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
                    >
                      <FiCheck />
                      Save Profile
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEditProfile}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 truncate">
                    {displayName}
                  </h1>

                  <div className="mt-3 space-y-1.5 text-gray-500">
                    {displayEmail && (
                      <p className="flex items-center gap-2 text-sm sm:text-base">
                        <FiMail className="shrink-0" />
                        <span className="truncate">{displayEmail}</span>
                      </p>
                    )}

                    {displayMobile && (
                      <p className="flex items-center gap-2 text-sm sm:text-base">
                        <FiPhone className="shrink-0" />
                        {displayMobile}
                      </p>
                    )}
                  </div>
                </>
              )}

              <p className="text-xs text-gray-400 mt-2">
                Click your photo to change it • PNG, JPG, JPEG
              </p>

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
          {!isEditingProfile && (
            <button
              type="button"
              onClick={handleEditProfile}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 text-white px-6 py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              <FiEdit2 />
              Edit Profile
            </button>
          )}

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
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_18px_60px_-30px_rgba(15,23,42,0.35)]">
              {/* Premium accent */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-slate-900 via-indigo-600 to-violet-500" />

              <div className="px-6 pt-7 pb-5 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <span className="w-12 h-12 rounded-2xl bg-slate-950 text-white flex items-center justify-center shadow-lg shadow-slate-900/15">
                    <FiSettings className="text-xl" />
                  </span>

                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-950">
                      Account Settings
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Manage your preferences
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3">
                {/* Change Password */}
                <button
                  type="button"
                  onClick={() =>
                    setActiveSetting(
                      activeSetting === "password" ? null : "password"
                    )
                  }
                  className="w-full group flex items-center justify-between px-4 py-4 rounded-2xl hover:bg-slate-50 transition-all duration-200"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 text-sm font-bold">
                      •••
                    </span>
                    <span className="text-[15px] font-medium text-slate-800">
                      Change Password
                    </span>
                  </span>
                  <FiChevronRight
                    className={`text-slate-400 transition-transform ${
                      activeSetting === "password" ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {activeSetting === "password" && (
                  <div className="mx-2 mb-2 rounded-2xl bg-slate-50 border border-slate-100 p-4 space-y-3">
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New password"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    />
                    <p className="text-[11px] leading-relaxed text-slate-500">
                      Password changes should be sent to your authentication
                      backend rather than stored in the browser.
                    </p>
                  </div>
                )}

                {/* Notifications */}
                <button
                  type="button"
                  onClick={() =>
                    setNotificationsEnabled((value) => !value)
                  }
                  className="w-full flex items-center justify-between px-4 py-4 rounded-2xl hover:bg-slate-50 transition-all duration-200"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <span className="text-sm">✦</span>
                    </span>
                    <span className="text-[15px] font-medium text-slate-800">
                      Notifications
                    </span>
                  </span>

                  <span
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      notificationsEnabled ? "bg-slate-950" : "bg-slate-300"
                    }`}
                    aria-label={
                      notificationsEnabled
                        ? "Notifications enabled"
                        : "Notifications disabled"
                    }
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                        notificationsEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </span>
                </button>

                {/* Privacy */}
                <button
                  type="button"
                  onClick={() => setProfilePrivate((value) => !value)}
                  className="w-full flex items-center justify-between px-4 py-4 rounded-2xl hover:bg-slate-50 transition-all duration-200"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600">
                      <span className="text-sm">◈</span>
                    </span>
                    <span className="text-[15px] font-medium text-slate-800">
                      Privacy Settings
                    </span>
                  </span>

                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      profilePrivate
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {profilePrivate ? "Private" : "Public"}
                  </span>
                </button>

                {/* Payment */}
                <button
                  type="button"
                  onClick={() =>
                    setActiveSetting(
                      activeSetting === "payment" ? null : "payment"
                    )
                  }
                  className="w-full group flex items-center justify-between px-4 py-4 rounded-2xl hover:bg-slate-50 transition-all duration-200"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <span className="text-sm">₹</span>
                    </span>
                    <span className="text-[15px] font-medium text-slate-800">
                      Payment Methods
                    </span>
                  </span>
                  <FiChevronRight
                    className={`text-slate-400 transition-transform ${
                      activeSetting === "payment" ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {activeSetting === "payment" && (
                  <div className="mx-2 mb-2 rounded-2xl bg-slate-50 border border-slate-100 p-4">
                    <label className="block text-xs font-semibold text-slate-500 mb-2">
                      Default payment method
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    >
                      <option>Cash on Delivery</option>
                      <option>UPI</option>
                      <option>Credit / Debit Card</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Save Changes */}
            <button
              type="button"
              onClick={handleSaveSettings}
              className="w-full group flex items-center justify-center gap-2.5 bg-slate-950 hover:bg-slate-800 text-white py-4 rounded-2xl font-semibold shadow-[0_12px_30px_-12px_rgba(15,23,42,0.55)] hover:shadow-[0_18px_40px_-14px_rgba(15,23,42,0.65)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <FiCheck className="text-lg transition-transform group-hover:scale-110" />
              Save Changes
            </button>

            {/* Toast notification */}
            {toast && (
              <div
                role="status"
                aria-live="polite"
                className={`fixed bottom-6 right-6 z-[100] max-w-sm rounded-2xl border px-4 py-3.5 shadow-2xl backdrop-blur-xl animate-[fadeIn_0.25s_ease-out] ${
                  toast.type === "error"
                    ? "bg-red-50/95 border-red-200 text-red-800"
                    : "bg-slate-950/95 border-slate-800 text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      toast.type === "error"
                        ? "bg-red-100 text-red-600"
                        : "bg-white/10 text-emerald-300"
                    }`}
                  >
                    {toast.type === "error" ? "!" : "✓"}
                  </span>
                  <p className="text-sm font-medium leading-5">
                    {toast.message}
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>

      </section>
    </main>
  );
};

export default Profile;