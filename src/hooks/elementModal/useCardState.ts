import { useCallback, useEffect, useState } from 'react'
import { ElementIsotope } from '../../types/elementProfile'
import { LEVELS } from '../../utils/elementModalUtils'

export const useCardState = (elementN: number | undefined) => {
  const [activeCard, setActiveCard] = useState(0)
  const [cardDirection, setCardDirection] = useState(1)
  const [topView, setTopView] = useState(false)
  const [resetViewToken, setResetViewToken] = useState(0)
  const [selectedIsotope, setSelectedIsotope] = useState<ElementIsotope | null>(null)

  useEffect(() => {
    setActiveCard(0)
    setCardDirection(1)
    setTopView(false)
    setResetViewToken((v) => v + 1)
    setSelectedIsotope(null)
  }, [elementN])

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

  return {
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
  }
}
