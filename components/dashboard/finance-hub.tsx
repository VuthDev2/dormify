'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  CreditCard, 
  FileText, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Target, 
  Activity,
  Download,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreHorizontal,
  Mail,
  FileDown,
  RefreshCcw,
  BarChart3,
  CalendarDays,
  Zap,
  ShieldCheck,
  ShieldAlert,
  Building,
  Banknote
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { FinanceContent } from './finance-content';

interface FinanceHubProps {
  tier: 'pro' | 'premium';
}

export function FinanceHub({ tier }: FinanceHubProps) {
  const [activeTab, setActiveTab] = useState<'revenue' | 'payments' | 'invoices'>('payments');

  const invoices = [
    { id: 'INV-2026-8820', resident: 'Sarah Johnson', amount: '1,240.00', issued: 'Mar 25', due: 'Apr 01', status: 'Paid', method: 'Bank Transfer' },
    { id: 'INV-2026-8821', resident: 'Michael Chen', amount: '850.00', issued: 'Mar 25', due: 'Apr 01', status: 'Paid', method: 'Cash' },
    { id: 'INV-2026-8822', resident: 'Emma Wilson', amount: '1,100.00', issued: 'Mar 25', due: 'Apr 01', status: 'Pending', method: 'Transfer In-Flight' },
    { id: 'INV-2026-8823', resident: 'James Porter', amount: '1,240.00', issued: 'Mar 20', due: 'Mar 31', status: 'Overdue', method: '-' },
    { id: 'INV-2026-8824', resident: 'Lisa Anderson', amount: '950.00', issued: 'Mar 28', due: 'Apr 05', status: 'Draft', method: '-' },
  ];

  const revenueStreams = [
    { label: 'Room Fees', value: '£542,800', growth: '+4.2%', color: 'bg-primary' },
    { label: 'Meal Fees', value: '£182,400', growth: '+12.1%', color: 'bg-indigo-500' },
    { label: 'Event Bookings', value: '£42,000', growth: '+8.5%', color: 'bg-sky-500' },
    { label: 'Misc Services', value: '£12,300', growth: '-1.4%', color: 'bg-slate-400' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-16">
      {/* 1. Specialized Hub Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-border/40 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Fiscal Control Active</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-foreground uppercase italic leading-none">Revenue <span className="text-muted-foreground/30 not-italic">Platform</span></h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex p-1 bg-muted/20 rounded-2xl border border-border/20">
             {[
               { id: 'payments', label: 'Payments', icon: CreditCard },
               { id: 'revenue', label: 'Revenue', icon: BarChart3 },
               { id: 'invoices', label: 'Invoices', icon: FileText },
             ].map((tab) => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id as any)}
                 className={cn(
                   "flex items-center gap-2 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                   activeTab === tab.id ? "bg-background text-primary shadow-sm ring-1 ring-border/20" : "text-muted-foreground hover:text-foreground"
                 )}
               >
                 <tab.icon className="w-3.5 h-3.5" />
                 {tab.label}
               </button>
             ))}
          </div>
          <Button className="h-10 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest px-8 shadow-xl shadow-primary/20 border-none hover:translate-y-[-1px] transition-all">
             <Plus className="w-4 h-4 mr-2" /> New Entry
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'revenue' && (
          <motion.div 
            key="revenue"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* High-Impact Stat Strip */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Annualized Revenue', value: '£6.24M', trend: '+14.2%', icon: DollarSign, c: 'text-primary' },
                { label: 'Operating Margin', value: '78.4%', trend: 'Stable', icon: Target, c: 'text-indigo-500' },
                { label: 'Outstanding Debt', value: '£14,250', trend: '-2.1%', icon: AlertCircle, c: 'text-rose-500' },
                { label: 'Yield per Unit', value: '£1,142', trend: '+£42', icon: TrendingUp, c: 'text-emerald-500' },
              ].map((s, i) => (
                <div key={i} className="px-6 py-5 rounded-[2rem] border border-border/40 bg-card shadow-sm flex flex-col gap-1 relative overflow-hidden group hover:shadow-xl transition-all cursor-default">
                   <div className="flex items-center justify-between relative z-10">
                      <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">{s.label}</span>
                      <s.icon className={cn("w-4 h-4", s.c)} />
                   </div>
                   <div className="flex items-end justify-between relative z-10 mt-1">
                      <h3 className="text-2xl font-black tracking-tighter text-foreground">{s.value}</h3>
                      <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-lg bg-muted/50", s.c)}>{s.trend}</span>
                   </div>
                   <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-muted/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               {/* Advanced Revenue Chart Container */}
               <Card className="lg:col-span-8 p-10 border-border/40 bg-card rounded-[2.5rem] border shadow-2xl shadow-black/[0.02]">
                  <div className="flex items-center justify-between mb-10">
                     <div className="space-y-1">
                        <h3 className="text-xl font-black tracking-tight uppercase">Performance <span className="text-muted-foreground/30 font-medium italic">Audit</span></h3>
                        <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest leading-none">Fiscal Forecasting • Real-time vs Target</p>
                     </div>
                     <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 font-black text-[9px] uppercase text-muted-foreground/50">
                           <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.3)]" /> Actuals
                        </div>
                        <div className="flex items-center gap-2 font-black text-[9px] uppercase text-muted-foreground/20">
                           <div className="w-2 h-2 rounded-full bg-muted border border-dashed border-border" /> Projected
                        </div>
                     </div>
                  </div>
                  
                  <div className="h-[280px] w-full flex items-end gap-5 px-2 relative">
                     {/* The "Pulse" Bars */}
                     {[45, 62, 58, 85, 75, 95, 88, 70, 82, 90, 78, 92].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col justify-end gap-3 h-full group/bar relative">
                           {/* Projected Shadow */}
                           <div className="absolute bottom-0 left-0 w-full bg-muted/10 rounded-t-xl" style={{ height: `${h + 5}%` }} />
                           {/* Actual Data */}
                           <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              transition={{ duration: 1, delay: i * 0.05 }}
                              className="w-full bg-gradient-to-t from-primary/60 to-primary rounded-t-xl relative shadow-lg shadow-primary/10 group-hover/bar:brightness-110 group-hover/bar:shadow-primary/20 transition-all cursor-pointer"
                           >
                              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background px-3 py-1.5 rounded-lg text-[9px] font-black opacity-0 group-hover/bar:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-xl">
                                 £{(h * 12).toFixed(1)}k
                              </div>
                           </motion.div>
                           <span className="text-[8px] font-black text-center text-muted-foreground/30 uppercase">M{i+1}</span>
                        </div>
                     ))}
                  </div>
               </Card>

               {/* Segmented Revenue Breakdown */}
               <Card className="lg:col-span-4 p-8 border-border/40 bg-card rounded-[2.5rem] flex flex-col justify-between">
                  <div className="space-y-8">
                     <h3 className="text-lg font-black tracking-tight uppercase border-b border-border/10 pb-4">Stream <span className="text-muted-foreground/30 font-medium lowercase italic">Mix</span></h3>
                     <div className="space-y-6">
                        {revenueStreams.map((stream, i) => (
                           <div key={i} className="space-y-3 group cursor-default">
                              <div className="flex justify-between items-end">
                                 <div className="space-y-0.5">
                                    <p className="text-[10px] font-black uppercase text-foreground">{stream.label}</p>
                                    <p className="text-[11px] font-mono font-bold text-muted-foreground/60">{stream.value}</p>
                                 </div>
                                 <span className={cn("text-[9px] font-black uppercase", stream.growth.startsWith('+') ? 'text-emerald-500' : 'text-rose-500')}>{stream.growth}</span>
                              </div>
                              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden shadow-inner p-[1px]">
                                 <div className={cn("h-full rounded-full transition-all group-hover:brightness-110", stream.color)} style={{ width: `${(i === 0 ? 70 : i === 1 ? 20 : i === 2 ? 8 : 2)}%` }} />
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="mt-8 p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 space-y-3 relative overflow-hidden group cursor-pointer hover:bg-indigo-500/10 transition-all">
                     <div className="flex items-center gap-2 text-indigo-500 relative z-10">
                        <Zap className="w-3.5 h-3.5 fill-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Yield Optimizer</span>
                     </div>
                     <p className="text-[11px] font-medium text-muted-foreground/80 leading-relaxed relative z-10">
                        Hospitality services are <span className="text-foreground font-black">under-indexed</span>. Increasing meal plan flexibility could uplift revenue by <span className="text-indigo-600 font-bold">12%</span>.
                     </p>
                     <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none group-hover:bg-indigo-500/10 transition-all" />
                  </div>
               </Card>
            </div>
          </motion.div>
        )}

        {activeTab === 'payments' && (
          <motion.div 
            key="payments"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <FinanceContent />
          </motion.div>
        )}

        {activeTab === 'invoices' && (
          <motion.div 
            key="invoices"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Invoice Action Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {[
                 { label: 'Overdue Total', value: '£8,420', icon: ShieldAlert, color: 'text-rose-500', bg: 'bg-rose-500/5' },
                 { label: 'Unsent Drafts', value: '£2,100', icon: FileDown, color: 'text-amber-500', bg: 'bg-amber-500/5' },
                 { label: 'Recent Paid', value: '£14,250', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/5' },
               ].map((s, i) => (
                 <div key={i} className="px-5 py-4 rounded-2xl border border-border/40 bg-card/50 flex items-center justify-between group cursor-pointer hover:border-primary/20 transition-all">
                    <div className="space-y-0.5">
                       <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">{s.label}</p>
                       <p className="text-xl font-mono font-black text-foreground">{s.value}</p>
                    </div>
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shadow-inner", s.bg)}>
                       <s.icon className={cn("w-5 h-5", s.color)} />
                    </div>
                 </div>
               ))}
            </div>

            <div className="rounded-[1.5rem] border border-border/40 bg-card overflow-hidden shadow-2xl shadow-black/[0.03]">
               <div className="p-5 border-b border-border/10 flex items-center justify-between bg-muted/10">
                  <div className="flex items-center gap-3">
                     <div className="flex p-1 bg-muted/20 rounded-xl border border-border/20">
                        <Button variant="ghost" size="sm" className="h-8 rounded-lg bg-background text-foreground text-[9px] font-black uppercase tracking-widest shadow-sm">All Invoices</Button>
                        <Button variant="ghost" size="sm" className="h-8 rounded-lg text-muted-foreground text-[9px] font-black uppercase tracking-widest">Active Only</Button>
                     </div>
                     <div className="h-4 w-px bg-border/20" />
                     <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">Total: {invoices.length} Registry Entries</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Button variant="outline" className="h-9 px-4 rounded-xl border-border/40 text-[9px] font-black uppercase tracking-widest gap-2 bg-background hover:bg-muted/50 transition-all">
                        <Mail className="w-3.5 h-3.5" /> Send Reminders
                     </Button>
                     <Button className="h-9 px-5 rounded-xl bg-foreground text-background text-[9px] font-black uppercase tracking-widest shadow-lg border-none hover:bg-foreground/90 transition-all">
                        <Plus className="w-3.5 h-3.5 mr-1" /> Create Invoice
                     </Button>
                  </div>
               </div>

               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                     <thead>
                        <tr className="bg-muted/30 border-b border-border/10">
                           <th className="py-4 px-8 text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">Invoice Reference</th>
                           <th className="py-4 px-8 text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">Resident Node</th>
                           <th className="py-4 px-8 text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 text-center">Lifecycle Status</th>
                           <th className="py-4 px-8 text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 text-center">Protocol</th>
                           <th className="py-4 px-8 text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 text-right">Balance</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-border/5">
                        {invoices.map((inv) => (
                           <tr key={inv.id} className="group hover:bg-muted/10 transition-colors cursor-pointer">
                              <td className="py-5 px-8">
                                 <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-muted/40 border border-border/40 flex items-center justify-center text-muted-foreground/30 group-hover:text-primary transition-all">
                                       <FileText className="w-4 h-4" />
                                    </div>
                                    <div className="space-y-0.5">
                                       <p className="text-[11px] font-mono font-bold text-foreground">{inv.id}</p>
                                       <p className="text-[9px] font-bold text-muted-foreground/30 uppercase tracking-tighter">Issued {inv.issued}</p>
                                    </div>
                                 </div>
                              </td>
                              <td className="py-5 px-8 font-black text-sm text-foreground group-hover:text-primary transition-colors">{inv.resident}</td>
                              <td className="py-5 px-8 text-center">
                                 <div className="flex flex-col items-center gap-1.5">
                                    <Badge className={cn(
                                       "text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border-none",
                                       inv.status === 'Paid' ? "bg-emerald-500/10 text-emerald-500" :
                                       inv.status === 'Sent' ? "bg-blue-500/10 text-blue-500" :
                                       inv.status === 'Overdue' ? "bg-rose-500/10 text-rose-500 animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.1)]" : "bg-muted text-muted-foreground/50"
                                    )}>{inv.status}</Badge>
                                    <p className="text-[8px] font-bold text-muted-foreground/40 uppercase">Due {inv.due}</p>
                                 </div>
                              </td>
                              <td className="py-5 px-8 text-center">
                                 <div className="flex flex-col items-center gap-0.5 opacity-40">
                                    {inv.method === 'Bank Transfer' ? <Building className="w-3.5 h-3.5 text-blue-500" /> : inv.method === 'Cash' ? <Banknote className="w-3.5 h-3.5 text-emerald-500" /> : <Clock className="w-3.5 h-3.5" />}
                                    <span className="text-[7px] font-black uppercase tracking-tighter">{inv.method}</span>
                                 </div>
                              </td>
                              <td className="py-5 px-8 text-right font-mono font-black text-foreground">£{inv.amount}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
