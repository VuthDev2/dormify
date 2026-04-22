'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Waves, AlertTriangle, Activity, Zap, Info, Clock, CheckCircle2,
  Settings2, ShieldCheck, Droplets, ArrowUpRight, Wrench, Wallet,
  CalendarCheck, Monitor, Cpu, RefreshCw, Plus, Download, ChevronRight, BarChart3, Coins
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { TenantLaundryView } from './laundry/tenant-view';

interface LaundryContentProps {
  title: string;
  tier?: 'normal' | 'pro' | 'premium';
  role?: 'admin' | 'tenant' | 'chef';
}

const peakHoursData = [
  { name: '08:00', loads: 12 },
  { name: '10:00', loads: 18 },
  { name: '12:00', loads: 35 },
  { name: '14:00', loads: 42 },
  { name: '16:00', loads: 38 },
  { name: '18:00', loads: 45 },
  { name: '20:00', loads: 30 },
  { name: '22:00', loads: 15 },
];

const revenueData = [
  { name: 'Mon', revenue: 245, status: 'Optimal' },
  { name: 'Tue', revenue: 210, status: 'Optimal' },
  { name: 'Wed', revenue: 195, status: 'Warning' },
  { name: 'Thu', revenue: 310, status: 'Optimal' },
  { name: 'Fri', revenue: 420, status: 'Peak' },
  { name: 'Sat', revenue: 512, status: 'Peak' },
  { name: 'Sun', revenue: 460, status: 'Peak' },
];

export function LaundryContent({ title, tier = 'normal', role = 'admin' }: LaundryContentProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
  };

  const businessStats = useMemo(() => [
    { label: 'Month-to-Date Revenue', value: '$4,240', sub: 'Gross Intake', icon: Wallet, color: 'text-indigo-500', bg: 'from-indigo-400 to-indigo-600', trend: '+14% vs Last Month' },
    { label: 'Machine Uptime', value: '98.5%', sub: 'Global Average', icon: ShieldCheck, color: 'text-emerald-500', bg: 'from-emerald-400 to-emerald-600', trend: 'Stable Operation' },
    { label: 'Active Equipment', value: '22 / 24', sub: 'Washers & Dryers', icon: Waves, color: 'text-blue-500', bg: 'from-blue-400 to-blue-600', trend: 'High Capacity' },
    { label: 'Out of Order', value: '2 Units', sub: 'Requires Maintenance', icon: Wrench, color: 'text-rose-500', bg: 'from-rose-400 to-rose-600', trend: 'Immediate Action' },
  ], []);

  // ─── Tenant View ───────────────────────────────────────────────────────────
  if (role === 'tenant') {
    return <TenantLaundryView />;
  }

  // ─── Admin / Property Manager View ─────────────────────────────────────────
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full space-y-8 pb-12"
    >
      {/* Clean Horizon Header */}
      <motion.div 
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border/30"
      >
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground/50">Services / Laundry Operations</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground/60 font-medium">Fleet revenue, machine health, and utilization analytics.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Button variant="outline" className="h-10 rounded-xl gap-2 font-semibold px-4 border-border/40 hover:bg-muted/30 transition-colors text-sm">
             <Settings2 className="w-4 h-4" /> Settings
          </Button>
          <Button className="h-10 rounded-xl gap-2 font-semibold px-5 bg-foreground text-background shadow-md hover:shadow-lg transition-shadow text-sm">
             <Download className="w-4 h-4" /> Export Report
          </Button>
        </div>
      </motion.div>

      {/* Dynamic KPI Ribbons (Revenue & Up-Time) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {businessStats.map((s, i) => (
          <motion.div 
            variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' } } }}
            key={i} 
            className="group relative p-5 rounded-3xl bg-card/40 backdrop-blur-2xl border border-white/20 dark:border-white/5 shadow-lg overflow-hidden hover:-translate-y-1 transition-all duration-300"
          >
             <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500", s.bg)}></div>
             <div className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2 flex items-center justify-between">
                {s.label} <s.icon className={cn("w-3.5 h-3.5", s.color)} />
             </div>
             <div className="flex items-baseline justify-between mt-1 relative z-10">
                <span className="text-3xl font-black tracking-tighter text-foreground">{s.value}</span>
                <span className={cn("text-[10px] font-black uppercase tracking-wider", s.color)}>{s.trend}</span>
             </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Data Visualizations */}
        <div className="lg:col-span-8 space-y-8">
          
          <Card className="p-8 lg:p-10 border border-white/20 dark:border-white/5 bg-card/40 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-[80px] pointer-events-none" />
             <div className="relative z-10 space-y-10">
                <div className="flex justify-between items-center px-2">
                   <div className="space-y-1">
                      <h3 className="text-xl font-black tracking-tighter uppercase text-foreground">Facility Utilization <span className="text-muted-foreground/30 font-medium">— Peak Hours</span></h3>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">Tracking Daily Load Volumes</p>
                   </div>
                   <Badge className="bg-blue-500/10 text-blue-600 border border-blue-500/20 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-xl">Live Metrics</Badge>
                </div>
                
                <div className="h-[300px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={peakHoursData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorLoads" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888815" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: '800', fill: '#94a3b8'}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: '800', fill: '#94a3b8'}} dx={-10} />
                      <Tooltip
                        contentStyle={{ 
                           borderRadius: '20px', 
                           border: '1px solid var(--border)', 
                           boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', 
                           backgroundColor: 'var(--card)',
                           padding: '16px'
                        }}
                        itemStyle={{ fontSize: '13px', fontWeight: '900', color: '#3b82f6' }}
                        labelStyle={{ fontSize: '10px', fontWeight: '900', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}
                      />
                      <Area type="monotone" dataKey="loads" stroke="#3b82f6" strokeWidth={5} fill="url(#colorLoads)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
             </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Gross Revenue Tracking */}
             <Card className="p-8 border border-white/20 dark:border-white/5 bg-card/40 backdrop-blur-3xl rounded-[2.5rem] shadow-xl space-y-8">
                <div className="flex items-center justify-between">
                   <div className="space-y-1">
                      <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground">Weekly Revenue</h4>
                      <p className="text-[9px] font-bold text-muted-foreground/50 uppercase tracking-widest">Gross Intake ($)</p>
                   </div>
                   <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
                      <BarChart3 className="w-4 h-4" />
                   </div>
                </div>
                <div className="h-[200px] w-[105%] -ml-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888810" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: '800', fill: '#94a3b8'}} dy={10} />
                      <Tooltip cursor={{fill: 'rgba(0,0,0,0.03)'}} contentStyle={{ borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--card)', fontSize: '12px', fontWeight: 'bold', color: 'var(--foreground)' }} />
                      <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                        {revenueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.status === 'Peak' ? '#6366f1' : entry.status === 'Warning' ? '#cbd5e1' : '#818cf8'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
             </Card>

             {/* Out of Order Alerts */}
             <Card className="p-8 border border-rose-500/20 bg-rose-500 rounded-[2.5rem] text-white space-y-6 relative overflow-hidden shadow-2xl shadow-rose-500/20 group">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-1000" />
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white border border-white/10 shadow-inner">
                      <Wrench className="w-5 h-5 animate-pulse" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">Maintenance Alert</span>
                  </div>
                  
                  <div className="space-y-1">
                     <h3 className="text-4xl font-black tracking-tighter">2 Units</h3>
                     <p className="text-[11px] font-black uppercase tracking-widest text-white/70">Currently Out of Order</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md">
                      <p className="text-[11px] font-bold leading-relaxed text-white">
                        <strong className="block mb-1 text-[10px] uppercase tracking-widest text-white/60">Washer W-04</strong>
                        Drainage fault detected. Assigned to Vendor: Flow Plumbing. Expected fix: Today.
                      </p>
                    </div>
                    <Button className="w-full h-12 bg-background text-rose-600 dark:text-rose-400 font-black text-[11px] uppercase tracking-widest rounded-2xl shadow-xl hover:bg-muted transition-all">
                       Track Service Order
                    </Button>
                  </div>
                </div>
             </Card>
          </div>
        </div>

        {/* Right Nav / Registry Sidebar */}
        <div className="lg:col-span-4 space-y-6">
           <Card className="p-8 border border-white/20 dark:border-white/5 bg-card/40 backdrop-blur-3xl rounded-[2.5rem] shadow-xl space-y-8 h-fit">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/50 flex items-center gap-2">
                 <ShieldCheck className="w-4 h-4 text-emerald-500" /> Machine Health Feed
              </h4>
              <div className="space-y-5">
                {[
                  { label: 'Washer W-01', status: 'Optimal', sub: 'Last cycle: 12m ago', color: 'bg-emerald-500' },
                  { label: 'Washer W-02', status: 'Optimal', sub: 'In use (22m left)', color: 'bg-emerald-500' },
                  { label: 'Dryer D-10', status: 'Optimal', sub: 'Available', color: 'bg-emerald-500' },
                  { label: 'Dryer D-12', status: 'Needs Lint Clean', sub: 'Flagged by tenant', color: 'bg-amber-500' },
                  { label: 'Washer W-04', status: 'Out of Order', sub: 'Ticket #MNT-8822', color: 'bg-rose-500' },
                ].map((machine, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-muted/40 transition-all text-left">
                     <div className="flex flex-col gap-1">
                        <span className="text-xs font-black text-foreground uppercase tracking-tight">{machine.label}</span>
                        <span className="text-[9px] font-bold text-muted-foreground/60">{machine.sub}</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{machine.status}</span>
                        <div className={cn("w-2 h-2 rounded-full shadow-[0_0_8px]", machine.color, "shadow-"+machine.color.split('-')[1]+"-500")}></div>
                     </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full h-12 rounded-2xl font-black text-[10px] uppercase tracking-widest border-border/40 bg-muted/30 backdrop-blur-xl shadow-sm hover:bg-muted/50 transition-all">
                 View Full Logistics
              </Button>
           </Card>

           <Card className="p-8 border border-white/20 dark:border-white/5 bg-card/40 backdrop-blur-3xl rounded-[2.5rem] shadow-xl space-y-6">
             <div className="flex items-center gap-2 text-foreground">
               <Coins className="w-4 h-4 text-emerald-500" />
               <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Revenue Logistics</span>
             </div>
             <div className="space-y-2">
               {[
                 { icon: Clock, label: 'Average Wash Cycle', value: '$3.50', color: 'text-emerald-500' },
                 { icon: RefreshCw, label: 'Average Dry Cycle', value: '$2.00', color: 'text-blue-500' },
                 { icon: CheckCircle2, label: 'Digital Payments', value: '92.4%', color: 'text-indigo-500' },
                 { label: 'Refund Claims (MTD)', value: '$12.50', color: 'text-rose-500', isRefund: true },
               ].map((item, i) => (
                 <div key={i} className={cn("flex items-center justify-between p-4 rounded-xl transition-all", item.isRefund ? "bg-rose-500/5 hover:bg-rose-500/10" : "hover:bg-muted/40")}>
                   <div className="flex items-center gap-3">
                     {item.icon && <item.icon className={cn("w-4 h-4", item.color)} />}
                     <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">{item.label}</span>
                   </div>
                   <span className={cn("text-[11px] font-black", item.isRefund ? "text-rose-600" : "text-foreground")}>{item.value}</span>
                 </div>
               ))}
             </div>
           </Card>
        </div>
      </div>
    </motion.div>
  );
}
