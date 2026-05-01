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

const mergeElementRecord = (
  base: ElementLocaleRecord | undefined,
  override: ElementLocaleRecord,
): ElementLocaleRecord => ({
  ...base,
  ...override,
  history:
    base?.history || override.history
      ? {
          ...base?.history,
          ...override.history,
        }
      : undefined,
  stse: override.stse ?? base?.stse,
  uses: override.uses ?? base?.uses,
  hazards: override.hazards ?? base?.hazards,
})

const mergeElementLocales = (
  base: Record<string, ElementLocaleRecord>,
  override: Record<string, ElementLocaleRecord>,
): Record<string, ElementLocaleRecord> => {
  const merged: Record<string, ElementLocaleRecord> = { ...base }

  for (const [key, record] of Object.entries(override)) {
    merged[key] = mergeElementRecord(base[key], record)
  }

  return merged
}

export const loadElementLocale = async (
  lang: AppLanguage,
): Promise<Record<string, ElementLocaleRecord>> => {
  if (!elementLocaleCache[lang]) {
    const locale = await elementLoaders[lang]()
    if (lang === 'en') {
      elementLocaleCache.en = locale
    } else {
      const englishLocale = elementLocaleCache.en ?? (await elementLoaders.en())
      elementLocaleCache.en = englishLocale
      elementLocaleCache[lang] = mergeElementLocales(englishLocale, locale)
    }
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
