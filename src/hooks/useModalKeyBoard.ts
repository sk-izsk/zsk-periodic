import { useEffect } from 'react'
import type { Element } from '@/data/elements/elements'

export const useModalKeyboard = (
  selectedElement: Element | null,
  close: () => void,
  navigatePrev: () => void,
  navigateNext: () => void,
) => {
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
