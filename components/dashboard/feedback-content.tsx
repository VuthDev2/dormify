'use client';

import { Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface FeedbackContentProps {
  title: string;
}

export function FeedbackContent({ title }: FeedbackContentProps) {
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
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground font-medium">Real-time sentiment and culinary performance metrics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-8 border-border/40 bg-card rounded-[2rem] shadow-sm flex items-center justify-between">
           <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Average Rating</p>
              <h3 className="text-4xl font-black tracking-tight text-foreground">{stats.avg}<span className="text-xs text-muted-foreground/40 font-bold ml-1">/ 5.0</span></h3>
           </div>
           <div className="p-4 rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="w-8 h-8 fill-primary/20" />
           </div>
        </Card>
        <Card className="p-8 border-border/40 bg-card rounded-[2rem] shadow-sm">
           <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-1">Weekly Sentiment</p>
           <h3 className="text-3xl font-black tracking-tight text-emerald-500">{stats.sentiment}</h3>
           <p className="text-[10px] font-bold text-muted-foreground/40 mt-1">Based on {stats.total} reviews</p>
        </Card>
        <Card className="p-8 border-border/40 bg-card rounded-[2rem] shadow-sm">
           <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-1">Quality Trend</p>
           <h3 className="text-3xl font-black tracking-tight text-blue-500">+4.2%</h3>
           <p className="text-[10px] font-bold text-muted-foreground/40 mt-1">Increasing steadily</p>
        </Card>
      </div>

      <div className="grid gap-4">
        {feedbackData.map((f) => (
          <Card key={f.id} className="p-6 border-border/40 bg-card rounded-3xl hover:border-primary/20 transition-all group shadow-sm">
             <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-5">
                   <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center font-black text-xs text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      {f.user.charAt(0)}
                   </div>
                   <div className="space-y-1">
                      <div className="flex items-center gap-3">
                         <p className="text-sm font-black text-foreground">{f.user}</p>
                         <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">{f.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground font-medium leading-relaxed italic">"{f.comment}"</p>
                      <div className="flex items-center gap-2 pt-1">
                         <Badge variant="outline" className="text-[9px] font-bold border-border bg-muted/20 text-muted-foreground uppercase">{f.dish}</Badge>
                      </div>
                   </div>
                </div>
                <div className="flex gap-1">
                   {[1,2,3,4,5].map(s => (
                     <div key={s} className={cn("w-2 h-2 rounded-full transition-colors", s <= f.rating ? "bg-primary" : "bg-muted")} />
                   ))}
                </div>
             </div>
          </Card>
        ))}
      </div>    </div>
  );
}
