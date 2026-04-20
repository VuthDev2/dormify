'use client';

import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Plus,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Column<T> {
  header: string;
  accessor: keyof T | string;
  cell?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  title: string;
  description: string;
  columns: Column<T>[];
  data: T[];
  tier: 'normal' | 'pro' | 'premium';
  actionLabel?: string;
}

export function DataTable<T>({ title, description, columns, data, tier, actionLabel }: DataTableProps<T>) {
  const isPremium = tier === 'premium';

  return (
    <div className="space-y-6 animate-in fade-in duration-500">

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight text-foreground">{title}</h2>
          <p className="text-sm font-medium text-muted-foreground">{description}</p>
        </div>
        {actionLabel && (
          <Button className={cn(
            "rounded-xl h-11 px-6 font-bold shadow-lg transition-all active:scale-95 text-white",
            tier === 'premium' ? "bg-primary hover:bg-primary/90 shadow-primary/20" :
            tier === 'pro' ? "bg-primary/80 hover:bg-primary/90 shadow-primary/10" :
            "bg-primary text-primary-foreground shadow-primary/10"
          )}>
            <Plus className="w-4 h-4 mr-2" /> {actionLabel}
          </Button>
        )}
      </div>

      <Card className={cn(
        "overflow-hidden border-border/40 shadow-sm rounded-2xl bg-card transition-all flex flex-col max-h-[calc(100vh-250px)]",
        tier !== 'normal' ? "shadow-2xl shadow-primary/5" : ""
      )}>

        <div className="p-4 flex flex-col sm:flex-row items-center gap-4 border-b border-border/40 bg-muted/30">
          <div className="relative flex-1 w-full sm:max-w-sm group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
              <Search className={cn(
                "w-4 h-4 transition-all duration-300",
                tier === 'premium' ? "text-primary group-focus-within:scale-110" : "text-muted-foreground group-focus-within:text-primary"
              )} />
            </div>
            <Input
              placeholder="Search records..."
              className={cn(
                "pl-10 h-11 transition-all text-sm font-medium shadow-sm",
                tier === 'premium'
                  ? "bg-foreground/5 border-foreground/10 hover:bg-foreground/10 focus:bg-foreground/15 backdrop-blur-2xl rounded-xl"
                  : tier === 'pro'
                  ? "bg-foreground/5 border-foreground/5 hover:bg-foreground/10 focus:bg-foreground/15 backdrop-blur-2xl rounded-xl"
                  : "bg-muted border-border rounded-xl focus:bg-background"
              )}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" className="rounded-xl h-10 px-4 border-border text-muted-foreground gap-2 hover:bg-muted">
              <Filter className="w-4 h-4" /> Filters
            </Button>
            <Button variant="outline" size="icon" className="rounded-xl h-10 w-10 border-border text-muted-foreground hover:bg-muted ml-auto sm:ml-0">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="overflow-auto flex-1 scrollbar-thin scrollbar-thumb-border/40 scrollbar-track-transparent">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-card border-b border-border/40">
              <tr className="border-b border-border/40">
                {columns.map((col, i) => (
                  <th key={i} className="p-3 pl-6 text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 bg-muted/50">
                    <div className="flex items-center gap-2 cursor-pointer hover:text-foreground transition-colors">
                      {col.header}
                      <ArrowUpDown className="w-3 h-3 opacity-30" />
                    </div>
                  </th>
                ))}
                <th className="p-3 pr-6 bg-muted/50"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {data.map((item, i) => (
                <tr key={i} className="group hover:bg-primary/5 transition-colors">
                  {columns.map((col, j) => (
                    <td key={j} className="p-3 pl-6 text-sm">
                      {col.cell ? col.cell(item) : (
                        <span className="font-semibold text-foreground/80">{(item as any)[col.accessor]}</span>
                      )}
                    </td>
                  ))}
                  <td className="p-3 pr-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-background border border-transparent hover:border-border/40">
                          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-xl p-1 border-border/40 shadow-xl">
                        <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 px-3 py-2">Row Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="rounded-lg cursor-pointer py-2 px-3 font-semibold text-sm">View details</DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg cursor-pointer py-2 px-3 font-semibold text-sm">Edit record</DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg cursor-pointer py-2 px-3 font-bold text-sm text-destructive focus:text-destructive focus:bg-destructive/10">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-border/40 bg-muted/10 flex items-center justify-between">
           <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">
             Showing <span className="text-foreground">1-{data.length}</span> of <span className="text-foreground">1,240</span> records
           </p>
           <div className="flex items-center gap-1">
             <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground/40 disabled:opacity-20" disabled>
               <ChevronLeft className="w-4 h-4" />
             </Button>
             <div className="flex items-center gap-1">
               {[1, 2, 3].map(p => (
                 <Button key={p} variant={p === 1 ? "secondary" : "ghost"} className={cn(
                   "h-8 w-8 rounded-lg text-xs font-bold transition-all",
                   p === 1
                     ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
                     : "text-muted-foreground hover:bg-muted"
                 )}>
                   {p}
                 </Button>
               ))}
             </div>
             <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground/40">
               <ChevronRight className="w-4 h-4" />
             </Button>
           </div>
        </div>
      </Card>
    </div>
  );
}
