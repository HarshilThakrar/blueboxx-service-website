'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Code, Cpu, LineChart } from 'lucide-react';
import { HeroScene } from '@/components/3d/HeroScene';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.5 }); // Wait for PageLoader to finish

      tl.from(badgesRef.current?.children || [], {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      })
      .from(headlineRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.4')
      .from(subheadRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.6')
      .from(ctaRef.current?.children || [], {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      }, '-=0.6');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden" ref={containerRef}>
      {/* 3D Background */}
      <HeroScene />
      
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/10 via-background/50 to-background pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-theme-gold/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
        {/* Floating Badges */}
        <div ref={badgesRef} className="flex flex-wrap justify-center gap-3 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 border border-black/10 backdrop-blur-md text-sm font-medium text-zinc-700">
            <Cpu size={16} className="text-theme-gold" />
            <span>AI Automation</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 border border-black/10 backdrop-blur-md text-sm font-medium text-zinc-700">
            <Code size={16} className="text-purple-400" />
            <span>Enterprise Software</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 border border-black/10 backdrop-blur-md text-sm font-medium text-zinc-700">
            <LineChart size={16} className="text-emerald-400" />
            <span>Business Growth</span>
          </div>
        </div>

        {/* Headlines */}
        <h1 ref={headlineRef} className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight text-zinc-900 mb-6 leading-[1.1] max-w-5xl">
          We Build <span className="text-transparent bg-clip-text bg-primary-gradient">Digital Solutions</span> That Scale Your Business
        </h1>
        
        <p ref={subheadRef} className="text-lg md:text-xl text-zinc-600 max-w-2xl mb-10 leading-relaxed">
          Blueboxx is your premium technology partner. We specialize in software development, AI automation, and digital transformation for ambitious companies.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a 
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, '#contact')} 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-zinc-900 text-zinc-900 font-semibold hover:bg-theme-gold hover:text-zinc-900 transition-all duration-300 group"
          >
            Start Your Project
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#services"
            onClick={(e) => handleSmoothScroll(e, '#services')}
            className="w-full sm:w-auto flex items-center justify-center px-8 py-4 rounded-full bg-black/5 border border-black/10 text-zinc-900 font-semibold hover:bg-black/10 transition-all duration-300"
          >
            Explore Services
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 z-10">
        <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-zinc-800 overflow-hidden">
          <div className="w-full h-full bg-theme-gold origin-top animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
