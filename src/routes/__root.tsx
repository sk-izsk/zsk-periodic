import { ElementModal } from '@/components/modal/ElementModal'
import { DesktopOnlyGate } from '@/components/DesktopOnlyGate'
import { Nav } from '@/components/Nav'
import { createRootRoute, Outlet } from '@tanstack/react-router'

const RootLayout = () => {
  return (
    <DesktopOnlyGate>
      <div className="flex h-screen w-screen flex-col overflow-hidden">
        <Nav />
        <div className="min-h-0 flex-1 overflow-auto">
          <Outlet />
        </div>
        <ElementModal />
      </div>
    </DesktopOnlyGate>
  )
}

const Route = createRootRoute({
  validateSearch: (search: Record<string, unknown>): { element?: string } => {
    const val = typeof search.element === 'string' ? search.element : undefined
    return val !== undefined ? { element: val } : {}
  },
  component: RootLayout,
})

export { Route }
