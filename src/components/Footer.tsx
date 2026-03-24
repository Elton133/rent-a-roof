import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SolarPanel02Icon, TwitterIcon, Linkedin01Icon, InstagramIcon } from 'hugeicons-react';
import { staggerContainer, staggerItem } from '../utils/animations';

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <footer ref={ref} className="bg-slate-950 text-white relative overflow-hidden">
      {/* Footer Vibe: Subtle background elements */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-800/20 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />
      
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-6xl mx-auto px-6 py-20 relative z-10"
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <motion.div variants={staggerItem} className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm group hover:bg-white transition-colors duration-500">
                <SolarPanel02Icon className="w-5 h-5 text-white group-hover:text-slate-950 transition-colors duration-500" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                rent<span className="text-white/40 font-light">a</span>roof
              </span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              Transforming idle rooftops into clean energy hubs. Powering homes, building futures.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div variants={staggerItem}>
            <h4 className="font-display font-semibold text-xs uppercase tracking-wider mb-4 text-white/50">Company</h4>
            <ul className="space-y-2.5">
              {['About', 'How It Works', 'Careers', 'Press'].map((l) => (
                <li key={l}>
                  <a 
                    href={l === 'How It Works' ? '#how-it-works' : '#'} 
                    className="text-white/30 hover:text-white text-sm transition-colors duration-300"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h4 className="font-display font-semibold text-xs uppercase tracking-wider mb-4 text-white/50">Resources</h4>
            <ul className="space-y-2.5">
              {['FAQ', 'Blog', 'Solar Guide', 'Support'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-white/30 hover:text-white text-sm transition-colors duration-300">{l}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h4 className="font-display font-semibold text-xs uppercase tracking-wider mb-4 text-white/50">Legal</h4>
            <ul className="space-y-2.5">
              {['Privacy', 'Terms', 'Cookies', 'Licensing'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-white/30 hover:text-white text-sm transition-colors duration-300">{l}</a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-white/[0.06] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} rentaroof. All rights reserved.
          </p>
          <div className="flex gap-4">
            {[
              { icon: <TwitterIcon className="w-5 h-5" />, href: '#' },
              { icon: <Linkedin01Icon className="w-5 h-5" />, href: '#' },
              { icon: <InstagramIcon className="w-5 h-5" />, href: '#' },
            ].map((s, i) => (
              <a 
                key={i} 
                href={s.href} 
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
