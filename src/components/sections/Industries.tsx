'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Laptop, Bot, Rocket, Building2, Megaphone, Users, ShoppingCart, Factory, Landmark, Stethoscope, Home, Truck, Gamepad2, Briefcase, Scale, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  { icon: <Laptop size={28} />, name: 'IT & Software' },
  { icon: <Bot size={28} />, name: 'AI & Automation' },
  { icon: <Rocket size={28} />, name: 'Startups' },
  { icon: <Building2 size={28} />, name: 'SMEs' },
  { icon: <Megaphone size={28} />, name: 'Marketing Agencies' },
  { icon: <Users size={28} />, name: 'HR & Recruitment' },
  { icon: <ShoppingCart size={28} />, name: 'E-commerce & Retail' },
  { icon: <Factory size={28} />, name: 'Manufacturing' },
  { icon: <Landmark size={28} />, name: 'Finance & FinTech' },
  { icon: <Stethoscope size={28} />, name: 'Healthcare' },
  { icon: <Home size={28} />, name: 'Real Estate' },
  { icon: <Truck size={28} />, name: 'Logistics' },
  { icon: <Gamepad2 size={28} />, name: 'Gaming & Ent.' },
  { icon: <Briefcase size={28} />, name: 'Enterprise Solutions' },
  { icon: <Scale size={28} />, name: 'Professional Services' },
  { icon: <Globe size={28} />, name: 'Digital Businesses' },
];

export function Industries() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current?.children || [],
        { y: 30, opacity: 0 },
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
        { scale: 0.9, y: 20, opacity: 0 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="industries" className="py-24 relative overflow-hidden bg-background" ref={sectionRef}>
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div ref={titleRef} className="text-center max-w-2xl mx-auto mb-16">
          <h4 className="text-theme-gold font-bold tracking-[0.2em] uppercase text-xs mb-4">Industries We Serve</h4>
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-zinc-900 mb-6">
            Empowering Every Sector
          </h2>
          <p className="text-zinc-600 text-lg">
            We deliver tailor-made technology solutions across a diverse range of industries, driving innovation everywhere.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {industries.map((industry, i) => (
            <div
              key={i}
              className="group flex flex-col items-center justify-center p-8 rounded-2xl bg-white border border-zinc-100 shadow-[0_4px_15px_rgb(0,0,0,0.02)] hover:shadow-[0_15px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center relative overflow-hidden"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-theme-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="text-theme-gold/80 group-hover:text-theme-gold group-hover:scale-110 transition-all duration-300 mb-4 relative z-10">
                {industry.icon}
              </div>
              <span className="text-zinc-700 font-bold text-sm group-hover:text-theme-blue transition-colors relative z-10">
                {industry.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
