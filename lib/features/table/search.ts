import type { Element } from '@/lib/elements'
import type { ElementLocaleRecord } from '@/lib/i18n/types'

export function matchesElementQuery(
  element: Element,
  query: string,
  localized?: ElementLocaleRecord,
): boolean {
  if (!query) {
    return true
  }
  const q = query.toLowerCase()

  const localizedName = localized?.name?.toLowerCase() ?? ''
  return (
    element.name.toLowerCase().includes(q) ||
    localizedName.includes(q) ||
    element.sym.toLowerCase().includes(q) ||
    String(element.n).includes(q)
  )
}
