import type { Decorator, Preview } from '@storybook/react-vite';
import i18n from '../src/locales/i18n';

// 앱(main.tsx)과 같은 토큰·글꼴·전역 기본 스타일 위에서 확인해요.
import '../src/design-system/tokens/theme.css';
import '../src/design-system/styles/fonts.css';
import '../src/design-system/styles/reset.css';

const HTML_LANG: Record<string, string> = { kr: 'ko', mn: 'mn', us: 'en' };

/** 툴바에서 고른 언어로 i18next와 <html lang>을 바꿔요. 몽골어 길이 확인용이에요. */
const withLocale: Decorator = (Story, context) => {
  const locale = String(context.globals.locale ?? 'kr');
  if (i18n.language !== locale) {
    void i18n.changeLanguage(locale);
  }
  document.documentElement.lang = HTML_LANG[locale] ?? 'ko';
  return <Story />;
};

const preview: Preview = {
  globalTypes: {
    locale: {
      description: '화면 언어',
      toolbar: {
        title: '언어',
        icon: 'globe',
        items: [
          { value: 'mn', title: 'Монгол хэл' },
          { value: 'kr', title: '한국어' },
          { value: 'us', title: 'English' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    locale: 'kr',
    backgrounds: { value: 'canvas' },
  },
  parameters: {
    layout: 'padded',
    backgrounds: {
      options: {
        canvas: { name: 'Canvas', value: '#F3F4F7' },
        surface: { name: 'Surface', value: '#FFFFFF' },
      },
    },
    viewport: {
      options: {
        mobile: {
          name: 'Mobile 390',
          styles: { width: '390px', height: '844px' },
          type: 'mobile',
        },
        tablet: {
          name: 'Tablet 768',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
        desktop: {
          name: 'Desktop 1440',
          styles: { width: '1440px', height: '900px' },
          type: 'desktop',
        },
      },
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  decorators: [withLocale],
};

export default preview;
