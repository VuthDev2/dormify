'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Building2, Utensils, Check, ArrowRight,
  Home, Waves, Wrench, Zap, CreditCard, Heart,
  MessageSquare, Globe, HelpCircle,
  CheckCircle2, Activity, TrendingUp, Shield, User,
  Key, Bell, Users
} from 'lucide-react';
import { motion, useScroll } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Navigation } from '@/components/landing/Navigation';
import { Hero } from '@/components/landing/Hero';
import { TypingHeadline, ScrollRevealText, DriftingElement } from '@/components/landing/animations';
import {
  STATS, SERVICES, INSTITUTIONAL_FEATURES, DINING_FEATURES,
  RESIDENT_FEATURES, PRICING_PLANS, FAQ_ITEMS, ANIMATION_VARIANTS
} from '@/components/landing/constants';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  const { scrollYProgress: pageScroll } = useScroll();

  const fadeInUp = ANIMATION_VARIANTS.fadeInUp;
  const staggerContainer = ANIMATION_VARIANTS.staggerContainer;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/10 selection:text-primary scroll-smooth">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX: pageScroll }}
      />

      <Navigation />

      <Hero />

      {/* Stats Section */}
      <section className="relative py-10 bg-muted/20 border-y border-border/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {STATS.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="text-center space-y-0.5"
              >
                <h4 className="text-xl md:text-2xl font-black tracking-tighter text-foreground">
                  {stat.value}
                </h4>
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Four Services Section */}
      <section className="relative py-32 px-6 overflow-hidden bg-background border-b border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20 space-y-6"
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground">
              Core Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
              Everything you need to manage modern dormitories in one unified platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
              >
                <Card className="h-full p-8 hover:shadow-xl transition-all duration-300 border-border hover:border-primary/50 group cursor-pointer bg-card/50 backdrop-blur">
                  <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center ${service.iconBg} group-hover:scale-110 transition-transform`}>
                    <service.icon className={`w-8 h-8 ${service.iconColor}`} />
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-sm font-black text-primary uppercase tracking-widest">{service.id}</p>
                    <h3 className="text-2xl font-bold tracking-tight text-foreground">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="institutional" className="py-32 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-12"
            >
              <ScrollRevealText className="space-y-6">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Portfolio Intelligence</span>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground leading-[0.95]">
                  Institutional <br />
                  <span className="text-muted-foreground/30">Operations.</span>
                </h2>
                <p className="text-lg text-muted-foreground font-medium leading-relaxed max-w-lg border-l-2 border-primary pl-6">
                  Dormify provides owners and investors with a high-fidelity operating system. Transform complex property data into actionable yield with our smart management suite.
                </p>
              </ScrollRevealText>

              <div className="grid gap-8">
                {INSTITUTIONAL_FEATURES.map((item, i) => (
                  <motion.div key={i} variants={fadeInUp} className="flex gap-6 group">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-black tracking-tight">{item.title}</h4>
                      <p className="text-sm text-muted-foreground font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={fadeInUp}>
                <Link href="/signup">
                  <Button size="lg" className="h-14 px-8 rounded-none bg-foreground text-background font-black hover:bg-foreground/90 transition-all uppercase text-[11px] tracking-widest">
                    Requests Portfolio Audits
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border shadow-2xl bg-muted/30 p-4">
                <div className="w-full h-full rounded-2xl overflow-hidden border border-border bg-background relative shadow-inner">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover grayscale brightness-50"
                  >
                    <source src="/dorm-demo.mp4" type="video/mp4" />
                  </video>

                  <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
                    <div className="flex justify-between items-start">
                      <div className="bg-background/90 backdrop-blur-md border border-border p-5 rounded-2xl shadow-xl min-w-[180px]">
                         <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Portfolio Occupancy</p>
                         <h5 className="text-3xl font-black tracking-tighter">98.2%</h5>
                         <div className="flex items-center gap-2 mt-2">
                            <div className="h-1 flex-1 bg-muted rounded-full overflow-hidden">
                               <div className="h-full bg-emerald-500 w-[98%]" />
                            </div>
                            <span className="text-[9px] font-black text-emerald-500">+1.2%</span>
                         </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                          <Activity className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-foreground text-background p-6 rounded-2xl shadow-2xl space-y-3">
                         <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Revenue (Q1)</p>
                         <p className="text-2xl font-black tracking-tighter">$1.42M</p>
                         <div className="text-[9px] font-bold uppercase py-1 px-2 bg-emerald-500 text-white w-fit rounded">On Target</div>
                      </div>
                      <div className="bg-background/90 backdrop-blur-md border border-border p-6 rounded-2xl shadow-xl space-y-3">
                         <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Active Tickets</p>
                         <p className="text-2xl font-black tracking-tighter text-amber-500">14</p>
                         <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">4 Critical</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-8 -right-8 bg-primary p-6 rounded-2xl shadow-2xl hidden xl:block">
                 <Shield className="text-white w-8 h-8" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <section className="relative py-32 flex flex-col items-center justify-center overflow-hidden bg-slate-950 border-y border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10 space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight text-white">
              One Platform. <br />
              <span className="text-primary italic">Absolute Control.</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium text-balance">
              Experience the future of dormitory management. A seamless blend of housing, dining, and operations in a single, powerful interface.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto max-w-5xl group"
          >
            <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] bg-slate-900">
              <img 
                src="/dashboard-overview.jpg" 
                alt="Dormify Institutional Dashboard Overview" 
                className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
            </div>
            
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 md:-top-10 md:-right-10 bg-primary p-4 md:p-6 rounded-2xl shadow-2xl z-20 hidden sm:block"
            >
               <Activity className="text-white w-6 h-6 md:w-8 md:h-8" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/ecosystem">
              <Button size="lg" className="rounded-full px-10 h-14 font-bold bg-white text-black hover:bg-slate-200 transition-all hover:scale-105">
                Explore the Ecosystem
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-32 bg-muted/20 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-card">
                <img 
                  src="/dining-hall.jpg" 
                  alt="Dining Hall"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -bottom-10 -right-6 bg-card p-6 rounded-2xl shadow-xl border border-border hidden sm:block min-w-[280px]"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Featured Dish</p>
                    <p className="font-bold">Harvest Grain Bowl</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-muted-foreground uppercase">Calories</span>
                    <span>520 kcal</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {['42g Prot', '58g Carb', '12g Fat'].map((stat, i) => (
                      <div key={i} className="bg-muted p-2 rounded-lg text-center text-[10px] font-bold">{stat}</div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-10"
            >
              <ScrollRevealText className="space-y-4">
                <Badge className="bg-orange-100 text-orange-600 border-none px-4 py-1 text-[10px] font-bold uppercase tracking-widest">Culinary Tech</Badge>
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight">Nutrition and dining, perfected.</h3>
                <p className="text-muted-foreground font-medium leading-relaxed">Beyond basic meal plans. A comprehensive culinary ecosystem that tracks nutrition and empowers choice.</p>
              </ScrollRevealText>

              <div className="grid gap-6">
                {DINING_FEATURES.map((item, i) => (
                  <motion.div key={i} variants={fadeInUp} className="flex gap-4 p-4 rounded-2xl hover:bg-card transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="resident" className="py-32 bg-muted/20 border-y border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="relative order-2 lg:order-1 flex justify-center"
              style={{ perspective: "1200px" }}
            >
              <motion.div 
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative w-[280px] h-[580px] bg-slate-900 rounded-[3rem] border-8 border-slate-900 shadow-2xl overflow-hidden ring-1 ring-white/10"
              >
                <div className="absolute inset-0 bg-background p-6 space-y-6">
                   <div className="flex justify-between items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                         <User className="w-4 h-4" />
                      </div>
                      <Bell className="w-4 h-4 text-muted-foreground" />
                   </div>
                   
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Welcome Back,</p>
                      <h5 className="text-xl font-black tracking-tight">Alex Thompson</h5>
                   </div>

                   <div className="bg-primary p-5 rounded-2xl text-white space-y-4 shadow-lg shadow-primary/20">
                      <div className="flex justify-between items-start">
                         <p className="text-[10px] font-black uppercase opacity-60">Digital Key</p>
                         <Shield className="w-4 h-4 opacity-60" />
                      </div>
                      <p className="text-sm font-bold">Room 402 - Bloomsbury</p>
                      <Button size="sm" className="w-full bg-white text-primary font-black text-[10px] uppercase tracking-widest h-10 rounded-xl">
                         Hold to Unlock
                      </Button>
                   </div>

                   <div className="grid grid-cols-2 gap-3">
                      <div className="bg-muted/50 p-4 rounded-2xl border border-border/50">
                         <Utensils className="w-4 h-4 text-orange-500 mb-2" />
                         <p className="text-[9px] font-black text-muted-foreground uppercase">Meals</p>
                         <p className="text-sm font-black">14 Left</p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-2xl border border-border/50">
                         <Waves className="w-4 h-4 text-cyan-500 mb-2" />
                         <p className="text-[9px] font-black text-muted-foreground uppercase">Laundry</p>
                         <p className="text-sm font-black">2 Ready</p>
                      </div>
                   </div>

                   <div className="space-y-3">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Campus Feed</p>
                      <div className="h-24 rounded-2xl border border-border p-3 flex gap-3 bg-muted/20">
                         <div className="w-10 h-10 rounded-lg bg-muted shrink-0" />
                         <div className="space-y-2 py-1 flex-1">
                            <div className="h-2 w-full bg-muted rounded-full" />
                            <div className="h-2 w-[70%] bg-muted/60 rounded-full" />
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 blur-[100px] -z-10" />
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-12 order-1 lg:order-2"
            >
              <ScrollRevealText className="space-y-6">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Resident Ecosystem</span>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground leading-[0.95]">
                  Mobile <br />
                  <span className="text-muted-foreground/30">Empowerment.</span>
                </h2>
                <p className="text-lg text-muted-foreground font-medium leading-relaxed max-w-lg border-l-2 border-primary pl-6">
                  Provide your residents with a native mobile experience that simplifies campus life. Everything from building access to meal hall tracking is one tap away.
                </p>
              </ScrollRevealText>

              <div className="grid gap-8">
                {RESIDENT_FEATURES.map((item, i) => (
                  <motion.div key={i} variants={fadeInUp} className="flex gap-6 group">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-black tracking-tight">{item.title}</h4>
                      <p className="text-sm text-muted-foreground font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <section id="pricing" className="py-32 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <ScrollRevealText className="text-center mb-24">
            <Badge variant="outline" className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] border-primary/20 text-primary mb-6">
              Investment Tiers
            </Badge>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
              Scaled <br />
              <span className="text-muted-foreground/30 italic">Perfectly.</span>
            </h3>
            <p className="text-lg text-muted-foreground font-medium max-w-xl mx-auto">
              Institutional-grade management tools tailored to your portfolio size. Choose the engine that drives your growth.
            </p>
          </ScrollRevealText>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {PRICING_PLANS.map((plan, i) => (
              <motion.div key={i} variants={fadeInUp} className="relative group">
                <Card className={`h-full p-8 rounded-[2.5rem] border transition-all duration-500 flex flex-col ${
                  plan.highlighted 
                    ? 'border-primary bg-primary/5 shadow-2xl ring-1 ring-primary/10' 
                    : 'border-border bg-card hover:border-primary/20 hover:shadow-xl'
                }`}>
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                      Recommended
                    </div>
                  )}
                  
                  <div className="mb-8">
                    <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-3">{plan.name}</h4>
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="text-5xl font-bold tracking-tighter">${plan.price}</span>
                      <span className="text-muted-foreground text-[9px] font-black uppercase tracking-widest">/mo</span>
                    </div>
                    <p className="text-xs text-muted-foreground font-medium leading-relaxed">{plan.desc}</p>
                  </div>

                  <ul className="space-y-4 mb-10 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-[13px] font-medium text-foreground/70 group-hover:text-foreground transition-colors">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${plan.highlighted ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                          <Check className="w-2.5 h-2.5" strokeWidth={3} />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link href="/signup" className="w-full">
                    <Button className={`w-full h-14 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${
                      plan.highlighted 
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:scale-[1.02]' 
                        : 'bg-foreground text-background hover:bg-foreground/90'
                    }`}>
                      {plan.cta}
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[160px] -z-10 rounded-full" />
      </section>

      <section className="py-32 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-3xl font-bold text-center mb-16"
          >
            Questions?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {FAQ_ITEMS.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-muted/30 border-none rounded-2xl px-6">
                  <AccordionTrigger className="font-bold py-6 hover:no-underline">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      <section className="py-40 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-slate-950 rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -ml-20 -mb-20" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-10">
              <div className="space-y-6">
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1]">
                  Ready to <br />
                  <span className="text-primary italic">Evolve?</span>
                </h2>
                <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed max-w-xl mx-auto">
                  Join the institutions scaling their property portfolios with the Dormify operating system. Excellence is standard.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/signup">
                    <Button size="lg" className="h-16 px-10 rounded-2xl bg-primary text-primary-foreground font-bold text-base shadow-xl shadow-primary/20 transition-all">
                      Get Started Now
                    </Button>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/signup">
                    <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl border-white/10 text-white bg-white/5 backdrop-blur-md hover:bg-white/10 font-bold text-base transition-all">
                      Contact Sales
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
