import type { Element } from '@/data/elements/elements'
import type { ElementIsotope } from '@/types/elementProfile'
import clsx from 'clsx'
import { lazy, Suspense } from 'react'
import * as styles from './elementModal.css'

const AtomModel = lazy(() => import('@/components/atoms/atomModel'))

const AtomModelFallback = () => <div className={styles.atomFallback}>Loading atom model...</div>

interface AtomPanelProps {
  element: Element
  darkMode: boolean
  paused: boolean
  speed: number
  topView: boolean
  resetToken: number
  activeIsotope: ElementIsotope | null
  onClose: () => void
  onTogglePaused: () => void
  onToggleTopView: () => void
  onResetView: () => void
}

const AtomPanel = ({
  element,
  darkMode,
  paused,
  speed,
  topView,
  resetToken,
  activeIsotope,
  onClose,
  onTogglePaused,
  onToggleTopView,
  onResetView,
}: AtomPanelProps) => {
  const tone = darkMode ? 'dark' : 'light'
  const atomBg = darkMode ? '#061015' : '#eaf3f8'

  return (
    <div className={clsx(styles.atomPanel, styles.atomTone[tone])}>
      <button onClick={onClose} className={clsx(styles.closeButton, styles.closeTone[tone])}>
        ×
      </button>

      <div className={styles.atomCanvasWrap}>
        <div className={styles.atomCanvasInner}>
          <Suspense fallback={<AtomModelFallback />}>
            <AtomModel
              element={element}
              bg={atomBg}
              fill
              paused={paused}
              speed={speed}
              topView={topView}
              resetToken={resetToken}
              neutronOverride={activeIsotope?.neutronCount}
              isotopeLabel={activeIsotope?.name}
            />
          </Suspense>
        </div>
      </div>

      <div className={clsx(styles.bottomControls, styles.bottomTone[tone])}>
        <div className={styles.controlGroup}>
          <button
            title={paused ? 'Resume' : 'Pause'}
            onClick={onTogglePaused}
            className={clsx(styles.controlButton, paused && styles.controlActive)}
          >
            {paused ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <polygon points="4,2 12,7 4,12" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <rect x="2" y="2" width="4" height="10" rx="1" />
                <rect x="8" y="2" width="4" height="10" rx="1" />
              </svg>
            )}
          </button>
          <button
            title="Top view"
            onClick={onToggleTopView}
            className={clsx(styles.controlButton, topView && styles.controlActive)}
          >
            <svg
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            >
              <path d="M8 1 L15 4.5 L8 8 L1 4.5 Z" />
              <path d="M1 7.5 L8 11 L15 7.5" />
            </svg>
          </button>
        </div>
        <button title="Reset view" onClick={onResetView} className={styles.controlButton}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12a9 9 0 1 0 3-6.7" />
            <polyline points="3 3 3 9 9 9" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export { AtomPanel }
