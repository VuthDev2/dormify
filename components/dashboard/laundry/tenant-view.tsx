'use client';

import { motion } from 'framer-motion';
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
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function TenantLaundryView() {
  // Personalized turn data (automatically assigned)
  const myTurn = {
    day: 'Tuesday, April 7',
    time: '10:00 AM - 11:30 AM',
    status: 'Upcoming',
    location: 'Washer W-04 • Dryer D-02',
    remainingDays: 2
  };

  const machines = [
    { id: 'W-01', type: 'Washer', status: 'Available', process: 'Idle', duration: '45m cycle' },
    { id: 'W-02', type: 'Washer', status: 'Busy', process: 'Rinsing', progress: 65, duration: '12m left' },
    { id: 'W-03', type: 'Washer', status: 'Busy', process: 'Washing', progress: 30, duration: '32m left' },
    { id: 'D-01', type: 'Dryer', status: 'Available', process: 'Idle', duration: '60m cycle' },
    { id: 'D-02', type: 'Dryer', status: 'Busy', process: 'Drying', progress: 85, duration: '8m left' },
    { id: 'D-03', type: 'Dryer', status: 'Busy', process: 'Tumbling', progress: 10, duration: '52m left' },
  ];

  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      animate="show" 
      className="max-w-7xl mx-auto py-6 px-6 space-y-8"
    >
      {/* 1. Personalized Turn Hero */}
      <motion.div variants={item}>
        <Card className="p-10 border-none bg-primary text-primary-foreground rounded-[3rem] shadow-2xl shadow-primary/20 relative overflow-hidden">
           <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                   <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-70">Weekly Laundry Turn</span>
                </div>
                <div className="space-y-2">
                   <h2 className="text-5xl font-bold tracking-tight">{myTurn.day}</h2>
                   <p className="text-2xl font-medium opacity-90">{myTurn.time}</p>
                </div>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                   <Badge className="bg-white/10 text-white border-white/20 font-bold text-[10px] uppercase px-4 py-1.5 backdrop-blur-md">
                      {myTurn.location}
                   </Badge>
                   <div className="flex items-center gap-2 text-xs font-medium opacity-70">
                      <Clock className="w-4 h-4" />
                      Starts in {myTurn.remainingDays} days
                   </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                 <Button variant="secondary" className="h-14 rounded-2xl font-bold text-sm bg-white text-primary hover:bg-white/90 px-10 shadow-xl shadow-black/10">
                    <BellRing className="w-4 h-4 mr-2" /> Notify Me
                 </Button>
                 <Button variant="secondary" className="h-14 rounded-2xl font-bold text-sm bg-white/10 text-white hover:bg-white/20 border border-white/20 px-10 backdrop-blur-sm">
                    Sync to Calendar
                 </Button>
              </div>
           </div>

           {/* Decorative Elements */}
           <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
              <CalendarCheck className="w-64 h-64 -rotate-12" />
           </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* 2. Live Room Monitor (Expanded) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between px-2">
             <div className="space-y-1">
                <h3 className="text-xl font-bold tracking-tight">Room Monitor</h3>
                <p className="text-xs text-muted-foreground font-medium">Real-time process tracking for all units.</p>
             </div>
             <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                   <div className="w-2 h-2 rounded-full bg-emerald-500" /> Free
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                   <div className="w-2 h-2 rounded-full bg-amber-500" /> In Use
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {machines.map((machine) => (
              <Card key={machine.id} className="p-6 rounded-[2.5rem] border-border/60 hover:border-primary/20 transition-all group bg-card shadow-sm">
                <div className="flex items-center justify-between mb-8">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-muted/50 text-muted-foreground flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                        {machine.type === 'Washer' ? <Droplets className="w-6 h-6" /> : <Wind className="w-6 h-6" />}
                      </div>
                      <div>
                         <p className="text-base font-bold">{machine.id}</p>
                         <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{machine.type}</p>
                      </div>
                   </div>
                   <Badge className={cn(
                      "px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest border-none",
                      machine.status === 'Available' ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"
                   )}>
                      {machine.status}
                   </Badge>
                </div>

                <div className="space-y-4">
                   <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      <span>{machine.process}</span>
                      <span className="text-foreground font-black">{machine.duration}</span>
                   </div>
                   {machine.status === 'Busy' && (
                     <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-amber-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${machine.progress}%` }}
                          transition={{ duration: 1.5 }}
                        />
                     </div>
                   )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 3. Utility Sidebar */}
        <div className="lg:col-span-4 space-y-6">
           <Card className="p-10 rounded-[3rem] bg-muted/20 border-transparent space-y-10">
              <div className="space-y-3">
                 <div className="flex items-center gap-2 text-primary">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Included Service</span>
                 </div>
                 <h3 className="text-2xl font-bold tracking-tight">Automated Ops</h3>
                 <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                    This service is provided free of charge for all residents of Bloomsbury Hall.
                 </p>
              </div>

              <div className="space-y-4">
                 {[
                   { label: 'Session Length', val: '90 Minutes', icon: Timer },
                   { label: 'Turn Cycle', val: 'Once Weekly', icon: History },
                   { label: 'Power Saving', val: 'Active', icon: Zap },
                 ].map((u, i) => (
                   <div key={i} className="flex items-center justify-between p-5 bg-background/50 rounded-2xl border border-border/40 shadow-sm">
                      <div className="flex items-center gap-4">
                         <u.icon className="w-4 h-4 text-primary" />
                         <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{u.label}</span>
                      </div>
                      <span className="text-sm font-bold">{u.val}</span>
                   </div>
                 ))}
              </div>

              <div className="pt-6 border-t border-border/20">
                 <p className="text-[11px] text-muted-foreground leading-relaxed mb-6 font-medium">
                    Your machines will automatically unlock 5 minutes before your turn starts. Please ensure you empty all units by the end of your slot.
                 </p>
                 <Button variant="ghost" className="w-full h-12 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary hover:bg-primary/5">
                    <Info className="w-4 h-4 mr-2" /> Policy & Rules
                 </Button>
              </div>
           </Card>
        </div>
      </div>
    </motion.div>
  );
}
