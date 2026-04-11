'use client';

import {
  User, Bell, Palette, Shield, CreditCard,
  Key, Globe, Zap, CheckCircle2, ShieldCheck,
  ChevronRight, Laptop, Moon, Sun, Monitor,
  Mail, Phone, Lock, Eye, EyeOff,
  Cloud, Terminal, Layout, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface SettingsContentProps {
  title: string;
  tier?: 'normal' | 'pro' | 'premium';
}

export function SettingsContent({ title, tier = 'normal' }: SettingsContentProps) {
  const isPremium = tier === 'premium';
  const isPro = tier === 'pro' || tier === 'premium';
  const isNormal = tier === 'normal';

  const SectionHeader = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
    <div className="flex items-start gap-4 mb-8">
      <div className={cn(
        "p-3 rounded-2xl",
        isPremium ? "bg-primary/10 text-primary shadow-2xl shadow-primary/20" :
        isPro ? "bg-primary/5 text-primary" : "bg-muted text-muted-foreground"
      )}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="space-y-1">
        <h3 className="text-xl font-black tracking-tight">{title}</h3>
        <p className="text-sm font-medium text-muted-foreground">{description}</p>
      </div>
    </div>
  );

  const SettingRow = ({ label, description, children, icon: Icon }: { label: string, description: string, children: React.ReactNode, icon?: any }) => (
    <div className={cn(
      "flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 border-b border-border/10 last:border-0",
      tier === 'premium' ? "group hover:bg-foreground/[0.02] transition-colors -mx-4 px-4 rounded-xl" : ""
    )}>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-muted-foreground/60" />}
          <p className="text-sm font-black uppercase tracking-widest text-foreground/80">{label}</p>
        </div>
        <p className="text-xs font-medium text-muted-foreground">{description}</p>
      </div>
      <div className="flex-shrink-0">
        {children}
      </div>
    </div>
  );

  const containerClasses = cn(
    "space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700",
    isPremium ? "pb-10" : ""
  );

  const cardClasses = cn(
    "overflow-hidden border-border/40",
    isPremium ? "bg-foreground/5 backdrop-blur-3xl rounded-2xl p-8 shadow-2xl shadow-primary/5 border-foreground/10" :
    isPro ? "bg-card backdrop-blur-xl rounded-2xl p-6 shadow-xl" :
    "bg-card rounded-xl p-5 shadow-sm"
  );

  return (
    <div className={containerClasses}>

      <div className={cn(
        "flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-border/40",
        isPremium ? "border-transparent" : ""
      )}>
        <div className="space-y-2">
          <div className="flex items-center gap-3 mb-2">
            <Badge className={cn(
              "px-3 py-1 text-[10px] font-black uppercase tracking-widest border-none",
              isPremium ? "bg-primary text-white shadow-lg shadow-primary/30" :
              isPro ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
            )}>
              {tier} account
            </Badge>
            {isPremium && (
              <div className="flex items-center gap-1 text-primary animate-pulse">
                <Sparkles className="w-3 h-3 fill-current" />
                <span className="text-[10px] font-black uppercase">Elite Mode Active</span>
              </div>
            )}
          </div>
          <h1 className={cn(
            "text-3xl md:text-4xl font-black tracking-tight",
            isPremium ? "bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent" : "text-foreground"
          )}>
            System <span className="text-muted-foreground/30">Settings</span>
          </h1>
          <p className="text-muted-foreground font-medium">Manage your {tier} environment and core configurations.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl h-10 px-4 font-bold text-[9px] uppercase tracking-widest border-border/40">Discard Changes</Button>
          <Button className={cn(
            "rounded-xl h-10 px-6 font-black text-[9px] uppercase tracking-[0.2em] transition-all",
            isPremium ? "bg-primary text-white shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95" :
            isPro ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-primary text-white"
          )}>Save Preferences</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

        <div className="lg:col-span-3 space-y-2">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'security', label: 'Security', icon: ShieldCheck },
            { id: 'billing', label: 'Subscription', icon: CreditCard },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'appearance', label: 'Appearance', icon: Palette },
            ...(isPro ? [{ id: 'integrations', label: 'API Keys', icon: Terminal }] : []),
            ...(isPremium ? [{ id: 'branding', label: 'White-label', icon: Globe }] : []),
          ].map((item, i) => (
            <button
              key={item.id}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left",
                i === 0
                  ? (isPremium ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-muted text-foreground")
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
              {i === 0 && <ChevronRight className="w-3 h-3 ml-auto opacity-40" />}
            </button>
          ))}
        </div>

        <div className="lg:col-span-9 space-y-6">

          <div className={cardClasses}>
            {isPremium && (
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <User className="w-32 h-32" />
              </div>
            )}

            <SectionHeader
              icon={User}
              title="Identity Profile"
              description="Basic information used for internal identification and communication."
            />

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Full Name</Label>
                  <Input defaultValue="Admin User" className="h-12 rounded-xl bg-muted/20 border-border/40 font-bold focus:ring-primary/20" />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Work Email</Label>
                  <Input defaultValue="admin@dormify.app" className="h-12 rounded-xl bg-muted/20 border-border/40 font-bold focus:ring-primary/20" />
                </div>
              </div>
            </div>

            <div className="mt-10 pt-10 border-t border-border/40">
              <SettingRow label="Two-Factor Auth" description="Add an extra layer of security to your account." icon={Shield}>
                <Switch />
              </SettingRow>
              <SettingRow label="Activity Reports" description="Receive weekly summaries of system logs." icon={Cloud}>
                <Switch defaultChecked />
              </SettingRow>
            </div>
          </div>

          {isPro && (
            <div className={cn(
              cardClasses,
              isPremium ? "bg-gradient-to-br from-primary/10 to-transparent border-primary/20 relative overflow-hidden" : ""
            )}>
              {isPremium && (
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
              )}

              <SectionHeader
                icon={isPremium ? Sparkles : Zap}
                title={isPremium ? "Elite Infrastructure" : "Professional Core"}
                description={isPremium ? "Configure global white-labeling and high-performance API endpoints." : "Extended capabilities for scaling operations."}
              />

              <div className="space-y-4">
                {isPremium ? (
                  <>
                    <SettingRow label="Custom Domain" description="Route your dashboard through a unique hostname." icon={Globe}>
                      <Badge variant="outline" className="bg-success/5 text-success border-success/20 font-black">ACTIVE</Badge>
                    </SettingRow>
                    <SettingRow label="SSO Integration" description="Enterprise-grade single sign-on via SAML/OIDC." icon={Lock}>
                      <Button variant="outline" size="sm" className="rounded-lg font-black text-[9px] uppercase tracking-widest">Configure</Button>
                    </SettingRow>
                    <SettingRow label="Smart Insights" description="Let the system predict vacancy trends and revenue optimizations." icon={Zap}>
                      <Switch defaultChecked />
                    </SettingRow>
                  </>
                ) : (
                  <>
                    <SettingRow label="API Access" description="Generate keys for external data sync." icon={Key}>
                      <Button variant="outline" size="sm" className="rounded-lg font-black text-[9px] uppercase tracking-widest">Generate Key</Button>
                    </SettingRow>
                    <SettingRow label="Teammates" description="Add up to 5 additional administrators." icon={User}>
                      <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                          <div key={i} className="w-7 h-7 rounded-full bg-muted border-2 border-card flex items-center justify-center text-[8px] font-black">U{i}</div>
                        ))}
                      </div>
                    </SettingRow>
                  </>
                )}
              </div>
            </div>
          )}

          <div className={cardClasses}>
            <SectionHeader
              icon={Palette}
              title="Interface Aesthetics"
              description="Personalize how the system looks and feels on your device."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'light', label: 'Daylight', icon: Sun, color: 'bg-background text-foreground border border-border' },
                { id: 'dark', label: 'Midnight', icon: Moon, color: 'bg-foreground text-background border border-border' },
                { id: 'system', label: 'System', icon: Monitor, color: 'bg-gradient-to-br from-background to-foreground text-foreground border border-border' },
              ].map((theme) => (
                <button
                  key={theme.id}
                  className={cn(
                    "relative group p-6 rounded-[1.5rem] border-2 transition-all flex flex-col items-center justify-center gap-4",
                    theme.id === 'dark' ? "border-primary bg-primary/5 ring-4 ring-primary/10" : "border-border/40 hover:border-border"
                  )}
                >
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg", theme.color)}>
                    <theme.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest">{theme.label}</span>
                  {theme.id === 'dark' && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {isPremium && (
              <div className="mt-8 p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black tracking-tight">Custom CSS Injection</h4>
                    <p className="text-[10px] font-medium text-muted-foreground uppercase">Brand every pixel of the resident portal.</p>
                  </div>
                </div>
                <Button size="sm" className="rounded-lg font-black text-[9px] uppercase tracking-widest bg-primary text-white">Open Editor</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
