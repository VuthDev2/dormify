'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github, 
  Send,
  ArrowRight,
  Globe,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FOOTER_LINKS } from './constants';

export function Footer() {
  return (
    <footer className="relative bg-background border-t border-border overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        {/* Newsletter Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center pb-20 border-b border-border/50">
          <div className="space-y-4">
            <h3 className="text-3xl font-bold tracking-tight">Stay ahead of the curve</h3>
            <p className="text-muted-foreground text-lg max-w-md">
              Get the latest insights on property management and campus innovation delivered to your inbox.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 group">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="h-14 rounded-2xl bg-muted/50 border-border group-focus-within:border-primary transition-all pr-12"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                <Send className="w-5 h-5" />
              </div>
            </div>
            <Button size="lg" className="h-14 px-8 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12 py-20">
          <div className="col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="font-black text-2xl tracking-tighter">Dormify</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs font-medium">
              Revolutionizing campus living through intelligent automation and human-centric design. The operating system for modern student housing.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Twitter, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Github, href: '#' }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 bg-muted/50 border border-border/50 rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.title} className="space-y-6">
              <h5 className="font-black text-[10px] uppercase tracking-[0.2em] text-foreground/50">
                {group.title}
              </h5>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href} 
                      className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center group/link"
                    >
                      {link.label}
                      <ArrowRight className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Bottom Bar */}
        <div className="pt-12 border-t border-border grid grid-cols-1 lg:grid-cols-3 items-center gap-8">
          {/* Status Indicator - Left on desktop */}
          <div className="flex justify-center lg:justify-start">
            <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full border border-border/50">              
            </div>
          </div>          
          <div className="text-center text-xs font-medium text-muted-foreground lg:whitespace-nowrap">
            &copy; {new Date().getFullYear()} Dormify Systems Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
