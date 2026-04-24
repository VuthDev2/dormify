'use client';

import {
  Building2,
  Wallet,
  Settings,
  Activity,
  Link as LinkIcon,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Power,
  Globe,
  MonitorSmartphone,
  ShieldCheck,
  UtensilsCrossed,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface IntegrationsContentProps {
  title: string;
  tier?: 'normal' | 'pro' | 'premium';
  role?: 'admin' | 'tenant' | 'chef';
}

export function IntegrationsContent({ title, tier = 'normal', role = 'admin' }: IntegrationsContentProps) {
  const isPremium = tier === 'premium';
  const isPro = tier === 'pro';

  const [isSyncing, setIsSyncing] = useState<string | null>(null);
  const [integrationNotice, setIntegrationNotice] = useState<string | null>(null);

  const handleSync = (id: string) => {
    setIsSyncing(id);
    setTimeout(() => {
      setIsSyncing(null);
    }, 1500);
  };

  const categories = [
    { id: 'finance', name: 'Financial & Accounting', icon: Wallet },
    { id: 'operations', name: 'Core Operations (PMS)', icon: Building2 },
    { id: 'smart', name: 'Access Control & IoT', icon: MonitorSmartphone },
    { id: 'culinary', name: 'Culinary & Supply', icon: UtensilsCrossed },
  ];

  const integrations = [
    { id: 'stripe', name: 'Stripe Payments', category: 'finance', desc: 'Secure payment processing for rent and amenities.', status: 'Connected', lastSync: '2 mins ago', icon: Wallet },
    { id: 'xero', name: 'Xero Accounting', category: 'finance', desc: 'Real-time ledger sync and supplier invoice routing.', status: 'Requires Auth', lastSync: '2 days ago', icon: Activity },
    { id: 'salto', name: 'SALTO Space', category: 'smart', desc: 'Mobile access control and door telemetry.', status: 'Connected', lastSync: 'Just now', icon: ShieldCheck },
    { id: 'nest', name: 'Google Nest Hub', category: 'smart', desc: 'Climate control and energy optimization.', status: 'Connected', lastSync: '15 mins ago', icon: Power },
    { id: 'sysco', name: 'Sysco Source', category: 'culinary', desc: 'Automated low-stock ordering and live bulk pricing.', status: 'Disconnected', lastSync: '-', icon: Globe },
    { id: 'docusign', name: 'DocuSign API', category: 'operations', desc: 'Digital lease agreements and background check sync.', status: 'Connected', lastSync: '1 hr ago', icon: Settings },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/40">
        <div className="space-y-2">
          <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg">
            System Hub
          </Badge>
          <h1 className={cn("font-black tracking-tight text-foreground", isPremium ? "text-5xl font-serif" : "text-3xl")}>
            {title}
          </h1>
          <p className="text-sm font-medium text-muted-foreground max-w-xl">
            Manage your third-party connections, automate workflows, and monitor real-time data sync health across your residential ecosystem.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="h-10 px-5 rounded-xl font-bold bg-card border-border/40 text-[11px] shadow-sm transition-all hover:bg-muted"
            onClick={() => setIntegrationNotice('Developer API docs opened in Documentation.')}
          >
            <LinkIcon className="w-4 h-4 mr-2" /> Developer API
          </Button>
          <Button
            className="h-10 px-6 rounded-xl font-black bg-primary text-primary-foreground shadow-lg shadow-primary/20 text-[11px] uppercase tracking-widest"
            onClick={() => setIntegrationNotice('App store browser is coming soon.')}
          >
            <Plus className="w-4 h-4 mr-2" /> Browse App Store
          </Button>
        </div>
      </div>

      {integrationNotice ? (
        <p className="text-xs font-semibold text-muted-foreground">{integrationNotice}</p>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         {[
           { label: 'Total Connected', value: '4', sub: 'Active integrations' },
           { label: 'Sync Health', value: '98%', sub: 'System average' },
           { label: 'Data Handled', value: '14.2 GB', sub: 'Last 30 days' },
           { label: 'Action Required', value: '2', sub: 'Authentication errors', color: 'text-amber-500' },
         ].map((stat, i) => (
           <Card key={i} className="p-5 border-border/40 bg-card rounded-[1.5rem] group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-1">{stat.label}</p>
              <h3 className={cn("text-3xl font-black", stat.color || "text-foreground group-hover:text-primary transition-colors")}>{stat.value}</h3>
              <p className="text-[10px] font-bold text-muted-foreground mt-2">{stat.sub}</p>
           </Card>
         ))}
      </div>

      <div className="space-y-12">
        {categories.map(category => {
           const categoryIntegrations = integrations.filter(i => i.category === category.id);

           if (categoryIntegrations.length === 0) return null;

           return (
             <div key={category.id} className="space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b border-border/20">
                   <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <category.icon className="w-4 h-4" />
                   </div>
                   <h2 className="text-lg font-black tracking-tight text-foreground">{category.name}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {categoryIntegrations.map(app => (
                     <Card key={app.id} className="group p-6 border-border/40 bg-card rounded-3xl hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                           <div className="w-14 h-14 rounded-2xl bg-muted/50 border border-border/50 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/5 transition-all duration-500">
                              <app.icon className="w-6 h-6" />
                           </div>
                           <Badge variant="outline" className={cn(
                             "text-[9px] font-black uppercase tracking-widest border-none px-2.5 py-1",
                             app.status === 'Connected' ? "bg-emerald-500/10 text-emerald-600" :
                             app.status === 'Requires Auth' ? "bg-amber-500/10 text-amber-600 animate-pulse" :
                             "bg-muted text-muted-foreground"
                           )}>
                              {app.status}
                           </Badge>
                        </div>

                        <div className="flex-1 space-y-2 mb-6">
                           <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">{app.name}</h3>
                           <p className="text-sm font-medium text-muted-foreground leading-relaxed">{app.desc}</p>
                        </div>

                        <div className="pt-5 border-t border-border/40 flex items-center justify-between mt-auto">
                           <div className="flex items-center gap-2">
                              {app.status === 'Connected' ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                              ) : app.status === 'Requires Auth' ? (
                                <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                              ) : null}
                              <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-70">Sync: {app.lastSync}</span>
                           </div>

                           <div className="flex items-center gap-2">
                              {app.status === 'Connected' && (
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="w-8 h-8 rounded-lg hover:bg-primary/10 hover:text-primary"
                                  onClick={() => handleSync(app.id)}
                                >
                                   <RefreshCw className={cn("w-3.5 h-3.5", isSyncing === app.id ? "animate-spin text-primary" : "")} />
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-4 text-[10px] font-bold rounded-lg border-border/40"
                                onClick={() => setIntegrationNotice(`${app.name}: ${app.status === 'Disconnected' ? 'connect' : 'settings'} flow opened (mock).`)}
                              >
                                {app.status === 'Disconnected' ? 'Connect' : 'Settings'}
                              </Button>
                           </div>
                        </div>
                     </Card>
                   ))}
                </div>
             </div>
           )
        })}
      </div>
    </div>
  );
}
