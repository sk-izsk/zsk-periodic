import { RoutePending } from '@/components/routePending/RoutePending'
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

const WorksheetPending = () => <RoutePending label="Loading Worksheet..." />

export const Route = createFileRoute('/worksheet')({
  pendingComponent: WorksheetPending,
  component: lazyRouteComponent(() => import('@/screens/WorkSheetScreen'), 'default'),
})

