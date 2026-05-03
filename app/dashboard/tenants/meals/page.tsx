import { DashboardLayout } from '@/components/dashboard/layout';
import { TenantMealsView } from '@/components/dashboard/tenant-views';

export default function TenantMealsPage() {
  return (
    <DashboardLayout role="tenant" tier="normal">
      <TenantMealsView />
    </DashboardLayout>
  );
}
