'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Industries', href: '#industries' },
  { name: 'Process', href: '#process' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'FAQ', href: '#faq' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = 'home';

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.scrollY >= sectionTop - 100) {
          current = section.getAttribute('id') || 'home';
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (pathname !== '/') {
      router.push(`/${href}`);
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/70 backdrop-blur-md border-b border-black/10">
      <div className="container mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="#home" onClick={(e) => handleSmoothScroll(e, '#home')} className="flex items-center gap-2">
          <Image src="/logoblue.png" alt="Blueboxx Logo" width={180} height={50} className="h-12 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={`text-sm font-medium transition-colors hover:text-zinc-900 relative group ${activeSection === link.href.substring(1) ? 'text-zinc-900' : 'text-zinc-600'
                  }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-theme-gold transition-all duration-300 ${activeSection === link.href.substring(1) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
              </a>
            ))}
          </div>

          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, '#contact')}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-theme-blue to-theme-gold text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-sm"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-zinc-700 hover:text-zinc-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden fixed inset-0 top-20 bg-background/95 backdrop-blur-xl border-t border-black/10 transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}>
        <div className="flex flex-col items-center justify-center h-full gap-6 pb-20">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className={`text-xl font-medium transition-colors ${activeSection === link.href.substring(1) ? 'text-theme-gold' : 'text-zinc-700'
                }`}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, '#contact')}
            className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-theme-blue to-theme-gold text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-sm"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </nav>
  );
}
