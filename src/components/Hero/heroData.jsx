// Men's Collection
import hero3 from "../../assets/hero/hero3.png";

/*
  Hero videos are stored in:
  public/hero/

  Files are accessed directly using:
  /hero/filename.mp4

  No imports are required for public files.
*/

const heroData = [
  {
    id: 0,
    type: "video",
    media: "/hero/hero-video.mp4",
    primaryButton: "Shop Now",
    primaryLink: "/",
    secondaryButton: "New Arrivals",
    secondaryLink: "/new-arrivals",
  },

  {
    id: 1,
    type: "video",
    media: "/hero/herovideo2.mp4",
    primaryButton: "Shop Now",
    primaryLink: "/",
    secondaryButton: "New Arrivals",
    secondaryLink: "/new-arrivals",
  },

  {
    id: 2,
    type: "video",
    media: "/hero/herovideo4.mp4",
    primaryButton: "Shop the Collection",
    primaryLink: "/new-arrivals",
    secondaryButton: "Explore All",
    secondaryLink: "/shop",
  },

  {
    id: 3,
    type: "image",
    media: hero3,
    primaryButton: "Shop Men",
    primaryLink: "/mens-shirts",
    secondaryButton: "Explore Collection",
    secondaryLink: "/mens-jeans",
  },

  {
    id: 4,
    type: "video",
    media: "/hero/herovideo3.mp4",
    primaryButton: "Shop Now",
    primaryLink: "/",
    secondaryButton: "New Arrivals",
    secondaryLink: "/new-arrivals",
  },

  {
    id: 5,
    type: "video",
    media: "/hero/herovideo1.mp4",
    primaryButton: "Shop Men",
    primaryLink: "/mens-shirts",
    secondaryButton: "Explore Collection",
    secondaryLink: "/mens-jeans",
  },

  {
    id: 6,
    type: "video",
    media: "/hero/herovideo5.mp4",
    primaryButton: "Shop Women",
    primaryLink: "/women-dresses",
    secondaryButton: "Party Wear",
    secondaryLink: "/women-partywear",
  },
];

export default heroData;