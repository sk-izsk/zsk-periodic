import type { AppLanguage, TranslationDict } from '../types'
import { enUI } from './en'
import { frUI } from './fr'

const UI_DICTIONARIES: Record<AppLanguage, TranslationDict> = {
  en: enUI,
  fr: frUI,
}

const getByPath = (dict: TranslationDict, key: string): string | undefined => {
  const parts = key.split('.')
  let current: string | TranslationDict | undefined = dict

  for (const part of parts) {
    if (typeof current !== 'object' || current == null || !(part in current)) {
      return undefined
    }
    current = current[part]
  }

  return typeof current === 'string' ? current : undefined
}

export const t = (lang: AppLanguage, key: string, fallback = ''): string => {
  return getByPath(UI_DICTIONARIES[lang], key) ?? getByPath(UI_DICTIONARIES.en, key) ?? fallback
}
