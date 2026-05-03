'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard, Clock, CheckCircle2, AlertTriangle, Download,
  ChevronRight, ChevronDown, Info, Plus, Wallet, Calendar,
  Wrench, MessageSquare, MapPin, ArrowRight, Home,
  Phone, Shield, Camera, Key, FileText, User, Zap, Lock,
  History as HistoryIcon, ClipboardList, Send, ArrowUpRight, Check,
  Droplets, Leaf, Activity, Sparkles, Building2, Mail, Bell, Settings, X,
  UtensilsCrossed, Coffee, Utensils, AlertCircle, ShieldCheck, Receipt
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

const INITIAL_TICKETS = [
  { 
    id: 'MNT-8840', title: 'Leaking Shower Head', status: 'In Progress', expected: 'Today, 2:00 PM', urgency: 'Normal', 
    icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-500/10', category: 'Plumbing', 
    desc: 'The shower head in Room A-402 is leaking constantly, even when the valve is fully closed.',
    location: 'A-402 Bathroom',
    submittedAt: 'Today, 9:12 AM',
    access: 'Front desk access approved',
    assignedTo: 'Maya Chen',
    assignedTeam: 'Facilities Desk',
    technician: 'Luis R. • Flow Plumbing',
    nextStep: 'Technician is en route and admin will notify you on arrival.',
    adminNote: 'Resident confirmed access window from 1:30 PM to 4:00 PM.',
    timeline: [
      { status: 'Received', time: 'Oct 20, 09:12 AM', done: true },
      { status: 'Triaged', time: 'Oct 20, 09:35 AM', done: true },
      { status: 'Assigned', time: 'Oct 20, 10:45 AM', done: true },
      { status: 'Arriving', time: 'Today, 2:00 PM', done: false },
      { status: 'Resolved', time: 'TBD', done: false },
    ]
  },
  { 
    id: 'MNT-8822', title: 'HVAC Air Filter Replacement', status: 'Resolved', expected: 'Completed', urgency: 'Low', 
    icon: Zap, color: 'text-emerald-500', bg: 'bg-emerald-500/10', category: 'HVAC', 
    desc: 'Filter replacement as part of seasonal maintenance.',
    location: 'A-402 Utility Closet',
    submittedAt: 'Oct 15, 8:00 AM',
    access: 'Resident present',
    assignedTo: 'Jordan Hale',
    assignedTeam: 'Facilities Desk',
    technician: 'Internal Services Team',
    nextStep: 'Closed and archived.',
    adminNote: 'Preventive maintenance request bundled with seasonal inspection.',
    timeline: [
      { status: 'Received', time: 'Oct 15, 08:00 AM', done: true },
      { status: 'Triaged', time: 'Oct 15, 08:25 AM', done: true },
      { status: 'Assigned', time: 'Oct 15, 09:30 AM', done: true },
      { status: 'Arriving', time: 'Oct 15, 11:00 AM', done: true },
      { status: 'Resolved', time: 'Oct 15, 11:45 AM', done: true },
    ]
  },
  {
    id: 'MNT-8851',
    title: 'Desk Power Outlet Not Working',
    status: 'Pending Review',
    expected: 'Admin review within 2 hours',
    urgency: 'High',
    icon: Zap,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    category: 'Electrical',
    desc: 'The wall outlet beside the study desk stopped working this morning. I tested another charger and it still has no power.',
    location: 'A-402 Study Area',
    submittedAt: 'Today, 11:20 AM',
    access: 'Resident available after 5:00 PM',
    assignedTo: 'Unassigned',
    assignedTeam: 'Facilities Desk',
    technician: 'Awaiting assignment',
    nextStep: 'Admin team is validating priority and dispatch window.',
    adminNote: 'Photo and outlet test details received from resident.',
    timeline: [
      { status: 'Received', time: 'Today, 11:20 AM', done: true },
      { status: 'Triaged', time: 'Queueing', done: false },
      { status: 'Assigned', time: 'Pending', done: false },
      { status: 'Resolved', time: 'Pending', done: false },
    ]
  },
];

const MY_INVOICES = [
  { id: 'INV-24-102', desc: 'Summer Term Rent', amount: '$3,100.00', due: 'Apr 01', status: 'Pending', type: 'Accommodation', icon: Home, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 'INV-24-101', desc: 'Meal Plan Renew', amount: '$450.00', due: 'Mar 15', status: 'Paid', type: 'Service', icon: CoffeeIcon, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { id: 'INV-24-100', desc: 'Spring Term Rent', amount: '$3,100.00', due: 'Jan 01', status: 'Paid', type: 'Accommodation', icon: Home, color: 'text-blue-500', bg: 'bg-blue-500/10' },
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
  const { INVOICES, FINANCIAL_SUMMARY } = require('@/lib/data');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'paid'>('all');

  const filteredInvoices = INVOICES.filter((inv: any) => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'pending') return inv.status === 'Pending';
    if (filterStatus === 'paid') return inv.status === 'Paid';
    return true;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Rent': return Home;
      case 'Meals': return UtensilsCrossed;
      case 'Utilities': return Zap;
      default: return Receipt;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Rent': return { bg: 'bg-blue-500/10', text: 'text-blue-600 dark:text-blue-500' };
      case 'Meals': return { bg: 'bg-purple-500/10', text: 'text-purple-600 dark:text-purple-500' };
      case 'Utilities': return { bg: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-500' };
      default: return { bg: 'bg-slate-500/10', text: 'text-slate-600' };
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="w-full pb-12 space-y-6">
      
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-3 pb-6 border-b border-border/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground/50">Finances</p>
            <h1 className="text-3xl font-bold text-foreground mt-1">Invoices</h1>
          </div>
          <Button variant="outline" className="h-9 px-4 rounded-lg text-[10px] font-bold uppercase tracking-widest gap-2">
            <Download className="w-3.5 h-3.5" /> Statement
          </Button>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-card border border-border/50 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-500" />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">Amount Due</p>
                <p className="text-lg font-bold text-foreground">${FINANCIAL_SUMMARY.totalOwed.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-card border border-border/50 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">Paid This Year</p>
                <p className="text-lg font-bold text-foreground">${FINANCIAL_SUMMARY.paidYTD.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-card border border-border/50 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-500" />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">Pending</p>
                <p className="text-lg font-bold text-foreground">{FINANCIAL_SUMMARY.pendingCount} Invoice{FINANCIAL_SUMMARY.pendingCount !== 1 ? 's' : ''}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Invoices List */}
      <motion.div variants={itemVariants} className="space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-border/30">
          <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Invoice History</h3>
          <div className="flex gap-1.5">
            {(['all', 'pending', 'paid'] as const).map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={cn(
                  "px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all",
                  filterStatus === status
                    ? 'bg-primary text-white'
                    : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
                )}
              >
                {status === 'all' ? 'All' : status === 'pending' ? 'Pending' : 'Paid'}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {filteredInvoices.map((inv: any) => {
            const IconComponent = getTypeIcon(inv.type);
            const colors = getTypeColor(inv.type);
            const isPending = inv.status === 'Pending';

            return (
              <motion.div
                key={inv.id}
                whileHover={{ y: -1 }}
                className={cn(
                  "p-4 rounded-lg border transition-all cursor-pointer",
                  expanded === inv.id
                    ? 'bg-primary/5 border-primary/50'
                    : 'bg-card border-border/50 hover:border-border/80'
                )}
                onClick={() => setExpanded(expanded === inv.id ? null : inv.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border border-border/30", colors.bg)}>
                      <IconComponent className={cn("w-5 h-5", colors.text)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-bold text-foreground truncate">{inv.description}</h4>
                        <Badge variant={inv.status === 'Paid' ? 'default' : 'outline'} className="text-[8px] font-bold shrink-0">
                          {inv.status}
                        </Badge>
                      </div>
                      <p className="text-[10px] text-muted-foreground/60">
                        {inv.status === 'Paid' ? `Paid on ${inv.paidDate}` : `Due ${inv.dueDate}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-base font-bold text-foreground">${inv.amount.toFixed(2)}</span>
                    <ChevronDown className={cn("w-4 h-4 text-muted-foreground/40 transition-transform", expanded === inv.id && "rotate-180")} />
                  </div>
                </div>

                {/* Expanded */}
                <AnimatePresence>
                  {expanded === inv.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 pt-4 border-t border-border/20 space-y-3"
                    >
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50">Invoice ID</p>
                          <p className="text-sm font-mono font-semibold">{inv.id}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50">Type</p>
                          <p className="text-sm font-semibold">{inv.type}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50">Amount</p>
                          <p className="text-sm font-semibold">${inv.amount.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50">Due Date</p>
                          <p className="text-sm font-semibold">{inv.dueDate}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" className="flex-1 h-8 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                          <Download className="w-3.5 h-3.5 mr-1" /> Receipt
                        </Button>
                        {isPending && (
                          <Button className="flex-1 h-8 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-primary text-white">
                            <CreditCard className="w-3.5 h-3.5 mr-1" /> Pay
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  TENANT MAINTENANCE VIEW
// ═══════════════════════════════════════════════════════════════════════════════

export function TenantMaintenanceView({ hideHeader = false }: { hideHeader?: boolean }) {
  const [ticketForm, setTicketForm] = useState(false);
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [selectedFilter, setSelectedFilter] = useState('All Requests');
  const [expandedTicketId, setExpandedTicketId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    category: 'Plumbing',
    urgency: 'Normal',
    title: '',
    description: '',
    location: '',
    accessWindow: ''
  });

  const filterTabs = ['All Requests', 'Awaiting Review', 'Active Visits', 'Resolved'];

  const handleOpenForm = () => {
    setFormData({
      category: 'Plumbing',
      urgency: 'Normal',
      title: '',
      description: '',
      location: '',
      accessWindow: ''
    });
    setTicketForm(true);
  };

  const handleSubmit = () => {
    const newTicket = {
      id: `MNT-${Math.floor(1000 + Math.random() * 9000)}`,
      title: formData.title || 'New Service Request',
      status: 'Pending Review',
      expected: 'Owner review in progress',
      urgency: formData.urgency,
      icon: formData.category === 'Electrical' ? Zap : formData.category === 'Plumbing' ? Droplets : Wrench,
      color: formData.urgency === 'High' ? 'text-rose-500' : 'text-primary dark:text-blue-500',
      bg: formData.urgency === 'High' ? 'bg-rose-500/10' : 'bg-primary/5 dark:bg-blue-500/10',
      category: formData.category,
      desc: formData.description,
      location: formData.location || 'Location not specified',
      submittedAt: 'Just now',
      access: formData.accessWindow || 'Access details pending',
      assignedTo: 'Dorm Owner',
      assignedTeam: 'Maintenance Desk',
      technician: 'Awaiting assignment',
      nextStep: 'Dorm owner is reviewing your request and will contact you with next steps.',
      adminNote: 'Request received from resident. Owner team will review within 2 hours.',
      timeline: [
        { status: 'Submitted', time: 'Just now', done: true },
        { status: 'Under Review', time: 'Pending', done: false },
        { status: 'Scheduled', time: 'Pending', done: false },
        { status: 'Complete', time: 'Pending', done: false },
      ]
    };
    setTickets([newTicket, ...tickets]);
    setTicketForm(false);
  };

  const filteredTickets = tickets.filter((t) => {
    if (selectedFilter === 'All Requests') return true;
    if (selectedFilter === 'Awaiting Review') return t.status === 'Pending Review';
    if (selectedFilter === 'Active Visits') return t.status === 'In Progress';
    if (selectedFilter === 'Resolved') return t.status === 'Resolved';
    return true;
  });

  const ticketStats = {
    open: tickets.filter(t => t.status !== 'Resolved').length,
    review: tickets.filter(t => t.status === 'Pending Review').length,
    scheduled: tickets.filter(t => t.status === 'In Progress').length,
    resolved: tickets.filter(t => t.status === 'Resolved').length,
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="w-full pb-12 space-y-6 relative">
      
      <AnimatePresence>
         {ticketForm && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4">
               <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="w-full max-w-md bg-card/60 dark:bg-slate-950/80 backdrop-blur-3xl border border-white/20 dark:border-blue-500/20 shadow-2xl flex flex-col relative z-50 rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto">
                  <div className="p-6 border-b border-border/10 dark:border-blue-500/10 flex items-center justify-between bg-gradient-to-r from-transparent to-primary/5 dark:to-blue-500/5 sticky top-0">
                     <div>
                        <h2 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50 dark:from-white dark:to-white/40 tracking-tight">New Service Request</h2>
                        <p className="text-[10px] font-black tracking-[0.2em] text-muted-foreground/60 mt-1 uppercase">Tell the dorm owner what needs fixing</p>
                     </div>
                     <button onClick={() => setTicketForm(false)} className="w-9 h-9 rounded-lg bg-muted/50 dark:bg-blue-900/40 flex items-center justify-center hover:bg-muted/80 dark:hover:bg-blue-900/60 transition-colors shrink-0 text-muted-foreground">✕</button>
                  </div>
                  <div className="p-6 space-y-6 flex-1 overflow-y-auto scrollbar-hide">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Issue Category</label>
                        <div className="grid grid-cols-2 gap-2">
                           {['Plumbing', 'Electrical', 'HVAC', 'General'].map(c => (
                             <button 
                               key={c} 
                               onClick={() => setFormData({...formData, category: c})}
                               className={cn(
                                 "h-11 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border shadow-sm hover:shadow-md",
                                 formData.category === c ? "bg-primary dark:bg-blue-600 text-white border-primary/50 shadow-lg shadow-primary/20 dark:shadow-blue-500/20" : "bg-card dark:bg-blue-950/30 border-white/20 dark:border-blue-500/20 text-muted-foreground hover:bg-muted/40 dark:hover:bg-blue-900/20"
                               )}
                             >
                               {c}
                             </button>
                           ))}
                        </div>
                     </div>

                     <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Priority Level</label>
                        <div className="grid grid-cols-3 gap-2">
                           {['Low', 'Normal', 'High'].map(p => (
                             <button 
                               key={p} 
                               onClick={() => setFormData({...formData, urgency: p})}
                               className={cn(
                                 "h-10 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border shadow-sm hover:shadow-md",
                                 formData.urgency === p 
                                   ? p === 'High' ? "bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-500/20" : "bg-primary dark:bg-blue-600 text-white border-primary/50 shadow-lg shadow-primary/20 dark:shadow-blue-500/20"
                                   : "bg-card dark:bg-blue-950/30 border-white/20 dark:border-blue-500/20 text-muted-foreground hover:bg-muted/40 dark:hover:bg-blue-900/20"
                               )}
                             >
                               {p}
                             </button>
                           ))}
                        </div>
                     </div>

                     <div className="space-y-3 pt-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Brief Description</label>
                        <Input 
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          placeholder="e.g. Leaking faucet in bathroom" 
                          className="h-12 bg-card dark:bg-blue-950/30 border-white/20 dark:border-blue-500/20 shadow-sm focus-visible:ring-primary/20 rounded-xl text-sm font-bold placeholder:text-muted-foreground/40"
                       />
                     </div>

                     <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Room / Location</label>
                           <Input
                             value={formData.location}
                             onChange={(e) => setFormData({...formData, location: e.target.value})}
                             placeholder="e.g. A-402 bathroom"
                             className="h-12 bg-card dark:bg-blue-950/30 border-white/20 dark:border-blue-500/20 shadow-sm focus-visible:ring-primary/20 rounded-xl text-sm font-bold placeholder:text-muted-foreground/40"
                           />
                        </div>

                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Your Availability</label>
                           <Input
                             value={formData.accessWindow}
                             onChange={(e) => setFormData({...formData, accessWindow: e.target.value})}
                             placeholder="e.g. Available after 5 PM today"
                             className="h-12 bg-card dark:bg-blue-950/30 border-white/20 dark:border-blue-500/20 shadow-sm focus-visible:ring-primary/20 rounded-xl text-sm font-bold placeholder:text-muted-foreground/40"
                           />
                        </div>
                     </div>

                     <div className="space-y-3 pt-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Full Details</label>
                        <textarea 
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          className="w-full h-28 px-4 py-3 rounded-xl bg-card dark:bg-blue-950/30 border border-white/20 dark:border-blue-500/20 shadow-sm text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none scrollbar-hide text-foreground placeholder:text-muted-foreground/40" 
                          placeholder="Explain what's wrong and any relevant details (e.g., when it started, what you've tried, etc.)" 
                        />
                     </div>

                     <div className="p-5 rounded-2xl bg-blue-500/5 dark:bg-blue-950/40 backdrop-blur-md border border-blue-500/20 flex flex-col gap-3 cursor-pointer hover:bg-blue-500/10 dark:hover:bg-blue-950/60 transition-all group">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                              <Camera className="w-5 h-5" />
                           </div>
                           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Attach Photo (Optional)</span>
                        </div>
                        <p className="text-[9px] text-muted-foreground/60 ml-1">Photos help the owner understand the issue faster</p>
                     </div>
                  </div>
                  <div className="p-6 border-t border-border/10 dark:border-blue-500/10 bg-gradient-to-r from-background to-primary/5 dark:from-slate-950/80 dark:to-blue-900/10 backdrop-blur-xl sticky bottom-0">
                     <Button 
                       onClick={handleSubmit}
                       disabled={!formData.title || !formData.description}
                       className="w-full h-12 rounded-xl bg-primary dark:bg-blue-600 text-white font-black uppercase tracking-[0.15em] shadow-lg shadow-primary/20 dark:shadow-blue-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all border-none disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                        Submit Request <Send className="w-4 h-4 ml-3" />
                     </Button>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>

      {!hideHeader && (
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border/40 dark:border-blue-500/10">
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60 dark:text-blue-400">Facilities & Support</p>
            <h1 className="text-4xl font-black tracking-tight text-foreground">Maintenance Hub</h1>
            <p className="text-sm text-muted-foreground/60 font-medium">Submit requests, track progress, and manage your maintenance tickets in one place</p>
          </div>
          <Button onClick={() => handleOpenForm()} className="h-12 px-8 rounded-xl bg-foreground text-background dark:bg-blue-600 dark:text-white text-[10px] font-black uppercase tracking-[0.15em] shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 border-none whitespace-nowrap">
             <Plus className="w-5 h-5 mr-2" /> New Request
          </Button>
        </motion.div>
      )}

      {/* Enhanced KPI Stats - Tenant Focused */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0 * 0.1, ease: "easeOut" }}
          className="group relative p-5 rounded-2xl bg-card/50 dark:bg-blue-950/30 backdrop-blur-xl border border-white/20 dark:border-blue-500/20 shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
           <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
           <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 relative z-10">My Open Requests</p>
           <div className="flex items-baseline justify-between mt-3 relative z-10">
              <span className="text-4xl font-black tracking-tighter text-foreground">{ticketStats.open}</span>
              <span className="text-[10px] font-black text-primary dark:text-blue-400 uppercase tracking-wider">Active</span>
           </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 * 0.1, ease: "easeOut" }}
          className="group relative p-5 rounded-2xl bg-card/50 dark:bg-blue-950/30 backdrop-blur-xl border border-white/20 dark:border-blue-500/20 shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
           <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
           <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 relative z-10">Awaiting Review</p>
           <div className="flex items-baseline justify-between mt-3 relative z-10">
              <span className="text-4xl font-black tracking-tighter text-foreground">{ticketStats.review}</span>
              <span className="text-[10px] font-black text-amber-500 uppercase tracking-wider">Pending</span>
           </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 * 0.1, ease: "easeOut" }}
          className="group relative p-5 rounded-2xl bg-card/50 dark:bg-blue-950/30 backdrop-blur-xl border border-white/20 dark:border-blue-500/20 shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
           <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
           <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 relative z-10">Active Visits</p>
           <div className="flex items-baseline justify-between mt-3 relative z-10">
              <span className="text-4xl font-black tracking-tighter text-foreground">{ticketStats.scheduled}</span>
              <span className="text-[10px] font-black text-blue-500 dark:text-blue-400 uppercase tracking-wider">Scheduled</span>
           </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 * 0.1, ease: "easeOut" }}
          className="group relative p-5 rounded-2xl bg-card/50 dark:bg-blue-950/30 backdrop-blur-xl border border-white/20 dark:border-blue-500/20 shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
           <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
           <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 relative z-10">Resolved</p>
           <div className="flex items-baseline justify-between mt-3 relative z-10">
              <span className="text-4xl font-black tracking-tighter text-foreground">{ticketStats.resolved}</span>
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-wider">Completed</span>
           </div>
        </motion.div>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div 
        variants={itemVariants}
        className="flex gap-3 overflow-x-auto no-scrollbar pt-2 px-1 relative pb-2"
      >
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border/40 dark:via-blue-500/20 to-transparent"></div>
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedFilter(tab)}
            className={cn(
              "relative flex flex-col items-center justify-center min-w-[7.5rem] py-3 rounded-2xl transition-all duration-300 overflow-hidden outline-none",
              selectedFilter === tab
                ? "bg-foreground/5 dark:bg-blue-500/10 shadow-sm text-foreground"
                : "hover:bg-foreground/5 dark:hover:bg-blue-500/5 text-muted-foreground hover:text-foreground"
            )}
          >
            {selectedFilter === tab && (
              <motion.div layoutId="activeFilter" className="absolute inset-0 bg-card dark:bg-blue-900/20 border border-white/20 dark:border-blue-500/20 rounded-2xl shadow-md -z-10"></motion.div>
            )}
            <span className={cn("text-[10px] font-black uppercase tracking-widest transition-opacity duration-300", selectedFilter === tab ? "opacity-100" : "opacity-60")}>{tab}</span>
            {selectedFilter === tab && (
               <div className={cn("absolute bottom-1 w-1.5 h-1.5 rounded-full", tab === 'Awaiting Review' ? 'bg-amber-500 animate-pulse' : tab === 'Active Visits' ? 'bg-blue-500' : tab === 'Resolved' ? 'bg-emerald-500' : 'bg-primary')} />
            )}
          </button>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-8">
         {/* Main Request Pipeline */}
         <div className="lg:col-span-8 flex flex-col gap-6">
            <motion.div variants={itemVariants} className="rounded-3xl bg-card/50 dark:bg-blue-950/20 backdrop-blur-2xl border border-white/20 dark:border-blue-500/20 shadow-xl overflow-hidden">
              <div className="p-6 md:p-8 border-b border-border/20 dark:border-blue-500/10 flex items-center justify-between bg-gradient-to-r from-transparent to-primary/5 dark:to-blue-500/5">
                <span className="text-xs font-black text-foreground uppercase tracking-[0.3em] flex items-center gap-3">
                  <Activity className="w-5 h-5 text-primary" /> Your Requests
                </span>
                <div className="flex items-center gap-3">
                  <Badge className="bg-primary/15 text-primary dark:bg-blue-500/20 dark:text-blue-400 border-primary/30 dark:border-blue-500/30 shadow-sm text-[9px] uppercase font-black tracking-widest px-4 py-1.5 h-auto rounded-full">
                    {filteredTickets.length} Ticket{filteredTickets.length !== 1 ? 's' : ''}
                  </Badge>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenForm();
                    }}
                    className="h-9 px-4 rounded-lg bg-primary dark:bg-blue-600 text-white hover:bg-primary/90 dark:hover:bg-blue-700 text-[9px] font-black uppercase tracking-widest shadow-md hover:shadow-lg transition-all border-none flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Add Request
                  </Button>
                </div>
              </div>

              <div className="divide-y divide-border/10 dark:divide-blue-500/10">
                {filteredTickets.length === 0 ? (
                  <div className="p-16 text-center">
                    <CheckCircle2 className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
                    <p className="text-sm font-bold text-foreground">No requests in this view</p>
                    <p className="mt-2 text-xs text-muted-foreground/60">Submit a new request and the dorm owner will respond soon</p>
                  </div>
                ) : (
                  filteredTickets.map((t, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.06 }}
                      key={t.id}
                      onClick={() => setExpandedTicketId(expandedTicketId === t.id ? null : t.id)}
                      className="p-6 md:p-8 hover:bg-primary/3 dark:hover:bg-blue-500/5 transition-colors cursor-pointer group"
                    >
                      <div className="flex flex-col gap-4">
                        {/* Header Row */}
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1 min-w-0">
                            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-white/30 dark:border-blue-500/30 shadow-sm group-hover:scale-105 transition-transform duration-300", t.bg)}>
                              <t.icon className={cn("w-6 h-6", t.color)} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className={cn("text-[9px] font-black uppercase tracking-[0.2em]", t.urgency === 'High' ? 'text-rose-500' : t.urgency === 'Normal' ? 'text-primary dark:text-blue-400' : 'text-emerald-500')}>
                                  {t.urgency} Priority
                                </span>
                                <span className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">{t.id}</span>
                              </div>
                              <h4 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">{t.title}</h4>
                              <div className="flex flex-wrap gap-3 text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.15em] mt-1">
                                <span className="flex items-center gap-1"><Wrench className="w-3 h-3" /> {t.category}</span>
                                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {t.location}</span>
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {t.submittedAt}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-3">
                            <Badge
                              className={cn(
                                "text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border shadow-sm",
                                t.status === 'Resolved' && "border-emerald-200/60 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400",
                                t.status === 'Pending Review' && "border-amber-200/60 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-400 animate-pulse-slow",
                                t.status === 'In Progress' && "border-blue-200/60 bg-blue-50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-400"
                              )}
                            >
                              {t.status}
                            </Badge>
                            <ChevronRight className={cn("w-5 h-5 text-muted-foreground/40 group-hover:text-foreground transition-all", expandedTicketId === t.id && "rotate-90")} />
                          </div>
                        </div>

                        {/* Expanded Content */}
                        <AnimatePresence>
                          {expandedTicketId === t.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="pt-4 border-t border-border/20 dark:border-blue-500/10 space-y-4"
                            >
                              {/* Issue Description */}
                              <div className="rounded-2xl bg-muted/30 dark:bg-blue-900/20 p-4">
                                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 mb-2">Issue Details</p>
                                <p className="text-sm text-foreground">{t.desc}</p>
                              </div>

                              {/* Details Grid */}
                              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                                <div className="rounded-2xl border border-border/30 dark:border-blue-500/20 bg-card/40 dark:bg-blue-950/30 p-4">
                                  <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Dorm Owner</p>
                                  <p className="mt-2 text-sm font-bold text-foreground">{t.assignedTo}</p>
                                  <p className="text-[10px] text-muted-foreground/60">{t.assignedTeam}</p>
                                </div>
                                <div className="rounded-2xl border border-border/30 dark:border-blue-500/20 bg-card/40 dark:bg-blue-950/30 p-4">
                                  <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Assigned To</p>
                                  <p className="mt-2 text-sm font-bold text-foreground">{t.technician}</p>
                                  <p className="text-[10px] text-muted-foreground/60">{t.expected}</p>
                                </div>
                                <div className="rounded-2xl border border-border/30 dark:border-blue-500/20 bg-card/40 dark:bg-blue-950/30 p-4">
                                  <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Access Details</p>
                                  <p className="mt-2 text-sm font-bold text-foreground">{t.access}</p>
                                </div>
                              </div>

                              {/* Timeline */}
                              <div className="rounded-2xl bg-muted/20 dark:bg-blue-900/10 p-4">
                                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 mb-3">Progress Timeline</p>
                                <div className="space-y-2 relative">
                                  {t.timeline.map((step: any, stepIndex: number) => (
                                    <div key={`${t.id}-${step.status}`} className="flex gap-3 relative">
                                      <div className="flex flex-col items-center pt-1">
                                        <div className={cn(
                                          "w-3 h-3 rounded-full border-2 transition-all",
                                          step.done ? "bg-primary dark:bg-blue-500 border-primary dark:border-blue-500" : "bg-background border-border/40 dark:border-blue-500/40"
                                        )} />
                                        {stepIndex < t.timeline.length - 1 && (
                                          <div className={cn(
                                            "w-0.5 h-8 transition-all",
                                            step.done ? "bg-primary/40" : "bg-border/20"
                                          )} />
                                        )}
                                      </div>
                                      <div className="pb-2 pt-1">
                                        <p className={cn("text-[10px] font-bold uppercase tracking-widest", step.done ? "text-foreground" : "text-muted-foreground/60")}>
                                          {step.status}
                                        </p>
                                        <p className={cn("text-[9px]", step.done ? "text-muted-foreground" : "text-muted-foreground/40")}>
                                          {step.time}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Owner Note */}
                              <div className="rounded-2xl bg-blue-500/5 dark:bg-blue-950/30 border border-blue-500/20 dark:border-blue-500/30 p-4">
                                <p className="text-[9px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">Owner's Note</p>
                                <p className="text-sm text-foreground">{t.adminNote}</p>
                              </div>

                              {/* Status Alert */}
                              {t.status === 'In Progress' && (
                                <div className="rounded-2xl border border-blue-200/60 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-950/30 p-4">
                                  <div className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                                    <div>
                                      <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-1">Visit Scheduled</p>
                                      <p className="text-sm text-foreground">Your maintenance visit is scheduled. The technician will arrive {t.expected}</p>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {t.status === 'Resolved' && (
                                <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/30 p-4">
                                  <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                                    <div>
                                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1">Completed</p>
                                      <p className="text-sm text-foreground">This maintenance request has been completed by the dorm owner team.</p>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {t.status === 'Pending Review' && (
                                <div className="rounded-2xl border border-amber-200/60 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/30 p-4">
                                  <div className="flex items-start gap-3">
                                    <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0 animate-spin" style={{ animationDuration: '3s' }} />
                                    <div>
                                      <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-1">Under Review</p>
                                      <p className="text-sm text-foreground">The dorm owner is reviewing your request. You'll receive an update within 2 hours.</p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
         </div>

         {/* Right Sidebar */}
         <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.4 }} className="lg:col-span-4 flex flex-col gap-6">
            {/* Emergency Alert */}
            <div className="p-6 rounded-3xl bg-rose-500/8 dark:bg-rose-950/30 backdrop-blur-xl border border-rose-500/30 dark:border-rose-900/40 shadow-lg relative overflow-hidden group">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100"></div>
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 dark:bg-rose-900/40 flex items-center justify-center shrink-0 shadow-sm border border-rose-500/20">
                  <AlertCircle className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-600 dark:text-rose-400 mb-1">Emergency Support</p>
                  <h3 className="text-sm font-bold text-foreground mb-2">For urgent issues only</h3>
                  <p className="text-[13px] text-muted-foreground/70">Flooding, power loss, fire risk, gas leak, or unsafe access</p>
                </div>
              </div>
              <Button className="mt-5 w-full h-11 rounded-xl bg-rose-600 dark:bg-rose-600 text-white hover:bg-rose-700 dark:hover:bg-rose-700 border-none font-black text-[10px] uppercase tracking-widest shadow-lg hover:shadow-xl transition-all">
                <Phone className="w-4 h-4 mr-2" /> Call 020 7946 0000
              </Button>
            </div>

            {/* How It Works */}
            <div className="p-6 rounded-3xl bg-card/50 dark:bg-blue-950/20 backdrop-blur-xl border border-white/20 dark:border-blue-500/20 shadow-lg">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 mb-5 flex items-center gap-2 pb-4 border-b border-border/20 dark:border-blue-500/10">
                <Info className="w-4 h-4 text-primary" /> How Maintenance Works
              </h4>

              <div className="space-y-4">
                {[
                  { 
                    num: '1', 
                    title: 'Submit Request', 
                    detail: 'Tell the dorm owner what needs fixing, when you\'re available, and any details that help.' 
                  },
                  { 
                    num: '2', 
                    title: 'Owner Reviews', 
                    detail: 'The dorm owner reviews priority and decides whether to assign staff or an outside vendor.' 
                  },
                  { 
                    num: '3', 
                    title: 'Get Updates', 
                    detail: 'Track progress here, see ETA, technician details, and notes from the dorm owner team.' 
                  },
                ].map((item, idx) => (
                  <div key={item.num} className="flex gap-3">
                    <div className="flex-shrink-0 pt-0.5">
                      <div className="flex items-center justify-center h-7 w-7 rounded-full bg-primary/15 dark:bg-blue-500/20 border border-primary/30 dark:border-blue-500/30 text-primary dark:text-blue-400">
                        <span className="text-[11px] font-black">{item.num}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-foreground mb-1">{item.title}</p>
                      <p className="text-[13px] text-muted-foreground/70 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-6 h-10 rounded-xl border-border/40 dark:border-blue-500/30 bg-transparent hover:bg-primary/5 dark:hover:bg-blue-500/5 text-foreground font-black text-[10px] uppercase tracking-widest transition-all">
                View FAQ <ArrowUpRight className="w-3 h-3 ml-2" />
              </Button>
            </div>

            {/* Quick Tips */}
            <div className="p-5 rounded-2xl bg-primary/5 dark:bg-blue-500/5 border border-primary/20 dark:border-blue-500/20">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary dark:text-blue-400 mb-3">Quick Tip</p>
              <p className="text-[13px] text-muted-foreground/80">Provide photos and specific details about the issue. This helps the owner decide priority and find the right technician faster.</p>
            </div>
         </motion.div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  TENANT MEALS VIEW
// ═══════════════════════════════════════════════════════════════════════════════

export function TenantMealsView({ hideHeader = false }: { hideHeader?: boolean }) {
  const { TODAY_MENU, CURRENT_TENANT } = require('@/lib/data');
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);

  const mealsByType = TODAY_MENU.meals.reduce((acc: any, meal: any) => {
    if (!acc[meal.type]) acc[meal.type] = [];
    acc[meal.type].push(meal);
    return acc;
  }, {});

  const getMealIcon = (type: string) => {
    switch (type) {
      case 'Breakfast': return Coffee;
      case 'Lunch': return UtensilsCrossed;
      case 'Dinner': return Utensils;
      default: return Activity;
    }
  };

  const todayStats = {
    totalMeals: TODAY_MENU.meals.length,
    available: TODAY_MENU.meals.filter((meal: any) => meal.status === 'Available').length,
    lowStock: TODAY_MENU.meals.filter((meal: any) => meal.status === 'Low Stock').length,
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="w-full pb-12 space-y-6">
      
      {/* Header */}
      {!hideHeader && (
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border/30 dark:border-blue-500/10">
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground/50">Meals</p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Today&apos;s Meals</h1>
            <p className="text-sm font-medium text-muted-foreground/60">Check what&apos;s available and view details quickly.</p>
          </div>
          <div className="flex gap-2 items-center">
             <div className="flex flex-col text-right mr-4 hidden sm:flex">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Today</span>
                <span className="text-sm font-bold text-foreground">{TODAY_MENU.date} • {TODAY_MENU.day}</span>
             </div>
            <Button className="h-10 px-6 rounded-xl bg-foreground text-background dark:bg-blue-600 dark:text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 border-none">
              <HistoryIcon className="w-4 h-4 mr-2" /> History
            </Button>
          </div>
        </motion.div>
      )}

      <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-[1.25fr_1fr_1fr_1fr]">
        <Card className="rounded-[2rem] border border-border/40 bg-card/60 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Zap className="h-7 w-7" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/50">Credits</p>
              <p className="text-3xl font-black tracking-tight text-foreground">{CURRENT_TENANT.mealCredits}</p>
              <p className="text-xs font-medium text-muted-foreground/60">Expires {CURRENT_TENANT.mealCreditsExpiry}</p>
            </div>
          </div>
        </Card>

        <Card className="rounded-[2rem] border border-border/40 bg-card p-5 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Meals Today</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-foreground">{todayStats.totalMeals}</p>
        </Card>

        <Card className="rounded-[2rem] border border-border/40 bg-card p-5 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Available</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-foreground">{todayStats.available}</p>
        </Card>

        <Card className="rounded-[2rem] border border-border/40 bg-card p-5 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Low Stock</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-foreground">{todayStats.lowStock}</p>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-10 mt-6">
        {['Breakfast', 'Lunch', 'Dinner'].map((type) => {
          const meals = mealsByType[type] || [];
          if (meals.length === 0) return null;

          const IconComponent = getMealIcon(type);

          return (
            <div key={type} className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-border/20 dark:border-blue-500/10">
                <div className="p-2 rounded-xl bg-primary/10 dark:bg-blue-500/10 text-primary dark:text-blue-500">
                   <IconComponent className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-[0.25em] text-foreground">{type}</h3>
                <Badge variant="outline" className="ml-auto text-[9px] font-black uppercase tracking-widest border-border/40 dark:border-blue-500/20 bg-muted/20 dark:bg-blue-900/10 px-3 py-1">
                   {meals.length} Meal{meals.length !== 1 ? 's' : ''}
                </Badge>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {meals.map((meal: any) => (
                  <motion.div
                    key={meal.id}
                    whileHover={{ y: -2 }}
                    className={cn(
                      "group p-6 md:p-8 rounded-[2rem] border transition-all cursor-pointer overflow-hidden relative shadow-sm",
                      expandedMeal === meal.id
                        ? 'bg-primary/5 dark:bg-blue-500/5 border-primary/40 dark:border-blue-500/30 shadow-lg shadow-primary/5 dark:shadow-blue-500/5'
                        : 'bg-card/40 dark:bg-blue-950/10 border-white/20 dark:border-blue-500/10 hover:bg-muted/30 dark:hover:bg-blue-900/10 hover:border-primary/20 dark:hover:border-blue-500/20'
                    )}
                    onClick={() => setExpandedMeal(expandedMeal === meal.id ? null : meal.id)}
                  >
                     {expandedMeal === meal.id && (
                       <div className="absolute inset-0 bg-gradient-to-r from-primary/5 dark:from-blue-500/5 via-transparent to-transparent pointer-events-none" />
                     )}
                     
                    <div className="relative z-10 flex flex-col md:flex-row items-start justify-between gap-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                           <span className={cn("text-[9px] font-black uppercase tracking-[0.2em]", expandedMeal === meal.id ? 'text-primary dark:text-blue-400' : 'text-muted-foreground/50')}>
                              {meal.time} - {meal.timeEnd}
                           </span>
                           {meal.isPopular && (
                              <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 shadow-none text-[8px] font-black uppercase tracking-widest px-2.5 py-0.5">
                                 Popular
                              </Badge>
                           )}
                           <Badge className={cn(
                             "border-none shadow-none text-[8px] font-black uppercase tracking-widest px-2.5 py-0.5 ml-auto",
                             meal.status === 'Low Stock'
                               ? 'bg-amber-500/10 text-amber-600'
                               : meal.status === 'Served'
                               ? 'bg-muted text-muted-foreground'
                               : 'bg-emerald-500/10 text-emerald-600'
                           )}>
                              {meal.status}
                           </Badge>
                        </div>
                        
                        <h4 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">{meal.title}</h4>
                        <p className="text-sm text-muted-foreground/80 leading-relaxed font-medium mt-2 line-clamp-2 md:line-clamp-none">{meal.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                          {meal.labels?.map((label: string) => (
                            <Badge key={label} variant="outline" className="text-[9px] font-black uppercase tracking-widest px-3 py-1 border-white/10 dark:border-blue-500/20 bg-background/50 dark:bg-slate-900/50 shadow-sm text-foreground/80">
                              {label}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-4 shrink-0 w-full md:w-auto">
                         <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 dark:bg-blue-500/10 border border-primary/20 dark:border-blue-500/20 shadow-inner">
                            <Zap className="w-4 h-4 text-primary dark:text-blue-400" />
                            <span className="text-[12px] font-black uppercase tracking-wider text-primary dark:text-blue-400">1 Credit</span>
                         </div>
                         
                         <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden border-2 border-white/10 dark:border-blue-500/20 shadow-inner relative group/img">
                           <img src={meal.image || '/dining-hall.jpg'} alt={meal.title} className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" />
                           <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity" />
                         </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedMeal === meal.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-6 pt-6 border-t border-border/10 dark:border-blue-500/10 relative z-10"
                        >
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-[1.5rem] bg-card/60 dark:bg-blue-950/20 border border-white/10 dark:border-blue-500/20 shadow-inner backdrop-blur-sm">
                            <div className="space-y-1">
                              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60 dark:text-blue-500/60 flex items-center gap-1.5"><Activity className="w-3 h-3" /> Calories</p>
                              <p className="text-xl font-black text-foreground tracking-tighter">{meal.nutrition?.calories || 450} <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">Kcal</span></p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500/60 flex items-center gap-1.5"><Leaf className="w-3 h-3" /> Protein</p>
                              <p className="text-xl font-black text-foreground tracking-tighter">{meal.nutrition?.protein || '24g'}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-amber-500/60 flex items-center gap-1.5"><Utensils className="w-3 h-3" /> Carbs</p>
                              <p className="text-xl font-black text-foreground tracking-tighter">{meal.nutrition?.carbs || '42g'}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-rose-500/60 flex items-center gap-1.5"><Droplets className="w-3 h-3" /> Fat</p>
                              <p className="text-xl font-black text-foreground tracking-tighter">{meal.nutrition?.fat || '12g'}</p>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end gap-3">
                             <Button variant="outline" className="h-12 px-6 rounded-xl border-border/40 dark:border-blue-500/20 text-foreground hover:bg-muted/50 dark:hover:bg-blue-900/20 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
                                Details
                             </Button>
                             <Button className="h-12 px-8 rounded-xl bg-primary dark:bg-blue-600 text-white hover:translate-y-[-2px] hover:shadow-[0_10px_20px_-10px_rgba(37,99,235,0.5)] transition-all border-none text-[10px] font-black uppercase tracking-[0.2em]">
                                Reserve Meal <ArrowRight className="w-4 h-4 ml-2" />
                             </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  TENANT PROFILE VIEW
// ═══════════════════════════════════════════════════════════════════════════════

export function TenantProfileView() {
  const { CURRENT_TENANT } = require('@/lib/data');

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="w-full pb-12 space-y-8">
      
      {/* Profile Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center gap-8 pb-10 border-b border-border/30">
        <div className="relative group">
          <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-card shadow-2xl relative z-10">
            <img src={CURRENT_TENANT.avatar || '/placeholder-user.jpg'} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -inset-2 bg-gradient-to-tr from-primary/20 to-transparent rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <Button size="icon" className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-primary text-white shadow-xl z-20 hover:scale-110 transition-transform border-none">
            <Camera className="w-4 h-4" />
          </Button>
        </div>

        <div className="text-center md:text-left space-y-2">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">{CURRENT_TENANT.name}</h1>
            <Badge className="bg-primary/10 text-primary border-none text-[10px] font-bold uppercase tracking-widest px-3 py-1">Premium Resident</Badge>
          </div>
          <p className="text-muted-foreground font-medium flex items-center justify-center md:justify-start gap-2">
            <MapPin className="w-4 h-4" /> {CURRENT_TENANT.building} • Room {CURRENT_TENANT.roomNumber}
          </p>
          <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-bold uppercase tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active Residency
            </div>
            <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest italic">Member Since {CURRENT_TENANT.memberSince}</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Info Blocks */}
        <div className="lg:col-span-8 space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6 bg-card border-border/50 shadow-sm space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground/50 border-b border-border/10 pb-3">Contact Nodes</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/5 flex items-center justify-center text-blue-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">Digital Mail</p>
                    <p className="text-sm font-bold">{CURRENT_TENANT.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/5 flex items-center justify-center text-emerald-500">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">Voice Comms</p>
                    <p className="text-sm font-bold">{CURRENT_TENANT.phone}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border/50 shadow-sm space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground/50 border-b border-border/10 pb-3">Security Hub</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/5 flex items-center justify-center text-purple-500">
                    <Key className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">Digital Key Access</p>
                    <p className="text-sm font-bold">Authorized • Node 402</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/5 flex items-center justify-center text-amber-500">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">2FA Status</p>
                    <p className="text-sm font-bold">Biometric Enabled</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Preferences/Settings */}
          <motion.div variants={itemVariants}>
            <Card className="p-8 bg-card border-border/50 shadow-sm">
               <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground/50 border-b border-border/10 pb-5 mb-8">Node Preferences</h3>
               <div className="space-y-6">
                  {[
                    { l: 'Energy Efficiency Mode', d: 'Automatically adjust HVAC when away from node.', val: true },
                    { l: 'Concierge Notifications', d: 'Receive push alerts for maintenance and deliveries.', val: true },
                    { l: 'Community Discovery', d: 'Allow other verified residents to see your public profile.', val: false },
                  ].map((pref, i) => (
                    <div key={i} className="flex items-start justify-between gap-6 pb-6 border-b border-border/5 last:border-0 last:pb-0">
                       <div className="space-y-1">
                          <p className="text-sm font-bold text-foreground">{pref.l}</p>
                          <p className="text-xs text-muted-foreground/70 leading-relaxed font-medium">{pref.d}</p>
                       </div>
                       <div className={cn("w-12 h-6 rounded-full relative p-1 transition-colors cursor-pointer", pref.val ? 'bg-primary' : 'bg-muted')}>
                          <div className={cn("w-4 h-4 rounded-full bg-white shadow-sm transition-transform", pref.val ? 'translate-x-6' : 'translate-x-0')} />
                       </div>
                    </div>
                  ))}
               </div>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar Support */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-8 bg-primary text-primary-foreground rounded-[2rem] shadow-xl shadow-primary/20 border-none relative overflow-hidden group">
            <div className="relative z-10 space-y-6">
              <h3 className="text-2xl font-bold tracking-tight leading-tight">Need technical assistance?</h3>
              <p className="text-sm opacity-80 leading-relaxed font-medium">Our resident support nodes are available 24/7 for urgent infrastructure queries.</p>
              <Button className="w-full h-12 bg-white text-primary hover:bg-white/90 font-bold text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-black/10 border-none">
                 Contact HQ Node
              </Button>
            </div>
            <Shield className="absolute bottom-0 right-0 w-32 h-32 opacity-10 translate-x-8 translate-y-8 -rotate-12 group-hover:scale-110 transition-transform duration-700" />
          </Card>

          <Card className="p-6 bg-card border-border/50 shadow-sm">
             <div className="flex items-center justify-between mb-6 pb-3 border-b border-border/10">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground/50">Recent System Logs</h3>
                <HistoryIcon className="w-3.5 h-3.5 text-muted-foreground/30" />
             </div>
             <div className="space-y-4">
                {[
                  { t: 'Security Audit', d: 'Log-in from Mac Terminal', s: 'Success' },
                  { t: 'Payment Method', d: 'Visa ending in 4022', s: 'Verified' },
                  { t: 'Key Reset', d: 'Digital pass token rotated', s: 'Encrypted' },
                ].map((log, i) => (
                  <div key={i} className="flex justify-between items-start gap-4">
                    <div className="space-y-0.5">
                       <p className="text-xs font-bold text-foreground">{log.t}</p>
                       <p className="text-[10px] text-muted-foreground/60 leading-tight">{log.d}</p>
                    </div>
                    <Badge variant="outline" className="text-[8px] font-bold text-primary/60 border-primary/20 bg-primary/5 px-2 py-0">{log.s}</Badge>
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
//  TENANT DASHBOARD VIEW (Unified Main Hub)
// ═══════════════════════════════════════════════════════════════════════════════

export function TenantDashboardView() {
  const { CURRENT_TENANT, TODAY_MENU, INVOICES } = require('@/lib/data');

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="w-full pb-12 space-y-8">
      
      {/* Refined Header: Institutional Tone */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border/30 dark:border-blue-500/10">
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground/50">Welcome Back</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Resident Node: <span className="text-primary/80 italic">{CURRENT_TENANT.name}</span></h1>
          <p className="text-xs text-muted-foreground font-medium flex items-center gap-2">
             <MapPin className="w-3.5 h-3.5 text-primary" /> {CURRENT_TENANT.building} • Unit {CURRENT_TENANT.roomNumber}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-10 px-5 rounded-lg border-border/50 dark:border-blue-500/10 text-[10px] font-bold uppercase tracking-widest gap-2 hover:bg-muted/50 transition-all">
            <Bell className="w-3.5 h-3.5" /> Notifications
          </Button>
          <Button className="h-10 px-5 rounded-lg bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest gap-2 shadow-lg shadow-primary/20 hover:translate-y-[-1px] transition-all border-none">
            <Lock className="w-3.5 h-3.5" /> Control Access
          </Button>
        </div>
      </motion.div>

      {/* Grid for Unified Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Core Ops: 8 Columns */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Status Metrics Ribbon */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
               { l: 'Next Billing', v: INVOICES[0].dueDate, i: Receipt, c: 'text-amber-500' },
               { l: 'Meal Credits', v: CURRENT_TENANT.mealCredits, i: UtensilsCrossed, c: 'text-blue-500' },
               { l: 'Node Temp', v: '21.4°C', i: Zap, c: 'text-emerald-500' },
               { l: 'Laundry slot', v: 'Tues 10:00', i: Droplets, c: 'text-indigo-500' },
             ].map((m, i) => (
               <Card key={i} className="p-4 bg-card border-border/50 shadow-sm flex flex-col items-center text-center gap-2 group hover:border-primary/30 transition-colors">
                  <div className={cn("p-2 rounded-lg bg-muted/50 group-hover:bg-white transition-colors shadow-inner", m.c)}>
                     <m.i className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/60">{m.l}</p>
                    <p className="text-sm font-bold text-foreground">{m.v}</p>
                  </div>
               </Card>
             ))}
          </motion.div>

          {/* Active Maintenance & Feedback: Relevant Records */}
          <motion.div variants={itemVariants} className="space-y-4">
             <div className="flex items-center justify-between pb-2 border-b border-border/10">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground">Operational Timeline</h3>
                <Badge variant="outline" className="text-[8px] font-bold text-primary/60 border-primary/10">2 Active Nodes</Badge>
             </div>
             <Card className="divide-y divide-border/10 overflow-hidden border-border/50">
                {[
                  { id: 1, action: 'Residency Extended', desc: 'Summer 2024 Contract Signed', time: '2h ago', icon: ShieldCheck, color: 'text-emerald-500' },
                  { id: 2, action: 'Payment Processed', desc: 'Spring Term Installment #2', time: '1d ago', icon: Receipt, color: 'text-blue-500' },
                  { id: 3, action: 'Maintenance Resolved', desc: 'Leaking Shower Head - Completed', time: '3d ago', icon: Wrench, color: 'text-amber-500' },
                ].map((item) => (
                  <div key={item.id} className="p-5 flex items-start gap-4 hover:bg-muted/30 transition-all cursor-pointer group">
                     <div className={cn("p-2 rounded-xl bg-muted/50 group-hover:bg-white transition-colors shadow-inner", item.color)}>
                        <item.icon className="w-4.5 h-4.5" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                           <h4 className="text-sm font-bold text-foreground truncate">{item.action}</h4>
                           <span className="text-[9px] font-bold text-muted-foreground/30 uppercase tracking-widest">{item.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground/60 font-medium">{item.desc}</p>
                     </div>
                  </div>
                ))}
             </Card>
             <Button variant="ghost" className="w-full h-10 text-[9px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all">
                Access Audit History <ArrowRight className="w-3.5 h-3.5 ml-2" />
             </Button>
          </motion.div>
        </div>

        {/* Sidebar Intel: 4 Columns */}
        <div className="lg:col-span-4 space-y-8">
           {/* Featured Menu Snippet */}
           <motion.div variants={itemVariants}>
              <Card className="overflow-hidden border-none shadow-2xl shadow-primary/10 group bg-card">
                 <div className="relative aspect-[16/9]">
                    <img src="/dining-hall.jpg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Today's Meal" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                       <Badge className="bg-primary/20 text-primary border-none text-[8px] font-black uppercase mb-2">Featured Selection</Badge>
                       <h4 className="text-lg font-bold text-white tracking-tight leading-tight">Gourmet Beef Bourguignon</h4>
                       <p className="text-[10px] text-white/60 font-medium mt-1">Served at Dining Node A • 18:30 - 20:30</p>
                    </div>
                 </div>
                 <div className="p-4">
                    <Button className="w-full h-10 bg-primary text-white font-bold text-[10px] uppercase tracking-widest rounded-xl hover:translate-y-[-1px] transition-all border-none">
                       Reservations Open
                    </Button>
                 </div>
              </Card>
           </motion.div>

           {/* Support Link */}
           <motion.div variants={itemVariants}>
              <Card className="p-6 bg-muted/20 border-border/40 shadow-inner space-y-4">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                       <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Resident Support</p>
                       <h4 className="text-sm font-bold">Concierge Channel</h4>
                    </div>
                 </div>
                 <p className="text-xs text-muted-foreground leading-relaxed font-medium">Direct link to the administrative node for urgent infrastructure queries.</p>
                 <Button variant="outline" className="w-full h-9 rounded-lg border-border/60 text-[9px] font-bold uppercase tracking-widest hover:bg-background transition-all">
                    Initiate Chat
                 </Button>
              </Card>
           </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
