import { useAppTranslation } from '@/i18n/localize'
import type { AppLanguage } from '@/i18n/types'
import clsx from 'clsx'
import { Languages } from 'lucide-react'
import type { RefObject } from 'react'
import { LANGUAGES } from '../../data/navData'

interface LanguageMenuProps {
  open: boolean
  pathname: string
  language: AppLanguage
  dropdownRef: RefObject<HTMLDivElement | null>
  onToggle: () => void
  onClose: () => void
  onLanguageChange: (language: AppLanguage) => void
}

export const LanguageMenu: React.FC<LanguageMenuProps> = ({
  open,
  pathname,
  language,
  dropdownRef,
  onToggle,
  onClose,
  onLanguageChange,
}) => {
  const { t } = useAppTranslation()

  return (
    <div ref={dropdownRef} className={pathname === '/' ? 'relative' : 'ml-auto relative'}>
      <button
        onClick={onToggle}
        className="inline-flex items-center gap-2 px-3 text-sm transition-colors border rounded-md h-9 border-line bg-surface text-muted hover:text-ink"
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
                onLanguageChange(item.value)
                onClose()
              }}
              className={clsx(
                'w-full px-3 py-2 text-left text-sm transition-colors hover:bg-surface',
                language === item.value ? 'bg-[var(--color-ring)] text-ink' : 'text-muted',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
