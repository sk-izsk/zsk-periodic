import { Badge } from '@/components/ui/badge'
import type { ElementCategory } from '@/data/elements/elements'
import { CATEGORY_ENTRIES } from '@/data/periodicTableData'
import clsx from 'clsx'
import { swatch, swatchCategory } from './periodicTable.css'

interface CategoryFiltersProps {
  activeCategory: ElementCategory | null
  mobile: boolean
  matchCount: number
  onFilter: (category: ElementCategory) => void
  onClear: () => void
  onHover: (category: ElementCategory | null) => void
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  activeCategory,
  mobile,
  matchCount,
  onFilter,
  onClear,
  onHover,
}) => (
  <div className="mb-4 flex flex-col gap-2">
    <div className="flex items-center justify-between gap-3">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        Element filters
      </div>
      {activeCategory && (
        <button
          type="button"
          onClick={onClear}
          className="text-xs font-medium text-[var(--color-accent)] transition-opacity hover:opacity-80"
        >
          Clear
        </button>
      )}
    </div>
    <div
      className={clsx(
        'rounded-lg border border-line bg-surface p-2 shadow-sm backdrop-blur-xl',
        mobile ? 'overflow-x-auto' : '',
      )}
    >
      <div
        className={clsx(
          'flex gap-1.5',
          mobile ? 'w-max min-w-full flex-nowrap pr-1' : 'flex-wrap justify-center',
        )}
      >
        <button
          type="button"
          onClick={onClear}
          className="transition-transform hover:-translate-y-0.5"
        >
          <Badge variant={activeCategory === null ? 'active' : 'default'}>All elements</Badge>
        </button>
        {CATEGORY_ENTRIES.map(([category, label]) => (
          <button
            key={category}
            type="button"
            onClick={() => onFilter(category)}
            onMouseEnter={() => onHover(category)}
            onMouseLeave={() => onHover(null)}
            className="transition-transform hover:-translate-y-0.5"
          >
            <Badge variant={activeCategory === category ? 'active' : 'default'}>
              <span className={clsx(swatch, swatchCategory[category])} />
              {label}
            </Badge>
          </button>
        ))}
      </div>
    </div>
    {mobile && activeCategory && (
      <div className="rounded-full border border-line bg-surface/80 px-3 py-1.5 text-xs text-muted shadow-sm backdrop-blur-xl">
        Focused on first match for this category. {matchCount} element{matchCount === 1 ? '' : 's'}
        highlighted.
      </div>
    )}
  </div>
)
