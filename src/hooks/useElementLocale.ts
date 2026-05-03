import { useEffect, useState } from 'react'
import { loadElementLocale } from '../i18n/locale-loaders'
import { ElementLocaleRecord, type AppLanguage } from '../i18n/types'

export const useElementLocale = (language: AppLanguage): Record<string, ElementLocaleRecord> => {
  const [locale, setLocale] = useState<Record<string, ElementLocaleRecord>>({})

  useEffect(() => {
    let mounted = true
    loadElementLocale(language).then((records) => {
      if (mounted) {
        setLocale(records)
      }
    })
    return () => {
      mounted = false
    }
  }, [language])

  return locale
}
