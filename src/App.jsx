import { Suspense, lazy } from "react";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Link } from "react-router-dom";
import { GiAstronautHelmet } from "react-icons/gi";
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
const Compare = lazy(() => import("./pages/Compare"));
const AiStylist = lazy(
  () => import("./pages/AiStylist")
);

const Search = lazy(() => import("./pages/Search"));
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

/* ============================================================
   SHOPPING
============================================================ */

const Cart = lazy(() => import("./pages/Cart"));
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

function App() {
  const location = useLocation();
  const { isStaff } = useAuth();
  const maintenance = useMaintenanceStatus();

  const hideLayout =
    [
      "/login",
      "/register",
      "/forgot-password",
      "/maintenance"
    ].includes(location.pathname) ||
    location.pathname.startsWith("/admin");

  // While maintenance is on, everyone except signed-in staff and the
  // login page (so an admin/manager can actually sign in) sees the
  // maintenance page instead of the normal site.
  const blockedByMaintenance =
    maintenance.active && !isStaff && location.pathname !== "/login";

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
            <Suspense
              fallback={<RouteLoader />}
            >
              <Routes location={location}>
                {/* HOME */}

                <Route
                  path="/"
                  element={<Home />}
                />

                {/* AUTH */}

                <Route
                  path="/login"
                  element={<Login />}
                />
<Route path="/maintenance" element={<Maintenance />} />
                <Route
                  path="/register"
                  element={<Register />}
                />

                <Route
                  path="/forgot-password"
                  element={
                    <ForgotPassword />
                  }
                />

                {/* MEN */}

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

                {/* WOMEN */}

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

                {/* SHOP */}

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
                  element={
                    <ProductDetails />
                  }
                />

                {/* INFORMATION */}

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
                  element={
                    <PrivacyPolicy />
                  }
                />

                <Route
                  path="/terms-conditions"
                  element={
                    <TermsConditions />
                  }
                />

                <Route
                  path="/faqs"
                  element={<FAQs />}
                />

                {/* SHOPPING */}

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
                  element={
                    <OrderConfirmation />
                  }
                />

                {/* ACCOUNT */}

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

                {/* ADMIN ONLY */}

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
                    <AdminRoute>
                      <AdminMaintenance />
                    </AdminRoute>
                  }
                />
<Route
  path="*"
  element={
    <div className="relative min-h-screen overflow-hidden bg-[#0b0b0b] text-white">

      {/* =========================
          BACKGROUND DETAILS
      ========================== */}
      <div className="pointer-events-none absolute inset-0">

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)
            `,
            backgroundSize: "70px 70px",
          }}
        />

        {/* Glow */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-3xl" />

        {/* Decorative circles */}
        <div className="absolute left-[8%] top-[18%] h-2 w-2 rounded-full bg-white/40" />
        <div className="absolute right-[12%] top-[25%] h-1.5 w-1.5 rounded-full bg-white/30" />
        <div className="absolute bottom-[18%] left-[18%] h-1.5 w-1.5 rounded-full bg-white/30" />
      </div>

      {/* =========================
          TOP BAR
      ========================== */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10 lg:px-16">

        <a
          href="/"
          className="group flex items-center gap-3"
        >
          {/* Logo mark */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-white/60 group-hover:rotate-45">
            <span className="h-2 w-2 rounded-full bg-white" />
          </div>

          <span className="text-sm font-semibold uppercase tracking-[0.25em]">
            Your Brand
          </span>
        </a>

        <span className="hidden text-[10px] uppercase tracking-[0.35em] text-white/40 sm:block">
          Error 404
        </span>
      </header>

      {/* =========================
          MAIN
      ========================== */}
      <main className="relative z-10 flex min-h-[calc(100vh-90px)] items-center justify-center px-5 pb-16 pt-8">

        <div className="w-full max-w-[1400px]">

          {/* Small top label */}
          <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
              Lost in space
            </span>

            <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
              2026
            </span>
          </div>

          {/* =========================
              GIANT 404
          ========================== */}
          <div className="relative">

            <h1
              className="
                select-none
                text-center
                text-[32vw]
                font-black
                leading-[0.72]
                tracking-[-0.09em]
                text-white
                sm:text-[30vw]
                md:text-[27vw]
                lg:text-[24vw]
              "
            >
              404
            </h1>

            {/* Horizontal line */}
            <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10" />

            {/* Center marker */}
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 bg-[#0b0b0b] px-5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-white" />

              <span className="whitespace-nowrap text-[9px] uppercase tracking-[0.35em] text-white/50">
                Page not found
              </span>
            </div>
          </div>

          {/* =========================
              BOTTOM CONTENT
          ========================== */}
          <div className="mt-12 grid grid-cols-1 gap-8 border-t border-white/10 pt-8 md:grid-cols-3 md:items-end">

            {/* Message */}
            <div className="md:col-span-2">
              <p className="max-w-xl text-xl font-light leading-relaxed text-white/70 sm:text-2xl">
                Looks like you've wandered somewhere
                that doesn't exist.
              </p>

              <p className="mt-3 max-w-lg text-sm leading-6 text-white/35">
                The page you're looking for may have been moved,
                deleted, or the URL might be incorrect.
              </p>
            </div>

            {/* Button */}
            <div className="flex md:justify-end">
              <a
                href="/"
                className="
                  group
                  relative
                  inline-flex
                  items-center
                  gap-5
                  overflow-hidden
                  rounded-full
                  border
                  border-white/20
                  px-7
                  py-4
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-white
                  transition-all
                  duration-500
                  hover:border-white
                "
              >

                {/* Hover background */}
                <span
                  className="
                    absolute
                    inset-0
                    -translate-x-full
                    bg-white
                    transition-transform
                    duration-500
                    group-hover:translate-x-0
                  "
                />

                <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
                  Back Home
                </span>

                <span className="relative z-10 text-lg transition-all duration-500 group-hover:translate-x-1 group-hover:text-black">
                  →
                </span>

              </a>
            </div>
          </div>

          {/* =========================
              FOOTER INFO
          ========================== */}
          <div className="mt-16 flex flex-col justify-between gap-4 text-[9px] uppercase tracking-[0.3em] text-white/25 sm:flex-row">
            <span>404 — Nothing here</span>

            <span>
              Return to the beginning
            </span>
          </div>

        </div>
      </main>

      {/* =========================
          SIDE DECORATION
      ========================== */}
      <div className="pointer-events-none absolute left-5 top-1/2 hidden -translate-y-1/2 -rotate-90 text-[9px] uppercase tracking-[0.5em] text-white/20 lg:block">
        System / Navigation / 404
      </div>

      <div className="pointer-events-none absolute right-5 top-1/2 hidden -translate-y-1/2 rotate-90 text-[9px] uppercase tracking-[0.5em] text-white/20 lg:block">
        Error / Not Found
      </div>

    </div>
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