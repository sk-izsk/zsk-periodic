import type { Element } from '@/data/elements/elements'
import { ElementCell } from '../elementCell/ElementCell'
import * as styles from './periodicTable.css'

interface ElementSeriesProps {
  rows: Element[][]
  hasFilter: boolean
  matchedElementNumbers: Set<number>
  onSelect: (element: Element) => void
}

const ElementSeries = ({
  rows,
  hasFilter,
  matchedElementNumbers,
  onSelect,
}: ElementSeriesProps) => (
  <div className={styles.seriesWrap}>
    {rows.map((series) => (
      <div key={series[0]?.n ?? 'series'} className={styles.seriesRow}>
        {series.map((element) => {
          const isMatch = matchedElementNumbers.has(element.n)
          return (
            <ElementCell
              key={element.n}
              element={element}
              dimmed={hasFilter && !isMatch}
              highlighted={hasFilter && isMatch}
              onClick={onSelect}
            />
          )
        })}
      </div>
    ))}
  </div>
)

export { ElementSeries }
