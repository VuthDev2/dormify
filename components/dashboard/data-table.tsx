'use client';

import { type FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Plus,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Archive,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Column {
  header: string;
  accessor: string;
  cell?: (item: any) => React.ReactNode;
}

interface DataTableProps {
  title: string;
  description: string;
  columns: Column[];
  data: any[];
  tier: 'normal' | 'pro' | 'premium';
  actionLabel?: string;
}

const PAGE_SIZE = 10;

export function DataTable({ title, description, columns, data, tier, actionLabel }: DataTableProps) {
  const [tableData, setTableData] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPendingOnly, setShowPendingOnly] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const [tableNotice, setTableNotice] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEntryDialogOpen, setIsEntryDialogOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ accessor: string; direction: 'asc' | 'desc' } | null>(null);
  const [entryForm, setEntryForm] = useState({
    fullName: '',
    email: '',
    room: '',
    status: 'Pending',
  });
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTableData(data);
    setSelectedRow(null);
    setCurrentPage(1);
  }, [data]);

  const filteredData = useMemo(() => {
    const lowered = searchTerm.trim().toLowerCase();

    return tableData.filter((item) => {
      const searchable = Object.values(item)
        .map((value) => String(value ?? '').toLowerCase())
        .join(' ');
      const matchesSearch = lowered.length === 0 || searchable.includes(lowered);
      const statusValue = String(item?.status ?? '').toLowerCase();
      const matchesPending = !showPendingOnly || statusValue.includes('pending');
      return matchesSearch && matchesPending;
    });
  }, [searchTerm, showPendingOnly, tableData]);

  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    const sorted = [...filteredData];
    sorted.sort((a, b) => {
      const aValue = String(a?.[sortConfig.accessor] ?? '').toLowerCase();
      const bValue = String(b?.[sortConfig.accessor] ?? '').toLowerCase();
      const result = aValue.localeCompare(bValue, undefined, { numeric: true });
      return sortConfig.direction === 'asc' ? result : -result;
    });

    return sorted;
  }, [filteredData, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / PAGE_SIZE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedData.slice(start, start + PAGE_SIZE);
  }, [currentPage, sortedData]);

  const handleSort = (accessor: string) => {
    setSortConfig((previous) => {
      if (!previous || previous.accessor !== accessor) {
        return { accessor, direction: 'asc' };
      }

      return { accessor, direction: previous.direction === 'asc' ? 'desc' : 'asc' };
    });
  };

  const handleArchiveSelected = () => {
    if (!selectedRow) {
      setTableNotice('Select a row before archiving.');
      return;
    }

    const confirmed = window.confirm('Archive the selected row from this local list?');
    if (!confirmed) return;

    setTableData((previous) => previous.filter((entry) => entry !== selectedRow));
    setSelectedRow(null);
    setTableNotice('Selected row archived locally.');
  };

  const handleOpenNewEntry = () => {
    setEntryForm({
      fullName: '',
      email: '',
      room: '',
      status: 'Pending',
    });
    setIsEntryDialogOpen(true);
  };

  const handleSaveEntry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!entryForm.fullName.trim() || !entryForm.email.trim() || !entryForm.room.trim()) {
      setTableNotice('Please provide full name, email, and room.');
      return;
    }

    const template = tableData[0] ? { ...tableData[0] } : {};
    const nextItem: any = { ...template };

    if ('name' in nextItem) nextItem.name = entryForm.fullName;
    if ('email' in nextItem) nextItem.email = entryForm.email;
    if ('room' in nextItem) nextItem.room = entryForm.room;
    if ('status' in nextItem) nextItem.status = entryForm.status;

    if (!('name' in nextItem) && columns[0]) {
      nextItem[columns[0].accessor] = entryForm.fullName;
    }
    if (!('email' in nextItem) && columns[1]) {
      nextItem[columns[1].accessor] = entryForm.email;
    }
    if (!('room' in nextItem) && columns[2]) {
      nextItem[columns[2].accessor] = entryForm.room;
    }
    if (!('status' in nextItem) && columns[3]) {
      nextItem[columns[3].accessor] = entryForm.status;
    }

    setTableData((previous) => [nextItem, ...previous]);
    setIsEntryDialogOpen(false);
    setCurrentPage(1);
    setTableNotice(`${actionLabel || 'New entry'} saved to local data.`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight text-foreground">{title}</h2>
          <p className="text-sm font-medium text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {actionLabel ? (
            <Button
              onClick={handleOpenNewEntry}
              className={cn(
                'rounded-xl h-11 px-6 font-bold shadow-lg transition-all active:scale-95 text-white',
                tier === 'premium' ? 'bg-primary hover:bg-primary/90 shadow-primary/20' :
                tier === 'pro' ? 'bg-primary/80 hover:bg-primary/90 shadow-primary/10' :
                'bg-primary text-primary-foreground shadow-primary/10'
              )}
            >
              <Plus className="w-4 h-4 mr-2" /> {actionLabel}
            </Button>
          ) : null}
          <Button variant="outline" className="rounded-xl h-11 px-4 font-bold" onClick={handleOpenNewEntry}>
            New Entry
          </Button>
        </div>
      </div>

      {tableNotice ? <p className="text-xs font-semibold text-muted-foreground">{tableNotice}</p> : null}

      <Card
        className={cn(
          'overflow-hidden border-border/40 shadow-sm rounded-2xl bg-card transition-all flex flex-col max-h-[calc(100vh-250px)]',
          tier !== 'normal' ? 'shadow-2xl shadow-primary/5' : ''
        )}
      >
        <div className="p-4 flex flex-col gap-3 border-b border-border/40 bg-muted/30">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full sm:max-w-sm group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
                <Search
                  className={cn(
                    'w-4 h-4 transition-all duration-300',
                    tier === 'premium' ? 'text-primary group-focus-within:scale-110' : 'text-muted-foreground group-focus-within:text-primary'
                  )}
                />
              </div>
              <Input
                ref={searchInputRef}
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search records..."
                className={cn(
                  'pl-10 h-11 transition-all text-sm font-medium shadow-sm',
                  tier === 'premium'
                    ? 'bg-foreground/5 border-foreground/10 hover:bg-foreground/10 focus:bg-foreground/15 backdrop-blur-2xl rounded-xl'
                    : tier === 'pro'
                    ? 'bg-foreground/5 border-foreground/5 hover:bg-foreground/10 focus:bg-foreground/15 backdrop-blur-2xl rounded-xl'
                    : 'bg-muted border-border rounded-xl focus:bg-background'
                )}
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                className={cn('rounded-xl h-10 px-4 border-border text-muted-foreground gap-2 hover:bg-muted', showPendingOnly ? 'border-primary text-primary' : '')}
                onClick={() => {
                  setShowPendingOnly((previous) => !previous);
                  setCurrentPage(1);
                }}
              >
                <Filter className="w-4 h-4" /> {showPendingOnly ? 'Pending Only' : 'Filters'}
              </Button>
              <Button variant="outline" className="rounded-xl h-10 px-4 border-border text-muted-foreground hover:bg-muted" onClick={() => searchInputRef.current?.focus()}>
                Quick Search
              </Button>
              <Button variant="outline" className="rounded-xl h-10 px-4 border-border text-muted-foreground hover:bg-muted" onClick={handleArchiveSelected} disabled={!selectedRow}>
                <Archive className="w-4 h-4 mr-2" /> Archive
              </Button>
              <Button variant="outline" size="icon" className="rounded-xl h-10 w-10 border-border text-muted-foreground hover:bg-muted ml-auto sm:ml-0" onClick={() => setTableNotice('Export queued (mock).')}>
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-auto flex-1 scrollbar-thin scrollbar-thumb-border/40 scrollbar-track-transparent">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-card border-b border-border/40 shadow-sm">
              <tr className="border-b border-border/40">
                {columns.map((col, i) => (
                  <th key={i} className="p-3 pl-6 text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 bg-muted/50">
                    <button type="button" onClick={() => handleSort(col.accessor)} className="flex items-center gap-2 hover:text-foreground transition-colors">
                      {col.header}
                      <ArrowUpDown className={cn('w-3 h-3', sortConfig?.accessor === col.accessor ? 'opacity-100 text-primary' : 'opacity-30')} />
                    </button>
                  </th>
                ))}
                <th className="p-3 pr-6 bg-muted/50"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {paginatedData.map((item, i) => (
                <tr
                  key={i}
                  className={cn(
                    'group transition-colors cursor-pointer',
                    selectedRow === item ? 'bg-primary/10' : 'hover:bg-primary/5'
                  )}
                  onClick={() => setSelectedRow(item)}
                >
                  {columns.map((col, j) => (
                    <td key={j} className="p-3 pl-6 text-sm">
                      {col.cell ? col.cell(item) : <span className="font-semibold text-foreground/80">{item[col.accessor]}</span>}
                    </td>
                  ))}
                  <td className="p-3 pr-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-background border border-transparent hover:border-border/40">
                          <MoreHorizontal className="w-4 h-4 text-slate-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-xl p-1 border-border/40 shadow-xl">
                        <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 py-2">Row Actions</DropdownMenuLabel>
                        <DropdownMenuItem onSelect={() => setTableNotice('Viewing row details (mock).')} className="rounded-lg cursor-pointer py-2 px-3 font-semibold text-sm">View details</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setTableNotice('Editing row (mock).')} className="rounded-lg cursor-pointer py-2 px-3 font-semibold text-sm">Edit record</DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => {
                            setTableData((previous) => previous.filter((entry) => entry !== item));
                            setSelectedRow(null);
                            setTableNotice('Row removed from local data.');
                          }}
                          className="rounded-lg cursor-pointer py-2 px-3 font-bold text-sm text-destructive focus:text-destructive focus:bg-destructive/10"
                        >
                          Delete
                        </DropdownMenuItem>
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
            Showing <span className="text-foreground">{sortedData.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}-{Math.min(currentPage * PAGE_SIZE, sortedData.length)}</span> of <span className="text-foreground">{sortedData.length}</span> records
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg text-muted-foreground/40 disabled:opacity-20"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((previous) => Math.max(1, previous - 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(3, totalPages) }, (_, index) => {
                const page = Math.min(totalPages, Math.max(1, currentPage - 1 + index));
                return (
                  <Button
                    key={`${page}-${index}`}
                    variant={page === currentPage ? 'secondary' : 'ghost'}
                    className={cn(
                      'h-8 w-8 rounded-lg text-xs font-bold transition-all',
                      page === currentPage
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90'
                        : 'text-muted-foreground hover:bg-muted'
                    )}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg text-muted-foreground/40 disabled:opacity-20"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((previous) => Math.min(totalPages, previous + 1))}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <Dialog open={isEntryDialogOpen} onOpenChange={setIsEntryDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-black tracking-tight">{actionLabel || 'New Entry'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveEntry} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
              <Input
                value={entryForm.fullName}
                onChange={(event) => setEntryForm((previous) => ({ ...previous, fullName: event.target.value }))}
                placeholder="Alex Johnson"
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email</label>
              <Input
                type="email"
                value={entryForm.email}
                onChange={(event) => setEntryForm((previous) => ({ ...previous, email: event.target.value }))}
                placeholder="alex@example.com"
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Room</label>
              <Input
                value={entryForm.room}
                onChange={(event) => setEntryForm((previous) => ({ ...previous, room: event.target.value }))}
                placeholder="B-204"
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</label>
              <select
                value={entryForm.status}
                onChange={(event) => setEntryForm((previous) => ({ ...previous, status: event.target.value }))}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="Pending">Pending</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEntryDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
