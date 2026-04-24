'use client';

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
  Zap,
  CreditCard,
  History,
  Activity,
  ChevronRight,
  Waves
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  role: 'admin' | 'tenant' | 'chef';
  tier?: 'normal' | 'pro' | 'premium';
}

export function Sidebar({ role, tier = 'normal' }: SidebarProps) {
  const pathname = usePathname();
  const isPremium = tier === 'premium' && role === 'admin';
  const isPro = tier === 'pro' && role === 'admin';
  const isNormal = tier === 'normal' && role === 'admin';

  const getMenuGroups = () => {
    if (role === 'tenant') {
      return [
        {
          label: 'My Portal',
          items: [
            { label: 'Home', href: '/dashboard/tenants', icon: LayoutDashboard },
            { label: 'Meals', href: '/dashboard/tenants/meals', icon: UtensilsCrossed },
            { label: 'Laundry', href: '/dashboard/tenants/laundry', icon: Waves },
            { label: 'Invoices', href: '/dashboard/tenants/invoices', icon: CreditCard },
          ]
        },
        {
          label: 'Support',
          items: [
            { label: 'Maintenance', href: '/dashboard/tenants/maintenance', icon: Settings },
            { label: 'My Profile', href: '/dashboard/tenants/profile', icon: Users },
          ]
        }
      ];
    }

    if (role === 'chef') {
      return [
        {
          label: 'Kitchen Ops',
          items: [
            { label: 'Overview', href: '/dashboard/chef', icon: LayoutDashboard },
            { label: 'Meal Plan', href: '/dashboard/chef/plan', icon: UtensilsCrossed },
            { label: 'Meal Counts', href: '/dashboard/chef/counts', icon: BarChart3 },
          ]
        }
      ];
    }

    const base = `/dashboard/${tier}`;
    if (isNormal) {
      return [
        {
          label: '',
          items: [
            { label: 'Dashboard', href: base, icon: LayoutDashboard },
            { label: 'Dorms', href: `${base}/dorms`, icon: Building2 },
            { label: 'Rooms', href: `${base}/rooms`, icon: Building2 },
            { label: 'Residents', href: `${base}/residents`, icon: Users },
            { label: 'Meals', href: `${base}/meals`, icon: UtensilsCrossed },
            { label: 'Staff', href: `${base}/staff`, icon: ShieldCheck },
            { label: 'Laundry', href: `${base}/laundry`, icon: Waves },
            { label: 'Payments', href: `${base}/payments`, icon: Wallet },
            { label: 'Reports', href: `${base}/reports`, icon: FileText },
            { label: 'Settings', href: `${base}/settings`, icon: Settings },
          ]
        }
      ];
    }

    return [
      {
        label: 'Platform',
        items: [
          { label: 'Dashboard', href: base, icon: LayoutDashboard },
          ...(tier !== 'normal' ? [{ label: 'Analytics', href: `${base}/analytics`, icon: PieChart }] : []),
        ]
      },
      {
        label: 'Management',
        items: [
          ...(tier !== 'normal' ? [{ label: 'Dorms', href: `${base}/dorms`, icon: Building2 }] : []),
          { label: 'Rooms', href: `${base}/rooms`, icon: Building2 },
          { label: 'Residents', href: `${base}/residents`, icon: Users },
          { label: 'Meals', href: `${base}/meals`, icon: UtensilsCrossed },
          ...(tier !== 'normal' ? [{ label: 'Services', href: `${base}/maintenance`, icon: Settings }] : []),
          { label: 'Staff', href: `${base}/staff`, icon: ShieldCheck },
          { label: 'Laundry', href: `${base}/laundry`, icon: Waves },
        ]
      },
      {
        label: 'Finance',
        items: [
          { label: 'Payments', href: `${base}/payments`, icon: Wallet },
          ...(tier !== 'normal' ? [{ label: 'Billing', href: `${base}/billing`, icon: CreditCard }] : []),
          ...(tier !== 'normal' ? [{ label: 'Revenue', href: `${base}/revenue`, icon: Activity }] : []),
          { label: 'Reports', href: `${base}/reports`, icon: FileText },
        ]
      },
      {
        label: 'System',
        items: [
          ...(tier === 'premium' ? [{ label: 'Audit Log', href: `${base}/audit-log`, icon: History }] : []),
          { label: 'Integrations', href: `${base}/integrations`, icon: Zap },
          { label: 'Settings', href: `${base}/settings`, icon: Settings },
        ]
      }
    ];
  };

  const isActive = (href: string) => pathname === href;

  const shellStyles = cn(
    "hidden lg:block shrink-0 lg:w-[296px] xl:w-[320px] p-4 md:p-5"
  );

  const panelStyles = cn(
    "relative flex h-full flex-col overflow-hidden rounded-[2rem] border backdrop-blur-2xl",
    "border-slate-300/55 bg-slate-100/60 shadow-[0_12px_28px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.55)]",
    "dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_24px_64px_rgba(2,6,23,0.45)]"
  );

  const logoStyles = cn(
    "flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-105 shadow-lg",
    isPremium ? "bg-primary text-white shadow-primary/30" :
    isPro ? "bg-primary/80 text-white shadow-primary/20" :
    "bg-primary/60 text-white shadow-primary/10"
  );

  const groupLabelStyles = cn(
    "px-3 text-[10px] font-bold uppercase tracking-[0.32em] transition-colors",
    "text-slate-500 dark:text-slate-400/80"
  );

  const itemStyles = (active: boolean) => cn(
    "group relative flex items-center gap-3 rounded-2xl border px-3 py-3 transition-all duration-300",
    active
      ? "border-primary/20 bg-primary/[0.10] text-slate-900 shadow-[0_10px_24px_rgba(99,102,241,0.12)] dark:border-white/10 dark:bg-white/[0.09] dark:text-white dark:shadow-[0_18px_40px_rgba(2,6,23,0.36)]"
      : "border-transparent text-slate-600 hover:border-slate-300/55 hover:bg-slate-200/55 hover:text-slate-900 dark:text-slate-300 dark:hover:border-white/10 dark:hover:bg-white/[0.06] dark:hover:text-white"
  );

  const iconWrapStyles = (active: boolean) => cn(
    "flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300",
    active
      ? "border-primary/20 bg-primary/15 text-primary dark:border-white/10 dark:bg-white/10 dark:text-white"
      : "border-transparent bg-slate-300/45 text-slate-500 group-hover:bg-slate-300/70 group-hover:text-slate-900 dark:bg-white/[0.05] dark:text-slate-300 dark:group-hover:bg-white/[0.08] dark:group-hover:text-white"
  );

  const experienceLabel =
    role === 'tenant'
      ? 'Resident Portal'
      : role === 'chef'
      ? 'Kitchen Console'
      : isPremium
      ? 'Premium Operations'
      : isPro
      ? 'Pro Operations'
      : 'Operations Suite';

  return (
    <aside className={shellStyles}>
      <div className={panelStyles}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.06),transparent_72%)] dark:bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_72%)]" />

        <div className="relative p-6">
          <Link href="/" className="group flex items-start gap-4">
            <div className={logoStyles}>
              <Building2 className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-lg font-semibold tracking-tight text-foreground">Dormify</span>
                <span className="rounded-full border border-slate-300/70 bg-slate-200/70 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.24em] text-slate-500 shadow-sm dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300">
                  Live
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {experienceLabel}
              </p>
            </div>
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-primary dark:border-primary/20 dark:bg-primary/10">
              {role === 'admin' ? tier : role}
            </span>
            <span className="rounded-full border border-slate-300/70 bg-slate-200/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300">
              Control Surface
            </span>
          </div>
        </div>

        <nav className="relative flex-1 overflow-y-auto px-3 pb-4 scrollbar-none">
          <div className="space-y-7">
            {getMenuGroups().map((group, i) => (
              <div key={i} className="space-y-3">
                {group.label && (
                  <h3 className={groupLabelStyles}>
                    {group.label}
                  </h3>
                )}

                <div className="space-y-2">
                  {group.items.map((item) => {
                    const active = isActive(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={itemStyles(active)}
                      >
                        <div className={iconWrapStyles(active)}>
                          <item.icon className="h-[18px] w-[18px]" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold">
                            {item.label}
                          </span>
                        </div>

                        <ChevronRight className={cn(
                          "h-4 w-4 transition-all duration-300",
                          active
                            ? "translate-x-0 opacity-100 text-primary dark:text-white/80"
                            : "translate-x-1 opacity-0 text-slate-400 group-hover:translate-x-0 group-hover:opacity-100 dark:text-slate-500"
                        )} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>

        <div className="relative mt-auto border-t border-slate-300/60 p-4 dark:border-white/10">
          <Button
            variant="ghost"
            className="group h-12 w-full justify-start rounded-2xl border border-transparent px-4 text-sm font-semibold text-muted-foreground transition-all hover:border-destructive/20 hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="mr-3 h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
            Sign out
          </Button>
        </div>
      </div>
    </aside>
  );
}
