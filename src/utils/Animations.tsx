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
  stiffness: 75,
  damping: 20,
  mass: 1,
};

export function InitialFadeIn({
  children,
  className,
  delay = 0,
}: AnimationProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.985 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      transition={
        reduce
          ? { duration: 0.35, delay: delay / 1000 }
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
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22, scale: 0.985 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={reduce ? { duration: 0.35 } : expressiveSpring}
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
            staggerChildren: reduce ? 0 : 0.09,
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
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: expressiveSpring,
  },
};
