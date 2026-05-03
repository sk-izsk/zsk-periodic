import { useCardSwipe } from '@/hooks/useCardSwipe'
import { ElementIsotope, ElementProfile } from '@/types/elementProfile'
import { cardSlideVariants } from '@/utils/cardSlideVariants'
import { LEVELS } from '@/utils/elementModalUtils'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { CardPager } from '../CardPager'
import { animatedCard, cardArea, cardViewport, leftPanel, leftPanelTone } from '../elementModal.css'
import { ElementModalHeader } from '../ElementModalHeader'
import { L1Card } from './L1Card'
import { L2Card } from './L2Card'
import { L3Card } from './L3Card'
import { L4Card } from './L4Card'

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
}) => {
  const tone = darkMode ? 'dark' : 'light'
  const swipeHandlers = useCardSwipe({ goPrevCard, goNextCard })

  return (
    <div className={clsx(leftPanel, leftPanelTone[tone])}>
      <ElementModalHeader profile={profile} activeIsotope={selectedIsotope} darkMode={darkMode} />
      <div
        className={clsx(cardArea, 'cursor-grab select-none active:cursor-grabbing')}
        {...swipeHandlers}
      >
        <div className={cardViewport}>
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
              {LEVELS[activeCard] === 'l1' && <L1Card profile={profile} />}
              {LEVELS[activeCard] === 'l2' && (
                <L2Card
                  profile={profile}
                  massUnit={massUnit}
                  selectedIsotope={selectedIsotope}
                  onSelectIsotope={setSelectedIsotope}
                />
              )}
              {LEVELS[activeCard] === 'l3' && <L3Card profile={profile} />}
              {LEVELS[activeCard] === 'l4' && <L4Card profile={profile} />}
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
  )
}
