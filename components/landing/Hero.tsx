'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, Home, Zap, Play, Pause, 
  RotateCcw, RotateCw, Volume2, VolumeX 
} from 'lucide-react';
import { TypingHeadline } from './Typography';
import { DriftingElement } from './DriftingElement';
import { useModal } from '@/contexts/modal-context';
import { ResidentsContent } from '@/components/modal-contents';

export const Hero = () => {
  const { openModal } = useModal();
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  
  const { scrollYProgress: heroScroll } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 0.6], [1, 0.85]);
  const heroTextY = useTransform(heroScroll, [0, 0.6], [0, -100]);
  
  useEffect(() => {
    if (isPlayingDemo && videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, [isPlayingDemo]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPaused(false);
      } else {
        videoRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  const skip = (e: React.MouseEvent, seconds: number) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const onTimeUpdate = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      videoRef.current.currentTime = percentage * videoRef.current.duration;
    }
  };

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Instant Video Demo Overlay (Pure Video, No Controls) */}
      <AnimatePresence>
        {isPlayingDemo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl"
            onClick={() => setIsPlayingDemo(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/5 bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <video 
                ref={videoRef}
                autoPlay 
                muted={isMuted}
                playsInline
                loop
                className="w-full h-full object-cover"
                onEnded={() => setIsPlayingDemo(false)}
              >
                <source src="/dorm-demo.mp4" type="video/mp4" />
              </video>
              
              {/* Minimal Close Hint on Hover */}
              <div 
                className="absolute top-8 right-8 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => setIsPlayingDemo(false)}
              >
                <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white">
                  <Zap className="w-6 h-6 rotate-45" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        style={{ scale: heroScale, opacity: isPlayingDemo ? 0 : heroOpacity }}
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
        style={{ opacity: isPlayingDemo ? 0 : heroOpacity, y: heroTextY, scale: heroScale }}
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
              <Button 
                size="lg" 
                className="h-16 px-10 rounded-full bg-primary text-primary-foreground text-base font-bold shadow-2xl shadow-primary/40"
                asChild
              >
                <Link href="/signup">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => setIsPlayingDemo(true)}
                size="lg" 
                variant="outline" 
                className="h-16 px-10 rounded-full border-white/20 text-white bg-white/5 backdrop-blur-md hover:bg-white/10 text-base font-bold transition-all shadow-xl"
              >
                <Play className="mr-2 w-5 h-5 fill-primary" /> View Demo
              </Button>
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
