import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

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

const FAQItem = ({ faq, isOpen, onClick }) => (
  <div className="border-b border-gray-200 py-5">
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between text-left gap-4"
    >
      <span className="font-semibold text-lg">{faq.q}</span>
      <FiChevronDown
        className={`text-xl shrink-0 transition-transform duration-300 ${
          isOpen ? "rotate-180 text-brand-primary" : "text-gray-400"
        }`}
      />
    </button>

    <div
      className={`grid transition-all duration-300 ease-in-out ${
        isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
      }`}
      style={{ display: "grid" }}
    >
      <div className="overflow-hidden">
        <p className="text-gray-600 leading-relaxed">{faq.a}</p>
      </div>
    </div>
  </div>
);

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white py-16">
      <div className="max-w-3xl mx-auto px-6">

        <p className="uppercase tracking-[6px] text-brand-primary font-semibold text-center">
          Orbit Buy
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-center mt-3">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-500 text-center mt-4">
          Everything you need to know about shopping with us.
        </p>

        <div className="mt-14">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.q}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() =>
                setOpenIndex((prev) => (prev === index ? -1 : index))
              }
            />
          ))}
        </div>

        <div className="mt-14 p-6 rounded-2xl bg-brand-tan/20 text-center">
          <p className="text-gray-700">
            Still have questions? Reach out at{" "}
            <span className="font-semibold text-brand-primary">
              support@orbitbuy.com
            </span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default FAQs;
