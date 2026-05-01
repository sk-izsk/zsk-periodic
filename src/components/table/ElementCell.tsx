import { CATEGORY_COLORS, Element } from '@/lib/elements'
import clsx from 'clsx'
import { memo } from 'react'

interface Props {
  element: Element
  dimmed?: boolean
  highlighted?: boolean
  onClick?: (el: Element) => void
}

const ElementCell = ({ element, dimmed, highlighted, onClick }: Props) => {
  const bg = CATEGORY_COLORS[element.cat]
  return (
    <div
      onClick={() => onClick?.(element)}
      className={clsx(
        'element-cell relative flex flex-col items-center justify-center select-none overflow-hidden border border-white/20 shadow-sm',
        dimmed && 'opacity-20',
        highlighted &&
          'ring-2 ring-[var(--color-accent)] ring-offset-2 ring-offset-[var(--color-bg)]',
      )}
      style={{ background: bg, width: 68, height: 74, minWidth: 68, borderRadius: 8 }}
      title={element.name}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/18 via-transparent to-black/18"
        aria-hidden="true"
      />
      <span
        className="relative"
        style={{
          fontSize: 10,
          color: 'rgba(255,255,255,.8)',
          alignSelf: 'flex-start',
          paddingLeft: 6,
          lineHeight: 1,
        }}
      >
        {element.n}
      </span>
      <span
        className="relative"
        style={{ fontSize: 36, fontWeight: 650, color: '#fff', lineHeight: 1.05 }}
      >
        {element.sym}
      </span>
      <span
        className="relative"
        style={{
          fontSize: 9,
          color: 'rgba(255,255,255,.85)',
          lineHeight: 1,
          overflow: 'hidden',
          maxWidth: 64,
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          marginTop: 2,
        }}
      >
        {element.name}
      </span>
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
