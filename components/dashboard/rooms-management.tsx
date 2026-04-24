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
  MoreHorizontal
} from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Room {
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
  tier: 'normal' | 'pro' | 'premium';
}

const ITEMS_PER_PAGE = 12;

export function RoomsManagement({ title, description, rooms, tier }: RoomsManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFloor, setSelectedFloor] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedMaintenance, setSelectedMaintenance] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsNotice, setRoomsNotice] = useState<string | null>(null);

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
      case 'alert': return { color: 'text-red-600', bg: 'bg-red-500/10' };
      case 'issue': return { color: 'text-orange-600', bg: 'bg-orange-500/10' };
      default: return { color: 'text-emerald-600', bg: 'bg-emerald-500/10' };
    }
  };

  const getHousekeepingIcon = (hk: Room['housekeeping']) => {
    switch (hk) {
      case 'Clean': return { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-500/10' };
      case 'Dirty': return { icon: SprayCan, color: 'text-orange-600', bg: 'bg-orange-500/10' };
      case 'Inspected': return { icon: Eye, color: 'text-blue-600', bg: 'bg-blue-500/10' };
      case 'Maintenance': return { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-500/10' };
      default: return { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-500/10' };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-black tracking-tight">{title}</h2>
          <p className="text-sm font-medium text-muted-foreground">{description}</p>
        </div>
        <Button
          className="rounded-xl h-9 px-4 font-black bg-primary text-primary-foreground shadow-lg shadow-primary/20 text-[10px] uppercase tracking-wider"
          onClick={() => setRoomsNotice('Add Room form is coming soon.')}
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Room
        </Button>
      </div>

      {roomsNotice ? <p className="text-xs font-semibold text-muted-foreground">{roomsNotice}</p> : null}

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <Card className="p-4 border-border/40 bg-card rounded-xl space-y-3 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600"><Building2 className="w-4 h-4" /></div>
            <span className="text-[8px] font-black uppercase text-muted-foreground/40">Total</span>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-black">{stats.total}</p>
            <p className="text-[9px] text-muted-foreground">units</p>
          </div>
        </Card>

        <Card className="p-4 border-border/40 bg-card rounded-xl space-y-3 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600"><Users className="w-4 h-4" /></div>
            <span className="text-[8px] font-black uppercase text-muted-foreground/40">Occupied</span>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-black text-emerald-600">{stats.occupied}</p>
            <p className="text-[9px] text-muted-foreground">{stats.occupancyRate}% rate</p>
          </div>
        </Card>

        <Card className="p-4 border-border/40 bg-card rounded-xl space-y-3 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600"><Building2 className="w-4 h-4" /></div>
            <span className="text-[8px] font-black uppercase text-muted-foreground/40">Vacant</span>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-black text-amber-600">{stats.vacant}</p>
            <p className="text-[9px] text-muted-foreground">available</p>
          </div>
        </Card>

        <Card className="p-4 border-border/40 bg-card rounded-xl space-y-3 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-600"><SprayCan className="w-4 h-4" /></div>
            <span className="text-[8px] font-black uppercase text-muted-foreground/40">Cleaning</span>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-black text-orange-600">{stats.cleaning}</p>
            <p className="text-[9px] text-muted-foreground">pending</p>
          </div>
        </Card>

        <Card className="p-4 border-border/40 bg-card rounded-xl space-y-3 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="p-1.5 rounded-lg bg-red-500/10 text-red-600"><AlertTriangle className="w-4 h-4" /></div>
            <span className="text-[8px] font-black uppercase text-muted-foreground/40">Issues</span>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-black text-red-600">{stats.issues}</p>
            <p className="text-[9px] text-muted-foreground">maintenance</p>
          </div>
        </Card>

        <Card className="p-4 border-border/40 bg-card rounded-xl space-y-3 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600"><Building2 className="w-4 h-4" /></div>
            <span className="text-[8px] font-black uppercase text-muted-foreground/40">Filtered</span>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-black">{filteredRooms.length}</p>
            <p className="text-[9px] text-muted-foreground">shown</p>
          </div>
        </Card>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-sm group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
              <Search className="w-3.5 h-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <Input
              placeholder="Search by room or resident..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 pr-3 h-9 text-xs font-bold shadow-sm bg-muted/30 border-border/40 rounded-xl focus:bg-background"
            />
          </div>

          {/* View Toggle */}
          <div className="flex gap-1 border border-border/40 rounded-lg p-1 bg-muted/20">
            <Button
              size="sm"
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              className="rounded-md px-2.5 h-7 text-xs font-bold"
              onClick={() => setViewMode('grid')}
            >
              <Grid3x3 className="w-3.5 h-3.5" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              className="rounded-md px-2.5 h-7 text-xs font-bold"
              onClick={() => setViewMode('list')}
            >
              <List className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Download */}
          <Button variant="outline" className="rounded-xl h-9 px-3 border-border text-muted-foreground gap-2 hover:bg-muted text-xs font-bold" onClick={() => setRoomsNotice('Room export queued (mock).')}>
            <Download className="w-3.5 h-3.5" /> Export
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {/* Floor Filter */}
          <select
            value={selectedFloor}
            onChange={(e) => {
              setSelectedFloor(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 h-9 text-xs font-bold rounded-lg border border-border/40 bg-card hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <option value="all">All Floors</option>
            {floors.map(floor => (
              <option key={floor} value={floor}>{floor}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 h-9 text-xs font-bold rounded-lg border border-border/40 bg-card hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <option value="all">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          {/* Maintenance Filter */}
          <select
            value={selectedMaintenance}
            onChange={(e) => {
              setSelectedMaintenance(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 h-9 text-xs font-bold rounded-lg border border-border/40 bg-card hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <option value="all">All Maintenance</option>
            <option value="ok">No Issues</option>
            <option value="issues">Has Issues</option>
          </select>

          {/* Active Filters Badge */}
          {(searchTerm || selectedFloor !== 'all' || selectedStatus !== 'all' || selectedMaintenance !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              className="h-9 px-2 text-xs font-bold text-primary hover:bg-primary/10 rounded-lg"
              onClick={() => {
                setSearchTerm('');
                setSelectedFloor('all');
                setSelectedStatus('all');
                setSelectedMaintenance('all');
                setCurrentPage(1);
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Content Area */}
      {paginatedRooms.length === 0 ? (
        <Card className="p-12 border-border/40 bg-card rounded-xl flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-12 h-12 rounded-lg bg-muted/30 flex items-center justify-center text-muted-foreground/40">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-foreground">No rooms found</p>
            <p className="text-xs text-muted-foreground">Try adjusting your filters or search terms</p>
          </div>
        </Card>
      ) : (
        <>
          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {paginatedRooms.map((room) => {
                const hkIcon = getHousekeepingIcon(room.housekeeping);
                const HKIcon = hkIcon.icon;
                return (
                  <Card
                    key={room.id}
                    className="group border-border/40 bg-card rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => setRoomsNotice(`Room ${room.name} opened (mock).`)}
                  >
                    <div className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h3 className="text-lg font-black">{room.name}</h3>
                          <p className="text-[9px] text-muted-foreground font-bold uppercase">{room.floor} • {room.type}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="w-3.5 h-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40 rounded-lg p-1 border-border/40 shadow-xl">
                            <DropdownMenuLabel className="text-[9px] font-bold uppercase px-3 py-2">Actions</DropdownMenuLabel>
                            <DropdownMenuItem onSelect={() => setRoomsNotice(`Viewing room ${room.name}.`)} className="rounded-lg cursor-pointer py-1.5 px-3 text-xs font-semibold">
                              <Eye className="w-3 h-3 mr-2" /> View
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setRoomsNotice(`Editing room ${room.name} (mock).`)} className="rounded-lg cursor-pointer py-1.5 px-3 text-xs font-semibold">
                              <Edit2 className="w-3 h-3 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setRoomsNotice(`Delete flow opened for room ${room.name} (mock).`)} className="rounded-lg cursor-pointer py-1.5 px-3 text-xs font-semibold text-destructive">
                              <Trash2 className="w-3 h-3 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="space-y-2">
                        <Badge className={cn("text-[8px] font-bold px-2 py-0.5 rounded-md border-none", getStatusColor(room.status))}>
                          {room.status}
                        </Badge>
                        {room.resident && (
                          <p className="text-[9px] font-bold text-muted-foreground">👤 {room.resident}</p>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-border/20">
                        <div className="flex items-center gap-1.5">
                          <div className={cn("p-1.5 rounded-lg", hkIcon.bg)}>
                            <HKIcon className={cn("w-3 h-3", hkIcon.color)} />
                          </div>
                          <span className="text-[8px] font-bold text-muted-foreground">{room.housekeeping}</span>
                        </div>
                        {room.maintenance !== 'none' && (
                          <div className={cn("p-1 rounded-lg", getMaintenanceIcon(room.maintenance).bg)}>
                            <AlertTriangle className={cn("w-3 h-3", getMaintenanceIcon(room.maintenance).color)} />
                          </div>
                        )}
                      </div>

                      <p className="text-sm font-black text-foreground">{room.rent}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="border border-border/40 rounded-xl overflow-hidden bg-card">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 z-10 bg-muted/50 border-b border-border/40">
                    <tr>
                      <th className="p-3 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">Room</th>
                      <th className="p-3 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">Resident</th>
                      <th className="p-3 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">Type</th>
                      <th className="p-3 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">Status</th>
                      <th className="p-3 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">Housekeeping</th>
                      <th className="p-3 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">Rent</th>
                      <th className="p-3 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {paginatedRooms.map((room) => {
                      const hkIcon = getHousekeepingIcon(room.housekeeping);
                      const HKIcon = hkIcon.icon;
                      return (
                        <tr key={room.id} className="hover:bg-muted/30 transition-colors">
                          <td className="p-3">
                            <div className="space-y-1">
                              <p className="font-bold text-foreground">{room.name}</p>
                              <p className="text-[8px] text-muted-foreground">{room.floor}</p>
                            </div>
                          </td>
                          <td className="p-3">
                            <p className="text-sm font-semibold text-foreground">{room.resident || '-'}</p>
                          </td>
                          <td className="p-3">
                            <Badge variant="outline" className="text-[8px] font-bold border-border">{room.type}</Badge>
                          </td>
                          <td className="p-3">
                            <Badge className={cn("text-[8px] font-bold border-none", getStatusColor(room.status))}>
                              {room.status}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1.5">
                              <div className={cn("p-1.5 rounded-lg", hkIcon.bg)}>
                                <HKIcon className={cn("w-3 h-3", hkIcon.color)} />
                              </div>
                              <span className="text-xs font-bold">{room.housekeeping}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <p className="font-bold text-foreground">{room.rent}</p>
                          </td>
                          <td className="p-3 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg">
                                  <MoreHorizontal className="w-3.5 h-3.5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-40 rounded-lg p-1 border-border/40 shadow-xl">
                                <DropdownMenuLabel className="text-[9px] font-bold uppercase px-3 py-2">Actions</DropdownMenuLabel>
                                <DropdownMenuItem onSelect={() => setRoomsNotice(`Viewing room ${room.name}.`)} className="rounded-lg cursor-pointer py-1.5 px-3 text-xs font-semibold">
                                  <Eye className="w-3 h-3 mr-2" /> View
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setRoomsNotice(`Editing room ${room.name} (mock).`)} className="rounded-lg cursor-pointer py-1.5 px-3 text-xs font-semibold">
                                  <Edit2 className="w-3 h-3 mr-2" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setRoomsNotice(`Delete flow opened for room ${room.name} (mock).`)} className="rounded-lg cursor-pointer py-1.5 px-3 text-xs font-semibold text-destructive">
                                  <Trash2 className="w-3 h-3 mr-2" /> Delete
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border border-border/40 rounded-lg bg-muted/20">
          <p className="text-[10px] font-bold text-muted-foreground/60 uppercase">
            Showing <span className="text-foreground">{(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredRooms.length)}</span> of <span className="text-foreground">{filteredRooms.length}</span> rooms
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg text-muted-foreground disabled:opacity-40"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
              let page = i + 1;
              if (currentPage > 2) page = currentPage - 1 + i;
              if (currentPage > totalPages - 2) page = totalPages - 2 + i;
              return page > 0 && page <= totalPages ? (
                <Button
                  key={page}
                  variant={page === currentPage ? 'secondary' : 'ghost'}
                  className={cn(
                    "h-8 w-8 rounded-lg text-xs font-bold transition-all",
                    page === currentPage
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ) : null;
            })}

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg text-muted-foreground disabled:opacity-40"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
