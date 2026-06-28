import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { cn } from '../lib/utils';

type RevealSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
};

export function RevealSection({ children, className, id, delay = 0 }: RevealSectionProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1, rootMargin: '-60px 0px' });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.section>
  );
}
