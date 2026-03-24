import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  Menu01Icon,
  Cancel01Icon,
  SolarPanel02Icon,
  ArrowRight01Icon,
  Home01Icon,
  Money01Icon,
  Shield01Icon,
  FlashIcon,
  StarIcon,
  TwitterIcon,
  Linkedin01Icon,
  InstagramIcon,
} from 'hugeicons-react';
import { Mail } from 'lucide-react';
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const links = [
    { label: 'How It Works', href: '#how-it-works', icon: <FlashIcon className="w-5 h-5" /> },
    { label: 'Benefits', href: '#benefits', icon: <Shield01Icon className="w-5 h-5" /> },
    { label: 'Earnings', href: '#earnings', icon: <Money01Icon className="w-5 h-5" /> },
    { label: 'Testimonials', href: '#testimonials', icon: <StarIcon className="w-5 h-5" /> },
  ];

  const slidePanel = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { type: 'spring', damping: 30, stiffness: 300 } },
    exit: { x: '100%', transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  };

  const staggerLinks = {
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
    exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
  };

  const linkItem = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-slate-100 py-3'
            : 'bg-transparent py-5'
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
          <div className="hidden md:flex items-center gap-1">
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className={`relative px-4 py-2 text-[13px] font-medium rounded-full transition-colors duration-300 ${
                  scrolled
                    ? 'text-slate-500 hover:text-slate-950 hover:bg-slate-50'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.4, duration: 0.5, ease }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#sign-up"
              className={`ml-3 px-5 py-2 font-semibold text-[13px] rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.97] ${
                scrolled
                  ? 'bg-slate-950 text-white hover:bg-slate-900 hover:shadow-lg hover:shadow-slate-900/20'
                  : 'bg-white text-slate-950 hover:bg-slate-50 shadow-[0_0_20px_rgba(255,255,255,0.1)]'
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
            className={`md:hidden relative z-[60] w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 active:scale-95 ${
              mobileOpen
                ? 'text-white hover:bg-white/10'
                : scrolled
                  ? 'hover:bg-slate-100 text-slate-950'
                  : 'hover:bg-white/10 text-white'
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Cancel01Icon className="w-5 h-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu01Icon className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Fullscreen Mobile Slide-in Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 z-[55] bg-slate-950/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in Panel */}
            <motion.div
              variants={slidePanel}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden fixed inset-y-0 right-0 z-[58] w-full bg-slate-950 flex flex-col"
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                    <SolarPanel02Icon className="w-4 h-4" />
                  </div>
                  <span className="font-display font-bold text-lg tracking-tight text-white">
                    rent<span className="text-white/40">a</span>roof
                  </span>
                </div>
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <Cancel01Icon className="w-5 h-5" />
                </button>
              </div>

              {/* Divider */}
              <div className="mx-6 border-t border-white/[0.06]" />

              {/* Navigation Links */}
              <motion.div
                variants={staggerLinks}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex-1 flex flex-col px-6 pt-6 overflow-y-auto"
              >
                <p className="text-[11px] font-semibold uppercase tracking-widest text-white/25 mb-4 px-1">
                  Navigate
                </p>

                {links.map((link) => (
                  <motion.a
                    key={link.label}
                    variants={linkItem}
                    href={link.href}
                    className="group flex items-center gap-4 py-4 border-b border-white/[0.06] last:border-0"
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center text-white/40 group-hover:bg-white/10 group-hover:text-white transition-all duration-300">
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <span className="text-white font-semibold text-[15px] group-hover:text-white/90 transition-colors">
                        {link.label}
                      </span>
                    </div>
                    <ArrowRight01Icon className="w-4 h-4 text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all duration-300" />
                  </motion.a>
                ))}

                {/* CTA */}
                <motion.a
                  variants={linkItem}
                  href="#sign-up"
                  className="mt-6 flex items-center justify-center gap-2.5 px-6 py-4 bg-white text-slate-950 font-semibold text-[15px] rounded-2xl hover:bg-slate-100 transition-colors active:scale-[0.98]"
                  onClick={() => setMobileOpen(false)}
                >
                  Register Your Roof
                  <ArrowRight01Icon className="w-4 h-4" />
                </motion.a>

                {/* Quick Info Cards */}
                <motion.div variants={linkItem} className="mt-8 grid grid-cols-2 gap-3">
                  <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-4">
                    <Home01Icon className="w-5 h-5 text-green-400 mb-2" />
                    <div className="font-display font-bold text-xl text-white">10K+</div>
                    <div className="text-[11px] text-white/30 font-medium mt-0.5">Roofs registered</div>
                  </div>
                  <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-4">
                    <Money01Icon className="w-5 h-5 text-green-400 mb-2" />
                    <div className="font-display font-bold text-xl text-white">GH₵340</div>
                    <div className="text-[11px] text-white/30 font-medium mt-0.5">Avg. monthly earnings</div>
                  </div>
                </motion.div>

                {/* Contact / Support */}
                <motion.div variants={linkItem} className="mt-6">
                  <a
                    href="#"
                    className="flex items-center gap-3 py-3 text-white/40 hover:text-white/70 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="text-sm font-medium">Need help? Contact support</span>
                  </a>
                </motion.div>
              </motion.div>

              {/* Bottom Section */}
              <div className="px-6 pb-8 pt-4 border-t border-white/[0.06]">
                {/* Social Links */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-white/20">Follow us</span>
                  <div className="flex gap-2">
                    {[
                      { icon: <TwitterIcon className="w-4 h-4" />, href: '#' },
                      { icon: <Linkedin01Icon className="w-4 h-4" />, href: '#' },
                      { icon: <InstagramIcon className="w-4 h-4" />, href: '#' },
                    ].map((s, i) => (
                      <a
                        key={i}
                        href={s.href}
                        className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all duration-300"
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Trust badges */}
                <div className="flex items-center gap-4 mt-4 flex-wrap">
                  {['Energy Commission Certified', 'Licensed Installer'].map((item) => (
                    <div key={item} className="flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-green-400" />
                      <span className="text-white/20 text-[10px] font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
