import { useEffect } from 'react'
import type { Element } from '@/data/elements/elements'

interface UseModalKeyboardProps {
  selectedElement: Element | null
  close: () => void
  navigatePrev: () => void
  navigateNext: () => void
}

export const useModalKeyboard = ({
  selectedElement,
  close,
  navigatePrev,
  navigateNext,
}: UseModalKeyboardProps) => {
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
}
