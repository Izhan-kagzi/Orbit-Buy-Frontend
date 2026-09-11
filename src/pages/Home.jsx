import Hero from "../components/Hero/Hero";
import Categories from "../components/Categories/Categories";
import NewArrivals from "../components/NewArrivals/NewArrivals";
import FlashSale from "../components/FlashSale/FlashSale";
import BestSellers from "../components/BestSellers/BestSellers";
import FeaturedCollection from "../components/FeaturedCollection/FeaturedCollection";
import ShopByBrand from "../components/ShopByBrand/ShopByBrand";
import Reviews from "../components/Reviews/Reviews";
import WhyChoose from "../components/WhyChoose/WhyChoose";
import SEO from "../components/SEO";
import men_banner from "../assets/featured/men_banner.png";
import { Link } from "react-router-dom";
import women_banner from "../assets/featured/women_banner.png";
import Instagram from "../components/Instagram/Instagram";
/*
============================================================
ORBIT BUY — HOMEPAGE

Homepage funnel:

1. Hero
   → Main brand introduction + primary shopping CTA

2. Why Choose Orbit Buy
   → Trust signals

3. Categories
   → Main men's and women's shopping paths

4. New Arrivals
   → Latest products

5. Flash Sale
   → Urgency and promotional products

6. Best Sellers
   → Social proof and popular products

7. Featured Collection
   → Curated fashion collection

8. Shop By Brand
   → Brand-based discovery

9. Reviews
   → Customer trust and social proof

============================================================
*/

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

        {/* =================================================
            1. HERO
        ================================================== */}
        <section aria-label="Orbit Buy premium fashion">
          <Hero />
        </section>



        {/* =================================================
            3. CATEGORIES
        ================================================== */}
        <section
          aria-labelledby="fashion-categories"
          id="fashion-categories"
        >
          <Categories />
        </section>

        <Link to="/search?q=men" className="block">
          <img
            src={men_banner}
            alt="Men's Wear"
            className="w-full h-full object-cover"
          />
        </Link>
        <br></br>
        <Link to="/search?q=women" className="block">
          <img
            src={women_banner}
            alt="Women's Wear"
            className="w-full h-full object-cover"
          />
        </Link>
        {/* =================================================
            4. NEW ARRIVALS
        ================================================== */}
        <section
          className="py-12"
          aria-labelledby="new-arrivals"
          id="new-arrivals"
        >
          <NewArrivals />
        </section>

        {/* =================================================
            5. FLASH SALE
        ================================================== */}
        <section
          className="py-12"
          aria-labelledby="flash-sale"
          id="flash-sale"
        >
          <FlashSale />
        </section>



        {/* =================================================
            6. BEST SELLERS
        ================================================== */}
        <section
          className="py-12"
          aria-labelledby="best-sellers"
          id="best-sellers"
        >
          <BestSellers />
        </section>

        {/* =================================================
            7. FEATURED COLLECTION
        ================================================== */}
        <section
          className="py-12"
          aria-labelledby="featured-collection"
          id="featured-collection"
        >
          <FeaturedCollection />
        </section>

        {/* =================================================
            8. SHOP BY BRAND
        ================================================== */}
        <section
          aria-labelledby="shop-by-brand"
          id="shop-by-brand"
        >
          <ShopByBrand />
        </section>

        {/* =================================================
            9. CUSTOMER REVIEWS
        ================================================== */}
        <section
          className="py-12 pb-16"
          aria-labelledby="customer-reviews"
          id="reviews"
        >
          <Reviews />
        </section>

        {/* =================================================
            2. WHY CHOOSE ORBIT BUY
        ================================================== */}
        <section
          aria-labelledby="why-choose-orbit-buy"
          id="why-choose-orbit-buy"
        >
          <WhyChoose />
        </section>
        
        <section
          aria-labelledby="orbit-instagram"
          id="orbit-instagram"
        >
          <Instagram />
        </section>


      </main>
    </>
  );
};

export default Home;