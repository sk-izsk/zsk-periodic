import { ElementModal } from '@/components/modal/elementModal/ElementModal'
import { DesktopOnlyGate } from '@/components/DesktopOnlyGate'
import { Nav } from '@/components/nav/Nav'
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
    const raw = Array.isArray(search.element) ? search.element[0] : search.element
    const element =
      typeof raw === 'string' || typeof raw === 'number' ? String(raw).trim() : undefined

    return element ? { element } : {}
  },
  component: RootLayout,
})

export { Route }
