'use client';

import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { DataTable } from './data-table';

interface InventoryContentProps {
  title: string;
  role?: 'admin' | 'tenant' | 'chef';
}

export function InventoryContent({ title, role = 'admin' }: InventoryContentProps) {
  const isChef = role === 'chef';
  const stockItems = [
    { id: '1', name: 'Organic Whole Milk', category: 'Dairy', stock: '12%', status: 'Critical', lastRestock: '2d ago' },
    { id: '2', name: 'Unsalted Butter', category: 'Dairy', stock: '18%', status: 'Low', lastRestock: '4d ago' },
    { id: '3', name: 'Prime Ribeye', category: 'Proteins', stock: '24%', status: 'Low', lastRestock: '1d ago' },
    { id: '4', name: 'Seasonal Greens', category: 'Produce', stock: '62%', status: 'Healthy', lastRestock: 'Today' },
    { id: '5', name: 'Sourdough Loaves', category: 'Bakery', stock: '45%', status: 'Healthy', lastRestock: '1d ago' },
  ];

  const columns = [
    { header: 'Item Name', accessor: 'name', cell: (item: any) => <span className="font-bold text-foreground">{item.name}</span> },
    { header: 'Category', accessor: 'category' },
    { 
      header: 'Stock Level', 
      accessor: 'stock',
      cell: (item: any) => (
        <div className="flex items-center gap-3 w-32">
          <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden">
            <div className={cn(
              "h-full rounded-full transition-all duration-1000",
              item.status === 'Critical' ? "bg-rose-500" : item.status === 'Low' ? "bg-primary" : "bg-emerald-500"
            )} style={{ width: item.stock }} />          </div>
          <span className="text-[10px] font-bold text-muted-foreground">{item.stock}</span>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (item: any) => (
        <Badge className={cn(
          "text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border-none",
          item.status === 'Critical' ? "bg-rose-500/10 text-rose-600" : 
          item.status === 'Low' ? "bg-primary/10 text-primary" : "bg-emerald-500/10 text-emerald-600"
        )}>{item.status}</Badge>
      )    },
    { header: 'Last Restock', accessor: 'lastRestock' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700 w-full pb-12 px-1">
      {/* 1. Professional Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/40 pb-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
             <span className="flex h-1.5 w-1.5 rounded-full bg-primary" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/60">Supply Chain Control</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground uppercase italic underline decoration-primary/30 underline-offset-8">
             {isChef ? 'Kitchen' : 'System'} <span className="text-muted-foreground/30 font-medium not-italic no-underline">Inventory</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-12 rounded-2xl font-black text-[10px] uppercase tracking-widest border-border/60 bg-card px-8">
              Audit Log
           </Button>
           <Button className="h-12 rounded-2xl font-black text-[10px] uppercase tracking-widest bg-primary text-white px-8 shadow-xl shadow-primary/20">
              <Plus className="w-4 h-4 mr-2" /> Add Item
           </Button>
        </div>
      </div>

      {/* 2. Industrial Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Stocked Units', value: '142', sub: 'Active SKUs', color: 'text-foreground' },
          { label: 'Low Stock', value: '8', sub: 'Requires Review', color: 'text-primary' },
          { label: 'Critical Depletion', value: '3', sub: 'Immediate Action', color: 'text-rose-500' },
          { label: 'Inbound POs', value: '5', sub: 'Expected Today', color: 'text-blue-500' },
        ].map((stat, i) => (
          <Card key={i} className="p-8 border-border/40 bg-card/50 backdrop-blur-sm rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 group border-dashed hover:border-solid hover:border-border/60">
             <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 group-hover:text-primary transition-colors mb-2">{stat.label}</p>
             <h3 className={cn("text-4xl font-black tracking-tighter", stat.color)}>{stat.value}</h3>
             <p className="text-[10px] font-bold text-muted-foreground/30 mt-1 uppercase tracking-widest">{stat.sub}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
         {/* Main Data Table */}
         <div className="xl:col-span-8">
            <Card className="border-border/40 bg-card rounded-[3rem] shadow-sm overflow-hidden min-h-[500px]">
               <div className="p-8 border-b border-border/10 flex justify-between items-center">
                  <h3 className="text-xl font-black tracking-tight uppercase italic">Stock Management <span className="text-muted-foreground/30 not-italic font-medium">— Live Ledger</span></h3>
                  <Badge variant="outline" className="text-[9px] font-black border-border/40 text-muted-foreground/60">UPDATED 2M AGO</Badge>
               </div>
               <div className="p-2">
                  <DataTable 
                     data={stockItems} 
                     columns={columns} 
                     title="Kitchen Ledger" 
                     description="Live tracking of essential kitchen supplies." 
                     tier="pro" 
                  />
               </div>
            </Card>
         </div>

         {/* Category Health Sidebar */}
         <div className="xl:col-span-4 space-y-8">
            <Card className="p-10 rounded-[3rem] border-border/40 bg-card shadow-sm space-y-10">
               <div className="space-y-1">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/60">Category Pulse</h4>
                  <p className="text-lg font-black italic">Supply Health</p>
               </div>
               <div className="space-y-8">
                  {[
                    { label: 'Dairy & Eggs', pct: 42, status: 'Critical' },
                    { label: 'Proteins', pct: 28, status: 'Low' },
                    { label: 'Fresh Produce', pct: 85, status: 'Optimal' },
                    { label: 'Dry Goods', pct: 92, status: 'Optimal' },
                  ].map((cat, i) => (
                    <div key={i} className="space-y-3 group/p">
                       <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                          <span className="text-muted-foreground group-hover/p:text-foreground transition-colors">{cat.label}</span>
                          <span className={cn(
                             cat.status === 'Critical' ? 'text-rose-500' : cat.status === 'Low' ? 'text-primary' : 'text-emerald-500'
                          )}>{cat.pct}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-muted/30 rounded-full overflow-hidden">
                          <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${cat.pct}%` }}
                             transition={{ duration: 1.5, delay: i * 0.1 }}
                             className={cn(
                                "h-full rounded-full shadow-sm",
                                cat.status === 'Critical' ? 'bg-rose-500' : cat.status === 'Low' ? 'bg-primary' : 'bg-emerald-500'
                             )} 
                          />
                       </div>
                    </div>
                  ))}
               </div>
            </Card>

            <Card className="p-8 bg-primary/5 dark:bg-card border border-primary/10 dark:border-border rounded-[3rem] space-y-6 relative overflow-hidden group">
               <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
                     <p className="text-[9px] font-black uppercase tracking-widest text-primary/80">Active Procurement</p>
                  </div>
                  <h4 className="text-xl font-black text-foreground italic">Inbound Status</h4>
                  <p className="text-xs text-muted-foreground/60 leading-relaxed font-medium">
                     5 Purchase Orders are currently in transit. Expected delivery window: 14:00 - 16:30 today.
                  </p>
                  <Button variant="outline" className="w-full h-12 rounded-2xl border-border/40 text-foreground font-black text-[10px] uppercase tracking-widest hover:bg-muted/30 transition-all">
                     View Delivery Map
                  </Button>
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
