const sections = [
  {
    title: "Using Our Site",
    body: "By creating an account or placing an order on Orbit Buy, you agree to these terms. You must be at least 18 years old, or have a parent/guardian's permission, to make a purchase.",
  },
  {
    title: "Account Responsibility",
    body: "You're responsible for keeping your account credentials secure. Let us know immediately if you suspect unauthorized access to your account.",
  },
  {
    title: "Product Information & Pricing",
    body: "We do our best to display accurate product details, images, and pricing. Occasionally, errors may occur — if a product's price is listed incorrectly, we'll contact you before processing the order.",
  },
  {
    title: "Orders & Payment",
    body: "Placing an order is an offer to purchase, which we may accept or decline. Orders are confirmed once payment is verified. Prices include applicable taxes as shown at checkout.",
  },
  {
    title: "Shipping & Delivery",
    body: "Delivery timelines shown at checkout are estimates. Orders over ₹999 qualify for free shipping; a flat shipping charge applies below that threshold.",
  },
  {
    title: "Returns & Refunds",
    body: "Unused items in original packaging can be returned within a reasonable window of delivery. Refunds are processed to the original payment method once the return is received and inspected.",
  },
  {
    title: "Intellectual Property",
    body: "All content on this site — including logos, product photography, and text — belongs to Orbit Buy or its licensors and may not be reused without permission.",
  },
  {
    title: "Limitation of Liability",
    body: "Orbit Buy is not liable for indirect or incidental damages arising from the use of this site, to the extent permitted by law.",
  },
];

const TermsConditions = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-6">

        <p className="uppercase tracking-[6px] text-brand-primary font-semibold text-center">
          Orbit Buy
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-center mt-3">
          Terms &amp; Conditions
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
            Questions about these terms? Reach out at{" "}
            <span className="font-semibold text-brand-primary">
              support@orbitbuy.com
            </span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default TermsConditions;
