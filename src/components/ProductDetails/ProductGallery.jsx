import { useState } from "react";
import { FiZoomIn } from "react-icons/fi";

const ProductGallery = ({ product }) => {
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="space-y-6">

      {/* Main Image */}

      <div className="group relative overflow-hidden rounded-3xl bg-gray-100">

        <img
          src={selectedImage}
          alt={product.name}
          className="
            w-full
            h-[600px]
            object-cover
            transition-transform
            duration-700
            group-hover:scale-110
          "
        />

        {/* Zoom Icon */}

        <div
          className="
            absolute
            right-5
            top-5
            w-12
            h-12
            rounded-full
            bg-white
            shadow-lg
            flex
            items-center
            justify-center
          "
        >
          <FiZoomIn className="text-xl" />
        </div>

        {/* Discount Badge */}

        {product.oldPrice > product.price && (

          <div
            className="
              absolute
              left-5
              top-5
              bg-red-500
              text-white
              px-4
              py-2
              rounded-full
              font-semibold
              text-sm
            "
          >
            {Math.round(
              ((product.oldPrice - product.price) /
                product.oldPrice) *
                100
            )}
            % OFF
          </div>

        )}

      </div>

      {/* Thumbnails */}

      <div className="grid grid-cols-4 gap-4">

        {images.map((img, index) => (

          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`
              overflow-hidden
              rounded-2xl
              border-2
              transition-all
              duration-300

              ${
                selectedImage === img
                  ? "border-brand-primary"
                  : "border-gray-200"
              }
            `}
          >

            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="
                w-full
                h-28
                object-cover
                hover:scale-105
                transition
              "
            />

          </button>

        ))}

      </div>

      {/* Product Highlights */}

      <div className="grid grid-cols-2 gap-4">

        <div className="rounded-2xl bg-gray-50 p-5 text-center">

          <h4 className="font-bold text-lg">
            Premium Quality
          </h4>

          <p className="text-gray-500 mt-2 text-sm">
            Carefully crafted using premium materials.
          </p>

        </div>

        <div className="rounded-2xl bg-gray-50 p-5 text-center">

          <h4 className="font-bold text-lg">
            Fast Delivery
          </h4>

          <p className="text-gray-500 mt-2 text-sm">
            Delivered across India with secure packaging.
          </p>

        </div>

      </div>

    </div>
  );
};

export default ProductGallery;