import {
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiHeadphones,
} from "react-icons/fi";
import FadeIn from "../Motion/FadeIn";

const WhyChoose = () => {
  const features = [
    {
      icon: <FiTruck />,
      title: "Free Shipping",
      description:
        "Enjoy free delivery on all eligible orders with fast nationwide shipping.",
    },
    {
      icon: <FiShield />,
      title: "Secure Payments",
      description:
        "100% secure checkout with trusted payment gateways and encryption.",
    },
    {
      icon: <FiRefreshCw />,
      title: "Easy Returns",
      description:
        "Simple 7-day return and exchange policy for a hassle-free shopping experience.",
    },
    {
      icon: <FiHeadphones />,
      title: "24/7 Support",
      description:
        "Our customer support team is always ready to assist you anytime.",
    },
  ];

  return (
    <section className="bg-gray-50 py-24">

      <div className="max-w-7xl mx-auto px-6">

        <FadeIn className="text-center mb-16">

          <p className="uppercase tracking-[6px] text-brand-primary text-sm font-semibold">
            Why Choose Us
          </p>

          <h2 className="text-4xl lg:text-5xl font-black mt-3">
            The Orbit Buy Advantage
          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto mt-5">
            We combine premium quality, exceptional service and a seamless
            shopping experience to bring you the very best.
          </p>

        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((item, index) => (

            <div
              key={index}
              className="
              bg-white
              rounded-3xl
              p-8
              text-center
              shadow-md
              hover:shadow-2xl
              hover:-translate-y-2
              transition-all
              duration-500
              "
            >

              <div
                className="
                w-20
                h-20
                mx-auto
                rounded-full
                bg-brand-tan/40
                text-brand-primary
                flex
                items-center
                justify-center
                text-4xl
                "
              >
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold mt-6">
                {item.title}
              </h3>

              <p className="text-gray-500 mt-4 leading-7">
                {item.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default WhyChoose;