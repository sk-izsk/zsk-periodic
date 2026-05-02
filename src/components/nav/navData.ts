import type { AppLanguage } from '@/i18n/types'
import { Beaker, BookOpenCheck, FlaskConical, Settings, Table2 } from 'lucide-react'

export const NAV_LINKS = [
  { href: '/', key: 'nav.table', icon: Table2 },
  { href: '/ions', key: 'nav.ions', icon: Beaker },
  { href: '/tools', key: 'nav.tools', icon: FlaskConical },
  { href: '/worksheet', key: 'nav.worksheet', icon: BookOpenCheck },
  { href: '/settings', key: 'nav.settings', icon: Settings },
] as const

export const LANGUAGES: { value: AppLanguage; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
]
