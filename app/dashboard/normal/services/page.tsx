import { DashboardLayout } from '@/components/dashboard/layout';
import { ServicesContent } from '@/components/dashboard/services-content';

export default function NormalServicesPage() {
  return (
    <DashboardLayout role="admin" tier="normal">
      <ServicesContent title="Facilities Operations" tier="normal" role="admin" />
    </DashboardLayout>
  );
}
