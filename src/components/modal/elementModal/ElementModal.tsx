import { elements } from '@/data/elements/elements'
import {
  useAnimationSpeed,
  useAnimationsPaused,
  useSetAnimationsPaused,
} from '@/hooks/store/useAnimationStore'
import { useLanguage } from '@/hooks/store/useLanguageStore'
import { useMassUnit } from '@/hooks/store/useSettingsStore'
import { useSelectedElement, useSetSelectedElement } from '@/hooks/store/useTableStore'
import { useDarkMode } from '@/hooks/store/useThemeStore'
import { useAppTranslation } from '@/i18n/localize'
import { loadElementLocale } from '@/i18n/locale-loaders'
import type { ElementLocaleRecord } from '@/i18n/types'
import type { ElementIsotope } from '@/types/elementProfile'
import { toElementProfile } from '@/utils/elementProfile'
import { useNavigate, useSearch } from '@tanstack/react-router'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AtomPanel } from './AtomPanel'
import { CardPager } from './CardPager'
import { ElementModalHeader } from './ElementModalHeader'
import { ElementSideNav } from './ElementSideNav'
import * as styles from './elementModal.css'
import { LEVELS, normalizeElementSearchParam } from './elementModalUtils'
import { L1Card, L2Card, L3Card, L4Card } from './LevelCards'

const cardSlideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -80 : 80, opacity: 0 }),
}

const ElementModal = () => {
  const selectedElement = useSelectedElement()
  const setSelectedElement = useSetSelectedElement()
  const massUnit = useMassUnit()
  const language = useLanguage()
  const animationsPaused = useAnimationsPaused()
  const setAnimationsPaused = useSetAnimationsPaused()
  const animationSpeed = useAnimationSpeed()
  const darkMode = useDarkMode()
  const { t } = useAppTranslation()
  const search = useSearch({ from: '__root__' })
  const navigate = useNavigate({ from: '/' })
  const [locale, setLocale] = useState<Record<string, ElementLocaleRecord>>({})
  const [activeCard, setActiveCard] = useState(0)
  const [cardDirection, setCardDirection] = useState(1)
  const [topView, setTopView] = useState(false)
  const [resetViewToken, setResetViewToken] = useState(0)
  const [selectedIsotope, setSelectedIsotope] = useState<ElementIsotope | null>(null)
  const touchStartX = useRef<number | null>(null)
  const pointerStartX = useRef<number | null>(null)
  const pointerDragActive = useRef(false)
  const closingRef = useRef(false)
  const tone = darkMode ? 'dark' : 'light'

  useEffect(() => {
    let mounted = true
    loadElementLocale(language).then((records) => {
      if (mounted) {
        setLocale(records)
      }
    })
    return () => {
      mounted = false
    }
  }, [language])

  useEffect(() => {
    const elementSearch = normalizeElementSearchParam(search.element)
    if (!elementSearch) {
      closingRef.current = false
      return
    }
    if (closingRef.current) {
      return
    }
    const matched = elements.find(
      (element) =>
        element.sym.toLowerCase() === elementSearch.toLowerCase() ||
        String(element.n) === elementSearch,
    )
    if (matched && matched !== selectedElement) {
      setSelectedElement(matched)
    }
  }, [search.element, selectedElement, setSelectedElement])

  useEffect(() => {
    if (!selectedElement) {
      return
    }
    void navigate({
      search: { element: selectedElement.sym },
      replace: true,
    })
  }, [navigate, selectedElement])

  const profile = useMemo(() => {
    if (!selectedElement) {
      return null
    }
    return toElementProfile(selectedElement, locale[String(selectedElement.n)])
  }, [locale, selectedElement])

  useEffect(() => {
    setActiveCard(0)
    setCardDirection(1)
    setTopView(false)
    setResetViewToken((value) => value + 1)
    setSelectedIsotope(null)
  }, [selectedElement?.n])

  useEffect(() => {
    if (profile?.level2.isotopes.length && !selectedIsotope) {
      setSelectedIsotope(profile.level2.isotopes[0])
    }
  }, [profile, selectedIsotope])

  const currentIndex = selectedElement
    ? elements.findIndex((element) => element.n === selectedElement.n)
    : -1
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex >= 0 && currentIndex < elements.length - 1

  const close = useCallback(() => {
    closingRef.current = true
    setSelectedElement(null)
    void navigate({
      to: '/',
      search: {},
      replace: true,
    })
  }, [navigate, setSelectedElement])

  const navigatePrev = useCallback(() => {
    if (hasPrev) {
      setSelectedElement(elements[currentIndex - 1])
    }
  }, [currentIndex, hasPrev, setSelectedElement])

  const navigateNext = useCallback(() => {
    if (hasNext) {
      setSelectedElement(elements[currentIndex + 1])
    }
  }, [currentIndex, hasNext, setSelectedElement])

  const goToCard = useCallback(
    (nextCard: number) => {
      if (nextCard === activeCard || nextCard < 0 || nextCard >= LEVELS.length) {
        return
      }
      setCardDirection(nextCard > activeCard ? 1 : -1)
      setActiveCard(nextCard)
    },
    [activeCard],
  )

  const goPrevCard = useCallback(() => goToCard(activeCard - 1), [activeCard, goToCard])
  const goNextCard = useCallback(() => goToCard(activeCard + 1), [activeCard, goToCard])

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null
  }

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current == null) {
      return
    }
    const delta = event.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(delta) < 45) {
      return
    }
    if (delta < 0) {
      goNextCard()
    } else {
      goPrevCard()
    }
  }

  const onPointerDown = (event: React.PointerEvent) => {
    pointerStartX.current = event.clientX
    pointerDragActive.current = true
  }

  const onPointerUp = (event: React.PointerEvent) => {
    if (!pointerDragActive.current || pointerStartX.current == null) {
      return
    }
    const delta = event.clientX - pointerStartX.current
    pointerStartX.current = null
    pointerDragActive.current = false
    if (Math.abs(delta) < 55) {
      return
    }
    if (delta < 0) {
      goNextCard()
    } else {
      goPrevCard()
    }
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!selectedElement) {
        return
      }
      if (event.key === 'Escape') {
        close()
      }
      if (event.key === 'ArrowLeft') {
        navigatePrev()
      }
      if (event.key === 'ArrowRight') {
        navigateNext()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close, navigateNext, navigatePrev, selectedElement])

  return (
    <AnimatePresence>
      {selectedElement && profile && (
        <>
          <motion.div
            key="backdrop"
            className={clsx(styles.backdrop, styles.backdropTone[tone])}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={close}
          />
          <motion.div key="modal" className={styles.stage} onClick={close}>
            <motion.div
              className={clsx(styles.modal, styles.modalTone[tone])}
              initial={{ scale: 0.88, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 24 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={(event) => event.stopPropagation()}
            >
              {hasPrev && <ElementSideNav direction="prev" onClick={navigatePrev} />}
              {hasNext && <ElementSideNav direction="next" onClick={navigateNext} />}

              <div className={clsx(styles.leftPanel, styles.leftPanelTone[tone])}>
                <ElementModalHeader
                  profile={profile}
                  activeIsotope={selectedIsotope}
                  darkMode={darkMode}
                />
                <div
                  className={clsx(
                    styles.cardArea,
                    'cursor-grab select-none active:cursor-grabbing',
                  )}
                  onTouchStart={onTouchStart}
                  onTouchEnd={onTouchEnd}
                  onPointerDown={onPointerDown}
                  onPointerUp={onPointerUp}
                  onPointerCancel={() => {
                    pointerStartX.current = null
                    pointerDragActive.current = false
                  }}
                >
                  <div className={styles.cardViewport}>
                    <AnimatePresence initial={false} custom={cardDirection} mode="popLayout">
                      <motion.div
                        key={LEVELS[activeCard]}
                        custom={cardDirection}
                        variants={cardSlideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          x: { duration: 0.46, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.18 },
                        }}
                        className={styles.animatedCard}
                      >
                        {LEVELS[activeCard] === 'l1' && <L1Card profile={profile} t={t} />}
                        {LEVELS[activeCard] === 'l2' && (
                          <L2Card
                            profile={profile}
                            massUnit={massUnit}
                            selectedIsotope={selectedIsotope}
                            onSelectIsotope={setSelectedIsotope}
                            t={t}
                          />
                        )}
                        {LEVELS[activeCard] === 'l3' && <L3Card profile={profile} t={t} />}
                        {LEVELS[activeCard] === 'l4' && <L4Card profile={profile} t={t} />}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                <CardPager
                  activeCard={activeCard}
                  levels={LEVELS}
                  darkMode={darkMode}
                  onPrev={goPrevCard}
                  onNext={goNextCard}
                  onSelect={goToCard}
                />
              </div>

              <AtomPanel
                element={selectedElement}
                darkMode={darkMode}
                paused={animationsPaused}
                speed={animationSpeed}
                topView={topView}
                resetToken={resetViewToken}
                activeIsotope={selectedIsotope}
                onClose={close}
                onTogglePaused={() => setAnimationsPaused(!animationsPaused)}
                onToggleTopView={() => setTopView((value) => !value)}
                onResetView={() => {
                  setTopView(false)
                  setResetViewToken((value) => value + 1)
                }}
              />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export { ElementModal }
