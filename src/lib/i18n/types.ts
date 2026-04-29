export const SUPPORTED_LANGUAGES = ['en', 'zh', 'zh-Hant', 'fr', 'ru', 'fa', 'ur', 'tl'] as const

export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number]

export type TranslationDict = {
  [key: string]: string | TranslationDict
}

export type ElementLocaleRecord = {
  name?: string
  ions?: string
  history?: {
    discoveryYear?: string
    discoveredBy?: string
    namedBy?: string
  }
  stse?: string[]
  uses?: string[]
  hazards?: string[]
}

export type IonLocaleRecord = {
  name?: string
  customData?: Record<string, unknown>
}
