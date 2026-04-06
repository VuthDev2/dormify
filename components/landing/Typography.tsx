'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const TypingHeadline = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = text;
      const updatedText = isDeleting 
        ? fullText.substring(0, displayText.length - 1) 
        : fullText.substring(0, displayText.length + 1);

      setDisplayText(updatedText);

      if (!isDeleting && updatedText === fullText) {
        setTimeout(() => setIsDeleting(true), 2500);
        setTypingSpeed(150);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      } else if (isDeleting) {
        setTypingSpeed(75);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, typingSpeed, text, loopNum]);

  return (
    <div className="text-white inline-block min-h-[1.1em]">
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[4px] h-[0.9em] bg-primary ml-1 align-middle"
      />
    </div>
  );
};

export const ScrollRevealText = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [targetReady, setTargetReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setTargetReady(Boolean(ref.current));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const { scrollYProgress } = useScroll(
    targetReady
      ? {
          target: ref,
          offset: ["start end", "end center"]
        }
      : ({} as any)
  );

  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5, 0.8], [40, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 0.8], [0.95, 1, 1]);

  return (
    <motion.div
      ref={ref}
      style={targetReady ? { opacity, y, scale } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
};
