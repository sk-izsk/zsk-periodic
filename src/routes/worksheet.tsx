import { RoutePending } from '@/components/RoutePending'
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

const WorksheetPending = () => <RoutePending label="Loading Worksheet..." />

const Route = createFileRoute('/worksheet')({
  pendingComponent: WorksheetPending,
  component: lazyRouteComponent(() => import('@/screens/WorkSheetScreen'), 'default'),
})

export { Route }
