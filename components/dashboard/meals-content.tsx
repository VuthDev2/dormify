'use client';

import {
  Clock, Leaf, Star, UtensilsCrossed,
  Plus, Activity, ChevronRight, Save,
  MessageSquare, CheckCircle2, Trash2,
  Sunrise, Sun, Sunset, Utensils, MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
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
  const isNormal = tier === 'normal';

  const getTodayLabel = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[new Date().getDay()];
  };

  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('daily');
  const [selectedDay, setSelectedDay] = useState(getTodayLabel());
  const [isManaging, setIsManaging] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);

  if (isTenant) return <TenantMealsView />;

  const weekDays = [
    { label: 'Mon', date: '06', full: 'Monday' }, { label: 'Tue', date: '07', full: 'Tuesday' },
    { label: 'Wed', date: '08', full: 'Wednesday' }, { label: 'Thu', date: '09', full: 'Thursday' },
    { label: 'Fri', date: '10', full: 'Friday' }, { label: 'Sat', date: '11', full: 'Saturday' },
    { label: 'Sun', date: '12', full: 'Sunday' },
  ];

  const initialMenu = useMemo(() => {
    const data: Record<string, any[]> = {};
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach(day => {
      data[day] = [
        {
          id: `${day}-REC-01`, type: 'Breakfast', time: '07:30 - 09:30', segment: 'Morning',
          menu: 'Continental Breakfast', servings: '120', remaining: '85',
          status: 'Served', icon: Sunrise, text: 'text-orange-500', bg: 'bg-orange-500/10',
          rating: 4.5, calories: '320', checked: true
        },
        {
          id: `${day}-REC-02`, type: 'Lunch', time: '12:00 - 14:00', segment: 'Afternoon',
          menu: 'Roasted Chicken & Veggies', servings: '150', remaining: '42',
          status: 'Active', icon: Sun, text: 'text-emerald-500', bg: 'bg-emerald-500/10',
          rating: 4.8, calories: '580', checked: false
        },
        {
          id: `${day}-REC-03`, type: 'Dinner', time: '18:30 - 20:30', segment: 'Evening',
          menu: 'Grilled Steak & Mash', servings: '140', remaining: '140',
          status: 'Scheduled', icon: Sunset, text: 'text-indigo-500', bg: 'bg-indigo-500/10',
          rating: 4.2, calories: '640', checked: false
        },
      ];
    });
    return data;
  }, []);

  const [allMenuItems, setAllMenuItems] = useState(initialMenu);

  const toggleCheck = (e: React.MouseEvent, day: string, id: string) => {
    e.stopPropagation();
    setAllMenuItems(prev => ({
      ...prev,
      [day]: prev[day].map(m => m.id === id ? { ...m, checked: !m.checked } : m)
    }));
  };

  const [editForm, setEditForm] = useState({
    menu: '', servings: '', remaining: '', status: ''
  });

  const openManager = (menuId: string | null) => {
    setSelectedMealId(menuId);
    const day = viewMode === 'daily' ? getTodayLabel() : selectedDay;
    if (menuId) {
      const foundMeal = allMenuItems[day].find(m => m.id === menuId);
      if (foundMeal) setEditForm({ 
        menu: foundMeal.menu, servings: foundMeal.servings, 
        remaining: foundMeal.remaining, status: foundMeal.status
      });
    } else {
      setEditForm({ menu: '', servings: '100', remaining: '100', status: 'Scheduled' });
    }
    setIsManaging(true);
  };

  const handleSave = () => {
    const day = viewMode === 'daily' ? getTodayLabel() : selectedDay;
    if (selectedMealId) {
      setAllMenuItems(prev => ({
        ...prev,
        [day]: prev[day].map(m => m.id === selectedMealId ? { ...m, ...editForm } : m)
      }));
    } else {
      const newMeal = {
        id: `NEW-${Math.random().toString(36).substr(2, 9)}`,
        type: 'Custom', time: 'TBD', segment: 'Custom',
        ...editForm,
        icon: Utensils, text: 'text-primary', bg: 'bg-primary/10',
        rating: 0, calories: '0', checked: false
      } as any;
      setAllMenuItems(prev => ({ ...prev, [day]: [...prev[day], newMeal] }));
    }
    setIsManaging(false);
  };

  const handleDelete = () => {
    const day = viewMode === 'daily' ? getTodayLabel() : selectedDay;
    if (selectedMealId) {
      setAllMenuItems(prev => ({
        ...prev,
        [day]: prev[day].filter(m => m.id !== selectedMealId)
      }));
      setIsManaging(false);
    }
  };

  const currentDayMeals = allMenuItems[getTodayLabel()];

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 pb-12">
      {/* Premium Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-8 border border-border/40 bg-card/60 backdrop-blur-2xl shadow-sm rounded-[2.5rem]"
      >
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/20">
            <UtensilsCrossed className="w-7 h-7" />
          </div>
          <div>
             <h1 className="font-black tracking-tight text-foreground text-3xl">{title}</h1>
             <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-none px-2 py-0.5 text-[9px] font-bold uppercase">Kitchen Live</Badge>
                <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">• Service Console</span>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex p-1.5 bg-muted/40 rounded-2xl gap-1.5 border border-border/10">
            {['daily', 'weekly'].map((mode) => (
              <Button 
                key={mode} variant="ghost" size="sm" 
                onClick={() => setViewMode(mode as any)}
                className={cn(
                  "h-10 rounded-xl text-[11px] font-black uppercase tracking-widest px-5 transition-all", 
                  viewMode === mode ? "bg-background text-primary shadow-md" : "text-muted-foreground/50 hover:text-foreground"
                )}
              >
                {mode === 'daily' ? 'Today' : 'Full Week'}
              </Button>
            ))}
          </div>
          <Button onClick={() => openManager(null)} className="h-11 rounded-xl gap-2 font-black px-6 bg-primary text-white shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
             <Plus className="w-4 h-4" /> Add Meal
          </Button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {viewMode === 'daily' ? (
            /* Clean Today View */
            <div className="space-y-8">
              <div className="flex items-center justify-between px-4">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-foreground">Today's Meal is...</h2>
                  <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest mt-1">Operational focus for {new Date().toLocaleDateString('en-GB', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className="flex items-center gap-3">
                   <div className="text-right hidden sm:block">
                      <p className="text-[9px] font-black uppercase text-muted-foreground/40 leading-none">Status</p>
                      <p className="text-xs font-black text-emerald-500 uppercase tracking-widest mt-1">Ready</p>
                   </div>
                   <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      <CheckCircle2 className="w-5 h-5" />
                   </div>
                </div>
              </div>

              <div className="grid gap-6">
                {currentDayMeals.map((item, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                    key={item.id}
                  >
                    <Card onClick={() => openManager(item.id)} className="group p-6 rounded-[2rem] border-border/40 hover:border-primary/30 transition-all cursor-pointer bg-card shadow-sm hover:shadow-xl relative overflow-hidden">
                       <div className={cn("absolute top-0 left-0 w-1.5 h-full", item.checked ? "bg-primary" : "bg-muted")} />
                       <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                          <div className="flex items-center gap-6">
                             <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border border-border/10 shadow-inner group-hover:scale-110 transition-all duration-500", item.bg)}>
                                <item.icon className={cn("w-8 h-8", item.text)} />
                             </div>
                             <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                   <span className={cn("text-[9px] font-black uppercase tracking-[0.2em]", item.text)}>{item.segment} Segment</span>
                                   <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest flex items-center gap-1.5">
                                      <Clock className="w-3.5 h-3.5" /> {item.time}
                                   </span>
                                </div>
                                <h3 className="text-xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors">{item.menu}</h3>
                                <div className="flex items-center gap-4">
                                   <Badge variant="outline" className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border-none", item.status === 'Served' ? 'bg-muted text-muted-foreground' : 'bg-primary/5 text-primary')}>{item.status}</Badge>
                                   <div className="flex items-center gap-1.5 text-amber-500">
                                      <Star className="w-3.5 h-3.5 fill-current" />
                                      <span className="text-xs font-black">{item.rating}</span>
                                   </div>
                                </div>
                             </div>
                          </div>

                          <div className="flex items-center gap-8 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-border/5">
                             <div className="space-y-2 flex-1 md:w-32">
                                <div className="flex justify-between items-end">
                                   <p className="text-[9px] font-black uppercase text-muted-foreground/40 tracking-widest">Portions Tracking</p>
                                   <span className="text-xs font-black text-foreground">{item.remaining} <span className="text-muted-foreground/30">/ {item.servings}</span></span>
                                </div>
                                <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                                   <motion.div 
                                      initial={{ width: 0 }} animate={{ width: `${(parseInt(item.remaining) / parseInt(item.servings)) * 100}%` }}
                                      className={cn("h-full rounded-full transition-all duration-1000", (parseInt(item.remaining) / parseInt(item.servings)) > 0.3 ? "bg-primary" : "bg-rose-500")} 
                                   />
                                </div>
                             </div>
                             <div className="flex items-center gap-3">
                                <button 
                                  onClick={(e) => toggleCheck(e, getTodayLabel(), item.id)}
                                  className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                                    item.checked ? "bg-primary text-white shadow-lg shadow-primary/30" : "bg-muted hover:bg-primary/10 text-muted-foreground/30 hover:text-primary"
                                  )}
                                >
                                   <CheckCircle2 className="w-5 h-5" />
                                </button>
                                <div className="p-2 rounded-xl text-muted-foreground/20 hover:text-foreground transition-colors"><MoreVertical className="w-5 h-5" /></div>
                             </div>
                          </div>
                       </div>
                    </Card>
                  </motion.div>
                ))}
                
                <Button variant="ghost" onClick={() => openManager(null)} className="w-full h-20 rounded-[2rem] border-2 border-dashed border-border/40 text-muted-foreground hover:bg-primary/[0.02] hover:border-primary/20 hover:text-primary transition-all flex items-center justify-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors"><Plus className="w-4 h-4" /></div>
                   <span className="text-xs font-black uppercase tracking-[0.2em]">Insert new service block</span>
                </Button>
              </div>
            </div>
          ) : (
            /* Refined Weekly View */
            <div className="space-y-6">
              <div className="flex gap-2 overflow-x-auto no-scrollbar pt-2 px-1 pb-2">
                {weekDays.map((d) => (
                  <button
                    key={d.label} onClick={() => setSelectedDay(d.label)}
                    className={cn(
                      "relative flex flex-col items-center justify-center min-w-[5rem] py-5 rounded-[1.5rem] transition-all duration-500 border",
                      selectedDay === d.label ? "bg-primary text-white border-primary shadow-xl scale-105" : "bg-card border-border/40 text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <span className={cn("text-[10px] font-black uppercase tracking-widest", selectedDay === d.label ? "text-white/80" : "opacity-60")}>{d.label}</span>
                    <span className="text-2xl font-black mt-1">{d.date}</span>
                  </button>
                ))}
              </div>

              <div className="rounded-[2.5rem] bg-card border border-border/40 shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 flex items-center justify-between bg-muted/30 border-b border-border/40 px-8">
                    <span className="text-[10px] font-black text-foreground uppercase tracking-[0.25em] flex items-center gap-3">
                      <Activity className="w-4 h-4 text-primary" /> Scheduling Node: {selectedDay}
                    </span>
                    <Button variant="outline" size="sm" onClick={() => openManager(null)} className="h-9 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2 bg-background border-dashed"><Plus className="w-4 h-4" /> Add Item</Button>
                </div>
                
                <div className="divide-y divide-border/40 flex-1 min-h-[450px]">
                  <AnimatePresence mode="wait">
                    <motion.div key={selectedDay} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      {allMenuItems[selectedDay]?.map((item) => (
                        <div key={item.id} onClick={() => openManager(item.id)} className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 transition-all group cursor-pointer hover:bg-primary/[0.02]">
                          <div className="flex items-center gap-6">
                              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-border/40 transition-all duration-500 group-hover:rotate-6", item.bg)}><item.icon className={cn("w-6 h-6", item.text)} /></div>
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-3">
                                    <span className={cn("text-[9px] font-black uppercase tracking-[0.2em]", item.text)}>{item.type}</span>
                                    <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {item.time}</span>
                                </div>
                                <h3 className="font-black text-foreground tracking-tight group-hover:text-primary transition-colors text-lg">{item.menu}</h3>
                              </div>
                          </div>
                          <div className="flex items-center gap-6 md:pl-8 md:border-l border-border/20">
                              <div className="flex items-center gap-4">
                                <button onClick={(e) => toggleCheck(e, selectedDay, item.id)} className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-all", item.checked ? "bg-primary text-white shadow-lg" : "bg-muted text-muted-foreground/30 hover:bg-primary/10")}><CheckCircle2 className="w-5 h-5" /></button>
                                <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-xl">{item.status}</Badge>
                                <ChevronRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                              </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Operational Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card className="p-8 rounded-[2.5rem] border bg-card border-border/40 shadow-sm flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-tight text-foreground">Service Coordination</h3>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Global Comms</p>
                </div>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[9px] font-black uppercase px-3 py-1">Active</Badge>
            </div>

            <div className="space-y-5">
              {[
                { user: 'Chef Marco', msg: 'Adjusting portions for lunch today.', time: '10:42' },
                { user: 'Sarah J.', msg: 'Dorm A maintenance completed.', time: '09:15' }
              ].map((log, i) => (
                <div key={i} className="p-4 rounded-2xl bg-muted/30 border border-border/10 space-y-2 hover:bg-muted/50 transition-all">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-black text-foreground">{log.user}</span>
                    <span className="text-[10px] font-bold text-muted-foreground/30">{log.time}</span>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground/80 leading-snug">{log.msg}</p>
                </div>
              ))}
            </div>
            
            <div className="relative">
              <Input placeholder="Type operational note..." className="h-12 rounded-2xl bg-muted/20 border-border/40 text-xs px-4 focus-visible:ring-primary/20" />
            </div>
          </Card>

          <Card className="p-8 rounded-[2.5rem] border bg-card border-border/40 shadow-sm overflow-hidden relative">
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-muted-foreground">Kitchen Vitals</h3>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="space-y-6">
                {[
                  { label: 'Core Capacity', val: 78, color: 'bg-primary' },
                  { label: 'Prep Efficiency', val: 92, color: 'bg-emerald-500' }
                ].map((v, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-foreground/80">
                      <span>{v.label}</span>
                      <span>{v.val}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden shadow-inner">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${v.val}%` }} className={cn("h-full rounded-full", v.color)} />
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full h-11 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border-border/40 hover:bg-muted/50">Full Diagnostics</Button>
            </div>
          </Card>
        </div>
      </div>

      <Dialog open={isManaging} onOpenChange={setIsManaging}>
        <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-3xl border-border/40 shadow-2xl rounded-[2.5rem] p-0 overflow-hidden">
          <DialogHeader className="p-8 pb-4 border-b border-border/10">
            <DialogTitle className="text-2xl font-black text-foreground tracking-tight">{selectedMealId ? 'Modify Service' : 'Initialize Service'}</DialogTitle>
          </DialogHeader>
          <div className="p-8 space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 px-1">Service Label / Menu Name</Label>
                <Input className="h-12 rounded-2xl bg-muted/20 border-border/40 font-bold px-4 focus-visible:ring-primary/20" value={editForm.menu} onChange={e => setEditForm({ ...editForm, menu: e.target.value })}/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 px-1">Planned Portions</Label>
                    <Input type="number" className="h-12 rounded-2xl bg-muted/20 font-bold px-4" value={editForm.servings} onChange={e => setEditForm({ ...editForm, servings: e.target.value })}/>
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 px-1">Remaining Portions</Label>
                    <Input type="number" className="h-12 rounded-2xl bg-muted/20 font-bold text-primary px-4" value={editForm.remaining} onChange={e => setEditForm({ ...editForm, remaining: e.target.value })}/>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 px-1">Service Phase</Label>
                <div className="flex p-1.5 bg-muted/40 rounded-[1.2rem] gap-1.5 border border-border/5">
                    {['Scheduled', 'Active', 'Served'].map(status => (
                      <button key={status} onClick={() => setEditForm({ ...editForm, status })} className={cn("flex-1 h-10 rounded-xl text-[10px] uppercase font-black tracking-widest transition-all", editForm.status === status ? "bg-background text-primary shadow-md" : "text-muted-foreground/50 hover:text-foreground")}>{status}</button>
                    ))}
                </div>
              </div>
          </div>
          <DialogFooter className="p-8 pt-2 flex items-center justify-between gap-4">
              {selectedMealId && <Button variant="ghost" onClick={handleDelete} className="h-12 rounded-2xl text-rose-500 hover:bg-rose-500/10 font-black text-[10px] uppercase tracking-widest gap-2"><Trash2 className="w-5 h-5" /> Terminate</Button>}
              <Button onClick={handleSave} className="flex-1 h-12 rounded-2xl gap-2 font-black text-[11px] uppercase tracking-widest bg-primary text-white border-none shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"><Save className="w-4 h-4" /> Save Operations</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
