import { useLanguageStore as useLanguageState } from '@/stores/languageStore'

export const useLanguage = () => useLanguageState((s) => s.language)
export const useSetLanguage = () => useLanguageState((s) => s.setLanguage)
