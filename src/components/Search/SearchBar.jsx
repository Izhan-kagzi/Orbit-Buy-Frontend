import { FiSearch, FiX } from "react-icons/fi";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  onSearch,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      onSearch?.();
    }
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        relative
        w-full
        max-w-4xl
        mx-auto
      "
    >
      {/* Search Icon */}

      <FiSearch
        className="
          absolute
          left-6
          top-1/2
          -translate-y-1/2
          text-2xl
          text-gray-400
        "
      />

      {/* Input */}

      <input
        type="text"
        placeholder="Search for shirts, jeans, perfumes, wallets..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="
          w-full
          h-16
          rounded-full
          border-2
          border-gray-200
          bg-white
          pl-16
          pr-32
          text-lg
          outline-none
          transition-all
          duration-300
          focus:border-brand-primary
          focus:shadow-xl
        "
      />

      {/* Clear Button */}

      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          className="
            absolute
            right-24
            top-1/2
            -translate-y-1/2
            w-10
            h-10
            rounded-full
            bg-gray-100
            hover:bg-red-500
            hover:text-white
            flex
            items-center
            justify-center
            transition-all
            duration-300
          "
        >
          <FiX size={20} />
        </button>
      )}

      {/* Search Button */}

      <button
        type="submit"
        className="
          absolute
          right-2
          top-2
          bottom-2
          px-8
          rounded-full
          bg-brand-primary
          text-white
          font-semibold
          hover:bg-brand-brown
          transition-all
          duration-300
        "
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;