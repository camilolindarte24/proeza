import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue"; // o react, según tu proyecto
import path from "path";

export default defineConfig({
  plugins: [vue()], // cambia según tu framework
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
