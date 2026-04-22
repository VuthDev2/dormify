'use client';

import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { 
  Droplets, 
  Wind, 
  Clock, 
  CalendarCheck, 
  Timer,
  Info,
  Zap,
  BellRing,
  History,
  ShieldCheck,
  ChevronRight,
  Search,
  Filter,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function TenantLaundryView({ hideHeader = false }: { hideHeader?: boolean }) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'washer' | 'dryer'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Personalized turn data (automatically assigned)
  const myTurn = {
    day: 'Tuesday, April 21',
    date: '2026-04-21',
    time: '10:00 AM - 11:30 AM',
    status: 'In Progress', // Changed to 'In Progress' for realism during current date
    location: 'Washer W-04 • Dryer D-02',
    remainingMinutes: 42
  };

  const machines = [
    { id: 'W-01', type: 'Washer', status: 'Available', process: 'Idle', duration: '45m cycle', load: 'Large' },
    { id: 'W-02', type: 'Washer', status: 'Busy', process: 'Rinsing', progress: 65, duration: '12m left', load: 'Standard' },
    { id: 'W-03', type: 'Washer', status: 'Busy', process: 'Washing', progress: 30, duration: '32m left', load: 'Large' },
    { id: 'W-04', type: 'Washer', status: 'Busy', process: 'Spinning', progress: 85, duration: '6m left', load: 'Standard', isMine: true },
    { id: 'D-01', type: 'Dryer', status: 'Available', process: 'Idle', duration: '60m cycle', load: 'Extra Large' },
    { id: 'D-02', type: 'Dryer', status: 'Available', process: 'Idle', duration: '60m cycle', load: 'Large', isMine: true },
    { id: 'D-03', type: 'Dryer', status: 'Busy', process: 'Tumbling', progress: 15, duration: '51m left', load: 'Standard' },
    { id: 'D-04', type: 'Dryer', status: 'Out of Order', process: 'Maintenance', progress: 0, duration: 'Est. 2d', load: 'Large' },
  ];

  const filteredMachines = machines.filter(m => {
    const matchesFilter = activeFilter === 'all' || m.type.toLowerCase() === activeFilter;
    const matchesSearch = m.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.process.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      animate="show" 
      className={cn("w-full space-y-8", !hideHeader && "py-6 px-6")}
    >
      {/* 1. Dynamic Hero: Active Session or Upcoming Turn */}
      <motion.div variants={item}>
        <Card className="p-8 border-none bg-primary text-primary-foreground rounded-[2.5rem] shadow-2xl shadow-primary/20 relative overflow-hidden group">
           <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                   <Badge className="bg-white/20 text-white border-none font-black text-[9px] uppercase tracking-[0.2em] px-3 py-1 backdrop-blur-md">
                      Live Session Active
                   </Badge>
                   <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">Slot: A-402 • Manhattan Node</span>
                </div>
                <div className="space-y-1">
                   <h2 className="text-4xl font-black tracking-tighter uppercase italic leading-none">Your Laundry Turn</h2>
                   <p className="text-xl font-medium opacity-80">{myTurn.time} <span className="mx-2 opacity-30">•</span> {myTurn.day}</p>
                </div>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                   <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md">
                      <Timer className="w-4 h-4 text-white animate-pulse" />
                      <span className="text-sm font-black tracking-tight">{myTurn.remainingMinutes}m remaining</span>
                   </div>
                   <div className="text-xs font-bold opacity-60 uppercase tracking-widest flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> {myTurn.location}
                   </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                 <Button variant="secondary" className="h-12 rounded-xl font-black text-[10px] uppercase tracking-widest bg-white text-primary hover:bg-white/90 px-8 shadow-xl shadow-black/10 border-none">
                    <BellRing className="w-4 h-4 mr-2" /> Finish Alert
                 </Button>
                 <Button variant="secondary" className="h-12 rounded-xl font-black text-[10px] uppercase tracking-widest bg-white/10 text-white hover:bg-white/20 border border-white/20 px-8 backdrop-blur-sm">
                    Extend Slot (5m)
                 </Button>
              </div>
           </div>

           {/* Animated Background Progress */}
           <div className="absolute bottom-0 left-0 h-1.5 bg-white/10 w-full overflow-hidden">
              <motion.div 
                initial={{ width: '0%' }}
                animate={{ width: '65%' }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
              />
           </div>
           
           <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
              <Droplets className="w-64 h-64 -rotate-12" />
           </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* 2. Live Fleet Monitor */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 px-2">
             <div className="space-y-1">
                <h3 className="text-xl font-black tracking-tight uppercase italic leading-none text-foreground">Fleet Status</h3>
                <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">Real-time IoT Telemetry</p>
             </div>
             
             <div className="flex items-center gap-2">
                <div className="flex p-1 bg-muted/20 rounded-xl border border-border/20 shadow-inner">
                  {(['all', 'washer', 'dryer'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={cn(
                        "px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                        activeFilter === filter ? "bg-background text-primary shadow-sm border border-border/40" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
                <div className="relative group ml-2">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                   <Input 
                      placeholder="Find Unit..." 
                      className="pl-9 h-10 w-32 md:w-48 bg-muted/10 border-border/40 rounded-xl text-[10px] font-black uppercase tracking-widest focus-visible:ring-1 focus-visible:ring-primary/20"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                   />
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredMachines.map((machine) => (
                <motion.div
                  layout
                  key={machine.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className={cn(
                    "p-5 rounded-[2rem] border-border/40 hover:shadow-2xl transition-all group bg-card border relative overflow-hidden",
                    machine.isMine && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  )}>
                    <div className="flex items-center justify-between mb-6">
                       <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                            machine.status === 'Available' ? "bg-emerald-500/10 text-emerald-500" : 
                            machine.status === 'Out of Order' ? "bg-rose-500/10 text-rose-500" :
                            "bg-primary/5 text-primary"
                          )}>
                            {machine.type === 'Washer' ? <Droplets className="w-5 h-5" /> : <Wind className="w-5 h-5" />}
                          </div>
                          <div>
                             <p className="text-sm font-black text-foreground leading-none">{machine.id}</p>
                             <p className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest mt-1">{machine.type}</p>
                          </div>
                       </div>
                       <Badge className={cn(
                          "px-2.5 py-0.5 h-5 rounded-full text-[8px] font-black uppercase tracking-widest border-none shadow-sm",
                          machine.status === 'Available' ? "bg-emerald-500 text-white" : 
                          machine.status === 'Out of Order' ? "bg-rose-500 text-white" :
                          "bg-primary text-white"
                       )}>
                          {machine.status}
                       </Badge>
                    </div>

                    <div className="space-y-4">
                       <div className="flex justify-between items-end">
                          <div className="space-y-0.5">
                             <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/40">{machine.status === 'Available' ? 'Est. Cycle' : machine.process}</p>
                             <p className="text-xs font-black text-foreground">{machine.duration}</p>
                          </div>
                          <div className="text-right">
                             <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/40">Load</p>
                             <p className="text-[10px] font-bold text-foreground">{machine.load}</p>
                          </div>
                       </div>
                       
                       {machine.status === 'Busy' && (
                         <div className="space-y-1.5">
                            <div className="flex justify-between items-center text-[9px] font-black text-primary uppercase tracking-tighter">
                               <span>Process Progress</span>
                               <span>{machine.progress}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-muted/40 rounded-full overflow-hidden p-0.5 border border-border/5">
                               <motion.div 
                                 className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]"
                                 initial={{ width: 0 }}
                                 animate={{ width: `${machine.progress}%` }}
                                 transition={{ duration: 1 }}
                               />
                            </div>
                         </div>
                       )}

                       {machine.isMine && (
                         <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-primary/10 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3 text-primary" />
                            <span className="text-[7px] font-black text-primary uppercase tracking-widest">My Unit</span>
                         </div>
                       )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* 3. Utility & Policy Sidebar */}
        <div className="lg:col-span-4 space-y-6">
           <Card className="p-8 rounded-[2.5rem] border-border/40 bg-card border shadow-xl relative overflow-hidden">
              <div className="space-y-8 relative z-10">
                 <div className="space-y-1">
                    <div className="flex items-center gap-2 text-primary mb-1">
                       <ShieldCheck className="w-4 h-4" />
                       <span className="text-[9px] font-black uppercase tracking-[0.25em]">Premium Infrastructure</span>
                    </div>
                    <h3 className="text-2xl font-black tracking-tighter uppercase italic text-foreground leading-none">Resource Guide</h3>
                    <p className="text-xs text-muted-foreground/60 font-medium leading-relaxed">
                       Complimentary industrial-grade laundry services for residents.
                    </p>
                 </div>

                 <div className="space-y-3">
                    {[
                      { label: 'Max Cycle', val: '90 Min', icon: Timer, color: 'text-indigo-500' },
                      { label: 'Cycle Frequency', val: '1x Week', icon: History, color: 'text-blue-500' },
                      { label: 'Detergent Node', val: 'Auto-Dose', icon: Droplets, color: 'text-emerald-500' },
                      { label: 'Energy Class', val: 'A+++ Rating', icon: Zap, color: 'text-amber-500' },
                    ].map((u, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-muted/5 rounded-2xl border border-border/10 hover:border-primary/20 transition-all cursor-pointer group">
                         <div className="flex items-center gap-3">
                            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center bg-white shadow-sm transition-transform group-hover:scale-110", u.color)}>
                               <u.icon className="w-4 h-4" />
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{u.label}</span>
                         </div>
                         <span className="text-xs font-black text-foreground">{u.val}</span>
                      </div>
                    ))}
                 </div>

                 <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/10 space-y-3">
                    <div className="flex items-center gap-2 text-amber-600">
                       <AlertCircle className="w-4 h-4" />
                       <p className="text-[10px] font-black uppercase tracking-widest">Resident Notice</p>
                    </div>
                    <p className="text-[10px] text-amber-700/80 leading-relaxed font-bold italic">
                       Units will auto-lock 5 minutes prior to slot end. Unattended items will be relocated to the secure storage hub after 15 minutes.
                    </p>
                 </div>

                 <Button variant="outline" className="w-full h-12 rounded-2xl border-border/40 text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:bg-primary hover:text-white transition-all">
                    Full Facility Protocol <ChevronRight className="w-4 h-4 ml-2" />
                 </Button>
              </div>
              
              <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
                 <Zap className="w-48 h-48 rotate-12" />
              </div>
           </Card>

           {/* Quick History Snippet */}
           <Card className="p-6 rounded-[2rem] border-border/40 bg-card border shadow-sm">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground mb-6 flex items-center gap-2">
                 <History className="w-4 h-4 text-primary" /> Last Activity
              </h4>
              <div className="space-y-4">
                 {[
                   { t: 'Washer Cycle', d: 'Apr 14, 10:12 AM', s: 'Completed' },
                   { t: 'Dryer Cycle', d: 'Apr 14, 11:45 AM', s: 'Completed' },
                 ].map((h, i) => (
                   <div key={i} className="flex justify-between items-center group cursor-pointer">
                      <div className="space-y-0.5">
                         <p className="text-[11px] font-black text-foreground group-hover:text-primary transition-colors">{h.t}</p>
                         <p className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">{h.d}</p>
                      </div>
                      <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-emerald-500/20 text-emerald-500 bg-emerald-500/5">{h.s}</Badge>
                   </div>
                 ))}
              </div>
           </Card>
        </div>
      </div>
    </motion.div>
  );
}
