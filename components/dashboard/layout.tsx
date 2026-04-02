'use client';

import { ReactNode } from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';

interface DashboardLayoutProps {
  children: ReactNode;
  role: 'admin' | 'tenant' | 'chef';
  tier?: 'normal' | 'pro' | 'premium';
}

export function DashboardLayout({ children, role, tier = 'normal' }: DashboardLayoutProps) {
  return (
    <div className="relative flex h-screen overflow-hidden bg-[#F6F7FB] selection:bg-primary/15 dark:bg-[#0b1120]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_-10%_-10%,rgba(99,102,241,0.12),transparent),radial-gradient(900px_640px_at_110%_0%,rgba(14,165,233,0.08),transparent),linear-gradient(180deg,#fbfcff_0%,#f4f6fb_42%,#eef2f8_100%)] dark:bg-[radial-gradient(780px_460px_at_0%_0%,rgba(56,189,248,0.16),transparent),radial-gradient(720px_420px_at_100%_0%,rgba(129,140,248,0.14),transparent),linear-gradient(180deg,#11192b_0%,#0f172a_44%,#0b1120_100%)]" />
        <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)] [background-size:28px_28px] dark:opacity-[0.08]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/80 via-white/20 to-transparent dark:from-white/[0.05] dark:via-transparent" />
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
