import { DashboardLayout } from '@/components/dashboard/layout';
import { TenantDashboardView } from '@/components/dashboard/tenant-views';

export default function TenantDashboard() {
  return (
    <DashboardLayout role="tenant" tier="normal">
      <TenantDashboardView />
    </DashboardLayout>
  );
}
