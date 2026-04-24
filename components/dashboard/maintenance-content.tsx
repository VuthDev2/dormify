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

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface MaintenanceContentProps {
  title: string;
  tier?: 'normal' | 'pro' | 'premium';
  role?: 'admin' | 'tenant' | 'chef';
  hideTitle?: boolean;
}

export function MaintenanceContent({ title, tier = 'normal', role = 'admin', hideTitle = false }: MaintenanceContentProps) {
  const [selectedFilter, setSelectedFilter] = useState('Requires Action');
  const [isManaging, setIsManaging] = useState(false);
  const [selectedWorkOrderId, setSelectedWorkOrderId] = useState<string | null>(null);

  const filterTabs = ['All Orders', 'Requires Action', 'In Progress', 'Resolved'];

  const ownerStats = useMemo(() => [
    { label: 'SLA Adherence', value: '96.2%', trend: '+1.5% this month', color: 'from-emerald-400 to-emerald-600', text: 'text-emerald-500' },
    { label: 'Mean Time to Repair', value: '1.8 Days', trend: 'Optimal Speed', color: 'from-blue-400 to-blue-600', text: 'text-blue-500' },
    { label: 'MTD Spend (OpEx)', value: '$3,410', trend: '$1,090 Under Budget', color: 'from-indigo-400 to-indigo-600', text: 'text-indigo-500' },
    { label: 'Pending Critical', value: '2', trend: 'Immediate Action', color: 'from-rose-400 to-rose-600', text: 'text-rose-500' },
  ], []);

  // Stateful Work Orders with Resident Info
  const [workOrders, setWorkOrders] = useState([
    {
      id: 'WO-8842', unit: 'Apt A-402',
      issue: 'Burst Pipe in Master Bathroom',
      category: 'Plumbing', priority: 'Critical',
      status: 'Requires Action', cost: 'Est. $850',
      vendor: null, slaStatus: 'Expiring in 2h',
      icon: AlertCircle, text: 'text-rose-500', bg: 'bg-rose-500/10', glow: 'shadow-rose-500/20',
      resident: { name: 'Jordan Smith', email: 'jordan.s@example.com', phone: '+1 (555) 123-4567', avatar: 'Jordan' }
    },
    {
      id: 'WO-8840', unit: 'HVAC Roof Unit 3',
      issue: 'Compressor Failure / No AC',
      category: 'HVAC', priority: 'High',
      status: 'In Progress', cost: '$1,240',
      vendor: { name: 'Sarah M.', company: 'Flow HVAC Ltd', avatar: 'Sarah' }, slaStatus: 'In Compliance',
      icon: Zap, text: 'text-amber-500', bg: 'bg-amber-500/10', glow: 'shadow-amber-500/20',
      resident: { name: 'Internal Facility', email: 'facility@dormify.com', phone: 'Ext. 402', avatar: 'Facility' }
    },
    {
      id: 'WO-8835', unit: 'Bldg F - Main Lobby',
      issue: 'Drywall Patch & Repaint',
      category: 'Structural', priority: 'Normal',
      status: 'Resolved', cost: '$320',
      vendor: { name: 'David B.', company: 'Internal Staff', avatar: 'David' }, slaStatus: 'Resolved',
      icon: Hammer, text: 'text-emerald-500', bg: 'bg-emerald-500/10', glow: 'shadow-emerald-500/20',
      resident: { name: 'Alex Rivera', email: 'alex.r@example.com', phone: '+1 (555) 987-6543', avatar: 'Alex' }
    },
  ]);

  const selectedOrder = useMemo(() => 
    workOrders.find(o => o.id === selectedWorkOrderId), 
  [selectedWorkOrderId, workOrders]);

  const openManager = (workId: string | null) => {
    setSelectedWorkOrderId(workId);
    setIsManaging(true);
  };

  const filteredOrders = useMemo(() => {
     if (selectedFilter === 'All Orders') return workOrders;
     return workOrders.filter(w => w.status === selectedFilter);
  }, [selectedFilter, workOrders]);

  return (
    <div className="w-full space-y-2 pb-12">

      <Dialog open={isManaging} onOpenChange={setIsManaging}>

      {!hideTitle && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/30 dark:border-blue-500/10"
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[9px] font-black uppercase tracking-[0.15em] text-primary/70 border-primary/20 bg-primary/5 px-2 py-0 h-auto rounded-md">
                Facilities / Operations
              </Badge>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground leading-tight">{title}</h1>
          </div>

          <div className="flex flex-col sm:items-end gap-2">
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="outline" className="h-8 rounded-lg gap-2 font-semibold px-3 border-border/40 dark:border-blue-500/20 hover:bg-muted/30 dark:hover:bg-blue-500/5 transition-colors text-[10px] bg-card dark:bg-blue-950/20">
                <Settings2 className="w-3.5 h-3.5" /> Settings
              </Button>
              <Button onClick={() => openManager(null)} className="h-8 rounded-lg gap-2 font-semibold px-4 bg-foreground text-background dark:bg-blue-600 dark:text-white shadow-md hover:shadow-lg transition-shadow text-[10px] border-none">
                <Plus className="w-3.5 h-3.5" /> Dispatch Order
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {hideTitle && <div className="h-2" />}

      {/* Dynamic KPI Ribbons (Operational Expenditure & SLA) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {ownerStats.map((s, i) => (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            key={i} 
            className="group relative p-4 rounded-2xl bg-card/40 dark:bg-blue-950/20 backdrop-blur-2xl border border-white/20 dark:border-blue-500/10 shadow-lg overflow-hidden hover:-translate-y-1 transition-all duration-300"
          >
             <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500", s.color)}></div>
             <p className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">{s.label}</p>
             <div className="flex items-baseline justify-between mt-1 relative z-10">
                <span className="text-2xl font-black tracking-tighter text-foreground">{s.value}</span>
                <span className={cn("text-[9px] font-black uppercase tracking-wider", s.text)}>{s.trend}</span>
             </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-stretch">
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
          <div className="rounded-[2.5rem] bg-card/40 dark:bg-blue-950/10 backdrop-blur-3xl border border-white/20 dark:border-blue-500/10 shadow-xl overflow-hidden flex flex-col relative min-h-[450px]">
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
          className="lg:col-span-4 h-full"
        >
          {/* Facility Health & Compliance Index */}
          <div className="p-8 rounded-[2.5rem] bg-card/40 dark:bg-blue-950/20 backdrop-blur-3xl border border-white/20 dark:border-blue-500/10 shadow-xl flex flex-col relative overflow-hidden group min-h-[500px]">
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary/5 dark:from-blue-500/10 to-transparent pointer-events-none"></div>
            <div className="flex-1 flex flex-col">
               <div className="flex items-center justify-between mb-10">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                     Facility Health Index
                  </h3>
                  <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5">
                     Next Audit: 12d
                  </div>
               </div>
               
               <div className="space-y-8 relative z-10 flex-1 flex flex-col justify-center">
                 {[
                   { name: 'HVAC Systems', status: 'Optimal', health: 94, icon: Zap, color: 'text-emerald-500' },
                   { name: 'Elevator Units', status: 'Service Due', health: 78, icon: Activity, color: 'text-amber-500' },
                   { name: 'Fire Safety', status: 'Certified', health: 100, icon: ShieldCheck, color: 'text-emerald-500' },
                   { name: 'Main Power Grid', status: 'Stable', health: 98, icon: Zap, color: 'text-emerald-500' },
                 ].map((v, i) => (
                   <div key={i} className="space-y-3 group/item cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className={cn("p-2.5 rounded-xl bg-muted/50 dark:bg-blue-900/40", v.color.replace('text', 'bg').replace('500', '500/10'))}>
                            <v.icon className={cn("w-4 h-4", v.color)} />
                          </div>
                          <div>
                            <p className="text-sm font-black text-foreground">{v.name}</p>
                            <p className="text-[9px] font-black text-muted-foreground/60 uppercase tracking-widest">{v.status}</p>
                          </div>
                        </div>
                        <span className="text-xs font-black text-foreground">{v.health}%</span>
                      </div>
                      <div className="h-2 w-full bg-muted dark:bg-blue-900/40 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${v.health}%` }}
                          transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                          className={cn("h-full rounded-full", v.health > 90 ? "bg-emerald-500" : v.health > 70 ? "bg-amber-500" : "bg-rose-500")}
                        />
                      </div>
                   </div>
                 ))}
               </div>
               
               <Button variant="outline" className="w-full h-12 rounded-2xl border-border/40 dark:border-blue-500/20 bg-muted/30 dark:bg-blue-900/20 mt-10 text-[10px] font-black uppercase tracking-widest hover:bg-muted/50 dark:hover:bg-blue-900/40 transition-all">
                   System Audit History
               </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Centered Detail Dialog */}
      <DialogContent className="max-w-2xl bg-card/60 dark:bg-slate-950/80 backdrop-blur-3xl border border-white/20 dark:border-blue-500/20 z-[100] shadow-2xl rounded-[2.5rem] overflow-hidden p-0">
         <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
         
         <DialogHeader className="p-8 pb-4">
            <div className="flex justify-between items-start w-full">
              <div className="space-y-1">
                <DialogTitle className="text-2xl font-black tracking-tighter uppercase text-foreground">
                   Request Information
                </DialogTitle>
                <DialogDescription className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                   Reference: {selectedOrder?.id} • {selectedOrder?.category}
                </DialogDescription>
              </div>
              <Badge className={cn(
                  "text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/10 dark:border-blue-500/20 shadow-lg",
                  selectedOrder?.status === 'Resolved' ? "bg-emerald-500 text-white" : 
                  selectedOrder?.status === 'In Progress' ? "bg-amber-500 text-white" : "bg-rose-500 text-white"
              )}>{selectedOrder?.status}</Badge>
            </div>
         </DialogHeader>
         
         <div className="px-8 pb-8 space-y-8">
            {/* Resident & Unit Context */}
            <div className="grid grid-cols-2 gap-6">
              <div className="p-5 rounded-3xl bg-muted/20 dark:bg-blue-950/20 border border-border/10 dark:border-blue-500/10 space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                   <User className="w-3.5 h-3.5" /> Resident Contact
                </div>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedOrder?.resident?.avatar}`} />
                    <AvatarFallback className="font-black">{selectedOrder?.resident?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-0.5">
                    <p className="text-sm font-black text-foreground leading-none">{selectedOrder?.resident?.name}</p>
                    <p className="text-[10px] font-bold text-muted-foreground">{selectedOrder?.resident?.email}</p>
                    <p className="text-[10px] font-bold text-primary/80 mt-1">{selectedOrder?.resident?.phone}</p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-muted/20 dark:bg-blue-950/20 border border-border/10 dark:border-blue-500/10 space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                   <MapPin className="w-3.5 h-3.5" /> Location Detail
                </div>
                <div className="space-y-1">
                  <p className="text-xl font-black text-foreground tracking-tight">{selectedOrder?.unit}</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Main Residential Wing</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <Badge variant="outline" className="text-[8px] font-black uppercase border-primary/20 text-primary px-2 py-0">Occupied</Badge>
                    <Badge variant="outline" className="text-[8px] font-black uppercase border-emerald-500/20 text-emerald-500 px-2 py-0">Standard Tier</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Maintenance Narrative */}
            <div className="p-6 rounded-[2rem] bg-foreground/5 dark:bg-blue-500/5 border border-foreground/10 dark:border-blue-500/10 space-y-4">
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                    <ClipboardList className="w-4 h-4" /> Issue Narrative
                 </div>
                 <span className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md", selectedOrder?.text, selectedOrder?.bg)}>
                    {selectedOrder?.priority} Priority
                 </span>
               </div>
               <p className="text-lg font-bold text-foreground leading-snug">
                 {selectedOrder?.issue}
               </p>
               <div className="pt-4 border-t border-border/10 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="space-y-0.5">
                      <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Logged On</p>
                      <p className="text-[10px] font-bold text-foreground">Oct 24, 2023 · 09:42 AM</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Category</p>
                      <p className="text-[10px] font-bold text-foreground">{selectedOrder?.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest text-right">Estimated OpEx</p>
                    <p className="text-sm font-black text-foreground">{selectedOrder?.cost}</p>
                  </div>
               </div>
            </div>

            {/* Action Group */}
            <div className="flex items-center gap-3 pt-2">
               <Button onClick={() => setIsManaging(false)} variant="outline" className="flex-1 h-12 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] border-border/40 hover:bg-muted transition-all">
                  Close Detail
               </Button>
               <Button className="flex-1 h-12 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] bg-foreground text-background dark:bg-blue-600 dark:text-white shadow-xl border-none">
                  Acknowledge Ticket
               </Button>
            </div>
         </div>
      </DialogContent>
      </Dialog>
    </div>
  );
}
