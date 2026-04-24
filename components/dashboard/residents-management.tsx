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
  HomeIcon,
  Archive,
  ArrowUpRight,
  ShieldCheck,
  Activity,
  UserPlus,
  Building2,
  GraduationCap as School,
  Globe2,
  Fingerprint,
  FileText,
  Clock
} from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '@/contexts/modal-context';
import { ResidentFormContent, ActionPlaceholderContent, FinanceContent } from '@/components/modal-contents';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface Resident {
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
  university?: string;
  course?: string;
  nationality?: string;
}

interface ResidentsManagementProps {
  title: string;
  description: string;
  residents: Resident[];
}

const ITEMS_PER_PAGE = 8;

export function ResidentsManagement({ title, description, residents }: ResidentsManagementProps) {
  const { openModal } = useModal();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedFloor, setSelectedFloor] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);

  // Extract unique values
  const floors = useMemo(() => [...new Set(residents.map(r => r.floor))].sort((a, b) => parseInt(a) - parseInt(b)), [residents]);
  const statuses = useMemo(() => [...new Set(residents.map(r => r.status))], [residents]);

  // Filter residents
  const filteredResidents = useMemo(() => {
    return residents.filter(resident => {
      const matchesSearch = resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resident.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resident.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resident.university?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || resident.status === selectedStatus;
      const matchesFloor = selectedFloor === 'all' || resident.floor === selectedFloor;
      return matchesSearch && matchesStatus && matchesFloor;
    });
  }, [residents, searchTerm, selectedStatus, selectedFloor]);

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
      case 'Overdue': return 'bg-rose-500/10 text-rose-600';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header: Clean & Focused */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/40">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground max-w-2xl">{description}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="rounded-xl h-11 px-6 border-border/40 bg-background/50 backdrop-blur-sm text-xs font-semibold gap-2 hover:bg-muted transition-all"
            onClick={() => openModal({
              id: 'archive',
              title: 'Archive Registry',
              component: <ActionPlaceholderContent action="Archive resident records" detail="Archive flow UI is active. Connect archive action to backend soft-delete endpoint." />,
              size: 'lg'
            })}
          >
            <Archive className="w-4 h-4" /> Archive
          </Button>
          <Button 
            className="rounded-xl h-11 px-8 font-bold bg-primary text-white shadow-lg shadow-primary/20 text-xs transition-all hover:scale-[1.02] active:scale-95 group"
            onClick={() => openModal({
              id: 'add-resident',
              title: 'Add New Resident',
              component: <ResidentFormContent mode="create" />,
              size: 'lg'
            })}
          >
            <UserPlus className="w-4 h-4 mr-2" /> Add Resident
          </Button>
        </div>
      </div>

      {/* Stats Section: Clean & Informative */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Residents', value: stats.total, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/5' },
          { label: 'Active', value: stats.active, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/5' },
          { label: 'Pending', value: stats.pending, icon: Calendar, color: 'text-amber-500', bg: 'bg-amber-500/5' },
          { label: 'Moving Out', value: stats.movingOut, icon: HomeIcon, color: 'text-orange-500', bg: 'bg-orange-500/5' },
          { label: 'Paid Up', value: stats.paidUp, icon: Activity, color: 'text-primary', bg: 'bg-primary/5' },
          { label: 'Overdue', value: stats.overdue, icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-500/5' },
        ].map((s, i) => (
          <Card key={i} className="group p-5 border-border/40 bg-background/50 backdrop-blur-sm rounded-2xl transition-all hover:border-primary/20 hover:shadow-md border">
            <div className="flex flex-col gap-4">
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center border border-border/40 shadow-sm transition-all group-hover:scale-105', s.bg, s.color)}>
                <s.icon className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">{s.label}</p>
                <p className="text-xl font-bold text-foreground">{s.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Control Bar: Modern & Functional */}
      <div className="p-2 border border-border/40 bg-background/40 backdrop-blur-md rounded-2xl">
        <div className="flex flex-col lg:flex-row gap-2">
          {/* Main Search */}
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
              <Search className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <Input
              placeholder="Search residents by name, room, university..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-4 h-11 text-sm bg-background border-none focus:ring-1 focus:ring-primary/20 rounded-xl transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* View Toggle */}
            <div className="flex gap-1 bg-muted/30 p-1 rounded-xl">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="sm"
                className={cn("rounded-lg px-3 h-9 text-[10px] font-bold uppercase tracking-wider", viewMode === 'grid' && "bg-background shadow-sm")}
                onClick={() => setViewMode('grid')}
              >
                <Grid3x3 className="w-4 h-4 mr-1.5" /> Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="sm"
                className={cn("rounded-lg px-3 h-9 text-[10px] font-bold uppercase tracking-wider", viewMode === 'list' && "bg-background shadow-sm")}
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4 mr-1.5" /> List
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                className="pl-3 pr-8 h-11 text-[10px] font-bold uppercase tracking-wider rounded-xl border border-border/40 bg-background hover:bg-muted/5 transition-all appearance-none cursor-pointer focus:outline-none"
              >
                <option value="all">All Status</option>
                {statuses.map(status => <option key={status} value={status}>{status}</option>)}
              </select>
              <select
                value={selectedFloor}
                onChange={(e) => { setSelectedFloor(e.target.value); setCurrentPage(1); }}
                className="pl-3 pr-8 h-11 text-[10px] font-bold uppercase tracking-wider rounded-xl border border-border/40 bg-background hover:bg-muted/5 transition-all appearance-none cursor-pointer focus:outline-none"
              >
                <option value="all">All Levels</option>
                {floors.map(floor => <option key={floor} value={floor}>Level {floor}</option>)}
              </select>
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              className="h-11 px-4 rounded-xl border-border/40 bg-background text-[10px] font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-all"
              onClick={() => openModal({
                id: 'export',
                title: 'Export Resident Data',
                component: <FinanceContent />,
                size: 'md'
              })}
            >
              <Download className="w-4 h-4 mr-2" /> Export
            </Button>
          </div>
        </div>
      </div>

      {/* Registry Content: Dossiers & Ledgers */}
      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          {filteredResidents.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Card className="p-12 border-border/40 bg-background/50 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center text-center space-y-4 border border-dashed">
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground/40">
                  <Users className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-foreground">No results found</h4>
                  <p className="text-xs text-muted-foreground/60 max-w-sm">No residents match your current search or filters.</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => { setSearchTerm(''); setSelectedStatus('all'); setSelectedFloor('all'); }} className="rounded-xl px-6 font-bold text-[10px] uppercase tracking-wider">Reset Filters</Button>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Grid View: Resident Dossier Mode */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {paginatedResidents.map((resident, idx) => (
                    <motion.div
                      key={resident.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.02 }}
                    >
                      <Card className="group relative border-border/40 bg-background/50 backdrop-blur-sm rounded-[1.5rem] overflow-hidden hover:shadow-lg transition-all duration-300 border">
                        <div className="p-6 space-y-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <Avatar className="h-12 w-12 rounded-xl border border-background shadow-sm">
                                  <AvatarFallback className="bg-primary/5 text-primary font-bold text-sm">{getInitials(resident.name)}</AvatarFallback>
                                </Avatar>
                                <div className={cn("absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background", resident.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500')} />
                              </div>
                              <div className="space-y-0.5">
                                <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">{resident.name}</h3>
                                <div className="flex items-center gap-1.5">
                                  <Badge variant="outline" className="text-[9px] h-4.5 font-bold border-muted-foreground/20 bg-muted/30 text-muted-foreground px-1.5 rounded-md">{resident.room}</Badge>
                                  <span className="text-[9px] font-medium text-muted-foreground/50">Level {resident.floor}</span>
                                </div>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-muted transition-all">
                                  <MoreHorizontal className="w-4 h-4 text-muted-foreground/40" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-40 rounded-xl p-1.5 border-border/40 shadow-xl bg-background/95 backdrop-blur-xl">
                                <DropdownMenuItem 
                                  className="rounded-lg cursor-pointer text-xs font-medium py-2 px-3"
                                  onClick={() => openModal({
                                    id: `view-${resident.id}`,
                                    title: `Resident Profile: ${resident.name}`,
                                    component: <ResidentFormContent mode="edit" residentName={resident.name} />,
                                    size: 'lg'
                                  })}
                                >
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="rounded-lg cursor-pointer text-xs font-medium py-2 px-3"
                                  onClick={() => openModal({
                                    id: `edit-${resident.id}`,
                                    title: `Edit Resident: ${resident.name}`,
                                    component: <ResidentFormContent mode="edit" residentName={resident.name} />,
                                    size: 'lg'
                                  })}
                                >
                                  Edit Details
                                </DropdownMenuItem>
                                <DropdownMenuLabel className="border-t border-border/20 mt-1.5 pt-1.5" />
                                <DropdownMenuItem 
                                  className="rounded-lg cursor-pointer text-xs font-medium py-2 px-3 text-rose-500"
                                  onClick={() => openModal({
                                    id: `archive-${resident.id}`,
                                    title: `Archive Resident: ${resident.name}`,
                                    component: <ActionPlaceholderContent action={`Archive ${resident.name}`} detail="Confirmation UI is ready; connect to archive API endpoint." />,
                                    size: 'md'
                                  })}
                                >
                                  Archive
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="space-y-3">
                            <div className="space-y-1">
                              <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-wider">Institution</p>
                              <p className="text-xs font-medium text-foreground line-clamp-1">{resident.university}</p>
                              <p className="text-[10px] text-muted-foreground/60 line-clamp-1 italic">{resident.course}</p>
                            </div>

                            <div className="flex items-center gap-3 pt-1">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="flex items-center gap-2 text-muted-foreground/60 hover:text-primary transition-colors cursor-help">
                                        <Mail className="w-3.5 h-3.5" />
                                        <span className="text-[10px] font-medium truncate max-w-[80px]">{resident.email}</span>
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent className="text-[10px]">{resident.email}</TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                <div className="flex items-center gap-2 text-muted-foreground/60">
                                  <Phone className="w-3.5 h-3.5" />
                                  <span className="text-[10px] font-medium">{resident.phone}</span>
                                </div>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-border/5 flex items-center justify-between">
                            <Badge className={cn("text-[9px] font-bold uppercase tracking-wider border-none px-2.5 py-0.5 rounded-full", getStatusColor(resident.status))}>{resident.status}</Badge>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 px-3 rounded-lg text-[10px] font-bold gap-1.5 hover:bg-primary/5 hover:text-primary transition-all"
                              onClick={() => openModal({
                                id: `manage-${resident.id}`,
                                title: `Manage ${resident.name}`,
                                component: <ResidentFormContent mode="edit" residentName={resident.name} />,
                                size: 'lg'
                              })}
                            >
                              Manage <ChevronRight className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* List View: Clean Table */}
              {viewMode === 'list' && (
                <Card className="border-border/40 bg-background/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm border">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-muted/20 border-b border-border/10">
                        <tr>
                          <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50 pl-6">Resident</th>
                          <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50">Details</th>
                          <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50">Unit</th>
                          <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50">Status</th>
                          <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50">Agreement</th>
                          <th className="p-4"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/5">
                        {paginatedResidents.map((resident) => (
                          <tr key={resident.id} className="group hover:bg-muted/10 transition-all cursor-pointer">
                            <td className="p-4 pl-6">
                              <div className="flex items-center gap-4">
                                <Avatar className="h-10 w-10 rounded-xl border border-background shadow-sm">
                                  <AvatarFallback className="bg-primary/5 text-primary font-bold text-xs">{getInitials(resident.name)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-bold text-foreground text-sm leading-none mb-1">{resident.name}</p>
                                  <p className="text-[10px] text-muted-foreground/60">{resident.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="space-y-0.5">
                                <p className="text-xs font-semibold text-foreground tracking-tight">{resident.university}</p>
                                <p className="text-[10px] text-muted-foreground/50">{resident.course}</p>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-1.5">
                                  <Building2 className="w-3 h-3 text-primary/40" />
                                  <p className="text-xs font-bold text-foreground">{resident.room}</p>
                                </div>
                                <p className="text-[10px] text-muted-foreground/40">Level {resident.floor}</p>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex flex-col gap-1.5">
                                <Badge className={cn("text-[9px] font-bold uppercase tracking-wider border-none px-2 py-0.5 rounded-full self-start", getStatusColor(resident.status))}>
                                  {resident.status}
                                </Badge>
                                <div className="flex items-center gap-1.5 px-0.5">
                                  <div className={cn("w-1.5 h-1.5 rounded-full", resident.paymentStatus === 'Paid' ? "bg-emerald-500" : "bg-rose-500")} />
                                  <span className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground/40">{resident.paymentStatus}</span>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="space-y-0.5">
                                <p className="text-xs font-bold text-foreground">{resident.leaseEnd}</p>
                                <p className="text-[10px] text-muted-foreground/40">Expires</p>
                              </div>
                            </td>
                            <td className="p-4 text-right pr-6">
                              <div className="flex items-center justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-lg hover:bg-muted transition-all"
                                  onClick={() => openModal({
                                    id: `list-edit-${resident.id}`,
                                    title: `Edit Resident: ${resident.name}`,
                                    component: <ResidentFormContent mode="edit" residentName={resident.name} />,
                                    size: 'lg'
                                  })}
                                >
                                  <Edit2 className="w-4 h-4 text-muted-foreground/40" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-lg hover:bg-muted transition-all text-rose-500"
                                  onClick={() => openModal({
                                    id: `list-archive-${resident.id}`,
                                    title: `Archive Resident: ${resident.name}`,
                                    component: <ActionPlaceholderContent action={`Archive ${resident.name}`} />,
                                    size: 'md'
                                  })}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pagination: Compact & Clean */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between py-4">
          <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-wider">
            Showing <span className="text-foreground">{(currentPage - 1) * ITEMS_PER_PAGE + 1}—{Math.min(currentPage * ITEMS_PER_PAGE, filteredResidents.length)}</span> of <span className="text-foreground">{filteredResidents.length}</span> residents
          </p>
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-lg border-border/40 bg-background shadow-sm hover:bg-muted transition-all"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? 'secondary' : 'ghost'}
                  className={cn(
                    "h-9 w-9 rounded-lg text-xs font-bold transition-all",
                    page === currentPage
                      ? "bg-primary text-white shadow-md shadow-primary/10"
                      : "text-muted-foreground/60 hover:bg-muted"
                  )}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-lg border-border/40 bg-background shadow-sm hover:bg-muted transition-all"
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
