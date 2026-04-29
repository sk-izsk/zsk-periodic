import RoutePending from '@/components/RoutePending';
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

const HomePending = () => <RoutePending label="Loading Periodic Table..." />;

export const Route = createFileRoute('/')({
  pendingComponent: HomePending,
  component: lazyRouteComponent(() => import('@/components/table/PeriodicTable'), 'default'),
});
