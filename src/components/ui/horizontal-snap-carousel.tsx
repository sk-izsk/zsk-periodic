import { cn } from '@/utils/cn'
import { useEffect, useRef } from 'react'

interface HorizontalSnapCarouselProps<T> {
  items: T[]
  activeIndex: number
  onIndexChange: (index: number) => void
  renderItem: (item: T, index: number) => React.ReactNode
  getItemKey: (item: T, index: number) => string
  className?: string
  slideClassName?: string
  peekPx?: number
}

export const HorizontalSnapCarousel = <T,>({
  items,
  activeIndex,
  onIndexChange,
  renderItem,
  getItemKey,
  className,
  slideClassName,
  peekPx = 24,
}: HorizontalSnapCarouselProps<T>) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, items.length)
  }, [items])

  useEffect(() => {
    const slide = slideRefs.current[activeIndex]
    if (!slide) {
      return
    }

    slide.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    })
  }, [activeIndex])

  useEffect(
    () => () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current)
      }
    },
    [],
  )

  const updateIndexFromScroll = () => {
    const container = containerRef.current
    if (!container) {
      return
    }

    const targetLeft = container.scrollLeft + peekPx
    let nearestIndex = 0
    let smallestDistance = Number.POSITIVE_INFINITY

    slideRefs.current.forEach((slide, index) => {
      if (!slide) {
        return
      }

      const distance = Math.abs(slide.offsetLeft - targetLeft)
      if (distance < smallestDistance) {
        smallestDistance = distance
        nearestIndex = index
      }
    })

    if (nearestIndex !== activeIndex) {
      onIndexChange(nearestIndex)
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'flex h-full snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-5 pb-2 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        className,
      )}
      onScroll={() => {
        if (rafRef.current != null) {
          cancelAnimationFrame(rafRef.current)
        }

        rafRef.current = requestAnimationFrame(updateIndexFromScroll)
      }}
    >
      {items.map((item, index) => (
        <div
          key={getItemKey(item, index)}
          ref={(node) => {
            slideRefs.current[index] = node
          }}
          className={cn('h-full shrink-0 snap-start', slideClassName)}
          style={{ width: `calc(100% - ${peekPx * 2}px)` }}
        >
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  )
}
