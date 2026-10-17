"use client"
import Image from "next/image"
import { memo, useEffect, useState, useCallback, useRef } from "react"
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useSWR from 'swr'
import { InitialFadeIn } from '@/utils/Animations'
import { PreciseAge } from '@/components/PreciseAge'
import { Socials } from '@/components/sections/Socials'
import { fetchFromAPI } from '@/utils/api'
import type { DiscordData } from '@/types'

const statusColors = {
  online: 'bg-emerald-500',
  idle: 'bg-amber-500',
  dnd: 'bg-rose-500',
  offline: 'bg-md-outline'
} as const;

const statusMessages = {
  online: 'Online and ready!',
  idle: 'Away for a moment',
  dnd: 'Do not disturb',
  offline: 'Currently offline'
} as const;

const fetchDiscordStatus = (endpoint: string) => fetchFromAPI<DiscordData>(endpoint);

const Avatar = memo(function Avatar() {
  return (
    <div className="relative h-44 w-44 overflow-hidden rounded-m3-2xl hover:rounded-[52px] active:rounded-m3-xl hover:scale-[1.02] shape-morph ring-4 ring-md-surface-container-highest shadow-xl">
      <Image
        src="/avatar.avif"
        alt="Avatar"
        width={176}
        height={176}
        quality={80}
        priority
        className="object-cover w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105"
        sizes="176px"
      />
    </div>
  );
});

const StatusTooltip = memo(function StatusTooltip({ 
  show, 
  message, 
  position 
}: { 
  show: boolean; 
  message: string;
  position: { x: number; y: number } | null;
}) {
  if (!position) return null;
  
  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.94, y: 4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 4 }}
          className="fixed z-50 pointer-events-none"
          style={{
            top: `${position.y + 12}px`,
            left: position.x - 60, // center-ish alignment
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="bg-md-inverse-surface text-md-inverse-on-surface text-xs font-semibold py-1.5 px-3.5 rounded-full shadow-lg whitespace-nowrap tracking-wide">
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
});

const StatusIndicator = memo(function StatusIndicator({ status }: { status: DiscordData }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    if (indicatorRef.current) {
      const rect = indicatorRef.current.getBoundingClientRect();
      const isMobile = window.innerWidth < 768;
      
      setPosition({
        x: isMobile ? (window.innerWidth / 2) : (rect.left + (rect.width / 2)),
        y: rect.bottom + window.scrollY
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (showTooltip) {
        updatePosition();
      }
    };

    const handleClickOutside = () => {
      setShowTooltip(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showTooltip, updatePosition]);

  const toggleTooltip = useCallback(() => {
    updatePosition();
    setShowTooltip(prev => !prev);
  }, [updatePosition]);

  return (
    <>
      <div 
        ref={indicatorRef}
        className={`absolute bottom-1.5 right-1.5 h-8 w-8 rounded-m3-md hover:rounded-m3-sm ${statusColors[status.status]} ring-4 ring-md-background shadow-md cursor-help shape-morph hover:scale-105 active:scale-95`}
        onClick={(e) => {
          e.stopPropagation();
          toggleTooltip();
        }}
        onPointerEnter={(e) => {
          if (e.pointerType === 'mouse') {
            updatePosition();
            setShowTooltip(true);
          }
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === 'mouse') {
            setShowTooltip(false);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTooltip();
          } else if (e.key === 'Escape') {
            setShowTooltip(false);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Discord status: ${status.status}`}
      />
      <StatusTooltip 
        show={showTooltip} 
        message={statusMessages[status.status]}
        position={position}
      />
    </>
  );
});

const HeroContent = memo(function HeroContent() {
  return (
    <div className="text-center space-y-5">
      <h1 className="type-display text-md-on-background">
        onlive
      </h1>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="px-4 py-1.5 rounded-full bg-md-primary-container text-md-on-primary-container font-display font-bold text-sm md:text-base tracking-wide">
          Full Stack Developer
        </span>
        <span className="px-3.5 py-1.5 rounded-m3-md bg-md-surface-container-high text-md-on-surface font-medium text-sm flex items-center gap-1.5">
          <span>tech enthusiast from</span>
          <span className="text-base leading-none cursor-default">🇺🇿</span>
        </span>
      </div>
      <div className="flex justify-center">
        <span className="font-mono text-xs sm:text-sm select-none bg-md-tertiary-container text-md-on-tertiary-container px-4 py-1 rounded-full font-semibold">
          <PreciseAge /> y.o
        </span>
      </div>
    </div>
  );
});

export const Hero = memo(function Hero() {
  const { data, isLoading } = useSWR('discord', fetchDiscordStatus, {
    refreshInterval: 60000,
    dedupingInterval: 30000,
    revalidateOnFocus: false,
  });

  const status: DiscordData | null = isLoading
    ? null
    : (data ?? { status: 'offline' });

  return (
    <section id="about" className="pt-28 sm:pt-32 pb-12 scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8">
          <InitialFadeIn delay={150}>
            <div className="relative select-none">
              <Avatar />
              {status && <StatusIndicator status={status} />}
            </div>
          </InitialFadeIn>

          <InitialFadeIn delay={250}>
            <HeroContent />
          </InitialFadeIn>

          <InitialFadeIn delay={350} className="w-full">
            <Socials />
          </InitialFadeIn>
        </div>
      </div>
    </section>
  );
});