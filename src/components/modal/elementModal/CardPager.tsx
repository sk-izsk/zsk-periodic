import type { DetailLevel } from '@/types/elementProfile'
import clsx from 'clsx'
import {
  dot,
  dotActive,
  dotButton,
  dotButtonDisabled,
  dotButtonEnabled,
  dotLevel,
  dotNav,
  dotNavTone,
  lockIcon,
  navDivider,
} from './elementModal.css'

interface CardPagerProps {
  activeCard: number
  levels: DetailLevel[]
  darkMode: boolean
  onPrev: () => void
  onNext: () => void
  onSelect: (index: number) => void
}

export const CardPager: React.FC<CardPagerProps> = ({
  activeCard,
  levels,
  darkMode,
  onPrev,
  onNext,
  onSelect,
}) => {
  const tone = darkMode ? 'dark' : 'light'
  const prevDisabled = activeCard === 0
  const nextDisabled = activeCard === levels.length - 1

  return (
    <div className={clsx(dotNav, dotNavTone[tone])}>
      <button
        aria-label="Previous card"
        onClick={onPrev}
        disabled={prevDisabled}
        className={clsx(dotButton, prevDisabled ? dotButtonDisabled : dotButtonEnabled)}
      >
        ‹
      </button>
      {levels.map((level, index) => (
        <button
          key={level}
          aria-label={`Show ${level}`}
          onClick={() => onSelect(index)}
          className={clsx(dot, dotLevel[level], index === activeCard && dotActive)}
        />
      ))}
      <div className={navDivider} />
      <svg width="12" height="14" viewBox="0 0 12 14" fill="none" className={lockIcon}>
        <rect x="1" y="6" width="10" height="8" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M4 6V4a2 2 0 0 1 4 0v2" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      <button
        aria-label="Next card"
        onClick={onNext}
        disabled={nextDisabled}
        className={clsx(dotButton, nextDisabled ? dotButtonDisabled : dotButtonEnabled)}
      >
        ›
      </button>
    </div>
  )
}
