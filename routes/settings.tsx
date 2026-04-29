import RoutePending from '@/components/RoutePending';
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

const SettingsPending = () => <RoutePending label="Loading Settings..." />;

export const Route = createFileRoute('/settings')({
  pendingComponent: SettingsPending,
  component: lazyRouteComponent(() => import('@/app/settings/page'), 'default'),
});
