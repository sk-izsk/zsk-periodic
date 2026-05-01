import type { AppLanguage, ElementLocaleRecord, IonLocaleRecord } from './types'

const elementLocaleCache: Partial<Record<AppLanguage, Record<string, ElementLocaleRecord>>> = {}
const ionLocaleCache: Partial<Record<AppLanguage, Record<string, IonLocaleRecord>>> = {}

const elementLoaders: Record<AppLanguage, () => Promise<Record<string, ElementLocaleRecord>>> = {
  en: async () => (await import('./locales/elements/en')).default,
  fr: async () => (await import('./locales/elements/fr')).default,
}

const ionLoaders: Record<AppLanguage, () => Promise<Record<string, IonLocaleRecord>>> = {
  en: async () => ({}),
  fr: async () => (await import('./locales/ions/fr')).default,
}

export const loadElementLocale = async (
  lang: AppLanguage,
): Promise<Record<string, ElementLocaleRecord>> => {
  if (!elementLocaleCache[lang]) {
    elementLocaleCache[lang] = await elementLoaders[lang]()
  }
  return elementLocaleCache[lang] ?? {}
}

export const loadIonLocale = async (
  lang: AppLanguage,
): Promise<Record<string, IonLocaleRecord>> => {
  if (!ionLocaleCache[lang]) {
    ionLocaleCache[lang] = await ionLoaders[lang]()
  }
  return ionLocaleCache[lang] ?? {}
}

export const clearLocaleCaches = () => {
  for (const key of Object.keys(elementLocaleCache) as AppLanguage[]) {
    delete elementLocaleCache[key]
  }
  for (const key of Object.keys(ionLocaleCache) as AppLanguage[]) {
    delete ionLocaleCache[key]
  }
}
