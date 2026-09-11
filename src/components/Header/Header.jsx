import { useEffect, useState } from "react";
import {
  FiTruck,
  FiRefreshCw,
  FiPhone,
  FiShield,
} from "react-icons/fi";

const announcements = [
  {
    icon: <FiTruck />,
    text: "FREE SHIPPING ON ORDERS ABOVE ₹999",
  },
  {
    icon: <FiRefreshCw />,
    text: "7 DAYS EASY RETURNS & EXCHANGES",
  },
  {
    icon: <FiShield />,
    text: "100% SECURE PAYMENTS",
  },
  {
    icon: <FiPhone />,
    text: "CUSTOMER SUPPORT : +91 98765 43210",
  },
];

const Header = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-brand-primary text-white overflow-hidden">
      <div className="max-w-7xl mx-auto h-10 px-4 flex items-center justify-center">

        <div
          key={current}
          className="flex items-center gap-2 text-xs sm:text-sm font-medium tracking-wider uppercase animate-fade"
        >
          <span className="text-base">
            {announcements[current].icon}
          </span>

          <span className="text-center">
            {announcements[current].text}
          </span>
        </div>

      </div>
    </header>
  );
};

export default Header;