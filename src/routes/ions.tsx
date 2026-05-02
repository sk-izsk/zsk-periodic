import { RoutePending } from '@/components/routePending/RoutePending'
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

const IonsPending = () => <RoutePending label="Loading Ions..." />

const Route = createFileRoute('/ions')({
  pendingComponent: IonsPending,
  component: lazyRouteComponent(() => import('@/screens/IonScreen'), 'default'),
})

export { Route }
