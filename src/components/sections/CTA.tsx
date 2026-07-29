'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on the background shapes
      gsap.to('.cta-shape-1', {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      gsap.to('.cta-shape-2', {
        y: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Reveal content
      gsap.from(contentRef.current?.children || [], {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden" ref={sectionRef}>
      {/* Background Shapes */}
      <div className="cta-shape-1 absolute top-0 right-[10%] w-64 h-64 bg-theme-gold/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="cta-shape-2 absolute bottom-0 left-[10%] w-80 h-80 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div
          className="relative bg-gradient-to-br from-white/[0.05] to-white/[0.01] border border-black/10 rounded-[3rem] p-10 md:p-20 text-center overflow-hidden"
        >
          {/* Inner animated gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#c9a227]/10 via-[#1b2a6b]/10 to-[#c9a227]/10 opacity-50" />

          <div ref={contentRef} className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-zinc-900 mb-6 leading-tight">
              Ready to Scale Your Business With Technology?
            </h2>
            <p className="text-xl text-zinc-700 mb-10">
              Let's build something extraordinary together. Schedule a discovery call with our technical architects today.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="#contact"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-zinc-900 text-white font-semibold hover:bg-theme-gold hover:text-zinc-900 transition-all duration-300 group"
              >
                Start Your Project
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="mailto:info.blueboxx@gmail.com"
                className="w-full sm:w-auto flex items-center justify-center px-8 py-4 rounded-full bg-transparent border border-black/20 text-zinc-900 font-semibold hover:bg-black/10 transition-all duration-300"
              >
                Email Us Directly
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
