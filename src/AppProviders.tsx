import { useLanguage } from '@/hooks/store/useLanguageStore'
import { useDarkMode } from '@/hooks/store/useThemeStore'
import { changeLanguage, LocalizeProvider } from '@/i18n/localize'
import { useEffect } from 'react'
import { ErrorBoundary } from 'zsk-react-error'
import { GlobalErrorFallback } from './components/GlobalErrorFallback'

interface AppProvidersProps {
  children: React.ReactNode
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  const darkMode = useDarkMode()
  const language = useLanguage()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  useEffect(() => {
    document.documentElement.lang = language
    void changeLanguage(language)
  }, [language])

  return (
    <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
      <LocalizeProvider>{children}</LocalizeProvider>
    </ErrorBoundary>
  )
}
