import {
  FiArrowUpRight,
  FiCheckCircle,
  FiChevronRight,
  FiClock,
  FiLock,
  FiMail,
  FiShield,
  FiUser,
} from "react-icons/fi";

const sections = [
  {
    number: "01",
    title: "Information We Collect",
    icon: FiUser,
    body: "When you create an account, place an order, or contact us, we collect information such as your name, email address, phone number, shipping address, and payment preferences. We also collect basic usage data — like pages visited and items viewed — to improve your shopping experience.",
  },
  {
    number: "02",
    title: "How We Use Your Information",
    icon: FiCheckCircle,
    body: "We use your information to process orders, manage your account, provide customer support, and send you order updates. With your consent, we may also send promotional emails about new arrivals, sales, and offers — you can opt out at any time.",
  },
  {
    number: "03",
    title: "Payment Information",
    icon: FiLock,
    body: "We do not store your full card details on our servers. Payments are processed securely, and card information is handled directly by our payment partners in line with industry security standards.",
  },
  {
    number: "04",
    title: "Cookies",
    icon: FiClock,
    body: "We use cookies to keep you logged in, remember items in your cart, and understand how you use our site. You can disable cookies in your browser settings, though some features may not work as expected.",
  },
  {
    number: "05",
    title: "Sharing Your Information",
    icon: FiShield,
    body: "We don't sell your personal information. We share only what's necessary with delivery partners to fulfill your orders, and with payment processors to complete transactions securely.",
  },
  {
    number: "06",
    title: "Your Rights",
    icon: FiUser,
    body: "You can access, update, or request deletion of your personal information at any time from your account settings, or by contacting our support team.",
  },
  {
    number: "07",
    title: "Changes to This Policy",
    icon: FiClock,
    body: "We may update this policy from time to time. Significant changes will be communicated through the site or via email.",
  },
];

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-[#fafafa] text-brand-dark">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-brand-dark">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-brand-primary/20 blur-[100px]" />
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
              Privacy
              <span className="ml-2 italic text-brand-tan">Policy</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base sm:leading-8">
              Your privacy matters to us. Learn how Orbit Buy collects,
              protects, uses, and manages your information.
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

        {/* Bottom curve */}
        <div className="absolute bottom-0 left-0 right-0 h-8 rounded-t-[50%] bg-[#fafafa]" />
      </section>

      {/* =========================================================
          CONTENT
      ========================================================= */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          {/* Intro */}
          <div className="mb-12 rounded-[28px] border border-gray-200 bg-white p-6 shadow-[0_15px_50px_rgba(0,0,0,0.04)] sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-dark text-brand-tan shadow-lg">
                <FiShield size={24} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[3px] text-brand-primary">
                  Your privacy
                </p>

                <h2 className="mt-2 font-serif text-2xl text-brand-dark sm:text-3xl">
                  Designed with your trust in mind.
                </h2>

                <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base sm:leading-8">
                  At Orbit Buy, we believe shopping online should feel secure,
                  transparent, and effortless. This policy explains the
                  information we collect and how we use it to provide you with
                  a better experience.
                </p>
              </div>
            </div>
          </div>

          {/* Section list */}
          <div className="space-y-5">
            {sections.map((section) => {
              const Icon = section.icon;

              return (
                <article
                  key={section.number}
                  className="group relative overflow-hidden rounded-[28px] border border-gray-200/80 bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.035)] transition-all duration-500 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.07)] sm:p-8 lg:p-9"
                >
                  {/* Hover line */}
                  <div className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-gradient-to-b from-brand-primary to-brand-brown transition-transform duration-500 group-hover:scale-y-100" />

                  <div className="flex flex-col gap-6 sm:flex-row sm:gap-7">
                    {/* Number */}
                    <div className="flex shrink-0 items-start gap-4 sm:block">
                      <span className="font-serif text-2xl italic text-gray-200 transition-colors duration-500 group-hover:text-brand-primary/30 sm:text-3xl">
                        {section.number}
                      </span>

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50 text-brand-dark transition-all duration-500 group-hover:bg-brand-dark group-hover:text-brand-tan sm:mt-5">
                        <Icon size={19} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-5">
                        <h2 className="font-serif text-2xl leading-tight text-brand-dark sm:text-[28px]">
                          {section.title}
                        </h2>

                        <FiChevronRight
                          className="mt-1 hidden shrink-0 text-gray-300 transition-all duration-500 group-hover:translate-x-1 group-hover:text-brand-primary sm:block"
                          size={20}
                        />
                      </div>

                      <div className="mt-4 h-px w-10 bg-brand-primary/30 transition-all duration-500 group-hover:w-20" />

                      <p className="mt-5 text-sm leading-7 text-gray-500 sm:text-base sm:leading-8">
                        {section.body}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* =====================================================
              CONTACT CTA
          ===================================================== */}
          <div className="relative mt-16 overflow-hidden rounded-[32px] bg-brand-dark p-7 text-white shadow-[0_25px_70px_rgba(0,0,0,0.12)] sm:p-10 lg:p-12">
            {/* Decorative circles */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/5" />
            <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full border border-white/5" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-brand-tan">
                  <FiMail size={21} />
                </div>

                <p className="text-xs font-semibold uppercase tracking-[3px] text-brand-tan">
                  Need assistance?
                </p>

                <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                  Questions about your data?
                </h2>

                <p className="mt-4 text-sm leading-7 text-gray-300 sm:text-base sm:leading-8">
                  Our support team is here to help with privacy, account, and
                  data-related questions.
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

          {/* Footer note */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-4">
            <FiLock className="text-brand-primary" size={16} />

            <p className="text-xs uppercase tracking-[2px] text-gray-400">
              Your information is handled with care and respect
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;