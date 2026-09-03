// Monsoon Collection (primary hero)
import heroMonsoon from "../../assets/banners/hero-monsoon.webp";

// Men's Collection
import hero1 from "../../assets/hero/hero1.jpg";

// Women's Collection
import hero2 from "../../assets/hero/hero2.png";

import hero3 from "../../assets/hero/hero3.png";

// Video Banner (optional)
import heroVideo from "../../assets/hero/hero-video.mp4";

import herovideo2 from "../../assets/hero/herovideo2.mp4"


const heroData = [
  {
    id: 0,
    type: "image",
    media: heroMonsoon,

    

    primaryButton: "Shop the Collection",

    primaryLink: "/new-arrivals",

    secondaryButton: "Explore All",

    secondaryLink: "/shop",
  },

  {
    id: 1,
    type: "image",
    media: hero3,


    primaryButton: "Shop Men",

    primaryLink: "/mens-shirts",

    secondaryButton: "Explore Collection",

    secondaryLink: "/mens-jeans",
  },

  {
    id: 2,
    type: "image",
    media: hero1,

    

    primaryButton: "Shop Men",

    primaryLink: "/mens-shirts",

    secondaryButton: "Explore Collection",

    secondaryLink: "/mens-jeans",
  },

  {
    id: 3,
    type: "image",
    media: hero2,

   

    primaryButton: "Shop Women",

    primaryLink: "/women-dresses",

    secondaryButton: "Party Wear",

    secondaryLink: "/women-partywear",
  },

  {
    id: 4,
    type: "video",
    media: heroVideo,
    primaryButton: "Shop Now",

    primaryLink: "/",

    secondaryButton: "New Arrivals",

    secondaryLink: "/",
  },
  {
    id: 5,
    type: "video",
    media: herovideo2,

    primaryButton: "Shop Now",

    primaryLink: "/",

    secondaryButton: "New Arrivals",

    secondaryLink: "/",
  },
];

export default heroData;