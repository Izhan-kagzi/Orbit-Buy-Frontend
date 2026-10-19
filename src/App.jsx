import { Suspense, lazy } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import NewsletterPopup from "./components/NewsletterPopup/NewsletterPopup";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import BackToTopButton from "./components/ScrollToTop/BackToTopButton";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import CompareBar from "./components/Compare/CompareBar";
import RouteLoader from "./components/Loader/RouteLoader";

import AdminRoute from "./components/Admin/AdminRoute";
import StaffRoute from "./components/Admin/StaffRoute";

import SEO from "./components/SEO";

import Home from "./pages/Home";

import Maintenance from "./pages/Maintenance/Maintenance";
import { useAuth } from "./hooks/useAuth";
import { useMaintenanceStatus } from "./hooks/useMaintenance";

/* ============================================================
   CUSTOMER PAGES
============================================================ */

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(
  () => import("./pages/ForgotPassword")
);

const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));

const PrivacyPolicy = lazy(
  () => import("./pages/PrivacyPolicy")
);

const TermsConditions = lazy(
  () => import("./pages/TermsConditions")
);

const FAQs = lazy(() => import("./pages/FAQs"));

const Shop = lazy(() => import("./pages/Shop"));

const Compare = lazy(
  () => import("./pages/Compare")
);

const AiStylist = lazy(
  () => import("./pages/AiStylist")
);

const Search = lazy(
  () => import("./pages/Search")
);

const ProductDetails = lazy(
  () => import("./pages/ProductDetails")
);

/* ============================================================
   MEN
============================================================ */

const MensShirts = lazy(
  () => import("./pages/MensShirt")
);

const MensTShirt = lazy(
  () => import("./pages/MensTShirt")
);

const MensJeans = lazy(
  () => import("./pages/MensJeans")
);

const MensTrackPant = lazy(
  () => import("./pages/MensTrackPant")
);

const MensHoodies = lazy(
  () => import("./pages/MensHoodies")
);

const MensJackets = lazy(
  () => import("./pages/MensJackets")
);

/* NEW MEN CATEGORIES */

const MensFormals = lazy(
  () => import("./pages/MensFormals")
);

const MensSweatshirts = lazy(
  () => import("./pages/MensSweatshirts")
);

const MensShackets = lazy(
  () => import("./pages/MensShackets")
);

/* ============================================================
   WOMEN
============================================================ */

const WomenDresses = lazy(
  () => import("./pages/WomenDresses")
);

const WomenPartyWear = lazy(
  () => import("./pages/WomenPartyWear")
);

const WomenJeans = lazy(
  () => import("./pages/WomensJeans")
);

const WomenCordSet = lazy(
  () => import("./pages/WomenCordSet")
);

const WomenFormals = lazy(
  () => import("./pages/WomenFormals")
);

const WomenShirts = lazy(
  () => import("./pages/WomenShirts")
);

const WomenSkirts = lazy(
  () => import("./pages/WomenSkirts")
);

const WomenJumpsuits = lazy(
  () => import("./pages/WomenJumpsuits")
);

/* NEW WOMEN CATEGORIES */



const WomenShrugs = lazy(
  () => import("./pages/WomenShrugs")
);

const WomenCardigans = lazy(
  () => import("./pages/WomenCardigans")
);

/* ============================================================
   SHOPPING
============================================================ */

const Cart = lazy(
  () => import("./pages/Cart")
);

const Wishlist = lazy(
  () => import("./pages/Wishlist")
);

const Checkout = lazy(
  () => import("./pages/Checkout")
);

const OrderConfirmation = lazy(
  () => import("./pages/OrderConfirmation")
);

const Profile = lazy(
  () => import("./pages/Profile")
);

const Orders = lazy(
  () => import("./pages/Orders")
);

/* ============================================================
   ADMIN
============================================================ */

const AdminDashboard = lazy(
  () => import("./pages/admin/AdminDashboard")
);

const AdminProducts = lazy(
  () => import("./pages/admin/AdminProducts")
);

const AdminProductForm = lazy(
  () => import("./pages/admin/AdminProductForm")
);

const AdminOrders = lazy(
  () => import("./pages/admin/AdminOrders")
);

const AdminCoupons = lazy(
  () => import("./pages/admin/AdminCoupons")
);

const AdminManagers = lazy(
  () => import("./pages/admin/AdminManagers")
);

const AdminCancellations = lazy(
  () => import("./pages/admin/AdminCancellations")
);

const AdminFlashSale = lazy(
  () => import("./pages/admin/AdminFlashSale")
);

const AdminReviews = lazy(
  () => import("./pages/admin/AdminReviews")
);

const AdminMaintenance = lazy(
  () => import("./pages/admin/AdminMaintenance")
);

/* ============================================================
   APP
============================================================ */

function App() {
  const location = useLocation();

  const { isStaff, loading: authLoading } = useAuth();

  const maintenance = useMaintenanceStatus();

  /* ============================================================
     LAYOUT VISIBILITY
  ============================================================ */

  const hideLayout =
    [
      "/login",
      "/register",
      "/forgot-password",
      "/maintenance",
    ].includes(location.pathname) ||
    location.pathname.startsWith("/admin");

  /* ============================================================
     MAINTENANCE MODE
  ============================================================ */

  // Maintenance applies to the customer storefront only. Keep /admin
  // reachable so an admin can still sign in, inspect the dashboard, and
  // switch maintenance back off after a hard refresh. AdminRoute/StaffRoute
  // still enforce authorization for those pages.
  //
  // While maintenance is active EVERYONE (customers, managers, admins) only
  // sees the maintenance page. The two exceptions are needed so maintenance
  // can be switched off again: /login, and /admin/maintenance for a
  // signed-in admin/manager.
  const isMaintenanceControl = location.pathname === "/admin/maintenance";

  const blockedByMaintenance =
    maintenance.active &&
    location.pathname !== "/login" &&
    !(isStaff && isMaintenanceControl);

  // Don't flash the storefront (or the maintenance page at a signed-in
  // staff member) before we know the maintenance status and who is signed in.
  if (!maintenance.checked || authLoading) {
    return <RouteLoader />;
  }

  // Staff who land anywhere else in the dashboard (e.g. right after login)
  // are taken straight to the maintenance control page.
  if (
    maintenance.active &&
    isStaff &&
    location.pathname.startsWith("/admin") &&
    !isMaintenanceControl
  ) {
    return <Navigate to="/admin/maintenance" replace />;
  }

  if (blockedByMaintenance) {
    return (
      <Maintenance
        message={maintenance.message}
        endTime={maintenance.endTime}
      />
    );
  }

  return (
    <>
      <SEO
        title="Orbit Buy | Premium Fashion for Men & Women"
        description="Shop premium men's and women's fashion at Orbit Buy. Discover stylish clothing, trendy collections, quality apparel and the latest fashion for every occasion."
        path="/"
      />

      <ScrollToTop />

      {!hideLayout && <Navbar />}

      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.25,
              ease: "easeInOut",
            }}
          >
            <Suspense fallback={<RouteLoader />}>
              <Routes location={location}>

                {/* ==================================================
                    HOME
                ================================================== */}

                <Route
                  path="/"
                  element={<Home />}
                />

                {/* ==================================================
                    AUTH
                ================================================== */}

                <Route
                  path="/login"
                  element={<Login />}
                />

                <Route
                  path="/maintenance"
                  element={<Maintenance />}
                />

                <Route
                  path="/register"
                  element={<Register />}
                />

                <Route
                  path="/forgot-password"
                  element={<ForgotPassword />}
                />

                {/* ==================================================
                    MEN
                ================================================== */}

                <Route
                  path="/mens-shirts"
                  element={<MensShirts />}
                />

                <Route
                  path="/mens-tshirts"
                  element={<MensTShirt />}
                />

                <Route
                  path="/mens-jeans"
                  element={<MensJeans />}
                />

                <Route
                  path="/mens-trackpants"
                  element={<MensTrackPant />}
                />

                <Route
                  path="/mens-hoodies"
                  element={<MensHoodies />}
                />

                <Route
                  path="/mens-jackets"
                  element={<MensJackets />}
                />

                {/* NEW MEN CATEGORIES */}

                <Route
                  path="/mens-formals"
                  element={<MensFormals />}
                />

                <Route
                  path="/mens-sweatshirts"
                  element={<MensSweatshirts />}
                />

                <Route
                  path="/mens-shackets"
                  element={<MensShackets />}
                />

                {/* ==================================================
                    WOMEN
                ================================================== */}

                <Route
                  path="/women-dresses"
                  element={<WomenDresses />}
                />

                <Route
                  path="/women-partywear"
                  element={<WomenPartyWear />}
                />

                <Route
                  path="/women-jeans"
                  element={<WomenJeans />}
                />

                <Route
                  path="/women-cordset"
                  element={<WomenCordSet />}
                />

                <Route
                  path="/women-formals"
                  element={<WomenFormals />}
                />

                <Route
                  path="/women-shirts"
                  element={<WomenShirts />}
                />

                <Route
                  path="/women-skirts"
                  element={<WomenSkirts />}
                />

                <Route
                  path="/women-jumpsuits"
                  element={<WomenJumpsuits />}
                />

                {/* NEW WOMEN CATEGORIES */}

                

                <Route
                  path="/women-shrugs"
                  element={<WomenShrugs />}
                />

                <Route
                  path="/women-cardigans"
                  element={<WomenCardigans />}
                />

                {/* ==================================================
                    SHOP
                ================================================== */}

                <Route
                  path="/shop"
                  element={<Shop />}
                />

                <Route
                  path="/compare"
                  element={<Compare />}
                />

                <Route
                  path="/ai-stylist"
                  element={<AiStylist />}
                />

                <Route
                  path="/new-arrivals"
                  element={<Shop />}
                />

                <Route
                  path="/best-sellers"
                  element={<Shop />}
                />

                <Route
                  path="/sale-men"
                  element={<Shop />}
                />

                <Route
                  path="/sale-women"
                  element={<Shop />}
                />

                <Route
                  path="/sale"
                  element={<Shop />}
                />

                <Route
                  path="/search"
                  element={<Search />}
                />

                <Route
                  path="/product/:id"
                  element={<ProductDetails />}
                />

                {/* ==================================================
                    INFORMATION
                ================================================== */}

                <Route
                  path="/contact"
                  element={<Contact />}
                />

                <Route
                  path="/about"
                  element={<About />}
                />

                <Route
                  path="/privacy-policy"
                  element={<PrivacyPolicy />}
                />

                <Route
                  path="/terms-conditions"
                  element={<TermsConditions />}
                />

                <Route
                  path="/faqs"
                  element={<FAQs />}
                />

                {/* ==================================================
                    SHOPPING
                ================================================== */}

                <Route
                  path="/cart"
                  element={<Cart />}
                />

                <Route
                  path="/wishlist"
                  element={<Wishlist />}
                />

                <Route
                  path="/checkout"
                  element={<Checkout />}
                />

                <Route
                  path="/order-confirmation/:orderId"
                  element={<OrderConfirmation />}
                />

                {/* ==================================================
                    ACCOUNT
                ================================================== */}

                <Route
                  path="/profile"
                  element={<Profile />}
                />

                <Route
                  path="/orders"
                  element={<Orders />}
                />

                {/* ==================================================
                    ADMIN / STAFF
                ================================================== */}

                <Route
                  path="/admin"
                  element={
                    <StaffRoute>
                      <AdminDashboard />
                    </StaffRoute>
                  }
                />

                <Route
                  path="/admin/flash-sale"
                  element={
                    <StaffRoute>
                      <AdminFlashSale />
                    </StaffRoute>
                  }
                />

                <Route
                  path="/admin/products"
                  element={
                    <StaffRoute>
                      <AdminProducts />
                    </StaffRoute>
                  }
                />

                <Route
                  path="/admin/products/new"
                  element={
                    <StaffRoute>
                      <AdminProductForm />
                    </StaffRoute>
                  }
                />

                <Route
                  path="/admin/products/:id/edit"
                  element={
                    <StaffRoute>
                      <AdminProductForm />
                    </StaffRoute>
                  }
                />

                <Route
                  path="/admin/orders"
                  element={
                    <StaffRoute>
                      <AdminOrders />
                    </StaffRoute>
                  }
                />

                <Route
                  path="/admin/cancellations"
                  element={
                    <StaffRoute>
                      <AdminCancellations />
                    </StaffRoute>
                  }
                />

                {/* ==================================================
                    REVIEWS — ADMIN + MANAGER
                ================================================== */}

                <Route
                  path="/admin/reviews"
                  element={
                    <StaffRoute>
                      <AdminReviews />
                    </StaffRoute>
                  }
                />

                {/* ==================================================
                    ADMIN ONLY
                ================================================== */}

                <Route
                  path="/admin/coupons"
                  element={
                    <AdminRoute>
                      <AdminCoupons />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/admin/managers"
                  element={
                    <AdminRoute>
                      <AdminManagers />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/admin/maintenance"
                  element={
                    <StaffRoute>
                      <AdminMaintenance />
                    </StaffRoute>
                  }
                />

                                {/* ==================================================
                    404
                ================================================== */}

                <Route
                  path="*"
                  element={
                    <main className="relative isolate min-h-screen overflow-hidden bg-[#f7faff] text-[#0b1f3a]">

                      {/* BACKGROUND */}

                      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                        <div className="absolute -left-32 -top-40 h-[420px] w-[420px] rounded-full bg-[#1d72d8]/10 blur-[100px]" />
                        <div className="absolute -right-28 top-1/3 h-[480px] w-[480px] rounded-full bg-[#5aa7ff]/15 blur-[120px]" />
                        <div className="absolute inset-0 opacity-[0.32] [background-image:radial-gradient(#b7cce5_1px,transparent_1px)] [background-size:24px_24px]" />
                      </div>

                      {/* TOP BAR */}

                      <motion.header
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-12"
                      >
                        <a href="/" className="group flex items-center gap-3">
                          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0b2e59] text-white shadow-lg shadow-blue-950/15 transition-transform duration-300 group-hover:-rotate-6">
                            <span className="text-lg font-semibold">O</span>
                          </span>
                          <span className="flex flex-col leading-none">
                            <span className="text-lg font-bold tracking-[0.16em] text-[#0b2e59] sm:text-xl">ORBIT BUY</span>
                            <span className="mt-1.5 text-[9px] font-semibold tracking-[0.28em] text-[#3979bd]">PREMIUM FASHION</span>
                          </span>
                        </a>

                        <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#315779] shadow-sm backdrop-blur sm:px-4 sm:text-xs">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-40" />
                            <span className="relative h-2 w-2 rounded-full bg-blue-600" />
                          </span>
                          Error 404
                        </div>
                      </motion.header>

                      {/* MAIN */}

                      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-150px)] w-full max-w-7xl items-center gap-8 px-5 pb-12 pt-3 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:px-12 lg:pb-16">

                        <motion.div
                          initial={{ opacity: 0, x: -24 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                          className="order-2 mx-auto w-full max-w-2xl text-center lg:order-1 lg:mx-0 lg:text-left"
                        >
                          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#3979bd] shadow-sm sm:text-xs">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                            Looks like you took a wrong turn
                          </div>

                          <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#0b1f3a] sm:text-5xl md:text-6xl lg:text-[4.25rem]"
                          >
                            Page
                            <span className="mt-1 block bg-gradient-to-r from-[#1557a6] via-[#287fdb] to-[#62a9ff] bg-clip-text pb-2 uppercase text-transparent">
                              not found.
                            </span>
                          </motion.h1>

                          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#3979bd] sm:text-sm sm:tracking-[0.3em]">
                            Let’s get you back on track
                          </p>

                          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:mx-0">
                            The page you’re looking for may have been moved,
                            deleted, or the link might be incorrect. Head back
                            home and keep shopping.
                          </p>

                          {/* BUTTONS */}

                          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">

                            <a
                              href="/"
                              className="group inline-flex h-12 items-center gap-3 rounded-2xl bg-[#0b2e59] px-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_12px_36px_rgba(28,86,145,0.18)] transition-colors duration-300 hover:bg-[#12457e] sm:h-14 sm:px-7"
                            >
                              Back home
                              <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
                            </a>

                            <button
                              type="button"
                              onClick={() => window.history.back()}
                              className="group inline-flex h-12 items-center gap-3 rounded-2xl border border-blue-100 bg-white/90 px-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0b2e59] shadow-sm transition-colors duration-300 hover:border-blue-300 sm:h-14 sm:px-7"
                            >
                              <span className="text-base transition-transform duration-300 group-hover:-translate-x-1">←</span>
                              Go back
                            </button>

                          </div>

                          <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
                            <div className="h-px w-8 bg-blue-200" />
                            <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-slate-400 sm:text-[10px]">
                              Orbit Buy · Premium Fashion
                            </span>
                            <div className="h-px w-8 bg-blue-200" />
                          </div>
                        </motion.div>

                        {/* 404 ILLUSTRATION */}

                        <motion.div
                          initial={{ opacity: 0, scale: 0.96, y: 12 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ delay: 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          className="order-1 relative mx-auto flex w-full max-w-[560px] items-center justify-center lg:order-2 lg:max-w-none"
                        >
                          <div aria-hidden="true" className="absolute inset-[12%] rounded-full bg-blue-300/25 blur-3xl" />

                          <div className="relative w-full rounded-[2rem] border border-white/90 bg-white/70 p-3 shadow-[0_24px_80px_rgba(23,72,125,0.11)] backdrop-blur-sm sm:p-5">
                            <div className="absolute left-6 top-6 z-10 flex items-center gap-2 rounded-full border border-blue-100 bg-white/95 px-3 py-2 shadow-sm sm:left-8 sm:top-8">
                              <span className="h-2 w-2 rounded-full bg-blue-500" />
                              <span className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#315779]">
                                Nothing here
                              </span>
                            </div>

                            <img
                              src="/404-illustration.png"
                              alt="Illustration of a person searching with a magnifying glass on a 404"
                              className="relative z-0 mx-auto h-auto w-full max-w-[520px] object-contain"
                            />
                          </div>
                        </motion.div>

                      </section>

                      {/* FOOTER */}

                      <footer className="relative z-10 px-5 pb-6 text-center sm:px-8">
                        <p className="text-[9px] font-medium tracking-[0.12em] text-slate-400 sm:text-[10px]">
                          © {new Date().getFullYear()} Orbit Buy <span className="mx-2 text-blue-300">·</span> All rights reserved
                        </p>
                      </footer>

                    </main>
                  }
                />

              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      {!hideLayout && <Footer />}

      <CompareBar />

      <NewsletterPopup />

      <BackToTopButton />
    </>
  );
}

export default App;