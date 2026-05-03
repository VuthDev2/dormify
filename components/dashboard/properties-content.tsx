'use client';

import {
  Search, Filter, Plus, ChevronLeft, ChevronRight, Building2, Users, 
  AlertTriangle, CheckCircle2, MoreHorizontal, Activity, Zap, ShieldCheck, 
  Building, Home, MapPin, TrendingUp, ArrowUpRight, Wrench, User, Wifi, 
  Droplets, Thermometer, Download, Grid, Settings2, Eye, Calendar, Sparkles,
  Save, X, Radio, Server, Gauge
} from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { useModal } from '@/contexts/modal-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { DormitoryFormContent, RoomFormContent, ActionPlaceholderContent } from '@/components/modal-contents';

interface BuildingData {
  id: string;
  name: string;
  address: string;
  totalUnits: number;
  occupiedUnits: number;
  revenue: string;
  image: string;
  status: 'Active' | 'Maintenance';
  systems: {
    wifi: 'ok' | 'issue';
    water: 'ok' | 'issue';
    heat: 'ok' | 'issue';
  }
}

interface RoomData {
  id: string;
  name: string;
  floor: string;
  buildingId: string;
  buildingName: string;
  type: 'Studio' | 'Standard' | 'Suite';
  status: 'Occupied' | 'Vacant' | 'Maintenance' | 'Arriving';
  resident?: string;
  rent: string;
  housekeeping: 'Clean' | 'Dirty' | 'Inspected';
  lastService: string;
}

export function PropertiesContent({ tier = 'pro' }: { tier?: string }) {
  const { openModal } = useModal();
  const [activeTab, setActiveTab] = useState<'dormitories' | 'rooms'>('dormitories');
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const buildings: BuildingData[] = [
    { id: 'BL-01', name: 'Manhattan Central', address: 'New York, WC1E', totalUnits: 124, occupiedUnits: 118, revenue: '$142,000', image: 'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'Active', systems: { wifi: 'ok', water: 'ok', heat: 'ok' } },
    { id: 'BW-02', name: 'Brooklyn Wing', address: 'New York, SE1', totalUnits: 86, occupiedUnits: 72, revenue: '$98,500', image: 'https://images.pexels.com/photos/259950/pexels-photo-259950.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'Active', systems: { wifi: 'issue', water: 'ok', heat: 'ok' } },
    { id: 'PC-03', name: 'Times Square Court', address: 'New York, W2', totalUnits: 210, occupiedUnits: 194, revenue: '$215,000', image: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'Active', systems: { wifi: 'ok', water: 'ok', heat: 'ok' } },
  ];

  const rooms: RoomData[] = [
    { id: 'R-101', name: 'Studio A1', floor: '1', buildingId: 'BL-01', buildingName: 'Bloomsbury', type: 'Studio', status: 'Occupied', resident: 'Sarah Johnson', rent: '$1,200', housekeeping: 'Clean', lastService: '2d ago' },
    { id: 'R-102', name: 'Standard B2', floor: '1', buildingId: 'BL-01', buildingName: 'Bloomsbury', type: 'Standard', status: 'Vacant', rent: '$950', housekeeping: 'Dirty', lastService: '1w ago' },
    { id: 'R-204', name: 'Exec Suite', floor: '2', buildingId: 'BW-02', buildingName: 'Borough', type: 'Suite', status: 'Occupied', resident: 'Michael Chen', rent: '$1,800', housekeeping: 'Inspected', lastService: 'Today' },
    { id: 'R-305', name: 'Standard C1', floor: '3', buildingId: 'PC-03', buildingName: 'Paddington', type: 'Standard', status: 'Maintenance', rent: '$1,050', housekeeping: 'Dirty', lastService: '3d ago' },
    { id: 'R-105', name: 'Studio A5', floor: '1', buildingId: 'BL-01', buildingName: 'Bloomsbury', type: 'Standard', status: 'Arriving', resident: 'Elena Rodriguez', rent: '$950', housekeeping: 'Inspected', lastService: '4h ago' },
  ];

  const selectedBuilding = useMemo(() => buildings.find(b => b.id === selectedBuildingId), [selectedBuildingId]);

  const filteredRooms = useMemo(() => {
    let base = activeTab === 'rooms' ? rooms : (selectedBuildingId ? rooms.filter(r => r.buildingId === selectedBuildingId) : []);
    if (searchTerm) {
      base = base.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()) || r.resident?.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return base;
  }, [activeTab, selectedBuildingId, searchTerm]);

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-700 pb-10">
      
      {/* 1. PROFESSIONAL HUB HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-background/50 backdrop-blur-md p-4 rounded-2xl border border-border/40 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
             <Building2 className="w-5 h-5" />
          </div>
          <div>
             <h1 className="text-xl font-bold tracking-tight text-foreground uppercase">Asset Terminal</h1>
             <div className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" /> Portfolio Live Uplink
             </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex p-1 bg-muted/20 rounded-xl border border-border/20 shadow-inner">
             {['dormitories', 'rooms'].map((tab) => (
               <button
                 key={tab}
                 onClick={() => {setActiveTab(tab as any); setSelectedBuildingId(null)}}
                 className={cn(
                   "px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                   activeTab === tab ? "bg-background text-primary shadow-sm border border-border/40" : "text-muted-foreground hover:text-foreground"
                 )}
               >
                 {tab === 'rooms' ? 'Global Registry' : 'Campus Portfolio'}
               </button>
             ))}
          </div>
          <Button
            size="sm"
            className="h-10 rounded-xl bg-primary text-white font-bold gap-2 text-xs uppercase tracking-widest px-5 shadow-xl shadow-primary/20"
            onClick={() => openModal({
              id: 'new-asset',
              title: 'Create New Property',
              component: <DormitoryFormContent />,
              size: 'lg'
            })}
          >
            <Plus className="w-4 h-4" /> New Asset
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* VIEW 1: DORMITORIES (Portfolio List) */}
        {activeTab === 'dormitories' && !selectedBuildingId && (
          <motion.div key="portfolio" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {buildings.map((b) => (
                <Card key={b.id} className="group border-border/40 bg-card rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 border flex flex-col relative p-0 gap-0">
                  <div className="relative aspect-[4/3] bg-muted shrink-0 overflow-hidden border-b border-border/10">
                    <img src={b.image} alt={b.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out" />
                    <Badge className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-primary border-none text-[9px] font-black uppercase tracking-[0.2em] px-3 shadow-sm">Ref: {b.id}</Badge>
                  </div>
                  
                  <div className="p-6 flex-1 space-y-6">
                    <div className="space-y-1">
                       <h3 className="text-xl font-black text-foreground tracking-tight leading-none uppercase">{b.name}</h3>
                       <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em] flex items-center gap-1.5 mt-1.5">
                          <MapPin className="w-3.5 h-3.5 text-primary" /> {b.address}
                       </p>
                    </div>

                    <div className="flex justify-between gap-2 border-y border-border/5 py-4">
                      {Object.entries(b.systems).map(([key, status]) => (
                        <div key={key} className={cn(
                          "flex-1 flex flex-col items-center gap-1.5 p-2.5 rounded-2xl border transition-all duration-300",
                          status === 'ok' ? "bg-muted/5 border-border/40" : "bg-rose-50 border-rose-100"
                        )}>
                          {key === 'wifi' ? <Wifi className={cn("w-4 h-4", status === 'ok' ? "text-primary/60" : "text-rose-500")} /> : 
                           key === 'water' ? <Droplets className={cn("w-4 h-4", status === 'ok' ? "text-blue-500/60" : "text-rose-500")} /> : 
                           <Thermometer className={cn("w-4 h-4", status === 'ok' ? "text-orange-500/60" : "text-rose-500")} />}
                          <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/40">{key}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest leading-none mb-1">Occupancy</p>
                        <p className="text-lg font-black text-foreground leading-none">{Math.round((b.occupiedUnits / b.totalUnits) * 100)}%</p>
                      </div>
                      <Button onClick={() => setSelectedBuildingId(b.id)} size="sm" className="rounded-[1.25rem] h-12 px-6 text-[10px] font-black uppercase tracking-[0.2em] bg-primary text-white hover:scale-[1.05] transition-all shadow-lg shadow-primary/20">
                        Manage <ArrowUpRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* VIEW 2: DORMITORY DEEP-DIVE MANAGEMENT */}
        {activeTab === 'dormitories' && selectedBuildingId && (
          <motion.div key="drilldown" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid lg:grid-cols-12 gap-6">
            
            <div className="lg:col-span-9 space-y-6">
               {/* Contextual Header */}
               <div className="bg-card/50 p-3 rounded-2xl border border-border/40 flex items-center justify-between shadow-sm backdrop-blur-md">
                  <div className="flex items-center gap-4">
                     <button onClick={() => setSelectedBuildingId(null)} className="w-10 h-10 rounded-xl bg-muted/20 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all group">
                        <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                     </button>
                     <div>
                        <h2 className="text-lg font-black tracking-tight uppercase leading-none">{selectedBuilding?.name} Registry</h2>
                        <p className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest mt-1.5 flex items-center gap-2">
                           <Radio className="w-3 h-3 text-emerald-500 animate-pulse" /> Asset Uplink Active
                        </p>
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                        <Input placeholder="Filter Unit ID..." className="pl-9 h-10 bg-muted/10 border-border/40 rounded-xl text-xs font-bold w-40" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                     </div>
                     <Button
                       size="sm"
                       className="h-10 rounded-xl bg-primary text-white font-black px-4 text-[10px] uppercase tracking-widest"
                       onClick={() => openModal({
                         id: `new-unit-${selectedBuildingId}`,
                         title: 'Add Unit',
                         component: <RoomFormContent />,
                         size: 'lg'
                       })}
                     >
                       Add Unit
                     </Button>
                  </div>
               </div>

               {/* Units Grid for this Building */}
               <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredRooms.map((r) => (
                    <Card key={r.id} className="p-5 border-border/40 bg-card rounded-[2rem] hover:shadow-2xl transition-all border group relative overflow-hidden">
                       <div className="space-y-5">
                          <div className="flex justify-between items-start">
                             <div className="space-y-1">
                                <h4 className="text-xl font-black tracking-tighter text-foreground leading-none">{r.name}</h4>
                                <p className="text-[8px] font-black text-muted-foreground/40 uppercase tracking-widest">Level {r.floor} • {r.type}</p>
                             </div>
                             <div className={cn("w-2 h-2 rounded-full", r.status === 'Occupied' ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" : "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]")} />
                          </div>
                          <div className="py-3 border-y border-border/10 space-y-3">
                             <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
                                <span className="text-muted-foreground/40 italic">Resident</span>
                                <span className="text-foreground truncate max-w-[90px]">{r.resident || 'Vacant Asset'}</span>
                             </div>
                             <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
                                <span className="text-muted-foreground/40 italic">Housekeeping</span>
                                <span className={cn(r.housekeeping === 'Clean' ? "text-emerald-500" : "text-amber-500")}>{r.housekeeping}</span>
                             </div>
                          </div>
                          <div className="flex items-center justify-between">
                             <p className="text-sm font-black text-foreground">{r.rent}</p>
                             <Button
                               size="sm"
                               variant="ghost"
                               className="h-8 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
                               onClick={() => openModal({
                                 id: `manage-unit-${r.id}`,
                                 title: `Manage Unit: ${r.name}`,
                                 component: <RoomFormContent />,
                                 size: 'lg'
                               })}
                             >
                               Manage Unit
                             </Button>
                          </div>
                       </div>
                    </Card>
                  ))}
               </div>
            </div>

            {/* BUILDING CONFIGURATION PANEL */}
            <div className="lg:col-span-3 space-y-6">
               <Card className="p-6 border-border/40 bg-card rounded-[2.5rem] border shadow-xl space-y-8">
                  <div className="space-y-1">
                     <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">Dorm Configuration</h3>
                     <p className="text-xl font-black tracking-tight leading-none">{selectedBuilding?.name}</p>
                  </div>
                  
                  <div className="space-y-4">
                     <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 px-1 border-l-2 border-primary ml-1 pl-3">Systems Management</p>
                     <div className="grid grid-cols-1 gap-2">
                        {Object.entries(selectedBuilding?.systems || {}).map(([key, status]) => (
                          <div key={key} className="flex items-center justify-between p-3 rounded-xl bg-muted/5 border border-border/40 hover:border-primary/20 transition-all cursor-pointer group">
                             <div className="flex items-center gap-2">
                                {key === 'wifi' ? <Wifi className="w-3.5 h-3.5 text-primary" /> : key === 'water' ? <Droplets className="w-3.5 h-3.5 text-blue-500" /> : <Thermometer className="w-3.5 h-3.5 text-orange-500" />}
                                <span className="text-[10px] font-black text-foreground/80 uppercase">{key} Control</span>
                             </div>
                             <div className={cn("w-1.5 h-1.5 rounded-full", status === 'ok' ? "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]" : "bg-rose-500")} />
                          </div>
                        ))}
                     </div>
                  </div>

                  <Button className="w-full h-12 rounded-2xl bg-foreground text-background font-black text-[10px] uppercase tracking-[0.25em] hover:bg-foreground/90 transition-all shadow-xl">
                     Save Build Config
                  </Button>
               </Card>
            </div>
          </motion.div>
        )}

        {/* GLOBAL REGISTRY (Rooms Tab - Table View) */}
        {activeTab === 'rooms' && (
          <motion.div key="rooms" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
            <Card className="p-2 bg-card/50 backdrop-blur-md rounded-2xl border border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
               <div className="relative flex-1 group w-full max-w-xl ml-2">
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground/40" />
                  <Input placeholder="Search master unit registry across all campuses..." className="pl-8 h-12 border-none bg-transparent text-sm font-bold focus-visible:ring-0" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
               </div>
               <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="h-12 rounded-xl border-border/40 gap-2 text-[10px] font-black uppercase px-6 tracking-widest"
                    onClick={() => openModal({
                      id: 'property-filter',
                      title: 'Filter Registry',
                      component: <ActionPlaceholderContent action="Configure property filters" />,
                      size: 'md'
                    })}
                  >
                    <Filter className="w-4 h-4" /> Filter
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 rounded-xl border-border/40 gap-2 text-[10px] font-black uppercase px-6 tracking-widest"
                    onClick={() => openModal({
                      id: 'property-export',
                      title: 'Export Property Registry',
                      component: <ActionPlaceholderContent action="Export property registry" detail="Export modal is ready; connect this action to CSV/PDF endpoint." />,
                      size: 'md'
                    })}
                  >
                    <Download className="w-4 h-4" /> Export
                  </Button>
               </div>
            </Card>

            <Card className="border-border/40 bg-card rounded-[2rem] border overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-muted/10 border-b border-border/10">
                    <tr>
                      <th className="p-5 pl-8 text-[10px] font-black uppercase text-muted-foreground/40 tracking-[0.2em]">Unit Identity</th>
                      <th className="p-5 text-[10px] font-black uppercase text-muted-foreground/40 tracking-[0.2em]">Parent Asset</th>
                      <th className="p-5 text-[10px] font-black uppercase text-muted-foreground/40 tracking-[0.2em] text-center">Status</th>
                      <th className="p-5 text-[10px] font-black uppercase text-muted-foreground/40 tracking-[0.2em]">Occupant</th>
                      <th className="p-5 pr-8 text-[10px] font-black uppercase text-muted-foreground/40 tracking-[0.2em] text-right">Value</th>
                      <th className="p-5" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/5">
                    {filteredRooms.map((r) => (
                      <tr key={r.id} className="group hover:bg-muted/5 transition-all h-16 cursor-pointer">
                        <td className="p-5 pl-8">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10 group-hover:scale-110 transition-transform">
                              <Home className="w-5 h-5" />
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-sm font-black text-foreground tracking-tight uppercase">{r.name}</p>
                              <p className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">{r.type} • LVL {r.floor}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-5 text-[11px] font-black text-foreground/60 uppercase tracking-widest">{r.buildingName}</td>
                        <td className="p-5">
                          <div className="flex justify-center">
                             <Badge className={cn(
                               "text-[8px] font-black uppercase px-3 py-1 rounded-full border-none shadow-sm",
                               r.status === 'Occupied' ? "bg-blue-500 text-white" : 
                               r.status === 'Vacant' ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
                             )}>{r.status}</Badge>
                          </div>
                        </td>
                        <td className="p-5 text-[11px] font-black text-foreground/60 uppercase tracking-tight">{r.resident || 'Unassigned Node'}</td>
                        <td className="p-5 pr-8 text-right text-sm font-black text-foreground tracking-tighter">{r.rent}</td>
                        <td className="p-5 text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-white"
                            onClick={() => openModal({
                              id: `open-room-${r.id}`,
                              title: `Open Unit: ${r.name}`,
                              component: <RoomFormContent />,
                              size: 'lg'
                            })}
                          >
                            <ArrowUpRight className="w-5 h-5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
