'use client';

import { type FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  Building2,
  Wallet,
  AlertCircle,
  Plus,
  ArrowRight,
  TrendingUp,
  Calendar,
  Zap,
  Globe,
  ArrowUpRight,
  Sparkles,
  PieChart,
  Activity,
  FileText,
  ShieldCheck,
  Target,
  Cpu,
  Layers,
  Search,
  Settings,
  UtensilsCrossed,
  LayoutDashboard,
  Wrench,
  Bell,
  CreditCard,
  Phone,
  Shield,
  Mail,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { StatCard } from './stat-card';

interface DashboardContentProps {
  role: 'admin' | 'tenant' | 'chef';
  tier?: 'normal' | 'pro' | 'premium';
}

export function DashboardContent({ role, tier = 'normal' }: DashboardContentProps) {
  const router = useRouter();
  const [isAddTenantOpen, setIsAddTenantOpen] = useState(false);
  const [tenantFeedback, setTenantFeedback] = useState<string | null>(null);
  const [dashboardNotice, setDashboardNotice] = useState<string | null>(null);
  const [savedTenants, setSavedTenants] = useState(0);
  const [tenantForm, setTenantForm] = useState({
    fullName: '',
    email: '',
    room: '',
    status: 'Pending',
  });
  const isPremium = tier === 'premium' && role === 'admin';
  const isPro = tier === 'pro' && role === 'admin';
  const isNormal = tier === 'normal' && role === 'admin';
  const isChef = role === 'chef';
  const isTenant = role === 'tenant';

  const handleSaveTenant = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!tenantForm.fullName.trim() || !tenantForm.email.trim() || !tenantForm.room.trim()) {
      setTenantFeedback('Please fill in full name, email, and room before saving.');
      return;
    }

    setSavedTenants((previous) => previous + 1);
    setTenantFeedback(`Tenant ${tenantForm.fullName.trim()} added to local mock list.`);
    setTenantForm({ fullName: '', email: '', room: '', status: 'Pending' });
    setIsAddTenantOpen(false);
  };

  const handleComingSoon = (message: string) => {
    setDashboardNotice(message);
  };

  if (isPremium) {
    return (
      <div className="space-y-6 animate-in fade-in duration-700">

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-border/40">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-primary/5 border border-primary/10">
               <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
               <span className="text-[9px] font-bold uppercase tracking-widest text-primary">Intelligence Active</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-foreground">Global <span className="text-muted-foreground/30 font-medium">Portfolio</span></h1>
            <p className="text-muted-foreground font-medium text-base max-w-xl leading-snug">Strategic oversight and predictive performance metrics.</p>
          </div>
          <div className="flex items-center gap-2">
             <Button
                variant="outline"
                className="rounded-xl h-10 px-4 font-bold border-border bg-card text-xs"
                onClick={() => handleComingSoon('Market brief opened (mock).')}
             >
                Market Brief
             </Button>
             <Button
                className="rounded-xl h-10 px-6 font-black bg-primary text-primary-foreground shadow-lg shadow-primary/20 text-xs text-primary-foreground"
                onClick={() => handleComingSoon('Expand assets flow is coming soon.')}
             >
                Expand Assets
             </Button>
          </div>
        </div>

        {dashboardNotice ? (
          <Card className="border-border/40 bg-card/70 rounded-xl px-4 py-3">
            <p className="text-xs font-semibold text-foreground">{dashboardNotice}</p>
          </Card>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Portfolio Yield", value: "8.42%", trend: "+1.2%", sub: "Target 9.1%" },
            { label: "Asset Saturation", value: "98.6%", trend: "Optimal", sub: "Global Average" },
            { label: "Revenue Velocity", value: "£1.2M", trend: "+18%", sub: "Last 30 Days" },
            { label: "Risk Profile", value: "Low", trend: "Stable", sub: "System Monitored" },
          ].map((stat, i) => (
            <Card key={i} className="p-6 border-border/40 bg-card rounded-2xl shadow-sm hover:shadow-md transition-all">
               <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">{stat.label}</p>
               <div className="flex items-baseline gap-2 mb-2">
                  <h3 className="text-2xl font-black tracking-tight text-foreground">{stat.value}</h3>
                  <span className="text-[9px] font-bold text-emerald-500">{stat.trend}</span>
               </div>
               <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/30 border-t border-border/40 pt-2">{stat.sub}</p>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

           <Card className="lg:col-span-8 p-8 border-border/40 bg-card rounded-[1.5rem] shadow-sm relative overflow-hidden group">
              <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                <div className="flex items-center justify-between">
                   <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Predictive Engine v5.0</h3>
                   <div className="flex -space-x-2">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-card bg-muted" />
                      ))}
                   </div>
                </div>

                <div className="space-y-4">
                   <h4 className="text-3xl font-black tracking-tight text-foreground max-w-lg leading-tight">
                      Anticipated <span className="text-primary">Yield Surge</span> in the London SE1 Cluster.
                   </h4>
                   <p className="text-muted-foreground font-medium leading-relaxed max-w-xl">
                      Market data indicates a 22% demand increase in Shoreditch. We recommend a strategic capital allocation for Q3.
                   </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-border/40">
                   {[
                     { l: 'Volatility', v: '0.2%' },
                     { l: 'Liquidity', v: '£4.2M' },
                     { l: 'Saturation', v: '94%' },
                     { l: 'Market Cap', v: '£142M' },
                   ].map((item, i) => (
                     <div key={i} className="space-y-1">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40">{item.l}</p>
                        <p className="text-xl font-black text-foreground">{item.v}</p>
                     </div>
                   ))}
                </div>
              </div>
           </Card>

           <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center justify-between px-2">
                 <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Global Pulse</h3>
                 <span className="text-[9px] font-bold text-primary uppercase tracking-widest">Real-time</span>
              </div>

              <div className="space-y-4">
                {[
                  { t: 'Singapore Hub', d: '99% Occupancy', icon: Globe },
                  { t: 'London Central', d: 'New Acquisition', icon: ShieldCheck },
                  { t: 'Revenue Node', d: '£240k Processed', icon: Wallet },
                ].map((item, i) => (
                  <Card key={i} className="p-6 border-border/40 bg-card/50 rounded-2xl hover:bg-card transition-all cursor-pointer">
                     <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
                           <item.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                           <p className="text-[11px] font-black uppercase tracking-tight text-foreground">{item.t}</p>
                           <p className="text-xs text-muted-foreground font-medium">{item.d}</p>
                        </div>
                     </div>
                  </Card>
                ))}
              </div>

              <Button
                className="w-full h-16 rounded-2xl bg-foreground text-background font-black text-[10px] uppercase tracking-widest hover:bg-foreground/90 transition-all"
                onClick={() => router.push('/dashboard/premium/analytics')}
              >
                 Open Full Intelligence Suite
              </Button>
           </div>
        </div>
      </div>
    );
  }

  if (isPro) {
    return (
      <div className="space-y-6 animate-in fade-in duration-700">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-border/40">
           <div className="space-y-1.5">
             <div className="flex items-center gap-2">
               <Badge className="bg-primary text-primary-foreground border-none text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg">Pro Hub</Badge>
               <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Operations Command</span>
             </div>
             <h1 className="text-3xl font-black tracking-tight text-foreground">Property <span className="text-primary">Control</span></h1>
             <p className="text-sm text-muted-foreground font-medium">Efficient management of your residential infrastructure.</p>
           </div>
           <div className="flex items-center gap-2">
             <Button
               variant="outline"
               className="rounded-xl h-9 px-4 font-bold border-border bg-card text-xs"
               onClick={() => handleComingSoon('Daily report prepared locally.')}
             >
               Daily Report
             </Button>
             <Button
               onClick={() => setIsAddTenantOpen(true)}
               className="rounded-xl h-9 px-5 font-black bg-primary text-primary-foreground shadow-lg shadow-primary/10 text-xs text-primary-foreground"
             >
               Add Tenant
             </Button>
           </div>
        </div>

        {dashboardNotice ? (
          <Card className="border-border/40 bg-card/70 rounded-xl px-4 py-3">
            <p className="text-xs font-semibold text-foreground">{dashboardNotice}</p>
          </Card>
        ) : null}

        {tenantFeedback && (
          <Card className="border-border/40 bg-card/70 rounded-xl px-4 py-3">
            <p className="text-xs font-semibold text-foreground">{tenantFeedback}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mt-1">
              Local tenants added: {savedTenants}
            </p>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard tier="pro" label="Occupancy" value="94.2%" icon={Zap} trend="up" />
          <StatCard tier="pro" label="Tickets" value="4 Active" icon={Activity} trend="neutral" />
          <StatCard tier="pro" label="Revenue" value="£68,420" icon={TrendingUp} trend="up" />
          <StatCard tier="pro" label="Efficiency" value="98.5%" icon={Users} trend="up" />
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
           <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Recent Operations</h3>
                <div className="flex items-center gap-2 px-3 py-1 bg-primary/5 border border-primary/10 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[9px] font-bold text-primary uppercase">Ready</span>
                </div>
              </div>
              <Card className="overflow-hidden border-border/40 shadow-sm rounded-2xl bg-card">
                 <div className="divide-y divide-border/40">
                    {[
                      { title: 'Check-in', info: 'North Hall Room 402', status: 'Done' },
                      { title: 'Maintenance', info: 'Block B Electrical Resolve', status: 'Fixed' },
                      { title: 'Payment', info: 'Rent Verified: Sarah J.', status: 'Paid' },
                      { title: 'Audit', info: 'Main Entrance Lock Sync', status: 'Secure' },
                    ].map((log, i) => (
                      <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-all cursor-pointer group">
                         <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center font-bold text-[10px] text-muted-foreground group-hover:border-primary group-hover:text-primary transition-all">
                              {i+1}
                            </div>
                            <div>
                               <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{log.title}</p>
                               <p className="text-[11px] text-muted-foreground font-medium mt-0.5">{log.info}</p>
                            </div>
                         </div>
                         <Badge variant="outline" className="text-[8px] font-bold uppercase tracking-widest border-border text-muted-foreground px-2">{log.status}</Badge>
                      </div>
                    ))}
                 </div>
              </Card>
           </div>

           <div className="lg:col-span-4 space-y-6">
              <Card className="p-6 border-border/40 bg-card rounded-2xl shadow-sm">
                 <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-6 border-b border-border/40 pb-3 flex items-center justify-between">
                   Portfolio Health
                   <Activity className="w-3.5 h-3.5 text-primary" />
                 </h4>
                 <div className="space-y-6">
                    {[
                      { label: 'Room Readiness', value: 98, color: 'bg-primary' },
                      { label: 'Payment Velocity', value: 85, color: 'bg-muted-foreground' },
                      { label: 'Satisfaction', value: 92, color: 'bg-emerald-500' },
                    ].map((item, i) => (
                      <div key={i} className="space-y-2">
                         <div className="flex justify-between items-end">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{item.label}</span>
                           <span className="text-xs font-black text-foreground">{item.value}%</span>
                         </div>
                         <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden p-0.5">
                            <div className={cn("h-full rounded-full transition-all duration-1000", item.color)} style={{ width: `${item.value}%` }} />
                         </div>
                      </div>
                    ))}
                 </div>
              </Card>

              <Card className="p-6 bg-primary text-primary-foreground rounded-2xl border-none shadow-xl shadow-primary/10 relative overflow-hidden group">
                 <div className="space-y-4 relative z-10">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <Badge className="bg-white/10 text-white border-white/20 text-[8px] uppercase">Live Sync</Badge>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-black tracking-tight">Smart Ops</h3>
                      <p className="text-[11px] opacity-80 font-medium">Auto-billing is optimized.</p>
                    </div>
                    <Button
                      className="w-full text-[9px] font-black uppercase tracking-widest h-10 rounded-xl bg-white text-primary hover:bg-white/90 transition-all"
                      onClick={() => router.push('/dashboard/pro/settings')}
                    >
                      Configure System
                    </Button>
                 </div>
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
              </Card>
           </div>
        </div>

        <Dialog open={isAddTenantOpen} onOpenChange={setIsAddTenantOpen}>
          <DialogContent className="sm:max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-black tracking-tight">Add Tenant</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSaveTenant} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
                <Input
                  value={tenantForm.fullName}
                  onChange={(event) => setTenantForm((previous) => ({ ...previous, fullName: event.target.value }))}
                  placeholder="Alex Johnson"
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email</label>
                <Input
                  type="email"
                  value={tenantForm.email}
                  onChange={(event) => setTenantForm((previous) => ({ ...previous, email: event.target.value }))}
                  placeholder="alex@example.com"
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Room</label>
                <Input
                  value={tenantForm.room}
                  onChange={(event) => setTenantForm((previous) => ({ ...previous, room: event.target.value }))}
                  placeholder="B-204"
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</label>
                <select
                  value={tenantForm.status}
                  onChange={(event) => setTenantForm((previous) => ({ ...previous, status: event.target.value }))}
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddTenantOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  if (isNormal) {
    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h1 className="text-2xl font-black tracking-tight text-foreground">Management Overview</h1>
            <p className="text-[11px] text-muted-foreground font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {today}
            </p>
          </div>
          <div className="flex items-center gap-2">
             <Button
               variant="outline"
               size="sm"
               className="rounded-xl font-bold border-border bg-card shadow-sm h-10 px-4"
               onClick={() => handleComingSoon('Report export queued (mock).')}
             >
               Download Report
             </Button>
             <Button
               size="sm"
               className="rounded-xl font-black bg-primary text-primary-foreground shadow-lg shadow-primary/10 h-10 px-4"
               onClick={() => router.push('/dashboard/normal/residents')}
             >
               <Plus className="w-4 h-4 mr-2" /> Add Resident
             </Button>
          </div>
        </div>

        {dashboardNotice ? (
          <Card className="border-border/40 bg-card/70 rounded-xl px-4 py-3">
            <p className="text-xs font-semibold text-foreground">{dashboardNotice}</p>
          </Card>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard tier="normal" label="Total Residents" value="142" icon={Users} trend="neutral" change="Stable" />
          <StatCard tier="normal" label="Available Units" value="12" icon={Building2} trend="down" change="-2" />
          <StatCard tier="normal" label="Active Invoices" value="45" icon={FileText} trend="up" change="+8" />
          <StatCard tier="normal" label="Open Tickets" value="6" icon={AlertCircle} trend="up" change="+1" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-4">
            <Card className="border-border/40 bg-card rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-border/40 flex items-center justify-between bg-muted/20">
                <h3 className="text-xs font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" /> Active Operations
                </h3>
                <Badge variant="outline" className="text-[9px] font-bold">Live Status</Badge>
              </div>
              <div className="p-0">
                {[
                  { title: 'B-Block Maintenance', desc: 'Plumbing repair in progress - Room 204', status: 'In Progress', time: 'Started 2h ago', icon: Settings },
                  { title: 'Bulk Check-in', desc: '12 new residents arriving for Autumn semester', status: 'Scheduled', time: 'Starts at 2:00 PM', icon: Users },
                  { title: 'Kitchen Audit', desc: 'Weekly hygiene and inventory verification', status: 'Completed', time: 'Finished 10:00 AM', icon: UtensilsCrossed },
                ].map((op, i) => (
                  <div key={i} className="p-4 flex items-start gap-3 hover:bg-muted/30 transition-all border-b border-border/10 last:border-none group">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <op.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-xs font-bold text-foreground">{op.title}</p>
                        <span className="text-[9px] font-bold text-muted-foreground/40">{op.time}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground font-medium mb-2">{op.desc}</p>
                      <Badge className={cn(
                        "text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border-none",
                        op.status === 'Completed' ? "bg-emerald-500/10 text-emerald-600" :
                        op.status === 'In Progress' ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                      )}>{op.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-muted/10 border-t border-border/40">
                <Button
                  variant="ghost"
                  className="w-full text-xs font-bold text-muted-foreground hover:text-primary"
                  onClick={() => router.push('/dashboard/normal/reports')}
                >
                  View Full Operational Log <ArrowRight className="w-3 h-3 ml-2" />
                </Button>
              </div>
            </Card>
          </div>

          <div className="space-y-6">

            <div className="space-y-3">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground px-2">Quick Commands</h3>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant="outline"
                  className="h-12 justify-start gap-3 px-4 rounded-xl border-border bg-card hover:bg-muted transition-all group border-dashed"
                  onClick={() => router.push('/dashboard/normal/rooms')}
                >
                  <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Plus className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-xs uppercase tracking-widest">Assign Room</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 justify-start gap-3 px-4 rounded-xl border-border bg-card hover:bg-muted transition-all group border-dashed"
                  onClick={() => router.push('/dashboard/normal/payments')}
                >
                  <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-xs uppercase tracking-widest">Post Invoice</span>
                </Button>
              </div>
            </div>

            <Card className="p-6 border-border/40 bg-card rounded-[1.5rem] shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Recent Events</h3>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="space-y-5">
                 {[
                   { text: 'Room A-102 check-in', time: '2h ago', color: 'bg-blue-500' },
                   { text: 'Meal plan: North Hall', time: '4h ago', color: 'bg-orange-500' },
                   { text: 'Oct Revenue Report', time: '1d ago', color: 'bg-emerald-500' },
                   { text: 'Staff shift: Night', time: '1d ago', color: 'bg-purple-500' },
                 ].map((act, i) => (
                   <div key={i} className="flex items-start gap-3">
                      <div className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0", act.color)} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-foreground truncate">{act.text}</p>
                        <p className="text-[10px] font-medium text-muted-foreground/60">{act.time}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <Button
                variant="ghost"
                className="w-full mt-6 text-[10px] font-black uppercase tracking-widest h-10 border border-border/40 rounded-xl"
                onClick={() => router.push('/dashboard/normal/reports')}
              >
                System History
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // ─── Chef fallback ───────────────────────────────────────────────────────
  if (isChef) {
    return (
      <div className="space-y-12 animate-in fade-in duration-700">
        <div className="flex flex-col md:flex-row md:items-center gap-12 pb-16 border-b border-border/40">
           <div className="w-32 h-32 rounded-[3.5rem] bg-foreground flex items-center justify-center text-background shadow-2xl">
              <UtensilsCrossed className="w-14 h-14" />
           </div>
           <div className="space-y-4">
              <h1 className="text-7xl font-bold tracking-tight text-foreground leading-none">Chef Console</h1>
              <p className="text-muted-foreground font-medium text-2xl leading-relaxed">Orchestrating daily culinary services and meal planning.</p>
           </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { label: 'Total Daily Portions', value: '482', icon: Users },
            { label: 'Kitchen Status',       value: 'Operational', icon: Zap },
            { label: 'Active Plan',          value: 'High-Yield', icon: UtensilsCrossed },
          ].map((stat, i) => (
            <Card key={i} className="p-12 border-border/40 bg-card group hover:shadow-2xl transition-all duration-500 rounded-[3.5rem] overflow-hidden relative shadow-sm">
              <div className="flex items-center gap-8 mb-12 relative z-10">
                <div className="p-6 rounded-[1.5rem] bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all shadow-inner">
                  <stat.icon className="w-8 h-8" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-muted-foreground">{stat.label}</span>
              </div>
              <div className="text-6xl font-black tracking-tighter text-foreground relative z-10">{stat.value}</div>
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-muted/40 rounded-full group-hover:scale-150 transition-transform duration-1000" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // ─── Tenant Home Dashboard ────────────────────────────────────────────────
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1200px] mx-auto pb-20">

      {/* Welcome hero */}
      <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-indigo-600 p-10 shadow-2xl shadow-primary/20">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, white 0%, transparent 60%)' }} />
        <div className="relative z-10 space-y-4">
          <Badge className="bg-white/20 text-white border-none font-black text-[9px] uppercase tracking-widest px-3">
            Bloomsbury Hall · Room A-402
          </Badge>
          <h1 className="text-5xl font-black text-white tracking-tight leading-tight">
            Good morning, <br />Sarah! 👋
          </h1>
          <p className="text-white/70 font-medium text-base max-w-md">
            Everything you need for your stay — all in one place.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {[
              { label: '£1,240 due Apr 01',  color: 'bg-amber-400/20 text-amber-200' },
              { label: '1 meal left today',  color: 'bg-white/10 text-white/70' },
              { label: '0 active requests',  color: 'bg-emerald-400/20 text-emerald-200' },
            ].map((tag, i) => (
              <span key={i} className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${tag.color}`}>
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Quick access services */}
      <div className="space-y-4">
        <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground px-1">My Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Meals',       sub: 'View today\'s menu',   icon: UtensilsCrossed, href: '/dashboard/tenants/meals',       color: 'text-orange-500', bg: 'bg-orange-500/10' },
            { label: 'Laundry',     sub: 'Book a machine',        icon: Zap,             href: '/dashboard/tenants/laundry',     color: 'text-blue-500',   bg: 'bg-blue-500/10' },
            { label: 'Invoices',    sub: '1 payment pending',     icon: Wallet,          href: '/dashboard/tenants/invoices',    color: 'text-amber-500',  bg: 'bg-amber-500/10', urgent: true },
            { label: 'Maintenance', sub: '1 ticket in progress',  icon: Settings,        href: '/dashboard/tenants/maintenance', color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
          ].map((s, i) => (
            <a key={i} href={s.href} className={`group p-6 rounded-[2rem] border ${(s as any).urgent ? 'border-amber-500/20 bg-amber-500/5' : 'border-border/40 bg-card'} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-4`}>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${s.bg} ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-black text-sm">{s.label}</p>
                <p className={`text-[10px] font-bold uppercase ${(s as any).urgent ? 'text-amber-500' : 'text-muted-foreground'}`}>{s.sub}</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all mt-auto" />
            </a>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">

          {/* At a glance: my balance + today's meal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-7 border-border/40 bg-card rounded-[2.5rem] space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Wallet className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">My Balance</span>
              </div>
              <div>
                <p className="text-4xl font-black">£1,240.00</p>
                <p className="text-xs font-bold text-amber-500 uppercase mt-1">Due: April 01, 2026</p>
              </div>
              <Button
                size="sm"
                className="w-full h-10 rounded-xl font-black text-[10px] uppercase bg-primary text-white shadow-lg shadow-primary/20"
                onClick={() => router.push('/dashboard/tenants/invoices')}
              >
                Pay Now
              </Button>
            </Card>

            <Card className="p-7 border-border/40 bg-card rounded-[2.5rem] space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                  <UtensilsCrossed className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Today's Dinner</span>
              </div>
              <div>
                <p className="text-xl font-black leading-tight">Slow-cooked Beef Bourguignon</p>
                <p className="text-xs font-bold text-muted-foreground uppercase mt-1">🕰 18:30 – 20:30 · Chef Special</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full h-10 rounded-xl font-bold text-[10px] uppercase border-border/40"
                onClick={() => router.push('/dashboard/tenants/meals')}
              >
                View Full Menu
              </Button>
            </Card>
          </div>

          {/* Upcoming schedule */}
          <Card className="border-border/40 bg-card rounded-[2.5rem] overflow-hidden shadow-sm">
            <div className="px-7 pt-7 pb-4 flex items-center justify-between border-b border-border/20">
              <h3 className="font-black text-base flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" /> This Week
              </h3>
              <Badge variant="outline" className="text-[9px] font-black border-border/40">Oct 27 – Nov 02</Badge>
            </div>
            <div className="divide-y divide-border/10">
              {[
                { day: 'Tomorrow',  event: 'Rent payment reminder',     icon: Wallet,        color: 'text-amber-500',  bg: 'bg-amber-500/10' },
                { day: 'Oct 28',    event: 'HVAC technician visit (10 AM)', icon: Wrench,    color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
                { day: 'Oct 28',    event: 'Water shutoff 10AM–2PM',    icon: Bell,          color: 'text-rose-500',   bg: 'bg-rose-500/10' },
                { day: 'Oct 31',    event: 'Laundry booking slot open', icon: Zap,           color: 'text-blue-500',   bg: 'bg-blue-500/10' },
                { day: 'Nov 01',    event: 'Monthly rent due',          icon: CreditCard,    color: 'text-primary',    bg: 'bg-primary/10' },
              ].map((e, i) => (
                <div key={i} className="flex items-center gap-4 px-7 py-4 hover:bg-muted/20 transition-colors group">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${e.bg} ${e.color}`}>
                    <e.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{e.event}</p>
                  </div>
                  <span className="text-[10px] font-black text-muted-foreground/40 uppercase shrink-0">{e.day}</span>
                </div>
              ))}
            </div>
          </Card>

        </div>

        {/* Right column */}
        <div className="space-y-6">

          {/* Room & contacts */}
          <Card className="p-6 border-border/40 bg-card rounded-[2.5rem] space-y-5 shadow-sm">
            <h3 className="font-black text-sm flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" /> My Room
            </h3>
            <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-3xl font-black">A-402</p>
                <Badge className="bg-primary/10 text-primary border-none font-black text-[9px] px-3">Floor 4</Badge>
              </div>
              <p className="text-xs font-bold text-muted-foreground uppercase">Bloomsbury Hall · En-suite</p>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Reception',  value: '+44 20 7946 0001', icon: Phone },
                { label: 'Security',   value: '+44 20 7946 0002', icon: Shield },
                { label: 'Support',    value: 'help@dormify.com',  icon: Mail },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/30 transition-colors">
                  <c.icon className="w-3.5 h-3.5 text-primary shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[9px] font-black uppercase text-muted-foreground">{c.label}</p>
                    <p className="text-xs font-bold truncate">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick links */}
          <Card className="p-6 border-border/40 bg-card rounded-[2.5rem] space-y-3 shadow-sm">
            <h3 className="font-black text-sm">Quick <span className="text-muted-foreground/30">Links</span></h3>
            {[
              { label: 'View My Profile',       href: '/dashboard/tenants/profile',     icon: Users },
              { label: 'Download Tenancy Docs', href: '/dashboard/tenants/profile',     icon: FileText },
              { label: 'Submit Feedback',       href: '/dashboard/tenants/maintenance', icon: MessageSquare },
            ].map((l, i) => (
              <a key={i} href={l.href} className="flex items-center gap-3 p-3 rounded-2xl border border-border/30 hover:bg-muted/30 transition-all group">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <l.icon className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-xs flex-1">{l.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
              </a>
            ))}
          </Card>

        </div>
      </div>
    </div>
  );
}
