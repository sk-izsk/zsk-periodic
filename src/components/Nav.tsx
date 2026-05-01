import type { AppLanguage } from '@/lib/i18n/types'
import { useAppTranslation } from '@/lib/i18n/localize'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link, useRouterState } from '@tanstack/react-router'
import clsx from 'clsx'
import {
  Beaker,
  BookOpenCheck,
  FlaskConical,
  Languages,
  Moon,
  Search,
  Settings,
  Sun,
  Table2,
  Zap,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const LINKS = [
  { href: '/', key: 'nav.table', icon: Table2 },
  { href: '/ions', key: 'nav.ions', icon: Beaker },
  { href: '/tools', key: 'nav.tools', icon: FlaskConical },
  { href: '/worksheet', key: 'nav.worksheet', icon: BookOpenCheck },
  { href: '/settings', key: 'nav.settings', icon: Settings },
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
    <nav className="sticky top-0 z-50 flex items-center gap-3 border-b border-line bg-elevated/90 px-4 py-2 shadow-sm backdrop-blur-xl">
      <Link to="/" search={true} className="mr-2 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-[var(--color-accent)] text-white shadow-sm dark:text-slate-950">
          <Zap size={18} fill="currentColor" />
        </span>
        <span>
          <span className="block text-base font-semibold leading-4 tracking-tight">ZTable</span>
          <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
            chemistry console
          </span>
        </span>
      </Link>
      {LINKS.map((l) => (
        <Button key={l.href} asChild variant={pathname === l.href ? 'primary' : 'ghost'} size="sm">
          <Link
            to={l.href}
            search={true}
            className={clsx(
              'px-3',
              pathname === l.href ? 'text-white dark:text-slate-950' : 'text-muted hover:text-ink',
            )}
          >
            <l.icon size={15} />
            {t(l.key)}
          </Link>
        </Button>
      ))}

      {pathname === '/' && (
        <div className="relative ml-auto mr-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            size={15}
          />
          <Input
            ref={searchRef}
            type="text"
            placeholder="Search elements... (Cmd+K)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[260px] pl-9"
          />
        </div>
      )}

      <div ref={dropdownRef} className={pathname === '/' ? 'relative' : 'ml-auto relative'}>
        <button
          onClick={() => setOpen((s) => !s)}
          className="inline-flex h-9 items-center gap-2 rounded-md border border-line bg-surface px-3 text-sm text-muted transition-colors hover:text-ink"
        >
          <Languages size={15} />
          {t('nav.language')}
        </button>
        {open && (
          <div className="absolute right-0 mt-2 min-w-48 overflow-hidden rounded-md border border-line bg-elevated py-1 shadow-[var(--shadow-panel)] backdrop-blur-xl">
            {LANGUAGES.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  setLanguage(item.value)
                  setOpen(false)
                }}
                className={clsx(
                  'w-full px-3 py-2 text-left text-sm transition-colors hover:bg-surface',
                  language === item.value ? 'bg-[var(--color-ring)] text-ink' : 'text-muted',
                )}
              >
                {item.label}
              </button>
            ))}
            <Link
              to="/settings"
              hash="suggest-language"
              search={true}
              className="block px-3 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-ink"
              onClick={() => setOpen(false)}
            >
              {t('nav.suggestLanguage')}
            </Link>
          </div>
        )}
      </div>

      <Button
        onClick={toggleDarkMode}
        variant="secondary"
        size="icon"
        aria-label={darkMode ? t('common.light') : t('common.dark')}
      >
        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
      </Button>
    </nav>
  )
}

export { Nav }
