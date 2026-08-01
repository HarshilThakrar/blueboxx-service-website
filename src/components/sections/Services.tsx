'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, Bot, Database, Smartphone, Briefcase, Users, Cloud, Megaphone, Target, ArrowRight,
  Globe, Rocket, UserPlus, Gamepad2, Laptop, TrendingUp, Search, Settings, LineChart, Building2, Lightbulb, Maximize, PiggyBank, Compass
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: <Globe size={20} />, title: 'All Industries' },
  { icon: <Code2 size={20} />, title: 'IT & Software Development' },
  { icon: <Bot size={20} />, title: 'AI Automation & Smart Systems' },
  { icon: <Database size={20} />, title: 'CRM & ERP Solutions' },
  { icon: <Megaphone size={20} />, title: 'Digital & Performance Marketing' },
  { icon: <Cloud size={20} />, title: 'Project Outsourcing' },
  { icon: <Users size={20} />, title: 'Virtual & Trained Workforce' },
  { icon: <Rocket size={20} />, title: 'SMEs & Startups' },
  { icon: <Briefcase size={20} />, title: 'Marketing & IT Agencies' },
  { icon: <UserPlus size={20} />, title: 'HR & Recruitment Firms' },
  { icon: <Smartphone size={20} />, title: 'Web & Mobile App Development' },
  { icon: <Gamepad2 size={20} />, title: 'Game Development Services' },
  { icon: <Laptop size={20} />, title: 'IT Project Outsourcing' },
  { icon: <Target size={20} />, title: 'Lead Generation Company' },
  { icon: <TrendingUp size={20} />, title: 'Growth Marketing Services' },
  { icon: <Search size={20} />, title: 'Online Marketing for Businesses' },
  { icon: <Settings size={20} />, title: 'Marketing Automation Services' },
  { icon: <LineChart size={20} />, title: 'Business Growth Services' },
  { icon: <Building2 size={20} />, title: 'SME Business Solutions' },
  { icon: <Lightbulb size={20} />, title: 'Startup Support Services' },
  { icon: <Maximize size={20} />, title: 'Scale Business Operations' },
  { icon: <PiggyBank size={20} />, title: 'Cost-Effective Business Services' },
  { icon: <Compass size={20} />, title: 'Business Consulting & Execution' },
];

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current?.children || [], 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          }
        }
      );

      gsap.fromTo(gridRef.current?.children || [], 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.03,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="py-16 lg:py-24 relative bg-zinc-50" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-theme-gold/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-theme-blue/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h4 className="text-theme-gold font-bold tracking-[0.2em] uppercase text-xs mb-4">Our Expertise</h4>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-zinc-900 mb-6">
            End-to-End Solutions for <br className="hidden sm:block lg:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-theme-blue to-theme-gold">Business Growth</span>
          </h2>
          <p className="text-zinc-600 text-lg">
            From intelligent AI systems to custom enterprise software, we provide the technological backbone your business needs to scale.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-6">
          {services.map((service, i) => (
            <div 
              key={i} 
              className="group relative p-6 rounded-2xl bg-white border border-zinc-100 shadow-[0_4px_15px_rgb(0,0,0,0.02)] hover:shadow-[0_15px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              {/* Hover gradient effect */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-theme-gold/10 to-theme-blue/5 blur-[30px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="w-12 h-12 rounded-xl bg-zinc-50 border border-zinc-100 text-theme-gold flex items-center justify-center mb-4 group-hover:bg-theme-gold/10 group-hover:border-theme-gold/20 group-hover:scale-110 transition-all duration-300">
                {service.icon}
              </div>
              
              <h3 className="text-base font-bold text-zinc-900 group-hover:text-theme-blue transition-colors duration-300 relative z-10 leading-snug">
                {service.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
