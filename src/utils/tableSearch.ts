import type { Element } from '@/data/elements/elements'
import type { ElementLocaleRecord } from '@/i18n/types'

export const matchesElementQuery = (
  element: Element,
  query: string,
  localized?: ElementLocaleRecord,
): boolean => {
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
