'use client';

import {
  Download,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Banknote,
  Building,
  User,
  ShieldAlert,
  MoreHorizontal,
  ArrowUpRight,
  Filter,
  ArrowRight,
  Receipt,
  LayoutGrid
} from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { RESIDENT_BILLING_RECORDS, type BillingMethod, type BillingStatus, type ResidentBilling } from './mock-data';

export function FinanceContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [billingRecords, setBillingRecords] = useState<ResidentBilling[]>(RESIDENT_BILLING_RECORDS);
  const [selectedResident, setSelectedResident] = useState<ResidentBilling | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const filteredRecords = useMemo(() => {
    return billingRecords.filter(r => 
      r.resident.toLowerCase().includes(searchTerm.toLowerCase()) || 
      r.room.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [billingRecords, searchTerm]);

  const StatusIndicator = ({ status, size = 'sm' }: { status: BillingStatus, size?: 'sm' | 'lg' }) => {
    const config = {
      'Completed': 'bg-emerald-500 text-emerald-700 dark:text-emerald-400',
      'Pending': 'bg-amber-500 text-amber-700 dark:text-amber-400',
      'Over Duedate': 'bg-rose-500 text-rose-700 dark:text-rose-400 animate-pulse'
    };
    const isLg = size === 'lg';
    return (
      <div className={cn(
        "flex items-center gap-2 px-2.5 py-0.5 rounded bg-white/80 dark:bg-muted/40 border border-border/20 shadow-sm",
        isLg ? "w-32 py-1.5" : "w-28"
      )}>
        <div className={cn("rounded-full shrink-0", config[status].split(' ')[0], isLg ? "w-2 h-2" : "w-1.5 h-1.5")} />
        <span className={cn("font-black uppercase tracking-tighter leading-none", config[status].split(' ')[1], isLg ? "text-[10px]" : "text-[9px]")}>
          {status === 'Over Duedate' ? 'OVERDUE' : status}
        </span>
      </div>
    );
  };

  const MethodBadge = ({ method, size = 'sm' }: { method: BillingMethod, size?: 'sm' | 'lg' }) => {
    if (method === '-') return <span className="text-muted-foreground/20 text-[11px] tracking-widest font-black">—</span>;
    
    const config = {
      'Cash': { icon: Banknote, color: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
      'ABA': { icon: Building, color: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
      'Aclelda': { icon: Building, color: 'text-sky-700 dark:text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20' }
    };
    const c = config[method as keyof typeof config];
    const Icon = c.icon;
    const isLg = size === 'lg';

    return (
      <div className={cn("inline-flex items-center gap-1.5 rounded-lg border shadow-sm font-black uppercase", c.bg, c.border, isLg ? "px-2.5 py-1.5" : "px-2 py-0.5")}>
        <Icon className={cn(isLg ? "w-4 h-4" : "w-3.5 h-3.5", c.color)} />
        <span className={cn(c.color, isLg ? "text-[10px]" : "text-[9px]")}>{method}</span>
      </div>
    );
  };

  const markResidentFeesCollected = () => {
    if (!selectedResident) return;
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' });

    setBillingRecords((prev) =>
      prev.map((record) => {
        if (record.id !== selectedResident.id) return record;
        return {
          ...record,
          roomFee: {
            ...record.roomFee,
            status: 'Completed',
            method: record.roomFee.method === '-' ? 'Cash' : record.roomFee.method,
            date: today,
          },
          mealFee: {
            ...record.mealFee,
            status: 'Completed',
            method: record.mealFee.method === '-' ? 'Cash' : record.mealFee.method,
            date: today,
          },
        };
      })
    );

    setActionMessage(`Payment record for ${selectedResident.resident} marked as collected.`);
    setSelectedResident(null);
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-500 pb-20">
      {actionMessage ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-bold uppercase tracking-wider text-emerald-700">
          {actionMessage}
        </div>
      ) : null}
      
      {/* 1. Dashboard Metrics (High Contrast) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { l: 'Projected Total', v: '$84,200', c: 'text-indigo-600 dark:text-indigo-400', b: 'bg-indigo-500/10', i: Receipt },
          { l: 'Fees Collected', v: '$72,850', c: 'text-emerald-600 dark:text-emerald-400', b: 'bg-emerald-500/10', i: CheckCircle2 },
          { l: 'Pending Audit', v: '$4,150', c: 'text-amber-600 dark:text-amber-400', b: 'bg-amber-500/10', i: Clock },
          { l: 'System Arrears', v: '$7,200', c: 'text-rose-600 dark:text-rose-400', b: 'bg-rose-500/10', i: ShieldAlert },
        ].map((s, i) => (
          <Card key={i} className="p-6 border-border/60 bg-card rounded-[1.5rem] border shadow-sm group hover:shadow-lg transition-all cursor-pointer relative overflow-hidden">
             <div className="relative z-10 flex items-center gap-5">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner", s.b)}>
                   <s.i className={cn("w-6 h-6", s.c)} />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground leading-none mb-2">{s.l}</p>
                   <h3 className={cn("text-2xl font-black tracking-tighter leading-none", s.c)}>{s.v}</h3>
                </div>
             </div>
          </Card>
        ))}
      </div>

      {/* 2. The Functional Registry (High Legibility) */}
      <div className="rounded-[1.5rem] border border-border/60 bg-card overflow-hidden shadow-md">
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
            <tr className="bg-muted/20 border-b border-border/20">
              <th className="py-5 px-8 text-[11px] font-black uppercase text-foreground tracking-[0.2em] w-[20%]">Entity</th>
              <th colSpan={3} className="py-5 px-8 text-[11px] font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-[0.2em] text-center bg-indigo-500/[0.05] border-x border-border/10">Room Fee Track</th>
              <th colSpan={3} className="py-5 px-8 text-[11px] font-black uppercase text-amber-600 dark:text-amber-400 tracking-[0.2em] text-center bg-amber-500/[0.05]">Meal Fee Track</th>
              <th className="py-4 px-8 text-[11px] font-black uppercase text-muted-foreground tracking-[0.2em] text-right w-[8%]">Audit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {filteredRecords.map((r) => (
              <tr key={r.id} className="group hover:bg-muted/10 transition-all">
                <td className="py-5 px-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-muted border border-border/60 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-all">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 truncate">
                      <p className="text-[14px] font-black text-foreground truncate">{r.resident}</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Room {r.room} • {r.id}</p>
                    </div>
                  </div>
                </td>

                <td className="py-5 px-4 bg-indigo-500/[0.02] pl-8">
                   <StatusIndicator status={r.roomFee.status} />
                </td>
                <td className="py-5 px-4 bg-indigo-500/[0.02] text-right">
                   <span className="text-[14px] font-mono font-black text-foreground">${r.roomFee.amount}</span>
                </td>
                <td className="py-5 px-4 bg-indigo-500/[0.02] text-center border-r border-border/10">
                   <MethodBadge method={r.roomFee.method} />
                </td>

                <td className="py-5 px-4 bg-amber-500/[0.02] pl-8">
                   <StatusIndicator status={r.mealFee.status} />
                </td>
                <td className="py-5 px-4 bg-amber-500/[0.02] text-right">
                   <span className="text-[14px] font-mono font-black text-foreground">${r.mealFee.amount}</span>
                </td>
                <td className="py-5 px-4 bg-amber-500/[0.02] text-center">
                   <MethodBadge method={r.mealFee.method} />
                </td>

                <td className="py-5 px-8 text-right">
                   <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                    onClick={() => setSelectedResident(r)}
                   >
                      <ArrowUpRight className="w-5 h-5" />
                   </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3. Balanced Detail Dialog (High Visibility) */}
      <Dialog open={!!selectedResident} onOpenChange={(open) => !open && setSelectedResident(null)}>
        <DialogContent className="max-w-2xl bg-card/95 dark:bg-slate-950/95 backdrop-blur-3xl border border-border/60 z-[100] shadow-2xl rounded-[2.5rem] overflow-hidden p-0">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
          
          {selectedResident && (
            <div className="flex flex-col">
              <div className="p-8 border-b border-border/20 bg-muted/10">
                <DialogHeader className="space-y-4">
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 rounded-[1.25rem] bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/30">
                        <User className="w-8 h-8" />
                     </div>
                     <div className="space-y-1">
                        <DialogTitle className="text-3xl font-black tracking-tight text-foreground uppercase leading-none">
                           {selectedResident.resident}
                        </DialogTitle>
                        <DialogDescription className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-3 mt-1">
                           <Badge className="text-[10px] font-black bg-primary text-white border-none px-2.5 h-5">Room {selectedResident.room}</Badge>
                           <span className="opacity-80">Reference: {selectedResident.id}</span>
                        </DialogDescription>
                     </div>
                  </div>
                </DialogHeader>
              </div>

              <div className="p-8 space-y-8">
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <h4 className="text-[12px] font-black uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400 border-b border-indigo-500/20 pb-2">Room Fee Registry</h4>
                       <div className="bg-muted/30 dark:bg-blue-950/30 rounded-[1.5rem] p-6 border border-border/20 space-y-6">
                          <div className="flex justify-between items-start">
                             <div>
                                <p className="text-[9px] font-black uppercase text-muted-foreground mb-2">Current Standing</p>
                                <StatusIndicator status={selectedResident.roomFee.status} size="lg" />
                             </div>
                             <div className="text-right">
                                <p className="text-[9px] font-black uppercase text-muted-foreground mb-2">Fee Amount</p>
                                <p className="text-2xl font-mono font-black text-foreground">${selectedResident.roomFee.amount}</p>
                             </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/20">
                             <div>
                                <p className="text-[9px] font-black uppercase text-muted-foreground mb-2">Method</p>
                                <MethodBadge method={selectedResident.roomFee.method} size="lg" />
                             </div>
                             <div className="text-right">
                                <p className="text-[9px] font-black uppercase text-muted-foreground mb-2">Ref Date</p>
                                <p className="text-[11px] font-black text-foreground leading-none mt-1">{selectedResident.roomFee.date}</p>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <h4 className="text-[12px] font-black uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400 border-b border-amber-500/20 pb-2">Culinary Fee Registry</h4>
                       <div className="bg-muted/30 dark:bg-amber-950/30 rounded-[1.5rem] p-6 border border-border/20 space-y-6">
                          <div className="flex justify-between items-start">
                             <div>
                                <p className="text-[9px] font-black uppercase text-muted-foreground mb-2">Current Standing</p>
                                <StatusIndicator status={selectedResident.mealFee.status} size="lg" />
                             </div>
                             <div className="text-right">
                                <p className="text-[9px] font-black uppercase text-muted-foreground mb-2">Fee Amount</p>
                                <p className="text-2xl font-mono font-black text-foreground">${selectedResident.mealFee.amount}</p>
                             </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/20">
                             <div>
                                <p className="text-[9px] font-black uppercase text-muted-foreground mb-2">Method</p>
                                <MethodBadge method={selectedResident.mealFee.method} size="lg" />
                             </div>
                             <div className="text-right">
                                <p className="text-[9px] font-black uppercase text-muted-foreground mb-2">Ref Date</p>
                                <p className="text-[11px] font-black text-foreground leading-none mt-1">{selectedResident.mealFee.date}</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="p-6 rounded-[2rem] bg-primary/10 border border-primary/20">
                    <p className="text-[13px] font-bold text-foreground leading-relaxed italic">
                       "Resident has maintained a <span className="text-primary font-black">92%</span> collection consistency over the last 6 fiscal cycles."
                    </p>
                 </div>

                 <div className="flex items-center gap-4 pt-2">
                    <Button onClick={() => setSelectedResident(null)} variant="outline" className="flex-1 h-14 rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] border-border/60 hover:bg-muted transition-all">
                       Close Detail
                    </Button>
                    <Button onClick={markResidentFeesCollected} className="flex-1 h-14 bg-foreground text-background dark:bg-primary dark:text-white rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] shadow-xl border-none">
                       Record Payment
                    </Button>
                 </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <div className="flex flex-col sm:flex-row gap-6">
         <div className="flex-1 p-8 rounded-[2rem] border-2 border-dashed border-border flex items-center justify-between group cursor-pointer hover:bg-muted/10 transition-all">
            <div className="space-y-2">
               <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                    <LayoutGrid className="w-5 h-5" />
                  </div>
                  <p className="text-[15px] font-black uppercase tracking-widest text-foreground">Cycle Node Process</p>
               </div>
               <p className="text-[12px] font-bold text-muted-foreground pl-11">Generate monthly references for 142 active residents.</p>
            </div>
            <Button
              onClick={() => setActionMessage('Monthly billing cycle executed for all active residents (mock).')}
              className="h-12 px-8 rounded-2xl bg-foreground text-background dark:bg-slate-100 dark:text-slate-900 text-[11px] font-black uppercase tracking-[0.15em] border-none hover:bg-foreground/90 transition-all shadow-xl"
            >
              Execute Cycle
            </Button>
         </div>
         <button
            type="button"
            onClick={() => setActionMessage('Fiscal export started. A CSV/PDF package will be generated in a backend integration.')}
            className="p-8 rounded-[2rem] border-2 border-border flex items-center gap-12 group cursor-pointer hover:border-primary transition-all bg-card shadow-sm text-left"
         >
            <div className="space-y-1">
               <p className="text-[15px] font-black uppercase tracking-widest text-foreground leading-none">Fiscal Export</p>
               <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.1em]">Archive XLSX • PDF • CSV</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-muted border border-border flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
               <Download className="w-7 h-7" />
            </div>
         </button>
      </div>
    </div>
  );
}
