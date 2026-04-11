'use client';

import {
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Download,
  Filter,
  DollarSign,
  TrendingUp,
  TrendingDown,
  PieChart,
  Activity,
  Calendar,
  Plus,
  Search,
  Receipt,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Transaction {
  id: string;
  user: string;
  amount: string;
  type: 'Credit' | 'Debit';
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
  category: string;
}

export function FinanceContent({ tier = 'pro' }: { tier?: string }) {
  const [activeTab, setActiveTab] = useState<'ledger' | 'revenue' | 'invoices'>('ledger');
  const [searchTerm, setSearchTerm] = useState('');

  const transactions: Transaction[] = [
    { id: 'TX-99201', user: 'Sarah Johnson', amount: '£1,200.00', type: 'Credit', status: 'Completed', date: 'Apr 08, 2026', category: 'Rent' },
    { id: 'TX-99202', user: 'Michael Chen', amount: '£950.00', type: 'Credit', status: 'Pending', date: 'Apr 09, 2026', category: 'Rent' },
    { id: 'TX-99203', user: 'Utility Provider', amount: '£4,200.00', type: 'Debit', status: 'Completed', date: 'Apr 07, 2026', category: 'Utilities' },
    { id: 'TX-99204', user: 'Maintenance Supplies', amount: '£240.50', type: 'Debit', status: 'Completed', date: 'Apr 10, 2026', category: 'Supplies' },
  ];

  const financialStats = useMemo(() => [
    { label: 'Total Revenue', value: '£342,000', trend: '+12.5%', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Outstanding', value: '£12,450', trend: '-2.1%', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Op. Expenses', value: '£84,200', trend: '+5.4%', icon: Activity, color: 'text-rose-500', bg: 'bg-rose-50' },
    { label: 'Net Margin', value: '74.2%', trend: 'Stable', icon: TrendingUp, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  ], []);

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-in fade-in duration-700">
      
      {/* Professional Finance Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-border/40">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="rounded-full px-2 py-0 border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-wider">
              Fiscal Control
            </Badge>
            <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">Global Financial Ledger & Revenue Engine</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Finance Hub</h1>
          <p className="text-sm font-medium text-muted-foreground/60 max-w-xl">Manage transactions, monitor revenue growth, and oversee institutional billing.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex p-1 bg-muted/20 rounded-xl border border-border/20 shadow-inner">
             {['ledger', 'revenue', 'invoices'].map((tab) => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab as any)}
                 className={cn(
                   "px-6 py-2 rounded-lg text-xs font-bold transition-all capitalize",
                   activeTab === tab ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                 )}
               >
                 {tab}
               </button>
             ))}
          </div>
          <Button className="rounded-xl h-10 px-5 font-bold bg-primary text-white shadow-lg shadow-primary/10 gap-2 text-xs uppercase tracking-wider transition-all hover:scale-[1.02]">
            <Plus className="w-4 h-4" /> New Entry
          </Button>
        </div>
      </div>

      {/* Financial Health Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {financialStats.map((s, i) => (
          <Card key={i} className="p-5 border-border/40 bg-card rounded-2xl flex items-center gap-4 hover:shadow-md transition-all border group">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform", s.bg)}>
               <s.icon className={cn("w-6 h-6", s.color)} />
            </div>
            <div>
               <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 leading-none mb-1.5">{s.label}</p>
               <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold tracking-tight">{s.value}</span>
                  <span className={cn("text-[10px] font-bold", s.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500')}>{s.trend}</span>
               </div>
            </div>
          </Card>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'ledger' && (
          <motion.div
            key="ledger"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between px-1">
              <div className="relative flex-1 group w-full sm:max-w-md">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                 <Input 
                   placeholder="Search transactions, entities, or IDs..." 
                   className="pl-10 h-10 bg-muted/20 border-border/40 rounded-xl text-xs font-bold focus:bg-background"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>
              <div className="flex gap-2">
                 <Button variant="outline" size="sm" className="h-10 rounded-xl border-border/40 gap-2 text-xs font-bold px-4">
                    <Filter className="w-4 h-4" /> Filter
                 </Button>
                 <Button variant="outline" size="sm" className="h-10 rounded-xl border-border/40 gap-2 text-xs font-bold px-4">
                    <Download className="w-4 h-4" /> Export Ledger
                 </Button>
              </div>
            </div>

            <Card className="border-border/40 bg-card rounded-[1.5rem] border overflow-hidden shadow-sm">
               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                     <thead className="bg-muted/10 border-b border-border/10">
                        <tr>
                           <th className="p-4 text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Reference</th>
                           <th className="p-4 text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Entity</th>
                           <th className="p-4 text-[10px] font-bold uppercase text-muted-foreground tracking-widest text-center">Type</th>
                           <th className="p-4 text-[10px] font-bold uppercase text-muted-foreground tracking-widest text-center">Status</th>
                           <th className="p-4 text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Date</th>
                           <th className="p-4 text-[10px] font-bold uppercase text-muted-foreground tracking-widest text-right">Amount</th>
                           <th className="p-4" />
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-border/10">
                        {transactions.map((t) => (
                           <tr key={t.id} className="group hover:bg-muted/5 transition-all cursor-pointer">
                              <td className="p-4">
                                 <span className="text-[11px] font-mono font-bold text-muted-foreground/40 uppercase tracking-tight">{t.id}</span>
                              </td>
                              <td className="p-4">
                                 <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                                       <Receipt className="w-4 h-4" />
                                    </div>
                                    <div className="space-y-0.5">
                                       <p className="text-xs font-bold text-foreground leading-tight">{t.user}</p>
                                       <p className="text-[9px] font-medium text-muted-foreground uppercase">{t.category}</p>
                                    </div>
                                 </div>
                              </td>
                              <td className="p-4 text-center">
                                 <Badge variant="outline" className={cn(
                                    "text-[9px] font-bold uppercase px-2 h-5 border-none",
                                    t.type === 'Credit' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'
                                 )}>
                                    {t.type}
                                 </Badge>
                              </td>
                              <td className="p-4 text-center">
                                 <div className="flex flex-col items-center gap-1">
                                    <Badge className={cn(
                                       "text-[8px] font-black uppercase px-2 py-0.5 rounded-full border-none",
                                       t.status === 'Completed' ? 'bg-emerald-500 text-white' : 
                                       t.status === 'Pending' ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white'
                                    )}>
                                       {t.status}
                                    </Badge>
                                 </div>
                              </td>
                              <td className="p-4">
                                 <span className="text-[11px] font-bold text-muted-foreground/60">{t.date}</span>
                              </td>
                              <td className="p-4 text-right">
                                 <span className={cn(
                                    "text-sm font-black tracking-tight",
                                    t.type === 'Credit' ? "text-emerald-500" : "text-rose-500"
                                 )}>
                                    {t.type === 'Credit' ? '+' : '-'}{t.amount}
                                 </span>
                              </td>
                              <td className="p-4 text-right">
                                 <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                 </Button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'revenue' && (
          <motion.div
            key="revenue"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid lg:grid-cols-2 gap-6"
          >
             <Card className="p-8 border-border/40 bg-card rounded-[2rem] border shadow-sm flex flex-col items-center justify-center text-center space-y-4 h-[400px]">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                   <TrendingUp className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                   <h3 className="text-xl font-bold tracking-tight">Revenue Analytics Engine</h3>
                   <p className="text-sm text-muted-foreground/60 max-w-sm">Deep-dive into growth trends, projection models, and asset performance metrics.</p>
                </div>
                <Button className="rounded-xl h-10 px-6 font-bold bg-primary text-white">Generate Full Report</Button>
             </Card>

             <Card className="p-8 border-border/40 bg-card rounded-[2rem] border shadow-sm flex flex-col justify-between h-[400px]">
                <div className="space-y-1">
                   <h3 className="text-lg font-bold tracking-tight uppercase">Yield Analysis</h3>
                   <p className="text-xs text-muted-foreground/60">Portfolio-wide profit distribution</p>
                </div>
                <div className="space-y-6">
                   {[
                     { l: 'Bloomsbury Hall', v: 84, color: 'bg-blue-500' },
                     { l: 'Borough Wing', v: 72, color: 'bg-purple-500' },
                     { l: 'Paddington Court', v: 91, color: 'bg-emerald-500' },
                   ].map((d, i) => (
                     <div key={i} className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
                           <span>{d.l}</span>
                           <span className="text-foreground">{d.v}% Yield</span>
                        </div>
                        <div className="h-2 w-full bg-muted/30 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${d.v}%` }}
                             className={cn("h-full rounded-full shadow-sm", d.color)} 
                           />
                        </div>
                     </div>
                   ))}
                </div>
                <div className="pt-6 border-t border-border/10 flex justify-between items-center">
                   <p className="text-[10px] font-bold text-muted-foreground/40 uppercase">Target Efficiency: 95%</p>
                   <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                </div>
             </Card>
          </motion.div>
        )}

        {activeTab === 'invoices' && (
          <motion.div
            key="invoices"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
             <Card className="p-12 border-border/40 bg-card rounded-[2rem] border shadow-sm text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 mx-auto">
                   <FileText className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                   <h3 className="text-xl font-bold tracking-tight">Institutional Billing System</h3>
                   <p className="text-sm text-muted-foreground/60 max-w-sm mx-auto">Automated invoice generation, resident billing portals, and historical archiving.</p>
                </div>
                <div className="flex justify-center gap-3 pt-4">
                   <Button variant="outline" className="rounded-xl h-10 px-6 font-bold border-border/40">Manage Templates</Button>
                   <Button className="rounded-xl h-10 px-6 font-bold bg-primary text-white">Generate Batch</Button>
                </div>
             </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
