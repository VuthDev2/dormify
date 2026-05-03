import { DashboardLayout } from '@/components/dashboard/layout';
import { ServicesContent } from '@/components/dashboard/services-content';

export default function PremiumServicesPage() {
  return (
    <DashboardLayout role="admin" tier="premium">
      <ServicesContent title="Premium Facility Operations" tier="premium" role="admin" />
    </DashboardLayout>
  );
}
