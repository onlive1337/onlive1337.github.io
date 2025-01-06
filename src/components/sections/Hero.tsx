"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import type { DiscordStatus } from '@/types/discord'
import { statusColors } from '@/types/discord'

export function Hero() {
  const [status, setStatus] = useState<DiscordStatus | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('https://portfolio-api-taupe-theta.vercel.app/api/discord');
        const data: DiscordStatus = await response.json();
        setStatus(data);
      } catch (error) {
        console.error('Failed to fetch status:', error);
        setStatus({ status: 'offline' });
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log('Current status:', status);
  }, [status]);

  return (
    <section className="pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8">
          <div className="relative">
            <div className="relative h-40 w-40 overflow-hidden rounded-full ring-2 ring-gray-200 dark:ring-gray-800">
              <Image
                src="/avatar.webp"
                alt="Avatar"
                fill
                className="object-cover"
                priority
              />
            </div>
            {status && (
              <div 
                className={`absolute bottom-1 right-1 h-8 w-8 rounded-full ${
                  status.status ? statusColors[status.status] : statusColors.offline
                } ring-4 ring-white dark:ring-black`} 
              />
            )}
          </div>
          
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
        </div>
      </div>
    </section>
  )
}