import type { DetailLevel } from '@/types/elementProfile'
import clsx from 'clsx'
import * as styles from './elementModal.css'

interface CardPagerProps {
  activeCard: number
  levels: DetailLevel[]
  darkMode: boolean
  onPrev: () => void
  onNext: () => void
  onSelect: (index: number) => void
}

const CardPager = ({ activeCard, levels, darkMode, onPrev, onNext, onSelect }: CardPagerProps) => {
  const tone = darkMode ? 'dark' : 'light'
  const prevDisabled = activeCard === 0
  const nextDisabled = activeCard === levels.length - 1

  return (
    <div className={clsx(styles.dotNav, styles.dotNavTone[tone])}>
      <button
        aria-label="Previous card"
        onClick={onPrev}
        disabled={prevDisabled}
        className={clsx(
          styles.dotButton,
          prevDisabled ? styles.dotButtonDisabled : styles.dotButtonEnabled,
        )}
      >
        ‹
      </button>
      {levels.map((level, index) => (
        <button
          key={level}
          aria-label={`Show ${level}`}
          onClick={() => onSelect(index)}
          className={clsx(
            styles.dot,
            styles.dotLevel[level],
            index === activeCard && styles.dotActive,
          )}
        />
      ))}
      <div className={styles.navDivider} />
      <svg width="12" height="14" viewBox="0 0 12 14" fill="none" className={styles.lockIcon}>
        <rect x="1" y="6" width="10" height="8" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M4 6V4a2 2 0 0 1 4 0v2" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      <button
        aria-label="Next card"
        onClick={onNext}
        disabled={nextDisabled}
        className={clsx(
          styles.dotButton,
          nextDisabled ? styles.dotButtonDisabled : styles.dotButtonEnabled,
        )}
      >
        ›
      </button>
    </div>
  )
}

export { CardPager }
