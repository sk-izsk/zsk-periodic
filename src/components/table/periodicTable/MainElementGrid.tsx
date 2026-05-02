import type { Element } from '@/data/elements/elements'
import clsx from 'clsx'
import { ElementCell } from '../elementCell/ElementCell'
import * as styles from './periodicTable.css'
import { MAIN_GRID_CELLS } from './periodicTableData'

interface MainElementGridProps {
  hasFilter: boolean
  matchedElementNumbers: Set<number>
  onSelect: (element: Element) => void
}

const MainElementGrid = ({ hasFilter, matchedElementNumbers, onSelect }: MainElementGridProps) => (
  <div className={styles.mainGrid}>
    {MAIN_GRID_CELLS.map((cell) => {
      const positionClass = styles.position[`r${cell.row}c${cell.col}`]
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
        <div key={cell.key} className={clsx(positionClass, cell.label && styles.placeholder)}>
          {cell.label && <span className={styles.placeholderLabel}>{cell.label}</span>}
        </div>
      )
    })}
  </div>
)

export { MainElementGrid }
