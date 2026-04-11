'use client';

import {
  Clock, Leaf, Flame, Star,
  ShieldCheck, UtensilsCrossed,
  Plus, Search, AlertCircle,
  TrendingUp, Settings2, ArrowUpRight,
  Beef, Salad, Coffee, Activity, Zap, Wallet, Menu, ChevronRight, Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TenantMealsView } from './tenant-views';

interface MealsContentProps {
  title: string;
  tier?: 'normal' | 'pro' | 'premium';
  role?: 'admin' | 'tenant' | 'chef';
  subType?: string;
}

export function MealsContent({ title, tier = 'normal', role = 'admin', subType }: MealsContentProps) {
  const isTenant = role === 'tenant';
  const [selectedDay, setSelectedDay] = useState('Mon');
  const [isManaging, setIsManaging] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);

  if (isTenant) {
    return <TenantMealsView />;
  }

  const weekDays = [
    { label: 'Mon', date: '06' }, { label: 'Tue', date: '07' },
    { label: 'Wed', date: '08' }, { label: 'Thu', date: '09' },
    { label: 'Fri', date: '10' }, { label: 'Sat', date: '11' },
    { label: 'Sun', date: '12' },
  ];

  const ownerStats = useMemo(() => [
    { label: 'Daily Revenue', value: '£4,280', trend: '+12.5%', color: 'from-emerald-400 to-emerald-600', text: 'text-emerald-500' },
    { label: 'Avg. Meal Cost', value: '£3.42', trend: '-2.1%', color: 'from-blue-400 to-blue-600', text: 'text-blue-500' },
    { label: 'Food Waste', value: '2.4%', trend: 'Optimal', color: 'from-amber-400 to-amber-600', text: 'text-amber-500' },
    { label: 'Satisfaction', value: '4.85', trend: 'High', color: 'from-indigo-400 to-indigo-600', text: 'text-indigo-500' },
  ], []);

  // Stateful Menu Items
  const [menuItems, setMenuItems] = useState([
    {
      id: 'REC-01', type: 'Breakfast Service', time: '07:30 - 09:30',
      menu: 'Organic Acai Bowls',
      stock: '85', cost: '£2.10', margin: '65',
      status: 'Served', icon: Coffee, text: 'text-orange-500', bg: 'bg-orange-500/10'
    },
    {
      id: 'REC-02', type: 'Lunch Service', time: '12:00 - 14:00',
      menu: 'Atlantic Salmon & Quinoa',
      stock: '42', cost: '£4.20', margin: '58',
      status: 'Active', icon: Salad, text: 'text-emerald-500', bg: 'bg-emerald-500/10'
    },
    {
      id: 'REC-03', type: 'Dinner Service', time: '18:30 - 20:30',
      menu: 'Slow-Braised Beef',
      stock: '92', cost: '£5.80', margin: '52',
      status: 'Scheduled', icon: Beef, text: 'text-indigo-500', bg: 'bg-indigo-500/10'
    },
  ]);

  const activeMeal = menuItems.find(m => m.id === selectedMealId);

  // Form State
  const [editForm, setEditForm] = useState({
    menu: '', cost: '', margin: '', stock: '', status: ''
  });

  const openManager = (menuId: string | null) => {
    setSelectedMealId(menuId);
    if (menuId) {
      const meal = menuItems.find(m => m.id === menuId);
      if (meal) setEditForm({ menu: meal.menu, cost: meal.cost, margin: meal.margin, stock: meal.stock, status: meal.status });
    } else {
      setEditForm({ menu: '', cost: '£0.00', margin: '0', stock: '100', status: 'Scheduled' });
    }
    setIsManaging(true);
  };

  const handleSave = () => {
    if (selectedMealId) {
      setMenuItems(prev => prev.map(m => m.id === selectedMealId ? { ...m, ...editForm } : m));
    } else {
      const newMeal = {
        id: `REC-0${menuItems.length + 1}`,
        type: 'Custom Service', time: 'TBD',
        ...editForm,
        icon: Leaf, text: 'text-primary', bg: 'bg-primary/10'
      };
      setMenuItems([...menuItems, newMeal]);
    }
    setIsManaging(false);
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 pb-12">

      <Sheet open={isManaging} onOpenChange={setIsManaging}>

      {/* Floating Glass Header with Wow Factor Typography */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-[2rem] bg-card/40 dark:bg-blue-950/20 backdrop-blur-3xl border border-white/20 dark:border-blue-500/10 shadow-2xl relative overflow-hidden z-30"
      >
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-[60px] pointer-events-none"></div>
        <div className="flex items-center gap-5 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 dark:border-blue-500/20 flex items-center justify-center shrink-0 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)]">
            <UtensilsCrossed className="w-7 h-7 text-primary" />
          </div>
          <div>
             <h1 className="text-2xl lg:text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60 dark:from-white dark:to-white/40">{title}</h1>
             <p className="text-xs font-black text-primary uppercase tracking-[0.2em] mt-0.5">Premium Fleet Management</p>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <Button variant="outline" className="h-11 rounded-2xl gap-2 font-bold px-5 border-white/10 dark:border-blue-500/20 bg-background/50 backdrop-blur-xl hover:bg-background/80 dark:hover:bg-blue-500/5 transition-all">
             <Settings2 className="w-4 h-4 text-foreground/70" /> Configuration
          </Button>
          <Button onClick={() => openManager(null)} className="h-11 rounded-2xl gap-2 font-bold px-6 bg-foreground text-background dark:bg-blue-600 dark:text-white hover:scale-105 transition-transform shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_30px_-10px_rgba(37,99,235,0.3)] border-none">
             <Plus className="w-4 h-4" /> New Plan
          </Button>
        </div>
      </motion.div>

      {/* Dynamic KPI Ribbons */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {ownerStats.map((s, i) => (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            key={i} 
            className="group relative p-5 rounded-3xl bg-card/40 dark:bg-blue-950/20 backdrop-blur-2xl border border-white/20 dark:border-blue-500/10 shadow-lg overflow-hidden hover:-translate-y-1 transition-all duration-300"
          >
             <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500", s.color)}></div>
             <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2">{s.label}</p>
             <div className="flex items-baseline justify-between mt-1 relative z-10">
                <span className="text-3xl font-black tracking-tighter text-foreground">{s.value}</span>
                <span className={cn("text-[10px] font-black uppercase tracking-wider", s.text)}>{s.trend}</span>
             </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Main Work Surface */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Animated Day Selector Ribbon */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="flex gap-2 overflow-x-auto no-scrollbar pt-2 px-1 relative pb-2"
          >
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border/40 dark:via-blue-500/20 to-transparent"></div>
            {weekDays.map((d) => (
              <button
                key={d.label}
                onClick={() => setSelectedDay(d.label)}
                className={cn(
                  "relative flex flex-col items-center justify-center min-w-[4.5rem] py-3 rounded-2xl transition-all duration-300 overflow-hidden outline-none",
                  selectedDay === d.label
                    ? "bg-foreground/5 dark:bg-blue-500/10 shadow-sm text-foreground"
                    : "hover:bg-foreground/5 dark:hover:bg-blue-500/5 text-muted-foreground hover:text-foreground"
                )}
              >
                {selectedDay === d.label && (
                  <motion.div layoutId="activeDay" className="absolute inset-0 bg-card dark:bg-blue-900/20 border border-white/20 dark:border-blue-500/20 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] -z-10"></motion.div>
                )}
                <span className={cn("text-[10px] font-black uppercase tracking-widest transition-opacity duration-300", selectedDay === d.label ? "opacity-100" : "opacity-60")}>{d.label}</span>
                <span className="text-xl font-black mt-1">{d.date}</span>
                {selectedDay === d.label && (
                   <div className="absolute bottom-1 w-1 h-1 rounded-full bg-primary animate-pulse"></div>
                )}
              </button>
            ))}
          </motion.div>

          {/* Liquid Layout Menu Items */}
          <div className="rounded-[2.5rem] bg-card/40 dark:bg-blue-950/10 backdrop-blur-3xl border border-white/20 dark:border-blue-500/10 shadow-xl overflow-hidden flex flex-col relative">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 dark:via-blue-500/20 to-transparent"></div>
            
            <div className="p-6 border-b border-border/10 dark:border-blue-500/10 flex items-center justify-between z-10 bg-muted/10 dark:bg-blue-500/5">
               <span className="text-xs font-black text-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-500" /> Active Service Trajectory
               </span>
               <Badge className="bg-primary/10 text-primary border-none shadow-none text-[9px] uppercase font-black tracking-widest px-4 py-1 h-auto rounded-full">Phase 2 Ops</Badge>
            </div>
            
            <AnimatePresence mode="wait">
               <motion.div 
                 key={selectedDay}
                 initial={{ opacity: 0, x: 10 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -10 }}
                 transition={{ duration: 0.3 }}
                 className="divide-y divide-border/10 dark:divide-blue-500/10 flex-1 relative z-10"
               >
                  {menuItems.map((item, index) => (
                    <motion.div 
                       onClick={() => openManager(item.id)}
                       initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                       key={item.id} 
                       className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/5 dark:hover:bg-blue-500/5 transition-colors group cursor-pointer"
                    >
                       <div className="flex items-center gap-6">
                          <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-white/20 dark:border-blue-500/20 shadow-inner transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110", item.bg)}>
                             <item.icon className={cn("w-6 h-6", item.text)} />
                          </div>
                          <div>
                             <div className="flex items-center gap-3 mb-1">
                                <span className={cn("text-[9px] font-black uppercase tracking-[0.2em]", item.text)}>{item.type}</span>
                                <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest flex items-center gap-1"><Clock className="w-3 h-3" /> {item.time}</span>
                             </div>
                             <h3 className="font-bold text-lg text-foreground tracking-tight group-hover:text-primary transition-colors">{item.menu}</h3>
                          </div>
                       </div>

                       <div className="flex items-center gap-8 md:pl-8 md:border-l border-border/20 dark:border-blue-500/20">
                          <div className="space-y-1.5 w-24">
                             <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Inventory</p>
                             <div className="h-1.5 w-full bg-muted/50 dark:bg-blue-900/20 rounded-full overflow-hidden shadow-inner flex">
                                <div className={cn("h-full rounded-full transition-all duration-1000", parseInt(item.stock) > 50 ? "bg-emerald-500" : "bg-amber-500")} style={{ width: `${item.stock}%` }} />
                             </div>
                          </div>
                          <div className="space-y-1">
                             <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Cost</p>
                             <p className="text-sm font-black text-foreground">{item.cost}</p>
                          </div>
                          <div className="flex items-center gap-4">
                             <Badge variant="outline" className={cn(
                                "text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10 dark:border-blue-500/20 shadow-sm",
                                item.status === 'Active' ? "text-emerald-500 bg-emerald-500/10" : "text-muted-foreground bg-muted/30"
                             )}>{item.status}</Badge>
                             <ChevronRight className="w-5 h-5 text-muted-foreground/40 group-hover:text-foreground transition-colors group-hover:translate-x-1 duration-300 transform" />
                          </div>
                       </div>
                    </motion.div>
                  ))}
               </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Minimal Analytical Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
          className="lg:col-span-4 flex flex-col gap-6"
        >
          {/* Glowing Ops Alert */}
          <div className="p-6 rounded-[2.5rem] bg-rose-500/5 dark:bg-rose-950/20 backdrop-blur-2xl border border-rose-500/20 shadow-[0_0_40px_rgba(244,63,94,0.05)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-20 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-150 transition-transform duration-700 pointer-events-none">
               <AlertCircle className="w-32 h-32 text-rose-500" />
            </div>
            <div className="relative z-10 flex items-start gap-5">
               <div className="w-10 h-10 rounded-2xl bg-rose-500 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(244,63,94,0.4)] animate-pulse">
                  <ShieldCheck className="w-5 h-5 text-white" />
               </div>
               <div>
                  <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] mb-1.5">Stock Critical Alert</p>
                  <p className="text-sm font-bold text-rose-900 dark:text-rose-200 leading-snug">
                     Atlantic Salmon stock entirely depleted at Facility B. Action required for Wednesday Lunch.
                  </p>
                  <Button variant="link" className="text-rose-600 dark:text-rose-400 p-0 h-auto text-[10px] font-black uppercase tracking-widest mt-3 hover:text-rose-700 dark:hover:text-rose-300 flex items-center gap-1">
                     Intercept Supply Chain <ArrowUpRight className="w-3 h-3" />
                  </Button>
               </div>
            </div>
          </div>

          {/* Kitchen Health Telemetry */}
          <div className="p-6 rounded-[2.5rem] bg-card/40 dark:bg-blue-950/20 backdrop-blur-3xl border border-white/20 dark:border-blue-500/10 shadow-xl flex-1 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-emerald-500/5 dark:from-emerald-500/10 to-transparent pointer-events-none"></div>
            <div>
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                     Health Telemetry
                  </h3>
                  <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Live
                  </div>
               </div>
               <div className="space-y-6 relative z-10">
                 {[
                   { label: 'Oven Core Capacity', val: 78, color: 'text-foreground' },
                   { label: 'Staff Roster Presence', val: 100, color: 'text-emerald-500' },
                   { label: 'Prep Line Efficiency', val: 45, color: 'text-foreground' },
                 ].map((k, i) => (
                   <div key={i} className="group/item">
                     <div className="flex justify-between items-end mb-2">
                        <span className="text-[10px] font-black text-foreground uppercase tracking-widest">{k.label}</span>
                        <span className={cn("text-xs font-black", k.color)}>{k.val}%</span>
                     </div>
                     <div className="h-2 w-full bg-muted/40 dark:bg-blue-900/20 rounded-full overflow-hidden shadow-inner">
                        <motion.div 
                           initial={{ width: 0 }} 
                           animate={{ width: `${k.val}%` }} 
                           transition={{ duration: 1, delay: 0.5 + (i * 0.2) }}
                           className={cn("h-full rounded-full bg-foreground shadow-[0_0_10px_currentColor]")} 
                        />
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

        </motion.div>
      </div>

      {/* Editor Sheet */}
      <SheetContent className="bg-card/60 dark:bg-slate-950/80 backdrop-blur-3xl border-l border-white/20 dark:border-blue-500/20 sm:max-w-md w-full z-[100] shadow-2xl">
         <SheetHeader className="pb-6 border-b border-border/10 dark:border-blue-500/10">
            <SheetTitle className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50 dark:from-white dark:to-white/40">
               {selectedMealId ? 'Edit Service' : 'Schedule New Master Plan'}
            </SheetTitle>
            <SheetDescription className="text-xs font-bold text-muted-foreground">
               Update the specific line parameters for this menu node.
            </SheetDescription>
         </SheetHeader>
         
         <div className="py-8 space-y-6">
            <div className="space-y-2">
               <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Dish Menu Name</Label>
               <Input 
                  className="h-12 rounded-xl bg-background/50 dark:bg-blue-950/20 border-white/10 dark:border-blue-500/20 shadow-inner focus-visible:ring-primary/20 font-bold"
                  value={editForm.menu}
                  onChange={e => setEditForm({ ...editForm, menu: e.target.value })}
               />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Est. Cost</Label>
                  <Input 
                     className="h-12 rounded-xl bg-background/50 dark:bg-blue-950/20 border-white/10 dark:border-blue-500/20 shadow-inner font-bold"
                     value={editForm.cost}
                     onChange={e => setEditForm({ ...editForm, cost: e.target.value })}
                  />
               </div>
               <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Profit Margin</Label>
                  <Input 
                     className="h-12 rounded-xl bg-background/50 dark:bg-blue-950/20 border-white/10 dark:border-blue-500/20 shadow-inner font-bold"
                     value={editForm.margin}
                     onChange={e => setEditForm({ ...editForm, margin: e.target.value })}
                  />
               </div>
            </div>

            <div className="space-y-2">
               <div className="flex justify-between items-center">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Inventory Level (%)</Label>
                  <span className="text-[10px] font-black text-emerald-500">{editForm.stock}%</span>
               </div>
               <Input 
                  type="number" min="0" max="100"
                  className="h-12 rounded-xl bg-background/50 dark:bg-blue-950/20 border-white/10 dark:border-blue-500/20 shadow-inner font-bold"
                  value={editForm.stock}
                  onChange={e => setEditForm({ ...editForm, stock: e.target.value })}
               />
            </div>

            <div className="space-y-2 pt-2">
               <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Current Status</Label>
               <div className="flex gap-2">
                  {['Scheduled', 'Active', 'Served'].map(status => (
                     <Button 
                        key={status}
                        variant={editForm.status === status ? 'default' : 'outline'}
                        onClick={() => setEditForm({ ...editForm, status })}
                        className={cn(
                           "flex-1 h-10 rounded-xl text-[10px] uppercase font-black tracking-widest transition-all",
                           editForm.status === status 
                             ? "bg-foreground text-background dark:bg-blue-600 dark:text-white" 
                             : "bg-transparent border-white/10 dark:border-blue-500/20 text-muted-foreground hover:bg-blue-500/5"
                        )}
                     >
                        {status}
                     </Button>
                  ))}
               </div>
            </div>
         </div>

         <div className="absolute bottom-0 left-0 right-0 p-6 bg-card/60 dark:bg-slate-900/80 backdrop-blur-xl border-t border-white/10 dark:border-blue-500/10">
            <Button onClick={handleSave} className="w-full h-12 rounded-xl gap-2 font-bold bg-primary text-white hover:bg-primary/90 shadow-[0_10px_20px_-10px_rgba(37,99,235,0.5)] border-none">
               <Save className="w-4 h-4" /> Save Operations
            </Button>
         </div>
      </SheetContent>
      </Sheet>
    </div>
  );
}
