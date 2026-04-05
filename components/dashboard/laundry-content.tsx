'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Waves, AlertTriangle,
  Activity, Zap,
  Settings2, ShieldCheck,
  Droplets, Wind, Bell,
  ArrowUpRight,
  Gauge, Wrench, CalendarCheck,
  Clock, Info, CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { TenantLaundryView } from './laundry/tenant-view';

interface LaundryContentProps {
  title: string;
  tier?: 'normal' | 'pro' | 'premium';
  role?: 'admin' | 'tenant' | 'chef';
}

const utilizationData = [
  { name: '08:00', load: 30 },
  { name: '10:00', load: 45 },
  { name: '12:00', load: 85 },
  { name: '14:00', load: 92 },
  { name: '16:00', load: 78 },
  { name: '18:00', load: 95 },
  { name: '20:00', load: 60 },
];

const machineHealthData = [
  { name: 'M-01', efficiency: 98, color: '#10b981' },
  { name: 'M-02', efficiency: 94, color: '#10b981' },
  { name: 'M-03', efficiency: 72, color: '#f59e0b' },
  { name: 'D-01', efficiency: 96, color: '#10b981' },
  { name: 'D-02', efficiency: 45, color: '#ef4444' },
];

export function LaundryContent({ title, tier = 'normal', role = 'admin' }: LaundryContentProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  // ─── Tenant View ───────────────────────────────────────────────────────────
  if (role === 'tenant') {
    return <TenantLaundryView />;
  }

  // ─── Admin / Owner View ────────────────────────────────────────────────────
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}>
      <div 
        className="space-y-10 pb-20">

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-8 border-b border-border/40">
        <div className="space-y-1">
          <h2 className="text-4xl font-black tracking-tight text-foreground">{title}</h2>
          <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mt-1">
            <span className="flex items-center gap-1.5"><Activity className="w-4 h-4 text-emerald-500" /> IoT Fleet Status: Optimal</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>24 Connected Units • Floor 4 &amp; 5</span>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <Button variant="outline" className="flex-1 lg:flex-none h-12 px-6 rounded-2xl font-bold border-border/40 hover:bg-muted transition-all">
            <Settings2 className="w-4 h-4 mr-2" /> Fleet Config
          </Button>
          <Button className="flex-1 lg:flex-none h-12 px-8 rounded-2xl font-black bg-primary text-white shadow-xl shadow-primary/20">
            Export Logs
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'System Uptime', value: '99.4%', trend: 'Stable', icon: Gauge, color: 'text-primary' },
          { label: 'Active Loads', value: '18 / 24', trend: '75% Util', icon: Waves, color: 'text-emerald-500' },
          { label: 'Maintenance Due', value: '2 Units', trend: 'Priority', icon: Wrench, color: 'text-rose-500' },
          { label: 'Weekly Throughput', value: '412', trend: '+12% Use', icon: Activity, color: 'text-indigo-500' },
        ].map((kpi, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Card className="p-6 border-border/40 bg-card rounded-[2rem] group hover:border-primary/20 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("w-12 h-12 rounded-2xl bg-muted flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-white", kpi.color)}>
                  <kpi.icon className="w-6 h-6" />
                </div>
                <Badge className="bg-muted text-muted-foreground border-none px-3 font-black text-[9px] uppercase tracking-widest">
                  {kpi.trend}
                </Badge>
              </div>
              <p className="text-[10px] font-black uppercase text-muted-foreground/40 tracking-[0.25em] mb-1">{kpi.label}</p>
              <h3 className="text-3xl font-black tracking-tight">{kpi.value}</h3>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

        <div className="lg:col-span-8 space-y-10">
          <Card className="p-8 border-border/40 bg-card rounded-[2.5rem] shadow-sm overflow-hidden">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-xl font-black tracking-tight">Facility Utilization</h3>
                <p className="text-xs font-medium text-muted-foreground">Percentage of machines in use over a 24-hour cycle.</p>
              </div>
              <Button variant="ghost" size="sm" className="font-bold text-xs text-primary">Unit Reports <ArrowUpRight className="w-3 h-3 ml-1" /></Button>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={utilizationData}>
                  <defs>
                    <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888820" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                  <Tooltip
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="load" stroke="var(--primary)" strokeWidth={4} fillOpacity={1} fill="url(#colorLoad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="space-y-6">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xl font-black tracking-tight">Fleet Efficiency Index</h3>
              <Badge variant="outline" className="text-[10px] font-black border-primary/20 text-primary bg-primary/5 uppercase">Real-time IoT Sync</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-8 border-border/40 bg-card rounded-[2.5rem] space-y-8">
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={machineHealthData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888810" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 'bold'}} />
                      <Tooltip cursor={{fill: 'transparent'}} />
                      <Bar dataKey="efficiency" radius={[10, 10, 10, 10]}>
                        {machineHealthData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} opacity={0.8} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-bold">Hardware Performance</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">Unit <span className="text-rose-500 font-bold">D-02</span> is operating at 45% efficiency. Motor sensor indicates critical vibration levels.</p>
                </div>
              </Card>

              <Card className="p-8 border-border/40 bg-primary rounded-[2.5rem] text-primary-foreground space-y-6 relative overflow-hidden shadow-2xl">
                <div className="absolute -bottom-12 -right-12 opacity-10 pointer-events-none rotate-12">
                  <Wrench className="w-48 h-48" />
                </div>
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-white/20 text-white border-none text-[9px] font-black tracking-widest px-2 uppercase">Preventative Task</Badge>
                  </div>
                  <h3 className="text-2xl font-black">Predictive Alert</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4 p-4 rounded-2xl bg-white/10 border border-white/5">
                      <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0" />
                      <p className="text-xs font-medium leading-relaxed">Machine <span className="font-bold">Unit-03</span> heating element is showing high resistance. Failure predicted in <span className="font-bold">12 cycles</span>.</p>
                    </div>
                    <Button className="w-full h-12 bg-white text-primary font-black text-xs rounded-xl shadow-lg border-none hover:bg-slate-100 transition-all">
                      Dispatch Technician
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-10">

          <Card className="p-8 border-border/40 bg-card rounded-[2.5rem] space-y-8">
            <h4 className="text-lg font-black tracking-tight">System Status</h4>
            <div className="space-y-6">
              {[
                { label: 'IoT Gateway', status: 'Online', value: 100, color: 'bg-emerald-500' },
                { label: 'Water Pressure', status: 'Normal', value: 92, color: 'bg-primary' },
                { label: 'Ventilation', status: 'Optimal', value: 85, color: 'bg-emerald-500' },
                { label: 'Energy Load', status: 'Peak', value: 95, color: 'bg-amber-500' },
              ].map((sys, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-muted-foreground">{sys.label}</span>
                    <span className="text-foreground">{sys.status}</span>
                  </div>
                  <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${sys.value}%` }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className={cn("h-full rounded-full", sys.color)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full h-12 rounded-2xl font-bold text-xs border-border/40">Full Diagnostics</Button>
          </Card>

          <Card className="p-0 overflow-hidden rounded-[2.5rem] h-[350px] relative shadow-xl border-none">
            <img
              src="/laundry-facility.jpg"
              className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
              alt="Facility Monitor"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent" />
            <div className="absolute top-6 left-6 flex gap-2">
              <Badge className="bg-emerald-500 text-white border-none text-[8px] font-black px-2 uppercase flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-white animate-pulse" /> Live IoT Feed
              </Badge>
            </div>
            <div className="absolute bottom-8 left-8 right-8 space-y-1 text-white">
              <h4 className="text-xl font-black tracking-tight">Main Facility</h4>
              <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Floor 4 • Unit A-102</p>
              <div className="pt-4 flex gap-4">
                <div className="flex-1 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
                  <p className="text-[8px] font-black uppercase text-white/40 mb-0.5">Temp</p>
                  <p className="text-xs font-bold">22°C</p>
                </div>
                <div className="flex-1 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
                  <p className="text-[8px] font-black uppercase text-white/40 mb-0.5">Loads/Hr</p>
                  <p className="text-xs font-bold">12.4</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Tenant-only info cards removed from admin view */}
          <Card className="p-6 border-border/40 bg-muted/30 rounded-[2rem] space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Bell className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Alerts & Notifications</span>
            </div>
            <div className="space-y-3">
              {[
                { icon: Clock, label: 'Peak Hours', value: '14:00 - 18:00', color: 'text-indigo-500' },
                { icon: Info, label: 'Avg Cycle', value: '45 Minutes', color: 'text-cyan-500' },
                { icon: ShieldCheck, label: 'Last Service', value: 'Yesterday', color: 'text-emerald-500' },
                { icon: CheckCircle2, label: 'Tenant Satisfaction', value: '98.2%', color: 'text-primary' },
                { icon: Droplets, label: 'Water Usage', value: '1.2 kL', color: 'text-blue-500' },
                { icon: Wind, label: 'Energy Load', value: '142 kWh', color: 'text-amber-500' },
                { icon: Zap, label: 'Peak Demand', value: 'High (+15%)', color: 'text-rose-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <item.icon className={cn("w-3.5 h-3.5", item.color)} />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">{item.label}</span>
                  </div>
                  <span className="text-[10px] font-black">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>
      </div>
    </motion.div>
  );
}
