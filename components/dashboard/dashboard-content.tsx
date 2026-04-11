'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
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
  TrendingDown
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

interface DashboardContentProps {
  role: 'admin' | 'tenant' | 'chef';
  tier?: 'normal' | 'pro' | 'premium';
}

export function DashboardContent({ role, tier = 'normal' }: DashboardContentProps) {
  const isPremium = tier === 'premium' && role === 'admin';
  const isPro = tier === 'pro' && role === 'admin';
  const isNormal = tier === 'normal' && role === 'admin';
  const isChef = role === 'chef';
  const isTenant = role === 'tenant';

  // --- Premium: Executive Portfolio Portfolio (Industrial Realism) ---
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
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Premium Tier</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-foreground">Executive <span className="text-muted-foreground/30 font-medium">Overview</span></h1>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/50">Fiscal Quarter 4 · Fiscal Report ID: #2026-Q4-BLU</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-9 px-4 rounded-lg border-border dark:border-blue-500/20 text-[10px] font-bold uppercase tracking-widest gap-2 hover:bg-blue-500/5">
              <Filter className="w-3.5 h-3.5" /> Filter Portfolio
            </Button>
            <Button className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest gap-2 shadow-sm shadow-primary/20">
              <Plus className="w-3.5 h-3.5" /> Add Property
            </Button>
          </div>
        </div>

        {/* --- Top Metrics Bar: Consolidated & Organized --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard tier="premium" label="Net Rental Income" value="£1.24M" trend="up" change="+4.2%" icon={Wallet} sparklineData={[40, 45, 42, 50, 48, 55, 60]} />
          <StatCard tier="premium" label="Portfolio Occupancy" value="98.2%" trend="neutral" change="Stable" icon={Building2} sparklineData={[80, 82, 85, 84, 88, 90, 92]} />
          <StatCard tier="premium" label="Operating Margin" value="92.4%" trend="up" change="+0.8%" icon={TrendingUp} sparklineData={[85, 87, 88, 90, 91, 92, 92.4]} />
          <StatCard tier="premium" label="Maintenance SLA" value="99.1%" trend="up" change="Optimal" icon={ShieldCheck} sparklineData={[96, 97, 98, 98.5, 99, 99.1]} />
        </div>

        <div className="grid grid-cols-12 gap-5">
           {/* Primary Analysis Card: Revenue vs Forecast */}
           <Card className="col-span-12 lg:col-span-8 p-6 lg:p-8 border-border dark:border-blue-500/10 shadow-sm rounded-2xl bg-card dark:bg-blue-950/20 backdrop-blur-3xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b border-border/50 dark:border-blue-500/10 pb-6">
                 <div className="space-y-1">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground">Revenue Performance</h3>
                    <p className="text-[11px] text-muted-foreground font-semibold">Consolidated Actual vs. Forecasted Budget (GBP)</p>
                 </div>
                 <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /> <span className="text-[10px] font-bold uppercase text-muted-foreground">Actual</span></div>
                    <div className="flex items-center gap-2 font-bold uppercase text-muted-foreground border-l border-border dark:border-blue-500/10 pl-6"><span className="w-2 h-2 border-2 border-muted-foreground border-dashed rounded-full" /> <span className="text-[10px] font-bold uppercase text-muted-foreground">Budget</span></div>
                 </div>
              </div>
              <div className="h-[300px]">
                 <RevenueVsBudgetChart data={revenueData} />
              </div>
              <div className="grid grid-cols-4 gap-8 pt-10 border-t border-border dark:border-blue-500/10 mt-auto">
                 {[
                   { l: 'Total Revenue', v: '£5.42M' },
                   { l: 'Variance', v: '+£120K' },
                   { l: 'Exp. Ratio', v: '8.4%' },
                   { l: 'Net Yield', v: '9.21%' },
                 ].map((d, i) => (
                   <div key={i} className="space-y-1.5">
                      <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">{d.l}</p>
                      <p className="text-xl font-black text-foreground tracking-tighter">{d.v}</p>
                   </div>
                 ))}
              </div>
           </Card>

           {/* High-Density Portfolio Status Table */}
           <Card className="col-span-12 lg:col-span-4 p-6 lg:p-8 border-border dark:border-blue-500/10 shadow-sm rounded-2xl bg-card dark:bg-blue-950/20 backdrop-blur-3xl flex flex-col">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-border dark:border-blue-500/10">
                 <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground">Asset Health</h3>
                 <HistoryIcon className="w-4 h-4 text-muted-foreground/30" />
              </div>
              <div className="space-y-1 flex-1 overflow-auto max-h-[440px] -mx-2 px-2 scrollbar-hide">
                 {[
                   { n: 'Bloomsbury Hall', s: 'Operational', o: '98%', y: '9.2%', st: 'emerald' },
                   { n: 'Manchester Central', s: 'Maintenance', o: '94%', y: '8.8%', st: 'amber' },
                   { n: 'Birmingham Port', s: 'Operational', o: '100%', y: '9.5%', st: 'emerald' },
                   { n: 'London Hub', s: 'Critical Issue', o: '82%', y: '7.4%', st: 'rose' },
                   { n: 'Leeds Quarter', s: 'Operational', o: '97%', y: '9.1%', st: 'emerald' },
                   { n: 'Southampton Bay', s: 'Operational', o: '99%', y: '9.0%', st: 'emerald' },
                 ].map((asset, i) => (
                   <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/30 dark:hover:bg-blue-500/10 border border-transparent hover:border-border dark:hover:border-blue-500/20 transition-all cursor-pointer group">
                      <div className="space-y-0.5">
                         <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{asset.n}</p>
                         <div className="flex items-center gap-2">
                            <div className={cn("w-1.5 h-1.5 rounded-full", `bg-${asset.st}-500`)} />
                            <span className="text-[9px] font-bold text-muted-foreground/60 uppercase">{asset.s}</span>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black text-foreground">{asset.o}</p>
                         <p className="text-[9px] font-bold text-muted-foreground/40">{asset.y} Yield</p>
                      </div>
                   </div>
                 ))}
              </div>
              <Button variant="ghost" className="w-full mt-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground h-11 hover:text-primary dark:hover:bg-blue-500/5">
                 Detailed Asset Audit <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </Button>
           </Card>

           {/* Fiscal Audit Roadmap Section */}
           <Card className="col-span-12 p-6 lg:p-8 bg-primary/5 dark:bg-blue-900/10 border border-primary/10 dark:border-blue-500/20 rounded-2xl relative overflow-hidden group shadow-lg">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                 <div className="space-y-4 max-w-2xl text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-4">
                       <Badge className="bg-primary/20 text-primary border-none text-[9px] font-black uppercase tracking-widest px-3">2026 Strategy</Badge>
                       <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">Internal Use Only</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-foreground leading-[1.1] tracking-tight">Expand Portfolio Yield by 12.4% <br className="hidden md:block" /> with Automated Rent Reviews.</h3>
                    <p className="text-sm font-medium text-muted-foreground/60 leading-relaxed">Financial modeling for the next fiscal year indicates a significant opportunity in the London residential sector. Our audit reveals that 40% of properties are currently under-market for rent, suggesting a potential uplift of £400k annually.</p>
                 </div>
                 <div className="flex flex-col gap-3 w-full md:w-auto min-w-[200px]">
                    <Button className="h-14 rounded-xl bg-foreground text-background dark:bg-blue-600 dark:text-white font-bold text-xs uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-xl shadow-primary/10">
                       Download Audit Report
                    </Button>
                    <Button variant="ghost" className="h-14 rounded-xl border border-border dark:border-blue-500/20 text-foreground font-bold text-xs uppercase tracking-widest hover:bg-muted/30 dark:hover:bg-blue-500/5">
                       Executive Summary
                    </Button>
                 </div>
              </div>
              <TrendingUp className="absolute bottom-0 right-0 w-[400px] h-[400px] text-primary/5 translate-x-32 translate-y-32 -rotate-12" />
           </Card>

        </div>
      </div>
    );
  }

  // --- Pro: Operational Management Hub (Industrial Realism) ---
  if (isPro) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500 pb-12">
        {/* --- Organized Pro Header --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Pro Tier</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-foreground italic">Operations <span className="text-muted-foreground/30 font-medium not-italic uppercase">Hub</span></h1>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/50">Daily High-Priority Action Queue</p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="h-10 px-6 rounded-lg bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest gap-2 shadow-lg shadow-primary/20 transition-all hover:translate-y-[-2px]">
              <Plus className="w-4 h-4" /> Create Service Ticket
            </Button>
          </div>
        </div>

        {/* --- Core Operational Stats --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard tier="pro" label="Current Occupancy" value="94.2%" trend="up" change="+1.4%" icon={Users} sparklineData={[60, 65, 70, 75, 80, 85, 94]} />
          <StatCard tier="pro" label="Open Incidents" value="12" trend="down" change="-2" icon={AlertCircle} sparklineData={[15, 14, 13, 14, 15, 13, 12]} />
          <StatCard tier="pro" label="Daily Maintenance" value="£4.2k" trend="neutral" change="Stable" icon={Wrench} sparklineData={[3, 4, 3.5, 4.2, 3.8, 4.1, 4.2]} />
          <StatCard tier="pro" label="Staffing Health" value="98%" trend="up" change="Optimal" icon={ShieldCheck} sparklineData={[90, 92, 95, 96, 97, 98, 98]} />
        </div>

        <div className="grid grid-cols-12 gap-5">
           
           {/* Main Column: High-Priority Queue */}
           <Card className="col-span-12 lg:col-span-7 border-border dark:border-blue-500/10 shadow-sm rounded-2xl bg-card dark:bg-blue-950/20 backdrop-blur-3xl overflow-hidden flex flex-col border">
              <div className="p-6 border-b border-border dark:border-blue-500/10 flex items-center justify-between bg-muted/10 dark:bg-blue-500/5">
                 <div className="flex items-center gap-3">
                    <ClipboardList className="w-4 h-4 text-primary" />
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground">Action Queue</h3>
                 </div>
                 <Badge variant="outline" className="text-[9px] font-bold text-muted-foreground/60 border-border dark:border-blue-500/20">Total: 12 Tasks</Badge>
              </div>
              <div className="divide-y divide-border dark:divide-blue-500/10">
                 {[
                   { t: 'Urgent: Leak Reported', r: 'Sarah J. (A-402)', s: 'Pending Dispatch', time: '14m ago', p: 'high' },
                   { t: 'Contract Review Due', r: 'John D. (C-102)', s: 'Under Review', time: '1h ago', p: 'med' },
                   { t: 'Safety Inspection', r: 'Bloomsbury Hall', s: 'In Progress', time: '2h ago', p: 'med' },
                   { t: 'Staff Scheduling', r: 'Kitchen Node', s: 'Awaiting Approval', time: '4h ago', p: 'low' },
                 ].map((item, i) => (
                   <div key={i} className="p-5 flex items-center justify-between hover:bg-muted/20 dark:hover:bg-blue-500/10 transition-all cursor-pointer group">
                      <div className="flex items-center gap-4 min-w-0">
                         <div className={cn("w-2 h-2 rounded-full", item.p === 'high' ? 'bg-rose-500 animate-pulse' : item.p === 'med' ? 'bg-amber-500' : 'bg-slate-400')} />
                         <div className="min-w-0">
                            <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{item.t}</p>
                            <p className="text-[10px] font-bold text-muted-foreground/60 uppercase">{item.r}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-6">
                         <div className="hidden sm:block text-right">
                            <p className="text-[10px] font-bold text-foreground uppercase">{item.s}</p>
                            <p className="text-[9px] font-medium text-muted-foreground/40">{item.time}</p>
                         </div>
                         <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                      </div>
                   </div>
                 ))}
              </div>
              <div className="p-4 border-t border-border dark:border-blue-500/10 mt-auto bg-muted/5">
                 <Button variant="ghost" className="w-full text-[10px] font-bold uppercase tracking-widest text-muted-foreground h-10 hover:text-primary dark:hover:bg-blue-500/5">
                    View Full Task Board
                 </Button>
              </div>
           </Card>

           {/* Secondary Column: Facility Health & Operations */}
           <div className="col-span-12 lg:col-span-5 space-y-5">
              <Card className="p-6 lg:p-8 border-border dark:border-blue-500/10 shadow-sm rounded-2xl bg-card dark:bg-blue-950/20 backdrop-blur-3xl">
                 <div className="flex items-center justify-between mb-8 border-b border-border dark:border-blue-500/10 pb-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground">Facility Health</h3>
                    <Target className="w-4 h-4 text-primary" />
                 </div>
                 <div className="space-y-6">
                    {[
                      { l: 'Housekeeping Compliance', v: 92, s: 'Excellent' },
                      { l: 'Catering Utilization', v: 76, s: 'Normal' },
                      { l: 'Energy Consumption', v: 88, s: 'Efficient' },
                      { l: 'Resident Satisfaction', v: 94, s: 'Very High' },
                    ].map((stat, i) => (
                      <div key={i} className="space-y-2">
                         <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase text-muted-foreground">{stat.l}</span>
                            <span className="text-[10px] font-black text-foreground">{stat.s}</span>
                         </div>
                         <div className="h-1.5 w-full bg-muted dark:bg-blue-900/20 rounded-full overflow-hidden shadow-inner">
                            <div className="h-full bg-primary shadow-[0_0_10px_rgba(99,102,241,0.4)]" style={{ width: `${stat.v}%` }} />
                         </div>
                      </div>
                    ))}
                 </div>
              </Card>

              <Card className="p-6 lg:p-8 border border-primary/10 dark:border-blue-500/20 shadow-sm rounded-2xl bg-primary/5 dark:bg-blue-900/10 overflow-hidden relative group cursor-pointer hover:bg-primary/10 dark:hover:bg-blue-900/20 transition-colors">
                 <div className="relative z-10 flex items-center justify-between">
                    <div className="space-y-1">
                       <h4 className="text-xl font-black uppercase tracking-tight text-foreground">Audit <br />Protocol</h4>
                       <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">Next Review: Nov 12</p>
                    </div>
                    <Button className="h-12 w-12 rounded-xl bg-foreground text-background dark:bg-blue-600 dark:text-white p-0 shadow-xl group-hover:scale-110 transition-transform">
                       <Download className="w-5 h-5" />
                    </Button>
                 </div>
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -translate-y-8 translate-x-8" />
              </Card>
           </div>

        </div>
      </div>
    );
  }

  // --- Normal Dashboard Implementation (Organized & Readable) ---
  if (isNormal) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Basic Tier</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-foreground">Property <span className="text-muted-foreground/30 font-medium">Overview</span></h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Daily Operational Monitoring</p>
          </div>
          <Button className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest gap-2 shadow-lg shadow-primary/20">
            <Plus className="w-3.5 h-3.5" /> Add Entry
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard tier="normal" label="Total Residents" value="142" icon={Users} trend="neutral" change="Stable" />
          <StatCard tier="normal" label="Available Units" value="12" icon={Building2} trend="down" change="-2" />
          <StatCard tier="normal" label="Active Invoices" value="£8.2k" icon={Wallet} trend="up" change="+4%" />
          <StatCard tier="normal" label="Open Tickets" value="6" icon={AlertCircle} trend="up" change="+1" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
           <Card className="lg:col-span-2 border-border dark:border-blue-500/10 shadow-sm rounded-2xl bg-card dark:bg-blue-950/20 backdrop-blur-3xl overflow-hidden">
              <div className="p-4 border-b border-border dark:border-blue-500/10 bg-muted/10 dark:bg-blue-500/5 flex items-center justify-between">
                 <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground">System Log</h3>
                 <Badge variant="outline" className="text-[9px] font-bold text-muted-foreground/50 dark:border-blue-500/20">Live</Badge>
              </div>
              <div className="divide-y divide-border dark:divide-blue-500/10">
                 {[
                   { t: 'Room 102 Check-in', d: 'Sarah Jenkins', s: 'Confirmed', time: '2h ago' },
                   { t: 'Maintenance Task #401', d: 'Plumbing Repair B-Block', s: 'In Progress', time: '4h ago' },
                   { t: 'Inventory Delivery', d: 'Stationery & Supplies', s: 'Logged', time: '1d ago' },
                 ].map((log, i) => (
                   <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/20 dark:hover:bg-blue-500/10 transition-all cursor-pointer">
                      <div className="space-y-0.5">
                         <p className="text-xs font-bold text-foreground">{log.t}</p>
                         <p className="text-[11px] text-muted-foreground font-medium">{log.d}</p>
                      </div>
                      <div className="text-right">
                         <Badge variant="outline" className="text-[8px] font-bold uppercase tracking-widest bg-muted dark:bg-blue-900/40 border-none h-5 px-2">{log.s}</Badge>
                         <p className="text-[9px] text-muted-foreground/30 font-bold uppercase mt-1">{log.time}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <Button variant="ghost" className="w-full text-[10px] font-bold uppercase tracking-widest text-muted-foreground h-11 hover:text-primary dark:hover:bg-blue-500/5">
                 View Historical Records
              </Button>
           </Card>

           <div className="space-y-5">
              <Card className="p-6 border-border dark:border-blue-500/10 shadow-sm rounded-2xl bg-card dark:bg-blue-950/20 backdrop-blur-3xl">
                 <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground mb-6 pb-4 border-b border-border dark:border-blue-500/10">Financial Alerts</h3>
                 <div className="space-y-4">
                    {[
                      { t: 'Pending Payments', v: '£1,420', c: 'text-amber-500' },
                      { t: 'Overdue Rent', v: '2 Units', c: 'text-rose-500' },
                      { t: 'Next Payout', v: 'Oct 1st', c: 'text-emerald-500' },
                    ].map((alert, i) => (
                      <div key={i} className="flex justify-between items-center group cursor-pointer">
                         <span className="text-[10px] font-bold uppercase text-muted-foreground">{alert.t}</span>
                         <span className={cn("text-xs font-black", alert.c)}>{alert.v}</span>
                      </div>
                    ))}
                 </div>
              </Card>

              <Card className="p-6 border border-primary/10 dark:border-blue-500/20 shadow-sm rounded-2xl bg-primary/5 dark:bg-blue-900/10 cursor-pointer hover:bg-primary/10 dark:hover:bg-blue-900/20 transition-all">
                 <div className="flex items-center justify-between">
                    <div className="space-y-1">
                       <h4 className="text-sm font-black uppercase tracking-widest text-foreground">Support Node</h4>
                       <p className="text-[9px] font-bold text-muted-foreground/40 uppercase">Assigned Manager: Alex</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-muted/30 dark:bg-blue-500/10 flex items-center justify-center text-muted-foreground">
                       <Phone className="w-3.5 h-3.5" />
                    </div>
                 </div>
              </Card>
           </div>
        </div>
      </div>
    );
  }

  // --- Chef Dashboard (Industrial Realism) ---
  if (isChef) {
     const nextMeal = { type: 'Lunch', menu: 'Grilled Chicken Caesar', countdown: '1h 22m', progress: 45 };
     const alerts = [
       { id: 1, type: 'allergy', text: '3 Nut-allergy residents for Lunch Service', critical: true },
       { id: 2, type: 'stock', text: 'Butter and Organic Milk below 10%', critical: false },
     ];

     return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">
           {/* 1. Industrial Header */}
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
              <div className="space-y-1">
                 <div className="flex items-center gap-2 mb-2">
                    <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Live Kitchen Environment</span>
                 </div>
                 <h1 className="text-4xl font-black tracking-tight text-foreground uppercase italic underline decoration-primary/30 underline-offset-8">
                    Kitchen <span className="text-muted-foreground/30 font-medium not-italic no-underline">Ops</span>
                 </h1>
              </div>
              <div className="flex items-center gap-2">
                 <Button variant="outline" className="h-10 rounded-xl px-4 border-border/60 dark:border-blue-500/20 text-[10px] font-black uppercase tracking-widest bg-card dark:bg-blue-950/20 backdrop-blur-md">
                    Daily Report
                 </Button>
                 <Button className="h-10 rounded-xl px-6 bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20">
                    <Plus className="w-4 h-4 mr-2" /> Start New Service
                 </Button>
              </div>
           </div>
           
           {/* 2. High-Density Stat Grid */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="group p-6 rounded-[2rem] border border-border/40 dark:border-blue-500/10 bg-card dark:bg-blue-950/20 backdrop-blur-3xl hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                 <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                       <UtensilsCrossed className="w-5 h-5" />
                    </div>
                    <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-emerald-500/20 text-emerald-500 bg-emerald-500/5">+12.4%</Badge>
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Portions Remaining</p>
                 <h3 className="text-3xl font-black mt-1">420 <span className="text-sm text-muted-foreground/30 font-bold ml-1">UNITS</span></h3>
              </div>
              <div className="group p-6 rounded-[2rem] border border-border/40 dark:border-blue-500/10 bg-card dark:bg-blue-950/20 backdrop-blur-3xl hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500">
                 <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-inner">
                       <Users className="w-5 h-5" />
                    </div>
                    <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-border/40 dark:border-blue-500/20 text-muted-foreground">Normal</Badge>
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Kitchen Staff</p>
                 <h3 className="text-3xl font-black mt-1">12 <span className="text-sm text-muted-foreground/30 font-bold ml-1">ON-SITE</span></h3>
              </div>
              <div className="group p-6 rounded-[2rem] border border-border/40 dark:border-blue-500/10 bg-card dark:bg-blue-950/20 backdrop-blur-3xl hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-500">
                 <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all shadow-inner">
                       <AlertCircle className="w-5 h-5" />
                    </div>
                    <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-rose-500/20 text-rose-500 bg-rose-500/5">Critical</Badge>
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Shortage Alerts</p>
                 <h3 className="text-3xl font-black mt-1">3 <span className="text-sm text-muted-foreground/30 font-bold ml-1">ITEMS</span></h3>
              </div>
              <div className="group p-6 rounded-[2rem] border border-border/40 dark:border-blue-500/10 bg-card dark:bg-blue-950/20 backdrop-blur-3xl hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-500">
                 <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-inner">
                       <ShieldCheck className="w-5 h-5" />
                    </div>
                    <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-border/40 dark:border-blue-500/20 text-muted-foreground">Certified</Badge>
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Hygiene Multiplier</p>
                 <h3 className="text-3xl font-black mt-1">5.0 <span className="text-sm text-muted-foreground/30 font-bold ml-1">RATING</span></h3>
              </div>
           </div>

           {/* 3. Operational Grid */}
           <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              {/* Active Service Status */}
              <Card className="xl:col-span-8 p-10 border-border/40 dark:border-blue-500/10 bg-card dark:bg-blue-950/20 backdrop-blur-3xl rounded-[3rem] shadow-sm relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 dark:bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none group-hover:bg-primary/10 transition-all duration-700" />
                 <div className="relative z-10 space-y-10">
                    <div className="flex justify-between items-center">
                       <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-widest text-primary">In Progress</p>
                          <h3 className="text-3xl font-black italic text-foreground">{nextMeal.type} Cycle <span className="text-muted-foreground/30 not-italic font-medium">— Service Active</span></h3>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Estimated Finish</p>
                          <p className="text-2xl font-black text-foreground">{nextMeal.countdown}</p>
                       </div>
                    </div>

                    <div className="space-y-6">
                       <div className="flex justify-between items-end">
                          <div className="space-y-1 text-left">
                             <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Flow Progress</p>
                             <p className="text-5xl font-black text-foreground">{nextMeal.progress}%</p>
                          </div>
                          <div className="space-y-1 text-right">
                             <p className="text-sm font-bold text-foreground">{nextMeal.menu}</p>
                             <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 italic underline decoration-primary/50">Current Menu Signature</p>
                          </div>
                       </div>
                       <div className="h-4 w-full bg-muted/30 dark:bg-blue-900/20 rounded-full overflow-hidden border border-border/10 dark:border-blue-500/10 p-1">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${nextMeal.progress}%` }}
                           transition={{ duration: 1.5, ease: "circOut" }}
                           className="h-full bg-primary rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                         />
                       </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-6 border-t border-border/10 dark:border-blue-500/10">
                       <div className="space-y-2">
                          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Vegetarian</p>
                          <p className="text-xl font-bold text-foreground">42 <span className="text-[10px] text-muted-foreground">units</span></p>
                       </div>
                       <div className="space-y-2">
                          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Vegan</p>
                          <p className="text-xl font-bold text-foreground">12 <span className="text-[10px] text-muted-foreground">units</span></p>
                       </div>
                       <div className="space-y-2 text-rose-500">
                          <p className="text-[10px] font-black uppercase tracking-widest text-rose-500/60">Allergies</p>
                          <p className="text-xl font-bold">3 <span className="text-[10px] opacity-60">alerts</span></p>
                       </div>
                       <div className="space-y-2">
                          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Energy Mix</p>
                          <p className="text-xl font-bold text-foreground">High <span className="text-[10px] text-muted-foreground">output</span></p>
                       </div>
                    </div>
                 </div>
              </Card>

              {/* High-Priority Intelligence */}
              <div className="xl:col-span-4 space-y-6">
                 <Card className="p-8 rounded-[3rem] border-border/40 dark:border-blue-500/10 bg-card dark:bg-blue-950/20 backdrop-blur-3xl space-y-6 shadow-sm">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-foreground flex items-center gap-2">
                       <Sparkles className="w-4 h-4 text-primary" /> Active Alerts
                    </h4>
                    <div className="space-y-4">
                       {alerts.map(alert => (
                         <div key={alert.id} className={cn(
                           "p-4 rounded-2xl border transition-all",
                           alert.critical 
                             ? "bg-rose-500/5 border-rose-500/20" 
                             : "bg-primary/5 border-primary/20 dark:bg-blue-500/5 dark:border-blue-500/20"
                         )}>
                            <div className="flex gap-4">
                               <div className={cn(
                                 "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                                 alert.critical ? "bg-rose-500 text-white" : "bg-primary text-white"
                               )}>
                                  {alert.critical ? <AlertCircle className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                               </div>
                               <p className={cn("text-xs font-bold leading-relaxed", alert.critical ? "text-rose-600 dark:text-rose-400" : "text-primary dark:text-blue-400")}>
                                  {alert.text}
                               </p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </Card>

                 <Card className="p-8 bg-primary/5 dark:bg-blue-900/10 border border-primary/10 dark:border-blue-500/20 rounded-[3rem] relative overflow-hidden group">
                    <div className="relative z-10 space-y-6">
                       <div className="space-y-1">
                          <p className="text-[9px] font-black uppercase tracking-widest text-primary/80">Strategy Node</p>
                          <h4 className="text-xl font-black text-foreground italic">Plan Next Cycle</h4>
                       </div>
                       <p className="text-xs text-muted-foreground/60 leading-relaxed font-medium">
                          Review inventory levels and resident sentiment audits to optimize upcoming week 14 menus.
                       </p>
                       <Button className="w-full h-12 bg-primary text-white font-bold text-[10px] uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                          Open Menu Designer
                       </Button>
                    </div>
                    <Plus className="absolute bottom-0 right-0 w-48 h-48 text-white/5 translate-x-12 translate-y-12 rotate-45 pointer-events-none" />
                 </Card>
              </div>
           </div>
        </div>
     );
  }

  // --- Tenant Dashboard (Lifestyle & Concierge Experience) ---
  if (isTenant) {
     return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">
           {/* 1. Welcome Hero: High-Impact Lifestyle Greeting */}
           <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-blue-950 via-slate-900 to-black p-10 lg:p-14 text-white shadow-2xl group border border-white/5">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/30 transition-all duration-1000" />
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              
              <div className="relative z-10 space-y-10">
                 <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                       <Badge className="bg-white/10 text-white border-white/20 text-[10px] font-black uppercase tracking-widest backdrop-blur-md px-4 py-1.5 rounded-full">
                          Bloomsbury Hall Resident
                       </Badge>
                       <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/20">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Profile Verified</span>
                       </div>
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] drop-shadow-2xl">
                       Good Morning, <br />
                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">Sarah Johnson.</span>
                    </h1>
                    <p className="text-lg lg:text-xl font-medium text-white/50 max-w-2xl leading-relaxed">
                       Your stay is <span className="text-white font-bold">142 days</span> in. Everything in Room <span className="text-white font-bold">A-402</span> is operating at optimal levels.
                    </p>
                 </div>
                 
                 <div className="flex flex-wrap gap-4">
                    <Button className="h-14 px-10 rounded-2xl bg-white text-black dark:bg-blue-600 dark:text-white font-black uppercase tracking-widest hover:scale-[1.05] active:scale-95 transition-all text-xs shadow-2xl shadow-white/5 group/btn border-none">
                       <ShieldCheck className="w-4 h-4 mr-2 group-hover:text-primary dark:group-hover:text-white transition-colors" /> Digital Key Access
                    </Button>
                    <Button variant="outline" className="h-14 px-8 rounded-2xl border-white/20 text-white hover:bg-white/10 font-black uppercase tracking-widest text-xs transition-all backdrop-blur-sm shadow-xl">
                       <UtensilsCrossed className="w-4 h-4 mr-2 opacity-60" /> Book Today's Menu
                    </Button>
                 </div>
              </div>
              <Sparkles className="absolute bottom-10 right-10 w-24 h-24 text-white/5 animate-pulse rotate-12" />
           </div>

           <div className="grid lg:grid-cols-12 gap-8">
              {/* 2. Smart Room Intelligence: IoT Visualizer */}
              <Card className="lg:col-span-8 p-10 rounded-[3rem] border-white/20 dark:border-blue-500/10 bg-card/40 dark:bg-blue-950/20 backdrop-blur-3xl space-y-12 relative overflow-hidden shadow-sm group transition-all hover:shadow-2xl hover:shadow-primary/5">
                 <div className="flex items-center justify-between border-b border-border/10 dark:border-blue-500/10 pb-8">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 dark:border-blue-500/20 shadow-inner">
                          <Cpu className="w-5 h-5" />
                       </div>
                       <div>
                          <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-foreground">Room A-402 Intelligence</h3>
                          <p className="text-[9px] font-bold text-muted-foreground/50 uppercase tracking-widest mt-0.5">Real-time IoT Telemetry</p>
                       </div>
                    </div>
                    <Badge className="bg-emerald-500/10 text-emerald-500 border-none px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-full shadow-inner">
                       Active Node
                    </Badge>
                 </div>
                 
                 <div className="grid sm:grid-cols-3 gap-12">
                    <div className="space-y-5">
                       <div className="flex items-center gap-2 text-muted-foreground/60">
                          <Zap className="w-4 h-4" />
                          <p className="text-[10px] font-black uppercase tracking-widest">Climate Control</p>
                       </div>
                       <div className="flex items-end gap-2">
                          <span className="text-6xl font-black tracking-tighter text-foreground">21°</span>
                          <span className="text-sm font-bold text-emerald-500 pb-3 uppercase tracking-widest">Optimal</span>
                       </div>
                       <div className="h-1.5 w-full bg-muted/40 dark:bg-blue-900/40 rounded-full overflow-hidden shadow-inner">
                          <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} transition={{ duration: 1.5, ease: "circOut" }} className="h-full bg-primary shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                       </div>
                    </div>
                    <div className="space-y-5">
                       <div className="flex items-center gap-2 text-muted-foreground/60">
                          <Activity className="w-4 h-4" />
                          <p className="text-[10px] font-black uppercase tracking-widest">Bandwidth</p>
                       </div>
                       <div className="flex items-end gap-2">
                          <span className="text-6xl font-black tracking-tighter text-foreground">942</span>
                          <span className="text-sm font-bold text-muted-foreground/30 pb-3 uppercase tracking-widest">Mbps</span>
                       </div>
                       <div className="flex gap-1.5 h-1.5">
                          {[1,2,3,4,5].map(i => <div key={i} className={cn("flex-1 rounded-full shadow-inner", i <= 4 ? "bg-primary" : "bg-muted/30 dark:bg-blue-900/20")} />)}
                       </div>
                    </div>
                    <div className="space-y-5">
                       <div className="flex items-center gap-2 text-muted-foreground/60">
                          <Shield className="w-4 h-4" />
                          <p className="text-[10px] font-black uppercase tracking-widest">Security State</p>
                       </div>
                       <div className="flex items-center gap-4 py-1">
                          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
                             <ShieldCheck className="w-7 h-7" />
                          </div>
                          <div>
                             <p className="text-2xl font-black tracking-tight text-foreground uppercase">Secured</p>
                             <p className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">Encrypted Entry</p>
                          </div>
                       </div>
                       <p className="text-[9px] font-bold text-muted-foreground/30 uppercase tracking-[0.2em] border-t border-border/10 dark:border-blue-500/10 pt-4">Last Entry: 08:42 AM · 2FA Active</p>
                    </div>
                 </div>

                 <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/5 via-transparent to-transparent dark:from-blue-500/10 border border-primary/10 dark:border-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-8 group/eco shadow-inner">
                    <div className="flex items-center gap-8 text-center md:text-left">
                       <div className="w-20 h-20 rounded-[2rem] bg-card dark:bg-blue-900/40 border border-white/20 dark:border-blue-500/20 shadow-2xl flex items-center justify-center text-primary group-hover/eco:rotate-12 transition-transform duration-700">
                          <Sparkles className="w-10 h-10" />
                       </div>
                       <div>
                          <h4 className="text-xl font-black tracking-tight text-foreground">Eco-Champion Ranking</h4>
                          <p className="text-sm font-medium text-muted-foreground leading-relaxed">Your carbon footprint is <span className="text-emerald-500 font-bold">18% lower</span> than the building average. Keep it up!</p>
                       </div>
                    </div>
                    <Button variant="ghost" className="h-12 rounded-xl px-6 font-black text-[10px] uppercase tracking-[0.2em] text-primary dark:text-blue-400 hover:bg-primary/5 dark:hover:bg-blue-500/10 transition-all">
                       View Sustainability Ledger <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                 </div>
              </Card>

              {/* 3. Culinary & Concierge Sidebar */}
              <div className="lg:col-span-4 space-y-8">
                 <Card className="p-8 rounded-[3rem] border-white/20 dark:border-blue-500/10 bg-card/40 dark:bg-blue-950/20 backdrop-blur-3xl space-y-8 shadow-sm overflow-hidden relative group">
                    <div className="flex items-center justify-between border-b border-border/10 dark:border-blue-500/10 pb-6">
                       <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground flex items-center gap-2">
                          <UtensilsCrossed className="w-4 h-4 text-primary" /> Dining Node
                       </h4>
                       <Badge className="bg-primary/10 text-primary border-none text-[8px] font-black uppercase tracking-widest px-3 py-1">Lunch Cycle</Badge>
                    </div>
                    <div className="space-y-6">
                       <div className="relative h-40 rounded-2xl overflow-hidden group/img shadow-2xl">
                          <img src="/gourmet-dining.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110" alt="Lunch" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                             <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">On the Menu Today</p>
                             <h4 className="text-lg font-black text-white tracking-tight leading-snug">Miso-Glazed Atlantic Salmon with Ginger Quinoa</h4>
                          </div>
                       </div>
                       <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 italic">
                          <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> 12:00 - 14:30</span>
                          <span className="text-emerald-500">Available</span>
                       </div>
                       <Button className="w-full h-14 rounded-2xl bg-foreground text-background dark:bg-blue-600 dark:text-white font-black text-[11px] uppercase tracking-widest hover:scale-[1.02] active:scale-98 transition-all shadow-2xl shadow-black/20 border-none">
                          Pre-Order Now
                       </Button>
                    </div>
                 </Card>

                 <Card className="p-8 rounded-[3rem] border-white/20 dark:border-blue-500/10 bg-card/40 dark:bg-blue-950/20 backdrop-blur-3xl space-y-8 shadow-sm">
                    <div className="flex items-center justify-between border-b border-border/10 dark:border-blue-500/10 pb-6">
                       <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" /> Social Horizon
                       </h4>
                       <Button variant="ghost" size="sm" className="h-6 text-[9px] font-black uppercase tracking-widest text-muted-foreground p-0 hover:text-primary">All Events</Button>
                    </div>
                    <div className="space-y-4">
                       {[
                         { t: 'Roof Terrace Mixer', d: 'Tonight, 19:00', i: Users, c: 'bg-emerald-500/10 text-emerald-500' },
                         { t: 'Morning Yoga Flow', d: 'Tomorrow, 08:00', i: Activity, c: 'bg-blue-500/10 text-blue-500' },
                         { t: 'Career Workshop', d: 'Thu, 15:30', i: Sparkles, c: 'bg-amber-500/10 text-amber-500' },
                       ].map((ev, i) => (
                         <div key={i} className="flex items-center gap-5 group cursor-pointer p-3 hover:bg-white/5 dark:hover:bg-blue-500/10 rounded-2xl transition-all border border-transparent hover:border-border/10 dark:hover:border-blue-500/20 shadow-none hover:shadow-lg">
                            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner", ev.c)}>
                               <ev.i className="w-6 h-6" />
                            </div>
                            <div className="min-w-0">
                               <p className="text-sm font-black text-foreground group-hover:text-primary transition-colors truncate">{ev.t}</p>
                               <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-0.5">{ev.d}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground/20 group-hover:text-primary transition-all group-hover:translate-x-1" />
                         </div>
                       ))}
                    </div>
                 </Card>
              </div>
           </div>

           {/* 4. Quick Access Grid: Task-Oriented Interaction */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { l: 'My Ledger', i: Receipt, h: '/dashboard/tenants/invoices', d: 'View & pay rent', c: 'hover:border-emerald-500/30 hover:bg-emerald-500/5 dark:hover:bg-emerald-500/10' },
                { l: 'Concierge', i: Wrench, h: '/dashboard/tenants/services', d: 'Report room issues', c: 'hover:border-primary/30 hover:bg-primary/5 dark:hover:bg-blue-500/10' },
                { l: 'Laundry Live', i: Waves, h: '/dashboard/tenants/services', d: 'Track machine status', c: 'hover:border-blue-500/30 hover:bg-blue-500/5 dark:hover:bg-blue-500/10' },
                { l: 'Support Node', i: MessageSquare, h: '/dashboard/tenants/services', d: 'Chat with staff', c: 'hover:border-amber-500/30 hover:bg-amber-500/5 dark:hover:bg-amber-500/10' },
              ].map((item, i) => (
                 <Link key={i} href={item.h} className="group">
                    <Card className={cn("p-8 rounded-[2.5rem] border-white/20 dark:border-blue-500/10 bg-card/40 dark:bg-blue-950/20 backdrop-blur-3xl transition-all duration-500 flex flex-col gap-6 shadow-sm hover:shadow-2xl cursor-pointer border", item.c)}>
                       <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all duration-500 shadow-inner">
                          <item.i className="w-7 h-7" />
                       </div>
                       <div className="space-y-1.5">
                          <h4 className="text-lg font-black tracking-tight text-foreground group-hover:text-primary transition-colors">{item.l}</h4>
                          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground/40 leading-relaxed">{item.d}</p>
                       </div>
                    </Card>
                 </Link>
              ))}
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
