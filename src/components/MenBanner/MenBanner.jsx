import { Link } from "react-router-dom";
import men_banner from "../assets/featured/men_banner.png";

const MensWearBanner = () => {
  return (
    <Link to="/search?q=men" className="block">
      <img
        src={men_banner}
        alt="Men's Wear"
        className="w-full h-full object-cover"
      />
    </Link>
  );
};

export default MensWearBanner;