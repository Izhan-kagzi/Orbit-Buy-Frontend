import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Every route change should start scrolled to the top of the new
// page — without this, React Router preserves whatever scroll
// position the previous page was at, so navigating from deep in a
// long page (e.g. Shop) to a new page lands you mid-page instead
// of at the top.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
