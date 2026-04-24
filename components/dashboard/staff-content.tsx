'use client';

import {
  Users,
  UserPlus,
  User,
  Search,
  Clock,
  ShieldCheck,
  Calendar,
  Building2,
  Phone,
  Mail,
  MoreHorizontal,
  TrendingUp,
  Activity,
  Download,
  Filter,
  DollarSign,
  UserCheck,
  Timer,
  ChevronRight,
  Plus,
  ArrowUpRight,
  Briefcase,
  Target,
  Stethoscope,
  Zap,
  RotateCcw,
  Home,
  Hash,
  Globe,
  Command,
  MapPin,
  Award,
  BookOpen,
  GraduationCap,
  History,
  Navigation,
  FileText,
  BadgeCheck,
  BriefcaseBusiness
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'Active' | 'On Break' | 'Off Duty' | 'Training';
  shift: string;
  performance: number;
  hoursThisWeek: number;
  email: string;
  phone: string;
  avatar: string;
  // Detailed Fields
  fullName: string;
  dob: string;
  address: string;
  degree: string;
  institution: string;
  workDuration: string;
  joinedDate: string;
  location: string;
  bio: string;
  specialization: string[];
  recentAchievements: string[];
  metrics: {
    punctuality: number;
    tasksCompleted: number;
    rating: number;
  };
}

export function StaffContent({ tier = 'pro', role = 'admin' }: { tier?: string, role?: string }) {
  const [activeDept, setActiveDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [isAddingStaff, setIsAddingStaff] = useState(false);

  const [staffData, setStaffData] = useState<StaffMember[]>([
    { 
      id: 'ST-101', name: 'Robert Wilson', role: 'Kitchen Lead', department: 'Culinary', 
      status: 'Active', shift: '06:00 - 14:00', performance: 98, hoursThisWeek: 38, 
      email: 'r.wilson@dormify.com', phone: '+44 7700 900551', avatar: 'Robert',
      fullName: 'Robert Anthony Wilson', dob: '14 May 1988', 
      address: '22 Baker Street, London, NW1 6XE, United Kingdom',
      degree: 'B.Sc in Culinary Arts', institution: 'London Gastronomy Institute',
      workDuration: '2 Years, 4 Months', joinedDate: 'Oct 12, 2023', location: 'Main Campus Dining',
      bio: 'Robert is a seasoned culinary professional with over 12 years of experience in high-volume residential dining. He leads the kitchen team with a focus on nutritional balance and waste reduction.',
      specialization: ['Menu Engineering', 'HACCP Compliance', 'Stock Control'],
      recentAchievements: ['Perfect Health Inspection Score', 'Reduced waste by 14%'],
      metrics: { punctuality: 100, tasksCompleted: 142, rating: 4.9 }
    },
    { 
      id: 'ST-102', name: 'Sarah Chen', role: 'Front Desk', department: 'Reception', 
      status: 'Active', shift: '08:00 - 16:00', performance: 95, hoursThisWeek: 32, 
      email: 's.chen@dormify.com', phone: '+44 7700 900552', avatar: 'Sarah',
      fullName: 'Sarah Meiling Chen', dob: '22 Sept 1995', 
      address: '88 Victoria Embankment, London, EC4Y 0HJ, United Kingdom',
      degree: 'BA in Hospitality Management', institution: 'University of Surrey',
      workDuration: '1 Year, 2 Months', joinedDate: 'Jan 05, 2024', location: 'Lobby A',
      bio: 'Sarah provides exceptional first-contact experiences for residents. Her multilingual skills and calm demeanor excel in fast-paced environments.',
      specialization: ['Conflict Resolution', 'Multilingual Support'],
      recentAchievements: ['Top Rated Staff Q1', 'Processed 500+ move-ins'],
      metrics: { punctuality: 98, tasksCompleted: 310, rating: 4.8 }
    },
    { 
      id: 'ST-103', name: 'David Okonkwo', role: 'Lead Maintenance', department: 'Facilities', 
      status: 'On Break', shift: '09:00 - 17:00', performance: 92, hoursThisWeek: 40, 
      email: 'd.okonkwo@dormify.com', phone: '+44 7700 900553', avatar: 'David',
      fullName: 'David Chukwuma Okonkwo', dob: '03 Dec 1985', 
      address: '15 High Street, Croydon, CR0 1QA, United Kingdom',
      degree: 'B.Eng in Mechanical Systems', institution: 'Manchester Metropolitan',
      workDuration: '3 Years, 1 Month', joinedDate: 'Mar 20, 2023', location: 'Maintenance Hub',
      bio: 'David manages all structural and MEP maintenance tasks with a focus on rapid diagnostic and high-quality preventative programs.',
      specialization: ['HVAC Systems', 'Electrical Engineering'],
      recentAchievements: ['Zero safety incidents YTD', 'Upgraded HVAC controllers'],
      metrics: { punctuality: 95, tasksCompleted: 89, rating: 4.7 }
    }
  ]);

  const [newStaffForm, setNewStaffForm] = useState({
    name: '', role: '', department: 'Residential', email: '', phone: ''
  });

  const handleAddStaff = () => {
    const newId = `ST-${100 + staffData.length + 1}`;
    const newNode: StaffMember = {
      id: newId,
      name: newStaffForm.name,
      role: newStaffForm.role,
      department: newStaffForm.department,
      status: 'Active',
      shift: '09:00 - 17:00',
      performance: 100,
      hoursThisWeek: 0,
      email: newStaffForm.email,
      phone: newStaffForm.phone,
      avatar: newStaffForm.name.split(' ')[0],
      fullName: newStaffForm.name,
      dob: '01 Jan 1990',
      address: 'Awaiting initialization',
      degree: 'Under Review',
      institution: 'N/A',
      workDuration: '0 Months',
      joinedDate: new Date().toLocaleDateString(),
      location: 'Central Office',
      bio: 'New personnel record awaiting initialization.',
      specialization: ['Operational Support'],
      recentAchievements: ['System Onboarding'],
      metrics: { punctuality: 100, tasksCompleted: 0, rating: 5.0 }
    };

    setStaffData([newNode, ...staffData]);
    setIsAddingStaff(false);
    setNewStaffForm({ name: '', role: '', department: 'Residential', email: '', phone: '' });
  };

  const filteredStaff = useMemo(() => {
    return staffData.filter(s => {
      const matchesDept = activeDept === 'All' || s.department === activeDept;
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.role.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDept && matchesSearch;
    });
  }, [activeDept, searchQuery, staffData]);

  const StatusGlow = ({ status }: { status: StaffMember['status'] }) => {
     const config = {
       'Active': 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]',
       'On Break': 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]',
       'Training': 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]',
       'Off Duty': 'bg-slate-400 opacity-50'
     };
     return <div className={cn("w-2 h-2 rounded-full", config[status])} />;
  };

  return (
    <div className="w-full space-y-4 animate-in fade-in duration-700 pb-20">
      
      {/* --- Main Header --- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-border/40">
        <div className="space-y-1">
          <h1 className="text-2xl font-black tracking-tight text-foreground uppercase leading-none">Staff <span className="text-primary">Management</span></h1>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={() => setIsAddingStaff(true)} className="h-10 rounded-xl bg-foreground text-background dark:bg-primary dark:text-white font-black text-[10px] uppercase tracking-widest px-6 border-none shadow-lg hover:shadow-primary/20 transition-all">
             <UserPlus className="w-4 h-4 mr-2" /> Add New Staff
          </Button>
        </div>
      </div>

      <Dialog open={isAddingStaff} onOpenChange={setIsAddingStaff}>
        <DialogContent className="max-w-xl bg-card/95 backdrop-blur-3xl border border-border/60 z-[100] shadow-2xl rounded-[2.5rem] p-0 overflow-hidden">
           <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
           <div className="p-8 border-b border-border/10 bg-muted/10">
              <DialogHeader>
                 <div className="flex items-center gap-4 mb-2">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary">
                       <UserPlus className="w-5 h-5" />
                    </div>
                    <DialogTitle className="text-2xl font-black tracking-tight text-foreground uppercase">Initialize Record</DialogTitle>
                 </div>
                 <DialogDescription className="hidden">Staff onboarding form.</DialogDescription>
              </DialogHeader>
           </div>
           <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                    <Input value={newStaffForm.name} onChange={e => setNewStaffForm({...newStaffForm, name: e.target.value})} placeholder="Alex Rivera" className="h-11 rounded-xl bg-muted/30 border-border/40 font-bold" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Role</label>
                    <Input value={newStaffForm.role} onChange={e => setNewStaffForm({...newStaffForm, role: e.target.value})} placeholder="Security Lead" className="h-11 rounded-xl bg-muted/30 border-border/40 font-bold" />
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Department</label>
                 <div className="flex gap-2 p-1 bg-muted/20 border border-border/40 rounded-2xl">
                    {['Residential', 'Culinary', 'Facilities', 'Security'].map(dept => (
                       <button key={dept} onClick={() => setNewStaffForm({...newStaffForm, department: dept})} className={cn("flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", newStaffForm.department === dept ? "bg-background text-primary shadow-sm" : "text-muted-foreground/60 hover:text-foreground")}>{dept}</button>
                    ))}
                 </div>
              </div>
              <div className="flex gap-4 pt-2">
                 <Button onClick={() => setIsAddingStaff(false)} variant="outline" className="flex-1 h-12 rounded-xl font-black text-[11px] uppercase tracking-[0.2em]">Cancel</Button>
                 <Button onClick={handleAddStaff} className="flex-1 h-12 bg-foreground text-background dark:bg-primary dark:text-white rounded-xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl border-none">Onboard Staff</Button>
              </div>
           </div>
        </DialogContent>
      </Dialog>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* --- Operational Roster --- */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5 p-1 bg-muted/20 border border-border/40 rounded-2xl">
                {['All', 'Residential', 'Culinary', 'Facilities', 'Security'].map((dept) => (
                  <button key={dept} onClick={() => setActiveDept(dept)} className={cn("px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", activeDept === dept ? "bg-background text-primary shadow-sm border border-border/40" : "text-muted-foreground/60 hover:text-foreground hover:bg-muted/30")}>{dept}</button>
                ))}
              </div>
              <div className="hidden md:block w-px h-6 bg-border/40" />
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Quick Search..." className="h-9 w-44 pl-9 bg-muted/20 border-border/40 rounded-xl focus-visible:ring-primary/20 font-bold text-[10px] uppercase tracking-widest" />
              </div>
            </div>
            <span className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] pr-2">{filteredStaff.length} Nodes Online</span>
          </div>

          <div className="space-y-2">
            {filteredStaff.map((staff) => (
              <motion.div layout key={staff.id} onClick={() => setSelectedStaff(staff)} className="group relative flex items-center gap-6 p-4 bg-card/40 hover:bg-muted/30 backdrop-blur-xl border border-border/40 rounded-2xl transition-all cursor-pointer overflow-hidden shadow-sm hover:shadow-md">
                <div className={cn("absolute left-0 top-0 bottom-0 w-1", staff.status === 'Active' ? "bg-emerald-500" : staff.status === 'On Break' ? "bg-amber-500" : "bg-slate-400")} />
                <div className="flex items-center gap-4 min-w-[220px]">
                  <Avatar className="h-11 w-11 rounded-xl border border-border/60 shadow-sm transition-transform group-hover:scale-105">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${staff.avatar}`} />
                    <AvatarFallback className="font-black text-xs">{staff.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-[14px] font-black text-foreground tracking-tight leading-none mb-1 group-hover:text-primary transition-colors">{staff.name}</h3>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">{staff.role}</p>
                  </div>
                </div>
                <div className="flex-1 flex items-center gap-6">
                   <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-muted border border-border/20 text-muted-foreground"><Globe className="w-3.5 h-3.5" /></div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-foreground/70">{staff.department}</span>
                   </div>
                   <div className="hidden xl:flex items-center gap-6 ml-auto mr-6">
                      <div className="flex flex-col items-end">
                         <span className="text-[8px] font-black text-muted-foreground/40 uppercase tracking-widest mb-1">Performance</span>
                         <div className="flex items-center gap-2.5">
                            <span className="text-[12px] font-black text-foreground">{staff.performance}%</span>
                            <div className="w-16 h-1 bg-muted rounded-full overflow-hidden"><div className={cn("h-full", staff.performance > 90 ? "bg-emerald-500" : "bg-primary")} style={{ width: `${staff.performance}%` }} /></div>
                         </div>
                      </div>
                   </div>
                </div>
                <div className="flex items-center gap-1.5"><ChevronRight className="w-4 h-4 text-muted-foreground/30" /></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- Sidebar --- */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 border-border/40 bg-card rounded-[2rem] shadow-md border relative overflow-hidden">
            <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-foreground mb-8">Operational Scorecard</h3>
            <div className="space-y-6">
               {[
                 { label: 'Resource Utilization', value: '84%', icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-500/10' },
                 { label: 'Personnel Health', value: '96.2%', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-500/10' },
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", item.bg, item.color)}><item.icon className="w-5 h-5" /></div>
                       <span className="text-[10px] font-black uppercase text-muted-foreground/80 tracking-widest">{item.label}</span>
                    </div>
                    <span className="text-xl font-black tracking-tighter text-foreground">{item.value}</span>
                 </div>
               ))}
            </div>
          </Card>

          <Card className="p-6 border-border/40 bg-card rounded-[2rem] border shadow-sm space-y-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground flex items-center gap-3"><Calendar className="w-4 h-4 text-primary" /> Shift Saturation</h3>
            <div className="space-y-5">
              {['Mon', 'Tue', 'Wed', 'Thu'].map((day, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                     <span className="text-muted-foreground/80">{day}</span>
                     <span className="text-foreground">90%</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden p-0.5"><motion.div initial={{ width: 0 }} animate={{ width: `90%` }} className="h-full bg-primary rounded-full" /></div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* --- REBUILT CLEAN STAFF DETAIL DIALOG --- */}
      <Dialog open={!!selectedStaff} onOpenChange={(open) => !open && setSelectedStaff(null)}>
        <DialogContent className="max-w-4xl bg-card dark:bg-slate-950 border border-border/60 z-[100] shadow-2xl rounded-[2.5rem] overflow-hidden p-0 flex flex-col">
          {selectedStaff && (
            <div className="flex flex-col flex-1">
              
              {/* 1. Profile Banner */}
              <div className="bg-primary/5 dark:bg-primary/[0.02] p-10 flex items-center justify-between border-b border-border/10">
                 <div className="flex items-center gap-8">
                    <Avatar className="h-24 w-24 rounded-3xl border-4 border-white dark:border-slate-900 shadow-2xl">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedStaff.avatar}`} />
                      <AvatarFallback className="text-2xl font-black">{selectedStaff.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1.5">
                       <Badge className="bg-primary text-white border-none rounded-lg text-[10px] font-black uppercase tracking-widest">{selectedStaff.department}</Badge>
                       <DialogTitle className="text-4xl font-black tracking-tight text-foreground uppercase">{selectedStaff.name}</DialogTitle>
                       <DialogDescription className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-3">
                          {selectedStaff.role} <span className="w-1.5 h-1.5 rounded-full bg-border" /> ID: {selectedStaff.id}
                       </DialogDescription>
                    </div>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Status</p>
                    <Badge className={cn("px-4 py-1.5 rounded-full border-none font-black text-[11px] uppercase tracking-widest shadow-lg", 
                       selectedStaff.status === 'Active' ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
                    )}>{selectedStaff.status}</Badge>
                 </div>
              </div>

              {/* 2. Organized Data Grid */}
              <div className="p-10 space-y-10 overflow-y-auto max-h-[60vh] no-scrollbar">
                 
                 {/* Section: Personal Information */}
                 <div className="space-y-6">
                    <div className="flex items-center gap-3 text-primary border-b border-border/10 pb-3">
                       <User className="w-5 h-5" />
                       <h3 className="text-[12px] font-black uppercase tracking-[0.2em]">Personal Registry</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                       <DataField label="Full Legal Name" value={selectedStaff.fullName} />
                       <DataField label="Date of Birth" value={selectedStaff.dob} />
                       <DataField label="Primary Address" value={selectedStaff.address} colSpan={2} />
                    </div>
                 </div>

                 {/* Section: Professional & Education */}
                 <div className="space-y-6">
                    <div className="flex items-center gap-3 text-primary border-b border-border/10 pb-3">
                       <GraduationCap className="w-5 h-5" />
                       <h3 className="text-[12px] font-black uppercase tracking-[0.2em]">Qualifications & Tenure</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                       <DataField label="Academic Degree" value={selectedStaff.degree} />
                       <DataField label="Issuing Institution" value={selectedStaff.institution} />
                       <DataField label="System Tenure" value={selectedStaff.workDuration} />
                       <DataField label="Onboarding Date" value={selectedStaff.joinedDate} />
                    </div>
                 </div>

                 {/* Section: Contact & Logistics */}
                 <div className="space-y-6">
                    <div className="flex items-center gap-3 text-primary border-b border-border/10 pb-3">
                       <Building2 className="w-5 h-5" />
                       <h3 className="text-[12px] font-black uppercase tracking-[0.2em]">Connectivity & Logistics</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                       <DataField label="Professional Email" value={selectedStaff.email} />
                       <DataField label="Direct Phone Line" value={selectedStaff.phone} />
                       <DataField label="Shift Protocol" value={selectedStaff.shift} />
                       <DataField label="Duty Station" value={selectedStaff.location} />
                    </div>
                 </div>

                 {/* Section: Bio */}
                 <div className="space-y-4 p-6 rounded-3xl bg-muted/30 border border-border/10">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Personnel Biography</p>
                    <p className="text-sm font-medium text-foreground leading-relaxed italic">"{selectedStaff.bio}"</p>
                 </div>
              </div>

              {/* 3. Action Footer */}
              <div className="p-8 bg-muted/10 border-t border-border/10 flex items-center gap-4 mt-auto">
                 <Button onClick={() => setSelectedStaff(null)} variant="outline" className="flex-1 h-14 rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] border-border/60">Close Record</Button>
                 <Button className="flex-1 h-14 bg-foreground text-background dark:bg-primary dark:text-white rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] shadow-xl border-none">Update Index</Button>
              </div>

            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DataField({ label, value, colSpan = 1 }: { label: string; value: string; colSpan?: number }) {
  return (
    <div className={cn("space-y-1.5", colSpan === 2 ? "col-span-2" : "col-span-1")}>
       <p className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">{label}</p>
       <p className="text-[15px] font-bold text-foreground tracking-tight">{value}</p>
    </div>
  );
}
