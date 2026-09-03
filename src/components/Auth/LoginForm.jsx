import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PasswordInput from "./PasswordInput";
import SocialLogin from "./SocialLogin";
import { useAuth } from "../../hooks/useAuth";

const LoginForm = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [rememberMe, setRememberMe] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        formData.email
      )
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      await login({
        email: formData.email,
        password: formData.password,
        rememberMe,
      });

      toast.success("Login Successful!");

      navigate("/");
    } catch (error) {
      toast.error(
        error?.message || "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Email */}

      <div>

        <label className="block font-semibold mb-2">
          Email Address
        </label>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className={`
            w-full
            px-5
            py-4
            rounded-xl
            border-2
            outline-none
            transition-all
            duration-300

            ${
              errors.email
                ? "border-red-500"
                : "border-gray-200 focus:border-brand-primary"
            }
          `}
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-2">
            {errors.email}
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
          placeholder="Enter your password"
        />

        {errors.password && (
          <p className="text-red-500 text-sm mt-2">
            {errors.password}
          </p>
        )}

      </div>
            {/* Remember Me & Forgot Password */}

      <div className="flex items-center justify-between">

        <label className="flex items-center gap-3 cursor-pointer">

          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) =>
              setRememberMe(e.target.checked)
            }
            className="w-4 h-4 accent-black"
          />

          <span className="text-gray-600">
            Remember Me
          </span>

        </label>

        <Link
          to="/forgot-password"
          className="
            text-brand-primary
            font-medium
            hover:underline
          "
        >
          Forgot Password?
        </Link>

      </div>

      {/* Login Button */}

      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          py-4
          rounded-xl
          bg-brand-primary
          text-white
          font-semibold
          text-lg
          transition-all
          duration-300
          hover:bg-brand-brown
          disabled:opacity-60
          disabled:cursor-not-allowed
        "
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>

      {/* Divider */}

      <div className="relative">

        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>

        <div className="relative flex justify-center">

          <span className="bg-white px-4 text-sm text-gray-500">
            OR CONTINUE WITH
          </span>

        </div>

      </div>

      {/* Social Login */}

      <SocialLogin />

      {/* Register */}

      <div className="text-center pt-4">

        <p className="text-gray-600">

          Don't have an account?

          <Link
            to="/register"
            className="
              ml-2
              font-semibold
              text-brand-dark
              hover:text-brand-primary
              transition
            "
          >
            Create Account
          </Link>

        </p>

      </div>

    </form>
  );
};

export default LoginForm;