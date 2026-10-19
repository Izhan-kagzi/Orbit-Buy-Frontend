import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiPhone } from "react-icons/fi";
import toast from "react-hot-toast";

import PasswordInput from "./PasswordInput";
import { useAuth } from "../../hooks/useAuth";

/* Underline-style field, same look as the Sign In email input */
const UnderlineField = ({ icon: Icon, error, ...props }) => (
  <div>
    <div className="relative">
      <Icon className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-dark text-xl" />
      <input
        {...props}
        className="w-full h-14 pl-10 pr-2 bg-transparent border-b border-gray-300 text-lg text-brand-dark placeholder:text-gray-500 outline-none focus:border-brand-dark transition-colors"
      />
    </div>
    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
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

    if (!acceptTerms) newErrors.terms = "Please accept the Terms & Conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

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
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div className="grid md:grid-cols-2 gap-5">
        <UnderlineField
          icon={FiUser}
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          autoComplete="given-name"
          error={errors.firstName}
        />
        <UnderlineField
          icon={FiUser}
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          autoComplete="family-name"
          error={errors.lastName}
        />
      </div>

      {/* Email */}
      <UnderlineField
        icon={FiMail}
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email Address"
        autoComplete="email"
        error={errors.email}
      />

      {/* Mobile */}
      <UnderlineField
        icon={FiPhone}
        type="tel"
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        placeholder="Mobile Number"
        autoComplete="tel"
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

      {/* Terms */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => {
              setAcceptTerms(e.target.checked);
              setErrors((prev) => ({ ...prev, terms: "" }));
            }}
            className="mt-1 w-4 h-4 accent-brand-dark"
          />
          <span className="text-sm text-gray-600 leading-6">
            I agree to the{" "}
            <Link to="/terms" className="font-semibold text-brand-dark hover:underline">
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="font-semibold text-brand-dark hover:underline">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {errors.terms && <p className="text-red-500 text-sm mt-2">{errors.terms}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full h-16 rounded-full bg-brand-dark text-white text-lg font-semibold transition-all duration-300 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      {/* Login link */}
      <p className="text-center text-gray-600 pt-2">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-bold text-brand-dark hover:underline transition-colors"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;