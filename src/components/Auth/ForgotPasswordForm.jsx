import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  const validateEmail = () => {
    if (!email.trim()) {
      setError("Email is required.");
      return false;
    }

    const emailRegex =
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail()) return;

    setLoading(true);

    // Simulate API request
    setTimeout(() => {
      toast.success(
        "Password reset link sent successfully!"
      );

      setLoading(false);
    }, 1800);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Heading */}

      <div className="text-center">

        <h2 className="text-3xl font-black">
          Forgot Password?
        </h2>

        <p className="text-gray-500 mt-3 leading-7">
          Enter your registered email address and
          we'll send you a password reset link.
        </p>

      </div>

      {/* Email */}

      <div>

        <label className="block font-semibold mb-2">
          Email Address
        </label>

        <div className="relative">

          <FiMail
            className="
              absolute
              left-5
              top-1/2
              -translate-y-1/2
              text-gray-400
              text-xl
            "
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            className={`
              w-full
              h-14
              rounded-xl
              border-2
              pl-14
              pr-4
              outline-none
              transition-all
              duration-300

              ${
                error
                  ? "border-red-500"
                  : "border-gray-200 focus:border-brand-primary"
              }
            `}
          />

        </div>

        {error && (
          <p className="text-red-500 text-sm mt-2">
            {error}
          </p>
        )}

      </div>
            {/* Submit Button */}

      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          h-14
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
        {loading
          ? "Sending Reset Link..."
          : "Send Reset Link"}
      </button>

      {/* Divider */}

      <div className="flex items-center gap-4">

        <div className="flex-1 h-px bg-gray-200" />

        <span className="text-sm text-gray-400">
          OR
        </span>

        <div className="flex-1 h-px bg-gray-200" />

      </div>

      {/* Back to Login */}

      <Link
        to="/login"
        className="
          w-full
          h-14
          rounded-xl
          border-2
          border-gray-200
          flex
          items-center
          justify-center
          gap-3
          font-semibold
          transition-all
          duration-300
          hover:border-brand-primary
          hover:bg-gray-50
        "
      >
        <FiArrowLeft size={20} />

        Back to Login
      </Link>

      {/* Footer */}

      <div className="text-center pt-4">

        <p className="text-sm text-gray-500 leading-7">
          If you don't receive the email within a few
          minutes, please check your spam folder or try
          again using the email associated with your
          Orbit Buy account.
        </p>

      </div>

    </form>
  );
};

export default ForgotPasswordForm;