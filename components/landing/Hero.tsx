'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Home, Zap } from 'lucide-react';
import { TypingHeadline } from './Typography';
import { DriftingElement } from './DriftingElement';

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  
  // Wait until next animation frame to ensure DOM is settled
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const id = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);
  
  // Always call useScroll, but give it an empty object until ref is ready
  const { scrollYProgress: heroScroll } = useScroll(
    mounted && heroRef.current
      ? {
          target: heroRef,
          offset: ["start start", "end start"]
        }
      : ({} as any)
  );

  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 0.6], [1, 0.85]);
  const heroTextY = useTransform(heroScroll, [0, 0.6], [0, -100]);

  return (
    <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div 
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="/hero-bg.jpg" 
          alt="Modern Dormitory"
          className="w-full h-full object-cover blur-[3px]"
        />
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-[2px]" />
      </motion.div>

      <DriftingElement className="absolute top-1/4 left-[10%] z-10 hidden lg:block">
         <div className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/20">
            <Home className="w-8 h-8" />
         </div>
      </DriftingElement>
      
      <DriftingElement className="absolute bottom-1/4 right-[10%] z-10 hidden lg:block" delay={2}>
         <div className="w-20 h-20 rounded-[2rem] bg-primary/10 backdrop-blur-xl border border-primary/20 flex items-center justify-center text-primary/30">
            <Zap className="w-10 h-10" />
         </div>
      </DriftingElement>

      <motion.div 
        style={{ opacity: heroOpacity, y: heroTextY, scale: heroScale }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        <div className="space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Dormify Service <br />
            <span className="text-primary italic">
              <TypingHeadline text="Management." />
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto font-medium text-balance">
            A unified operating system for modern housing, dining, laundry, and maintenance services. Engineered for excellence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center pt-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/dashboard/normal">
                <Button size="lg" className="h-16 px-10 rounded-full bg-primary text-primary-foreground text-base font-bold shadow-2xl shadow-primary/40">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/ecosystem">
                <Button size="lg" variant="outline" className="h-16 px-10 rounded-full border-white/20 text-white bg-white/5 backdrop-blur-md hover:bg-white/10 text-base font-bold transition-all">
                  View Demo!
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
         <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white/40 rounded-full" />
         </div>
      </div>
    </section>
  );
};
