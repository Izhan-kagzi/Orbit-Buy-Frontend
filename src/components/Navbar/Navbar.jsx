import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import {
  PiShirtFoldedDuotone,
  PiPantsThin,
} from "react-icons/pi";

import { IoShirt } from "react-icons/io5";

import {
  GiHoodie,
  GiArmoredPants,
  GiLargeDress,
  GiMonclerJacket,
} from "react-icons/gi";

import {
  FiMenu,
  FiX,
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiUser,
  FiChevronDown,
  FiChevronUp,
  FiLogOut,
  FiGrid,
  FiMapPin,
  FiClock,
  FiShield,
  FiStar,
  FiLayers,
  FiBriefcase,
  FiZap,
  FiPercent,
  FiInfo,
  FiPhoneCall,
  FiHelpCircle,
  FiFileText,
  FiTriangle,
  FiActivity,
  FiBarChart2,
  FiPackage,
} from "react-icons/fi";

import { HiSparkles } from "react-icons/hi2";

import SearchModal from "../Search/SearchModal";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../hooks/useAuth";

/* ============================================================
   MEN MENU
============================================================ */

const mensMenu = [
  {
    name: "Shirts",
    path: "/mens-shirts",
    icon: PiShirtFoldedDuotone,
    desc: "Casual & formal shirts",
  },
  {
    name: "T-Shirts",
    path: "/mens-tshirts",
    icon: IoShirt,
    desc: "Everyday essentials",
  },
  {
    name: "Jeans",
    path: "/mens-jeans",
    icon: PiPantsThin,
    desc: "Slim, straight & relaxed fits",
  },
  {
    name: "Track Pants",
    path: "/mens-trackpants",
    icon: GiArmoredPants,
    desc: "Comfort for active days",
  },
  {
    name: "Hoodies",
    path: "/mens-hoodies",
    icon: GiHoodie,
    desc: "Cozy layers for the season",
  },
  {
    name: "Jackets",
    path: "/mens-jackets",
    icon: GiMonclerJacket,
    desc: "Stylish outerwear",
  },
];

/* ============================================================
   WOMEN MENU
============================================================ */

const womensMenu = [
  {
    name: "Shirts",
    path: "/women-shirts",
    icon: PiShirtFoldedDuotone,
    desc: "Relaxed & tailored shirts",
  },
  {
    name: "Dresses",
    path: "/women-dresses",
    icon: GiLargeDress,
    desc: "Elegant everyday & evening",
  },
  {
    name: "Party Wear",
    path: "/women-partywear",
    icon: FiStar,
    desc: "Stand-out occasion pieces",
  },
  {
    name: "Jeans",
    path: "/women-jeans",
    icon: PiPantsThin,
    desc: "Flattering premium denim",
  },
  {
    name: "Cord Set",
    path: "/women-cordset",
    icon: FiLayers,
    desc: "Effortlessly matched sets",
  },
  {
    name: "Skirts",
    path: "/women-skirts",
    icon: FiTriangle,
    desc: "Mini, midi & maxi styles",
  },
  {
    name: "Jumpsuits",
    path: "/women-jumpsuits",
    icon: FiActivity,
    desc: "One-piece, all-day looks",
  },
  {
    name: "Formals",
    path: "/women-formals",
    icon: FiBriefcase,
    desc: "Sharp workplace fits",
  },
];

/* ============================================================
   COLLECTION MENU
============================================================ */

const collectionMenu = [
  {
    name: "New Arrivals",
    path: "/new-arrivals",
    icon: FiZap,
    desc: "Freshly added this season",
  },
  {
    name: "Best Sellers",
    path: "/best-sellers",
    icon: FiStar,
    desc: "Our most loved styles",
  },
  {
    name: "Sale",
    path: "/sale",
    icon: FiPercent,
    desc: "Discounted picks, while they last",
  },
  {
    name: "Shop All",
    path: "/shop",
    icon: FiGrid,
    desc: "The entire catalogue",
  },
  
  {
    name: "Compare Products",
    path: "/compare",
    icon: FiBarChart2,
    desc: "See your selections side by side",
  },
];

/* ============================================================
   ABOUT MENU
============================================================ */

const aboutMenu = [
  {
    name: "About Us",
    path: "/about",
    icon: FiInfo,
    desc: "Our story & mission",
  },
  {
    name: "Contact Us",
    path: "/contact",
    icon: FiPhoneCall,
    desc: "Get in touch with us",
  },
  {
    name: "FAQs",
    path: "/faqs",
    icon: FiHelpCircle,
    desc: "Common questions answered",
  },
  {
    name: "Privacy Policy",
    path: "/privacy-policy",
    icon: FiShield,
    desc: "How we protect your data",
  },
  {
    name: "Terms & Conditions",
    path: "/terms-conditions",
    icon: FiFileText,
    desc: "Our terms of service",
  },
];

/* ============================================================
   DESKTOP DROPDOWN
============================================================ */

const DesktopDropdown = ({ label, items }) => (
  <div className="relative group">

    <button
      className="
        flex
        items-center
        gap-1.5
        uppercase
        text-xs
        xl:text-sm
        tracking-widest
        font-semibold
        text-white/80
        group-hover:text-white
        transition-colors
        py-2
      "
      aria-expanded="false"
    >
      {label}

      <FiChevronDown
        size={14}
        className="
          transition-transform
          duration-300
          group-hover:rotate-180
          text-brand-tan
        "
      />
    </button>

    <div
      className="
        absolute
        left-1/2
        -translate-x-1/2
        top-full
        pt-3
        w-80
        opacity-0
        invisible
        group-hover:opacity-100
        group-hover:visible
        transition-all
        duration-200
        transform
        group-hover:translate-y-0
        translate-y-2
        z-50
      "
    >
      <div
        className="
          bg-white
          rounded-2xl
          shadow-2xl
          border
          border-gray-100
          overflow-hidden
        "
      >

        <div
          className="
            h-1
            w-full
            bg-gradient-to-r
            from-brand-dark
            via-brand-primary
            to-brand-tan
          "
        />

        <div className="py-2 max-h-[80vh] overflow-y-auto">

          {items.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                className="
                  group/item
                  flex
                  items-center
                  gap-3.5
                  px-5
                  py-3
                  hover:bg-gray-50/80
                  transition-colors
                  duration-150
                "
              >

                {Icon && (
                  <span
                    className="
                      w-9
                      h-9
                      rounded-xl
                      bg-gray-100
                      text-gray-700
                      group-hover/item:bg-brand-primary
                      group-hover/item:text-white
                      flex
                      items-center
                      justify-center
                      shrink-0
                      transition-all
                      duration-200
                      shadow-sm
                    "
                  >
                    <Icon size={16} />
                  </span>
                )}

                <div>

                  <span
                    className="
                      block
                      text-sm
                      font-semibold
                      text-gray-800
                      group-hover/item:text-brand-primary
                      transition-colors
                    "
                  >
                    {item.name}
                  </span>

                  {item.desc && (
                    <span
                      className="
                        block
                        text-xs
                        text-gray-400
                        font-normal
                        mt-0.5
                        line-clamp-1
                      "
                    >
                      {item.desc}
                    </span>
                  )}

                </div>

              </Link>
            );
          })}

        </div>

      </div>
    </div>

  </div>
);

/* ============================================================
   MOBILE DROPDOWN
============================================================ */

const MobileDropdown = ({ label, items, onNavigate }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10 py-2">

      <button
        onClick={() => setOpen(!open)}
        className="
          w-full
          flex
          items-center
          justify-between
          uppercase
          text-sm
          font-bold
          tracking-wider
          text-white
          py-2
        "
      >

        <span>{label}</span>

        <span className="text-brand-tan">
          {open ? (
            <FiChevronUp size={18} />
          ) : (
            <FiChevronDown size={18} />
          )}
        </span>

      </button>

      <div
        className={`
          grid
          transition-all
          duration-300
          ease-in-out
          ${
            open
              ? "grid-rows-[1fr] opacity-100 mt-2 mb-3"
              : "grid-rows-[0fr] opacity-0"
          }
        `}
      >

        <div
          className="
            overflow-hidden
            flex
            flex-col
            gap-2
            pl-3
            border-l-2
            border-brand-tan/30
          "
        >

          {items.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={onNavigate}
                className="
                  flex
                  items-center
                  gap-3
                  py-1.5
                  text-sm
                  font-medium
                  text-gray-300
                  hover:text-white
                  transition-colors
                "
              >

                {Icon && (
                  <Icon
                    size={16}
                    className="text-brand-tan shrink-0"
                  />
                )}

                {item.name}

              </Link>
            );
          })}

        </div>

      </div>

    </div>
  );
};

/* ============================================================
   NAVBAR
============================================================ */

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const userMenuRef = useRef(null);

  const { cartCount = 0 } = useCart();
  const { wishlistItems = [] } = useWishlist();

  const {
    isAuthenticated,
    isAdmin,
    user,
    logout,
  } = useAuth();

  const navigate = useNavigate();

  /* ============================================================
     CLOSE MOBILE MENU
  ============================================================ */

  const closeMenu = () => {
    setMenuOpen(false);
  };

  /* ============================================================
     LOGOUT
  ============================================================ */

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    setMenuOpen(false);
    navigate("/login");
  };

  /* ============================================================
     PREVENT BODY SCROLL WHEN MOBILE MENU IS OPEN
  ============================================================ */

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* ============================================================
     CLOSE DESKTOP USER MENU WHEN CLICKING OUTSIDE
  ============================================================ */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <>
      {/* ======================================================
          HEADER
      ======================================================= */}

      <header
        className="
          fixed
          top-0
          left-0
          right-0
          z-50
          bg-brand-dark/95
          backdrop-blur-md
          shadow-md
          border-b
          border-white/5
          transition-all
        "
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div
            className="
              flex
              items-center
              justify-between
              gap-4
              h-16
              sm:h-20
            "
          >

            {/* ==================================================
                LOGO
            =================================================== */}

            <Link
              to="/"
              className="
                flex
                items-center
                gap-2
                shrink-0
                group
              "
            >
              <span
                className="
                  font-logo
                  text-white
                  text-2xl
                  sm:text-3xl
                  font-bold
                  tracking-tight
                  group-hover:text-brand-tan
                  transition-colors
                "
              >
                Orbit Buy
              </span>
            </Link>

            {/* ==================================================
                DESKTOP NAVIGATION
            =================================================== */}

            <nav
              className="
                hidden
                lg:flex
                items-center
                justify-center
                gap-6
                xl:gap-8
                flex-1
              "
            >

              <NavLink
                to="/"
                className={({ isActive }) =>
                  `
                    uppercase
                    text-xs
                    xl:text-sm
                    tracking-widest
                    font-semibold
                    transition-colors
                    py-2
                    ${
                      isActive
                        ? "text-brand-tan font-bold"
                        : "text-white/80 hover:text-white"
                    }
                  `
                }
              >
                Home
              </NavLink>

              <DesktopDropdown
                label="Men"
                items={mensMenu}
              />

              <DesktopDropdown
                label="Women"
                items={womensMenu}
              />

              <DesktopDropdown
                label="Collections"
                items={collectionMenu}
              />

              <DesktopDropdown
                label="About"
                items={aboutMenu}
              />

              <a
                href="/#reviews"
                className="
                  uppercase
                  text-xs
                  xl:text-sm
                  tracking-widest
                  font-semibold
                  text-white/80
                  hover:text-white
                  transition-colors
                  py-2
                "
              >
                Reviews
              </a>

              <Link
                to="/ai-stylist"
                className="
                  uppercase
                  text-xs
                  xl:text-sm
                  tracking-widest
                  font-semibold
                  text-brand-tan
                  hover:text-white
                  transition-colors
                  flex
                  items-center
                  gap-1.5
                  py-2
                "
              >

                <HiSparkles
                  size={16}
                  className="animate-pulse"
                />

                AI Stylist

              </Link>

            </nav>

            {/* ==================================================
                ICONS & ACTIONS
            =================================================== */}

            <div
              className="
                flex
                items-center
                gap-2
                sm:gap-3
                shrink-0
              "
            >

              {/* Search */}

              <button
                onClick={() => setSearchOpen(true)}
                className="
                  text-white/80
                  hover:text-white
                  hover:bg-white/10
                  transition-all
                  p-2
                  rounded-full
                "
                aria-label="Search"
              >
                <FiSearch size={20} />
              </button>

              {/* Wishlist */}

              <Link
                to="/wishlist"
                className="
                  relative
                  text-white/80
                  hover:text-white
                  hover:bg-white/10
                  transition-all
                  p-2
                  rounded-full
                "
                aria-label="Wishlist"
              >

                <FiHeart size={20} />

                {wishlistItems.length > 0 && (
                  <span
                    className="
                      absolute
                      top-1
                      right-1
                      min-w-[18px]
                      h-[18px]
                      px-1
                      rounded-full
                      bg-brand-tan
                      text-brand-dark
                      text-[10px]
                      font-bold
                      flex
                      items-center
                      justify-center
                      ring-2
                      ring-brand-dark
                    "
                  >
                    {wishlistItems.length}
                  </span>
                )}

              </Link>

              {/* Cart */}

              <Link
                to="/cart"
                className="
                  relative
                  text-white/80
                  hover:text-white
                  hover:bg-white/10
                  transition-all
                  p-2
                  rounded-full
                "
                aria-label="Shopping Cart"
              >

                <FiShoppingBag size={20} />

                {cartCount > 0 && (
                  <span
                    className="
                      absolute
                      top-1
                      right-1
                      min-w-[18px]
                      h-[18px]
                      px-1
                      rounded-full
                      bg-brand-tan
                      text-brand-dark
                      text-[10px]
                      font-bold
                      flex
                      items-center
                      justify-center
                      ring-2
                      ring-brand-dark
                    "
                  >
                    {cartCount}
                  </span>
                )}

              </Link>

              {/* ==================================================
                  DESKTOP USER MENU
              =================================================== */}

              <div
                className="relative hidden lg:block"
                ref={userMenuRef}
              >

                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() =>
                        setUserMenuOpen(!userMenuOpen)
                      }
                      className="
                        flex
                        items-center
                        gap-2
                        text-white/90
                        hover:text-white
                        bg-white/5
                        hover:bg-white/10
                        px-3
                        py-1.5
                        rounded-full
                        border
                        border-white/10
                        transition-all
                      "
                    >

                      <FiUser
                        size={18}
                        className="text-brand-tan"
                      />

                      <span
                        className="
                          text-xs
                          font-medium
                          max-w-[90px]
                          truncate
                        "
                      >
                        {user?.name?.split(" ")[0]}
                      </span>

                      <FiChevronDown
                        size={14}
                        className={`
                          transition-transform
                          duration-200
                          text-white/60
                          ${
                            userMenuOpen
                              ? "rotate-180"
                              : ""
                          }
                        `}
                      />

                    </button>

                    {userMenuOpen && (
                      <div
                        className="
                          absolute
                          right-0
                          top-full
                          mt-3
                          w-56
                          bg-white
                          rounded-2xl
                          shadow-2xl
                          border
                          border-gray-100
                          py-2
                          z-50
                          animate-in
                          fade-in
                          slide-in-from-top-2
                          duration-200
                        "
                      >

                        <div
                          className="
                            px-4
                            py-2
                            border-b
                            border-gray-100
                          "
                        >

                          <p
                            className="
                              text-xs
                              text-gray-400
                              font-medium
                            "
                          >
                            Signed in as
                          </p>

                          <p
                            className="
                              text-sm
                              font-semibold
                              text-gray-800
                              truncate
                            "
                          >
                            {user?.name}
                          </p>

                        </div>

                        <div className="py-1">

                          {/* Desktop Admin Dashboard */}

                          {isAdmin && (
                            <Link
                              to="/admin"
                              onClick={() =>
                                setUserMenuOpen(false)
                              }
                              className="
                                flex
                                items-center
                                gap-2.5
                                px-4
                                py-2.5
                                text-sm
                                text-gray-700
                                hover:bg-gray-50
                                hover:text-brand-primary
                                transition-colors
                                font-semibold
                              "
                            >
                              <FiGrid size={16} />
                              Admin Dashboard
                            </Link>
                          )}

                          {/* Orders */}

                          <Link
                            to="/orders"
                            onClick={() =>
                              setUserMenuOpen(false)
                            }
                            className="
                              flex
                              items-center
                              gap-2.5
                              px-4
                              py-2.5
                              text-sm
                              text-gray-700
                              hover:bg-gray-50
                              hover:text-brand-primary
                              transition-colors
                            "
                          >
                            <FiPackage size={16} />
                            My Orders
                          </Link>

                          {/* Profile */}

                          <Link
                            to="/profile"
                            onClick={() =>
                              setUserMenuOpen(false)
                            }
                            className="
                              flex
                              items-center
                              gap-2.5
                              px-4
                              py-2.5
                              text-sm
                              text-gray-700
                              hover:bg-gray-50
                              hover:text-brand-primary
                              transition-colors
                            "
                          >
                            <FiUser size={16} />
                            My Profile
                          </Link>

                        </div>

                        {/* Logout */}

                        <div
                          className="
                            border-t
                            border-gray-100
                            pt-1
                          "
                        >

                          <button
                            onClick={handleLogout}
                            className="
                              w-full
                              text-left
                              flex
                              items-center
                              gap-2.5
                              px-4
                              py-2.5
                              text-sm
                              text-red-600
                              hover:bg-red-50
                              transition-colors
                              font-medium
                            "
                          >
                            <FiLogOut size={16} />
                            Logout
                          </button>

                        </div>

                      </div>
                    )}

                  </>
                ) : (

                  <Link
                    to="/login"
                    className="
                      flex
                      items-center
                      gap-2
                      bg-brand-tan
                      text-brand-dark
                      px-4
                      py-1.5
                      rounded-full
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      hover:bg-white
                      transition-all
                      shadow-sm
                    "
                  >
                    <FiUser size={16} />
                    <span>Login</span>
                  </Link>

                )}

              </div>

              {/* ==================================================
                  MOBILE MENU BUTTON
              =================================================== */}

              <button
                className="
                  lg:hidden
                  text-white/90
                  hover:text-white
                  p-2
                  rounded-lg
                  hover:bg-white/10
                  transition-colors
                "
                onClick={() => setMenuOpen(true)}
                aria-label="Toggle Menu"
              >
                <FiMenu size={24} />
              </button>

            </div>

          </div>

        </div>

      </header>

      {/* ========================================================
          MOBILE DRAWER
      ========================================================= */}

      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-[60]">

          {/* Backdrop */}

          <div
            className="
              absolute
              inset-0
              bg-black/60
              backdrop-blur-sm
              transition-opacity
            "
            onClick={closeMenu}
          />

          {/* Drawer */}

          <div
            className="
              absolute
              right-0
              top-0
              h-full
              w-[85%]
              max-w-sm
              bg-brand-dark
              shadow-2xl
              flex
              flex-col
              justify-between
              overflow-y-auto
              z-10
              transition-transform
              duration-300
            "
          >

            {/* ==================================================
                MOBILE MENU CONTENT
            =================================================== */}

            <div>

              {/* Header */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  px-6
                  py-5
                  border-b
                  border-white/10
                "
              >

                <span
                  className="
                    font-logo
                    text-white
                    text-2xl
                    font-bold
                  "
                >
                  Orbit Buy
                </span>

                <button
                  onClick={closeMenu}
                  className="
                    text-gray-400
                    hover:text-white
                    p-1
                    rounded-full
                    hover:bg-white/10
                    transition-colors
                  "
                  aria-label="Close Menu"
                >
                  <FiX size={24} />
                </button>

              </div>

              {/* Navigation */}

              <div
                className="
                  px-6
                  py-4
                  flex
                  flex-col
                "
              >

                {/* Home */}

                <Link
                  to="/"
                  onClick={closeMenu}
                  className="
                    uppercase
                    text-sm
                    font-bold
                    tracking-wider
                    text-white
                    py-3
                    border-b
                    border-white/10
                  "
                >
                  Home
                </Link>

                {/* Men */}

                <MobileDropdown
                  label="Men"
                  items={mensMenu}
                  onNavigate={closeMenu}
                />

                {/* Women */}

                <MobileDropdown
                  label="Women"
                  items={womensMenu}
                  onNavigate={closeMenu}
                />

                {/* Collections */}

                <MobileDropdown
                  label="Collections"
                  items={collectionMenu}
                  onNavigate={closeMenu}
                />

                {/* About */}

                <MobileDropdown
                  label="About"
                  items={aboutMenu}
                  onNavigate={closeMenu}
                />

                {/* Reviews */}

                <a
                  href="/#reviews"
                  onClick={closeMenu}
                  className="
                    uppercase
                    text-sm
                    font-bold
                    tracking-wider
                    text-white
                    py-3
                    border-b
                    border-white/10
                  "
                >
                  Reviews
                </a>

                {/* AI Stylist */}

                <Link
                  to="/ai-stylist"
                  onClick={closeMenu}
                  className="
                    uppercase
                    text-sm
                    font-bold
                    tracking-wider
                    text-brand-tan
                    py-3
                    border-b
                    border-white/10
                    flex
                    items-center
                    gap-2
                  "
                >

                  <HiSparkles size={18} />

                  AI Stylist

                </Link>

              </div>

            </div>

            {/* ==================================================
                MOBILE FOOTER / USER ACTIONS
            =================================================== */}

            <div
              className="
                p-6
                border-t
                border-white/10
                bg-white/5
                space-y-4
              "
            >

              {/* ==================================================
                  AUTHENTICATED USER
              =================================================== */}

              {isAuthenticated ? (

                <div className="space-y-4">

                  {/* User Information */}

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        w-10
                        h-10
                        rounded-full
                        bg-brand-tan
                        text-brand-dark
                        flex
                        items-center
                        justify-center
                        font-bold
                      "
                    >
                      {user?.name?.charAt(0)}
                    </div>

                    <div>

                      <p
                        className="
                          text-sm
                          font-semibold
                          text-white
                          leading-tight
                        "
                      >
                        {user?.name}
                      </p>

                      <button
                        onClick={handleLogout}
                        className="
                          text-xs
                          text-red-400
                          hover:underline
                          mt-0.5
                          inline-block
                        "
                      >
                        Logout
                      </button>

                    </div>

                  </div>

                  {/* ==================================================
                      MOBILE ADMIN DASHBOARD
                  =================================================== */}

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={closeMenu}
                      className="
                        w-full
                        flex
                        items-center
                        justify-center
                        gap-2
                        bg-brand-tan
                        text-brand-dark
                        font-bold
                        text-sm
                        uppercase
                        tracking-wide
                        py-3
                        rounded-xl
                        hover:bg-white
                        hover:scale-[1.02]
                        transition-all
                        duration-300
                        shadow-lg
                      "
                    >

                      <FiGrid size={18} />

                      <span>
                        Admin Dashboard
                      </span>

                    </Link>
                  )}

                </div>

              ) : (

                /* ==================================================
                   NOT AUTHENTICATED
                =================================================== */

                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="
                    w-full
                    flex
                    items-center
                    justify-center
                    gap-2
                    bg-brand-tan
                    text-brand-dark
                    font-bold
                    text-sm
                    uppercase
                    py-2.5
                    rounded-xl
                    hover:bg-white
                    transition-colors
                  "
                >

                  <FiUser size={18} />

                  <span>
                    Login / Register
                  </span>

                </Link>

              )}

              {/* ==================================================
                  STORE INFORMATION
              =================================================== */}

              <div
                className="
                  text-xs
                  text-gray-400
                  space-y-1.5
                  pt-2
                  border-t
                  border-white/5
                "
              >

                <p className="flex items-center gap-2">

                  <FiMapPin
                    size={14}
                    className="text-brand-tan"
                  />

                  Surat, Gujarat, India

                </p>

                <p className="flex items-center gap-2">

                  <FiClock
                    size={14}
                    className="text-brand-tan"
                  />

                  Mon - Sat: 10:00 AM - 8:00 PM

                </p>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* ========================================================
          SEARCH MODAL
      ========================================================= */}

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

    </>
  );
};

export default Navbar;