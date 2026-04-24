'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  User, Bell, Palette, Shield, CreditCard,
  Key, Globe, Zap, CheckCircle2, ShieldCheck,
  ChevronRight, Moon, Sun, Monitor, Calendar,
  Mail, Cloud, Terminal, Layout, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  const router = useRouter();
  const { setTheme, resolvedTheme, theme } = useTheme();
  const isPremium = tier === 'premium';
  const isPro = tier === 'pro' || tier === 'premium';
  const [activeTab, setActiveTab] = useState('profile');
  const [settingsNotice, setSettingsNotice] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark' | 'system'>('system');

  const tabItems = useMemo(
    () => [
      { id: 'profile', label: 'My Profile', icon: User },
      { id: 'organization', label: 'Organization', icon: Globe },
      { id: 'security', label: 'Security', icon: ShieldCheck },
      { id: 'billing', label: 'Subscription', icon: CreditCard },
      { id: 'notifications', label: 'Notifications', icon: Bell },
      { id: 'appearance', label: 'Appearance', icon: Palette },
      ...(isPro ? [{ id: 'integrations', label: 'API Keys', icon: Terminal }] : []),
      ...(isPremium ? [{ id: 'branding', label: 'White-label', icon: Layout }] : []),
    ],
    [isPro, isPremium]
  );

  useEffect(() => {
    if (!tabItems.some((item) => item.id === activeTab)) {
      setActiveTab(tabItems[0].id);
    }
  }, [activeTab, tabItems]);

  useEffect(() => {
    const activeTheme = theme === 'system' ? 'system' : resolvedTheme === 'dark' ? 'dark' : 'light';
    setSelectedTheme(activeTheme);
  }, [resolvedTheme, theme]);

  const handleThemeSelect = (themeId: 'light' | 'dark' | 'system') => {
    setTheme(themeId);
    setSelectedTheme(themeId);
    localStorage.setItem('dormify-theme-preference', themeId);
    setSettingsNotice(`Theme updated to ${themeId === 'light' ? 'Daylight' : themeId === 'dark' ? 'Midnight' : 'Adaptive'}.`);
  };

  const handleTerminateSession = () => {
    const confirmed = window.confirm('Terminate this session and return to login?');
    if (!confirmed) return;

    localStorage.removeItem('dormify-session');
    router.push('/login');
  };

  const themeOptions: Array<{
    id: 'light' | 'dark' | 'system';
    label: string;
    icon: typeof Sun;
    color: string;
  }> = [
    { id: 'light', label: 'Daylight', icon: Sun, color: 'bg-white text-slate-950 border-slate-200' },
    { id: 'dark', label: 'Midnight', icon: Moon, color: 'bg-slate-950 text-white border-slate-800' },
    { id: 'system', label: 'Adaptive', icon: Monitor, color: 'bg-gradient-to-br from-white to-slate-950 text-foreground border-border' },
  ];

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

  const SettingRow = ({ label, description, children, icon }: { label: string, description: string, children: React.ReactNode, icon?: React.ReactNode }) => (
    <div className={cn(
      "flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 border-b border-border/10 last:border-0",
      tier === 'premium' ? "group hover:bg-foreground/[0.02] transition-colors -mx-4 px-4 rounded-xl" : ""
    )}>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          {icon}
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
    isPremium ? "max-w-5xl mx-auto pb-10" : ""
  );

  const cardClasses = cn(
    "overflow-hidden border-border/40",
    isPremium ? "bg-foreground/5 backdrop-blur-3xl rounded-2xl p-8 shadow-2xl shadow-primary/5 border-foreground/10" :
    isPro ? "bg-card backdrop-blur-xl rounded-2xl p-6 shadow-xl" :
    "bg-card rounded-xl p-5 shadow-sm"
  );

  return (
    <div className={containerClasses}>
      <div
        className={cn(
          "flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-border/40",
          isPremium ? "border-transparent" : ""
        )}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-3 mb-2">
            <Badge
              className={cn(
                "px-3 py-1 text-[10px] font-black uppercase tracking-widest border-none",
                isPremium ? "bg-primary text-white shadow-lg shadow-primary/30" :
                isPro ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
              )}
            >
              {tier} account
            </Badge>
            {isPremium && (
              <div className="flex items-center gap-1 text-primary animate-pulse">
                <Sparkles className="w-3 h-3 fill-current" />
                <span className="text-[10px] font-black uppercase">Elite Mode Active</span>
              </div>
            )}
          </div>
          <h1
            className={cn(
              "text-3xl md:text-4xl font-black tracking-tight",
              isPremium ? "bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent" : "text-foreground"
            )}
          >
            {title}
          </h1>
          <p className="text-muted-foreground font-medium">
            Manage your {tier} environment and core configurations.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="rounded-xl h-10 px-4 font-bold text-[9px] uppercase tracking-widest border-border/40"
            onClick={() => setSettingsNotice('Local changes discarded.')}
          >
            Discard Changes
          </Button>
          <Button
            className={cn(
              "rounded-xl h-10 px-6 font-black text-[9px] uppercase tracking-[0.2em] transition-all",
              isPremium ? "bg-primary text-white shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95" :
              isPro ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-primary text-white"
            )}
            onClick={() => setSettingsNotice('Preferences saved locally for this session.')}
          >
            Save Preferences
          </Button>
        </div>
      </div>

      {settingsNotice ? (
        <p className="text-xs font-semibold text-muted-foreground">{settingsNotice}</p>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3 space-y-2">
          {tabItems.map((item) => {
            const active = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left",
                  active
                    ? isPremium
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
                {active ? <ChevronRight className="w-3 h-3 ml-auto opacity-40" /> : null}
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-9 space-y-6">
          {activeTab === 'profile' && (
            <div className={cardClasses}>
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
            </div>
          )}

          {activeTab === 'organization' && (
            <div className={cardClasses}>
              <SectionHeader
                icon={Globe}
                title="Organization"
                description="Manage your organization-level profile and operational defaults."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Organization Name</Label>
                  <Input defaultValue="Dormify Campus Ops" className="h-12 rounded-xl bg-muted/20 border-border/40 font-bold" />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Region</Label>
                  <Input defaultValue="Asia Pacific" className="h-12 rounded-xl bg-muted/20 border-border/40 font-bold" />
                </div>
              </div>
              <div className="mt-8">
                <Button onClick={() => setSettingsNotice('Organization details saved locally.')}>Save Organization</Button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className={cardClasses}>
              <SectionHeader
                icon={ShieldCheck}
                title="Security Controls"
                description="Protect account access and active sessions."
              />
              <SettingRow label="Two-Factor Auth" description="Add an extra layer of security to your account." icon={<Shield className="w-4 h-4 text-muted-foreground/60" />}>
                <Switch />
              </SettingRow>
              <SettingRow label="Session Alerts" description="Notify when a new login is detected." icon={<Bell className="w-4 h-4 text-muted-foreground/60" />}>
                <Switch defaultChecked />
              </SettingRow>
              <div className="mt-8 pt-6 border-t border-border/30 flex flex-wrap items-center gap-3">
                <Button variant="destructive" onClick={handleTerminateSession}>
                  Terminate Session
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className={cardClasses}>
              <SectionHeader
                icon={CreditCard}
                title="Subscription"
                description="Track your current plan and billing preferences."
              />
              <SettingRow label="Current Plan" description={`${tier.toUpperCase()} tier is active.`} icon={<CreditCard className="w-4 h-4 text-muted-foreground/60" />}>
                <Badge variant="outline" className="font-black">{tier.toUpperCase()}</Badge>
              </SettingRow>
              <SettingRow label="Billing Cycle" description="Monthly subscription renewal." icon={<Calendar className="w-4 h-4 text-muted-foreground/60" />}>
                <Badge variant="outline" className="font-black">MONTHLY</Badge>
              </SettingRow>
              <div className="mt-6">
                <Button variant="outline" onClick={() => setSettingsNotice('Billing portal is coming soon.')}>
                  Open Billing Portal
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className={cardClasses}>
              <SectionHeader
                icon={Bell}
                title="Notifications"
                description="Choose what updates you want to receive."
              />
              <SettingRow label="Activity Reports" description="Receive weekly summaries of system logs." icon={<Cloud className="w-4 h-4 text-muted-foreground/60" />}>
                <Switch defaultChecked />
              </SettingRow>
              <SettingRow label="Incident Alerts" description="Send immediate alerts for critical issues." icon={<Zap className="w-4 h-4 text-muted-foreground/60" />}>
                <Switch defaultChecked />
              </SettingRow>
              <SettingRow label="Marketing Updates" description="Receive product updates and release notes." icon={<Mail className="w-4 h-4 text-muted-foreground/60" />}>
                <Switch />
              </SettingRow>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className={cardClasses}>
              <SectionHeader
                icon={Palette}
                title="Interface Aesthetics"
                description="Personalize how the system looks and feels on your device."
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {themeOptions.map((themeOption) => {
                  const isActive = selectedTheme === themeOption.id;

                  return (
                    <button
                      key={themeOption.id}
                      onClick={() => handleThemeSelect(themeOption.id)}
                      className={cn(
                        "relative group p-6 rounded-[1.5rem] border-2 transition-all flex flex-col items-center justify-center gap-4",
                        isActive ? "border-primary bg-primary/5 ring-4 ring-primary/10" : "border-border/40 hover:border-border"
                      )}
                    >
                      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg", themeOption.color)}>
                        <themeOption.icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest">{themeOption.label}</span>
                      {isActive ? (
                        <div className="absolute top-2 right-2">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'integrations' && isPro && (
            <div className={cardClasses}>
              <SectionHeader
                icon={Terminal}
                title="API Keys"
                description="Manage your API key access and developer credentials."
              />
              <SettingRow label="Primary API Key" description="Use this key for server-side integrations." icon={<Key className="w-4 h-4 text-muted-foreground/60" />}>
                <Button variant="outline" size="sm" onClick={() => setSettingsNotice('API key regenerated locally (mock).')}>
                  Generate Key
                </Button>
              </SettingRow>
            </div>
          )}

          {activeTab === 'branding' && isPremium && (
            <div className={cardClasses}>
              <SectionHeader
                icon={Layout}
                title="White-label"
                description="Customize branding for your institution portal."
              />
              <div className="mt-2 p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-black tracking-tight">Custom CSS Injection</h4>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase">Brand every pixel of the resident portal.</p>
                </div>
                <Button size="sm" className="rounded-lg font-black text-[9px] uppercase tracking-widest bg-primary text-white" onClick={() => setSettingsNotice('White-label editor is coming soon.')}>
                  Open Editor
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
