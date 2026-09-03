import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import ProductGallery from "../components/ProductDetails/ProductGallery";
import ProductInfo from "../components/ProductDetails/ProductInfo";
import ProductTabs from "../components/ProductDetails/ProductTabs";
import RelatedProducts from "../components/ProductDetails/RelatedProducts";
import Breadcrumb from "../components/ProductDetails/Breadcrumb";
import ProductDetailsSkeleton from "../components/Skeleton/ProductDetailsSkeleton";

import api, { getImageUrl } from "../services/api";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    setLoading(true);
    setProduct(null);

    api
      .get(`/products/${id}`)
      .then((res) => {
        setProduct({
          ...res.product,
          image: getImageUrl(res.product.image),
        });
        return api.get(`/products/${id}/related`);
      })
      .then((res) => {
        setRelated(
          res.products.map((p) => ({
            ...p,
            image: getImageUrl(p.image),
          }))
        );
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  if (!product) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6">

        <div className="text-center">

          <h2 className="text-4xl font-bold">
            Product Not Found
          </h2>

          <p className="text-gray-500 mt-4">
            The product you're looking for doesn't exist.
          </p>

          <button
            onClick={() => navigate("/")}
            className="
              mt-8
              bg-brand-primary
              text-white
              px-8
              py-3
              rounded-xl
              hover:bg-brand-brown
              transition
            "
          >
            Continue Shopping
          </button>

        </div>

      </section>
    );
  }

  return (
    <section className="bg-white py-10">

      <div className="max-w-7xl mx-auto px-6">

        {/* Breadcrumb */}

        <Breadcrumb product={product} />

        {/* Product */}

        <div className="grid lg:grid-cols-2 gap-16 mt-10">

          {/* Left */}

          <ProductGallery product={product} />

          {/* Right */}

          <ProductInfo product={product} />

        </div>

                {/* Product Tabs */}

        <div className="mt-20">

          <ProductTabs product={product} />

        </div>

        {/* Related Products */}

        {related.length > 0 && (
          <div className="mt-24">

            <RelatedProducts
              currentProduct={product}
              products={related}
            />

          </div>
        )}

      </div>

    </section>
  );
};

export default ProductDetails;
