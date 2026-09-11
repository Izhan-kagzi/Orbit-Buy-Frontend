import { Link } from "react-router-dom";
import women_banner from "../assets/featured/women_banner.png";

const WomenWearBanner = () => {
  return (
    <Link
      to="/search?q=women"
      className="block w-full overflow-hidden"
      aria-label="Shop Women's Wear"
    >
      <img
        src={women_banner}
        alt="Women's Wear"
        className="w-full h-full object-cover"
      />
    </Link>
  );
};

export default WomenWearBanner;