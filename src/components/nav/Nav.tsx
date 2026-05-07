import { Button } from '@/components/ui/button'
import { useLanguage, useSetLanguage } from '@/hooks/store/useLanguageStore'
import { useSearchQuery, useSetSearchQuery } from '@/hooks/store/useTableStore'
import { useDarkMode, useToggleDarkMode } from '@/hooks/store/useThemeStore'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useAppTranslation } from '@/i18n/localize'
import { useRouterState } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { LanguageMenu } from './LanguageMenu'
import { NavMobileDrawer } from './NavMobileDrawer'
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
  const isMobile = useMediaQuery('(max-width: 1023px)')
  const [open, setOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const mobileDrawerRef = useRef<HTMLDivElement | null>(null)
  const searchRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
      if (!mobileDrawerRef.current?.contains(event.target as Node)) {
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', closeOnOutsideClick)
    return () => document.removeEventListener('mousedown', closeOnOutsideClick)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

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
    <>
      <nav className="sticky top-0 z-50 border-b border-line bg-elevated/90 px-4 py-2 shadow-sm backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <NavBrand />

          {!isMobile && <NavRouteLinks pathname={pathname} />}

          {!isMobile && pathname === '/' && (
            <NavSearch value={searchQuery} onChange={setSearchQuery} inputRef={searchRef} />
          )}

          {!isMobile && (
            <LanguageMenu
              open={open}
              pathname={pathname}
              language={language}
              dropdownRef={dropdownRef}
              onToggle={() => setOpen((s) => !s)}
              onClose={() => setOpen(false)}
              onLanguageChange={setLanguage}
            />
          )}

          {!isMobile && (
            <ThemeToggle
              darkMode={darkMode}
              label={darkMode ? t('common.light') : t('common.dark')}
              onToggle={toggleDarkMode}
            />
          )}

          {isMobile && (
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="ml-auto"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={18} />
            </Button>
          )}
        </div>

        {isMobile && pathname === '/' && (
          <div className="pt-2">
            <NavSearch value={searchQuery} onChange={setSearchQuery} inputRef={searchRef} />
          </div>
        )}
      </nav>

      <NavMobileDrawer
        open={mobileMenuOpen}
        pathname={pathname}
        darkMode={darkMode}
        themeLabel={darkMode ? t('common.light') : t('common.dark')}
        language={language}
        onClose={() => setMobileMenuOpen(false)}
        onToggleTheme={toggleDarkMode}
        onLanguageChange={setLanguage}
        panelRef={mobileDrawerRef}
      />
    </>
  )
}
