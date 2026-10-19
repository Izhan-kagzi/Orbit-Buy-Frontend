import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiPhone } from "react-icons/fi";
import toast from "react-hot-toast";

import PasswordInput from "./PasswordInput";
import SocialLogin from "./SocialLogin";
import { useAuth } from "../../hooks/useAuth";

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

  const [acceptTerms, setAcceptTerms] =
    useState(false);

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
    } else if (
      !/^[6-9]\d{9}$/.test(formData.mobile)
    ) {
      newErrors.mobile =
        "Enter a valid 10-digit mobile number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Confirm your password";
    } else if (
      formData.password !==
      formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    if (!acceptTerms) {
      newErrors.terms =
        "Please accept the Terms & Conditions";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      await register(formData);

      toast.success(
        "Account created successfully!"
      );

      navigate("/login");
    } catch (error) {
      toast.error(
        error?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Name */}

      <div className="grid md:grid-cols-2 gap-5">

        <div>

          <label className="block font-semibold mb-2">
            First Name
          </label>

          <div className="relative">

            <FiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              className="w-full h-14 pl-14 pr-4 border-2 border-gray-200 rounded-xl outline-none focus:border-brand-primary transition"
            />

          </div>

          {errors.firstName && (
            <p className="text-red-500 text-sm mt-2">
              {errors.firstName}
            </p>
          )}

        </div>

        <div>

          <label className="block font-semibold mb-2">
            Last Name
          </label>

          <div className="relative">

            <FiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className="w-full h-14 pl-14 pr-4 border-2 border-gray-200 rounded-xl outline-none focus:border-brand-primary transition"
            />

          </div>

          {errors.lastName && (
            <p className="text-red-500 text-sm mt-2">
              {errors.lastName}
            </p>
          )}

        </div>

      </div>

      {/* Email */}

      <div>

        <label className="block font-semibold mb-2">
          Email Address
        </label>

        <div className="relative">

          <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full h-14 pl-14 pr-4 border-2 border-gray-200 rounded-xl outline-none focus:border-brand-primary transition"
          />

        </div>

        {errors.email && (
          <p className="text-red-500 text-sm mt-2">
            {errors.email}
          </p>
        )}

      </div>

      {/* Mobile */}

      <div>

        <label className="block font-semibold mb-2">
          Mobile Number
        </label>

        <div className="relative">

          <FiPhone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="9876543210"
            className="w-full h-14 pl-14 pr-4 border-2 border-gray-200 rounded-xl outline-none focus:border-brand-primary transition"
          />

        </div>

        {errors.mobile && (
          <p className="text-red-500 text-sm mt-2">
            {errors.mobile}
          </p>
        )}

      </div>
            {/* Password */}

      <div>

        <label className="block font-semibold mb-2">
          Password
        </label>

        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
          error={errors.password}
          autoComplete="new-password"
        />

      </div>

      {/* Confirm Password */}

      <div>

        <label className="block font-semibold mb-2">
          Confirm Password
        </label>

        <PasswordInput
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          error={errors.confirmPassword}
          autoComplete="new-password"
        />

      </div>

      {/* Terms & Conditions */}

      <div>

        <label className="flex items-start gap-3 cursor-pointer">

          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) =>
              setAcceptTerms(e.target.checked)
            }
            className="mt-1 w-4 h-4 accent-black"
          />

          <span className="text-sm text-gray-600 leading-6">
            I agree to the{" "}

            <Link
              to="/terms"
              className="font-semibold text-brand-dark hover:underline"
            >
              Terms & Conditions
            </Link>

            {" "}and{" "}

            <Link
              to="/privacy"
              className="font-semibold text-brand-dark hover:underline"
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

      {/* Register Button */}

      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          h-14
          rounded-xl
          bg-brand-primary
          text-white
          text-lg
          font-semibold
          transition-all
          duration-300
          hover:bg-brand-brown
          disabled:opacity-60
          disabled:cursor-not-allowed
        "
      >
        {loading
          ? "Creating Account..."
          : "Create Account"}
      </button>

      {/* Divider */}

      <div className="relative py-2">

        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>

        <div className="relative flex justify-center">

          <span className="bg-white px-4 text-sm text-gray-500">
            OR SIGN UP WITH
          </span>

        </div>

      </div>

      {/* Social Login */}

      <SocialLogin />

      {/* Login Link */}

      <div className="text-center pt-4">

        <p className="text-gray-600">

          Already have an account?

          <Link
            to="/login"
            className="
              ml-2
              font-semibold
              text-brand-dark
              hover:text-brand-primary
              transition-colors
            "
          >
            Sign In
          </Link>

        </p>

      </div>

    </form>
  );
};

export default RegisterForm;