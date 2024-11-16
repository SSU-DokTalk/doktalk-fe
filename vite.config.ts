import { defineConfig, loadEnv, UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  let config: UserConfig = {
    plugins: [react()],
    resolve: {
      alias: [{ find: "@", replacement: "/src" }],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler", // or "modern"
        },
      },
    },
  };
  if (env.NODE_ENV == "development") {
    config["server"] = {
      proxy: {
        "/api": {
          target: env.VITE_API_SRC,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          secure: false,
          ws: true,
        },
      },
    };
  }
  return config;
});