import { useState } from "react";
import {
  FiCheck,
  FiChevronRight,
  FiFileText,
  FiInfo,
  FiMessageCircle,
  FiPackage,
} from "react-icons/fi";

import ReviewSection from "./ReviewSection";

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");

  const reviewCount = Number(product?.reviews || 0);

  const tabs = [
    {
      id: "description",
      label: "Description",
      icon: FiFileText,
    },
    {
      id: "specifications",
      label: "Specifications",
      icon: FiInfo,
    },
    {
      id: "reviews",
      label: "Reviews",
      count: reviewCount,
      icon: FiMessageCircle,
    },
  ];

  const features = [
    "Premium Quality Fabric",
    "Soft & Comfortable",
    "Breathable Material",
    "Lightweight Design",
    "Perfect Daily Wear",
    "Long Lasting Stitching",
  ];

  const careInstructions = [
    "Machine Wash Cold",
    "Do Not Bleach",
    "Iron at Low Temperature",
    "Dry in Shade",
    "Do Not Tumble Dry",
  ];

  const specifications = [
    {
      label: "Brand",
      value: product.brand || "Orbit Buy",
    },
    {
      label: "Category",
      value: product.category || "Fashion",
    },
    {
      label: "Product Type",
      value: product.type || "Fashion",
    },
    {
      label: "Material",
      value: product.material || "Premium Cotton",
    },
    {
      label: "Fit",
      value: product.fit || "Regular Fit",
    },
    {
      label: "Pattern",
      value: product.pattern || "Solid",
    },
    {
      label: "Sleeve",
      value: product.sleeve || "Full Sleeve",
    },
    {
      label: "Country of Origin",
      value: "India",
    },
    {
      label: "SKU",
      value: `ORB-${product.id}`,
    },
  ];

  return (
    <section className="mt-20 lg:mt-28">
      {/* ====================================================
          SECTION HEADER
      ==================================================== */}

      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[4px] text-brand-primary">
            Product Information
          </p>

          <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
            Everything You Need to Know
          </h2>
        </div>

        <div className="hidden items-center gap-2 text-sm text-gray-500 sm:flex">
          <FiPackage className="text-brand-primary" />
          Premium fashion from Orbit Buy
        </div>
      </div>

      {/* ====================================================
          MODERN TABS
      ==================================================== */}

      <div className="relative overflow-x-auto border-b border-gray-200">
        <div className="flex min-w-max gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`
                  group relative flex items-center gap-2.5
                  px-5 py-4 sm:px-7
                  text-sm sm:text-base
                  font-bold
                  transition-all duration-300
                  ${
                    active
                      ? "text-brand-primary"
                      : "text-gray-500 hover:text-gray-900"
                  }
                `}
              >
                <Icon
                  className={`
                    text-lg transition-transform duration-300
                    ${
                      active
                        ? "scale-110"
                        : "group-hover:scale-110"
                    }
                  `}
                />

                <span>{tab.label}</span>

                {typeof tab.count === "number" && (
                  <span
                    className={`
                      min-w-7 rounded-full px-2 py-0.5
                      text-center text-xs font-bold
                      transition-all duration-300
                      ${
                        active
                          ? "bg-brand-primary text-white"
                          : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                      }
                    `}
                  >
                    {tab.count}
                  </span>
                )}

                {/* Active indicator */}
                <span
                  className={`
                    absolute bottom-0 left-1/2 h-0.5
                    -translate-x-1/2
                    rounded-full
                    bg-brand-primary
                    transition-all duration-300
                    ${
                      active
                        ? "w-[calc(100%-24px)] opacity-100"
                        : "w-0 opacity-0"
                    }
                  `}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* ====================================================
          CONTENT
      ==================================================== */}

      <div className="mt-8">
        {/* ==================================================
            DESCRIPTION
        ================================================== */}

        {activeTab === "description" && (
          <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-[0_15px_50px_rgba(0,0,0,0.05)]">
            {/* Description intro */}
            <div className="border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white p-7 sm:p-10">
              <div className="max-w-4xl">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary text-white shadow-lg">
                  <FiFileText className="text-xl" />
                </div>

                <h3 className="mb-4 text-2xl font-black text-gray-900 sm:text-3xl">
                  Product Description
                </h3>

                <p className="text-base leading-8 text-gray-600 sm:text-lg">
                  {product.description ||
                    "Experience premium craftsmanship with this stylish fashion essential. Designed for everyday comfort and durability, it blends modern aesthetics with high-quality materials, making it suitable for both casual and formal occasions."}
                </p>
              </div>
            </div>

            {/* Features + Care */}
            <div className="grid gap-0 md:grid-cols-2">
              {/* Features */}
              <div className="p-7 sm:p-10 md:border-r md:border-gray-100">
                <div className="mb-6">
                  <p className="mb-1 text-xs font-bold uppercase tracking-[3px] text-brand-primary">
                    Highlights
                  </p>

                  <h3 className="text-xl font-black text-gray-900">
                    Product Features
                  </h3>
                </div>

                <div className="space-y-3">
                  {features.map((feature) => (
                    <div
                      key={feature}
                      className="group flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50/70 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-primary/20 hover:bg-white hover:shadow-md"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                        <FiCheck />
                      </span>

                      <span className="font-medium text-gray-700">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Care */}
              <div className="border-t border-gray-100 p-7 sm:p-10 md:border-t-0">
                <div className="mb-6">
                  <p className="mb-1 text-xs font-bold uppercase tracking-[3px] text-brand-primary">
                    Maintenance
                  </p>

                  <h3 className="text-xl font-black text-gray-900">
                    Care Instructions
                  </h3>
                </div>

                <div className="space-y-3">
                  {careInstructions.map((instruction) => (
                    <div
                      key={instruction}
                      className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50/70 p-4"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                        <FiCheck />
                      </span>

                      <span className="font-medium text-gray-700">
                        {instruction}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================
            SPECIFICATIONS
        ================================================== */}

        {activeTab === "specifications" && (
          <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-[0_15px_50px_rgba(0,0,0,0.05)]">
            <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-7 sm:p-10">
              <p className="mb-2 text-xs font-bold uppercase tracking-[3px] text-brand-primary">
                Product Details
              </p>

              <h3 className="text-2xl font-black text-gray-900 sm:text-3xl">
                Specifications
              </h3>

              <p className="mt-2 text-gray-500">
                Detailed information about this product.
              </p>
            </div>

            <div className="divide-y divide-gray-100">
              {specifications.map((item, index) => (
                <div
                  key={item.label}
                  className={`
                    grid grid-cols-1 gap-2 p-5
                    sm:grid-cols-[220px_1fr]
                    sm:items-center
                    sm:px-8
                    transition-colors duration-200
                    hover:bg-gray-50/80
                    ${
                      index % 2 === 0
                        ? "bg-white"
                        : "bg-gray-50/30"
                    }
                  `}
                >
                  <span className="text-xs font-bold uppercase tracking-[1.5px] text-gray-400 sm:text-sm">
                    {item.label}
                  </span>

                  <span className="font-semibold text-gray-800">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom trust strip */}
            <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50 p-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <FiCheck />
                </span>

                <span className="text-sm font-semibold text-gray-700">
                  Authentic Orbit Buy product
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                View complete product information
                <FiChevronRight />
              </div>
            </div>
          </div>
        )}

        {/* ==================================================
            REVIEWS
        ================================================== */}

        {activeTab === "reviews" && (
          <ReviewSection product={product} />
        )}
      </div>
    </section>
  );
};

export default ProductTabs;