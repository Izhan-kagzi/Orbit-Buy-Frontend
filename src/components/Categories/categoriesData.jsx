import mens from "../../assets/banners/mens-collection.webp";
import womens from "../../assets/banners/womens-collection.webp";
import newArrival from "../../assets/banners/new-arrival-banner.webp";
import bestSeller from "../../assets/banners/best-seller-banner.webp";

const categoriesData = [
  {
    id: 1,
    title: "Men's Collection",
    subtitle: "Refined shirts, T-shirts, denim, jackets and modern essentials.",
    image: mens,
    link: "/mens-shirts",
    button: "Explore Men's Collection",
  },

  {
    id: 2,
    title: "Women's Collection",
    subtitle: "Elevated dresses, shirts, denim, skirts and contemporary styles.",
    image: womens,
    link: "/women-dresses",
    button: "Explore Women's Collection",
  },

  {
    id: 3,
    title: "New Arrivals",
    subtitle: "Discover the latest styles, fresh silhouettes and seasonal trends.",
    image: newArrival,
    link: "/new-arrivals",
    button: "Discover New Arrivals",
  },

  {
    id: 4,
    title: "Best Sellers",
    subtitle: "Shop the styles our customers love, chosen for quality and appeal.",
    image: bestSeller,
    link: "/best-sellers",
    button: "Shop Best Sellers",
  },
];

export default categoriesData;