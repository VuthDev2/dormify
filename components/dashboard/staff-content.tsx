'use client';

import {
  Users,
  UserPlus,
  Search,
  Clock,
  ShieldCheck,
  Calendar,
  Building2,
  Phone,
  Mail,
  MoreHorizontal,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Briefcase,
  Activity,
  Download,
  Filter,
  DollarSign,
  UserCheck,
  Timer,
  ChevronRight,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'Active' | 'On Break' | 'Off Duty' | 'Training';
  shift: string;
  performance: number;
  hourlyRate: number;
  hoursThisWeek: number;
  avatar?: string;
}

export function StaffContent({ tier = 'normal', role = 'admin' }: { tier?: string, role?: string }) {
  const [searchQuery, setSearchQuery] = useState('');

  const staffData: StaffMember[] = [
    { id: '1', name: 'Robert Wilson', role: 'Kitchen Lead', department: 'Culinary', status: 'Active', shift: '06:00 - 14:00', performance: 98, hourlyRate: 24, hoursThisWeek: 38 },
    { id: '2', name: 'Sarah Chen', role: 'Front Desk', department: 'Reception', status: 'Active', shift: '08:00 - 16:00', performance: 95, hourlyRate: 18, hoursThisWeek: 32 },
    { id: '3', name: 'David Okonkwo', role: 'Maintenance', department: 'Facilities', status: 'On Break', shift: '09:00 - 17:00', performance: 92, hourlyRate: 20, hoursThisWeek: 40 },
    { id: '4', name: 'Emma Thompson', role: 'Night Porter', department: 'Security', status: 'Off Duty', shift: '22:00 - 06:00', performance: 88, hourlyRate: 22, hoursThisWeek: 35 },
    { id: '5', name: 'Marcus Lee', role: 'Chef de Partie', department: 'Culinary', status: 'Training', shift: '10:00 - 18:00', performance: 85, hourlyRate: 19, hoursThisWeek: 28 },
  ];

  // Business metrics for the owner
  const businessStats = useMemo(() => [
    { label: 'Total Payroll', value: '£4,240', sub: 'This Week', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Staff On-Duty', value: '12', sub: 'Active Now', icon: UserCheck, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Efficiency', value: '94.2%', sub: 'Avg Score', icon: Activity, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { label: 'Overtime Hrs', value: '8.5h', sub: 'Flagged', icon: Timer, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ], []);

  const getStatusColor = (status: StaffMember['status']) => {
    switch (status) {
      case 'Active': return 'bg-emerald-500 text-white';
      case 'On Break': return 'bg-amber-500 text-white';
      case 'Training': return 'bg-blue-500 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* Compact Pro Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-background p-4 rounded-2xl border border-border/40 shadow-sm sticky top-0 z-20 backdrop-blur-md bg-background/80">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground leading-none">Staff Management</h1>
            <p className="text-xs font-medium text-muted-foreground mt-1 flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5" /> Operations: Global Roster • April 2026
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative group hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search staff..." 
              className="pl-9 h-9 w-64 bg-muted/20 border-border/40 rounded-lg text-xs font-bold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="h-9 rounded-lg gap-2 text-xs font-bold px-3">
             <Download className="w-3.5 h-3.5" /> Export
          </Button>
          <Button size="sm" className="h-9 rounded-lg gap-2 text-xs font-bold px-4 bg-primary text-white">
             <UserPlus className="w-3.5 h-3.5" /> Add Staff
          </Button>
        </div>
      </div>

      {/* High-Signal Business Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {businessStats.map((s, i) => (
          <Card key={i} className="p-4 border-border/40 bg-card rounded-2xl flex items-center gap-4 hover:shadow-md transition-all border group">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform", s.bg)}>
               <s.icon className={cn("w-5 h-5", s.color)} />
            </div>
            <div>
               <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 leading-none mb-1">{s.label}</p>
               <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold tracking-tight">{s.value}</span>
                  <span className="text-[10px] font-bold text-muted-foreground/40">{s.sub}</span>
               </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Main Roster Area */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-black tracking-widest text-muted-foreground uppercase">Active Personnel Ledger</h2>
            <div className="flex gap-2">
               <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold uppercase tracking-wider">All</Button>
               <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/40">On Duty</Button>
               <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/40">Off Duty</Button>
            </div>
          </div>

          <Card className="border-border/40 bg-card rounded-2xl border overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/10 border-b border-border/10">
                    <th className="p-4 text-[10px] font-bold uppercase text-muted-foreground">Staff Member</th>
                    <th className="p-4 text-[10px] font-bold uppercase text-muted-foreground">Current Shift</th>
                    <th className="p-4 text-[10px] font-bold uppercase text-muted-foreground">Status</th>
                    <th className="p-4 text-[10px] font-bold uppercase text-muted-foreground text-right">Performance</th>
                    <th className="p-4 text-[10px] font-bold uppercase text-muted-foreground text-right">Weekly Cost</th>
                    <th className="p-4" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/10">
                  {staffData.map((staff) => (
                    <tr key={staff.id} className="group hover:bg-muted/5 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 rounded-lg border border-border/40">
                            <AvatarFallback className="bg-primary/5 text-primary text-[10px] font-bold">{staff.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-xs font-bold text-foreground leading-tight">{staff.name}</p>
                            <p className="text-[10px] font-medium text-muted-foreground">{staff.role} • {staff.department}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                           <Clock className="w-3 h-3 text-muted-foreground/40" />
                           <span className="text-xs font-bold text-foreground/80">{staff.shift}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge className={cn("text-[8px] font-black uppercase px-2 py-0.5 rounded-full border-none", getStatusColor(staff.status))}>
                          {staff.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <div className="inline-flex flex-col items-end gap-1">
                           <span className="text-xs font-black text-foreground">{staff.performance}%</span>
                           <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                              <div className={cn("h-full", staff.performance > 90 ? "bg-emerald-500" : "bg-primary")} style={{ width: `${staff.performance}%` }} />
                           </div>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <p className="text-xs font-bold text-foreground">£{staff.hourlyRate * staff.hoursThisWeek}</p>
                        <p className="text-[10px] font-medium text-muted-foreground">{staff.hoursThisWeek} hrs</p>
                      </td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                           <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Operational Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Shift Coverage Heatmap */}
          <Card className="p-5 border-border/40 bg-card rounded-2xl border shadow-sm space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60 flex items-center gap-2">
               <Calendar className="w-4 h-4 text-primary" /> Coverage Forecast
            </h3>
            <div className="space-y-4">
              {[
                { day: 'Mon', coverage: 100, status: 'Full' },
                { day: 'Tue', coverage: 85, status: 'Warning' },
                { day: 'Wed', coverage: 95, status: 'Stable' },
                { day: 'Thu', coverage: 70, status: 'Critical' },
              ].map((c, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold uppercase">
                     <span className="text-muted-foreground">{c.day} • {c.status}</span>
                     <span className={cn(c.coverage < 80 ? "text-rose-500" : "text-emerald-500")}>{c.coverage}%</span>
                  </div>
                  <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                     <div className={cn("h-full", c.coverage < 80 ? "bg-rose-500" : "bg-emerald-500")} style={{ width: `${c.coverage}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full text-[10px] font-bold uppercase tracking-widest text-primary h-8 hover:bg-primary/5 rounded-lg">Open Rota Builder</Button>
          </Card>

          {/* Compliance & Training */}
          <Card className="p-5 border-border/40 bg-card rounded-2xl border shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60 flex items-center gap-2">
               <ShieldCheck className="w-4 h-4 text-indigo-500" /> Compliance Audit
            </h3>
            <div className="space-y-3">
               {[
                 { label: 'Health & Safety', due: '12 Days', status: 'Pending' },
                 { label: 'Food Hygiene L3', due: '3 Days', status: 'Overdue' },
               ].map((audit, i) => (
                 <div key={i} className="p-3 rounded-xl bg-muted/10 border border-border/10 flex items-center justify-between">
                    <div>
                       <p className="text-[11px] font-bold text-foreground leading-tight">{audit.label}</p>
                       <p className="text-[10px] font-medium text-muted-foreground">Due in {audit.due}</p>
                    </div>
                    <Badge variant="outline" className={cn("text-[9px] font-bold border-none px-2 h-5", audit.status === 'Overdue' ? 'bg-rose-500/10 text-rose-600' : 'bg-amber-500/10 text-amber-600')}>
                       {audit.status}
                    </Badge>
                 </div>
               ))}
            </div>
          </Card>

          {/* Optimization CTA */}
          <Card className="p-8 bg-primary/5 dark:bg-card border border-primary/10 dark:border-border rounded-[2rem] space-y-5 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10 space-y-4 text-center">
              <div className="w-10 h-10 rounded-xl bg-muted/30 flex items-center justify-center mx-auto text-primary">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold tracking-tight text-foreground">Efficiency AI</h4>
                <p className="text-xs font-medium text-muted-foreground/60 leading-relaxed italic">
                  "Highest productivity detected during Breakfast Cycle. Consider re-allocating 2 units to Dinner Prep."
                </p>
              </div>
              <Button className="w-full h-11 bg-primary text-white border-none rounded-xl font-bold hover:bg-primary/90 transition-all text-xs uppercase tracking-widest shadow-md">
                 Apply Insights
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
