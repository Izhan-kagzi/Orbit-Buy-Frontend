import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FiUser,
  FiMail,
  FiPhone,
} from "react-icons/fi";

import toast from "react-hot-toast";

import PasswordInput from "./PasswordInput";
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

  const [acceptTerms, setAcceptTerms] = useState(false);

  const [errors, setErrors] = useState({});

  // ================= INPUT STYLING =================

  const inputClass = (field) => `
    w-full h-[58px]
    pl-12 pr-4
    border-0 border-b
    ${
      errors[field]
        ? "border-red-400"
        : "border-gray-300"
    }
    rounded-none
    bg-transparent
    text-[#061F3D]
    placeholder:text-[#858995]
    outline-none
    focus:border-[#061F3D]
    focus:ring-0
    transition-all duration-300
  `;

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ================= VALIDATION =================

  const validate = () => {
    const newErrors = {};

    // First name

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    // Last name

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    // Email

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        formData.email
      )
    ) {
      newErrors.email = "Invalid email address";
    }

    // Mobile number

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile =
        "Enter a valid 10-digit mobile number";
    }

    // Password

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    // Confirm password

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Confirm your password";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    // Terms and conditions

    if (!acceptTerms) {
      newErrors.terms =
        "Please accept the Terms & Conditions";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      await register(formData);

      toast.success("Account created successfully!");

      navigate("/login");
    } catch (error) {
      toast.error(
        error?.message || "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= ICON =================

  const InputIcon = ({ children }) => (
    <span
      className="
        absolute left-0 top-1/2
        -translate-y-1/2
        text-xl text-[#123D68]
      "
    >
      {children}
    </span>
  );

  // ================= FORM =================

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-5"
      noValidate
    >

      {/* FIRST NAME AND LAST NAME */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

        {/* First Name */}

        <div>
          <label
            htmlFor="firstName"
            className="sr-only"
          >
            First Name
          </label>

          <div className="relative">

            <InputIcon>
              <FiUser />
            </InputIcon>

            <input
              id="firstName"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              autoComplete="given-name"
              aria-invalid={!!errors.firstName}
              aria-describedby={
                errors.firstName
                  ? "firstName-error"
                  : undefined
              }
              className={inputClass("firstName")}
            />

          </div>

          {errors.firstName && (
            <p
              id="firstName-error"
              className="mt-2 text-sm text-red-500"
            >
              {errors.firstName}
            </p>
          )}
        </div>

        {/* Last Name */}

        <div>
          <label
            htmlFor="lastName"
            className="sr-only"
          >
            Last Name
          </label>

          <div className="relative">

            <InputIcon>
              <FiUser />
            </InputIcon>

            <input
              id="lastName"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              autoComplete="family-name"
              aria-invalid={!!errors.lastName}
              aria-describedby={
                errors.lastName
                  ? "lastName-error"
                  : undefined
              }
              className={inputClass("lastName")}
            />

          </div>

          {errors.lastName && (
            <p
              id="lastName-error"
              className="mt-2 text-sm text-red-500"
            >
              {errors.lastName}
            </p>
          )}
        </div>

      </div>

      {/* EMAIL ADDRESS */}

      <div>

        <label
          htmlFor="email"
          className="sr-only"
        >
          Email Address
        </label>

        <div className="relative">

          <InputIcon>
            <FiMail />
          </InputIcon>

          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={
              errors.email ? "email-error" : undefined
            }
            className={inputClass("email")}
          />

        </div>

        {errors.email && (
          <p
            id="email-error"
            className="mt-2 text-sm text-red-500"
          >
            {errors.email}
          </p>
        )}

      </div>

      {/* MOBILE NUMBER */}

      <div>

        <label
          htmlFor="mobile"
          className="sr-only"
        >
          Mobile Number
        </label>

        <div className="relative">

          <InputIcon>
            <FiPhone />
          </InputIcon>

          <input
            id="mobile"
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            autoComplete="tel"
            inputMode="numeric"
            maxLength={10}
            aria-invalid={!!errors.mobile}
            aria-describedby={
              errors.mobile ? "mobile-error" : undefined
            }
            className={inputClass("mobile")}
          />

        </div>

        {errors.mobile && (
          <p
            id="mobile-error"
            className="mt-2 text-sm text-red-500"
          >
            {errors.mobile}
          </p>
        )}

      </div>

      {/* PASSWORD */}

      <div>

        <label
          htmlFor="password"
          className="sr-only"
        >
          Password
        </label>

        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          error={errors.password}
          autoComplete="new-password"
        />

      </div>

      {/* CONFIRM PASSWORD */}

      <div>

        <label
          htmlFor="confirmPassword"
          className="sr-only"
        >
          Confirm Password
        </label>

        <PasswordInput
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          error={errors.confirmPassword}
          autoComplete="new-password"
        />

      </div>

      {/* TERMS AND CONDITIONS */}

      <div className="pt-1">

        <label className="flex cursor-pointer items-start gap-3">

          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) =>
              setAcceptTerms(e.target.checked)
            }
            className="
              mt-1 h-4 w-4 shrink-0
              accent-[#061F3D]
            "
          />

          <span className="text-sm leading-6 text-[#68778C]">

            I agree to the{" "}

            <Link
              to="/terms"
              className="
                font-semibold text-[#061F3D]
                hover:underline
              "
            >
              Terms & Conditions
            </Link>

            {" "}and{" "}

            <Link
              to="/privacy"
              className="
                font-semibold text-[#061F3D]
                hover:underline
              "
            >
              Privacy Policy
            </Link>

            .

          </span>

        </label>

        {errors.terms && (
          <p className="mt-2 text-sm text-red-500">
            {errors.terms}
          </p>
        )}

      </div>

      {/* CREATE ACCOUNT BUTTON */}

      <button
        type="submit"
        disabled={loading}
        className="
          mt-3 flex h-[70px] w-full
          items-center justify-center
          rounded-full bg-[#061F3D]
          px-6 text-lg font-semibold
          text-white
          transition-all duration-300
          hover:bg-[#123D68]
          hover:shadow-lg
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {loading
          ? "Creating Account..."
          : "Create Account"}
      </button>

      {/* SIGN IN LINK */}

      <div className="pt-4 text-center">

        <p className="text-sm text-[#68778C] sm:text-base">

          Already have an account?{" "}

          <Link
            to="/login"
            className="
              font-bold text-[#061F3D]
              transition-colors
              hover:text-[#123D68]
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