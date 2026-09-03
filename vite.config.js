import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;

          // Core React runtime — needed on every single page, so it
          // gets its own long-lived cacheable chunk separate from
          // app code (which changes far more often than React itself).
          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("/react-router-dom/") ||
            id.includes("/react-router/") ||
            id.includes("/scheduler/")
          ) {
            return "vendor-react";
          }

          // Heavy, page-specific libraries split out of the main
          // bundle so pages that don't use them (most of the site)
          // never pay their download cost.
          if (id.includes("framer-motion")) return "vendor-motion";
          if (id.includes("swiper")) return "vendor-swiper";
          if (id.includes("recharts") || id.includes("d3-")) return "vendor-charts";
          if (id.includes("@stripe")) return "vendor-stripe";

          return "vendor";
        },
      },
    },
  },
});