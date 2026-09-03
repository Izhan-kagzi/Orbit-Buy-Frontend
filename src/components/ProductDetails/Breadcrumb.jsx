import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

const Breadcrumb = ({ product }) => {
  return (
    <nav
      className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-8"
      aria-label="Breadcrumb"
    >
      <Link
        to="/"
        className="hover:text-brand-dark transition-colors duration-300"
      >
        Home
      </Link>

      <FiChevronRight className="text-gray-400" />

      <span className="hover:text-brand-dark transition-colors duration-300">
        {product.category}
      </span>

      {product.type && (
        <>
          <FiChevronRight className="text-gray-400" />

          <span className="hover:text-brand-dark transition-colors duration-300">
            {product.type}
          </span>
        </>
      )}

      <FiChevronRight className="text-gray-400" />

      <span className="font-semibold text-brand-dark truncate max-w-[220px]">
        {product.name}
      </span>
    </nav>
  );
};

export default Breadcrumb;