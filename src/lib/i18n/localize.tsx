import { APP_LANGUAGE_STORAGE_KEY, DEFAULT_LANGUAGE } from '@/lib/i18n/config'
import { enUI } from '@/lib/i18n/ui/en'
import { frUI } from '@/lib/i18n/ui/fr'
import { createI18n } from 'zsk-react-i18n'

export const resources = {
  en: {
    translation: enUI,
  },
  fr: {
    translation: frUI,
  },
} as const

export const {
  LocalizeProvider,
  useAppTranslation,
  AppTrans,
  changeLanguage,
  getLanguage,
  getInitialLanguage,
  isSupportedLanguage,
} = createI18n({
  resources,
  defaultLanguage: DEFAULT_LANGUAGE,
  fallbackLanguage: DEFAULT_LANGUAGE,
  localStorageKey: APP_LANGUAGE_STORAGE_KEY,
})
