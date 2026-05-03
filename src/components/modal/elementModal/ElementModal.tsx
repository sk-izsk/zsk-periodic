import {
  useAnimationSpeed,
  useAnimationsPaused,
  useSetAnimationsPaused,
} from '@/hooks/store/useAnimationStore'
import { useLanguage } from '@/hooks/store/useLanguageStore'
import { useMassUnit } from '@/hooks/store/useSettingsStore'
import { useSelectedElement, useSetSelectedElement } from '@/hooks/store/useTableStore'
import { useDarkMode } from '@/hooks/store/useThemeStore'
import { toElementProfile } from '@/utils/elementProfile'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo } from 'react'
import { useCardState } from '../../../hooks/useCardState'
import { useElementLocale } from '../../../hooks/useElementLocale'
import { useElementNavigation } from '../../../hooks/useElementNavigation'
import { useModalKeyboard } from '../../../hooks/useModalKeyBoard'
import { AtomPanel } from './AtomPanel'
import { backdrop, backdropTone, modal, modalTone, stage } from './elementModal.css'
import { ElementSideNav } from './ElementSideNav'
import { LevelCardContainer } from './levelCard/LevelCardContainer'

export const ElementModal: React.FC = () => {
  const selectedElement = useSelectedElement()
  const setSelectedElement = useSetSelectedElement()
  const massUnit = useMassUnit()
  const language = useLanguage()
  const animationsPaused = useAnimationsPaused()
  const setAnimationsPaused = useSetAnimationsPaused()
  const animationSpeed = useAnimationSpeed()
  const darkMode = useDarkMode()
  const tone = darkMode ? 'dark' : 'light'

  const locale = useElementLocale(language)

  const { close, navigatePrev, navigateNext, hasPrev, hasNext } = useElementNavigation(
    selectedElement,
    setSelectedElement,
  )

  const {
    activeCard,
    cardDirection,
    topView,
    setTopView,
    resetViewToken,
    setResetViewToken,
    selectedIsotope,
    setSelectedIsotope,
    goToCard,
    goPrevCard,
    goNextCard,
  } = useCardState(selectedElement?.n)

  const profile = useMemo(() => {
    if (!selectedElement) {
      return null
    }
    return toElementProfile(selectedElement, locale[String(selectedElement.n)])
  }, [locale, selectedElement])

  // Set the default isotope once the profile is ready
  useEffect(() => {
    if (profile?.level2.isotopes.length && !selectedIsotope) {
      setSelectedIsotope(profile.level2.isotopes[0])
    }
  }, [profile, selectedIsotope, setSelectedIsotope])

  useModalKeyboard(selectedElement, close, navigatePrev, navigateNext)

  return (
    <AnimatePresence>
      {selectedElement && profile && (
        <>
          <motion.div
            key="backdrop"
            className={clsx(backdrop, backdropTone[tone])}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={close}
          />
          <motion.div key="modal" className={stage} onClick={close}>
            <motion.div
              className={clsx(modal, modalTone[tone])}
              initial={{ scale: 0.88, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 24 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={(event) => event.stopPropagation()}
            >
              {hasPrev && <ElementSideNav direction="prev" onClick={navigatePrev} />}
              {hasNext && <ElementSideNav direction="next" onClick={navigateNext} />}

              <LevelCardContainer
                profile={profile}
                selectedIsotope={selectedIsotope}
                massUnit={massUnit}
                darkMode={darkMode}
                activeCard={activeCard}
                cardDirection={cardDirection}
                goToCard={goToCard}
                goPrevCard={goPrevCard}
                goNextCard={goNextCard}
                setSelectedIsotope={setSelectedIsotope}
              />

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
                onToggleTopView={() => setTopView((v) => !v)}
                onResetView={() => {
                  setTopView(false)
                  setResetViewToken((v) => v + 1)
                }}
              />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
