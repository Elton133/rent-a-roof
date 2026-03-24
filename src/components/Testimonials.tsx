import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowLeft01Icon, ArrowRight01Icon, StarIcon } from 'hugeicons-react';
import { fadeUp, ease } from '../utils/animations';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Homeowner, Austin TX',
    quote: 'I was skeptical at first, but Rent a Roof made it so easy. They handled everything — permits, installation, even the paperwork. Now I earn GH₵2,800 every month without lifting a finger.',
    rating: 5,
  },
  {
    name: 'James Okafor',
    role: 'Property Owner, Miami FL',
    quote: 'I have 3 rental properties and enrolled all of them. The passive income from all three combined is incredible. Best decision I made this year.',
    rating: 5,
  },
  {
    name: 'Linda Chen',
    role: 'Homeowner, Portland OR',
    quote: 'Not only am I earning extra income, but I love knowing that my roof is generating clean energy. The team was professional and transparent throughout.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section id="testimonials" ref={ref} className="py-32 bg-white relative">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-20"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tighter text-slate-950">
            Hosts trust us.
          </h2>
        </motion.div>

        {/* Testimonial card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className="relative group">
            {/* Quote mark background */}
            <div className="absolute -top-16 -left-8 text-[12rem] font-display font-black text-slate-50 leading-none select-none z-0">
              "
            </div>

            <div className="relative z-10 pl-4 sm:pl-12 border-l-2 border-slate-950 py-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <div className="flex gap-1 mb-8">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-slate-950 fill-slate-950 px-0.5" />
                    ))}
                  </div>

                  <p className="font-display text-2xl sm:text-3xl lg:text-4xl text-slate-950 leading-snug tracking-tight mb-12">
                    {t.quote}
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-display font-bold text-lg text-slate-950">{t.name}</div>
                      <div className="text-slate-500 font-light">{t.role}</div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={prev}
                        className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all duration-300 active:scale-95 text-slate-950"
                      >
                        <ArrowLeft01Icon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={next}
                        className="w-12 h-12 rounded-full bg-slate-950 text-white flex items-center justify-center hover:bg-slate-800 transition-all duration-300 active:scale-95 shadow-[0_4px_14px_rgba(0,0,0,0.1)]"
                      >
                        <ArrowRight01Icon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
