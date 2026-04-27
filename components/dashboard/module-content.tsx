'use client';

import {
  Users, Building2, TrendingUp, CreditCard, Utensils, FileText,
  PieChart, ShieldCheck, Search, Plus, ArrowRight, AlertCircle,
  Activity, Globe, Wallet, Zap, MapPin, Cpu, Shield, Receipt,
  ArrowUpRight, ArrowDownRight, BarChart3, DollarSign, Clock,
  CheckCircle2, AlertTriangle, RefreshCcw, Target, Calendar,
  MoreHorizontal, ChevronRight, Download, SprayCan, Sparkles, History,
  Filter, Boxes, Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { DataTable } from './data-table';
import { PropertyGrid } from './property-grid';
import { RoomsManagement, Room } from './rooms-management';
import { FinanceLedger } from './finance-ledger';
import { MaintenanceContent } from './maintenance-content';
import { MealsContent } from './meals-content';
import { LaundryContent } from './laundry-content';
import { SettingsContent } from './settings-content';
import { IntegrationsContent } from './integrations-content';
import { StaffContent } from './staff-content';
import { InventoryContent } from './inventory-content';
import { FeedbackContent } from './feedback-content';
import { EfficiencyRadarChart, DualBarComparisonChart } from './charts';
import { ResidentsManagement, Resident } from './residents-management';
import { PropertiesContent } from './properties-content';
import { FinanceContent } from './finance-content';
import { useModal } from '@/contexts/modal-context';
import { ActionPlaceholderContent } from '@/components/modal-contents';

import { FinanceHub } from './finance-hub';

const realisticResidents: Resident[] = [
  { 
    id: 'RES-8820', 
    name: 'Sarah Johnson', 
    email: 'sarah.j@university.edu', 
    room: 'A-402', 
    floor: '4', 
    phone: '+44 7700 900123', 
    status: 'Active', 
    joinDate: 'Sept 2024', 
    leaseEnd: 'Aug 2026', 
    paymentStatus: 'Paid',
    university: 'NYU',
    course: 'MSc Data Science & AI',
    nationality: 'American'
  },
  { 
    id: 'RES-8821', 
    name: 'Michael Chen', 
    email: 'mchen@imperial.ac.uk', 
    room: 'B-102', 
    floor: '1', 
    phone: '+44 7700 900124', 
    status: 'Active', 
    joinDate: 'Sept 2024', 
    leaseEnd: 'Aug 2025', 
    paymentStatus: 'Paid',
    university: 'Columbia University',
    course: 'BEng Robotic Systems',
    nationality: 'Singaporean'
  },
  { 
    id: 'RES-8822', 
    name: 'Emma Wilson', 
    email: 'ewilson@lse.ac.uk', 
    room: 'C-305', 
    floor: '3', 
    phone: '+44 7700 900125', 
    status: 'Pending', 
    joinDate: 'Oct 2024', 
    leaseEnd: 'Sept 2026', 
    paymentStatus: 'Pending',
    university: 'Princeton',
    course: 'BSc International Relations',
    nationality: 'Canadian'
  },
  { 
    id: 'RES-8823', 
    name: 'James Porter', 
    email: 'jporter@kcl.ac.uk', 
    room: 'D-201', 
    floor: '2', 
    phone: '+44 7700 900126', 
    status: 'Active', 
    joinDate: 'Sept 2023', 
    leaseEnd: 'Aug 2026', 
    paymentStatus: 'Paid',
    university: 'Harvard',
    course: 'LLB Law / Global Ethics',
    nationality: 'American'
  },
  { 
    id: 'RES-8824', 
    name: 'Olivia Martinez', 
    email: 'omartinez@arts.ac.uk', 
    room: 'A-103', 
    floor: '1', 
    phone: '+44 7700 900127', 
    status: 'Active', 
    joinDate: 'Jan 2024', 
    leaseEnd: 'Dec 2025', 
    paymentStatus: 'Paid',
    university: 'Parsons',
    course: 'BA Fine Art / Digital Media',
    nationality: 'Spanish'
  },
  { 
    id: 'RES-8825', 
    name: 'Alexander Vogt', 
    email: 'avogt@ucl.ac.uk', 
    room: 'B-405', 
    floor: '4', 
    phone: '+44 7700 900128', 
    status: 'Moving-Out', 
    joinDate: 'Sept 2022', 
    leaseEnd: 'Jun 2026', 
    paymentStatus: 'Paid',
    university: 'NYU',
    course: 'PhD Quantum Computing',
    nationality: 'German'
  },
  { 
    id: 'RES-8826', 
    name: 'Yuki Tanaka', 
    email: 'y.tanaka@soas.ac.uk', 
    room: 'C-202', 
    floor: '2', 
    phone: '+44 7700 900129', 
    status: 'Active', 
    joinDate: 'Sept 2024', 
    leaseEnd: 'Aug 2027', 
    paymentStatus: 'Overdue',
    university: 'Stanford',
    course: 'MA East Asian Studies',
    nationality: 'Japanese'
  },
  { 
    id: 'RES-8827', 
    name: 'Amara Diop', 
    email: 'adiop@qmul.ac.uk', 
    room: 'D-501', 
    floor: '5', 
    phone: '+44 7700 900130', 
    status: 'Pending', 
    joinDate: 'Oct 2024', 
    leaseEnd: 'Sept 2025', 
    paymentStatus: 'Pending',
    university: 'Queen Mary University',
    course: 'MSc Global Public Health',
    nationality: 'Senegalese'
  },
];

interface ModuleContentProps {
  title: string;
  type: 'residents' | 'rooms' | 'meals' | 'payments' | 'analytics' | 'staff' | 'reports' | 'dorms' | 'properties' | 'billing' | 'revenue' | 'audit-log' | 'integrations' | 'maintenance' | 'laundry' | 'settings' | 'inventory' | 'feedback';
  subType?: string;
  tier?: 'normal' | 'pro' | 'premium';
  role?: 'admin' | 'tenant' | 'chef';
}

export function ModuleContent({ title, type, subType, tier = 'normal', role = 'admin' }: ModuleContentProps) {
  const { openModal } = useModal();
  const currentType = type as ModuleContentProps['type'];
  const isPremium = tier === 'premium';
  const isNormal = tier === 'normal';

  if (type === 'properties') {
    return <PropertiesContent tier={tier} />;
  }

  if (type === 'laundry') {
    return <LaundryContent title={title} tier={tier} role={role} />;
  }

  if (type === 'meals') {
    return <MealsContent title={title} tier={tier} role={role} subType={subType} />;
  }

  if (type === 'inventory') {
    return <InventoryContent title={title} role={role} />;
  }

  if (type === 'payments') {
    if (tier === 'normal') {
      return <FinanceContent />;
    }
    return <FinanceHub tier={tier as 'pro' | 'premium'} />;
  }

  if (currentType === 'dorms') {
    return <FeedbackContent title={title} role={role} />;
  }

  if (type === 'integrations') {
    return <IntegrationsContent title={title} tier={tier} role={role} />;
  }

  if (type === 'staff') {
    return <StaffContent tier={tier} role={role} />;
  }

  if (type === 'residents') {
    return (
      <ResidentsManagement 
        title="Institutional Residents" 
        description="Comprehensive administrative registry of active, pending, and departing structural nodes (residents) across the portfolio." 
        residents={realisticResidents} 
      />
    );
  }

  if (type === 'audit-log') {
    interface AuditLogEntry {
      name: string;
      subtext: string;
      status: string;
      ref: string;
    }

    const columns = [
      {
        header: 'Entity',
        accessor: 'name',
        cell: (item: AuditLogEntry) => (
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
        cell: (item: AuditLogEntry) => (
          <Badge className={cn(
            "text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border-none",
            item.status === 'Active' || item.status === 'Live' || item.status === 'Paid' ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
          )}>{item.status}</Badge>
        )
      },
      { header: 'Reference', accessor: 'ref' },
    ];

    const data: AuditLogEntry[] = [
      { name: 'Sarah Johnson', subtext: 'Login', status: 'Active', ref: '#LOG-8820' },
      { name: 'Michael Chen', subtext: 'Room Update', status: 'Active', ref: '#LOG-8821' },
      { name: 'Emma Wilson', subtext: 'Payment', status: 'Pending', ref: '#LOG-8822' },
    ];

    return <DataTable<AuditLogEntry> title={title} description={`Manage your ${type} with real-time sync.`} columns={columns} data={data} tier={tier} />;
  }

  if (type === 'dorms') {
    const dorms = [
      {
        name: 'Manhattan Central',
        campus: 'North Campus',
        occupancy: 98,
        yield: '$42,500',
        status: 'Optimal',
        tickets: 2,
        systems: { power: 'ok', water: 'ok', security: 'ok', wifi: 'issue' },
        units: 120,
        image: '/bloomsbury-hall.jpg'
      },
      {
        name: 'Brooklyn Wing',
        campus: 'South Campus',
        occupancy: 82,
        yield: '$31,200',
        status: 'Review',
        tickets: 8,
        systems: { power: 'ok', water: 'alert', security: 'ok', wifi: 'ok' },
        units: 85,
        image: '/borough-wing.jpg'
      },
      {
        name: 'Times Square Court',
        campus: 'East Campus',
        occupancy: 94,
        yield: '$38,900',
        status: 'Optimal',
        tickets: 0,
        systems: { power: 'ok', water: 'ok', security: 'ok', wifi: 'ok' },
        units: 110,
        image: '/paddington-court.jpg'
      },
    ];

    return (
      <div className="space-y-8 animate-in fade-in duration-700 pb-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-border/40">
           <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-primary/5 border border-primary/10">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                 <span className="text-[9px] font-bold uppercase tracking-widest text-primary">Portfolio Live</span>
              </div>
              <h1 className="text-4xl font-black tracking-tight text-foreground">Campus <span className="text-muted-foreground/30 font-medium">Assets</span></h1>
              <p className="text-muted-foreground font-medium text-base max-w-xl leading-snug">Strategic oversight and infrastructure control.</p>
           </div>
           <Button className="rounded-xl h-10 px-6 font-black bg-primary text-primary-foreground shadow-lg shadow-primary/20 text-xs">
              Add New Asset
           </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
           {dorms.map((dorm, i) => (
             <Card key={i} className="group overflow-hidden border-border/40 bg-card rounded-[2rem] shadow-sm hover:shadow-xl transition-all p-6">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                   {/* Thumbnail */}
                   <div className="w-full lg:w-48 h-32 rounded-2xl overflow-hidden shrink-0">
                      <img src={dorm.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                   </div>

                   {/* Main Info */}
                   <div className="flex-1 min-w-0 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                         <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">{dorm.campus}</p>
                            <h3 className="text-2xl font-black text-foreground">{dorm.name}</h3>
                         </div>
                         <Badge className={cn(
                            "text-[10px] font-black uppercase px-3 py-1 rounded-full border-none",
                            dorm.status === 'Optimal' ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"
                         )}>
                            {dorm.status}
                         </Badge>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-border/10">
                         <div>
                            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Occupancy</p>
                            <div className="flex items-center gap-2">
                               <span className="text-sm font-black">{dorm.occupancy}%</span>
                               <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden max-w-[60px]">
                                  <div className="h-full bg-primary" style={{ width: `${dorm.occupancy}%` }} />
                               </div>
                            </div>
                         </div>
                         <div>
                            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Monthly Yield</p>
                            <p className="text-sm font-black text-foreground">{dorm.yield}</p>
                         </div>
                         <div>
                            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Systems</p>
                            <div className="flex gap-1.5">
                               {Object.entries(dorm.systems).map(([sys, status], idx) => (
                                 <div key={idx} className={cn(
                                    "w-4 h-4 rounded-sm flex items-center justify-center border",
                                    status === 'ok' ? "bg-muted/10 border-border/40 text-muted-foreground" : status === 'alert' ? "bg-rose-500/5 border-rose-500/10 text-rose-500" : "bg-amber-500/5 border-amber-500/10 text-amber-500"
                                 )}>
                                    {sys === 'wifi' ? <Globe className="w-3 h-3" /> : 
                                     sys === 'power' ? <Zap className="w-3 h-3" /> : 
                                     sys === 'water' ? <Activity className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
                                 </div>
                               ))}
                            </div>
                         </div>
                         <div>
                            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Alerts</p>
                            <p className={cn("text-sm font-black", dorm.tickets > 0 ? "text-rose-500" : "text-muted-foreground/30")}>
                               {dorm.tickets} Active
                            </p>
                         </div>
                      </div>
                   </div>

                   {/* Action */}
                   <div className="flex lg:flex-col gap-2 w-full lg:w-auto">
                      <Button variant="outline" className="flex-1 lg:w-32 rounded-xl font-bold text-[10px] uppercase tracking-widest h-10 border-border/40">
                         View Details
                      </Button>
                      <Button className="flex-1 lg:w-32 rounded-xl font-black text-[10px] uppercase tracking-widest h-10 bg-foreground text-background hover:bg-foreground/90 transition-all">
                         Manage
                      </Button>
                   </div>
                </div>
             </Card>
           ))}
        </div>
      </div>
    );
  }

  if (currentType === 'payments') {
    if (tier === 'normal') {
      return <FinanceContent />;
    }
    return <FinanceHub tier={tier as 'pro' | 'premium'} />;
  }

  if (type === 'billing') {
    const billingStats = [
      { label: 'Active Cycles', value: '3', sub: 'Nov Rent, Dec Rent, Q4 Utils', icon: RefreshCcw, color: 'text-primary' },
      { label: 'Total Outstanding', value: '$18.4k', sub: 'Across 12 accounts', icon: AlertTriangle, color: 'text-warning' },
      { label: 'Collection Rate', value: '98.2%', sub: 'Last 30 days', icon: CheckCircle2, color: 'text-success' },
    ];

    const cycles = [
      { name: 'December Rent', date: 'Dec 01, 2025', progress: 82, total: '$142.5k', collected: '$116.8k', issued: 124, paid: 102 },
      { name: 'November Rent', date: 'Nov 01, 2025', progress: 100, total: '$142.5k', collected: '$142.5k', issued: 124, paid: 124 },
      { name: 'Utilities Q4', date: 'Oct 15, 2025', progress: 65, total: '$24.2k', collected: '$15.7k', issued: 124, paid: 81 },
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
      { label: 'Gross Revenue', value: '$842.5k', change: '+12.4%', up: true, icon: DollarSign, trend: [40, 50, 45, 60, 55, 70] },
      { label: 'Net Profit', value: '$612.2k', change: '+8.1%', up: true, icon: TrendingUp, trend: [30, 40, 35, 50, 45, 60] },
      { label: 'Avg. Rev/Unit', value: '$942', change: '-2.4%', up: false, icon: Target, trend: [50, 48, 52, 49, 47, 46] },
    ];

    const recentEvents = [
      { id: 'REV-901', source: 'Room Rental (RM-102)', amount: '$850.00', date: 'Today, 10:42', type: 'Credit' },
      { id: 'REV-900', source: 'Service Fee (Laundry)', amount: '$12.50', date: 'Today, 09:15', type: 'Credit' },
      { id: 'REV-899', source: 'Meal Plan (Premium)', amount: '$320.00', date: 'Yesterday', type: 'Credit' },
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
                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background px-2 py-1 rounded text-[8px] font-black opacity-0 group-hover/bar:opacity-100 transition-all whitespace-nowrap">${(h*8)}k</div>
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
    const isPremium = tier === 'premium';
    const isPro = tier === 'pro';

    // --- Premium: Portfolio Intelligence Data ---
    const portfolioHealth = [
      { subject: 'Revenue', A: 92, B: 85 },
      { subject: 'Maintenance', A: 78, B: 90 },
      { subject: 'Satisfaction', A: 95, B: 80 },
      { subject: 'Occupancy', A: 98, B: 92 },
      { subject: 'Efficiency', A: 84, B: 75 },
    ];

    const performanceAudit = [
      { n: 'Manhattan Central', v: '+12.4%', s: 'Optimal', y: '9.2%' },
      { n: 'Manchester Central', v: '-2.1%', s: 'Under Review', y: '8.4%' },
      { n: 'NYC Hub', v: '+5.4%', s: 'Growth', y: '9.5%' },
    ];

    // --- Pro: Operational Efficiency Data ---
    const slaCompliance = [
      { name: 'Mon', current: 82, target: 95 },
      { name: 'Tue', current: 88, target: 95 },
      { name: 'Wed', current: 94, target: 95 },
      { name: 'Thu', current: 91, target: 95 },
      { name: 'Fri', current: 96, target: 95 },
    ];

    return (
      <div className="space-y-6 animate-in fade-in duration-700 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1 border-b border-border/40 pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight text-foreground uppercase italic underline decoration-primary/50 underline-offset-8">Intelligence <span className="text-muted-foreground/30 font-medium not-italic no-underline">Center</span></h1>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/50">Tier: {tier.toUpperCase()} · Industrial Data Mode</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-9 px-4 rounded-xl border-border text-[9px] font-black uppercase tracking-widest gap-2"
              onClick={() => openModal({
                id: 'intelligence-export-audit',
                title: 'Export Audit',
                component: <ActionPlaceholderContent action="Export intelligence audit" detail="Export flow is ready for backend report generation API." />,
                size: 'md'
              })}
            >
              <Download className="w-3.5 h-3.5" /> Export Audit
            </Button>
            <Button
              className="h-9 px-4 rounded-xl bg-primary text-white text-[9px] font-black uppercase tracking-widest gap-2 shadow-sm"
              onClick={() => openModal({
                id: 'intelligence-recalculate',
                title: 'Recalculate Performance',
                component: <ActionPlaceholderContent action="Recalculate analytics metrics" detail="Hook this action to trigger analytics recomputation endpoint." />,
                size: 'md'
              })}
            >
              <RefreshCcw className="w-3.5 h-3.5" /> Recalculate Performance
            </Button>
          </div>
        </div>

        {isPremium && (
          <div className="grid grid-cols-12 gap-5">
            {/* Portfolio Synergy Radar */}
            <Card className="col-span-12 lg:col-span-6 p-8 border-border shadow-sm rounded-2xl bg-card flex flex-col">
              <div className="flex items-center justify-between mb-10 border-b border-border/50 pb-6">
                 <div className="space-y-1">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-foreground">Synergy Balance</h3>
                    <p className="text-[11px] text-muted-foreground font-semibold">Portfolio Equilibrium Metric (Performance vs. Baseline)</p>
                 </div>
                 <Badge variant="outline" className="text-[9px] font-bold text-emerald-500 bg-emerald-500/5 border-emerald-500/20">Optimized</Badge>
              </div>
              <div className="h-[300px] w-full flex items-center justify-center">
                 <EfficiencyRadarChart data={portfolioHealth} />
              </div>
              <div className="mt-8 pt-6 border-t border-border grid grid-cols-2 gap-4">
                 <div className="text-center"><p className="text-[9px] font-black uppercase text-muted-foreground mb-1">Portfolio Velocity</p><p className="text-lg font-black">+14.2%</p></div>
                 <div className="text-center border-l border-border"><p className="text-[9px] font-black uppercase text-muted-foreground mb-1">Yield Delta</p><p className="text-lg font-black text-primary">$52K</p></div>
              </div>
            </Card>

            {/* Performance Audit Table */}
            <Card className="col-span-12 lg:col-span-6 p-8 border-border shadow-sm rounded-2xl bg-card flex flex-col">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-border w-full">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-foreground">Market Comparison Audit</h3>
                 <History className="w-4 h-4 text-muted-foreground/30" />
              </div>
              <div className="space-y-2 w-full flex-1 overflow-auto">
                 {performanceAudit.map((item, i) => (
                   <div key={i} className="flex items-center justify-between p-5 rounded-2xl hover:bg-muted/30 border border-transparent hover:border-border transition-all group cursor-pointer">
                      <div className="space-y-0.5">
                         <p className="text-xs font-black text-foreground group-hover:text-primary transition-colors">{item.n}</p>
                         <p className="text-[10px] font-bold text-muted-foreground/40 uppercase">{item.s}</p>
                      </div>
                      <div className="text-right">
                         <p className={cn("text-[10px] font-black uppercase tracking-widest", item.v.startsWith('+') ? 'text-emerald-500' : 'text-rose-500')}>{item.v}</p>
                         <p className="text-[9px] font-bold text-muted-foreground group-hover:text-foreground transition-colors">{item.y} Yield</p>
                      </div>
                   </div>
                 ))}
              </div>
              <div className="w-full pt-8 mt-auto">
                 <Button
                   variant="ghost"
                   className="w-full text-[10px] font-black uppercase tracking-widest text-muted-foreground h-11 hover:text-primary gap-2"
                   onClick={() => openModal({
                     id: 'external-market-intel',
                     title: 'External Market Intelligence',
                     component: <ActionPlaceholderContent action="Open external market intelligence feed" />,
                     size: 'md'
                   })}
                 >
                    External Market Intelligence <ArrowRight className="w-3.5 h-3.5" />
                 </Button>
              </div>
            </Card>
          </div>
        )}

        {isPro && (
          <div className="grid grid-cols-12 gap-5">
             <Card className="col-span-12 lg:col-span-12 p-8 border-border shadow-sm rounded-2xl bg-card">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b border-border/50 pb-6">
                   <div className="space-y-1">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-foreground">Service Level Agreement (SLA) Compliance</h3>
                      <p className="text-[11px] text-muted-foreground font-semibold">Weekly Maintenance Response Metrics vs Target (95%)</p>
                   </div>
                   <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-primary" /> <span className="text-[9px] font-bold uppercase text-muted-foreground">Compliance</span></div>
                      <div className="flex items-center gap-2 font-bold uppercase text-muted-foreground border-l border-border pl-6"><div className="w-2.5 h-2.5 rounded-full bg-muted/30" /> <span className="text-[9px] font-bold uppercase text-muted-foreground">Target</span></div>
                   </div>
                </div>
                <div className="h-[300px]">
                   <DualBarComparisonChart data={slaCompliance} />
                </div>
             </Card>

             <Card className="col-span-12 p-8 bg-primary/5 dark:bg-card border border-primary/10 dark:border-border rounded-2xl relative overflow-hidden group">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                   <div className="space-y-4">
                      <Badge className="bg-primary/20 text-primary border-none text-[8px] font-black uppercase tracking-widest px-3">Protocol Optimized</Badge>
                      <h3 className="text-3xl font-black text-foreground italic tracking-tight">SLA Performance has increased by <span className="text-primary not-italic">8.4%</span> since workflow automation.</h3>
                      <p className="text-sm font-medium text-muted-foreground/60 max-w-xl leading-relaxed">Audited service times across the portfolio show an average resolution cycle of 14.2 hours, exceeding the standard target of 24 hours. No critical failures detected in the current period.</p>
                   </div>
                   <Button
                     variant="outline"
                     className="h-14 px-8 rounded-xl border-border text-foreground font-black text-xs uppercase tracking-[0.2em] hover:bg-muted/30 shrink-0 transition-all hover:scale-[1.02]"
                     onClick={() => openModal({
                       id: 'download-performance-log',
                       title: 'Download Performance Log',
                       component: <ActionPlaceholderContent action="Download SLA performance log" />,
                       size: 'md'
                     })}
                   >
                      Download Performance Log
                   </Button>
                </div>
                <Zap className="absolute bottom-0 right-0 w-[500px] h-[500px] text-primary/5 translate-x-32 translate-y-32 -rotate-12 pointer-events-none" />
             </Card>
          </div>
        )}

        {!isPremium && !isPro && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {[
                 { l: 'Occupancy Rate', v: '94.2%', c: '+1.1%', up: true },
                 { l: 'Open Tickets', v: '12 Items', c: '-2', up: false },
                 { l: 'SLA Status', v: 'Optimal', c: '98%', up: true },
               ].map((stat, i) => (
                 <Card key={i} className="p-6 border-border shadow-sm rounded-xl space-y-2 bg-card">
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">{stat.l}</p>
                    <div className="flex items-end justify-between">
                       <h3 className="text-2xl font-black text-foreground">{stat.v}</h3>
                       <Badge variant="outline" className={cn("text-[8px] font-black border-none px-2", stat.up ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600')}>
                          {stat.c}
                       </Badge>
                    </div>
                 </Card>
               ))}
            </div>
            <Card className="p-16 border-border shadow-sm rounded-2xl bg-card border-dashed border-2 flex flex-col items-center justify-center text-center space-y-5">
               <div className="w-14 h-14 rounded-2xl bg-muted/40 flex items-center justify-center text-muted-foreground/30"><PieChart className="w-7 h-7" /></div>
               <div className="space-y-2">
                  <h4 className="text-lg font-black uppercase tracking-tight italic">System <span className="text-muted-foreground/30 not-italic">Visualization</span></h4>
                  <p className="text-xs font-semibold text-muted-foreground/60 max-w-sm mx-auto">Full visual intelligence and predictive reporting is reserved for higher-tier administrative nodes.</p>
               </div>
               <Button className="rounded-xl h-11 px-8 font-black text-[10px] uppercase tracking-widest bg-primary text-white transition-all shadow-xl shadow-primary/10">Upgrade Access</Button>
            </Card>
          </div>
        )}
      </div>
    );
  }

  if (type === 'reports') {
    const reportCategories = [
      { name: 'Financial', icon: Wallet, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
      { name: 'Occupancy', icon: Building2, color: 'text-blue-500', bg: 'bg-blue-500/10' },
      { name: 'Maintenance', icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-500/10' },
      { name: 'Staffing', icon: ShieldCheck, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    ];

    const reports = [
      { name: 'Monthly Financial Summary', category: 'Financial', date: 'Mar 01, 2026', size: '1.2 MB', type: 'PDF', status: 'Verified' },
      { name: 'Q1 Occupancy Analysis', category: 'Occupancy', date: 'Feb 28, 2026', size: '2.4 MB', type: 'XLSX', status: 'Ready' },
      { name: 'Maintenance Efficiency Log', category: 'Maintenance', date: 'Feb 25, 2026', size: '0.8 MB', type: 'PDF', status: 'Ready' },
      { name: 'Staff Attendance Audit', category: 'Staffing', date: 'Feb 20, 2026', size: '1.5 MB', type: 'PDF', status: 'Archived' },
      { name: 'Budget vs Actual Q1', category: 'Financial', date: 'Feb 15, 2026', size: '3.1 MB', type: 'XLSX', status: 'Verified' },
    ];

    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tight text-foreground">Intelligence <span className="text-muted-foreground/30 font-medium">Archive</span></h2>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Validated operational data & strategic exports</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center -space-x-2 mr-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                  <img src={`/avatar-${i}.jpg`} alt="User" className="w-full h-full object-cover" onError={(e) => { (e.target as any).src = 'https://ui-avatars.com/api/?name=Admin' }} />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-background bg-primary text-[8px] font-black text-white flex items-center justify-center">+4</div>
            </div>
            <Button className="h-11 px-6 rounded-xl bg-primary text-white font-bold gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 border-none">
              <Plus className="w-4 h-4" /> Generate Report
            </Button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Reports', value: '128', icon: FileText, color: 'text-blue-500' },
            { label: 'Storage Used', value: '452 MB', icon: Globe, color: 'text-emerald-500' },
            { label: 'Pending Audits', value: '3', icon: Clock, color: 'text-amber-500' },
            { label: 'System Health', value: '99.9%', icon: Activity, color: 'text-purple-500' },
          ].map((stat, i) => (
            <Card key={i} className="p-5 bg-card/40 backdrop-blur-xl border-border/40 rounded-2xl shadow-sm group hover:border-primary/20 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className={cn("p-2 rounded-lg bg-muted/50 transition-colors group-hover:bg-primary/5", stat.color)}>
                  <stat.icon className="w-4 h-4" />
                </div>
                <ArrowUpRight className="w-3 h-3 text-muted-foreground/30" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{stat.label}</p>
              <p className="text-2xl font-black text-foreground mt-1">{stat.value}</p>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-2">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 px-2">Data Segments</h3>
              <div className="space-y-1">
                {reportCategories.map((cat, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-all group text-left">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center transition-all", cat.bg, cat.color)}>
                        <cat.icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-foreground/70 group-hover:text-foreground">{cat.name}</span>
                    </div>
                    <ChevronRight className="w-3 h-3 text-muted-foreground/20 group-hover:text-foreground transition-all" />
                  </button>
                ))}
              </div>
            </div>

            <Card className="p-5 bg-primary/5 border-primary/10 rounded-2xl border-dashed">
              <Sparkles className="w-5 h-5 text-primary mb-3" />
              <p className="text-xs font-bold text-foreground mb-1">Custom Intelligence</p>
              <p className="text-[10px] text-muted-foreground leading-relaxed mb-4">Need a specific data pivot? Our AI can generate custom insights.</p>
              <Button variant="outline" className="w-full h-9 rounded-lg text-[9px] font-black uppercase tracking-widest border-primary/20 hover:bg-primary/10 text-primary">
                Request Pivot
              </Button>
            </Card>
          </div>

          {/* Reports List */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary text-white text-[9px] font-black px-2.5 py-0.5 rounded-full">Recent</Badge>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Showing last 30 days</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8 px-3 rounded-lg text-[10px] font-black uppercase tracking-widest gap-2">
                  <Filter className="w-3 h-3" /> Filter
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-3 rounded-lg text-[10px] font-black uppercase tracking-widest gap-2">
                  <Search className="w-3 h-3" /> Search
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {reports.map((report, i) => (
                <Card key={i} className="group p-1.5 bg-card/40 backdrop-blur-xl border-border/40 rounded-2xl hover:border-primary/20 transition-all shadow-sm overflow-hidden">
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center relative overflow-hidden group-hover:bg-primary/5 transition-all">
                        <FileText className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-all" />
                        <div className="absolute bottom-0 right-0 bg-background/80 px-1 py-0.5 text-[7px] font-black uppercase border-tl border-border/20">{report.type}</div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{report.name}</h3>
                          <Badge variant="outline" className={cn(
                            "text-[7px] font-black uppercase px-1.5 h-3.5 border-none",
                            report.status === 'Verified' ? "bg-emerald-500/10 text-emerald-500" : 
                            report.status === 'Ready' ? "bg-blue-500/10 text-blue-500" : "bg-muted text-muted-foreground"
                          )}>{report.status}</Badge>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] font-medium text-muted-foreground/60">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {report.date}</span>
                          <span className="flex items-center gap-1"><Boxes className="w-3 h-3" /> {report.size}</span>
                          <span className="flex items-center gap-1 font-bold text-primary/40"># {report.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all opacity-0 group-hover:opacity-100">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" className="h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2 bg-background/50 border-border/40 hover:bg-primary hover:text-white hover:border-primary transition-all">
                        <Download className="w-3.5 h-3.5" /> Download
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Button variant="ghost" className="w-full h-12 rounded-2xl border border-dashed border-border/40 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:bg-muted/30 transition-all">
              Load Archive History
            </Button>
          </div>
        </div>
      </div>
    );
  }


  if (type === 'rooms') {
    const rooms = [
      { id: '101', name: '101', type: 'Studio', status: 'Occupied', housekeeping: 'Clean', maintenance: 'none', resident: 'Sarah Jenkins', rent: '$1,100', floor: 'Floor 1', lastChecked: '10:30 AM' },
      { id: '102', name: '102', type: 'Standard', status: 'Vacant', housekeeping: 'Dirty', maintenance: 'none', resident: undefined, rent: '$850', floor: 'Floor 1', lastChecked: 'Yesterday' },
      { id: '103', name: '103', type: 'Standard', status: 'Vacant', housekeeping: 'Inspected', maintenance: 'issue', resident: undefined, rent: '$850', floor: 'Floor 1', lastChecked: '09:15 AM' },
      { id: '201', name: '201', type: 'Suite', status: 'Occupied', housekeeping: 'Clean', maintenance: 'none', resident: 'David Lawson', rent: '$1,450', floor: 'Floor 2', lastChecked: '08:45 AM' },
      { id: '202', name: '202', type: 'Standard', status: 'Arriving', housekeeping: 'Dirty', maintenance: 'none', resident: 'Marcus Reade', rent: '$850', floor: 'Floor 2', lastChecked: '11:20 AM' },
      { id: '203', name: '203', type: 'Standard', status: 'Departing', housekeeping: 'Clean', maintenance: 'none', resident: 'Emma Wilson', rent: '$850', floor: 'Floor 2', lastChecked: '07:30 AM' },
      { id: '301', name: '301', type: 'Studio', status: 'Vacant', housekeeping: 'Maintenance', maintenance: 'alert', resident: undefined, rent: '$1,100', floor: 'Floor 3', lastChecked: 'Just now' },
      { id: '302', name: '302', type: 'Standard', status: 'Occupied', housekeeping: 'Clean', maintenance: 'none', resident: 'James Bond', rent: '$850', floor: 'Floor 3', lastChecked: '06:00 AM' },
      // Extended data for testing with many rooms
      { id: '304', name: '304', type: 'Standard', status: 'Occupied', housekeeping: 'Clean', maintenance: 'none', resident: 'Lisa Anderson', rent: '$850', floor: 'Floor 3', lastChecked: '05:15 AM' },
      { id: '305', name: '305', type: 'Studio', status: 'Vacant', housekeeping: 'Dirty', maintenance: 'none', resident: undefined, rent: '$1,100', floor: 'Floor 3', lastChecked: 'Yesterday' },
      { id: '401', name: '401', type: 'Suite', status: 'Occupied', housekeeping: 'Clean', maintenance: 'none', resident: 'Tom Bradley', rent: '$1,450', floor: 'Floor 4', lastChecked: '10:00 AM' },
      { id: '402', name: '402', type: 'Standard', status: 'Vacant', housekeeping: 'Inspected', maintenance: 'issue', resident: undefined, rent: '$850', floor: 'Floor 4', lastChecked: 'Just now' },
      { id: '403', name: '403', type: 'Standard', status: 'Occupied', housekeeping: 'Clean', maintenance: 'none', resident: 'Rachel Green', rent: '$850', floor: 'Floor 4', lastChecked: '09:30 AM' },
      { id: '404', name: '404', type: 'Standard', status: 'Maintenance', housekeeping: 'Maintenance', maintenance: 'alert', resident: undefined, rent: '$0', floor: 'Floor 4', lastChecked: 'In Progress' },
      { id: '405', name: '405', type: 'Standard', status: 'Arriving', housekeeping: 'Dirty', maintenance: 'none', resident: 'Noah Jackson', rent: '$850', floor: 'Floor 4', lastChecked: 'Today' },
      { id: '501', name: '501', type: 'Studio', status: 'Occupied', housekeeping: 'Clean', maintenance: 'none', resident: 'Sophie Turner', rent: '$1,100', floor: 'Floor 5', lastChecked: '08:20 AM' },
      { id: '502', name: '502', type: 'Standard', status: 'Vacant', housekeeping: 'Clean', maintenance: 'none', resident: undefined, rent: '$850', floor: 'Floor 5', lastChecked: 'Yesterday' },
      { id: '503', name: '503', type: 'Standard', status: 'Occupied', housekeeping: 'Clean', maintenance: 'issue', resident: 'Alex Morgan', rent: '$850', floor: 'Floor 5', lastChecked: '07:45 AM' },
    ];

    return <RoomsManagement title={title} description="Comprehensive room management with filtering, search, and multiple view modes" rooms={rooms as any[]} />;
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
