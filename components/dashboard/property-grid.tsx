'use client';

import {
  Building2,
  Search,
  Filter,
  MoreHorizontal,
  ArrowUpRight,
  Circle,
  Plus,
  Wifi,
  Droplets,
  Building,
  Layout,
  Shield,
  Zap,
  User,
  Clock,
  CheckCircle2,
  SprayCan,
  Wrench,
  AlertCircle,
  Eye,
  Download,
  Download as DownloadIcon,
  MapPin,
  TrendingUp,
  Home,
  AlertTriangle,
  Settings,
  ChevronDown
} from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Property {
  id: string;
  name: string;
  type: string;
  status: string;
  image: string;

  rent?: string;
  resident?: string;
  floor?: string;
  category?: string;
  housekeeping?: 'Clean' | 'Dirty' | 'Inspected' | 'Maintenance';
  maintenance?: 'none' | 'issue' | 'alert';
  lastChecked?: string;

  address?: string;
  manager?: string;
  campus?: string;
  occupancy?: string;
  yield?: string;
  tickets?: number;
  systems?: {
    power?: 'ok' | 'issue' | 'alert';
    water?: 'ok' | 'issue' | 'alert';
    security?: 'ok' | 'issue' | 'alert';
    wifi?: 'ok' | 'issue' | 'alert';
  };
}

interface PropertyGridProps {
  title: string;
  description: string;
  items: Property[];
  tier: 'normal' | 'pro' | 'premium';
  mode?: 'rooms' | 'dorms';
}

export function PropertyGrid({ title, description, items, tier, mode = 'rooms' }: PropertyGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDorm, setSelectedDorm] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  
  const isPremium = tier === 'premium';
  const isPro = tier === 'pro';
  const isNormal = tier === 'normal';

  // Enhanced data structure for multiple dorms
  const dormProperties = {
    'Manhattan Central': { campus: 'North Campus', color: 'from-blue-500' },
    'Brooklyn Wing': { campus: 'South Campus', color: 'from-purple-500' },
    'Times Square Court': { campus: 'East Campus', color: 'from-emerald-500' },
  };

  // Assign dorms to items based on name or distribute evenly
  const enrichedItems = items.map((item, idx) => ({
    ...item,
    dorm: item.floor?.includes('Floor') ? Object.keys(dormProperties)[idx % 3] : 'Manhattan Central'
  }));

  // Filtering logic
  const filteredItems = enrichedItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.resident?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFloor = selectedFloor === 'all' || item.floor === selectedFloor;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesDorm = selectedDorm === 'all' || item.dorm === selectedDorm;
    return matchesSearch && matchesFloor && matchesStatus && matchesDorm;
  });

  const groupedItems = filteredItems.reduce((acc: any, item) => {
    const group = item.floor || 'Unassigned';
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});

  const floorOrder = Object.keys(groupedItems).sort();
  
  const floors = [...new Set(enrichedItems.map(i => i.floor))].sort();
  const statuses = [...new Set(enrichedItems.map(i => i.status))];
  const dorms = [
    ...new Set(enrichedItems.map(i => i.dorm))
  ].sort();

  // Calculate statistics
  const calculateStats = (itemsToAnalyze = filteredItems) => {
    return {
      total: itemsToAnalyze.length,
      occupied: itemsToAnalyze.filter(i => i.status === 'Occupied').length,
      vacant: itemsToAnalyze.filter(i => i.status === 'Vacant').length,
      maintenance: itemsToAnalyze.filter(i => i.maintenance !== 'none').length,
      cleaning: itemsToAnalyze.filter(i => i.housekeeping === 'Dirty' || i.housekeeping === 'Maintenance').length,
      revenue: itemsToAnalyze.reduce((sum, i) => {
        const rent = parseInt(i.rent?.replace(/[$,]/g, '') || '0');
        return sum + rent;
      }, 0)
    };
  };

  const stats = calculateStats();
  const allStats = calculateStats(enrichedItems);

  // NORMAL TIER - Simple and clean
  if (isNormal && mode === 'rooms') {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tighter">{title}</h2>
            <p className="text-sm font-medium text-muted-foreground">{description}</p>
          </div>
          <Button className="rounded-xl h-9 px-4 font-black bg-primary text-primary-foreground shadow-lg shadow-primary/20 text-[10px] uppercase tracking-wider">
            <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Unit
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Card className="p-3 border-border/40 bg-card rounded-xl">
            <p className="text-[8px] font-black text-muted-foreground/40 uppercase mb-1">Total Units</p>
            <p className="text-2xl font-black">{allStats.total}</p>
          </Card>
          <Card className="p-3 border-border/40 bg-card rounded-xl">
            <p className="text-[8px] font-black text-muted-foreground/40 uppercase mb-1">Occupied</p>
            <p className="text-2xl font-black text-blue-500">{allStats.occupied}</p>
          </Card>
          <Card className="p-3 border-border/40 bg-card rounded-xl">
            <p className="text-[8px] font-black text-muted-foreground/40 uppercase mb-1">Vacant</p>
            <p className="text-2xl font-black text-emerald-500">{allStats.vacant}</p>
          </Card>
          <Card className="p-3 border-border/40 bg-card rounded-xl">
            <p className="text-[8px] font-black text-muted-foreground/40 uppercase mb-1">Issues</p>
            <p className="text-2xl font-black text-destructive">{allStats.maintenance}</p>
          </Card>
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
            <Search className="w-3.5 h-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <Input
            placeholder="Search by unit or resident..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-3 h-9 transition-all duration-500 text-xs font-bold shadow-sm bg-muted/30 border-border/40 rounded-xl focus:bg-background"
          />
        </div>

        <div className="space-y-10">
          {floorOrder.map((floor) => (
            <div key={floor} className="space-y-3">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-sm font-black tracking-tight">{floor}</h3>
                <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">{groupedItems[floor].length} Units</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {groupedItems[floor].map((item: any, i: number) => (
                  <div
                    key={i}
                    className="group relative bg-card border border-border/40 rounded-xl p-3 transition-all duration-300 hover:shadow-lg hover:border-primary/20 cursor-pointer"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-black">{item.name}</span>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md border-none",
                            item.status === 'Occupied' ? "bg-blue-500/10 text-blue-500" :
                            item.status === 'Vacant' ? "bg-emerald-500/10 text-emerald-500" :
                            item.status === 'Arriving' ? "bg-indigo-500/10 text-indigo-500" :
                            "bg-amber-500/10 text-amber-500"
                          )}
                        >
                          {item.status.slice(0, 3)}
                        </Badge>
                      </div>

                      <div className="text-[9px] font-bold text-muted-foreground truncate">{item.resident || 'Vacant'}</div>

                      <div className={cn(
                        "inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest",
                        item.housekeeping === 'Clean' ? "bg-emerald-500/10 text-emerald-600" :
                        item.housekeeping === 'Dirty' ? "bg-destructive/10 text-destructive" :
                        "bg-muted text-muted-foreground"
                      )}>
                        {item.housekeeping === 'Clean' ? <CheckCircle2 className="w-2.5 h-2.5" /> : <SprayCan className="w-2.5 h-2.5" />}
                        {item.housekeeping.slice(0, 4)}
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-xl" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // PRO TIER - Professional with good details
  if (isPro && mode === 'rooms') {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tighter">{title}</h2>
            <p className="text-sm font-medium text-muted-foreground">{description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl h-9 px-3 font-black text-xs uppercase tracking-wider border-border/40">
              <Filter className="w-3.5 h-3.5 mr-1.5" /> Filter
            </Button>
            <Button className="rounded-xl h-9 px-4 font-black bg-primary text-primary-foreground shadow-lg shadow-primary/20 text-[10px] uppercase tracking-wider">
              <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Unit
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <Card className="p-3 border-border/40 bg-card rounded-xl">
            <p className="text-[8px] font-bold text-muted-foreground/50 uppercase mb-1">Total</p>
            <p className="text-xl font-black">{allStats.total}</p>
          </Card>
          <Card className="p-3 border-border/40 bg-card rounded-xl">
            <p className="text-[8px] font-bold text-muted-foreground/50 uppercase mb-1">Occupied</p>
            <p className="text-xl font-black text-blue-500">{allStats.occupied}</p>
          </Card>
          <Card className="p-3 border-border/40 bg-card rounded-xl">
            <p className="text-[8px] font-bold text-muted-foreground/50 uppercase mb-1">Vacant</p>
            <p className="text-xl font-black text-emerald-500">{allStats.vacant}</p>
          </Card>
          <Card className="p-3 border-border/40 bg-card rounded-xl">
            <p className="text-[8px] font-bold text-muted-foreground/50 uppercase mb-1">Cleaning</p>
            <p className="text-xl font-black text-amber-500">{allStats.cleaning}</p>
          </Card>
          <Card className="p-3 border-border/40 bg-card rounded-xl">
            <p className="text-[8px] font-bold text-muted-foreground/50 uppercase mb-1">Maintenance</p>
            <p className="text-xl font-black text-destructive">{allStats.maintenance}</p>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
              <Search className="w-3.5 h-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <Input
              placeholder="Search rooms or residents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 h-10 transition-all duration-500 text-sm font-bold shadow-sm bg-muted/30 border-border/40 rounded-xl focus:bg-background focus:border-primary/40"
            />
          </div>
          
          <select
            value={selectedDorm}
            onChange={(e) => setSelectedDorm(e.target.value)}
            className="px-3 h-10 rounded-xl border border-border/40 bg-card text-foreground font-bold text-sm focus:border-primary/50 focus:outline-none transition-colors"
          >
            <option value="all">All Dorms</option>
            {dorms.map(dorm => (
              <option key={dorm} value={dorm}>{dorm}</option>
            ))}
          </select>
        </div>

        <div className="space-y-8">
          {floorOrder.map((floor) => (
            <div key={floor} className="space-y-4">
              <div className="flex items-center justify-between px-3 pb-3 border-b-2 border-border/20">
                <div className="flex items-baseline gap-3">
                  <h3 className="text-lg font-black tracking-tight">{floor}</h3>
                  <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">{groupedItems[floor].length} Units</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[9px] font-bold uppercase text-muted-foreground/60">Occupied: {groupedItems[floor].filter((r: any) => r.status === 'Occupied').length}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-slate-400" />
                    <span className="text-[9px] font-bold uppercase text-muted-foreground/60">Vacant: {groupedItems[floor].filter((r: any) => r.status === 'Vacant').length}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedItems[floor].map((item: any, i: number) => (
                  <Card key={i} className="group border-border/40 bg-card rounded-2xl p-5 hover:shadow-xl hover:border-primary/20 transition-all hover:-translate-y-1 cursor-pointer overflow-hidden">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-2xl font-black tracking-tighter">{item.name}</h4>
                          <p className="text-[10px] font-bold text-muted-foreground/60 uppercase mt-1">{item.type}</p>
                        </div>
                        <Badge
                          className={cn(
                            "text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg border-none",
                            item.status === 'Occupied' ? "bg-blue-500/10 text-blue-500" :
                            item.status === 'Vacant' ? "bg-emerald-500/10 text-emerald-500" :
                            item.status === 'Arriving' ? "bg-indigo-500/10 text-indigo-500" :
                            "bg-amber-500/10 text-amber-500"
                          )}
                        >
                          {item.status}
                        </Badge>
                      </div>

                      <div className="pt-2 border-t border-border/20 space-y-3">
                        <div className="flex items-center gap-2 text-[11px] font-bold">
                          <User className="w-3.5 h-3.5 text-muted-foreground/50" />
                          <span className="text-foreground truncate">{item.resident || 'Unassigned'}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest",
                            item.housekeeping === 'Clean' ? "bg-emerald-500/10 text-emerald-600" :
                            item.housekeeping === 'Dirty' ? "bg-destructive/10 text-destructive" :
                            item.housekeeping === 'Inspected' ? "bg-primary/10 text-primary" :
                            "bg-amber-500/10 text-amber-500"
                          )}>
                            {item.housekeeping === 'Clean' || item.housekeeping === 'Inspected' ? <CheckCircle2 className="w-3 h-3" /> : <SprayCan className="w-3 h-3" />}
                            {item.housekeeping}
                          </div>

                          {item.maintenance !== 'none' && (
                            <div className={cn(
                              "flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest",
                              item.maintenance === 'alert' ? "bg-destructive/10 text-destructive" : "bg-amber-500/10 text-amber-500"
                            )}>
                              <Wrench className="w-3 h-3" />
                              Issue
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-[9px] font-bold text-muted-foreground/50 pt-1 border-t border-border/20">
                          <span>{item.rent}</span>
                          <span>{item.lastChecked}</span>
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 top-0 bg-background/0 group-hover:bg-background/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                      <Button size="sm" className="h-9 px-4 rounded-xl font-black text-[9px] uppercase tracking-widest bg-primary shadow-lg shadow-primary/20">
                        Manage
                      </Button>
                      <Button size="icon" variant="outline" className="h-9 w-9 rounded-xl bg-background border-border/40">
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // PREMIUM TIER - Professional with advanced features
  if (isPremium && mode === 'rooms') {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <h2 className="text-3xl font-black tracking-tighter">{title}</h2>
            <p className="text-sm font-medium text-muted-foreground max-w-xl">{description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl h-10 px-4 font-black text-xs uppercase tracking-wider border-border/40 hover:bg-muted/50">
              <Download className="w-3.5 h-3.5 mr-2" /> Export
            </Button>
            <Button className="rounded-xl h-10 px-4 font-black bg-primary text-primary-foreground shadow-lg shadow-primary/20 text-[10px] uppercase tracking-wider hover:bg-primary/90">
              <Plus className="w-3.5 h-3.5 mr-2" /> Add Unit
            </Button>
          </div>
        </div>

        {/* Advanced Statistics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <Card className="p-4 border-border/40 bg-linear-to-br from-blue-500/10 to-transparent rounded-xl">
            <p className="text-[8px] font-black text-blue-600/60 uppercase mb-2 tracking-widest">Total Units</p>
            <p className="text-3xl font-black text-blue-600 mb-1">{allStats.total}</p>
            <p className="text-[9px] font-bold text-muted-foreground/50">Across all dorms</p>
          </Card>
          <Card className="p-4 border-border/40 bg-linear-to-br from-emerald-500/10 to-transparent rounded-xl">
            <p className="text-[8px] font-black text-emerald-600/60 uppercase mb-2 tracking-widest">Occupied</p>
            <p className="text-3xl font-black text-emerald-600 mb-1">{allStats.occupied}</p>
            <p className="text-[9px] font-bold text-muted-foreground/50">{Math.round((allStats.occupied / allStats.total) * 100)}% occupancy</p>
          </Card>
          <Card className="p-4 border-border/40 bg-linear-to-br from-amber-500/10 to-transparent rounded-xl">
            <p className="text-[8px] font-black text-amber-600/60 uppercase mb-2 tracking-widest">Vacant</p>
            <p className="text-3xl font-black text-amber-600 mb-1">{allStats.vacant}</p>
            <p className="text-[9px] font-bold text-muted-foreground/50">Available now</p>
          </Card>
          <Card className="p-4 border-border/40 bg-linear-to-br from-primary/10 to-transparent rounded-xl">
            <p className="text-[8px] font-black text-primary/60 uppercase mb-2 tracking-widest">Cleaning</p>
            <p className="text-3xl font-black text-primary mb-1">{allStats.cleaning}</p>
            <p className="text-[9px] font-bold text-muted-foreground/50">In progress</p>
          </Card>
          <Card className="p-4 border-border/40 bg-linear-to-br from-destructive/10 to-transparent rounded-xl">
            <p className="text-[8px] font-black text-destructive/60 uppercase mb-2 tracking-widest">Maintenance</p>
            <p className="text-3xl font-black text-destructive mb-1">{allStats.maintenance}</p>
            <p className="text-[9px] font-bold text-muted-foreground/50">Urgent action</p>
          </Card>
          <Card className="p-4 border-border/40 bg-linear-to-br from-purple-500/10 to-transparent rounded-xl">
            <p className="text-[8px] font-black text-purple-600/60 uppercase mb-2 tracking-widest">Monthly Revenue</p>
            <p className="text-3xl font-black text-purple-600 mb-1">${(allStats.revenue / 1000).toFixed(0)}k</p>
            <p className="text-[9px] font-bold text-muted-foreground/50">Total projected</p>
          </Card>
        </div>

        {/* Advanced Filtering */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="md:col-span-2 relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
              <Search className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <Input
              placeholder="Search by room, resident, or dorm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-3 h-10 transition-all duration-500 text-sm font-semibold shadow-sm bg-muted/20 border-border/40 rounded-xl focus:bg-background focus:border-primary/50"
            />
          </div>

          <select
            value={selectedDorm}
            onChange={(e) => setSelectedDorm(e.target.value)}
            className="px-4 h-10 rounded-xl border border-border/40 bg-card text-foreground font-semibold text-sm focus:border-primary/50 focus:outline-none transition-colors"
          >
            <option value="all">All Properties</option>
            {dorms.map(dorm => (
              <option key={dorm} value={dorm}>{dorm}</option>
            ))}
          </select>

          <select
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(e.target.value)}
            className="px-4 h-10 rounded-xl border border-border/40 bg-card text-foreground font-semibold text-sm focus:border-primary/50 focus:outline-none transition-colors"
          >
            <option value="all">All Floors</option>
            {floors.map(floor => (
              <option key={floor} value={floor}>{floor}</option>
            ))}
          </select>
        </div>

        <div className="space-y-12">
          {floorOrder.map((floor) => {
            const floorStats = {
              occupied: groupedItems[floor].filter((r: any) => r.status === 'Occupied').length,
              vacant: groupedItems[floor].filter((r: any) => r.status === 'Vacant').length,
              arriving: groupedItems[floor].filter((r: any) => r.status === 'Arriving').length,
              departing: groupedItems[floor].filter((r: any) => r.status === 'Departing').length,
              totalRent: groupedItems[floor].reduce((sum: number, r: any) => {
                const rent = parseInt(r.rent?.replace(/[$,]/g, '') || '0');
                return sum + rent;
              }, 0),
              maintenance: groupedItems[floor].filter((r: any) => r.maintenance !== 'none').length,
              cleaning: groupedItems[floor].filter((r: any) => r.housekeeping === 'Dirty' || r.housekeeping === 'Maintenance').length
            };

            return (
              <div key={floor} className="space-y-5">
                <div className="flex items-center justify-between px-4 py-4 bg-linear-to-r from-primary/5 to-transparent rounded-2xl border border-border/30">
                  <div className="space-y-1">
                    <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
                      <Layout className="w-5 h-5 text-primary" />
                      {floor}
                    </h3>
                    <p className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest">{groupedItems[floor].length} Total Units</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-[9px] font-black uppercase text-muted-foreground/40 tracking-widest">Occupied</p>
                      <p className="text-lg font-black text-foreground">{floorStats.occupied}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase text-muted-foreground/40 tracking-widest">Vacant</p>
                      <p className="text-lg font-black text-emerald-500">{floorStats.vacant}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase text-muted-foreground/40 tracking-widest">Issues</p>
                      <p className="text-lg font-black text-destructive">{floorStats.maintenance}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase text-muted-foreground/40 tracking-widest">Revenue</p>
                      <p className="text-lg font-black text-primary">${(floorStats.totalRent / 1000).toFixed(1)}k</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {groupedItems[floor].map((item: any, i: number) => (
                    <Card key={i} className="group border border-border/30 bg-linear-to-br from-card to-card/50 rounded-2xl p-6 hover:shadow-2xl hover:border-primary/30 transition-all hover:-translate-y-1 cursor-pointer overflow-hidden relative">
                      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all" />
                      
                      <div className="relative space-y-5">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-baseline gap-3">
                              <h4 className="text-3xl font-black tracking-tighter">{item.name}</h4>
                              <Badge variant="outline" className="text-[9px] font-bold px-2.5 py-0.5 rounded-lg border-border/40">
                                {item.type}
                              </Badge>
                            </div>
                            <p className="text-[10px] font-black uppercase text-muted-foreground/40 tracking-[0.2em]">{item.dorm}</p>
                          </div>
                          <Badge
                            className={cn(
                              "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border-none",
                              item.status === 'Occupied' ? "bg-blue-500/15 text-blue-600 ring-1 ring-blue-500/30" :
                              item.status === 'Vacant' ? "bg-emerald-500/15 text-emerald-600 ring-1 ring-emerald-500/30" :
                              item.status === 'Arriving' ? "bg-indigo-500/15 text-indigo-600 ring-1 ring-indigo-500/30" :
                              "bg-amber-500/15 text-amber-600 ring-1 ring-amber-500/30"
                            )}
                          >
                            {item.status}
                          </Badge>
                        </div>

                        <div className="pt-3 border-t border-border/20 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2 text-muted-foreground/60">
                                <User className="w-4 h-4" />
                                <span className="text-[9px] font-black uppercase tracking-widest">Resident</span>
                              </div>
                              <p className="text-sm font-black truncate">{item.resident || 'Unassigned'}</p>
                            </div>
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2 text-muted-foreground/60">
                                <Clock className="w-4 h-4" />
                                <span className="text-[9px] font-black uppercase tracking-widest">Last Check</span>
                              </div>
                              <p className="text-sm font-black">{item.lastChecked}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className={cn(
                              "flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all",
                              item.housekeeping === 'Clean' ? "bg-emerald-500/15 text-emerald-700 ring-1 ring-emerald-500/30" :
                              item.housekeeping === 'Dirty' ? "bg-destructive/15 text-destructive ring-1 ring-destructive/30" :
                              item.housekeeping === 'Inspected' ? "bg-primary/15 text-primary ring-1 ring-primary/30" :
                              "bg-amber-500/15 text-amber-700 ring-1 ring-amber-500/30"
                            )}>
                              {item.housekeeping === 'Clean' || item.housekeeping === 'Inspected' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <SprayCan className="w-3.5 h-3.5" />}
                              {item.housekeeping}
                            </div>

                            <div className={cn(
                              "flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest",
                              item.maintenance === 'none' ? "bg-emerald-500/15 text-emerald-700 ring-1 ring-emerald-500/30" :
                              item.maintenance === 'alert' ? "bg-destructive/15 text-destructive ring-1 ring-destructive/30 animate-pulse" : "bg-amber-500/15 text-amber-700 ring-1 ring-amber-500/30"
                            )}>
                              <Wrench className="w-3.5 h-3.5" />
                              {item.maintenance === 'none' ? 'OK' : item.maintenance === 'alert' ? 'Alert' : 'Issue'}
                            </div>
                          </div>

                          <div className="pt-3 border-t border-border/20">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Monthly Rent</span>
                              <span className="text-lg font-black text-primary">{item.rent}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 top-0 bg-black/0 group-hover:bg-black/5 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                        <Button size="sm" className="h-10 px-5 rounded-xl font-black text-[9px] uppercase tracking-widest bg-primary shadow-lg shadow-primary/30 hover:bg-primary/90">
                          <Eye className="w-3.5 h-3.5 mr-2" /> Details
                        </Button>
                        <Button size="icon" variant="outline" className="h-10 w-10 rounded-xl bg-background border-border/50 hover:border-primary/40">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
