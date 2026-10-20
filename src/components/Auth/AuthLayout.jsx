import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiShield,
  FiTruck,
  FiRefreshCw,
} from "react-icons/fi";

const features = [
  {
    icon: FiShield,
    text: "Bank-grade secure checkout",
  },
  {
    icon: FiTruck,
    text: "Fast, tracked delivery",
  },
  {
    icon: FiRefreshCw,
    text: "Effortless returns",
  },
];

const AuthLayout = ({ title, subtitle, children }) => {
  const isRegister = title?.toLowerCase().includes("create");

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">

      {/* ================= LEFT: DESKTOP BRANDING ================= */}

      <div
        className="
          hidden lg:flex relative flex-col
          justify-between overflow-hidden
          bg-brand-dark text-white p-16
        "
      >
        {/* Dotted Background */}

        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Glow Effects */}

        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand-primary/40 blur-3xl" />

        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-brand-tan/10 blur-3xl" />

        {/* Logo */}

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <Link
            to="/"
            className="font-logo text-4xl"
          >
            Orbit Bay
          </Link>
        </motion.div>

        {/* Welcome Content */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative z-10"
        >
          <p className="uppercase tracking-[5px] text-brand-tan text-xs font-semibold mb-6">
            Member Access
          </p>

          <h1 className="text-6xl font-serif leading-[1.1]">
            {isRegister ? (
              <>
                Join Our
                <br />
                Community.
              </>
            ) : (
              <>
                Welcome
                <br />
                Back.
              </>
            )}
          </h1>

          <p className="mt-8 text-gray-300 leading-relaxed max-w-md">
            {isRegister
              ? "Create your account to save your wishlist, track your orders, and discover exclusive member-only offers across our full collection."
              : "Sign in to pick up your wishlist, track your orders, and unlock member-only pricing across our full collection."}
          </p>
        </motion.div>

        {/* Features */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative z-10 flex flex-col gap-5 pt-10 border-t border-white/10"
        >
          {features.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-4 text-gray-200"
            >
              <span className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Icon
                  size={18}
                  className="text-brand-tan"
                />
              </span>

              {text}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ================= RIGHT: AUTH CONTENT ================= */}

      <div
        className="
          relative flex min-h-screen flex-col
          px-6 py-8
          sm:px-10 sm:py-10
          lg:px-12 lg:py-10
          xl:px-20
        "
      >

        {/* Back to Home */}

        <div className="w-full max-w-md mx-auto lg:max-w-none lg:mx-0">

          <Link
            to="/"
            className="
              inline-flex items-center gap-2
              text-gray-500
              hover:text-brand-primary
              transition text-sm font-semibold
            "
          >
            <FiArrowLeft size={17} />
            Back to Home
          </Link>

        </div>

        {/* Form Content */}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="
            w-full max-w-md mx-auto
            my-auto py-10
            lg:max-w-[530px]
          "
        >

          {/* Mobile Logo */}

          <Link
            to="/"
            className="
              font-logo text-4xl
              text-brand-primary
              lg:hidden
              block text-center
              mb-10
            "
          >
            Orbit Bay
          </Link>

          {/* Heading */}

          <h2 className="text-3xl sm:text-4xl font-serif text-brand-dark mb-2">
            {title}
          </h2>

          <p className="text-gray-500 mb-8 sm:mb-10 leading-relaxed">
            {subtitle}
          </p>

          {/* Login or Registration Form */}

          {children}

        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;  