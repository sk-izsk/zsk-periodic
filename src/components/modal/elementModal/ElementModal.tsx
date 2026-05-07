import { useCardState } from '@/hooks/elementModal/useCardState'
import { useElementLocale } from '@/hooks/elementModal/useElementLocale'
import { useElementNavigation } from '@/hooks/elementModal/useElementNavigation'
import { useModalKeyboard } from '@/hooks/elementModal/useModalKeyBoard'
import {
  useAnimationSpeed,
  useAnimationsPaused,
  useSetAnimationsPaused,
} from '@/hooks/store/useAnimationStore'
import { useLanguage } from '@/hooks/store/useLanguageStore'
import { useMassUnit } from '@/hooks/store/useSettingsStore'
import { useSelectedElement, useSetSelectedElement } from '@/hooks/store/useTableStore'
import { useDarkMode } from '@/hooks/store/useThemeStore'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useAppTranslation } from '@/i18n/localize'
import { toElementProfile } from '@/utils/elementProfile'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { AtomPanel } from './AtomPanel'
import {
  backdrop,
  backdropTone,
  mobileBody,
  mobileChrome,
  mobileChromeTone,
  mobileCloseButton,
  mobileDetailsPanel,
  mobileSheet,
  modal,
  modalTone,
  stage,
} from './elementModal.css'
import { ElementSideNav } from './ElementSideNav'
import { LevelCardContainer } from './levelCard/LevelCardContainer'
import { Button } from '@/components/ui/button'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { ElementModalHeader } from './ElementModalHeader'

type MobileModalView = 'details' | 'model'

export const ElementModal: React.FC = () => {
  const selectedElement = useSelectedElement()
  const setSelectedElement = useSetSelectedElement()
  const massUnit = useMassUnit()
  const language = useLanguage()
  const animationsPaused = useAnimationsPaused()
  const setAnimationsPaused = useSetAnimationsPaused()
  const animationSpeed = useAnimationSpeed()
  const darkMode = useDarkMode()
  const isMobile = useMediaQuery('(max-width: 1023px)')
  const { t } = useAppTranslation()
  const [mobileView, setMobileView] = useState<MobileModalView>('details')
  const tone = darkMode ? 'dark' : 'light'

  const locale = useElementLocale(language)

  const { close, navigatePrev, navigateNext, hasPrev, hasNext } = useElementNavigation({
    selectedElement,
    setSelectedElement,
  })

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

  useEffect(() => {
    if (selectedElement) {
      setMobileView('details')
    }
  }, [selectedElement])

  useModalKeyboard({ selectedElement, close, navigatePrev, navigateNext })

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
              className={clsx(isMobile ? mobileSheet : modal, modalTone[tone])}
              initial={isMobile ? { opacity: 0, y: 36 } : { scale: 0.88, opacity: 0, y: 24 }}
              animate={isMobile ? { opacity: 1, y: 0 } : { scale: 1, opacity: 1, y: 0 }}
              exit={isMobile ? { opacity: 0, y: 36 } : { scale: 0.88, opacity: 0, y: 24 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={(event) => event.stopPropagation()}
            >
              {isMobile ? (
                <>
                  <div className={clsx(mobileChrome, mobileChromeTone[tone])}>
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      onClick={close}
                      className={mobileCloseButton}
                      aria-label="Close element modal"
                    >
                      ×
                    </Button>
                    <ElementModalHeader
                      profile={profile}
                      activeIsotope={selectedIsotope}
                      darkMode={darkMode}
                      compact
                    />
                    <SegmentedControl
                      value={mobileView}
                      onValueChange={setMobileView}
                      options={[
                        { value: 'details', label: t('modal.details') },
                        { value: 'model', label: t('modal.model3d') },
                      ]}
                    />
                  </div>

                  <div className={mobileBody}>
                    {mobileView === 'details' ? (
                      <div className={mobileDetailsPanel}>
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
                          layout="mobile"
                          showHeader={false}
                        />
                      </div>
                    ) : (
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
                        showCloseButton={false}
                      />
                    )}
                  </div>
                </>
              ) : (
                <>
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
                </>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
