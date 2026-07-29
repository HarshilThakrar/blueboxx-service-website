'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

function Counter({ value, label, suffix = '+' }: { value: number, label: string, suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const rounded = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-8 rounded-3xl bg-black/[0.02] border border-black/5 relative overflow-hidden group hover:bg-black/[0.04] transition-colors duration-500">
      <div className="absolute top-0 right-0 w-32 h-32 bg-theme-gold/10 blur-[50px] rounded-full group-hover:bg-theme-gold/10 transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full group-hover:bg-purple-500/20 transition-colors duration-500" />
      
      <div className="relative z-10 flex items-baseline gap-1 mb-2">
        <motion.span className="text-5xl md:text-6xl font-heading font-bold text-zinc-900 tracking-tight">
          {rounded}
        </motion.span>
        <span className="text-4xl font-heading font-bold text-theme-gold">{suffix}</span>
      </div>
      <span className="relative z-10 text-zinc-600 font-medium tracking-wide uppercase text-sm text-center">
        {label}
      </span>
    </div>
  );
}

export function Statistics() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        }
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-12 border-y border-black/10 bg-background/50 relative" ref={sectionRef}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
          <Counter value={150} label="Projects Delivered" />
          <Counter value={40} label="Satisfied Clients" />
          <Counter value={15} label="Industries Served" />
          <Counter value={10} label="Years Experience" />
        </div>
      </div>
    </section>
  );
}
