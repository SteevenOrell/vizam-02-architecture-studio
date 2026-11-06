'use client';

import { motion, MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * The only ambient motion outside the two scroll sections: a short, one-time fade-up as content enters.
 * MotionConfig reducedMotion="user" drops the transform for people who ask for reduced motion.
 */
export function Reveal({ children, delay = 0, className, as = 'div' }: { children: ReactNode; delay?: number; className?: string; as?: 'div' | 'li' }) {
  const Comp = as === 'li' ? motion.li : motion.div;
  return (
    <MotionConfig reducedMotion="user">
      <Comp
        className={className}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -8% 0px' }}
        transition={{ duration: 0.8, delay, ease: [0.2, 0.7, 0.1, 1] }}
      >
        {children}
      </Comp>
    </MotionConfig>
  );
}
