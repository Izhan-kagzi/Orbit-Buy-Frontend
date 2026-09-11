import { Link } from "react-router-dom";
import { FiArrowLeft, FiShield } from "react-icons/fi";

const AuthLayout = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">

      <div className="container mx-auto px-5 py-10">

        {/* Back */}

        <Link
          to="/"
          className="
            inline-flex
            items-center
            gap-2
            text-gray-600
            hover:text-brand-dark
            transition
            mb-10
          "
        >
          <FiArrowLeft />
          Back to Home
        </Link>

        <div
          className="
            max-w-6xl
            mx-auto
            bg-white
            rounded-[32px]
            overflow-hidden
            shadow-2xl
            grid
            lg:grid-cols-2
          "
        >

          {/* Left Side */}

          <div
            className="
              hidden
              lg:flex
              flex-col
              justify-center
              bg-brand-primary
              text-white
              p-16
              relative
              overflow-hidden
            "
          >

            <div
              className="
                absolute
                -top-28
                -right-28
                w-72
                h-72
                rounded-full
                bg-white/10
              "
            />

            <div
              className="
                absolute
                bottom-0
                -left-20
                w-56
                h-56
                rounded-full
                bg-white/5
              "
            />

            <span
              className="
                w-16
                h-16
                rounded-2xl
                bg-white/10
                flex
                items-center
                justify-center
                mb-8
              "
            >
              <FiShield size={30} />
            </span>

            <h2 className="text-5xl font-black leading-tight">
              Welcome to
              <br />
              Orbit Buy
            </h2>

            <p className="mt-6 text-gray-300 leading-8">
              Shop premium fashion with secure checkout,
              fast delivery and a luxury shopping
              experience designed just for you.
            </p>

            <div className="mt-12 space-y-5">

              <div className="flex items-center gap-3">
                <span className="text-green-400 text-xl">
                  ✓
                </span>
                Secure Authentication
              </div>

              <div className="flex items-center gap-3">
                <span className="text-green-400 text-xl">
                  ✓
                </span>
                Fast Checkout
              </div>

              <div className="flex items-center gap-3">
                <span className="text-green-400 text-xl">
                  ✓
                </span>
                Premium Support
              </div>

            </div>

          </div>

          {/* Right Side */}

          <div
            className="
              p-8
              sm:p-12
              lg:p-16
            "
          >

            <div className="mb-10">

              <h1 className="text-4xl font-black">
                {title}
              </h1>

              <p className="text-gray-500 mt-3">
                {subtitle}
              </p>

            </div>

            {children}

          </div>

        </div>

      </div>

    </section>
  );
};

export default AuthLayout;