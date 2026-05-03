import { DashboardLayout } from '@/components/dashboard/layout';
import { ServicesContent } from '@/components/dashboard/services-content';

export default function TenantServicesPage() {
  return (
    <DashboardLayout role="tenant" tier="normal">
       <ServicesContent title="Resident Services" role="tenant" />
    </DashboardLayout>
  );
}
