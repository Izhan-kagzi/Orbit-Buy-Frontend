import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiX,
} from "react-icons/fi";
import { toast } from "react-hot-toast";

// =====================================================
// ORBIT BUY POPUP IMAGES
// =====================================================

import womenBanner from "../../assets/featured/womenpopup.jpeg";
import menBanner from "../../assets/featured/menpopup.jpg";
import womenPartyWear from "../../assets/featured/womenpopup2.jpg";
import menJacket from "../../assets/featured/menpopup3.jpg";

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // =====================================================
  // FOUR SLIDER IMAGES
  // =====================================================

  const slides = [
    {
      image: womenBanner,
      title: "Women's Collection",
      subtitle: "Discover your style",
    },
    {
      image: menBanner,
      title: "Men's Collection",
      subtitle: "Elevate your everyday look",
    },
    {
      image: womenPartyWear,
      title: "Party Wear",
      subtitle: "Make every occasion memorable",
    },
    {
      image: menJacket,
      title: "Men's Jackets",
      subtitle: "Modern style. Timeless confidence.",
    },
  ];

  // =====================================================
  // OPEN POPUP EVERY TIME WEBSITE LOADS / REFRESHES
  // =====================================================

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // =====================================================
  // AUTO SLIDER
  // =====================================================

  useEffect(() => {
    if (!isOpen || subscribed) return;

    const sliderTimer = setInterval(() => {
      setCurrentSlide((previous) =>
        previous === slides.length - 1 ? 0 : previous + 1
      );
    }, 3500);

    return () => clearInterval(sliderTimer);
  }, [isOpen, subscribed, slides.length]);

  // =====================================================
  // NEXT SLIDE
  // =====================================================

  const nextSlide = () => {
    setCurrentSlide((previous) =>
      previous === slides.length - 1 ? 0 : previous + 1
    );
  };

  // =====================================================
  // PREVIOUS SLIDE
  // =====================================================

  const previousSlide = () => {
    setCurrentSlide((previous) =>
      previous === 0 ? slides.length - 1 : previous - 1
    );
  };

  // =====================================================
  // CLOSE POPUP
  // =====================================================

  const closePopup = () => {
    setIsOpen(false);
  };

  // =====================================================
  // SUBSCRIBE
  // =====================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      toast.error("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setSubscribed(true);

    toast.success("You're subscribed to Orbit Buy!");

    setTimeout(() => {
      setIsOpen(false);
      setSubscribed(false);
      setEmail("");
      setCurrentSlide(0);
    }, 1800);
  };

  // =====================================================
  // DON'T RENDER WHEN CLOSED
  // =====================================================

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/65
        p-3
        backdrop-blur-sm
        sm:p-5
      "
      onClick={closePopup}
    >
      {/* =================================================
          POPUP CONTAINER
      ================================================= */}

      <div
        className="
          relative
          w-full
          max-w-[1120px]
          max-h-[90vh]
          overflow-hidden
          rounded-[24px]
          bg-white
          shadow-[0_35px_100px_rgba(0,0,0,0.40)]
          animate-newsletter-popup
          sm:rounded-[30px]
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* =================================================
            CLOSE BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={closePopup}
          aria-label="Close newsletter popup"
          className="
            absolute
            right-3
            top-3
            z-[100]
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-[#ff7b8b]
            text-white
            shadow-lg
            transition-all
            duration-300
            hover:scale-110
            hover:bg-[#ff5f73]
            sm:right-5
            sm:top-5
            sm:h-10
            sm:w-10
          "
        >
          <FiX size={19} />
        </button>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div
          className="
            grid
            max-h-[90vh]
            grid-cols-1
            md:grid-cols-[45%_55%]
          "
        >
          {/* =================================================
              LEFT IMAGE SLIDER
          ================================================= */}

          <div
            className="
              relative
              h-[235px]
              overflow-hidden
              bg-black
              sm:h-[300px]
              md:h-[560px]
              lg:h-[600px]
            "
          >
            {/* =================================================
                SLIDES
            ================================================= */}

            {slides.map((slide, index) => (
              <div
                key={index}
                className={`
                  absolute
                  inset-0
                  transition-all
                  duration-700
                  ease-in-out

                  ${
                    currentSlide === index
                      ? "translate-x-0 opacity-100"
                      : index < currentSlide
                      ? "-translate-x-full opacity-0"
                      : "translate-x-full opacity-0"
                  }
                `}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />

                {/* =================================================
                    IMAGE DARK GRADIENT
                ================================================= */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/80
                    via-black/20
                    to-transparent
                  "
                />

                {/* =================================================
                    IMAGE TEXT
                ================================================= */}

                <div
                  className="
                    absolute
                    bottom-9
                    left-5
                    right-5
                    z-20
                    text-white
                    sm:bottom-10
                    sm:left-8
                    sm:right-8
                  "
                >
                  <p
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[3px]
                      text-white/80
                      sm:text-xs
                      sm:tracking-[4px]
                    "
                  >
                    Orbit Buy
                  </p>

                  <h3
                    className="
                      mt-1
                      text-xl
                      font-bold
                      leading-tight
                      sm:mt-2
                      sm:text-3xl
                      md:text-[32px]
                    "
                  >
                    {slide.title}
                  </h3>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-white/80
                      sm:mt-2
                      sm:text-sm
                    "
                  >
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            ))}

            {/* =================================================
                PREVIOUS BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous image"
              className="
                absolute
                left-3
                top-1/2
                z-30
                flex
                h-8
                w-8
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                bg-white/90
                text-[#09335A]
                shadow-lg
                transition-all
                duration-300
                hover:scale-110
                hover:bg-white
                sm:left-5
                sm:h-10
                sm:w-10
              "
            >
              <FiArrowLeft
                size={16}
                className="sm:h-[19px] sm:w-[19px]"
              />
            </button>

            {/* =================================================
                NEXT BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next image"
              className="
                absolute
                right-3
                top-1/2
                z-30
                flex
                h-8
                w-8
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                bg-white/90
                text-[#09335A]
                shadow-lg
                transition-all
                duration-300
                hover:scale-110
                hover:bg-white
                sm:right-5
                sm:h-10
                sm:w-10
              "
            >
              <FiArrowRight
                size={16}
                className="sm:h-[19px] sm:w-[19px]"
              />
            </button>

            {/* =================================================
                FOUR SLIDER DOTS
            ================================================= */}

            <div
              className="
                absolute
                bottom-3
                left-1/2
                z-30
                flex
                -translate-x-1/2
                gap-1.5
                sm:bottom-5
                sm:gap-2
              "
            >
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => setCurrentSlide(index)}
                  className={`
                    h-1.5
                    rounded-full
                    transition-all
                    duration-300
                    sm:h-2

                    ${
                      currentSlide === index
                        ? "w-6 bg-white sm:w-8"
                        : "w-1.5 bg-white/50 hover:bg-white/80 sm:w-2"
                    }
                  `}
                />
              ))}
            </div>

            {/* =================================================
                DESKTOP DIAGONAL WHITE TRANSITION
            ================================================= */}

            <div
              className="
                absolute
                -right-10
                top-0
                z-20
                hidden
                h-full
                w-24
                md:block
              "
            >
              <div
                className="
                  absolute
                  right-0
                  top-[-5%]
                  h-[110%]
                  w-20
                  rotate-[5deg]
                  bg-white
                  [clip-path:polygon(
                    35%_0,
                    100%_0,
                    75%_8%,
                    95%_15%,
                    70%_23%,
                    100%_31%,
                    72%_40%,
                    94%_49%,
                    68%_58%,
                    100%_66%,
                    73%_75%,
                    95%_84%,
                    70%_92%,
                    100%_100%,
                    0_100%,
                    20%_90%,
                    5%_80%,
                    25%_68%,
                    3%_57%,
                    24%_46%,
                    2%_35%,
                    27%_25%,
                    5%_14%,
                    30%_7%
                  )]
                "
              />
            </div>
          </div>

          {/* =================================================
              RIGHT NEWSLETTER CONTENT
          ================================================= */}

          <div
            className="
              max-h-[calc(90vh-235px)]
              overflow-y-auto
              px-5
              py-7
              sm:px-8
              sm:py-9
              md:flex
              md:max-h-none
              md:items-center
              md:overflow-visible
              md:px-12
              md:py-10
              lg:px-16
              lg:py-12
            "
          >
            <div className="mx-auto w-full max-w-[500px]">

              {/* =================================================
                  BRAND
              ================================================= */}

              <p
                className="
                  mb-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[4px]
                  text-[#09335A]
                  sm:mb-4
                  sm:text-xs
                  sm:tracking-[5px]
                "
              >
                Orbit Buy
              </p>

              {/* =================================================
                  TITLE
              ================================================= */}

              <h2
                className="
                  text-[25px]
                  font-extrabold
                  leading-[1.08]
                  tracking-[-0.5px]
                  text-[#263238]
                  sm:text-3xl
                  md:text-[42px]
                  lg:text-[46px]
                "
              >
                Subscribe
                <br />
                Newsletter.
              </h2>

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <p
                className="
                  mt-3
                  max-w-[500px]
                  text-sm
                  leading-6
                  text-gray-500
                  sm:mt-5
                  sm:text-base
                  sm:leading-7
                  md:text-[17px]
                  md:leading-8
                "
              >
                Subscribe to the{" "}
                <span className="font-bold text-[#263238]">
                  Orbit Buy
                </span>{" "}
                newsletter to get the latest products, exclusive offers and
                fashion updates.
              </p>

              {/* =================================================
                  SUCCESS STATE
              ================================================= */}

              {subscribed ? (
                <div
                  className="
                    mt-6
                    rounded-2xl
                    border
                    border-green-100
                    bg-green-50
                    p-5
                    text-center
                    sm:mt-8
                    sm:p-7
                  "
                >
                  <div
                    className="
                      mx-auto
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      bg-green-100
                      text-green-600
                      sm:h-14
                      sm:w-14
                    "
                  >
                    <FiCheck size={25} />
                  </div>

                  <h3
                    className="
                      mt-3
                      text-lg
                      font-bold
                      text-gray-800
                      sm:mt-4
                      sm:text-xl
                    "
                  >
                    You're Subscribed!
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Welcome to the Orbit Buy family.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="mt-5 sm:mt-8"
                >
                  {/* =================================================
                      EMAIL INPUT
                  ================================================= */}

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    aria-label="Email Address"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      px-4
                      py-3.5
                      text-sm
                      text-gray-800
                      outline-none
                      transition-all
                      duration-300
                      placeholder:text-gray-400
                      focus:border-[#09335A]
                      focus:ring-4
                      focus:ring-[#09335A]/10
                      sm:px-5
                      sm:py-4
                      sm:text-base
                    "
                  />

                  {/* =================================================
                      SUBSCRIBE BUTTON
                  ================================================= */}

                  <button
                    type="submit"
                    className="
                      group
                      mt-3
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-[#202124]
                      px-6
                      py-3.5
                      text-xs
                      font-bold
                      uppercase
                      tracking-wide
                      text-white
                      shadow-lg
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:bg-[#09335A]
                      hover:shadow-xl
                      sm:mt-5
                      sm:py-4
                      sm:text-sm
                    "
                  >
                    Subscribe

                    <FiArrowRight
                      size={17}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    />
                  </button>
                </form>
              )}

              {/* =================================================
                  BENEFITS
              ================================================= */}

              {!subscribed && (
                <>
                  <div
                    className="
                      mt-5
                      grid
                      grid-cols-3
                      gap-1
                      border-t
                      border-gray-100
                      pt-4
                      sm:mt-7
                      sm:gap-3
                      sm:pt-6
                    "
                  >
                    {/* NEW ARRIVALS */}

                    <div className="text-center">
                      <p
                        className="
                          text-base
                          font-bold
                          text-[#09335A]
                          sm:text-lg
                        "
                      >
                        ✦
                      </p>

                      <p
                        className="
                          mt-1
                          text-[9px]
                          font-semibold
                          leading-tight
                          text-gray-500
                          sm:text-[11px]
                        "
                      >
                        New Arrivals
                      </p>
                    </div>

                    {/* EXCLUSIVE OFFERS */}

                    <div
                      className="
                        border-x
                        border-gray-100
                        text-center
                      "
                    >
                      <p
                        className="
                          text-base
                          font-bold
                          text-[#09335A]
                          sm:text-lg
                        "
                      >
                        ✦
                      </p>

                      <p
                        className="
                          mt-1
                          text-[9px]
                          font-semibold
                          leading-tight
                          text-gray-500
                          sm:text-[11px]
                        "
                      >
                        Exclusive Offers
                      </p>
                    </div>

                    {/* FASHION UPDATES */}

                    <div className="text-center">
                      <p
                        className="
                          text-base
                          font-bold
                          text-[#09335A]
                          sm:text-lg
                        "
                      >
                        ✦
                      </p>

                      <p
                        className="
                          mt-1
                          text-[9px]
                          font-semibold
                          leading-tight
                          text-gray-500
                          sm:text-[11px]
                        "
                      >
                        Fashion Updates
                      </p>
                    </div>
                  </div>

                  {/* =================================================
                      PRIVACY TEXT
                  ================================================= */}

                  <p
                    className="
                      mt-3
                      text-center
                      text-[10px]
                      leading-4
                      text-gray-400
                      sm:mt-5
                      sm:text-xs
                      sm:leading-5
                    "
                  >
                    No spam. Just premium fashion, new arrivals and
                    exclusive offers from Orbit Buy.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;