import { DashboardLayout } from '@/components/dashboard/layout';
import { ModuleContent } from '@/components/dashboard/module-content';

export default function ChefStockPage() {
  return (
    <DashboardLayout role="chef" tier="normal">
      <ModuleContent title="Inventory & Stock" type="inventory" tier="normal" role="chef" />
    </DashboardLayout>
  );
}
