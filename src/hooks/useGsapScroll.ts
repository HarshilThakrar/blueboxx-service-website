import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useGsapScroll(animation: 'fadeUp' | 'fadeLeft' | 'scaleReveal' | 'clipPath' = 'fadeUp') {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    let tween: gsap.core.Tween;

    switch (animation) {
      case 'fadeUp':
        gsap.set(el, { y: 100, opacity: 0 });
        tween = gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        });
        break;
      case 'fadeLeft':
        gsap.set(el, { x: 100, opacity: 0 });
        tween = gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        });
        break;
      case 'scaleReveal':
        gsap.set(el, { scale: 0.8, opacity: 0 });
        tween = gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
        });
        break;
      case 'clipPath':
        gsap.set(el, { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)' });
        tween = gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 1.5,
          ease: 'power4.inOut',
        });
        break;
    }

    return () => {
      if (tween) tween.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [animation]);

  return elementRef;
}
