import { changeLanguage, LocalizeProvider } from '@/i18n/localize'
import { useLanguage } from '@/hooks/store/useLanguageStore'
import { useDarkMode } from '@/hooks/store/useThemeStore'
import { useEffect } from 'react'

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const darkMode = useDarkMode()
  const language = useLanguage()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  useEffect(() => {
    document.documentElement.lang = language
    void changeLanguage(language)
  }, [language])

  return <LocalizeProvider>{children}</LocalizeProvider>
}

export { AppProviders }
