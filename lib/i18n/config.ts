import type { AppLanguage } from './types'
import { SUPPORTED_LANGUAGES } from './types'

export const DEFAULT_LANGUAGE: AppLanguage = 'en'
export const APP_LANGUAGE_STORAGE_KEY = 'zperiod_lang'
export const APP_SETTINGS_STORAGE_KEY = 'zperiod_app_state_v1'

export const RTL_LANGUAGES = new Set<AppLanguage>(['fa', 'ur'])

export function isSupportedLanguage(value: string): value is AppLanguage {
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(value)
}
