import mens from "../../assets/banners/mens-collection.webp";
import womens from "../../assets/banners/womens-collection.webp";
import newArrival from "../../assets/banners/new-arrival-banner.webp";
import bestSeller from "../../assets/banners/best-seller-banner.webp";

const categoriesData = [
  {
    id: 1,
    title: "Men's Collection",
    subtitle: "Premium Shirts, T-Shirts, Jeans & More",
    image: mens,
    link: "/mens-shirts",
    button: "Shop Men's Fashion",
  },

  {
    id: 2,
    title: "Women's Collection",
    subtitle: "Dresses, Shirts, Jeans, Skirts & More",
    image: womens,
    link: "/women-dresses",
    button: "Shop Women's Fashion",
  },

  {
    id: 3,
    title: "New Arrivals",
    subtitle: "Discover the Latest Fashion Trends",
    image: newArrival,
    link: "/new-arrivals",
    button: "Explore New Arrivals",
  },

  {
    id: 4,
    title: "Best Sellers",
    subtitle: "Shop Our Most Loved Fashion",
    image: bestSeller,
    link: "/best-sellers",
    button: "Shop Best Sellers",
  },
];

export default categoriesData;