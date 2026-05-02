import clsx from 'clsx'
import * as styles from './elementModal.css'

interface ElementSideNavProps {
  direction: 'prev' | 'next'
  onClick: () => void
}

const ElementSideNav = ({ direction, onClick }: ElementSideNavProps) => (
  <div
    className={clsx(
      'group/element-nav',
      styles.sideNav,
      direction === 'prev' ? styles.sideNavPrev : styles.sideNavNext,
    )}
  >
    <button
      aria-label={direction === 'prev' ? 'Previous element' : 'Next element'}
      onClick={onClick}
      className={clsx(
        styles.sideButton,
        'opacity-0 group-hover/element-nav:opacity-100 transition-opacity duration-200 hover:!bg-black/65',
      )}
    >
      {direction === 'prev' ? '‹' : '›'}
    </button>
  </div>
)

export { ElementSideNav }
