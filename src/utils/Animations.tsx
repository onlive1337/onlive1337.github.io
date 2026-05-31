'use client';
import React from 'react';
import { motion, useReducedMotion, type Transition } from 'framer-motion';
import { cn } from '@/utils/cn';

interface AnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const expressiveSpring: Transition = {
  type: 'spring',
  stiffness: 140,
  damping: 16,
  mass: 0.9,
};

export function InitialFadeIn({
  children,
  className,
  delay = 0,
}: AnimationProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      transition={
        reduce
          ? { duration: 0.3, delay: delay / 1000 }
          : { ...expressiveSpring, delay: delay / 1000 }
      }
      className={cn('will-change-transform will-change-opacity', className)}
    >
      {children}
    </motion.div>
  );
}

export function ScrollFadeIn({
  children,
  className,
}: Omit<AnimationProps, 'delay'>) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={reduce ? { duration: 0.3 } : expressiveSpring}
      className={cn('will-change-transform will-change-opacity', className)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerOnScroll({
  children,
  className,
  delay = 0,
}: AnimationProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduce ? 0 : 0.08,
            delayChildren: delay / 1000,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: expressiveSpring,
  },
};
