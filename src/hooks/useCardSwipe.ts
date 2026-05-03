import { useRef } from 'react'

export const useCardSwipe = (goPrevCard: () => void, goNextCard: () => void) => {
  const touchStartX = useRef<number | null>(null)
  const pointerStartX = useRef<number | null>(null)
  const pointerDragActive = useRef(false)

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

  const onPointerCancel = () => {
    pointerStartX.current = null
    pointerDragActive.current = false
  }

  return { onTouchStart, onTouchEnd, onPointerDown, onPointerUp, onPointerCancel }
}
