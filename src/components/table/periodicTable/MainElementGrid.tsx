import type { Element } from '@/data/elements/elements'
import { MAIN_GRID_CELLS } from '@/data/periodicTableData'
import clsx from 'clsx'
import { ElementCell } from '../elementCell/ElementCell'
import { mainGrid, placeholder, placeholderLabel, position } from './periodicTable.css'

interface MainElementGridProps {
  hasFilter: boolean
  matchedElementNumbers: Set<number>
  onSelect: (element: Element) => void
}

export const MainElementGrid: React.FC<MainElementGridProps> = ({
  hasFilter,
  matchedElementNumbers,
  onSelect,
}) => (
  <div className={mainGrid}>
    {MAIN_GRID_CELLS.map((cell) => {
      const positionClass = position[`r${cell.row}c${cell.col}`]
      if (cell.kind === 'element') {
        const isMatch = matchedElementNumbers.has(cell.element.n)
        return (
          <div key={cell.key} className={positionClass}>
            <ElementCell
              element={cell.element}
              dimmed={hasFilter && !isMatch}
              highlighted={hasFilter && isMatch}
              onClick={onSelect}
            />
          </div>
        )
      }

      return (
        <div key={cell.key} className={clsx(positionClass, cell.label && placeholder)}>
          {cell.label && <span className={placeholderLabel}>{cell.label}</span>}
        </div>
      )
    })}
  </div>
)
