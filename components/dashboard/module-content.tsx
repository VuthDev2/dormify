'use client';

import {
  Users, Building2, TrendingUp, CreditCard, Utensils, FileText,
  PieChart, ShieldCheck, Search, Plus, ArrowRight, AlertCircle,
  Activity, Globe, Wallet, Zap, MapPin, Cpu, Shield, Receipt,
  ArrowUpRight, ArrowDownRight, BarChart3, DollarSign, Clock,
  CheckCircle2, AlertTriangle, RefreshCcw, Target, Calendar,
  MoreHorizontal, ChevronRight, Download, SprayCan
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { DataTable } from './data-table';
import { PropertyGrid } from './property-grid';
import { RoomsManagement } from './rooms-management';
import { FinanceLedger } from './finance-ledger';
import { MaintenanceContent } from './maintenance-content';
import { MealsContent } from './meals-content';
import { LaundryContent } from './laundry-content';
import { SettingsContent } from './settings-content';
import { IntegrationsContent } from './integrations-content';
import { StaffContent } from './staff-content';

interface ModuleContentProps {
  title: string;
  type: 'residents' | 'rooms' | 'meals' | 'payments' | 'analytics' | 'staff' | 'reports' | 'dorms' | 'properties' | 'billing' | 'revenue' | 'audit-log' | 'integrations' | 'maintenance' | 'laundry' | 'settings';
  tier?: 'normal' | 'pro' | 'premium';
  role?: 'admin' | 'tenant' | 'chef';
}

export function ModuleContent({ title, type, tier = 'normal', role = 'admin' }: ModuleContentProps) {
  const isPremium = tier === 'premium';
  const isNormal = tier === 'normal';

  if (type === 'laundry') {
    return <LaundryContent title={title} tier={tier} role={role} />;
  }

  if (type === 'meals') {
    return <MealsContent title={title} tier={tier} role={role} />;
  }

  if (type === 'integrations') {
    return <IntegrationsContent title={title} tier={tier} role={role} />;
  }

  if (type === 'staff') {
    return <StaffContent tier={tier} />;
  }

  if (type === 'residents') {
    const data = [
      { name: 'Sarah Johnson', email: 'sarah@university.edu', room: 'A-402', phone: '+44 7700 900123', status: 'Active' },
      { name: 'Michael Chen', email: 'mchen@university.edu', room: 'B-102', phone: '+44 7700 900124', status: 'Active' },
      { name: 'Emma Wilson', email: 'ewilson@university.edu', room: 'C-305', phone: '+44 7700 900125', status: 'Pending' },
      { name: 'James Porter', email: 'jporter@university.edu', room: 'D-201', phone: '+44 7700 900126', status: 'Active' },
      { name: 'Olivia Martinez', email: 'omartinez@university.edu', room: 'A-103', phone: '+44 7700 900127', status: 'Active' },
    ];

    const stats = {
      total: data.length,
      active: data.filter(r => r.status === 'Active').length,
      pending: data.filter(r => r.status === 'Pending').length,
    };

    const columns = [
      {
        header: 'Resident',
        accessor: 'name',
        cell: (item: any) => (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-[10px]">{item.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-bold text-foreground/90">{item.name}</span>
          </div>
        )
      },
      { header: 'Room', accessor: 'room' },
      { header: 'Email', accessor: 'email' },
      { header: 'Phone', accessor: 'phone' },
      {
        header: 'Status',
        accessor: 'status',
        cell: (item: any) => (
          <Badge className={cn(
            "text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border-none",
            item.status === 'Active' ? "bg-emerald-500/10 text-emerald-600" : 
            item.status === 'Pending' ? "bg-amber-500/10 text-amber-600" : "bg-muted text-muted-foreground"
          )}>{item.status}</Badge>
        )
      },
    ];

    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 border-border/40 bg-card rounded-xl">
            <div className="space-y-2">
              <p className="text-[9px] font-black uppercase text-muted-foreground/40">Total</p>
              <p className="text-2xl font-black">{stats.total}</p>
            </div>
          </Card>
          <Card className="p-4 border-border/40 bg-card rounded-xl">
            <div className="space-y-2">
              <p className="text-[9px] font-black uppercase text-muted-foreground/40">Active</p>
              <p className="text-2xl font-black text-emerald-600">{stats.active}</p>
            </div>
          </Card>
          <Card className="p-4 border-border/40 bg-card rounded-xl">
            <div className="space-y-2">
              <p className="text-[9px] font-black uppercase text-muted-foreground/40">Pending</p>
              <p className="text-2xl font-black text-amber-600">{stats.pending}</p>
            </div>
          </Card>
        </div>

        {/* Residents Table */}
        <DataTable title={title} description="Directory of residents. Manage contacts, rooms, and account status." columns={columns} data={data} tier={tier} actionLabel="Add Resident" />
      </div>
    );
  }

  if (type === 'audit-log') {
    const columns = [
      {
        header: 'Entity',
        accessor: 'name',
        cell: (item: any) => (
          <div className="flex items-center gap-3">
            <Avatar className={cn("h-8 w-8", isNormal ? "rounded-lg" : "")}>
              <AvatarFallback className="bg-muted text-muted-foreground font-bold text-[10px]">{item.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-bold text-foreground/80">{item.name}</span>
          </div>
        )
      },
      { header: 'Event', accessor: 'subtext' },
      {
        header: 'Status',
        accessor: 'status',
        cell: (item: any) => (
          <Badge className={cn(
            "text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border-none",
            item.status === 'Active' || item.status === 'Live' || item.status === 'Paid' ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
          )}>{item.status}</Badge>
        )
      },
      ...(!isNormal ? [{ header: 'Reference', accessor: 'ref' }] : []),
    ];

    const data = [
      { name: 'Sarah Johnson', subtext: 'Login', status: 'Active', ref: '#LOG-8820' },
      { name: 'Michael Chen', subtext: 'Room Update', status: 'Active', ref: '#LOG-8821' },
      { name: 'Emma Wilson', subtext: 'Payment', status: 'Pending', ref: '#LOG-8822' },
    ];

    return <DataTable title={title} description={isNormal ? `Audit log for ${type}.` : `Manage your ${type} with real-time sync.`} columns={columns} data={data} tier={tier} />;
  }

  if (type === 'dorms' || type === 'properties') {
    const dorms = [
      {
        name: 'Bloomsbury Hall',
        campus: 'North Campus',
        occupancy: '98%',
        yield: '£42.5k',
        status: 'Optimal',
        tickets: 2,
        systems: { power: 'ok', water: 'ok', security: 'ok', wifi: 'issue' },
        units: 120,
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=800'
      },
      {
        name: 'Borough Wing',
        campus: 'South Campus',
        occupancy: '82%',
        yield: '£31.2k',
        status: 'Review',
        tickets: 8,
        systems: { power: 'ok', water: 'alert', security: 'ok', wifi: 'ok' },
        units: 85,
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800'
      },
      {
        name: 'Paddington Court',
        campus: 'East Campus',
        occupancy: '94%',
        yield: '£38.9k',
        status: 'Optimal',
        tickets: 0,
        systems: { power: 'ok', water: 'ok', security: 'ok', wifi: 'ok' },
        units: 110,
        image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800'
      },
    ];

    return (
      <div className="space-y-4 animate-in fade-in duration-700">
        <div className="flex justify-between items-end border-b border-border/40 pb-4">
           <div className="space-y-0.5">
              <h1 className="text-2xl font-black tracking-tight text-foreground">Campus <span className="text-muted-foreground/30">Assets</span></h1>
              <p className="text-xs text-muted-foreground font-medium">Portfolio oversight and infrastructure control.</p>
           </div>
           <Button className="rounded-xl h-9 px-4 font-black bg-primary text-primary-foreground shadow-lg shadow-primary/20 text-[11px]">Add Asset</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {dorms.map((dorm, i) => (
             <Card key={i} className="group overflow-hidden border-border/40 bg-card rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
                <div className="h-40 relative overflow-hidden">
                   <img src={dorm.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                   <div className="absolute inset-0 bg-black/40" />
                   <div className="absolute bottom-4 left-6">
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">{dorm.campus}</p>
                      <h3 className="text-xl font-black text-white">{dorm.name}</h3>
                   </div>
                </div>
                <div className="p-6 space-y-6">
                   <div className="flex justify-between text-center">
                      <div><p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">Occupancy</p><p className="text-sm font-black">{dorm.occupancy}</p></div>
                      <div><p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">Yield</p><p className="text-sm font-black">{dorm.yield}</p></div>
                      <div><p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">Status</p><Badge variant="outline" className="text-[9px] border-border">{dorm.status}</Badge></div>
                   </div>
                   <Button variant="outline" className="w-full h-10 rounded-xl font-bold text-xs uppercase tracking-widest">Manage building</Button>
                </div>
             </Card>
           ))}
        </div>
      </div>
    );
  }

  if (type === 'payments') {
    const transactions: any[] = [
      { id: 'TX-8820', user: 'Sarah Johnson', amount: '£1,240', type: 'Credit', status: 'Completed', date: 'Mar 24, 2026' },
      { id: 'TX-8821', user: 'Michael Chen', amount: '£850', type: 'Credit', status: 'Completed', date: 'Mar 23, 2026' },
      { id: 'TX-8822', user: 'Emma Wilson', amount: '£1,100', type: 'Credit', status: 'Pending', date: 'Mar 22, 2026' },
      { id: 'TX-8823', user: 'Maintenance', amount: '£420', type: 'Debit', status: 'Completed', date: 'Mar 20, 2026' },
      { id: 'TX-8824', user: 'Utility Corp', amount: '£1,150', type: 'Debit', status: 'Failed', date: 'Mar 18, 2026' },
    ];

    const stats = [
      { label: 'Total Revenue', value: '£42,850', sub: '+12% from last month', icon: TrendingUp, color: 'text-success' },
      { label: 'Pending', value: '£3,120', sub: '4 invoices awaiting', icon: Clock, color: 'text-warning' },
      { label: 'Avg Payment', value: '£942', sub: 'Per resident/mo', icon: DollarSign, color: 'text-primary' },
    ];

    return (
      <div className="space-y-4 animate-in fade-in duration-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className="p-5 border-border/40 bg-card rounded-xl space-y-3 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div className={cn("p-1.5 rounded-lg bg-muted/30", stat.color)}>
                  <stat.icon className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-black uppercase text-muted-foreground/40 tracking-widest">{stat.label}</span>
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tight">{stat.value}</h3>
                <p className="text-[9px] font-bold text-muted-foreground mt-0.5 uppercase">{stat.sub}</p>
              </div>
            </Card>
          ))}
        </div>
        <FinanceLedger title="Transaction History" transactions={transactions} tier={tier} />
      </div>
    );
  }

  if (type === 'billing') {
    const billingStats = [
      { label: 'Active Cycles', value: '3', sub: 'Nov Rent, Dec Rent, Q4 Utils', icon: RefreshCcw, color: 'text-primary' },
      { label: 'Total Outstanding', value: '£18.4k', sub: 'Across 12 accounts', icon: AlertTriangle, color: 'text-warning' },
      { label: 'Collection Rate', value: '98.2%', sub: 'Last 30 days', icon: CheckCircle2, color: 'text-success' },
    ];

    const cycles = [
      { name: 'December Rent', date: 'Dec 01, 2025', progress: 82, total: '£142.5k', collected: '£116.8k', issued: 124, paid: 102 },
      { name: 'November Rent', date: 'Nov 01, 2025', progress: 100, total: '£142.5k', collected: '£142.5k', issued: 124, paid: 124 },
      { name: 'Utilities Q4', date: 'Oct 15, 2025', progress: 65, total: '£24.2k', collected: '£15.7k', issued: 124, paid: 81 },
    ];

    return (
      <div className="space-y-6 animate-in fade-in duration-700">
        <div className="flex justify-between items-center border-b border-border/40 pb-4">
           <div className="space-y-0.5">
              <h2 className="text-2xl font-black tracking-tight">Billing <span className="text-muted-foreground/30">Operations</span></h2>
              <p className="text-muted-foreground font-medium text-[11px]">Automate and track your collection cycles.</p>
           </div>
           <Button className="rounded-xl h-9 px-4 font-black bg-primary text-white shadow-lg shadow-primary/20 text-[11px]">
              <Plus className="w-4 h-4 mr-1.5" /> New Cycle
           </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {billingStats.map((stat, i) => (
            <Card key={i} className="p-4 border-border/40 bg-card rounded-xl space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div className={cn("p-1.5 rounded-lg bg-muted/30", stat.color)}>
                  <stat.icon className="w-4.5 h-4.5" />
                </div>
                <span className="text-[9px] font-black uppercase text-muted-foreground/40 tracking-widest">{stat.label}</span>
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tight">{stat.value}</h3>
                <p className="text-[9px] font-bold text-muted-foreground mt-0.5 uppercase">{stat.sub}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
           <h3 className="text-xl font-black tracking-tight px-1">Active & Recent Cycles</h3>
           <div className="grid md:grid-cols-3 gap-8">
              {cycles.map((c, i) => (
                <Card key={i} className="group p-8 border-border/40 bg-card rounded-[2rem] space-y-8 hover:shadow-xl transition-all">
                   <div className="flex justify-between items-start">
                      <div className="space-y-1">
                         <p className="text-[10px] font-black uppercase text-primary tracking-widest">{c.date}</p>
                         <h3 className="text-2xl font-black leading-tight">{c.name}</h3>
                      </div>
                      <Badge className={cn(
                         "border-none text-[10px] font-black px-2.5 py-1",
                         c.progress === 100 ? "bg-success/10 text-success" : "bg-primary/10 text-primary"
                      )}>
                         {c.total}
                      </Badge>
                   </div>

                   <div className="space-y-4">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                         <span className="text-muted-foreground">Collection Progress</span>
                         <span className="text-foreground">{c.progress}%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                         <div className={cn("h-full transition-all duration-1000", c.progress === 100 ? "bg-success" : "bg-primary")} style={{ width: `${c.progress}%` }} />
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4 border-y border-border/20 py-4">
                      <div className="text-center">
                         <p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">Paid / Issued</p>
                         <p className="text-sm font-black text-foreground">{c.paid} <span className="text-muted-foreground/30">/ {c.issued}</span></p>
                      </div>
                      <div className="text-center border-l border-border/20">
                         <p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">Collected</p>
                         <p className="text-sm font-black text-success">{c.collected}</p>
                      </div>
                   </div>

                   <Button variant="outline" className="w-full h-12 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] group-hover:bg-primary group-hover:text-white transition-all">
                      Manage Cycle <ChevronRight className="w-3 h-3 ml-2" />
                   </Button>
                </Card>
              ))}
           </div>
        </div>
      </div>
    );
  }

  if (type === 'revenue') {
    const revenueStats = [
      { label: 'Gross Revenue', value: '£842.5k', change: '+12.4%', up: true, icon: DollarSign, trend: [40, 50, 45, 60, 55, 70] },
      { label: 'Net Profit', value: '£612.2k', change: '+8.1%', up: true, icon: TrendingUp, trend: [30, 40, 35, 50, 45, 60] },
      { label: 'Avg. Rev/Unit', value: '£942', change: '-2.4%', up: false, icon: Target, trend: [50, 48, 52, 49, 47, 46] },
    ];

    const recentEvents = [
      { id: 'REV-901', source: 'Room Rental (RM-102)', amount: '£850.00', date: 'Today, 10:42', type: 'Credit' },
      { id: 'REV-900', source: 'Service Fee (Laundry)', amount: '£12.50', date: 'Today, 09:15', type: 'Credit' },
      { id: 'REV-899', source: 'Meal Plan (Premium)', amount: '£320.00', date: 'Yesterday', type: 'Credit' },
    ];

    return (
      <div className="space-y-6 animate-in fade-in duration-700">
        <div className="flex justify-between items-center border-b border-border/40 pb-4">
           <div className="space-y-0.5">
              <h2 className="text-2xl font-black tracking-tight">Financial <span className="text-muted-foreground/30">Intelligence</span></h2>
              <p className="text-muted-foreground font-medium text-[11px]">Revenue tracking and performance analytics.</p>
           </div>
           <div className="flex gap-2">
              <Button variant="outline" className="rounded-xl font-bold text-[9px] uppercase tracking-widest h-9 px-3 border-border/40 hover:bg-muted/50">
                 <Download className="w-3.5 h-3.5 mr-1.5" /> Export
              </Button>
              <Button className="rounded-xl font-bold text-[9px] uppercase tracking-widest h-9 px-4 bg-primary text-white shadow-lg shadow-primary/20">
                 View Reports
              </Button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           {revenueStats.map((stat, i) => (
             <Card key={i} className="p-6 border-border/40 bg-card rounded-2xl space-y-4 shadow-sm hover:shadow-xl transition-all group">
                <div className="flex items-center justify-between">
                   <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <stat.icon className="w-5 h-5" />
                   </div>
                   <div className={cn(
                      "flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-full",
                      stat.up ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                   )}>
                      {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {stat.change}
                   </div>
                </div>
                <div className="space-y-0.5">
                   <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">{stat.label}</p>
                   <h3 className="text-3xl font-black">{stat.value}</h3>
                </div>
                <div className="h-6 flex items-end gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                   {stat.trend.map((h, j) => (
                      <div key={j} className="flex-1 bg-primary rounded-t-sm" style={{ height: `${h}%` }} />
                   ))}
                </div>
             </Card>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <Card className="lg:col-span-2 p-10 border-border/40 bg-card rounded-[2.5rem] space-y-10">
              <div className="flex justify-between items-center">
                 <div>
                    <h3 className="text-xl font-black tracking-tight">Revenue Stream</h3>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Monthly projection vs actual</p>
                 </div>
                 <div className="flex gap-4">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /><span className="text-[9px] font-black uppercase text-muted-foreground">Actual</span></div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-muted" /><span className="text-[9px] font-black uppercase text-muted-foreground">Projection</span></div>
                 </div>
              </div>
              <div className="h-[250px] w-full flex items-end gap-6 pb-8 border-b border-border/20">
                 {[40, 55, 45, 80, 60, 95, 85].map((h, i) => (
                   <div key={i} className="flex-1 flex flex-col justify-end gap-2 h-full group/bar">
                      <div className="w-full bg-primary/10 rounded-t-xl group-hover/bar:bg-primary/20 transition-all relative" style={{ height: `${h}%` }}>
                         <div className="absolute top-0 left-0 w-full bg-primary rounded-t-xl" style={{ height: '70%' }} />
                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background px-2 py-1 rounded text-[8px] font-black opacity-0 group-hover/bar:opacity-100 transition-all whitespace-nowrap">£{(h*8)}k</div>
                      </div>
                      <span className="text-[9px] font-black text-center text-muted-foreground/30">WEEK {i+1}</span>
                   </div>
                 ))}
              </div>
           </Card>

           <Card className="p-8 border-border/40 bg-card rounded-[2.5rem] space-y-8">
              <h3 className="text-xl font-black tracking-tight">Income Mix</h3>
              <div className="space-y-6">
                 {[
                    { label: 'Lease Agreements', percent: 72, color: 'bg-primary' },
                    { label: 'Hospitality', percent: 18, color: 'bg-primary/60' },
                    { label: 'Facility Fees', percent: 10, color: 'bg-primary/30' },
                 ].map((item, i) => (
                    <div key={i} className="space-y-3">
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.label}</span>
                          <span className="text-sm font-black">{item.percent}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full", item.color)} style={{ width: `${item.percent}%` }} />
                       </div>
                    </div>
                 ))}
              </div>
              <div className="pt-6 border-t border-border/20">
                 <div className="p-4 rounded-2xl bg-muted/30 border border-border/10 space-y-2">
                    <div className="flex items-center gap-2 text-primary">
                       <Activity className="w-3 h-3" />
                       <span className="text-[9px] font-black uppercase tracking-widest">Yield Insight</span>
                    </div>
                    <p className="text-[11px] font-medium text-muted-foreground leading-relaxed">
                       Hospitality revenue is up <span className="text-foreground font-bold">12%</span> this week due to increased laundry service adoption.
                    </p>
                 </div>
              </div>
           </Card>
        </div>

        <Card className="border-border/40 bg-card rounded-[2.5rem] overflow-hidden shadow-sm">
           <div className="p-8 border-b border-border/20 flex justify-between items-center">
              <h3 className="text-xl font-black tracking-tight">Recent Revenue Events</h3>
              <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-primary">View All</Button>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-muted/20">
                       <th className="p-6 text-[9px] font-black uppercase tracking-widest text-muted-foreground">Source</th>
                       <th className="p-6 text-[9px] font-black uppercase tracking-widest text-muted-foreground text-center">Reference</th>
                       <th className="p-6 text-[9px] font-black uppercase tracking-widest text-muted-foreground text-center">Date</th>
                       <th className="p-6 text-[9px] font-black uppercase tracking-widest text-muted-foreground text-right">Amount</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-border/10">
                    {recentEvents.map((ev, i) => (
                       <tr key={i} className="group hover:bg-muted/5 transition-colors cursor-pointer">
                          <td className="p-6">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center text-success">
                                   <ArrowDownRight className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-bold text-foreground">{ev.source}</span>
                             </div>
                          </td>
                          <td className="p-6 text-center text-xs font-mono text-muted-foreground/60">{ev.id}</td>
                          <td className="p-6 text-center text-[10px] font-black text-muted-foreground/40 uppercase">{ev.date}</td>
                          <td className="p-6 text-right font-black text-success">{ev.amount}</td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </Card>
      </div>
    );
  }

  if (type === 'analytics') {
    const stats = [
      { label: 'Occupancy', value: '94%', change: '+2.1%', up: true },
      { label: 'Yield', value: '£42.5k', change: '+5.4%', up: true },
      { label: 'Waitlist', value: '18', change: '-2', up: false },
    ];

    return (
      <div className="space-y-6 animate-in fade-in duration-700">
        <div className="flex justify-between items-center border-b border-border/40 pb-4">
           <h2 className="text-2xl font-black tracking-tight">System <span className="text-muted-foreground/30">Analytics</span></h2>
           <Badge variant="outline" className="rounded-full px-3 py-0.5 text-[9px] font-black uppercase tracking-widest">{tier} engine</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           {stats.map((stat, i) => (
             <Card key={i} className="p-5 border-border/40 bg-card rounded-xl space-y-2">
                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                <div className="flex items-end justify-between">
                   <h3 className="text-2xl font-black">{stat.value}</h3>
                   <div className={cn("flex items-center gap-1 text-[9px] font-black", stat.up ? "text-success" : "text-destructive")}>
                      {stat.up ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
                      {stat.change}
                   </div>
                </div>
             </Card>
           ))}
        </div>
        <Card className="p-10 border-border/40 bg-card rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-6 h-64 border-dashed border-2">
           <div className="w-16 h-16 rounded-2xl bg-muted/30 flex items-center justify-center text-muted-foreground/20"><PieChart className="w-8 h-8" /></div>
           <div className="space-y-2">
              <h4 className="font-black text-xl">Detailed Visuals</h4>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">Full visual reporting and trend analysis is available in Pro and Premium tiers.</p>
           </div>
           {!isNormal ? <Button className="rounded-xl font-black text-xs uppercase tracking-widest">Generate Report</Button> : null}
        </Card>
      </div>
    );
  }

  if (type === 'reports') {
    const reports = [
      { name: 'Monthly Financial Summary', date: 'Mar 01, 2026', size: '1.2 MB', type: 'PDF' },
      { name: 'Occupancy Analysis', date: 'Feb 28, 2026', size: '2.4 MB', type: 'XLSX' },
      { name: 'Maintenance Log', date: 'Feb 25, 2026', size: '0.8 MB', type: 'PDF' },
    ];

    return (
      <div className="space-y-6 animate-in fade-in duration-700">
        <div className="flex justify-between items-center border-b border-border/40 pb-4">
           <h2 className="text-2xl font-black tracking-tight">System <span className="text-muted-foreground/30">Reports</span></h2>
           <Button className="rounded-xl h-9 px-4 font-black bg-primary text-white shadow-lg shadow-primary/20 text-[11px]">Schedule Report</Button>
        </div>
        <div className="grid gap-2">
           {reports.map((report, i) => (
             <Card key={i} className="p-4 border-border/40 bg-card rounded-xl flex items-center justify-between hover:bg-muted/10 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-lg bg-muted/30 flex items-center justify-center text-muted-foreground/40"><FileText className="w-5 h-5" /></div>
                   <div>
                      <h3 className="font-bold text-foreground/80 text-sm">{report.name}</h3>
                      <p className="text-[9px] font-bold text-muted-foreground uppercase">{report.date} • {report.size}</p>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <Badge variant="outline" className="text-[8px] font-black uppercase px-1.5">{report.type}</Badge>
                   <Button variant="ghost" size="icon" className="rounded-lg h-8 w-8"><ArrowDownRight className="w-3.5 h-3.5" /></Button>
                </div>
             </Card>
           ))}
        </div>
      </div>
    );
  }

  if (type === 'rooms') {
    const rooms = [
      { id: '101', name: '101', type: 'Studio', status: 'Occupied', housekeeping: 'Clean', maintenance: 'none', resident: 'Sarah Jenkins', rent: '£1,100', floor: 'Floor 1', lastChecked: '10:30 AM' },
      { id: '102', name: '102', type: 'Standard', status: 'Vacant', housekeeping: 'Dirty', maintenance: 'none', resident: undefined, rent: '£850', floor: 'Floor 1', lastChecked: 'Yesterday' },
      { id: '103', name: '103', type: 'Standard', status: 'Vacant', housekeeping: 'Inspected', maintenance: 'issue', resident: undefined, rent: '£850', floor: 'Floor 1', lastChecked: '09:15 AM' },
      { id: '201', name: '201', type: 'Suite', status: 'Occupied', housekeeping: 'Clean', maintenance: 'none', resident: 'David Lawson', rent: '£1,450', floor: 'Floor 2', lastChecked: '08:45 AM' },
      { id: '202', name: '202', type: 'Standard', status: 'Arriving', housekeeping: 'Dirty', maintenance: 'none', resident: 'Marcus Reade', rent: '£850', floor: 'Floor 2', lastChecked: '11:20 AM' },
      { id: '203', name: '203', type: 'Standard', status: 'Departing', housekeeping: 'Clean', maintenance: 'none', resident: 'Emma Wilson', rent: '£850', floor: 'Floor 2', lastChecked: '07:30 AM' },
      { id: '301', name: '301', type: 'Studio', status: 'Vacant', housekeeping: 'Maintenance', maintenance: 'alert', resident: undefined, rent: '£1,100', floor: 'Floor 3', lastChecked: 'Just now' },
      { id: '302', name: '302', type: 'Standard', status: 'Occupied', housekeeping: 'Clean', maintenance: 'none', resident: 'James Bond', rent: '£850', floor: 'Floor 3', lastChecked: '06:00 AM' },
      // Extended data for testing with many rooms
      { id: '304', name: '304', type: 'Standard', status: 'Occupied', housekeeping: 'Clean', maintenance: 'none', resident: 'Lisa Anderson', rent: '£850', floor: 'Floor 3', lastChecked: '05:15 AM' },
      { id: '305', name: '305', type: 'Studio', status: 'Vacant', housekeeping: 'Dirty', maintenance: 'none', resident: undefined, rent: '£1,100', floor: 'Floor 3', lastChecked: 'Yesterday' },
      { id: '401', name: '401', type: 'Suite', status: 'Occupied', housekeeping: 'Clean', maintenance: 'none', resident: 'Tom Bradley', rent: '£1,450', floor: 'Floor 4', lastChecked: '10:00 AM' },
      { id: '402', name: '402', type: 'Standard', status: 'Vacant', housekeeping: 'Inspected', maintenance: 'issue', resident: undefined, rent: '£850', floor: 'Floor 4', lastChecked: 'Just now' },
      { id: '403', name: '403', type: 'Standard', status: 'Occupied', housekeeping: 'Clean', maintenance: 'none', resident: 'Rachel Green', rent: '£850', floor: 'Floor 4', lastChecked: '09:30 AM' },
      { id: '404', name: '404', type: 'Maintenance', status: 'Maintenance', housekeeping: 'Maintenance', maintenance: 'alert', resident: undefined, rent: '£0', floor: 'Floor 4', lastChecked: 'In Progress' },
      { id: '405', name: '405', type: 'Standard', status: 'Arriving', housekeeping: 'Dirty', maintenance: 'none', resident: 'Noah Jackson', rent: '£850', floor: 'Floor 4', lastChecked: 'Today' },
      { id: '501', name: '501', type: 'Studio', status: 'Occupied', housekeeping: 'Clean', maintenance: 'none', resident: 'Sophie Turner', rent: '£1,100', floor: 'Floor 5', lastChecked: '08:20 AM' },
      { id: '502', name: '502', type: 'Standard', status: 'Vacant', housekeeping: 'Clean', maintenance: 'none', resident: undefined, rent: '£850', floor: 'Floor 5', lastChecked: 'Yesterday' },
      { id: '503', name: '503', type: 'Standard', status: 'Occupied', housekeeping: 'Clean', maintenance: 'issue', resident: 'Alex Morgan', rent: '£850', floor: 'Floor 5', lastChecked: '07:45 AM' },
    ];

    return <RoomsManagement title={title} description="Comprehensive room management with filtering, search, and multiple view modes" rooms={rooms as any} tier={tier} />;
  }

  if (type === 'settings') {
    return <SettingsContent title={title} tier={tier} />;
  }

  if (type === 'maintenance') return <MaintenanceContent title={title} tier={tier} />;

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b border-border/40 pb-10">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight">{title}</h2>
          <p className="text-sm font-medium text-muted-foreground">Standard operational node.</p>
        </div>
        <Button className="rounded-xl bg-primary text-white">Add Request</Button>
      </div>
      <Card className="p-20 border-dashed border-2 border-border/40 bg-muted/30 flex flex-col items-center justify-center text-center space-y-4 rounded-[2.5rem]">
         <div className="w-16 h-16 rounded-2xl bg-card flex items-center justify-center text-muted-foreground/20 border border-border/40"><FileText className="w-8 h-8" /></div>
         <p className="text-foreground font-bold">No records found</p>
         <Button variant="outline" className="rounded-xl text-[10px] font-black uppercase">Refresh system</Button>
      </Card>
    </div>
  );
}
