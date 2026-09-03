import { useNavigate } from "react-router-dom";
import categoriesData from "./categoriesData";
import FadeIn from "../Motion/FadeIn";

const Categories = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <FadeIn className="text-center mb-16">

          <span className="uppercase tracking-[6px] text-brand-primary font-semibold text-sm">
            Shop Collections
          </span>

          <h2 className="text-4xl md:text-5xl font-black mt-4">
            Explore Our Categories
          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto mt-5">
            Discover premium fashion collections designed for every style and every season.
          </p>

        </FadeIn>

        {/* Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {categoriesData.map((category) => (

            <div
              key={category.id}
              onClick={() => navigate(category.link)}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >

              {/* Image */}

              <div className="overflow-hidden h-[380px]">

                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

              </div>

              {/* Content */}

              <div className="p-6">

                <h3 className="text-2xl font-bold">
                  {category.title}
                </h3>

                <p className="text-gray-500 mt-2">
                  {category.subtitle}
                </p>

                <button
                  className="mt-6 w-full bg-brand-primary text-white py-3 rounded-xl font-semibold hover:bg-brand-brown transition"
                >
                  {category.button}
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default Categories;