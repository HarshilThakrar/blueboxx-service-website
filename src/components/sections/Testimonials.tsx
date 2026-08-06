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
    company: 'Jash Packaging',
    content: "Blueboxx delivered a modern business website that significantly improved our online presence. Their team maintained excellent communication and delivered the project before the deadline.",
    rating: 5,
    logo: '/logo/Jashpackaging.jpeg'
  },
  {
    id: 2,
    company: 'Damyaa Foods',
    content: "A highly professional team with a deep understanding of market trends. The web development services provided by Blueboxx gave Damyaa Foods the premium digital footprint we needed.",
    rating: 5,
    logo: '/logo/Damyaa.png'
  },
  {
    id: 3,
    company: 'Flammer Technologies Pvt. Ltd.',
    content: "The development quality, UI/UX, and technical execution exceeded our expectations. Blueboxx has become our trusted technology partner for all our scaling needs.",
    rating: 5,
    logo: '/logo/flammer technologies pvt ltd.png'
  },
  {
    id: 4,
    company: 'APS Associates',
    content: "Their strategic approach to digital solutions is commendable. The customized web application they developed has streamlined our operations and improved efficiency.",
    rating: 5,
    logo: '/logo/aps-associates.png'
  },
  {
    id: 5,
    company: 'HS Structure',
    content: "Working with Blueboxx was a seamless experience. They took our vision and turned it into a robust, high-performance web presence that perfectly represents our brand.",
    rating: 5,
    logo: '/logo/HS Structure.png'
  },
  {
    id: 6,
    company: 'Asha Tours & Travels',
    content: "An incredible team to work with. The new booking system and website overhaul completely changed how we engage with our customers and handle daily operations.",
    rating: 5,
    logo: '/logo/Asha_tours&travels.jpeg'
  },
  {
    id: 7,
    company: 'Green Clean Solar',
    content: "Blueboxx helped us create a clean, sustainable digital footprint. Their responsive support and high-quality development make them a truly top-tier tech agency.",
    rating: 5,
    logo: '/logo/green clean solar.jpeg'
  },
  {
    id: 8,
    company: 'Indo German',
    content: "Exceptional design and functionality! The new platform built by Blueboxx helped us increase our brand engagement and customer acquisition rates significantly.",
    rating: 5,
    logo: '/logo/indo german.png'
  }
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

        <div className="max-w-5xl mx-auto relative px-4 sm:px-12">
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
            }}
            className="rounded-3xl shadow-[0_10px_40px_rgb(0,0,0,0.03)]"
          >
            {testimonials.map((testimonial) => {
              const isWhiteLogo = testimonial.company === 'HS Structure' || testimonial.company === 'Indo German';
              
              return (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-zinc-50 border border-zinc-100 p-8 md:p-16 rounded-3xl relative h-full">
                  <Quote className="absolute top-8 right-8 text-zinc-900/5 w-24 h-24 rotate-12" />
                  
                  <div className="flex items-center gap-1 mb-8">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={20} className="fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  
                  <p className="text-xl md:text-3xl text-zinc-800 font-medium leading-relaxed mb-10">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center gap-6 relative z-10 pt-6 border-t border-zinc-200">
                    {testimonial.logo ? (
                      <div className="h-20 w-28 sm:h-24 sm:w-40 bg-white rounded-2xl flex items-center justify-center p-2 shadow-sm border border-zinc-100 flex-shrink-0">
                        <img 
                          src={testimonial.logo} 
                          alt={testimonial.company} 
                          className={`max-h-full max-w-full object-contain ${isWhiteLogo ? 'invert opacity-80' : 'mix-blend-multiply'}`} 
                        />
                      </div>
                    ) : (
                      <div className="h-16 w-16 sm:h-20 sm:w-20 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center p-[2px] flex-shrink-0 shadow-sm">
                        <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center font-bold text-amber-600 text-2xl sm:text-3xl">
                          {testimonial.company.charAt(0)}
                        </div>
                      </div>
                    )}
                    <div>
                      <h4 className="text-xl sm:text-2xl font-bold text-zinc-900">{testimonial.company}</h4>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )})}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
