'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Code, TrendingUp, Cpu, Headset, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: <Cpu size={32} />, title: 'Latest Technologies', desc: 'We leverage modern tech stacks to build future-proof, scalable systems.' },
  { icon: <Clock size={32} />, title: 'Fast Delivery', desc: 'Agile methodologies ensure rapid development cycles and on-time launches.' },
  { icon: <TrendingUp size={32} />, title: 'Business-Focused', desc: 'Our solutions are designed not just to work, but to drive revenue and growth.' },
  { icon: <Code size={32} />, title: 'Scalable Architecture', desc: 'Built to handle millions of users seamlessly as your business expands.' },
  { icon: <Headset size={32} />, title: 'Long-Term Support', desc: 'Dedicated maintenance and SLA guarantees to keep your systems running 24/7.' },
  { icon: <ShieldCheck size={32} />, title: 'Experienced Team', desc: 'A vetted team of senior engineers and architects dedicated to your success.' },
];

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current?.children || [], 
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
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
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.1,
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
    <section className="py-24 relative bg-zinc-50 overflow-hidden" ref={sectionRef}>
      {/* Abstract Shapes */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-theme-gold/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-theme-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <h4 className="text-theme-gold font-bold tracking-[0.2em] uppercase text-xs mb-4">Why Blueboxx?</h4>
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-zinc-900 mb-6">
            The Advantage of Working With Us
          </h2>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-white border border-zinc-100 shadow-[0_4px_15px_rgb(0,0,0,0.02)] hover:shadow-[0_15px_30px_rgb(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-500 overflow-hidden relative">
              {/* Subtle hover gradient */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-theme-gold/10 to-theme-blue/5 blur-[30px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="w-16 h-16 rounded-2xl bg-zinc-50 border border-zinc-100 text-theme-gold flex items-center justify-center mb-6 group-hover:bg-theme-gold/10 group-hover:border-theme-gold/20 group-hover:scale-110 transition-all duration-300 relative z-10">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-theme-blue transition-colors duration-300 relative z-10">{feature.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed relative z-10">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
