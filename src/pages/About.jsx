import {
  FiAward,
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiUsers,
  FiHeart,
} from "react-icons/fi";

const features = [
  {
    icon: <FiAward size={32} />,
    title: "Premium Quality",
    description:
      "Every product is carefully selected to deliver exceptional quality and style.",
  },
  {
    icon: <FiTruck size={32} />,
    title: "Fast Delivery",
    description:
      "Quick and reliable shipping across India with real-time order tracking.",
  },
  {
    icon: <FiShield size={32} />,
    title: "Secure Shopping",
    description:
      "Your payments and personal information are protected with advanced security.",
  },
  {
    icon: <FiRefreshCw size={32} />,
    title: "Easy Returns",
    description:
      "Simple return and exchange process for a worry-free shopping experience.",
  },
];

const stats = [
  {
    number: "50K+",
    title: "Happy Customers",
  },
  {
    number: "10K+",
    title: "Products Sold",
  },
  {
    number: "4.9★",
    title: "Customer Rating",
  },
  {
    number: "100+",
    title: "Premium Brands",
  },
];

const About = () => {
  return (
    <div className="bg-gray-50">

      {/* Hero */}

      <section className="bg-brand-primary text-white py-24">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl md:text-6xl font-black mb-6">
            About Orbit Buy
          </h1>

          <p className="max-w-3xl mx-auto text-gray-300 text-lg leading-8">
            Orbit Buy is your destination for premium fashion,
            lifestyle products and everyday essentials. We are
            committed to offering high-quality products with
            exceptional customer service.
          </p>

        </div>

      </section>

      {/* Our Story */}

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">

          <div>

            <img
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=900"
              alt="About Orbit Buy"
              className="rounded-3xl shadow-xl object-cover h-full"
            />

          </div>

          <div>

            <h2 className="text-4xl font-black mb-6">
              Our Story
            </h2>

            <p className="text-gray-600 leading-8 mb-5">
              Founded with a vision to make premium shopping
              simple and accessible, Orbit Buy combines modern
              technology with trusted brands to provide an
              outstanding online shopping experience.
            </p>

            <p className="text-gray-600 leading-8">
              From fashion to accessories, every product is
              carefully selected to ensure quality, affordability,
              and customer satisfaction.
            </p>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <h2 className="text-4xl font-black">
              Why Choose Us
            </h2>

            <p className="text-gray-500 mt-4">
              Shopping made better with quality and trust.
            </p>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {features.map((item, index) => (

              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 shadow hover:shadow-xl transition"
              >

                <div className="w-16 h-16 rounded-full bg-brand-primary text-white flex items-center justify-center mb-6">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {item.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Statistics */}

      <section className="py-20">

        <div className="max-w-6xl mx-auto px-6">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

            {stats.map((item, index) => (

              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 text-center"
              >

                <h2 className="text-5xl font-black text-brand-dark">
                  {item.number}
                </h2>

                <p className="text-gray-500 mt-3">
                  {item.title}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Mission */}

      <section className="bg-brand-primary text-white py-20">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <FiHeart
            size={50}
            className="mx-auto mb-6 text-red-500"
          />

          <h2 className="text-4xl font-black mb-6">
            Our Mission
          </h2>

          <p className="text-gray-300 leading-8 text-lg">
            Our mission is to deliver premium products,
            exceptional customer service and a seamless online
            shopping experience while building long-term trust
            with every customer.
          </p>

          <div className="flex justify-center mt-10">

            <div className="flex items-center gap-3 text-xl font-semibold">

              <FiUsers />

              Trusted by thousands of shoppers across India

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default About;