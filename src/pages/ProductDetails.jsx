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
    let cancelled = false;

    const loadProduct = async () => {
      if (!id) {
        setProduct(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setProduct(null);
        setRelated([]);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        /*
        =====================================================
        GET PRODUCT
        =====================================================
        */

        const productResponse = await api.get(
          `/products/${encodeURIComponent(id)}`
        );

        if (
          !productResponse?.success ||
          !productResponse?.product
        ) {
          throw new Error("Product not found.");
        }

        const productData = productResponse.product;

        if (cancelled) return;

        /*
        =====================================================
        NORMALIZE PRODUCT IMAGES
        =====================================================
        */

        const normalizedProduct = {
          ...productData,

          image: getImageUrl(productData.image),

          images: Array.isArray(productData.images)
            ? productData.images.map(getImageUrl)
            : productData.image
              ? [getImageUrl(productData.image)]
              : [],

          videos: Array.isArray(productData.videos)
            ? productData.videos.map(getImageUrl)
            : [],
        };

        setProduct(normalizedProduct);

        /*
        =====================================================
        GET RELATED PRODUCTS
        =====================================================
        */

        try {
          const relatedResponse = await api.get(
            `/products/${encodeURIComponent(id)}/related`
          );

          if (cancelled) return;

          setRelated(
            Array.isArray(relatedResponse?.products)
              ? relatedResponse.products.map((item) => ({
                  ...item,

                  image: getImageUrl(item.image),

                  images: Array.isArray(item.images)
                    ? item.images.map(getImageUrl)
                    : item.image
                      ? [getImageUrl(item.image)]
                      : [],

                  videos: Array.isArray(item.videos)
                    ? item.videos.map(getImageUrl)
                    : [],
                }))
              : []
          );
        } catch (relatedError) {
          // Related products should never make
          // the main product disappear.
          console.warn(
            "[ProductDetails] Related products failed:",
            relatedError
          );

          if (!cancelled) {
            setRelated([]);
          }
        }
      } catch (error) {
        console.error(
          "[ProductDetails] Failed to load product:",
          error
        );

        if (!cancelled) {
          setProduct(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      cancelled = true;
    };
  }, [id]);

  /*
  =====================================================
  LOADING
  =====================================================
  */

  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  /*
  =====================================================
  PRODUCT NOT FOUND
  =====================================================
  */

  if (!product) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">

          <h2 className="text-4xl font-bold text-brand-dark">
            Product Not Found
          </h2>

          <p className="text-gray-500 mt-4">
            The product you're looking for doesn't exist
            or may have been removed.
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

  /*
  =====================================================
  PRODUCT PAGE
  =====================================================
  */

  return (
    <section className="bg-white py-10">

      <div className="max-w-7xl mx-auto px-6">

        {/* Breadcrumb */}
        <Breadcrumb product={product} />

        {/* Product */}
        <div className="grid lg:grid-cols-2 gap-16 mt-10">

          {/* Gallery */}
          <ProductGallery product={product} />

          {/* Product Information */}
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