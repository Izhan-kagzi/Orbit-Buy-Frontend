import { FiArrowUpRight } from "react-icons/fi";
import FadeIn from "../Motion/FadeIn";
import whyChooseData from "./whyChooseData";

const WhyChoose = () => {
  return (
    <section className="relative bg-gray-50 py-20 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Header */}
        <FadeIn className="text-center mb-12 md:mb-16">

          <div className="inline-flex items-center gap-3">
            <span className="w-8 h-px bg-brand-primary" />

            <p className="uppercase tracking-[5px] text-brand-primary text-xs sm:text-sm font-semibold">
              Why Choose Us
            </p>

            <span className="w-8 h-px bg-brand-primary" />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mt-5 tracking-tight text-gray-900">
            The Orbit Buy Advantage
          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto mt-5 text-sm sm:text-base leading-7">
            More than fashion. We combine premium quality, trusted service
            and thoughtful details to create a shopping experience you can
            rely on.
          </p>

        </FadeIn>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">

          {whyChooseData.map((item, index) => {
            const Icon = item.icon;

            return (
              <FadeIn
                key={item.id}
                delay={index * 0.05}
                className="h-full"
              >
                <div
                  className="
                    group relative h-full
                    bg-white
                    rounded-[1.75rem]
                    p-6 sm:p-7
                    border border-gray-100
                    overflow-hidden
                    transition-all duration-500
                    hover:-translate-y-2
                    hover:border-gray-200
                    hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                  "
                >

                  {/* Decorative Number */}
                  <span
                    className="
                      absolute top-5 right-6
                      text-5xl
                      font-black
                      text-gray-100
                      group-hover:text-brand-tan/30
                      transition-colors duration-500
                    "
                  >
                    {String(item.id).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <div
                    className="
                      relative
                      w-14 h-14
                      rounded-2xl
                      bg-brand-tan/30
                      text-brand-primary
                      flex items-center justify-center
                      text-2xl
                      transition-all duration-500
                      group-hover:bg-brand-primary
                      group-hover:text-white
                      group-hover:scale-105
                      group-hover:rotate-2
                    "
                  >
                    <Icon />
                  </div>

                  {/* Content */}
                  <div className="relative mt-6">

                    <h3
                      className="
                        text-xl
                        sm:text-[21px]
                        font-bold
                        text-gray-900
                        tracking-tight
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        text-gray-500
                        text-sm
                        leading-6
                        mt-3
                      "
                    >
                      {item.description}
                    </p>

                  </div>

                  {/* Bottom Accent */}
                  <div className="mt-6 flex items-center justify-between">

                    <div
                      className="
                        h-[2px] w-8
                        bg-brand-primary
                        transition-all duration-500
                        group-hover:w-14
                      "
                    />

                    <div
                      className="
                        w-8 h-8
                        rounded-full
                        border border-gray-200
                        flex items-center justify-center
                        text-gray-400
                        transition-all duration-500
                        group-hover:bg-brand-primary
                        group-hover:text-white
                        group-hover:border-brand-primary
                        group-hover:rotate-45
                      "
                    >
                      <FiArrowUpRight size={15} />
                    </div>

                  </div>

                  {/* Hover Glow */}
                  <div
                    className="
                      absolute
                      -bottom-16
                      -right-16
                      w-32 h-32
                      rounded-full
                      bg-brand-tan/10
                      blur-2xl
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity duration-700
                      pointer-events-none
                    "
                  />

                </div>
              </FadeIn>
            );
          })}

        </div>

        {/* Bottom Trust Strip */}
        <FadeIn className="mt-10 md:mt-12">

          

        </FadeIn>

      </div>
    </section>
  );
};

export default WhyChoose;