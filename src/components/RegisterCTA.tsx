import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight01Icon, CheckmarkCircle01Icon } from 'hugeicons-react';
import { fadeLeft, fadeRight, ease } from '../utils/animations';

export default function RegisterCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  return (
    <section id="sign-up" ref={ref} className="py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-[100px]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
              Get started
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 mb-4">
              Register your roof
            </h2>
            <p className="text-slate-400 leading-relaxed mb-10 max-w-md">
              It takes less than 5 minutes. Our team will contact you within 24 hours
              to schedule a free assessment.
            </p>

            <div className="space-y-4">
              {[
                'No upfront costs or hidden fees',
                'Free professional roof assessment',
                'Installation within 2–4 weeks',
                'Start earning from month one',
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, ease, delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                    <CheckmarkCircle01Icon className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <span className="text-slate-500 text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right CTA card */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <div className="p-10 sm:p-12 rounded-3xl bg-slate-950 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.03] rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3" />
              <div className="relative z-10">
                <h3 className="font-display font-bold text-2xl mb-3">
                  Ready to earn from your roof?
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-sm">
                  Complete our quick registration form and we'll handle the rest.
                  Free assessment, free installation, guaranteed income.
                </p>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { value: '5 min', label: 'To register' },
                    { value: '24 hrs', label: 'Response time' },
                    { value: 'GH₵0', label: 'Upfront cost' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="font-display font-bold text-lg text-white">{stat.value}</div>
                      <div className="text-[11px] text-white/30 mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <Link
                  to="/register"
                  className="group w-full flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-950 font-semibold text-[15px] rounded-xl hover:bg-slate-100 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start Registration
                  <ArrowRight01Icon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                </Link>

                <p className="text-white/20 text-[11px] text-center mt-4">
                  By registering, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
