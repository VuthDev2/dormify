'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { DataTable } from './data-table';

interface InventoryContentProps {
  title: string;
}

export function InventoryContent({ title }: InventoryContentProps) {
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
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground font-medium">Manage and track kitchen inventory levels.</p>
        </div>
        <Button className="rounded-2xl h-12 px-6 font-black bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all uppercase text-[10px] tracking-widest">
          <Plus className="w-4 h-4 mr-2" /> Add Inventory Item
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 border-border/40 bg-card rounded-[1.5rem] shadow-sm">
           <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">Total Items</p>
           <h3 className="text-2xl font-black tracking-tight text-foreground">142</h3>
        </Card>
        <Card className="p-6 border-border/40 bg-card rounded-[1.5rem] shadow-sm">
           <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">Low Stock Alerts</p>
           <h3 className="text-2xl font-black tracking-tight text-primary">8</h3>
        </Card>
        <Card className="p-6 border-border/40 bg-card rounded-[1.5rem] shadow-sm">
           <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">Critical Restock</p>
           <h3 className="text-2xl font-black tracking-tight text-rose-600">3</h3>
        </Card>
        <Card className="p-6 border-border/40 bg-card rounded-[1.5rem] shadow-sm">
           <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">Active POs</p>
           <h3 className="text-2xl font-black tracking-tight text-blue-600">5</h3>
        </Card>
      </div>

      <Card className="border-border/40 bg-card rounded-[2rem] shadow-sm overflow-hidden">
        <DataTable data={stockItems} columns={columns} />
      </Card>
    </div>
  );
}
