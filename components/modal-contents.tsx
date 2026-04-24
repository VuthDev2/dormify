'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Users,
  Building2,
  Wallet,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useModal } from '@/contexts/modal-context';

// ============= PROPERTIES CONTENT =============
export function PropertiesContent() {
  const properties = [
    {
      name: 'Manhattan Central',
      occupancy: 98.2,
      status: 'Operational',
      residents: 142,
      revenue: '$24,500',
      rooms: 150,
      color: 'emerald',
    },
    {
      name: 'Brooklyn Heights',
      occupancy: 92.5,
      status: 'Operational',
      residents: 118,
      revenue: '$18,200',
      rooms: 130,
      color: 'blue',
    },
    {
      name: 'Queens Plaza',
      occupancy: 88.1,
      status: 'Maintenance',
      residents: 105,
      revenue: '$16,100',
      rooms: 120,
      color: 'amber',
    },
  ];

  const occupancyData = [
    { name: 'Manhattan', occupancy: 98 },
    { name: 'Brooklyn', occupancy: 92 },
    { name: 'Queens', occupancy: 88 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">Properties Overview</h3>
        <div className="grid grid-cols-1 gap-4">
          {properties.map((prop) => (
            <motion.div
              key={prop.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all cursor-pointer hover:shadow-md"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-bold text-foreground">{prop.name}</p>
                  <p className="text-sm text-muted-foreground">{prop.residents} residents</p>
                </div>
                <Badge
                  className={cn(
                    'text-xs font-bold',
                    prop.status === 'Operational'
                      ? 'bg-emerald-500/10 text-emerald-600'
                      : 'bg-amber-500/10 text-amber-600'
                  )}
                >
                  {prop.status}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Occupancy</p>
                  <p className="font-bold">{prop.occupancy}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Rooms</p>
                  <p className="font-bold">{prop.rooms}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Revenue</p>
                  <p className="font-bold text-emerald-600">{prop.revenue}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">Occupancy Chart</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={occupancyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="occupancy" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ============= RESIDENTS CONTENT =============
export function ResidentsContent() {
  const residents = [
    {
      name: 'Sarah Johnson',
      room: 'A-402',
      email: 'sarah.j@email.com',
      status: 'Active',
      joinDate: '2024-01-15',
    },
    {
      name: 'Michael Chen',
      room: 'B-305',
      email: 'michael.c@email.com',
      status: 'Active',
      joinDate: '2024-02-20',
    },
    {
      name: 'Emma Davis',
      room: 'C-108',
      email: 'emma.d@email.com',
      status: 'Active',
      joinDate: '2024-03-10',
    },
    {
      name: 'James Wilson',
      room: 'D-501',
      email: 'james.w@email.com',
      status: 'Inactive',
      joinDate: '2023-11-05',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="p-4 border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Total Residents</p>
          <p className="text-2xl font-bold text-foreground">142</p>
          <p className="text-xs text-emerald-600 mt-2">+5 this month</p>
        </Card>
        <Card className="p-4 border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Active</p>
          <p className="text-2xl font-bold text-emerald-600">138</p>
          <p className="text-xs text-muted-foreground mt-2">97.2% occupancy</p>
        </Card>
        <Card className="p-4 border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Pending Departure</p>
          <p className="text-2xl font-bold text-amber-600">4</p>
          <p className="text-xs text-muted-foreground mt-2">Next 30 days</p>
        </Card>
      </div>

      <div>
        <h4 className="font-bold mb-3 text-foreground">Recent Residents</h4>
        <div className="space-y-3">
          {residents.map((resident) => (
            <motion.div
              key={resident.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-foreground">{resident.name}</p>
                  <p className="text-sm text-muted-foreground">{resident.email}</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">Room {resident.room}</p>
                </div>
                <Badge
                  variant={resident.status === 'Active' ? 'default' : 'outline'}
                  className={cn(
                    'text-xs',
                    resident.status === 'Active'
                      ? 'bg-emerald-500 text-white'
                      : 'text-muted-foreground'
                  )}
                >
                  {resident.status}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============= MEALS CONTENT =============
export function MealsContent() {
  const mealData = [
    { name: 'Breakfast', value: 340 },
    { name: 'Lunch', value: 420 },
    { name: 'Dinner', value: 380 },
    { name: 'Snacks', value: 150 },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  const mealPlans = [
    {
      day: 'Monday',
      breakfast: 'Eggs & Toast',
      lunch: 'Grilled Chicken',
      dinner: 'Pasta Carbonara',
    },
    {
      day: 'Tuesday',
      breakfast: 'Oatmeal Bowl',
      lunch: 'Fish & Chips',
      dinner: 'Beef Stew',
    },
    {
      day: 'Wednesday',
      breakfast: 'Pancakes',
      lunch: 'Caesar Salad',
      dinner: 'Vegetable Curry',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">Meal Statistics</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={mealData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {mealData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">Weekly Menu</h3>
        <div className="space-y-3">
          {mealPlans.map((plan) => (
            <motion.div
              key={plan.day}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all"
            >
              <p className="font-bold text-foreground mb-2">{plan.day}</p>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Breakfast</p>
                  <p className="text-sm">{plan.breakfast}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Lunch</p>
                  <p className="text-sm">{plan.lunch}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Dinner</p>
                  <p className="text-sm">{plan.dinner}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============= FINANCE CONTENT =============
export function FinanceContent() {
  const financeData = [
    { month: 'Jul', revenue: 85000, expense: 62000 },
    { month: 'Aug', revenue: 88000, expense: 64000 },
    { month: 'Sep', revenue: 91000, expense: 66000 },
    { month: 'Oct', revenue: 95000, expense: 68000 },
    { month: 'Nov', revenue: 92000, expense: 67000 },
    { month: 'Dec', revenue: 98000, expense: 70000 },
  ];

  const transactions = [
    {
      id: 1,
      type: 'Income',
      description: 'Rent Collection - October',
      amount: '$12,450',
      date: '2024-10-01',
      status: 'Completed',
    },
    {
      id: 2,
      type: 'Expense',
      description: 'Facility Maintenance',
      amount: '-$3,200',
      date: '2024-10-02',
      status: 'Completed',
    },
    {
      id: 3,
      type: 'Income',
      description: 'Meal Plan Fees',
      amount: '$2,840',
      date: '2024-10-03',
      status: 'Pending',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-emerald-600">$549,000</p>
          <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
            <ArrowUp className="w-3 h-3" /> +8.5% vs last year
          </p>
        </Card>
        <Card className="p-4 border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
          <p className="text-2xl font-bold text-rose-600">$397,000</p>
          <p className="text-xs text-muted-foreground mt-2">72.3% of revenue</p>
        </Card>
        <Card className="p-4 border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Net Profit</p>
          <p className="text-2xl font-bold text-blue-600">$152,000</p>
          <p className="text-xs text-blue-600 mt-2">27.7% profit margin</p>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">Revenue vs Expenses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={financeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: '#10b981', r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ fill: '#ef4444', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all flex justify-between items-center"
            >
              <div className="flex-1">
                <p className="font-bold text-foreground">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">{transaction.date}</p>
              </div>
              <div className="text-right">
                <p className={cn('font-bold text-sm', transaction.type === 'Income' ? 'text-emerald-600' : 'text-rose-600')}>
                  {transaction.amount}
                </p>
                <Badge
                  variant="outline"
                  className={cn(
                    'text-xs mt-1',
                    transaction.status === 'Completed'
                      ? 'bg-emerald-500/10 text-emerald-600'
                      : 'bg-amber-500/10 text-amber-600'
                  )}
                >
                  {transaction.status}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============= MAINTENANCE CONTENT =============
export function MaintenanceContent() {
  const tickets = [
    {
      id: '#MNT-001',
      title: 'HVAC Filter Replacement',
      room: 'A-402',
      status: 'Completed',
      priority: 'Normal',
      date: '2024-10-01',
    },
    {
      id: '#MNT-002',
      title: 'Plumbing Leak',
      room: 'B-315',
      status: 'In Progress',
      priority: 'High',
      date: '2024-10-02',
    },
    {
      id: '#MNT-003',
      title: 'Window Repair',
      room: 'C-108',
      status: 'Pending',
      priority: 'Normal',
      date: '2024-10-03',
    },
    {
      id: '#MNT-004',
      title: 'Electrical Issue',
      room: 'D-205',
      status: 'Pending',
      priority: 'Critical',
      date: '2024-10-04',
    },
  ];

  const stats = [
    { label: 'Total Tickets', value: '47', color: 'text-blue-600' },
    { label: 'Completed', value: '38', color: 'text-emerald-600' },
    { label: 'In Progress', value: '5', color: 'text-amber-600' },
    { label: 'Pending', value: '4', color: 'text-rose-600' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4 border-border/50 text-center">
            <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
            <p className={cn('text-2xl font-bold', stat.color)}>{stat.value}</p>
          </Card>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">Work Orders</h3>
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold text-foreground">{ticket.title}</p>
                  <p className="text-sm text-muted-foreground">{ticket.id} - Room {ticket.room}</p>
                </div>
                <div className="flex gap-2">
                  <Badge
                    className={cn(
                      'text-xs',
                      ticket.priority === 'Critical'
                        ? 'bg-rose-500 text-white'
                        : ticket.priority === 'High'
                          ? 'bg-amber-500 text-white'
                          : 'bg-blue-500 text-white'
                    )}
                  >
                    {ticket.priority}
                  </Badge>
                  <Badge
                    className={cn(
                      'text-xs',
                      ticket.status === 'Completed'
                        ? 'bg-emerald-500/10 text-emerald-600'
                        : ticket.status === 'In Progress'
                          ? 'bg-blue-500/10 text-blue-600'
                          : 'bg-amber-500/10 text-amber-600'
                    )}
                  >
                    {ticket.status}
                  </Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground/60">{ticket.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============= STAFF CONTENT =============
export function StaffContent() {
  const staff = [
    { name: 'Alex Martinez', role: 'Facility Manager', email: 'alex@dormify.com', status: 'Active' },
    { name: 'Chef James', role: 'Head Chef', email: 'james@dormify.com', status: 'Active' },
    { name: 'Sarah Kim', role: 'Housekeeping Lead', email: 'sarah@dormify.com', status: 'Active' },
    { name: 'Mike Johnson', role: 'Maintenance Tech', email: 'mike@dormify.com', status: 'On Leave' },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-4 border-border/50">
        <p className="text-sm text-muted-foreground mb-1">Staff Members</p>
        <p className="text-2xl font-bold text-foreground">12</p>
        <p className="text-xs text-muted-foreground mt-2">All departments active</p>
      </Card>

      <div className="space-y-3">
        {staff.map((member) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-foreground">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.role}</p>
                <p className="text-xs text-muted-foreground/60">{member.email}</p>
              </div>
              <Badge
                className={cn(
                  'text-xs',
                  member.status === 'Active'
                    ? 'bg-emerald-500/10 text-emerald-600'
                    : 'bg-amber-500/10 text-amber-600'
                )}
              >
                {member.status}
              </Badge>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============= SETTINGS CONTENT =============
export function SettingsContent() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-foreground mb-4">General Settings</h3>
        <div className="space-y-3">
          <div className="p-4 rounded-xl border border-border/50 flex justify-between items-center">
            <div>
              <p className="font-bold text-foreground">Dormitory Name</p>
              <p className="text-sm text-muted-foreground">Manhattan Central</p>
            </div>
            <Button variant="outline" size="sm">Edit</Button>
          </div>
          <div className="p-4 rounded-xl border border-border/50 flex justify-between items-center">
            <div>
              <p className="font-bold text-foreground">Default Meal Setting</p>
              <p className="text-sm text-muted-foreground">Meals ON by default</p>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
          <div className="p-4 rounded-xl border border-border/50 flex justify-between items-center">
            <div>
              <p className="font-bold text-foreground">Timezone</p>
              <p className="text-sm text-muted-foreground">Eastern Time (UTC-5)</p>
            </div>
            <Button variant="outline" size="sm">Change</Button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-foreground mb-4">Notification Settings</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-4 rounded-xl border border-border/50 cursor-pointer hover:bg-muted/50 transition-colors">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <div>
              <p className="font-bold text-foreground">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive updates via email</p>
            </div>
          </label>
          <label className="flex items-center gap-3 p-4 rounded-xl border border-border/50 cursor-pointer hover:bg-muted/50 transition-colors">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <div>
              <p className="font-bold text-foreground">SMS Alerts</p>
              <p className="text-sm text-muted-foreground">Critical alerts via SMS</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

type ActionPlaceholderProps = {
  action: string;
  detail?: string;
};

export function ActionPlaceholderContent({ action, detail }: ActionPlaceholderProps) {
  const { closeModal } = useModal();
  return (
    <div className="space-y-5">
      <Card className="p-5 border-border/40 bg-muted/20">
        <p className="text-sm font-semibold text-foreground">{action}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {detail || 'This flow is ready for backend wiring. Fields and actions can now be connected to API routes.'}
        </p>
      </Card>
      <div className="flex justify-end">
        <Button onClick={closeModal}>Close</Button>
      </div>
    </div>
  );
}

type ResidentFormContentProps = {
  mode?: 'create' | 'edit';
  residentName?: string;
};

export function ResidentFormContent({ mode = 'create', residentName }: ResidentFormContentProps) {
  const { closeModal } = useModal();
  const [saved, setSaved] = useState(false);
  const title = mode === 'create' ? 'Create resident profile' : `Update ${residentName || 'resident'} profile`;

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSaved(true);
      }}
    >
      <p className="text-sm text-muted-foreground">{title}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input required placeholder="Full name" />
        <Input required type="email" placeholder="Email address" />
        <Input required placeholder="Phone number" />
        <Input placeholder="Emergency contact" />
        <Input required placeholder="Room (e.g. A-402)" />
        <Input required placeholder="Floor (e.g. 4)" />
        <Input placeholder="University" />
        <Input placeholder="Course / Major" />
        <Input placeholder="Nationality" />
        <select className="h-10 rounded-md border border-input bg-background px-3 text-sm">
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Inactive">Inactive</option>
          <option value="Moving-Out">Moving-Out</option>
        </select>
      </div>
      <Textarea placeholder="Notes for onboarding, lease terms, or special requirements" />
      {saved && (
        <p className="text-xs text-emerald-600">
          Form captured successfully. Connect this submit to your residents API endpoint.
        </p>
      )}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
        <Button type="submit">{mode === 'create' ? 'Create Resident' : 'Save Changes'}</Button>
      </div>
    </form>
  );
}

export function RoomFormContent() {
  const { closeModal } = useModal();
  const [saved, setSaved] = useState(false);

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSaved(true);
      }}
    >
      <p className="text-sm text-muted-foreground">Add or allocate a new room/unit for inventory and assignment.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input required placeholder="Unit name (e.g. B-203)" />
        <Input required placeholder="Floor" />
        <select className="h-10 rounded-md border border-input bg-background px-3 text-sm">
          <option>Studio</option>
          <option>Standard</option>
          <option>Suite</option>
        </select>
        <Input required placeholder="Rent amount (e.g. $850)" />
        <select className="h-10 rounded-md border border-input bg-background px-3 text-sm">
          <option>Vacant</option>
          <option>Occupied</option>
          <option>Arriving</option>
          <option>Maintenance</option>
        </select>
        <select className="h-10 rounded-md border border-input bg-background px-3 text-sm">
          <option>Clean</option>
          <option>Dirty</option>
          <option>Inspected</option>
          <option>Maintenance</option>
        </select>
      </div>
      <Textarea placeholder="Internal room notes" />
      {saved && <p className="text-xs text-emerald-600">Unit form saved. Ready for POST/PATCH integration.</p>}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
        <Button type="submit">Save Unit</Button>
      </div>
    </form>
  );
}

export function DormitoryFormContent() {
  const { closeModal } = useModal();
  const [saved, setSaved] = useState(false);

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSaved(true);
      }}
    >
      <p className="text-sm text-muted-foreground">Create a property profile to connect with rooms, staff, and finance endpoints.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input required placeholder="Dormitory name" />
        <Input required placeholder="Address / City" />
        <Input required type="number" min="1" placeholder="Total rooms" />
        <select className="h-10 rounded-md border border-input bg-background px-3 text-sm">
          <option>Active</option>
          <option>Maintenance</option>
        </select>
        <Input placeholder="Default currency (USD, KHR)" />
        <Input placeholder="Timezone" />
      </div>
      <Textarea placeholder="Property notes, access protocols, and compliance details" />
      {saved && <p className="text-xs text-emerald-600">Property form saved. Map this payload to your dorms API.</p>}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
        <Button type="submit">Save Property</Button>
      </div>
    </form>
  );
}
