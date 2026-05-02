import type { Element } from '@/data/elements/elements'
import clsx from 'clsx'
import { memo } from 'react'
import * as styles from './elementCell.css'

interface Props {
  element: Element
  dimmed?: boolean
  highlighted?: boolean
  onClick?: (el: Element) => void
}

const ElementCell = ({ element, dimmed, highlighted, onClick }: Props) => {
  return (
    <div
      onClick={() => onClick?.(element)}
      className={clsx(
        'element-cell relative flex flex-col items-center justify-center select-none overflow-hidden border border-white/20 shadow-sm',
        styles.cell,
        styles.category[element.cat],
        dimmed && 'opacity-20',
        highlighted &&
          'ring-2 ring-[var(--color-accent)] ring-offset-2 ring-offset-[var(--color-bg)]',
      )}
      title={element.name}
    >
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/18 via-transparent to-black/18"
        aria-hidden="true"
      />
      <span className={clsx('relative', styles.number)}>{element.n}</span>
      <span className={clsx('relative', styles.symbol)}>{element.sym}</span>
      <span className={clsx('relative', styles.name)}>{element.name}</span>
    </div>
  )
}

const MemoizedElementCell = memo(
  ElementCell,
  (prev, next) =>
    prev.element === next.element &&
    prev.dimmed === next.dimmed &&
    prev.highlighted === next.highlighted &&
    prev.onClick === next.onClick,
)

export { MemoizedElementCell as ElementCell }
