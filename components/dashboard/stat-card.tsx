'use client';

import { LucideIcon, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Sparkline } from './charts';

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  tier: 'normal' | 'pro' | 'premium';
  sparklineData?: number[];
}

export function StatCard({ label, value, change, trend, icon: Icon, tier, sparklineData }: StatCardProps) {

  const trendColor = trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-rose-500' : 'text-muted-foreground';
  const TrendIcon = trend === 'up' ? ArrowUpRight : trend === 'down' ? ArrowDownRight : Minus;

  return (
    <Card className={cn(
      "flex flex-col justify-between p-5 transition-all duration-300 group relative overflow-hidden h-full",
      tier === 'premium'
        ? "bg-card border-border shadow-sm rounded-2xl hover:border-primary/40"
        : tier === 'pro'
        ? "bg-card border-border/60 rounded-xl hover:shadow-sm"
        : "bg-card border-border rounded-xl shadow-sm"
    )}>
      {sparklineData && (tier === 'premium' || tier === 'pro') && (
        <div className="absolute inset-x-0 bottom-0 h-12 pointer-events-none overflow-hidden opacity-30 grayscale group-hover:grayscale-0 transition-all">
          <Sparkline data={sparklineData} />
        </div>
      )}

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={cn(
          "w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300",
          tier === 'premium'
            ? "bg-primary/5 text-primary border border-primary/10 group-hover:bg-primary group-hover:text-primary-foreground"
            : tier === 'pro'
            ? "bg-muted text-muted-foreground group-hover:bg-primary/5 group-hover:text-primary"
            : "bg-muted text-muted-foreground"
        )}>
          <Icon className="w-4.5 h-4.5" />
        </div>
        {change && (
          <div className={cn(
            "flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md transition-colors",
            tier === 'premium' ? "bg-muted/50 border border-border" : "bg-muted/30",
            trendColor
          )}>
            <TrendIcon className="w-3 h-3" />
            {change}
          </div>
        )}
      </div>
      <div className="relative z-10">
        <h3 className="text-2xl font-black tracking-tight mb-0.5 text-foreground leading-none">{value}</h3>
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">{label}</p>
      </div>
    </Card>
  );
}
