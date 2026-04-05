'use client';

/**
 * Tenant-exclusive views for Invoices, Maintenance, and Profile.
 * Admins (normal/pro/premium) NEVER see these — they use the full admin components.
 * Tenants NEVER see admin data: no system stats, no staff mgmt, no revenue.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard, Clock, CheckCircle2, AlertTriangle, Download,
  ChevronRight, ChevronDown, Info, Plus, Wallet, Calendar,
  Wrench, MessageSquare, MapPin, Bell, ArrowRight, Home,
  Phone, Mail, Shield, Star, Edit3, Camera, Key,
  FileText, Receipt, Building2, User, Zap, Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// ─── Shared animation variants ───────────────────────────────────────────────

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

// ═══════════════════════════════════════════════════════════════════════════════
//  TENANT INVOICES VIEW
//  Shows: my invoices, payment status, balance, payment methods — nothing else
// ═══════════════════════════════════════════════════════════════════════════════

const MY_INVOICES = [
  { id: 'INV-2026-03', desc: 'March Rent', amount: '£1,240.00', due: 'Mar 01, 2026', status: 'Paid',     type: 'Rent',    paidOn: 'Feb 28, 2026' },
  { id: 'INV-2026-04', desc: 'April Rent', amount: '£1,240.00', due: 'Apr 01, 2026', status: 'Pending',  type: 'Rent',    paidOn: null },
  { id: 'INV-2026-L2', desc: 'Laundry Service', amount: '£8.50', due: 'Mar 22, 2026', status: 'Paid',  type: 'Service', paidOn: 'Mar 22, 2026' },
  { id: 'INV-2026-M1', desc: 'Meal Plan — Spring', amount: '£320.00', due: 'Mar 01, 2026', status: 'Paid', type: 'Meal', paidOn: 'Feb 27, 2026' },
  { id: 'INV-2026-05', desc: 'May Rent',  amount: '£1,240.00', due: 'May 01, 2026', status: 'Upcoming', type: 'Rent',   paidOn: null },
];

export function TenantInvoicesView() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const pending  = MY_INVOICES.filter(i => i.status === 'Pending');
  const upcoming = MY_INVOICES.filter(i => i.status === 'Upcoming');
  const paid     = MY_INVOICES.filter(i => i.status === 'Paid');

  const statusColor = (s: string) => ({
    Paid:     'bg-emerald-500/10 text-emerald-600',
    Pending:  'bg-amber-500/10 text-amber-600',
    Upcoming: 'bg-primary/10 text-primary',
  }[s] ?? 'bg-muted text-muted-foreground');

  const statusDot = (s: string) => ({
    Paid:     'bg-emerald-500',
    Pending:  'bg-amber-500 animate-pulse',
    Upcoming: 'bg-primary/40',
  }[s] ?? 'bg-muted-foreground');

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <div 
        className="space-y-10 pb-20">

      {/* Header */}
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/40">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight">My <span className="text-muted-foreground/30">Invoices</span></h1>
          <p className="text-sm font-medium text-muted-foreground">Your personal billing history and upcoming payments.</p>
        </div>
        <Button variant="outline" className="h-11 px-6 rounded-2xl font-bold border-border/40 gap-2">
          <Download className="w-4 h-4" /> Download All
        </Button>
      </motion.div>

      {/* Balance summary */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Outstanding Balance', value: '£1,240.00', sub: '1 invoice pending', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-500/10', urgent: true },
          { label: 'Paid This Month',     value: '£328.50',   sub: '2 invoices settled', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10', urgent: false },
          { label: 'Next Due',            value: 'Apr 01',    sub: '£1,240.00 — April Rent', icon: Calendar, color: 'text-primary', bg: 'bg-primary/10', urgent: false },
        ].map((s, i) => (
          <Card key={i} className={cn('p-6 border-border/40 bg-card rounded-2xl flex items-center gap-4 shadow-sm', s.urgent && 'border-amber-500/20')}>
            <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center shrink-0', s.bg, s.color)}>
              <s.icon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 truncate">{s.label}</p>
              <p className="text-2xl font-bold tracking-tight">{s.value}</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase truncate">{s.sub}</p>
            </div>
          </Card>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">

          {/* Pending / Action needed */}
          {pending.length > 0 && (
            <motion.div variants={item} className="space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-widest text-amber-600 flex items-center gap-2 px-1">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" /> Action Required
              </h2>
              {pending.map(inv => (
                <Card key={inv.id} className="p-6 border-amber-500/20 bg-amber-500/5 rounded-2xl space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600">{inv.id} · {inv.type}</p>
                      <h3 className="text-xl font-bold mt-1">{inv.desc}</h3>
                      <p className="text-xs font-bold text-muted-foreground mt-0.5">Due {inv.due}</p>
                    </div>
                    <p className="text-2xl font-bold text-amber-600">{inv.amount}</p>
                  </div>
                  <Button className="w-full h-12 rounded-xl bg-amber-500 text-white font-bold text-sm hover:bg-amber-600 shadow-lg shadow-amber-500/20">
                    <CreditCard className="w-4 h-4 mr-2" /> Pay Now
                  </Button>
                </Card>
              ))}
            </motion.div>
          )}

          {/* All invoices list */}
          <motion.div variants={item} className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground px-1">All Invoices</h2>
            <Card className="border-border/40 bg-card rounded-2xl overflow-hidden shadow-sm">
              <div className="divide-y divide-border/20">
                {MY_INVOICES.map(inv => (
                  <div key={inv.id}>
                    <button
                      onClick={() => setExpanded(expanded === inv.id ? null : inv.id)}
                      className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/5 transition-colors text-left group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn('w-2 h-2 rounded-full shrink-0', statusDot(inv.status))} />
                        <div>
                          <h4 className="font-bold text-sm">{inv.desc}</h4>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">{inv.id} · Due {inv.due}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                          <p className="font-bold text-sm">{inv.amount}</p>
                          <Badge className={cn('text-[9px] border-none font-bold px-2', statusColor(inv.status))}>{inv.status}</Badge>
                        </div>
                        <ChevronDown className={cn('w-4 h-4 text-muted-foreground/30 transition-transform', expanded === inv.id && 'rotate-180')} />
                      </div>
                    </button>
                    <AnimatePresence>
                      {expanded === inv.id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-muted/20 border-t border-border/20">
                          <div className="px-6 py-4 grid grid-cols-2 gap-4 text-xs">
                            <div><p className="font-bold text-muted-foreground uppercase text-[9px] mb-1">Invoice ID</p><p className="font-bold">{inv.id}</p></div>
                            <div><p className="font-bold text-muted-foreground uppercase text-[9px] mb-1">Type</p><p className="font-bold">{inv.type}</p></div>
                            <div><p className="font-bold text-muted-foreground uppercase text-[9px] mb-1">Due Date</p><p className="font-bold">{inv.due}</p></div>
                            <div><p className="font-bold text-muted-foreground uppercase text-[9px] mb-1">{inv.status === 'Paid' ? 'Paid On' : 'Status'}</p><p className="font-bold">{inv.paidOn ?? inv.status}</p></div>
                          </div>
                          <div className="px-6 pb-4 flex gap-2">
                            <Button size="sm" variant="outline" className="rounded-xl font-bold text-[10px] uppercase h-8 px-4 border-border/40">
                              <Download className="w-3 h-3 mr-1.5" /> Receipt
                            </Button>
                            {inv.status !== 'Paid' && (
                              <Button size="sm" className="rounded-xl font-bold text-[10px] uppercase h-8 px-4 bg-primary text-white">
                                Pay Now
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

        </div>

        {/* Sidebar */}
        <motion.div variants={item} className="space-y-6">

          {/* Payment method */}
          <Card className="p-7 border-none bg-slate-900 text-white rounded-2xl space-y-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none"><Wallet className="w-40 h-40" /></div>
            <div className="relative z-10 space-y-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center"><CreditCard className="w-4 h-4" /></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Saved Card</span>
              </div>
              <div>
                <p className="text-white/40 text-[10px] font-bold uppercase">Visa ending in</p>
                <p className="text-4xl font-bold tracking-widest mt-1">•••• 4242</p>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold text-white/40 uppercase">
                <span>Expires 09 / 27</span>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-none text-[9px]">Active</Badge>
              </div>
              <Button className="w-full h-11 rounded-xl bg-white/10 border border-white/10 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-white/20">
                Manage Payment Methods
              </Button>
            </div>
          </Card>

          {/* Quick actions */}
          <Card className="p-6 border-border/40 bg-card rounded-[2rem] space-y-4 shadow-sm">
            <h3 className="text-sm font-bold tracking-tight">Billing <span className="text-muted-foreground/30">Help</span></h3>
            {[
              { label: 'Payment History',   sub: 'All past transactions', icon: Receipt,   color: 'text-primary',    bg: 'bg-primary/10' },
              { label: 'Auto-Pay Setup',    sub: 'Never miss a due date', icon: Zap,       color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
              { label: 'Billing Dispute',   sub: 'Contact accounts team', icon: MessageSquare, color: 'text-amber-500', bg: 'bg-amber-500/10' },
              { label: 'Tenancy Agreement', sub: 'Download your contract', icon: FileText,  color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
            ].map((a, i) => (
              <button key={i} className="w-full flex items-center gap-3 p-3 rounded-2xl border border-border/30 hover:bg-muted/30 transition-all group text-left">
                <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shrink-0', a.bg, a.color)}>
                  <a.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-xs">{a.label}</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase truncate">{a.sub}</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
              </button>
            ))}
          </Card>

        </motion.div>
        </div>
        </div>
        </motion.div>
        );
        }

// ═══════════════════════════════════════════════════════════════════════════════
//  TENANT MAINTENANCE VIEW
//  Shows: my own tickets, submit new request, track status — no admin controls
// ═══════════════════════════════════════════════════════════════════════════════

const MY_TICKETS = [
  { id: '#MNT-4421', title: 'Leaking Faucet', room: 'Room A-402', category: 'Plumbing',   priority: 'Medium',   status: 'In Progress', date: 'Oct 24', note: 'Technician assigned. Work begins tomorrow.' },
  { id: '#MNT-4418', title: 'Window Seal',    room: 'Room A-402', category: 'Carpentry',  priority: 'Low',      status: 'Resolved',    date: 'Oct 22', note: 'Sealed and inspected. All good!' },
  { id: '#MNT-4430', title: 'Noisy HVAC',     room: 'Room A-402', category: 'Electrical', priority: 'High',     status: 'Scheduled',   date: 'Oct 26', note: 'Scheduled for Oct 28 at 10 AM.' },
];

type TicketStatus = 'In Progress' | 'Resolved' | 'Scheduled' | 'Pending';

export function TenantMaintenanceView() {
  const [formOpen, setFormOpen] = useState(false);

  const sColor = (s: string) => ({
    'Resolved':    'bg-emerald-500/10 text-emerald-600',
    'In Progress': 'bg-blue-500/10 text-blue-600',
    'Scheduled':   'bg-indigo-500/10 text-indigo-600',
    'Pending':     'bg-amber-500/10 text-amber-600',
  }[s] ?? 'bg-muted text-muted-foreground');

  const sDot = (s: string) => ({
    'Resolved':    'bg-emerald-500',
    'In Progress': 'bg-blue-500 animate-pulse',
    'Scheduled':   'bg-indigo-500',
    'Pending':     'bg-amber-500 animate-pulse',
  }[s] ?? 'bg-muted-foreground');

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <div 
        className="space-y-10 pb-20">

      {/* Header */}
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border/40">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight">Maintenance <span className="text-muted-foreground/30">Requests</span></h1>
          <p className="text-sm font-medium text-muted-foreground">Submit and track repair requests for your room.</p>
        </div>
        <Button
          onClick={() => setFormOpen(true)}
          className="h-12 px-8 rounded-2xl font-bold bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
        >
          <Plus className="w-4 h-4 mr-2" /> New Request
        </Button>
      </motion.div>

      {/* Status summary */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Open',        value: MY_TICKETS.filter(t => t.status !== 'Resolved').length, color: 'text-amber-500',   bg: 'bg-amber-500/10',   icon: Clock },
          { label: 'In Progress', value: MY_TICKETS.filter(t => t.status === 'In Progress').length, color: 'text-blue-500', bg: 'bg-blue-500/10',   icon: Wrench },
          { label: 'Scheduled',   value: MY_TICKETS.filter(t => t.status === 'Scheduled').length, color: 'text-indigo-500', bg: 'bg-indigo-500/10', icon: Calendar },
          { label: 'Resolved',    value: MY_TICKETS.filter(t => t.status === 'Resolved').length, color: 'text-emerald-500', bg: 'bg-emerald-500/10', icon: CheckCircle2 },
        ].map((s, i) => (
          <Card key={i} className="p-5 border-border/40 bg-card rounded-2xl shadow-sm flex items-center gap-3">
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', s.bg, s.color)}>
              <s.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">{s.label}</p>
              <p className="text-2xl font-bold">{s.value}</p>
            </div>
          </Card>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">

          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground px-1">My Requests</h2>

          {MY_TICKETS.map((t, idx) => (
            <motion.div variants={item} key={t.id}>
              <Card className="p-6 border-border/40 bg-card rounded-[2rem] space-y-4 hover:shadow-md transition-all shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={cn('w-2 h-2 rounded-full mt-2 shrink-0', sDot(t.status))} />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-base">{t.title}</h3>
                        <Badge className={cn('text-[9px] font-bold border-none px-2', sColor(t.status))}>{t.status}</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {t.room}</span>
                        <span>·</span>
                        <span>{t.category}</span>
                        <span>·</span>
                        <span>{t.id}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground/40 uppercase shrink-0">{t.date}</span>
                </div>

                {t.note && (
                  <div className="p-3 rounded-xl bg-muted/30 border border-border/20 flex gap-2">
                    <Info className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <p className="text-xs font-medium text-muted-foreground">{t.note}</p>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="rounded-xl font-bold text-[10px] uppercase h-8 px-4 border-border/40">
                    <MessageSquare className="w-3 h-3 mr-1.5" /> Message
                  </Button>
                  {t.status !== 'Resolved' && (
                    <Button size="sm" variant="ghost" className="rounded-xl font-bold text-[10px] uppercase h-8 px-4 text-muted-foreground hover:text-primary">
                      View Updates <ChevronRight className="w-3 h-3 ml-1" />
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}

        </div>

        {/* Sidebar */}
        <motion.div variants={item} className="space-y-6">

          {/* Emergency contacts */}
          <Card className="p-6 border-rose-500/20 bg-rose-500/5 rounded-[2rem] space-y-4">
            <div className="flex items-center gap-2 text-rose-500">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Emergency</span>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Emergency Line',  value: '+44 20 7946 0000', icon: Phone },
                { label: 'Reception Desk',  value: '+44 20 7946 0001', icon: Building2 },
                { label: 'Security',        value: '+44 20 7946 0002', icon: Shield },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/70 dark:bg-black/20 border border-border/20">
                  <c.icon className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold uppercase text-muted-foreground">{c.label}</p>
                    <p className="text-xs font-bold">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Facility info */}
          <Card className="p-6 border-border/40 bg-card rounded-[2rem] space-y-4 shadow-sm">
            <h3 className="text-sm font-bold tracking-tight">Facility <span className="text-muted-foreground/30">Info</span></h3>
            {[
              { label: 'Your Room',     value: 'A-402, Floor 4',    icon: Home },
              { label: 'Response Time', value: 'typically 24-48h',  icon: Clock },
              { label: 'Work Hours',    value: 'Mon–Fri 8AM–6PM',   icon: Calendar },
              { label: 'Priority',      value: 'Emergencies 24/7',  icon: Zap },
            ].map((f, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-2.5">
                  <f.icon className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">{f.label}</span>
                </div>
                <span className="text-xs font-bold">{f.value}</span>
              </div>
            ))}
          </Card>

          {/* Tip */}
          <Card className="p-5 border-border/40 bg-muted/30 rounded-[2rem] space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <Info className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Pro Tip</span>
            </div>
            <p className="text-xs font-medium text-muted-foreground leading-relaxed">
              Include a photo and detailed description when submitting requests. This helps our team prepare and respond faster.
            </p>
          </Card>
        </motion.div>
      </div>

      {/* New Request Modal */}
      <AnimatePresence>
        {formOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setFormOpen(false)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }} transition={{ type: 'spring', damping: 25 }}
              onClick={e => e.stopPropagation()}
              className="bg-background border border-border/40 rounded-2xl p-10 max-w-lg w-full shadow-2xl space-y-8">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold">New Request</h3>
                  <p className="text-sm text-muted-foreground">Tell us what needs fixing in your room.</p>
                </div>
                <button onClick={() => setFormOpen(false)} className="w-10 h-10 rounded-xl bg-muted/30 flex items-center justify-center text-muted-foreground hover:bg-muted/60">✕</button>
              </div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Category</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Plumbing', 'Electrical', 'HVAC', 'Carpentry', 'IT / WiFi', 'Other'].map(c => (
                      <button key={c} className="p-3 rounded-xl border border-border/40 text-[11px] font-bold text-center hover:border-primary hover:bg-primary/5 transition-all">{c}</button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Description</label>
                  <textarea className="w-full h-24 px-4 py-3 rounded-xl border border-border/40 bg-muted/20 text-sm font-medium resize-none focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Describe the issue in detail..." />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Priority</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Low', 'Medium', 'High'].map(p => (
                      <button key={p} className="p-3 rounded-xl border border-border/40 text-[11px] font-bold hover:border-primary hover:bg-primary/5 transition-all">{p}</button>
                    ))}
                  </div>
                </div>
              </div>
              <Button onClick={() => setFormOpen(false)} className="w-full h-14 rounded-2xl bg-primary text-white font-bold text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform">
                Submit Request <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </motion.div>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
//  TENANT PROFILE VIEW
//  Shows: personal details, room info, contacts, account settings — no admin
// ═══════════════════════════════════════════════════════════════════════════════

export function TenantProfileView() {
  const [editMode, setEditMode] = useState(false);

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <div 
        className="space-y-10 pb-20">

      {/* Header */}
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/40">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight">My <span className="text-muted-foreground/30">Profile</span></h1>
          <p className="text-sm font-medium text-muted-foreground">Your personal details and tenancy information.</p>
        </div>
        <Button
          onClick={() => setEditMode(e => !e)}
          variant={editMode ? 'default' : 'outline'}
          className={cn('h-11 px-6 rounded-2xl font-bold border-border/40 gap-2', editMode && 'bg-primary text-white')}
        >
          <Edit3 className="w-4 h-4" /> {editMode ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </motion.div>

      {/* Avatar & name */}
      <motion.div variants={item}>
        <Card className="p-8 border-border/40 bg-card rounded-2xl shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <div className="relative">
              <div className="w-28 h-28 rounded-[2rem] bg-primary flex items-center justify-center shadow-xl shadow-primary/20 text-white text-5xl font-bold">
                S
              </div>
              {editMode && (
                <button className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="text-center sm:text-left space-y-2 flex-1">
              <h2 className="text-3xl font-bold">Sarah Johnson</h2>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <Badge className="bg-primary/10 text-primary border-none font-bold text-[10px] px-3">Room A-402</Badge>
                <Badge className="bg-emerald-500/10 text-emerald-600 border-none font-bold text-[10px] px-3">Active Tenant</Badge>
                <Badge className="bg-indigo-500/10 text-indigo-600 border-none font-bold text-[10px] px-3">Spring 2026</Badge>
              </div>
              <p className="text-muted-foreground text-sm font-medium">Member since September 2024 · Bloomsbury Hall</p>
            </div>
            <div className="text-center hidden sm:block">
              <div className="flex flex-col items-center gap-1">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Resident Rating</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Personal details */}
        <motion.div variants={item}>
          <Card className="p-7 border-border/40 bg-card rounded-2xl space-y-6 shadow-sm">
            <h3 className="text-base font-bold tracking-tight flex items-center gap-2">
              <User className="w-4 h-4 text-primary" /> Personal <span className="text-muted-foreground/30">Details</span>
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Full Name',     value: 'Sarah Johnson',        icon: User,  editable: true },
                { label: 'Email Address', value: 'sarah.j@email.com',    icon: Mail,  editable: true },
                { label: 'Phone Number',  value: '+44 7700 900 123',     icon: Phone, editable: true },
                { label: 'University',    value: 'UCL, Year 3',          icon: Building2,  editable: false },
                { label: 'Emergency Contact', value: 'James Johnson · +44 7700 900 456', icon: Shield, editable: true },
              ].map((f, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/30 transition-colors group">
                  <div className="flex items-center gap-3 min-w-0">
                    <f.icon className="w-4 h-4 text-primary shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{f.label}</p>
                      <p className={cn('text-sm font-bold truncate', !editMode && 'text-foreground')}>{f.value}</p>
                    </div>
                  </div>
                  {editMode && f.editable && (
                    <Edit3 className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary transition-colors shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Tenancy details */}
        <motion.div variants={item}>
          <Card className="p-7 border-border/40 bg-card rounded-2xl space-y-6 shadow-sm">
            <h3 className="text-base font-bold tracking-tight flex items-center gap-2">
              <Home className="w-4 h-4 text-primary" /> Tenancy <span className="text-muted-foreground/30">Details</span>
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Room',         value: 'Room A-402 · Floor 4',       icon: Home },
                { label: 'Building',     value: 'Bloomsbury Hall',             icon: Building2 },
                { label: 'Lease Start',  value: 'September 14, 2024',         icon: Calendar },
                { label: 'Lease End',    value: 'August 31, 2026',            icon: Calendar },
                { label: 'Rent',         value: '£1,240 / month',             icon: CreditCard },
                { label: 'Meal Plan',    value: 'Premium — 21 meals/week',    icon: FileText },
              ].map((f, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <f.icon className="w-4 h-4 text-primary shrink-0" />
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{f.label}</p>
                      <p className="text-sm font-bold">{f.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Account security */}
        <motion.div variants={item}>
          <Card className="p-7 border-border/40 bg-card rounded-2xl space-y-5 shadow-sm">
            <h3 className="text-base font-bold tracking-tight flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" /> Account <span className="text-muted-foreground/30">Security</span>
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Change Password',      sub: 'Last changed 3 months ago', icon: Key,    action: 'Update' },
                { label: 'Two-Factor Auth',       sub: 'Not enabled',               icon: Shield, action: 'Enable', urgent: true },
                { label: 'Login Sessions',        sub: '2 active devices',          icon: Lock,   action: 'Manage' },
              ].map((s, i) => (
                <div key={i} className={cn('flex items-center justify-between p-4 rounded-2xl border transition-all', s.urgent ? 'border-amber-500/20 bg-amber-500/5' : 'border-border/30 hover:bg-muted/30')}>
                  <div className="flex items-center gap-3">
                    <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center', s.urgent ? 'bg-amber-500/10 text-amber-500' : 'bg-primary/10 text-primary')}>
                      <s.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{s.label}</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">{s.sub}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className={cn('rounded-xl font-bold text-[10px] h-8 px-4', s.urgent && 'border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white')}>
                    {s.action}
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Documents */}
        <motion.div variants={item}>
          <Card className="p-7 border-border/40 bg-card rounded-2xl space-y-5 shadow-sm">
            <h3 className="text-base font-bold tracking-tight flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" /> My <span className="text-muted-foreground/30">Documents</span>
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Tenancy Agreement',     date: 'Sep 2024',  type: 'PDF' },
                { name: 'Room Inventory Report', date: 'Sep 2024',  type: 'PDF' },
                { name: 'Meal Plan Contract',    date: 'Jan 2026',  type: 'PDF' },
                { name: 'Payment Schedule',      date: 'Mar 2026',  type: 'XLSX' },
              ].map((d, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl border border-border/30 hover:bg-muted/20 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{d.name}</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">{d.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[8px] font-bold border-border/40 px-1.5">{d.type}</Badge>
                    <Download className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
        </div>
        </div>
        </motion.div>
        );
        }
