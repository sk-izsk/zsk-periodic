import clsx from 'clsx'
import { row, rowLabel, rowLast, rowValue } from './levelCard/levelCard.css'

interface CardRowProps {
  label: string
  value: string
  last?: boolean
}

export const CardRow: React.FC<CardRowProps> = ({ label, value, last = false }) => (
  <div className={clsx(row, last && rowLast)}>
    <span className={rowLabel}>{label}</span>
    <span className={rowValue}>{value}</span>
  </div>
)
