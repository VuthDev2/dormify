import { DashboardLayout } from '@/components/dashboard/layout';
import { ModuleContent } from '@/components/dashboard/module-content';

export default function ChefFeedbackPage() {
  return (
    <DashboardLayout role="chef" tier="normal">
      <ModuleContent title="Resident Sentiment" type="feedback" tier="normal" role="chef" />
    </DashboardLayout>
  );
}
