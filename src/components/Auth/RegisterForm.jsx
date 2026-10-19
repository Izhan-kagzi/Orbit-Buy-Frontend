import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiUser,
  FiMail,
  FiPhone,
  FiShield,
  FiTruck,
  FiRefreshCw,
} from "react-icons/fi";
import toast from "react-hot-toast";

import PasswordInput from "./PasswordInput";
import { useAuth } from "../../hooks/useAuth";

const features = [
  { icon: FiShield, text: "Bank-grade secure checkout" },
  { icon: FiTruck, text: "Fast, tracked delivery" },
  { icon: FiRefreshCw, text: "Effortless returns" },
];

/* Underlined input with a leading icon — same look as the Sign In page */
const Field = ({
  icon: Icon,
  error,
  className = "",
  ...inputProps
}) => (
  <div className={className}>
    <div className="relative">
      <Icon className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-primary text-xl" />

      <input
        {...inputProps}
        className={`w-full border-0 border-b-2 pl-9 pb-3 pt-2 focus:outline-none text-lg transition bg-transparent ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-200 focus:border-brand-primary"
        }`}
      />
    </div>

    {error && (
      <p className="text-red-500 text-sm mt-2">{error}</p>
    )}
  </div>
);

const RegisterForm = () => {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [acceptTerms, setAcceptTerms] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        formData.email
      )
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!acceptTerms) {
      newErrors.terms = "Please accept the Terms & Conditions";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading || !validate()) return;

    setLoading(true);

    try {
      await register(formData);

      toast.success("Account created successfully!");

      navigate("/login");
    } catch (error) {
      toast.error(error?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">

      {/* ================= LEFT — EDITORIAL PANEL ================= */}

      <div className="hidden lg:flex sticky top-0 h-screen self-start relative flex-col justify-between bg-brand-dark text-white p-16 overflow-hidden">

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
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <Link to="/" className="font-logo text-4xl">
            Orbit Buy
          </Link>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <p className="uppercase tracking-[5px] text-brand-tan text-xs font-semibold mb-6">
            Join Orbit Buy
          </p>

          <h1 className="text-6xl font-serif leading-[1.1]">
            Create
            <br />
            Account.
          </h1>

          <p className="mt-8 text-gray-300 leading-relaxed max-w-md">
            Join Orbit Buy to experience premium fashion,
            fast delivery, and exclusive rewards across our
            full collection.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative flex flex-col gap-5 pt-10 border-t border-white/10"
        >
          {features.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-4 text-gray-200"
            >
              <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Icon size={16} className="text-brand-tan" />
              </span>

              {text}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ================= RIGHT — REGISTER FORM ================= */}

      <div className="flex flex-col justify-center px-6 sm:px-16 pt-28 pb-16 relative">

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
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="w-full max-w-md mx-auto"
        >

          {/* Mobile Logo */}
          <span className="font-logo text-3xl text-brand-primary lg:hidden block mb-8 text-center">
            Orbit Buy
          </span>

          {/* Heading */}
          <h2 className="text-3xl font-serif text-brand-dark mb-2">
            Create Account
          </h2>

          <p className="text-gray-500 mb-10">
            Fill in your details to join Orbit Buy.
          </p>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-6"
          >

            {/* Name */}
            <div className="grid sm:grid-cols-2 gap-6">
              <Field
                icon={FiUser}
                type="text"
                name="firstName"
                autoComplete="given-name"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
              />

              <Field
                icon={FiUser}
                type="text"
                name="lastName"
                autoComplete="family-name"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
              />
            </div>

            {/* Email */}
            <Field
              icon={FiMail}
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            {/* Mobile */}
            <Field
              icon={FiPhone}
              type="tel"
              name="mobile"
              inputMode="numeric"
              maxLength={10}
              autoComplete="tel"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              error={errors.mobile}
            />

            {/* Password */}
            <PasswordInput
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              error={errors.password}
              autoComplete="new-password"
            />

            {/* Confirm Password */}
            <PasswordInput
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              error={errors.confirmPassword}
              autoComplete="new-password"
            />

            {/* Terms & Conditions */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => {
                    setAcceptTerms(e.target.checked);
                    setErrors((prev) => ({ ...prev, terms: "" }));
                  }}
                  className="mt-1 w-4 h-4 accent-black"
                />

                <span className="text-sm text-gray-600 leading-6">
                  I agree to the{" "}

                  <Link
                    to="/terms"
                    className="font-semibold text-brand-primary hover:underline"
                  >
                    Terms & Conditions
                  </Link>

                  {" "}and{" "}

                  <Link
                    to="/privacy"
                    className="font-semibold text-brand-primary hover:underline"
                  >
                    Privacy Policy
                  </Link>

                  .
                </span>
              </label>

              {errors.terms && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.terms}
                </p>
              )}
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-brand-dark text-white font-semibold text-lg hover:bg-brand-primary transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </motion.button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-500 mt-10">
            Already have an account?{" "}

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-brand-primary font-semibold hover:underline"
            >
              Sign In
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterForm;