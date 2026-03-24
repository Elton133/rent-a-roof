import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Money02Icon, Shield01Icon, ChartLineData01Icon, Note01Icon, Leaf01Icon, Clock01Icon } from 'hugeicons-react';
import { fadeUp, staggerContainer, staggerItem } from '../utils/animations';

const benefits = [
  {
    icon: <Money02Icon className="w-6 h-6" />,
    title: 'Zero investment',
    desc: 'We cover all costs — equipment, installation, permits, and ongoing maintenance.',
  },
  {
    icon: <Shield01Icon className="w-6 h-6" />,
    title: 'Fully insured',
    desc: 'Complete coverage for your roof and our equipment. Your property is always protected.',
    dark: true,
  },
  {
    icon: <ChartLineData01Icon className="w-6 h-6" />,
    title: 'Passive income',
    desc: 'Earn a percentage of generated energy revenue every month without any effort.',
  },
  {
    icon: <Note01Icon className="w-6 h-6" />,
    title: 'Transparent terms',
    desc: 'Clear contracts with flexible duration. No hidden fees or surprise clauses.',
    dark: true,
  },
  {
    icon: <Leaf01Icon className="w-6 h-6" />,
    title: 'Go green',
    desc: 'Reduce your carbon footprint and contribute to a cleaner, more sustainable future.',
  },
  {
    icon: <Clock01Icon className="w-6 h-6" />,
    title: 'Hassle free',
    desc: 'We handle everything end to end — installation, monitoring, repairs, and billing.',
    dark: true,
  },
];

export default function Benefits() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  return (
    <section id="benefits" ref={ref} className="py-32 relative bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8"
        >
          <div className="max-w-xl">
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tighter text-slate-950 mb-6">
              Built for homeowners.
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed font-light">
              We believe your roof should work as hard as you do. Everything is designed to maximize your return with zero effort on your part.
            </p>
          </div>
          <div className="flex-shrink-0 pb-2">
            <Link to="/register" className="bg-slate-950 text-white px-8 py-4 rounded-full font-semibold group flex items-center gap-2 hover:bg-slate-900 transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-[0.98]">
              Register now
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </motion.div>

        {/* Benefits grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
        >
          {benefits.map((b) => (
            <motion.div
              key={b.title}
              variants={staggerItem}
              className={`group ${b.dark ? 'bg-slate-950 p-8 rounded-[2rem] shadow-sm' : ''}`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-colors duration-500 ${b.dark ? 'bg-white/10 text-white group-hover:bg-white group-hover:text-slate-950' : 'border border-slate-200 text-slate-950 group-hover:bg-slate-950 group-hover:text-white'}`}>
                {b.icon}
              </div>
              <h3 className={`font-display text-2xl font-bold tracking-tight mb-3 transition-transform duration-500 group-hover:translate-x-1 ${b.dark ? 'text-white' : 'text-slate-950'}`}>
                {b.title}
              </h3>
              <p className={`leading-relaxed font-light ${b.dark ? 'text-white/60' : 'text-slate-500'}`}>
                {b.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
