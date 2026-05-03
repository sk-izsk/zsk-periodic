import clsx from 'clsx'
import { sideButton, sideNav, sideNavNext, sideNavPrev } from './elementModal.css'

interface ElementSideNavProps {
  direction: 'prev' | 'next'
  onClick: () => void
}

export const ElementSideNav: React.FC<ElementSideNavProps> = ({ direction, onClick }) => (
  <div
    className={clsx('group/element-nav', sideNav, direction === 'prev' ? sideNavPrev : sideNavNext)}
  >
    <button
      aria-label={direction === 'prev' ? 'Previous element' : 'Next element'}
      onClick={onClick}
      className={clsx(
        sideButton,
        'opacity-0 group-hover/element-nav:opacity-100 transition-opacity duration-200 hover:!bg-black/65',
      )}
    >
      {direction === 'prev' ? '‹' : '›'}
    </button>
  </div>
)
