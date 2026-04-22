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
  Plus,
  Truck,
  PackageSearch,
  Handshake,
  BarChart3,
  ArrowUpRight,
  Boxes,
  Zap,
  Repeat,
  ExternalLink,
  ChevronRight,
  MoreVertical,
  Clock
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
  const [isSyncing, setIsSyncing] = useState<string | null>(null);

  const handleSync = (id: string) => {
    setIsSyncing(id);
    setTimeout(() => setIsSyncing(null), 1200);
  };

  const integrations = [
    { id: 'logistic-api', name: 'Logistics Partnership', category: 'supply', desc: 'Sync room supply orders with external logistics vendors.', status: 'Active', version: 'v2.4', icon: Truck },
    { id: 'vendor-sync', name: 'Automated Restock', category: 'supply', desc: 'Auto-trigger procurement when inventory levels hit minimum.', status: 'Active', version: 'v1.1', icon: Repeat },
    { id: 'partner-portal', name: 'Partner Data Bridge', category: 'supply', desc: 'Secure portal for external service and cleaning partners.', status: 'Pending', version: 'v3.0', icon: Handshake },
    { id: 'stripe', name: 'Stripe Payments', category: 'finance', desc: 'Process residential rent and service payments.', status: 'Active', version: 'v4.2', icon: Wallet },
    { id: 'xero', name: 'Xero Accounting', category: 'finance', desc: 'Automated ledger synchronization and invoice routing.', status: 'Active', version: 'v2.1', icon: Activity },
    { id: 'sysco', name: 'Supply Chain Direct', category: 'supply', desc: 'Direct connection to culinary and hardware wholesalers.', status: 'Active', version: 'v1.5', icon: PackageSearch },
  ];

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Professional Header - Theme Aware */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Integrations & Partnerships</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage external connections and collaborative stocking workflows.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-10 rounded-lg text-xs font-medium border-border hover:bg-muted transition-all">
            API Documentation
          </Button>
          <Button className="h-10 rounded-lg bg-primary text-primary-foreground hover:opacity-90 px-5 text-xs font-medium gap-2 shadow-sm">
            <Plus className="w-4 h-4" /> Add Connection
          </Button>
        </div>
      </div>

      {/* Overview Stats - High Contrast in Dark Mode */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Connections', value: '8', icon: LinkIcon, color: 'text-blue-500' },
          { label: 'Uptime (24h)', value: '100%', icon: Activity, color: 'text-emerald-500' },
          { label: 'Pending Partners', value: '2', icon: Handshake, color: 'text-amber-500' },
          { label: 'Last Sync', value: '3m ago', icon: Clock, color: 'text-muted-foreground' },
        ].map((stat, i) => (
          <Card key={i} className="p-5 border-border bg-card shadow-sm flex items-center gap-4">
            <div className={cn("w-10 h-10 rounded-lg bg-muted flex items-center justify-center", stat.color)}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              <p className="text-xl font-semibold text-foreground leading-none mt-1">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Premium Collaboration Module - Polished UI */}
      {isPremium && (
        <Card className="overflow-hidden border-border shadow-sm border bg-card">
          <div className="p-6 bg-muted/30 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center text-background">
                <Boxes className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">Collaborative Stocking & Procurement</h2>
                <p className="text-xs text-muted-foreground">Automated workflows between internal levels and external vendors.</p>
              </div>
            </div>
            <Badge variant="secondary" className="font-medium px-2 py-0.5 text-[10px] uppercase tracking-wider">
              Premium
            </Badge>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Direct Vendor Sync</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">Inventory levels are shared with linked partners. Orders are placed automatically when stock drops below 15%.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.3)]" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Collaborative Logistics</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">External maintenance and cleaning partners receive real-time schedule updates via the Partner Portal.</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-3">
              <Button variant="outline" className="h-10 rounded-lg text-xs font-semibold justify-between px-4 border-border hover:bg-muted">
                View Partnership Logs <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Button>
              <Button variant="outline" className="h-10 rounded-lg text-xs font-semibold justify-between px-4 border-border hover:bg-muted">
                Configure Thresholds <Settings className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Integration Grid - Theme Optimized */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {integrations.map((app) => (
          <Card key={app.id} className="group bg-card border-border rounded-xl hover:border-primary/50 transition-all shadow-sm flex flex-col border">
            <div className="p-5 flex-1 space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-xl bg-muted border border-border flex items-center justify-center text-foreground group-hover:bg-background group-hover:shadow-md transition-all">
                  <app.icon className="w-6 h-6" />
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={cn(
                    "text-[10px] font-medium px-2 py-0 border-none",
                    app.status === 'Active' ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground"
                  )}>
                    {app.status}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground font-medium font-mono">{app.version}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                  {app.name}
                  {app.status === 'Active' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-medium">{app.desc}</p>
              </div>
            </div>

            <div className="px-5 py-3 bg-muted/30 border-t border-border flex items-center justify-between">
              <button 
                onClick={() => handleSync(app.id)}
                className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <RefreshCw className={cn("w-3 h-3", isSyncing === app.id ? "animate-spin text-primary" : "")} />
                Sync Now
              </button>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-muted">
                  <Settings className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-muted">
                  <ExternalLink className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Empty State / Browse More */}
      <div className="pt-4 text-center">
        <p className="text-xs text-muted-foreground font-medium">Looking for a specific partner? <button className="text-foreground hover:underline font-semibold">Browse Marketplace</button></p>
      </div>
    </div>
  );
}
