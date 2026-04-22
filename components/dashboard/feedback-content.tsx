'use client';

import { Sparkles, Plus, Activity, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface FeedbackContentProps {
  title: string;
  role?: 'admin' | 'tenant' | 'chef';
}

export function FeedbackContent({ title, role = 'admin' }: FeedbackContentProps) {
  const isChef = role === 'chef';
  const feedbackData = [
    { id: '1', user: 'Sarah Johnson', dish: 'Harvest Grain Bowl', rating: 5, comment: 'The salmon was perfectly cooked and seasoned.', time: '2h ago' },
    { id: '2', user: 'Alex Martinez', dish: 'Greek Souvlaki', rating: 5, comment: 'Loved the vegan options today. Very fresh!', time: '4h ago' },
    { id: '3', user: 'Jamie Lee', dish: 'Beef Curry', rating: 4, comment: 'A bit more spice in the curry next time please.', time: '1d ago' },
    { id: '4', user: 'Emma Wilson', dish: 'Breakfast Pastries', rating: 5, comment: 'The almond croissants were divine.', time: '1d ago' },
    { id: '5', user: 'James Porter', dish: 'Mediterranean Salad', rating: 3, comment: 'The pita was a bit cold.', time: '2d ago' },
  ];

  const stats = {
    avg: 4.8,
    total: 124,
    sentiment: 'Very Positive'
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700 w-full pb-12 px-1">
      {/* 1. Industrial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/40 pb-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
             <span className="flex h-1.5 w-1.5 rounded-full bg-primary" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/60">Culinary Intelligence</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground uppercase italic underline decoration-primary/30 underline-offset-8">
             Resident <span className="text-muted-foreground/30 font-medium not-italic no-underline">Sentiment</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-12 rounded-2xl font-black text-[10px] uppercase tracking-widest border-border/60 bg-card px-8">
              Sentiment Audit
           </Button>
        </div>
      </div>

      {/* 2. Sentiment Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <Card className="p-8 border-border/40 bg-card/50 backdrop-blur-sm rounded-[2.5rem] shadow-sm group hover:shadow-xl transition-all duration-500 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none group-hover:bg-primary/10 transition-all" />
           <div className="relative z-10 space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 group-hover:text-primary transition-colors">Cumulative Rating</p>
              <div className="flex items-end gap-2">
                 <h3 className="text-5xl font-black tracking-tighter text-foreground">{stats.avg}</h3>
                 <span className="text-sm text-muted-foreground/30 font-black mb-2 uppercase italic">/ 5.0 Precision</span>
              </div>
              <div className="flex gap-1.5 pt-2">
                 {[1,2,3,4,5].map(s => (
                   <div key={s} className={cn("h-1.5 flex-1 rounded-full", s <= 4 ? "bg-primary shadow-[0_0_8px_rgba(37,99,235,0.4)]" : "bg-muted/30")} />
                 ))}
              </div>
           </div>
        </Card>

        <Card className="p-8 border-border/40 bg-card rounded-[2.5rem] shadow-sm relative overflow-hidden group border-dashed hover:border-solid hover:border-border/60 transition-all duration-500">
           <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 group-hover:text-emerald-500 transition-colors mb-4">Sentiment Vector</p>
           <h3 className="text-3xl font-black tracking-tight text-emerald-500 italic uppercase underline underline-offset-4 decoration-emerald-500/20">{stats.sentiment}</h3>
           <div className="flex items-center gap-2 mt-4">
              <Badge className="bg-emerald-500/10 text-emerald-600 border-none font-black text-[9px] px-2.5">OPTIMIZED</Badge>
              <p className="text-[10px] font-bold text-muted-foreground/30 uppercase tracking-widest">Across {stats.total} samples</p>
           </div>
        </Card>

        <Card className="p-8 bg-primary/5 dark:bg-card border border-primary/10 dark:border-border rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
           <p className="text-[10px] font-black uppercase tracking-widest text-primary/80 mb-4">Velocity Trend</p>
           <h3 className="text-4xl font-black tracking-tight text-foreground italic">+4.2% <span className="text-sm not-italic opacity-30 font-medium tracking-normal ml-1">GROWTH</span></h3>
           <div className="flex items-center gap-4 mt-6">
              <div className="flex-1 h-1 bg-muted/20 rounded-full overflow-hidden">
                 <div className="h-full w-[85%] bg-primary shadow-[0_0_12px_rgba(37,99,235,0.6)]" />
              </div>
              <span className="text-[10px] font-black text-primary/80 uppercase tracking-widest">Bullish</span>
           </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
         {/* Live Feedback Feed */}
         <div className="xl:col-span-8 space-y-6">
            <div className="flex items-center justify-between px-2">
               <h3 className="text-xl font-black tracking-tight uppercase italic text-foreground">Culinary Feedback <span className="text-muted-foreground/30 not-italic font-medium">— Live Stream</span></h3>
               <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest text-primary">Filter Stream</Button>
            </div>
            <div className="grid gap-4">
              {feedbackData.map((f) => (
                <Card key={f.id} className="p-8 border-border/40 bg-card rounded-[2.5rem] hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group border-dashed hover:border-solid hover:border-primary/20">
                   <div className="flex items-start justify-between gap-6">
                      <div className="flex items-start gap-6">
                         <div className="w-14 h-14 rounded-2xl bg-muted/30 border border-border/40 flex items-center justify-center font-black text-sm text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-all duration-500">
                            {f.user.charAt(0)}
                         </div>
                         <div className="space-y-2">
                            <div className="flex items-center gap-4">
                               <p className="text-sm font-black text-foreground uppercase tracking-tight">{f.user}</p>
                               <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                               <span className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest">{f.time}</span>
                            </div>
                            <p className="text-sm text-muted-foreground/80 font-medium leading-relaxed italic pr-4 border-l-2 border-primary/10 pl-4 py-1">
                               "{f.comment}"
                            </p>
                            <div className="flex items-center gap-3 pt-4">
                               <Badge className="text-[9px] font-black px-3 py-1.5 border-none bg-blue-500/10 text-blue-600 shadow-sm uppercase tracking-widest">{f.dish}</Badge>
                               <span className="text-[9px] font-black text-muted-foreground/30 uppercase tracking-[0.2em] italic">Post-Service Audit</span>
                            </div>
                         </div>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                         <div className="flex gap-1">
                            {[1,2,3,4,5].map(s => (
                              <div key={s} className={cn(
                                 "w-2.5 h-2.5 rounded-full transition-all duration-500", 
                                 s <= f.rating ? "bg-primary shadow-[0_0_8px_rgba(37,99,235,0.4)]" : "bg-muted/30 group-hover:bg-muted/50"
                              )} />
                            ))}
                         </div>
                         <span className={cn(
                            "text-[10px] font-black uppercase tracking-widest",
                            f.rating >= 4 ? "text-emerald-500" : f.rating === 3 ? "text-amber-500" : "text-rose-500"
                         )}>
                            {f.rating >= 4 ? 'Optimal' : f.rating === 3 ? 'Caution' : 'Critical'}
                         </span>
                      </div>
                   </div>
                </Card>
              ))}
            </div>
         </div>

         {/* Dish Performance Metrics */}
         <div className="xl:col-span-4 space-y-8">
            <Card className="p-10 rounded-[3rem] border-border/40 bg-card shadow-sm space-y-12">
               <div className="space-y-1">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/60">Menu Performance</h4>
                  <p className="text-lg font-black italic">Signature Rank</p>
               </div>
               
               <div className="space-y-10">
                  {[
                    { dish: 'Harvest Grain Bowl', score: 98, trend: 'up' },
                    { dish: 'Spiced Salmon Fillet', score: 92, trend: 'up' },
                    { dish: 'Beef Bourguignon', score: 84, trend: 'neutral' },
                    { dish: 'Mediterranean Pasta', score: 76, trend: 'down' },
                  ].map((dish, i) => (
                    <div key={i} className="space-y-4 group/d">
                       <div className="flex justify-between items-end">
                          <div className="space-y-1">
                             <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 group-hover/d:text-primary transition-colors">{dish.dish}</p>
                             <p className="text-2xl font-black text-foreground italic">{dish.score}<span className="text-[10px] text-muted-foreground/30 not-italic ml-1 font-medium">INDEX</span></p>
                          </div>
                          <Badge variant="outline" className={cn(
                             "text-[8px] font-black uppercase border-none",
                             dish.trend === 'up' ? "bg-emerald-500/10 text-emerald-600" :
                             dish.trend === 'down' ? "bg-rose-500/10 text-rose-600" : "bg-muted/10 text-muted-foreground/60"
                          )}>
                             {dish.trend === 'up' ? 'Rising' : dish.trend === 'down' ? 'Declining' : 'Stable'}
                          </Badge>
                       </div>
                       <div className="h-1.5 w-full bg-muted/20 rounded-full overflow-hidden shadow-inner">
                          <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${dish.score}%` }}
                             transition={{ duration: 1.5, delay: i * 0.1 }}
                             className={cn(
                                "h-full rounded-full shadow-sm",
                                dish.score >= 90 ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" :
                                dish.score >= 80 ? "bg-primary shadow-[0_0_8px_rgba(37,99,235,0.4)]" : "bg-amber-500"
                             )} 
                          />
                       </div>
                    </div>
                  ))}
               </div>
            </Card>

            <Card className="p-8 bg-primary/5 dark:bg-card border border-primary/10 dark:border-border rounded-[3rem] text-center space-y-6 shadow-2xl relative overflow-hidden group">
               <div className="relative z-10 space-y-6">
                  <Badge className="bg-primary/10 text-primary border-none text-[8px] font-black tracking-widest uppercase px-3 py-1">Resident Insights</Badge>
                  <div className="space-y-1">
                     <h4 className="text-2xl font-black text-foreground italic">Sentiment AI</h4>
                     <p className="text-[10px] text-muted-foreground/60 font-medium">94% Core Satisfaction rate detected</p>
                  </div>
                  <p className="text-[11px] text-muted-foreground/80 font-medium leading-relaxed italic">
                     "Residents are highly engaged with seasonal greens. Recommend maintaining current supplier."
                  </p>
                  <Button variant="outline" className="w-full h-12 rounded-2xl border-border/40 text-foreground font-black text-[10px] uppercase tracking-widest hover:bg-muted/30 transition-all">Generate Strategy</Button>
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
