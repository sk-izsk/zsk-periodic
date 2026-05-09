import { ElementModalHost } from '@/components/modal/elementModal/ElementModalHost'
import { Nav } from '@/components/nav/Nav'
import { createRootRoute, Outlet } from '@tanstack/react-router'

const RootLayout = () => {
  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden">
      <Nav />
      <div className="flex-1 min-h-0 overflow-auto">
        <Outlet />
      </div>
      <ElementModalHost />
    </div>
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
