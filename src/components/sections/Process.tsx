'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const processes = [
  { step: '01', title: 'Discovery', desc: 'Understanding your business goals, requirements, and challenges.' },
  { step: '02', title: 'Planning', desc: 'Creating a robust architecture and strategic roadmap for development.' },
  { step: '03', title: 'Design', desc: 'Crafting intuitive and premium user interfaces and experiences.' },
  { step: '04', title: 'Development', desc: 'Writing clean, scalable, and efficient code with agile methodologies.' },
  { step: '05', title: 'Testing', desc: 'Rigorous QA testing to ensure bug-free and high-performance delivery.' },
  { step: '06', title: 'Launch', desc: 'Deploying the product to production and managing a smooth rollout.' },
  { step: '07', title: 'Support', desc: 'Providing ongoing maintenance, monitoring, and future scaling.' },
];

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Clear refs on re-render to avoid detached DOM nodes in React 18 / HMR
  itemsRef.current = [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate line drawing via mask shrinking
      gsap.fromTo(
        timelineLineRef.current,
        { scaleY: 1 },
        {
          scaleY: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            end: 'bottom 80%',
            scrub: true,
          }
        }
      );

      // Animate items
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        const direction = index % 2 === 0 ? -50 : 50;
        
        gsap.fromTo(item, 
          { x: direction, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="py-24 lg:py-32 bg-zinc-50 relative overflow-hidden" ref={sectionRef}>
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-theme-blue/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-theme-gold/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h4 className="text-theme-gold font-bold tracking-[0.2em] uppercase text-xs mb-4">Our Process</h4>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-zinc-900 mb-6">
            How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-blue to-theme-gold">Execute</span>
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-theme-blue to-theme-gold origin-top md:-translate-x-1/2 rounded-full overflow-hidden">
            {/* The mask that shrinks down to reveal the gradient */}
            <div ref={timelineLineRef} className="absolute inset-0 w-full h-full bg-zinc-200 origin-bottom" />
          </div>

          {/* Timeline Items */}
          <div className="flex flex-col gap-12 lg:gap-8">
            {processes.map((process, i) => (
              <div 
                key={i} 
                ref={el => { itemsRef.current[i] = el; }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Mobile line connecting node */}
                <div className="absolute left-[30px] top-8 w-8 h-[2px] bg-zinc-200 md:hidden" />
                
                {/* Node */}
                <div className="absolute left-0 md:left-1/2 w-16 h-16 rounded-full bg-white border-[3px] border-theme-gold flex items-center justify-center font-extrabold text-theme-blue text-xl z-10 shadow-[0_4px_20px_rgb(0,0,0,0.05)] md:-translate-x-1/2">
                  {process.step}
                </div>

                {/* Content */}
                <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${i % 2 === 0 ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                  <div className="group p-8 rounded-3xl bg-white border border-zinc-100 shadow-[0_4px_15px_rgb(0,0,0,0.02)] hover:shadow-[0_15px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
                    <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-theme-blue transition-colors duration-300">{process.title}</h3>
                    <p className="text-zinc-500 leading-relaxed">{process.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
