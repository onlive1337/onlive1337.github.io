"use client"
import Image from "next/image"
import { memo, useEffect, useState, useCallback } from "react"

const statusColors = {
  online: 'bg-green-500',
  idle: 'bg-yellow-500',
  dnd: 'bg-red-500',
  offline: 'bg-gray-500'
} as const;

type Status = {
  status: keyof typeof statusColors;
}

const Avatar = memo(function Avatar() {
  return (
    <div className="relative h-40 w-40 overflow-hidden rounded-full ring-2 ring-gray-200 dark:ring-gray-800">
      <Image
        src="/avatar.webp"
        alt="Avatar"
        width={160}
        height={160}
        quality={85}
        priority
        className="object-cover"
        sizes="160px"
      />
    </div>
  );
});

const StatusIndicator = memo(({ status }: { status: Status }) => (
  <div 
    className={`absolute bottom-1 right-1 h-8 w-8 rounded-full ${statusColors[status.status]} ring-4 ring-white dark:ring-black`}
  />
));
StatusIndicator.displayName = 'StatusIndicator';

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
          <div className="relative">
            <Avatar />
            {status && <StatusIndicator status={status} />}
          </div>
          <HeroContent />
        </div>
      </div>
    </section>
  );
}

export const Hero = memo(HeroComponent);