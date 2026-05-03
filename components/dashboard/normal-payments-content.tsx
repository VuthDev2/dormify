'use client';

import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  DollarSign,
  Download,
  Filter,
  Plus,
  Search,
  Users,
  Calendar,
  Wallet
} from 'lucide-react';
import React, { useMemo, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NORMAL_PAYMENT_INVOICES, type NormalPaymentInvoice } from './mock-data';

const stats = [
  {
    label: 'Total Revenue',
    value: '$18,460',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-500/20',
  },
  {
    label: 'Pending',
    value: '$3,520',
    change: '8 residents',
    trend: 'neutral',
    icon: Clock,
    color: 'text-amber-700 bg-amber-100 dark:text-amber-400 dark:bg-amber-500/20',
  },
  {
    label: 'Overdue',
    value: '$1,280',
    change: '2 residents',
    trend: 'down',
    icon: AlertCircle,
    color: 'text-rose-700 bg-rose-100 dark:text-rose-400 dark:bg-rose-500/20',
  },
] as const;

type PaymentFilter = 'all' | 'paid' | 'pending' | 'overdue';

export function NormalPaymentsContent() {
  const [invoices, setInvoices] = useState<NormalPaymentInvoice[]>(NORMAL_PAYMENT_INVOICES);
  const [selectedInvoice, setSelectedInvoice] = useState<NormalPaymentInvoice | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<PaymentFilter>('all');
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [isNewPaymentOpen, setIsNewPaymentOpen] = useState(false);
  const [newPayment, setNewPayment] = useState({
    name: '',
    room: '',
    amount: '',
    method: 'Cash',
    email: '',
  });

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const matchesQuery =
        invoice.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.room.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        activeFilter === 'all' ||
        invoice.status.toLowerCase() === activeFilter;

      return matchesQuery && matchesFilter;
    });
  }, [activeFilter, invoices, searchTerm]);

  const cycleFilter = () => {
    setActiveFilter((previous) => {
      if (previous === 'all') return 'paid';
      if (previous === 'paid') return 'pending';
      if (previous === 'pending') return 'overdue';
      return 'all';
    });
  };

  const markAsCollected = () => {
    if (!selectedInvoice) return;

    setInvoices((previous) =>
      previous.map((invoice) =>
        invoice.id === selectedInvoice.id
          ? { ...invoice, status: 'Paid', method: invoice.method === '-' ? 'Cash' : invoice.method }
          : invoice
      )
    );
    setActionMessage(`Invoice ${selectedInvoice.id} marked as collected.`);
    setSelectedInvoice((previous) => (previous ? { ...previous, status: 'Paid' } : previous));
  };

  const createPayment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newPayment.name || !newPayment.room || !newPayment.amount || !newPayment.email) {
      setActionMessage('Please complete all new payment fields.');
      return;
    }

    const createdInvoice: NormalPaymentInvoice = {
      id: `INV-${Math.floor(3000 + Math.random() * 5000)}`,
      name: newPayment.name,
      room: newPayment.room,
      amount: `$${Number(newPayment.amount).toFixed(2)}`,
      status: 'Pending',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      method: newPayment.method,
      email: newPayment.email,
      avatar: newPayment.name.split(' ')[0] ?? newPayment.name,
    };

    setInvoices((previous) => [createdInvoice, ...previous]);
    setActionMessage(`New payment ${createdInvoice.id} created for ${createdInvoice.name}.`);
    setIsNewPaymentOpen(false);
    setNewPayment({ name: '', room: '', amount: '', method: 'Cash', email: '' });
  };

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      {actionMessage ? (
        <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-xs font-bold uppercase tracking-wider text-blue-800">
          {actionMessage}
        </div>
      ) : null}

      {/* Header Section */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100 uppercase">
            Payments & Invoices
          </h1>
          <p className="text-sm font-bold text-muted-foreground mt-1">
            Manage your dorm collections and track resident payment status.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setActionMessage('Export started. Download will be enabled when backend export API is connected.')}
            className="h-10 rounded-xl gap-2 text-xs font-black uppercase tracking-widest border-border/60"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button
            onClick={() => setIsNewPaymentOpen(true)}
            className="h-10 rounded-xl gap-2 text-xs font-black uppercase tracking-widest bg-primary text-primary-foreground shadow-md shadow-primary/20 border-none"
          >
            <Plus className="h-4 w-4" />
            New Payment
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6 border-border/60 shadow-sm rounded-2xl group hover:shadow-md transition-all cursor-pointer bg-card">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2.5 rounded-xl shadow-sm", stat.color)}>
                <stat.icon className="h-5 w-5" />
              </div>
              {stat.trend === 'up' && (
                <Badge variant="outline" className="text-[10px] font-black border-emerald-500/30 text-emerald-700 dark:text-emerald-400 bg-emerald-500/5 px-2.5 py-0.5 rounded-full">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  {stat.change}
                </Badge>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em]">
                {stat.label}
              </p>
              <h3 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">
                {stat.value}
              </h3>
              {stat.trend !== 'up' && (
                <p className="text-[11px] text-muted-foreground font-black mt-1 uppercase tracking-tight">
                  {stat.change} this month
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Area */}
      <Card className="border-border/60 shadow-lg rounded-[2rem] overflow-hidden">
        <div className="p-6 border-b border-border/60 bg-slate-50/50 dark:bg-slate-900/20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search resident or room..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="h-11 pl-11 text-sm font-bold rounded-xl border-border/60 focus-visible:ring-primary/20 bg-background/50"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={cycleFilter} className="h-11 px-4 rounded-xl text-xs font-bold uppercase tracking-widest border-border/60">
                <Filter className="mr-2 h-4 w-4" />
                Filter: {activeFilter}
              </Button>
              <Badge variant="secondary" className="h-11 px-4 rounded-xl text-[11px] font-black uppercase tracking-widest bg-muted/50 border-none text-muted-foreground">
                <Users className="mr-2 h-4 w-4" />
                {filteredInvoices.length} Residents
              </Badge>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/20">
              <TableRow className="hover:bg-transparent border-border/60">
                <TableHead className="w-[280px] text-[10px] font-black uppercase tracking-[0.2em] h-12 px-6 text-muted-foreground">Resident Info</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] h-12 px-6 text-muted-foreground">Amount</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] h-12 px-6 text-muted-foreground">Date</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] h-12 px-6 text-muted-foreground">Method</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] h-12 px-6 text-muted-foreground">Status</TableHead>
                <TableHead className="w-[60px] h-12 px-6"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((resident) => (
                <TableRow 
                  key={resident.id} 
                  className="border-border/40 hover:bg-muted/10 cursor-pointer group"
                  onClick={() => setSelectedInvoice(resident)}
                >
                  <TableCell className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-border/60 group-hover:border-primary/40 transition-all">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${resident.avatar}`} />
                        <AvatarFallback className="font-black text-xs">{resident.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-[14px] font-black text-slate-900 dark:text-slate-100">{resident.name}</span>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Room {resident.room}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <span className="text-[14px] font-mono font-black text-slate-900 dark:text-slate-100">{resident.amount}</span>
                  </TableCell>
                  <TableCell className="px-6 py-5 text-sm font-bold text-slate-600 dark:text-slate-400">
                    {resident.date}
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-md border border-border/10">
                      {resident.method}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <Badge
                      className={cn(
                        "rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-wide border-none shadow-sm",
                        resident.status === 'Paid' ? "bg-emerald-500 text-white" :
                        resident.status === 'Pending' ? "bg-amber-500 text-white" :
                        "bg-rose-500 text-white"
                      )}
                    >
                      {resident.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-5 text-right">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-muted-foreground group-hover:text-primary transition-all">
                      <ArrowUpRight className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="p-5 border-t border-border/60 text-center bg-muted/5">
          <Button variant="link" className="text-xs font-black uppercase tracking-[0.15em] text-muted-foreground hover:text-primary transition-all">
            Open Historical Registry
          </Button>
        </div>
      </Card>

      {/* Invoice Detail Dialog (Enhanced Visibility) */}
      <Dialog open={!!selectedInvoice} onOpenChange={(open) => !open && setSelectedInvoice(null)}>
        <DialogContent className="max-w-xl bg-card/95 dark:bg-slate-950/95 backdrop-blur-3xl border border-border/60 z-[100] shadow-2xl rounded-[2.5rem] overflow-hidden p-0">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent"></div>
          
          {selectedInvoice && (
            <div className="flex flex-col">
              <div className="p-8 border-b border-border/20 bg-muted/10">
                <DialogHeader className="space-y-4">
                  <div className="flex items-center gap-6">
                     <Avatar className="h-16 w-16 border-2 border-primary/20 shadow-xl">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedInvoice.avatar}`} />
                        <AvatarFallback className="text-lg font-black">{selectedInvoice.name.charAt(0)}</AvatarFallback>
                     </Avatar>
                     <div className="space-y-1">
                        <DialogTitle className="text-2xl font-black tracking-tight text-foreground uppercase">
                           {selectedInvoice.name}
                        </DialogTitle>
                        <DialogDescription className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-3">
                           <Badge className="text-[9px] font-black bg-primary text-white border-none px-2 h-4.5">Room {selectedInvoice.room}</Badge>
                           <span className="opacity-70">INV: {selectedInvoice.id}</span>
                        </DialogDescription>
                     </div>
                  </div>
                </DialogHeader>
              </div>

              <div className="p-8 space-y-6">
                 <div className="grid grid-cols-2 gap-6">
                    <div className="p-5 rounded-3xl bg-muted/30 border border-border/10 space-y-3">
                       <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground">
                          <Wallet className="w-3.5 h-3.5" /> Total Due
                       </div>
                       <p className="text-3xl font-mono font-black text-foreground">{selectedInvoice.amount}</p>
                    </div>

                    <div className="p-5 rounded-3xl bg-muted/30 border border-border/10 space-y-3">
                       <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5" /> Issued On
                       </div>
                       <p className="text-xl font-black text-foreground uppercase">{selectedInvoice.date}</p>
                    </div>
                 </div>

                 <div className="p-6 rounded-[1.5rem] bg-foreground/5 dark:bg-blue-500/10 border border-border/10">
                    <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-wider">
                       <span className="text-muted-foreground">Reference Verification</span>
                       <span className="text-foreground">{selectedInvoice.email}</span>
                    </div>
                 </div>

                 <div className="flex items-center gap-4 pt-2">
                    <Button onClick={() => setSelectedInvoice(null)} variant="outline" className="flex-1 h-12 rounded-2xl font-black text-[11px] uppercase tracking-[0.15em] border-border/60">
                       Dismiss Detail
                    </Button>
                    {selectedInvoice.status !== 'Paid' && (
                      <Button onClick={markAsCollected} className="flex-1 h-12 bg-foreground text-background dark:bg-primary dark:text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.15em] shadow-xl border-none">
                         Mark as Collected
                      </Button>
                    )}
                 </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isNewPaymentOpen} onOpenChange={setIsNewPaymentOpen}>
        <DialogContent className="max-w-lg rounded-[2rem] border-border/60">
          <DialogHeader>
            <DialogTitle className="text-xl font-black uppercase tracking-tight">Create New Payment</DialogTitle>
            <DialogDescription className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Local mock flow for manual testing and backend handoff.
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-4 pt-2" onSubmit={createPayment}>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase tracking-widest">Resident Name</Label>
              <Input value={newPayment.name} onChange={(event) => setNewPayment((prev) => ({ ...prev, name: event.target.value }))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest">Room</Label>
                <Input value={newPayment.room} onChange={(event) => setNewPayment((prev) => ({ ...prev, room: event.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest">Amount (USD)</Label>
                <Input type="number" min="0" step="0.01" value={newPayment.amount} onChange={(event) => setNewPayment((prev) => ({ ...prev, amount: event.target.value }))} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase tracking-widest">Email</Label>
              <Input type="email" value={newPayment.email} onChange={(event) => setNewPayment((prev) => ({ ...prev, email: event.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase tracking-widest">Payment Method</Label>
              <Input value={newPayment.method} onChange={(event) => setNewPayment((prev) => ({ ...prev, method: event.target.value }))} />
            </div>

            <div className="pt-2 flex items-center gap-3">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setIsNewPaymentOpen(false)}>Cancel</Button>
              <Button type="submit" className="flex-1">Create Payment</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
