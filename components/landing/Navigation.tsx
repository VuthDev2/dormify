'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Building2, Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useState } from 'react';

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress: pageScroll } = useScroll();

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX: pageScroll }}
      />

      <nav className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 h-16 grid grid-cols-3 items-center">
          <div className="flex justify-start">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground shadow-sm group-hover:scale-105 transition-transform">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg tracking-tight">Dormify</span>
            </Link>
          </div>
          
          <div className="hidden md:flex justify-center items-center gap-8 text-[12px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
            <Link href="/ecosystem" className="hover:text-primary transition-colors">Ecosystem</Link>
            <Link href="/institutional" className="hover:text-primary transition-colors">Institutional</Link>
            <Link href="/resident" className="hover:text-primary transition-colors">Resident</Link>
            <Link href="/#pricing" className="hover:text-primary transition-colors">Pricing</Link>
          </div>

          <div className="flex items-center justify-end gap-4">
            <ThemeToggle />
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-primary hidden sm:block">Log in</Link>
            <Link href="/dashboard/normal">
              <Button size="sm" className="rounded-full px-5 font-semibold">
                Get Started
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background pt-44 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-md font-sans font-bold text-center">
              <Link href="/ecosystem" onClick={() => setIsMobileMenuOpen(false)}>Ecosystem</Link>
              <Link href="/institutional" onClick={() => setIsMobileMenuOpen(false)}>Institutional</Link>
              <Link href="/resident" onClick={() => setIsMobileMenuOpen(false)}>Resident</Link>
              <Link href="/#pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
              <Link href="/dashboard/normal" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full rounded-full h-12">Get Started</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
