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
  Users,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Eye,
  Edit2,
  Trash2,
  MoreHorizontal,
  HomeIcon
} from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Resident {
  id: string;
  name: string;
  email: string;
  phone: string;
  room: string;
  floor: string;
  status: 'Active' | 'Pending' | 'Inactive' | 'Moving-Out';
  joinDate: string;
  leaseEnd: string;
  paymentStatus: 'Paid' | 'Pending' | 'Overdue';
  emergencyContact?: string;
}

interface ResidentsManagementProps {
  title: string;
  description: string;
  residents: Resident[];
  tier: 'normal' | 'pro' | 'premium';
}

const ITEMS_PER_PAGE = 10;

export function ResidentsManagement({ title, description, residents, tier }: ResidentsManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedFloor, setSelectedFloor] = useState<string>('all');
  const [selectedPayment, setSelectedPayment] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [residentsNotice, setResidentsNotice] = useState<string | null>(null);

  // Extract unique values
  const floors = useMemo(() => [...new Set(residents.map(r => r.floor))].sort(), [residents]);
  const statuses = useMemo(() => [...new Set(residents.map(r => r.status))], [residents]);

  // Filter residents
  const filteredResidents = useMemo(() => {
    return residents.filter(resident => {
      const matchesSearch = resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resident.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resident.room.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || resident.status === selectedStatus;
      const matchesFloor = selectedFloor === 'all' || resident.floor === selectedFloor;
      const matchesPayment = selectedPayment === 'all' || resident.paymentStatus === selectedPayment;
      return matchesSearch && matchesStatus && matchesFloor && matchesPayment;
    });
  }, [residents, searchTerm, selectedStatus, selectedFloor, selectedPayment]);

  // Calculate stats
  const stats = useMemo(() => ({
    total: residents.length,
    active: residents.filter(r => r.status === 'Active').length,
    pending: residents.filter(r => r.status === 'Pending').length,
    movingOut: residents.filter(r => r.status === 'Moving-Out').length,
    paidUp: residents.filter(r => r.paymentStatus === 'Paid').length,
    overdue: residents.filter(r => r.paymentStatus === 'Overdue').length,
  }), [residents]);

  // Pagination
  const totalPages = Math.ceil(filteredResidents.length / ITEMS_PER_PAGE);
  const paginatedResidents = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredResidents.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredResidents, currentPage]);

  const getStatusColor = (status: Resident['status']) => {
    switch (status) {
      case 'Active': return 'bg-emerald-500/10 text-emerald-600';
      case 'Pending': return 'bg-amber-500/10 text-amber-600';
      case 'Moving-Out': return 'bg-orange-500/10 text-orange-600';
      case 'Inactive': return 'bg-muted text-muted-foreground';
      default: return 'bg-blue-500/10 text-blue-600';
    }
  };

  const getPaymentColor = (status: Resident['paymentStatus']) => {
    switch (status) {
      case 'Paid': return 'bg-emerald-500/10 text-emerald-600';
      case 'Pending': return 'bg-amber-500/10 text-amber-600';
      case 'Overdue': return 'bg-red-500/10 text-red-600';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
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
          onClick={() => setResidentsNotice('Add Resident form is available on the table view.')}
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Resident
        </Button>
      </div>

      {residentsNotice ? <p className="text-xs font-semibold text-muted-foreground">{residentsNotice}</p> : null}

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <Card className="p-4 border-border/40 bg-card rounded-xl space-y-3 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600"><Users className="w-4 h-4" /></div>
            <span className="text-[8px] font-black uppercase text-muted-foreground/40">Total</span>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-black">{stats.total}</p>
            <p className="text-[9px] text-muted-foreground">residents</p>
          </div>
        </Card>

        <Card className="p-4 border-border/40 bg-card rounded-xl space-y-3 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600"><CheckCircle2 className="w-4 h-4" /></div>
            <span className="text-[8px] font-black uppercase text-muted-foreground/40">Active</span>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-black text-emerald-600">{stats.active}</p>
            <p className="text-[9px] text-muted-foreground">occupied</p>
          </div>
        </Card>

        <Card className="p-4 border-border/40 bg-card rounded-xl space-y-3 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600"><Calendar className="w-4 h-4" /></div>
            <span className="text-[8px] font-black uppercase text-muted-foreground/40">Pending</span>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-black text-amber-600">{stats.pending}</p>
            <p className="text-[9px] text-muted-foreground">upcoming</p>
          </div>
        </Card>

        <Card className="p-4 border-border/40 bg-card rounded-xl space-y-3 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-600"><HomeIcon className="w-4 h-4" /></div>
            <span className="text-[8px] font-black uppercase text-muted-foreground/40">Moving</span>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-black text-orange-600">{stats.movingOut}</p>
            <p className="text-[9px] text-muted-foreground">departing</p>
          </div>
        </Card>

        <Card className="p-4 border-border/40 bg-card rounded-xl space-y-3 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600"><CheckCircle2 className="w-4 h-4" /></div>
            <span className="text-[8px] font-black uppercase text-muted-foreground/40">Paid</span>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-black text-emerald-600">{stats.paidUp}</p>
            <p className="text-[9px] text-muted-foreground">payments ok</p>
          </div>
        </Card>

        <Card className="p-4 border-border/40 bg-card rounded-xl space-y-3 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="p-1.5 rounded-lg bg-red-500/10 text-red-600"><AlertCircle className="w-4 h-4" /></div>
            <span className="text-[8px] font-black uppercase text-muted-foreground/40">Overdue</span>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-black text-red-600">{stats.overdue}</p>
            <p className="text-[9px] text-muted-foreground">past due</p>
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
              placeholder="Search by name, email, or room..."
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
          <Button variant="outline" className="rounded-xl h-9 px-3 border-border text-muted-foreground gap-2 hover:bg-muted text-xs font-bold" onClick={() => setResidentsNotice('Resident export queued (mock).')}>
            <Download className="w-3.5 h-3.5" /> Export
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
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

          {/* Payment Filter */}
          <select
            value={selectedPayment}
            onChange={(e) => {
              setSelectedPayment(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 h-9 text-xs font-bold rounded-lg border border-border/40 bg-card hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <option value="all">All Payments</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>

          {/* Active Filters Badge */}
          {(searchTerm || selectedStatus !== 'all' || selectedFloor !== 'all' || selectedPayment !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              className="h-9 px-2 text-xs font-bold text-primary hover:bg-primary/10 rounded-lg"
              onClick={() => {
                setSearchTerm('');
                setSelectedStatus('all');
                setSelectedFloor('all');
                setSelectedPayment('all');
                setCurrentPage(1);
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Content Area */}
      {paginatedResidents.length === 0 ? (
        <Card className="p-12 border-border/40 bg-card rounded-xl flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-12 h-12 rounded-lg bg-muted/30 flex items-center justify-center text-muted-foreground/40">
            <Users className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-foreground">No residents found</p>
            <p className="text-xs text-muted-foreground">Try adjusting your filters or search terms</p>
          </div>
        </Card>
      ) : (
        <>
          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedResidents.map((resident) => (
                <Card
                  key={resident.id}
                  className="group border-border/40 bg-card rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => setResidentsNotice(`Resident ${resident.name} selected.`)}
                >
                  <div className="p-5 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 rounded-lg">
                          <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">{getInitials(resident.name)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h3 className="font-black text-foreground">{resident.name}</h3>
                          <p className="text-[8px] text-muted-foreground font-bold uppercase">{resident.room} • {resident.floor}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="w-3.5 h-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 rounded-lg p-1 border-border/40 shadow-xl">
                          <DropdownMenuLabel className="text-[9px] font-bold uppercase px-3 py-2">Actions</DropdownMenuLabel>
                          <DropdownMenuItem onSelect={() => setResidentsNotice(`Viewing ${resident.name}.`)} className="rounded-lg cursor-pointer py-1.5 px-3 text-xs font-semibold">
                            <Eye className="w-3 h-3 mr-2" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => setResidentsNotice(`Editing ${resident.name} (mock).`)} className="rounded-lg cursor-pointer py-1.5 px-3 text-xs font-semibold">
                            <Edit2 className="w-3 h-3 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => setResidentsNotice(`Delete flow opened for ${resident.name} (mock).`)} className="rounded-lg cursor-pointer py-1.5 px-3 text-xs font-semibold text-destructive">
                            <Trash2 className="w-3 h-3 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="space-y-2">
                      <div className="flex gap-2 flex-wrap">
                        <Badge className={cn("text-[8px] font-bold px-2 py-0.5 rounded-md border-none", getStatusColor(resident.status))}>
                          {resident.status}
                        </Badge>
                        <Badge className={cn("text-[8px] font-bold px-2 py-0.5 rounded-md border-none", getPaymentColor(resident.paymentStatus))}>
                          {resident.paymentStatus}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        <span className="truncate">{resident.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        <span>{resident.phone}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/20 text-[9px]">
                      <div>
                        <p className="text-muted-foreground font-bold uppercase mb-1">Joined</p>
                        <p className="font-black text-foreground">{resident.joinDate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground font-bold uppercase mb-1">Lease Ends</p>
                        <p className="font-black text-foreground">{resident.leaseEnd}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="border border-border/40 rounded-xl overflow-hidden bg-card">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 z-10 bg-muted/50 border-b border-border/40">
                    <tr>
                      <th className="p-3 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">Resident</th>
                      <th className="p-3 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">Contact</th>
                      <th className="p-3 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">Room</th>
                      <th className="p-3 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">Status</th>
                      <th className="p-3 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">Payment</th>
                      <th className="p-3 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">Lease End</th>
                      <th className="p-3 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {paginatedResidents.map((resident) => (
                      <tr key={resident.id} className="hover:bg-muted/30 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7 rounded-lg">
                              <AvatarFallback className="bg-primary/10 text-primary font-bold text-[9px]">{getInitials(resident.name)}</AvatarFallback>
                            </Avatar>
                            <p className="font-semibold text-foreground">{resident.name}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="text-xs space-y-0.5">
                            <p className="font-semibold text-foreground">{resident.email}</p>
                            <p className="text-muted-foreground">{resident.phone}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="text-sm">
                            <p className="font-bold text-foreground">{resident.room}</p>
                            <p className="text-[9px] text-muted-foreground">{resident.floor}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className={cn("text-[8px] font-bold border-none", getStatusColor(resident.status))}>
                            {resident.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge className={cn("text-[8px] font-bold border-none", getPaymentColor(resident.paymentStatus))}>
                            {resident.paymentStatus}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <p className="text-sm font-semibold text-foreground">{resident.leaseEnd}</p>
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
                              <DropdownMenuItem onSelect={() => setResidentsNotice(`Viewing ${resident.name}.`)} className="rounded-lg cursor-pointer py-1.5 px-3 text-xs font-semibold">
                                <Eye className="w-3 h-3 mr-2" /> View
                              </DropdownMenuItem>
                              <DropdownMenuItem onSelect={() => setResidentsNotice(`Editing ${resident.name} (mock).`)} className="rounded-lg cursor-pointer py-1.5 px-3 text-xs font-semibold">
                                <Edit2 className="w-3 h-3 mr-2" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onSelect={() => setResidentsNotice(`Delete flow opened for ${resident.name} (mock).`)} className="rounded-lg cursor-pointer py-1.5 px-3 text-xs font-semibold text-destructive">
                                <Trash2 className="w-3 h-3 mr-2" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
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
            Showing <span className="text-foreground">{(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredResidents.length)}</span> of <span className="text-foreground">{filteredResidents.length}</span> residents
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
