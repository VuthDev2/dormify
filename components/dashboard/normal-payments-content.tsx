'use client';

import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  CreditCard,
  DollarSign,
  Download,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

const stats = [
  {
    label: 'Total Revenue',
    value: '$18,460',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10',
  },
  {
    label: 'Pending',
    value: '$3,520',
    change: '8 residents',
    trend: 'neutral',
    icon: Clock,
    color: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10',
  },
  {
    label: 'Overdue',
    value: '$1,280',
    change: '2 residents',
    trend: 'down',
    icon: AlertCircle,
    color: 'text-rose-600 bg-rose-50 dark:bg-rose-500/10',
  },
] as const;

const residents = [
  {
    name: 'Sokha Chann',
    room: 'A-204',
    amount: '$325.00',
    status: 'Paid',
    date: 'Apr 20, 2024',
    method: 'ABA Transfer',
  },
  {
    name: 'Lina Phan',
    room: 'B-105',
    amount: '$325.00',
    status: 'Pending',
    date: 'Apr 24, 2024',
    method: 'Cash',
  },
  {
    name: 'Dara Mean',
    room: 'A-311',
    amount: '$325.00',
    status: 'Overdue',
    date: 'Apr 15, 2024',
    method: '-',
  },
  {
    name: 'Mey Vanna',
    room: 'C-118',
    amount: '$305.00',
    status: 'Paid',
    date: 'Apr 18, 2024',
    method: 'Credit Card',
  },
  {
    name: 'Rith Srey',
    room: 'B-210',
    amount: '$325.00',
    status: 'Pending',
    date: 'Apr 25, 2024',
    method: 'ABA Transfer',
  },
] as const;

export function NormalPaymentsContent() {
  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Payments & Invoices
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your dorm collections and track resident payment status.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="h-9 gap-2 text-xs font-medium">
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
          <Button size="sm" className="h-9 gap-2 text-xs font-medium bg-primary text-primary-foreground">
            <Plus className="h-3.5 w-3.5" />
            New Payment
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6 border-border/50 shadow-sm">
            <div className="flex items-center justify-between">
              <div className={cn("p-2 rounded-lg", stat.color)}>
                <stat.icon className="h-5 w-5" />
              </div>
              {stat.trend === 'up' && (
                <Badge variant="outline" className="text-[10px] font-medium border-emerald-500/20 text-emerald-600 bg-emerald-500/5">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  {stat.change}
                </Badge>
              )}
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {stat.value}
              </h3>
              {stat.trend !== 'up' && (
                <p className="text-[11px] text-muted-foreground font-medium">
                  {stat.change} this month
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Area */}
      <Card className="border-border/50 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border/50 bg-slate-50/50 dark:bg-slate-900/20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search resident or room..."
                className="h-9 pl-9 text-sm border-border/60 focus-visible:ring-primary/20"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-9 text-xs font-medium border-border/60">
                <Filter className="mr-2 h-3.5 w-3.5" />
                Filter
              </Button>
              <Badge variant="secondary" className="h-9 px-3 rounded-md text-[11px] font-medium">
                <Users className="mr-2 h-3.5 w-3.5" />
                15 Residents
              </Badge>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50 dark:bg-slate-900/40">
              <TableRow className="hover:bg-transparent border-border/50">
                <TableHead className="w-[250px] text-[11px] font-bold uppercase tracking-wider h-11 px-6">Resident</TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-wider h-11 px-6">Amount</TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-wider h-11 px-6">Due Date</TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-wider h-11 px-6">Method</TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-wider h-11 px-6">Status</TableHead>
                <TableHead className="w-[50px] h-11 px-6"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {residents.map((resident) => (
                <TableRow key={resident.room} className="border-border/40 hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                  <TableCell className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{resident.name}</span>
                      <span className="text-xs text-muted-foreground">Room {resident.room}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">
                    {resident.amount}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm">
                    {resident.date}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 px-2.5 py-1 rounded-md">
                      {resident.method}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide border-none",
                        resident.status === 'Paid' ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                        resident.status === 'Pending' ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" :
                        "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                      )}
                    >
                      {resident.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="p-4 border-t border-border/50 text-center bg-slate-50/30 dark:bg-slate-900/10">
          <Button variant="link" size="sm" className="text-xs font-medium text-muted-foreground hover:text-primary">
            View all transactions
          </Button>
        </div>
      </Card>

      {/* Quick Actions / Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 border-border/50 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 rounded-xl border border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-all group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Plus className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Send Payment Reminders</p>
                  <p className="text-[10px] text-muted-foreground">Notify 8 pending residents</p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all" />
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-xl border border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-all group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Generate Invoices</p>
                  <p className="text-[10px] text-muted-foreground">For next month billing cycle</p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all" />
            </button>
          </div>
        </Card>

        <Card className="p-6 border-border/50 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[
              { text: 'Payment received from Sokha Chann', time: '2 hours ago', amount: '+$325.00' },
              { text: 'Invoice #INV-004 sent to Lina Phan', time: '5 hours ago', amount: '$325.00' },
              { text: 'Manual payment recorded for Mey Vanna', time: 'Yesterday', amount: '+$305.00' },
            ].map((activity, i) => (
              <div key={i} className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300">{activity.text}</p>
                  <p className="text-[10px] text-muted-foreground">{activity.time}</p>
                </div>
                <span className={cn(
                  "text-[11px] font-bold",
                  activity.amount.startsWith('+') ? "text-emerald-600" : "text-slate-500"
                )}>
                  {activity.amount}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
