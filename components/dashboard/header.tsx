'use client';

import { Bell, Search, ChevronDown, Command } from 'lucide-react';
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
import { cn } from '@/lib/utils';

interface HeaderProps {
  role: 'admin' | 'tenant' | 'chef';
  tier?: 'normal' | 'pro' | 'premium';
}

export function Header({ role, tier = 'normal' }: HeaderProps) {
  const isChef = role === 'chef';
  const isTenant = role === 'tenant';
  const isAdmin = role === 'admin';

  const searchPlaceholder =
    role === 'admin'
      ? 'Search residents, rooms, reports'
      : role === 'chef'
      ? 'Search meals, inventory, plans'
      : 'Search payments, meals, profile';

  return (
    <header className="sticky top-0 z-40 transition-all duration-500 px-6 py-4">
      <div className="w-full flex items-center justify-between gap-8 transition-all duration-500 bg-muted/10 backdrop-blur-3xl border border-border/40 rounded-[2rem] px-6 h-16 shadow-2xl shadow-primary/5">
        <div className="flex-1 max-w-md relative group hidden sm:block">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
            <div className="p-2 text-muted-foreground group-focus-within:text-foreground transition-colors">
              <Search className="w-4 h-4" />
            </div>
          </div>

          <Input
            placeholder={searchPlaceholder}
            className="w-full pl-12 transition-all duration-300 text-sm font-semibold tracking-tight bg-muted/50 border-border h-10 rounded-lg focus:bg-background placeholder:text-muted-foreground/50 shadow-none pr-16"
          />

          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden items-center gap-1.5 rounded-lg border border-border/40 bg-muted/50 px-2 py-1 text-[10px] font-semibold text-muted-foreground group-focus-within:bg-background lg:flex transition-all">
            <Command className="h-3 w-3" />
            <span>K</span>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />

          <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl text-muted-foreground hover:bg-muted transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-primary border-2 border-background"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 pl-4 border-l border-border/40 transition-all group cursor-pointer">
                <Avatar className={cn(
                  "h-9 w-9 border-2 shadow-sm transition-all",
                  tier === 'premium' ? "border-primary/20 group-hover:border-primary/60" : "border-border/40 group-hover:border-primary/40"
                )}>
                  <AvatarFallback className="bg-primary/5 text-primary font-bold text-xs">
                    {isChef ? 'CH' : isTenant ? 'SA' : 'SV'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col hidden lg:flex">
                  <p className="text-sm font-bold leading-tight text-foreground">
                    {isChef ? 'Chef Marco' : isTenant ? 'Sarah J.' : 'Saravuth'}
                  </p>
                  <p className={cn(
                    "text-[10px] font-bold uppercase tracking-wider capitalize",
                    tier === 'premium' ? "text-primary/70" : tier === 'pro' ? "text-primary/60" : "text-muted-foreground/60"
                  )}>
                    {isAdmin ? `${tier} Plan` : isChef ? 'Head Chef' : 'Resident'}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-[1.5rem] p-2 shadow-2xl border-border/40 bg-popover/80 backdrop-blur-2xl">
              <DropdownMenuLabel className="font-bold text-xs uppercase tracking-widest text-muted-foreground/70 px-3 py-2">Global Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/40" />
              <DropdownMenuItem className="rounded-xl cursor-pointer py-3 px-3 font-semibold text-sm">Profile Settings</DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl cursor-pointer py-3 px-3 font-semibold text-sm">
                {isChef ? 'Kitchen Settings' : isTenant ? 'Room Details' : 'Organization'}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/40" />
              <DropdownMenuItem className="rounded-xl cursor-pointer py-3 px-3 font-bold text-sm text-destructive focus:text-destructive focus:bg-destructive/5">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
