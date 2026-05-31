"use client"
import Image from "next/image"
import { memo, useEffect, useState, useCallback, useRef } from "react"
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { InitialFadeIn } from '@/utils/Animations'
import { PreciseAge } from '@/components/PreciseAge'
import { fetchFromAPI } from '@/utils/api'

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

type Status = {
  status: keyof typeof statusColors;
}

const Avatar = memo(function Avatar() {
  return (
    <div className="relative h-40 w-40 overflow-hidden rounded-m3-2xl hover:rounded-m3-lg hover:scale-[1.03] shape-morph border-4 border-md-primary/10 hover:border-md-primary/30 shadow-lg">
      <Image
        src="/avatar.avif"
        alt="Avatar"
        width={160}
        height={160}
        quality={80}
        priority
        className="object-cover transition-transform duration-500 hover:scale-105"
        sizes="160px"
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
          initial={{ opacity: 0, scale: 0.9, y: 5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 5 }}
          className="fixed z-50 pointer-events-none"
          style={{
            top: `${position.y + 12}px`,
            left: position.x - 60, // center-ish alignment
          }}
          transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
        >
          <div className="bg-md-inverse-surface text-md-inverse-on-surface text-xs font-semibold py-1.5 px-3.5 rounded-lg shadow-lg whitespace-nowrap tracking-wide border border-md-outline-variant/20">
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
});

const StatusIndicator = memo(function StatusIndicator({ status }: { status: Status }) {
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

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showTooltip, updatePosition]);

  const handleInteraction = () => {
    updatePosition();
    setShowTooltip(prev => !prev);
  };

  return (
    <>
      <div 
        ref={indicatorRef}
        className={`absolute bottom-1.5 right-1.5 h-8 w-8 rounded-full ${statusColors[status.status]} border-4 border-md-background shadow-md cursor-help transition-all duration-300 hover:scale-110 active:scale-95`}
        onClick={(e) => {
          e.stopPropagation();
          handleInteraction();
        }}
        onMouseEnter={handleInteraction}
        onMouseLeave={() => setShowTooltip(false)}
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
    <div className="text-center space-y-4">
      <h1 className="type-display text-md-on-background">
        onlive
      </h1>
      <p className="text-xl md:text-2xl font-semibold tracking-wide text-md-primary">
        Full Stack Developer
      </p>
      <div className="flex flex-col items-center gap-1.5 text-md-on-background-variant">
        <div className="flex items-center gap-2.5 flex-wrap justify-center font-medium">
          <span>smol femboy dev</span>
          <span className="text-xl animate-pulse">🦊</span>
          <span>from</span>
          <span className="text-xl hover:scale-115 transition-transform duration-200 cursor-default">🇺🇿</span>
        </div>
        <span className="font-mono text-sm opacity-80 select-none bg-md-secondary-container text-md-on-secondary-container px-3 py-0.5 rounded-full">
          {<PreciseAge />} y.o
        </span>
      </div>
    </div>
  );
});

export const Hero = memo(function Hero() {
  const [status, setStatus] = useState<Status | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      const data = await fetchFromAPI<Status>('discord');
      if (data) {
        setStatus(data);
      } else {
        setStatus({ status: 'offline' });
      }
    } catch (err) {
      console.error('Failed to fetch Discord status:', err);
      setStatus({ status: 'offline' });
    }
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      void fetchStatus();
    });
    const interval = setInterval(() => {
      void fetchStatus();
    }, 60000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(interval);
    };
  }, [fetchStatus]);

  return (
    <section className="pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8">
          <InitialFadeIn delay={200}>
            <div className="relative select-none">
              <Avatar />
              {status && <StatusIndicator status={status} />}
            </div>
          </InitialFadeIn>

          <InitialFadeIn delay={300}>
            <HeroContent />
          </InitialFadeIn>
        </div>
      </div>
    </section>
  );
});