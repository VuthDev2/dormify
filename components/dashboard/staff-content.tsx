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
  Activity,
  Download,
  Filter,
  DollarSign,
  UserCheck,
  Timer,
  ChevronRight,
  Plus,
  ArrowUpRight,
  Briefcase,
  ExternalLink,
  Target,
  Stethoscope,
  Zap,
  RotateCcw,
  Home,
  Settings2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  email: string;
  phone: string;
}

export function StaffContent({ tier = 'normal', role = 'admin' }: { tier?: string, role?: string }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDept, setActiveDept] = useState('All');
  
  const isNormal = tier === 'normal';
  const isChef = role === 'chef';

  const staffData: StaffMember[] = [
    { id: '1', name: 'Robert Wilson', role: 'Kitchen Lead', department: 'Culinary', status: 'Active', shift: '06:00 - 14:00', performance: 98, hourlyRate: 24, hoursThisWeek: 38, email: 'r.wilson@dormify.com', phone: '+44 7700 900551' },
    { id: '2', name: 'Sarah Chen', role: 'Front Desk', department: 'Reception', status: 'Active', shift: '08:00 - 16:00', performance: 95, hourlyRate: 18, hoursThisWeek: 32, email: 's.chen@dormify.com', phone: '+44 7700 900552' },
    { id: '3', name: 'David Okonkwo', role: 'Maintenance', department: 'Facilities', status: 'On Break', shift: '09:00 - 17:00', performance: 92, hourlyRate: 20, hoursThisWeek: 40, email: 'd.okonkwo@dormify.com', phone: '+44 7700 900553' },
    { id: '4', name: 'Emma Thompson', role: 'Night Porter', department: 'Security', status: 'Off Duty', shift: '22:00 - 06:00', performance: 88, hourlyRate: 22, hoursThisWeek: 35, email: 'e.thompson@dormify.com', phone: '+44 7700 900554' },
    { id: '5', name: 'Lisa Anderson', role: 'Housing Manager', department: 'Residential', status: 'Active', shift: '08:00 - 16:00', performance: 97, hourlyRate: 26, hoursThisWeek: 40, email: 'l.anderson@dormify.com', phone: '+44 7700 900556' },
    { id: '6', name: 'James Miller', role: 'Service Coordinator', department: 'Residential', status: 'Active', shift: '09:00 - 17:00', performance: 94, hourlyRate: 22, hoursThisWeek: 36, email: 'j.miller@dormify.com', phone: '+44 7700 900557' },
    { id: '7', name: 'Marcus Lee', role: 'Chef de Partie', department: 'Culinary', status: 'Training', shift: '10:00 - 18:00', performance: 85, hourlyRate: 19, hoursThisWeek: 28, email: 'm.lee@dormify.com', phone: '+44 7700 900555' },
  ];

  const filteredStaff = useMemo(() => {
    return staffData.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = activeDept === 'All' || s.department === activeDept;
      return matchesSearch && matchesDept;
    });
  }, [searchQuery, activeDept]);

  const getStatusColor = (status: StaffMember['status']) => {
    switch (status) {
      case 'Active': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case 'On Break': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'Training': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      default: return 'bg-muted text-muted-foreground border-transparent';
    }
  };

  const Header = () => (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-5 border-b border-border/40">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10">
          <Users className="w-3.5 h-3.5 text-primary" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Team Management</span>
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">
            {isChef ? 'Kitchen' : 'Operations'} <span className="text-muted-foreground/30 font-medium">Hub</span>
          </h1>
          <p className="text-muted-foreground font-medium text-sm mt-0.5 max-w-xl leading-relaxed italic opacity-80">
            "Orchestrate and oversee team performance across the operational network."
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button className="h-11 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest gap-2 shadow-lg shadow-primary/20 px-7 hover:scale-[1.02] active:scale-95 transition-all">
          <UserPlus className="w-4 h-4" /> Onboard Staff
        </Button>
      </div>
    </div>
  );

  return (
    <div className="max-w-[1300px] mx-auto space-y-6 animate-in fade-in duration-700 pb-12">
      <Header />

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Main Roster - 8 Columns */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Dept Filter Bar - Updated with Residential */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-2">
            <div className="flex flex-wrap gap-2 p-1.5 bg-muted/20 border border-border/40 rounded-2xl">
              {['All', 'Residential', 'Culinary', 'Reception', 'Facilities', 'Security'].map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveDept(dept)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                    activeDept === dept 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {dept}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
               <Badge variant="outline" className="bg-emerald-500/5 text-emerald-600 border-none text-[8px] font-black px-2 py-1">
                 {filteredStaff.length} Nodes Active
               </Badge>
            </div>
          </div>

          <div className="space-y-4">
            {filteredStaff.map((staff) => (
              <Card key={staff.id} className="p-1 border-border/40 bg-card rounded-[2rem] hover:shadow-2xl hover:border-primary/20 transition-all group overflow-hidden border">
                <div className="flex flex-col">
                  {/* Primary Row */}
                  <div className="flex items-center gap-6 px-5 py-4 border-b border-border/5">
                    <div className="relative">
                      <Avatar className="h-14 w-14 rounded-[1.25rem] border-2 border-border/40 group-hover:border-primary/40 transition-colors bg-muted/30 shadow-inner">
                         <AvatarFallback className="bg-transparent text-primary font-black text-sm">{staff.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className={cn("absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full border-4 border-card shadow-sm", 
                        staff.status === 'Active' ? "bg-emerald-500" : staff.status === 'On Break' ? "bg-amber-500" : "bg-muted-foreground"
                      )} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0">
                        <h3 className="text-base font-black text-foreground group-hover:text-primary transition-colors leading-none tracking-tight">{staff.name}</h3>
                        <Badge variant="outline" className={cn("text-[8px] font-black uppercase px-2.5 py-1 rounded-full border shadow-sm", getStatusColor(staff.status))}>
                          {staff.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                         <span className="flex items-center gap-2"><Briefcase className="w-3.5 h-3.5 text-primary/40" /> {staff.role}</span>
                         <span className="flex items-center gap-2 font-black text-primary/60 italic underline decoration-primary/20 underline-offset-4">{staff.department}</span>
                      </div>
                    </div>

                    <div className="hidden xl:flex flex-col items-end gap-1.5 px-6 border-x border-border/10 min-w-[160px]">
                       <p className="text-[9px] font-black uppercase text-muted-foreground/30 tracking-widest w-full text-right">Performance</p>
                       <div className="flex items-center gap-3 w-full justify-end">
                          <span className="text-sm font-black text-foreground italic">{staff.performance}%</span>
                          <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden shadow-inner">
                             <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${staff.performance}%` }}
                                className={cn("h-full rounded-full", staff.performance > 90 ? "bg-emerald-500" : "bg-primary")} 
                             />
                          </div>
                       </div>
                    </div>

                    <div className="flex items-center gap-2">
                       <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary/5 transition-all">
                         <Phone className="w-4.5 h-4.5 text-muted-foreground" />
                       </Button>
                       <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary/5 transition-all">
                         <Mail className="w-4.5 h-4.5 text-muted-foreground" />
                       </Button>
                    </div>
                  </div>

                  {/* Functional Quick Action Row */}
                  <div className="flex items-center justify-between px-6 py-3 bg-muted/5 group-hover:bg-muted/10 transition-colors">
                    <div className="flex gap-4">
                      {[
                        { label: 'Shift Swap', icon: RotateCcw, color: 'text-indigo-500' },
                        { label: 'Mark Sick', icon: Stethoscope, color: 'text-rose-500' },
                        { label: 'Assign Task', icon: Zap, color: 'text-amber-500' },
                      ].map((action, i) => (
                        <button key={i} className="flex items-center gap-1.5 group/btn transition-all">
                          <action.icon className={cn("w-3.5 h-3.5 opacity-40 group-hover/btn:opacity-100", action.color)} />
                          <span className="text-[9px] font-black uppercase tracking-[0.1em] text-muted-foreground group-hover/btn:text-foreground">
                            {action.label}
                          </span>
                        </button>
                      ))}
                    </div>
                    
                    {/* Residential specific shortcut if applicable */}
                    <div className="flex gap-2">
                       {staff.department === 'Residential' && (
                          <button className="flex items-center gap-1.5 text-emerald-600 bg-emerald-500/5 px-2 py-0.5 rounded-lg border border-emerald-500/10">
                            <Home className="w-3 h-3" />
                            <span className="text-[8px] font-black uppercase tracking-widest">Room Matrix</span>
                          </button>
                       )}
                       <button className="flex items-center gap-1.5 text-primary">
                          <span className="text-[9px] font-black uppercase tracking-widest">Manage Node</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                       </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Intelligence Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          
          <Card className="p-8 border-border/40 bg-card rounded-[2.5rem] shadow-xl border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-primary/5 rounded-bl-[4rem] -mr-7 -mt-7" />
            <div className="space-y-1 mb-8 relative z-10">
              <h3 className="text-xs font-black uppercase tracking-[0.25em] text-foreground">Operational Scorecard</h3>
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest opacity-50">Strategic Overview</p>
            </div>

            <div className="space-y-6 relative z-10">
               {[
                 { label: 'Resource Utilization', value: '84%', icon: Activity, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
                 { label: 'Avg SLA Period', value: '7.8h', icon: Timer, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                 { label: 'Personnel Health', value: '96.2%', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                       <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform", item.bg, item.color)}>
                          <item.icon className="w-5 h-5" />
                       </div>
                       <span className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-widest">{item.label}</span>
                    </div>
                    <span className="text-xl font-black tracking-tighter text-foreground">{item.value}</span>
                 </div>
               ))}
            </div>

            <div className="mt-8 pt-8 border-t border-border/10">
              <div className="p-5 rounded-[1.5rem] bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 space-y-3 group">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary">
                       <Target className="w-4 h-4" />
                       <span className="text-[9px] font-black uppercase tracking-[0.2em]">Efficiency Insight</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-primary/40 group-hover:text-primary transition-colors" />
                 </div>
                 <p className="text-[11px] font-semibold text-muted-foreground leading-relaxed italic pr-2">
                   "Team deployment is currently <span className="text-foreground font-black not-italic uppercase tracking-tighter underline decoration-primary/30 decoration-2 underline-offset-4">Optimized</span>."
                 </p>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-border/40 bg-card rounded-[2.5rem] border shadow-md space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground flex items-center gap-2">
                 <Calendar className="w-4 h-4 text-primary" /> Shift Saturation
              </h3>
              <Badge variant="outline" className="bg-primary/5 text-primary border-none text-[8px] font-black px-2 py-0.5">Weekly</Badge>
            </div>
            
            <div className="space-y-6">
              {[
                { day: 'Monday', active: 8, total: 10, percent: 80 },
                { day: 'Tuesday', active: 9, total: 10, percent: 90 },
                { day: 'Wednesday', active: 7, total: 10, percent: 70 },
                { day: 'Thursday', active: 10, total: 10, percent: 100 },
              ].map((c, i) => (
                <div key={i} className="space-y-2 group cursor-pointer">
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                     <span className="text-muted-foreground/70 group-hover:text-foreground transition-colors">{c.day}</span>
                     <span className="text-foreground">{c.active} <span className="text-muted-foreground/30">/ {c.total}</span></span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden p-0.5 border border-border/10 shadow-inner">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${c.percent}%` }}
                        className="h-full bg-primary rounded-full shadow-sm" 
                     />
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full h-11 rounded-2xl bg-foreground text-background font-black text-[10px] uppercase tracking-[0.25em] hover:bg-foreground/90 transition-all shadow-lg">
              Full Schedule Audit
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
