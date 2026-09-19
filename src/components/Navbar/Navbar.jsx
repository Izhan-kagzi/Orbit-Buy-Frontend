import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";


import {
  FiMenu,
  FiX,
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiUser,
  FiChevronDown,
  FiLogOut,
  FiGrid,
  FiMapPin,
  FiClock,
  FiShield,
  FiInfo,
  FiPhoneCall,
  FiHelpCircle,
  FiFileText,
  FiPackage,
} from "react-icons/fi";

import { HiSparkles } from "react-icons/hi2";

import SearchModal from "../Search/SearchModal";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../hooks/useAuth";

const mensMenu = [
  {
    name: "Shirts",
    path: "/mens-shirts",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=500&q=80",
    desc: "Casual & formal shirts",
  },
  {
    name: "T-Shirts",
    path: "/mens-tshirts",
    image:
      "https://i.pinimg.com/736x/39/37/b7/3937b7a8cca92b69cc81e46ac1e6af5b.jpg",
    desc: "Everyday essentials",
  },
  {
    name: "Jeans",
    path: "/mens-jeans",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=500&q=80",
    desc: "Slim, straight & relaxed fits",
  },
  {
    name: "Track Pants",
    path: "/mens-trackpants",
    image:
      "https://i.pinimg.com/736x/22/96/5c/22965c41112e9658c05b12b3efca415a.jpg",
    desc: "Comfort for active days",
  },
  {
    name: "Hoodies",
    path: "/mens-hoodies",
    image:
      "https://i.pinimg.com/236x/e9/a2/06/e9a2067124c200ccc08723d50ac33ced.jpg",
    desc: "Cozy layers for the season",
  },
  {
    name: "Jackets",
    path: "/mens-jackets",
    image:
      "https://i.pinimg.com/736x/65/3f/b6/653fb6d7107dea352dd89441460ca993.jpg",
    desc: "Stylish outerwear",
  },
];

const womensMenu = [
  
  {
    name: "Dresses",
    path: "/women-dresses",
    image:
      "https://i.pinimg.com/1200x/69/4b/81/694b81e27e89242a0f50a304353daca2.jpg",
    desc: "Elegant everyday & evening",
  },
  {
    name: "Party Wear",
    path: "/women-partywear",
    image:
      "https://i.pinimg.com/736x/21/68/4e/21684e5b5cb983cb04de9d797234cae0.jpg",
    desc: "Stand-out occasion pieces",
  },
  {
    name: "Jeans",
    path: "/women-jeans",
    image:
      "https://images.pexels.com/photos/17630736/pexels-photo-17630736.jpeg",
    desc: "Flattering premium denim",
  },
  {
    name: "Cord Set",
    path: "/women-cordset",
    image:
      "https://i.pinimg.com/736x/57/53/25/575325312e0a2e25ecf1da37274a8bf8.jpg",
    desc: "Effortlessly matched sets",
  },
  {
    name: "Skirts",
    path: "/women-skirts",
    image:
      "https://i.pinimg.com/1200x/c4/a1/68/c4a1685f91c3ed4ba844c3a7c2b008e5.jpg",
    desc: "Mini, midi & maxi styles",
  },
  {
    name: "Jumpsuits",
    path: "/women-jumpsuits",
    image:
      "https://images.pexels.com/photos/39417903/pexels-photo-39417903.jpeg",
    desc: "One-piece, all-day looks",
  },
  {
    name: "Formals",
    path: "/women-formals",
    image:
      "https://images.pexels.com/photos/24724191/pexels-photo-24724191.jpeg",
    desc: "Sharp workplace fits",
  },
];
/* ============================================================
   Shop MENU
============================================================ */

const shopMenu = [
  {
    name: "New Arrivals",
    path: "/new-arrivals",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=500&q=80",
    desc: "Freshly added this season",
  },
  {
    name: "Best Sellers",
    path: "/best-sellers",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=80",
    desc: "Our most loved styles",
  },
  {
    name: "Sale",
    path: "/sale",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=80",
    desc: "Discounted picks, while they last",
  },
  {
    name: "Shop All",
    path: "/shop",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=500&q=80",
    desc: "The entire catalogue",
  },
  {
    name: "Compare Products",
    path: "/compare",
    image:
      "https://plus.unsplash.com/premium_photo-1714226832576-f4356d4ab92b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    image:"",
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
    {/* MENU BUTTON */}
    <button
      type="button"
      className="
        flex items-center gap-1.5
        uppercase text-xs xl:text-sm
        tracking-widest font-semibold
        text-white/80 hover:text-white
        transition-colors py-2
      "
      aria-haspopup="true"
    >
      {label}

      <FiChevronDown
        size={14}
        className="
          text-brand-tan
          transition-transform duration-300
          group-hover:rotate-180
        "
      />
    </button>

    {/* MEGA MENU */}
    <div
      className="
        absolute
        left-1/2
        -translate-x-1/2
        top-full
        pt-4
        w-[760px]
        xl:w-[900px]
        opacity-0
        invisible
        group-hover:opacity-100
        group-hover:visible
        transition-all
        duration-200
        translate-y-2
        group-hover:translate-y-0
        z-50
      "
    >
      <div
        className="
          bg-white
          rounded-2xl
          shadow-2xl
          border border-gray-100
          overflow-hidden
        "
      >
        {/* TOP ACCENT */}
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

        {/* HEADER */}
        <div className="px-6 pt-5 pb-3">
          <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-semibold">
            Explore
          </p>

          <h3 className="text-xl font-bold text-gray-900">
            {label} Collection
          </h3>
        </div>

        {/* PRODUCTS */}
        <div className="px-5 pb-6">
          <div
            className={`
              grid gap-3
              ${
                items.length >= 7
                  ? "grid-cols-4"
                  : items.length >= 4
                  ? "grid-cols-4"
                  : "grid-cols-3"
              }
            `}
          >
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="
                    group/card
                    rounded-xl
                    overflow-hidden
                    border border-gray-100
                    bg-white
                    hover:border-gray-200
                    hover:shadow-lg
                    transition-all
                    duration-300
                  "
                >
                  {/* IMAGE */}
                  <div
                    className="
                      relative
                      h-32
                      xl:h-36
                      bg-gray-100
                      overflow-hidden
                    "
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="eager"
                        className="
                          w-full
                          h-full
                          object-cover
                          transition-transform
                          duration-500
                          group-hover/card:scale-110
                        "
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div
                        className="
                          w-full h-full
                          flex items-center justify-center
                          bg-gray-100
                        "
                      >
                        {Icon && (
                          <Icon
                            size={30}
                            className="text-gray-400"
                          />
                        )}
                      </div>
                    )}

                    {/* HOVER OVERLAY */}
                    <div
                      className="
                        absolute inset-0
                        bg-black/0
                        group-hover/card:bg-black/10
                        transition-colors
                        duration-300
                      "
                    />

                    {/* ARROW */}
                    <span
                      className="
                        absolute
                        right-2
                        bottom-2
                        w-7
                        h-7
                        rounded-full
                        bg-white/90
                        backdrop-blur
                        flex items-center justify-center
                        opacity-0
                        translate-y-2
                        group-hover/card:opacity-100
                        group-hover/card:translate-y-0
                        transition-all
                        duration-300
                      "
                    >
                      <span className="text-gray-800 text-sm">
                        →
                      </span>
                    </span>
                  </div>

                  {/* CONTENT */}
                  <div className="px-3 py-3">
                    <h4
                      className="
                        text-sm
                        font-bold
                        text-gray-900
                        group-hover/card:text-brand-primary
                        transition-colors
                      "
                    >
                      {item.name}
                    </h4>

                    {item.desc && (
                      <p
                        className="
                          mt-1
                          text-[11px]
                          leading-4
                          text-gray-400
                          line-clamp-2
                        "
                      >
                        {item.desc}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* FOOTER */}
        <div
          className="
            px-6 py-3
            bg-gray-50
            border-t border-gray-100
            flex items-center justify-between
          "
        >
          <span className="text-[11px] text-gray-400">
            Discover the latest styles
          </span>

          <Link
  to={
    label === "Men"
      ? "/search?q=men"
      : label === "Women"
      ? "/search?q=women"
      : "/shop"
  }
  className="
    text-xs
    font-bold
    uppercase
    tracking-wider
    text-brand-primary
    hover:text-brand-dark
    transition-colors
  "
>
  View All →
</Link>

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
      {/* HEADER */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          w-full flex items-center justify-between
          uppercase text-sm font-bold
          tracking-wider text-white
          py-3
        "
        aria-expanded={open}
      >
        <span>{label}</span>

        <FiChevronDown
          size={18}
          className={`
            text-brand-tan
            transition-transform duration-300
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* PRODUCT GRID */}
      <div
        className={`
          grid transition-all duration-300 ease-in-out
          ${
            open
              ? "grid-rows-[1fr] opacity-100 pb-3"
              : "grid-rows-[0fr] opacity-0"
          }
        `}
      >
        <div className="overflow-hidden">
          <div className="grid grid-cols-2 gap-3 pt-2">
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={onNavigate}
                  className="
                    group
                    overflow-hidden
                    rounded-xl
                    bg-white
                    border border-white/10
                    shadow-lg
                    transition-all duration-300
                    active:scale-[0.98]
                  "
                >
                  {/* IMAGE */}
                  <div className="relative h-28 bg-gray-100 overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="eager"
                        className="
                          w-full h-full
                          object-cover
                          transition-transform duration-500
                          group-hover:scale-105
                        "
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div
                        className="
                          w-full h-full
                          flex items-center justify-center
                          bg-gray-100
                        "
                      >
                        {Icon && (
                          <Icon
                            size={28}
                            className="text-gray-400"
                          />
                        )}
                      </div>
                    )}

                    {/* IMAGE OVERLAY */}
                    <div className="absolute inset-0 bg-black/5" />
                  </div>

                  {/* TEXT */}
                  <div className="p-3">
                    <h4
                      className="
                        text-xs
                        font-bold
                        text-gray-900
                        truncate
                      "
                    >
                      {item.name}
                    </h4>

                    {item.desc && (
                      <p
                        className="
                          mt-1
                          text-[10px]
                          leading-4
                          text-gray-400
                          line-clamp-2
                        "
                      >
                        {item.desc}
                      </p>
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

  /* ============================================================
     CLOSE MOBILE MENU WITH ESCAPE
  ============================================================ */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
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
                MOBILE MENU BUTTON — LEFT SIDE
            =================================================== */}

            <button
              type="button"
              className="
                lg:hidden
                shrink-0
                text-white/90
                hover:text-white
                p-2
                -ml-2
                rounded-lg
                hover:bg-white/10
                transition-all
                duration-200
              "
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
            >
              <FiMenu size={24} />
            </button>

            {/* ==================================================
                LOGO
            =================================================== */}

            <Link
              to="/"
              aria-label="Orbit Buy - Home"
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
              aria-label="Main navigation"
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

              {/* HOME */}

              <NavLink
                to="/"
                end
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

              {/* MEN */}

              <DesktopDropdown
                label="Men"
                items={mensMenu}
              />

              {/* WOMEN */}

              <DesktopDropdown
                label="Women"
                items={womensMenu}
              />

              {/* Shop */}

              <DesktopDropdown
                label="Shop"
                items={shopMenu}
              />

              {/* ABOUT */}

              <DesktopDropdown
                label="About"
                items={aboutMenu}
              />

              {/* REVIEWS */}
              
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
                reviews
              </a>
              

              {/* AI STYLIST */}

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

              {/* SEARCH */}

              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="
                  text-white/80
                  hover:text-white
                  hover:bg-white/10
                  transition-all
                  p-2
                  rounded-full
                "
                aria-label="Search Orbit Buy"
              >
                <FiSearch size={20} />
              </button>

              {/* WISHLIST */}

              <Link
                to="/wishlist"
                aria-label={`Wishlist${
                  wishlistItems.length
                    ? `, ${wishlistItems.length} items`
                    : ""
                }`}
                className="
                  relative
                  text-white/80
                  hover:text-white
                  hover:bg-white/10
                  transition-all
                  p-2
                  rounded-full
                "
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

              {/* CART */}

              <Link
                to="/cart"
                aria-label={`Shopping Cart${
                  cartCount
                    ? `, ${cartCount} items`
                    : ""
                }`}
                className="
                  relative
                  text-white/80
                  hover:text-white
                  hover:bg-white/10
                  transition-all
                  p-2
                  rounded-full
                "
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
                      type="button"
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
                      aria-haspopup="true"
                      aria-expanded={userMenuOpen}
                      aria-label="Open account menu"
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

                          {/* ADMIN DASHBOARD */}

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

                          {/* ORDERS */}

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

                          {/* PROFILE */}

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

                        {/* LOGOUT */}

                        <div
                          className="
                            border-t
                            border-gray-100
                            pt-1
                          "
                        >
                          <button
                            type="button"
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

            </div>
          </div>
        </div>
      </header>

      {/* ========================================================
          MOBILE DRAWER
      ========================================================= */}

      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-[60]">

          {/* BACKDROP */}

          <div
            className="
              absolute
              inset-0
              bg-black/60
              backdrop-blur-sm
              transition-opacity
            "
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* DRAWER */}

          <div
            className="
              absolute
              left-0
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
              border-r
              border-white/10
              transition-transform
              duration-300
            "
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >

            {/* ==================================================
                MOBILE MENU CONTENT
            =================================================== */}

            <div>

              {/* HEADER */}

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
                <Link
                  to="/"
                  onClick={closeMenu}
                  className="
                    font-logo
                    text-white
                    text-2xl
                    font-bold
                  "
                >
                  Orbit Buy
                </Link>

                <button
                  type="button"
                  onClick={closeMenu}
                  className="
                    text-gray-400
                    hover:text-white
                    p-1
                    rounded-full
                    hover:bg-white/10
                    transition-colors
                  "
                  aria-label="Close navigation menu"
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* NAVIGATION */}

              <nav
                aria-label="Mobile navigation"
                className="
                  px-6
                  py-4
                  flex
                  flex-col
                "
              >

                {/* HOME */}

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

                {/* MEN */}

                <MobileDropdown
                  label="Men"
                  items={mensMenu}
                  onNavigate={closeMenu}
                />

                {/* WOMEN */}

                <MobileDropdown
                  label="Women"
                  items={womensMenu}
                  onNavigate={closeMenu}
                />

                {/* Shop */}

                <MobileDropdown
                  label="Shop"
                  items={shopMenu}
                  onNavigate={closeMenu}
                />

                {/* ABOUT */}

                <MobileDropdown
                  label="About"
                  items={aboutMenu}
                  onNavigate={closeMenu}
                />

                {/* REVIEWS */}

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

                {/* AI STYLIST */}

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

              </nav>
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

                  {/* USER INFORMATION */}

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
                        type="button"
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

                  {/* MOBILE ACCOUNT LINKS */}

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/orders"
                      onClick={closeMenu}
                      className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        py-2.5
                        rounded-xl
                        border
                        border-white/10
                        text-white
                        text-xs
                        font-semibold
                        hover:bg-white/10
                        transition-colors
                      "
                    >
                      <FiPackage size={15} />
                      Orders
                    </Link>

                    <Link
                      to="/profile"
                      onClick={closeMenu}
                      className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        py-2.5
                        rounded-xl
                        border
                        border-white/10
                        text-white
                        text-xs
                        font-semibold
                        hover:bg-white/10
                        transition-colors
                      "
                    >
                      <FiUser size={15} />
                      Profile
                    </Link>
                  </div>

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