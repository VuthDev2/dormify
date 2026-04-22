'use client';

import {
  User, Bell, Palette, Shield, CreditCard,
  Key, Globe, Zap, CheckCircle2, ShieldCheck,
  ChevronRight, Laptop, Moon, Sun, Monitor,
  Mail, Phone, Lock, Eye, EyeOff,
  Cloud, Terminal, Layout, Sparkles, Building2,
  MapPin, Globe2, Briefcase, Trash2, Plus,
  Smartphone, Hash, DollarSign, Languages,
  Clock, LogOut, ExternalLink, Camera, Info, FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface SettingsContentProps {
  title: string;
  tier?: 'normal' | 'pro' | 'premium';
}

type SettingsTab = 'profile' | 'organization' | 'security' | 'billing' | 'notifications' | 'appearance' | 'integrations';

export function SettingsContent({ title, tier = 'normal' }: SettingsContentProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const isPremium = tier === 'premium';
  const isPro = tier === 'pro' || tier === 'premium';

  const SectionHeader = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
    <div className="flex items-start gap-4 mb-8">
      <div className={cn(
        "p-3 rounded-2xl shrink-0",
        isPremium ? "bg-primary/10 text-primary shadow-lg shadow-primary/10" :
        isPro ? "bg-primary/5 text-primary" : "bg-muted text-muted-foreground"
      )}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="space-y-1">
        <h3 className="text-xl font-black tracking-tight text-foreground">{title}</h3>
        <p className="text-xs font-medium text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );

  const SettingRow = ({ label, description, children, icon: Icon }: { label: string, description: string, children: React.ReactNode, icon?: any }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-b border-border/10 last:border-0">
      <div className="space-y-1 max-w-xl">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-muted-foreground/60" />}
          <p className="text-sm font-bold text-foreground/90 tracking-tight">{label}</p>
        </div>
        <p className="text-xs font-medium text-muted-foreground/60">{description}</p>
      </div>
      <div className="shrink-0">
        {children}
      </div>
    </div>
  );

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'organization', label: 'Organization', icon: Building2 },
    { id: 'security', label: 'Security', icon: ShieldCheck },
    { id: 'billing', label: 'Subscription', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    ...(isPro ? [{ id: 'integrations', label: 'API & Integrations', icon: Terminal }] : []),
  ];

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-700 pb-20">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border/40">
        <div className="space-y-2">
          <div className="flex items-center gap-3 mb-1">
            <Badge className={cn(
              "px-3 py-1 text-[9px] font-black uppercase tracking-widest border-none",
              isPremium ? "bg-primary text-white shadow-lg shadow-primary/30" :
              isPro ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
            )}>
              {tier} node
            </Badge>
            {isPremium && (
              <div className="flex items-center gap-1.5 text-primary animate-pulse">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span className="text-[10px] font-black uppercase tracking-wider">Enterprise Mode</span>
              </div>
            )}
          </div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">
            System <span className="text-muted-foreground/30 font-medium">Control</span>
          </h1>
          <p className="text-sm font-medium text-muted-foreground/60 max-w-lg">
            Configure your administrative parameters, institutional metadata, and security protocols.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl h-11 px-5 font-bold text-[10px] uppercase tracking-widest border-border/40 hover:bg-muted/50 transition-all">
            Discard
          </Button>
          <Button className={cn(
            "rounded-xl h-11 px-8 font-black text-[10px] uppercase tracking-[0.2em] transition-all",
            isPremium ? "bg-primary text-white shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95" :
            "bg-primary text-white shadow-lg shadow-primary/10"
          )}>
            Apply Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-1.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SettingsTab)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-bold transition-all text-left group",
                activeTab === tab.id
                  ? (isPremium ? "bg-primary text-white shadow-xl shadow-primary/20" : "bg-muted text-foreground")
                  : "text-muted-foreground/70 hover:bg-muted/40 hover:text-foreground"
              )}
            >
              <tab.icon className={cn(
                "w-4.5 h-4.5 transition-transform group-hover:scale-110",
                activeTab === tab.id ? "text-current" : "text-muted-foreground/40"
              )} />
              {tab.label}
              {activeTab === tab.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-current opacity-40" />}
            </button>
          ))}
          
          <Separator className="my-6 opacity-40" />
          
          <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-bold text-destructive hover:bg-destructive/5 transition-all text-left">
            <LogOut className="w-4.5 h-4.5" />
            Terminate Session
          </button>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9 space-y-8 min-h-[600px]">
          
          {activeTab === 'profile' && (
            <Card className="p-8 border-border/40 bg-card/50 backdrop-blur-xl rounded-[2.5rem] shadow-sm animate-in fade-in slide-in-from-right-4 duration-500">
              <SectionHeader
                icon={User}
                title="Identity Profile"
                description="Manage your personal administrative credentials and public presence."
              />

              <div className="flex flex-col md:flex-row gap-10">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative group">
                    <Avatar className="w-32 h-32 rounded-[2.5rem] border-4 border-muted/50 ring-4 ring-primary/5 shadow-2xl">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback className="bg-primary/5 text-primary text-2xl font-black">AD</AvatarFallback>
                    </Avatar>
                    <button className="absolute -bottom-2 -right-2 p-3 bg-primary text-white rounded-2xl shadow-xl shadow-primary/30 opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-black uppercase text-foreground">Admin Root</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Super User</p>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Legal Full Name</Label>
                    <Input defaultValue="Admin User" className="h-12 rounded-2xl bg-muted/20 border-border/30 font-bold focus:ring-primary/20 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Administrative Role</Label>
                    <Select defaultValue="owner">
                      <SelectTrigger className="h-12 rounded-2xl bg-muted/20 border-border/30 font-bold text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-border/40 shadow-2xl">
                        <SelectItem value="owner" className="rounded-xl font-bold py-3 px-4">Portfolio Owner</SelectItem>
                        <SelectItem value="manager" className="rounded-xl font-bold py-3 px-4">Operations Manager</SelectItem>
                        <SelectItem value="admin" className="rounded-xl font-bold py-3 px-4">System Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Direct Work Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                      <Input defaultValue="admin@dormify.app" className="h-12 pl-11 rounded-2xl bg-muted/20 border-border/30 font-bold text-sm" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Emergency Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                      <Input defaultValue="+44 7700 900123" className="h-12 pl-11 rounded-2xl bg-muted/20 border-border/30 font-bold text-sm" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-border/10 space-y-2">
                <h4 className="text-xs font-black uppercase tracking-widest text-foreground">Preferences</h4>
                <SettingRow label="Global Timezone" description="Affects timestamps on all reports and audits." icon={Clock}>
                  <Select defaultValue="gmt">
                    <SelectTrigger className="w-[180px] h-9 rounded-xl text-[10px] font-black uppercase border-border/40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-border/40">
                      <SelectItem value="gmt" className="text-[10px] font-black uppercase">New York (GMT+0)</SelectItem>
                      <SelectItem value="est" className="text-[10px] font-black uppercase">New York (EST-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingRow>
                <SettingRow label="System Language" description="Select your preferred administrative interface language." icon={Languages}>
                  <Select defaultValue="en">
                    <SelectTrigger className="w-[180px] h-9 rounded-xl text-[10px] font-black uppercase border-border/40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-border/40">
                      <SelectItem value="en" className="text-[10px] font-black uppercase">English (Global)</SelectItem>
                      <SelectItem value="es" className="text-[10px] font-black uppercase">Español (ES)</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingRow>
              </div>
            </Card>
          )}

          {activeTab === 'organization' && (
            <Card className="p-8 border-border/40 bg-card/50 backdrop-blur-xl rounded-[2.5rem] shadow-sm animate-in fade-in slide-in-from-right-4 duration-500">
              <SectionHeader
                icon={Building2}
                title="Organizational Metadata"
                description="Institutional parameters and branding for your global dormitory portfolio."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Entity Name</Label>
                    <Input defaultValue="Global Student Living Ltd." className="h-12 rounded-2xl bg-muted/20 border-border/30 font-bold text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Tax Registration ID (EIN)</Label>
                    <Input defaultValue="12-3456789" className="h-12 rounded-2xl bg-muted/20 border-border/30 font-bold text-sm font-mono" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Primary Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger className="h-12 rounded-2xl bg-muted/20 border-border/30 font-bold text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-border/40 shadow-2xl">
                        <SelectItem value="usd" className="font-bold py-3 px-4">US Dollar ($)</SelectItem>
                        <SelectItem value="gbp" className="font-bold py-3 px-4">British Pound (£)</SelectItem>
                        <SelectItem value="eur" className="font-bold py-3 px-4">Euro (€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Headquarters Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 w-4 h-4 text-muted-foreground/40" />
                      <textarea 
                        className="w-full min-h-[120px] pl-11 p-4 rounded-2xl bg-muted/20 border-border/30 font-bold text-sm resize-none focus:ring-2 focus:ring-primary/20 outline-none"
                        defaultValue="24 Fifth Avenue, New York, NY 10011, United States"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Corporate Website</Label>
                    <div className="relative">
                      <Globe2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                      <Input defaultValue="https://www.gsl-living.com" className="h-12 pl-11 rounded-2xl bg-muted/20 border-border/30 font-bold text-sm" />
                    </div>
                  </div>
                </div>
              </div>

              {isPremium && (
                <div className="mt-12 p-8 rounded-[2rem] bg-primary/5 border border-primary/10 relative overflow-hidden group">
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest">
                        <Sparkles className="w-3.5 h-3.5" /> Brand Identity Upgrade
                      </div>
                      <h4 className="text-xl font-black text-foreground">Custom White-Labeling</h4>
                      <p className="text-xs font-medium text-muted-foreground/70 max-w-md leading-relaxed">
                        Replace all Dormify branding with your own corporate identity, custom logo, and primary brand palette.
                      </p>
                    </div>
                    <Button className="h-12 px-8 rounded-xl bg-primary text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.05] transition-all shrink-0">
                      Configure Branding
                    </Button>
                  </div>
                  <Building2 className="absolute -bottom-10 -right-10 w-48 h-48 text-primary/5 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                </div>
              )}
            </Card>
          )}

          {activeTab === 'security' && (
            <Card className="p-8 border-border/40 bg-card/50 backdrop-blur-xl rounded-[2.5rem] shadow-sm animate-in fade-in slide-in-from-right-4 duration-500">
              <SectionHeader
                icon={ShieldCheck}
                title="Security Protocol"
                description="Secure your administrative access and monitor session integrity."
              />

              <div className="space-y-2">
                <SettingRow label="Change Root Password" description="Rotate your password regularly to maintain high-level security." icon={Lock}>
                  <Button variant="outline" size="sm" className="rounded-xl h-10 px-6 font-bold text-[10px] uppercase tracking-widest">Update Secret</Button>
                </SettingRow>
                <SettingRow label="Two-Factor Authentication" description="Require a secure verification code from your mobile device." icon={Smartphone}>
                  <Switch defaultChecked />
                </SettingRow>
                <SettingRow label="Session Persistence" description="Remember this device for 30 days to reduce login frequency." icon={History}>
                  <Switch />
                </SettingRow>
              </div>

              <div className="mt-12 space-y-6">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-foreground/50 px-2">Active Administrative Sessions</h4>
                <div className="space-y-3">
                  {[
                    { device: 'MacBook Pro 16"', location: 'New York, USA', ip: '192.168.1.1', status: 'Current', icon: Laptop },
                    { device: 'iPhone 15 Pro', location: 'New York, USA', ip: '10.0.0.45', status: 'Active', icon: Smartphone },
                  ].map((session, i) => (
                    <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-muted/10 border border-border/20 group hover:border-primary/20 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                          <session.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-foreground">{session.device}</p>
                          <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">{session.location} • {session.ip}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {session.status === 'Current' ? (
                          <Badge className="bg-emerald-500/10 text-emerald-600 border-none font-black text-[8px] uppercase px-2 h-5">This Device</Badge>
                        ) : (
                          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/5">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card className="p-8 border-border/40 bg-card/50 backdrop-blur-xl rounded-[2.5rem] shadow-sm animate-in fade-in slide-in-from-right-4 duration-500">
              <SectionHeader
                icon={Bell}
                title="Alert Parameters"
                description="Determine which system events trigger administrative notifications."
              />

              <div className="space-y-8">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6 ml-1">Resident Lifecycle</h4>
                  <div className="space-y-1">
                    <SettingRow label="New Enrollment" description="Triggered when a new resident successfully completes registration." icon={User}>
                      <div className="flex gap-4"><Switch defaultChecked /><Switch defaultChecked className="hidden sm:inline-flex" /></div>
                    </SettingRow>
                    <SettingRow label="Departure Warning" description="Sent 14 days prior to a resident's scheduled move-out date." icon={LogOut}>
                      <div className="flex gap-4"><Switch defaultChecked /><Switch className="hidden sm:inline-flex" /></div>
                    </SettingRow>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6 ml-1">Fiscal Operations</h4>
                  <div className="space-y-1">
                    <SettingRow label="Successful Payment" description="Notification for every institutional rent or fee credit." icon={DollarSign}>
                      <div className="flex gap-4"><Switch /><Switch className="hidden sm:inline-flex" /></div>
                    </SettingRow>
                    <SettingRow label="System Audit Ready" description="Weekly automated financial and occupancy audit generation." icon={FileText}>
                      <div className="flex gap-4"><Switch defaultChecked /><Switch defaultChecked className="hidden sm:inline-flex" /></div>
                    </SettingRow>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-muted/10 border border-border/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Left switch: Email | Right switch: Push (Mobile App)</span>
                  </div>
                  <Info className="w-4 h-4 text-muted-foreground/20" />
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'appearance' && (
            <Card className="p-8 border-border/40 bg-card/50 backdrop-blur-xl rounded-[2.5rem] shadow-sm animate-in fade-in slide-in-from-right-4 duration-500">
              <SectionHeader
                icon={Palette}
                title="System Aesthetics"
                description="Tailor the visual interface to your institutional environment."
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { id: 'light', label: 'Daylight', icon: Sun, color: 'bg-white text-slate-950 shadow-xl ring-1 ring-slate-200' },
                  { id: 'dark', label: 'Midnight', icon: Moon, color: 'bg-slate-950 text-white shadow-2xl ring-1 ring-slate-800' },
                  { id: 'system', label: 'Adaptive', icon: Monitor, color: 'bg-gradient-to-br from-white via-slate-200 to-slate-950 text-slate-950 ring-1 ring-slate-200' },
                ].map((theme) => (
                  <button
                    key={theme.id}
                    className={cn(
                      "group p-8 rounded-[2rem] border-2 transition-all flex flex-col items-center justify-center gap-5 relative overflow-hidden",
                      theme.id === 'dark' 
                        ? "border-primary bg-primary/5 ring-4 ring-primary/10" 
                        : "border-border/40 hover:border-border hover:bg-muted/30"
                    )}
                  >
                    <div className={cn("w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110 duration-500", theme.color)}>
                      <theme.icon className="w-8 h-8" />
                    </div>
                    <div className="text-center">
                      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-foreground">{theme.label}</span>
                      <p className="text-[8px] font-bold text-muted-foreground uppercase mt-1">Interface Node</p>
                    </div>
                    {theme.id === 'dark' && (
                      <div className="absolute top-4 right-4 bg-primary text-white p-1 rounded-full">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-border/10">
                <SettingRow label="Density Mode" description="Reduce whitespace and font sizes for high-information density." icon={Layout}>
                  <Switch />
                </SettingRow>
                <SettingRow label="High Contrast" description="Increase accessibility by boosting color separation." icon={Eye}>
                  <Switch />
                </SettingRow>
              </div>
            </Card>
          )}

          {activeTab === 'integrations' && isPro && (
            <Card className="p-8 border-border/40 bg-card/50 backdrop-blur-xl rounded-[2.5rem] shadow-sm animate-in fade-in slide-in-from-right-4 duration-500">
              <SectionHeader
                icon={Terminal}
                title="API & Connectors"
                description="Interface with third-party institutional software and manage developer keys."
              />

              <div className="space-y-8">
                <div className="p-8 rounded-[2rem] bg-slate-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/20">
                          <Key className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-black tracking-tight">Production API Secret</p>
                          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">sk_live_2026_dormify_xxxxxxxxxx</p>
                        </div>
                      </div>
                      <Button size="sm" className="bg-primary text-white font-black text-[9px] uppercase tracking-widest px-4 h-9 rounded-lg">Copy Key</Button>
                    </div>
                    <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[65%] opacity-40" />
                    </div>
                    <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-500">
                      <span>Monthly Requests: 64,201 / 100,000</span>
                      <span className="text-emerald-500">65% Capacity</span>
                    </div>
                  </div>
                  <Terminal className="absolute -bottom-10 -right-10 w-48 h-48 text-white/[0.03] -rotate-12" />
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/50 ml-1">Active Webhooks</h4>
                  {[
                    { event: 'resident.created', url: 'https://api.university.edu/hooks', status: 'Healthy' },
                    { event: 'payment.succeeded', url: 'https://billing-engine.com/v1/dormify', status: 'Healthy' },
                  ].map((hook, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted/10 border border-border/20 group hover:border-primary/20 transition-all">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase text-primary tracking-widest">{hook.event}</p>
                        <p className="text-xs font-bold text-muted-foreground truncate max-w-[200px] sm:max-w-md">{hook.url}</p>
                      </div>
                      <Badge className="bg-emerald-500/10 text-emerald-500 border-none font-black text-[8px] uppercase">{hook.status}</Badge>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full h-12 rounded-2xl border-dashed border-2 border-border/40 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:bg-muted/30 transition-all">
                    Register New Webhook <Plus className="w-3 h-3 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}

