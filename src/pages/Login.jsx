import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiMail,
  FiShield,
  FiTruck,
  FiRefreshCw,
} from "react-icons/fi";
import toast from "react-hot-toast";

import { useAuth } from "../hooks/useAuth";
import PasswordInput from "../components/Auth/PasswordInput";

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

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      // Login through your existing authentication system
      const loggedInUser = await login(formData);

      toast.success("Welcome back!");

      /*
       * ------------------------------------------------
       * ROLE BASED REDIRECTION
       * ------------------------------------------------
       *
       * Manager  → /manager
       * Admin    → /admin
       * Customer → /
       */

      let user = loggedInUser;

      /*
       * If your login() function doesn't return the user,
       * get the user from localStorage.
       */
      if (!user) {
        try {
          user = JSON.parse(
            localStorage.getItem("orbit-user") || "null"
          );
        } catch {
          user = null;
        }
      }

      const role = user?.role?.toLowerCase();

      if (role === "manager") {
        navigate("/admin", { replace: true });
      } else if (role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);

      toast.error(
        error?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">

      {/* ================= LEFT — EDITORIAL PANEL ================= */}

      <div className="hidden lg:flex relative flex-col justify-between bg-brand-dark text-white p-16 overflow-hidden">

        {/* Background Pattern */}
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
          initial={{
            opacity: 0,
            y: -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="relative"
        >
          <Link
            to="/"
            className="font-logo text-4xl"
          >
            Orbit Buy
          </Link>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.1,
          }}
          className="relative"
        >
          <p className="uppercase tracking-[5px] text-brand-tan text-xs font-semibold mb-6">
            Member Access
          </p>

          <h1 className="text-6xl font-serif leading-[1.1]">
            Welcome
            <br />
            Back.
          </h1>

          <p className="mt-8 text-gray-300 leading-relaxed max-w-md">
            Sign in to pick up your wishlist,
            track your orders, and unlock
            member-only pricing across our
            full collection.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.7,
            delay: 0.3,
          }}
          className="relative flex flex-col gap-5 pt-10 border-t border-white/10"
        >
          {features.map(
            ({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-4 text-gray-200"
              >
                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Icon
                    size={16}
                    className="text-brand-tan"
                  />
                </span>

                {text}
              </div>
            )
          )}
        </motion.div>
      </div>

      {/* ================= RIGHT — LOGIN FORM ================= */}

      <div className="flex flex-col justify-center px-6 sm:px-16 py-16 relative">

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="absolute top-8 left-6 sm:left-16 flex items-center gap-2 text-gray-500 hover:text-brand-primary transition text-sm font-semibold"
        >
          <FiArrowLeft />

          Back to Home
        </button>

        <motion.div
          initial={{
            opacity: 0,
            y: 16,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.15,
          }}
          className="w-full max-w-md mx-auto"
        >

          {/* Mobile Logo */}
          <span className="font-logo text-3xl text-brand-primary lg:hidden block mb-8 text-center">
            Orbit Buy
          </span>

          {/* Heading */}
          <h2 className="text-3xl font-serif text-brand-dark mb-2">
            Sign In
          </h2>

          <p className="text-gray-500 mb-10">
            Enter your details to access your
            account.
          </p>

          {/* Login Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Email */}
            <div className="relative">
              <FiMail className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-primary text-xl" />

              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-0 border-b-2 border-gray-200 pl-9 pb-3 pt-2 focus:border-brand-primary focus:outline-none text-lg transition bg-transparent"
              />
            </div>

            {/* Password */}
            <PasswordInput
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-brand-primary hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{
                scale: 1.01,
              }}
              whileTap={{
                scale: 0.98,
              }}
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-brand-dark text-white font-semibold text-lg hover:bg-brand-primary transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? "Signing In..."
                : "Sign In"}
            </motion.button>
          </form>

          {/* Register */}
          <p className="text-center text-gray-500 mt-10">
            Don't have an account?{" "}

            <button
              type="button"
              onClick={() =>
                navigate("/register")
              }
              className="text-brand-primary font-semibold hover:underline"
            >
              Create Account
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;