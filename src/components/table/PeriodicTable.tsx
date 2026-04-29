import {
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  Element,
  ElementCategory,
  elements,
} from '@/lib/elements'
import { matchesElementQuery } from '@/lib/features/table/search'
import { loadElementLocale } from '@/lib/i18n/locale-loaders'
import type { ElementLocaleRecord } from '@/lib/i18n/types'
import { useAppStore } from '@/lib/store'
import { useEffect, useState } from 'react'
import ElementCell from './ElementCell'

// Grid positions: [atomicNumber] -> { row, col } in 18-col layout
const GRID: Record<number, { row: number; col: number }> = {}
elements.forEach((e) => {
  if (!e.group) {
    return
  } // lanthanides/actinides handled separately
  // Skip f-block placeholders (La, Ac shown at col 3)
  if (e.n >= 58 && e.n <= 71) {
    return
  }
  if (e.n >= 90 && e.n <= 103) {
    return
  }
  GRID[e.n] = { row: e.period, col: e.group }
})

const MAIN = elements.filter((e) => GRID[e.n])
const LANTHANIDES = elements.filter((e) => e.n >= 57 && e.n <= 71)
const ACTINIDES = elements.filter((e) => e.n >= 89 && e.n <= 103)

export default function PeriodicTable() {
  const {
    selectedElement,
    setSelectedElement,
    filterCategory,
    setFilterCategory,
    searchQuery,
    language,
  } = useAppStore()
  const [localizedElements, setLocalizedElements] = useState<Record<string, ElementLocaleRecord>>(
    {},
  )
  const [hoveredCategory, setHoveredCategory] = useState<ElementCategory | null>(null)
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

  const matches = (el: Element) => {
    const locale = localizedElements[String(el.n)]
    const qMatch = matchesElementQuery(el, searchQuery, locale)
    const catMatch = !activeCategory || el.cat === activeCategory
    return qMatch && catMatch
  }

  const hasFilter = !!activeCategory || searchQuery.length > 0

  return (
    <div className="p-2">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
        <div className="flex flex-wrap justify-center gap-1">
          {(Object.entries(CATEGORY_LABELS) as [ElementCategory, string][]).map(([k, v]) => (
            <button
              key={k}
              onClick={() => setFilterCategory(k)}
              onMouseEnter={() => setHoveredCategory(k)}
              onMouseLeave={() => setHoveredCategory(null)}
              className="flex items-center gap-1 px-2 py-1 text-xs transition-all border rounded"
              style={{
                borderColor: activeCategory === k ? '#2b6ef2' : 'var(--color-border)',
                background: activeCategory === k ? 'rgba(255,255,255,0.92)' : 'transparent',
                color: activeCategory === k ? '#2b2f36' : 'var(--color-muted)',
                boxShadow: activeCategory === k ? 'inset 0 0 0 1px rgba(43,110,242,0.2)' : 'none',
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 2,
                  background: CATEGORY_COLORS[k],
                  display: 'inline-block',
                }}
              />
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Main table */}
      <div style={{ overflowX: 'auto' }}>
        <div style={{ width: 'fit-content', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(18, 68px)',
              gridTemplateRows: 'repeat(7, 74px)',
              gap: 6,
              minWidth: 1334,
            }}
          >
            {Array.from({ length: 7 }, (_, r) =>
              Array.from({ length: 18 }, (_, c) => {
                const row = r + 1,
                  col = c + 1
                const el = MAIN.find((e) => GRID[e.n].row === row && GRID[e.n].col === col)

                if (el) {
                  return (
                    <div key={el.n} style={{ gridRow: row, gridColumn: col }}>
                      <ElementCell
                        element={el}
                        dimmed={hasFilter && !matches(el)}
                        highlighted={hasFilter && matches(el)}
                        onClick={setSelectedElement}
                      />
                    </div>
                  )
                }

                // Placeholder for lanthanide/actinide row indicator
                if ((row === 6 || row === 7) && col === 3) {
                  return (
                    <div
                      key={`${row}-${col}`}
                      style={{
                        gridRow: row,
                        gridColumn: col,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span style={{ fontSize: 9, color: 'var(--color-muted)' }}>
                        {row === 6 ? '57–71' : '89–103'}
                      </span>
                    </div>
                  )
                }

                return <div key={`${row}-${col}`} style={{ gridRow: row, gridColumn: col }} />
              }),
            )}
          </div>

          {/* Lanthanides + Actinides */}
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[LANTHANIDES, ACTINIDES].map((series, i) => (
              <div key={i} style={{ display: 'flex', gap: 6, paddingLeft: 148 }}>
                {series.map((el) => (
                  <ElementCell
                    key={el.n}
                    element={el}
                    dimmed={hasFilter && !matches(el)}
                    highlighted={hasFilter && matches(el)}
                    onClick={setSelectedElement}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
