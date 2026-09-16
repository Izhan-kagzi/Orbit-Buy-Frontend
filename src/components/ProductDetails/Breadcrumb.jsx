import { Link } from "react-router-dom";
import {
  FiChevronRight,
  FiHome,
} from "react-icons/fi";

const Breadcrumb = ({ product }) => {
  if (!product) return null;

  return (
    <nav
      className="mb-8"
      aria-label="Breadcrumb"
    >
      <div
        className="
          inline-flex max-w-full
          items-center
          rounded-2xl
          border border-gray-100
          bg-gray-50/80
          px-4 py-3
          shadow-sm
          backdrop-blur-sm
        "
      >
        <ol className="flex min-w-0 items-center gap-2 text-sm">
          {/* Home */}
          <li className="shrink-0">
            <Link
              to="/"
              aria-label="Home"
              className="
                group
                flex items-center gap-2
                rounded-xl
                px-2 py-1.5
                font-semibold
                text-gray-500
                transition-all
                duration-300
                hover:bg-white
                hover:text-brand-primary
                hover:shadow-sm
              "
            >
              <FiHome
                className="
                  text-base
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              />

              <span className="hidden sm:inline">
                Home
              </span>
            </Link>
          </li>

          <FiChevronRight className="shrink-0 text-gray-300" />

          {/* Category */}
          <li className="shrink-0">
            <span
              className="
                rounded-xl
                px-2 py-1.5
                font-medium
                text-gray-500
                transition-colors
                duration-300
                hover:text-brand-primary
              "
            >
              {product.category}
            </span>
          </li>

          {/* Product Type */}
          {product.type && (
            <>
              <FiChevronRight className="shrink-0 text-gray-300" />

              <li className="hidden shrink-0 sm:block">
                <span
                  className="
                    rounded-xl
                    px-2 py-1.5
                    font-medium
                    text-gray-500
                    transition-colors
                    duration-300
                    hover:text-brand-primary
                  "
                >
                  {product.type}
                </span>
              </li>
            </>
          )}

          <FiChevronRight className="shrink-0 text-gray-300" />

          {/* Current Product */}
          <li className="min-w-0">
            <span
              className="
                block max-w-[150px]
                truncate
                rounded-xl
                bg-white
                px-3 py-1.5
                font-bold
                text-gray-900
                shadow-sm
                sm:max-w-[280px]
              "
              title={product.name}
            >
              {product.name}
            </span>
          </li>
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;