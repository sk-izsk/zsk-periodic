import { useLanguage } from '@/hooks/store/useLanguageStore'
import { useDarkMode } from '@/hooks/store/useThemeStore'
import { changeLanguage, LocalizeProvider } from '@/i18n/localize'
import { useEffect } from 'react'
import { ErrorBoundary, type FallbackProps } from 'zsk-react-error'
import { GlobalErrorFallback } from './components/GlobalErrorFallback'

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

  return (
    <ErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }: FallbackProps) => (
        <GlobalErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
      )}
    >
      <LocalizeProvider>{children}</LocalizeProvider>
    </ErrorBoundary>
  )
}

export { AppProviders }
