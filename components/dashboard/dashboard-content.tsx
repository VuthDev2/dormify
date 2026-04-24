'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useModal } from '@/contexts/modal-context';
import {
  Users,
  Building2,
  Wallet,
  AlertCircle,
  Plus,
  ArrowRight,
  TrendingUp,
  Calendar,
  Zap,
  Globe,
  ArrowUpRight,
  Sparkles,
  PieChart,
  Activity,
  FileText,
  ShieldCheck,
  Target,
  Cpu,
  Layers,
  Search,
  Settings,
  Clock,
  UtensilsCrossed,
  LayoutDashboard,
  Wrench,
  Bell,
  CreditCard,
  Phone,
  Shield,
  Mail,
  MessageSquare,
  ChevronRight,
  CheckCircle2,
  Radar,
  ArrowDownRight,
  ClipboardList,
  Filter,
  Download,
  MoreHorizontal,
  History as HistoryIcon,
  TrendingDown,
  Receipt,
  Waves,
  Scan,
  History,
  Box,
  Key
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { StatCard } from './stat-card';
import {
  PerformanceChart,
  AllocationPieChart,
  OccupancyBarChart,
  HealthRadar,
  RevenueVsBudgetChart
} from './charts';
import {
  PropertiesContent,
  ResidentsContent,
  MealsContent,
  FinanceContent,
  MaintenanceContent,
  StaffContent,
  SettingsContent,
  DormitoryFormContent,
  ActionPlaceholderContent,
} from '@/components/modal-contents';

interface DashboardContentProps {
  role: 'admin' | 'tenant' | 'chef';
  tier?: 'normal' | 'pro' | 'premium';
}

export function DashboardContent({ role, tier = 'normal' }: DashboardContentProps) {
  const { openModal } = useModal();
  const isPremium = tier === 'premium' && role === 'admin';
  const isPro = tier === 'pro' && role === 'admin';
  const isNormal = tier === 'normal' && role === 'admin';
  const isChef = role === 'chef';
  const isTenant = role === 'tenant';

  // --- Premium: Executive Portfolio Overview ---
  if (isPremium) {
    const revenueData = [
      { name: 'Jul', actual: 850000, budget: 820000 },
      { name: 'Aug', actual: 880000, budget: 830000 },
      { name: 'Sep', actual: 910000, budget: 840000 },
      { name: 'Oct', actual: 950000, budget: 850000 },
      { name: 'Nov', actual: 920000, budget: 860000 },
      { name: 'Dec', actual: 980000, budget: 870000 },
    ];

    return (
      <div className="space-y-6 animate-in fade-in duration-500 pb-12">
        {/* --- Minimalist Executive Header --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Portfolio <span className="text-muted-foreground/30 font-medium">Analytics</span></h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Fiscal Report ID: #2026-Q4-BLU • Live Ledger</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-9 px-4 rounded-lg border-border dark:border-blue-500/10 text-[10px] font-bold uppercase tracking-widest gap-2 hover:bg-muted/50 transition-all"
              onClick={() => openModal({
                id: 'portfolio-filter',
                title: 'Filter Portfolio',
                component: <ActionPlaceholderContent action="Filter portfolio analytics" detail="Filter panel is ready to map to query params and backend analytics endpoints." />,
                size: 'md'
              })}
            >
              <Filter className="w-3.5 h-3.5" /> Filter Portfolio
            </Button>
            <Button
              className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest gap-2 shadow-sm shadow-primary/20 hover:translate-y-[-1px] transition-all"
              onClick={() => openModal({
                id: 'portfolio-add-property',
                title: 'Add Property',
                component: <DormitoryFormContent />,
                size: 'lg'
              })}
            >
              <Plus className="w-3.5 h-3.5" /> Add Property
            </Button>
          </div>
        </div>

        {/* --- Top Metrics Bar --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard tier="premium" label="Net Rental Income" value="$1.24M" trend="up" change="+4.2%" icon={Wallet} sparklineData={[40, 45, 42, 50, 48, 55, 60]} />
          <StatCard tier="premium" label="Portfolio Occupancy" value="98.2%" trend="neutral" change="Stable" icon={Building2} sparklineData={[80, 82, 85, 84, 88, 90, 92]} />
          <StatCard tier="premium" label="Operating Margin" value="92.4%" trend="up" change="+0.8%" icon={TrendingUp} sparklineData={[85, 87, 88, 90, 91, 92, 92.4]} />
          <StatCard tier="premium" label="Maintenance SLA" value="99.1%" trend="up" change="Optimal" icon={ShieldCheck} sparklineData={[96, 97, 98, 98.5, 99, 99.1]} />
        </div>

        <div className="grid grid-cols-12 gap-5">
           <Card className="col-span-12 lg:col-span-8 p-6 border-border/50 shadow-sm rounded-2xl bg-card">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-border/10 pb-4">
                 <div className="space-y-0.5">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground">Revenue Performance</h3>
                    <p className="text-[11px] text-muted-foreground font-medium italic">Actual vs. Forecasted Budget (USD)</p>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> <span className="text-[9px] font-bold uppercase text-muted-foreground">Actual</span></div>
                    <div className="flex items-center gap-1.5 font-bold uppercase text-muted-foreground border-l border-border pl-4"><span className="w-1.5 h-1.5 border border-muted-foreground border-dashed rounded-full" /> <span className="text-[9px] font-bold uppercase text-muted-foreground">Budget</span></div>
                 </div>
              </div>
              <div className="h-[280px]">
                 <RevenueVsBudgetChart data={revenueData} />
              </div>
              <div className="grid grid-cols-4 gap-4 pt-8 border-t border-border/10 mt-6">
                 {[
                   { l: 'Total Revenue', v: '$5.42M' },
                   { l: 'Variance', v: '+$120K', c: 'text-emerald-500' },
                   { l: 'Exp. Ratio', v: '8.4%' },
                   { l: 'Net Yield', v: '9.21%' },
                 ].map((d, i) => (
                   <div key={i} className="space-y-0.5">
                      <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/50">{d.l}</p>
                      <p className={cn("text-lg font-bold tracking-tight", d.c)}>{d.v}</p>
                   </div>
                 ))}
              </div>
           </Card>

           <Card className="col-span-12 lg:col-span-4 p-6 border-border/50 shadow-sm rounded-2xl bg-card flex flex-col">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-border/10">
                 <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground">Asset Health</h3>
                 <HistoryIcon className="w-3.5 h-3.5 text-muted-foreground/30" />
              </div>
              <div className="space-y-1 flex-1 overflow-auto max-h-[380px] scrollbar-hide">
                 {[
                   { n: 'Manhattan Central', s: 'Operational', o: '98%', y: '9.2%', st: 'emerald' },
                   { n: 'Manchester Central', s: 'Maintenance', o: '94%', y: '8.8%', st: 'amber' },
                   { n: 'Birmingham Port', s: 'Operational', o: '100%', y: '9.5%', st: 'emerald' },
                   { n: 'NYC Hub', s: 'Critical Issue', o: '82%', y: '7.4%', st: 'rose' },
                   { n: 'Leeds Quarter', s: 'Operational', o: '97%', y: '9.1%', st: 'emerald' },
                   { n: 'Southampton Bay', s: 'Operational', o: '99%', y: '9.0%', st: 'emerald' },
                 ].map((asset, i) => (
                   <div key={i} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-muted/30 transition-all cursor-pointer group border border-transparent hover:border-border/10">
                      <div className="space-y-0.5">
                         <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{asset.n}</p>
                         <div className="flex items-center gap-1.5">
                            <div className={cn("w-1.5 h-1.5 rounded-full", `bg-${asset.st}-500`)} />
                            <span className="text-[9px] font-bold text-muted-foreground/60 uppercase">{asset.s}</span>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-bold text-foreground">{asset.o}</p>
                         <p className="text-[9px] font-medium text-muted-foreground/40">{asset.y} Yield</p>
                      </div>
                   </div>
                 ))}
              </div>
              <Button 
                variant="ghost" 
                className="w-full mt-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground h-9 hover:text-primary"
                onClick={() => openModal({
                  id: 'properties',
                  title: 'Asset Audit Report',
                  component: <PropertiesContent />,
                  size: 'xl'
                })}
              >
                 Full Asset Audit <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </Button>
           </Card>

           <Card className="col-span-12 p-8 bg-primary/5 border border-primary/10 rounded-2xl relative overflow-hidden group shadow-sm">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                 <div className="space-y-4 max-w-2xl">
                    <div className="flex items-center gap-3">
                       <Badge className="bg-primary/20 text-primary border-none text-[8px] font-bold uppercase tracking-widest px-2">2026 Strategy</Badge>
                       <span className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest italic">Internal Protocol Only</span>
                    </div>
                    <h3 className="text-3xl font-bold text-foreground leading-tight tracking-tight">Projected Yield Growth: +12.4% <br /> via Automated Rent Indexing.</h3>
                    <p className="text-[13px] font-medium text-muted-foreground/60 leading-relaxed">Financial modeling for the next fiscal period indicates significant upside in the New York residential sector. Audit revealed 40% of properties are under-market, suggesting a potential uplift of $400k annually.</p>
                 </div>
                 <div className="flex flex-col gap-2.5 w-full md:w-auto min-w-[180px]">
                    <Button 
                      className="h-10 rounded-lg bg-primary text-white font-bold text-[10px] uppercase tracking-widest hover:translate-y-[-1px] transition-all shadow-sm"
                      onClick={() => openModal({
                        id: 'finance',
                        title: 'Financial Audit Report',
                        component: <FinanceContent />,
                        size: 'xl'
                      })}
                    >
                       Download Audit
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="h-10 rounded-lg border border-border/60 text-foreground font-bold text-[10px] uppercase tracking-widest hover:bg-muted/50 transition-all"
                      onClick={() => openModal({
                        id: 'properties',
                        title: 'Summary Report',
                        component: <PropertiesContent />,
                        size: 'lg'
                      })}
                    >
                       Summary Report
                    </Button>
                 </div>
              </div>
              <TrendingUp className="absolute bottom-0 right-0 w-64 h-64 text-primary/5 translate-x-12 translate-y-12 -rotate-12 pointer-events-none" />
           </Card>
        </div>
      </div>
    );
  }

  // --- Pro: Operational Management Hub ---
  if (isPro) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground italic">Operations <span className="text-muted-foreground/30 font-medium not-italic uppercase">Hub</span></h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Daily High-Priority Dispatch Queue</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              className="h-9 px-4 rounded-lg bg-primary text-white text-[10px] font-bold uppercase tracking-widest gap-2 shadow-sm border-none transition-all hover:translate-y-[-1px]"
              onClick={() => openModal({
                id: 'maintenance',
                title: 'Create Service Ticket',
                component: <MaintenanceContent />,
                size: 'lg'
              })}
            >
              <Plus className="w-3.5 h-3.5" /> Service Ticket
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard tier="pro" label="Current Occupancy" value="94.2%" trend="up" change="+1.4%" icon={Users} sparklineData={[60, 65, 70, 75, 80, 85, 94]} />
          <StatCard tier="pro" label="Open Incidents" value="12" trend="down" change="-2" icon={AlertCircle} sparklineData={[15, 14, 13, 14, 15, 13, 12]} />
          <StatCard tier="pro" label="Daily Maintenance" value="$4.2k" trend="neutral" change="Stable" icon={Wrench} sparklineData={[3, 4, 3.5, 4.2, 3.8, 4.1, 4.2]} />
          <StatCard tier="pro" label="Staffing Health" value="98%" trend="up" change="Optimal" icon={ShieldCheck} sparklineData={[90, 92, 95, 96, 97, 98, 98]} />
        </div>

        <div className="grid grid-cols-12 gap-5">
           <Card className="col-span-12 lg:col-span-7 border-border/50 shadow-sm rounded-2xl bg-card overflow-hidden flex flex-col">
              <div className="p-4 border-b border-border/10 flex items-center justify-between bg-muted/5">
                 <div className="flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-primary" />
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground">Action Queue</h3>
                 </div>
                 <Badge variant="outline" className="text-[8px] font-bold text-muted-foreground/60 border-border">12 Tasks</Badge>
              </div>
              <div className="divide-y divide-border/10">
                 {[
                   { t: 'Urgent: Leak Reported', r: 'Sarah J. (A-402)', s: 'Dispatch Pending', time: '14m ago', p: 'high' },
                   { t: 'Contract Review Due', r: 'John D. (C-102)', s: 'Under Review', time: '1h ago', p: 'med' },
                   { t: 'Safety Inspection', r: 'Manhattan Central', s: 'In Progress', time: '2h ago', p: 'med' },
                   { t: 'Staff Scheduling', r: 'Kitchen Node', s: 'Awaiting Sign-off', time: '4h ago', p: 'low' },
                 ].map((item, i) => (
                   <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-all cursor-pointer group">
                      <div className="flex items-center gap-3 min-w-0">
                         <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", item.p === 'high' ? 'bg-rose-500 animate-pulse' : item.p === 'med' ? 'bg-amber-500' : 'bg-slate-300')} />
                         <div className="min-w-0">
                            <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">{item.t}</p>
                            <p className="text-[9px] font-medium text-muted-foreground/60 uppercase">{item.r}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-6 shrink-0">
                         <div className="hidden sm:block text-right">
                            <p className="text-[9px] font-bold text-foreground uppercase">{item.s}</p>
                            <p className="text-[8px] font-medium text-muted-foreground/30">{item.time}</p>
                         </div>
                         <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/20 group-hover:text-primary transition-all" />
                      </div>
                   </div>
                 ))}
              </div>
              <div className="p-3 border-t border-border/10 mt-auto bg-muted/5">
                 <Button 
                   variant="ghost" 
                   className="w-full text-[10px] font-bold uppercase tracking-widest text-muted-foreground h-9 hover:text-primary transition-all"
                   onClick={() => openModal({
                     id: 'maintenance',
                     title: 'Task Board',
                     component: <MaintenanceContent />,
                     size: 'xl'
                   })}
                 >
                    Open Task Board
                 </Button>
              </div>
           </Card>

           <div className="col-span-12 lg:col-span-5 space-y-5">
              <Card className="p-6 border-border/50 shadow-sm rounded-2xl bg-card">
                 <div className="flex items-center justify-between mb-6 border-b border-border/10 pb-3">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground">Facility Health</h3>
                    <Target className="w-4 h-4 text-primary" />
                 </div>
                 <div className="space-y-5">
                    {[
                      { l: 'Housekeeping Compliance', v: 92, s: 'Excel' },
                      { l: 'Catering Utilization', v: 76, s: 'Norm' },
                      { l: 'Energy Efficiency', v: 88, s: 'High' },
                      { l: 'Resident Satisfaction', v: 94, s: 'Peak' },
                    ].map((stat, i) => (
                      <div key={i} className="space-y-1.5">
                         <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase text-muted-foreground/60">{stat.l}</span>
                            <span className="text-[10px] font-bold text-foreground">{stat.v}%</span>
                         </div>
                         <div className="h-1 w-full bg-muted/30 rounded-full overflow-hidden shadow-inner">
                            <div className="h-full bg-primary shadow-[0_0_10px_rgba(99,102,241,0.3)]" style={{ width: `${stat.v}%` }} />
                         </div>
                      </div>
                    ))}
                 </div>
              </Card>

              <Card className="p-6 border border-primary/10 rounded-2xl bg-primary/5 overflow-hidden relative group cursor-pointer hover:bg-primary/10 transition-colors">
                 <div className="relative z-10 flex items-center justify-between">
                    <div className="space-y-0.5">
                       <h4 className="text-lg font-bold uppercase tracking-tight text-foreground">Compliance <br />Audit</h4>
                       <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40">Next Cycle: Nov 12</p>
                    </div>
                    <Button 
                      className="h-10 w-10 rounded-lg bg-primary text-white p-0 shadow-sm group-hover:scale-105 transition-transform border-none"
                      onClick={() => openModal({
                        id: 'settings',
                        title: 'Compliance Audit Report',
                        component: <SettingsContent />,
                        size: 'lg'
                      })}
                    >
                       <Download className="w-4 h-4" />
                    </Button>
                 </div>
              </Card>
           </div>
        </div>
      </div>
    );
  }

  // --- Normal Dashboard Implementation (Refined Resident Management Hub) ---
  if (isNormal) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">
        {/* Professional Normal Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-1">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Normal Node Active</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-foreground">
               Campus <span className="text-muted-foreground/30 font-medium italic">Command</span>
            </h1>
            <p className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest leading-none">Operational Control • Localized Cluster</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              className="h-10 px-5 rounded-xl border-border/40 text-[10px] font-black uppercase tracking-widest hover:bg-muted/50 transition-all"
              onClick={() => openModal({
                id: 'properties',
                title: 'Properties',
                component: <PropertiesContent />,
                size: 'xl'
              })}
            >
               Quick Search
            </Button>
            <Button 
              className="h-10 px-6 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-[0.15em] shadow-xl shadow-primary/20 transition-all hover:translate-y-[-2px] border-none"
              onClick={() => openModal({
                id: 'residents',
                title: 'Residents',
                component: <ResidentsContent />,
                size: 'lg'
              })}
            >
              <Plus className="w-4 h-4 mr-2" /> New Entry
            </Button>
          </div>
        </div>

        {/* 4-Column Specialized Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5 border-border/40 bg-card rounded-[1.5rem] border shadow-sm group hover:shadow-xl hover:border-primary/20 transition-all cursor-pointer">
             <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary shadow-inner">
                   <Users className="w-5 h-5" />
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[8px] font-black">98%</Badge>
             </div>
             <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 mb-1">Total Residents</p>
             <h3 className="text-2xl font-black tracking-tight">142 <span className="text-xs text-muted-foreground/20 font-medium ml-1">Live</span></h3>
          </Card>
          
          <Card className="p-5 border-border/40 bg-card rounded-[1.5rem] border shadow-sm group hover:shadow-xl hover:border-primary/20 transition-all cursor-pointer">
             <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/5 flex items-center justify-center text-amber-500 shadow-inner">
                   <Key className="w-5 h-5" />
                </div>
                <Badge className="bg-amber-500/10 text-amber-600 border-none text-[8px] font-black">12 Left</Badge>
             </div>
             <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 mb-1">Available Rooms</p>
             <h3 className="text-2xl font-black tracking-tight">12 <span className="text-xs text-muted-foreground/20 font-medium ml-1">Units</span></h3>
          </Card>

          <Card className="p-5 border-border/40 bg-card rounded-[1.5rem] border shadow-sm group hover:shadow-xl hover:border-primary/20 transition-all cursor-pointer">
             <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/5 flex items-center justify-center text-indigo-500 shadow-inner">
                   <Receipt className="w-5 h-5" />
                </div>
                <Badge className="bg-indigo-500/10 text-indigo-600 border-none text-[8px] font-black">+$8.2k</Badge>
             </div>
             <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 mb-1">Fee Collection</p>
             <h3 className="text-2xl font-black tracking-tight">$14,420 <span className="text-xs text-muted-foreground/20 font-medium ml-1">Current</span></h3>
          </Card>

          <Card className="p-5 border-border/40 bg-card rounded-[1.5rem] border shadow-sm group hover:shadow-xl hover:border-primary/20 transition-all cursor-pointer">
             <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-500/5 flex items-center justify-center text-rose-500 shadow-inner">
                   <AlertCircle className="w-5 h-5" />
                </div>
                <Badge className="bg-rose-500/10 text-rose-600 border-none text-[8px] font-black">2 Critical</Badge>
             </div>
             <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 mb-1">Support Tickets</p>
             <h3 className="text-2xl font-black tracking-tight">6 <span className="text-xs text-muted-foreground/20 font-medium ml-1">Active</span></h3>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           {/* System Activity Ledger */}
           <Card className="lg:col-span-8 border-border/40 bg-card rounded-[2rem] border overflow-hidden shadow-2xl shadow-primary/5">
              <div className="p-5 border-b border-border/10 flex items-center justify-between bg-muted/5">
                 <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-primary" />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-foreground">Operational Logistics</h3>
                 </div>
                 <Badge variant="outline" className="text-[8px] font-black uppercase border-border/40 px-2 py-0.5">Real-time Feed</Badge>
              </div>
              <div className="divide-y divide-border/10">
                 {[
                   { t: 'Room 102 Check-in', d: 'Sarah Jenkins', s: 'Confirmed', time: '2h ago', icon: CheckCircle2, color: 'text-emerald-500' },
                   { t: 'Work Order #401', d: 'Plumbing Repair B-Block', s: 'In Progress', time: '4h ago', icon: Wrench, color: 'text-amber-500' },
                   { t: 'Stock Intake', d: 'Stationery & Culinary Supplies', s: 'Logged', time: '1d ago', icon: Box, color: 'text-blue-500' },
                   { t: 'Digital Key Issue', d: 'Room D-205 (New Resident)', s: 'Activated', time: '1d ago', icon: Key, color: 'text-indigo-500' },
                 ].map((log, i) => (
                   <div key={i} className="p-5 flex items-center justify-between hover:bg-muted/30 transition-all cursor-pointer group">
                      <div className="flex items-center gap-4">
                         <div className={cn("w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-white transition-colors", log.color)}>
                            <log.icon className="w-5 h-5" />
                         </div>
                         <div className="space-y-0.5">
                            <p className="text-sm font-black text-foreground group-hover:text-primary transition-colors">{log.t}</p>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider italic">{log.d}</p>
                         </div>
                      </div>
                      <div className="text-right shrink-0">
                         <Badge variant="outline" className="text-[8px] font-black uppercase tracking-[0.15em] bg-muted/50 border-none h-5 px-2">{log.s}</Badge>
                         <p className="text-[9px] text-muted-foreground/30 font-black uppercase mt-1">{log.time}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <Button 
                variant="ghost" 
                className="w-full text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground h-12 hover:text-primary hover:bg-primary/5 transition-all"
                onClick={() => openModal({
                  id: 'maintenance',
                  title: 'Maintenance & Support Tickets',
                  component: <MaintenanceContent />,
                  size: 'lg'
                })}
              >
                 Full Archive Registry <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
           </Card>

           {/* Secondary Intelligence Column */}
           <div className="lg:col-span-4 space-y-6">
              {/* Financial Snap-Audit */}
              <Card className="p-6 border-border/40 bg-card rounded-[2rem] border shadow-sm">
                 <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/10">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-foreground">Fiscal Health</h3>
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                 </div>
                 <div className="space-y-5">
                    {[
                      { t: 'Pending Revenue', v: '$1,420', c: 'text-amber-500', sub: 'Meal Fees' },
                      { t: 'Over Duedate', v: '2 Units', c: 'text-rose-500', sub: 'Room Fees' },
                      { t: 'Completed Total', v: '$72,850', c: 'text-emerald-500', sub: 'Current Month' },
                    ].map((alert, i) => (
                      <div key={i} className="flex justify-between items-center group cursor-pointer border-b border-border/5 pb-4 last:border-0 last:pb-0">
                         <div className="space-y-0.5">
                            <span className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-wider leading-none block">{alert.t}</span>
                            <span className="text-[9px] font-bold text-muted-foreground/30 uppercase italic">{alert.sub}</span>
                         </div>
                         <span className={cn("text-sm font-black tracking-tight", alert.c)}>{alert.v}</span>
                      </div>
                    ))}
                 </div>
              </Card>

              {/* Support & Hub Contact */}
              <Card className="p-6 bg-primary/5 border border-primary/10 rounded-[2rem] overflow-hidden relative group cursor-pointer hover:bg-primary/10 transition-all">
                 <div className="relative z-10 flex items-center justify-between">
                    <div className="space-y-1">
                       <h4 className="text-lg font-black uppercase tracking-tight text-foreground italic leading-none">Support <br />Desk</h4>
                       <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] italic">Assigned: Alex M.</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-white shadow-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                       <Phone className="w-5 h-5" />
                    </div>
                 </div>
                 <Shield className="absolute bottom-0 right-0 w-32 h-32 text-primary/5 translate-x-8 translate-y-8 -rotate-12 pointer-events-none" />
              </Card>

              {/* Maintenance Snapshot */}
              <Card className="p-6 border-border/40 bg-card rounded-[2rem] border shadow-sm">
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-foreground leading-none">Facility Radar</h3>
                    <Scan className="w-4 h-4 text-primary animate-pulse" />
                 </div>
                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <p className="text-[9px] font-black uppercase text-muted-foreground/40 tracking-widest">SLA Compliance</p>
                       <p className="text-xl font-black text-foreground">98.2%</p>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden shadow-inner p-0.5">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: '98.2%' }}
                         className="h-full bg-primary rounded-full shadow-lg shadow-primary/20" 
                       />
                    </div>
                    <p className="text-[10px] font-semibold text-muted-foreground/60 leading-tight italic">
                       System is operating within <span className="text-foreground font-black not-italic uppercase tracking-tighter">Optimal</span> parameters.
                    </p>
                 </div>
              </Card>
           </div>
        </div>
      </div>
    );
  }

  // --- Chef Dashboard (Industrial Precision & Professionalism) ---
  if (isChef) {
     const nextMeal = { type: 'Lunch', menu: 'Grilled Chicken Caesar', countdown: '1h 22m', progress: 45 };
     const alerts = [
       { id: 1, type: 'allergy', text: '3 Nut-allergy residents for Lunch Service', critical: true },
       { id: 2, type: 'stock', text: 'Butter and Organic Milk below 10%', critical: false },
     ];

     return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">
           {/* 1. Industrial Precision Header */}
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-1">
              <div className="space-y-1">
                 <div className="flex items-center gap-2 mb-1">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Live Kitchen Ops</span>
                 </div>
                 <h1 className="text-3xl font-bold tracking-tight text-foreground italic">
                    Culinary <span className="text-muted-foreground/30 font-medium not-italic uppercase">Command</span>
                 </h1>
              </div>
              <div className="flex items-center gap-2">
                 <Button 
                   variant="outline" 
                   className="h-9 rounded-lg px-4 border-border dark:border-blue-500/10 text-[10px] font-bold uppercase tracking-widest bg-card/50 backdrop-blur-md"
                   onClick={() => openModal({
                     id: 'meals',
                     title: 'Daily Meal Audit',
                     component: <MealsContent />,
                     size: 'lg'
                   })}
                 >
                    Daily Audit
                 </Button>
                 <Button 
                   className="h-9 rounded-lg px-6 bg-primary text-white text-[10px] font-bold uppercase tracking-widest shadow-sm shadow-primary/20 border-none transition-all hover:translate-y-[-1px]"
                   onClick={() => openModal({
                     id: 'meals',
                     title: 'New Meal Service',
                     component: <MealsContent />,
                     size: 'lg'
                   })}
                 >
                    <Plus className="w-3.5 h-3.5 mr-2" /> New Service
                 </Button>
              </div>
           </div>
           
           {/* 2. Refined Stat Grid */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="group p-5 rounded-2xl border border-border/50 bg-card shadow-sm hover:shadow-md transition-all">
                 <div className="flex justify-between items-start mb-4">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                       <UtensilsCrossed className="w-4.5 h-4.5" />
                    </div>
                    <Badge variant="outline" className="text-[8px] font-bold uppercase tracking-widest border-emerald-500/20 text-emerald-500 bg-emerald-500/5">+12.4%</Badge>
                 </div>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Portions Remaining</p>
                 <h3 className="text-2xl font-bold mt-0.5">420 <span className="text-xs text-muted-foreground/30 font-medium ml-1">UNITS</span></h3>
              </div>
              <div className="group p-5 rounded-2xl border border-border/50 bg-card shadow-sm hover:shadow-md transition-all">
                 <div className="flex justify-between items-start mb-4">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                       <Users className="w-4.5 h-4.5" />
                    </div>
                    <Badge variant="outline" className="text-[8px] font-bold uppercase tracking-widest border-border/40 text-muted-foreground">Active</Badge>
                 </div>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">On-Site Staff</p>
                 <h3 className="text-2xl font-bold mt-0.5">12 <span className="text-xs text-muted-foreground/30 font-medium ml-1">CHETS</span></h3>
              </div>
              <div className="group p-5 rounded-2xl border border-border/50 bg-card shadow-sm hover:shadow-md transition-all">
                 <div className="flex justify-between items-start mb-4">
                    <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                       <AlertCircle className="w-4.5 h-4.5" />
                    </div>
                    <Badge variant="outline" className="text-[8px] font-bold uppercase tracking-widest border-rose-500/20 text-rose-500 bg-rose-500/5">Critical</Badge>
                 </div>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Shortage Alerts</p>
                 <h3 className="text-2xl font-bold mt-0.5">3 <span className="text-xs text-muted-foreground/30 font-medium ml-1">ITEMS</span></h3>
              </div>
              <div className="group p-5 rounded-2xl border border-border/50 bg-card shadow-sm hover:shadow-md transition-all">
                 <div className="flex justify-between items-start mb-4">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                       <ShieldCheck className="w-4.5 h-4.5" />
                    </div>
                    <Badge variant="outline" className="text-[8px] font-bold uppercase tracking-widest border-border/40 text-muted-foreground">Optimal</Badge>
                 </div>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Hygiene Index</p>
                 <h3 className="text-2xl font-bold mt-0.5">5.0 <span className="text-xs text-muted-foreground/30 font-medium ml-1">RATING</span></h3>
              </div>
           </div>

           {/* 3. Refined Operational Grid */}
           <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              <Card className="xl:col-span-8 p-8 border-border/50 bg-card rounded-2xl shadow-sm relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
                 <div className="relative z-10 space-y-8">
                    <div className="flex justify-between items-center">
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Service in Progress</p>
                          <h3 className="text-2xl font-bold italic text-foreground">{nextMeal.type} Cycle <span className="text-muted-foreground/30 not-italic font-medium">— Service Active</span></h3>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Est. Finish</p>
                          <p className="text-xl font-bold text-foreground">{nextMeal.countdown}</p>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <div className="flex justify-between items-end">
                          <div className="space-y-1">
                             <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Flow Progress</p>
                             <p className="text-4xl font-bold text-foreground">{nextMeal.progress}%</p>
                          </div>
                          <div className="text-right">
                             <p className="text-sm font-bold text-foreground">{nextMeal.menu}</p>
                             <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40 italic">Signature Dish</p>
                          </div>
                       </div>
                       <div className="h-2.5 w-full bg-muted/30 rounded-full overflow-hidden p-0.5 border border-border/10">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${nextMeal.progress}%` }}
                           transition={{ duration: 1.5, ease: "circOut" }}
                           className="h-full bg-primary rounded-full shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                         />
                       </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-border/10">
                       {[
                          { l: 'Vegetarian', v: '42 units' },
                          { l: 'Vegan', v: '12 units' },
                          { l: 'Allergies', v: '3 alerts', c: 'text-rose-500' },
                          { l: 'Energy Mix', v: 'High load' },
                       ].map((s, i) => (
                          <div key={i} className="space-y-1">
                             <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50">{s.l}</p>
                             <p className={cn("text-sm font-bold text-foreground", s.c)}>{s.v}</p>
                          </div>
                       ))}
                    </div>
                 </div>
              </Card>

              <div className="xl:col-span-4 space-y-6">
                 <Card className="p-6 rounded-2xl border-border/50 bg-card space-y-5 shadow-sm">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
                       <Sparkles className="w-4 h-4 text-primary" /> Incident Intelligence
                    </h4>
                    <div className="space-y-3">
                       {alerts.map(alert => (
                         <div key={alert.id} className={cn(
                           "p-3 rounded-xl border transition-all",
                           alert.critical 
                             ? "bg-rose-500/5 border-rose-500/20" 
                             : "bg-primary/5 border-primary/20"
                         )}>
                            <div className="flex gap-3 items-start">
                               <div className={cn(
                                 "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm",
                                 alert.critical ? "bg-rose-500 text-white" : "bg-primary text-white"
                               )}>
                                  {alert.critical ? <AlertCircle className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
                               </div>
                               <p className={cn("text-[11px] font-bold leading-relaxed", alert.critical ? "text-rose-600 dark:text-rose-400" : "text-primary dark:text-blue-400")}>
                                  {alert.text}
                                </p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </Card>

                 <Card className="p-6 bg-primary/5 border border-primary/10 rounded-2xl relative overflow-hidden group">
                    <div className="relative z-10 space-y-4">
                       <div className="space-y-0.5">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-primary/80">Inventory Strategy</p>
                          <h4 className="text-lg font-bold text-foreground italic">Plan Next Cycle</h4>
                       </div>
                       <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
                          Review inventory and resident sentiment to optimize week 14 menus.
                       </p>
                       <Button 
                         className="w-full h-10 bg-primary text-white font-bold text-[10px] uppercase tracking-widest rounded-lg shadow-sm transition-all hover:translate-y-[-1px] border-none"
                         onClick={() => openModal({
                           id: 'meals',
                           title: 'Menu Designer',
                           component: <MealsContent />,
                           size: 'lg'
                         })}
                       >
                          Menu Designer
                       </Button>
                    </div>
                 </Card>
              </div>
           </div>
        </div>
     );
  }


  // --- Tenant Dashboard (Professional & Refined Experience) ---
  if (isTenant) {
     return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">
           {/* 1. Refined Header: Sophisticated Greeting */}
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
              <div className="space-y-1">
                 <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-[10px] font-bold text-primary border-primary/20 bg-primary/5 px-2 py-0 h-5">Manhattan Central</Badge>
                    <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">Room A-402</span>
                 </div>
                 <h1 className="text-2xl font-bold tracking-tight text-foreground">
                    Welcome back, <span className="text-primary/80">Sarah Johnson</span>
                 </h1>
                 <p className="text-xs text-muted-foreground font-medium">Your residency is currently in good standing. All systems operational.</p>
              </div>
              <div className="flex items-center gap-2">
                 <Button 
                   variant="outline" 
                   className="h-9 px-4 rounded-lg border-border dark:border-blue-500/10 text-[10px] font-bold uppercase tracking-widest gap-2 hover:bg-muted/50 transition-all"
                   onClick={() => openModal({
                     id: 'settings',
                     title: 'Digital Key Settings',
                     component: <SettingsContent />,
                     size: 'md'
                   })}
                 >
                    <ShieldCheck className="w-3.5 h-3.5" /> Digital Key
                 </Button>
                 <Button 
                   className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest gap-2 shadow-sm shadow-primary/20 hover:translate-y-[-1px] transition-all"
                   onClick={() => openModal({
                     id: 'maintenance',
                     title: 'Submit Maintenance Request',
                     component: <MaintenanceContent />,
                     size: 'md'
                   })}
                 >
                    <Plus className="w-3.5 h-3.5" /> New Request
                 </Button>
              </div>
           </div>

           {/* 2. Key Metrics Row: Compact & Informative */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard tier="pro" label="Next Rent Due" value="$1,240" trend="neutral" change="Due Oct 1" icon={CreditCard} />
              <StatCard tier="pro" label="Room Temperature" value="21.4°C" trend="up" change="+0.2°" icon={Zap} />
              <StatCard tier="pro" label="WiFi Bandwidth" value="942 Mbps" trend="up" change="Optimal" icon={Activity} />
              <StatCard tier="pro" label="Meal Credits" value="18" trend="neutral" change="This Month" icon={UtensilsCrossed} />
           </div>

           <div className="grid lg:grid-cols-12 gap-6">
              {/* 3. Main Operational Column */}
              <div className="lg:col-span-8 space-y-6">
                 {/* Recent Activity / Status Board */}
                 <Card className="border-border dark:border-blue-500/10 shadow-sm rounded-2xl bg-card dark:bg-blue-950/20 backdrop-blur-3xl overflow-hidden border">
                    <div className="p-4 border-b border-border dark:border-blue-500/10 flex items-center justify-between bg-muted/10 dark:bg-blue-500/5">
                       <div className="flex items-center gap-2">
                          <HistoryIcon className="w-4 h-4 text-primary" />
                          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">Recent Activity & Notices</h3>
                       </div>
                       <Badge variant="outline" className="text-[9px] font-bold text-muted-foreground/40 border-none px-0">Live Updates</Badge>
                    </div>
                    <div className="divide-y divide-border dark:divide-blue-500/10">
                       {[
                         { t: 'Maintenance Complete', d: 'Room A-402 HVAC Filter replacement.', s: 'Resolved', time: '2h ago', icon: CheckCircle2, color: 'text-emerald-500' },
                         { t: 'Package Delivered', d: 'Amazon Logistics - Locker #42', s: 'Pending', time: '5h ago', icon: Bell, color: 'text-blue-500' },
                         { t: 'Rent Invoice Issued', d: 'October 2024 Accommodation Fee', s: 'Unpaid', time: '1d ago', icon: Receipt, color: 'text-amber-500' },
                         { t: 'Fire Safety Drill', d: 'Scheduled for Tomorrow, 10:00 AM', s: 'Notice', time: '1d ago', icon: Shield, color: 'text-rose-500' },
                       ].map((item, i) => (
                         <div key={i} className="p-4 flex items-start gap-4 hover:bg-muted/20 dark:hover:bg-blue-500/10 transition-all cursor-pointer group">
                            <div className={cn("mt-0.5 p-2 rounded-lg bg-muted/50 dark:bg-blue-500/10 group-hover:bg-white dark:group-hover:bg-blue-500/20 transition-colors", item.color)}>
                               <item.icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                               <div className="flex items-center justify-between mb-0.5">
                                  <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{item.t}</p>
                                  <span className="text-[10px] font-medium text-muted-foreground/40 uppercase">{item.time}</span>
                               </div>
                               <p className="text-xs text-muted-foreground line-clamp-1">{item.d}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                    <div className="p-3 border-t border-border dark:border-blue-500/10 bg-muted/5">
                       <Button 
                         variant="ghost" 
                         className="w-full text-[10px] font-bold uppercase tracking-widest text-muted-foreground h-9 hover:text-primary transition-all"
                         onClick={() => openModal({
                           id: 'maintenance',
                           title: 'Activity History',
                           component: <MaintenanceContent />,
                           size: 'lg'
                         })}
                       >
                          View Activity History
                       </Button>
                    </div>
                 </Card>

                 {/* Service Quick Access Grid */}
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { l: 'My Ledger', i: Receipt, h: '/dashboard/tenants/invoices' },
                      { l: 'Concierge', i: Wrench, h: '/dashboard/tenants/services' },
                      { l: 'Dining Node', i: UtensilsCrossed, h: '/dashboard/tenants/meals' },
                      { l: 'Support', i: MessageSquare, h: '/dashboard/tenants/services' },
                    ].map((link, i) => (
                      <Link key={i} href={link.h}>
                         <Card className="p-4 flex flex-col items-center justify-center gap-3 border-border dark:border-blue-500/10 bg-card hover:bg-primary/5 hover:border-primary/20 dark:hover:bg-blue-500/10 transition-all cursor-pointer text-center group">
                            <div className="w-10 h-10 rounded-xl bg-muted dark:bg-blue-500/10 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-white dark:group-hover:bg-blue-500/20 transition-all shadow-sm">
                               <link.i className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">{link.l}</span>
                         </Card>
                      </Link>
                    ))}
                 </div>
              </div>

              {/* 4. Secondary Column (Sider) */}
              <div className="lg:col-span-4 space-y-6">
                 {/* Today's Featured Menu */}
                 <Card className="border-border dark:border-blue-500/10 shadow-sm rounded-2xl bg-card dark:bg-blue-950/20 backdrop-blur-3xl overflow-hidden border">
                    <div className="p-4 border-b border-border dark:border-blue-500/10 flex items-center justify-between">
                       <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground flex items-center gap-2">
                          <UtensilsCrossed className="w-4 h-4 text-primary" /> Today's Menu
                       </h4>
                       <Badge variant="outline" className="text-[8px] font-black bg-primary/5 text-primary border-primary/20">Chef's Special</Badge>
                    </div>
                    <div className="relative aspect-[16/9] overflow-hidden group/img">
                       <img src="/gourmet-dining.jpg" className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" alt="Lunch" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                       <div className="absolute bottom-3 left-3 right-3">
                          <p className="text-[9px] font-bold text-primary uppercase tracking-widest mb-0.5">Signature Lunch</p>
                          <h4 className="text-sm font-bold text-white tracking-tight leading-tight">Miso-Glazed Atlantic Salmon with Quinoa</h4>
                       </div>
                    </div>
                    <div className="p-4 space-y-3">
                       <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 12:00 - 14:30</span>
                          <span className="text-emerald-500 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Available</span>
                       </div>
                       <Button 
                         className="w-full h-9 rounded-lg bg-primary text-primary-foreground font-bold text-[10px] uppercase tracking-widest hover:translate-y-[-1px] transition-all shadow-sm"
                         onClick={() => openModal({
                           id: 'meals',
                           title: 'Pre-Order Meal Portions',
                           component: <MealsContent />,
                           size: 'md'
                         })}
                       >
                          Pre-Order Portions
                       </Button>
                    </div>
                 </Card>

                 {/* Social Horizon / Community */}
                 <Card className="p-4 border-border dark:border-blue-500/10 shadow-sm rounded-2xl bg-card dark:bg-blue-950/20 backdrop-blur-3xl space-y-4 border">
                    <div className="flex items-center justify-between pb-2 border-b border-border/50 dark:border-blue-500/10">
                       <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" /> Community
                       </h4>
                       <span className="text-[9px] font-bold text-muted-foreground/40 uppercase">Upcoming</span>
                    </div>
                    <div className="space-y-3">
                       {[
                         { t: 'Roof Terrace Mixer', d: 'Tonight, 19:00', i: Users, c: 'text-emerald-500' },
                         { t: 'Morning Yoga', d: 'Tomorrow, 08:00', i: Activity, c: 'text-blue-500' },
                       ].map((ev, i) => (
                         <div key={i} className="flex items-center gap-3 group cursor-pointer p-2 hover:bg-muted/30 dark:hover:bg-blue-500/10 rounded-xl transition-all">
                            <div className={cn("w-9 h-9 rounded-lg bg-muted/50 dark:bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-white dark:group-hover:bg-blue-500/20 transition-colors shadow-sm", ev.c)}>
                               <ev.i className="w-4.5 h-4.5" />
                            </div>
                            <div className="min-w-0 flex-1">
                               <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">{ev.t}</p>
                               <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-widest mt-0.5">{ev.d}</p>
                            </div>
                            <ChevronRight className="w-3 h-3 text-muted-foreground/20 group-hover:text-primary transition-all" />
                         </div>
                       ))}
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full h-8 rounded-lg text-[9px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => openModal({
                        id: 'tenant-community-events',
                        title: 'Community Events',
                        component: <ActionPlaceholderContent action="Discover community events" detail="Events list UI is active; connect to events feed endpoint." />,
                        size: 'md'
                      })}
                    >
                       Discover More Events
                    </Button>
                 </Card>
              </div>
           </div>
        </div>
     );
  }


  return (
    <div className="h-full flex items-center justify-center text-muted-foreground">
       <div className="text-center space-y-4 max-w-sm">
          <LayoutDashboard className="w-12 h-12 mx-auto opacity-10" />
          <h2 className="text-xl font-bold tracking-tight uppercase">System Access Required</h2>
          <p className="text-xs font-bold leading-relaxed">No active dashboard found for this profile. Please contact the administrative desk for authorization assistance.</p>
       </div>
    </div>
  );
}
