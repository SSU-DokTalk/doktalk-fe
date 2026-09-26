import { defineConfig, loadEnv, UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const config: UserConfig = {
    plugins: [react(), vanillaExtractPlugin()],
    resolve: {
      alias: [{ find: '@', replacement: '/src' }],
    },
    build: {
      rollupOptions: {
        output: {
          // 라이브러리는 배포마다 거의 안 바뀌어서 vendor 한 조각으로 묶어 브라우저 캐시를 오래 써요.
          // 거의 다 앱을 켤 때부터 필요해요. 페이지 코드는 src/pages.ts에서 화면마다 나뉘어요.
          manualChunks(id) {
            if (
              id.includes('/node_modules/') ||
              id.includes('commonjsHelpers')
            ) {
              return 'vendor';
            }
          },
        },
      },
    },
  };
  // 개발 서버와 vite preview에서 /api를 백엔드로 넘겨요.
  if (command === 'serve') {
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
