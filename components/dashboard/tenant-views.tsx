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

// ═══════════════════════════════════════════════════════════════════════════════
//  TENANT INVOICES VIEW (FINTECH WALLET STYLE)
// ═══════════════════════════════════════════════════════════════════════════════

const MY_INVOICES = [
  { id: 'INV-24-102', desc: 'Summer Term Rent', amount: '£3,100.00', due: 'Apr 01', status: 'Pending', type: 'Accommodation', icon: Home, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 'INV-24-101', desc: 'Meal Plan Renew', amount: '£450.00', due: 'Mar 15', status: 'Paid', type: 'Service', icon: CoffeeIcon, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { id: 'INV-24-100', desc: 'Spring Term Rent', amount: '£3,100.00', due: 'Jan 01', status: 'Paid', type: 'Accommodation', icon: Home, color: 'text-blue-500', bg: 'bg-blue-500/10' },
];

function CoffeeIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="9" x2="9" y1="2" y2="4"/><line x1="15" x2="15" y1="2" y2="4"/></svg>
}

export function TenantInvoicesView() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-[1400px] mx-auto pb-12 space-y-8">
      
      {/* Clean Horizon Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border/30 dark:border-blue-500/10">
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground/50">Account / Finances</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Payments</h1>
          <p className="text-sm text-muted-foreground/60 font-medium">Manage invoices, view statements, and track your payment history.</p>
        </div>
        <Button className="h-10 rounded-xl gap-2 font-semibold px-5 bg-foreground text-background dark:bg-blue-600 dark:text-white shadow-md hover:shadow-lg transition-shadow text-sm shrink-0 border-none">
           <Download className="w-4 h-4" /> Export Statement
        </Button>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Balances & History */}
        <div className="lg:col-span-8 flex flex-col gap-6">
           <div className="grid grid-cols-2 gap-4">
              <motion.div variants={itemVariants} className="p-6 rounded-3xl bg-card/40 dark:bg-blue-950/20 backdrop-blur-2xl border border-white/20 dark:border-blue-500/10 shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-all">
                 <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 mb-2"><AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Pending Balance</p>
                 <span className="text-4xl font-black tracking-tighter text-foreground">£3,100.00</span>
              </motion.div>
              <motion.div variants={itemVariants} className="p-6 rounded-3xl bg-card/40 dark:bg-blue-950/20 backdrop-blur-2xl border border-white/20 dark:border-blue-500/10 shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-all">
                 <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 mb-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Total Paid (YTD)</p>
                 <span className="text-4xl font-black tracking-tighter text-foreground">£3,550.00</span>
              </motion.div>
           </div>

           <motion.div variants={itemVariants} className="rounded-[2.5rem] bg-card/40 dark:bg-blue-950/10 backdrop-blur-3xl border border-white/20 dark:border-blue-500/10 shadow-xl overflow-hidden flex flex-col min-h-[400px]">
             <div className="p-6 border-b border-border/10 dark:border-blue-500/10 flex items-center justify-between bg-muted/10 dark:bg-blue-500/5">
                <span className="text-xs font-black text-foreground uppercase tracking-[0.2em] flex items-center gap-2"><HistoryIcon className="w-4 h-4 text-primary" /> Recent Statements</span>
             </div>
             <div className="divide-y divide-border/10 dark:divide-blue-500/10">
                {MY_INVOICES.map((inv) => (
                   <div key={inv.id} className="group flex flex-col">
                      <button onClick={() => setExpanded(expanded === inv.id ? null : inv.id)} className="w-full flex items-center justify-between p-6 hover:bg-muted/30 dark:hover:bg-blue-500/10 transition-colors text-left">
                         <div className="flex items-center gap-6">
                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 dark:border-blue-500/20 shadow-inner group-hover:scale-110 transition-transform", inv.bg)}>
                               <inv.icon className={cn("w-5 h-5", inv.color)} />
                            </div>
                            <div>
                               <div className="flex items-center gap-3 mb-1">
                                  <Badge className={cn("text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md border-none", inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500')}>{inv.status}</Badge>
                                  <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">Due {inv.due}</span>
                               </div>
                               <h3 className="font-bold text-lg text-foreground tracking-tight group-hover:text-primary transition-colors">{inv.desc}</h3>
                            </div>
                         </div>
                         <div className="flex items-center gap-8">
                            <span className="text-xl font-black tracking-tight">{inv.amount}</span>
                            <ChevronDown className={cn("w-5 h-5 text-muted-foreground/40 transition-transform", expanded === inv.id && "rotate-180")} />
                         </div>
                      </button>
                      <AnimatePresence>
                         {expanded === inv.id && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-muted/5 dark:bg-blue-500/5 border-t border-border/5 dark:border-blue-500/10">
                               <div className="p-6 flex items-center justify-between gap-6">
                                  <div className="flex gap-10">
                                     <div className="space-y-1"><p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/50">Reference ID</p><p className="text-xs font-bold">{inv.id}</p></div>
                                     <div className="space-y-1"><p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/50">Category</p><p className="text-xs font-bold">{inv.type}</p></div>
                                  </div>
                                  <div className="flex gap-3">
                                     <Button variant="outline" className="h-9 rounded-xl text-[10px] uppercase font-black tracking-widest border-border/40 dark:border-blue-500/20 hover:bg-muted/30"><Download className="w-3.5 h-3.5 mr-2" /> Receipt</Button>
                                     {inv.status === 'Pending' && <Button className="h-9 rounded-xl text-[10px] uppercase font-bold tracking-widest bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20">Pay Instantly</Button>}
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

        {/* Right Column: Wallet & Quick Actions */}
        <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
           <Card className="p-1 h-[260px] rounded-[2.5rem] bg-gradient-to-br from-blue-900 to-blue-950 dark:from-blue-800 dark:to-slate-950 relative overflow-hidden shadow-2xl group border border-white/10 dark:border-blue-500/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none group-hover:scale-125 transition-transform duration-1000"></div>
              <div className="w-full h-full p-8 relative z-10 flex flex-col justify-between">
                 <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                       <CreditCard className="w-5 h-5 text-white/50" />
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Apple Pay Linked</span>
                    </div>
                    <Badge className="bg-white/10 text-white border-none text-[8px] font-bold uppercase tracking-widest backdrop-blur-md">Default</Badge>
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-white tracking-[0.1em] mb-1">••••  ••••  ••••  4242</h3>
                    <div className="flex justify-between items-center text-white/50">
                       <p className="text-xs font-bold uppercase tracking-widest">Sarah Johnson</p>
                       <p className="text-xs font-bold uppercase tracking-widest">12 / 28</p>
                    </div>
                 </div>
              </div>
           </Card>

           <Card className="p-8 border border-white/20 dark:border-blue-500/10 bg-card/40 dark:bg-blue-950/20 backdrop-blur-3xl rounded-[2.5rem] shadow-xl space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 border-b border-border/10 dark:border-blue-500/10 pb-4">Financial Settings</h4>
              <div className="space-y-2">
                 {[
                   { l: 'Auto-Pay Configuration', i: Zap },
                   { l: 'Deposit Receipts', i: FileText },
                   { l: 'Contact Finance Office', i: MessageSquare },
                 ].map((act, i) => (
                   <button key={i} className="flex flex-row items-center justify-between w-full p-4 rounded-xl hover:bg-muted/30 dark:hover:bg-blue-500/10 transition-all group/item">
                      <div className="flex items-center gap-4">
                         <div className="w-8 h-8 rounded-lg bg-muted/50 dark:bg-blue-500/10 flex items-center justify-center group-hover/item:text-primary transition-colors">
                            <act.i className="w-4 h-4" />
                         </div>
                         <span className="text-[11px] font-black tracking-wider uppercase text-muted-foreground/80 group-hover/item:text-foreground transition-colors">{act.l}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground/30 group-hover/item:text-primary transition-colors" />
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
//  TENANT MAINTENANCE VIEW (CONCIERGE TRACKER)
// ═══════════════════════════════════════════════════════════════════════════════

const MY_TICKETS = [
  { id: 'MNT-8840', title: 'Leaking Shower Head', status: 'In Progress', expected: 'Today, 2:00 PM', urgency: 'Normal', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 'MNT-8822', title: 'HVAC Air Filter Replacement', status: 'Resolved', expected: 'Completed', urgency: 'Low', icon: Zap, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
];

export function TenantMaintenanceView() {
  const [ticketForm, setTicketForm] = useState(false);

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-[1400px] mx-auto pb-12 space-y-8 relative">
      
      {/* Slide Out Ticket Creator */}
      <AnimatePresence>
         {ticketForm && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex justify-end bg-background/80 backdrop-blur-sm">
               <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="w-full max-w-md h-full bg-card dark:bg-slate-950 border-l border-white/10 dark:border-blue-500/20 shadow-2xl flex flex-col relative z-50">
                  <div className="p-8 border-b border-border/10 dark:border-blue-500/10 flex items-center justify-between">
                     <div><h2 className="text-xl font-black uppercase tracking-tight">Concierge Request</h2><p className="text-[10px] font-bold tracking-[0.2em] text-primary mt-1">Submit Issue</p></div>
                     <button onClick={() => setTicketForm(false)} className="w-10 h-10 rounded-xl bg-muted/30 dark:bg-blue-500/10 flex items-center justify-center hover:bg-muted/60 transition-colors shrink-0">✕</button>
                  </div>
                  <div className="p-8 space-y-8 flex-1 overflow-y-auto">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Service Category</label>
                        <div className="grid grid-cols-2 gap-2">
                           {['Plumbing', 'Electrical', 'HVAC', 'General'].map(c => <Button key={c} variant="outline" className="h-11 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:border-primary border-border/40 dark:border-blue-500/20">{c}</Button>)}
                        </div>
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Issue Description</label>
                        <textarea className="w-full h-32 px-4 py-3 rounded-xl bg-background/50 dark:bg-blue-950/20 border border-border/40 dark:border-blue-500/20 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-primary/40 resize-none" placeholder="Provide accurate details of the problem..." />
                     </div>
                  </div>
                  <div className="p-8 border-t border-border/10 dark:border-blue-500/10">
                     <Button className="w-full h-14 rounded-2xl bg-foreground text-background dark:bg-blue-600 dark:text-white font-black uppercase tracking-widest shadow-2xl hover:scale-[1.02] transition-all">Submit Request <Send className="w-4 h-4 ml-2" /></Button>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>

      {/* Clean Horizon Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border/30 dark:border-blue-500/10">
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground/50">Services / Maintenance</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Service Requests</h1>
          <p className="text-sm text-muted-foreground/60 font-medium">Submit and track maintenance requests for your unit.</p>
        </div>
        <Button onClick={() => setTicketForm(true)} className="h-10 rounded-xl gap-2 font-semibold px-5 bg-foreground text-background dark:bg-blue-600 dark:text-white shadow-md hover:shadow-lg transition-shadow text-sm shrink-0 border-none">
           <Plus className="w-4 h-4" /> Request Service
        </Button>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 space-y-6">
            <motion.div variants={itemVariants} className="rounded-[2.5rem] bg-card/40 dark:bg-blue-950/10 backdrop-blur-3xl border border-white/20 dark:border-blue-500/10 shadow-xl overflow-hidden flex flex-col min-h-[400px]">
               <div className="p-6 border-b border-border/10 dark:border-blue-500/10 flex items-center justify-between bg-muted/10 dark:bg-blue-500/5">
                  <span className="text-xs font-black text-foreground uppercase tracking-[0.2em] flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Active Service Tickets</span>
               </div>
               <div className="divide-y divide-border/10 dark:divide-blue-500/10">
                  {MY_TICKETS.map(t => (
                     <div key={t.id} className="p-6 lg:p-8 flex flex-col hover:bg-muted/30 dark:hover:bg-blue-500/10 transition-all">
                        <div className="flex items-center justify-between gap-6 mb-6">
                           <div className="flex items-center gap-4">
                              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 dark:border-blue-500/20 shadow-inner", t.bg)}>
                                 <t.icon className={cn("w-5 h-5", t.color)} />
                              </div>
                              <div className="space-y-1">
                                 <h3 className="text-lg font-black tracking-tight">{t.title}</h3>
                                 <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">{t.id} • {t.urgency} Priority</p>
                              </div>
                           </div>
                           <Badge className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-sm border-none shadow-none", t.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary/10 text-primary')}>{t.status}</Badge>
                        </div>
                        {t.status === 'In Progress' && (
                           <div className="relative pt-6">
                              <div className="absolute top-8 left-0 w-full h-1 bg-muted/30 dark:bg-blue-500/10 rounded-full"></div>
                              <div className="absolute top-8 left-0 w-[50%] h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                              <div className="flex justify-between relative z-10 text-[9px] font-black uppercase tracking-widest">
                                 <span className="flex flex-col items-center text-primary gap-2"><div className="w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20" /> Received</span>
                                 <span className="flex flex-col items-center text-primary gap-2"><div className="w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20" /> Assigned</span>
                                 <span className="flex flex-col items-center text-muted-foreground/40 gap-2"><div className="w-3 h-3 rounded-full bg-muted-foreground/40" /> Arriving</span>
                                 <span className="flex flex-col items-center text-muted-foreground/40 gap-2"><div className="w-3 h-3 rounded-full bg-muted-foreground/40" /> Resolved</span>
                              </div>
                              <div className="mt-8 p-4 rounded-xl bg-primary/5 dark:bg-blue-500/5 border border-primary/10 dark:border-blue-500/20 flex items-center justify-between">
                                 <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary"><User className="w-4 h-4" /></div>
                                    <div><p className="text-[10px] font-black text-primary uppercase tracking-wider">Technician Dispatched</p><p className="text-xs font-bold text-foreground">Awaiting ETA (Est. Today 2:00 PM)</p></div>
                                 </div>
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

         <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
            <Card className="p-8 border border-rose-500/20 bg-rose-500/5 dark:bg-rose-950/20 backdrop-blur-3xl rounded-[2.5rem] shadow-xl relative overflow-hidden group">
               <div className="absolute -top-12 -right-12 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
               <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-2 text-rose-500">
                     <AlertTriangle className="w-5 h-5 animate-pulse" />
                     <span className="text-[10px] font-black uppercase tracking-[0.2em]">Emergency Hotline</span>
                  </div>
                  <div>
                     <h3 className="text-2xl font-black tracking-tight text-foreground line-clamp-1">Rapid Response</h3>
                     <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-1">24/7 Priority Support</p>
                  </div>
                  <Button className="w-full h-12 bg-rose-500 text-white hover:bg-rose-600 font-black text-[11px] uppercase tracking-widest rounded-2xl shadow-lg border-none shadow-rose-500/20 transition-all">
                     Call 020 7946 0000
                  </Button>
               </div>
            </Card>

            <Card className="p-8 border border-white/20 dark:border-blue-500/10 bg-card/40 dark:bg-blue-950/20 backdrop-blur-3xl rounded-[2.5rem] shadow-xl space-y-6">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 border-b border-border/10 dark:border-blue-500/10 pb-4">Service Level Guarantee</h4>
               <div className="space-y-4">
                  {[
                    { l: 'Critical Priority', v: '< 2 Hours' },
                    { l: 'High Priority', v: 'Same Day' },
                    { l: 'Standard Service', v: '24-48 Hours' },
                  ].map((s, i) => (
                    <div key={i} className="flex justify-between items-center bg-muted/20 dark:bg-blue-500/10 p-3 rounded-xl border border-border/10 dark:border-blue-500/10">
                       <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{s.l}</span>
                       <span className="text-[10px] font-black uppercase tracking-wider text-foreground">{s.v}</span>
                    </div>
                  ))}
               </div>
            </Card>
         </motion.div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  TENANT MEALS VIEW (FOOD APP STYLE)
// ═══════════════════════════════════════════════════════════════════════════════

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

export function TenantMealsView() {
  const [activeTab, setActiveTab] = useState('Today');

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-[1400px] mx-auto pb-12 space-y-8">
      
      {/* Culinary Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-border/30 dark:border-blue-500/10">
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">Resident Experience / Dining</p>
          <h1 className="text-4xl font-black tracking-tighter text-foreground italic">Gourmet <span className="text-muted-foreground/30 not-italic font-medium">Node</span></h1>
          <p className="text-sm text-muted-foreground/60 font-medium">Curated daily menus from our executive kitchen.</p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" className="h-11 rounded-2xl gap-2 font-black text-[10px] uppercase tracking-widest border-border/40 dark:border-blue-500/20 hover:bg-muted/30 px-6 transition-all">
              <HistoryIcon className="w-4 h-4" /> Order History
           </Button>
           <Button className="h-11 rounded-2xl gap-2 font-black text-[10px] uppercase tracking-widest bg-foreground text-background dark:bg-blue-600 dark:text-white shadow-xl hover:scale-105 active:scale-95 transition-all px-8 border-none">
              <Zap className="w-4 h-4" /> Quick Refill
           </Button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-10">
         {/* Main Menu Scroll */}
         <div className="lg:col-span-8 space-y-10">
            <div className="flex gap-4 border-b border-border/10 dark:border-blue-500/10 pb-4">
               {['Today', 'Tomorrow', 'This Week'].map(day => (
                  <button 
                     key={day}
                     onClick={() => setActiveTab(day)}
                     className={cn(
                        "px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.15em] transition-all",
                        activeTab === day ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-muted-foreground hover:bg-muted/30 dark:hover:bg-blue-500/10"
                     )}
                  >
                     {day}
                  </button>
               ))}
            </div>

            <div className="grid gap-8">
               {WEEKLY_MENU.filter(m => activeTab === 'This Week' || m.day === activeTab).map((meal) => (
                  <motion.div variants={itemVariants} key={meal.id} className="group relative rounded-[2.5rem] bg-card/40 dark:bg-blue-950/10 backdrop-blur-3xl border border-white/20 dark:border-blue-500/10 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                     <div className="flex flex-col md:flex-row">
                        <div className="md:w-72 h-64 md:h-auto overflow-hidden relative">
                           <img src={meal.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={meal.title} />
                           <div className="absolute top-4 left-4">
                              <Badge className="bg-black/60 backdrop-blur-md text-white border-none text-[9px] font-black uppercase tracking-widest px-3 py-1">{meal.type}</Badge>
                           </div>
                        </div>
                        <div className="flex-1 p-8 space-y-6">
                           <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                 <h3 className="text-2xl font-black tracking-tight text-foreground">{meal.title}</h3>
                                 <div className="flex gap-2">
                                    {meal.tags.map(t => <span key={t} className="text-[9px] font-bold text-primary uppercase tracking-widest">{t}</span>)}
                                 </div>
                              </div>
                              <div className="text-right">
                                 <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest">Service Window</p>
                                 <p className="text-xs font-bold text-foreground">{meal.time}</p>
                              </div>
                           </div>
                           
                           <p className="text-sm font-medium text-muted-foreground leading-relaxed">{meal.desc}</p>
                           
                           <div className="grid grid-cols-4 gap-4 py-4 border-y border-border/10 dark:border-blue-500/10">
                              {[
                                 { l: 'Calories', v: meal.calories },
                                 { l: 'Protein', v: meal.proteins },
                                 { l: 'Carbs', v: meal.carb },
                                 { l: 'Fat', v: meal.fat },
                              ].map(n => (
                                 <div key={n.l} className="space-y-1">
                                    <p className="text-[8px] font-black uppercase text-muted-foreground/40 tracking-widest">{n.l}</p>
                                    <p className="text-xs font-black text-foreground">{n.v}</p>
                                 </div>
                              ))}
                           </div>

                           <div className="flex items-center justify-between pt-2">
                              <div className="flex items-center gap-2">
                                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                 <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Available to Order</span>
                              </div>
                              <Button className="rounded-xl px-8 font-black text-[10px] uppercase tracking-widest bg-foreground text-background dark:bg-blue-600 dark:text-white hover:scale-105 transition-transform shadow-xl border-none">
                                 Reserve Portions
                              </Button>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>

         {/* Dietary Insight Sidebar */}
         <motion.div variants={itemVariants} className="lg:col-span-4 space-y-8">
            <Card className="p-8 rounded-[3rem] border border-white/20 dark:border-blue-500/10 bg-card/40 dark:bg-blue-950/20 backdrop-blur-3xl shadow-xl space-y-8 overflow-hidden relative group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-all duration-700" />
               <div className="relative z-10 space-y-6">
                  <div className="space-y-1">
                     <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
                        <Activity className="w-4 h-4 text-primary" /> Nutrition Node
                     </h4>
                     <h3 className="text-2xl font-black tracking-tight text-foreground">Weekly Summary</h3>
                  </div>
                  <div className="space-y-4">
                     {[
                        { l: 'Avg. Daily Protein', v: '78g', p: 85 },
                        { l: 'Plant-Based Mix', v: '42%', p: 42 },
                        { l: 'Sustainability Index', v: '9.4', p: 94 },
                     ].map(s => (
                        <div key={s.l} className="space-y-2">
                           <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                              <span className="text-muted-foreground/60">{s.l}</span>
                              <span className="text-foreground">{s.v}</span>
                           </div>
                           <div className="h-1.5 w-full bg-muted/30 dark:bg-blue-500/20 rounded-full overflow-hidden shadow-inner">
                              <div className="h-full bg-primary" style={{ width: `${s.p}%` }} />
                           </div>
                        </div>
                     ))}
                  </div>
                  <p className="text-[10px] font-bold text-muted-foreground/40 leading-relaxed italic border-t border-border/10 dark:border-blue-500/10 pt-6">
                     Based on your last 14 days of culinary selections at Dormify.
                  </p>
               </div>
            </Card>

            <Card className="p-8 rounded-[3rem] border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/20 backdrop-blur-3xl shadow-xl space-y-6 group">
               <div className="flex items-center gap-3 text-emerald-500">
                  <Leaf className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Sustainability Award</span>
               </div>
               <div>
                  <h3 className="text-2xl font-black tracking-tight text-foreground">Plant-Powered</h3>
                  <p className="text-xs font-medium text-emerald-900/60 dark:text-emerald-400/60 mt-1 leading-relaxed">
                     By choosing 12 plant-based meals this month, you saved <span className="text-emerald-500 font-bold">4.2kg</span> of CO2 emissions.
                  </p>
               </div>
               <Button className="w-full h-12 rounded-2xl bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-500/20 border-none hover:bg-emerald-600 transition-all">
                  Eco-Impact Report
               </Button>
            </Card>
         </motion.div>
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
      
      {/* Clean Horizon Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border/30 dark:border-blue-500/10">
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground/50">Account / Settings</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Profile</h1>
          <p className="text-sm text-muted-foreground/60 font-medium">Manage your personal information, leasing details, and security.</p>
        </div>
        <Button variant="outline" className="h-10 rounded-xl gap-2 font-semibold px-5 border-border/40 dark:border-blue-500/20 hover:bg-muted/30 transition-colors text-sm shrink-0">
           Edit Profile
        </Button>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-8">
         <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
            <Card className="p-10 border border-white/20 dark:border-blue-500/10 bg-card/40 dark:bg-blue-950/20 backdrop-blur-3xl rounded-[2.5rem] shadow-xl flex flex-col items-center text-center relative overflow-hidden">
               <div className="w-32 h-32 rounded-[2rem] bg-emerald-500 text-white flex items-center justify-center text-5xl font-black shadow-2xl shadow-emerald-500/30 mb-6 relative z-10">
                  S
               </div>
               <h2 className="text-3xl font-black tracking-tight text-foreground relative z-10">Sarah Johnson</h2>
               <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mt-2 border border-emerald-500/20 bg-emerald-500/10 dark:bg-emerald-500/20 px-4 py-1.5 rounded-full relative z-10 flex items-center gap-2">
                  <Check className="w-3 h-3" /> Fully Verified
               </p>
            </Card>

            <Card className="p-8 border border-border/30 dark:border-blue-500/10 bg-card dark:bg-blue-950/20 rounded-[2.5rem] text-foreground shadow-xl space-y-6 relative overflow-hidden">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 border-b border-border/10 dark:border-blue-500/10 pb-4">Security Architecture</h4>
               <div className="space-y-2">
                  {[
                    { l: 'Authentication Hash', v: 'Active', i: Key },
                    { l: 'Two-Factor Protocol', v: 'Enabled', i: Shield },
                  ].map((s, i) => (
                    <div key={i} className="flex justify-between items-center bg-muted/20 dark:bg-blue-500/10 hover:bg-muted/40 dark:hover:bg-blue-500/20 transition-colors p-4 rounded-xl border border-border/10 dark:border-blue-500/10">
                       <div className="flex items-center gap-3">
                          <s.i className="w-4 h-4 text-emerald-400" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{s.l}</span>
                       </div>
                       <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[8px] font-black uppercase tracking-widest">{s.v}</Badge>
                    </div>
                  ))}
               </div>
            </Card>
         </motion.div>

         <motion.div variants={itemVariants} className="lg:col-span-8 space-y-6">
            <Card className="p-8 border border-white/20 dark:border-blue-500/10 bg-card/40 dark:bg-blue-950/20 backdrop-blur-3xl rounded-[2.5rem] shadow-xl space-y-8 h-full">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2 border-b border-border/10 dark:border-blue-500/10 pb-4 text-foreground">
                  <MapPin className="w-4 h-4 text-primary" /> Leasing Trajectory
               </h4>
               <div className="grid grid-cols-2 gap-8">
                  {[
                    { l: 'Assigned Unit', v: 'Room A-402, Level 4' },
                    { l: 'Building Origin', v: 'Bloomsbury Hall' },
                    { l: 'Tenancy Span', v: 'Sept 2024 - Aug 2026' },
                    { l: 'Monthly Recurring', v: '£1,240 /mo Base' },
                  ].map((f, i) => (
                    <div key={i} className="space-y-1 p-5 rounded-2xl bg-muted/20 dark:bg-blue-500/10 border border-border/10 dark:border-blue-500/10">
                       <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{f.l}</p>
                       <p className="text-sm font-bold text-foreground">{f.v}</p>
                    </div>
                  ))}
               </div>

               <div className="pt-8 border-t border-border/10 dark:border-blue-500/10">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2 mb-6 text-foreground">
                     <FileText className="w-4 h-4 text-primary" /> Immutable Documents
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                     {[
                       { n: 'Tenancy Contract', d: 'ID-4421-PDF' },
                       { n: 'Inventory Ledger', d: 'ID-4422-PDF' },
                     ].map((doc, i) => (
                       <div key={i} className="p-4 flex items-center justify-between rounded-xl border border-border/10 dark:border-blue-500/10 bg-muted/20 dark:bg-blue-500/10 hover:bg-muted/40 dark:hover:bg-blue-500/20 transition-colors group cursor-pointer">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-lg bg-muted/20 dark:bg-blue-500/20 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                                <FileText className="w-4 h-4" />
                             </div>
                             <div>
                                <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{doc.n}</p>
                                <p className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest">{doc.d}</p>
                             </div>
                          </div>
                          <Download className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
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
