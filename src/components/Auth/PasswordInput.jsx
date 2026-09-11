import { useState } from "react";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";

const PasswordInput = ({
  name = "password",
  value = "",
  onChange,
  placeholder = "Enter password",
  disabled = false,
  error = "",
  autoComplete = "current-password",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full">

      <div className="relative">

        {/* Lock Icon */}

        <FiLock
          className="
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            text-xl
            text-gray-400
            pointer-events-none
          "
        />

        {/* Input */}

        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          className={`
            w-full
            h-14
            rounded-xl
            border-2
            pl-14
            pr-14
            outline-none
            transition-all
            duration-300
            bg-white

            ${
              error
                ? "border-red-500 focus:border-red-500"
                : "border-gray-200 focus:border-brand-primary"
            }

            ${
              disabled
                ? "opacity-60 cursor-not-allowed"
                : ""
            }
          `}
        />

        {/* Show / Hide */}

        <button
          type="button"
          onClick={() =>
            setShowPassword((prev) => !prev)
          }
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            w-9
            h-9
            rounded-full
            flex
            items-center
            justify-center
            text-gray-500
            hover:bg-gray-100
            hover:text-brand-dark
            transition-all
            duration-300
          "
        >
          {showPassword ? (
            <FiEyeOff size={20} />
          ) : (
            <FiEye size={20} />
          )}
        </button>

      </div>

      {/* Error */}

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}

    </div>
  );
};

export default PasswordInput;