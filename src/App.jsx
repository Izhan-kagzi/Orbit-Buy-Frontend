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
import LiveOrderTracker from "./components/LiveOrder/LiveOrderTracker";

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
const CustomerCare = lazy(() => import("./pages/CustomerCare"));
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

      {/* Live order status: Dynamic-Island pill on mobile, card on desktop */}
      {!hideLayout && <LiveOrderTracker />}

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
                  path="/customer-care"
                  element={<CustomerCare />}
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
    PREMIUM 404 PAGE — ORBIT BUY
================================================== */}

<Route
  path="*"
  element={
    <main className="relative isolate min-h-screen overflow-hidden bg-white pt-20 text-[#031e3d] sm:pt-24">

      {/* BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-[#d9c3a3]/20 blur-[120px]" />

        <div className="absolute -right-32 top-1/4 h-[500px] w-[500px] rounded-full bg-[#09335a]/[0.06] blur-[130px]" />

        <div className="absolute inset-0 opacity-[0.25] [background-image:radial-gradient(#d9c3a3_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      {/* TOP BAR */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8 sm:py-5 lg:px-12"
      >
        <a href="/" className="group flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#031e3d] text-white shadow-lg transition-transform duration-300 group-hover:-rotate-6">
            <span className="text-xl font-semibold">O</span>
          </span>

          <span className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-[0.16em] text-[#031e3d] sm:text-xl">
              ORBIT BUY
            </span>

            <span className="mt-1.5 text-[9px] font-semibold tracking-[0.28em] text-[#9a805e]">
              PREMIUM FASHION
            </span>
          </span>
        </a>

        <div className="inline-flex items-center gap-2 rounded-full border border-[#d9c3a3]/50 bg-white/90 px-4 py-2 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-[#9a805e]" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#031e3d] sm:text-xs">
            Error 404
          </span>
        </div>
      </motion.header>

      {/* MAIN CONTENT */}
      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-180px)] w-full max-w-7xl items-center gap-8 px-5 pb-10 pt-3 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-12 lg:pb-12">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="order-2 mx-auto w-full max-w-xl text-center lg:order-1 lg:mx-0 lg:text-left"
        >
          {/* LABEL */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#d9c3a3]/60 bg-[#d9c3a3]/15 px-4 py-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9a805e]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#725a3d] sm:text-xs">
              Lost in style
            </span>
          </div>

          {/* HEADING */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl font-semibold leading-[1.05] tracking-[-0.055em] text-[#031e3d] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            Oops!
            <span className="mt-2 block font-serif font-normal italic text-[#9a805e]">
              Page not found.
            </span>
          </motion.h1>

          {/* SUBTITLE */}
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#9a805e] sm:text-sm sm:tracking-[0.25em]">
            This look isn't available
          </p>

          {/* DESCRIPTION */}
          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-slate-500 sm:text-base sm:leading-8 lg:mx-0">
            It seems this page has wandered off the runway. The link may be
            incorrect, or the page may have moved. Let's get you back to
            discovering something extraordinary.
          </p>

          {/* ACTION BUTTONS */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">

            <a
              href="/"
              className="group inline-flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#031e3d] px-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-lg shadow-[#031e3d]/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#09335a] sm:h-14 sm:w-auto"
            >
              Back to home

              <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

            <button
              type="button"
              onClick={() => window.history.back()}
              className="group inline-flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#d9c3a3]/70 bg-white px-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#031e3d] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9a805e] hover:bg-[#d9c3a3]/10 sm:h-14 sm:w-auto"
            >
              <span className="text-base transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>

              Go back
            </button>

          </div>

          {/* FOOTNOTE */}
          <div className="mt-10 flex items-center justify-center gap-4 lg:justify-start">
            <div className="h-px w-10 bg-[#d9c3a3]" />

            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-slate-400 sm:text-[10px]">
              Orbit Buy · Premium Fashion
            </span>

            <div className="h-px w-10 bg-[#d9c3a3]" />
          </div>
        </motion.div>

        {/* RIGHT ILLUSTRATION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="order-1 relative mx-auto flex w-full max-w-[560px] items-center justify-center lg:order-2 lg:max-w-none"
        >
          {/* GLOW */}
          <div
            aria-hidden="true"
            className="absolute inset-[12%] rounded-full bg-[#d9c3a3]/25 blur-[70px]"
          />

          {/* ILLUSTRATION CARD */}
          <div className="relative w-full overflow-hidden rounded-[2rem] border border-[#d9c3a3]/30 bg-white/90 p-3 shadow-[0_25px_80px_rgba(3,30,61,0.08)] backdrop-blur-sm sm:p-6">

            {/* CARD TOP LABEL */}
            <div className="absolute left-6 top-6 z-10 inline-flex items-center gap-2 rounded-full border border-[#d9c3a3]/40 bg-white/95 px-3.5 py-2 shadow-sm sm:left-8 sm:top-8">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9a805e]" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#031e3d]">
                Off the runway
              </span>
            </div>

            {/* YOUR EXISTING IMAGE */}
            <img
              src="/404-illustration.png"
              alt="Illustration representing a page not found"
              className="relative z-0 mx-auto h-auto w-full max-w-[520px] object-contain"
            />

            {/* BOTTOM CARD */}
            <div className="mx-2 mb-2 rounded-2xl border border-[#d9c3a3]/30 bg-[#faf9f6] px-5 py-4 sm:mx-3 sm:px-6 sm:py-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9a805e]">
                Your next discovery awaits
              </p>

              <p className="mt-2 text-sm leading-6 text-[#031e3d] sm:text-base">
                Great style is just a click away. Return home and explore the
                latest collection.
              </p>
            </div>

          </div>
        </motion.div>

      </section>
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