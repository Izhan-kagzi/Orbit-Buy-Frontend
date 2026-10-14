import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import {
  FiUser,
  FiShoppingBag,
  FiHeart,
  FiShoppingCart,
  FiCreditCard,
  FiStar,
  FiEdit2,
  FiSave,
  FiX,
  FiCamera,
  FiTrash2,
  FiMapPin,
  FiMail,
  FiPhone,
  FiPackage,
  FiTruck,
  FiFileText,
  FiPlus,
  FiCheckCircle,
  FiClock,
  FiChevronRight,
  FiRefreshCw,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

import api, { getImageUrl } from "../services/api";

/*
=========================================================
HELPERS
=========================================================
*/

const getUserKey = (user) =>
  user?.id || user?._id || user?.email || "user";

const getCartHistoryKey = (user) =>
  `orbit-cart-history-${getUserKey(user)}`;

const getReviewsKey = (user) =>
  `orbit-reviews-${getUserKey(user)}`;

const getPaymentMethodsKey = (user) =>
  `orbit-payment-methods-${getUserKey(user)}`;

const safeJsonParse = (value, fallback) => {
  try {
    // JSON.parse(null) returns null (no throw), so fall back explicitly.
    const parsed = JSON.parse(value);
    if (parsed === null || parsed === undefined) return fallback;
    if (Array.isArray(fallback) && !Array.isArray(parsed)) return fallback;
    return parsed;
  } catch {
    return fallback;
  }
};

const formatCurrency = (value) => {
  const amount = Number(value || 0);

  return `₹${amount.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
};

const getItemName = (item) =>
  item?.name || item?.productName || item?.title || "Product";

const getItemImage = (item) => {
  const image =
    item?.image ||
    item?.imageUrl ||
    item?.thumbnail ||
    item?.images?.[0] ||
    "";

  if (!image) return "";

  return getImageUrl(image);
};

const getItemPrice = (item) =>
  Number(item?.price ?? item?.salePrice ?? item?.finalPrice ?? 0);

const getItemQuantity = (item) =>
  Number(item?.quantity ?? item?.qty ?? 1);

const getOrderTotal = (order) => {
  if (order?.totalAmount !== undefined) return Number(order.totalAmount || 0);
  if (order?.total !== undefined) return Number(order.total || 0);
  if (order?.grandTotal !== undefined) return Number(order.grandTotal || 0);

  const items = order?.items || [];

  return items.reduce(
    (sum, item) => sum + getItemPrice(item) * getItemQuantity(item),
    0
  );
};

const getOrderId = (order) =>
  order?.id || order?._id || order?.orderId || "";

const getOrderStatus = (order) =>
  order?.status || order?.orderStatus || "Processing";

const getOrderDate = (order) =>
  order?.createdAt || order?.date || order?.orderedAt || null;

const getStatusIcon = (status) => {
  const normalized = String(status).toLowerCase();

  if (normalized.includes("deliver")) return FiCheckCircle;
  if (normalized.includes("ship")) return FiTruck;
  if (normalized.includes("cancel")) return FiX;

  return FiClock;
};

const getStatusStyle = (status) => {
  const normalized = String(status).toLowerCase();

  if (normalized.includes("deliver"))
    return "bg-green-50 text-green-700";
  if (normalized.includes("ship"))
    return "bg-blue-50 text-blue-700";
  if (normalized.includes("cancel"))
    return "bg-red-50 text-red-600";

  return "bg-amber-50 text-amber-700";
};

/*
=========================================================
COMPONENT
=========================================================
*/

export default function Profile() {
  const navigate = useNavigate();

  const {
    user,
    isAuthenticated,
    updateProfile,
    updateProfilePicture,
    removeProfilePicture,
  } = useAuth();

  const { cartItems = [] } = useCart();
  const { wishlistItems = [] } = useWishlist();

  const fileInputRef = useRef(null);

  /*
  =======================================================
  STATE
  =======================================================
  */

  const [activeSection, setActiveSection] = useState("profile");

  const [savingProfile, setSavingProfile] = useState(false);
  const [uploadingPicture, setUploadingPicture] = useState(false);
  const [removingPicture, setRemovingPicture] = useState(false);

  const [loadingOrders, setLoadingOrders] = useState(true);
  const [ordersError, setOrdersError] = useState("");
  const [recentOrders, setRecentOrders] = useState([]);

  const [cartHistory, setCartHistory] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentType, setPaymentType] = useState("Card");
  const [paymentLabel, setPaymentLabel] = useState("");

  const [uploadError, setUploadError] = useState("");

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedMobile, setEditedMobile] = useState("");

  const [shippingAddress, setShippingAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  const [toast, setToast] = useState(null);

  /*
  =======================================================
  TOAST
  =======================================================
  */

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    window.clearTimeout(window.__orbitProfileToast);

    window.__orbitProfileToast = window.setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  /*
  =======================================================
  AUTH GUARD
  =======================================================
  */

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  /*
  =======================================================
  SYNC LOCAL EDIT FIELDS FROM AUTH CONTEXT USER
  ---------------------------------------------------
  `user` is the single source of truth (lives in
  AuthContext). Whenever it changes — including right
  after we save an edit — pull it into the local edit
  fields so the form and the rest of the app never
  disagree.
  =======================================================
  */

  useEffect(() => {
    if (!user) return;

    setEditedName(user.name || "");
    setEditedEmail(user.email || "");
    setEditedMobile(user.mobile || "");
    setShippingAddress(user.shippingAddress || "");
    setBillingAddress(user.billingAddress || "");
  }, [
    user?.name,
    user?.email,
    user?.mobile,
    user?.shippingAddress,
    user?.billingAddress,
  ]);

  /*
  =======================================================
  LOAD ORDERS FROM THE REAL BACKEND
  ---------------------------------------------------
  NOTE: assumes GET /orders/my-orders returns either
  { success, orders } or { success, data: [...] }.
  Adjust the endpoint below if yours differs.
  =======================================================
  */

  const loadOrders = async () => {
    if (!isAuthenticated) return;

    setLoadingOrders(true);
    setOrdersError("");

    try {
      const res = await api.get("/orders");

      const orders =
        (Array.isArray(res?.orders) && res.orders) ||
        (Array.isArray(res?.data?.orders) && res.data.orders) ||
        (Array.isArray(res?.data) && res.data) ||
        (Array.isArray(res) && res) ||
        [];

      // Newest first
      const sorted = [...orders].sort((a, b) => {
        const dateA = new Date(getOrderDate(a) || 0).getTime();
        const dateB = new Date(getOrderDate(b) || 0).getTime();
        return dateB - dateA;
      });

      setRecentOrders(sorted);
    } catch (error) {
      console.error("Failed to load orders:", error);
      setOrdersError(
        error?.message || "Couldn't load your orders right now."
      );
      setRecentOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  /*
  =======================================================
  LOAD FRONTEND-SCAFFOLD DATA (cart history, reviews,
  payment methods — these stay device-local by design)
  =======================================================
  */

  useEffect(() => {
    if (!user) return;

    const historyRaw = localStorage.getItem(getCartHistoryKey(user));
    const reviewsRaw = localStorage.getItem(getReviewsKey(user));
    const paymentsRaw = localStorage.getItem(getPaymentMethodsKey(user));

    setCartHistory(safeJsonParse(historyRaw, []));
    setReviews(safeJsonParse(reviewsRaw, []));
    setPaymentMethods(safeJsonParse(paymentsRaw, []));
  }, [user]);

  /*
  =======================================================
  PAYMENT METHODS (local scaffold — unchanged)
  =======================================================
  */

  const handleAddPaymentMethod = () => {
    const label = paymentLabel.trim();

    if (!label) {
      showToast("Please enter payment details.", "error");
      return;
    }

    const newMethod = {
      id: `payment-${Date.now()}`,
      type: paymentType,
      label,
      createdAt: new Date().toISOString(),
    };

    const updated = [...paymentMethods, newMethod];

    setPaymentMethods(updated);

    try {
      localStorage.setItem(
        getPaymentMethodsKey(user),
        JSON.stringify(updated)
      );
    } catch (error) {
      console.error(error);
    }

    setPaymentLabel("");
    setShowPaymentForm(false);

    showToast("Payment method saved locally.");
  };

  const handleRemovePaymentMethod = (id) => {
    const updated = paymentMethods.filter((method) => method.id !== id);

    setPaymentMethods(updated);

    try {
      localStorage.setItem(
        getPaymentMethodsKey(user),
        JSON.stringify(updated)
      );
    } catch (error) {
      console.error(error);
    }
  };

  /*
  =======================================================
  PROFILE PICTURE
  =======================================================
  */

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploadError("");

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/avif",
    ];

    if (!allowedTypes.includes(file.type)) {
      setUploadError("Please select a JPG, JPEG, PNG, WEBP or AVIF image.");
      event.target.value = "";
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setUploadError("Profile picture must be smaller than 5MB.");
      event.target.value = "";
      return;
    }

    setUploadingPicture(true);

    try {
      await updateProfilePicture(file);
      showToast("Profile picture updated successfully.");
    } catch (error) {
      console.error("Profile picture upload failed:", error);
      setUploadError(
        error?.message || "Unable to upload your profile picture."
      );
    } finally {
      setUploadingPicture(false);
      event.target.value = "";
    }
  };

  const handleRemoveProfilePicture = async () => {
    if (!user?.profilePicture) return;

    setRemovingPicture(true);

    try {
      await removeProfilePicture();
      setUploadError("");
      showToast("Profile picture removed.");
    } catch (error) {
      console.error("Failed to remove profile picture:", error);
      showToast(
        error?.message || "Could not remove profile picture.",
        "error"
      );
    } finally {
      setRemovingPicture(false);
    }
  };

  /*
  =======================================================
  EDIT PROFILE
  =======================================================
  */

  const handleEditProfile = () => {
    setEditedName(user?.name || "");
    setEditedEmail(user?.email || "");
    setEditedMobile(user?.mobile || "");
    setIsEditingProfile(true);
  };

  const handleCancelEditProfile = () => {
    setEditedName(user?.name || "");
    setEditedEmail(user?.email || "");
    setEditedMobile(user?.mobile || "");
    setIsEditingProfile(false);
  };

  /*
  =======================================================
  SAVE PROFILE — routed through AuthContext so the
  change is visible everywhere immediately (navbar,
  checkout, etc.), not just on this page.
  =======================================================
  */

  const handleSaveProfile = async () => {
    const name = editedName.trim();
    const email = editedEmail.trim().toLowerCase();
    const mobile = editedMobile.trim();

    if (!name) {
      showToast("Please enter your name.", "error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast("Please enter a valid email address.", "error");
      return;
    }

    setSavingProfile(true);

    try {
      await updateProfile({
        name,
        email,
        mobile,
        shippingAddress,
        billingAddress,
      });

      setIsEditingProfile(false);
      showToast("Profile updated successfully.");
    } catch (error) {
      console.error("Failed to update profile:", error);
      showToast(error?.message || "Could not update your profile.", "error");
    } finally {
      setSavingProfile(false);
    }
  };

  /*
  =======================================================
  SAVE ADDRESSES
  =======================================================
  */

  const handleSaveAddresses = async () => {
    setSavingProfile(true);

    try {
      await updateProfile({
        name: user?.name,
        email: user?.email,
        mobile: user?.mobile,
        shippingAddress,
        billingAddress,
      });

      showToast("Addresses saved successfully.");
    } catch (error) {
      console.error("Failed to save addresses:", error);
      showToast(error?.message || "Could not save your addresses.", "error");
    } finally {
      setSavingProfile(false);
    }
  };

  /*
  =======================================================
  CART HISTORY SNAPSHOT
  =======================================================
  */

  const saveCartSnapshot = () => {
    if (!cartItems.length) {
      showToast("Your cart is empty.", "error");
      return;
    }

    const snapshot = {
      id: `cart-${Date.now()}`,
      createdAt: new Date().toISOString(),
      items: cartItems,
    };

    const updated = [snapshot, ...cartHistory];

    setCartHistory(updated);

    try {
      localStorage.setItem(getCartHistoryKey(user), JSON.stringify(updated));
    } catch (error) {
      console.error(error);
    }

    showToast("Cart snapshot saved.");
  };

  const deleteCartHistory = (id) => {
    const updated = cartHistory.filter((item) => item.id !== id);

    setCartHistory(updated);

    try {
      localStorage.setItem(getCartHistoryKey(user), JSON.stringify(updated));
    } catch (error) {
      console.error(error);
    }
  };

  /*
  =======================================================
  GUARD
  =======================================================
  */

  if (!isAuthenticated || !user) {
    return null;
  }

  /*
  =======================================================
  DERIVED DISPLAY DATA — always read straight from
  `user` (AuthContext), never from a local copy.
  =======================================================
  */

  const displayName = user.name || "Orbit Buy User";
  const displayEmail = user.email || "";
  const displayMobile = user.mobile || "";

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName
  )}&background=111827&color=fff&size=200`;

  const currentProfilePicture = user.profilePicture
    ? getImageUrl(user.profilePicture)
    : avatarUrl;

  const sections = [
    { id: "profile", label: "Profile", icon: FiUser },
    { id: "orders", label: "My Orders", icon: FiShoppingBag },
    { id: "wishlist", label: "Wishlist", icon: FiHeart },
    { id: "cart", label: "Cart", icon: FiShoppingCart },
    { id: "payments", label: "Payment Methods", icon: FiCreditCard },
    { id: "reviews", label: "My Reviews", icon: FiStar },
  ];

  /*
  =======================================================
  RENDER
  =======================================================
  */

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#031e3d] text-[#f5efe6]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-[-8rem] h-[32rem] w-[32rem] rounded-full bg-[#0b4778]/30 blur-3xl" />
        <div className="absolute top-[38rem] -left-40 h-[26rem] w-[26rem] rounded-full bg-[#d9c3a3]/[0.06] blur-3xl" />
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "radial-gradient(#d9c3a3 0.7px, transparent 0.7px)", backgroundSize: "18px 18px" }} />
      </div>
      <section className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-28 md:pt-32 pb-14">

        {/* PAGE HEADER */}

        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d9c3a3]/20 bg-[#d9c3a3]/[0.08] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#e7d6bd]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d9c3a3] shadow-[0_0_10px_#d9c3a3]" />
              Your personal space
            </div>
            <h1 className="max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
              Welcome back, <span className="text-[#d9c3a3]">{displayName.split(' ')[0]}</span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#a9bdd0] sm:text-base">
              Everything you need to manage your account, purchases and preferences — all in one place.
            </p>
          </div>
          <div className="hidden shrink-0 items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 sm:flex">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d9c3a3]/10 text-[#d9c3a3]"><FiUser size={19} /></div>
            <div><p className="text-xs text-[#8fa9c1]">Signed in as</p><p className="mt-0.5 max-w-[210px] truncate text-sm font-medium text-white">{displayEmail || displayName}</p></div>
          </div>
        </div>

        {/* PROFILE HEADER CARD */}

        <div className="group relative mb-7 overflow-hidden rounded-[30px] border border-white/[0.11] bg-gradient-to-br from-[#0b3b66] via-[#09335a] to-[#062747] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-8">
          <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full border border-[#d9c3a3]/10 sm:h-80 sm:w-80" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-2 -top-12 h-48 w-48 rounded-full border border-[#d9c3a3]/10 sm:h-64 sm:w-64" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-center gap-5">

              <div className="relative shrink-0">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".png,.jpg,.jpeg,.webp,.avif,image/png,image/jpeg,image/webp,image/avif"
                  onChange={handleProfilePictureChange}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={handleProfilePictureClick}
                  disabled={uploadingPicture}
                  className="group relative block h-24 w-24 overflow-hidden rounded-[28px] border border-white/20 bg-[#031e3d] shadow-[0_16px_40px_rgba(0,0,0,0.28)] ring-4 ring-[#d9c3a3]/10 transition-transform duration-300 hover:scale-[1.03] sm:h-28 sm:w-28"
                  aria-label="Change profile picture"
                >
                  <img
                    src={currentProfilePicture}
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />

                  <span className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                    <FiCamera size={22} />
                    <span className="text-[10px] mt-1 font-semibold uppercase tracking-wider">
                      Change
                    </span>
                  </span>

                  {uploadingPicture && (
                    <span className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-semibold">
                      Uploading...
                    </span>
                  )}
                </button>

                {user.profilePicture && (
                  <button
                    type="button"
                    onClick={handleRemoveProfilePicture}
                    disabled={removingPicture}
                    className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#09335a] border border-white/[0.12] shadow flex items-center justify-center text-red-300 hover:bg-red-500/10 transition"
                    title="Remove profile picture"
                  >
                    <FiTrash2 size={14} />
                  </button>
                )}
              </div>

              <div className="min-w-0">
                <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-200"><FiCheckCircle size={12} /> Account active</div>
                <h2 className="break-words text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {displayName}
                </h2>

                <div className="flex flex-col gap-1 mt-2 text-sm text-[#c1cddd]">
                  {displayEmail && (
                    <span className="flex items-center gap-2">
                      <FiMail />
                      {displayEmail}
                    </span>
                  )}

                  {displayMobile && (
                    <span className="flex items-center gap-2">
                      <FiPhone />
                      {displayMobile}
                    </span>
                  )}
                </div>

                {uploadError && (
                  <p className="mt-2 text-xs text-red-500">{uploadError}</p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleEditProfile}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#d9c3a3]/40 bg-[#d9c3a3] px-5 py-3 text-sm font-bold text-[#031e3d] shadow-[0_8px_24px_rgba(0,0,0,0.14)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ead8bd] focus:outline-none focus:ring-4 focus:ring-[#d9c3a3]/20"
            >
              <FiEdit2 />
              Edit Profile
            </button>
          </div>
        </div>

        {/* QUICK OVERVIEW */}
        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {[
            { label: "Orders placed", value: recentOrders.length, icon: FiPackage, note: "Your purchase history" },
            { label: "Saved wishlist", value: wishlistItems.length, icon: FiHeart, note: "Items you love" },
            { label: "Items in cart", value: cartItems.length, icon: FiShoppingCart, note: "Ready when you are" },
          ].map((stat) => {
            const StatIcon = stat.icon;
            return <div key={stat.label} className="flex items-center gap-4 rounded-[22px] border border-white/[0.09] bg-white/[0.035] p-4 transition-colors hover:border-[#d9c3a3]/25 hover:bg-white/[0.055] sm:p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#d9c3a3]/15 bg-[#d9c3a3]/[0.08] text-[#d9c3a3]"><StatIcon size={20} /></div>
              <div className="min-w-0"><p className="text-xs font-medium text-[#9cb2c8]">{stat.label}</p><p className="mt-0.5 text-2xl font-semibold tracking-tight text-white">{stat.value}</p><p className="mt-0.5 text-[11px] text-[#7793ad]">{stat.note}</p></div>
            </div>;
          })}
        </div>

        {/* MAIN LAYOUT */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-7">

          {/* SIDEBAR */}

          <aside>
            <div className="rounded-[26px] border border-white/[0.09] bg-[#06294a]/90 p-2 shadow-[0_20px_55px_rgba(0,0,0,0.16)] backdrop-blur-xl lg:sticky lg:top-28">
              {sections.map((section) => {
                const Icon = section.icon;
                const active = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setActiveSection(section.id)}
                    className={`group w-full flex items-center gap-3 rounded-2xl px-3.5 py-3.5 text-left text-sm font-semibold transition-all duration-200 ${
                      active
                        ? "bg-[#d9c3a3] text-[#031e3d] shadow-[0_8px_22px_rgba(0,0,0,0.16)]"
                        : "text-[#a9bfd3] hover:bg-white/[0.055] hover:text-white"
                    }`}
                  >
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${active ? "bg-[#031e3d]/[0.08]" : "bg-white/[0.045] group-hover:bg-[#d9c3a3]/10"}`}><Icon size={17} /></span>
                    <span className="flex-1">{section.label}</span>
                    {active && <FiChevronRight className="ml-auto" />}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* CONTENT */}

          <div className="min-w-0">

            {/* PROFILE */}

            {activeSection === "profile" && (
              <div className="space-y-6">

                <div className="rounded-[28px] border border-white/[0.09] bg-gradient-to-br from-[#0a365d] to-[#062747] p-5 shadow-[0_22px_60px_rgba(0,0,0,0.17)] sm:p-8">

                  <div className="flex items-center justify-between gap-4 mb-7">
                    <div>
                      <h2 className="text-xl font-bold text-[#f5efe6]">
                        Personal Information
                      </h2>

                      <p className="text-sm text-[#c1cddd] mt-1">
                        Keep your account information up to date.
                      </p>
                    </div>

                    {!isEditingProfile && (
                      <button
                        type="button"
                        onClick={handleEditProfile}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#e9d9c3] hover:text-[#f5efe6]"
                      >
                        <FiEdit2 />
                        Edit
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#c1cddd] mb-2">
                        Display Name
                      </label>

                      {isEditingProfile ? (
                        <input
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          className="w-full rounded-xl border border-white/[0.12] bg-[#031e3d]/80 text-[#f5efe6] placeholder:text-[#7890aa] px-4 py-3 text-sm outline-none transition-colors focus:border-[#d9c3a3]"
                        />
                      ) : (
                        <div className="rounded-xl border border-white/[0.07] bg-[#031e3d]/70 px-4 py-3 text-sm text-[#f5efe6]">
                          {displayName}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#c1cddd] mb-2">
                        Email Address
                      </label>

                      {isEditingProfile ? (
                        <input
                          type="email"
                          value={editedEmail}
                          onChange={(e) => setEditedEmail(e.target.value)}
                          className="w-full rounded-xl border border-white/[0.12] bg-[#031e3d]/80 text-[#f5efe6] placeholder:text-[#7890aa] px-4 py-3 text-sm outline-none transition-colors focus:border-[#d9c3a3]"
                        />
                      ) : (
                        <div className="rounded-xl border border-white/[0.07] bg-[#031e3d]/70 px-4 py-3 text-sm text-[#f5efe6]">
                          {displayEmail || "Not provided"}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#c1cddd] mb-2">
                        Phone Number
                      </label>

                      {isEditingProfile ? (
                        <input
                          type="tel"
                          value={editedMobile}
                          onChange={(e) => setEditedMobile(e.target.value)}
                          className="w-full rounded-xl border border-white/[0.12] bg-[#031e3d]/80 text-[#f5efe6] placeholder:text-[#7890aa] px-4 py-3 text-sm outline-none transition-colors focus:border-[#d9c3a3]"
                        />
                      ) : (
                        <div className="rounded-xl border border-white/[0.07] bg-[#031e3d]/70 px-4 py-3 text-sm text-[#f5efe6]">
                          {displayMobile || "Not provided"}
                        </div>
                      )}
                    </div>

                  </div>

                  {isEditingProfile && (
                    <div className="flex flex-wrap gap-3 mt-7 pt-6 border-t border-white/[0.09]">
                      <button
                        type="button"
                        onClick={handleSaveProfile}
                        disabled={savingProfile}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#d9c3a3] text-[#031e3d] text-sm font-semibold hover:bg-[#c5ad8c] disabled:opacity-50"
                      >
                        <FiSave />
                        {savingProfile ? "Saving..." : "Save Changes"}
                      </button>

                      <button
                        type="button"
                        onClick={handleCancelEditProfile}
                        disabled={savingProfile}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/[0.13] text-[#e9d9c3] text-sm font-semibold hover:bg-[#031e3d]"
                      >
                        <FiX />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                {/* Addresses */}

                <div className="rounded-[28px] border border-white/[0.09] bg-gradient-to-br from-[#0a365d] to-[#062747] p-5 shadow-[0_22px_60px_rgba(0,0,0,0.17)] sm:p-8">

                  <div className="flex items-center justify-between gap-4 mb-7">
                    <div>
                      <h2 className="text-xl font-bold text-[#f5efe6]">
                        Addresses
                      </h2>

                      <p className="text-sm text-[#c1cddd] mt-1">
                        Manage your shipping and billing addresses.
                      </p>
                    </div>

                    <FiMapPin className="text-[#a8bbcf]" size={22} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#c1cddd] mb-2">
                        Shipping Address
                      </label>

                      <textarea
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        rows={5}
                        placeholder="Enter your shipping address"
                        className="w-full rounded-xl border border-white/[0.12] bg-[#031e3d]/80 text-[#f5efe6] placeholder:text-[#7890aa] px-4 py-3 text-sm outline-none transition-colors focus:border-[#d9c3a3] resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#c1cddd] mb-2">
                        Billing Address
                      </label>

                      <textarea
                        value={billingAddress}
                        onChange={(e) => setBillingAddress(e.target.value)}
                        rows={5}
                        placeholder="Enter your billing address"
                        className="w-full rounded-xl border border-white/[0.12] bg-[#031e3d]/80 text-[#f5efe6] placeholder:text-[#7890aa] px-4 py-3 text-sm outline-none transition-colors focus:border-[#d9c3a3] resize-none"
                      />
                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={handleSaveAddresses}
                    disabled={savingProfile}
                    className="mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#d9c3a3] text-[#031e3d] text-sm font-semibold hover:bg-[#c5ad8c] disabled:opacity-50"
                  >
                    <FiSave />
                    {savingProfile ? "Saving..." : "Save Addresses"}
                  </button>
                </div>
              </div>
            )}

            {/* ORDERS */}

            {activeSection === "orders" && (
              <div className="rounded-[28px] border border-white/[0.09] bg-gradient-to-br from-[#0a365d] to-[#062747] p-5 shadow-[0_22px_60px_rgba(0,0,0,0.17)] sm:p-8">

                <div className="flex items-center justify-between mb-7">
                  <div>
                    <h2 className="text-xl font-bold text-[#f5efe6]">
                      My Orders
                    </h2>

                    <p className="text-sm text-[#c1cddd] mt-1">
                      View your past purchases and delivery status.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={loadOrders}
                      disabled={loadingOrders}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/[0.12] text-xs font-semibold text-[#d9c3a3] hover:bg-[#031e3d] disabled:opacity-50"
                      title="Refresh orders"
                    >
                      <FiRefreshCw
                        className={loadingOrders ? "animate-spin" : ""}
                      />
                      Refresh
                    </button>

                    <FiPackage size={24} className="text-[#a8bbcf]" />
                  </div>
                </div>

                {loadingOrders ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="h-24 rounded-2xl bg-white/[0.06] animate-pulse"
                      />
                    ))}
                  </div>
                ) : ordersError ? (
                  <div className="text-center py-14">
                    <FiPackage size={42} className="mx-auto text-[#6f8ba8]" />

                    <h3 className="mt-4 font-semibold text-[#f5efe6]">
                      Couldn't load your orders
                    </h3>

                    <p className="text-sm text-[#c1cddd] mt-1">
                      {ordersError}
                    </p>

                    <button
                      type="button"
                      onClick={loadOrders}
                      className="mt-5 px-5 py-3 rounded-xl bg-[#d9c3a3] text-[#031e3d] text-sm font-semibold"
                    >
                      Try Again
                    </button>
                  </div>
                ) : recentOrders.length === 0 ? (
                  <div className="text-center py-14">
                    <FiShoppingBag size={42} className="mx-auto text-[#6f8ba8]" />

                    <h3 className="mt-4 font-semibold text-[#f5efe6]">
                      No orders found
                    </h3>

                    <p className="text-sm text-[#c1cddd] mt-1">
                      Your orders will appear here.
                    </p>

                    <button
                      type="button"
                      onClick={() => navigate("/products")}
                      className="mt-5 px-5 py-3 rounded-xl bg-[#d9c3a3] text-[#031e3d] text-sm font-semibold"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentOrders.map((order, index) => {
                      const status = getOrderStatus(order);
                      const StatusIcon = getStatusIcon(status);
                      const orderId = getOrderId(order);
                      const orderDate = getOrderDate(order);

                      return (
                        <div
                          key={orderId || index}
                          className="border border-[#1c4a70] rounded-2xl p-5"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                            <div>
                              <p className="text-xs text-[#a8bbcf] uppercase tracking-wider">
                                Order
                              </p>

                              <p className="font-semibold text-[#f5efe6] mt-1">
                                #{orderId || "Pending"}
                              </p>

                              {orderDate && (
                                <p className="text-xs text-[#a8bbcf] mt-1">
                                  {new Date(orderDate).toLocaleDateString(
                                    "en-IN",
                                    {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    }
                                  )}
                                </p>
                              )}
                            </div>

                            <div
                              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusStyle(
                                status
                              )}`}
                            >
                              <StatusIcon size={14} />
                              {status}
                            </div>

                            <div className="font-bold text-[#f5efe6]">
                              {formatCurrency(getOrderTotal(order))}
                            </div>
                          </div>

                          {order.items?.length > 0 && (
                            <div className="mt-5 pt-5 border-t border-white/[0.09] flex gap-3 overflow-x-auto">
                              {order.items.slice(0, 5).map((item, itemIndex) => {
                                const image = getItemImage(item);

                                return (
                                  <div
                                    key={itemIndex}
                                    className="shrink-0 w-16 h-16 rounded-xl bg-[#031e3d] overflow-hidden"
                                  >
                                    {image ? (
                                      <img
                                        src={image}
                                        alt=""
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center text-[#6f8ba8]">
                                        <FiPackage />
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          <div className="flex flex-wrap gap-3 mt-5">
                            <button
                              type="button"
                              onClick={() =>
                                navigate(`/order-confirmation/${orderId}`)
                              }
                              disabled={!orderId}
                              className="px-4 py-2 rounded-lg border border-white/[0.12] text-sm font-semibold hover:bg-[#031e3d] disabled:opacity-50"
                            >
                              View Order
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                showToast(
                                  "Invoice download will be connected when the invoice endpoint is added."
                                )
                              }
                              className="px-4 py-2 rounded-lg border border-white/[0.12] text-sm font-semibold hover:bg-[#031e3d] inline-flex items-center gap-2"
                            >
                              <FiFileText />
                              Invoice
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                navigate(`/order-confirmation/${orderId}`)
                              }
                              disabled={!orderId}
                              className="px-4 py-2 rounded-lg bg-[#d9c3a3] text-[#031e3d] text-sm font-semibold inline-flex items-center gap-2 disabled:opacity-50"
                            >
                              <FiTruck />
                              Track
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* WISHLIST */}

            {activeSection === "wishlist" && (
              <div className="rounded-[28px] border border-white/[0.09] bg-gradient-to-br from-[#0a365d] to-[#062747] p-5 shadow-[0_22px_60px_rgba(0,0,0,0.17)] sm:p-8">

                <div className="flex items-center justify-between mb-7">
                  <div>
                    <h2 className="text-xl font-bold text-[#f5efe6]">
                      Wishlist
                    </h2>

                    <p className="text-sm text-[#c1cddd] mt-1">
                      Products you saved for later.
                    </p>
                  </div>

                  <FiHeart size={24} className="text-[#a8bbcf]" />
                </div>

                {wishlistItems.length === 0 ? (
                  <div className="text-center py-14">
                    <FiHeart size={42} className="mx-auto text-[#6f8ba8]" />

                    <h3 className="mt-4 font-semibold text-[#f5efe6]">
                      Your wishlist is empty
                    </h3>

                    <p className="text-sm text-[#c1cddd] mt-1">
                      Save products you love and find them here.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    {wishlistItems.map((item, index) => {
                      const image = getItemImage(item);

                      return (
                        <div
                          key={item?.id || item?._id || index}
                          className="border border-[#1c4a70] rounded-2xl overflow-hidden group"
                        >
                          <div className="aspect-square bg-[#031e3d]">
                            {image ? (
                              <img
                                src={image}
                                alt={getItemName(item)}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[#6f8ba8]">
                                <FiHeart size={30} />
                              </div>
                            )}
                          </div>

                          <div className="p-4">
                            <h3 className="text-sm font-semibold text-[#f5efe6] line-clamp-2">
                              {getItemName(item)}
                            </h3>

                            <p className="mt-2 font-bold text-[#f5efe6]">
                              {formatCurrency(getItemPrice(item))}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* CART */}

            {activeSection === "cart" && (
              <div className="space-y-6">

                <div className="rounded-[28px] border border-white/[0.09] bg-gradient-to-br from-[#0a365d] to-[#062747] p-5 shadow-[0_22px_60px_rgba(0,0,0,0.17)] sm:p-8">

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
                    <div>
                      <h2 className="text-xl font-bold text-[#f5efe6]">
                        Current Cart
                      </h2>

                      <p className="text-sm text-[#c1cddd] mt-1">
                        Products currently in your shopping cart.
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-[#164267] text-xs font-semibold text-[#d9c3a3]">
                        {cartItems.length} items
                      </span>

                      <button
                        type="button"
                        onClick={saveCartSnapshot}
                        disabled={!cartItems.length}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#d9c3a3] text-[#031e3d] text-sm font-semibold disabled:opacity-40"
                      >
                        <FiSave />
                        Save Snapshot
                      </button>
                    </div>
                  </div>

                  {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                      <FiShoppingCart size={42} className="mx-auto text-[#6f8ba8]" />

                      <h3 className="mt-4 font-semibold text-[#f5efe6]">
                        Your cart is empty
                      </h3>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {cartItems.map((item, index) => {
                        const image = getItemImage(item);

                        return (
                          <div
                            key={item?.id || item?._id || index}
                            className="flex items-center gap-4 border border-[#1c4a70] rounded-xl p-3"
                          >
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#031e3d] shrink-0">
                              {image ? (
                                <img
                                  src={image}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[#6f8ba8]">
                                  <FiShoppingCart />
                                </div>
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-sm text-[#f5efe6] truncate">
                                {getItemName(item)}
                              </h3>

                              <p className="text-xs text-[#c1cddd] mt-1">
                                Qty: {getItemQuantity(item)}
                              </p>
                            </div>

                            <p className="font-bold text-sm text-[#f5efe6]">
                              {formatCurrency(
                                getItemPrice(item) * getItemQuantity(item)
                              )}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Cart History */}

                <div className="rounded-[28px] border border-white/[0.09] bg-gradient-to-br from-[#0a365d] to-[#062747] p-5 shadow-[0_22px_60px_rgba(0,0,0,0.17)] sm:p-8">

                  <div className="mb-7">
                    <h2 className="text-xl font-bold text-[#f5efe6]">
                      Cart History
                    </h2>

                    <p className="text-sm text-[#c1cddd] mt-1">
                      Saved cart snapshots on this device.
                    </p>
                  </div>

                  {cartHistory.length === 0 ? (
                    <div className="text-center py-10 text-[#a8bbcf]">
                      <FiClock size={34} className="mx-auto" />

                      <p className="mt-3 text-sm">No cart history yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {cartHistory.map((snapshot) => (
                        <div
                          key={snapshot.id}
                          className="flex items-center justify-between gap-4 border border-[#1c4a70] rounded-xl p-4"
                        >
                          <div>
                            <p className="font-semibold text-sm text-[#f5efe6]">
                              {snapshot.items?.length} products
                            </p>

                            <p className="text-xs text-[#c1cddd] mt-1">
                              {new Date(snapshot.createdAt).toLocaleString()}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => deleteCartHistory(snapshot.id)}
                            className="p-2 rounded-lg text-red-500 hover:bg-red-50"
                            title="Delete snapshot"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* PAYMENT METHODS */}

            {activeSection === "payments" && (
              <div className="rounded-[28px] border border-white/[0.09] bg-gradient-to-br from-[#0a365d] to-[#062747] p-5 shadow-[0_22px_60px_rgba(0,0,0,0.17)] sm:p-8">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
                  <div>
                    <h2 className="text-xl font-bold text-[#f5efe6]">
                      Payment Methods
                    </h2>

                    <p className="text-sm text-[#c1cddd] mt-1">
                      Manage your preferred payment methods.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowPaymentForm((value) => !value)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#d9c3a3] text-[#031e3d] text-sm font-semibold"
                  >
                    <FiPlus />
                    Add Method
                  </button>
                </div>

                {showPaymentForm && (
                  <div className="border border-[#1c4a70] rounded-2xl p-5 mb-6 bg-[#031e3d]">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#c1cddd] mb-2">
                          Payment Type
                        </label>

                        <select
                          value={paymentType}
                          onChange={(e) => setPaymentType(e.target.value)}
                          className="w-full rounded-xl border border-white/[0.12] bg-[#031e3d]/80 text-[#f5efe6] px-4 py-3 text-sm outline-none transition-colors"
                        >
                          <option>Card</option>
                          <option>UPI</option>
                          <option>Wallet</option>
                          <option>PayPal</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#c1cddd] mb-2">
                          Label / Details
                        </label>

                        <input
                          value={paymentLabel}
                          onChange={(e) => setPaymentLabel(e.target.value)}
                          placeholder="e.g. Visa ending 4242"
                          className="w-full rounded-xl border border-white/[0.12] bg-[#031e3d]/80 text-[#f5efe6] px-4 py-3 text-sm outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 mt-5">
                      <button
                        type="button"
                        onClick={handleAddPaymentMethod}
                        className="px-4 py-2 rounded-lg bg-[#d9c3a3] text-[#031e3d] text-sm font-semibold"
                      >
                        Save
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowPaymentForm(false)}
                        className="px-4 py-2 rounded-lg border border-white/[0.12] text-sm font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {paymentMethods.length === 0 ? (
                  <div className="text-center py-14">
                    <FiCreditCard size={42} className="mx-auto text-[#6f8ba8]" />

                    <h3 className="mt-4 font-semibold text-[#f5efe6]">
                      No saved payment methods
                    </h3>

                    <p className="text-sm text-[#c1cddd] mt-1">
                      Add a payment method for quick access.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className="flex items-center gap-4 border border-[#1c4a70] rounded-xl p-4"
                      >
                        <div className="w-11 h-11 rounded-xl bg-[#164267] flex items-center justify-center">
                          <FiCreditCard />
                        </div>

                        <div className="flex-1">
                          <p className="font-semibold text-sm text-[#f5efe6]">
                            {method.type}
                          </p>

                          <p className="text-xs text-[#c1cddd] mt-1">
                            {method.label}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemovePaymentMethod(method.id)}
                          className="p-2 rounded-lg text-red-500 hover:bg-red-50"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-100 text-xs text-amber-800">
                  Saved payment methods are currently stored as a frontend
                  scaffold. Card numbers and sensitive payment credentials are
                  never stored here.
                </div>
              </div>
            )}

            {/* REVIEWS */}

            {activeSection === "reviews" && (
              <div className="rounded-[28px] border border-white/[0.09] bg-gradient-to-br from-[#0a365d] to-[#062747] p-5 shadow-[0_22px_60px_rgba(0,0,0,0.17)] sm:p-8">

                <div className="flex items-center justify-between mb-7">
                  <div>
                    <h2 className="text-xl font-bold text-[#f5efe6]">
                      My Reviews
                    </h2>

                    <p className="text-sm text-[#c1cddd] mt-1">
                      Reviews and ratings you have submitted.
                    </p>
                  </div>

                  <FiStar size={24} className="text-[#a8bbcf]" />
                </div>

                {reviews.length === 0 ? (
                  <div className="text-center py-14">
                    <FiStar size={42} className="mx-auto text-[#6f8ba8]" />

                    <h3 className="mt-4 font-semibold text-[#f5efe6]">
                      No reviews yet
                    </h3>

                    <p className="text-sm text-[#c1cddd] mt-1">
                      Your submitted reviews will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review, index) => (
                      <div
                        key={review?.id || review?._id || index}
                        className="border border-[#1c4a70] rounded-2xl p-5"
                      >
                        <div className="flex items-start justify-between gap-4">

                          <div>
                            <h3 className="font-semibold text-[#f5efe6]">
                              {review.productName || review.name || "Product"}
                            </h3>

                            <div className="flex items-center gap-1 mt-2">
                              {Array.from({ length: 5 }).map((_, starIndex) => (
                                <FiStar
                                  key={starIndex}
                                  size={15}
                                  className={
                                    starIndex < Number(review.rating || 0)
                                      ? "fill-current text-yellow-500 text-yellow-500"
                                      : "text-[#6f8ba8]"
                                  }
                                />
                              ))}
                            </div>
                          </div>

                          <span className="text-xs text-[#a8bbcf]">
                            {review.createdAt
                              ? new Date(review.createdAt).toLocaleDateString()
                              : ""}
                          </span>
                        </div>

                        <p className="text-sm text-[#d9c3a3] mt-4 leading-6">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </section>

      {/* TOAST */}

      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-[100] flex max-w-sm items-center gap-3 rounded-2xl border border-white/10 px-5 py-4 text-sm font-semibold shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl ${
            toast.type === "error" ? "bg-red-600 text-white" : "bg-[#d9c3a3] text-[#031e3d]"
          }`}
        >
          {toast.type === "error" ? <FiX /> : <FiCheckCircle />}
          <span>{toast.message}</span>
        </div>
      )}
    </main>
  );
}