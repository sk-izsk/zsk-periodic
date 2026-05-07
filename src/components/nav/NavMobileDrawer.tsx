import { Button } from '@/components/ui/button'
import { LANGUAGES } from '@/data/navData'
import type { AppLanguage } from '@/i18n/types'
import clsx from 'clsx'
import { X } from 'lucide-react'
import type { RefObject } from 'react'
import { NavRouteLinks } from './NavRouteLinks'
import { ThemeToggle } from './ThemeToggle'

interface NavMobileDrawerProps {
  open: boolean
  pathname: string
  darkMode: boolean
  themeLabel: string
  language: AppLanguage
  onClose: () => void
  onToggleTheme: () => void
  onLanguageChange: (language: AppLanguage) => void
  panelRef: RefObject<HTMLDivElement | null>
}

export const NavMobileDrawer: React.FC<NavMobileDrawerProps> = ({
  open,
  pathname,
  darkMode,
  themeLabel,
  language,
  onClose,
  onToggleTheme,
  onLanguageChange,
  panelRef,
}) => {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[70] lg:hidden">
      <button
        type="button"
        aria-label="Close navigation"
        className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"
        onClick={onClose}
      />
      <aside
        ref={panelRef}
        className="absolute right-0 top-0 flex h-full w-[min(85vw,22rem)] flex-col border-l border-line bg-elevated/95 shadow-[var(--shadow-panel)] backdrop-blur-xl"
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Navigate</p>
            <h2 className="text-lg font-semibold text-ink">ZTable menu</h2>
          </div>
          <Button type="button" variant="secondary" size="icon" onClick={onClose}>
            <X size={18} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="rounded-2xl border border-line bg-surface p-2">
            <NavRouteLinks pathname={pathname} orientation="col" onNavigate={onClose} />
          </div>

          <div className="mt-4 rounded-2xl border border-line bg-surface p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  Appearance
                </p>
                <p className="mt-1 text-sm text-muted">Theme and language controls</p>
              </div>
              <ThemeToggle darkMode={darkMode} label={themeLabel} onToggle={onToggleTheme} />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {LANGUAGES.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => {
                    onLanguageChange(item.value)
                    onClose()
                  }}
                  className={clsx(
                    'rounded-xl border px-3 py-2 text-sm font-medium transition-colors',
                    language === item.value
                      ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/12 text-ink'
                      : 'border-line bg-elevated text-muted hover:text-ink',
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
