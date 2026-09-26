import { defineConfig, loadEnv, UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const config: UserConfig = {
    plugins: [react(), vanillaExtractPlugin()],
    resolve: {
      alias: [{ find: '@', replacement: '/src' }],
    },
  };
  if (env.NODE_ENV == 'development') {
    config['server'] = {
      proxy: {
        '/api': {
          target: env.VITE_API_SRC,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          secure: false,
          ws: true,
        },
      },
    };
  }
  return config;
});
