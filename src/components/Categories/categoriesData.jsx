import mens from "../../assets/banners/mens-collection.webp";
import womens from "../../assets/banners/womens-collection.webp";
import newArrival from "../../assets/banners/new-arrival-banner.webp";
import bestSeller from "../../assets/banners/best-seller-banner.webp";

const categoriesData = [
  {
    id: 1,
    title: "Men's Collection",
    subtitle: "Premium Shirts, Jeans & More",
    image: mens,
    link: "/mens-shirts",
    button: "Shop Men",
  },

  {
    id: 2,
    title: "Women's Collection",
    subtitle: "Elegant Dresses & Cord Sets",
    image: womens,
    link: "/women-dresses",
    button: "Shop Women",
  },

  {
    id: 3,
    title: "New Arrivals",
    subtitle: "Latest Fashion Trends",
    image: newArrival,
    link: "/new-arrivals",
    button: "Explore",
  },

  {
    id: 4,
    title: "Best Sellers",
    subtitle: "Most Loved Products",
    image: bestSeller,
    link: "/best-sellers",
    button: "View All",
  },
];

export default categoriesData;