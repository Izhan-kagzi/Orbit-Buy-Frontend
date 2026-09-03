import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import featuredData from "./featuredData";

const FeaturedCollection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-16">

          <p className="uppercase tracking-[6px] text-brand-primary font-semibold text-sm">
            Featured Collection
          </p>

          <h2 className="text-4xl md:text-5xl font-black mt-4">
            Curated For You
          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto mt-5">
            Explore our handpicked premium collections designed with modern elegance.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {featuredData.map((item) => (

            <div
              key={item.id}
              className="group relative overflow-hidden rounded-3xl h-[600px] cursor-pointer"
              onClick={() => navigate(item.link)}
            >

              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-primary/40 to-transparent"></div>

              <div className="absolute left-10 bottom-12 max-w-md">

                <p className="uppercase tracking-[5px] text-brand-tan text-sm font-semibold">
                  {item.tag}
                </p>

                <h2 className="text-white text-5xl font-black mt-4 leading-tight">
                  {item.title}
                </h2>

                <p className="text-gray-200 mt-5 leading-8">
                  {item.description}
                </p>

                <button
                  className="mt-8 flex items-center gap-3 bg-white text-brand-dark px-8 py-4 rounded-full font-semibold hover:bg-brand-brown hover:text-white transition"
                >
                  {item.button}

                  <FiArrowRight />
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default FeaturedCollection;