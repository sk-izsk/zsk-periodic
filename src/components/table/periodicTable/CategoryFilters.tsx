import { Badge } from '@/components/ui/badge'
import type { ElementCategory } from '@/data/elements/elements'
import { CATEGORY_ENTRIES } from '@/data/periodicTableData'
import clsx from 'clsx'
import { swatch, swatchCategory } from './periodicTable.css'

interface CategoryFiltersProps {
  activeCategory: ElementCategory | null
  onFilter: (category: ElementCategory) => void
  onHover: (category: ElementCategory | null) => void
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  activeCategory,
  onFilter,
  onHover,
}) => (
  <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
    <div className="flex flex-wrap justify-center gap-1.5 rounded-lg border border-line bg-surface p-2 shadow-sm backdrop-blur-xl">
      {CATEGORY_ENTRIES.map(([category, label]) => (
        <button
          key={category}
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
)
