import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiShield,
  FiTruck,
  FiRefreshCw,
} from "react-icons/fi";

const AuthLayout = ({ title, subtitle, children }) => {
  const isRegister = title?.toLowerCase().includes("create");

  return (
    <section className="min-h-screen w-full bg-white">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">

        {/* ================= LEFT PANEL ================= */}

        <aside
          className="
            relative flex min-h-[460px] flex-col
            justify-between overflow-hidden
            bg-[#061F3D] px-8 py-10 text-white
            sm:px-12 sm:py-12
            lg:min-h-screen lg:px-[8.3%] lg:py-16
          "
        >
          {/* Dotted Background */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "radial-gradient(#b8c9df 0.8px, transparent 0.8px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Brand and Welcome Message */}

          <div className="relative z-10">

            <Link
              to="/"
              className="
                inline-block font-serif text-4xl
                italic tracking-tight text-white
                sm:text-5xl
              "
            >
              Orbit Buy
            </Link>

            <div className="mt-14 sm:mt-16 lg:mt-16">

              <p
                className="
                  mb-7 text-xs font-bold uppercase
                  tracking-[0.38em] text-[#DDC5A3]
                "
              >
                Member Access
              </p>

              <h2
                className="
                  max-w-lg font-serif
                  text-5xl leading-[1.08]
                  tracking-tight
                  sm:text-6xl lg:text-[68px]
                "
              >
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
              </h2>

              <p
                className="
                  mt-8 max-w-lg
                  text-base leading-8
                  text-slate-300 sm:text-lg
                "
              >
                {isRegister
                  ? "Create your account to save your wishlist, track your orders, and discover exclusive member-only offers across our collection."
                  : "Sign in to pick up your wishlist, track your orders, and unlock member-only pricing across our full collection."}
              </p>

            </div>
          </div>

          {/* Benefits */}

          <div className="relative z-10 mt-12">

            <div className="mb-7 border-t border-white/15" />

            <div className="space-y-5">

              {/* Benefit 1 */}

              <div className="flex items-center gap-5">

                <span
                  className="
                    flex h-12 w-12 shrink-0
                    items-center justify-center
                    rounded-full bg-white/10
                    text-[#DDC5A3]
                  "
                >
                  <FiShield size={20} />
                </span>

                <p className="text-base font-medium text-slate-200 sm:text-lg">
                  Bank-grade secure checkout
                </p>

              </div>

              {/* Benefit 2 */}

              <div className="flex items-center gap-5">

                <span
                  className="
                    flex h-12 w-12 shrink-0
                    items-center justify-center
                    rounded-full bg-white/10
                    text-[#DDC5A3]
                  "
                >
                  <FiTruck size={20} />
                </span>

                <p className="text-base font-medium text-slate-200 sm:text-lg">
                  Fast, tracked delivery
                </p>

              </div>

              {/* Benefit 3 */}

              <div className="flex items-center gap-5">

                <span
                  className="
                    flex h-12 w-12 shrink-0
                    items-center justify-center
                    rounded-full bg-white/10
                    text-[#DDC5A3]
                  "
                >
                  <FiRefreshCw size={20} />
                </span>

                <p className="text-base font-medium text-slate-200 sm:text-lg">
                  Effortless returns
                </p>

              </div>

            </div>
          </div>

        </aside>

        {/* ================= RIGHT PANEL ================= */}

        <main
          className="
            flex min-w-0 flex-col
            bg-white px-6 py-8
            sm:px-10 md:px-14
            lg:px-12 xl:px-20
          "
        >

          {/* Back to Home */}

          <div className="mx-auto w-full max-w-[530px]">

            <Link
              to="/"
              className="
                inline-flex items-center gap-3
                text-sm font-semibold
                text-[#68778C]
                transition-colors
                hover:text-[#061F3D]
              "
            >
              <FiArrowLeft size={17} />
              Back to Home
            </Link>

          </div>

          {/* Heading and Form */}

          <div
            className="
              mx-auto my-auto w-full
              max-w-[530px] py-12
            "
          >

            {/* Page Heading */}

            <div className="mb-9">

              <h1
                className="
                  font-serif text-4xl
                  tracking-tight text-[#061F3D]
                  sm:text-[42px]
                "
              >
                {title}
              </h1>

              <p
                className="
                  mt-3 text-base leading-7
                  text-[#68778C]
                  sm:text-lg
                "
              >
                {subtitle}
              </p>

            </div>

            {/* Render the form exactly once */}

            {children}

          </div>

        </main>

      </div>
    </section>
  );
};

export default AuthLayout;