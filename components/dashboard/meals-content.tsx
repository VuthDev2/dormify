'use client';

import {
  Clock, Leaf, Flame, Star, 
  Heart, Info, Settings, Calendar, UtensilsCrossed,
  Bell, Sparkles, Activity, Target, ShieldCheck,
  ChevronRight, Timer, History
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MealsContentProps {
  title: string;
  tier?: 'normal' | 'pro' | 'premium';
  role?: 'admin' | 'tenant' | 'chef';
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function MealsContent({ title, tier = 'normal', role = 'admin' }: MealsContentProps) {
  const [selectedDay, setSelectedDay] = useState('Today');
  const [greeting, setGreeting] = useState('Welcome');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  // Tenant View
  if (role === 'tenant') {
    const todayMenu = [
      { 
        id: 'm1', 
        meal: 'Breakfast', 
        menu: 'Classic Avocado Toast', 
        time: '07:30 - 09:30', 
        icon: '🍳', 
        calories: '450', 
        protein: '12g',
        active: false,
        selected: true 
      },
      { 
        id: 'm2', 
        meal: 'Lunch', 
        menu: 'Grilled Chicken Caesar', 
        time: '12:00 - 14:00', 
        icon: '🥗', 
        calories: '620', 
        protein: '38g',
        active: true, // Currently active service
        selected: true 
      },
      { 
        id: 'm3', 
        meal: 'Dinner', 
        menu: 'Beef Bourguignon', 
        time: '18:30 - 20:30', 
        icon: '🥘', 
        calories: '780', 
        protein: '42g',
        isSpecial: true,
        selected: false 
      },
    ];

    const weekDays = [
      { day: 'Mon', date: '06', active: true },
      { day: 'Tue', date: '07', active: false },
      { day: 'Wed', date: '08', active: false },
      { day: 'Thu', date: '09', active: false },
      { day: 'Fri', date: '10', active: false },
      { day: 'Sat', date: '11', active: false },
      { day: 'Sun', date: '12', active: false },
    ];

    return (
      <motion.div 
        variants={container} 
        initial="hidden" 
        animate="show" 
        className="max-w-7xl mx-auto py-8 px-6 space-y-10"
      >
        {/* 1. Dynamic Greeting Header */}
        <motion.div variants={item} className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-border/40">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60">Resident Dining Portal</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              {greeting}, <span className="text-primary/40">Sarah</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
               <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Today's Cycle</p>
               <p className="text-sm font-bold">Spring • Week 12</p>
            </div>
            <div className="h-10 w-[1px] bg-border/40 hidden sm:block" />
            <Button variant="outline" className="h-12 rounded-2xl font-bold text-xs border-border/60 bg-card px-6">
               <History className="w-4 h-4 mr-2" /> Past Choices
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main: Culinary Timeline */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Week Track */}
            <motion.div variants={item} className="space-y-6">
               <div className="flex items-center justify-between px-1">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Select Date</h3>
                  <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[9px] font-bold">Today: Monday</Badge>
               </div>
               <div className="flex justify-between p-1.5 bg-muted/20 rounded-[2.5rem] border border-border/40 overflow-x-auto no-scrollbar">
                {weekDays.map((d) => (
                  <button
                    key={d.day}
                    className={cn(
                      "flex flex-col items-center min-w-[75px] py-3.5 rounded-[2rem] transition-all duration-300",
                      d.active
                        ? "bg-background text-foreground shadow-lg shadow-black/5 scale-[1.02]"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest mb-1">{d.day}</span>
                    <span className="text-base font-bold">{d.date}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Menu Sections */}
            <div className="space-y-6">
              {todayMenu.map((item) => (
                <motion.div key={item.id} variants={item}>
                  <Card className="group relative overflow-hidden border-border/40 hover:border-primary/20 transition-all duration-500 rounded-[3rem] bg-card shadow-sm">
                    <div className="p-8 md:p-10 flex items-center gap-10">
                      {/* Icon */}
                      <div className="relative shrink-0">
                         <div className="w-24 h-24 flex items-center justify-center text-5xl rounded-full bg-muted/30 transition-transform duration-700 group-hover:rotate-12">
                           {item.icon}
                         </div>
                      </div>

                      <div className="flex-1 min-w-0 space-y-4">
                        <div className="flex items-center gap-3">
                          <Badge className="text-[9px] font-bold uppercase tracking-widest px-3 py-1 border-none bg-primary/10 text-primary">
                            {item.meal}
                          </Badge>
                          <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" /> {item.time}
                          </span>
                        </div>
                        
                        <h4 className="text-3xl font-bold text-foreground tracking-tight">{item.menu}</h4>
                        
                        <div className="flex items-center gap-8 pt-2">
                           <div className="space-y-1">
                              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Energy</p>
                              <div className="flex items-center gap-2">
                                 <Flame className="w-3.5 h-3.5 text-orange-500" />
                                 <span className="text-sm font-bold">{item.calories} kcal</span>
                              </div>
                           </div>
                           <div className="w-px h-8 bg-border/40" />
                           <div className="space-y-1">
                              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Protein</p>
                              <div className="flex items-center gap-2">
                                 <Target className="w-3.5 h-3.5 text-blue-500" />
                                 <span className="text-sm font-bold">{item.protein}</span>
                              </div>
                           </div>
                           {item.isSpecial && (
                             <>
                               <div className="w-px h-8 bg-border/40" />
                               <div className="space-y-1">
                                  <p className="text-[9px] font-bold text-primary uppercase tracking-widest">Selection</p>
                                  <div className="flex items-center gap-2">
                                     <Sparkles className="w-3.5 h-3.5 text-primary" />
                                     <span className="text-sm font-bold text-primary">Chef Special</span>
                                  </div>
                               </div>
                             </>
                           )}
                        </div>
                      </div>

                      <div className="hidden sm:flex flex-col items-end gap-4 shrink-0">
                         <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:text-rose-500 hover:bg-rose-50 transition-all">
                            <Heart className="w-5 h-5" />
                         </Button>
                         <Button className={cn(
                           "h-12 px-8 rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] shadow-lg transition-all",
                           item.selected ? "bg-emerald-500 text-white hover:bg-emerald-600" : "bg-foreground text-background"
                         )}>
                            {item.selected ? 'Selected' : 'Choose'}
                         </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar: Dining Intelligence */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div variants={item} className="sticky top-8 space-y-8">
              
              {/* Preferences & Restrictions */}
              <Card className="p-8 rounded-[3rem] border-border/40 bg-card space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 px-1">
                   <Activity className="w-4 h-4" /> Preferences
                </h4>
                
                <div className="space-y-3">
                   <div className="flex items-center justify-between p-5 rounded-2xl bg-muted/20 border border-border/40">
                      <div className="flex items-center gap-4">
                         <Leaf className="w-5 h-5 text-emerald-500" />
                         <span className="text-xs font-bold">Vegetarian</span>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                   </div>
                   <div className="flex items-center justify-between p-5 rounded-2xl bg-muted/20 border border-border/40">
                      <div className="flex items-center gap-4">
                         <Info className="w-5 h-5 text-amber-500" />
                         <span className="text-xs font-bold">No Peanuts</span>
                      </div>
                      <Badge className="bg-amber-500/10 text-amber-600 border-none text-[8px] font-black px-2">ACTIVE</Badge>
                   </div>
                </div>

                <Button variant="outline" className="w-full h-14 rounded-2xl font-bold text-xs border-border/60 hover:bg-muted transition-all">
                  Customize Diet
                </Button>
              </Card>

              {/* Kitchen Alert */}
              <div className="p-8 rounded-[3rem] bg-primary/5 border border-primary/10 relative overflow-hidden group">
                <div className="relative z-10 flex gap-5">
                   <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                      <Bell className="w-5 h-5" />
                   </div>
                   <div className="space-y-2">
                     <p className="text-[11px] font-bold text-foreground uppercase tracking-widest">Formal Prep</p>
                     <p className="text-[10px] text-muted-foreground leading-relaxed font-medium">
                       Spring Formal prep starts Friday. Dinner will be served in the <strong>West Wing</strong>.
                     </p>
                   </div>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Admin View remains streamlined
  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-7xl mx-auto py-10 px-8">
      <div className="flex items-center justify-between pb-8 border-b border-border/40">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] mt-2">Executive Culinary Dashboard</p>
        </div>
        <Button className="h-12 px-8 rounded-2xl font-bold text-xs bg-primary text-primary-foreground shadow-xl shadow-primary/10">
          Update Cycle
        </Button>
      </div>

      <Card className="p-20 border-dashed border-2 border-border/40 bg-muted/10 rounded-[4rem] text-center flex flex-col items-center gap-6">
         <div className="w-20 h-20 rounded-[2rem] bg-background flex items-center justify-center text-muted-foreground shadow-inner">
            <UtensilsCrossed className="w-10 h-10" />
         </div>
         <div className="space-y-2">
            <h4 className="text-xl font-bold">Chef Insights Active</h4>
            <p className="text-sm text-muted-foreground max-w-sm">Inventory sync and nutritional auditing systems are currently operational.</p>
         </div>
         <Button variant="outline" className="h-12 rounded-2xl px-10 font-bold text-xs border-border/60">
            Open Inventory Suite
         </Button>
      </Card>
    </div>
  );
}
