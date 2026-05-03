import { DashboardLayout } from '@/components/dashboard/layout';
import { ModuleContent } from '@/components/dashboard/module-content';

export default function NormalMealsPage() {
  return (
    <DashboardLayout role="admin" tier="normal">
      <ModuleContent title="Meals" type="meals" tier="normal" />
    </DashboardLayout>
  );
}
