import { useState } from "react";
import {
  FiArrowUpRight,
  FiChevronDown,
  FiHelpCircle,
  FiMail,
  FiMessageCircle,
  FiSearch,
  FiShield,
  FiTruck,
} from "react-icons/fi";

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Most orders arrive within 3-7 business days depending on your location. You'll get a confirmation once your order is placed, and can track its status from My Orders.",
  },
  {
    q: "Is shipping free?",
    a: "Yes — orders over ₹999 ship free. Orders below that have a flat ₹99 shipping charge, shown clearly at checkout before you pay.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We support Cash on Delivery, Credit/Debit cards, UPI, and Net Banking.",
  },
  {
    q: "Can I return or exchange an item?",
    a: "Yes, unused items in original packaging can be returned within a reasonable window after delivery. Head to My Orders and select the order you'd like to return.",
  },
  {
    q: "How do I track my order?",
    a: "Log in and go to My Orders — you'll see the status and details of every order you've placed.",
  },
  {
    q: "Do you have a size guide?",
    a: "Each product page lists the available sizes. If you're between sizes, we generally recommend sizing up for a more relaxed fit.",
  },
  {
    q: "How do I apply a coupon code?",
    a: "Enter your coupon code in the Coupon field at checkout and click Apply — the discount will reflect immediately in your order total.",
  },
  {
    q: "How can I contact support?",
    a: "Reach out anytime through our Contact page, or email us directly at support@orbitbuy.com.",
  },
];

const FAQItem = ({ faq, index, isOpen, onClick }) => {
  return (
    <article
      className={`group relative overflow-hidden rounded-[24px] border transition-all duration-500 ${
        isOpen
          ? "border-gray-300 bg-white shadow-[0_18px_55px_rgba(0,0,0,0.07)]"
          : "border-gray-200/80 bg-white hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.045)]"
      }`}
    >
      {/* Active accent */}
      <div
        className={`absolute left-0 top-0 h-full w-1 origin-top bg-gradient-to-b from-brand-primary to-brand-brown transition-transform duration-500 ${
          isOpen ? "scale-y-100" : "scale-y-0"
        }`}
      />

      <button
        type="button"
        onClick={onClick}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-4 p-5 text-left sm:gap-6 sm:p-7"
      >
        {/* Number */}
        <span
          className={`hidden shrink-0 font-serif text-lg italic transition-colors duration-300 sm:block ${
            isOpen ? "text-brand-primary/60" : "text-gray-300"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Question icon */}
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-500 ${
            isOpen
              ? "bg-brand-dark text-brand-tan"
              : "bg-gray-50 text-gray-500 group-hover:bg-brand-dark group-hover:text-brand-tan"
          }`}
        >
          <FiHelpCircle size={19} />
        </div>

        {/* Question */}
        <span
          className={`flex-1 pr-2 font-semibold leading-6 transition-colors duration-300 sm:text-lg ${
            isOpen ? "text-brand-dark" : "text-gray-800"
          }`}
        >
          {faq.q}
        </span>

        {/* Arrow */}
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
            isOpen
              ? "rotate-180 border-brand-primary bg-brand-primary text-white"
              : "border-gray-200 bg-white text-gray-400 group-hover:border-gray-300 group-hover:text-brand-dark"
          }`}
        >
          <FiChevronDown size={17} />
        </span>
      </button>

      {/* Answer */}
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-6 sm:px-7 sm:pb-7">
            <div className="ml-0 border-l border-gray-200 pl-5 sm:ml-[102px] sm:pl-6">
              <p className="max-w-3xl text-sm leading-7 text-gray-500 sm:text-base sm:leading-8">
                {faq.a}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle glow */}
      <div
        className={`pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-brand-primary/5 blur-3xl transition-all duration-700 ${
          isOpen ? "scale-150 opacity-100" : "opacity-0"
        }`}
      />
    </article>
  );
};

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [search, setSearch] = useState("");

  const filteredFaqs = faqs.filter((faq) => {
    const query = search.trim().toLowerCase();

    if (!query) return true;

    return (
      faq.q.toLowerCase().includes(query) ||
      faq.a.toLowerCase().includes(query)
    );
  });

  return (
    <main className="min-h-screen bg-[#fafafa] text-brand-dark">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-brand-dark">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-brand-primary/20 blur-[110px]" />

          <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-brand-brown/20 blur-[120px]" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            {/* Eyebrow */}
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-brand-tan/60 sm:w-12" />

              <span className="text-[10px] font-semibold uppercase tracking-[5px] text-brand-tan sm:text-xs">
                Orbit Buy
              </span>

              <span className="h-px w-8 bg-brand-tan/60 sm:w-12" />
            </div>

            {/* Heading */}
            <h1 className="font-serif text-4xl leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Frequently Asked
              <span className="ml-2 italic text-brand-tan">Questions</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base sm:leading-8">
              Everything you need to know about shopping, delivery, payments,
              returns, and your Orbit Buy experience.
            </p>

            {/* Search */}
            <div className="relative mx-auto mt-9 max-w-xl">
              <FiSearch
                size={19}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search your question..."
                className="h-14 w-full rounded-full border border-white/10 bg-white/10 pl-13 pr-5 text-sm text-white outline-none backdrop-blur-md transition-all placeholder:text-gray-400 focus:border-brand-tan/50 focus:bg-white/[0.13] focus:ring-2 focus:ring-brand-tan/10"
              />
            </div>
          </div>
        </div>

        {/* Curve */}
        <div className="absolute bottom-0 left-0 right-0 h-8 rounded-t-[50%] bg-[#fafafa]" />
      </section>

      {/* =========================================================
          CONTENT
      ========================================================= */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          {/* Quick benefits */}
          <div className="mb-14 grid gap-4 sm:grid-cols-3">
            <div className="group rounded-[22px] border border-gray-200 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-brand-primary transition-colors group-hover:bg-brand-dark group-hover:text-brand-tan">
                  <FiTruck size={19} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-brand-dark">
                    Fast Delivery
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    3–7 business days
                  </p>
                </div>
              </div>
            </div>

            <div className="group rounded-[22px] border border-gray-200 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-brand-primary transition-colors group-hover:bg-brand-dark group-hover:text-brand-tan">
                  <FiShield size={19} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-brand-dark">
                    Secure Payments
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Safe & reliable checkout
                  </p>
                </div>
              </div>
            </div>

            <div className="group rounded-[22px] border border-gray-200 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-brand-primary transition-colors group-hover:bg-brand-dark group-hover:text-brand-tan">
                  <FiMessageCircle size={19} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-brand-dark">
                    Customer Support
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    We're here to help
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ heading */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[3px] text-brand-primary">
                Help Center
              </p>

              <h2 className="mt-2 font-serif text-3xl text-brand-dark sm:text-4xl">
                How can we help?
              </h2>
            </div>

            <p className="text-sm text-gray-400">
              {filteredFaqs.length}{" "}
              {filteredFaqs.length === 1 ? "question" : "questions"}
            </p>
          </div>

          {/* FAQ list */}
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const originalIndex = faqs.findIndex(
                  (item) => item.q === faq.q
                );

                return (
                  <FAQItem
                    key={faq.q}
                    faq={faq}
                    index={originalIndex}
                    isOpen={openIndex === originalIndex}
                    onClick={() =>
                      setOpenIndex((prev) =>
                        prev === originalIndex ? -1 : originalIndex
                      )
                    }
                  />
                );
              })
            ) : (
              <div className="rounded-[28px] border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
                  <FiSearch size={22} />
                </div>

                <h3 className="mt-5 font-serif text-2xl text-brand-dark">
                  No questions found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-gray-400">
                  Try searching with a different keyword or contact our
                  support team directly.
                </p>

                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-6 rounded-full bg-brand-dark px-6 py-3 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-primary"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>

          {/* =====================================================
              SUPPORT CTA
          ===================================================== */}
          <div className="relative mt-16 overflow-hidden rounded-[32px] bg-brand-dark p-7 text-white shadow-[0_25px_70px_rgba(0,0,0,0.12)] sm:p-10 lg:p-12">
            {/* Decorative rings */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/5" />

            <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full border border-white/5" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-brand-tan">
                  <FiMail size={21} />
                </div>

                <p className="text-xs font-semibold uppercase tracking-[3px] text-brand-tan">
                  Still need help?
                </p>

                <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                  We're here for you.
                </h2>

                <p className="mt-4 text-sm leading-7 text-gray-300 sm:text-base sm:leading-8">
                  Can't find the answer you're looking for? Our support team
                  will be happy to help you with your order or shopping
                  experience.
                </p>
              </div>

              <a
                href="mailto:support@orbitbuy.com"
                className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-brand-dark transition-all duration-300 hover:-translate-y-1 hover:bg-brand-tan hover:shadow-xl"
              >
                <span>Contact Support</span>

                <FiArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </div>

          {/* Bottom trust note */}
          <div className="mt-10 flex items-center justify-center gap-3 text-center">
            <FiHelpCircle size={16} className="text-brand-primary" />

            <p className="text-xs uppercase tracking-[2px] text-gray-400">
              Can't find what you're looking for? We're happy to help.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FAQs;