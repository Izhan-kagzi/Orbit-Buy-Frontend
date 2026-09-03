import Hero from "../components/Hero/Hero";
import WhyChoose from "../components/WhyChoose/WhyChoose";
import Categories from "../components/Categories/Categories";
import NewArrivals from "../components/NewArrivals/NewArrivals";
import FlashSale from "../components/FlashSale/FlashSale";
import BestSellers from "../components/BestSellers/BestSellers";
import FeaturedCollection from "../components/FeaturedCollection/FeaturedCollection";
import ShopByBrand from "../components/ShopByBrand/ShopByBrand";
import Reviews from "../components/Reviews/Reviews";


/* ============================================================
   Homepage section order follows the standard e-commerce
   funnel (Baymard / NN-group pattern):

   1. Hero            — brand statement, primary CTA
   2. WhyChoose        — trust signals, right up front, before
                         the visitor has to decide whether to
                         trust the store with browsing/data
   3. Categories       — primary navigation aid: get shoppers
                         into a relevant product set fast
   4. New Arrivals      — fresh discovery for returning visitors
   5. Flash Sale        — urgency/promo, placed mid-scroll where
                         engagement is still high
   6. Best Sellers      — social proof ("others already chose this")
   7. Featured          — curated/editorial storytelling
   8. Shop by Brand     — secondary discovery path
   9. Reviews           — final trust reinforcement right before
                         the conversion-oriented close
   10. Newsletter        — capture visitors who aren't ready to
                         buy yet, right before they hit the footer
   ============================================================ */
const Home = () => {
  return (
    <main className="bg-gray-50">

      <Hero />

      

      <Categories />

      <section className="py-12">
        <NewArrivals />
      </section>

      <section className="py-12">
        <FlashSale />
      </section>

      <section className="py-12">
        <BestSellers />
      </section>

      <section className="py-12">
        <FeaturedCollection />
      </section>

      <ShopByBrand />

      <section className="py-12 pb-16">
        <Reviews />
      </section>
      <WhyChoose />
      

    </main>
  );
};

export default Home;
