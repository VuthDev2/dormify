'use client';

import { useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Clock,
  ShieldCheck,
  Calendar,
  Building2,
  Phone,
  Mail,
  MoreHorizontal,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Briefcase,
  Activity,
  Download,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type StaffTier = 'normal' | 'pro' | 'premium';

interface StaffRow {
  name: string;
  role: string;
  department: string;
  status: 'Active' | 'On leave' | 'Training';
  phone?: string;
  email?: string;
  shift?: string;
  lastActive?: string;
  cert?: string;
}

const STAFF_NORMAL: StaffRow[] = [
  { name: 'Robert Wilson', role: 'Building Manager', department: 'Operations', status: 'Active' },
  { name: 'Jane Smith', role: 'Front Desk', department: 'Reception', status: 'Active' },
  { name: 'David Okonkwo', role: 'Maintenance', department: 'Facilities', status: 'Active' },
  { name: 'Priya Nair', role: 'Night Porter', department: 'Security', status: 'On leave' },
];

const STAFF_PRO: StaffRow[] = [
  {
    name: 'Robert Wilson',
    role: 'Building Manager',
    department: 'Operations',
    status: 'Active',
    phone: '+44 7700 900321',
    email: 'r.wilson@dormify.local',
    shift: '08:00–17:00',
    lastActive: '2m ago',
  },
  {
    name: 'Jane Smith',
    role: 'Front Desk',
    department: 'Reception',
    status: 'Active',
    phone: '+44 7700 900322',
    email: 'j.smith@dormify.local',
    shift: '07:00–15:00',
    lastActive: '12m ago',
  },
  {
    name: 'David Okonkwo',
    role: 'Maintenance Lead',
    department: 'Facilities',
    status: 'Active',
    phone: '+44 7700 900323',
    email: 'd.okonkwo@dormify.local',
    shift: '09:00–18:00',
    lastActive: '1h ago',
  },
  {
    name: 'Priya Nair',
    role: 'Night Porter',
    department: 'Security',
    status: 'On leave',
    phone: '+44 7700 900324',
    email: 'p.nair@dormify.local',
    shift: '—',
    lastActive: '3d ago',
  },
  {
    name: 'Marcus Lee',
    role: 'Kitchen Assistant',
    department: 'Hospitality',
    status: 'Training',
    phone: '+44 7700 900325',
    email: 'm.lee@dormify.local',
    shift: '10:00–18:00',
    lastActive: 'Just now',
  },
];

const STAFF_PREMIUM: StaffRow[] = STAFF_PRO.map((s, i) => ({
  ...s,
  cert: i === 0 ? 'Fire warden · First aid' : i === 1 ? 'First aid' : i === 2 ? 'Electrical safe' : i === 3 ? 'SIA (exp. Jun)' : 'Food hygiene L2',
}));

const coverage = [
  { day: 'Mon', pct: 92 },
  { day: 'Tue', pct: 88 },
  { day: 'Wed', pct: 95 },
  { day: 'Thu', pct: 90 },
  { day: 'Fri', pct: 94 },
  { day: 'Sat', pct: 72 },
  { day: 'Sun', pct: 68 },
];

const activity = [
  { text: 'Jane Smith updated shift swap (Front Desk)', time: '14:02' },
  { text: 'David Okonkwo closed work order #WO-441', time: '11:40' },
  { text: 'New hire onboarding started — Marcus Lee', time: '09:05' },
];

function statusBadge(status: StaffRow['status']) {
  return (
    <Badge
      className={cn(
        'text-[9px] font-bold uppercase tracking-wider border-none',
        status === 'Active' && 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
        status === 'On leave' && 'bg-amber-500/15 text-amber-800 dark:text-amber-400',
        status === 'Training' && 'bg-primary/15 text-primary',
      )}
    >
      {status}
    </Badge>
  );
}

export function StaffContent({ tier }: { tier: StaffTier }) {
  const [staffNotice, setStaffNotice] = useState<string | null>(null);
  const isNormal = tier === 'normal';
  const isPro = tier === 'pro';
  const isPremium = tier === 'premium';

  const data = isNormal ? STAFF_NORMAL : isPremium ? STAFF_PREMIUM : STAFF_PRO;

  const statsPro = [
    { label: 'Headcount', value: '24', sub: 'Across all sites', icon: Users },
    { label: 'On shift now', value: '9', sub: 'Coverage OK', icon: Clock },
    { label: 'Onboarding', value: '2', sub: 'In progress', icon: UserPlus },
    { label: 'Certs due (30d)', value: '3', sub: 'Renewals', icon: ShieldCheck },
  ];

  const statsPremium = [
    ...statsPro.slice(0, 3),
    { label: 'Compliance score', value: '96%', sub: 'Training + checks', icon: ShieldCheck },
  ];

  return (
    <div
      className={cn(
        'space-y-6 animate-in fade-in duration-500',
        isPremium && 'space-y-8',
      )}
    >
      {/* Header */}
      <div
        className={cn(
          'flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-border/50 pb-5',
          isPremium && 'pb-6',
        )}
      >
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h1
              className={cn(
                'font-black tracking-tight text-foreground',
                isNormal ? 'text-2xl' : 'text-2xl md:text-3xl',
              )}
            >
              Staff
            </h1>
            {!isNormal && (
              <Badge
                variant="outline"
                className={cn(
                  'rounded-full text-[10px] font-bold uppercase tracking-widest',
                  isPremium && 'border-primary/40 bg-primary/5 text-primary',
                )}
              >
                {tier} plan
              </Badge>
            )}
          </div>
          <p
            className={cn(
              'text-muted-foreground',
              isNormal ? 'text-sm' : 'text-sm font-medium max-w-xl',
            )}
          >
            {isNormal &&
              'A simple directory of your team. Add roles and keep contact details up to date.'}
            {isPro &&
              'Schedules, coverage, and contact info in one place—so you always know who is on duty.'}
            {isPremium &&
              'Workforce oversight with compliance signals, coverage trends, and an audit-friendly activity feed.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {!isNormal && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl font-semibold gap-2"
              onClick={() => setStaffNotice('Staff export queued (mock).')}
            >
              <Download className="w-4 h-4" />
              Export
            </Button>
          )}
          <Button
            className={cn(
              'rounded-xl font-bold shadow-lg active:scale-[0.98] transition-all',
              isNormal && 'h-10 px-5',
              isPro && 'h-10 px-5 bg-primary shadow-primary/20',
                isPremium &&
                'h-11 px-6 bg-primary shadow-xl shadow-primary/25 hover:bg-primary/90',
            )}
            onClick={() => setStaffNotice('Add staff form is coming soon.')}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add staff
          </Button>
        </div>
      </div>

      {staffNotice ? (
        <p className="text-xs font-semibold text-muted-foreground">{staffNotice}</p>
      ) : null}

      {/* Normal: minimal summary line */}
      {isNormal && (
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{data.length}</span> team members listed
        </p>
      )}

      {/* Pro / Premium stats */}
      {!isNormal && (
        <div
          className={cn(
            'grid gap-3 sm:grid-cols-2',
            isPro ? 'lg:grid-cols-4' : 'lg:grid-cols-4',
          )}
        >
          {(isPremium ? statsPremium : statsPro).map((s, i) => (
            <Card
              key={i}
              className={cn(
                'p-4 border-border/50 bg-card',
                isPremium
                  ? 'rounded-2xl shadow-sm hover:shadow-md transition-shadow border-primary/10'
                  : 'rounded-xl',
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div
                  className={cn(
                    'rounded-lg p-2',
                    isPremium ? 'bg-primary/10 text-primary' : 'bg-muted/60 text-muted-foreground',
                  )}
                >
                  <s.icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right leading-tight">
                  {s.label}
                </span>
              </div>
              <p className="mt-3 text-2xl font-black tracking-tight">{s.value}</p>
              <p className="text-[11px] font-medium text-muted-foreground mt-0.5">{s.sub}</p>
            </Card>
          ))}
        </div>
      )}

      {/* Premium-only: coverage + compliance row */}
      {isPremium && (
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2 p-5 rounded-2xl border-border/50 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Weekly coverage
                </p>
                <p className="text-sm font-semibold text-foreground mt-0.5">
                  Shift fill rate by day
                </p>
              </div>
              <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                <TrendingUp className="w-3.5 h-3.5" />
                +4% vs last week
              </div>
            </div>
            <div className="flex items-end justify-between gap-1 h-24 pt-2 border-t border-border/40">
              {coverage.map((d) => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group">
                  <div
                    className="w-full max-w-[40px] rounded-t-md bg-primary/80 group-hover:bg-primary transition-colors"
                    style={{ height: `${Math.round((d.pct / 100) * 72)}px` }}
                  />
                  <span className="text-[9px] font-bold text-muted-foreground">{d.day}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-5 rounded-2xl border-border/50 shadow-sm bg-gradient-to-br from-card to-muted/20">
            <div className="flex items-center gap-2 text-primary mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Compliance
              </span>
            </div>
            <p className="text-sm font-medium text-muted-foreground leading-relaxed">
              All mandatory training current for on-shift staff.{' '}
              <span className="text-foreground font-semibold">3 renewals</span> due in the next 30
              days—assign refresher sessions from the staff profile.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge className="bg-emerald-500/15 text-emerald-800 dark:text-emerald-400 border-none text-[10px] font-semibold">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Right-to-work verified
              </Badge>
              <Badge variant="outline" className="text-[10px] font-semibold">
                DBS checks OK
              </Badge>
            </div>
          </Card>
        </div>
      )}

      {/* Toolbar — Pro & Premium */}
      {!isNormal && (
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, role, or department..."
              className={cn(
                'pl-10 h-11 rounded-xl border-border/60',
                isPremium && 'bg-muted/20',
              )}
            />
          </div>
          <Button
            variant="outline"
            className="rounded-xl gap-2 h-11 shrink-0"
            onClick={() => setStaffNotice('Staff filters opened (mock).')}
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>
      )}

      <div
        className={cn(
          'grid gap-4',
          isPro && 'lg:grid-cols-[minmax(0,1fr)_minmax(260px,300px)]',
          isPremium && 'lg:grid-cols-3',
        )}
      >
        {/* Main table */}
        <Card
          className={cn(
            'overflow-hidden border-border/50',
            isNormal ? 'rounded-xl' : 'rounded-2xl shadow-sm',
            isPremium ? 'lg:col-span-2 shadow-md border-primary/10' : '',
          )}
        >
          {isNormal && (
            <div className="p-4 border-b border-border/50 bg-muted/30 flex items-center gap-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search staff..." className="h-9 border-0 bg-transparent shadow-none focus-visible:ring-0" />
            </div>
          )}
          {!isNormal && (
            <div className="px-4 py-3 border-b border-border/50 bg-muted/20 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Directory
              </span>
              <span className="text-xs text-muted-foreground">{data.length} people</span>
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border/50 bg-muted/10">
                  <th className="p-3 md:p-4 font-bold text-[10px] uppercase tracking-widest text-muted-foreground">
                    Name
                  </th>
                  <th className="p-3 md:p-4 font-bold text-[10px] uppercase tracking-widest text-muted-foreground">
                    Role
                  </th>
                  {!isNormal && (
                    <th className="p-3 md:p-4 font-bold text-[10px] uppercase tracking-widest text-muted-foreground hidden md:table-cell">
                      Department
                    </th>
                  )}
                  {isNormal && (
                    <th className="p-3 md:p-4 font-bold text-[10px] uppercase tracking-widest text-muted-foreground">
                      Dept
                    </th>
                  )}
                  {!isNormal && (
                    <>
                      <th className="p-3 md:p-4 font-bold text-[10px] uppercase tracking-widest text-muted-foreground hidden lg:table-cell">
                        Contact
                      </th>
                      <th className="p-3 md:p-4 font-bold text-[10px] uppercase tracking-widest text-muted-foreground hidden xl:table-cell">
                        Shift
                      </th>
                    </>
                  )}
                  {isPremium && (
                    <th className="p-3 md:p-4 font-bold text-[10px] uppercase tracking-widest text-muted-foreground hidden lg:table-cell">
                      Certifications
                    </th>
                  )}
                  <th className="p-3 md:p-4 font-bold text-[10px] uppercase tracking-widest text-muted-foreground">
                    Status
                  </th>
                  <th className="p-3 md:p-4 w-10" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {data.map((row, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors group">
                    <td className="p-3 md:p-4">
                      <div className="flex items-center gap-3">
                        <Avatar
                          className={cn(
                            'h-9 w-9',
                            isNormal ? 'rounded-md' : 'rounded-full ring-2 ring-border/40',
                          )}
                        >
                          <AvatarFallback
                            className={cn(
                              'font-bold text-[10px]',
                              isNormal ? 'bg-muted' : 'bg-primary/10 text-primary',
                            )}
                          >
                            {row.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-foreground">{row.name}</p>
                          {!isNormal && (
                            <p className="text-[11px] text-muted-foreground md:hidden">
                              {row.department}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-3 md:p-4">
                      <span className="font-medium">{row.role}</span>
                    </td>
                    <td className="p-3 md:p-4 hidden md:table-cell text-muted-foreground">
                      {row.department}
                    </td>
                    {!isNormal && (
                      <>
                        <td className="p-3 md:p-4 hidden lg:table-cell">
                          <div className="space-y-1 text-xs">
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <Mail className="w-3 h-3 shrink-0" />
                              <span className="truncate max-w-[140px]">{row.email}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <Phone className="w-3 h-3 shrink-0" />
                              {row.phone}
                            </div>
                          </div>
                        </td>
                        <td className="p-3 md:p-4 hidden xl:table-cell text-xs font-mono text-muted-foreground">
                          {row.shift}
                        </td>
                      </>
                    )}
                    {isPremium && (
                      <td className="p-3 md:p-4 hidden lg:table-cell text-xs text-muted-foreground max-w-[180px]">
                        {row.cert}
                      </td>
                    )}
                    <td className="p-3 md:p-4">{statusBadge(row.status)}</td>
                    <td className="p-3 md:p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem onSelect={() => setStaffNotice(`Viewing ${row.name} profile (mock).`)}>View profile</DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => setStaffNotice(`Editing ${row.name} (mock).`)}>Edit</DropdownMenuItem>
                          {!isNormal && <DropdownMenuItem onSelect={() => setStaffNotice(`Scheduling ${row.name} (mock).`)}>Schedule</DropdownMenuItem>}
                          {isPremium && <DropdownMenuItem onSelect={() => setStaffNotice(`${row.name} compliance log opened (mock).`)}>Compliance log</DropdownMenuItem>}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Pro: side column */}
        {isPro && (
          <div className="space-y-4">
            <Card className="p-5 rounded-2xl border-border/50 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold">Today&apos;s coverage</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Morning shift is fully staffed. Evening desk needs one backup—consider calling
                someone from the float pool.
              </p>
              <Button variant="outline" size="sm" className="mt-4 w-full rounded-xl font-semibold" onClick={() => setStaffNotice('Rota view opened (mock).')}>
                View rota
              </Button>
            </Card>
            <Card className="p-5 rounded-2xl border-border/50 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-bold">Open actions</span>
              </div>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  Approve Marcus Lee&apos;s probation checklist
                </li>
                <li className="flex gap-2">
                  <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                  Priya Nair return-to-work date next Monday
                </li>
              </ul>
            </Card>
          </div>
        )}

        {/* Premium: activity */}
        {isPremium && (
          <Card className="p-5 rounded-2xl border-border/50 shadow-md border-primary/10">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold">Recent activity</span>
            </div>
            <p className="text-[11px] font-medium text-muted-foreground mb-3">
              Useful for audits and handovers—who changed what, and when.
            </p>
            <ul className="space-y-3">
              {activity.map((a, i) => (
                <li
                  key={i}
                  className="text-xs border-l-2 border-primary/30 pl-3 py-0.5"
                >
                  <span className="text-muted-foreground font-mono">{a.time}</span>
                  <p className="text-foreground mt-0.5">{a.text}</p>
                </li>
              ))}
            </ul>
            <Button variant="ghost" size="sm" className="mt-4 w-full rounded-xl text-primary font-semibold" onClick={() => setStaffNotice('Audit log opened (mock).')}>
              Full audit log
            </Button>
          </Card>
        )}
      </div>

      {/* Pro second row - quick links (optional visual balance) */}
      {isPro && (
        <Card className="p-4 rounded-xl border-dashed border-border bg-muted/20 flex flex-wrap items-center gap-4 justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="w-4 h-4" />
            <span>
              Manage departments, job titles, and default shifts in{' '}
              <span className="font-semibold text-foreground">Settings</span>.
            </span>
          </div>
          <Button variant="link" className="text-primary font-semibold p-0 h-auto" onClick={() => setStaffNotice('Settings route opened from staff panel (mock).')}>
            Open settings
          </Button>
        </Card>
      )}
    </div>
  );
}
