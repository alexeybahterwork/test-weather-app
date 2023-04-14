import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import EnvironmentPlugin from "vite-plugin-environment";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      proxy: {
        "/v2/forecast": {
          target: env.VITE_YANDEX_FORECAST_API_URL,
          changeOrigin: true,
        }
      }
    },
    plugins: [
      react(),
      tsconfigPaths(),
      EnvironmentPlugin("all", { prefix: "VITE_" })
    ],
    resolve: {
      alias: [
        {
          find: "~antd",
          replacement: "antd"
        }
      ]
    }
  };
});
