import type { StorybookConfig } from '@storybook/react-vite';

// Vite 설정(플러그인, @ 별칭)은 프로젝트의 vite.config.ts를 그대로 이어받아요.
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
};

export default config;
