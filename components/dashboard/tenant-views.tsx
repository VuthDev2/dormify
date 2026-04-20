'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard, Clock, CheckCircle2, AlertTriangle, Download,
  ChevronRight, ChevronDown, Info, Plus, Wallet, Calendar,
  Wrench, MessageSquare, MapPin, ArrowRight, Home,
  Phone, Shield, Camera, Key, FileText, User, Zap, Lock,
  History as HistoryIcon, ClipboardList, Send, ArrowUpRight, Check,
  Droplets, Leaf, Activity, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const MY_INVOICES = [
  { id: 'INV-24-102', desc: 'Summer Term Rent', amount: '£3,100.00', due: 'Apr 01', status: 'Pending', type: 'Accommodation', icon: Home, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 'INV-24-101', desc: 'Meal Plan Renew', amount: '£450.00', due: 'Mar 15', status: 'Paid', type: 'Service', icon: CoffeeIcon, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { id: 'INV-24-100', desc: 'Spring Term Rent', amount: '£3,100.00', due: 'Jan 01', status: 'Paid', type: 'Accommodation', icon: Home, color: 'text-blue-500', bg: 'bg-blue-500/10' },
];

const MY_TICKETS = [
  { id: 'MNT-8840', title: 'Leaking Shower Head', status: 'In Progress', expected: 'Today, 2:00 PM', urgency: 'Normal', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 'MNT-8822', title: 'HVAC Air Filter Replacement', status: 'Resolved', expected: 'Completed', urgency: 'Low', icon: Zap, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
];

const WEEKLY_MENU = [
  { 
    id: 'M1', day: 'Today', type: 'Lunch', 
    title: 'Miso-Glazed Atlantic Salmon', 
    desc: 'Served with ginger-infused quinoa, steamed bok choy, and a citrus-soy reduction.',
    calories: '450 kcal', proteins: '32g', carb: '28g', fat: '18g',
    tags: ['High Protein', 'Gluten Free'],
    img: '/gourmet-dining.jpg',
    time: '12:00 - 14:30',
    available: true
  },
  { 
    id: 'M2', day: 'Today', type: 'Dinner', 
    title: 'Slow-Braised Chuck Beef', 
    desc: 'Red wine reduction, truffle mashed potatoes, and honey-glazed heirloom carrots.',
    calories: '680 kcal', proteins: '42g', carb: '45g', fat: '32g',
    tags: ['Premium', 'Hearty'],
    img: '/dining-hall.jpg',
    time: '18:30 - 20:30',
    available: true
  },
  { 
    id: 'M3', day: 'Tomorrow', type: 'Breakfast', 
    title: 'Acai Energy Bowl', 
    desc: 'Organic acai topped with gluten-free granola, seasonal berries, and manuka honey.',
    calories: '320 kcal', proteins: '8g', carb: '52g', fat: '6g',
    tags: ['Vegan', 'Energy'],
    img: '/hero-bg.jpg',
    time: '07:30 - 09:30',
    available: true
  }
];

function CoffeeIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="9" x2="9" y1="2" y2="4"/><line x1="15" x2="15" y1="2" y2="4"/></svg>
}

// ═══════════════════════════════════════════════════════════════════════════════
//  TENANT INVOICES VIEW
// ═══════════════════════════════════════════════════════════════════════════════

export function TenantInvoicesView() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-[1400px] mx-auto pb-12 space-y-6">
      
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/30 dark:border-blue-500/10">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground/50">Account / Finances</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Financial Ledger</h1>
          <p className="text-xs text-muted-foreground font-medium">Manage invoices, view statements, and track your payment history.</p>
        </div>
        <Button variant="outline" className="h-9 px-4 rounded-lg border-border dark:border-blue-500/10 text-[10px] font-bold uppercase tracking-widest gap-2 hover:bg-muted/50 transition-all">
           <Download className="w-3.5 h-3.5" /> Export Statement
        </Button>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div variants={itemVariants} className="p-5 rounded-2xl bg-card border border-border/50 shadow-sm relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                 <div className="flex items-center gap-2 mb-2 text-amber-500/80">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Pending Balance</span>
                 </div>
                 <h3 className="text-3xl font-bold tracking-tight text-foreground">£3,100.00</h3>
                 <p className="text-[10px] font-medium text-muted-foreground mt-1 italic">Next Due: April 01, 2026</p>
              </motion.div>
              <motion.div variants={itemVariants} className="p-5 rounded-2xl bg-card border border-border/50 shadow-sm relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                 <div className="flex items-center gap-2 mb-2 text-emerald-500/80">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Total Paid (YTD)</span>
                 </div>
                 <h3 className="text-3xl font-bold tracking-tight text-foreground">£3,550.00</h3>
                 <p className="text-[10px] font-medium text-muted-foreground mt-1 italic">Tax Year 2025/26</p>
              </motion.div>
           </div>

           <motion.div variants={itemVariants} className="rounded-2xl bg-card border border-border/50 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
             <div className="p-4 border-b border-border/50 flex items-center justify-between bg-muted/5">
                <span className="text-xs font-bold text-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                   <HistoryIcon className="w-4 h-4 text-primary" /> Statement History
                </span>
                <Badge variant="outline" className="text-[9px] font-bold text-muted-foreground/40 border-none px-0">Verified Records</Badge>
             </div>
             <div className="divide-y divide-border/50">
                {MY_INVOICES.map((inv) => (
                   <div key={inv.id} className="group flex flex-col">
                      <button onClick={() => setExpanded(expanded === inv.id ? null : inv.id)} className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-all text-left">
                         <div className="flex items-center gap-4">
                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border border-border/50 shadow-sm transition-transform group-hover:scale-105", inv.bg)}>
                               <inv.icon className={cn("w-4.5 h-4.5", inv.color)} />
                            </div>
                            <div>
                               <div className="flex items-center gap-2 mb-0.5">
                                  <Badge className={cn("text-[8px] font-bold uppercase tracking-widest px-2 py-0 h-4 border-none", inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500')}>{inv.status}</Badge>
                                  <span className="text-[9px] font-bold text-muted-foreground/40 uppercase">Due {inv.due}</span>
                               </div>
                               <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{inv.desc}</h3>
                            </div>
                         </div>
                         <div className="flex items-center gap-6">
                            <span className="text-base font-bold tracking-tight">{inv.amount}</span>
                            <ChevronDown className={cn("w-4 h-4 text-muted-foreground/30 transition-transform", expanded === inv.id && "rotate-180")} />
                         </div>
                      </button>
                      <AnimatePresence>
                         {expanded === inv.id && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-muted/10 border-t border-border/20">
                               <div className="p-5 flex items-center justify-between gap-6">
                                  <div className="flex gap-8">
                                     <div className="space-y-0.5"><p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40">Ref ID</p><p className="text-xs font-semibold">{inv.id}</p></div>
                                     <div className="space-y-0.5"><p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40">Type</p><p className="text-xs font-semibold">{inv.type}</p></div>
                                  </div>
                                  <div className="flex gap-2">
                                     <Button variant="outline" className="h-8 rounded-lg text-[9px] uppercase font-bold tracking-widest px-3 border-border/50"><Download className="w-3.5 h-3.5 mr-2" /> Receipt</Button>
                                     {inv.status === 'Pending' && <Button className="h-8 rounded-lg text-[9px] uppercase font-bold tracking-widest px-4 bg-primary text-white shadow-sm border-none">Pay Now</Button>}
                                  </div>
                               </div>
                            </motion.div>
                         )}
                      </AnimatePresence>
                   </div>
                ))}
             </div>
           </motion.div>
        </div>

        <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
           <Card className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-black text-white relative overflow-hidden shadow-lg border border-white/5">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[60px] pointer-events-none" />
              <div className="relative z-10 space-y-12">
                 <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2 text-white/40">
                       <CreditCard className="w-4 h-4" />
                       <span className="text-[10px] font-bold uppercase tracking-widest">Digital Wallet</span>
                    </div>
                    <div className="w-8 h-5 rounded bg-white/10 flex items-center justify-center">
                       <div className="w-3 h-3 rounded-full bg-amber-400/80 -translate-x-0.5" />
                       <div className="w-3 h-3 rounded-full bg-rose-500/80 translate-x-0.5" />
                    </div>
                 </div>
                 <div>
                    <h3 className="text-xl font-bold tracking-[0.2em] mb-1">••••  ••••  ••••  4242</h3>
                    <div className="flex justify-between items-center text-white/30">
                       <p className="text-[9px] font-bold uppercase tracking-widest">Sarah Johnson</p>
                       <p className="text-[9px] font-bold uppercase tracking-widest">12 / 28</p>
                    </div>
                 </div>
              </div>
           </Card>

           <Card className="p-5 border border-border/50 bg-card shadow-sm rounded-2xl space-y-5">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60 border-b border-border/10 pb-4">Financial Tools</h4>
              <div className="space-y-1">
                 {[
                   { l: 'Auto-Pay Setup', i: Zap },
                   { l: 'Tax Invoices', i: FileText },
                   { l: 'Support Node', i: MessageSquare },
                 ].map((act, i) => (
                   <button key={i} className="flex flex-row items-center justify-between w-full p-3 rounded-xl hover:bg-muted/50 transition-all group/item">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center group-hover/item:text-primary transition-colors">
                            <act.i className="w-4 h-4" />
                         </div>
                         <span className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground group-hover/item:text-foreground transition-colors">{act.l}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover/item:text-primary transition-all" />
                   </button>
                 ))}
              </div>
           </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  TENANT MAINTENANCE VIEW
// ═══════════════════════════════════════════════════════════════════════════════

export function TenantMaintenanceView() {
  const [ticketForm, setTicketForm] = useState(false);

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-[1400px] mx-auto pb-12 space-y-6 relative">
      
      <AnimatePresence>
         {ticketForm && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex justify-end bg-background/80 backdrop-blur-sm">
               <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="w-full max-w-md h-full bg-card border-l border-border shadow-2xl flex flex-col relative z-50">
                  <div className="p-6 border-b border-border flex items-center justify-between">
                     <div><h2 className="text-xl font-bold tracking-tight">Concierge Request</h2><p className="text-[10px] font-bold tracking-[0.2em] text-primary mt-1 uppercase">Submit Issue</p></div>
                     <button onClick={() => setTicketForm(false)} className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors shrink-0">✕</button>
                  </div>
                  <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                     <div className="space-y-2.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Service Category</label>
                        <div className="grid grid-cols-2 gap-2">
                           {['Plumbing', 'Electrical', 'HVAC', 'General'].map(c => <Button key={c} variant="outline" className="h-10 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:border-primary border-border/60">{c}</Button>)}
                        </div>
                     </div>
                     <div className="space-y-2.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Issue Description</label>
                        <textarea className="w-full h-32 px-4 py-3 rounded-lg bg-muted/20 border border-border/60 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary/40 resize-none" placeholder="Provide details of the problem..." />
                     </div>
                  </div>
                  <div className="p-6 border-t border-border">
                     <Button className="w-full h-12 rounded-xl bg-primary text-white font-bold uppercase tracking-widest shadow-lg hover:translate-y-[-1px] transition-all border-none">Submit Request <Send className="w-4 h-4 ml-2" /></Button>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>

      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/30 dark:border-blue-500/10">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground/50">Services / Concierge</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Service Requests</h1>
          <p className="text-xs text-muted-foreground font-medium">Submit and track maintenance requests for your unit.</p>
        </div>
        <Button onClick={() => setTicketForm(true)} className="h-9 px-4 rounded-lg bg-primary text-white text-[10px] font-bold uppercase tracking-widest gap-2 shadow-sm border-none transition-all hover:translate-y-[-1px]">
           <Plus className="w-3.5 h-3.5" /> Request Service
        </Button>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-6">
         <div className="lg:col-span-8 space-y-6">
            <motion.div variants={itemVariants} className="rounded-2xl bg-card border border-border/50 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
               <div className="p-4 border-b border-border/50 flex items-center justify-between bg-muted/5">
                  <span className="text-xs font-bold text-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                     <Clock className="w-4 h-4 text-primary" /> Active Work Orders
                  </span>
                  <Badge variant="outline" className="text-[9px] font-bold text-muted-foreground/40 border-none px-0">Real-time Tracking</Badge>
               </div>
               <div className="divide-y divide-border/50">
                  {MY_TICKETS.map(t => (
                     <div key={t.id} className="p-6 flex flex-col hover:bg-muted/10 transition-all">
                        <div className="flex items-center justify-between gap-6 mb-4">
                           <div className="flex items-center gap-4">
                              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border border-border/50 shadow-inner", t.bg)}>
                                 <t.icon className={cn("w-4.5 h-4.5", t.color)} />
                              </div>
                              <div className="space-y-0.5">
                                 <h3 className="text-base font-bold tracking-tight">{t.title}</h3>
                                 <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">{t.id} • {t.urgency} Priority</p>
                              </div>
                           </div>
                           <Badge className={cn("text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-md border-none", t.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary/10 text-primary')}>{t.status}</Badge>
                        </div>
                        {t.status === 'In Progress' && (
                           <div className="relative pt-4">
                              <div className="absolute top-6 left-0 w-full h-1 bg-muted rounded-full overflow-hidden">
                                 <motion.div initial={{ width: 0 }} animate={{ width: '50%' }} transition={{ duration: 1.5, ease: "circOut" }} className="h-full bg-primary shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                              </div>
                              <div className="flex justify-between relative z-10 text-[8px] font-bold uppercase tracking-widest text-muted-foreground/40">
                                 <span className="flex flex-col items-center gap-2 text-primary">
                                    <div className="w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-primary/20" /> Received
                                 </span>
                                 <span className="flex flex-col items-center gap-2 text-primary">
                                    <div className="w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-primary/20" /> Assigned
                                 </span>
                                 <span className="flex flex-col items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-muted" /> Arriving
                                 </span>
                                 <span className="flex flex-col items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-muted" /> Closed
                                 </span>
                              </div>
                              <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-between">
                                 <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20"><User className="w-4 h-4" /></div>
                                    <div>
                                       <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Technician Dispatched</p>
                                       <p className="text-xs font-semibold text-foreground">ETA: Today, 2:00 PM</p>
                                    </div>
                                 </div>
                                 <Button size="sm" variant="ghost" className="h-7 text-[9px] font-bold uppercase tracking-widest hover:text-primary">Chat</Button>
                              </div>
                           </div>
                        )}
                        {t.status === 'Resolved' && (
                           <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold mt-2">
                              <CheckCircle2 className="w-4 h-4" /> Issue fully resolved and signed off.
                           </div>
                        )}
                     </div>
                  ))}
               </div>
            </motion.div>
         </div>

         <div className="lg:col-span-4 space-y-6">
            <Card className="p-6 border-rose-500/20 bg-rose-500/5 rounded-2xl shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
               <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-2 text-rose-500">
                     <AlertTriangle className="w-4 h-4 animate-pulse" />
                     <span className="text-[10px] font-bold uppercase tracking-widest">Emergency Hotline</span>
                  </div>
                  <div>
                     <h3 className="text-xl font-bold tracking-tight text-foreground">Rapid Response</h3>
                     <p className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest">24/7 Priority Support</p>
                  </div>
                  <Button className="w-full h-10 bg-rose-500 text-white hover:bg-rose-600 font-bold text-[10px] uppercase tracking-widest rounded-xl border-none transition-all shadow-sm">
                     Call 020 7946 0000
                  </Button>
               </div>
            </Card>

            <Card className="p-6 border border-border/50 bg-card rounded-2xl shadow-sm space-y-5">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60 border-b border-border/10 pb-4">Service Guarantee</h4>
               <div className="space-y-3">
                  {[
                    { l: 'Critical Priority', v: '< 2 Hours', c: 'text-rose-500' },
                    { l: 'High Priority', v: 'Same Day', c: 'text-amber-500' },
                    { l: 'Standard', v: '24-48 Hours', c: 'text-primary' },
                  ].map((s, i) => (
                    <div key={i} className="flex justify-between items-center bg-muted/20 p-3 rounded-xl border border-border/10">
                       <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">{s.l}</span>
                       <span className={cn("text-[9px] font-bold uppercase tracking-widest", s.c)}>{s.v}</span>
                    </div>
                  ))}
               </div>
            </Card>
         </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  TENANT MEALS VIEW
// ═══════════════════════════════════════════════════════════════════════════════

export function TenantMealsView() {
  const [activeTab, setActiveTab] = useState('Today');

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-[1400px] mx-auto pb-12 space-y-8">
      
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/30 dark:border-blue-500/10">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">Resident Experience / Culinary</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground italic">Gourmet <span className="text-muted-foreground/30 not-italic font-medium uppercase">Node</span></h1>
          <p className="text-xs text-muted-foreground font-medium">Curated daily menus from our executive kitchen.</p>
        </div>
        
        <div className="flex items-center gap-4">
           <Card className="flex items-center gap-4 px-4 py-2 bg-muted/20 dark:bg-blue-500/5 border-border/50 rounded-xl shadow-none">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                 <Zap className="w-4 h-4" />
              </div>
              <div>
                 <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Available Credits</p>
                 <p className="text-sm font-bold text-foreground">18 <span className="text-[10px] opacity-40">Meals</span></p>
              </div>
              <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-full hover:bg-primary/10 hover:text-primary">
                 <Plus className="w-3.5 h-3.5" />
              </Button>
           </Card>
           <Button variant="outline" className="h-10 rounded-xl border-border dark:border-blue-500/10 text-[10px] font-bold uppercase tracking-widest gap-2 hover:bg-muted/50 transition-all">
              <HistoryIcon className="w-3.5 h-3.5" /> History
           </Button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
               {['Today', 'Tomorrow', 'Monday', 'Tuesday', 'Wednesday'].map((day, i) => (
                  <button 
                     key={day}
                     onClick={() => setActiveTab(day)}
                     className={cn(
                        "flex flex-col items-center min-w-[80px] py-3 rounded-xl border transition-all",
                        activeTab === day 
                          ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105" 
                          : "bg-card text-muted-foreground border-border/50 hover:bg-muted/50"
                     )}
                  >
                     <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">{i === 0 ? 'Now' : 'Apr'}</span>
                     <span className="text-lg font-bold tracking-tight">{i + 17}</span>
                     <span className="text-[9px] font-bold uppercase">{day}</span>
                  </button>
               ))}
               <Button variant="ghost" className="min-w-[80px] h-auto py-3 rounded-xl border border-dashed border-border flex flex-col items-center gap-1 hover:border-primary hover:text-primary">
                  <Calendar className="w-4 h-4" />
                  <span className="text-[9px] font-bold uppercase">Full Month</span>
               </Button>
            </div>

            <div className="grid gap-6">
               {WEEKLY_MENU.filter(m => activeTab === 'Today' ? m.day === 'Today' : true).map((meal) => (
                  <motion.div variants={itemVariants} key={meal.id} className="group relative rounded-2xl bg-card border border-border/50 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
                     <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-56 h-48 sm:h-auto overflow-hidden relative">
                           <img src={meal.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={meal.title} />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                           <div className="absolute top-3 left-3 flex gap-1.5">
                              <Badge className="bg-white/90 dark:bg-slate-900/90 text-foreground border-none text-[8px] font-bold uppercase px-2 py-0.5 backdrop-blur-md">{meal.type}</Badge>
                              {meal.tags.includes('Premium') && <Badge className="bg-amber-500 text-white border-none text-[8px] font-bold uppercase px-2 py-0.5">Premium</Badge>}
                           </div>
                        </div>
                        
                        <div className="flex-1 p-5 space-y-4">
                           <div className="flex justify-between items-start gap-4">
                              <div className="space-y-1">
                                 <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">{meal.title}</h3>
                                 <div className="flex gap-2 flex-wrap">
                                    {meal.tags.map(t => (
                                       <span key={t} className="flex items-center gap-1 text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                                          <div className="w-1 h-1 rounded-full bg-primary/40" /> {t}
                                       </span>
                                    ))}
                                 </div>
                              </div>
                              <div className="text-right shrink-0">
                                 <p className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">Window</p>
                                 <p className="text-xs font-bold text-foreground">{meal.time}</p>
                              </div>
                           </div>
                           
                           <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{meal.desc}</p>
                           
                           <div className="flex items-center justify-between pt-2">
                              <div className="flex items-center gap-4">
                                 <div className="flex flex-col">
                                    <span className="text-[8px] font-bold text-muted-foreground/40 uppercase tracking-widest">Energy</span>
                                    <span className="text-[11px] font-bold">{meal.calories}</span>
                                 </div>
                                 <div className="h-6 w-px bg-border/50" />
                                 <div className="flex flex-col">
                                    <span className="text-[8px] font-bold text-muted-foreground/40 uppercase tracking-widest">Service</span>
                                    <span className="text-[10px] font-bold text-emerald-500 uppercase flex items-center gap-1">
                                       <CheckCircle2 className="w-3 h-3" /> Live
                                    </span>
                                 </div>
                              </div>
                              <div className="flex gap-2">
                                 <Button variant="ghost" size="sm" className="h-8 rounded-lg px-4 text-[10px] font-bold uppercase tracking-widest hover:bg-muted">Details</Button>
                                 <Button className="h-8 rounded-lg px-6 text-[10px] font-bold uppercase tracking-widest bg-primary text-white shadow-sm hover:translate-y-[-1px] transition-all border-none">Reserve Meal</Button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>

         <div className="lg:col-span-4 space-y-6">
            <Card className="p-6 rounded-2xl border-border/50 bg-card/40 backdrop-blur-3xl shadow-sm space-y-6">
               <div className="flex items-center justify-between border-b border-border/10 pb-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground flex items-center gap-2">
                     <Activity className="w-4 h-4 text-primary" /> Nutrition Node
                  </h4>
                  <Badge variant="outline" className="text-[8px] font-bold text-muted-foreground border-border">Week 16</Badge>
               </div>
               
               <div className="space-y-5">
                  {[
                     { l: 'Protein Intake', v: 'High', p: 85, c: 'bg-primary' },
                     { l: 'Plant-Based Choices', v: '42%', p: 42, c: 'bg-emerald-500' },
                     { l: 'Sustainability Index', v: '9.2', p: 92, c: 'bg-blue-400' },
                  ].map(stat => (
                     <div key={stat.l} className="space-y-2">
                        <div className="flex justify-between items-end">
                           <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">{stat.l}</span>
                           <span className="text-[10px] font-bold text-foreground">{stat.v}</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted/30 rounded-full overflow-hidden">
                           <motion.div initial={{ width: 0 }} animate={{ width: `${stat.p}%` }} transition={{ duration: 1.2 }} className={cn("h-full rounded-full shadow-sm", stat.c)} />
                        </div>
                     </div>
                  ))}
               </div>

               <div className="pt-4 border-t border-border/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                     <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                     <p className="text-[11px] font-bold text-foreground tracking-tight">Eco-Conscious Eater</p>
                     <p className="text-[9px] font-medium text-muted-foreground">You saved 4.2kg of CO2 this month.</p>
                  </div>
               </div>
            </Card>

            <Card className="p-6 rounded-2xl border-border/50 bg-primary/5 dark:bg-blue-500/5 relative overflow-hidden group">
               <div className="relative z-10 space-y-4">
                  <div className="space-y-1">
                     <p className="text-[9px] font-bold text-primary uppercase tracking-[0.2em]">Kitchen Status</p>
                     <h4 className="text-lg font-bold tracking-tight text-foreground">Peak Service Hours</h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                     The dining hall is currently at <span className="font-bold text-foreground">60% capacity</span>. Best time to visit is in <span className="font-bold text-primary">15 minutes</span>.
                  </p>
                  <Button variant="outline" className="w-full h-9 rounded-lg border-primary/20 text-primary font-bold text-[10px] uppercase tracking-widest hover:bg-primary/5 transition-all">
                     View Live Crowd Feed
                  </Button>
               </div>
               <Sparkles className="absolute -bottom-4 -right-4 w-24 h-24 text-primary/5 rotate-12" />
            </Card>

            <Card className="p-6 rounded-2xl border-border/50 bg-card space-y-4 shadow-sm">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Dietary Preferences</h4>
               <div className="space-y-2">
                  {[
                    { l: 'Halal Certified', s: true },
                    { l: 'Nut Allergy', s: false },
                    { l: 'Gluten Intolerance', s: false },
                  ].map((pref, i) => (
                    <div key={i} className="flex justify-between items-center py-1">
                       <span className="text-[11px] font-medium text-foreground">{pref.l}</span>
                       <div className={cn("w-2 h-2 rounded-full", pref.s ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "bg-muted")} />
                    </div>
                  ))}
               </div>
               <Button variant="ghost" className="w-full h-8 rounded-lg text-[9px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all">
                  Update Preferences
               </Button>
            </Card>
         </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  TENANT PROFILE VIEW
// ═══════════════════════════════════════════════════════════════════════════════

export function TenantProfileView() {
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-[1400px] mx-auto pb-12 space-y-8">
      
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/30 dark:border-blue-500/10">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground/50">Account / Settings</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Profile</h1>
          <p className="text-sm text-muted-foreground/60 font-medium">Manage your personal information and tenancy.</p>
        </div>
        <Button variant="outline" className="h-9 rounded-lg gap-2 font-bold px-4 border-border/40 dark:border-blue-500/20 hover:bg-muted/30 transition-colors text-[10px] uppercase tracking-widest shrink-0">
           Edit Profile
        </Button>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-8">
         <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
            <Card className="p-8 border border-border/50 bg-card rounded-2xl shadow-sm flex flex-col items-center text-center relative overflow-hidden">
               <div className="w-24 h-24 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-3xl font-bold shadow-lg shadow-emerald-500/20 mb-4 relative z-10">
                  S
               </div>
               <h2 className="text-2xl font-bold tracking-tight text-foreground relative z-10">Sarah Johnson</h2>
               <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mt-2 border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 rounded-full relative z-10 flex items-center gap-2">
                  <Check className="w-3 h-3" /> Verified Resident
               </p>
            </Card>

            <Card className="p-6 border border-border/30 bg-card rounded-2xl text-foreground shadow-sm space-y-5 relative overflow-hidden">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60 border-b border-border/10 pb-4">Security</h4>
               <div className="space-y-2">
                  {[
                    { l: 'Auth Hash', v: 'Active', i: Key },
                    { l: '2FA Protocol', v: 'Enabled', i: Shield },
                  ].map((s, i) => (
                    <div key={i} className="flex justify-between items-center bg-muted/20 hover:bg-muted/40 transition-colors p-3 rounded-xl border border-border/10">
                       <div className="flex items-center gap-3">
                          <s.i className="w-4 h-4 text-emerald-400" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{s.l}</span>
                       </div>
                       <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[8px] font-bold uppercase tracking-widest">{s.v}</Badge>
                    </div>
                  ))}
               </div>
            </Card>
         </motion.div>

         <motion.div variants={itemVariants} className="lg:col-span-8 space-y-6">
            <Card className="p-6 border border-border/50 bg-card rounded-2xl shadow-sm space-y-6 h-full">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2 border-b border-border/10 pb-4 text-foreground">
                  <MapPin className="w-4 h-4 text-primary" /> Tenancy Details
               </h4>
               <div className="grid grid-cols-2 gap-4">
                  {[
                    { l: 'Assigned Unit', v: 'Room A-402, Level 4' },
                    { l: 'Building', v: 'Bloomsbury Hall' },
                    { l: 'Tenancy Span', v: 'Sept 2024 - Aug 2026' },
                    { l: 'Base Rent', v: '£1,240 /mo' },
                  ].map((f, i) => (
                    <div key={i} className="space-y-1 p-4 rounded-xl bg-muted/20 border border-border/10">
                       <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">{f.l}</p>
                       <p className="text-sm font-semibold text-foreground">{f.v}</p>
                    </div>
                  ))}
               </div>

               <div className="pt-6 border-t border-border/10">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2 mb-4 text-foreground">
                     <FileText className="w-4 h-4 text-primary" /> Documents
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                     {[
                       { n: 'Tenancy Contract', d: 'ID-4421-PDF' },
                       { n: 'Inventory Ledger', d: 'ID-4422-PDF' },
                     ].map((doc, i) => (
                       <div key={i} className="p-3 flex items-center justify-between rounded-xl border border-border/10 bg-muted/20 hover:bg-muted/40 transition-colors group cursor-pointer">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-lg bg-muted/20 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                                <FileText className="w-4 h-4" />
                             </div>
                             <div>
                                <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">{doc.n}</p>
                                <p className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">{doc.d}</p>
                             </div>
                          </div>
                          <Download className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                       </div>
                     ))}
                  </div>
               </div>
            </Card>
         </motion.div>
      </div>
    </motion.div>
  );
}
