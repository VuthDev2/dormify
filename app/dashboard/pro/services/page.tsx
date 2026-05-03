import { DashboardLayout } from '@/components/dashboard/layout';
import { ServicesContent } from '@/components/dashboard/services-content';

export default function ProServicesPage() {
  return (
    <DashboardLayout role="admin" tier="pro">
      <ServicesContent title="Facilities Operations" tier="pro" role="admin" />
    </DashboardLayout>
  );
}
