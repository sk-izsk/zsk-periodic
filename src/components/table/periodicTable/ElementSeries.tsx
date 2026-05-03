import type { Element } from '@/data/elements/elements'
import { ElementCell } from '../elementCell/ElementCell'
import { seriesRow, seriesWrap } from './periodicTable.css'

interface ElementSeriesProps {
  rows: Element[][]
  hasFilter: boolean
  matchedElementNumbers: Set<number>
  onSelect: (element: Element) => void
}

export const ElementSeries: React.FC<ElementSeriesProps> = ({
  rows,
  hasFilter,
  matchedElementNumbers,
  onSelect,
}) => (
  <div className={seriesWrap}>
    {rows.map((series) => (
      <div key={series[0]?.n ?? 'series'} className={seriesRow}>
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

