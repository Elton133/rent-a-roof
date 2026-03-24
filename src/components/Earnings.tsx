import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { fadeLeft, fadeRight, ease } from '../utils/animations';

const roofSizes = [
  { label: 'Small', sqft: '500–800 sq ft', panels: 8, monthly: 120, annual: 1440 },
  { label: 'Medium', sqft: '800–1,200 sq ft', panels: 14, monthly: 210, annual: 2520 },
  { label: 'Large', sqft: '1,200–2,000 sq ft', panels: 22, monthly: 340, annual: 4080 },
  { label: 'Commercial', sqft: '2,000+ sq ft', panels: 40, monthly: 620, annual: 7440 },
];

export default function Earnings() {
  const [selected, setSelected] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });
  const current = roofSizes[selected];

  return (
    <section id="earnings" ref={ref} className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Content */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <span className="text-slate-400 font-semibold text-xs uppercase tracking-widest mb-3 block">
              Earning potential
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tighter text-slate-950 mb-6">
              See what your roof can earn.
            </h2>
            <p className="text-slate-500 leading-relaxed mb-12 max-w-md font-light text-lg">
              Earnings depend on roof size, sunlight exposure, and local energy rates. Select your roof size to see estimated income.
            </p>

            {/* iOS Style Segmented Control */}
            <div className="inline-flex flex-col sm:flex-row p-1.5 bg-slate-200/50 rounded-2xl sm:rounded-full mb-8 w-full sm:w-auto overflow-hidden">
              {roofSizes.map((size, i) => (
                <button
                  key={size.label}
                  onClick={() => setSelected(i)}
                  className={`relative px-6 py-3 rounded-xl sm:rounded-full text-sm font-semibold transition-colors w-full sm:w-auto ${
                    selected === i ? 'text-slate-950' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {selected === i && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-white rounded-xl sm:rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                      transition={{ type: 'spring', duration: 0.6, bounce: 0.2 }}
                    />
                  )}
                  <span className="relative z-10">{size.label}</span>
                </button>
              ))}
            </div>

            <p className="text-slate-400 text-xs mt-2">
              * Estimates based on average sunlight hours and current rates.
            </p>
          </motion.div>

          {/* Right: Earnings Card */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease }}
                className="relative bg-white rounded-[2rem] p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-12">
                  <div>
                    <div className="text-slate-400 text-sm font-medium mb-1 tracking-wide">{current.label} Roof</div>
                    <div className="text-slate-300 text-xs">{current.sqft}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-display font-medium text-slate-400 text-sm mb-1">{current.panels} Panels</div>
                    <div className="text-green-500 text-xs font-semibold px-2.5 py-1 bg-green-50 rounded-full inline-block">Optimal</div>
                  </div>
                </div>

                {/* Main Earnings Readout */}
                <div className="mb-10">
                  <div className="text-slate-400 text-xs uppercase tracking-widest mb-2 font-semibold">Estimated Monthly</div>
                  <div className="font-display font-black text-6xl tracking-tighter text-slate-950">
                    GH₵{current.monthly}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-8">
                  <div className="mb-2 flex justify-between">
                    <span className="text-slate-500 font-medium text-xs">Capacity Utilization</span>
                    <span className="text-slate-950 font-bold text-xs">{Math.round((current.panels / 40) * 100)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      className="h-full bg-slate-950 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(current.panels / 40) * 100}%` }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>

                {/* Annual summary */}
                <div className="p-6 rounded-2xl bg-slate-50 flex items-center justify-between border border-slate-100/50">
                  <div>
                    <div className="text-slate-400 text-xs uppercase tracking-widest mb-1 font-semibold">Annual Projection</div>
                    <div className="text-slate-500 text-[11px]">Tax free passive income</div>
                  </div>
                  <div className="font-display font-bold text-2xl text-slate-950">
                    GH₵{current.annual.toLocaleString()}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
