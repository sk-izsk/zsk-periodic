import { ElementModal } from '@/components/modal/elementModal/ElementModal'
import { DesktopOnlyGate } from '@/components/DesktopOnlyGate'
import { Nav } from '@/components/nav/Nav'
import { createRootRoute, Outlet } from '@tanstack/react-router'

const RootLayout = () => {
  return (
    <DesktopOnlyGate>
      <div className="flex flex-col w-screen h-screen overflow-hidden">
        <Nav />
        <div className="flex-1 min-h-0 overflow-auto">
          <Outlet />
        </div>
        <ElementModal />
      </div>
    </DesktopOnlyGate>
  )
}

export const Route = createRootRoute({
  validateSearch: (search: Record<string, unknown>): { element?: string } => {
    const raw = Array.isArray(search.element) ? search.element[0] : search.element
    const element =
      typeof raw === 'string' || typeof raw === 'number' ? String(raw).trim() : undefined

    return element ? { element } : {}
  },
  component: RootLayout,
})
