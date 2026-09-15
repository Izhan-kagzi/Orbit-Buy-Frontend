import {
  FiAward,
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiUsers,
  FiHeart,
  FiArrowRight,
  FiCheck,
  FiArrowUpRight,
} from "react-icons/fi";

const features = [
  {
    icon: <FiAward size={24} />,
    title: "Premium Quality",
    description:
      "Thoughtfully selected men's and women's fashion made for quality, comfort and confident everyday style.",
  },
  {
    icon: <FiTruck size={24} />,
    title: "Fast Delivery",
    description:
      "Reliable delivery across India with a smooth experience from your first click to your doorstep.",
  },
  {
    icon: <FiShield size={24} />,
    title: "Secure Shopping",
    description:
      "Your account, personal information and payments are protected with secure technology.",
  },
  {
    icon: <FiRefreshCw size={24} />,
    title: "Easy Returns",
    description:
      "A simple return and exchange experience designed to make fashion shopping worry-free.",
  },
];

const stats = [
  {
    number: "50K+",
    title: "Happy Customers",
  },
  {
    number: "10K+",
    title: "Orders Delivered",
  },
  {
    number: "4.9",
    title: "Average Rating",
  },
  {
    number: "100+",
    title: "Fashion Brands",
  },
];

const values = [
  "Quality first",
  "Customer focused",
  "Modern fashion",
  "Trusted brands",
];

const About = () => {
  return (
    <main className="overflow-hidden bg-[#f7f7f5] text-[#111111]">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative min-h-[680px] overflow-hidden bg-[#071b31] text-white lg:min-h-[760px]">

        {/* Ambient lighting */}
        <div className="pointer-events-none absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-blue-400/[0.06] blur-[130px]" />

        <div className="pointer-events-none absolute right-[-120px] top-1/4 h-[550px] w-[550px] rounded-full bg-cyan-300/[0.04] blur-[140px]" />

        {/* Fine grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-6 py-28 lg:min-h-[760px] lg:px-10">

          <div className="max-w-5xl">

            {/* Eyebrow */}
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-12 bg-white/40" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/55">
                The Orbit Buy Story
              </span>

              <span className="h-px w-12 bg-white/40" />
            </div>

            {/* Heading */}
            <h1 className="font-serif text-5xl leading-[0.95] tracking-[-0.035em] sm:text-7xl lg:text-[8.5rem]">
              Fashion
              <br />
              <span className="text-white/35">with purpose.</span>
            </h1>

            <p className="mt-9 max-w-2xl text-sm leading-8 text-white/60 sm:text-base sm:leading-8 lg:text-lg">
              Orbit Buy is a modern fashion destination bringing together
              refined men's and women's styles, carefully selected for
              quality, confidence and effortless everyday dressing.
            </p>

            {/* CTA */}
            <div className="mt-11 flex flex-wrap items-center gap-5">

              <a
                href="/shop"
                className="group inline-flex items-center gap-4 rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#071b31] shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#f7f7f5]"
              >
                Explore Collection

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#071b31] text-white transition-transform duration-300 group-hover:translate-x-1">
                  <FiArrowRight size={14} />
                </span>
              </a>

              <span className="text-xs uppercase tracking-[0.2em] text-white/35">
                Men's & Women's Fashion
              </span>

            </div>

          </div>

          {/* Decorative number */}
          <div className="absolute bottom-12 right-8 hidden select-none lg:block">
            <span className="font-serif text-[11rem] leading-none text-white/[0.025]">
              OB
            </span>
          </div>

        </div>

        {/* Bottom transition */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#f7f7f5] to-transparent" />
      </section>


      {/* =====================================================
          STORY
      ====================================================== */}
      <section className="relative py-24 lg:py-32">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          <div className="grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">

            {/* IMAGE */}
            <div className="relative">

              {/* Decorative frame */}
              <div className="absolute -left-4 -top-4 h-24 w-24 rounded-2xl border border-[#09335A]/15" />

              <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-2xl border border-[#09335A]/10" />

              <div className="relative overflow-hidden rounded-[2rem] bg-[#e9e9e5] shadow-[0_25px_70px_rgba(9,51,90,0.10)]">

                <img
                  src="https://plus.unsplash.com/premium_photo-1683121266311-04c92a01f5e6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaGdlfDB8fHx8fA%3D%3D"
                  alt="Orbit Buy fashion"
                  loading="lazy"
                  className="h-[500px] w-full object-cover transition-transform duration-1000 hover:scale-[1.03] lg:h-[650px]"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071b31]/25 via-transparent to-transparent" />

              </div>

              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 rounded-2xl border border-white/60 bg-white/90 px-6 py-5 shadow-[0_15px_45px_rgba(0,0,0,0.12)] backdrop-blur-xl">

                <p className="font-serif text-4xl font-semibold text-[#071b31]">
                  2023
                </p>

                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">
                  Our Beginning
                </p>

              </div>

            </div>


            {/* CONTENT */}
            <div>

              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#09335A]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#09335A]">
                  Our Story
                </span>
              </div>

              <h2 className="mt-6 font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl">
                Curated for
                <br />
                <span className="italic text-[#09335A]/45">
                  modern living.
                </span>
              </h2>

              <div className="mt-9 space-y-5 text-[15px] leading-8 text-gray-600">

                <p>
                  Orbit Buy was created with a simple idea — premium fashion
                  should feel effortless, inspiring and accessible.
                </p>

                <p>
                  We bring together men's and women's fashion from carefully
                  selected brands, creating a destination where quality,
                  design and personal style come first.
                </p>

                <p>
                  From discovering a new look to completing your purchase,
                  every detail is designed around one goal: creating a
                  shopping experience you can trust.
                </p>

              </div>

              {/* VALUES */}
              <div className="mt-10 grid gap-4 sm:grid-cols-2">

                {values.map((value) => (
                  <div
                    key={value}
                    className="group flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white px-4 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#09335A]/20 hover:shadow-lg"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#09335A] text-white">
                      <FiCheck size={14} />
                    </span>

                    <span className="text-sm font-semibold text-[#111]">
                      {value}
                    </span>
                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          FEATURES
      ====================================================== */}
      <section className="relative bg-white py-24 lg:py-32">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          {/* Header */}
          <div className="mb-14 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#09335A]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#09335A]">
                  Why Orbit Buy
                </span>
              </div>

              <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Designed around
                <br />
                <span className="italic text-gray-400">
                  your experience.
                </span>
              </h2>

            </div>

            <p className="max-w-md text-sm leading-7 text-gray-500">
              Thoughtful fashion, dependable service and a shopping
              experience created around what matters most to you.
            </p>

          </div>


          {/* Feature cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {features.map((item, index) => (

              <article
                key={index}
                className="group relative min-h-[310px] overflow-hidden rounded-[2rem] border border-black/[0.06] bg-[#f7f7f5] p-8 transition-all duration-500 hover:-translate-y-2 hover:bg-[#071b31] hover:shadow-[0_25px_60px_rgba(7,27,49,0.15)]"
              >

                {/* Number */}
                <span className="absolute right-7 top-7 font-serif text-5xl text-black/[0.045] transition-colors duration-500 group-hover:text-white/[0.06]">
                  0{index + 1}
                </span>

                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-black/[0.05] bg-white text-[#09335A] shadow-sm transition-all duration-500 group-hover:border-white/10 group-hover:bg-white/10 group-hover:text-white">
                  {item.icon}
                </div>

                <h3 className="mt-10 text-xl font-semibold text-[#111] transition-colors duration-500 group-hover:text-white">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-gray-500 transition-colors duration-500 group-hover:text-white/50">
                  {item.description}
                </p>

                {/* Bottom detail */}
                <div className="absolute bottom-8 left-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 transition-colors duration-500 group-hover:text-white/40">
                  Orbit Buy

                  <FiArrowUpRight size={13} />
                </div>

              </article>

            ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          STATS
      ====================================================== */}
      <section className="bg-[#f7f7f5] py-24 lg:py-32">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          <div className="mb-14 text-center">

            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#09335A]/30" />

              <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-gray-400">
                By the numbers
              </span>

              <span className="h-px w-8 bg-[#09335A]/30" />
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl">
              Growing with our
              <span className="italic text-[#09335A]/45">
                {" "}community.
              </span>
            </h2>

          </div>


          <div className="overflow-hidden rounded-[2rem] border border-black/[0.07] bg-white">

            <div className="grid grid-cols-2 lg:grid-cols-4">

              {stats.map((item, index) => (

                <div
                  key={index}
                  className={`group relative px-5 py-12 text-center transition-colors duration-300 hover:bg-[#071b31] sm:px-8 ${
                    index % 2 !== 0
                      ? "border-l border-black/[0.07]"
                      : ""
                  } ${
                    index >= 2
                      ? "border-t border-black/[0.07] lg:border-t-0"
                      : ""
                  } ${
                    index === 2
                      ? "lg:border-l"
                      : ""
                  }`}
                >

                  <h3 className="font-serif text-4xl tracking-tight text-[#071b31] transition-colors duration-300 sm:text-5xl lg:text-6xl group-hover:text-white">
                    {item.number}

                    {item.number === "4.9" && (
                      <span className="ml-1 align-top text-lg text-[#09335A] group-hover:text-white">
                        ★
                      </span>
                    )}
                  </h3>

                  <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 transition-colors duration-300 group-hover:text-white/45">
                    {item.title}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          MISSION
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#071b31] py-28 text-white lg:py-36">

        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-48 -top-48 h-[650px] w-[650px] rounded-full border border-white/[0.05]" />

        <div className="pointer-events-none absolute -bottom-64 -left-48 h-[700px] w-[700px] rounded-full border border-white/[0.05]" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">

          {/* Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
            <FiHeart size={23} strokeWidth={1.5} />
          </div>

          <span className="mt-8 block text-[10px] font-bold uppercase tracking-[0.38em] text-white/40">
            Our Mission
          </span>

          <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl lg:text-7xl">
            Making premium fashion
            <br />
            <span className="italic text-white/35">
              feel effortless.
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-sm leading-8 text-white/50 sm:text-base">
            Our mission is to connect customers with exceptional men's and
            women's fashion, trusted brands and an experience that feels
            simple from discovery to delivery.
          </p>

          <div className="mt-12 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-xs text-white/60 backdrop-blur-sm">
            <FiUsers size={15} />
            Trusted by shoppers across India
          </div>

        </div>
      </section>


      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="relative overflow-hidden bg-white py-24 lg:py-32">

        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[700px] -translate-x-1/2 rounded-full bg-[#09335A]/[0.035] blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">

          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#09335A]/30" />

            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-400">
              Discover Orbit Buy
            </p>

            <span className="h-px w-8 bg-[#09335A]/30" />
          </div>

          <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl lg:text-7xl">
            Your next favourite
            <br />
            <span className="italic text-[#09335A]/40">
              is waiting.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-gray-500">
            Explore carefully selected fashion for men and women, created
            for modern everyday style.
          </p>

          <a
            href="/shop"
            className="group mt-10 inline-flex items-center gap-4 rounded-full bg-[#071b31] px-8 py-4 text-sm font-semibold text-white shadow-[0_15px_40px_rgba(7,27,49,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#09335A]"
          >
            Shop Orbit Buy

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:translate-x-1">
              <FiArrowRight size={14} />
            </span>
          </a>

        </div>
      </section>

    </main>
  );
};

export default About;