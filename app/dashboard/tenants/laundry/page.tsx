import { DashboardLayout } from '@/components/dashboard/layout';
import { ModuleContent } from '@/components/dashboard/module-content';

export default function TenantLaundryPage() {
  return (
    <DashboardLayout role="tenant">
      <ModuleContent title="My Laundry" type="laundry" role="tenant" />
    </DashboardLayout>
  );
}
