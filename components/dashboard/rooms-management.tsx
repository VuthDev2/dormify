'use client';

import {
  Search,
  Filter,
  Grid3x3,
  List,
  Download,
  Plus,
  ChevronLeft,
  ChevronRight,
  Building2,
  Users,
  AlertTriangle,
  SprayCan,
  CheckCircle2,
  Eye,
  Edit2,
  Trash2,
  MoreHorizontal,
  Archive,
  ArrowUpRight,
  Activity,
  Calendar,
  Zap,
  ShieldCheck,
  Building,
  Home,
  Waves,
  LayoutGrid
} from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useModal } from '@/contexts/modal-context';
import { PropertiesContent, FinanceContent, MaintenanceContent, RoomFormContent, ActionPlaceholderContent } from '@/components/modal-contents';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface Room {
  id: string;
  name: string;
  floor: string;
  type: 'Studio' | 'Standard' | 'Suite';
  status: 'Occupied' | 'Vacant' | 'Arriving' | 'Departing' | 'Maintenance';
  resident?: string;
  rent: string;
  housekeeping: 'Clean' | 'Dirty' | 'Inspected' | 'Maintenance';
  maintenance: 'none' | 'issue' | 'alert';
  lastChecked: string;
}

interface RoomsManagementProps {
  title: string;
  description: string;
  rooms: Room[];
}

const ITEMS_PER_PAGE = 12;

export function RoomsManagement({ title, description, rooms }: RoomsManagementProps) {
  const { openModal } = useModal();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFloor, setSelectedFloor] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedMaintenance, setSelectedMaintenance] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);

  // Extract unique values
  const floors = useMemo(() => [...new Set(rooms.map(r => r.floor))].sort(), [rooms]);
  const statuses = useMemo(() => [...new Set(rooms.map(r => r.status))], [rooms]);

  // Filter rooms
  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.resident?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFloor = selectedFloor === 'all' || room.floor === selectedFloor;
      const matchesStatus = selectedStatus === 'all' || room.status === selectedStatus;
      const matchesMaintenance = selectedMaintenance === 'all' ||
        (selectedMaintenance === 'issues' ? room.maintenance !== 'none' : room.maintenance === 'none');
      return matchesSearch && matchesFloor && matchesStatus && matchesMaintenance;
    });
  }, [rooms, searchTerm, selectedFloor, selectedStatus, selectedMaintenance]);

  // Calculate stats
  const stats = useMemo(() => ({
    total: rooms.length,
    occupied: rooms.filter(r => r.status === 'Occupied').length,
    vacant: rooms.filter(r => r.status === 'Vacant').length,
    issues: rooms.filter(r => r.maintenance !== 'none').length,
    cleaning: rooms.filter(r => r.housekeeping === 'Dirty').length,
    occupancyRate: Math.round((rooms.filter(r => r.status === 'Occupied').length / rooms.length) * 100),
  }), [rooms]);

  // Pagination
  const totalPages = Math.ceil(filteredRooms.length / ITEMS_PER_PAGE);
  const paginatedRooms = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRooms.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredRooms, currentPage]);

  const getStatusColor = (status: Room['status']) => {
    switch (status) {
      case 'Occupied': return 'bg-blue-500/10 text-blue-600';
      case 'Vacant': return 'bg-emerald-500/10 text-emerald-600';
      case 'Arriving': return 'bg-indigo-500/10 text-indigo-600';
      case 'Departing': return 'bg-amber-500/10 text-amber-600';
      case 'Maintenance': return 'bg-red-500/10 text-red-600';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getMaintenanceIcon = (maintenance: Room['maintenance']) => {
    switch (maintenance) {
      case 'alert': return { color: 'text-red-500', bg: 'bg-red-500/5' };
      case 'issue': return { color: 'text-orange-500', bg: 'bg-orange-500/5' };
      default: return { color: 'text-emerald-500', bg: 'bg-emerald-500/5' };
    }
  };

  const getHousekeepingIcon = (hk: Room['housekeeping']) => {
    switch (hk) {
      case 'Clean': return { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/5' };
      case 'Dirty': return { icon: SprayCan, color: 'text-orange-500', bg: 'bg-orange-500/5' };
      case 'Inspected': return { icon: ShieldCheck, color: 'text-blue-500', bg: 'bg-blue-500/5' };
      case 'Maintenance': return { icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/5' };
      default: return { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/5' };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Registry Header: Professional Inventory Node */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/40">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_12px_rgba(59,130,246,0.5)]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/50">Asset Node: Space Allocation Registry</span>
          </div>
          <h2 className="text-4xl font-black tracking-tighter text-foreground uppercase">{title}</h2>
          <p className="text-sm font-bold text-muted-foreground/60 max-w-xl">{description}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            className="rounded-xl h-11 px-5 border border-border/40 text-[10px] font-black uppercase tracking-widest gap-2 hover:bg-muted"
            onClick={() => openModal({
              id: 'archive-rooms',
              title: 'Structural Archive',
              component: <ActionPlaceholderContent action="Open structural archive" detail="Archive and decommission actions can now be connected to backend inventory status APIs." />,
              size: 'lg'
            })}
          >
            <Archive className="w-4 h-4" /> Structural Archive
          </Button>
          <Button 
            className="rounded-xl h-12 px-6 font-black bg-primary text-white shadow-xl shadow-primary/20 text-[10px] uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-95 group"
            onClick={() => openModal({
              id: 'add-room',
              title: 'Allocate New Unit',
              component: <RoomFormContent />,
              size: 'lg'
            })}
          >
            <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" /> Allocate New Unit
          </Button>
        </div>
      </div>

      {/* Operational Stat Ledger */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Unit Inventory', value: stats.total, sub: 'Registered Spaces', icon: Building2, color: 'text-blue-500', bg: 'bg-blue-500/5' },
          { label: 'Occupancy Velocity', value: `${stats.occupancyRate}%`, sub: 'Active Tenancy', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/5' },
          { label: 'Vacant Capacity', value: stats.vacant, sub: 'Market Ready', icon: Home, color: 'text-indigo-500', bg: 'bg-indigo-500/5' },
          { label: 'Cleaning Backlog', value: stats.cleaning, sub: 'Housekeeping Queue', icon: SprayCan, color: 'text-orange-500', bg: 'bg-orange-500/5' },
          { label: 'Structural Issues', value: stats.issues, sub: 'Maintenance Alerts', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/5' },
          { label: 'Registry View', value: filteredRooms.length, sub: 'Filtered Nodes', icon: LayoutGrid, color: 'text-primary', bg: 'bg-primary/5' },
        ].map((s, i) => (
          <Card key={i} className="group relative p-5 border-border/40 bg-white/70 backdrop-blur-xl dark:bg-white/[0.04] rounded-2xl transition-all hover:shadow-2xl hover:shadow-primary/5 overflow-hidden border">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex flex-col gap-4">
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center border border-border/40 transition-transform group-hover:scale-110', s.bg, s.color)}>
                <s.icon className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">{s.label}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-black tracking-tight text-foreground">{s.value}</p>
                  <span className="text-[10px] font-bold text-muted-foreground/40">{s.sub}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Control Bar: Efficient & Minimal */}
      <div className="p-2 border border-border/40 bg-white/40 dark:bg-white/[0.02] backdrop-blur-xl rounded-[1.5rem]">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Main Search Command */}
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
              <Search className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <Input
              placeholder="System Search: Units, Residents, Type..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-11 pr-4 h-11 text-xs font-bold bg-white/50 dark:bg-transparent border-none focus:ring-1 focus:ring-primary/20 rounded-xl placeholder:text-muted-foreground/40"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 p-1 lg:p-0">
            {/* View Architecture Toggle */}
            <div className="flex gap-1 bg-muted/20 border border-border/40 p-1 rounded-xl">
              <Button
                size="sm"
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                className={cn("rounded-lg px-3 h-8 text-[10px] font-black uppercase tracking-widest transition-all", viewMode === 'grid' && "bg-white shadow-sm dark:bg-white/10")}
                onClick={() => setViewMode('grid')}
              >
                <Grid3x3 className="w-3.5 h-3.5 mr-1.5" /> Grid
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                className={cn("rounded-lg px-3 h-8 text-[10px] font-black uppercase tracking-widest transition-all", viewMode === 'list' && "bg-white shadow-sm dark:bg-white/10")}
                onClick={() => setViewMode('list')}
              >
                <List className="w-3.5 h-3.5 mr-1.5" /> List
              </Button>
            </div>

            <div className="h-6 w-px bg-border/40 mx-1 hidden lg:block" />

            {/* Industrial Filters */}
            <div className="flex items-center gap-1">
              <select
                value={selectedFloor}
                onChange={(e) => { setSelectedFloor(e.target.value); setCurrentPage(1); }}
                className="pl-3 pr-8 h-11 text-[10px] font-black uppercase tracking-widest rounded-xl border border-border/40 bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 transition-all appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary/20"
              >
                <option value="all">Level: All Floors</option>
                {floors.map(floor => <option key={floor} value={floor}>Level {floor}</option>)}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                className="pl-3 pr-8 h-11 text-[10px] font-black uppercase tracking-widest rounded-xl border border-border/40 bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 transition-all appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary/20"
              >
                <option value="all">Protocol: All Status</option>
                {statuses.map(status => <option key={status} value={status}>{status}</option>)}
              </select>
              <select
                value={selectedMaintenance}
                onChange={(e) => { setSelectedMaintenance(e.target.value); setCurrentPage(1); }}
                className="pl-3 pr-8 h-11 text-[10px] font-black uppercase tracking-widest rounded-xl border border-border/40 bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 transition-all appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary/20"
              >
                <option value="all">Maintenance: All</option>
                <option value="ok">Integrity: OK</option>
                <option value="issues">Integrity: Alert</option>
              </select>
            </div>

            <Button 
              variant="outline" 
              className="h-11 px-4 rounded-xl border-border/40 text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
              onClick={() => openModal({
                id: 'export-rooms',
                title: 'Export Structural Inventory',
                component: <FinanceContent />,
                size: 'lg'
              })}
            >
              <Download className="w-4 h-4 mr-2" /> Export Inventory
            </Button>
          </div>
        </div>
      </div>

      {/* Filter Status Badge */}
      {(searchTerm || selectedFloor !== 'all' || selectedStatus !== 'all' || selectedMaintenance !== 'all') && (
        <div className="flex items-center gap-3 px-4">
          <Badge className="bg-primary/10 text-primary border-none text-[8px] font-black uppercase tracking-widest px-3 py-1">Active Filter Suite</Badge>
          <button
            onClick={() => { setSearchTerm(''); setSelectedFloor('all'); setSelectedStatus('all'); setSelectedMaintenance('all'); setCurrentPage(1); }}
            className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 hover:text-primary transition-colors underline underline-offset-4"
          >
            Reset All Commands
          </button>
        </div>
      )}

      {/* Content Area */}
      {paginatedRooms.length === 0 ? (
        <Card className="p-12 border-border/40 bg-white/70 backdrop-blur-xl dark:bg-white/[0.04] rounded-2xl flex flex-col items-center justify-center text-center space-y-4 shadow-sm border">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-foreground">No units found in the structural registry</p>
            <p className="text-xs text-muted-foreground/60">Adjust your node filters or structural search parameters.</p>
          </div>
        </Card>
      ) : (
        <>
          {/* Grid View: Unit Dossiers */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {paginatedRooms.map((room) => {
                const hkInfo = getHousekeepingIcon(room.housekeeping);
                const HKIcon = hkInfo.icon;
                const maintInfo = getMaintenanceIcon(room.maintenance);
                return (
                  <Card key={room.id} className="group relative border-border/40 bg-white/70 backdrop-blur-xl dark:bg-white/[0.04] rounded-[1.5rem] overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all cursor-pointer border">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="p-4 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-black text-foreground tracking-tight group-hover:text-primary transition-colors">{room.name}</h3>
                            <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest bg-muted/20 border-border/40">{room.type}</Badge>
                          </div>
                          <p className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">Structural Node {room.floor}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white dark:hover:bg-white/10 transition-all border border-transparent hover:border-border/40">
                              <MoreHorizontal className="w-3.5 h-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 rounded-[1.5rem] p-2 border-border/40 shadow-2xl bg-card/80 backdrop-blur-2xl">
                            <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest px-3 py-2 text-muted-foreground/60">Unit Operations</DropdownMenuLabel>
                            <DropdownMenuItem 
                              className="rounded-xl cursor-pointer py-2.5 px-3 text-xs font-bold text-foreground"
                              onClick={() => openModal({
                                id: `inspect-${room.id}`,
                                title: `Visual Inspection: ${room.name}`,
                                component: <MaintenanceContent />,
                                size: 'lg'
                              })}
                            >
                              <Eye className="w-4 h-4 mr-2 text-primary" /> Visual Inspection
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="rounded-xl cursor-pointer py-2.5 px-3 text-xs font-bold text-foreground"
                              onClick={() => openModal({
                                id: `modify-${room.id}`,
                                title: `Modify Allocation: ${room.name}`,
                                component: <RoomFormContent />,
                                size: 'lg'
                              })}
                            >
                              <Edit2 className="w-4 h-4 mr-2 text-primary" /> Modify Allocation
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="rounded-xl cursor-pointer py-2.5 px-3 text-xs font-bold text-destructive hover:bg-destructive/5"
                              onClick={() => openModal({
                                id: `decommission-${room.id}`,
                                title: `Decommission Unit: ${room.name}`,
                                component: <ActionPlaceholderContent action={`Decommission ${room.name}`} detail="Use this as confirmation UI before sending a decommission request." />,
                                size: 'md'
                              })}
                            >
                              <Archive className="w-4 h-4 mr-2" /> Decommission Unit
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 rounded-xl bg-muted/5 border border-border/40">
                          <p className="text-[7px] font-black text-muted-foreground/30 uppercase tracking-widest mb-1 leading-none">Status</p>
                          <Badge className={cn("text-[8px] font-black uppercase tracking-widest border-none px-1.5 py-0", getStatusColor(room.status))}>{room.status}</Badge>
                        </div>
                        <div className="p-2 rounded-xl bg-muted/5 border border-border/40">
                          <p className="text-[7px] font-black text-muted-foreground/30 uppercase tracking-widest mb-1 leading-none">Environmental</p>
                          <div className="flex items-center gap-1.5">
                            <HKIcon className={cn("w-3 h-3", hkInfo.color)} />
                            <span className={cn("text-[8px] font-bold uppercase", hkInfo.color)}>{room.housekeeping}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {room.resident ? (
                          <div className="flex items-center justify-between p-2 rounded-xl bg-primary/[0.03] border border-primary/10 group/resident">
                            <div className="flex items-center gap-2">
                              <Users className="w-3.5 h-3.5 text-primary" />
                              <span className="text-[10px] font-black text-foreground truncate max-w-[100px]">{room.resident}</span>
                            </div>
                            <ArrowUpRight className="w-3 h-3 text-primary opacity-0 group-hover/resident:opacity-100 transition-opacity" />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center p-2 rounded-xl border border-dashed border-border/40">
                            <span className="text-[9px] font-bold text-muted-foreground/30 uppercase tracking-widest italic">Unoccupied Space</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border/20">
                        <div className="flex items-center gap-2">
                          <div className={cn("w-6 h-6 rounded-lg flex items-center justify-center border border-border/40", maintInfo.bg)}>
                            {room.maintenance !== 'none' ? <AlertTriangle className={cn("w-3 h-3", maintInfo.color)} /> : <ShieldCheck className="w-3 h-3 text-emerald-500" />}
                          </div>
                          <span className="text-[9px] font-black text-foreground">{room.rent}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 rounded-lg text-[8px] font-black uppercase tracking-widest bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all"
                          onClick={() => openModal({
                            id: `manage-room-${room.id}`,
                            title: `Manage Unit: ${room.name}`,
                            component: <RoomFormContent />,
                            size: 'lg'
                          })}
                        >
                          Manage Unit
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {/* List View: System Ledger */}
          {viewMode === 'list' && (
            <div className="border border-border/40 rounded-[2rem] overflow-hidden bg-white/70 backdrop-blur-xl dark:bg-white/[0.04] shadow-sm border">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-muted/30 border-b border-border/40">
                    <tr>
                      <th className="p-5 text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/50">Unit Dossier</th>
                      <th className="p-5 text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/50">Node Allocation</th>
                      <th className="p-5 text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/50">Resident Link</th>
                      <th className="p-5 text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/50">Protocol Status</th>
                      <th className="p-5 text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/50">Environmental State</th>
                      <th className="p-5 text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/50">Financial Value</th>
                      <th className="p-5"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20">
                    {paginatedRooms.map((room) => {
                      const hkInfo = getHousekeepingIcon(room.housekeeping);
                      const HKIcon = hkInfo.icon;
                      return (
                        <tr key={room.id} className="group hover:bg-primary/[0.02] transition-colors cursor-pointer">
                          <td className="p-5">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10 transition-transform group-hover:scale-110">
                                <Building className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="font-black text-foreground group-hover:text-primary transition-colors leading-none mb-1">{room.name}</p>
                                <Badge variant="outline" className="text-[7px] font-black uppercase tracking-widest border-border/40 px-1 py-0">{room.type}</Badge>
                              </div>
                            </div>
                          </td>
                          <td className="p-5">
                            <div className="space-y-1">
                              <p className="text-xs font-black text-foreground tracking-tight">Structural Level {room.floor}</p>
                              <p className="text-[8px] font-bold text-muted-foreground/40 uppercase tracking-widest">Sector Node Allocation</p>
                            </div>
                          </td>
                          <td className="p-5">
                            {room.resident ? (
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                  <Users className="w-3 h-3" />
                                </div>
                                <p className="text-[10px] font-black text-foreground">{room.resident}</p>
                              </div>
                            ) : (
                              <span className="text-[9px] font-bold text-muted-foreground/20 italic uppercase">Vacant</span>
                            )}
                          </td>
                          <td className="p-5">
                            <Badge className={cn("text-[9px] font-black uppercase tracking-widest border-none px-2 py-0.5", getStatusColor(room.status))}>
                              {room.status}
                            </Badge>
                          </td>
                          <td className="p-5">
                            <div className="flex items-center gap-2">
                              <div className={cn("p-1.5 rounded-lg", hkInfo.bg)}>
                                <HKIcon className={cn("w-3.5 h-3.5", hkInfo.color)} />
                              </div>
                              <span className={cn("text-[10px] font-black uppercase tracking-tight", hkInfo.color)}>{room.housekeeping}</span>
                            </div>
                          </td>
                          <td className="p-5">
                            <p className="text-xs font-black text-foreground tracking-tighter">{room.rent}</p>
                          </td>
                          <td className="p-5 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl transition-all border border-transparent hover:border-border/40 hover:bg-white dark:hover:bg-white/10">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48 rounded-[1.5rem] p-2 border-border/40 shadow-2xl bg-card/80 backdrop-blur-2xl">
                                <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest px-3 py-2 text-muted-foreground/60">Unit Command</DropdownMenuLabel>
                                <DropdownMenuItem
                                  className="rounded-xl cursor-pointer py-2.5 px-3 text-xs font-bold text-foreground"
                                  onClick={() => openModal({
                                    id: `list-inspect-${room.id}`,
                                    title: `Visual Inspection: ${room.name}`,
                                    component: <MaintenanceContent />,
                                    size: 'lg'
                                  })}
                                >
                                  <Eye className="w-4 h-4 mr-2 text-primary" /> Detail Analysis
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="rounded-xl cursor-pointer py-2.5 px-3 text-xs font-bold text-foreground"
                                  onClick={() => openModal({
                                    id: `list-edit-${room.id}`,
                                    title: `Edit Unit: ${room.name}`,
                                    component: <RoomFormContent />,
                                    size: 'lg'
                                  })}
                                >
                                  <Edit2 className="w-4 h-4 mr-2 text-primary" /> Structural Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="rounded-xl cursor-pointer py-2.5 px-3 text-xs font-bold text-destructive hover:bg-destructive/5"
                                  onClick={() => openModal({
                                    id: `list-decommission-${room.id}`,
                                    title: `Decommission Unit: ${room.name}`,
                                    component: <ActionPlaceholderContent action={`Decommission ${room.name}`} />,
                                    size: 'md'
                                  })}
                                >
                                  <Trash2 className="w-4 h-4 mr-2" /> Decommission Record
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* Pagination Command Node */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border border-border/40 rounded-[1.5rem] bg-white/40 dark:bg-white/[0.02] backdrop-blur-xl">
          <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.2em]">
            Inventory Storage: <span className="text-foreground">{(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredRooms.length)}</span> of <span className="text-foreground">{filteredRooms.length}</span> Structural Nodes
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl text-muted-foreground border border-transparent hover:border-border/40 hover:bg-white dark:hover:bg-white/10"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                let page = i + 1;
                if (currentPage > 2) page = currentPage - 1 + i;
                if (currentPage > totalPages - 2) page = totalPages - 2 + i;
                return page > 0 && page <= totalPages ? (
                  <Button
                    key={page}
                    variant={page === currentPage ? 'secondary' : 'ghost'}
                    className={cn(
                      "h-10 w-10 rounded-xl text-xs font-black transition-all border border-transparent",
                      page === currentPage
                        ? "bg-primary text-white shadow-xl shadow-primary/20 border-primary/20"
                        : "text-muted-foreground hover:border-border/40 hover:bg-white dark:hover:bg-white/10"
                    )}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ) : null;
              })}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl text-muted-foreground border border-transparent hover:border-border/40 hover:bg-white dark:hover:bg-white/10"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
