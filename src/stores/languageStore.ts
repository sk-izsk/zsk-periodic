import { DEFAULT_LANGUAGE, isSupportedLanguage } from '@/i18n/config'
import type { AppLanguage } from '@/i18n/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LanguageStore {
  language: AppLanguage
  setLanguage: (lang: string) => void
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: DEFAULT_LANGUAGE,
      setLanguage: (lang) => {
        if (!isSupportedLanguage(lang)) {
          return
        }
        set({ language: lang })
      },
    }),
    {
      name: 'zperiod_language_v1',
      merge: (persisted, current) => {
        const state = { ...current, ...(persisted as Partial<LanguageStore>) }
        return {
          ...state,
          language: isSupportedLanguage(state.language ?? '') ? state.language : DEFAULT_LANGUAGE,
        }
      },
    },
  ),
)
