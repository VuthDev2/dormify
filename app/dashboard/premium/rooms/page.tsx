import { DashboardLayout } from '@/components/dashboard/layout';
import { ModuleContent } from '@/components/dashboard/module-content';

export default function PremiumRoomsPage() {
  return (
    <DashboardLayout role="admin" tier="premium">
      <ModuleContent title="Properties Portfolio" type="properties" tier="premium" />
    </DashboardLayout>
  );
}
