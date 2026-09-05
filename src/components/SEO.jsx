import { useEffect } from "react";

const SITE_URL = "https://orbitbuy.vercel.app";

const DEFAULT_TITLE =
  "Orbit Buy | Premium Fashion for Men & Women";

const DEFAULT_DESCRIPTION =
  "Shop premium men's and women's fashion at Orbit Buy. Discover stylish clothing, trendy collections, quality apparel and the latest fashion for every occasion.";

function setMeta(name, content) {
  let element = document.querySelector(`meta[name="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setProperty(property, content) {
  let element = document.querySelector(
    `meta[property="${property}"]`
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setCanonical(url) {
  let link = document.querySelector(
    'link[rel="canonical"]'
  );

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", url);
}

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = `${SITE_URL}/og-image.jpg`,
  imageAlt = "Orbit Buy Premium Fashion for Men and Women",
}) {
  useEffect(() => {
    const cleanTitle = title.includes("Orbit Buy")
      ? title
      : `${title} | Orbit Buy`;

    const cleanPath = path.startsWith("/")
      ? path
      : `/${path}`;

    const pageUrl = `${SITE_URL}${cleanPath}`;

    // Browser / Google title
    document.title = cleanTitle;

    // Basic SEO
    setMeta("description", description);
    setMeta(
      "robots",
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );

    // Canonical
    setCanonical(pageUrl);

    // Open Graph
    setProperty("og:type", "website");
    setProperty("og:site_name", "Orbit Buy");
    setProperty("og:title", cleanTitle);
    setProperty("og:description", description);
    setProperty("og:url", pageUrl);
    setProperty("og:image", image);
    setProperty("og:image:secure_url", image);
    setProperty("og:image:type", "image/jpeg");
    setProperty("og:image:width", "1200");
    setProperty("og:image:height", "630");
    setProperty("og:image:alt", imageAlt);
    setProperty("og:locale", "en_IN");

    // Twitter / X
    setMeta(
      "twitter:card",
      "summary_large_image"
    );
    setMeta("twitter:title", cleanTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);
    setMeta("twitter:image:alt", imageAlt);

    return () => {
      // No cleanup required.
    };
  }, [
    title,
    description,
    path,
    image,
    imageAlt,
  ]);

  return null;
}