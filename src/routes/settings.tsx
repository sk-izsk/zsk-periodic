import { RoutePending } from '@/components/routePending/RoutePending'
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

const SettingsPending = () => <RoutePending label="Loading Settings..." />

const Route = createFileRoute('/settings')({
  pendingComponent: SettingsPending,
  component: lazyRouteComponent(() => import('@/screens/SettingScreen'), 'default'),
})

export { Route }
