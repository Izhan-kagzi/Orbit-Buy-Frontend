import { FiShield, FiTruck, FiRefreshCw, FiAward } from "react-icons/fi";

const features = [
  {
    icon: <FiShield size={26} />,
    title: "100% Secure",
    description: "Your personal information and payments are protected with enterprise-grade security.",
  },
  {
    icon: <FiTruck size={26} />,
    title: "Fast Delivery",
    description: "Quick shipping across India with real-time order tracking.",
  },
  {
    icon: <FiRefreshCw size={26} />,
    title: "Easy Returns",
    description: "7-day hassle-free return and exchange on eligible products.",
  },
  {
    icon: <FiAward size={26} />,
    title: "Premium Quality",
    description: "Every product is carefully selected to ensure premium quality.",
  },
];

const AuthBanner = () => {
  return (
    <div
      className="
        hidden
        lg:flex
        flex-col
        justify-between
        h-full
        bg-gradient-to-br
        from-brand-dark
        via-gray-900
        to-gray-800
        text-white
        p-12
        relative
        overflow-hidden
      "
    >
      {/* Background Circles */}

      <div
        className="
          absolute
          -top-24
          -right-24
          w-72
          h-72
          rounded-full
          bg-white/5
        "
      />

      <div
        className="
          absolute
          bottom-0
          -left-20
          w-56
          h-56
          rounded-full
          bg-white/5
        "
      />

      {/* Logo */}

      <div>

        <h1 className="text-5xl font-black tracking-wide">
          ORBIT BUY
        </h1>

        <p className="mt-5 text-gray-300 leading-8 text-lg">
          Discover premium fashion, accessories and lifestyle
          essentials crafted to elevate your everyday style.
        </p>

      </div>

      {/* Features */}

      <div className="space-y-8 mt-12">

        {features.map((item, index) => (

          <div
            key={index}
            className="
              flex
              gap-5
              items-start
            "
          >
            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-white/10
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              {item.icon}
            </div>

            <div>

              <h3 className="text-xl font-bold mb-2">
                {item.title}
              </h3>

              <p className="text-gray-300 leading-7">
                {item.description}
              </p>

            </div>

          </div>

        ))}

      </div>

      {/* Bottom */}

      <div className="mt-14">

        <div className="flex gap-10">

          <div>
            <h2 className="text-4xl font-black">
              50K+
            </h2>

            <p className="text-gray-400 mt-2">
              Happy Customers
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-black">
              4.9★
            </h2>

            <p className="text-gray-400 mt-2">
              Customer Rating
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AuthBanner;