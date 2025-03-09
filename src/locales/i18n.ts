import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationUS from './us/translation.json'
import translationKR from './kr/translation.json'

const resources = {
    us: {
        translation: translationUS,
    },
    kr: {
        translation: translationKR,
    },
}

i18n.use(initReactI18next).init({
    resources,
    lng: 'kr',
    fallbackLng: 'us',
    interpolation: {
        escapeValue: false,
    },
})

export default i18n
