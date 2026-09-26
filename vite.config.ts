import { existsSync } from 'node:fs';
import { defineConfig, loadEnv, Plugin, UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

import tailwindcss from '@tailwindcss/vite';

/**
 * @tailwindcss/vite 4.0.x는 디스크에 없는 CSS까지 처리하려다 멈춰요.
 * vanilla-extract가 만드는 *.vanilla.css, Storybook의 가상 iframe.html 같은 파일은
 * Tailwind를 거칠 필요가 없어서 건너뛰게 감싸요. Tailwind를 올리면 지워도 돼요.
 */
function isVirtualCss(id: string) {
  if (id.includes('\0') || id.includes('.vanilla.css')) return true;
  return !existsSync(id.split('?')[0]);
}

function tailwindSkippingVirtualCss(): Plugin[] {
  return tailwindcss().map((plugin) => {
    const transform = plugin.transform;
    if (typeof transform !== 'function') return plugin;
    return {
      ...plugin,
      transform(code, id, options) {
        if (isVirtualCss(id)) return null;
        return transform.call(this, code, id, options);
      },
    };
  });
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const config: UserConfig = {
    plugins: [
      tailwindSkippingVirtualCss(),
      react(),
      svgr(),
      vanillaExtractPlugin(),
    ],
    resolve: {
      alias: [{ find: '@', replacement: '/src' }],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', // or "modern"
        },
      },
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
