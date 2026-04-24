'use client';

import { useState } from 'react';
import { Bell, Search, ChevronDown, Command } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from './theme-toggle';

interface HeaderProps {
  role: 'admin' | 'tenant' | 'chef';
  tier?: 'normal' | 'pro' | 'premium';
}

export function Header({ role, tier = 'normal' }: HeaderProps) {
  const router = useRouter();
  const [headerNotice, setHeaderNotice] = useState<string | null>(null);

  const searchPlaceholder =
    role === 'admin'
      ? 'Search residents, rooms, reports'
      : role === 'chef'
      ? 'Search meals, inventory, plans'
      : 'Search payments, meals, profile';

  const handleSignOut = () => {
    const confirmed = window.confirm('Sign out of this session?');
    if (!confirmed) return;
    router.push('/login');
  };

  const goToProfileSettings = () => {
    if (role === 'admin') {
      router.push(`/dashboard/${tier}/settings`);
      return;
    }

    if (role === 'tenant') {
      router.push('/dashboard/tenants/profile');
      return;
    }

    router.push('/dashboard/chef');
  };

  const goToOrganization = () => {
    if (role === 'admin') {
      router.push(`/dashboard/${tier}/dorms`);
      return;
    }

    if (role === 'tenant') {
      router.push('/dashboard/tenants');
      return;
    }

    router.push('/dashboard/chef/plan');
  };

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 md:px-6 md:pt-5">
      <div className="mx-auto max-w-[1680px]">
        <div className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white/72 p-2.5 shadow-[0_12px_28px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_12px_28px_rgba(2,6,23,0.28)] md:p-3">
          <div className="px-2 text-sm font-semibold text-foreground sm:hidden">Dashboard</div>

          <div className="relative hidden min-w-0 flex-1 sm:block">
            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400 dark:text-slate-400">
              <Search className="h-4 w-4" />
            </div>

            <Input
              placeholder={searchPlaceholder}
              className="h-11 rounded-xl border-black/5 bg-white/78 pl-12 pr-20 text-sm font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-all hover:bg-white focus-visible:ring-4 focus-visible:ring-primary/10 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-100 dark:placeholder:text-slate-400 dark:hover:bg-white/[0.08] dark:focus-visible:ring-primary/20"
            />

            <div className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 items-center gap-1.5 rounded-lg border border-black/5 bg-white px-2 py-1 text-[11px] font-semibold text-slate-500 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 lg:flex">
              <Command className="h-3.5 w-3.5" />
              <span>K</span>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />

            <Button
              variant="ghost"
              size="icon"
              className="relative h-11 w-11 rounded-xl text-slate-500 transition-all hover:bg-black/[0.04] hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/[0.08] dark:hover:text-white"
              onClick={() => setHeaderNotice('Notifications are up to date. No new alerts right now.')}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full border-2 border-white bg-primary dark:border-[#11192b]" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex cursor-pointer items-center gap-2 rounded-xl border border-black/5 bg-white/78 px-2.5 py-2 shadow-[0_8px_18px_rgba(15,23,42,0.05)] transition-all hover:border-primary/20 dark:border-white/10 dark:bg-white/[0.05] dark:hover:border-primary/25">
                  <Avatar className="h-9 w-9 border border-black/5 shadow-sm dark:border-white/10">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">Sv</AvatarFallback>
                  </Avatar>

                  <div className="hidden min-w-0 lg:block">
                    <p className="truncate text-sm font-semibold leading-tight text-foreground">Saravuth</p>
                    <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      {tier} Plan
                    </p>
                  </div>

                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-56 rounded-[1.25rem] border border-black/5 bg-popover/88 p-2 shadow-2xl backdrop-blur-2xl dark:border-white/10"
              >
                <DropdownMenuLabel className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground/70">
                  Global Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/40" />
                <DropdownMenuItem
                  onSelect={goToProfileSettings}
                  className="cursor-pointer rounded-xl px-3 py-3 text-sm font-semibold"
                >
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={goToOrganization}
                  className="cursor-pointer rounded-xl px-3 py-3 text-sm font-semibold"
                >
                  Organization
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/40" />
                <DropdownMenuItem
                  onSelect={handleSignOut}
                  className="cursor-pointer rounded-xl px-3 py-3 text-sm font-bold text-destructive focus:bg-destructive/5 focus:text-destructive"
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {headerNotice ? (
          <p className="mt-2 px-2 text-xs font-semibold text-muted-foreground">
            {headerNotice}
          </p>
        ) : null}
      </div>
    </header>
  );
}
