import {
  FiArrowUpRight,
  FiCheckCircle,
  FiChevronRight,
  FiClock,
  FiFileText,
  FiLock,
  FiMail,
  FiShield,
} from "react-icons/fi";

const sections = [
  {
    number: "01",
    title: "Using Our Site",
    icon: FiFileText,
    body: "By creating an account or placing an order on Orbit Buy, you agree to these terms. You must be at least 18 years old, or have a parent/guardian's permission, to make a purchase.",
  },
  {
    number: "02",
    title: "Account Responsibility",
    icon: FiLock,
    body: "You're responsible for keeping your account credentials secure. Let us know immediately if you suspect unauthorized access to your account.",
  },
  {
    number: "03",
    title: "Product Information & Pricing",
    icon: FiCheckCircle,
    body: "We do our best to display accurate product details, images, and pricing. Occasionally, errors may occur — if a product's price is listed incorrectly, we'll contact you before processing the order.",
  },
  {
    number: "04",
    title: "Orders & Payment",
    icon: FiShield,
    body: "Placing an order is an offer to purchase, which we may accept or decline. Orders are confirmed once payment is verified. Prices include applicable taxes as shown at checkout.",
  },
  {
    number: "05",
    title: "Shipping & Delivery",
    icon: FiArrowUpRight,
    body: "Delivery timelines shown at checkout are estimates. Orders over ₹999 qualify for free shipping; a flat shipping charge applies below that threshold.",
  },
  {
    number: "06",
    title: "Returns & Refunds",
    icon: FiCheckCircle,
    body: "Unused items in original packaging can be returned within a reasonable window of delivery. Refunds are processed to the original payment method once the return is received and inspected.",
  },
  {
    number: "07",
    title: "Intellectual Property",
    icon: FiFileText,
    body: "All content on this site — including logos, product photography, and text — belongs to Orbit Buy or its licensors and may not be reused without permission.",
  },
  {
    number: "08",
    title: "Limitation of Liability",
    icon: FiShield,
    body: "Orbit Buy is not liable for indirect or incidental damages arising from the use of this site, to the extent permitted by law.",
  },
];

const TermsConditions = () => {
  return (
    <main className="min-h-screen bg-[#fafafa] text-brand-dark">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-brand-dark">
        {/* Decorative background */}
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
              Terms &
              <span className="ml-2 italic text-brand-tan">Conditions</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base sm:leading-8">
              Please take a moment to understand the terms that govern your
              experience with Orbit Buy.
            </p>

            {/* Updated badge */}
            <div className="mt-9 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 backdrop-blur-md">
              <FiClock className="text-brand-tan" size={15} />

              <span className="text-xs font-medium tracking-wide text-gray-300">
                Last updated: January 2026
              </span>
            </div>
          </div>
        </div>

        {/* Curved transition */}
        <div className="absolute bottom-0 left-0 right-0 h-8 rounded-t-[50%] bg-[#fafafa]" />
      </section>

      {/* =========================================================
          CONTENT
      ========================================================= */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          {/* Introduction */}
          <div className="mb-12 overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-[0_15px_50px_rgba(0,0,0,0.04)]">
            <div className="h-1 bg-gradient-to-r from-brand-primary via-brand-brown to-brand-primary" />

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-dark text-brand-tan shadow-lg">
                  <FiFileText size={24} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[3px] text-brand-primary">
                    Before you shop
                  </p>

                  <h2 className="mt-2 font-serif text-2xl text-brand-dark sm:text-3xl">
                    Simple, transparent terms.
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base sm:leading-8">
                    These terms outline the rules and responsibilities that
                    apply when you browse, create an account, or purchase
                    products from Orbit Buy. By using our website, you agree
                    to follow these terms.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Terms sections */}
          <div className="space-y-5">
            {sections.map((section) => {
              const Icon = section.icon;

              return (
                <article
                  key={section.number}
                  className="group relative overflow-hidden rounded-[28px] border border-gray-200/80 bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.035)] transition-all duration-500 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_22px_65px_rgba(0,0,0,0.08)] sm:p-8 lg:p-9"
                >
                  {/* Left accent */}
                  <div className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-gradient-to-b from-brand-primary to-brand-brown transition-transform duration-500 group-hover:scale-y-100" />

                  <div className="flex flex-col gap-6 sm:flex-row sm:gap-7">
                    {/* Number + icon */}
                    <div className="flex shrink-0 items-start gap-4 sm:block">
                      <span className="font-serif text-2xl italic text-gray-200 transition-colors duration-500 group-hover:text-brand-primary/30 sm:text-3xl">
                        {section.number}
                      </span>

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50 text-brand-dark transition-all duration-500 group-hover:bg-brand-dark group-hover:text-brand-tan sm:mt-5">
                        <Icon size={19} />
                      </div>
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-5">
                        <h2 className="font-serif text-2xl leading-tight text-brand-dark sm:text-[28px]">
                          {section.title}
                        </h2>

                        <FiChevronRight
                          size={20}
                          className="mt-1 hidden shrink-0 text-gray-300 transition-all duration-500 group-hover:translate-x-1 group-hover:text-brand-primary sm:block"
                        />
                      </div>

                      <div className="mt-4 h-px w-10 bg-brand-primary/30 transition-all duration-500 group-hover:w-20" />

                      <p className="mt-5 text-sm leading-7 text-gray-500 sm:text-base sm:leading-8">
                        {section.body}
                      </p>
                    </div>
                  </div>

                  {/* Bottom hover glow */}
                  <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-brand-primary/5 blur-3xl opacity-0 transition-all duration-700 group-hover:scale-150 group-hover:opacity-100" />
                </article>
              );
            })}
          </div>

          {/* =====================================================
              QUICK SUMMARY
          ===================================================== */}
          <div className="mt-16 grid gap-5 sm:grid-cols-3">
            <div className="rounded-[24px] border border-gray-200 bg-white p-6 text-center shadow-[0_10px_35px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gray-50 text-brand-primary">
                <FiShield size={19} />
              </div>

              <h3 className="mt-4 font-semibold text-brand-dark">
                Secure Shopping
              </h3>

              <p className="mt-2 text-xs leading-6 text-gray-400">
                Your transactions are handled securely.
              </p>
            </div>

            <div className="rounded-[24px] border border-gray-200 bg-white p-6 text-center shadow-[0_10px_35px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gray-50 text-brand-primary">
                <FiCheckCircle size={19} />
              </div>

              <h3 className="mt-4 font-semibold text-brand-dark">
                Clear Policies
              </h3>

              <p className="mt-2 text-xs leading-6 text-gray-400">
                Straightforward terms for every customer.
              </p>
            </div>

            <div className="rounded-[24px] border border-gray-200 bg-white p-6 text-center shadow-[0_10px_35px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gray-50 text-brand-primary">
                <FiLock size={19} />
              </div>

              <h3 className="mt-4 font-semibold text-brand-dark">
                Customer First
              </h3>

              <p className="mt-2 text-xs leading-6 text-gray-400">
                We aim to make your shopping experience effortless.
              </p>
            </div>
          </div>

          {/* =====================================================
              CONTACT CTA
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
                  Need clarification?
                </p>

                <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                  Have questions about our terms?
                </h2>

                <p className="mt-4 text-sm leading-7 text-gray-300 sm:text-base sm:leading-8">
                  If anything is unclear, our support team is happy to help
                  explain our policies and answer your questions.
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

          {/* Bottom note */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-4">
            <FiShield className="text-brand-primary" size={16} />

            <p className="text-xs uppercase tracking-[2px] text-gray-400">
              By using Orbit Buy, you acknowledge these terms
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TermsConditions;