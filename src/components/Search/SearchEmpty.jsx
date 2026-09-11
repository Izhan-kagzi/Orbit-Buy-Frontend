import { FiSearch } from "react-icons/fi";

const SearchEmpty = ({
  searchTerm,
  onClear,
}) => {
  return (
    <div className="text-center py-24">

      <div className="w-24 h-24 mx-auto rounded-full bg-gray-100 flex items-center justify-center">

        <FiSearch className="text-5xl text-gray-400" />

      </div>

      <h2 className="text-3xl font-bold mt-8">
        No Products Found
      </h2>

      <p className="text-gray-500 mt-4 max-w-lg mx-auto">

        We couldn't find any products matching

        <span className="font-semibold">
          {" "}
          "{searchTerm}"
        </span>

      </p>

      <button
        onClick={onClear}
        className="
          mt-8
          bg-brand-primary
          text-white
          px-8
          py-3
          rounded-full
          hover:bg-brand-brown
          transition
        "
      >
        Clear Search
      </button>

    </div>
  );
};

export default SearchEmpty;