import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";

const SortDropdown = ({ value, onChange, options }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between gap-8 min-w-[160px] border border-gray-200 bg-white rounded-full px-5 py-3 font-medium text-brand-dark hover:border-brand-primary transition"
      >
        {value}
        <FiChevronDown
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-full min-w-[160px] bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-30 animate-dropdown">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`w-full flex items-center justify-between px-5 py-3 text-left transition ${
                value === option
                  ? "bg-brand-primary text-white font-semibold"
                  : "text-brand-dark hover:bg-gray-50"
              }`}
            >
              {option}
              {value === option && <FiCheck size={16} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
