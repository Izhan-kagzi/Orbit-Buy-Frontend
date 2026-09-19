import Hero from "../components/Hero/Hero";
import WhyChoose from "../components/WhyChoose/WhyChoose";
import Categories from "../components/Categories/Categories";
import NewArrivals from "../components/NewArrivals/NewArrivals";
import FlashSale from "../components/FlashSale/FlashSale";
import BestSellers from "../components/BestSellers/BestSellers";
import FeaturedCollection from "../components/FeaturedCollection/FeaturedCollection";
import ShopByBrand from "../components/ShopByBrand/ShopByBrand";
import Reviews from "../components/Reviews/Reviews";
import Instagram  from "../components/Instagram/Instagram";
import SEO from "../components/SEO";



import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* =====================================================
          HOMEPAGE SEO
      ====================================================== */}
      <SEO
        title="Orbit Buy | Premium Fashion for Men & Women"
        description="Shop premium men's and women's fashion at Orbit Buy. Discover stylish shirts, t-shirts, jeans, jackets, dresses, skirts, formal wear and the latest fashion collections."
        path="/"
        image="https://orbitbuy.vercel.app/og-image.jpg"
        imageAlt="Orbit Buy Premium Men's and Women's Fashion"
      />

      <main className="bg-gray-50">

        {/* =====================================================
            1. HERO
        ====================================================== */}
        <section aria-label="Orbit Buy premium fashion">
          <Hero />
        </section>

        

        {/* =====================================================
            3. CATEGORIES
        ====================================================== */}
        <section
          aria-labelledby="fashion-categories"
          id="fashion-categories"
        >
          <Categories />
        </section>

        

        {/* =====================================================
            4. NEW ARRIVALS
        ====================================================== */}
        <section
          aria-labelledby="new-arrivals"
          id="new-arrivals"
        >
          <NewArrivals />
        </section>

        {/* =====================================================
            5. FLASH SALE
        ====================================================== */}
        <section
          aria-labelledby="flash-sale"
          id="flash-sale"
        >
          <FlashSale />
        </section>

        {/* =====================================================
            6. BEST SELLERS
        ====================================================== */}
        <section
          aria-labelledby="best-sellers"
          id="best-sellers"
        >
          <BestSellers />
        </section>

        {/* =====================================================
            7. FEATURED COLLECTION
        ====================================================== */}
        <section
          aria-labelledby="featured-collection"
          id="featured-collection"
        >
          <FeaturedCollection />
        </section>

        {/* =====================================================
            8. SHOP BY BRAND
        ====================================================== */}
        <section
          aria-labelledby="shop-by-brand"
          id="shop-by-brand"
        >
          <ShopByBrand />
        </section>

        {/* =====================================================
            9. CUSTOMER REVIEWS
        ====================================================== */}
        <section
          aria-labelledby="customer-reviews"
          id="reviews"
        >
          <Reviews />
        </section>

        {/* =====================================================
            2. WHY CHOOSE ORBIT BUY
        ====================================================== */}
        <section
          aria-labelledby="why-choose-orbit-buy"
          id="why-choose-orbit-buy"
        >
          <WhyChoose />
        </section>

        {/* =====================================================
            10. INSTAGRAM / FASHION INSPIRATION
        ====================================================== */}
        <section
          aria-labelledby="orbit-instagram-title"
          id="orbit-instagram"
        >
          <Instagram />
        </section>

      </main>
    </>
  );
};

export default Home;