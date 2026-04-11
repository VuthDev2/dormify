'use client';

import {
  Wrench, ShieldCheck, AlertCircle,
  Plus, Search, TrendingUp,
  Settings2, ArrowUpRight,
  Clock, CheckCircle2, User,
  MapPin, Calendar, FileText,
  Hammer, Users, Zap, Wallet, Activity,
  ChevronRight, Save, Receipt, Target,
  ClipboardList
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MaintenanceContentProps {
  title: string;
  tier?: 'normal' | 'pro' | 'premium';
  role?: 'admin' | 'tenant' | 'chef';
}

export function MaintenanceContent({ title, tier = 'normal', role = 'admin' }: MaintenanceContentProps) {
  const [selectedFilter, setSelectedFilter] = useState('Requires Action');
  const [isManaging, setIsManaging] = useState(false);
  const [selectedWorkOrderId, setSelectedWorkOrderId] = useState<string | null>(null);

  const filterTabs = ['All Orders', 'Requires Action', 'In Progress', 'Resolved'];

  const ownerStats = useMemo(() => [
    { label: 'SLA Adherence', value: '96.2%', trend: '+1.5% this month', color: 'from-emerald-400 to-emerald-600', text: 'text-emerald-500' },
    { label: 'Mean Time to Repair', value: '1.8 Days', trend: 'Optimal Speed', color: 'from-blue-400 to-blue-600', text: 'text-blue-500' },
    { label: 'MTD Spend (OpEx)', value: '£3,410', trend: '£1,090 Under Budget', color: 'from-indigo-400 to-indigo-600', text: 'text-indigo-500' },
    { label: 'Pending Critical', value: '2', trend: 'Immediate Action', color: 'from-rose-400 to-rose-600', text: 'text-rose-500' },
  ], []);

  // Stateful Work Orders
  const [workOrders, setWorkOrders] = useState([
    {
      id: 'WO-8842', unit: 'Apt A-402',
      issue: 'Burst Pipe in Master Bathroom',
      category: 'Plumbing', priority: 'Critical',
      status: 'Requires Action', cost: 'Est. £850',
      vendor: null, slaStatus: 'Expiring in 2h',
      icon: AlertCircle, text: 'text-rose-500', bg: 'bg-rose-500/10', glow: 'shadow-rose-500/20'
    },
    {
      id: 'WO-8840', unit: 'HVAC Roof Unit 3',
      issue: 'Compressor Failure / No AC',
      category: 'HVAC', priority: 'High',
      status: 'In Progress', cost: '£1,240',
      vendor: { name: 'Sarah M.', company: 'Flow HVAC Ltd', avatar: 'Sarah' }, slaStatus: 'In Compliance',
      icon: Zap, text: 'text-amber-500', bg: 'bg-amber-500/10', glow: 'shadow-amber-500/20'
    },
    {
      id: 'WO-8835', unit: 'Bldg F - Main Lobby',
      issue: 'Drywall Patch & Repaint',
      category: 'Structural', priority: 'Normal',
      status: 'Resolved', cost: '£320',
      vendor: { name: 'David B.', company: 'Internal Staff', avatar: 'David' }, slaStatus: 'Resolved',
      icon: Hammer, text: 'text-emerald-500', bg: 'bg-emerald-500/10', glow: 'shadow-emerald-500/20'
    },
  ]);

  // Form State
  const [editForm, setEditForm] = useState({
    issue: '', category: '', unit: '', cost: '', status: '', priority: ''
  });

  const openManager = (workId: string | null) => {
    setSelectedWorkOrderId(workId);
    if (workId) {
      const order = workOrders.find(o => o.id === workId);
      if (order) setEditForm({ issue: order.issue, category: order.category, unit: order.unit, cost: order.cost, status: order.status, priority: order.priority });
    } else {
      setEditForm({ issue: '', category: 'General', unit: '', cost: '£0.00', status: 'Requires Action', priority: 'Normal' });
    }
    setIsManaging(true);
  };

  const handleSave = () => {
    if (selectedWorkOrderId) {
       setWorkOrders(prev => prev.map(o => o.id === selectedWorkOrderId ? { ...o, ...editForm } : o));
    } else {
       const oCount = workOrders.length + 1;
       const newOrder = {
         id: `WO-90${oCount}`,
         ...editForm,
         vendor: null,
         slaStatus: 'Action Required',
         icon: FileText, text: 'text-primary', bg: 'bg-primary/10', glow: 'shadow-primary/20'
       };
       setWorkOrders([newOrder, ...workOrders]);
    }
    setIsManaging(false);
  };

  const filteredOrders = useMemo(() => {
     if (selectedFilter === 'All Orders') return workOrders;
     return workOrders.filter(w => w.status === selectedFilter);
  }, [selectedFilter, workOrders]);

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 pb-12">

      <Sheet open={isManaging} onOpenChange={setIsManaging}>

      {/* Clean Horizon Header */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border/30 dark:border-blue-500/10"
      >
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground/50">Facilities / Operations</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground/60 font-medium">Active work orders, SLA compliance, and vendor coordination.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Button variant="outline" className="h-10 rounded-xl gap-2 font-semibold px-4 border-border/40 dark:border-blue-500/20 hover:bg-muted/30 dark:hover:bg-blue-500/5 transition-colors text-sm bg-card dark:bg-blue-950/20">
             <Settings2 className="w-4 h-4" /> Settings
          </Button>
          <Button onClick={() => openManager(null)} className="h-10 rounded-xl gap-2 font-semibold px-5 bg-foreground text-background dark:bg-blue-600 dark:text-white shadow-md hover:shadow-lg transition-shadow text-sm border-none">
             <Plus className="w-4 h-4" /> Dispatch Order
          </Button>
        </div>
      </motion.div>

      {/* Dynamic KPI Ribbons (Operational Expenditure & SLA) */}
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
        {/* Main Work Order Pipeline */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Animated Pipeline Ribbon */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="flex gap-3 overflow-x-auto no-scrollbar pt-2 px-1 relative pb-2"
          >
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border/40 dark:via-blue-500/20 to-transparent"></div>
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={cn(
                  "relative flex flex-col items-center justify-center min-w-[7.5rem] py-3 rounded-2xl transition-all duration-300 overflow-hidden outline-none",
                  selectedFilter === tab
                    ? "bg-foreground/5 dark:bg-blue-500/10 shadow-sm text-foreground"
                    : "hover:bg-foreground/5 dark:hover:bg-blue-500/5 text-muted-foreground hover:text-foreground"
                )}
              >
                {selectedFilter === tab && (
                  <motion.div layoutId="activeFilter" className="absolute inset-0 bg-card dark:bg-blue-900/20 border border-white/20 dark:border-blue-500/20 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] -z-10"></motion.div>
                )}
                <span className={cn("text-[10px] font-black uppercase tracking-widest transition-opacity duration-300", selectedFilter === tab ? "opacity-100" : "opacity-60")}>{tab}</span>
                {selectedFilter === tab && (
                   <div className={cn("absolute bottom-1 w-1.5 h-1.5 rounded-full", tab === 'Requires Action' ? 'bg-rose-500 animate-pulse' : 'bg-primary')} />
                )}
              </button>
            ))}
          </motion.div>

          {/* Liquid Layout Record Items */}
          <div className="rounded-[2.5rem] bg-card/40 dark:bg-blue-950/10 backdrop-blur-3xl border border-white/20 dark:border-blue-500/10 shadow-xl overflow-hidden flex flex-col relative min-h-[400px]">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 dark:via-blue-500/20 to-transparent"></div>
            
            <div className="p-6 border-b border-border/10 dark:border-blue-500/10 flex items-center justify-between z-10 bg-muted/10 dark:bg-blue-500/5">
               <span className="text-xs font-black text-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" /> Active Service Pipeline
               </span>
               <Badge className="bg-primary/10 text-primary border-none shadow-none text-[9px] uppercase font-black tracking-widest px-4 py-1 h-auto rounded-full">SLA Monitoring</Badge>
            </div>
            
            <AnimatePresence mode="wait">
               <motion.div 
                 key={selectedFilter}
                 initial={{ opacity: 0, x: 10 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -10 }}
                 transition={{ duration: 0.3 }}
                 className="divide-y divide-border/10 dark:divide-blue-500/10 flex-1 relative z-10"
               >
                  {filteredOrders.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-20 opacity-50">
                          <CheckCircle2 className="w-12 h-12 text-muted-foreground mb-4" />
                          <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Pipeline Clear</p>
                      </div>
                  ) : (
                    filteredOrders.map((order, index) => (
                        <motion.div 
                          onClick={() => openManager(order.id)}
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                          key={order.id} 
                          className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-muted/30 dark:hover:bg-blue-500/5 transition-colors group cursor-pointer"
                        >
                          <div className="flex items-center gap-6">
                              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-white/20 dark:border-blue-500/20 shadow-inner transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110", order.bg)}>
                                <order.icon className={cn("w-6 h-6", order.text)} />
                              </div>
                              <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <span className={cn("text-[9px] font-black uppercase tracking-[0.2em]", order.text)}>{order.priority} PRIORITY</span>
                                    <span className="text-[10px] font-bold text-muted-foreground/60 flex items-center gap-1"><MapPin className="w-3 h-3" /> {order.unit}</span>
                                </div>
                                <h3 className="font-bold text-lg text-foreground tracking-tight group-hover:text-primary transition-colors">{order.issue}</h3>
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 mt-1">{order.id} · {order.category}</p>
                              </div>
                          </div>

                          <div className="flex items-center gap-8 md:pl-8 md:border-l border-border/20 dark:border-blue-500/10">
                              <div className="space-y-1 w-28 hidden md:block">
                                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Assigned Vendor</p>
                                {order.vendor ? (
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6 border border-white/10 dark:border-blue-500/20">
                                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${order.vendor.avatar}`} />
                                            <AvatarFallback className="text-[8px] font-black">{order.vendor.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <p className="text-xs font-bold text-foreground truncate">{order.vendor.name}</p>
                                    </div>
                                ) : (
                                    <span className="text-xs font-black text-rose-500 uppercase tracking-wider">Unassigned</span>
                                )}
                              </div>
                              <div className="space-y-1">
                                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Est. OpEx</p>
                                <p className="text-sm font-black text-foreground">{order.cost}</p>
                              </div>
                              <div className="flex items-center gap-4">
                                <Badge variant="outline" className={cn(
                                    "text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10 dark:border-blue-500/20 shadow-sm",
                                    order.status === 'Resolved' ? "text-emerald-500 bg-emerald-500/10" : 
                                    order.status === 'In Progress' ? "text-amber-500 bg-amber-500/10" : "text-rose-500 bg-rose-500/10"
                                )}>{order.status}</Badge>
                                <ChevronRight className="w-5 h-5 text-muted-foreground/40 group-hover:text-foreground transition-colors group-hover:translate-x-1 duration-300 transform" />
                              </div>
                          </div>
                        </motion.div>
                    ))
                  )}
               </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Minimal Analytical Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
          className="lg:col-span-4 flex flex-col gap-6"
        >
          {/* Glowing SLA Alert */}
          <div className="p-6 rounded-[2.5rem] bg-rose-500/5 dark:bg-rose-950/20 backdrop-blur-2xl border border-rose-500/20 shadow-[0_0_40px_rgba(244,63,94,0.05)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-20 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-150 transition-transform duration-700 pointer-events-none">
               <AlertCircle className="w-32 h-32 text-rose-500" />
            </div>
            <div className="relative z-10 flex items-start gap-5">
               <div className="w-10 h-10 rounded-2xl bg-rose-500 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(244,63,94,0.4)] animate-pulse">
                  <Clock className="w-5 h-5 text-white" />
               </div>
               <div>
                  <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] mb-1.5">SLA Breach Warning</p>
                  <p className="text-sm font-bold text-rose-900 dark:text-rose-200 leading-snug">
                     Work Order #8842 (Plumbing) is nearing its 4-hour critical SLA threshold.
                  </p>
                  <Button variant="link" className="text-rose-600 dark:text-rose-400 p-0 h-auto text-[10px] font-black uppercase tracking-widest mt-3 hover:text-rose-700 dark:hover:text-rose-300 flex items-center gap-1">
                     Dispatch Vendor Instantly <ArrowUpRight className="w-3 h-3" />
                  </Button>
               </div>
            </div>
          </div>

          {/* Live Vendor Rollcall */}
          <div className="p-6 rounded-[2.5rem] bg-card/40 dark:bg-blue-950/20 backdrop-blur-3xl border border-white/20 dark:border-blue-500/10 shadow-xl flex-1 flex flex-col relative overflow-hidden group">
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary/5 dark:from-blue-500/10 to-transparent pointer-events-none"></div>
            <div>
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                     Vendor Telemetry
                  </h3>
                  <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5">
                     <span className="relative flex h-1.5 w-1.5 rounded-full bg-emerald-500">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                     </span> On Site Status
                  </div>
               </div>
               
               <div className="space-y-6 relative z-10">
                 {[
                   { name: 'Sarah M.', company: 'Flow Plumbing', status: 'On Site', avatar: 'Sarah' },
                   { name: 'David B.', company: 'Internal Handyman', status: 'Available', avatar: 'David' },
                   { name: 'Alex K.', company: 'Spark Electric', status: 'Off Duty', avatar: 'Alex' },
                 ].map((v, i) => (
                   <div key={i} className="flex justify-between items-center group/item hover:bg-muted/30 dark:hover:bg-blue-500/10 p-2 -mx-2 rounded-xl transition-all cursor-pointer">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10 border border-white/10 dark:border-blue-500/20 shadow-sm transition-transform group-hover/item:scale-110">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${v.avatar}`} />
                          <AvatarFallback className="text-[10px] font-black bg-muted dark:bg-blue-900/40">{v.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-black text-foreground">{v.name}</p>
                          <p className="text-[9px] font-black text-muted-foreground/60 uppercase tracking-widest">{v.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                         <div className={cn("w-1.5 h-1.5 rounded-full", v.status === 'Off Duty' ? "bg-muted-foreground/30" : v.status === 'Available' ? "bg-blue-500" : "bg-emerald-500")} />
                         <span className="text-[8px] font-black uppercase tracking-tighter text-muted-foreground/60">{v.status}</span>
                      </div>
                   </div>
                 ))}
               </div>
               
               <Button variant="outline" className="w-full h-11 rounded-2xl border-border/40 dark:border-blue-500/20 bg-muted/30 dark:bg-blue-900/20 mt-8 text-[10px] font-black uppercase tracking-widest hover:bg-muted/50 dark:hover:bg-blue-900/40 transition-all transition-all">
                   Manage Vendor Book
               </Button>
            </div>
          </div>

        </motion.div>
      </div>

      {/* Editor Sheet */}
      <SheetContent className="bg-card/60 dark:bg-slate-950/80 backdrop-blur-3xl border-l border-white/20 dark:border-blue-500/20 sm:max-w-md w-full z-[100] shadow-2xl">
         <SheetHeader className="pb-6 border-b border-border/10 dark:border-blue-500/10">
            <SheetTitle className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50 dark:from-white dark:to-white/40">
               {selectedWorkOrderId ? 'Manage Work Order' : 'Dispatch New Order'}
            </SheetTitle>
            <SheetDescription className="text-xs font-bold text-muted-foreground">
               Update standard operational parameters, assign vendors, and track OpEx accurately.
            </SheetDescription>
         </SheetHeader>
         
         <div className="py-8 space-y-6">
            <div className="space-y-3">
               <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Work Order Narrative</Label>
               <Input 
                  className="h-12 rounded-xl bg-background/50 dark:bg-blue-950/20 border-white/10 dark:border-blue-500/20 shadow-inner focus-visible:ring-primary/20 font-bold"
                  value={editForm.issue}
                  placeholder="E.g., Window Seal Broken"
                  onChange={e => setEditForm({ ...editForm, issue: e.target.value })}
               />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Unit Designation</Label>
                  <Input 
                     className="h-12 rounded-xl bg-background/50 dark:bg-blue-950/20 border-white/10 dark:border-blue-500/20 shadow-inner font-bold"
                     value={editForm.unit}
                     placeholder="Apt A-402"
                     onChange={e => setEditForm({ ...editForm, unit: e.target.value })}
                  />
               </div>
               <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Expected OpEx Cost</Label>
                  <Input 
                     className="h-12 rounded-xl bg-background/50 dark:bg-blue-950/20 border-white/10 dark:border-blue-500/20 shadow-inner font-bold"
                     value={editForm.cost}
                     placeholder="£0.00"
                     onChange={e => setEditForm({ ...editForm, cost: e.target.value })}
                  />
               </div>
            </div>

            <div className="space-y-3 pb-2 pt-2">
               <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">SLA Priority Protocol</Label>
               <div className="grid grid-cols-3 gap-2">
                  {['Normal', 'High', 'Critical'].map(level => (
                     <Button 
                        key={level}
                        variant={editForm.priority === level ? 'default' : 'outline'}
                        onClick={() => setEditForm({ ...editForm, priority: level })}
                        className={cn(
                           "h-10 rounded-xl text-[9px] uppercase font-black tracking-widest border-white/10 dark:border-blue-500/20 relative overflow-hidden transition-all",
                           editForm.priority === level && level === 'Critical' ? "bg-rose-500 text-white border-rose-500" :
                           editForm.priority === level ? "bg-foreground text-background dark:bg-blue-600 dark:text-white" : "bg-transparent text-muted-foreground hover:bg-muted/20 dark:hover:bg-blue-500/10"
                        )}
                     >
                        {level}
                     </Button>
                  ))}
               </div>
            </div>

            <div className="space-y-3 mt-4">
               <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Pipeline Status</Label>
               <div className="grid grid-cols-3 gap-2">
                  {['Requires Action', 'In Progress', 'Resolved'].map(status => (
                     <Button 
                        key={status}
                        variant={editForm.status === status ? 'default' : 'outline'}
                        onClick={() => setEditForm({ ...editForm, status })}
                        className={cn(
                           "flex-1 h-12 whitespace-normal leading-tight rounded-xl text-[9px] uppercase font-black tracking-widest border-white/10 dark:border-blue-500/20 transition-all",
                           editForm.status === status ? "bg-primary text-white border-none shadow-lg shadow-primary/20" : "bg-transparent text-muted-foreground hover:bg-muted/20 dark:hover:bg-blue-500/10"
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
