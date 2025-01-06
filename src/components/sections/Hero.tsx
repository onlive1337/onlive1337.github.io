"use client"
import Image from "next/image"
import { useEffect, useState } from "react"

interface DiscordStatus {
  status: 'online' | 'idle' | 'dnd' | 'offline';
  activities?: any[];
}

const statusColors = {
  online: 'bg-green-500',
  idle: 'bg-yellow-500',
  dnd: 'bg-red-500',
  offline: 'bg-gray-500'
};

export function Hero() {
  const [status, setStatus] = useState<DiscordStatus | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      const response = await fetch('https://portfolio-api-taupe-theta.vercel.app/api/discord');
      const data = await response.json();
      setStatus(data);
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

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
              <div className={`absolute bottom-2 right-2 h-4 w-4 rounded-full ${statusColors[status.status]} ring-2 ring-white dark:ring-black`} />
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