import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { Menu01Icon, Cancel01Icon, SolarPanel02Icon } from 'hugeicons-react';
import { ease } from '../utils/animations';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, []);

  const links = ['How It Works', 'Benefits', 'Earnings', 'Testimonials'];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-slate-100 py-4'
          : 'bg-transparent py-6'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        <div ref={logoRef} className={`flex items-center gap-2.5 transition-transform duration-500 ${scrolled ? 'scale-[0.96] origin-left' : 'scale-100 origin-left'}`}>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-500 ${scrolled ? 'bg-slate-950 text-white' : 'bg-white text-slate-950'}`}>
            <SolarPanel02Icon className="w-4 h-4" />
          </div>
          <span className={`font-display font-bold text-lg tracking-tight transition-colors duration-500 ${scrolled ? 'text-slate-950' : 'text-white'}`}>
            rent<span className={scrolled ? 'text-slate-500' : 'text-white/60'}>a</span>roof
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2">
          {links.map((link, i) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              className={`relative px-4 py-2 text-[13px] font-medium group transition-colors duration-300 ${
                scrolled ? 'text-slate-500 hover:text-slate-950' : 'text-white/80 hover:text-white'
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.4, duration: 0.5, ease }}
            >
              {link}
            </motion.a>
          ))}
          <motion.a
            href="#sign-up"
            className={`ml-4 px-6 py-2.5 font-semibold text-[13px] rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.97] ${
              scrolled
                ? 'bg-slate-950 text-white hover:bg-slate-900 hover:shadow-lg hover:shadow-slate-900/20'
                : 'bg-white text-slate-950 hover:bg-slate-50 border border-transparent shadow-[0_0_20px_rgba(255,255,255,0.1)]'
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5, ease }}
          >
            Get Started
          </motion.a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 active:scale-95 ${
            scrolled ? 'hover:bg-slate-100 text-slate-950' : 'hover:bg-white/10 text-white'
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <Cancel01Icon className="w-5 h-5" /> : <Menu01Icon className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden absolute top-full left-0 right-0 shadow-2xl"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-slate-600 hover:text-slate-950 transition-colors py-3 font-medium text-[15px] border-b border-slate-50"
                  onClick={() => setMobileOpen(false)}
                >
                  {link}
                </a>
              ))}
              <a
                href="#sign-up"
                className="mt-6 px-5 py-3.5 bg-slate-950 text-white font-semibold text-center rounded-xl text-sm"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
