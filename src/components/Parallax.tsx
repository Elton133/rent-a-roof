import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ease } from '../utils/animations';

export default function Parallax() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const stats = [
    { value: '10,000+', label: 'Roofs registered' },
    { value: '45 MW', label: 'Clean energy generated' },
    { value: '$2.4M', label: 'Paid to homeowners' },
  ];

  return (
    <section ref={ref} className="relative h-[60vh] min-h-[400px] overflow-hidden">
      {/* Background image with parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -top-20 -bottom-20">
        <img
          src="/images/solar-installation.jpg"
          alt="Solar panel installation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/75" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex items-center justify-center h-full"
      >
        <div className="text-center px-6">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            Powering homes across the country
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            className="text-white/50 text-base max-w-md mx-auto mb-14"
          >
            Join the clean energy revolution. Every roof matters.
          </motion.p>

          <div className="flex flex-wrap justify-center gap-12 sm:gap-16">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease, delay: 0.3 + i * 0.12 }}
              >
                <div className="font-display font-extrabold text-3xl sm:text-4xl text-white">{stat.value}</div>
                <div className="text-white/40 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
