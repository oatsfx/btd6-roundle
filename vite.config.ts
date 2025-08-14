import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "/btd6-roundle/",
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components"),
      configs: path.resolve(__dirname, "src/configs"),
      data: path.resolve(__dirname, "src/data"),
      hooks: path.resolve(__dirname, "src/hooks"),
      images: path.resolve(__dirname, "src/images"),
      pages: path.resolve(__dirname, "src/pages"),
      types: path.resolve(__dirname, "src/types"),
      util: path.resolve(__dirname, "src/util"),
      // Add other aliases if needed
    },
  },
});
