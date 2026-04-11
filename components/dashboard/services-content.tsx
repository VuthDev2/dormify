'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MaintenanceContent } from './maintenance-content';
import { LaundryContent } from './laundry-content';
import { TenantMaintenanceView } from './tenant-views';

interface ServicesContentProps {
  title: string;
  tier?: 'normal' | 'pro' | 'premium';
  role?: 'admin' | 'tenant' | 'chef';
}

export function ServicesContent({ title, tier = 'normal', role = 'admin' }: ServicesContentProps) {
  const isTenant = role === 'tenant';

  if (isTenant) {
    return <TenantMaintenanceView />;
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      
      <Tabs defaultValue="maintenance" className="w-full">
        <div className="flex justify-center md:justify-start mb-6">
           <TabsList className="w-full max-w-sm grid grid-cols-2 p-1.5 bg-background/50 backdrop-blur-xl border border-border/20 rounded-2xl shadow-sm">
             <TabsTrigger 
               value="maintenance" 
               className="rounded-xl font-black uppercase tracking-[0.15em] text-[10px] data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg h-9 transition-all"
             >
               Maintenance
             </TabsTrigger>
             <TabsTrigger 
               value="laundry" 
               className="rounded-xl font-black uppercase tracking-[0.15em] text-[10px] data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg h-9 transition-all"
             >
               Laundry Fleet
             </TabsTrigger>
           </TabsList>
        </div>

        <TabsContent value="maintenance" className="mt-0 outline-none ring-0">
          <MaintenanceContent title="Facilities Maintenance" tier={tier} role={role} />
        </TabsContent>
        <TabsContent value="laundry" className="mt-0 outline-none ring-0">
          <LaundryContent title="Laundry Fleet" tier={tier} role={role} />
        </TabsContent>
      </Tabs>
      
    </div>
  );
}
