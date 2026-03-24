import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight01Icon, CheckmarkCircle01Icon } from 'hugeicons-react';
import { fadeLeft, fadeRight, ease } from '../utils/animations';

export default function SignUp() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="sign-up" ref={ref} className="py-28 bg-white relative overflow-hidden">
      {/* Background */}
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
              It takes less than 2 minutes. Our team will contact you within 24 hours
              to schedule a free assessment.
            </p>

            {/* Checklist */}
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

          {/* Right form */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease }}
                className="p-12 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] text-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-50 mx-auto flex items-center justify-center mb-5">
                  <CheckmarkCircle01Icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-950 mb-2">You're in!</h3>
                <p className="text-slate-400 text-sm max-w-xs mx-auto">
                  We've received your registration. Our team will reach out within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.1)] transition-shadow duration-500 space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-150 text-slate-950 placeholder:text-slate-300 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-150 text-slate-950 placeholder:text-slate-300 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all text-sm"
                  />
                </div>

                <input
                  type="tel"
                  placeholder="Phone number"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-150 text-slate-950 placeholder:text-slate-300 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all text-sm"
                />

                <input
                  type="text"
                  placeholder="Property address"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-150 text-slate-950 placeholder:text-slate-300 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all text-sm"
                />

                <select
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-150 text-slate-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all text-sm appearance-none"
                >
                  <option value="">Estimated roof size</option>
                  <option value="small">Small (500–800 sq ft)</option>
                  <option value="medium">Medium (800–1,200 sq ft)</option>
                  <option value="large">Large (1,200–2,000 sq ft)</option>
                  <option value="commercial">Commercial (2,000+ sq ft)</option>
                </select>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-slate-950 hover:bg-slate-900 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-[0.98] text-sm"
                >
                  Submit registration
                  <ArrowRight01Icon className="w-4 h-4" />
                </button>

                <p className="text-slate-300 text-[11px] text-center pt-1">
                  By submitting, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
