'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Settings2, Plus, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MaintenanceContent } from './maintenance-content';
import { LaundryContent } from './laundry-content';
import { TenantMaintenanceView } from './tenant-views';
import { TenantLaundryView } from './laundry/tenant-view';

interface ServicesContentProps {
  title: string;
  tier?: 'normal' | 'pro' | 'premium';
  role?: 'admin' | 'tenant' | 'chef';
}

export function ServicesContent({ title, tier = 'normal', role = 'admin' }: ServicesContentProps) {
  const isTenant = role === 'tenant';
  const [activeTab, setActiveTab] = React.useState('maintenance');

  if (isTenant) {
    return (
      <div className="space-y-6 animate-in fade-in duration-700 pb-12">
        {/* --- Header with Tabs on Left --- */}
        <div className="flex flex-col gap-6">
          <div className="space-y-1.5 px-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">Support Services</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-foreground">Manage Your Requests</h1>
            <p className="text-sm text-muted-foreground/60 font-medium">Track maintenance and laundry services in one place</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="h-12 p-1.5 bg-muted/20 backdrop-blur-xl border border-border/20 rounded-2xl shadow-inner w-fit flex">
              <button 
                onClick={() => setActiveTab('maintenance')}
                className={cn(
                  "px-6 rounded-xl font-black uppercase tracking-[0.15em] text-[10px] h-9 transition-all border border-transparent",
                  activeTab === 'maintenance' 
                    ? "bg-background text-primary shadow-xl border-border/40" 
                    : "text-muted-foreground/60 hover:text-foreground"
                )}
              >
                Maintenance
              </button>
              <button 
                onClick={() => setActiveTab('laundry')}
                className={cn(
                  "px-6 rounded-xl font-black uppercase tracking-[0.15em] text-[10px] h-9 transition-all border border-transparent",
                  activeTab === 'laundry' 
                    ? "bg-background text-primary shadow-xl border-border/40" 
                    : "text-muted-foreground/60 hover:text-foreground"
                )}
              >
                Laundry Fleet
              </button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} className="w-full">
          <TabsContent value="maintenance" className="mt-0 outline-none ring-0 focus-visible:ring-0">
            <TenantMaintenanceView hideHeader />
          </TabsContent>
          <TabsContent value="laundry" className="mt-0 outline-none ring-0 focus-visible:ring-0">
            <TenantLaundryView hideHeader />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  const showLaundry = tier !== 'normal';

  if (!showLaundry) {
    return (
      <div className="space-y-4 animate-in fade-in duration-500">
        <MaintenanceContent title={title} tier={tier} role={role} />
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-4 pb-4 border-b border-border/30 dark:border-blue-500/10">
           <div className="flex flex-col md:flex-row md:items-center gap-6">
             <TabsList className="w-full md:w-[26rem] grid grid-cols-2 p-1 bg-muted/20 backdrop-blur-xl border border-border/20 rounded-2xl shadow-inner h-12 shrink-0">
               <TabsTrigger 
                 value="maintenance" 
                 className="rounded-xl font-black uppercase tracking-[0.15em] text-[10px] data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-lg h-10 transition-all border border-transparent data-[state=active]:border-border/40"
               >
                 Maintenance
               </TabsTrigger>
               <TabsTrigger 
                 value="laundry" 
                 className="rounded-xl font-black uppercase tracking-[0.15em] text-[10px] data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-lg h-10 transition-all border border-transparent data-[state=active]:border-border/40"
               >
                 Laundry Fleet
               </TabsTrigger>
             </TabsList>

             <div className="hidden md:block w-px h-8 bg-border/40" />

             <div className="space-y-0.5">
               <h1 className="text-xl font-black tracking-tighter text-foreground uppercase leading-none">
                 {activeTab === 'maintenance' ? 'Facilities Maintenance' : 'Laundry Fleet'}
               </h1>
               <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                 <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                   {activeTab === 'maintenance' ? 'Infrastructure & Operations' : 'Fleet Telemetry & Revenue'}
                 </span>
               </div>
             </div>
           </div>

           <div className="flex items-center gap-3 self-end lg:self-center">
             <Button variant="outline" className="h-10 rounded-xl gap-2 font-bold px-4 border-border/40 dark:border-blue-500/20 hover:bg-muted/30 dark:hover:bg-blue-500/5 transition-colors text-[10px] uppercase tracking-widest bg-card/50 backdrop-blur-md">
                <Settings2 className="w-4 h-4" /> Settings
             </Button>
             {activeTab === 'maintenance' ? (
               <Button className="h-10 rounded-xl gap-2 font-bold px-5 bg-foreground text-background dark:bg-blue-600 dark:text-white shadow-lg hover:shadow-xl transition-all text-[10px] uppercase tracking-widest border-none">
                  <Plus className="w-4 h-4" /> Dispatch Order
               </Button>
             ) : (
               <Button className="h-10 rounded-xl gap-2 font-bold px-5 bg-foreground text-background dark:bg-blue-600 dark:text-white shadow-lg hover:shadow-xl transition-all text-[10px] uppercase tracking-widest border-none">
                  <Download className="w-4 h-4" /> Export Report
               </Button>
             )}
           </div>
        </div>

        <TabsContent value="maintenance" className="mt-0 outline-none ring-0">
          <MaintenanceContent title="Facilities Maintenance" tier={tier} role={role} hideTitle />
        </TabsContent>
        <TabsContent value="laundry" className="mt-0 outline-none ring-0">
          <LaundryContent title="Laundry Fleet" tier={tier} role={role} hideTitle />
        </TabsContent>
      </Tabs>
      
    </div>
  );
}
