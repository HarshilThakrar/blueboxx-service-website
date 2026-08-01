'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, Bot, Database, Smartphone, Briefcase, Users, Cloud, Megaphone, Target, 
  Globe, Rocket, UserPlus, Gamepad2, Laptop, TrendingUp, Search, Settings, LineChart, Building2, Lightbulb, Maximize, PiggyBank, Compass
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { name: 'All Industries', icon: <Globe size={32} /> },
  { name: 'IT & Software Development', icon: <Code2 size={32} /> },
  { name: 'AI Automation & Smart Systems', icon: <Bot size={32} /> },
  { name: 'CRM & ERP Solutions', icon: <Database size={32} /> },
  { name: 'Digital & Performance Marketing', icon: <Megaphone size={32} /> },
  { name: 'Project Outsourcing', icon: <Cloud size={32} /> },
  { name: 'Virtual & Trained Workforce', icon: <Users size={32} /> },
  { name: 'SMEs & Startups', icon: <Rocket size={32} /> },
  { name: 'Marketing & IT Agencies', icon: <Briefcase size={32} /> },
  { name: 'HR & Recruitment Firms', icon: <UserPlus size={32} /> },
  { name: 'Web & Mobile App Development', icon: <Smartphone size={32} /> },
  { name: 'Game Development Services', icon: <Gamepad2 size={32} /> },
  { name: 'IT Project Outsourcing', icon: <Laptop size={32} /> },
  { name: 'Lead Generation Company', icon: <Target size={32} /> },
  { name: 'Growth Marketing Services', icon: <TrendingUp size={32} /> },
  { name: 'Online Marketing for Businesses', icon: <Search size={32} /> },
  { name: 'Marketing Automation Services', icon: <Settings size={32} /> },
  { name: 'Business Growth Services', icon: <LineChart size={32} /> },
  { name: 'SME Business Solutions', icon: <Building2 size={32} /> },
  { name: 'Startup Support Services', icon: <Lightbulb size={32} /> },
  { name: 'Scale Business Operations', icon: <Maximize size={32} /> },
  { name: 'Cost-Effective Business Services', icon: <PiggyBank size={32} /> },
  { name: 'Business Consulting & Execution', icon: <Compass size={32} /> },
];

export function Technology() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the two flex containers infinitely
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current.children, {
          xPercent: -100,
          repeat: -1,
          duration: 80,
          ease: 'none',
        });
      }
      
      gsap.fromTo(sectionRef.current, 
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="technology" className="py-20 bg-zinc-950 border-y border-white/5 overflow-hidden relative flex flex-col items-center" ref={sectionRef}>
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

      <h4 className="text-theme-gold font-bold tracking-[0.2em] uppercase text-xs mb-16 text-center relative z-20">Comprehensive Business Solutions</h4>
      
      <div className="flex whitespace-nowrap overflow-hidden w-full relative z-0">
        <div ref={marqueeRef} className="flex min-w-max">
          {/* First Set */}
          <div className="flex gap-16 px-8 items-center min-w-max">
            {services.map((service, i) => (
              <div key={`set1-${i}`} className="group flex flex-col items-center justify-center gap-4 cursor-default">
                <div className="text-zinc-600 group-hover:text-theme-gold group-hover:scale-110 transition-all duration-300">
                  {service.icon}
                </div>
                <span className="text-xl font-heading font-bold text-zinc-600 group-hover:text-white transition-colors duration-300">
                  {service.name}
                </span>
              </div>
            ))}
          </div>
          {/* Second Set (Clone for infinite scroll) */}
          <div className="flex gap-16 px-8 items-center min-w-max">
            {services.map((service, i) => (
              <div key={`set2-${i}`} className="group flex flex-col items-center justify-center gap-4 cursor-default">
                <div className="text-zinc-600 group-hover:text-theme-gold group-hover:scale-110 transition-all duration-300">
                  {service.icon}
                </div>
                <span className="text-xl font-heading font-bold text-zinc-600 group-hover:text-white transition-colors duration-300">
                  {service.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
