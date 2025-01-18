"use client"
import Image from "next/image"
import { memo, useEffect, useState, useCallback, useRef } from "react"
import { createPortal } from 'react-dom'
import { InitialFadeIn } from '../../utils/Animations'

const statusColors = {
  online: 'bg-green-500',
  idle: 'bg-yellow-500',
  dnd: 'bg-red-500',
  offline: 'bg-gray-500'
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
    <div className="relative h-40 w-40 overflow-hidden rounded-full ring-2 ring-gray-200 dark:ring-gray-800">
      <Image
        src="/avatar.avif"
        alt="Avatar"
        width={160}
        height={160}
        quality={75}
        priority
        className="object-cover"
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
    <div 
      className="fixed z-50 transition-all duration-200 ease-in-out"
      style={{
        top: `${position.y + 15}px`,
        left: position.x,
        opacity: show ? 1 : 0,
        transform: `translateY(${show ? 0 : -10}px)`,
        pointerEvents: 'none',
        visibility: show ? 'visible' : 'hidden'
      }}
    >
      <div className="bg-black/75 backdrop-blur-sm text-white text-sm py-1 px-3 rounded-lg whitespace-nowrap">
        {message}
      </div>
    </div>,
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
        x: isMobile ? (window.innerWidth / 2 - 75) : (rect.left + (rect.width / 2) - 50),
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
    setShowTooltip(!showTooltip);
  };

  return (
    <>
      <div 
        ref={indicatorRef}
        className={`absolute bottom-1 right-1 h-8 w-8 rounded-full ${statusColors[status.status]} ring-4 ring-white dark:ring-black cursor-help`}
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
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
        onlive
      </h1>
      <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300">
        Full Stack Developer
      </p>
      <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
        I wanna just code and make the world a better place.
      </p>
    </div>
  );
});

function HeroComponent() {
  const [status, setStatus] = useState<Status | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      const response = await fetch('https://portfolio-api-taupe-theta.vercel.app/api/discord');
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      console.error('Failed to fetch status:', error);
      setStatus({ status: 'offline' });
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  return (
    <section className="pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8">
          <InitialFadeIn delay={200}>
            <div className="relative">
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
}

export const Hero = memo(HeroComponent);