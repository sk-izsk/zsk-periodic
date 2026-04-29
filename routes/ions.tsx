import RoutePending from '@/components/RoutePending'
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

const IonsPending = () => <RoutePending label="Loading Ions..." />

export const Route = createFileRoute('/ions')({
  pendingComponent: IonsPending,
  component: lazyRouteComponent(() => import('@/app/ions/page'), 'default'),
})
