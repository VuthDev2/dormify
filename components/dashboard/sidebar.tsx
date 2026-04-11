'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  UtensilsCrossed,
  BarChart3,
  Settings,
  LogOut,
  Building2,
  Wallet,
  FileText,
  PieChart,
  ShieldCheck,
  Layers,
  Sparkles,
  Zap,
  CreditCard,
  History,
  Activity,
  ChevronRight,
  ChevronLeft,
  Waves,
  Briefcase,
  TrendingUp,
  Receipt,
  Boxes,
  Home,
  Wrench
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface SidebarProps {
  role: 'admin' | 'tenant' | 'chef';
  tier?: 'normal' | 'pro' | 'premium';
}

export function Sidebar({ role, tier = 'normal' }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved !== null) {
      setIsCollapsed(JSON.parse(saved));
    }
  }, []);

  const toggleSidebar = () => {
    const nextState = !isCollapsed;
    setIsCollapsed(nextState);
    localStorage.setItem('sidebar-collapsed', JSON.stringify(nextState));
  };

  const base = 
    role === 'chef' 
      ? '/dashboard/chef' 
      : role === 'tenant' 
      ? '/dashboard/tenants' 
      : `/dashboard/${tier}`;

  const getMenuGroups = () => {
    if (role === 'tenant') {
      return [
        {
          label: 'My Portal',
          items: [
            { label: 'Home', href: base, icon: Home },
            { label: 'Meals', href: `${base}/meals`, icon: UtensilsCrossed },
            { label: 'Invoices', href: `${base}/invoices`, icon: CreditCard },
          ]
        },
        {
          label: 'Support',
          items: [
            { label: 'Services', href: `${base}/services`, icon: Wrench },
            { label: 'My Profile', href: `${base}/profile`, icon: Users },
          ]
        }
      ];
    }

    if (role === 'chef') {
      return [
        {
          label: 'Culinary Ops',
          items: [
            { label: 'Overview', href: base, icon: LayoutDashboard },
            { label: 'Menu Builder', href: `${base}/plan`, icon: UtensilsCrossed },
            { label: 'Service Counts', href: `${base}/counts`, icon: BarChart3 },
            { label: 'Inventory & Stock', href: `${base}/stock`, icon: Layers },
          ]
        },
        {
          label: 'Insights & Team',
          items: [
            { label: 'Resident Sentiment', href: `${base}/feedback`, icon: Sparkles },
            { label: 'Kitchen Team', href: `${base}/staff`, icon: ShieldCheck },
          ]
        }
      ];
    }

    if (tier === 'normal' && role === 'admin') {
      return [
        {
          label: '',
          items: [
            { label: 'Overview', href: base, icon: LayoutDashboard },
            { label: 'Rooms', href: `${base}/rooms`, icon: Home },
            { label: 'Residents', href: `${base}/residents`, icon: Building2 },
            { label: 'Meals', href: `${base}/meals`, icon: UtensilsCrossed },
            { label: 'Services', href: `${base}/services`, icon: Wrench },
            { label: 'Staff', href: `${base}/staff`, icon: ShieldCheck },
            { label: 'Payments', href: `${base}/payments`, icon: Wallet },
            { label: 'Reports', href: `${base}/reports`, icon: FileText },
            { label: 'Settings', href: `${base}/settings`, icon: Settings },
          ]
        }
      ];
    }

    return [
      {
        label: 'Intelligence',
        items: [
          { label: 'Overview', href: base, icon: LayoutDashboard },
          { label: 'Analytics', href: `${base}/analytics`, icon: TrendingUp },
        ]
      },
      {
        label: 'Operations',
        items: [
          { label: 'Properties', href: `${base}/rooms`, icon: Building2 },
          { label: 'Residents', href: `${base}/residents`, icon: Users },
          { label: 'Culinary', href: `${base}/meals`, icon: UtensilsCrossed },
          { label: 'Services', href: `${base}/services`, icon: Wrench },
        ]
      },
      {
        label: 'Organization',
        items: [
          { label: 'Finance', href: `${base}/payments`, icon: Receipt },
          { label: 'Team', href: `${base}/staff`, icon: Briefcase },
        ]
      },
      {
        label: 'Infrastructure',
        items: [
          { label: 'Integrations', href: `${base}/integrations`, icon: Zap },
          { label: 'Audit Log', href: `${base}/audit-log`, icon: History },
          { label: 'Settings', href: `${base}/settings`, icon: Settings },
        ]
      }
    ];
  };

  const isActive = (href: string) => {
    if (href === pathname) return true;
    if (href !== base && pathname.startsWith(href)) return true;
    return false;
  };

  const experienceLabel =
    role === 'tenant'
      ? 'Resident Portal'
      : role === 'chef'
      ? 'Kitchen Console'
      : tier === 'premium'
      ? 'Premium Enterprise'
      : tier === 'pro'
      ? 'Pro Operations'
      : 'Standard Operations';

  if (!mounted) return <aside className="hidden lg:block shrink-0 lg:w-[320px] p-5" />;

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside 
        initial={false}
        animate={{ width: isCollapsed ? 120 : 320 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block shrink-0 px-5 py-5"
      >
        <div className="relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-slate-200/50 bg-white/80 dark:border-white/5 dark:bg-gradient-to-b dark:from-slate-900/80 dark:to-blue-950/80 backdrop-blur-3xl shadow-sm">
          {/* Dark Mode Gradient Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-primary/5 opacity-0 dark:opacity-100 pointer-events-none" />
          <div className={cn("relative pt-8 pb-6 flex flex-col gap-6", isCollapsed ? "px-4" : "px-6")}>
            <div className={cn(
              "flex transition-all duration-500",
              isCollapsed ? "flex-col-reverse items-end gap-2" : "flex-row items-center justify-between"
            )}>
              <Link href="/" className={cn(
                "group flex transition-all duration-500",
                 isCollapsed ? "self-center justify-center pt-2" : "items-center gap-3"
              )}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
                  <Building2 className="h-5 w-5" />
                </div>
                {!isCollapsed && (
                  <div className="flex flex-col">
                    <span className="text-lg font-black tracking-tight text-foreground leading-none">Dormify</span>
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1.5 opacity-60">
                      {experienceLabel}
                    </span>
                  </div>
                )}
              </Link>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="h-9 w-9 shrink-0 rounded-xl hover:bg-muted transition-all duration-500"
              >
                {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 pb-4 scrollbar-none space-y-8">
            {getMenuGroups().map((group, i) => (
              <div key={i} className="space-y-3">
                {group.label && !isCollapsed && (
                  <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/40">
                    {group.label}
                  </h3>
                )}

                <div className="space-y-1.5">
                  {group.items.map((item) => {
                    const active = isActive(item.href);
                    
                    const content = (
                      <Link
                        href={item.href}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-all duration-300",
                          active 
                            ? "bg-primary text-white shadow-md shadow-primary/20" 
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                          isCollapsed && "justify-center px-0 h-12 w-12 mx-auto rounded-xl"
                        )}
                      >
                        <div className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center transition-all duration-300",
                          active ? "text-white" : "text-muted-foreground group-hover:text-foreground",
                          isCollapsed && active && "scale-110"
                        )}>
                          <item.icon className="h-5 w-5" />
                        </div>

                        {!isCollapsed && (
                          <span className="truncate text-xs font-bold uppercase tracking-wider">
                            {item.label}
                          </span>
                        )}
                      </Link>
                    );

                    if (isCollapsed) {
                      return (
                        <Tooltip key={item.href}>
                          <TooltipTrigger asChild>{content}</TooltipTrigger>
                          <TooltipContent side="right" sideOffset={20} className="font-black uppercase tracking-[0.2em] text-[10px] bg-slate-900 text-white border-none px-3 py-2 rounded-xl">
                            {item.label}
                          </TooltipContent>
                        </Tooltip>
                      );
                    }

                    return <div key={item.href}>{content}</div>;
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-auto p-4 border-t border-border/10">
            {isCollapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-12 w-full justify-center rounded-2xl text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition-all"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={20} className="font-black uppercase tracking-[0.2em] text-[10px] bg-slate-900 dark:bg-white dark:text-slate-900 text-white border-none px-3 py-2 rounded-xl shadow-lg">
                  Sign out
                </TooltipContent>
              </Tooltip>
            ) : (
              <Button
                variant="ghost"
                className="h-12 w-full justify-start rounded-2xl text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition-all"
              >
                <LogOut className="h-4 w-4 mr-3" />
                <span className="text-xs font-bold uppercase tracking-wider">Sign out</span>
              </Button>
            )}
          </div>
        </div>
      </motion.aside>
    </TooltipProvider>
  );
}
