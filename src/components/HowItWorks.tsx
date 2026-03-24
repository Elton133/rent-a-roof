import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { UserAdd01Icon, Settings01Icon, FlashIcon, Money01Icon } from 'hugeicons-react';
import { staggerContainer, staggerItem, fadeUp } from '../utils/animations';

const steps = [
  {
    step: '01',
    title: 'Sign up online',
    description: 'Register your property in under 2 minutes. We schedule a free assessment within 48 hours.',
    className: 'md:col-span-2 md:row-span-1 bg-slate-50 border border-slate-100/50',
    icon: <UserAdd01Icon className="w-6 h-6" />,
  },
  {
    step: '02',
    title: 'We install panels',
    description: 'Certified technicians install premium panels. Zero cost to you.',
    className: 'md:col-span-1 md:row-span-1 bg-slate-950 text-white',
    icon: <Settings01Icon className="w-6 h-6" />,
  },
  {
    step: '03',
    title: 'Generate energy',
    description: 'Panels produce clean power daily. We handle all monitoring.',
    className: 'md:col-span-1 md:row-span-1 bg-slate-950 text-white',
    icon: <FlashIcon className="w-6 h-6" />,
  },
  {
    step: '04',
    title: 'Earn monthly',
    description: 'Receive your share of energy revenue deposited directly to your account. Pure passive income.',
    className: 'md:col-span-2 md:row-span-1 bg-slate-50 border border-slate-100/50',
    icon: <Money01Icon className="w-6 h-6" />,
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  return (
    <section id="how-it-works" ref={ref} className="py-32 bg-white relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-20"
        >
          <span className="text-slate-400 font-semibold text-xs uppercase tracking-widest mb-3 block">
            How it works
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-slate-950 mb-6">
            Four simple steps.
          </h2>
          <p className="text-slate-500 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            From sign-up to earning — we've streamlined the entire process so you don't have to lift a finger.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 auto-rows-fr"
        >
          {steps.map((step) => {
            const isDark = step.className.includes('bg-slate-950');
            return (
              <motion.div
                key={step.step}
                variants={staggerItem}
                className={`group relative p-8 lg:p-12 rounded-[2rem] overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl ${step.className}`}
              >
                {/* Step number watermark */}
                <div className={`absolute -bottom-4 right-4 text-[10rem] font-display font-black leading-none select-none transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-4 ${isDark ? 'text-white/5' : 'text-slate-950/[0.03]'}`}>
                  {step.step}
                </div>

                <div className="relative z-10 h-full flex flex-col justify-between">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-12 transition-colors duration-500 ${isDark ? 'bg-white/10 text-white group-hover:bg-white group-hover:text-slate-950' : 'bg-white text-slate-950 shadow-sm group-hover:bg-slate-950 group-hover:text-white'}`}>
                    {step.icon}
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className={`font-display font-bold text-2xl mb-3 tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                      {step.title}
                    </h3>
                    <p className={`text-base leading-relaxed ${isDark ? 'text-white/70' : 'text-slate-500'}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
