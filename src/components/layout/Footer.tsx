import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-white border-t border-black/10 pt-20 pb-10 mt-auto">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div>
            <Link href="#home" className="flex items-center gap-2 mb-6">
              <Image src="/logoblue.png" alt="Blueboxx Logo" width={180} height={50} className="h-12 w-auto object-contain" />
            </Link>
            <p className="text-zinc-600 mb-6">
              Enterprise-level technology and business growth solutions for startups, SMEs, and enterprises worldwide.
            </p>
            <div className="flex gap-4">
              {/* Social links */}
              <a href="https://www.instagram.com/blueboxxda_/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-zinc-900 hover:bg-theme-gold transition-colors">
                IG
              </a>
              <a href="https://www.facebook.com/profile.php?id=61563770886246" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-zinc-900 hover:bg-theme-gold transition-colors">
                FB
              </a>
              <a href="https://www.linkedin.com/company/34074131/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-zinc-900 hover:bg-theme-gold transition-colors">
                in
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-zinc-900 mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="#about" className="text-zinc-600 hover:text-theme-gold transition-colors">About Us</Link></li>
              <li><Link href="#process" className="text-zinc-600 hover:text-theme-gold transition-colors">Our Process</Link></li>
              <li><Link href="#portfolio" className="text-zinc-600 hover:text-theme-gold transition-colors">Portfolio</Link></li>
              <li><Link href="#testimonials" className="text-zinc-600 hover:text-theme-gold transition-colors">Testimonials</Link></li>
              <li><Link href="#faq" className="text-zinc-600 hover:text-theme-gold transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-zinc-900 mb-6">Services</h4>
            <ul className="space-y-4">
              <li><Link href="#services" className="text-zinc-600 hover:text-theme-gold transition-colors">Software Development</Link></li>
              <li><Link href="#services" className="text-zinc-600 hover:text-theme-gold transition-colors">AI Automation</Link></li>
              <li><Link href="#services" className="text-zinc-600 hover:text-theme-gold transition-colors">CRM & ERP Solutions</Link></li>
              <li><Link href="#services" className="text-zinc-600 hover:text-theme-gold transition-colors">Digital Transformation</Link></li>
              <li><Link href="#services" className="text-zinc-600 hover:text-theme-gold transition-colors">Performance Marketing</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-zinc-900 mb-6">Contact Us</h4>
            <ul className="space-y-4 text-zinc-600">
              <li className="flex items-start gap-3">
                <span className="mt-1">📍</span>
                <span>SF 02, INDIA BULLS MEGA MALL,<br />Dinesh Mill Rd, Akota, Vadodara, Gujarat 390022</span>
              </li>
              <li className="flex items-center gap-3">
                <span>📧</span>
                <a href="mailto:info.blueboxx@gmail.com" className="hover:text-theme-gold transition-colors">info.blueboxx@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <span>📞</span>
                <a href="tel:+919023512853" className="hover:text-theme-gold transition-colors">+91 90235 12853</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">
            &copy; {new Date().getFullYear()} Blueboxx Business Solutions. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-zinc-500">
            <Link href="/privacy-policy" className="hover:text-zinc-900 transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-zinc-900 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
