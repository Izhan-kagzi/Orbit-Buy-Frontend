import { useState } from "react";
import ReviewSection from "./ReviewSection";

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    {
      id: "description",
      label: "Description",
    },
    {
      id: "specifications",
      label: "Specifications",
    },
    {
      id: "reviews",
      label: `Reviews (${product.reviews || 0})`,
    },
  ];

  return (
    <section className="mt-24">

      {/* Tabs */}

      <div className="flex flex-wrap gap-4 border-b border-gray-200 pb-5">

        {tabs.map((tab) => (

          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-6
              py-3
              rounded-xl
              font-semibold
              transition-all
              duration-300

              ${
                activeTab === tab.id
                  ? "bg-brand-primary text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }
            `}
          >
            {tab.label}
          </button>

        ))}

      </div>

      {/* Content */}

      <div className="mt-10">

        {/* DESCRIPTION */}

        {activeTab === "description" && (

          <div
            className="
              bg-white
              rounded-3xl
              border
              border-gray-200
              p-8
            "
          >

            <h2 className="text-3xl font-bold mb-6">
              Product Description
            </h2>

            <p className="text-gray-600 leading-8">

              {product.description ||

                "Experience premium craftsmanship with this stylish fashion essential. Designed for everyday comfort and durability, it blends modern aesthetics with high-quality materials, making it suitable for both casual and formal occasions."

              }

            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-10">

              <div>

                <h3 className="font-bold text-xl mb-4">
                  Features
                </h3>

                <ul className="space-y-3 text-gray-600">

                  <li>✔ Premium Quality Fabric</li>

                  <li>✔ Soft & Comfortable</li>

                  <li>✔ Breathable Material</li>

                  <li>✔ Lightweight Design</li>

                  <li>✔ Perfect Daily Wear</li>

                  <li>✔ Long Lasting Stitching</li>

                </ul>

              </div>

              <div>

                <h3 className="font-bold text-xl mb-4">
                  Care Instructions
                </h3>

                <ul className="space-y-3 text-gray-600">

                  <li>✔ Machine Wash Cold</li>

                  <li>✔ Do Not Bleach</li>

                  <li>✔ Iron at Low Temperature</li>

                  <li>✔ Dry in Shade</li>

                  <li>✔ Do Not Tumble Dry</li>

                </ul>

              </div>

            </div>

          </div>

        )}
                {/* SPECIFICATIONS */}

        {activeTab === "specifications" && (

          <div
            className="
              bg-white
              rounded-3xl
              border
              border-gray-200
              overflow-hidden
            "
          >

            <table className="w-full">

              <tbody>

                <tr className="border-b">

                  <td className="p-5 font-semibold bg-gray-50 w-1/3">
                    Brand
                  </td>

                  <td className="p-5">
                    {product.brand || "Orbit Buy"}
                  </td>

                </tr>

                <tr className="border-b">

                  <td className="p-5 font-semibold bg-gray-50">
                    Category
                  </td>

                  <td className="p-5">
                    {product.category}
                  </td>

                </tr>

                <tr className="border-b">

                  <td className="p-5 font-semibold bg-gray-50">
                    Product Type
                  </td>

                  <td className="p-5">
                    {product.type || "Fashion"}
                  </td>

                </tr>

                <tr className="border-b">

                  <td className="p-5 font-semibold bg-gray-50">
                    Material
                  </td>

                  <td className="p-5">
                    {product.material || "Premium Cotton"}
                  </td>

                </tr>

                <tr className="border-b">

                  <td className="p-5 font-semibold bg-gray-50">
                    Fit
                  </td>

                  <td className="p-5">
                    {product.fit || "Regular Fit"}
                  </td>

                </tr>

                <tr className="border-b">

                  <td className="p-5 font-semibold bg-gray-50">
                    Pattern
                  </td>

                  <td className="p-5">
                    {product.pattern || "Solid"}
                  </td>

                </tr>

                <tr className="border-b">

                  <td className="p-5 font-semibold bg-gray-50">
                    Sleeve
                  </td>

                  <td className="p-5">
                    {product.sleeve || "Full Sleeve"}
                  </td>

                </tr>

                <tr className="border-b">

                  <td className="p-5 font-semibold bg-gray-50">
                    Country of Origin
                  </td>

                  <td className="p-5">
                    India
                  </td>

                </tr>

                <tr>

                  <td className="p-5 font-semibold bg-gray-50">
                    SKU
                  </td>

                  <td className="p-5">
                    ORB-{product.id}
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        )}

        {/* REVIEWS */}

        {activeTab === "reviews" && (

          <ReviewSection product={product} />

        )}

      </div>

    </section>
  );
};

export default ProductTabs;