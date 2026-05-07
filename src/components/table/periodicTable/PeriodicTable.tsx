import { elements, type ElementCategory } from '@/data/elements/elements'
import { ACTINIDES, LANTHANIDES } from '@/data/periodicTableData'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useLanguage } from '@/hooks/store/useLanguageStore'
import {
  useFilterCategory,
  useSearchQuery,
  useSetFilterCategory,
  useSetSelectedElement,
} from '@/hooks/store/useTableStore'
import { loadElementLocale } from '@/i18n/locale-loaders'
import type { ElementLocaleRecord } from '@/i18n/types'
import { matchesElementQuery } from '@/utils/tableSearch'
import { useEffect, useMemo, useRef, useState } from 'react'
import { CategoryFilters } from './CategoryFilters'
import { ElementSeries } from './ElementSeries'
import { MainElementGrid } from './MainElementGrid'
import { gridWrap } from './periodicTable.css'

export const PeriodicTable: React.FC = () => {
  const setSelectedElement = useSetSelectedElement()
  const filterCategory = useFilterCategory()
  const setFilterCategory = useSetFilterCategory()
  const searchQuery = useSearchQuery()
  const language = useLanguage()
  const isMobile = useMediaQuery('(max-width: 1023px)')
  const [localizedElements, setLocalizedElements] = useState<Record<string, ElementLocaleRecord>>(
    {},
  )
  const [hoveredCategory, setHoveredCategory] = useState<ElementCategory | null>(null)
  const tableViewportRef = useRef<HTMLDivElement | null>(null)
  const activeCategory = hoveredCategory ?? filterCategory

  useEffect(() => {
    let mounted = true
    loadElementLocale(language).then((records) => {
      if (!mounted) {
        return
      }
      setLocalizedElements(records)
    })
    return () => {
      mounted = false
    }
  }, [language])

  const hasFilter = !!activeCategory || searchQuery.length > 0
  const matchedElementNumbers = useMemo(() => {
    if (!hasFilter) {
      return new Set<number>()
    }

    return new Set(
      elements
        .filter((el) => {
          const locale = localizedElements[String(el.n)]
          const qMatch = matchesElementQuery(el, searchQuery, locale)
          const catMatch = !activeCategory || el.cat === activeCategory
          return qMatch && catMatch
        })
        .map((el) => el.n),
    )
  }, [activeCategory, hasFilter, localizedElements, searchQuery])

  useEffect(() => {
    if (!isMobile || !hasFilter) {
      return
    }

    const viewport = tableViewportRef.current
    if (!viewport) {
      return
    }

    const frame = requestAnimationFrame(() => {
      const firstMatch = viewport.querySelector<HTMLElement>('[data-highlighted="true"]')
      if (!firstMatch) {
        return
      }

      firstMatch.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    })

    return () => cancelAnimationFrame(frame)
  }, [activeCategory, hasFilter, isMobile, matchedElementNumbers, searchQuery])

  return (
    <div className="p-4">
      <CategoryFilters
        activeCategory={activeCategory}
        mobile={isMobile}
        matchCount={matchedElementNumbers.size}
        onFilter={setFilterCategory}
        onClear={() => setFilterCategory(null)}
        onHover={setHoveredCategory}
      />

      <div className="lab-scan-stage rounded-lg border border-line bg-surface/80 p-4 shadow-[var(--shadow-panel)] backdrop-blur-xl">
        <div className="flex items-center justify-between mb-3 text-xs text-muted">
          <span className="font-semibold uppercase tracking-[0.18em]">ZTable matrix</span>
          <span>{elements.length} elements indexed</span>
        </div>
        <div
          ref={tableViewportRef}
          className="overflow-x-auto overflow-y-hidden rounded-md px-2 pt-1 pb-6 lg:px-3"
        >
          <div className={gridWrap}>
            <MainElementGrid
              hasFilter={hasFilter}
              matchedElementNumbers={matchedElementNumbers}
              onSelect={setSelectedElement}
            />
            <ElementSeries
              rows={[LANTHANIDES, ACTINIDES]}
              hasFilter={hasFilter}
              matchedElementNumbers={matchedElementNumbers}
              onSelect={setSelectedElement}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
