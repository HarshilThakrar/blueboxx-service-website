'use client';

import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { gsap } from 'gsap';
import Image from 'next/image';

export function PageLoader({ onComplete }: { onComplete?: () => void }) {
  const [isLoading, setIsLoading] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
        document.body.style.overflow = '';
        if (onComplete) onComplete();
      },
    });

    // Simulate loading progress with Anime.js v4
    if (progressRef.current) {
      animate(progressRef.current, {
        width: ['0%', '100%'],
        easing: 'easeInOutExpo',
        duration: 2000,
      });
    }

    // GSAP Sequence for revealing and hiding the loader
    tl.fromTo(
      textRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
      .to(textRef.current, { y: -40, opacity: 0, duration: 0.8, ease: 'power3.in', delay: 0.5 })
      .to(loaderRef.current, {
        yPercent: -100,
        duration: 1,
        ease: 'expo.inOut',
      });

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (!isLoading) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background text-foreground"
    >
      <div className="overflow-hidden mb-8 flex items-center justify-center">
        <div ref={textRef}>
          <Image src="/logoblue.png" alt="Blueboxx Logo" width={240} height={80} className="h-16 w-auto object-contain" priority />
        </div>
      </div>
      <div className="w-64 h-[2px] bg-black/10 overflow-hidden relative rounded-full">
        <div ref={progressRef} className="absolute top-0 left-0 h-full bg-primary" />
      </div>
    </div>
  );
}
