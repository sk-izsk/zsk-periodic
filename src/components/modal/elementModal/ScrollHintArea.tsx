import { ChevronDown } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import * as styles from './elementModal.css'

const ScrollHintArea = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [showHint, setShowHint] = useState(false)

  const updateHint = useCallback(() => {
    const node = scrollRef.current
    if (!node) {
      return
    }

    const canScroll = node.scrollHeight > node.clientHeight + 4
    const atBottom = node.scrollTop + node.clientHeight >= node.scrollHeight - 8
    setShowHint(canScroll && !atBottom)
  }, [])

  useEffect(() => {
    updateHint()
    const node = scrollRef.current
    if (!node) {
      return
    }

    const resizeObserver = new ResizeObserver(updateHint)
    resizeObserver.observe(node)
    return () => resizeObserver.disconnect()
  }, [updateHint])

  return (
    <div className={styles.scrollArea}>
      <div ref={scrollRef} className={styles.scrollRegion} onScroll={updateHint}>
        {children}
      </div>
      {showHint && (
        <button
          type="button"
          aria-label="Scroll for more"
          className={styles.scrollButton}
          onClick={() =>
            scrollRef.current?.scrollBy({
              top: scrollRef.current.clientHeight * 0.72,
              behavior: 'smooth',
            })
          }
        >
          <ChevronDown size={18} strokeWidth={2.4} />
        </button>
      )}
    </div>
  )
}

export { ScrollHintArea }
