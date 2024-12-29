"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Gamepad2 } from 'lucide-react';

interface GameData {
  name: string;
  gameId: string;
  imageUrl: string;
  isPlaying: boolean;
  playTime2Weeks?: number;
}

export function Gaming() {
  const [data, setData] = useState<GameData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGaming = async () => {
      try {
        const response = await fetch('/api/steam');
        const data = await response.json();
        setData(data);
      } catch (error) {
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGaming();
    const interval = setInterval(fetchGaming, 60000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div>
        <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
          Gaming
        </h2>
        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#171717] shadow-sm">
          <div className="animate-pulse flex space-x-4">
            <div className="h-16 w-16 bg-gray-200 dark:bg-gray-800 rounded-lg" />
            <div className="flex-1 space-y-3 py-1">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-center mb-6 text-xl font-bold text-gray-900 dark:text-white">
        Gaming
      </h2>
      {!data ? (
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/30 dark:bg-black/30 backdrop-blur-md">
                <div className="flex items-center gap-4">
                <div className="h-16 w-16 flex-shrink-0 bg-gray-100/50 dark:bg-gray-800/50 rounded-lg flex items-center justify-center">
                    <Gamepad2 className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
                <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                    Not Playing
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                    No recent games
                    </p>
                </div>
                </div>
            </div>
            ) : (
            <a
                href={`https://store.steampowered.com/app/${data.gameId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl border border-gray-200 dark:border-gray-800 bg-white/30 dark:bg-black/30 backdrop-blur-md hover:bg-white/40 dark:hover:bg-black/40 transition-all overflow-hidden"
            >
          <div className="flex items-center gap-4 p-4">
            <div className="relative h-16 w-16 flex-shrink-0">
              <Image
                src={data.imageUrl}
                alt={data.name}
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-500 transition-colors">
                {data.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {data.isPlaying ? (
                  'Currently Playing'
                ) : data.playTime2Weeks ? (
                  `${Math.round(data.playTime2Weeks / 60)} hours past 2 weeks`
                ) : null}
              </p>
            </div>
          </div>
        </a>
      )}
    </div>
  );
}