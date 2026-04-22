'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  ChefHat,
  ChevronRight,
  Clock,
  Eye,
  Flame,
  Leaf,
  MessageSquare,
  MoreVertical,
  Plus,
  Save,
  Sunrise,
  Sun,
  Sunset,
  Trash2,
  Utensils,
  UtensilsCrossed,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  type DailyMenu,
  type Meal,
  type MealStatus,
  type MealVisibility,
  TODAY_MENU,
  WEEKLY_MENU,
} from '@/lib/data';
import { TenantMealsView } from './tenant-views';

interface MealsContentProps {
  title: string;
  tier?: 'normal' | 'pro' | 'premium';
  role?: 'admin' | 'tenant' | 'chef';
  subType?: string;
}

const mealMeta: Record<Meal['type'], { icon: typeof Sunrise; text: string; bg: string }> = {
  Breakfast: { icon: Sunrise, text: 'text-orange-500', bg: 'bg-orange-500/10' },
  Lunch: { icon: Sun, text: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  Dinner: { icon: Sunset, text: 'text-indigo-500', bg: 'bg-indigo-500/10' },
};

const statusAccent: Record<MealStatus, string> = {
  Available: 'bg-emerald-500/10 text-emerald-600',
  'Low Stock': 'bg-amber-500/10 text-amber-600',
  Served: 'bg-muted text-muted-foreground',
};

const updateMenus = (
  menus: DailyMenu[],
  mealId: string,
  updater: (meal: Meal) => Meal
) =>
  menus.map((menu) => ({
    ...menu,
    meals: menu.meals.map((meal) => (meal.id === mealId ? updater(meal) : meal)),
  }));

const getCoverage = (meal: Meal) => Math.round((meal.remaining / meal.totalServings) * 100);

export function MealsContent({ title, role = 'admin', subType }: MealsContentProps) {
  if (role === 'tenant') return <TenantMealsView />;
  if (role === 'chef') return <ChefMealsView title={title} subType={subType} />;

  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('daily');
  const [todayMenu, setTodayMenu] = useState<DailyMenu>(TODAY_MENU);
  const [weeklyMenus, setWeeklyMenus] = useState<DailyMenu[]>(WEEKLY_MENU);
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [isManaging, setIsManaging] = useState(false);
  const [reviewedMealIds, setReviewedMealIds] = useState<string[]>([]);
  const [noteInput, setNoteInput] = useState('');

  const currentWeeklyMenu = weeklyMenus[selectedDayIdx] ?? weeklyMenus[0];
  const currentMenu = viewMode === 'daily' ? todayMenu : currentWeeklyMenu;

  const allMeals = weeklyMenus.flatMap((menu) => menu.meals);
  const lowStockMeals = currentMenu.meals.filter((meal) => meal.status === 'Low Stock');
  const publishedMeals = currentMenu.meals.filter((meal) => meal.visibility === 'Published').length;

  const stats = useMemo(() => {
    const totalServings = currentMenu.meals.reduce((sum, meal) => sum + meal.totalServings, 0);
    const remaining = currentMenu.meals.reduce((sum, meal) => sum + meal.remaining, 0);
    return {
      totalMeals: currentMenu.meals.length,
      totalServings,
      remaining,
      published: publishedMeals,
      chefs: [...new Set(currentMenu.meals.map((meal) => meal.chef))].length,
    };
  }, [currentMenu, publishedMeals]);

  const kitchenVitals = useMemo(
    () => [
      {
        label: 'Core Capacity',
        val: stats.totalServings === 0 ? 0 : Math.round((stats.remaining / stats.totalServings) * 100),
        color: 'bg-primary',
      },
      {
        label: 'Prep Efficiency',
        val: Math.max(72, 100 - allMeals.filter((meal) => meal.status === 'Low Stock').length * 4),
        color: 'bg-emerald-500',
      },
    ],
    [allMeals, stats.remaining, stats.totalServings]
  );

  const serviceNotes = [
    {
      user: 'Kitchen Lead',
      msg: `${publishedMeals} meals are visible for ${currentMenu.day}.`,
      time: 'Live',
    },
    {
      user: 'Operations',
      msg:
        lowStockMeals.length > 0
          ? `${lowStockMeals.length} meal${lowStockMeals.length > 1 ? 's' : ''} need stock attention.`
          : 'No stock alerts for the current schedule.',
      time: 'Now',
    },
  ];

  const openManager = (meal: Meal) => {
    setSelectedMeal({ ...meal });
    setIsManaging(true);
  };

  const closeManager = () => {
    setSelectedMeal(null);
    setIsManaging(false);
  };

  const saveMeal = () => {
    if (!selectedMeal) return;

    setTodayMenu((current) => ({
      ...current,
      meals: current.meals.map((meal) => (meal.id === selectedMeal.id ? selectedMeal : meal)),
    }));
    setWeeklyMenus((current) => updateMenus(current, selectedMeal.id, () => selectedMeal));
    setIsManaging(false);
  };

  const deleteMeal = () => {
    if (!selectedMeal) return;

    setTodayMenu((current) => ({
      ...current,
      meals: current.meals.filter((meal) => meal.id !== selectedMeal.id),
    }));
    setWeeklyMenus((current) =>
      current.map((menu) => ({
        ...menu,
        meals: menu.meals.filter((meal) => meal.id !== selectedMeal.id),
      }))
    );
    setIsManaging(false);
  };

  const toggleReview = (event: React.MouseEvent, mealId: string) => {
    event.stopPropagation();
    setReviewedMealIds((current) =>
      current.includes(mealId) ? current.filter((id) => id !== mealId) : [...current, mealId]
    );
  };

  const addOperationalNote = () => {
    setNoteInput('');
  };

  return (
    <div className="w-full space-y-8 pb-12">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col gap-6 rounded-[2.5rem] border border-border/40 bg-card/60 p-8 shadow-sm backdrop-blur-2xl lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="flex items-center gap-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-xl shadow-primary/20">
            <UtensilsCrossed className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground">{title}</h1>
            <div className="mt-1 flex items-center gap-2">
              <Badge variant="outline" className="border-none bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold uppercase text-emerald-600">
                Kitchen Live
              </Badge>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                {currentMenu.day} • {currentMenu.date}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex gap-1.5 rounded-2xl border border-border/10 bg-muted/40 p-1.5">
            {['daily', 'weekly'].map((mode) => (
              <Button
                key={mode}
                variant="ghost"
                size="sm"
                onClick={() => setViewMode(mode as 'daily' | 'weekly')}
                className={cn(
                  'h-10 rounded-xl px-5 text-[11px] font-black uppercase tracking-widest transition-all',
                  viewMode === mode
                    ? 'bg-background text-primary shadow-md'
                    : 'text-muted-foreground/50 hover:text-foreground'
                )}
              >
                {mode === 'daily' ? 'Today Meal' : 'Full Week'}
              </Button>
            ))}
          </div>

          <Button variant="outline" className="h-11 rounded-xl gap-2 border-border/40 px-5 text-[10px] font-black uppercase tracking-widest">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-8">
          {viewMode === 'daily' ? (
            <div className="space-y-8">
              <div className="flex items-center justify-between px-4">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-foreground">Today&apos;s Meal is...</h2>
                  <p className="mt-1 text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                    Service overview for {todayMenu.day}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden text-right sm:block">
                    <p className="text-[9px] font-black uppercase leading-none text-muted-foreground/40">Status</p>
                    <p className="mt-1 text-xs font-black uppercase tracking-widest text-emerald-500">Ready</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                {todayMenu.meals.map((meal, idx) => {
                  const mealStyle = mealMeta[meal.type] ?? {
                    icon: Utensils,
                    text: 'text-primary',
                    bg: 'bg-primary/10',
                  };
                  const reviewed = reviewedMealIds.includes(meal.id);
                  const MealIcon = mealStyle.icon;

                  return (
                    <motion.div
                      key={meal.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08 }}
                    >
                      <Card
                        onClick={() => openManager(meal)}
                        className="group relative cursor-pointer overflow-hidden rounded-[2rem] border-border/40 bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-xl"
                      >
                        <div className={cn('absolute left-0 top-0 h-full w-1.5', reviewed ? 'bg-primary' : 'bg-muted')} />
                        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                          <div className="flex items-center gap-6">
                            <div className={cn('flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-border/10 shadow-inner transition-all duration-500 group-hover:scale-110', mealStyle.bg)}>
                              <MealIcon className={cn('h-8 w-8', mealStyle.text)} />
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-3">
                                <span className={cn('text-[9px] font-black uppercase tracking-[0.2em]', mealStyle.text)}>
                                  {meal.type}
                                </span>
                                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">
                                  <Clock className="h-3.5 w-3.5" />
                                  {meal.time} - {meal.timeEnd}
                                </span>
                              </div>
                              <h3 className="text-xl font-black tracking-tight text-foreground transition-colors group-hover:text-primary">
                                {meal.name}
                              </h3>
                              <div className="flex flex-wrap items-center gap-3">
                                <Badge variant="outline" className={cn('rounded-lg border-none px-3 py-1 text-[9px] font-black uppercase tracking-widest', statusAccent[meal.status])}>
                                  {meal.status}
                                </Badge>
                                <Badge variant="outline" className="rounded-lg border-none bg-blue-500/10 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-blue-600">
                                  {meal.visibility}
                                </Badge>
                                <div className="flex items-center gap-1.5 text-amber-500">
                                  <Flame className="h-3.5 w-3.5" />
                                  <span className="text-xs font-black">{meal.calories}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-muted-foreground/70">
                                  <ChefHat className="h-3.5 w-3.5" />
                                  <span className="text-xs font-bold">{meal.chef}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="w-full border-t border-border/5 pt-4 md:w-auto md:border-t-0 md:pt-0">
                            <div className="flex items-center gap-8">
                              <div className="flex-1 space-y-2 md:w-36">
                                <div className="flex items-end justify-between">
                                  <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">
                                    Portions Tracking
                                  </p>
                                  <span className="text-xs font-black text-foreground">
                                    {meal.remaining}
                                    <span className="text-muted-foreground/30"> / {meal.totalServings}</span>
                                  </span>
                                </div>
                                <Progress value={getCoverage(meal)} className="h-2" />
                              </div>

                              <div className="flex items-center gap-3">
                                <button
                                  onClick={(event) => toggleReview(event, meal.id)}
                                  className={cn(
                                    'flex h-10 w-10 items-center justify-center rounded-xl transition-all',
                                    reviewed
                                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                      : 'bg-muted text-muted-foreground/30 hover:bg-primary/10 hover:text-primary'
                                  )}
                                >
                                  <CheckCircle2 className="h-5 w-5" />
                                </button>
                                <div className="rounded-xl p-2 text-muted-foreground/20 transition-colors hover:text-foreground">
                                  <MoreVertical className="h-5 w-5" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="no-scrollbar flex gap-2 overflow-x-auto px-1 pb-2 pt-2">
                {weeklyMenus.map((menu, idx) => (
                  <button
                    key={menu.date}
                    onClick={() => setSelectedDayIdx(idx)}
                    className={cn(
                      'relative flex min-w-[5rem] flex-col items-center justify-center rounded-[1.5rem] border py-5 transition-all duration-500',
                      selectedDayIdx === idx
                        ? 'scale-105 border-primary bg-primary text-white shadow-xl'
                        : 'border-border/40 bg-card text-muted-foreground hover:bg-muted'
                    )}
                  >
                    <span className={cn('text-[10px] font-black uppercase tracking-widest', selectedDayIdx === idx ? 'text-white/80' : 'opacity-60')}>
                      {menu.day.slice(0, 3)}
                    </span>
                    <span className="mt-1 text-2xl font-black">
                      {new Date(menu.date).getDate().toString().padStart(2, '0')}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex min-h-[450px] flex-col overflow-hidden rounded-[2.5rem] border border-border/40 bg-card shadow-sm">
                <div className="flex items-center justify-between border-b border-border/40 bg-muted/30 px-8 py-6">
                  <span className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-foreground">
                    <Activity className="h-4 w-4 text-primary" />
                    Scheduling Node: {currentWeeklyMenu.day}
                  </span>
                </div>

                <div className="flex-1 divide-y divide-border/40">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentWeeklyMenu.date}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      {currentWeeklyMenu.meals.map((meal) => {
                        const mealStyle = mealMeta[meal.type];
                        const MealIcon = mealStyle.icon;
                        const reviewed = reviewedMealIds.includes(meal.id);

                        return (
                          <div
                            key={meal.id}
                            onClick={() => openManager(meal)}
                            className="group flex cursor-pointer flex-col justify-between gap-8 p-8 transition-all hover:bg-primary/[0.02] md:flex-row md:items-center"
                          >
                            <div className="flex items-center gap-6">
                              <div className={cn('flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border/40 transition-all duration-500 group-hover:rotate-6', mealStyle.bg)}>
                                <MealIcon className={cn('h-6 w-6', mealStyle.text)} />
                              </div>
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-3">
                                  <span className={cn('text-[9px] font-black uppercase tracking-[0.2em]', mealStyle.text)}>
                                    {meal.type}
                                  </span>
                                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">
                                    <Clock className="h-3.5 w-3.5" />
                                    {meal.time} - {meal.timeEnd}
                                  </span>
                                </div>
                                <h3 className="text-lg font-black tracking-tight text-foreground transition-colors group-hover:text-primary">
                                  {meal.name}
                                </h3>
                              </div>
                            </div>

                            <div className="flex items-center gap-6 border-border/20 md:border-l md:pl-8">
                              <button
                                onClick={(event) => toggleReview(event, meal.id)}
                                className={cn(
                                  'flex h-10 w-10 items-center justify-center rounded-xl transition-all',
                                  reviewed
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'bg-muted text-muted-foreground/30 hover:bg-primary/10'
                                )}
                              >
                                <CheckCircle2 className="h-5 w-5" />
                              </button>
                              <Badge variant="outline" className="rounded-xl px-4 py-2 text-[9px] font-black uppercase tracking-widest">
                                {meal.status}
                              </Badge>
                              <ChevronRight className="h-5 w-5 text-muted-foreground/30 transition-all group-hover:translate-x-1 group-hover:text-foreground" />
                            </div>
                          </div>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6 lg:col-span-4">
          <Card className="flex flex-col gap-8 rounded-[2.5rem] border border-border/40 bg-card p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-tight text-foreground">Service Coordination</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Global Comms</p>
                </div>
              </div>
              <Badge className="border-none bg-emerald-500/10 px-3 py-1 text-[9px] font-black uppercase text-emerald-500">
                Active
              </Badge>
            </div>

            <div className="space-y-5">
              {serviceNotes.map((note, idx) => (
                <div key={`${note.user}-${idx}`} className="space-y-2 rounded-2xl border border-border/10 bg-muted/30 p-4 transition-all hover:bg-muted/50">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-foreground">{note.user}</span>
                    <span className="text-[10px] font-bold text-muted-foreground/30">{note.time}</span>
                  </div>
                  <p className="text-sm font-medium leading-snug text-muted-foreground/80">{note.msg}</p>
                </div>
              ))}
            </div>

            <div className="relative flex gap-2">
              <Input
                value={noteInput}
                onChange={(event) => setNoteInput(event.target.value)}
                placeholder="Type operational note..."
                className="h-12 rounded-2xl border-border/40 bg-muted/20 px-4 text-xs focus-visible:ring-primary/20"
              />
              <Button
                onClick={addOperationalNote}
                className="h-12 rounded-2xl bg-primary px-4 text-white shadow-lg shadow-primary/20"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </Card>

          <Card className="relative overflow-hidden rounded-[2.5rem] border border-border/40 bg-card p-8 shadow-sm">
            <div className="pointer-events-none absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-primary/5 to-transparent" />
            <div className="relative z-10 flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-muted-foreground">
                  Kitchen Vitals
                </h3>
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="space-y-6">
                {kitchenVitals.map((vital) => (
                  <div key={vital.label} className="space-y-3">
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-foreground/80">
                      <span>{vital.label}</span>
                      <span>{vital.val}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted/50 shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${vital.val}%` }}
                        className={cn('h-full rounded-full', vital.color)}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-2xl border border-border/20 bg-muted/20 p-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                    Published
                  </span>
                  <span className="text-lg font-black text-foreground">{stats.published}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-border/20 bg-muted/20 p-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                    Assigned Chefs
                  </span>
                  <span className="text-lg font-black text-foreground">{stats.chefs}</span>
                </div>
              </div>

              <Button variant="outline" className="h-11 w-full rounded-xl border-border/40 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-muted/50">
                Full Diagnostics
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Dialog open={isManaging} onOpenChange={setIsManaging}>
        <DialogContent className="overflow-hidden rounded-[2.5rem] border-border/40 bg-card/95 p-0 shadow-2xl backdrop-blur-3xl sm:max-w-md">
          <DialogHeader className="border-b border-border/10 p-8 pb-4">
            <DialogTitle className="text-2xl font-black tracking-tight text-foreground">
              {selectedMeal ? 'Modify Service' : 'Meal Details'}
            </DialogTitle>
          </DialogHeader>

          {selectedMeal && (
            <div className="space-y-6 p-8">
              <div className="space-y-2">
                <Label className="px-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
                  Service Label
                </Label>
                <Input
                  className="h-12 rounded-2xl border-border/40 bg-muted/20 px-4 font-bold focus-visible:ring-primary/20"
                  value={selectedMeal.name}
                  onChange={(event) =>
                    setSelectedMeal((current) => current ? { ...current, name: event.target.value } : current)
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="px-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
                    Planned Portions
                  </Label>
                  <Input
                    type="number"
                    className="h-12 rounded-2xl bg-muted/20 px-4 font-bold"
                    value={selectedMeal.totalServings}
                    onChange={(event) => {
                      const value = Number(event.target.value);
                      setSelectedMeal((current) =>
                        current
                          ? {
                              ...current,
                              totalServings: Number.isNaN(value) ? current.totalServings : Math.max(1, value),
                            }
                          : current
                      );
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="px-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
                    Remaining Portions
                  </Label>
                  <Input
                    type="number"
                    className="h-12 rounded-2xl bg-muted/20 px-4 font-bold text-primary"
                    value={selectedMeal.remaining}
                    onChange={(event) => {
                      const value = Number(event.target.value);
                      setSelectedMeal((current) =>
                        current
                          ? {
                              ...current,
                              remaining: Number.isNaN(value)
                                ? current.remaining
                                : Math.max(0, Math.min(current.totalServings, value)),
                            }
                          : current
                      );
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="px-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
                    Service Phase
                  </Label>
                  <Select
                    value={selectedMeal.status}
                    onValueChange={(value) =>
                      setSelectedMeal((current) => current ? { ...current, status: value as MealStatus } : current)
                    }
                  >
                    <SelectTrigger className="h-12 w-full rounded-2xl border-border/40 bg-muted/20 px-4">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Low Stock">Low Stock</SelectItem>
                      <SelectItem value="Served">Served</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="px-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
                    Visibility
                  </Label>
                  <Select
                    value={selectedMeal.visibility}
                    onValueChange={(value) =>
                      setSelectedMeal((current) => current ? { ...current, visibility: value as MealVisibility } : current)
                    }
                  >
                    <SelectTrigger className="h-12 w-full rounded-2xl border-border/40 bg-muted/20 px-4">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Published">Published</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="px-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
                    Lead Chef
                  </Label>
                  <Input
                    className="h-12 rounded-2xl border-border/40 bg-muted/20 px-4 font-bold"
                    value={selectedMeal.chef}
                    onChange={(event) =>
                      setSelectedMeal((current) => current ? { ...current, chef: event.target.value } : current)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="px-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
                    Station
                  </Label>
                  <Input
                    className="h-12 rounded-2xl border-border/40 bg-muted/20 px-4 font-bold"
                    value={selectedMeal.station}
                    onChange={(event) =>
                      setSelectedMeal((current) => current ? { ...current, station: event.target.value } : current)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="px-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
                  Notes
                </Label>
                <Textarea
                  rows={4}
                  className="rounded-2xl border-border/40 bg-muted/20 px-4 py-3 font-medium"
                  value={selectedMeal.notes}
                  onChange={(event) =>
                    setSelectedMeal((current) => current ? { ...current, notes: event.target.value } : current)
                  }
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedMeal.dietary.vegetarian && (
                  <Badge variant="outline" className="border-emerald-200 bg-emerald-500/10 text-emerald-600">
                    <Leaf className="mr-1 h-3 w-3" />
                    Vegetarian
                  </Badge>
                )}
                {selectedMeal.dietary.vegan && (
                  <Badge variant="outline" className="border-green-200 bg-green-500/10 text-green-600">
                    Vegan
                  </Badge>
                )}
                {selectedMeal.dietary.glutenFree && (
                  <Badge variant="outline" className="border-blue-200 bg-blue-500/10 text-blue-600">
                    Gluten-Free
                  </Badge>
                )}
              </div>
            </div>
          )}

          <DialogFooter className="flex items-center justify-between gap-4 p-8 pt-2">
            <Button
              variant="ghost"
              onClick={deleteMeal}
              className="h-12 rounded-2xl gap-2 text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-500/10"
            >
              <Trash2 className="h-5 w-5" />
              Terminate
            </Button>
            <Button
              onClick={saveMeal}
              className="h-12 flex-1 rounded-2xl bg-primary text-[11px] font-black uppercase tracking-widest text-white shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Operations
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ChefMealsView({ title, subType }: { title: string; subType?: string }) {
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const currentMenu = WEEKLY_MENU[selectedDayIdx] ?? WEEKLY_MENU[0];

  const prepStats = useMemo(() => {
    const todayServings = currentMenu.meals.reduce((sum, meal) => sum + meal.totalServings, 0);
    const lowStock = currentMenu.meals.filter((meal) => meal.status === 'Low Stock').length;
    const draftMeals = currentMenu.meals.filter((meal) => meal.visibility === 'Draft').length;
    const proteinPrep = currentMenu.meals
      .filter((meal) => !meal.dietary.vegetarian)
      .reduce((sum, meal) => sum + meal.totalServings, 0);

    return {
      todayServings,
      lowStock,
      draftMeals,
      proteinPrep,
    };
  }, [currentMenu]);

  const prepQueue = useMemo(
    () =>
      currentMenu.meals.map((meal) => ({
        ...meal,
      prepTarget: meal.totalServings,
      served: meal.totalServings - meal.remaining,
    })),
    [currentMenu]
  );

  const productionNotes = [
    {
      label: 'Admin schedule',
      value: `${currentMenu.meals.filter((meal) => meal.visibility === 'Published').length} meals published`,
    },
    {
      label: 'Stock watch',
      value:
        prepStats.lowStock > 0
          ? `${prepStats.lowStock} low-stock meal${prepStats.lowStock > 1 ? 's' : ''}`
          : 'No low-stock alerts',
    },
    {
      label: 'Chef assignments',
      value: [...new Set(currentMenu.meals.map((meal) => meal.chef))].join(', '),
    },
  ];

  const isCounts = subType === 'counts';
  const isPlan = subType === 'plan';

  return (
    <div className="w-full space-y-6 pb-12">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col gap-6 rounded-[2.5rem] border border-border/40 bg-card/60 p-8 shadow-sm backdrop-blur-2xl lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="flex items-center gap-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-xl shadow-primary/20">
            <ChefHat className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground">{title}</h1>
            <div className="mt-1 flex items-center gap-2">
              <Badge variant="outline" className="border-none bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase text-primary">
                Chef Workflow
              </Badge>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                {currentMenu.day} • {currentMenu.date}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Card className="rounded-2xl border-border/40 bg-card p-4 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Today Servings</p>
            <p className="mt-2 text-3xl font-black tracking-tight text-foreground">{prepStats.todayServings}</p>
          </Card>
          <Card className="rounded-2xl border-border/40 bg-card p-4 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Protein Prep</p>
            <p className="mt-2 text-3xl font-black tracking-tight text-foreground">{prepStats.proteinPrep}</p>
          </Card>
          <Card className="rounded-2xl border-border/40 bg-card p-4 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Low Stock</p>
            <p className="mt-2 text-3xl font-black tracking-tight text-foreground">{prepStats.lowStock}</p>
          </Card>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-8">
          <div className="no-scrollbar flex gap-2 overflow-x-auto px-1 pb-2 pt-2">
            {WEEKLY_MENU.map((menu, idx) => (
              <button
                key={menu.date}
                onClick={() => setSelectedDayIdx(idx)}
                className={cn(
                  'relative flex min-w-[5rem] flex-col items-center justify-center rounded-[1.5rem] border py-5 transition-all duration-500',
                  selectedDayIdx === idx
                    ? 'scale-105 border-primary bg-primary text-white shadow-xl'
                    : 'border-border/40 bg-card text-muted-foreground hover:bg-muted'
                )}
              >
                <span className={cn('text-[10px] font-black uppercase tracking-widest', selectedDayIdx === idx ? 'text-white/80' : 'opacity-60')}>
                  {menu.day.slice(0, 3)}
                </span>
                <span className="mt-1 text-2xl font-black">
                  {new Date(menu.date).getDate().toString().padStart(2, '0')}
                </span>
              </button>
            ))}
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between px-4">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-foreground">
                  {isCounts ? 'Service Counts' : isPlan ? 'Production Plan' : 'Kitchen Queue'}
                </h2>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                  {isCounts ? 'Track served meals and remaining portions' : 'Use the admin schedule for prep and production'}
                </p>
              </div>
              <Badge className="border-none bg-emerald-500/10 px-3 py-1 text-[9px] font-black uppercase text-emerald-500">
                Chef Active
              </Badge>
            </div>

            <div className="grid gap-4">
              {prepQueue.map((meal, idx) => {
                const mealStyle = mealMeta[meal.type];
                const MealIcon = mealStyle.icon;

                return (
                  <motion.div
                    key={meal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                  >
                    <Card className="group relative overflow-hidden rounded-[2rem] border-border/40 bg-card p-6 shadow-sm transition-all hover:border-primary/30">
                      <div className={cn('absolute left-0 top-0 h-full w-1.5', meal.status === 'Low Stock' ? 'bg-amber-500' : 'bg-primary')} />
                      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-6">
                          <div className={cn('flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-border/10 shadow-inner transition-all duration-500 group-hover:scale-110', mealStyle.bg)}>
                            <MealIcon className={cn('h-8 w-8', mealStyle.text)} />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <span className={cn('text-[9px] font-black uppercase tracking-[0.2em]', mealStyle.text)}>
                                {meal.type}
                              </span>
                              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">
                                <Clock className="h-3.5 w-3.5" />
                                {meal.time} - {meal.timeEnd}
                              </span>
                            </div>
                              <h3 className="text-xl font-black tracking-tight text-foreground">{meal.name}</h3>
                              <div className="flex flex-wrap items-center gap-3">
                                <Badge variant="outline" className={cn('rounded-lg border-none px-3 py-1 text-[9px] font-black uppercase tracking-widest', statusAccent[meal.status])}>
                                  {meal.status}
                                </Badge>
                                <Badge variant="outline" className="rounded-lg border-none bg-blue-500/10 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-blue-600">
                                  {meal.visibility}
                                </Badge>
                                <div className="flex items-center gap-1.5 text-muted-foreground/70">
                                  <ChefHat className="h-3.5 w-3.5" />
                                  <span className="text-xs font-bold">{meal.chef}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-amber-500">
                                <Flame className="h-3.5 w-3.5" />
                                <span className="text-xs font-black">{meal.calories}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="w-full border-t border-border/5 pt-4 md:w-auto md:border-t-0 md:pt-0">
                          <div className="flex items-center gap-8">
                            <div className="flex-1 space-y-2 md:w-52">
                              <div className="flex items-end justify-between">
                                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">
                                  {isCounts ? 'Served / Planned' : 'Prep Target'}
                                </p>
                                <span className="text-xs font-black text-foreground">
                                  {isCounts ? meal.served : meal.prepTarget}
                                  <span className="text-muted-foreground/30"> / {meal.totalServings}</span>
                                </span>
                              </div>
                              <Progress value={isCounts ? Math.round((meal.served / meal.totalServings) * 100) : getCoverage(meal)} className="h-2" />
                            </div>

                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className="rounded-xl px-4 py-2 text-[9px] font-black uppercase tracking-widest">
                                {meal.station}
                              </Badge>
                              <div className="rounded-xl border border-border/30 bg-muted/20 px-3 py-2 text-[9px] font-black uppercase tracking-widest text-muted-foreground/70">
                                {meal.demand} Demand
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-4">
          <Card className="flex flex-col gap-6 rounded-[2.5rem] border border-border/40 bg-card p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-tight text-foreground">Kitchen Brief</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">From admin schedule</p>
                </div>
              </div>
              <Badge className="border-none bg-emerald-500/10 px-3 py-1 text-[9px] font-black uppercase text-emerald-500">
                Synced
              </Badge>
            </div>

            <div className="space-y-4">
              {productionNotes.map((note) => (
                <div key={note.label} className="space-y-2 rounded-2xl border border-border/10 bg-muted/30 p-4 transition-all hover:bg-muted/50">
                  <span className="text-[11px] font-black text-foreground">{note.label}</span>
                  <p className="text-sm font-medium leading-snug text-muted-foreground/80">{note.value}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="relative overflow-hidden rounded-[2.5rem] border border-border/40 bg-card p-8 shadow-sm">
            <div className="pointer-events-none absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-primary/5 to-transparent" />
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-muted-foreground">
                  Prep Summary
                </h3>
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-2xl border border-border/20 bg-muted/20 p-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                    Published Meals
                  </span>
                  <span className="text-lg font-black text-foreground">
                    {currentMenu.meals.filter((meal) => meal.visibility === 'Published').length}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-border/20 bg-muted/20 p-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                    Draft Meals
                  </span>
                  <span className="text-lg font-black text-foreground">{prepStats.draftMeals}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-border/20 bg-muted/20 p-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                    Total Meals
                  </span>
                  <span className="text-lg font-black text-foreground">{currentMenu.meals.length}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-2xl border border-border/20 bg-muted/20 p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Quick Note</p>
                  <p className="mt-2 text-sm font-medium text-muted-foreground/80">
                    {isCounts
                      ? 'Use this page during service to compare served meals with today’s plan.'
                      : 'Use this page before service to review what needs to be prepared from the admin schedule.'}
                  </p>
                </div>
                <Button variant="outline" className="h-11 w-full rounded-xl border-border/40 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-muted/50">
                  Open Kitchen Plan
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
