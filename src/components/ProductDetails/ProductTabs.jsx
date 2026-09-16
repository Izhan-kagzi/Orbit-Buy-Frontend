import { useState } from "react";
import ReviewSection from "./ReviewSection";

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] =
    useState("description");

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
      {/* ====================================================
          TABS
      ==================================================== */}

      <div className="flex flex-wrap gap-4 border-b border-gray-200 pb-5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() =>
              setActiveTab(tab.id)
            }
            className={`
              rounded-xl
              px-6
              py-3
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

      {/* ====================================================
          CONTENT
      ==================================================== */}

      <div className="mt-10">
        {/* DESCRIPTION */}

        {activeTab === "description" && (
          <div className="rounded-3xl border border-gray-200 bg-white p-8">
            <h2 className="mb-6 text-3xl font-bold">
              Product Description
            </h2>

            <p className="leading-8 text-gray-600">
              {product.description ||
                "Experience premium craftsmanship with this stylish fashion essential. Designed for everyday comfort and durability, it blends modern aesthetics with high-quality materials, making it suitable for both casual and formal occasions."}
            </p>

            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-xl font-bold">
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
                <h3 className="mb-4 text-xl font-bold">
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
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white">
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="w-1/3 bg-gray-50 p-5 font-semibold">
                    Brand
                  </td>
                  <td className="p-5">
                    {product.brand ||
                      "Orbit Buy"}
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="bg-gray-50 p-5 font-semibold">
                    Category
                  </td>
                  <td className="p-5">
                    {product.category}
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="bg-gray-50 p-5 font-semibold">
                    Product Type
                  </td>
                  <td className="p-5">
                    {product.type || "Fashion"}
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="bg-gray-50 p-5 font-semibold">
                    Material
                  </td>
                  <td className="p-5">
                    {product.material ||
                      "Premium Cotton"}
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="bg-gray-50 p-5 font-semibold">
                    Fit
                  </td>
                  <td className="p-5">
                    {product.fit ||
                      "Regular Fit"}
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="bg-gray-50 p-5 font-semibold">
                    Pattern
                  </td>
                  <td className="p-5">
                    {product.pattern ||
                      "Solid"}
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="bg-gray-50 p-5 font-semibold">
                    Sleeve
                  </td>
                  <td className="p-5">
                    {product.sleeve ||
                      "Full Sleeve"}
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="bg-gray-50 p-5 font-semibold">
                    Country of Origin
                  </td>
                  <td className="p-5">
                    India
                  </td>
                </tr>

                <tr>
                  <td className="bg-gray-50 p-5 font-semibold">
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