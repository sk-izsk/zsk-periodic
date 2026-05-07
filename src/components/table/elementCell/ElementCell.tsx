import type { Element } from '@/data/elements/elements'
import clsx from 'clsx'
import { memo } from 'react'
import { category, cell, name, number, symbol } from './elementCell.css'

interface Props {
  element: Element
  dimmed?: boolean
  highlighted?: boolean
  onClick?: (el: Element) => void
}

const ElementCell: React.FC<Props> = ({ element, dimmed, highlighted, onClick }) => {
  return (
    <div
      onClick={() => onClick?.(element)}
      data-element-number={element.n}
      data-highlighted={highlighted ? 'true' : 'false'}
      data-category={element.cat}
      className={clsx(
        'element-cell relative flex flex-col items-center justify-center select-none overflow-hidden border border-white/20 shadow-sm',
        cell,
        category[element.cat],
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
      <span className={clsx('relative', number)}>{element.n}</span>
      <span className={clsx('relative', symbol)}>{element.sym}</span>
      <span className={clsx('relative', name)}>{element.name}</span>
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
