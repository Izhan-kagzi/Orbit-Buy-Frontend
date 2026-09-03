import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import { getImageUrl } from "../../services/api";

const SALE_DURATION_MS = (4 * 24 + 14) * 60 * 60 * 1000 + 48 * 60 * 1000 + 18 * 1000;

const DotGrid = ({ className }) => (
  <svg viewBox="0 0 100 60" className={className} aria-hidden="true">
    {[...Array(5)].map((_, row) =>
      [...Array(8)].map((_, col) => (
        <circle key={`${row}-${col}`} cx={col * 13} cy={row * 13} r="2.2" fill="#d9c3a3" />
      ))
    )}
  </svg>
);

function getTimeLeft(targetTime) {
  const diff = Math.max(0, targetTime - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const TimeBox = ({ value, label }) => (
  <div className="text-center">
    <span className="block text-3xl sm:text-4xl font-bold text-brand-dark">
      {String(value).padStart(2, "0")}
    </span>
    <span className="block text-xs uppercase tracking-wide text-gray-500 mt-1">{label}</span>
  </div>
);

const FlashSale = () => {
  const navigate = useNavigate();
  const [targetTime] = useState(() => Date.now() + SALE_DURATION_MS);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-stretch">
          {/* Left card */}
          <div className="relative bg-gray-50 rounded-[2rem] p-10 lg:p-14 overflow-hidden">
            <DotGrid className="absolute top-6 right-6 w-28 opacity-70" />
            <DotGrid className="absolute bottom-6 left-6 w-28 opacity-70 rotate-180" />

            <div className="relative">
              <h2 className="text-4xl sm:text-5xl font-serif text-brand-dark">
                Flash <span className="text-brand-primary">Sale!</span>
              </h2>
              <p className="mt-4 text-gray-600 text-lg">
                Up to 40% off - Limited Time Offer!
              </p>

              <div className="mt-10 flex items-center gap-6 sm:gap-10">
                <TimeBox value={timeLeft.days} label="Days" />
                <span className="text-3xl text-brand-tan -mt-5">:</span>
                <TimeBox value={timeLeft.hours} label="Hours" />
                <span className="text-3xl text-brand-tan -mt-5">:</span>
                <TimeBox value={timeLeft.minutes} label="Minutes" />
                <span className="text-3xl text-brand-tan -mt-5">:</span>
                <TimeBox value={timeLeft.seconds} label="Seconds" />
              </div>

              <button
                onClick={() => navigate("/sale")}
                className="inline-flex items-center gap-2 mt-12 bg-brand-primary hover:bg-brand-brown text-white px-8 py-4 rounded-full font-semibold transition-all duration-300"
              >
                Shop Now
                <FiArrowRight />
              </button>
            </div>
          </div>

          {/* Right images */}
          <div className="hidden sm:grid grid-cols-2 gap-5">
            <div className="rounded-[2rem] overflow-hidden border-[6px] border-gray-50 shadow-xl h-full min-h-[320px]">
              <img
                src={getImageUrl("/uploads/products/mensjackets/jacket1.jpg")}
                alt="Orbit Buy jacket"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-[2rem] overflow-hidden border-[6px] border-gray-50 shadow-xl h-full min-h-[320px] mt-8">
              <img
                src={getImageUrl("/uploads/products/womenpartywear/party1.jpg")}
                alt="Orbit Buy party wear"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
