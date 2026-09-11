import {
  FiInstagram,
  FiArrowUpRight,
} from "react-icons/fi";

import tshirt10 from "../../assets/instagram/tshirt10.jpg";
import tshirt11 from "../../assets/instagram/tshirt11.jpg";
import tshirt12 from "../../assets/instagram/tshirt12.jpg";

import hoodie1 from "../../assets/instagram/hoodie1.jpg";
import hoodie2 from "../../assets/instagram/hoodie2.jpg";
import hoodie3 from "../../assets/instagram/hoodie3.jpg";

import dress7 from "../../assets/instagram/dress7.jpg";
import dress9 from "../../assets/instagram/dress9.png";

import party2 from "../../assets/instagram/party2.jpg";

import corset8 from "../../assets/instagram/cordset8.jpg";
import corset9 from "../../assets/instagram/cordset9.jpg";
import corset10 from "../../assets/instagram/cordset10.jpg";


const Instagram = () => {
  const fashionImages = [
    {
      image: tshirt10,
      category: "T-Shirts",
    },
    {
      image: tshirt11,
      category: "T-Shirts",
    },
    {
      image: tshirt12,
      category: "T-Shirts",
    },
    {
      image: hoodie1,
      category: "Hoodies",
    },
    {
      image: hoodie2,
      category: "Hoodies",
    },
    {
      image: hoodie3,
      category: "Hoodies",
    },
    {
      image: dress7,
      category: "Women's Fashion",
    },
    {
      image: dress9,
      category: "Women's Fashion",
    },
    {
      image: party2,
      category: "Fashion",
    },
    {
      image: corset8,
      category: "Women's Fashion",
    },
    {
      image: corset9,
      category: "Women's Fashion",
    },
    {
      image: corset10,
      category: "Women's Fashion",
    },
  ];

  return (
    <section
      id="orbit-instagram"
      aria-labelledby="orbit-instagram-title"
      className="py-20 md:py-24 bg-white"
    >
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* =========================
            HEADER
        ========================== */}
        <div className="text-center mb-12">

          <div className="flex items-center justify-center gap-2 mb-4">
            <FiInstagram className="text-xl" />

            <span className="text-sm font-medium uppercase tracking-[0.3em] text-gray-500">
              Follow Us On Instagram
            </span>
          </div>

          <h2
            id="orbit-instagram-title"
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900"
          >
            The Orbit Fashion
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-gray-500 text-sm sm:text-base leading-relaxed">
            Explore the latest fashion inspiration from Orbit Buy —
            contemporary styles, statement pieces and timeless looks.
          </p>

        </div>


        {/* =========================
            FASHION GALLERY
        ========================== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4">

          {fashionImages.map((item, index) => (
            <a
              key={index}
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-xl bg-gray-100 aspect-[3/4]"
            >

              {/* Image */}
              <img
                src={item.image}
                alt={`${item.category} fashion look ${index + 1}`}
                loading="lazy"
                className="
                  w-full
                  h-full
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-110
                "
              />

              {/* Dark hover overlay */}
              <div
                className="
                  absolute
                  inset-0
                  bg-black/0
                  group-hover:bg-black/35
                  transition-all
                  duration-500
                "
              />

              {/* Instagram icon */}
              <div
                className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  opacity-0
                  group-hover:opacity-100
                  transition-all
                  duration-500
                "
              >
                <div
                  className="
                    w-12
                    h-12
                    rounded-full
                    bg-white/95
                    flex
                    items-center
                    justify-center
                    shadow-xl
                    scale-75
                    group-hover:scale-100
                    transition-transform
                    duration-500
                  "
                >
                  <FiInstagram className="text-xl text-black" />
                </div>
              </div>

              {/* Category */}
              <div
                className="
                  absolute
                  left-3
                  bottom-3
                  px-3
                  py-1.5
                  rounded-full
                  bg-white/90
                  backdrop-blur-sm
                  text-xs
                  font-medium
                  text-gray-900
                  opacity-0
                  translate-y-2
                  group-hover:opacity-100
                  group-hover:translate-y-0
                  transition-all
                  duration-500
                "
              >
                {item.category}
              </div>

            </a>
          ))}

        </div>


        {/* =========================
            INSTAGRAM BUTTON
        ========================== */}
        <div className="flex justify-center mt-12">

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              gap-3
              px-7
              py-3.5
              rounded-full
              border
              border-gray-900
              text-gray-900
              text-sm
              font-medium
              hover:bg-gray-900
              hover:text-white
              transition-all
              duration-300
              group
            "
          >
            <FiInstagram className="text-lg" />

            <span>
              Follow us on Instagram
            </span>

            <FiArrowUpRight
              className="
                text-lg
                transition-transform
                duration-300
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />

          </a>

        </div>

      </div>
    </section>
  );
};

export default Instagram;