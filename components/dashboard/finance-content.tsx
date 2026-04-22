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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

type PaymentStatus = 'Completed' | 'Pending' | 'Over Duedate';
type PaymentMethod = 'Cash' | 'ABA' | 'Aclelda' | '-';

interface ResidentBilling {
  id: string;
  resident: string;
  room: string;
  roomFee: { status: PaymentStatus; amount: string; method: PaymentMethod; date: string };
  mealFee: { status: PaymentStatus; amount: string; method: PaymentMethod; date: string };
}

export function FinanceContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResident, setSelectedResident] = useState<ResidentBilling | null>(null);

  const billingRecords: ResidentBilling[] = [
    { 
      id: 'RB-101', resident: 'Sarah Johnson', room: 'A-402',
      roomFee: { status: 'Completed', amount: '1,200.00', method: 'ABA', date: '05/04' },
      mealFee: { status: 'Pending', amount: '450.00', method: '-', date: '-' }
    },
    { 
      id: 'RB-102', resident: 'Michael Chen', room: 'B-105',
      roomFee: { status: 'Completed', amount: '1,150.00', method: 'Cash', date: '08/04' },
      mealFee: { status: 'Completed', amount: '450.00', method: 'Cash', date: '08/04' }
    },
    { 
      id: 'RB-103', resident: 'Emma Wilson', room: 'C-210',
      roomFee: { status: 'Over Duedate', amount: '1,200.00', method: '-', date: '-' },
      mealFee: { status: 'Over Duedate', amount: '450.00', method: '-', date: '-' }
    },
    { 
      id: 'RB-104', resident: 'James Porter', room: 'A-202',
      roomFee: { status: 'Completed', amount: '1,200.00', method: 'Aclelda', date: '02/04' },
      mealFee: { status: 'Over Duedate', amount: '450.00', method: '-', date: '-' }
    },
    { 
      id: 'RB-105', resident: 'Lisa Anderson', room: 'B-304',
      roomFee: { status: 'Pending', amount: '1,150.00', method: '-', date: '-' },
      mealFee: { status: 'Completed', amount: '450.00', method: 'ABA', date: '09/04' }
    },
  ];

  const filteredRecords = useMemo(() => {
    return billingRecords.filter(r => 
      r.resident.toLowerCase().includes(searchTerm.toLowerCase()) || 
      r.room.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const StatusIndicator = ({ status }: { status: PaymentStatus }) => {
    const config = {
      'Completed': 'bg-emerald-500 text-emerald-600',
      'Pending': 'bg-amber-500 text-amber-600',
      'Over Duedate': 'bg-rose-500 text-rose-600 animate-pulse'
    };
    return (
      <div className="flex items-center gap-2 px-2 py-0.5 rounded bg-white/50 dark:bg-muted/30 border border-border/10 w-24">
        <div className={cn("w-1 h-1 rounded-full shrink-0", config[status].split(' ')[0])} />
        <span className={cn("text-[8px] font-black uppercase tracking-tighter leading-none", config[status].split(' ')[1])}>
          {status === 'Over Duedate' ? 'OVERDUE' : status}
        </span>
      </div>
    );
  };

  const MethodBadge = ({ method }: { method: PaymentMethod }) => {
    if (method === '-') return <span className="text-muted-foreground/10 text-[10px] tracking-widest">—</span>;
    
    const config = {
      'Cash': { icon: Banknote, color: 'text-emerald-600', bg: 'bg-emerald-500/5', border: 'border-emerald-500/10' },
      'ABA': { icon: Building, color: 'text-blue-600', bg: 'bg-blue-500/5', border: 'border-blue-500/10' },
      'Aclelda': { icon: Building, color: 'text-sky-600', bg: 'bg-sky-500/5', border: 'border-sky-500/10' }
    };
    const c = config[method as keyof typeof config];
    const Icon = c.icon;

    return (
      <div className={cn("inline-flex items-center gap-1.5 px-2 py-1 rounded-md border shadow-sm", c.bg, c.border)}>
        <Icon className={cn("w-3 h-3", c.color)} />
        <span className={cn("text-[8px] font-black uppercase tracking-tight", c.color)}>{method}</span>
      </div>
    );
  };

  return (
    <div className="w-full space-y-5 animate-in fade-in duration-500 pb-20">
      
      {/* 1. Dashboard Metrics (Larger with Radius) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { l: 'Projected Total', v: '$84,200', c: 'text-indigo-500', b: 'bg-indigo-500/5', i: Receipt },
          { l: 'Fees Collected', v: '$72,850', c: 'text-emerald-500', b: 'bg-emerald-500/5', i: CheckCircle2 },
          { l: 'Pending Audit', v: '$4,150', c: 'text-amber-500', b: 'bg-amber-500/5', i: Clock },
          { l: 'System Arrears', v: '$7,200', c: 'text-rose-500', b: 'bg-rose-500/5', i: ShieldAlert },
        ].map((s, i) => (
          <Card key={i} className="p-5 border-border/40 bg-card rounded-[1.5rem] border shadow-sm group hover:shadow-lg hover:border-primary/20 transition-all cursor-pointer relative overflow-hidden">
             <div className="relative z-10 flex items-center gap-5">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner", s.b)}>
                   <s.i className={cn("w-6 h-6", s.c)} />
                </div>
                <div>
                   <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 leading-none mb-1.5">{s.l}</p>
                   <h3 className={cn("text-xl font-black tracking-tighter leading-none", s.c)}>{s.v}</h3>
                </div>
             </div>
          </Card>
        ))}
      </div>

      {/* 2. The Functional Registry (Highly Organized) */}
      <div className="rounded-[1.5rem] border border-border/40 bg-card overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
            {/* Main Category Header */}
            <tr className="bg-muted/10 border-b border-border/10">
              <th className="py-2 px-8 text-[10px] font-black uppercase text-muted-foreground/30 tracking-[0.3em] w-[20%]">Entity</th>
              <th colSpan={3} className="py-2 px-8 text-[10px] font-black uppercase text-indigo-500/40 tracking-[0.3em] text-center bg-indigo-500/[0.03] border-x border-border/5">Room Fee Track</th>
              <th colSpan={3} className="py-2 px-8 text-[10px] font-black uppercase text-amber-500/40 tracking-[0.3em] text-center bg-amber-500/[0.03]">Meal Fee Track</th>
              <th className="py-2 px-8 text-[10px] font-black uppercase text-muted-foreground/30 tracking-[0.3em] text-right w-[8%]">Audit</th>
            </tr>
            {/* Functional Sub-Header */}
            <tr className="bg-muted/30 border-b border-border/10">
              <th className="py-2 px-8 text-[8px] font-black uppercase text-muted-foreground/40 tracking-widest">Resident / Unit</th>
              <th className="py-2 px-4 text-[8px] font-black uppercase text-muted-foreground/40 tracking-widest bg-indigo-500/[0.03] pl-8">Status</th>
              <th className="py-2 px-4 text-[8px] font-black uppercase text-muted-foreground/40 tracking-widest bg-indigo-500/[0.03] text-right">Amount</th>
              <th className="py-2 px-4 text-[8px] font-black uppercase text-muted-foreground/40 tracking-widest bg-indigo-500/[0.03] text-center border-r border-border/5">Method</th>
              <th className="py-2 px-4 text-[8px] font-black uppercase text-muted-foreground/40 tracking-widest bg-amber-500/[0.03] pl-8">Status</th>
              <th className="py-2 px-4 text-[8px] font-black uppercase text-muted-foreground/40 tracking-widest bg-amber-500/[0.03] text-right">Amount</th>
              <th className="py-2 px-4 text-[8px] font-black uppercase text-muted-foreground/40 tracking-widest bg-amber-500/[0.03] text-center">Method</th>
              <th className="py-2 px-8 bg-card"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/10">
            {filteredRecords.map((r) => (
              <tr key={r.id} className="group hover:bg-muted/5 transition-all">
                {/* 1. Entity Pillar */}
                <td className="py-3 px-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-muted/40 border border-border/40 flex items-center justify-center text-muted-foreground/20 group-hover:text-primary transition-all">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5 truncate">
                      <p className="text-[11px] font-black text-foreground truncate">{r.resident}</p>
                      <p className="text-[8px] font-bold text-muted-foreground/40 uppercase tracking-widest leading-none">{r.room} • {r.id}</p>
                    </div>
                  </div>
                </td>

                {/* 2. Room Fee Columns */}
                <td className="py-3 px-4 bg-indigo-500/[0.01] pl-8">
                   <StatusIndicator status={r.roomFee.status} />
                </td>
                <td className="py-3 px-4 bg-indigo-500/[0.01] text-right">
                   <span className="text-[11px] font-mono font-black text-foreground">${r.roomFee.amount}</span>
                </td>
                <td className="py-3 px-4 bg-indigo-500/[0.01] text-center border-r border-border/5">
                   <MethodBadge method={r.roomFee.method} />
                </td>

                {/* 3. Meal Fee Columns */}
                <td className="py-3 px-4 bg-amber-500/[0.01] pl-8">
                   <StatusIndicator status={r.mealFee.status} />
                </td>
                <td className="py-3 px-4 bg-amber-500/[0.01] text-right">
                   <span className="text-[11px] font-mono font-black text-foreground">${r.mealFee.amount}</span>
                </td>
                <td className="py-3 px-4 bg-amber-500/[0.01] text-center">
                   <MethodBadge method={r.mealFee.method} />
                </td>

                {/* 4. Audit Node */}
                <td className="py-3 px-8 text-right">
                   <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 rounded-lg text-muted-foreground hover:text-primary transition-all"
                    onClick={() => setSelectedResident(r)}
                   >
                      <ArrowUpRight className="w-4 h-4" />
                   </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3. Detail Panel & Footers... (Unchanged) */}
      <Sheet open={!!selectedResident} onOpenChange={(open) => !open && setSelectedResident(null)}>
        <SheetContent className="sm:max-w-md border-l border-border/40 bg-card/95 backdrop-blur-xl p-0 overflow-hidden">
          {selectedResident && (
            <div className="flex flex-col h-full">
              <div className="p-8 border-b border-border/10 bg-muted/5">
                <SheetHeader className="space-y-4">
                  <div className="flex items-center gap-4">
                     <div className="w-14 h-14 rounded-[1.25rem] bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/20">
                        <User className="w-7 h-7" />
                     </div>
                     <div>
                        <SheetTitle className="text-xl font-black tracking-tight">{selectedResident.resident}</SheetTitle>
                        <SheetDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2 mt-0.5">
                           <Badge variant="outline" className="text-[9px] font-black border-none bg-muted px-1.5 h-3.5">{selectedResident.room}</Badge>
                           <span>ID: {selectedResident.id}</span>
                        </SheetDescription>
                     </div>
                  </div>
                </SheetHeader>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-500/60 border-b border-indigo-500/10 pb-2">Room Fee Registry</h4>
                    <div className="bg-muted/10 rounded-2xl p-5 border border-border/20 space-y-4">
                       <div className="flex justify-between items-start">
                          <div>
                             <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">Current Standing</p>
                             <StatusIndicator status={selectedResident.roomFee.status} />
                          </div>
                          <div className="text-right">
                             <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">Fee Amount</p>
                             <p className="text-lg font-mono font-black text-foreground">${selectedResident.roomFee.amount}</p>
                          </div>
                       </div>
                       <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/10">
                          <div>
                             <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">Method</p>
                             <div className="flex items-center gap-2">
                                <MethodBadge method={selectedResident.roomFee.method} />
                             </div>
                          </div>
                          <div className="text-right">
                             <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">Ref Date</p>
                             <p className="text-[10px] font-bold text-foreground">{selectedResident.roomFee.date}</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-500/60 border-b border-amber-500/10 pb-2">Culinary Fee Registry</h4>
                    <div className="bg-muted/10 rounded-2xl p-5 border border-border/20 space-y-4">
                       <div className="flex justify-between items-start">
                          <div>
                             <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">Current Standing</p>
                             <StatusIndicator status={selectedResident.mealFee.status} />
                          </div>
                          <div className="text-right">
                             <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">Fee Amount</p>
                             <p className="text-lg font-mono font-black text-foreground">${selectedResident.mealFee.amount}</p>
                          </div>
                       </div>
                       <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/10">
                          <div>
                             <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">Method</p>
                             <div className="flex items-center gap-2">
                                <MethodBadge method={selectedResident.mealFee.method} />
                             </div>
                          </div>
                          <div className="text-right">
                             <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">Ref Date</p>
                             <p className="text-[10px] font-bold text-foreground">{selectedResident.mealFee.date}</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-4 pt-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/40">Financial Integrity Audit</h4>
                    <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                       <p className="text-[11px] font-medium text-muted-foreground leading-relaxed italic">
                          "Resident has maintained a <span className="text-primary font-bold">92%</span> collection consistency over the last 6 fiscal cycles. No manual interventions flagged."
                       </p>
                    </div>
                 </div>
              </div>

              <div className="p-8 border-t border-border/10 bg-muted/5 grid grid-cols-2 gap-3">
                 <Button variant="outline" className="rounded-xl h-11 text-[10px] font-black uppercase tracking-widest border-border/40">
                    Send Reminder
                 </Button>
                 <Button className="rounded-xl h-11 bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 border-none">
                    Record Payment
                 </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <div className="flex flex-col sm:flex-row gap-6">
         <div className="flex-1 p-8 rounded-[2rem] border border-dashed border-border/60 flex items-center justify-between group cursor-pointer hover:bg-muted/5 transition-all">
            <div className="space-y-1.5">
               <div className="flex items-center gap-3">
                  <LayoutGrid className="w-4 h-4 text-primary" />
                  <p className="text-sm font-black uppercase tracking-widest text-foreground">Cycle Node Process</p>
               </div>
               <p className="text-[11px] font-medium text-muted-foreground/60 leading-none">Generate monthly references for 142 active residents.</p>
            </div>
            <Button className="h-11 px-6 rounded-2xl bg-foreground text-background text-[10px] font-black uppercase tracking-[0.2em] border-none hover:bg-foreground/90 transition-all shadow-xl">Execute Cycle</Button>
         </div>
         <div className="p-8 rounded-[2rem] border border-border/40 flex items-center gap-12 group cursor-pointer hover:border-primary/20 transition-all">
            <div className="space-y-1.5">
               <p className="text-sm font-black uppercase tracking-widest text-foreground leading-none">Fiscal Export</p>
               <p className="text-[10px] font-bold text-muted-foreground/30 uppercase tracking-tighter">Archive XLSX • PDF • CSV</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-muted/40 flex items-center justify-center text-muted-foreground/20 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
               <Download className="w-6 h-6" />
            </div>
         </div>
      </div>
    </div>
  );
}
