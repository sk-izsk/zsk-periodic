import { useLanguage, useSetLanguage } from '@/hooks/store/useLanguageStore'
import { useSearchQuery, useSetSearchQuery } from '@/hooks/store/useTableStore'
import { useDarkMode, useToggleDarkMode } from '@/hooks/store/useThemeStore'
import { useAppTranslation } from '@/i18n/localize'
import { useRouterState } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { LanguageMenu } from './LanguageMenu'
import { NavBrand } from './NavBrand'
import { NavRouteLinks } from './NavRouteLinks'
import { NavSearch } from './NavSearch'
import { ThemeToggle } from './ThemeToggle'

export const Nav: React.FC = () => {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const { t } = useAppTranslation()
  const darkMode = useDarkMode()
  const toggleDarkMode = useToggleDarkMode()
  const language = useLanguage()
  const setLanguage = useSetLanguage()
  const searchQuery = useSearchQuery()
  const setSearchQuery = useSetSearchQuery()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const searchRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', closeOnOutsideClick)
    return () => document.removeEventListener('mousedown', closeOnOutsideClick)
  }, [])

  useEffect(() => {
    const onQuickSearch = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        searchRef.current?.focus()
        searchRef.current?.select()
      }
    }
    window.addEventListener('keydown', onQuickSearch)
    return () => window.removeEventListener('keydown', onQuickSearch)
  }, [])

  return (
    <nav className="sticky top-0 z-50 flex items-center gap-3 px-4 py-2 border-b shadow-sm border-line bg-elevated/90 backdrop-blur-xl">
      <NavBrand />
      <NavRouteLinks pathname={pathname} />

      {pathname === '/' && (
        <NavSearch value={searchQuery} onChange={setSearchQuery} inputRef={searchRef} />
      )}

      <LanguageMenu
        open={open}
        pathname={pathname}
        language={language}
        dropdownRef={dropdownRef}
        onToggle={() => setOpen((s) => !s)}
        onClose={() => setOpen(false)}
        onLanguageChange={setLanguage}
      />

      <ThemeToggle
        darkMode={darkMode}
        label={darkMode ? t('common.light') : t('common.dark')}
        onToggle={toggleDarkMode}
      />
    </nav>
  )
}

