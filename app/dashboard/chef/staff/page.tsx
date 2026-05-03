import { DashboardLayout } from '@/components/dashboard/layout';
import { ModuleContent } from '@/components/dashboard/module-content';

export default function ChefStaffPage() {
  return (
    <DashboardLayout role="chef" tier="normal">
      <ModuleContent title="Kitchen Team" type="staff" tier="normal" role="chef" />
    </DashboardLayout>
  );
}
