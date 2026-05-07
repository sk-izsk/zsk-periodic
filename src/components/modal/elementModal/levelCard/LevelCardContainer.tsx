import { useCardSwipe } from '@/hooks/useCardSwipe'
import { HorizontalSnapCarousel } from '@/components/ui/horizontal-snap-carousel'
import { ElementIsotope, ElementProfile } from '@/types/elementProfile'
import { cardSlideVariants } from '@/utils/cardSlideVariants'
import { LEVELS } from '@/utils/elementModalUtils'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { CardPager } from '../CardPager'
import {
  animatedCard,
  cardArea,
  cardViewport,
  leftPanel,
  leftPanelMobile,
  leftPanelTone,
  mobileCardArea,
  mobileCardViewport,
} from '../elementModal.css'
import { ElementModalHeader } from '../ElementModalHeader'
import { L1Card } from './L1Card'
import { L2Card } from './L2Card'
import { L3Card } from './L3Card'
import { L4Card } from './L4Card'

type CardLayout = 'desktop' | 'mobile'

interface LevelCardContainerProps {
  profile: ElementProfile
  selectedIsotope: ElementIsotope | null
  massUnit: string
  darkMode: boolean
  activeCard: number
  cardDirection: number
  goToCard: (index: number) => void
  goPrevCard: () => void
  goNextCard: () => void
  setSelectedIsotope: (isotope: ElementIsotope) => void
  layout?: CardLayout
  showHeader?: boolean
}

const renderLevelCard = (
  level: (typeof LEVELS)[number],
  profile: ElementProfile,
  massUnit: string,
  selectedIsotope: ElementIsotope | null,
  setSelectedIsotope: (isotope: ElementIsotope) => void,
) => {
  if (level === 'l1') {
    return <L1Card profile={profile} />
  }

  if (level === 'l2') {
    return (
      <L2Card
        profile={profile}
        massUnit={massUnit}
        selectedIsotope={selectedIsotope}
        onSelectIsotope={setSelectedIsotope}
      />
    )
  }

  if (level === 'l3') {
    return <L3Card profile={profile} />
  }

  return <L4Card profile={profile} />
}

export const LevelCardContainer: React.FC<LevelCardContainerProps> = ({
  profile,
  selectedIsotope,
  massUnit,
  darkMode,
  activeCard,
  cardDirection,
  goToCard,
  goPrevCard,
  goNextCard,
  setSelectedIsotope,
  layout = 'desktop',
  showHeader = true,
}) => {
  const tone = darkMode ? 'dark' : 'light'
  const isMobile = layout === 'mobile'

  const swipeHandlers = useCardSwipe({ goPrevCard, goNextCard })

  return (
    <div className={clsx(leftPanel, isMobile && leftPanelMobile, !isMobile && leftPanelTone[tone])}>
      {showHeader && (
        <ElementModalHeader
          profile={profile}
          activeIsotope={selectedIsotope}
          darkMode={darkMode}
          compact={isMobile}
        />
      )}
      <div
        className={clsx(
          cardArea,
          isMobile
            ? [mobileCardArea, mobileCardViewport]
            : 'cursor-grab select-none active:cursor-grabbing',
        )}
        {...(!isMobile ? swipeHandlers : {})}
      >
        <div className={cardViewport}>
          {isMobile ? (
            <HorizontalSnapCarousel
              items={LEVELS}
              activeIndex={activeCard}
              onIndexChange={goToCard}
              getItemKey={(level) => level}
              renderItem={(level) =>
                renderLevelCard(level, profile, massUnit, selectedIsotope, setSelectedIsotope)
              }
            />
          ) : (
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
                className={animatedCard}
              >
                {renderLevelCard(
                  LEVELS[activeCard],
                  profile,
                  massUnit,
                  selectedIsotope,
                  setSelectedIsotope,
                )}
              </motion.div>
            </AnimatePresence>
          )}
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
  )
}
