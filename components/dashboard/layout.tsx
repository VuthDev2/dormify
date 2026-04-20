'use client';

import { ReactNode } from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
  role: 'admin' | 'tenant' | 'chef';
  tier?: 'normal' | 'pro' | 'premium';
}

export function DashboardLayout({ children, role, tier = 'normal' }: DashboardLayoutProps) {
  const isNormal = tier === 'normal';

  return (
    <div className="relative flex h-screen overflow-hidden bg-slate-50 dark:bg-[#020617] selection:bg-primary/15">
      <div className="pointer-events-none absolute inset-0">
        <div className={cn(
          "absolute inset-0 transition-all duration-1000",
          isNormal 
            ? "bg-slate-100/40 dark:bg-[#020617]/50" 
            : "bg-[radial-gradient(900px_520px_at_-10%_-10%,rgba(99,102,241,0.12),transparent),radial-gradient(900px_640px_at_110%_0%,rgba(14,165,233,0.08),transparent),linear-gradient(180deg,#f8fafc_0%,#f1f5f9_42%,#f8fafc_100%)] dark:bg-[radial-gradient(1000px_600px_at_0%_0%,rgba(29,78,216,0.12),transparent),radial-gradient(800px_600px_at_100%_0%,rgba(30,58,138,0.15),transparent),linear-gradient(180deg,#020617_0%,#070e1b_50%,#01040a_100%)]"
        )} />
        <div className={cn(
          "absolute inset-0 transition-all duration-1000",
          isNormal 
            ? "opacity-[0.15] [background-image:linear-gradient(rgba(15,23,42,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.02)_1px,transparent_1px)] [background-size:32px_32px]"
            : "opacity-[0.35] [background-image:linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)] [background-size:28px_28px] dark:opacity-[0.05] dark:[background-image:linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)]"
        )} />
        {!isNormal && <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/80 via-white/20 to-transparent dark:from-blue-600/[0.03] dark:via-transparent" />}
      </div>

      <div className="relative z-10 flex w-full min-w-0">
        <Sidebar role={role} tier={tier} />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header role={role} tier={tier} />
          <main className="relative flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-[1680px] px-4 pb-6 pt-1 md:px-6 md:pb-8">
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
