'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface AnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function InitialFadeIn({
  children,
  className,
  delay = 0
}: AnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        delay: delay / 1000,
        ease: "easeOut"
      }}
      className={cn('will-change-transform will-change-opacity', className)}
    >
      {children}
    </motion.div>
  );
}

export function ScrollFadeIn({
  children,
  className
}: Omit<AnimationProps, 'delay'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 1,
        ease: "easeOut"
      }}
      className={cn('will-change-transform will-change-opacity', className)}
    >
      {children}
    </motion.div>
  );
}