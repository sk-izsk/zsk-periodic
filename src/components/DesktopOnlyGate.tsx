import { Monitor, RotateCcw, TabletSmartphone } from 'lucide-react'
import { useEffect, useState } from 'react'

export const DESKTOP_MIN_WIDTH = 1024

const getViewportWidth = () =>
  typeof window === 'undefined' ? DESKTOP_MIN_WIDTH : window.innerWidth

interface DesktopOnlyGateProps {
  children: React.ReactNode
}

export const DesktopOnlyGate: React.FC<DesktopOnlyGateProps> = ({ children }) => {
  const [viewportWidth, setViewportWidth] = useState(getViewportWidth)

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth)

    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  if (viewportWidth >= DESKTOP_MIN_WIDTH) {
    return children
  }

  return (
    <main className="flex items-center justify-center min-h-screen px-5 overflow-hidden bg-app text-ink">
      <section className="relative w-full max-w-md rounded-lg border border-line bg-surface p-7 text-center shadow-[var(--shadow-panel)] backdrop-blur-xl">
        <div
          className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"
          aria-hidden="true"
        />
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-lg border border-line bg-elevated text-[var(--color-accent)]">
          <Monitor size={32} strokeWidth={1.7} />
        </div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted">
          ZTable workspace
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">Use a larger screen</h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          For the best periodic table experience, open ZTable on desktop or an 11-inch iPad in
          landscape.
        </p>
        <div className="grid grid-cols-2 gap-3 mt-6 text-xs text-left text-muted">
          <div className="p-3 border rounded-md border-line bg-elevated">
            <TabletSmartphone className="mb-2 text-[var(--color-accent)]" size={18} />
            Portrait tablets and phones are intentionally simplified here.
          </div>
          <div className="p-3 border rounded-md border-line bg-elevated">
            <RotateCcw className="mb-2 text-[var(--color-accent)]" size={18} />
            Rotate larger tablets or move to a desktop browser.
          </div>
        </div>
      </section>
    </main>
  )
}
