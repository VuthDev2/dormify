import { DashboardLayout } from '@/components/dashboard/layout';
import { ModuleContent } from '@/components/dashboard/module-content';

export default function ChefCountsPage() {
  return (
    <DashboardLayout role="chef" tier="normal">
      <ModuleContent title="Resident Counts - Chef Portal" type="meals" subType="counts" tier="normal" role="chef" />
    </DashboardLayout>
  );
}
