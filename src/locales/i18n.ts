import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationUS from './us/translation.json';
import translationKR from './kr/translation.json';
import translationMN from './mn/translation.json';

const resources = {
  us: {
    translation: translationUS,
  },
  kr: {
    translation: translationKR,
  },
  mn: {
    translation: translationMN,
  },
};

const LANGUAGES = ['mn', 'kr', 'us'];

/** 저장해 둔 화면 언어. 처음 오면 몽골어예요 (첫 화면부터 그 언어로 그려서 깜빡이지 않아요). */
function initialLanguage() {
  try {
    const saved = localStorage.getItem('lang');
    if (saved && LANGUAGES.includes(saved)) return saved;
    localStorage.setItem('lang', 'mn');
  } catch {
    // 저장소를 못 쓰는 브라우저는 기본 언어로 시작해요.
  }
  return 'mn';
}

i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage(),
  fallbackLng: 'us',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
