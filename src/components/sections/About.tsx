'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Lightbulb, Shield, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate text content
      gsap.from(textContentRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textContentRef.current,
          start: 'top 80%',
        }
      });
      
      // Animate cards
      gsap.from(cardsRef.current?.children || [], {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
        }
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  const coreValues = [
    { icon: <Target className="w-6 h-6 text-theme-gold" />, title: 'Mission', desc: 'To accelerate business growth through cutting-edge technology and automation.' },
    { icon: <Lightbulb className="w-6 h-6 text-purple-400" />, title: 'Vision', desc: 'Becoming the global standard for enterprise digital transformation and innovation.' },
    { icon: <Shield className="w-6 h-6 text-emerald-400" />, title: 'Trust', desc: 'Building long-term partnerships based on transparency, security, and reliability.' },
    { icon: <Zap className="w-6 h-6 text-amber-400" />, title: 'Execution', desc: 'Delivering scalable, high-performance solutions with speed and precision.' },
  ];

  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden bg-background" ref={sectionRef}>
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Story & Content */}
          <div ref={textContentRef} className="max-w-2xl">
            <h4 className="text-theme-gold font-bold tracking-[0.2em] uppercase text-xs mb-4">About Blueboxx</h4>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-zinc-900 mb-6 leading-tight">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-blue via-theme-gold to-yellow-500">Premium Partner</span> for Digital Transformation.
            </h2>
            <p className="text-zinc-600 text-lg leading-relaxed mb-6">
              Blueboxx isn't just a development agency—we are your execution partner. Since our inception, we have been obsessed with building scalable software architectures, intelligent AI automations, and enterprise-grade systems that drive real business results.
            </p>
            <p className="text-zinc-600 text-lg leading-relaxed mb-8">
              We bridge the gap between complex technology and business growth, empowering startups, SMEs, and large enterprises to outpace their competition in a digital-first world.
            </p>
            <div className="flex gap-6">
              <div className="p-5 rounded-2xl bg-white border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-transform hover:-translate-y-1">
                <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-theme-blue to-theme-gold mb-1">10+</div>
                <div className="text-xs text-zinc-500 font-bold tracking-wider uppercase">Years Experience</div>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-transform hover:-translate-y-1">
                <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-theme-blue to-theme-gold mb-1">100%</div>
                <div className="text-xs text-zinc-500 font-bold tracking-wider uppercase">Client Commitment</div>
              </div>
            </div>
          </div>
          
          {/* Core Values & Decorative Elements */}
          <div className="relative">
            {/* Decorative Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-theme-gold/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-theme-blue/5 rounded-full blur-[80px] -z-10 pointer-events-none" />
            
            <div ref={cardsRef} className="grid sm:grid-cols-2 gap-6 lg:gap-8 relative z-10">
              {coreValues.map((value, i) => (
                <div 
                  key={i} 
                  className={`group p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-zinc-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 ${
                    i % 2 === 1 ? 'sm:mt-12' : ''
                  }`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-theme-gold/10 group-hover:border-theme-gold/20 transition-all duration-500">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-3">{value.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
