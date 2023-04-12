import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import EnvironmentPlugin from "vite-plugin-environment";

export default defineConfig({
  server: {
    proxy: {
      "/v2/forecast": {
        target: "https://api.weather.yandex.ru",
        changeOrigin: true
      },
    },
  },
  plugins: [
    react(),
    tsconfigPaths(),
    EnvironmentPlugin("all", { prefix: "VITE_" }),
  ],
  resolve: {
    alias: [
      {
        find: "~antd",
        replacement: "antd",
      },
    ],
  },
});
