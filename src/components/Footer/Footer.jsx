import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowRight,
  FiSend,
} from "react-icons/fi";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    toast.success("You're subscribed! Watch for our next drop.");
    setEmail("");
  };

  return (
    <footer className="bg-brand-dark text-gray-300">

      {/* ================= CTA ================= */}

      <div className="max-w-7xl mx-auto px-6 -translate-y-12">

       

          

          <div className="flex flex-wrap justify-center gap-4 shrink-0">

            
            

          </div>

        </div>

      


      {/* ================= NEWSLETTER ================= */}

      <div className="border-b border-white/10">

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            py-8
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-6
          "
        >

          <div>

            <p className="text-white font-serif text-xl">
              Never miss a drop
            </p>

            <p className="text-gray-400 text-sm mt-1">
              New arrivals, exclusive offers, straight to your inbox.
            </p>

          </div>

          <form
            onSubmit={handleSubscribe}
            className="flex w-full md:w-auto gap-3"
          >

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="
                flex-1
                md:w-72
                px-5
                py-3
                rounded-full
                bg-white/5
                border
                border-white/15
                text-white
                placeholder:text-gray-500
                outline-none
                focus:border-brand-tan
                transition
              "
            />

            <button
              type="submit"
              className="
                shrink-0
                inline-flex
                items-center
                gap-2
                bg-brand-tan
                text-brand-dark
                px-6
                py-3
                rounded-full
                font-semibold
                hover:bg-white
                transition
              "
            >
              <FiSend size={15} />

              <span className="hidden sm:inline">
                Subscribe
              </span>
            </button>

          </form>

        </div>

      </div>


      {/* ================= MAIN FOOTER ================= */}

      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          py-16
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-5
          gap-12
        "
      >

        {/* ================= BRAND ================= */}

        <div>

          <h2 className="font-logo text-4xl text-white mb-5">
            Orbit Buy
          </h2>

          <p className="text-gray-400 leading-7 mb-6">
            Premium men's and women's fashion designed for modern
            lifestyles. Quality fabrics, considered pricing, and a
            shopping experience you can trust.
          </p>

          <div className="flex gap-4 text-xl">

            <a
              href="#"
              className="hover:text-brand-tan transition"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="hover:text-brand-tan transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="hover:text-brand-tan transition"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              className="hover:text-brand-tan transition"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>

          </div>

        </div>


        {/* ================= MEN ================= */}

        <div>

          <h3 className="text-white uppercase tracking-widest text-sm mb-6 font-semibold">
            Men's Collection
          </h3>

          <ul className="space-y-3">

            <li>
              <Link
                to="/mens-shirts"
                className="hover:text-brand-tan transition"
              >
                Shirts
              </Link>
            </li>

            <li>
              <Link
                to="/mens-tshirts"
                className="hover:text-brand-tan transition"
              >
                T-Shirts
              </Link>
            </li>

            <li>
              <Link
                to="/mens-jeans"
                className="hover:text-brand-tan transition"
              >
                Jeans
              </Link>
            </li>

            <li>
              <Link
                to="/mens-trackpants"
                className="hover:text-brand-tan transition"
              >
                Track Pants
              </Link>
            </li>

            <li>
              <Link
                to="/mens-hoodies"
                className="hover:text-brand-tan transition"
              >
                Hoodies
              </Link>
            </li>

            <li>
              <Link
                to="/mens-jackets"
                className="hover:text-brand-tan transition"
              >
                Jackets
              </Link>
            </li>

          </ul>

        </div>


        {/* ================= WOMEN ================= */}

        <div>

          <h3 className="text-white uppercase tracking-widest text-sm mb-6 font-semibold">
            Women's Collection
          </h3>

          <ul className="space-y-3">

            <li>
              <Link
                to="/women-dresses"
                className="hover:text-brand-tan transition"
              >
                Dresses
              </Link>
            </li>

            <li>
              <Link
                to="/women-shirts"
                className="hover:text-brand-tan transition"
              >
                Shirts
              </Link>
            </li>

            <li>
              <Link
                to="/women-formals"
                className="hover:text-brand-tan transition"
              >
                Formal Wear
              </Link>
            </li>

            <li>
              <Link
                to="/women-partywear"
                className="hover:text-brand-tan transition"
              >
                Party Wear
              </Link>
            </li>

            <li>
              <Link
                to="/women-jeans"
                className="hover:text-brand-tan transition"
              >
                Jeans
              </Link>
            </li>

            <li>
              <Link
                to="/women-cordset"
                className="hover:text-brand-tan transition"
              >
                Cord Set
              </Link>
            </li>

            <li>
              <Link
                to="/women-skirts"
                className="hover:text-brand-tan transition"
              >
                Skirts
              </Link>
            </li>

            <li>
              <Link
                to="/women-jumpsuits"
                className="hover:text-brand-tan transition"
              >
                Jumpsuits
              </Link>
            </li>

          </ul>

        </div>


        {/* ================= COMPANY ================= */}

        <div>

          <h3 className="text-white uppercase tracking-widest text-sm mb-6 font-semibold">
            Company
          </h3>

          <ul className="space-y-3">

            <li>
              <Link
                to="/about"
                className="hover:text-brand-tan transition"
              >
                About Us
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="hover:text-brand-tan transition"
              >
                Contact
              </Link>
            </li>

            <li>
              <Link
                to="/privacy-policy"
                className="hover:text-brand-tan transition"
              >
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link
                to="/terms-conditions"
                className="hover:text-brand-tan transition"
              >
                Terms & Conditions
              </Link>
            </li>

            <li>
              <Link
                to="/faqs"
                className="hover:text-brand-tan transition"
              >
                FAQs
              </Link>
            </li>

          </ul>

        </div>


        {/* ================= CONTACT ================= */}

        <div>

          <h3 className="text-white uppercase tracking-widest text-sm mb-6 font-semibold">
            Contact
          </h3>

          <div className="space-y-5">

            <div className="flex gap-3">

              <FiMapPin className="text-brand-tan mt-1 shrink-0" />

              <span>
                Surat, Gujarat, India
              </span>

            </div>

            <div className="flex gap-3">

              <FiPhone className="text-brand-tan mt-1 shrink-0" />

              <span>
                +91 9878*******
              </span>

            </div>

            <div className="flex gap-3">

              <FiMail className="text-brand-tan mt-1 shrink-0" />

              <span>
                support@orbitbuy.com
              </span>

            </div>

            <a
              href="https://wa.me/919879361093"
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex
                items-center
                gap-3
                bg-green-600
                hover:bg-green-700
                transition
                px-5
                py-3
                rounded-full
                text-white
                mt-4
              "
            >
              <FaWhatsapp />
              Chat on WhatsApp
            </a>

          </div>

        </div>

      </div>


      {/* ================= BOTTOM ================= */}

      <div className="border-t border-white/10">

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            py-6
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-4
            text-sm
            text-gray-400
          "
        >

          <span>
            © {new Date().getFullYear()}{" "}
            <strong className="text-gray-300">
              Orbit Buy
            </strong>
            . All Rights Reserved.
          </span>

          <div className="flex items-center gap-2 text-xs tracking-wide uppercase text-gray-500">

            <span className="px-3 py-1 rounded border border-white/10">
              Visa
            </span>

            <span className="px-3 py-1 rounded border border-white/10">
              Mastercard
            </span>

            <span className="px-3 py-1 rounded border border-white/10">
              UPI
            </span>

            <span className="px-3 py-1 rounded border border-white/10">
              COD
            </span>

          </div>

          <span>
            Design &amp; Developed by Izhan Kagzi
          </span>

        </div>

      </div>

    </footer>
  );
};

export default Footer;