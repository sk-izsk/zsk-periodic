'use client';
import { Element, CATEGORY_COLORS } from '@/lib/elements';
import clsx from 'clsx';

interface Props {
  element: Element;
  dimmed?: boolean;
  highlighted?: boolean;
  onClick?: (el: Element) => void;
}

export default function ElementCell({ element, dimmed, highlighted, onClick }: Props) {
  const bg = CATEGORY_COLORS[element.cat];
  return (
    <div
      onClick={() => onClick?.(element)}
      className={clsx(
        'element-cell relative rounded flex flex-col items-center justify-center select-none',
        dimmed && 'opacity-20',
        highlighted && 'ring-2 ring-white'
      )}
      style={{ background: bg, width: 36, height: 44, minWidth: 36 }}
      title={element.name}
    >
      <span style={{ fontSize: 7, color: 'rgba(255,255,255,.8)', alignSelf: 'flex-start', paddingLeft: 3, lineHeight: 1 }}>
        {element.n}
      </span>
      <span style={{ fontSize: 13, fontWeight: 500, color: '#fff', lineHeight: 1.1 }}>
        {element.sym}
      </span>
      <span style={{ fontSize: 6, color: 'rgba(255,255,255,.8)', lineHeight: 1, overflow: 'hidden', maxWidth: 34, textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {element.name}
      </span>
    </div>
  );
}
