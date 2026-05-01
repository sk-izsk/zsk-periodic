import type { AppLanguage } from '@/lib/i18n/types'
import { useAppTranslation } from '@/lib/i18n/localize'
import { useAppStore } from '@/lib/store'
import { Link, useRouterState } from '@tanstack/react-router'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

const LINKS = [
  { href: '/', key: 'nav.table' },
  { href: '/ions', key: 'nav.ions' },
  { href: '/tools', key: 'nav.tools' },
  { href: '/worksheet', key: 'nav.worksheet' },
  { href: '/settings', key: 'nav.settings' },
] as const

const LANGUAGES: { value: AppLanguage; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
]

const Nav = () => {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const { t } = useAppTranslation()
  const darkMode = useAppStore((s) => s.darkMode)
  const toggleDarkMode = useAppStore((s) => s.toggleDarkMode)
  const language = useAppStore((s) => s.language)
  const setLanguage = useAppStore((s) => s.setLanguage)
  const searchQuery = useAppStore((s) => s.searchQuery)
  const setSearchQuery = useAppStore((s) => s.setSearchQuery)
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
    <nav
      className="sticky top-0 z-50 flex items-center gap-1 px-4 py-2 border-b"
      style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
    >
      <span className="mr-4 text-lg font-bold tracking-tight">Zperiod</span>
      {LINKS.map((l) => (
        <Link
          key={l.href}
          to={l.href}
          search={true}
          className={clsx(
            'px-3 py-1.5 rounded text-sm transition-colors',
            pathname === l.href
              ? 'bg-blue-600 text-white'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800',
          )}
        >
          {t(l.key)}
        </Link>
      ))}

      {pathname === '/' && (
        <div className="ml-auto mr-2">
          <input
            ref={searchRef}
            type="text"
            placeholder="Search elements... (Cmd+K)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-sm outline-none transition-[border-color,box-shadow] duration-150 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
            style={{
              border: '1px solid var(--color-border)',
              background: 'var(--color-bg2)',
              color: 'var(--color-text)',
              width: 240,
            }}
          />
        </div>
      )}

      <div ref={dropdownRef} className={pathname === '/' ? 'relative' : 'ml-auto relative'}>
        <button
          onClick={() => setOpen((s) => !s)}
          className="text-sm px-3 py-1.5 rounded border"
          style={{ borderColor: 'var(--color-border)' }}
        >
          {t('nav.language')}
        </button>
        {open && (
          <div
            className="absolute right-0 py-1 mt-1 rounded-md min-w-44"
            style={{
              background: 'var(--color-bg)',
              border: '0.5px solid var(--color-border)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.16)',
            }}
          >
            {LANGUAGES.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  setLanguage(item.value)
                  setOpen(false)
                }}
                className="w-full text-left px-3 py-1.5 text-sm"
                style={{
                  background: language === item.value ? 'rgba(37,99,235,0.12)' : 'transparent',
                  color: 'var(--color-text)',
                }}
              >
                {item.label}
              </button>
            ))}
            <Link
              to="/settings"
              hash="suggest-language"
              search={true}
              className="block px-3 py-1.5 text-sm"
              onClick={() => setOpen(false)}
              style={{ color: 'var(--color-muted)' }}
            >
              {t('nav.suggestLanguage')}
            </Link>
          </div>
        )}
      </div>

      <button
        onClick={toggleDarkMode}
        className="ml-2 text-sm px-3 py-1.5 rounded border"
        style={{ borderColor: 'var(--color-border)' }}
      >
        {darkMode ? `☀ ${t('common.light')}` : `☾ ${t('common.dark')}`}
      </button>
    </nav>
  )
}

export default Nav
