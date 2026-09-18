import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import api, { getImageUrl } from "../../services/api";

// =====================================================
// GET TIME LEFT
// =====================================================

function getTimeLeft(targetTime) {
  if (!targetTime) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const diff = Math.max(
    0,
    new Date(targetTime).getTime() - Date.now()
  );

  return {
    days: Math.floor(
      diff / (1000 * 60 * 60 * 24)
    ),

    hours: Math.floor(
      (diff / (1000 * 60 * 60)) % 24
    ),

    minutes: Math.floor(
      (diff / (1000 * 60)) % 60
    ),

    seconds: Math.floor(
      (diff / 1000) % 60
    ),
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
  // FLASH SALE DATA
  // ===================================================

  const [sale, setSale] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saleStatus, setSaleStatus] =
    useState("inactive");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // ===================================================
  // FETCH FLASH SALE FROM BACKEND
  // ===================================================

  useEffect(() => {
    let mounted = true;

    const fetchFlashSale = async () => {
      try {
        // Public endpoint — returns the sale running right now,
        // or the next upcoming one, or null when none is set up.
        const data = await api.get("/flash-sale", {
          auth: false,
        });

        if (!mounted) return;

        const flashSale =
          data?.flashSale || null;

        setSale(flashSale);

        setSaleStatus(
          flashSale?.status ||
            "inactive"
        );
      } catch (error) {
        console.error(
          "Flash Sale loading error:",
          error
        );

        if (!mounted) return;

        setSale(null);
        setSaleStatus("inactive");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchFlashSale();

    return () => {
      mounted = false;
    };
  }, []);

  // ===================================================
  // COUNTDOWN
  // ===================================================

  useEffect(() => {
    if (!sale || !sale.active) {
      return undefined;
    }

    const updateTimer = () => {
      const now = Date.now();

      const startTime = sale.startTime
        ? new Date(
            sale.startTime
          ).getTime()
        : null;

      const endTime = sale.endTime
        ? new Date(
            sale.endTime
          ).getTime()
        : null;

      // -----------------------------------------------
      // UPCOMING
      // -----------------------------------------------

      if (
        startTime &&
        now < startTime
      ) {
        setSaleStatus("upcoming");

        setTimeLeft(
          getTimeLeft(
            sale.startTime
          )
        );

        return;
      }

      // -----------------------------------------------
      // ACTIVE
      // -----------------------------------------------

      if (
        endTime &&
        now < endTime
      ) {
        setSaleStatus("active");

        setTimeLeft(
          getTimeLeft(
            sale.endTime
          )
        );

        return;
      }

      // -----------------------------------------------
      // NO END TIME
      // -----------------------------------------------

      if (!endTime) {
        setSaleStatus("active");

        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        return;
      }

      // -----------------------------------------------
      // ENDED
      // -----------------------------------------------

      setSaleStatus("ended");

      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    };

    updateTimer();

    const interval = setInterval(
      updateTimer,
      1000
    );

    return () => {
      clearInterval(interval);
    };
  }, [sale]);

  // ===================================================
  // LOADING
  // Don't create layout shift while API loads.
  // ===================================================

  if (loading) {
    return null;
  }

  // ===================================================
  // NO ACTIVE / UPCOMING / ENDED SALE
  // ===================================================

  if (
    !sale ||
    !sale.active ||
    saleStatus === "inactive"
  ) {
    return null;
  }

  // ===================================================
  // SALE IMAGES
  // ===================================================

  const saleImages =
    Array.isArray(sale.images)
      ? sale.images
      : [];

  // ===================================================
  // UPCOMING SALE
  // ===================================================

  if (saleStatus === "upcoming") {
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
                LEFT CARD
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

              <div className="relative z-10">
                <p
                  className="
                    uppercase
                    tracking-[4px]
                    text-xs
                    sm:text-sm
                    font-semibold
                    text-brand-primary
                  "
                >
                  Coming Soon
                </p>

                <h2
                  className="
                    mt-3
                    text-4xl
                    sm:text-5xl
                    font-serif
                    text-brand-dark
                  "
                >
                  {sale.title ||
                    "Flash Sale!"}
                </h2>

                <p
                  className="
                    mt-4
                    text-gray-600
                    text-base
                    sm:text-lg
                  "
                >
                  {sale.description ||
                    "Up to 30% off - Limited Time Offer!"}
                </p>

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
              {saleImages
                .slice(0, 2)
                .map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className={`
                      rounded-[2rem]
                      overflow-hidden
                      border-[6px]
                      border-gray-50
                      shadow-xl
                      h-full
                      min-h-[320px]
                      ${
                        index === 1
                          ? "mt-8"
                          : ""
                      }
                    `}
                  >
                    <img
                      src={getImageUrl(image)}
                      alt={`Orbit Buy Flash Sale ${
                        index + 1
                      }`}
                      className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-700
                        hover:scale-105
                      "
                      loading="lazy"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ===================================================
  // SALE ENDED
  // ===================================================

  if (saleStatus === "ended") {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
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

            <div
              className="
                relative
                z-10
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
                {sale.title ||
                  "Flash Sale"}

                <span className="text-brand-primary">
                  {" "}
                  is Ended
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
                This limited-time offer has
                ended. Explore our latest
                collections and discover new
                styles from Orbit Buy.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/shop")
                }
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
          </div>
        </div>
      </section>
    );
  }

  // ===================================================
  // ACTIVE SALE
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
              {/* TITLE */}

              <h2
                className="
                  text-4xl
                  sm:text-5xl
                  font-serif
                  text-brand-dark
                "
              >
                {sale.title ||
                  "Flash Sale!"}
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
                {sale.description ||
                  "Up to 30% off - Limited Time Offer!"}
              </p>

              {/* COUNTDOWN */}

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
                onClick={() =>
                  navigate("/sale")
                }
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
            {saleImages
              .slice(0, 2)
              .map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className={`
                    rounded-[2rem]
                    overflow-hidden
                    border-[6px]
                    border-gray-50
                    shadow-xl
                    h-full
                    min-h-[320px]
                    ${
                      index === 1
                        ? "mt-8"
                        : ""
                    }
                  `}
                >
                  <img
                    src={getImageUrl(image)}
                    alt={`Orbit Buy Flash Sale ${
                      index + 1
                    }`}
                    className="
                      w-full
                      h-full
                      object-cover
                      transition-transform
                      duration-700
                      hover:scale-105
                    "
                    loading="lazy"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSale;