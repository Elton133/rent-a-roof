import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight01Icon, SolarPanel02Icon, Home01Icon, Money01Icon, Shield01Icon } from 'hugeicons-react';
import { ease } from '../utils/animations';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  useEffect(() => {
    if (!headingRef.current) return;
    const words = headingRef.current.querySelectorAll('.word');

    gsap.set(words, { opacity: 0, y: 30 });
    gsap.to(words, {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.3,
    });
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Full-bleed background image */}
      <motion.div
        style={{ scale: bgScale }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/images/solar-installation.jpg"
          alt="Solar panels installed on rooftop"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950/90" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Main messaging */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/80 text-xs font-semibold tracking-wide uppercase">Now accepting registrations in Ghana</span>
            </motion.div>

            {/* Heading */}
            <h1
              ref={headingRef}
              className="font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.05] tracking-tighter text-white mb-6"
            >
              <span className="word inline-block mr-[0.2em]">Turn</span>
              <span className="word inline-block mr-[0.2em]">your</span>
              <span className="word inline-block mr-[0.2em]">idle</span>
              <br className="hidden sm:block" />
              <span className="word inline-block mr-[0.2em]">roof</span>
              <span className="word inline-block mr-[0.2em]">into</span>
              <span className="word inline-block mr-[0.2em] text-green-400">income.</span>
            </h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7, ease }}
              className="text-white/70 text-lg leading-relaxed max-w-lg mb-10 font-light"
            >
              We install premium solar panels on your rooftop at zero cost to you.
              Earn passive income every month from clean energy while helping power Ghana's future.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7, ease }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Link
                to="/register"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-950 font-semibold text-[15px] rounded-full hover:bg-slate-100 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)] active:scale-[0.97] w-full sm:w-auto"
              >
                Register Your Roof
                <ArrowRight01Icon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
              </Link>
              <a
                href="#how-it-works"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-white/80 border border-white/15 rounded-full font-medium text-[15px] hover:bg-white/5 hover:text-white transition-all duration-300 w-full sm:w-auto backdrop-blur-sm"
              >
                See how it works
              </a>
            </motion.div>
          </div>

          {/* Right: Info cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.9, ease }}
            className="hidden lg:flex flex-col gap-4"
          >
            {/* Stats row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/50 backdrop-blur-2xl border border-white/10 rounded-2xl p-6">
                <div className="font-display font-extrabold text-3xl text-white mb-1">10K+</div>
                <div className="text-sm text-white/50 font-medium">Roofs registered</div>
              </div>
              <div className="bg-black/50 backdrop-blur-2xl border border-white/10 rounded-2xl p-6">
                <div className="font-display font-extrabold text-3xl text-green-400 mb-1">GH₵2.4M</div>
                <div className="text-sm text-white/50 font-medium">Paid to homeowners</div>
              </div>
            </div>

            {/* Feature highlights */}
            {[
              { icon: <SolarPanel02Icon className="w-5 h-5" />, title: 'Free installation', desc: 'Premium panels installed at zero cost to you' },
              { icon: <Money01Icon className="w-5 h-5" />, title: 'Monthly earnings', desc: 'Average GH₵340/month passive income per roof' },
              { icon: <Shield01Icon className="w-5 h-5" />, title: 'Fully insured', desc: 'Complete coverage for your property and equipment' },
              { icon: <Home01Icon className="w-5 h-5" />, title: 'Your roof, your asset', desc: 'Panels add value to your property immediately' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.12, duration: 0.6, ease }}
                className="bg-black/50 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:bg-white/[0.12] transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{item.title}</div>
                  <div className="text-white/40 text-xs">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.7, ease }}
          className="mt-20 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {['Energy Commission Certified', 'Licensed Installer', '5-Year Warranty'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-white/40 text-xs font-medium">{item}</span>
              </div>
            ))}
          </div>
          <div className="text-white/30 text-xs">Trusted by homeowners across Accra, Kumasi & Takoradi</div>
        </motion.div>
      </motion.div>
    </section>
  );
}
