import { RoutePending } from '@/components/RoutePending'
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

const HomePending = () => <RoutePending label="Loading Periodic Table..." />

const Route = createFileRoute('/')({
  pendingComponent: HomePending,
  component: lazyRouteComponent(() => import('@/screens/HomeScreen'), 'default'),
})

export { Route }
