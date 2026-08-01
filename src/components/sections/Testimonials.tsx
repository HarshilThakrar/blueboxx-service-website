'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'CTO, TechNova Inc.',
    content: "Blueboxx entirely revamped our enterprise architecture. Their team's understanding of scalable systems is unparalleled.",
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Founder, HealthSync',
    content: "The custom AI automation solution they built for us reduced our operational overhead by 40% in just three months.",
    rating: 5,
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'VP Engineering, Global Retail',
    content: "From discovery to launch, the Blueboxx team operated as an extension of our own. Truly a premium technology partner.",
    rating: 5,
  },
  {
    id: 4,
    name: 'David O\'Connor',
    role: 'CEO, FinStream',
    content: "Their expertise in Next.js and high-performance applications allowed us to scale gracefully during our Series B growth.",
    rating: 5,
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
        }
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-white relative overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div ref={titleRef} className="text-center max-w-2xl mx-auto mb-16 lg:mb-24">
          <h4 className="text-amber-500 font-semibold tracking-wider uppercase text-sm mb-4">Client Success</h4>
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-zinc-900 mb-6">
            Don't Just Take Our Word For It
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            className="rounded-3xl overflow-hidden"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white/[0.03] border border-black/5 p-8 md:p-16 rounded-3xl relative">
                  <Quote className="absolute top-8 right-8 text-zinc-900/5 w-24 h-24 rotate-12" />
                  
                  <div className="flex items-center gap-1 mb-8">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={20} className="fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  
                  <p className="text-xl md:text-3xl text-zinc-900 font-medium leading-relaxed mb-10">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary-gradient p-[2px]">
                      <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center font-bold text-zinc-900 text-xl">
                        {testimonial.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-zinc-900">{testimonial.name}</h4>
                      <span className="text-zinc-500 text-sm">{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
