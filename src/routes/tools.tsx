import RoutePending from '@/components/RoutePending'
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

const ToolsPending = () => <RoutePending label="Loading Tools..." />

export const Route = createFileRoute('/tools')({
  pendingComponent: ToolsPending,
  component: lazyRouteComponent(() => import('@/screens/ToolScreen'), 'default'),
})
