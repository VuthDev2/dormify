'use client';

import {
  RefreshCcw, Cpu, DollarSign, Calendar, ArrowRight,
  AlertCircle, TrendingUp, Zap, Search, Settings,
  User, MoreVertical, CheckCircle2, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminLaundryViewProps {
  tier?: 'normal' | 'pro' | 'premium';
}

export function AdminLaundryView({ tier = 'normal' }: AdminLaundryViewProps) {
  const isPremium = tier === 'premium';
  const isPro = tier === 'pro' || tier === 'premium';

  const activeOrders = [
    { id: 'LND-102', user: 'Sarah Johnson', room: 'A-402', status: 'Washing', progress: 65, type: 'Wash & Fold', priority: 'high' },
    { id: 'LND-103', user: 'Michael Chen', room: 'B-102', status: 'Drying', progress: 30, type: 'Express', priority: 'normal' },
    { id: 'LND-104', user: 'Emma Wilson', room: 'C-305', status: 'Pending', progress: 0, type: 'Ironing Only', priority: 'low' },
  ];

  const machines = [
    { id: 'M-01', type: 'Washer', status: 'Active', timeRemaining: '12m', user: 'Sarah J.' },
    { id: 'M-02', type: 'Washer', status: 'Idle', timeRemaining: '-', user: '-' },
    { id: 'M-03', type: 'Washer', status: 'Error', timeRemaining: '-', user: '-' },
    { id: 'M-04', type: 'Dryer', status: 'Active', timeRemaining: '45m', user: 'Michael C.' },
    { id: 'M-05', type: 'Dryer', status: 'Idle', timeRemaining: '-', user: '-' },
    { id: 'M-06', type: 'Dryer', status: 'Active', timeRemaining: '18m', user: 'Emma W.' },
  ];

  const stats = [
    { label: 'Active Tasks', value: '14', icon: RefreshCcw, color: 'text-primary', sub: '4 urgent' },
    { label: 'Machine Load', value: '75%', icon: Cpu, color: 'text-emerald-500', sub: '9/12 active' },
    { label: 'Daily Revenue', value: '$184', icon: DollarSign, color: 'text-indigo-500', sub: '+12% vs yesterday' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-border/40 pb-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-4xl font-black tracking-tight">Laundry <span className="text-muted-foreground/30">Command</span></h2>
            {isPremium && <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 border-none text-[9px] font-black uppercase tracking-widest px-2 py-0.5">Premium Hub</Badge>}
          </div>
          <p className="text-muted-foreground font-medium text-sm">Monitor operations, handle requests, and optimize throughput.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search orders or users..."
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-border/40 bg-card text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <Button variant="outline" className="rounded-xl h-12 w-12 p-0 border-border/40">
             <Settings className="w-5 h-5" />
          </Button>
          <Button className="rounded-xl h-12 px-8 font-black bg-primary text-white shadow-lg shadow-primary/20">
             New Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6 border-border/40 bg-card rounded-2xl space-y-4 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <div className={cn("p-2.5 rounded-xl bg-muted/30 group-hover:bg-primary/10 transition-colors", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase text-muted-foreground/40 tracking-widest">{stat.label}</span>
            </div>
            <div>
              <h3 className="text-3xl font-black tracking-tight">{stat.value}</h3>
              <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-tight">{stat.sub}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <Card className="lg:col-span-2 p-8 border-border/40 bg-card rounded-[2.5rem] space-y-8 flex flex-col">
          <div className="flex justify-between items-center px-2">
            <div className="space-y-1">
              <h3 className="text-xl font-black tracking-tight">Active Operations Queue</h3>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Real-time update from machines</p>
            </div>
            <div className="flex items-center gap-2">
               <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest text-primary border-primary/20 bg-primary/5 px-3 py-1">
                {activeOrders.length} In-Process
               </Badge>
            </div>
          </div>

          <div className="space-y-4 flex-1">
            {activeOrders.map((order, i) => (
              <div key={i} className="p-6 rounded-[2rem] border border-border/10 bg-muted/5 hover:bg-muted/10 transition-all group relative overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex gap-4">
                    <div className="relative">
                      <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                        <AvatarFallback className="bg-primary/10 text-primary font-black text-sm">{order.user.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {order.priority === 'high' && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-background flex items-center justify-center">
                          <Zap className="w-2.5 h-2.5 text-white fill-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-base">{order.user}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase">{order.room} • {order.type}</p>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                        <p className="text-[10px] font-bold text-primary uppercase">ID: {order.id}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="flex-1 md:w-48 space-y-2">
                      <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                        <span>{order.status}</span>
                        <span>{order.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full transition-all duration-1000",
                            order.status === 'Washing' ? "bg-primary" : "bg-emerald-500"
                          )}
                          style={{ width: `${order.progress}%` }}
                        />
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-white transition-colors">
                          <MoreVertical className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl border-border/40">
                        <DropdownMenuItem className="font-bold text-xs uppercase p-3">View Details</DropdownMenuItem>
                        <DropdownMenuItem className="font-bold text-xs uppercase p-3">Update Status</DropdownMenuItem>
                        <DropdownMenuItem className="font-bold text-xs uppercase p-3 text-rose-500">Cancel Order</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button variant="ghost" className="w-full mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 hover:text-primary transition-colors">
            View Complete operational history <ArrowRight className="w-3 h-3 ml-2" />
          </Button>
        </Card>

        <div className="space-y-8">
          <Card className="p-8 border-border/40 bg-card rounded-[2.5rem] space-y-6 shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black tracking-tight">Machine Status</h3>
              <Badge variant="outline" className="text-[9px] font-black uppercase border-border/40">12 Total</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {machines.map((m) => (
                <div key={m.id} className="p-4 rounded-2xl border border-border/40 bg-muted/5 hover:bg-muted/10 transition-all space-y-3 group cursor-pointer">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-muted-foreground/50 tracking-widest">{m.id}</span>
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      m.status === 'Active' ? "bg-primary animate-pulse" :
                      m.status === 'Idle' ? "bg-emerald-500" : "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]"
                    )} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-black group-hover:text-primary transition-colors">{m.type}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{m.status === 'Active' ? m.timeRemaining : m.status}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full h-10 rounded-xl font-black text-[10px] uppercase tracking-widest border-border/40">
               Hardware Diagnostics
            </Button>
          </Card>

          {isPro ? (
            <Card className="p-8 border-border/40 bg-indigo-600 rounded-[2.5rem] text-white space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:scale-110 transition-transform duration-700">
                <TrendingUp className="w-32 h-32" />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Utilization Insights</span>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase">
                       <span className="opacity-60">Peak Hours Demand</span>
                       <span>High (+15%)</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-white transition-all duration-1000" style={{ width: '85%' }} />
                    </div>
                  </div>
                  <p className="text-xs font-medium leading-relaxed opacity-80">
                    Expected peak at <span className="font-bold underline">6:00 PM</span>. Consider enabling "Express Only" mode to handle the surge.
                  </p>
                </div>

                <Button className="w-full h-11 rounded-xl bg-white text-indigo-600 font-black text-[10px] uppercase tracking-widest hover:bg-white/90 shadow-lg">
                   Smart Scheduling
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-8 border-border/40 bg-muted/30 rounded-[2.5rem] text-center space-y-4 border-dashed border-2">
               <div className="w-12 h-12 rounded-2xl bg-background mx-auto flex items-center justify-center text-muted-foreground/40">
                <Zap className="w-6 h-6" />
               </div>
               <div className="space-y-1">
                 <h4 className="font-black text-sm">Unlock Smart Analytics</h4>
                 <p className="text-[10px] text-muted-foreground font-medium max-w-[180px] mx-auto uppercase tracking-tight">Upgrade to PRO for demand forecasting and peak alerts.</p>
               </div>
               <Button variant="outline" className="rounded-xl text-[9px] font-black uppercase px-6 border-primary text-primary hover:bg-primary hover:text-white transition-all">View Plans</Button>
            </Card>
          )}

          <Card className="p-6 border-border/40 bg-card rounded-[2rem] space-y-4 shadow-sm border-l-4 border-l-rose-500">
            <div className="flex items-center gap-2 text-rose-500">
              <AlertCircle className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Maintenance Alert</span>
            </div>
            <p className="text-xs font-medium text-muted-foreground leading-relaxed">
              Machine <span className="font-black text-foreground">M-03</span> has reported a "Drainage Error". Service is required before it can be used.
            </p>
            <div className="flex gap-2 pt-2">
              <Button size="sm" className="flex-1 rounded-lg text-[9px] font-black uppercase bg-rose-500 hover:bg-rose-600">Assign Staff</Button>
              <Button size="sm" variant="outline" className="flex-1 rounded-lg text-[9px] font-black uppercase">Dismiss</Button>
            </div>
          </Card>
        </div>
      </div>

      {isPro && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Avg Cycle Time', value: '42m', change: '-3m', icon: Clock },
            { label: 'Energy Usage', value: '142kWh', change: '+2%', icon: Zap },
            { label: 'Water Consumed', value: '1.2kL', change: '-5%', icon: RefreshCcw },
            { label: 'Staff Efficiency', value: '94%', change: '+1%', icon: User },
          ].map((stat, i) => (
            <Card key={i} className="p-4 border-border/40 bg-card rounded-xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-muted/30 flex items-center justify-center text-muted-foreground">
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase text-muted-foreground/60">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <h4 className="font-black text-lg">{stat.value}</h4>
                  <span className={cn("text-[8px] font-black", stat.change.startsWith('+') ? "text-rose-500" : "text-emerald-500")}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
