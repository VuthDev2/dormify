'use client';

import {
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Download,
  Filter,
  Banknote,
  Building
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Transaction {
  id: string;
  user: string;
  amount: string;
  type: 'Credit' | 'Debit';
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
  method?: 'Cash' | 'Bank Transfer' | 'Card';
}

interface FinanceLedgerProps {
  title: string;
  transactions: Transaction[];
  tier: 'normal' | 'pro' | 'premium';
}

export function FinanceLedger({ title, transactions, tier }: FinanceLedgerProps) {
  const getMethodIcon = (method?: string) => {
    switch (method) {
      case 'Cash': return <Banknote className="w-4 h-4 text-emerald-500" />;
      case 'Bank Transfer': return <Building className="w-4 h-4 text-blue-500" />;
      default: return <CreditCard className="w-4 h-4 text-muted-foreground/40" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black tracking-tight text-foreground">{title}</h2>
        <div className="flex gap-2">
           <Button variant="outline" size="sm" className="rounded-xl h-10 border-border text-muted-foreground hover:bg-muted">
             <Filter className="w-4 h-4 mr-2" /> Filter
           </Button>
           <Button variant="outline" size="sm" className="rounded-xl h-10 border-border text-muted-foreground hover:bg-muted">
             <Download className="w-4 h-4 mr-2" /> Export CSV
           </Button>
        </div>
      </div>

      <Card className={cn(
        "rounded-[2rem] border-border/40 shadow-sm overflow-hidden bg-card transition-all",
        tier !== 'normal' ? "shadow-2xl shadow-primary/5" : ""
      )}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted/30 border-b border-border/40">
                <th className="p-5 pl-8 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">Transaction ID</th>
                <th className="p-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">Resident</th>
                <th className="p-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40 text-center">Fee Type</th>
                <th className="p-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40 text-center">Method</th>
                <th className="p-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40 text-center">Status</th>
                <th className="p-4 text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Date</th>
                <th className="p-5 pr-8 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {transactions.map((t, i) => (
                <tr key={i} className="group hover:bg-muted/10 transition-colors">
                  <td className="p-5 pl-8 text-xs font-mono text-muted-foreground/40">{t.id}</td>
                  <td className="p-5 text-sm font-black text-foreground">{t.user}</td>
                  <td className="p-5 text-center">
                    <Badge variant="outline" className="text-[10px] font-bold uppercase border-primary/20 bg-primary/5 text-primary">
                      {(t as any).category || 'Room Fee'}
                    </Badge>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center justify-center gap-2">
                      {getMethodIcon(t.method)}
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{t.method || 'Transfer'}</span>
                    </div>
                  </td>
                  <td className="p-5 text-center">
                    <Badge className={cn(
                      "text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border-none",
                      t.status === 'Completed' ? "bg-emerald-500/10 text-emerald-500" :
                      t.status === 'Pending' ? "bg-amber-500/10 text-amber-500" : "bg-rose-500/10 text-rose-500"
                    )}>
                      {t.status}
                    </Badge>
                  </td>
                  <td className="p-5 text-xs text-muted-foreground/40 font-medium">{t.date}</td>
                  <td className={cn(
                    "p-5 pr-8 text-right font-black text-sm",
                    t.type === 'Credit' ? "text-emerald-500" : "text-rose-500"
                  )}>
                    {t.type === 'Credit' ? '+' : '-'}{t.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
