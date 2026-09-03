const sections = [
  {
    title: "Information We Collect",
    body: "When you create an account, place an order, or contact us, we collect information such as your name, email address, phone number, shipping address, and payment preferences. We also collect basic usage data — like pages visited and items viewed — to improve your shopping experience.",
  },
  {
    title: "How We Use Your Information",
    body: "We use your information to process orders, manage your account, provide customer support, and send you order updates. With your consent, we may also send promotional emails about new arrivals, sales, and offers — you can opt out at any time.",
  },
  {
    title: "Payment Information",
    body: "We do not store your full card details on our servers. Payments are processed securely, and card information is handled directly by our payment partners in line with industry security standards.",
  },
  {
    title: "Cookies",
    body: "We use cookies to keep you logged in, remember items in your cart, and understand how you use our site. You can disable cookies in your browser settings, though some features may not work as expected.",
  },
  {
    title: "Sharing Your Information",
    body: "We don't sell your personal information. We share only what's necessary with delivery partners to fulfill your orders, and with payment processors to complete transactions securely.",
  },
  {
    title: "Your Rights",
    body: "You can access, update, or request deletion of your personal information at any time from your account settings, or by contacting our support team.",
  },
  {
    title: "Changes to This Policy",
    body: "We may update this policy from time to time. Significant changes will be communicated through the site or via email.",
  },
];

const PrivacyPolicy = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-6">

        <p className="uppercase tracking-[6px] text-brand-primary font-semibold text-center">
          Orbit Buy
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-center mt-3">
          Privacy Policy
        </h1>
        <p className="text-gray-500 text-center mt-4">
          Last updated: January 2026
        </p>

        <div className="mt-14 space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-bold mb-3">{section.title}</h2>
              <p className="text-gray-600 leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 p-6 rounded-2xl bg-brand-tan/20 text-center">
          <p className="text-gray-700">
            Questions about your data? Reach out at{" "}
            <span className="font-semibold text-brand-primary">
              support@orbitbuy.com
            </span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default PrivacyPolicy;
