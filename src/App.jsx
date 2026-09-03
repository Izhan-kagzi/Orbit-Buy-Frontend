import { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

/* ============================================================
   Above-the-fold / persistent shell — STATIC imports.
   These render on every page and must never be code-split:
   splitting them would add a network round-trip + Suspense
   flash before the very first paint, hurting FCP/LCP and
   causing layout shift as the shell pops in late.
   ============================================================ */

import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import BackToTopButton from "./components/ScrollToTop/BackToTopButton";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import CompareBar from "./components/Compare/CompareBar";
import RouteLoader from "./components/Loader/RouteLoader";
import AdminRoute from "./components/Admin/AdminRoute";
import StaffRoute from "./components/Admin/StaffRoute";

/* The landing page itself is also static: it's what most visits
   render first, so it should ship in the initial bundle rather
   than triggering a lazy fetch+Suspense fallback on first load. */
import Home from "./pages/Home";

/* ============================================================
   Everything else — LAZY. None of these are needed for the
   first paint of any given page; React.lazy() + Suspense means
   their code only downloads when a user actually navigates to
   them, keeping the initial JS bundle small.
   ============================================================ */
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const FAQs = lazy(() => import("./pages/FAQs"));
const Shop = lazy(() => import("./pages/Shop"));
const Compare = lazy(() => import("./pages/Compare"));
const AiStylist = lazy(() => import("./pages/AiStylist"));
const Search = lazy(() => import("./pages/Search"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));

const MensShirts = lazy(() => import("./pages/MensShirt"));
const MensTShirt = lazy(() => import("./pages/MensTShirt"));
const MensJeans = lazy(() => import("./pages/MensJeans"));
const MensTrackPant = lazy(() => import("./pages/MensTrackPant"));
const MensHoodies = lazy(() => import("./pages/MensHoodies"));
const MensJackets = lazy(() => import("./pages/MensJackets"));

const WomenDresses = lazy(() => import("./pages/WomenDresses"));
const WomenPartyWear = lazy(() => import("./pages/WomenPartyWear"));
const WomenJeans = lazy(() => import("./pages/WomensJeans"));
const WomenCordSet = lazy(() => import("./pages/WomenCordSet"));
const WomenFormals = lazy(() => import("./pages/WomenFormals"));
const WomenShirts = lazy(() => import("./pages/WomenShirts"));
const WomenSkirts = lazy(() => import("./pages/WomenSkirts"));
const WomenJumpsuits = lazy(() => import("./pages/WomenJumpsuits"));

const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));
const Profile = lazy(() => import("./pages/Profile"));
const Orders = lazy(() => import("./pages/Orders"));

const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts"));
const AdminProductForm = lazy(() => import("./pages/admin/AdminProductForm"));
const AdminOrders = lazy(() => import("./pages/admin/AdminOrders"));
const AdminCoupons = lazy(() => import("./pages/admin/AdminCoupons"));
const AdminManagers = lazy(() => import("./pages/admin/AdminManagers"));
const AdminCancellations = lazy(() => import("./pages/admin/AdminCancellations"));

function App() {
  const location = useLocation();

  const hideLayout =
    ["/login", "/register", "/forgot-password"].includes(location.pathname) ||
    location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {!hideLayout && (
        <>
         
          <Navbar />
        </>
      )}

      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <Suspense fallback={<RouteLoader />}>
              <Routes location={location}>

                {/* Home */}
                <Route path="/" element={<Home />} />

                {/* Auth */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                
                {/* Men */}
                <Route path="/mens-shirts" element={<MensShirts />} />
                <Route path="/mens-tshirts" element={<MensTShirt />} />
                <Route path="/mens-jeans" element={<MensJeans />} />
                <Route path="/mens-trackpants" element={<MensTrackPant />} />
                <Route path="/mens-hoodies" element={<MensHoodies />} />
                <Route path="/mens-jackets" element={<MensJackets />} />

                {/* Women */}
                <Route path="/women-dresses" element={<WomenDresses />} />
                <Route path="/women-partywear" element={<WomenPartyWear />} />
                <Route path="/women-jeans" element={<WomenJeans />} />
                <Route path="/women-cordset" element={<WomenCordSet />} />
                <Route path="/women-formals" element={<WomenFormals />} />
                <Route path="/women-shirts" element={<WomenShirts />} />
                <Route path="/women-skirts" element={<WomenSkirts />} />
                <Route path="/women-jumpsuits" element={<WomenJumpsuits />} />

                {/* Shop / Sale / Discovery */}
                <Route path="/shop" element={<Shop />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/ai-stylist" element={<AiStylist />} />
                <Route path="/new-arrivals" element={<Shop />} />
                <Route path="/best-sellers" element={<Shop />} />
                <Route path="/sale-men" element={<Shop />} />
                <Route path="/sale-women" element={<Shop />} />
                <Route path="/sale" element={<Shop />} />
                <Route path="/search" element={<Search />} />
                <Route path="/product/:id" element={<ProductDetails />} />

                {/* Contact / About */}
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="/faqs" element={<FAQs />} />

                {/* Shopping */}
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />

                {/* Account */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />

                {/* Admin */}
                {/* Dashboard and product/inventory management are shared
                    by admins and managers (StaffRoute) — managers have
                    full control over products & inventory, plus orders.
                    Coupons and manager-account management stay admin-only. */}
                <Route
                  path="/admin"
                  element={
                    <StaffRoute>
                      <AdminDashboard />
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

                {/* 404 */}
                <Route
                  path="*"
                  element={
                    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
                      <h1 className="text-7xl font-serif text-brand-primary">404</h1>
                      <p className="text-2xl font-semibold mt-4">Page Not Found</p>
                      <p className="text-gray-500 mt-2">
                        The page you are looking for doesn't exist.
                      </p>
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

      <BackToTopButton />
    </>
  );
}

export default App;
