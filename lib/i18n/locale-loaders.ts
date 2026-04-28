import type { AppLanguage, ElementLocaleRecord, IonLocaleRecord } from './types';

const elementLocaleCache: Partial<Record<AppLanguage, Record<string, ElementLocaleRecord>>> = {};
const ionLocaleCache: Partial<Record<AppLanguage, Record<string, IonLocaleRecord>>> = {};

const elementLoaders: Record<AppLanguage, () => Promise<Record<string, ElementLocaleRecord>>> = {
  en: async () => ({}),
  zh: async () => (await import('./locales/elements/zh')).default,
  'zh-Hant': async () => (await import('./locales/elements/zh-Hant')).default,
  fr: async () => (await import('./locales/elements/fr')).default,
  ru: async () => (await import('./locales/elements/ru')).default,
  fa: async () => (await import('./locales/elements/fa')).default,
  ur: async () => (await import('./locales/elements/ur')).default,
  tl: async () => (await import('./locales/elements/tl')).default,
};

const ionLoaders: Record<AppLanguage, () => Promise<Record<string, IonLocaleRecord>>> = {
  en: async () => ({}),
  zh: async () => (await import('./locales/ions/zh')).default,
  'zh-Hant': async () => (await import('./locales/ions/zh-Hant')).default,
  fr: async () => (await import('./locales/ions/fr')).default,
  ru: async () => (await import('./locales/ions/ru')).default,
  fa: async () => (await import('./locales/ions/fa')).default,
  ur: async () => (await import('./locales/ions/ur')).default,
  tl: async () => (await import('./locales/ions/tl')).default,
};

export async function loadElementLocale(lang: AppLanguage): Promise<Record<string, ElementLocaleRecord>> {
  if (!elementLocaleCache[lang]) {
    elementLocaleCache[lang] = await elementLoaders[lang]();
  }
  return elementLocaleCache[lang] ?? {};
}

export async function loadIonLocale(lang: AppLanguage): Promise<Record<string, IonLocaleRecord>> {
  if (!ionLocaleCache[lang]) {
    ionLocaleCache[lang] = await ionLoaders[lang]();
  }
  return ionLocaleCache[lang] ?? {};
}

export function clearLocaleCaches() {
  for (const key of Object.keys(elementLocaleCache) as AppLanguage[]) {
    delete elementLocaleCache[key];
  }
  for (const key of Object.keys(ionLocaleCache) as AppLanguage[]) {
    delete ionLocaleCache[key];
  }
}
