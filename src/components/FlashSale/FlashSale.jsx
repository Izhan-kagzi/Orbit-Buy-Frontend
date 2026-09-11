import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import { getImageUrl } from "../../services/api";

// =====================================================
// FLASH SALE DURATION
// 4 Days : 14 Hours : 48 Minutes : 18 Seconds
// =====================================================

const SALE_DURATION_MS =
  0 * 24 * 60 * 60 * 1000 +
  0 * 60 * 60 * 1000 +
  0 * 60 * 1000 +
  18 * 1000;

// =====================================================
// GET TIME LEFT
// =====================================================

function getTimeLeft(targetTime) {
  const diff = Math.max(0, targetTime - Date.now());

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

// =====================================================
// DOT GRID
// =====================================================

const DotGrid = ({ className = "" }) => (
  <svg
    viewBox="0 0 100 60"
    className={className}
    aria-hidden="true"
  >
    {[...Array(5)].map((_, row) =>
      [...Array(8)].map((_, col) => (
        <circle
          key={`${row}-${col}`}
          cx={col * 13}
          cy={row * 13}
          r="2.2"
          fill="#d9c3a3"
        />
      ))
    )}
  </svg>
);

// =====================================================
// TIME BOX
// =====================================================

const TimeBox = ({ value, label }) => (
  <div className="text-center min-w-[55px] sm:min-w-[70px]">
    <span
      className="
        block
        text-3xl
        sm:text-4xl
        font-bold
        text-brand-dark
        tabular-nums
      "
    >
      {String(value).padStart(2, "0")}
    </span>

    <span
      className="
        block
        text-[10px]
        sm:text-xs
        uppercase
        tracking-wide
        text-gray-500
        mt-1
      "
    >
      {label}
    </span>
  </div>
);

// =====================================================
// FLASH SALE
// =====================================================

const FlashSale = () => {
  const navigate = useNavigate();

  // ===================================================
  // CREATE NEW COUNTDOWN WHEN COMPONENT MOUNTS
  // ===================================================

  const [targetTime] = useState(
    () => Date.now() + SALE_DURATION_MS
  );

  const [timeLeft, setTimeLeft] = useState(() =>
    getTimeLeft(targetTime)
  );

  const [saleEnded, setSaleEnded] = useState(false);

  // ===================================================
  // COUNTDOWN
  // ===================================================

  useEffect(() => {
    const updateTimer = () => {
      const remaining = getTimeLeft(targetTime);

      setTimeLeft(remaining);

      // ===============================================
      // SALE ENDED
      // ===============================================

      if (
        remaining.days === 0 &&
        remaining.hours === 0 &&
        remaining.minutes === 0 &&
        remaining.seconds === 0
      ) {
        setSaleEnded(true);
      }
    };

    // Update immediately
    updateTimer();

    // Update every second
    const interval = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [targetTime]);

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div
          className="
            grid
            lg:grid-cols-[1.1fr_0.9fr]
            gap-8
            items-stretch
          "
        >

          {/* =================================================
              LEFT FLASH SALE CARD
          ================================================= */}

          <div
            className="
              relative
              bg-gray-50
              rounded-[2rem]
              p-8
              sm:p-10
              lg:p-14
              overflow-hidden
            "
          >

            {/* DOTS */}

            <DotGrid
              className="
                absolute
                top-6
                right-6
                w-24
                sm:w-28
                opacity-70
              "
            />

            <DotGrid
              className="
                absolute
                bottom-6
                left-6
                w-24
                sm:w-28
                opacity-70
                rotate-180
              "
            />

            {/* CONTENT */}

            <div className="relative z-10">

              {/* =================================================
                  SALE ACTIVE
              ================================================= */}

              {!saleEnded ? (
                <>
                  {/* TITLE */}

                  <h2
                    className="
                      text-4xl
                      sm:text-5xl
                      font-serif
                      text-brand-dark
                    "
                  >
                    Flash{" "}
                    <span className="text-brand-primary">
                      Sale!
                    </span>
                  </h2>

                  {/* DESCRIPTION */}

                  <p
                    className="
                      mt-4
                      text-gray-600
                      text-base
                      sm:text-lg
                    "
                  >
                    Up to 30% off - Limited Time Offer!
                  </p>

                  {/* =================================================
                      COUNTDOWN
                  ================================================= */}

                  <div
                    className="
                      mt-8
                      sm:mt-10
                      flex
                      items-center
                      justify-between
                      sm:justify-start
                      gap-2
                      sm:gap-6
                      lg:gap-10
                    "
                  >

                    <TimeBox
                      value={timeLeft.days}
                      label="Days"
                    />

                    <span
                      className="
                        text-2xl
                        sm:text-3xl
                        text-brand-tan
                        -mt-5
                      "
                    >
                      :
                    </span>

                    <TimeBox
                      value={timeLeft.hours}
                      label="Hours"
                    />

                    <span
                      className="
                        text-2xl
                        sm:text-3xl
                        text-brand-tan
                        -mt-5
                      "
                    >
                      :
                    </span>

                    <TimeBox
                      value={timeLeft.minutes}
                      label="Minutes"
                    />

                    <span
                      className="
                        text-2xl
                        sm:text-3xl
                        text-brand-tan
                        -mt-5
                      "
                    >
                      :
                    </span>

                    <TimeBox
                      value={timeLeft.seconds}
                      label="Seconds"
                    />

                  </div>

                  {/* SHOP NOW */}

                  <button
                    type="button"
                    onClick={() => navigate("/sale")}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      mt-10
                      sm:mt-12
                      bg-brand-primary
                      hover:bg-brand-brown
                      text-white
                      px-7
                      sm:px-8
                      py-3.5
                      sm:py-4
                      rounded-full
                      font-semibold
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-xl
                    "
                  >
                    Shop Now

                    <FiArrowRight
                      size={18}
                      className="
                        transition-transform
                        duration-300
                      "
                    />
                  </button>
                </>
              ) : (

                /* =================================================
                   SALE ENDED
                ================================================= */

                <div
                  className="
                    min-h-[300px]
                    flex
                    flex-col
                    justify-center
                  "
                >

                  <p
                    className="
                      uppercase
                      tracking-[5px]
                      text-sm
                      font-semibold
                      text-brand-primary
                    "
                  >
                    Orbit Buy
                  </p>

                  <h2
                    className="
                      mt-4
                      text-4xl
                      sm:text-5xl
                      font-serif
                      text-brand-dark
                    "
                  >
                    Flash Sale
                    <span className="text-brand-primary">
                      {" "}is Ended
                    </span>
                  </h2>

                  <p
                    className="
                      mt-5
                      max-w-lg
                      text-gray-600
                      text-base
                      sm:text-lg
                      leading-7
                    "
                  >
                    This limited-time offer has ended. Explore our
                    latest collections and discover new styles from
                    Orbit Buy.
                  </p>

                  {/* SHOP COLLECTION */}

                  <button
                    type="button"
                    onClick={() => navigate("/shop")}
                    className="
                      inline-flex
                      w-fit
                      items-center
                      gap-2
                      mt-8
                      bg-brand-primary
                      hover:bg-brand-brown
                      text-white
                      px-7
                      sm:px-8
                      py-3.5
                      sm:py-4
                      rounded-full
                      font-semibold
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-xl
                    "
                  >
                    Explore Collection

                    <FiArrowRight
                      size={18}
                      className="
                        transition-transform
                        duration-300
                      "
                    />
                  </button>

                </div>
              )}

            </div>
          </div>

          {/* =================================================
              RIGHT IMAGES
          ================================================= */}

          <div
            className="
              hidden
              sm:grid
              grid-cols-2
              gap-5
            "
          >

            {/* MEN'S JACKET */}

            <div
              className="
                rounded-[2rem]
                overflow-hidden
                border-[6px]
                border-gray-50
                shadow-xl
                h-full
                min-h-[320px]
              "
            >
              <img
                src={getImageUrl(
                  "/uploads/products/mensjackets/jacket1.jpg"
                )}
                alt="Orbit Buy men's jacket"
                className="
                  w-full
                  h-full
                  object-cover
                  transition-transform
                  duration-700
                  hover:scale-105
                "
              />
            </div>

            {/* WOMEN'S PARTY WEAR */}

            <div
              className="
                rounded-[2rem]
                overflow-hidden
                border-[6px]
                border-gray-50
                shadow-xl
                h-full
                min-h-[320px]
                mt-8
              "
            >
              <img
                src={getImageUrl(
                  "/uploads/products/womenpartywear/party1.jpg"
                )}
                alt="Orbit Buy women's party wear"
                className="
                  w-full
                  h-full
                  object-cover
                  transition-transform
                  duration-700
                  hover:scale-105
                "
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default FlashSale;