import { CATEGORY_COLORS, Element } from '@/lib/elements'
import clsx from 'clsx'

interface Props {
  element: Element
  dimmed?: boolean
  highlighted?: boolean
  onClick?: (el: Element) => void
}

export default function ElementCell({ element, dimmed, highlighted, onClick }: Props) {
  const bg = CATEGORY_COLORS[element.cat]
  return (
    <div
      onClick={() => onClick?.(element)}
      className={clsx(
        'element-cell relative rounded flex flex-col items-center justify-center select-none',
        dimmed && 'opacity-20',
        highlighted && 'ring-2 ring-white',
      )}
      style={{ background: bg, width: 68, height: 74, minWidth: 68, borderRadius: 10 }}
      title={element.name}
    >
      <span
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
      <span style={{ fontSize: 36, fontWeight: 500, color: '#fff', lineHeight: 1.05 }}>
        {element.sym}
      </span>
      <span
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
