'use client';

import Link from 'next/link';
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
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { StatCard } from './stat-card';

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

  if (isPremium) {
    return (
      <div className="space-y-6 animate-in fade-in duration-700">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 mb-1">
               <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
               <span className="text-[9px] font-bold uppercase tracking-widest text-primary">Intelligence Active</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-foreground">Global <span className="text-muted-foreground/30 font-medium">Portfolio</span></h1>
            <p className="text-[11px] text-muted-foreground font-medium max-w-xl leading-snug">Strategic oversight and predictive performance metrics.</p>
          </div>
          <div className="flex items-center gap-2">
             <Button variant="outline" size="sm" className="rounded-xl font-bold border-border bg-card shadow-sm h-10 px-4">
                Market Brief
             </Button>
             <Button size="sm" className="rounded-xl font-black bg-primary text-primary-foreground shadow-lg shadow-primary/20 h-10 px-4">
                Expand Assets
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Portfolio Yield", value: "8.42%", trend: "+1.2%", sub: "Target 9.1%" },
            { label: "Asset Saturation", value: "98.6%", trend: "Optimal", sub: "Global Average" },
            { label: "Revenue Velocity", value: "£1.2M", trend: "+18%", sub: "Last 30 Days" },
            { label: "Risk Profile", value: "Low", trend: "Stable", sub: "System Monitored" },
          ].map((stat, i) => (
            <Card key={i} className="p-6 border-border/40 bg-card rounded-2xl shadow-sm hover:shadow-md transition-all">
               <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">{stat.label}</p>
               <div className="flex items-baseline gap-2 mb-2">
                  <h3 className="text-2xl font-black tracking-tight text-foreground">{stat.value}</h3>
                  <span className="text-[9px] font-bold text-emerald-500">{stat.trend}</span>
               </div>
               <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/30 border-t border-border/40 pt-2">{stat.sub}</p>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

           <Card className="lg:col-span-8 p-8 border-border/40 bg-card rounded-[1.5rem] shadow-sm relative overflow-hidden group">
              <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                <div className="flex items-center justify-between">
                   <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Predictive Engine v5.0</h3>
                   <div className="flex -space-x-2">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-card bg-muted" />
                      ))}
                   </div>
                </div>

                <div className="space-y-4">
                   <h4 className="text-3xl font-black tracking-tight text-foreground max-w-lg leading-tight">
                      Anticipated <span className="text-primary">Yield Surge</span> in the London SE1 Cluster.
                   </h4>
                   <p className="text-muted-foreground font-medium leading-relaxed max-w-xl">
                      Market data indicates a 22% demand increase in Shoreditch. We recommend a strategic capital allocation for Q3.
                   </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-border/40">
                   {[
                     { l: 'Volatility', v: '0.2%' },
                     { l: 'Liquidity', v: '£4.2M' },
                     { l: 'Saturation', v: '94%' },
                     { l: 'Market Cap', v: '£142M' },
                   ].map((item, i) => (
                     <div key={i} className="space-y-1">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40">{item.l}</p>
                        <p className="text-xl font-black text-foreground">{item.v}</p>
                     </div>
                   ))}
                </div>
              </div>
           </Card>

           <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center justify-between px-2">
                 <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Global Pulse</h3>
                 <span className="text-[9px] font-bold text-primary uppercase tracking-widest">Real-time</span>
              </div>

              <div className="space-y-4">
                {[
                  { t: 'Singapore Hub', d: '99% Occupancy', icon: Globe },
                  { t: 'London Central', d: 'New Acquisition', icon: ShieldCheck },
                  { t: 'Revenue Node', d: '£240k Processed', icon: Wallet },
                ].map((item, i) => (
                  <Card key={i} className="p-6 border-border/40 bg-card/50 rounded-2xl hover:bg-card transition-all cursor-pointer">
                     <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
                           <item.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                           <p className="text-[11px] font-black uppercase tracking-tight text-foreground">{item.t}</p>
                           <p className="text-xs text-muted-foreground font-medium">{item.d}</p>
                        </div>
                     </div>
                  </Card>
                ))}
              </div>

              <Button className="w-full h-16 rounded-2xl bg-foreground text-background font-black text-[10px] uppercase tracking-widest hover:bg-foreground/90 transition-all">
                 Open Full Intelligence Suite
              </Button>
           </div>
        </div>
      </div>
    );
  }

  if (isPro) {
    return (
      <div className="space-y-6 animate-in fade-in duration-700">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-border/40">
           <div className="space-y-2">
             <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-primary/5 border border-primary/10">
               <Badge className="bg-primary text-primary-foreground border-none text-[9px] font-bold uppercase tracking-widest px-2 py-0 rounded-md h-4 flex items-center">Pro Hub</Badge>
               <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Operations Command</span>
             </div>
             <h1 className="text-4xl font-black tracking-tight text-foreground">Property <span className="text-primary">Control</span></h1>
             <p className="text-muted-foreground font-medium text-base max-w-xl leading-snug">Efficient management of your residential infrastructure.</p>
           </div>
           <div className="flex items-center gap-2">
             <Button variant="outline" className="rounded-xl h-10 px-4 font-bold border-border bg-card text-xs">
               Daily Report
             </Button>
             <Button className="rounded-xl h-10 px-6 font-black bg-primary text-primary-foreground shadow-lg shadow-primary/10 text-xs text-primary-foreground">
               Add Tenant
             </Button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard tier="pro" label="Occupancy" value="94.2%" icon={Zap} trend="up" />
          <StatCard tier="pro" label="Tickets" value="4 Active" icon={Activity} trend="neutral" />
          <StatCard tier="pro" label="Revenue" value="£68,420" icon={TrendingUp} trend="up" />
          <StatCard tier="pro" label="Efficiency" value="98.5%" icon={Users} trend="up" />
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
           <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Recent Operations</h3>
                <div className="flex items-center gap-2 px-3 py-1 bg-primary/5 border border-primary/10 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[9px] font-bold text-primary uppercase">Ready</span>
                </div>
              </div>
              <Card className="overflow-hidden border-border/40 shadow-sm rounded-2xl bg-card">
                 <div className="divide-y divide-border/40">
                    {[
                      { title: 'Check-in', info: 'North Hall Room 402', status: 'Done' },
                      { title: 'Maintenance', info: 'Block B Electrical Resolve', status: 'Fixed' },
                      { title: 'Payment', info: 'Rent Verified: Sarah J.', status: 'Paid' },
                      { title: 'Audit', info: 'Main Entrance Lock Sync', status: 'Secure' },
                    ].map((log, i) => (
                      <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-all cursor-pointer group">
                         <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center font-bold text-[10px] text-muted-foreground group-hover:border-primary group-hover:text-primary transition-all">
                              {i+1}
                            </div>
                            <div>
                               <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{log.title}</p>
                               <p className="text-[11px] text-muted-foreground font-medium mt-0.5">{log.info}</p>
                            </div>
                         </div>
                         <Badge variant="outline" className="text-[8px] font-bold uppercase tracking-widest border-border text-muted-foreground px-2">{log.status}</Badge>
                      </div>
                    ))}
                 </div>
              </Card>
           </div>

           <div className="lg:col-span-4 space-y-6">
              <Card className="p-6 border-border/40 bg-card rounded-2xl shadow-sm">
                 <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-6 border-b border-border/40 pb-3 flex items-center justify-between">
                   Portfolio Health
                   <Activity className="w-3.5 h-3.5 text-primary" />
                 </h4>
                 <div className="space-y-6">
                    {[
                      { label: 'Room Readiness', value: 98, color: 'bg-primary' },
                      { label: 'Payment Velocity', value: 85, color: 'bg-muted-foreground' },
                      { label: 'Satisfaction', value: 92, color: 'bg-emerald-500' },
                    ].map((item, i) => (
                      <div key={i} className="space-y-2">
                         <div className="flex justify-between items-end">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{item.label}</span>
                           <span className="text-xs font-black text-foreground">{item.value}%</span>
                         </div>
                         <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden p-0.5">
                            <div className={cn("h-full rounded-full transition-all duration-1000", item.color)} style={{ width: `${item.value}%` }} />
                         </div>
                      </div>
                    ))}
                 </div>
              </Card>

              <Card className="p-6 bg-primary text-primary-foreground rounded-2xl border-none shadow-xl shadow-primary/10 relative overflow-hidden group">
                 <div className="space-y-4 relative z-10">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <Badge className="bg-white/10 text-white border-white/20 text-[8px] uppercase">Live Sync</Badge>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-black tracking-tight">Smart Ops</h3>
                      <p className="text-[11px] opacity-80 font-medium">Auto-billing is optimized.</p>
                    </div>
                    <Button className="w-full text-[9px] font-black uppercase tracking-widest h-10 rounded-xl bg-white text-primary hover:bg-white/90 transition-all">
                      Configure System
                    </Button>
                 </div>
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
              </Card>
           </div>
        </div>
      </div>
    );
  }

  if (isNormal) {
    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-border/40">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border/40">
               <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
               <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{today}</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-foreground">Management Overview</h1>
            <p className="text-muted-foreground font-medium text-base max-w-xl leading-snug">Centralized control for your daily residential operations.</p>
          </div>
          <div className="flex items-center gap-2">
             <Button variant="outline" size="sm" className="rounded-xl font-bold border-border bg-card shadow-sm h-10 px-4">
               Download Report
             </Button>
             <Button size="sm" className="rounded-xl font-black bg-primary text-primary-foreground shadow-lg shadow-primary/10 h-10 px-4">
               <Plus className="w-4 h-4 mr-2" /> Add Resident
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard tier="normal" label="Total Residents" value="142" icon={Users} trend="neutral" change="Stable" />
          <StatCard tier="normal" label="Available Units" value="12" icon={Building2} trend="down" change="-2" />
          <StatCard tier="normal" label="Active Invoices" value="45" icon={FileText} trend="up" change="+8" />
          <StatCard tier="normal" label="Open Tickets" value="6" icon={AlertCircle} trend="up" change="+1" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-4">
            <Card className="border-border/40 bg-card rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-border/40 flex items-center justify-between bg-muted/20">
                <h3 className="text-xs font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" /> Active Operations
                </h3>
                <Badge variant="outline" className="text-[9px] font-bold">Live Status</Badge>
              </div>
              <div className="p-0">
                {[
                  { title: 'B-Block Maintenance', desc: 'Plumbing repair in progress - Room 204', status: 'In Progress', time: 'Started 2h ago', icon: Settings },
                  { title: 'Bulk Check-in', desc: '12 new residents arriving for Autumn semester', status: 'Scheduled', time: 'Starts at 2:00 PM', icon: Users },
                  { title: 'Kitchen Audit', desc: 'Weekly hygiene and inventory verification', status: 'Completed', time: 'Finished 10:00 AM', icon: UtensilsCrossed },
                ].map((op, i) => (
                  <div key={i} className="p-4 flex items-start gap-3 hover:bg-muted/30 transition-all border-b border-border/10 last:border-none group">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <op.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-xs font-bold text-foreground">{op.title}</p>
                        <span className="text-[9px] font-bold text-muted-foreground/40">{op.time}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground font-medium mb-2">{op.desc}</p>
                      <Badge className={cn(
                        "text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border-none",
                        op.status === 'Completed' ? "bg-emerald-500/10 text-emerald-600" :
                        op.status === 'In Progress' ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                      )}>{op.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-muted/10 border-t border-border/40">
                <Button variant="ghost" className="w-full text-xs font-bold text-muted-foreground hover:text-primary">
                  View Full Operational Log <ArrowRight className="w-3 h-3 ml-2" />
                </Button>
              </div>
            </Card>
          </div>

          <div className="space-y-6">

            <div className="space-y-3">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground px-2">Quick Commands</h3>
              <div className="grid grid-cols-1 gap-2">
                <Button variant="outline" className="h-12 justify-start gap-3 px-4 rounded-xl border-border bg-card hover:bg-muted transition-all group border-dashed">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Plus className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-xs uppercase tracking-widest">Assign Room</span>
                </Button>
                <Button variant="outline" className="h-12 justify-start gap-3 px-4 rounded-xl border-border bg-card hover:bg-muted transition-all group border-dashed">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-xs uppercase tracking-widest">Post Invoice</span>
                </Button>
              </div>
            </div>

            <Card className="p-6 border-border/40 bg-card rounded-[1.5rem] shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Recent Events</h3>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="space-y-5">
                 {[
                   { text: 'Room A-102 check-in', time: '2h ago', color: 'bg-blue-500' },
                   { text: 'Meal plan: North Hall', time: '4h ago', color: 'bg-orange-500' },
                   { text: 'Oct Revenue Report', time: '1d ago', color: 'bg-emerald-500' },
                   { text: 'Staff shift: Night', time: '1d ago', color: 'bg-purple-500' },
                 ].map((act, i) => (
                   <div key={i} className="flex items-start gap-3">
                      <div className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0", act.color)} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-foreground truncate">{act.text}</p>
                        <p className="text-[10px] font-medium text-muted-foreground/60">{act.time}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <Button variant="ghost" className="w-full mt-6 text-[10px] font-black uppercase tracking-widest h-10 border border-border/40 rounded-xl">
                System History
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // ─── Chef Dashboard ──────────────────────────────────────────────────────
  if (isChef) {
    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });

    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Chef Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-orange-500/10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/5 border border-orange-500/10">
              <UtensilsCrossed className="w-3.5 h-3.5 text-orange-600" />
              <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em]">Kitchen Command</span>
            </div>
            <h1 className="text-5xl font-black tracking-tight text-foreground">
              Welcome back, <span className="text-orange-500">Chef.</span>
            </h1>
            <p className="text-muted-foreground font-medium text-lg max-w-xl">
              {today} · Kitchen is currently <span className="text-orange-600 font-bold uppercase">Active</span> for dinner prep.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right mr-4 hidden sm:block">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Next Service</p>
              <p className="text-sm font-black text-foreground">Dinner (18:30)</p>
            </div>
            <Button className="rounded-2xl h-12 px-6 font-black bg-orange-600 text-white shadow-xl shadow-orange-500/20 hover:bg-orange-700 transition-all uppercase text-[10px] tracking-widest">
              <Plus className="w-4 h-4 mr-2" /> Create Menu
            </Button>
          </div>
        </div>

        {/* Chef Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Expected Portions', value: '482', icon: Users, sub: '82% Confirmed', color: 'orange' },
            { label: 'Hygiene Score', value: '98/100', icon: ShieldCheck, sub: 'Last Audit: 2d ago', color: 'emerald' },
            { label: 'Inventory Level', value: '84%', icon: Layers, sub: '3 items low', color: 'blue' },
            { label: 'Active Staff', value: '12', icon: Activity, sub: 'Shift: Afternoon', color: 'indigo' },
          ].map((stat, i) => (
            <Card key={i} className="p-6 border-border/40 bg-card rounded-[2rem] shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
              <div className="relative z-10">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors",
                  stat.color === 'orange' ? "bg-orange-500/10 text-orange-600 group-hover:bg-orange-600 group-hover:text-white" :
                  stat.color === 'emerald' ? "bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white" :
                  stat.color === 'blue' ? "bg-blue-500/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white" :
                  "bg-indigo-500/10 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white"
                )}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-1">{stat.label}</p>
                <h3 className="text-2xl font-black tracking-tight text-foreground">{stat.value}</h3>
                <p className="text-[10px] font-bold text-muted-foreground/40 mt-1">{stat.sub}</p>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-muted/20 rounded-full group-hover:scale-150 transition-transform duration-700" />
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Today's Menu Section */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Today's Menu Selection</h3>
              <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-orange-600 hover:text-orange-700 hover:bg-orange-500/5">
                Full Weekly Plan <ArrowRight className="w-3 h-3 ml-2" />
              </Button>
            </div>

            <div className="grid gap-4">
              {[
                { time: '07:00 - 09:30', meal: 'Breakfast Buffet', type: 'Morning', status: 'Completed', menu: 'Fresh pastries, organic yogurt, seasonal fruits, and eggs to order.' },
                { time: '12:00 - 14:00', meal: 'Mediterranean Deli', type: 'Lunch', status: 'In Progress', menu: 'Grilled chicken souvlaki, Greek salad, handmade pita, and roasted vegetables.' },
                { time: '18:30 - 20:30', meal: 'Slow-cooked Beef Bourguignon', type: 'Dinner', status: 'Upcoming', menu: 'Tender beef in red wine sauce with pearl onions, mushrooms, and buttered mash.' },
              ].map((m, i) => (
                <Card key={i} className={cn(
                  "p-8 border-border/40 rounded-[2.5rem] shadow-sm relative overflow-hidden group hover:border-orange-500/20 transition-all",
                  m.status === 'In Progress' ? "border-orange-500/30 bg-orange-500/[0.02]" : "bg-card"
                )}>
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-3">
                        <Badge className={cn(
                          "text-[9px] font-black uppercase px-3 py-1 rounded-full border-none",
                          m.status === 'Completed' ? "bg-emerald-500/10 text-emerald-600" :
                          m.status === 'In Progress' ? "bg-orange-500 text-white animate-pulse" :
                          "bg-muted text-muted-foreground"
                        )}>
                          {m.status}
                        </Badge>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{m.time}</span>
                      </div>
                      <div>
                        <h4 className="text-2xl font-black text-foreground">{m.meal}</h4>
                        <p className="text-sm text-muted-foreground font-medium mt-2 leading-relaxed max-w-lg">
                          {m.menu}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {['Dairy Free', 'Gluten Free Option', 'High Protein'].map((tag, j) => (
                          <span key={j} className="text-[8px] font-bold uppercase tracking-widest px-2 py-1 bg-muted/50 text-muted-foreground rounded-md border border-border/40">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-4 shrink-0">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(j => (
                          <div key={j} className="w-8 h-8 rounded-full border-2 border-background bg-muted overflow-hidden">
                            <img src={`/avatar-${j}.jpg`} alt="" className="w-full h-full object-cover" />
                          </div>
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-background bg-orange-500 text-[10px] font-black text-white flex items-center justify-center">
                          +12
                        </div>
                      </div>
                      <Button variant="outline" className="rounded-xl font-black text-[9px] uppercase tracking-widest px-6 h-10 border-border group-hover:border-orange-500/30 transition-all">
                        Update Menu
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar Section: Feedback & Stock */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Resident Feedback */}
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-foreground px-2">Resident Sentiment</h3>
              <Card className="p-6 border-border/40 bg-card rounded-[2rem] shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-foreground">4.8</span>
                    <span className="text-xs font-bold text-muted-foreground">/ 5.0</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Sparkles key={star} className={cn("w-3 h-3", star <= 4 ? "text-orange-500 fill-orange-500" : "text-muted")} />
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[
                    { user: 'Sarah J.', comment: 'The salmon was perfectly cooked!', rating: 5 },
                    { user: 'Alex M.', comment: 'Loved the vegan options today.', rating: 5 },
                    { user: 'Jamie L.', comment: 'A bit more spice in the curry please.', rating: 4 },
                  ].map((f, i) => (
                    <div key={i} className="space-y-1.5 p-3 rounded-2xl hover:bg-muted/30 transition-colors">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-foreground">{f.user}</span>
                        <span className="text-[9px] font-bold text-orange-500">★ {f.rating}.0</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground font-medium leading-tight">"{f.comment}"</p>
                    </div>
                  ))}
                </div>
                
                <Button variant="ghost" className="w-full text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-orange-600 h-10 border border-dashed border-border rounded-xl mt-2">
                  View All Feedback
                </Button>
              </Card>
            </div>

            {/* Stock Alerts */}
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-foreground px-2">Stock Alerts</h3>
              <Card className="p-6 border-border/40 bg-card rounded-[2rem] shadow-sm space-y-4">
                {[
                  { item: 'Organic Whole Milk', level: '12%', status: 'Critical' },
                  { item: 'Unsalted Butter', level: '18%', status: 'Low' },
                  { item: 'Prime Ribeye', level: '24%', status: 'Low' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={cn(
                      "w-1.5 h-8 rounded-full",
                      s.status === 'Critical' ? "bg-rose-500" : "bg-orange-500"
                    )} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-foreground truncate">{s.item}</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">{s.level} remaining</p>
                    </div>
                    <Button size="icon" variant="ghost" className="rounded-lg h-8 w-8 text-orange-600 hover:bg-orange-500/10">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <div className="pt-2">
                  <Button className="w-full h-12 rounded-2xl bg-foreground text-background font-black text-[10px] uppercase tracking-widest hover:bg-foreground/90 transition-all">
                    Generate Purchase Order
                  </Button>
                </div>
              </Card>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // ─── Tenant Home Dashboard ────────────────────────────────────────────────
  if (isTenant) {
    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-10">
        
        {/* Header Section - Clean & Inviting */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-1">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Bloomsbury Hall · Room A-402</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome back, <span className="text-primary">Sarah</span>
            </h1>
            <p className="text-sm text-muted-foreground font-medium">
              Everything is set for your stay. You have 2 new notifications.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl font-semibold text-xs border-border bg-card h-10 px-4">
              Support
            </Button>
            <Button className="rounded-xl font-bold text-xs bg-primary text-primary-foreground shadow-sm h-10 px-5">
              View Digital Key
            </Button>
          </div>
        </div>

        {/* Key Metrics - Simplified */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Rent Balance', value: '£1,240', sub: 'Due in 4 days', icon: Wallet, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Meal Credits', value: '12', sub: 'Reset on Monday', icon: UtensilsCrossed, color: 'text-orange-600', bg: 'bg-orange-50' },
            { label: 'Active Tasks', value: '0', sub: 'All caught up', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Energy Usage', value: 'Optimal', sub: 'Top 10% efficient', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
          ].map((stat, i) => (
            <Card key={i} className="p-5 border-border/50 bg-card rounded-2xl shadow-sm flex flex-col justify-between group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className={cn("p-2 rounded-lg", stat.bg, stat.color)}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
                <p className="text-[10px] font-medium text-muted-foreground mt-1">{stat.sub}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Quick Services Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Laundry', icon: Layers, href: '/dashboard/tenants/laundry' },
                { label: 'Maintenance', icon: Wrench, href: '/dashboard/tenants/maintenance' },
                { label: 'Payments', icon: CreditCard, href: '/dashboard/tenants/invoices' },
                { label: 'Dining', icon: UtensilsCrossed, href: '/dashboard/tenants/meals' },
              ].map((service, i) => (
                <Button key={i} variant="outline" asChild className="flex flex-col items-center justify-center gap-2 h-24 rounded-2xl border-border/50 bg-card hover:bg-muted/50 hover:border-primary/20 transition-all group">
                  <Link href={service.href}>
                    <service.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{service.label}</span>
                  </Link>
                </Button>
              ))}
            </div>

            {/* Activity/Notices Card */}
            <Card className="border-border/50 bg-card rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between bg-muted/20">
                <h3 className="text-xs font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
                  <Bell className="w-4 h-4 text-primary" /> Hall Notices & Activity
                </h3>
                <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase text-muted-foreground h-8">
                  View All
                </Button>
              </div>
              <div className="divide-y divide-border/30">
                {[
                  { title: 'Summer Ball Tickets', desc: 'Early bird tickets now available at reception.', time: '2h ago', tag: 'Event' },
                  { title: 'Wellness Week', desc: 'Join us for morning yoga sessions in the common room.', time: '1d ago', tag: 'Activity' },
                  { title: 'Rent Invoice Generated', desc: 'Your invoice for November is now available.', time: '2d ago', tag: 'Finance' },
                ].map((notice, i) => (
                  <div key={i} className="px-6 py-4 flex items-start gap-4 hover:bg-muted/10 transition-colors cursor-pointer group">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 opacity-40 group-hover:opacity-100" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-sm font-semibold text-foreground">{notice.title}</p>
                        <span className="text-[10px] font-medium text-muted-foreground">{notice.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">{notice.desc}</p>
                    </div>
                    <Badge variant="secondary" className="text-[9px] font-bold uppercase bg-muted text-muted-foreground px-2 py-0 h-5">
                      {notice.tag}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Dining Special */}
            <Card className="p-6 border-border/50 bg-card rounded-2xl shadow-sm flex flex-col md:flex-row items-center gap-6 group hover:border-orange-500/20 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0">
                <UtensilsCrossed className="w-8 h-8" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-[10px] font-bold uppercase tracking-widest text-orange-600 mb-1">Today's Special Selection</p>
                <h4 className="text-xl font-bold text-foreground mb-1">Slow-cooked Beef Bourguignon</h4>
                <p className="text-sm text-muted-foreground">Served with creamed potatoes and glazed carrots from 18:30.</p>
              </div>
              <Button size="sm" className="rounded-xl font-bold text-[10px] uppercase tracking-widest bg-orange-600 text-white hover:bg-orange-700 px-6 h-10">
                Pre-order
              </Button>
            </Card>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Room Controls Card */}
            <Card className="p-6 border-border/50 bg-card rounded-2xl shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">My Residence</h3>
                <Badge className="bg-primary/10 text-primary border-none text-[9px] font-bold px-2 py-0.5 rounded-md">Floor 4</Badge>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold tracking-tighter text-foreground">A-402</span>
                <span className="text-xs font-medium text-muted-foreground">Standard Ensuite</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Temp', val: '22°C', icon: Zap },
                  { label: 'Wi-Fi', val: 'Fast', icon: Activity },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-muted/30 border border-border/50 flex flex-col gap-1">
                    <item.icon className="w-4 h-4 text-primary opacity-70" />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">{item.label}</span>
                    <span className="text-sm font-bold text-foreground">{item.val}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2">Instant Help</h3>
              <div className="grid grid-cols-1 gap-2">
                <Button variant="outline" className="h-14 justify-start gap-4 px-5 rounded-xl border-border/50 bg-card hover:bg-primary/5 hover:border-primary/20 transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-xs uppercase tracking-wider">Call Reception</span>
                </Button>
                <Button variant="outline" className="h-14 justify-start gap-4 px-5 rounded-xl border-border/50 bg-card hover:bg-primary/5 hover:border-primary/20 transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-xs uppercase tracking-wider">Live Support Chat</span>
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <Card className="p-6 border-border/50 bg-card rounded-2xl shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Documents</h3>
              <div className="space-y-3">
                {[
                  'Tenancy Agreement.pdf',
                  'Hall Rules & Safety.pdf',
                  'Insurance Policy.pdf',
                ].map((doc, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-muted/10 p-1 -mx-1 rounded transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-xs font-medium text-foreground group-hover:underline">{doc}</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary transition-all" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return null;
}


