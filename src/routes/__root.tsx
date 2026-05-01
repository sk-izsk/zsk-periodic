import { ElementModal } from '@/components/modal/ElementModal'
import { Nav } from '@/components/Nav'
import { createRootRoute, Outlet } from '@tanstack/react-router'

const RootLayout = () => {
  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden">
      <Nav />
      <div className="flex-1 min-h-0 overflow-auto">
        <Outlet />
      </div>
      <ElementModal />
    </div>
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
